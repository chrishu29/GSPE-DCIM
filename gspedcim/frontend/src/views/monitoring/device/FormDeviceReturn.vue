<template>
    <BaseDevice>
        <LoadingState v-if="isLoading" :is-block="true" />
        <div class="device">
            <div class="head">
                <div class="title">Return Device</div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" @click="goBack" />
                </div>
            </div>
            <div class="form-content form-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                <div class="">
                    <div class="f-title mb-2">
                        Return
                    </div>
                    <div class="grid grid-cols-1 gap-4 mb-5">
                        <TextInput class="" label="Return Date" input-type="date" :is-required="true" />
                        <SelectSingleInput class="" label="Handover By" :is-required="true"
                            :custom-label-function="(item: any) => item.name" />
                        <SelectSingleInput class="" label="Pick By" :is-required="true"
                            :custom-label-function="(item: any) => item.name" />

                        <SelectSingleInput class="" label="Return Type" :is-required="true"
                            :custom-label-function="(item: any) => item.name" />

                        <TextInput class="" label="Remark" :rows="2" />
                    </div>
                </div>
                <div>
                    <div class="f-title mb-2">
                        Device
                    </div>
                    <div class="grid grid-cols-1 gap-4 mb-5">

                        <SelectSingleInput class="" label="Device Name" :is-required="true"
                            :custom-label-function="(item: any) => item.name" />
                        <TextInput class="" label="Tag" />

                        <div class="text-sm font-medium " for="">Detail Info</div>
                        <div class="detail-info">
                            <td>
                                <tr>Category name</tr>
                                <tr>Role</tr>
                                <tr>Manufacture</tr>
                                <tr>Device type</tr>
                                <tr>Height</tr>
                                <tr>Weight</tr>
                                <tr>Wattage</tr>
                            </td>
                            <td class="pl-2">
                                <tr>:</tr>
                                <tr>:</tr>
                                <tr>:</tr>
                                <tr>:</tr>
                                <tr>:</tr>
                                <tr>:</tr>
                                <tr>:</tr>
                            </td>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="f-title mb-2">
                        Preview
                    </div>
                    <div class="mb-6">
                        <p class="img-label mb-2">Front view</p>
                        <img src="https://placehold.co/600x150"
                            alt="Placeholder image representing the front view of a device with various ports and indicators."
                            class="border rounded w-full">
                    </div>
                    <div>
                        <p class="img-label mb-2">Rear view</p>
                        <img src="https://placehold.co/600x150"
                            alt="Placeholder image representing the rear view of a device with power connections and ventilation slots."
                            class="border rounded w-full">
                    </div>

                </div>
            </div>
        </div>
    </BaseDevice>
</template>


<script lang="ts" setup>
import TextButton from '@/components/button/TextButton.vue';
import BaseDevice from './BaseDevice.vue';

import { useRouter } from 'vue-router';
import { LoadingState } from '@/components/state';
import { ref } from 'vue';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';

const router = useRouter();


function goBack() {
    router.go(-1);
}

const isLoading = ref(false);

</script>

<style scoped>
.detail-info {
    background-color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
}
</style>