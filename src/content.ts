/**
 * ─────────────────────────────────────────────────────────────
 *  TODO o conteúdo da página vive aqui.
 *  Edite só este arquivo para personalizar tudo.
 *  Os campos marcados com  ✏️  são os que ainda precisam de você.
 * ─────────────────────────────────────────────────────────────
 */

export interface Marco {
  data: string
  titulo: string
  texto: string
  foto?: string
  /** Enquadramento da foto, ex.: 'center 20%' (útil quando o rosto fica cortado) */
  foco?: string
}

export interface Foto {
  src: string
  /** Descrição para leitor de tela — obrigatória */
  alt: string
  /** Data de captura (AAAA-MM-DD), lida do EXIF pelo `npm run fotos` */
  data?: string
  /** Cidade, deduzida do GPS do EXIF */
  lugar?: string
  /**
   * Linha escrita à mão. Sem ela, a foto mostra só a data e o lugar —
   * que é o caso da maioria. Escreva onde valer a pena.
   */
  legenda?: string
  /** Foto larga: ocupa a linha inteira da galeria */
  destaque?: boolean
  /** Enquadramento, ex.: 'center 20%' */
  foco?: string
}

export interface Capitulo {
  titulo: string
  /** Ex.: '31 de dezembro de 2023' ou '27 de maio a 9 de junho de 2024' */
  periodo: string
  /** Uma linha de contexto abaixo do título. Opcional. */
  texto?: string
  fotos: Foto[]
}

