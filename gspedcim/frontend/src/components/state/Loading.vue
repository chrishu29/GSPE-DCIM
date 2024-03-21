<template>
  <div class="loading-state" :class="[{ 'loading-state--block': isBlock }]">
    <div :class="[{ 'loading-state__overlay': isBlock }]"></div>
    <Spinner class="loading-state__spinner" size="md" />

  </div>
</template>


<script lang="ts">
import Spinner from '@/components/loading/MyLoader.vue';
// import ROUTER from '@/constants/router';


export default {
  name: 'LoadingState',

  props: {
    isBlock: {
      type: Boolean,
      default: false
    }
  },
  components: { Spinner },
  mounted() {
    if (this.isBlock) document.body.style.overflow = 'hidden';
  },
  unmounted() {
    if (this.isBlock) document.body.style.overflow = 'auto';
  }
};


</script>

<style scoped>
.loading-state--block {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
}

.loading-state__overlay {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: #40c4ff; */
  opacity: 0.5;
  background-color: #d9d9d9a3

}

.loading-state__spinner {
  margin: 64px auto;
}

.loading-state--block>.loading-state__spinner {
  margin: 0 !important;
  position: absolute;
  z-index: 200;
}
</style>
