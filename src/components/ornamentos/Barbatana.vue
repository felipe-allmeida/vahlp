<template>
  <div class="barbatana" aria-hidden="true">
    <svg viewBox="0 0 120 60" fill="none">
      <!-- barbatana dorsal: borda de ataque reta, ponta varrida pra trás -->
      <path
        d="M26 51C42 49 54 36 66 6c5 17 19 37 32 45-24 3-48 3-72 0Z"
        fill="currentColor"
        opacity="0.92"
      />
      <!-- rastro na água -->
      <path
        d="M2 54h30M40 57h24M74 54h44"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        opacity="0.32"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.barbatana {
  position: absolute;
  bottom: $spacing-md;
  left: -18%;
  width: clamp(64px, 8vw, 104px);
  color: $shark;
  opacity: 0.5;
  pointer-events: none;
  animation: nadar 26s linear infinite;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
}

// Atravessa a seção devagar, some antes de encostar nas bordas
@keyframes nadar {
  0% {
    transform: translateX(0) rotate(0deg);
    opacity: 0;
  }
  8% {
    opacity: 0.5;
  }
  50% {
    transform: translateX(60vw) rotate(-2deg);
  }
  92% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(130vw) rotate(0deg);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .barbatana {
    display: none;
  }
}
</style>
