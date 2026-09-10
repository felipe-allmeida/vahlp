<template>
  <section id="final" class="final">
    <div class="container final__conteudo">
      <Laco class="final__laco" :largura="104" v-reveal />
      <p class="final__saudacao" v-reveal="40">{{ conteudo.final.saudacao }}</p>
      <h2 class="final__nome gradient-text" v-reveal="80">{{ conteudo.nome }}</h2>
      <p class="final__mensagem" v-reveal="160">{{ conteudo.final.mensagem }}</p>

      <button class="final__botao" type="button" @click="soltarCoracoes" v-reveal="240">
        {{ conteudo.final.botao }}
      </button>

      <p class="final__surpresa" :class="{ 'final__surpresa--visivel': revelou }" aria-live="polite">
        {{ conteudo.final.surpresa }}
      </p>

      <footer class="final__rodape">{{ conteudo.final.rodape }}</footer>
    </div>

    <div class="final__coracoes" aria-hidden="true">
      <span
        v-for="coracao in coracoes"
        :key="coracao.id"
        class="final__coracao"
        :style="coracao.estilo"
      >
        {{ coracao.emoji }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onUnmounted, ref, type CSSProperties } from 'vue'
import Laco from '../ornamentos/Laco.vue'
import { conteudo } from '../../content'

interface Coracao {
  id: number
  emoji: string
  estilo: CSSProperties
}

const EMOJIS = ['🤍', '🌹', '🖤', '🦈', '✨', '🎂']

const coracoes = ref<Coracao[]>([])
const revelou = ref(false)
const timers: number[] = []
let proximoId = 0

const soltarCoracoes = () => {
  revelou.value = true

  const novos: Coracao[] = Array.from({ length: 26 }, () => {
    const duracao = 3.4 + Math.random() * 2.4
    return {
      id: proximoId++,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)] ?? '🤍',
      estilo: {
        left: `${Math.random() * 100}%`,
        fontSize: `${1 + Math.random() * 1.6}rem`,
        animationDuration: `${duracao}s`,
        animationDelay: `${Math.random() * 0.9}s`,
      },
    }
  })

  coracoes.value.push(...novos)

  const ids = new Set(novos.map((c) => c.id))
  timers.push(
    window.setTimeout(() => {
      coracoes.value = coracoes.value.filter((c) => !ids.has(c.id))
    }, 7000)
  )
}

onUnmounted(() => timers.forEach((t) => window.clearTimeout(t)))
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.final {
  position: relative;
  min-height: 90svh;
  display: flex;
  align-items: center;
  padding: $spacing-xl 0 $spacing-lg;
  overflow: hidden;

  &__conteudo {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__laco {
    margin-bottom: $spacing-md;
  }

  &__saudacao {
    font-size: $font-size-lg;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: $muted;
  }

  &__nome {
    font-family: $font-display;
    font-size: clamp(2.5rem, 10vw, 6rem);
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-top: $spacing-sm;
  }

  &__mensagem {
    max-width: 28rem;
    margin-top: $spacing-sm;
    color: $muted;
    font-family: $font-display;
    font-size: $font-size-xl;
    font-style: italic;
  }

  &__botao {
    margin-top: $spacing-lg;
    padding: 0.9rem 2.2rem;
    border-radius: $radius-full;
    background: $grad;
    color: $ink;
    font-weight: 600;
    font-size: $font-size-base;
    letter-spacing: 0.02em;
    transition: transform $transition-base, box-shadow $transition-base;
    box-shadow: 0 12px 34px -14px rgba($petal, 0.85);

    &:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 18px 44px -14px rgba($petal, 0.95);
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }
  }

  &__surpresa {
    margin-top: $spacing-md;
    min-height: 2.2rem;
    font-family: $font-display;
    font-size: $font-size-2xl;
    color: $cream;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity $transition-slow, transform $transition-slow;

    &--visivel {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__rodape {
    margin-top: $spacing-xl;
    font-size: $font-size-xs;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $faint;
  }

  &__coracoes {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  &__coracao {
    position: absolute;
    bottom: -3rem;
    animation: sobe-coracao linear forwards;
  }
}

@keyframes sobe-coracao {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-95svh) rotate(28deg);
    opacity: 0;
  }
}
</style>
