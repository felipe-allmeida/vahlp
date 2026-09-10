<template>
  <section id="galeria" class="galeria">
    <Barbatana />

    <div class="container">
      <h2 class="section-title" v-reveal>
        {{ conteudo.galeria.titulo }}
        <span class="gradient-text">{{ conteudo.galeria.destaque }}</span>
      </h2>
      <p class="section-subtitle" v-reveal="80">{{ conteudo.galeria.subtitulo }}</p>

      <article
        v-for="capitulo in capitulos"
        :key="capitulo.titulo + capitulo.periodo"
        class="capitulo"
      >
        <header class="capitulo__cabecalho" v-reveal>
          <p class="capitulo__periodo">{{ capitulo.periodo }}</p>
          <h3 class="capitulo__titulo">{{ capitulo.titulo }}</h3>
          <p v-if="capitulo.texto" class="capitulo__texto">{{ capitulo.texto }}</p>
        </header>

        <div class="galeria__grid">
          <figure
            v-for="(foto, i) in capitulo.fotos"
            :key="foto.src"
            class="galeria__item"
            :class="{ 'galeria__item--destaque': foto.destaque }"
            v-reveal="i * 60"
          >
            <img
              :src="url(foto.src)"
              :alt="foto.alt"
              :style="foto.foco ? { '--foco': foto.foco } : undefined"
              loading="lazy"
              @error="esconder"
            />
            <figcaption class="galeria__legenda">
              <span v-if="foto.legenda" class="galeria__frase">{{ foto.legenda }}</span>
              <span v-if="etiqueta(foto)" class="galeria__etiqueta">{{ etiqueta(foto) }}</span>
            </figcaption>
          </figure>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Barbatana from '../ornamentos/Barbatana.vue'
import { conteudo, type Foto } from '../../content'

const url = (caminho: string) => `${import.meta.env.BASE_URL}${caminho}`

/**
 * Cópia reativa dos capítulos: quando um arquivo some, a foto sai daqui em vez
 * de o DOM ser mexido na mão — mexer no DOM por baixo do Vue quebra a lista.
 */
const capitulos = ref(
  conteudo.galeria.capitulos.map((c) => ({ ...c, fotos: [...c.fotos] })),
)

/**
 * A data vem como 'AAAA-MM-DD' e o Date interpreta isso como meia-noite UTC.
 * Formatar em UTC evita que 1º de janeiro vire 31 de dezembro no fuso daqui.
 */
const formatador = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** '25 de abril de 2026 · Praia do Rosa' — o que a foto tiver dos dois. */
const etiqueta = (foto: Foto) =>
  [foto.data ? formatador.format(new Date(foto.data)) : null, foto.lugar]
    .filter(Boolean)
    .join(' · ')

/** Arquivo faltando não vira ícone quebrado: a foto some da galeria. */
const esconder = (evento: Event) => {
  const src = (evento.target as HTMLImageElement).getAttribute('src')
  for (const capitulo of capitulos.value) {
    capitulo.fotos = capitulo.fotos.filter((f) => url(f.src) !== src)
  }
}
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.galeria {
  position: relative;
  padding: $spacing-xl 0;
  overflow: hidden;

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $spacing-sm;
  }

  &__item {
    position: relative;
    overflow: hidden;
    border-radius: $radius-xl;
    border: 1px solid $line;
    margin: 0;
    aspect-ratio: 3 / 4;
    // três por linha, descontando os dois gaps
    flex: 0 1 calc((100% - #{$spacing-sm} * 2) / 3);

    @media (max-width: $tablet) {
      flex-basis: 100%;
    }

    // Foto larga (paisagem): ocupa a linha inteira.
    // 3/2 e não 16/9 porque o iPhone tira em 4/3 — a faixa mais larga cortava
    // um quarto da altura e comia rosto nas fotos de grupo.
    &--destaque {
      flex-basis: 100%;
      aspect-ratio: 3 / 2;

      @media (max-width: $tablet) {
        aspect-ratio: 4 / 3;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: var(--foco, center 35%);
      transition: transform $transition-slow, filter $transition-slow;
      filter: saturate(0.9);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba($ink, 0.85) 0%, transparent 55%);
      opacity: 0.85;
      transition: opacity $transition-base;
    }

    &:hover img {
      transform: scale(1.06);
      filter: saturate(1.05);
    }

    &:hover::after {
      opacity: 1;
    }
  }

  &__legenda {
    position: absolute;
    z-index: 1;
    left: $spacing-sm;
    right: $spacing-sm;
    bottom: $spacing-sm;
    display: flex;
    flex-direction: column;
    gap: 0.15em;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
  }

  &__frase {
    font-family: $font-display;
    font-size: $font-size-lg;
    font-style: italic;
    color: $cream;
  }

  &__etiqueta {
    font-size: $font-size-sm;
    letter-spacing: 0.04em;
    color: rgba($cream, 0.72);
  }
}

.capitulo {
  margin-top: $spacing-xl;

  &__cabecalho {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2em;
    margin-bottom: $spacing-lg;
    text-align: center;
  }

  // mesma pauta da data na linha do tempo, pra galeria e história rimarem
  &__periodo {
    margin: 0;
    font-size: $font-size-xs;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: $petal;
  }

  &__titulo {
    margin: 0;
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: 400;
  }

  &__texto {
    max-width: 46ch;
    margin: 0.4em 0 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    opacity: 0.75;
  }
}
</style>
