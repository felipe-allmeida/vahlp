<template>
  <section class="hero">
    <div class="hero__foto">
      <img :src="foto" :alt="`Foto de ${conteudo.nome}`" fetchpriority="high" />
      <span class="hero__veu" />
    </div>

    <div class="hero__conteudo container">
      <span class="hero__eyebrow">{{ dataFormatada }}</span>

      <h1 class="hero__nome">
        {{ conteudo.nome }}
        <small v-if="conteudo.hero.sobrenome" class="hero__sobrenome">
          {{ conteudo.hero.sobrenome }}
        </small>
      </h1>

      <div class="hero__idade">
        <span class="hero__numero gradient-text">{{ conteudo.idade }}</span>
        <span class="hero__anos">anos</span>
      </div>

      <Laco class="hero__laco" :largura="86" />

      <p class="hero__chamada">{{ conteudo.hero.chamada }}</p>
    </div>

    <a class="hero__rolar" href="#contador">
      <span>{{ conteudo.hero.rolar }}</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M8 4v16M3 15l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Laco from '../ornamentos/Laco.vue'
import { conteudo } from '../../content'

const foto = `${import.meta.env.BASE_URL}fotos/retrato.webp`

const dataFormatada = computed(() => {
  const partes = conteudo.aniversario.split('-').map(Number)
  const mes = partes[1] ?? 1
  const dia = partes[2] ?? 1
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ]
  return `${dia} de ${meses[mes - 1] ?? ''}`
})
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: $spacing-xl 0 $spacing-lg;
  overflow: hidden;

  &__foto {
    position: absolute;
    inset: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 42%;
      opacity: 0.55;
      filter: saturate(0.7) contrast(1.02);
      animation: hero-zoom 26s ease-in-out infinite alternate;
    }
  }

  &__veu {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 45%, rgba($fundo, 0.1) 0%, rgba($fundo, 0.68) 62%, $fundo 92%),
      linear-gradient(to bottom, rgba($fundo-raso, 0.7), rgba($fundo, 0.35) 38%, $fundo 96%);
  }

  &__conteudo {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__eyebrow {
    font-size: $font-size-xs;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: $faint;
    margin-bottom: $spacing-md;
    animation: sobe 1s $transition-slow both;
  }

  &__nome {
    font-family: $font-display;
    font-size: clamp(2.75rem, 11vw, 7rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.035em;
    animation: sobe 1s 0.1s $transition-slow both;
  }

  &__sobrenome {
    display: block;
    font-size: 0.3em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $muted;
    margin-top: $spacing-sm;
    font-family: $font-body;
  }

  &__idade {
    display: flex;
    align-items: baseline;
    gap: 0.9rem;
    margin-top: $spacing-md;
    animation: sobe 1s 0.25s $transition-slow both;
  }

  &__numero {
    font-family: $font-display;
    font-size: clamp(4rem, 18vw, 11rem);
    font-weight: 600;
    line-height: 0.85;
    letter-spacing: -0.04em;
    padding-right: 0.06em;
  }

  &__anos {
    font-size: $font-size-lg;
    padding-bottom: 0.35em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $muted;
  }

  &__laco {
    margin-top: $spacing-md;
    animation: sobe 1s 0.35s $transition-slow both;
  }

  &__chamada {
    max-width: 30rem;
    margin-top: $spacing-sm;
    color: $muted;
    font-size: $font-size-lg;
    animation: sobe 1s 0.5s $transition-slow both;

    @media (max-width: $tablet) {
      font-size: $font-size-base;
    }
  }

  &__rolar {
    position: absolute;
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-xs;
    color: $faint;
    text-decoration: none;
    font-size: $font-size-xs;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    transition: color $transition-base;
    animation: flutua 2.6s ease-in-out infinite;

    &:hover {
      color: $ink;
    }
  }
}

@keyframes hero-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.12);
  }
}

@keyframes sobe {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flutua {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 8px);
  }
}
</style>
