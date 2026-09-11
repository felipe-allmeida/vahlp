<template>
  <section id="contador" class="contador">
    <div class="container">
      <span class="eyebrow" v-reveal>{{ conteudo.contador.titulo }}</span>

      <ul class="contador__grid" v-reveal="80">
        <li v-for="unidade in unidades" :key="unidade.chave" class="contador__item">
          <span class="contador__valor">{{ pad(unidade.valor) }}</span>
          <span class="contador__legenda">{{ unidade.legenda }}</span>
        </li>
      </ul>

      <p class="contador__subtitulo" v-reveal="160">{{ conteudo.contador.subtitulo }}</p>

      <div class="contador__regressiva" v-reveal="240">
        <template v-if="regressiva.ehHoje">
          <strong class="contador__hoje gradient-text">{{ conteudo.contador.regressiva.hoje }}</strong>
        </template>
        <template v-else>
          <span>{{ conteudo.contador.regressiva.titulo }}</span>
          <strong class="gradient-text">
            {{ regressiva.dias }} {{ regressiva.dias === 1 ? 'dia' : 'dias' }}
          </strong>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { conteudo } from '../../content'
import { useContagemRegressiva, useTempoJuntos } from '../../composables/useTempo'

const tempo = useTempoJuntos(conteudo.inicioNamoro)
const regressiva = useContagemRegressiva(conteudo.aniversario)
const legendas = conteudo.contador.legendas

const unidades = computed(() => [
  { chave: 'anos', valor: tempo.value.anos, legenda: legendas.anos },
  { chave: 'meses', valor: tempo.value.meses, legenda: legendas.meses },
  { chave: 'dias', valor: tempo.value.dias, legenda: legendas.dias },
  { chave: 'horas', valor: tempo.value.horas, legenda: legendas.horas },
  { chave: 'minutos', valor: tempo.value.minutos, legenda: legendas.minutos },
  { chave: 'segundos', valor: tempo.value.segundos, legenda: legendas.segundos },
])

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.contador {
  padding: $spacing-xl 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: $spacing-sm;
    max-width: 60rem;
    margin: 0 auto;

    @media (max-width: $desktop) {
      grid-template-columns: repeat(3, 1fr);
      gap: $spacing-md $spacing-sm;
    }

    @media (max-width: $mobile) {
      gap: $spacing-sm 0.5rem;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: $spacing-sm 0.25rem;
    border-radius: $radius-lg;
    background: $card;
    border: 1px solid $line;
  }

  &__valor {
    font-family: $font-display;
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 500;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  &__legenda {
    font-size: $font-size-xs;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $faint;
  }

  &__subtitulo {
    margin-top: $spacing-md;
    text-align: center;
    color: $muted;
    font-family: $font-display;
    font-size: $font-size-xl;
    font-style: italic;

    @media (max-width: $tablet) {
      font-size: $font-size-lg;
    }
  }

  &__regressiva {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    margin: $spacing-lg auto 0;
    padding: 0.75rem $spacing-md;
    width: fit-content;
    border-radius: $radius-full;
    border: 1px solid $line;
    background: $grad-soft;
    font-size: $font-size-sm;
    letter-spacing: 0.06em;
    color: $muted;

    strong {
      font-weight: 600;
      color: $ink;
    }
  }

  &__hoje {
    font-size: $font-size-lg;
  }
}
</style>
