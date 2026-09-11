<template>
  <svg
    class="girassol"
    :width="largura"
    :height="largura * 2.1"
    viewBox="0 0 80 168"
    fill="none"
    aria-hidden="true"
  >
    <!-- caule e duas folhas -->
    <path
      d="M40 168C40 140 39 112 40 86"
      stroke="var(--caule, #3f7a5e)"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path d="M40 128c-13 3-20-4-22-15 10-2 19 4 22 15Z" fill="var(--caule, #3f7a5e)" />
    <path d="M40 108c12 2 19-5 20-15-10-1-18 5-20 15Z" fill="var(--caule, #3f7a5e)" />

    <!-- as pétalas: uma só, repetida em volta do miolo -->
    <g fill="var(--petala, #f0be4c)">
      <ellipse
        v-for="a in PETALAS"
        :key="a"
        cx="40"
        cy="36"
        rx="7"
        ry="21"
        :transform="`rotate(${a} 40 58)`"
      />
    </g>

    <circle cx="40" cy="58" r="15" fill="var(--miolo, #7d5a2b)" />
    <circle cx="40" cy="58" r="9" fill="var(--miolo-claro, #9c7238)" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  largura?: number
}
withDefaults(defineProps<Props>(), { largura: 80 })

/** Doze pétalas, de 30 em 30 graus. */
const PETALAS = Array.from({ length: 12 }, (_, i) => i * 30)
</script>

<style scoped lang="scss">
.girassol {
  display: block;
  transform-origin: bottom center;
}
</style>
