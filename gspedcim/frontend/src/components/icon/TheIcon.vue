<template>
    <!-- todo: Add tooltip to the icon -->
    <component :class="className" :is="icon" />
</template>
  
<script lang="ts" setup>
import { PropType, computed, defineAsyncComponent } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String as PropType<string>,
        default: 'black',
    },
    size: {
        type: String as PropType<string>,
        default: '40px', // Ensure this matches your design system
    },
});

const icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`));

const className = computed(() => {
    return `svg-icon ${props.color}`;
});

// const iconStyle = computed(() => ({
//     width: props.size,
//     height: props.size,
// }));

</script>


  
<style scoped>
.svg-icon {
    fill: currentColor;
}

.black {
    color: #000;
}

.white {
    color: #fff;
}

.blue {
    color: var(--blue-fs);
}
.felgrau {
    color: var(--felgrau);
}
.blue-neon {
    color: var(--blue-neon);
}

.grey {
    color: var(--grey-ship);
}

.light-green {
    color: var(--green-yellow);
}

.red {
    color: red;
}


/* todo:
 handle dynamic icon size
*/
.sm {
    height: 16px;
    width: 16px;
}

.md {
    height: 24px;
    width: 24px;
}

.lg {
    height: 32px;
    width: 32px;
}

.xl {
    height: 40px;
    width: 40px;
}
</style>
