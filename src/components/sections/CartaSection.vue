<template>
  <section id="carta" class="carta">
    <div class="carta__papel container" v-reveal>
      <h2 class="section-title carta__titulo">
        {{ conteudo.carta.titulo }}
        <span class="gradient-text">{{ conteudo.carta.destaque }}</span>
      </h2>

      <div class="carta__texto">
        <p v-for="(paragrafo, i) in conteudo.carta.paragrafos" :key="i" v-reveal="i * 60">
          {{ paragrafo }}
        </p>
      </div>

      <p class="carta__assinatura" v-reveal="120">{{ conteudo.carta.assinatura }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { conteudo } from '../../content'
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.carta {
  padding: $spacing-xl 0;

  &__papel {
    max-width: 44rem;
    padding: $spacing-lg $spacing-md;
    border-radius: $radius-xl;
    border: 1px solid $line;
    background:
      radial-gradient(120% 100% at 50% 0%, rgba($petal, 0.08), transparent 60%),
      $card;

    @media (max-width: $tablet) {
      padding: $spacing-md $spacing-sm;
    }
  }

  &__titulo {
    text-align: left;

    @media (max-width: $tablet) {
      text-align: center;
    }
  }

  &__texto {
    margin-top: $spacing-md;

    p {
      font-family: $font-display;
      font-size: $font-size-xl;
      line-height: 1.75;
      color: rgba($cream, 0.86);

      + p {
        margin-top: $spacing-sm;
      }

      // Primeiro parágrafo em destaque (mais legível que capitular flutuante,
      // que quebra o fluxo quando o parágrafo tem só uma linha)
      &:first-child {
        font-size: $font-size-2xl;
        color: $cream;
        font-style: italic;

        @media (max-width: $tablet) {
          font-size: $font-size-xl;
        }
      }

      @media (max-width: $tablet) {
        font-size: $font-size-lg;
      }
    }
  }

  &__assinatura {
    margin-top: $spacing-lg;
    text-align: right;
    font-family: $font-display;
    font-style: italic;
    font-size: $font-size-xl;
    color: $petal;
  }
}
</style>
