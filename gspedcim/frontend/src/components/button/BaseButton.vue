<template>
  <button class="button" :style="{ minWidth: minWidth }" :class="buttonClasses" :disabled="isDisabled"
    @click="$emit('onClick')">
    <slot></slot>
  </button>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isBlock: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: String,
      default: '128px'
    }
  },
  emits: ['onClick'],
  setup(props) {
    const buttonClasses = computed(() => ({
      [props.type]: true,
      [props.size]: true,
      'button--block': props.isBlock,
      'button--disabled': props.isDisabled,
    }));

    return { buttonClasses };
  }
});
</script>

  
<style>
.button {
  position: relative;
  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
  padding: 0 16px;
  min-width: 128px;
  transition: 0.15s ease-in-out;
  border-radius: 30px;
  border: none;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button:hover {
  opacity: 0.8;
}

.button--block {
  width: 100%;
}

.button--disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
}

.primary {
  background-color: #23B4F7;
  color: #ffffff;
}

.secondary {
  background-color: #BEEE62;
  color: #000000;
}

.md {
  height: 40px;
}

.lg {
  height: 42px;
}
</style>
  