<template>
  <section id="historia" class="historia">
    <div class="container">
      <h2 class="section-title" v-reveal>
        {{ conteudo.historia.titulo }}
        <span class="gradient-text">{{ conteudo.historia.destaque }}</span>
      </h2>
      <p class="section-subtitle" v-reveal="80">{{ conteudo.historia.subtitulo }}</p>

      <ol class="historia__linha">
        <li
          v-for="(marco, i) in conteudo.historia.marcos"
          :key="marco.titulo"
          class="historia__marco"
          v-reveal="i * 60"
        >
          <span class="historia__ponto" aria-hidden="true" />

          <div class="historia__card">
            <span class="historia__data">{{ marco.data }}</span>
            <h3 class="historia__titulo">{{ marco.titulo }}</h3>
            <p class="historia__texto">{{ marco.texto }}</p>
            <img
              v-if="marco.foto"
              class="historia__foto"
              :src="url(marco.foto)"
              :alt="marco.titulo"
              :style="marco.foco ? { '--foco': marco.foco } : undefined"
              loading="lazy"
            />
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { conteudo } from '../../content'

const url = (caminho: string) => `${import.meta.env.BASE_URL}${caminho}`
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.historia {
  padding: $spacing-xl 0;

  &__linha {
    position: relative;
    max-width: 46rem;
    margin: $spacing-xl auto 0;
    padding-left: $spacing-md;

    &::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      bottom: 0.5rem;
      left: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba($rose, 0.5), rgba($lilac, 0.5), transparent);
    }

    @media (max-width: $tablet) {
      padding-left: $spacing-sm;
    }
  }

  &__marco {
    position: relative;
    padding-bottom: $spacing-lg;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__ponto {
    position: absolute;
    top: 0.65rem;
    left: calc(-1 * #{$spacing-md} - 4px);
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: $grad;
    box-shadow: 0 0 0 5px rgba($rose, 0.12);

    @media (max-width: $tablet) {
      left: calc(-1 * #{$spacing-sm} - 4px);
    }
  }

  &__card {
    padding: $spacing-md;
    border-radius: $radius-xl;
    background: $card;
    border: 1px solid $line;
    transition: background $transition-base, transform $transition-base;

    &:hover {
      background: $card-hover;
      transform: translateY(-3px);
    }

    @media (max-width: $tablet) {
      padding: $spacing-sm;
    }
  }

  &__data {
    font-size: $font-size-xs;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: $rose;
  }

  &__titulo {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: 500;
    margin-top: $spacing-xs;
  }

  &__texto {
    margin-top: $spacing-xs;
    color: $muted;
  }

  &__foto {
    width: 100%;
    margin-top: $spacing-sm;
    border-radius: $radius-lg;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: var(--foco, center 32%);
    max-width: 100%;
  }
}
</style>
