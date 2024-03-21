<template> <div v-if="visible" class="snackbar" :class="type">{{ message }}</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useSnackbar } from '@/services/snackbarService';

export default defineComponent({
  setup() {
    const { message, visible, type } = useSnackbar();
    return { message, visible, type };
  }
});
</script>

<style scoped>
.snackbar {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 1000; /* Ensure it's above other content */
  max-width: 80%; /* Limit max width */
  text-align: center;
}

.success {
  background-color: #4CAF50; /* Green */
}

.error {
  background-color: #F44336; /* Red */
}

.info {
  background-color: #2196F3; /* Blue */
}
</style>