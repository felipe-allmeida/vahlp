<template>
  <div class="divisor" role="presentation">
    <span class="divisor__linha" />
    <Rosa class="divisor__rosa" :tamanho="38" />
    <span class="divisor__linha" />
  </div>
</template>

<script setup lang="ts">
import Rosa from './Rosa.vue'
</script>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.divisor {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  max-width: 26rem;
  margin: 0 auto;
  padding: $spacing-md 0;

  &__linha {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba($mar, 0.28), transparent);
  }

  &__rosa {
    flex-shrink: 0;
    color: rgba($mar, 0.55);
  }
}
</style>
