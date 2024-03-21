// composables/useTitleForm.ts
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

export function useTitleForm() {
    const route = useRoute();
    const param = ref(route.params.id);

    const titleForm = computed(() => {
        return param.value === 'new' ? 'New' : 'Edit';
    });

    return { titleForm };
}
