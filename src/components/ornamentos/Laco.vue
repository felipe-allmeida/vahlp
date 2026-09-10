<template>
  <svg
    class="laco"
    :width="largura"
    :height="largura * 0.76"
    viewBox="0 0 100 76"
    fill="none"
    aria-hidden="true"
  >
    <!-- fitas caindo, com o corte em V na ponta -->
    <path
      d="M45 36C42 46 36 57 25 70l9-3 3 6c6-11 10-23 12-33Z"
      :fill="preenchimento"
      :stroke="contorno"
      stroke-width="1.1"
      stroke-linejoin="round"
    />
    <path
      d="M55 36c3 10 9 21 20 34l-9-3-3 6c-6-11-10-23-12-33Z"
      :fill="preenchimento"
      :stroke="contorno"
      stroke-width="1.1"
      stroke-linejoin="round"
    />

    <!-- laçada esquerda -->
    <path
      d="M46 30C36 12 16 5 8 15 1 24 5 38 18 41c10 2 22-3 28-11Z"
      :fill="preenchimento"
      :stroke="contorno"
      stroke-width="1.1"
      stroke-linejoin="round"
    />
    <!-- laçada direita -->
    <path
      d="M54 30c10-18 30-25 38-15 7 9 3 23-10 26-10 2-22-3-28-11Z"
      :fill="preenchimento"
      :stroke="contorno"
      stroke-width="1.1"
      stroke-linejoin="round"
    />

    <!-- dobras do cetim -->
    <path
      d="M44 32c-7-6-16-11-24-11M56 32c7-6 16-11 24-11"
      :stroke="contorno"
      stroke-width="0.85"
      stroke-linecap="round"
      opacity="0.45"
    />

    <!-- nó -->
    <ellipse
      cx="50"
      cy="33"
      rx="7"
      ry="6.2"
      :fill="preenchimento"
      :stroke="contorno"
      stroke-width="1.1"
    />
    <path
      d="M46.5 29.5c1.4 2.4 1.4 4.8 0 7.2M53.5 29.5c-1.4 2.4-1.4 4.8 0 7.2"
      :stroke="contorno"
      stroke-width="0.85"
      stroke-linecap="round"
      opacity="0.5"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  largura?: number
  /** Cor do cetim (preto do laço) */
  preenchimento?: string
  /** Brilho da borda, pra o laço não sumir no fundo escuro */
  contorno?: string
}
withDefaults(defineProps<Props>(), {
  largura: 92,
  preenchimento: '#0d0d10',
  contorno: 'rgba(248, 244, 239, 0.62)',
})
</script>

<style scoped lang="scss">
.laco {
  display: block;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.55));
}
</style>
