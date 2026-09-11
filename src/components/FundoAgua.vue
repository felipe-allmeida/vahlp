<template>
  <div class="fundo" aria-hidden="true">
    <!-- o mundo de cima: céu de praia, visível enquanto não se mergulha -->
    <span class="fundo__ceu" />
    <Praia />

    <!-- a profundidade: claro perto da superfície, mais fundo lá embaixo -->
    <span class="fundo__profundidade" />

    <!-- o mar: a superfície e a massa de água embaixo dela, subindo junto -->
    <div class="fundo__mar">
      <svg class="fundo__onda" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0 62c90-26 190-26 280 0s190 26 280 0 190-26 280 0 190 26 280 0 80-14 80-14V120H0Z"
          fill="currentColor"
        />
      </svg>
      <span class="fundo__massa" />
    </div>

    <!-- luz entrando pela superfície -->
    <div class="fundo__raios">
      <span class="fundo__raio fundo__raio--a" />
      <span class="fundo__raio fundo__raio--b" />
      <span class="fundo__raio fundo__raio--c" />
    </div>

    <!-- o cardume, passando devagar e sem pressa nenhuma -->
    <div class="fundo__cardume">
      <Tubarao
        v-for="t in tubaroes"
        :key="t.id"
        class="fundo__tubarao"
        :largura="t.largura"
        :style="t.estilo"
      />
    </div>

    <!-- pétalas de rosa branca afundando devagar -->
    <span
      v-for="petala in petalas"
      :key="`p${petala.id}`"
      class="fundo__petala"
      :style="petala.estilo"
    />

    <!-- e as bolhas subindo, que só existem debaixo d'água -->
    <div class="fundo__bolhas">
      <span
        v-for="bolha in bolhas"
        :key="`b${bolha.id}`"
        class="fundo__bolha"
        :style="bolha.estilo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Tubarao from './ornamentos/Tubarao.vue'
import Praia from './Praia.vue'

/**
 * Tudo aqui é ornamento: poucos elementos, animação só em transform/opacity, e
 * o cardume atravessa a tela em minutos, não em segundos. Debaixo d'água nada
 * tem pressa — e nada disso pode competir com as fotos.
 */

interface TubaraoDeFundo {
  id: number
  largura: number
  estilo: CSSProperties
}

/** Profundidade, tamanho e velocidade diferentes: senão parece enfeite repetido. */
const tubaroes: TubaraoDeFundo[] = [
  { profundidade: 12, largura: 170, duracao: 78, atraso: -6, opacidade: 0.2, sentido: 1 },
  { profundidade: 38, largura: 108, duracao: 116, atraso: -44, opacidade: 0.13, sentido: -1 },
  { profundidade: 63, largura: 230, duracao: 94, atraso: -70, opacidade: 0.16, sentido: 1 },
  { profundidade: 84, largura: 132, duracao: 134, atraso: -22, opacidade: 0.11, sentido: -1 },
].map((t, i) => ({
  id: i,
  largura: t.largura,
  estilo: {
    top: `${t.profundidade}%`,
    opacity: `${t.opacidade}`,
    animationDuration: `${t.duracao}s`,
    animationDelay: `${t.atraso}s`,
    // o que nada para a esquerda vai espelhado, e começa do outro lado
    '--sentido': t.sentido,
  } as CSSProperties,
}))

interface Enfeite {
  id: number
  estilo: CSSProperties
}

const petalas: Enfeite[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  estilo: {
    left: `${(i * 10.7 + (i % 3) * 5) % 100}%`,
    width: `${7 + (i % 4) * 3}px`,
    height: `${9 + (i % 4) * 4}px`,
    animationDuration: `${26 + (i % 5) * 8}s`,
    animationDelay: `${-i * 3.7}s`,
    opacity: `${0.5 + (i % 3) * 0.12}`,
  },
}))

const bolhas: Enfeite[] = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  estilo: {
    left: `${(i * 6.4 + (i % 5) * 3) % 100}%`,
    width: `${3 + (i % 4) * 3}px`,
    height: `${3 + (i % 4) * 3}px`,
    animationDuration: `${14 + (i % 6) * 5}s`,
    animationDelay: `${-i * 1.9}s`,
    opacity: `${0.18 + (i % 4) * 0.08}`,
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
}

