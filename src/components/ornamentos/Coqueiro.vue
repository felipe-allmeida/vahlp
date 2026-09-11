<template>
  <svg
    class="coqueiro"
    :class="{ 'coqueiro--espelhado': espelhado }"
    :width="largura"
    :height="largura * 1.7"
    viewBox="0 0 120 204"
    fill="none"
    aria-hidden="true"
  >
    <g fill="currentColor">
      <!-- as folhas saem todas da coroa, em 62 60, e arqueiam pra baixo -->
      <g v-for="a in ANGULOS" :key="a" :transform="`rotate(${a} 62 60)`">
        <path
          d="M62 60C42 48 22 48 4 58c16-2 32 2 44 10 -10 0-22 3-32 9 14-4 32-3 46 3Z"
        />
      </g>

      <!-- os cocos, na base da coroa -->
      <circle cx="55" cy="69" r="5" />
      <circle cx="67" cy="71" r="4.5" />
      <circle cx="61" cy="76" r="4" />
    </g>

    <!-- o tronco, tombado pro mar como todo coqueiro de praia -->
    <path
      d="M78 204C74 160 70 118 62 66"
      stroke="currentColor"
      stroke-width="9"
      stroke-linecap="round"
      fill="none"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  largura?: number
  /** Espelha a árvore, pra os dois lados da tela não ficarem iguais */
  espelhado?: boolean
}
withDefaults(defineProps<Props>(), { largura: 120, espelhado: false })

/** Seis folhas abertas em leque; nenhuma apontando para o próprio tronco. */
const ANGULOS = [-38, -8, 22, 158, 188, 218]
</script>

<style scoped lang="scss">
.coqueiro {
  display: block;
  transform-origin: bottom center;

  &--espelhado {
    transform: scaleX(-1);
  }
}
</style>
