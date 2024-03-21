<template>
    <BaseLayout>

        <div class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
            <div class="flex flex-col items-left mb-4 md:mb-0">
                <div class="flex text-blue-600 mr-4 mb-2 align-center">
                    <MyIcon name="map" color="white" size="24px" />
                    <h2 class="ml-2 text-2xl font-semibold text-white">Map View</h2>
                </div>
                <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
            </div>
            <div>
                <router-link :to=ROUTER.LOCATIONS.PATH>
                    <BaseButton type="secondary">Back</BaseButton>
                </router-link>
            </div>
        </div>

        <div class="container mx-auto mt-4 p-4 rounded-lg shadow-md bg-white">
            <div class="overflow-x-aut">
                <div class="h-full max-h-screen items-center justify-center">
                    Maps view
                </div>

            </div>
        </div>
    </BaseLayout>
</template>

<script lang="ts">

import BaseLayout from "@/components/layout/BaseLayout.vue";
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';


export default {
    name: "Location-Maps",
    components: {
        BaseLayout,
        Breadcrumb,
        MyIcon,
        BaseButton,

    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: ROUTER.LOCATIONS.NAME, to: ROUTER.LOCATIONS.PATH },
            { text: ROUTER.LOCATIONS_MAPS.NAME },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    }

}
</script>