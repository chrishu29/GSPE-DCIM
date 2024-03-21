<template>
  <!-- <i :class="`mdi mdi-${name}`" :style="iconStyle" @click="$emit('onClick')"></i> -->

  <div :class="{ 'icon-container': hoverDecor }">
    <i :class="`mdi mdi-${name} { clicked: isClicked }`" :style="iconStyle" @click="$emit('onClick')"></i>
    <span class="tooltip" v-if="tooltip">{{ tooltip }}</span>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';


export default {
  name: 'my-icon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '24px' // default size
    },
    tooltip: {
      type: String,
      default: "",
    },
    hoverDecor: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'currentColor' // default color
    }
  },
  computed: {
    iconStyle() {
      return {
        fontSize: this.size,
        color: this.color
      };
    }
  },
  setup() {
    const isClicked = ref(false);

    const handleClick = () => {
      isClicked.value = true;
      setTimeout(() => {
        isClicked.value = false;
      }, 200); // Revert the style after 200 milliseconds

      // Additional click handling logic
    };

    return { isClicked, handleClick };
  }
};
</script>


<style scoped>
.icon-container {
  position: relative;
  display: inline-block;
  margin: 1px;
  min-height: 30px;
  min-width: 30px;
  border-radius: 8px;
}


.tooltip {
  position: absolute;
  background-color: black;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  z-index: 1000;
  transition: opacity 0.3s;
}

.icon-container:hover {
  background-color: linen;
}

.icon-container:hover .tooltip {
  visibility: visible;
  opacity: 1;

}
</style>


