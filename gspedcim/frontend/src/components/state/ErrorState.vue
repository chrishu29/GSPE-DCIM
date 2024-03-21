<template>
    <div class="error-state">
        <h3>{{ errorMessage }}</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "ErrorState",
    props: {
        errorMessage: {
            type: String,
            required: true
        }
    }
});
</script>

<style scoped>
.error-state {
    margin: 40px auto;
    color: var(--red);
    font-weight: 500;
    text-align: center;
}
</style>
