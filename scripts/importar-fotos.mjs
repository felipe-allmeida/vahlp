/**
 * Importa fotos originais para o projeto.
 *
 *   1. coloque os arquivos ORIGINAIS (direto do iPhone) numa pasta
 *   2. rode  npm run fotos -- <pasta>     (o padrão é  fotos-vah/)
 *
 * O script converte tudo para webp otimizado em public/fotos/, lê a data de
 * captura e o GPS no EXIF, agrupa as fotos em capítulos (mesmo lugar, dias
 * próximos) e imprime um bloco pronto para colar no src/content.ts.
 *
 * Importante: fotos que passam por apps de mensagem costumam perder o EXIF.
 * Use os arquivos originais (AirDrop, cabo, ou "Exportar original" no Fotos)
 * se quiser as datas e os lugares.
 */
import sharp from 'sharp'
import exifReader from 'exif-reader'
import fs from 'node:fs'
import path from 'node:path'

const ORIGEM = process.argv[2] || 'fotos-vah'
const DESTINO = 'public/fotos'

/**
 * Lugares conhecidos. O script escolhe o mais próximo dentro de RAIO_KM e
 * usa o nome; fora disso ele escreve a coordenada crua para você resolver.
 *
 * ✏️ Acrescente ou corrija pontos aqui conforme forem aparecendo fotos novas.
 */
const LUGARES = [
  { nome: 'Porto Alegre', lat: -30.0377, lon: -51.2221 },
  { nome: 'Porto Alegre', lat: -30.0215, lon: -51.1359 },
  { nome: 'Porto Alegre', lat: -30.1296, lon: -51.2241 },
  { nome: 'Porto Alegre', lat: -29.9846, lon: -51.1235 }, // Sarandi, a casa dela
  { nome: 'Canoas', lat: -29.9146, lon: -51.1874 },
  { nome: 'Xangri-Lá', lat: -29.8087, lon: -50.038 },
  { nome: 'Balneário Pinhal', lat: -30.5408, lon: -50.4195 },
  { nome: 'Taquara', lat: -29.9557, lon: -50.9216 },
  { nome: 'São Paulo', lat: -23.58, lon: -46.66 },
  { nome: 'Florianópolis', lat: -27.5981, lon: -48.4989 },
  { nome: 'Guarda do Embaú', lat: -27.9517, lon: -48.6243 },
  { nome: 'Joinville', lat: -26.2131, lon: -49.2946 },
  { nome: 'Praia do Rosa', lat: -28.115, lon: -48.652 },
  { nome: 'Tubarão', lat: -28.6024, lon: -48.8162 },
]
const RAIO_KM = 25

/** Fotos que NÃO devem ser importadas (já estão no site com outro nome, etc.) */
const IGNORAR = new Set([
  'IMG_2280', // = beijo.webp
  'IMG_3363', // = luz-vermelha.webp
  'IMG_3815', // = pier.webp
  'IMG_4943', // = ceu-01.webp
  'IMG_3678', // nu parcial — fora por padrão, o repositório é público

  // Rajadas: quadros do mesmo instante, indistinguíveis do que ficou.
  'IMG_2974', 'IMG_3136', 'IMG_3137', 'IMG_3945', 'IMG_5763',
  'IMG_5951', 'IMG_6094', 'IMG_1111', 'IMG_3944 (1)',
])

/** Um capítulo novo começa quando passa disso entre uma foto e a seguinte. */
const CORTE_DIAS = 12
const CORTE_KM = 40

if (!fs.existsSync(ORIGEM)) {
  console.error(`\nPasta "${ORIGEM}" não existe. Crie ela e ponha as fotos lá dentro:\n`)
  console.error(`   mkdir ${ORIGEM}\n`)
  process.exit(1)
}

fs.mkdirSync(DESTINO, { recursive: true })

const semAcento = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const slug = (t) => semAcento(t).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Distância aproximada em km entre dois pontos (haversine). */
const distanciaKm = (a, b) => {
  if (!a || !b) return Infinity
  const R = 6371
  const rad = (g) => (g * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLon = rad(b.lon - a.lon)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

const nomeDoLugar = (gps) => {
  if (!gps) return null
  let melhor = null
  let menor = Infinity
  for (const lugar of LUGARES) {
    const d = distanciaKm(gps, lugar)
    if (d < menor) {
      menor = d
      melhor = lugar
    }
  }
  if (menor <= RAIO_KM) return melhor.nome
  return `${gps.lat.toFixed(4)}, ${gps.lon.toFixed(4)}`
}

/** GPS do EXIF vem em [grau, minuto, segundo] + referência N/S/E/W. */
const paraDecimal = (dms, ref) => {
  if (!Array.isArray(dms) || dms.length < 3) return null
  const valor = dms[0] + dms[1] / 60 + dms[2] / 3600
  return ref === 'S' || ref === 'W' ? -valor : valor
}

/**
 * A data que interessa é a hora do relógio de quem tirou a foto — 31 de
 * dezembro às 21h é réveillon, não 1º de janeiro. O exif-reader já desconta o
 * OffsetTimeOriginal da hora lida, então aqui a gente soma de volta e trata o
 * resultado como UTC. Conferido contra o `mdls` nas 73 fotos do lote.
 */
const horaDaParede = (data, offset) => {
  const m = /^([+-])(\d{2}):(\d{2})$/.exec(offset ?? '')
  if (!m) return data // sem offset o exif-reader já devolve a hora da parede
  const minutos = (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]))
  return new Date(data.getTime() - minutos * 60_000)
}

const iso = (d) => d.toISOString().slice(0, 10)

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]
const porExtenso = (d) =>
  `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`

