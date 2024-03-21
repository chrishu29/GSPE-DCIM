
<template>
    <BaseLayout>
        <div class="container mx-auto">
            <div
                class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                <div class="flex flex-col items-left mb-4 md:mb-0">
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <MyIcon name="presentation-play" color="white" size="24px" />
                        <h2 class="ml-2 text-2xl font-semibold text-white">{{ ROUTER.ROOM_SIMULATION.NAME }}</h2>
                    </div>
                    <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                </div>
                <div class="flex gap-4">
                    <!-- <router-link to="">
                        <BaseButton type="secondary">Cancel</BaseButton>
                    </router-link>
                    <router-link to="">
                        <BaseButton type="primary">Save</BaseButton>
                    </router-link> -->
                </div>
            </div>
            <div class=" mt-5">
            </div>
        </div>

    </BaseLayout>
</template>
<script lang="ts">

import BaseLayout from '@/components/layout/BaseLayout.vue';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
export default {
    name: "Room-Simulation",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.ROOM_SIMULATION.NAME}`, to: ROUTER.RACK.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    }
}
</script>