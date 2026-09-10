/**
 * Importa fotos originais para o projeto.
 *
 *   1. coloque os arquivos ORIGINAIS (direto do iPhone) em  originais/
 *   2. rode  npm run fotos
 *
 * O script converte tudo para webp otimizado em public/fotos/, lê a data de
 * captura no EXIF e imprime um bloco pronto para colar no src/content.ts,
 * já ordenado da foto mais antiga para a mais nova.
 *
 * Importante: fotos que passam por apps de mensagem costumam perder o EXIF.
 * Use os arquivos originais (AirDrop, cabo, ou "Exportar original" no Fotos)
 * se quiser as datas.
 */
import sharp from 'sharp'
import exifReader from 'exif-reader'
import fs from 'node:fs'
import path from 'node:path'

const ORIGEM = process.argv[2] || 'originais'
const DESTINO = 'public/fotos'

if (!fs.existsSync(ORIGEM)) {
  console.error(`\nPasta "${ORIGEM}" não existe. Crie ela e ponha as fotos lá dentro:\n`)
  console.error(`   mkdir ${ORIGEM}\n`)
  process.exit(1)
}

fs.mkdirSync(DESTINO, { recursive: true })

const semAcento = (t) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const arquivos = fs
  .readdirSync(ORIGEM)
  .filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f))

if (!arquivos.length) {
  console.error(`Nenhuma imagem encontrada em "${ORIGEM}".`)
  process.exit(1)
}

const resultados = []

for (const arquivo of arquivos) {
  const entrada = path.join(ORIGEM, arquivo)
  const nome = semAcento(path.parse(arquivo).name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const saida = path.join(DESTINO, `${nome}.webp`)

  let capturada = null
  try {
    const meta = await sharp(entrada).metadata()
    if (meta.exif) {
      const e = exifReader(meta.exif)
      capturada = e.Photo?.DateTimeOriginal ?? e.Image?.DateTime ?? null
    }
  } catch {
    // sem EXIF legível — segue sem data
  }

  const info = await sharp(entrada)
    .rotate() // respeita a orientação do iPhone
    .resize({ width: 1400, height: 1750, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(saida)

  resultados.push({
    nome,
    arquivo: `fotos/${nome}.webp`,
    largura: info.width,
    altura: info.height,
    horizontal: info.width > info.height,
    kb: Math.round(info.size / 1024),
    data: capturada ? new Date(capturada) : null,
  })
}

// mais antigas primeiro; as sem data vão para o fim
resultados.sort((a, b) => {
  if (a.data && b.data) return a.data - b.data
  if (a.data) return -1
  if (b.data) return 1
  return a.nome.localeCompare(b.nome)
})

const formatar = (d) =>
  d
    ? d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'sem data no arquivo'

console.log(`\n${resultados.length} foto(s) convertida(s) para ${DESTINO}/\n`)
console.log('ordem cronológica:')
for (const r of resultados) {
  const forma = r.horizontal ? 'horizontal' : 'vertical  '
  console.log(`  ${formatar(r.data).padEnd(24)} ${forma}  ${r.kb}KB  ${r.nome}`)
}

const semData = resultados.filter((r) => !r.data).length
if (semData) {
  console.log(
    `\n${semData} foto(s) sem data: o EXIF foi removido (típico de foto que passou por WhatsApp/Telegram).`
  )
  console.log('Reexporte o original se quiser a data.')
}

console.log('\n─── cole em galeria.fotos, no src/content.ts ───\n')
for (const r of resultados) {
  console.log(`      {
        src: '${r.arquivo}',
        legenda: '${r.data ? formatar(r.data) : 'TODO: legenda'}',
        alt: 'TODO: descrição da foto',${r.horizontal ? '\n        destaque: true,' : ''}
        foco: 'center 35%',
      },`)
}
console.log('')
