<template>
  <section id="galeria" class="galeria">
    <Barbatana />

    <div class="container">
      <h2 class="section-title" v-reveal>
        {{ conteudo.galeria.titulo }}
        <span class="gradient-text">{{ conteudo.galeria.destaque }}</span>
      </h2>
      <p class="section-subtitle" v-reveal="80">{{ conteudo.galeria.subtitulo }}</p>

      <div class="galeria__grid">
        <figure
          v-for="(foto, i) in conteudo.galeria.fotos"
          :key="foto.src"
          class="galeria__item"
          :class="{ 'galeria__item--destaque': foto.destaque }"
          v-reveal="i * 80"
        >
          <img
            :src="url(foto.src)"
            :alt="foto.alt"
            :style="foto.foco ? { '--foco': foto.foco } : undefined"
            loading="lazy"
            @error="esconder"
          />
          <figcaption class="galeria__legenda">{{ foto.legenda }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Barbatana from '../ornamentos/Barbatana.vue'
import { conteudo } from '../../content'

const url = (caminho: string) => `${import.meta.env.BASE_URL}${caminho}`

/** Arquivo faltando não vira ícone quebrado: a foto some da galeria. */
const esconder = (evento: Event) => {
  const img = evento.target as HTMLImageElement
  img.closest('figure')?.remove()
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
    margin-top: $spacing-xl;
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

    // Foto larga (paisagem): ocupa a linha inteira
    &--destaque {
      flex-basis: 100%;
      aspect-ratio: 16 / 9;

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
    font-family: $font-display;
    font-size: $font-size-lg;
    font-style: italic;
    color: $cream;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
  }
}
</style>
