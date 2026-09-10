<template>
  <section id="mashup" class="mashup">
    <!-- cardume atravessando a seção, em camadas -->
    <div class="mashup__cardume" aria-hidden="true">
      <Tubarao
        v-for="peixe in cardume"
        :key="peixe.id"
        class="mashup__peixe"
        :largura="peixe.largura"
        :style="peixe.estilo"
      />
    </div>

    <div class="container mashup__conteudo">
      <h2 class="section-title" v-reveal>
        {{ conteudo.mashup.titulo }}
        <span class="gradient-text">{{ conteudo.mashup.destaque }}</span>
      </h2>
      <p class="section-subtitle" v-reveal="80">{{ conteudo.mashup.subtitulo }}</p>

      <ul class="mashup__mural">
        <li
          v-for="(item, i) in conteudo.mashup.itens"
          :key="item.titulo"
          class="mashup__card"
          :style="{ '--giro': `${giros[i % giros.length]}deg` }"
          v-reveal="(i % 4) * 70"
        >
          <h3 class="mashup__titulo">{{ item.titulo }}</h3>
          <p class="mashup__texto">{{ item.texto }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Tubarao from '../ornamentos/Tubarao.vue'
import { conteudo } from '../../content'

// inclinações fixas: aleatório de verdade faria cada recarga mudar o layout
const giros = [-2.4, 1.8, -1.2, 2.6, -1.8, 1.2, -2.8, 2]

interface Peixe {
  id: number
  largura: number
  estilo: CSSProperties
}

// alguns grandes e lentos na frente, vários pequenos e rápidos ao fundo
const cardume: Peixe[] = [
  { t: 6, l: 210, d: 32, o: 0.26 },
  { t: 24, l: 96, d: 21, o: 0.16 },
  { t: 42, l: 145, d: 27, o: 0.22 },
  { t: 58, l: 74, d: 18, o: 0.14 },
  { t: 74, l: 170, d: 30, o: 0.2 },
  { t: 90, l: 110, d: 24, o: 0.17 },
].map((p, i) => ({
  id: i,
  largura: p.l,
  estilo: {
    top: `${p.t}%`,
    opacity: String(p.o),
    animationDuration: `${p.d}s`,
    animationDelay: `${-i * 4.5}s`,
  },
}))
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.mashup {
  position: relative;
  padding: $spacing-xl 0;
  overflow: hidden;

  &__cardume {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__peixe {
    position: absolute;
    left: -22%;
    color: $shark;
    animation-name: atravessar;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &__conteudo {
    position: relative;
    z-index: 1;
  }

  &__mural {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-sm;
    margin-top: $spacing-xl;

    @media (max-width: $desktop) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    padding: $spacing-md $spacing-sm;
    border-radius: $radius-lg;
    border: 1px solid $line;
    background: rgba($ink-2, 0.82);
    backdrop-filter: blur(6px);
    transform: rotate(var(--giro, 0deg));
    transition: transform $transition-base, border-color $transition-base;

    &:hover {
      transform: rotate(0deg) translateY(-4px);
      border-color: rgba($shark, 0.45);
    }
  }

  &__titulo {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: 500;
  }

  &__texto {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $muted;
  }
}

@keyframes atravessar {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(150vw);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mashup__peixe {
    animation: none;
    transform: translateX(40vw);
  }
}
</style>
