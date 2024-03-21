<template>
    <BaseDevice>
        <LoadingState v-if="isLoading" :is-block="true" />
        <div class="device">
            <div class="head">
                <div class="title">Device Category </div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" />
                    <TextButton icon="allocate" text="Allocate" type="secondary" />
                    <TextButton icon="delete" text="Delete" type="secondary" />
                    <TextButton icon="plus" text="New Device" type="secondary" />
                </div>
            </div>
            <div class="detail-info">
                <div class="name">
                    <TheIcon name="device" color="felgrau" />
                    <div>
                        Device Name Here
                    </div>
                </div>
                <TabWrapper class="flex flex-wrap">
                    <Tab title="General" icon-name="tab-general" :isActive="activeTab === 1" @click="clickTab(1)" />
                    <Tab title="SNMP Configuration" icon-name="tab-snmp" :isActive="activeTab === 2" @click="clickTab(2)" />
                    <Tab title="Tag & Comment" icon-name="tab-tag" :isActive="activeTab === 3" @click="clickTab(3)" />
                    <Tab title="Change Log" icon-name="tab-changelog" :isActive="activeTab === 4" @click="clickTab(4)" />
                    <Tab title="Maintenance" icon-name="tab-maintanace" :isActive="activeTab === 5" @click="clickTab(5)" />
                    <Tab title="Location" icon-name="tab-location" :isActive="activeTab === 6" @click="clickTab(6)" />
                </TabWrapper>
                <TabContent class="bg-act">
                    <div v-if="activeTab === 1">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                            <div class="grid grid-cols-1 gap-4">
                                <TextInput class="" label="Name" :is-required="true" />
                                <TextInput class="" label="Serial No." />
                                <SelectSingleInput class="" label="Device category" :is-required="true"
                                    :custom-label-function="(item: any) => item.name" />
                                <TextInput class="" label="Manufacture" :disabled="true" />
                                <TextInput class="" label="Height" :disabled="true" />
                                <TextInput class="" label="Wattage" :disabled="true" />
                                <TextInput class="" label="No. Ports" :disabled="true" />
                            </div>
                            <div class="grid grid-cols-1 gap-4">

                                <TextInput class="" label="Warranty Date" input-type="date" :is-required="true" />
                                <TextInput class="" label="Role" :disabled="true" />
                                <TextInput class="" label="Device Type" :disabled="true" />
                                <TextInput class="" label="Weight" :disabled="true" />
                                <TextInput class="" label="No. Power Connections" :disabled="true" />
                                <SelectSingleInput class="" label="2D Preview" :disabled="true" :is-required="true"
                                    :custom-label-function="(item: any) => item.name" />
                                <div>
                                    <TextButton icon="edit" text="Update Category Info" bgcolor="bg-blue-picton"
                                        color="white" />
                                </div>

                            </div>
                            <div class="grid grid-cols-1 gap-4">
                                <div class="flex flex-col">
                                    <div class="mb-8">
                                        <div>
                                            <p class="img-label mb-2 text-sm font-medium">Front view</p>
                                            <div class="flex flex-wrap">
                                                <TextButton icon="photo" text="Upload new picture" color="blue-picton"
                                                    :bordered="false" bgcolor="bg-none" class="shadow-none fontnormal" />
                                                <TextButton icon="delete" text="Delete" color="red" :bordered="false"
                                                    bgcolor="bg-none" class="shadow-none fontnormal" />
                                            </div>
                                        </div>
                                        <img src="https://placehold.co/600x150"
                                            alt="Placeholder image representing the front view of a device with various ports and indicators."
                                            class="border rounded w-full">
                                    </div>
                                    <div>
                                        <p class="img-label mb-2 text-sm font-medium">Rear view</p>
                                        <div class="flex flex-wrap">
                                            <TextButton icon="photo" text="Upload new picture" color="blue-picton"
                                                :bordered="false" bgcolor="bg-none" class="shadow-none fontnormal" />
                                            <TextButton icon="delete" text="Delete" color="red" :bordered="false"
                                                bgcolor="bg-none" class="shadow-none fontnormal" />
                                        </div>
                                        <img src="https://placehold.co/600x150"
                                            alt="Placeholder image representing the rear view of a device with power connections and ventilation slots."
                                            class="border rounded w-full">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-if="activeTab === 2">
                        <div class="grid grid-cols-1 gap-4">
                            <SelectSingleInput class="" label="SNMP Version"
                                :custom-label-function="(item: any) => item.name" />
                            <TextInput class="" label="SNMP Read Only Community" />
                            <TextInput class="" label="Consecutive SNMP Failures" />
                        </div>
                    </div>
                    <div v-if="activeTab === 3">
                        <div class="grid grid-cols-1 gap-4">
                            <TextInput class="" label="Tag" />
                            <TextInput class="" label="Comments" :rows="2" />

                        </div>
                    </div>
                    <div v-if="activeTab === 4">
                    </div>

                    <div v-if="activeTab === 5">
                    </div>
                    <div v-if="activeTab === 6">

                        <table style="width:100%" class="table-auto rounded mb-4 border-separate border-spacing-x-0 ">
                            <thead>
                                <tr>
                                    <th :colspan="2" class="p-2 bg-slate-500 text-white">Location Detail</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr class="bg-slate-200">
                                    <td class="p-2">Location</td>
                                    <td>Lorem. A fugiat reprehenderit
                                        beatae.</td>
                                </tr>
                                <tr class="bg-slate-300">
                                    <td class="p-2">Building</td>
                                    <td>Lbeatae.</td>
                                </tr>
                                <tr class="bg-slate-200">
                                    <td class="p-2">Manufacture</td>
                                    <td>Lorem sit amet co.</td>
                                </tr>
                                <tr class="bg-slate-300">
                                    <td class="p-2">Floor</td>
                                    <td>Lorem </td>
                                </tr>
                                <tr class="bg-slate-200">
                                    <td class="p-2">Room</td>
                                    <td>Lorem sit.</td>
                                </tr>
                                <tr class="bg-slate-300">
                                    <td class="p-2">Rack</td>
                                    <td>Lorem.</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <div class="grid grid-cols-1 gap-4"> -->
                        <div class="btn-wrapper">
                            <TextButton icon="allocate" text="Relocate" type="secondary" />
                            <!-- </div> -->
                        </div>
                    </div>
                </TabContent>
            </div>

            <div>
            </div>
        </div>
    </BaseDevice>
