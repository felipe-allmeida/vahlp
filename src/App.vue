<template>
  <FundoAgua />

  <main class="pagina">
    <HeroSection />
    <ContadorSection />
    <DivisorRosa />
    <HistoriaSection />
    <GaleriaSection />
    <MashupSection />
    <DivisorRosa />
    <MotivosSection />
    <PlaylistSection />
    <FinalSection />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import FundoAgua from './components/FundoAgua.vue'
import { observarProfundidade } from './composables/profundidade'
import DivisorRosa from './components/ornamentos/DivisorRosa.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ContadorSection from './components/sections/ContadorSection.vue'
import HistoriaSection from './components/sections/HistoriaSection.vue'
import GaleriaSection from './components/sections/GaleriaSection.vue'
import MashupSection from './components/sections/MashupSection.vue'
import MotivosSection from './components/sections/MotivosSection.vue'
import PlaylistSection from './components/sections/PlaylistSection.vue'
import FinalSection from './components/sections/FinalSection.vue'
import { conteudo } from './content'

let pararDeObservar: (() => void) | undefined

onMounted(() => {
  document.title = `${conteudo.idade} anos de ${conteudo.nome} 🌹`
  pararDeObservar = observarProfundidade()
})

onUnmounted(() => pararDeObservar?.())
</script>

<style lang="scss">
@use './styles/variables' as *;

.pagina {
  position: relative;
  z-index: 1;
}

// Animação de revelação usada pela diretiva v-reveal
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;

  &--in {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
