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
  legenda: string
  alt: string
  /** Foto larga: ocupa a linha inteira da galeria */
  destaque?: boolean
  /** Enquadramento, ex.: 'center 20%' */
  foco?: string
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
    chamada: 'Rosas brancas, laços pretos e a pessoa mais leal que eu conheço fazendo 34.',
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
        titulo: 'Quando eu tive certeza',
        texto:
          'Uma festa que eu tinha organizado pela empresa, no rooftop do meu prédio. Eu deveria estar trabalhando e passei a noite inteira te olhando do outro lado do terraço. Foi ali que eu entendi que era você.',
        // ✏️ se esta foto for de outra noite no rooftop, é só trocar o arquivo
        foto: 'fotos/terraco.webp',
        foco: 'center 38%',
      },
      {
        data: 'O primeiro eu te amo',
        titulo: 'Pôr do sol, bucket hat, sem ensaio',
        texto:
          'A gente estava abraçado vendo o sol cair e eu falei antes de conseguir pensar duas vezes. Não teve preparo nem momento certo: teve você me abraçando e eu sem conseguir segurar mais.',
        // ✏️ a foto do bucket entra aqui: foto: 'fotos/bucket.webp'
      },
      {
        data: 'São Paulo',
        titulo: 'Eu fui a trabalho. Você foi comigo.',
        texto:
          'Era pra ser viagem de trabalho e virou prédio aceso atrás da gente, cerveja em copo pequeno e você posando em qualquer parede que tivesse luz boa. Trabalhar nunca mais foi tão bom.',
        // ✏️ a foto dos dois com os prédios de SP entra aqui
      },
      {
        data: 'Joinville',
        titulo: 'A festa de trabalho que virou viagem favorita',
        texto:
          'Era um evento da tua empresa e virou uma das melhores viagens da minha vida. Descobri que com você até compromisso dos outros vira programa bom.',
        // ✏️ foto de Joinville entra aqui
      },
      {
        data: 'Ano passado',
        titulo: 'O mês em que a gente não foi a gente',
        // ✏️ Se preferir não falar disso na página, é só apagar este bloco inteiro.
        texto:
          'A gente terminou. Durou um mês. Foi tempo suficiente pra eu aprender exatamente o tamanho do buraco que você deixa — e pra gente voltar sabendo o que estava fazendo.',
        foto: 'fotos/rock.webp',
        foco: 'center 45%',
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
    destaque: 'em fotos',
    subtitulo: 'Prova documental de que a felicidade tem cara.',
    // ✏️ Manda mais fotos que eu encaixo — a galeria cresce sozinha.
    // A primeira é horizontal e ocupa a linha inteira; as outras seis fecham
    // duas linhas de três, sem buraco.
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
        alt: 'Vanessa sorrindo ao sol',
        foco: 'center 30%',
      },
      {
        src: 'fotos/careta.webp',
        legenda: 'A cara que ela faz quando eu peço uma foto séria',
        alt: 'Vanessa fazendo careta à noite, com as luzes do bar atrás',
        foco: 'center 42%',
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
      {
        src: 'fotos/cinema.webp',
        legenda: 'Do jeito que ela encosta quando o dia foi longo',
        alt: 'Nós dois juntos, ela com a cabeça no meu ombro',
        foco: '42% 50%',
      },
    ] as Foto[],
  },

  motivos: {
    titulo: '34 coisas que eu amo',
    destaque: 'em você',
    subtitulo: 'Uma pra cada ano. Foi difícil parar em 34.',
    lista: [
      'O "xuxuuuuuuuuuu" que você estica até acabar o ar.',
      'Que você pede água quente toda noite. E não toma nenhuma.',
      'Que você não gosta de dividir os teus doces — e mesmo assim sempre divide comigo.',
      'O jeito que você fica boba feliz, sem disfarçar nem um pouco.',
      'Os teus abraços de quando dá tudo certo.',
      'Que a tua ideia de filme perfeito é um tubarão comendo gente.',
      'E que o teu motivo é "não precisa focar pra assistir". Sincera até no descanso.',
      'Que você encara filme de terror que eu não encaro.',
      'Que você lê de verdade. Não "quer ler": lê.',
      'O orgulho que eu sinto quando falo que a minha namorada é analista financeira.',
      'O quanto você é esforçada — e como você acha que isso é o mínimo.',
      'A tua inteligência, que aparece bem antes da tua vontade de mostrar.',
      'A tua lealdade. Não a de discurso: a de fato, na hora que conta.',
      'Que você se preocupa com quem você ama antes de se preocupar com você.',
      'Que você me incentiva a ser melhor todo dia sem nunca cobrar nada.',
      'A tua teimosia. Um pouco. (Um pouco.)',
      'Que quando você fica brava você silencia — e me ensinou a esperar em vez de insistir.',
      'Que a gente se achou num aplicativo e ainda assim parece sorte demais.',
      'O Dirty Old Man, e o encontro que virou três no mesmo dia.',
      'Que você topou o Freedom, e depois o Glória, sem olhar uma vez pro relógio.',
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
      'O jeito baixinho com que você conta as tuas conquistas, como se fossem pouco.',
      'Que você transforma qualquer lugar em casa — inclusive uma casa que ainda não é nossa.',
      'Que o "a gente ainda não mora junto" é a única linha desta lista que eu quero mudar.',
      'E, principalmente: que você me escolheu. Duas vezes.',
    ],
  },

  carta: {
    titulo: 'Uma carta',
    destaque: 'sem pressa',
    paragrafos: [
      'Eu podia ter comprado um cartão. Escrevi um site.',
      'Não porque é mais fácil — não é —, mas porque cada linha aqui foi uma desculpa pra pensar em você por mais um tempo. E pensar em você é o meu hobby favorito.',
      'A gente se conheceu num aplicativo, Vanessa. Podia ter dado em nada, como dá em nada quase sempre. Deu num drink que virou três lugares na mesma noite, numa festa de trabalho onde eu não consegui trabalhar, numa viagem pra Joinville que eu conto até hoje.',
      'Deu também num mês em que a gente não foi a gente. Eu não vou fingir que aquilo não aconteceu: foi o mês em que eu aprendi, com todas as letras, o tamanho exato da falta que você faz. A gente voltou sabendo. Isso vale mais do que nunca ter saído.',
      'Trinta e quatro anos. Desses, os melhores são os que eu tive a sorte de assistir de perto. Vi você se dedicar de um jeito que quase ninguém se dedica, contar as tuas conquistas baixinho como se fossem pouco, e continuar sendo a pessoa mais leal que eu conheço mesmo nos dias em que ninguém mereceu.',
      'Rosas brancas com laço preto combinam com você: delicadeza com uma borda afiada. O tubarão também — e não só porque "não precisa focar pra assistir".',
      'Obrigado por me incentivar a ser melhor todo santo dia sem nunca cobrar por isso. Que este ano te traga tudo aquilo que você ainda nem sabe que quer. E que eu esteja lá pra ver.',
    ],
    assinatura: 'Com todo o meu amor, teu Tutuba',
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
