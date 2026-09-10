<template>
  <section id="motivos" class="motivos">
    <div class="container">
      <h2 class="section-title" v-reveal>
        {{ conteudo.motivos.titulo }}
        <span class="gradient-text">{{ conteudo.motivos.destaque }}</span>
      </h2>
      <p class="section-subtitle" v-reveal="80">{{ conteudo.motivos.subtitulo }}</p>

      <ol class="motivos__grid">
        <li
          v-for="(motivo, i) in conteudo.motivos.lista"
          :key="i"
          class="motivos__item"
          v-reveal="(i % 3) * 70"
        >
          <span class="motivos__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <p class="motivos__texto">{{ motivo }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { conteudo } from '../../content'
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.motivos {
  padding: $spacing-xl 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-sm;
    margin-top: $spacing-xl;

    @media (max-width: $desktop) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    gap: $spacing-sm;
    padding: $spacing-sm;
    border-radius: $radius-lg;
    background: $card;
    border: 1px solid $line;
    transition: background $transition-base, border-color $transition-base, transform $transition-base;

    &:hover {
      background: $card-hover;
      border-color: rgba($petal, 0.3);
      transform: translateY(-2px);
    }
  }

  &__num {
    flex-shrink: 0;
    font-family: $font-display;
    font-size: $font-size-lg;
    font-weight: 600;
    line-height: 1.4;
    background: $grad;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-variant-numeric: tabular-nums;
  }

  &__texto {
    font-size: $font-size-sm;
    color: $muted;
    line-height: 1.6;
  }
}
</style>
