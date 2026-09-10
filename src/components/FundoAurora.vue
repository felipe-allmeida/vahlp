<template>
  <div class="aurora" aria-hidden="true">
    <span class="aurora__orb aurora__orb--rose" />
    <span class="aurora__orb aurora__orb--lilac" />
    <span class="aurora__orb aurora__orb--gold" />
    <span class="aurora__grain" />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.aurora {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.4;

    &--rose {
      width: 46vw;
      height: 46vw;
      min-width: 320px;
      min-height: 320px;
      top: -12vh;
      left: -8vw;
      background: radial-gradient(circle, rgba($rose, 0.75), transparent 68%);
      animation: drift-a 22s ease-in-out infinite;
    }

    &--lilac {
      width: 52vw;
      height: 52vw;
      min-width: 340px;
      min-height: 340px;
      bottom: -18vh;
      right: -10vw;
      background: radial-gradient(circle, rgba($lilac, 0.6), transparent 68%);
      animation: drift-b 28s ease-in-out infinite;
    }

    &--gold {
      width: 34vw;
      height: 34vw;
      min-width: 240px;
      min-height: 240px;
      top: 42%;
      left: 46%;
      background: radial-gradient(circle, rgba($gold, 0.34), transparent 70%);
      animation: drift-a 34s ease-in-out infinite reverse;
    }
  }

  &__grain {
    position: absolute;
    inset: 0;
    opacity: 0.045;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}

@keyframes drift-a {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(6vw, 5vh, 0) scale(1.12);
  }
}

@keyframes drift-b {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1.05);
  }
  50% {
    transform: translate3d(-7vw, -6vh, 0) scale(0.92);
  }
}
</style>
