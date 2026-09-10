/**
 * ─────────────────────────────────────────────────────────────
 *  TODO o conteúdo da página vive aqui.
 *  Edite só este arquivo para personalizar tudo.
 *  Os campos marcados com  ✏️  são os que você PRECISA trocar.
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
  legenda: string
  alt: string
  /** Foto larga: ocupa a linha inteira da galeria */
  destaque?: boolean
  /** Enquadramento, ex.: 'center 20%' */
  foco?: string
}

export const conteudo = {
  // ✏️ Nome dela (usado no título da aba, no hero e no final)
  nome: 'Meu Amor',
  // ✏️ Como você a chama no dia a dia (apelido) — aparece na carta
  apelido: 'meu amor',
  idade: 34,

  // ✏️ Aniversário dela (ISO: AAAA-MM-DD). Usado na contagem regressiva.
  aniversario: '2026-09-24',
  // ✏️ Dia em que vocês começaram (ISO: AAAA-MM-DD). Usado no contador ao vivo.
  inicioNamoro: '2019-05-18',

  hero: {
    sobrenome: '', // ✏️ opcional, aparece em fonte menor sob o nome
    chamada: 'Hoje o mundo comemora o melhor que já aconteceu com ele.',
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
    subtitulo: 'Os dias que mudaram tudo — e os que fizeram tudo valer a pena.',
    // ✏️ Troque por marcos de verdade. Pode ter quantos você quiser.
    marcos: [
      {
        data: 'O começo',
        titulo: 'A gente se conheceu',
        texto:
          'Eu não sabia, mas aquele dia comum ia virar a data mais importante do meu calendário.',
      },
      {
        data: 'Primeiro encontro',
        titulo: 'A conversa que não acabava',
        texto:
          'Falamos por horas e ainda ficou a sensação de que faltava assunto. Faltava mesmo: a vida inteira.',
        foto: 'fotos/ceu-02.webp',
        foco: 'center 40%',
      },
      {
        data: 'A gente virou nós',
        titulo: 'Casa, rotina e café da manhã',
        texto:
          'Descobri que amor grande também é coisa pequena: dividir a cama, a louça e o último pedaço.',
        foto: 'fotos/rock.webp',
        foco: 'center 45%',
      },
      {
        data: 'Hoje',
        titulo: 'Os teus 34',
        texto:
          'Mais um ano te vendo ser exatamente quem você é. É o meu lugar favorito no mundo.',
        foto: 'fotos/retrato.webp',
        foco: 'center 30%',
      },
    ] as Marco[],
  },

  galeria: {
    titulo: 'A gente',
    destaque: 'em fotos',
    subtitulo: 'Prova documental de que a felicidade tem cara.',
    fotos: [
      {
        src: 'fotos/rock.webp',
        legenda: 'Rock in Rio particular',
        alt: 'Nós dois de jaqueta de couro na beira do mar',
        destaque: true,
        foco: 'center 40%',
      },
      {
        src: 'fotos/retrato.webp',
        legenda: 'O sorriso que eu escolheria de novo',
        alt: 'Ela sorrindo ao sol',
        foco: 'center 30%',
      },
      {
        src: 'fotos/ceu-01.webp',
        legenda: 'Céu azul e a gente',
        alt: 'Nós dois sob o céu azul',
        foco: 'center 32%',
      },
      {
        src: 'fotos/ceu-02.webp',
        legenda: 'Rindo de nada, como sempre',
        alt: 'Nós dois rindo sob o céu azul',
        foco: 'center 35%',
      },
    ] as Foto[],
  },

  motivos: {
    titulo: '34 coisas que eu amo',
    destaque: 'em você',
    subtitulo: 'Uma pra cada ano. Foi difícil parar em 34.',
    // ✏️ Troque pelas de verdade — é aqui que a página fica ELA.
    lista: [
      'O teu sorriso quando você acha que ninguém está olhando.',
      'A tua risada alta, sem pedir licença.',
      'O jeito que você fica séria quando está concentrada.',
      'Como você lembra dos detalhes que todo mundo esquece.',
      'A tua teimosia quando você sabe que está certa.',
      'O teu abraço de chegada.',
      'Como você canta errado e com convicção.',
      'A tua coragem de recomeçar quantas vezes for preciso.',
      'O jeito que você cuida das pessoas que ama.',
      'Os teus cachos de manhã.',
      'Como você fala dos teus sonhos.',
      'A tua paciência comigo nos dias difíceis.',
      'O teu senso de humor sem filtro.',
      'Como você dança na cozinha.',
      'A tua honestidade, mesmo quando dói.',
      'O jeito que você me olha quando estou falando de trabalho.',
      'A tua capacidade de transformar qualquer lugar em casa.',
      'Como você não desiste das pessoas.',
      'Os teus planos malucos que sempre dão certo.',
      'A tua mania de fotografar tudo.',
      'Como você fica feliz com coisas pequenas.',
      'O teu jeito de pedir desculpa.',
      'A tua força quando tudo desaba.',
      'Como você aprende rápido tudo que te interessa.',
      'O teu carinho com bicho.',
      'A tua playlist impecável.',
      'Como você me faz querer ser melhor sem nunca cobrar.',
      'O teu silêncio confortável.',
      'A tua bagunça organizada.',
      'Como você comemora as minhas vitórias antes de mim.',
      'O teu gosto pra escolher presente.',
      'A tua vontade de conhecer o mundo.',
      'Como você me escuta de verdade.',
      'E, principalmente: que você me escolheu.',
    ],
  },

  carta: {
    titulo: 'Uma carta',
    destaque: 'sem pressa',
    // ✏️ Cada string é um parágrafo. Escreve com o teu jeito — isso vale mais que a página inteira.
    paragrafos: [
      'Eu podia ter comprado um cartão. Escrevi um site.',
      'Não porque é mais fácil — não é —, mas porque cada linha aqui foi uma desculpa pra pensar em você por mais um tempo. E pensar em você é o meu hobby favorito.',
      'Trinta e quatro anos. Desses, os melhores são os que eu tive a sorte de assistir de perto. Vi você crescer, mudar de ideia, quebrar e se remontar mais bonita. Vi você conquistar coisas que ninguém acreditava e comemorar como se fosse pouco.',
      'Obrigado por transformar a minha vida num lugar mais leve. Por rir das minhas piadas ruins. Por segurar a minha mão quando eu nem sabia que precisava.',
      'Que este ano te traga tudo aquilo que você ainda nem sabe que quer. E que eu esteja lá pra ver.',
    ],
    // ✏️ Sua assinatura
    assinatura: 'Com todo o meu amor, Felipe',
  },

  playlist: {
    titulo: 'A trilha sonora',
    destaque: 'da gente',
    subtitulo: 'Aperta o play e finge que a gente está dançando na sala.',
    // ✏️ Cole o link EMBED da playlist/música do Spotify.
    //    No Spotify: ... > Compartilhar > Incorporar > copie o src do iframe.
    //    Deixe string vazia ('') para esconder a seção.
    embed: '',
  },

  final: {
    saudacao: 'Feliz aniversário,',
    mensagem: 'Que venham mais 34. E depois mais 34.',
    botao: 'Clica aqui 💛',
    // ✏️ Mensagem que aparece quando ela clica no botão
    surpresa: 'Eu te amo. Muito. Sempre.',
    rodape: 'Feito à mão, com amor (e um pouco de Vue).',
  },
}

export type Conteudo = typeof conteudo
