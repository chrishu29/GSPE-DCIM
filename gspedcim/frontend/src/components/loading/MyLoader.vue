<template>
    <div class="spinner" :class="[`spinner--${color}`, size]"></div>
</template>
  
<script lang="ts">
import { PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'Spinner',
    props: {
        size: {
            type: String as PropType<'sm' | 'md'>,
            default: 'md'
        },
        color: {
            type: String as PropType<'blue' | 'white'>,
            default: 'blue'
        },

    },
});
</script>
  
<style scoped>
.spinner {
    border-radius: 100%;
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
}

.spinner--blue {
    background-color: #007bff;
}

.spinner--white {
    background-color: #ffffff;
}

.spinner.sm {
    width: 24px;
    height: 24px;
}

.spinner.md {
    width: 40px;
    height: 40px;
}

@-webkit-keyframes sk-scaleout {
    0% {
        -webkit-transform: scale(0)
    }

    100% {
        -webkit-transform: scale(1.0);
        opacity: 0.5;
    }
}

@keyframes sk-scaleout {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0.5;
    }
}
</style>
  