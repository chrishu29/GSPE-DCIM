
<template>
    <BaseLayout>
        Rack Silumation
    </BaseLayout>
</template>
<script lang="ts">

import BaseLayout from '@/components/layout/BaseLayout.vue';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
export default {
    name: "Rack-Simulation",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.RACK.NAME} List`, to: ROUTER.RACK.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    }
}
</script>