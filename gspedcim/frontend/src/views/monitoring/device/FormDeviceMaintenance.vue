<template>
    <BaseDevice>
        <div class="device">
            <div class="head">
                <div class="title">Maintenance Device</div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" @click="goBack" />
                </div>
            </div>
        </div>

    </BaseDevice>
</template>


<script lang="ts" setup>
import TextButton from '@/components/button/TextButton.vue';
import BaseDevice from './BaseDevice.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
    router.go(-1); // Navigates one step back in the browser history
}
</script>