<template>
  <div class="fundo" aria-hidden="true">
    <span class="fundo__luz fundo__luz--branca" />
    <span class="fundo__luz fundo__luz--champanhe" />
    <span class="fundo__luz fundo__luz--agua" />

    <div class="fundo__petalas">
      <span
        v-for="petala in petalas"
        :key="petala.id"
        class="fundo__petala"
        :style="petala.estilo"
      />
    </div>

    <span class="fundo__grao" />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Petala {
  id: number
  estilo: CSSProperties
}

// Poucas e lentas: é ornamento, não chuva.
const petalas: Petala[] = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  estilo: {
    left: `${(i * 7.3 + (i % 3) * 4) % 100}%`,
    width: `${7 + (i % 4) * 3}px`,
    height: `${9 + (i % 4) * 4}px`,
    animationDuration: `${17 + (i % 5) * 6}s`,
    animationDelay: `${-i * 2.4}s`,
    opacity: `${0.16 + (i % 3) * 0.06}`,
  },
}))
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.fundo {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  &__luz {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);

    &--branca {
      width: 46vw;
      height: 46vw;
      min-width: 320px;
      min-height: 320px;
      top: -14vh;
      left: -8vw;
      background: radial-gradient(circle, rgba($cream, 0.16), transparent 68%);
      animation: deriva-a 26s ease-in-out infinite;
    }

    &--champanhe {
      width: 52vw;
      height: 52vw;
      min-width: 340px;
      min-height: 340px;
      bottom: -20vh;
      right: -10vw;
      background: radial-gradient(circle, rgba($champagne, 0.2), transparent 68%);
      animation: deriva-b 32s ease-in-out infinite;
    }

    &--agua {
      width: 36vw;
      height: 36vw;
      min-width: 240px;
      min-height: 240px;
      top: 44%;
      left: 44%;
      background: radial-gradient(circle, rgba($shark, 0.14), transparent 70%);
      animation: deriva-a 38s ease-in-out infinite reverse;
    }
  }

  &__petalas {
    position: absolute;
    inset: 0;
  }

  // Pétala de rosa branca: elipse torta, girando enquanto cai
  &__petala {
    position: absolute;
    top: -6%;
    background: linear-gradient(140deg, $cream, rgba($champagne, 0.75));
    border-radius: 60% 40% 55% 45% / 55% 60% 40% 45%;
    animation-name: cair;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &__grao {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}

@keyframes cair {
  0% {
    transform: translate3d(0, -10vh, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(4vw, 50vh, 0) rotate(180deg);
  }
  100% {
    transform: translate3d(-2vw, 112vh, 0) rotate(360deg);
  }
}

@keyframes deriva-a {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(6vw, 5vh, 0) scale(1.12);
  }
}

@keyframes deriva-b {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1.05);
  }
  50% {
    transform: translate3d(-7vw, -6vh, 0) scale(0.92);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fundo__petalas {
    display: none;
  }
}
</style>
