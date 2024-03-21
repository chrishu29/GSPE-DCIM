<template>
  <li @click="props.click"
    :class="{ 'shadow-custom bgact': props.isActive, 'bg-gradient-to-b from-white to-gray-200 border-b': !props.isActive }"
    class="z-10 px-4 py-2 sm:mr-0.5 last:mr-0 flex items-center font-medium text-gray-400 bg-white border-t border-r border-l  border-gray-200 first:rounded-t-md sm:rounded-t-md cursor-pointer">
    <TheIcon v-if="props.iconName" :color="props.isActive ? 'text-black' : 'text-gray-400'" :name="props.iconName"  class="mr-2"/>
    <span :class="{ 'text-black': props.isActive }" class="truncate ">{{ props.title }}</span>
  </li>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import TheIcon from '../icon/TheIcon.vue';

const props = defineProps({
  title: String,
  isActive: Boolean,
  click: Function as PropType<(event: MouseEvent) => void>,
  iconName: String,
  // activeColor:String
});


</script>

<style scoped>
.bgact{
  background-color: var(--white-ghost);
}

</style>