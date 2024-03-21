<template>
    <div class="relative flex items-center w-full px-4">
        <button>
            <MyIcon name="filter" color="black" />
        </button>
        <div class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
            <h6 class="mb-3 text-sm font-medium text-gray-900">Filter 1</h6>
            <ul class="space-y-2 text-sm">

            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import MyIcon from '@/components/icon/MyIcon.vue';
export default{
    name: "Checkbox-Filter",
    components: {
        MyIcon,
    },
}
</script>