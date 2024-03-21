<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }">
        <a v-if="index !== breadcrumbs.length - 1" :href="item.to">{{ item.text }}</a>
        <span v-else>{{ item.text }}</span>
      </li>
    </ol>
  </nav>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    breadcrumbs: {
      type: Array as () => Array<{ text: string; to?: string }>,
      required: true,
    },
  },
});
</script>
  
<style scoped>
.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  overflow: hidden; 
}

.breadcrumb-item {
  display: inline-flex; /* Change to inline-flex */
  /* max-width: 200px; Max width of each item */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide text overflow */
}
@media (max-width: 768px) {
  .breadcrumb-item {
    max-width: 80px; 
  }
}


.breadcrumb-item+.breadcrumb-item::before {
  content: ">";
  padding: 0 0.5rem;
}

.breadcrumb-item a,
.breadcrumb-item span {
  text-decoration: none;
  font-weight: 600;
  color: #fff;
  white-space: nowrap; /* Prevents the text from wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds ellipsis for overflow */
}

.breadcrumb-item.active span {
  color: #fff;
  pointer-events: none;
  cursor: default;
  font-weight: 400;
}
</style>
  