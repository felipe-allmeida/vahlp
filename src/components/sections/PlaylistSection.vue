<template>
  <section v-if="conteudo.playlist.embed" id="playlist" class="playlist">
    <div class="container">
      <h2 class="section-title" v-reveal>
        {{ conteudo.playlist.titulo }}
        <span class="gradient-text">{{ conteudo.playlist.destaque }}</span>
      </h2>
      <p class="section-subtitle" v-reveal="80">{{ conteudo.playlist.subtitulo }}</p>

      <div class="playlist__moldura" v-reveal="160">
        <iframe
          :src="conteudo.playlist.embed"
          title="Playlist"
          width="100%"
          height="380"
          frameborder="0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { conteudo } from '../../content'
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.playlist {
  padding: $spacing-xl 0;

  &__moldura {
    max-width: 44rem;
    margin: $spacing-xl auto 0;
    padding: $spacing-xs;
    border-radius: $radius-xl;
    border: 1px solid $line;
    background: $grad-soft;
    overflow: hidden;

    iframe {
      display: block;
      border-radius: $radius-lg;
      max-width: 100%;
    }
  }
}
</style>