.fundo__profundidade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, $fundo-raso 0%, $fundo 42%, $fundo-fundo 100%);
  opacity: var(--profundidade, 0);
}

// Céu de praia: luz quente no horizonte, azul mais firme em cima
.fundo__ceu {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #a8d7ee 0%, #cfe8f4 44%, #f3e8cd 82%, #f6ecd6 100%);
}

// O mar começa baixo, na beira da areia, e sobe até engolir a tela inteira
// conforme a pessoa desce. É a travessia da superfície.
.fundo__mar {
  position: absolute;
  left: -2%;
  right: -2%;
  top: 94%;
  height: 170vh;
  transform: translateY(calc(var(--profundidade, 0) * -112vh));
}

.fundo__onda {
  display: block;
  width: 100%;
  height: 9vh;
  color: #9ed3e6;
}

.fundo__massa {
  display: block;
  height: 140vh;
  margin-top: -2px; // encosta na onda: sem isso sobra um fio claro na emenda
  background: linear-gradient(to bottom, #9ed3e6 0%, $fundo 24%, $fundo-fundo 100%);
}

// Tudo que só existe submerso entra junto com a profundidade
.fundo__raios,
.fundo__cardume,
.fundo__bolhas {
  position: absolute;
  inset: 0;
  opacity: var(--profundidade, 0);
}

// Feixes de luz atravessando a água, vindos da superfície
.fundo__raio {
  position: absolute;
  top: -30vh;
  width: 34vw;
  height: 150vh;
  background: linear-gradient(to bottom, rgba($cream, 0.72), rgba($cream, 0) 72%);
  filter: blur(26px);
  transform-origin: top center;
  mix-blend-mode: soft-light;

  &--a {
    left: 4%;
    animation: oscila 19s ease-in-out infinite;
  }

  &--b {
    left: 42%;
    width: 22vw;
    opacity: 0.8;
    animation: oscila 25s ease-in-out infinite reverse;
  }

  &--c {
    right: 2%;
    width: 28vw;
    opacity: 0.6;
    animation: oscila 31s ease-in-out infinite;
  }
}

.fundo__tubarao {
  position: absolute;
  left: 0;
  color: $shark;
  animation-name: atravessa;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  filter: blur(0.4px);
}

// Pétala de rosa branca: elipse torta, girando enquanto afunda
.fundo__petala {
  position: absolute;
  top: -6%;
  background: linear-gradient(140deg, #ffffff, rgba($raso, 0.9));
  border-radius: 60% 40% 55% 45% / 55% 60% 40% 45%;
  box-shadow: 0 1px 4px rgba($abissal, 0.16);
  animation-name: afunda;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.fundo__bolha {
  position: absolute;
  bottom: -4%;
  border-radius: 50%;
  border: 1px solid rgba($cream, 0.9);
  background: radial-gradient(circle at 32% 30%, rgba($cream, 0.85), rgba($raso, 0.12) 62%);
  animation-name: sobe-bolha;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
}

// Atravessa a tela inteira; --sentido -1 espelha e inverte o percurso
@keyframes atravessa {
  0% {
    transform: translateX(calc(var(--sentido) * -130vw)) scaleX(var(--sentido)) translateY(0);
  }
  50% {
    transform: translateX(calc(var(--sentido) * -15vw)) scaleX(var(--sentido)) translateY(2.5vh);
  }
  100% {
    transform: translateX(calc(var(--sentido) * 130vw)) scaleX(var(--sentido)) translateY(0);
  }
}

@keyframes afunda {
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

@keyframes sobe-bolha {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(2.5vw, -55vh, 0);
  }
  100% {
    transform: translate3d(-1.5vw, -112vh, 0);
  }
}

// Só translada. Rotação e escala num elemento com blur(26px) obrigam o
// navegador a re-rasterizar o borrão a cada quadro, e isso custa caro no
// celular — o movimento lateral sozinho já dá a impressão de luz balançando.
@keyframes oscila {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.55;
  }
  50% {
    transform: translateX(4vw);
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fundo__petala,
  .fundo__bolha,
  .fundo__tubarao {
    display: none;
  }

  .fundo__raio {
    animation: none;
  }
}
</style>
