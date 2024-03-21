<template>
    <ul class="sub-nav">
      <li v-for="item in subNavItems" :key="item.name">
        <a :href="item.path">{{ item.name }}</a>
        <SubNavigation v-if="item.subNav" :subNavItems="item.subNav" />
      </li>
    </ul>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  interface NavItem {
    name: string;
    path: string;
    subNav?: NavItem[];
  }
  
  export default defineComponent({
    props: {
      subNavItems: {
        type: Array as PropType<NavItem[]>,
        required: true
      },
    },
  });
  </script>
  
  <style scoped>

  </style>
  