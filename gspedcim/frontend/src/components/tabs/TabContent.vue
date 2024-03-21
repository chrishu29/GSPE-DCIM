<template>
    <section class="bg-white border-l border-r border-b border-gray-200 rounded-br-md rounded-b-md">
      <div class="p-5 text-gray-700">
        <slot/>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import {defineComponent} from 'vue'
  
  export default defineComponent({
    name: 'Tab Content'
  })
  </script>
  
  <style scoped>
  </style>