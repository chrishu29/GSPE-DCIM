<template>
    <BaseDevice>
        <!-- <LoadingState v-if="false" :is-block="true" /> -->
        <div class="device">
            <div class="head">
                <div class="title">{{ receiveId !== 'new' ? "Update Received" : "Receive New" }} Device</div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" @click="goBack" />
                </div>

                <div class="form-content form-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    <div class="rcv-col">
                        <div class="f-title mb-2">
                            Device
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-5">
                            <TextInput class="" label="Name" :is-required="true" />
                            <TextInput class="" label="Serial No." />
                            <div>
                                <SelectSingleInput class="" label="Device category" :is-required="true"
                                    :custom-label-function="(item: any) => item.name" />
                                <router-link :to="`${ROUTER.DEVICE_CATEGORY.PATH}/form/new`">
                                    <TextButton class="mt-1.5" icon="plus" color="white" text="New Category"
                                        bgcolor="bg-blue-picton" />
                                </router-link>
                            </div>
                            <TextInput class="" label="Front Picture" input-type="file" />
                            <TextInput class="" label="Rear Picture" input-type="file" />

                        </div>
                        <div class="f-title mb-2">
                            Tag and Commnets
                        </div>
                        <div class="grid grid-cols-1 gap-4">
                            <TextInput class="" label="Tag" />
                            <TextInput class="" label="Comments" :rows="2" />

                        </div>
                    </div>
                    <div class="rcv-col">
                        <div class="f-title mb-2">
                            Receive
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-5">
                            <TextInput class="" label="Receive Date" placeholder="receive" :is-required="true"
                                input-type="date" />
                            <SelectSingleInput class="" label="Receive By" :is-required="true"
                                :custom-label-function="(item: any) => item.name" />
                            <SelectSingleInput class="" label="Device From" :is-required="true"
                                :custom-label-function="(item: any) => item.name" />
                            <SelectSingleInput v-if="true" class="" label="Customer"
                                :custom-label-function="(item: any) => item.name" />
                            <SelectSingleInput class="" label="Storage" :is-required="true"
                                :custom-label-function="(item: any) => item.name" />
                        </div>
                        <div class="f-title mb-2">
                            Warranty
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-5">
                            <TextInput class="" label="Receive Date" :is-required="true" input-type="date" />
                        </div>

                    </div>

                    <div class="rcv-col">
                        <div class="f-title mb-2">
                            Maintenance
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-5">
                            <TextInput class="" label="Initial Maintenance Date" :is-required="true" input-type="date" />
                            <SelectSingleInput class="" label="Period (In Months)" :is-required="true"
                                :custom-label-function="(item: any) => item.name" />
                            <SelectSingleInput class="" label="PIC" :is-required="true"
                                :custom-label-function="(item: any) => item.name" />
                        </div>
                        <div class="f-title mb-2">
                            SNMP Configuration
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-5">
                            <SelectSingleInput class="" label="SNMP Version"
                                :custom-label-function="(item: any) => item.name" />
                            <TextInput class="" label="SNMP Read Only Community" />
                            <TextInput class="" label="Consecutive SNMP Failures" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </BaseDevice>
</template>


<script lang="ts" setup>
import TextButton from '@/components/button/TextButton.vue';
import BaseDevice from './BaseDevice.vue';
import { ROUTER } from '@/constants'
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import { useRoute, useRouter } from 'vue-router';
import { handleClickOutside } from '@/helper/miscelanus';
import { onUnmounted } from 'vue';
// import { LoadingState } from '@/components/state';

const router = useRouter();
const route = useRoute();


function goBack() {
    router.go(-1);
}

const receiveId = route.params.id as string;


onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped>
.rcv-col {
    /* background-color: beige; */
    margin: 0;
}
</style>