export const conteudo = {
  nome: 'Vanessa',
  sobrenomeCompleto: 'Zanatta',
  /** Como ela te chama — assina a carta */
  comoElaMeChama: 'Tutuba',
  idade: 34,

  aniversario: '2026-09-12',
  inicioNamoro: '2023-07-28',

  hero: {
    sobrenome: 'Zanatta',
    chamada: 'Um site de aniversário pro meu xuxu.',
    rolar: 'role pra baixo',
  },

  contador: {
    titulo: 'A gente já tem',
    subtitulo: 'e eu continuo contando cada segundo.',
    legendas: {
      anos: 'anos',
      meses: 'meses',
      dias: 'dias',
      horas: 'horas',
      minutos: 'minutos',
      segundos: 'segundos',
    },
    regressiva: {
      titulo: 'Falta pouco pro dia',
      hoje: 'É hoje. Feliz aniversário! 🎂',
    },
  },

  historia: {
    titulo: 'Nossa história',
    destaque: 'em capítulos',
    subtitulo: 'De um match improvável até aqui — passando pelo mês que quase estragou tudo.',
    marcos: [
      {
        data: '28 de julho de 2023',
        titulo: 'Um match no Tinder',
        texto:
          'A gente se achou num aplicativo, como duas pessoas quaisquer. Não tem nada de romântico nisso — e é exatamente por isso que eu acho que foi sorte demais.',
      },
      {
        data: 'O primeiro encontro',
        titulo: 'Dirty Old Man, Freedom, Glória',
        texto:
          'Marcamos um drink. O drink virou Freedom Pub, o Freedom virou Glória, e nenhum dos dois olhou pro relógio uma vez sequer. Um encontro que virou três no mesmo dia.',
        // ✏️ se aparecer uma foto daquela noite, ela entra aqui
      },
      {
        data: 'A primeira foto',
        titulo: 'A mais antiga que eu tenho da gente',
        texto:
          'Uma mesa de bar, os amigos em volta, a conta no meio e você do outro lado sorrindo. Não tem nada de especial nessa foto — e ela é a mais importante do meu celular, porque é a primeira em que a gente aparece junto.',
        foto: 'fotos/primeira-foto.webp',
        foco: 'center 45%',
      },
      {
        data: 'A festa no rooftop',
        titulo: 'Quando eu tive certeza — e falei',
        texto:
          'Uma festa que eu tinha organizado pela empresa, no rooftop do meu prédio. Eu deveria estar trabalhando e passei a noite inteira te olhando do outro lado do terraço. Foi ali que eu entendi que era você. E foi ali, sem preparo nenhum e sem pensar duas vezes, que eu disse pela primeira vez que te amava.',
        // ✏️ a foto do bucket hat entra aqui: foto: 'fotos/bucket.webp'
      },
      {
        data: 'São Paulo',
        titulo: 'Eu fui a trabalho. Você foi comigo.',
        texto:
          'Era pra ser viagem de trabalho e virou prédio aceso atrás da gente, cerveja em copo pequeno e você posando em qualquer parede que tivesse luz boa. Trabalhar nunca mais foi tão bom.',
        foto: 'fotos/2024-06-07-1.webp',
        foco: 'center 40%',
      },
      {
        data: 'Joinville',
        titulo: 'A festa de trabalho que virou viagem favorita',
        texto:
          'Era um evento da tua empresa e virou uma das melhores viagens da minha vida. Descobri que com você até compromisso dos outros vira programa bom.',
        foto: 'fotos/2024-06-30-2.webp',
        foco: 'center 40%',
      },
      {
        data: 'Ano passado',
        titulo: 'O mês em que a gente não foi a gente',
        // ✏️ Se preferir não falar disso na página, é só apagar este bloco inteiro.
        texto:
          'A gente terminou. Durou um mês. Foi tempo suficiente pra eu aprender exatamente o tamanho do buraco que você deixa — e pra gente voltar sabendo o que estava fazendo.',
      },
      {
        data: 'Hoje',
        titulo: 'Os teus 34',
        texto:
          'Mais um ano te vendo ser exatamente quem você é: esforçada demais, teimosa na medida, leal de um jeito que quase ninguém é.',
        foto: 'fotos/retrato.webp',
        foco: 'center 30%',
      },
    ] as Marco[],
  },

  galeria: {
    titulo: 'A gente',
    destaque: 'em capítulos',
    subtitulo: 'Cada bloco é um lugar e uma época — a data e a cidade vêm do EXIF das próprias fotos.',
    // ✏️ Manda mais fotos que eu encaixo: `npm run fotos` lê a data e o GPS
    //    de cada arquivo e imprime os capítulos prontos pra colar aqui.
    //    As horizontais viram `destaque` e ocupam a linha inteira.
    capitulos: [
      {
        titulo: 'As favoritas',
        periodo: 'sem data no arquivo',
        texto: 'Essas vieram antes do resto e não têm EXIF — o original se perdeu no caminho. São as que eu escolheria primeiro de qualquer jeito.',
        fotos: [
          {
            src: 'fotos/retrato.webp',
            alt: 'Vanessa sorrindo ao sol',
            legenda: 'O sorriso que eu escolheria de novo',
            foco: 'center 30%',
          },
          {
            src: 'fotos/careta.webp',
            alt: 'Vanessa fazendo careta à noite, com as luzes do bar atrás',
            legenda: 'A cara que ela faz quando eu peço uma foto séria',
            foco: 'center 42%',
          },
          {
            src: 'fotos/terraco.webp',
            alt: 'Vanessa tomando cerveja num terraço à noite',
            legenda: 'Cerveja, óculos escuros e zero pressa',
            foco: 'center 38%',
          },
          {
            src: 'fotos/mercado.webp',
            alt: 'Nós dois no mercado segurando garrafas de vinho',
            legenda: 'Três garrafas e nenhuma culpa',
            destaque: true,
            foco: 'center 45%',
          },
          {
            src: 'fotos/cinema.webp',
            alt: 'Nós dois juntos, ela com a cabeça no meu ombro',
            legenda: 'Do jeito que ela encosta quando o dia foi longo',
            foco: '42% 50%',
          },
          {
            src: 'fotos/ceu-02.webp',
            alt: 'Nós dois rindo sob o céu azul',
            legenda: 'Rindo de nada, como sempre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/rosto-colado.webp',
            alt: 'Nós dois de rosto colado à noite',
            legenda: 'Bochecha com bochecha, que é como sempre termina',
            foco: 'center 38%',
          },
        ],
      },
      {
        // GPS -30.0215, -51.1359 — ✏️ confira se o nome do lugar está certo
        titulo: 'Os primeiros meses',
        periodo: '5 de novembro a 9 de dezembro de 2023',
        texto: 'As fotos mais antigas que sobreviveram com data.',
        fotos: [
          {
            src: 'fotos/2023-11-05-1.webp',
            alt: 'Vanessa abraçada a um boneco de neon dentro de um bar',
            data: '2023-11-05',
            lugar: 'Porto Alegre',
            destaque: true,
            foco: 'center 40%',
          },
          {
            src: 'fotos/2023-12-09-1.webp',
            alt: 'Nós dois numa mesa de bar embaixo de um telhado de zinco',
            data: '2023-12-09',
            lugar: 'Porto Alegre',
            destaque: true,
            foco: 'center 45%',
          },
        ],
      },
      {
        // GPS -29.8087, -50.0380 — ✏️ confira se o nome do lugar está certo
        titulo: 'Réveillon em Xangri-Lá',
        periodo: '31 de dezembro de 2023',
        texto: 'O primeiro ano que a gente virou junto.',
        fotos: [
          {
            src: 'fotos/2023-12-31-1.webp',
            alt: 'Vanessa de biquíni e chapéu numa cadeira de praia, com um drink na mão',
            data: '2023-12-31',
            lugar: 'Xangri-Lá',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2023-12-31-3.webp',
            alt: 'Vanessa em pé no quiosque de madeira da praia, com um drink',
            data: '2023-12-31',
            lugar: 'Xangri-Lá',
            foco: 'center 55%',
          },
          {
            src: 'fotos/2023-12-31-4.webp',
            alt: 'Ele carregando ela nas costas na duna, os dois de boné',
            data: '2023-12-31',
            lugar: 'Xangri-Lá',
            foco: 'center 60%',
          },
        ],
      },
      {
        // GPS -30.0377, -51.2221 — ✏️ confira se o nome do lugar está certo
        titulo: 'O verão de 2024',
        periodo: '11 de janeiro a 27 de abril de 2024',
        texto: 'Sem viagem grande, só a vida acontecendo entre Porto Alegre, Canoas e o litoral.',
        fotos: [
          {
            src: 'fotos/2024-01-11-1.webp',
            alt: 'Vanessa numa mesa de restaurante japonês, hashi na mão',
            data: '2024-01-11',
            lugar: 'Canoas',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-02-11-1.webp',
            alt: 'Nós dois dentro do carro, ela mordiscando alguma coisa',
            data: '2024-02-11',
            lugar: 'Balneário Pinhal',
            foco: 'center 45%',
          },
          {
            src: 'fotos/2024-02-17-1.webp',
            alt: 'Nós dois num deque de madeira, ela de vestido vermelho com uma água de coco',
            data: '2024-02-17',
            lugar: 'Porto Alegre',
            destaque: true,
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-02-26-1.webp',
            alt: 'Vanessa de chapéu e casaco de crochê, sorrindo de perto',
            data: '2024-02-26',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2024-04-27-1.webp',
            alt: 'Vanessa na cama com uma taça de vinho tinto, fazendo pose',
            data: '2024-04-27',
            lugar: 'Porto Alegre',
            foco: 'center 45%',
          },
        ],
      },
      {
        // GPS -23.5800, -46.6600 — ✏️ confira se o nome do lugar está certo
        titulo: 'São Paulo',
        periodo: '27 de maio a 9 de junho de 2024',
        texto: 'A viagem de trabalho que virou viagem.',
        fotos: [
          {
            src: 'fotos/2024-05-27-1.webp',
            alt: 'Vanessa numa lanchonete de banco vermelho, com um suco de laranja',
            data: '2024-05-27',
            lugar: 'São Paulo',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-05-30-1.webp',
            alt: 'Vanessa de jaqueta jeans num parque, olhando o celular',
            data: '2024-05-30',
            lugar: 'São Paulo',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-06-02-1.webp',
            alt: 'Vanessa tomando cerveja num bar de parede de tijolos',
            data: '2024-06-02',
            lugar: 'São Paulo',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-06-02-2.webp',
            alt: 'Vanessa bebendo de copo alto, jaqueta jeans caída no ombro',
            data: '2024-06-02',
            lugar: 'São Paulo',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2024-06-02-3.webp',
            alt: 'Nós dois abraçados no bar, ela rindo',
            data: '2024-06-02',
            lugar: 'São Paulo',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-06-02-4.webp',
            alt: 'Vanessa numa escada inteira iluminada de vermelho',
            data: '2024-06-02',
            lugar: 'São Paulo',
            foco: 'center 45%',
          },
          {
            src: 'fotos/2024-06-07-1.webp',
            alt: 'Nós dois à noite, ele beijando o rosto dela, com os prédios acesos atrás',
            data: '2024-06-07',
            lugar: 'São Paulo',
            legenda: 'Prédio aceso atrás da gente — foi essa noite',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-06-09-1.webp',
            alt: 'Vanessa numa mesa de restaurante, com as sobremesas na frente',
            data: '2024-06-09',
            lugar: 'São Paulo',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-06-09-2.webp',
            alt: 'Vanessa comendo a sobremesa de colher',
            data: '2024-06-09',
            lugar: 'São Paulo',
            foco: 'center 38%',
          },
        ],
      },
      {
        // GPS -27.5981, -48.4989 — ✏️ confira se o nome do lugar está certo
        titulo: 'Florianópolis, na volta',
        periodo: '9 de junho de 2024',
        fotos: [
          {
            src: 'fotos/2024-06-09-3.webp',
            alt: 'Nós dois numa selfie na rua, ele de boné vermelho e óculos escuros',
            data: '2024-06-09',
            lugar: 'Florianópolis',
            foco: 'center 40%',
          },
        ],
      },
      {
        // GPS -26.2131, -49.2946 — ✏️ confira se o nome do lugar está certo
        titulo: 'Joinville',
        periodo: '29 a 30 de junho de 2024',
        texto: 'A festa de trabalho da empresa dela que virou uma das melhores viagens da minha vida. Teve bingo.',
        fotos: [
          {
            src: 'fotos/2024-06-29-1.webp',
            alt: 'Uma cartela de bingo marcada de verde',
            data: '2024-06-29',
            lugar: 'Joinville',
            legenda: 'O bingo. A gente levou a sério.',
            foco: 'center 50%',
          },
          {
            src: 'fotos/2024-06-29-2.webp',
            alt: 'Outra cartela de bingo, quase completa',
            data: '2024-06-29',
            lugar: 'Joinville',
            foco: 'center 50%',
          },
          {
            src: 'fotos/2024-06-30-1.webp',
            alt: 'Um eucaliptal visto de baixo, contra o céu azul',
            data: '2024-06-30',
            lugar: 'Joinville',
            foco: 'center 50%',
          },
          {
            src: 'fotos/2024-06-30-2.webp',
            alt: 'Vanessa no meio do mato, de casaco cinza',
            data: '2024-06-30',
            lugar: 'Joinville',
            foco: 'center 40%',
          },
        ],
      },
      {
        // GPS -30.0377, -51.2221 — ✏️ confira se o nome do lugar está certo
        titulo: 'O inverno de 2024',
        periodo: '6 de julho a 17 de agosto de 2024',
        fotos: [
          {
            src: 'fotos/2024-07-06-1.webp',
            alt: 'Vanessa numa mesa de bar com as mãos na cabeça',
            data: '2024-07-06',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-07-06-2.webp',
            alt: 'Vanessa erguendo uma taça de vinho tinto',
            data: '2024-07-06',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-07-20-1.webp',
            alt: 'Vanessa fazendo dois vs e mostrando a língua, com gente atrás',
            data: '2024-07-20',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2024-07-20-2.webp',
            alt: 'Vanessa descendo um caminho de pedra à noite',
            data: '2024-07-20',
            lugar: 'Porto Alegre',
            foco: 'center 50%',
          },
          {
            src: 'fotos/2024-07-21-1.webp',
            alt: 'Vanessa rindo ao lado de um patinete na rua',
            data: '2024-07-21',
            lugar: 'Porto Alegre',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-08-10-1.webp',
            alt: 'Nós e os amigos embaixo das luzinhas',
            data: '2024-08-10',
            lugar: 'Porto Alegre',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-08-10-3.webp',
            alt: 'Os quatro na saída, na frente do portão',
            data: '2024-08-10',
            lugar: 'Porto Alegre',
            foco: 'center 45%',
          },
          {
            src: 'fotos/2024-08-17-1.webp',
            alt: 'Vanessa no hall do prédio com uma garrafa de vinho na mão',
            data: '2024-08-17',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
        ],
      },
      {
        // GPS -29.9846, -51.1235 — ✏️ confira se o nome do lugar está certo
        titulo: 'Na casa dela, no Sarandi',
        periodo: '8 de setembro de 2024',
        texto: 'Uma noite inteira num rolo só de foto.',
        fotos: [
          {
            src: 'fotos/2024-09-08-1.webp',
            alt: 'Selfie de família, todo mundo espremido no quadro',
            data: '2024-09-08',
            lugar: 'Porto Alegre',
            destaque: true,
            foco: 'center 50%',
          },
          {
            src: 'fotos/2024-09-08-3.webp',
            alt: 'Ele carregando ela no colo na cozinha, taça de vinho na mão',
            data: '2024-09-08',
            lugar: 'Porto Alegre',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-09-08-4.webp',
            alt: 'Vanessa brindando com uma taça de vinho',
            data: '2024-09-08',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2024-09-08-5.webp',
            alt: 'Duas delas de rosto colado, taças na mão',
            data: '2024-09-08',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2024-09-08-6.webp',
            alt: 'Vanessa entre duas mulheres da família, taça na mão',
            data: '2024-09-08',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
        ],
      },
      {
        // GPS -30.0258, -51.1630 — ✏️ confira se o nome do lugar está certo
        titulo: 'O fim de 2024',
        periodo: '14 de setembro a 14 de novembro de 2024',
        fotos: [
          {
            src: 'fotos/2024-09-14-1.webp',
            alt: 'Vanessa apresentando um drink na mesa do restaurante',
            data: '2024-09-14',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2024-10-20-1.webp',
            alt: 'Vanessa de chapéu numa loja de óculos, parede amarela atrás',
            data: '2024-10-20',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2024-11-03-1.webp',
            alt: 'Nós dois fantasiados: ele de máscara de porco, ela com um facão',
            data: '2024-11-03',
            lugar: 'Porto Alegre',
            legenda: 'O terror também é hobby dela',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-11-03-2.webp',
            alt: 'As mesmas fantasias, outra pose na escada',
            data: '2024-11-03',
            lugar: 'Porto Alegre',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2024-11-14-1.webp',
            alt: 'Vanessa numa mesa de café, com cerveja e pão de queijo na bandeja',
            data: '2024-11-14',
            foco: 'center 40%',
          },
        ],
      },
      {
        // GPS -30.0377, -51.2221 — ✏️ confira se o nome do lugar está certo
        titulo: '2025',
        periodo: '19 de abril a 20 de novembro de 2025',
        texto: 'O ano inteiro em dez fotos. O buraco entre novembro de 2024 e abril fala por si.',
        fotos: [
          {
            src: 'fotos/2025-04-19-1.webp',
            alt: 'Nós dois num bar, ele de chapéu preto e ela de verde',
            data: '2025-04-19',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
          {
            src: 'fotos/2025-05-01-1.webp',
            alt: 'Selfie no espelho, os dois de touca',
            data: '2025-05-01',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2025-05-30-1.webp',
            alt: 'Vanessa deitada com o cachorro do lado do rosto',
            data: '2025-05-30',
            lugar: 'Porto Alegre',
            legenda: 'Os dois com a mesma cara',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2025-06-22-1.webp',
            alt: 'Vanessa de perto, mostrando a língua',
            data: '2025-06-22',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2025-06-22-2.webp',
            alt: 'Vanessa de moletom cinza, posando na sala',
            data: '2025-06-22',
            lugar: 'Porto Alegre',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2025-07-27-1.webp',
            alt: 'Vanessa de jaqueta jeans mandando os dois dedos',
            data: '2025-07-27',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2025-08-16-1.webp',
            alt: 'Selfie dos dois, ele de gorro roxo e ela de língua para fora',
            data: '2025-08-16',
            lugar: 'Porto Alegre',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2025-08-23-1.webp',
            alt: 'Nós dois arrumados, ela chutando o ar e ele de terno',
            data: '2025-08-23',
            lugar: 'Porto Alegre',
            foco: 'center 45%',
          },
          {
            src: 'fotos/2025-11-20-1.webp',
            alt: 'Nós dois de rosto colado na rua, com o prédio aceso atrás',
            data: '2025-11-20',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
        ],
      },
      {
        // GPS -29.9557, -50.9216 — ✏️ confira se o nome do lugar está certo
        titulo: 'A virada de 2026',
        periodo: '1 de janeiro a 16 de março de 2026',
        fotos: [
          {
            src: 'fotos/beijo.webp',
            alt: 'Nós dois nos beijando numa festa, sob luzinhas',
            data: '2026-01-01',
            lugar: 'Taquara',
            legenda: 'Essa é a minha favorita',
            foco: 'center 45%',
          },
          {
            src: 'fotos/luz-vermelha.webp',
            alt: 'Vanessa apoiada na mesa sob uma luz vermelha',
            data: '2026-03-16',
            lugar: 'Porto Alegre',
            legenda: 'Ela e a luz vermelha do bar',
            foco: 'center 35%',
          },
        ],
      },
      {
        // GPS -28.1150, -48.6520 — ✏️ confira se o nome do lugar está certo
        titulo: 'Praia do Rosa',
        periodo: '25 a 26 de abril de 2026',
        texto: 'Dois dias em Santa Catarina, metade deles à mesa.',
        fotos: [
          {
            src: 'fotos/2026-04-25-1.webp',
            alt: 'Vanessa de braços para o alto na frente de um painel colorido',
            data: '2026-04-25',
            lugar: 'Praia do Rosa',
            foco: 'center 35%',
          },
          {
            src: 'fotos/2026-04-25-2.webp',
            alt: 'Um porta-retrato e um chocolate em cima da mesa de madeira',
            data: '2026-04-25',
            lugar: 'Praia do Rosa',
            foco: 'center 50%',
          },
          {
            src: 'fotos/pier.webp',
            alt: 'Vanessa em pé num píer de madeira, com a água e as montanhas atrás',
            data: '2026-04-25',
            lugar: 'Praia do Rosa',
            legenda: 'Camiseta gigante, caneca na mão, dia bom',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2026-04-25-3.webp',
            alt: 'Vanessa comendo um pastel no bar da praia',
            data: '2026-04-25',
            lugar: 'Praia do Rosa',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2026-04-26-1.webp',
            alt: 'Um waffle com morango e calda de chocolate',
            data: '2026-04-26',
            lugar: 'Praia do Rosa',
            foco: 'center 50%',
          },
          {
            src: 'fotos/2026-04-26-2.webp',
            alt: 'Uma sobremesa de morango servida numa tábua',
            data: '2026-04-26',
            lugar: 'Praia do Rosa',
            foco: 'center 50%',
          },
          {
            src: 'fotos/2026-04-26-3.webp',
            alt: 'Vanessa de moletom e óculos escuros, no celular',
            data: '2026-04-26',
            lugar: 'Tubarão',
            foco: 'center 40%',
          },
        ],
      },
      {
        // GPS -29.9847, -51.1240 — ✏️ confira se o nome do lugar está certo
        titulo: 'O ano até aqui',
        periodo: '7 de junho a 23 de agosto de 2026',
        fotos: [
          {
            src: 'fotos/2026-06-07-1.webp',
            alt: 'Um grupo fazendo chifrinho para a câmera',
            data: '2026-06-07',
            lugar: 'Porto Alegre',
            foco: 'center 40%',
          },
          {
            src: 'fotos/2026-08-09-1.webp',
            alt: 'Vanessa tomando um cappuccino num pátio verde',
            data: '2026-08-09',
            lugar: 'Porto Alegre',
            foco: 'center 38%',
          },
          {
            src: 'fotos/ceu-01.webp',
            alt: 'Nós dois sob o céu azul',
            data: '2026-08-23',
            lugar: 'Porto Alegre',
            legenda: 'Céu azul e a gente',
            foco: 'center 32%',
          },
        ],
      },
    ] as Capitulo[],
  },

  motivos: {
    titulo: '34 coisas que eu amo',
    destaque: 'em você',
    subtitulo: 'Uma pra cada ano. Foi difícil parar em 34.',
    lista: [
      'O "xuxuuuuuuuuuu" que você estica até acabar o ar.',
      'Que você pede água quente toda noite. E não toma nenhuma.',
      'O jeito que você fica boba feliz, sem disfarçar nem um pouco.',
      'Os teus abraços de quando dá tudo certo.',
      'Que a tua ideia de filme perfeito é um tubarão comendo gente.',
      'E que o teu motivo é "não precisa focar pra assistir". Sincera até no descanso.',
      'Que você ama ler.',
      'O orgulho que eu sinto do quanto você é inteligente.',
      'O quanto você é esforçada — e como você acha que isso é o mínimo.',
      'A tua lealdade. Não a de discurso: a de fato, na hora que conta.',
      'Que você se preocupa com quem você ama antes de se preocupar com você.',
      'Que você me incentiva a ser melhor todo dia sem nunca cobrar nada.',
      'A tua teimosia. Um pouco. (Um pouco.)',
      'Que quando você fica brava você silencia — e me ensinou a esperar em vez de insistir.',
      'Que a gente se achou num aplicativo e ainda assim parece sorte demais.',
      'O Dirty Old Man, que virou Freedom e depois Glória — um encontro que virou três no mesmo dia, sem ninguém olhar pro relógio.',
      'Aquela festa no rooftop, onde eu devia estar trabalhando e só consegui te olhar.',
      'Joinville: festa de trabalho da tua empresa e uma das melhores viagens da minha vida.',
      'Que a gente canta Pump It no carro como se fosse a nossa música. É.',
      'E no karaokê também, sem vergonha nenhuma.',
      'Jungle tocando quando você está de bom humor.',
      'O Kampeki, em Canoas, que já é mais nosso do que de qualquer outra pessoa.',
      'Que você foi pra uma festa a fantasia com um crachá da EVILCORP no peito.',
      'Que você me chama de Tutuba e mais ninguém no mundo faz isso.',
      'Que a gente passou um mês separado ano passado e voltou melhor do que era.',
      'Que eu tive trinta dias pra descobrir como é sem você. Não quero repetir.',
      'Que você transforma qualquer lugar em casa — inclusive uma casa que ainda não é nossa.',
      'Que o "a gente ainda não mora junto" é a única linha desta lista que eu quero mudar.',
      'E, principalmente: que você me escolheu. Duas vezes.',
    ],
  },

  mashup: {
    titulo: 'O mundo',
    destaque: 'da Vanessa',
    subtitulo: 'Um resumo pouco científico das coisas que fazem ela feliz.',
    // ✏️ o que faltar aqui, é só acrescentar um item
    itens: [
      {
        titulo: 'Tubarões',
        texto: 'Todos os filmes. Sem exceção e sem critério — porque não precisa focar pra assistir.',
      },
      {
        titulo: 'Terror',
        texto: 'Quanto pior a crítica, melhor a sexta-feira.',
      },
      {
        titulo: 'Jungle',
        texto: 'A trilha oficial do bom humor dela.',
      },
      {
        titulo: 'Kampeki',
        texto: 'Em Canoas. Já é mais nosso do que de qualquer outra pessoa.',
      },
      {
        titulo: 'Vinho tinto',
        texto: 'De preferência três garrafas. De preferência sem motivo nenhum.',
      },
      {
        titulo: 'Livros',
        texto: 'Ela não "quer ler". Ela lê.',
      },
      {
        titulo: 'Água quente',
        texto: 'Pedida toda noite. Tomada nunca.',
      },
      {
        titulo: 'Doce',
        texto: 'Não divide com ninguém. Divide comigo.',
      },
    ],
  },

  playlist: {
    titulo: 'A trilha sonora',
    destaque: 'da gente',
    subtitulo: 'Aperta o play e finge que a gente está no carro, no volume errado.',
    // ✏️ Cole aqui o link EMBED do Pump It (ou de uma playlist de vocês).
    //    No Spotify: música > ... > Compartilhar > Incorporar > copie a URL de dentro do src="".
    //    Fica no formato https://open.spotify.com/embed/track/XXXXXXXXXXXX
    //    Enquanto estiver vazio, a seção inteira não aparece.
    embed: '',
  },

  final: {
    saudacao: 'Feliz aniversário,',
    mensagem: 'Que venham mais 34. E depois mais 34.',
    botao: 'Clica aqui 🤍',
    surpresa: 'Eu te amo ontem, hoje e pra sempre. Obrigado por tornar todos os meus dias mais felizes.',
    rodape: 'Feito à mão, com amor (e um pouco de Vue).',
  },
}

export type Conteudo = typeof conteudo
