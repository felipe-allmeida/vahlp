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

1. Coloque os arquivos em `public/fotos/` (`.webp` de preferência, até ~1400px de largura).
2. Referencie em `src/content.ts` como `'fotos/nome-do-arquivo.webp'`.
3. Se o rosto ficar cortado, ajuste o `foco` da foto (ex.: `foco: 'center 20%'`).
   Marque `destaque: true` numa foto horizontal para ela ocupar a linha inteira da galeria.

## Rodando local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

## Publicando

Criando o repositório e subindo:

```bash
gh repo create trinta-e-quatro --public --source=. --remote=origin --push
```

O deploy vai para o **GitHub Pages** automaticamente a cada push na `main`,
pelo workflow em `.github/workflows/deploy.yml`. Para ativar (só na primeira
vez): **Settings → Pages → Source: GitHub Actions**. O endereço fica em
`https://<usuario>.github.io/trinta-e-quatro/`.

> Repositório público é o que o GitHub Pages exige no plano gratuito — ou seja,
> o código e as fotos ficam visíveis para quem tiver o link do repositório.
> A página em si tem `noindex, nofollow` no `<head>`, então não aparece em
> buscadores, mas isso não a torna privada.

O `vite.config.ts` usa `base: './'` (caminhos relativos), então o build também
funciona em qualquer outra hospedagem estática — Netlify, Vercel, Azure Static
Web Apps — apontando para a pasta `dist/`. Nessas, o repositório pode continuar
privado.
