# 🎂 Landing page de aniversário

Uma página feita à mão para comemorar os 34 anos dela.

Vue 3 + TypeScript + Vite + SCSS. Sem dependências de runtime além do Vue.

## Como editar

**Todo o conteúdo da página está em um único arquivo: [`src/content.ts`](src/content.ts).**
Não é preciso mexer em nenhum componente para personalizar a página — nome, datas,
timeline, motivos, carta, legendas das fotos e mensagens finais estão todos lá,
com os campos obrigatórios marcados com ✏️.

Os campos mais importantes:

| Campo | O que faz |
| --- | --- |
| `nome` | Nome dela — aparece no hero, no título da aba e no final |
| `aniversario` | Data do aniversário (`AAAA-MM-DD`) — alimenta a contagem regressiva |
| `inicioNamoro` | Quando vocês começaram (`AAAA-MM-DD`) — alimenta o contador ao vivo |
| `historia.marcos` | Os capítulos da timeline |
| `motivos.lista` | As 34 coisas — uma pra cada ano |
| `carta.paragrafos` | A carta (cada string é um parágrafo) |
| `playlist.embed` | URL de embed do Spotify. Vazio (`''`) esconde a seção |

### Trocar as fotos

Coloque os arquivos **originais** do iPhone em `fotos-vah/` e rode:

```bash
npm run fotos
```

O script converte tudo para `.webp` em `public/fotos/`, lê **data e GPS** no EXIF,
nomeia cada arquivo pela data de captura (`2024-06-30-1.webp`), agrupa as fotos
em capítulos por lugar e época, e imprime um bloco pronto para colar em
`galeria.capitulos`, no `src/content.ts`.

Detalhes que importam:

- **Use o original.** Foto que passou por WhatsApp ou Telegram perde o EXIF, e aí
  não tem data nem lugar — ela vai para o fim da lista.
- **Os nomes dos lugares são um chute** feito a partir das coordenadas, com a
  tabela `LUGARES` no topo do script. Cada capítulo sai com o GPS num comentário
  para você conferir e renomear. Nada é enviado para fora da sua máquina.
- **A lista `IGNORAR`**, também no topo do script, é o que não deve ser importado:
  fotos que já estão no site com outro nome e quadros repetidos de rajada.
- Se o rosto ficar cortado, ajuste o `foco` da foto (ex.: `foco: 'center 20%'`).
  As horizontais viram `destaque: true` e ocupam a linha inteira da galeria.
- A `legenda` é **opcional**. Sem ela, a foto mostra só data e lugar
  (`30 de junho de 2024 · Joinville`). Escreva onde valer a pena.

## Rodando local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

## Publicando

Subindo para o repositório:

```bash
git remote add origin https://github.com/felipe-allmeida/vahlp.git
git push -u origin main
```

O deploy vai para o **GitHub Pages** automaticamente a cada push na `main`,
pelo workflow em `.github/workflows/deploy.yml`. Para ativar (só na primeira
vez): **Settings → Pages → Source: GitHub Actions**. O endereço fica em
`https://felipe-allmeida.github.io/vahlp/`.

> Repositório público é o que o GitHub Pages exige no plano gratuito — ou seja,
> o código e as fotos ficam visíveis para quem tiver o link do repositório.
> A página em si tem `noindex, nofollow` no `<head>`, então não aparece em
> buscadores, mas isso não a torna privada.

O `vite.config.ts` usa `base: './'` (caminhos relativos), então o build também
funciona em qualquer outra hospedagem estática — Netlify, Vercel, Azure Static
Web Apps — apontando para a pasta `dist/`. Nessas, o repositório pode continuar
privado.

## O que ainda espera foto

| Capítulo da história | O que falta |
| --- | --- |
| A festa no rooftop | a foto do bucket hat — a da certeza e do primeiro "eu te amo" |
| O primeiro encontro | qualquer foto da noite do Dirty Old Man, se existir |

Basta jogar o arquivo em `fotos-vah/`, rodar `npm run fotos` e apontar o `foto:`
do marco correspondente em `historia.marcos`.

Se um arquivo referenciado no `content.ts` não existir, a imagem some da
página em vez de virar ícone quebrado.
