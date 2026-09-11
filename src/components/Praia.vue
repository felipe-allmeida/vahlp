<template>
  <div class="praia" aria-hidden="true">
    <span class="praia__sol" />

    <span class="praia__areia" />

    <div class="praia__margem">
      <Coqueiro class="praia__coqueiro praia__coqueiro--esq" :largura="240" />
      <Coqueiro class="praia__coqueiro praia__coqueiro--dir" :largura="300" espelhado />

      <Girassol
        v-for="g in girassois"
        :key="g.id"
        class="praia__girassol"
        :largura="g.largura"
        :style="g.estilo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Coqueiro from './ornamentos/Coqueiro.vue'
import Girassol from './ornamentos/Girassol.vue'

interface Flor {
  id: number
  largura: number
  estilo: CSSProperties
}

/**
 * Os girassóis ficam nas beiradas: o meio de baixo é do "role pra baixo".
 * Cada um com altura e inclinação próprias, senão vira cerca.
 */
const girassois: Flor[] = [
  { esquerda: 3, largura: 76, base: 0, giro: -7, atraso: 0 },
  { esquerda: 12, largura: 56, base: 10, giro: 5, atraso: 1.4 },
  { esquerda: 20, largura: 44, base: 4, giro: -3, atraso: 0.7 },
  { esquerda: 75, largura: 48, base: 8, giro: 6, atraso: 2.1 },
  { esquerda: 84, largura: 80, base: 0, giro: -5, atraso: 0.4 },
  { esquerda: 93, largura: 60, base: 6, giro: 8, atraso: 1.8 },
].map((f, i) => ({
  id: i,
  largura: f.largura,
  estilo: {
    left: `${f.esquerda}%`,
    bottom: `${f.base}px`,
    '--giro': `${f.giro}deg`,
    animationDelay: `${-f.atraso}s`,
  } as CSSProperties,
}))
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

/**
 * A praia é o mundo de cima. Ela vive na camada fixa, junto com o mar — se
 * ficasse dentro do hero, rolaria por baixo da água em vez de ser coberta por
 * ela. Some rápido: assim que a maré passa por cima, não faz sentido continuar
 * vendo coqueiro.
 */
.praia {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: clamp(0, calc(1 - var(--profundidade, 0) * 3), 1);
}

.praia__sol {
  position: absolute;
  top: 8%;
  left: 50%;
  width: 46vw;
  max-width: 520px;
  aspect-ratio: 1;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 249, 226, 0.95) 0%,
    rgba(255, 235, 176, 0.55) 34%,
    rgba(255, 228, 160, 0) 70%
  );
}

// A faixa de areia onde tudo se planta
.praia__areia {
  position: absolute;
  inset: auto 0 0;
  height: 26%;
  background: linear-gradient(to bottom, rgba(244, 230, 199, 0) 0%, #f2e3c2 38%, #e8d5ab 100%);
}

.praia__margem {
  position: absolute;
  inset: auto 0 0;
  height: 34%;
}

.praia__coqueiro {
  position: absolute;
  bottom: 0;
  color: #2f6157;
  opacity: 0.88;
  transform-origin: bottom center;
  animation: brisa 9s ease-in-out infinite;

  &--esq {
    left: -3%;
  }

  &--dir {
    right: -5%;
    animation-duration: 11s;
    animation-delay: -3s;

    @media (max-width: $tablet) {
      width: 156px;
    }

    @media (max-width: $mobile) {
      width: 124px;
    }
  }

  // No celular eles precisam encolher, senão as folhas cruzam o rosto dela.
  // O encolhimento vai pela largura e não por transform: a animação da brisa
  // já usa transform e sobrescreveria qualquer scale daqui.
  @media (max-width: $tablet) {
    width: 132px;
    height: auto;
    opacity: 0.82;
  }

  @media (max-width: $mobile) {
    width: 104px;
  }
}

.praia__girassol {
  position: absolute;
  transform-origin: bottom center;
  animation: balanca 6.5s ease-in-out infinite;

}

// Vento: o coqueiro inteiro cede, o girassol só balança a cabeça
@keyframes brisa {
  0%,
  100% {
    transform: rotate(-1.2deg);
  }
  50% {
    transform: rotate(1.6deg);
  }
}

@keyframes balanca {
  0%,
  100% {
    transform: rotate(calc(var(--giro, 0deg) - 2deg));
  }
  50% {
    transform: rotate(calc(var(--giro, 0deg) + 2.5deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  .praia__coqueiro,
  .praia__girassol {
    animation: none;
  }
}
</style>