</template>

<script setup lang="ts">
import { LoadingState } from '@/components/state';
import BaseDevice from './BaseDevice.vue';
import { ref } from 'vue';
import router from '@/router';
import TextButton from '@/components/button/TextButton.vue';
import { Tab, TabContent, TabWrapper } from '@/components/tabs';
import TheIcon from '@/components/icon/TheIcon.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import TextInput from '@/components/Form/TextInput.vue';

function goBack() {
    router.go(-1);
}


const activeTab = ref<number>(1);


function clickTab(name: number): void {
    if (activeTab.value == name) {
        return;
    }
    activeTab.value = name
};
const isLoading = ref(false);



</script>

<style scoped> .bg-act {
     background-color: var(--white-ghost);
 }


 .detail-info {
     margin-top: 12px;
     padding: 8px 12px 20px 12px;
     background-color: var(--bright-grey);
     border-radius: 4px;
     border: 1px solid #3A3A3A;
     /* box-shadow: 4px 0px 6px 0px rgba(83, 85, 85, 0.26);
    -webkit-box-shadow: 4px 0px 6px 0px rgba(0, 0, 0, 0.26);
    -moz-box-shadow: 4px 0px 6px 0px rgba(0, 0, 0, 0.26); */

 }

 .detail-info .name {
     border-bottom: 1px solid var(--felgrau);
     padding-bottom: 8px;
     display: flex;
     gap: 12px;
     margin-bottom: 8px;
     align-items: center;
     color: var(--felgrau);
     font-weight: 600;
 }

 .btn-wrapper {
     display: flex;
     justify-content: flex-end;
 }

 .fontnormal {
     font-weight: 400;
 }
</style>