/** '19 a 20 de julho de 2024', mas '26 de maio a 8 de junho de 2024'. */
const intervalo = (a, b) => {
  if (iso(a) === iso(b)) return porExtenso(a)
  const mesmoMes = a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear()
  const inicio = mesmoMes
    ? String(a.getUTCDate())
    : `${a.getUTCDate()} de ${MESES[a.getUTCMonth()]}`
  return `${inicio} a ${porExtenso(b)}`
}

const arquivos = fs
  .readdirSync(ORIGEM)
  .filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f))
  .filter((f) => !IGNORAR.has(path.parse(f).name))

if (!arquivos.length) {
  console.error(`Nenhuma imagem encontrada em "${ORIGEM}".`)
  process.exit(1)
}

// ─── 1. lê o EXIF de tudo antes de converter, para poder nomear por data ───

const lidas = []

for (const arquivo of arquivos) {
  const entrada = path.join(ORIGEM, arquivo)
  let data = null
  let gps = null

  try {
    const meta = await sharp(entrada).metadata()
    if (meta.exif) {
      const e = exifReader(meta.exif)
      const capturada = e.Photo?.DateTimeOriginal ?? e.Image?.DateTime ?? null
      if (capturada) data = horaDaParede(new Date(capturada), e.Photo?.OffsetTimeOriginal)

      const lat = paraDecimal(e.GPSInfo?.GPSLatitude, e.GPSInfo?.GPSLatitudeRef)
      const lon = paraDecimal(e.GPSInfo?.GPSLongitude, e.GPSInfo?.GPSLongitudeRef)
      if (lat != null && lon != null) gps = { lat, lon }
    }
  } catch {
    // sem EXIF legível — segue sem data nem lugar
  }

  lidas.push({ arquivo, entrada, data, gps })
}

// mais antigas primeiro; as sem data vão para o fim
lidas.sort((a, b) => {
  if (a.data && b.data) return a.data - b.data
  if (a.data) return -1
  if (b.data) return 1
  return a.arquivo.localeCompare(b.arquivo)
})

// ─── 2. converte, nomeando por data de captura (AAAA-MM-DD-n.webp) ───

const usados = new Map()
const resultados = []

for (const foto of lidas) {
  const base = foto.data ? iso(foto.data) : slug(path.parse(foto.arquivo).name)
  const n = (usados.get(base) ?? 0) + 1
  usados.set(base, n)
  const nome = foto.data ? `${base}-${n}` : base

  const saida = path.join(DESTINO, `${nome}.webp`)
  const info = await sharp(foto.entrada)
    .rotate() // respeita a orientação do iPhone
    .resize({ width: 1400, height: 1750, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(saida)

  resultados.push({
    ...foto,
    nome,
    src: `fotos/${nome}.webp`,
    largura: info.width,
    altura: info.height,
    horizontal: info.width > info.height,
    kb: Math.round(info.size / 1024),
    lugar: nomeDoLugar(foto.gps),
  })
}

// ─── 3. agrupa em capítulos: corta quando muda muito de data ou de lugar ───

const capitulos = []
for (const foto of resultados) {
  const atual = capitulos.at(-1)
  const anterior = atual?.fotos.at(-1)

  const dias =
    foto.data && anterior?.data
      ? Math.abs(foto.data - anterior.data) / 86_400_000
      : Infinity
  const km = distanciaKm(foto.gps, anterior?.gps)

  const continua = atual && dias <= CORTE_DIAS && km <= CORTE_KM
  if (continua) atual.fotos.push(foto)
  else capitulos.push({ fotos: [foto] })
}

for (const cap of capitulos) {
  const datas = cap.fotos.map((f) => f.data).filter(Boolean)
  cap.lugar = cap.fotos.find((f) => f.lugar)?.lugar ?? null
  cap.inicio = datas[0] ?? null
  cap.fim = datas.at(-1) ?? null
  cap.periodo = cap.inicio ? intervalo(cap.inicio, cap.fim) : 'sem data no arquivo'
}

// ─── 4. relatório ───

console.log(`\n${resultados.length} foto(s) convertida(s) para ${DESTINO}/`)
console.log(`${capitulos.length} capítulo(s) propostos:\n`)

for (const cap of capitulos) {
  console.log(`  ${(cap.lugar ?? '???').padEnd(18)} ${cap.periodo.padEnd(28)} ${cap.fotos.length} foto(s)`)
}

const semData = resultados.filter((r) => !r.data)
const semGps = resultados.filter((r) => !r.gps)
if (semData.length) {
  console.log(`\n${semData.length} sem data: ${semData.map((r) => r.arquivo).join(', ')}`)
  console.log('O EXIF foi removido (típico de foto que passou por WhatsApp/Telegram).')
}
if (semGps.length) {
  console.log(`\n${semGps.length} sem GPS: ${semGps.map((r) => r.arquivo).join(', ')}`)
}

// ─── 5. bloco para colar no content.ts ───

console.log('\n─── cole em galeria.capitulos, no src/content.ts ───\n')
for (const cap of capitulos) {
  const coords = cap.fotos.find((f) => f.gps)?.gps
  console.log(`    {
      // ✏️ GPS ${coords ? `${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)}` : 'ausente'} — confira o nome
      titulo: '${cap.lugar ?? 'TODO: lugar'}',
      periodo: '${cap.periodo}',
      fotos: [`)
  for (const f of cap.fotos) {
    console.log(`        {
          src: '${f.src}',
          data: '${f.data ? iso(f.data) : ''}',
          lugar: '${f.lugar ?? ''}',
          alt: 'TODO: descrição da foto',${f.horizontal ? '\n          destaque: true,' : ''}
        },`)
  }
  console.log(`      ],
    },`)
}
console.log('')
