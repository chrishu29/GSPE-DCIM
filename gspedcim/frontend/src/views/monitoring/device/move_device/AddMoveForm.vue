<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <!-- Information Card -->
            <div class="container mx-auto">
                <div class="container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="cellphone-link" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">Add Moved Device</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <router-link  :to=ROUTER.INSTALLED.PATH>
                            <BaseButton type="secondary" minWidth="150px">Cancel</BaseButton>
                        </router-link>
                        <router-link  to="">
                            <BaseButton :onclick="handleSubmit" minWidth="150px">Save</BaseButton>
                        </router-link>
                    </div>
                </div>
                <!--  Loading  -->
                <div v-if="isLoading">
                    <LoadingState />
                </div>

                <!-- Forms -->
                <div class=" mt-5">
                    <div class="">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-section shadow sm:rounded-lg">
                                <div
                                    class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                    <MyIcon name="map-marker-multiple-outline" />
                                    <h3 class="text-lg leading-6 font-medium text-white">Current Location</h3>
                                </div>
                                <div class="px-3 py-4">
                                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.currlocation"
                                                @update:modelValue="formData.currlocation = $event" :options="options"
                                                label="Location" :has-error="v$.currlocation.$error"
                                                :error-msg="v$.currlocation.$errors[0] ? `${v$.currlocation.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.currbuilding"
                                                @update:modelValue="formData.currbuilding = $event" :options="options"
                                                label="Building" :has-error="v$.currbuilding.$error"
                                                :error-msg="v$.currbuilding.$errors[0] ? `${v$.currbuilding.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.currfloor"
                                                @update:modelValue="formData.currfloor = $event" :options="options"
                                                label="Floor" :has-error="v$.currfloor.$error"
                                                :error-msg="v$.currfloor.$errors[0] ? `${v$.currfloor.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.currroom"
                                                @update:modelValue="formData.currroom = $event" :options="options"
                                                label="Room" :has-error="v$.currroom.$error"
                                                :error-msg="v$.currroom.$errors[0] ? `${v$.currroom.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.currracks"
                                                @update:modelValue="formData.currracks = $event" :options="options"
                                                label="Racks" :has-error="v$.currracks.$error"
                                                :error-msg="v$.currracks.$errors[0] ? `${v$.currracks.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.currpos"
                                                @update:modelValue="formData.currpos = $event" :options="options"
                                                label="Position" :has-error="v$.currpos.$error"
                                                :error-msg="v$.currpos.$errors[0] ? `${v$.currpos.$errors[0].$message}` : ''" />
                                            <span style="font-size: 12px; color: blue;">*The lowest-numbered unit occupied by the Device</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                        <MyIcon name="monitor-cellphone-star" />
                                        <h3 class="text-lg leading-6 font-medium text-white">Device</h3>
                                    </div>
                                    <div class="px-3 py-4">
                                        <div class="mb-4">
                                            <SelectSingleInput :modelValue="formData.device"
                                                @update:modelValue="formData.device = $event" :options="options"
                                                label="Device" :has-error="v$.device.$error"
                                                :error-msg="v$.device.$errors[0] ? `${v$.device.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="mb-4">
                                            <TextInput v-model="formData.moveDate"
                                                :error-msg="v$.moveDate.$errors[0] ? `${v$.moveDate.$errors[0].$message}` : ''"
                                                :has-error="v$.moveDate.$error" label="Move Date" placeholder="" />
                                        </div>
                                        <div class="mb-4">
                                            <SelectSingleInput :modelValue="formData.moveBy"
                                                @update:modelValue="formData.moveBy = $event" :options="options"
                                                label="Move By" :has-error="v$.moveBy.$error"
                                                :error-msg="v$.moveBy.$errors[0] ? `${v$.moveBy.$errors[0].$message}` : ''" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-section shadow sm:rounded-lg">
                                <div
                                    class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                    <MyIcon name="map-marker-multiple" />
                                    <h3 class="text-lg leading-6 font-medium text-white">New Location</h3>
                                </div>
                                <div class="px-3 py-4">
                                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.location" :is-required="true"
                                                @update:modelValue="formData.location = $event" :options="options"
                                                label="Location" :has-error="v$.location.$error"
                                                :error-msg="v$.location.$errors[0] ? `${v$.location.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.building" :is-required="true"
                                                @update:modelValue="formData.building = $event" :options="options"
                                                label="Building" :has-error="v$.building.$error"
                                                :error-msg="v$.building.$errors[0] ? `${v$.building.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.floor" :is-required="true"
                                                @update:modelValue="formData.floor = $event" :options="options"
                                                label="Floor" :has-error="v$.floor.$error"
                                                :error-msg="v$.floor.$errors[0] ? `${v$.floor.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.room" :is-required="true"
                                                @update:modelValue="formData.room = $event" :options="options"
                                                label="Room" :has-error="v$.room.$error"
                                                :error-msg="v$.room.$errors[0] ? `${v$.room.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.racks" :is-required="true"
                                                @update:modelValue="formData.racks = $event" :options="options"
                                                label="Racks" :has-error="v$.racks.$error"
                                                :error-msg="v$.racks.$errors[0] ? `${v$.racks.$errors[0].$message}` : ''" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <SelectSingleInput :modelValue="formData.pos" :is-required="true"
                                                @update:modelValue="formData.pos = $event" :options="options"
                                                label="Position" :has-error="v$.pos.$error"
                                                :error-msg="v$.pos.$errors[0] ? `${v$.pos.$errors[0].$message}` : ''" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </BaseLayout>
</template>
<script lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { createNewMoved, updateMoved } from '@/services/monitoring/Device/move';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

import VueMultiselect from 'vue-multiselect';


export default{
    name: "Move List",
    components: {
        BaseLayout,
        BaseButton,
        Breadcrumb,
        MyIcon,
        TextInput,
        VueMultiselect,
        SelectSingleInput,
        LoadingState,
    },
    setup() {
    let isLoading = false;
    const moveId = useRoute().params.id as string;
    // const { titleForm } = useTitleForm();

    const myBreadcrumbs = [
        { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
        { text: `${ROUTER.MOVED.NAME} List`, to: ROUTER.MOVED.PATH },
        { text: ROUTER.MOVED_FORM.NAME },
    ];

    // Form state
    const formData = reactive({
            location: null,
            building: null,
            floor: null,
            room: null,
            racks: null,
            pos: null,
            device: null,
            moveDate: '',
            moveBy: null,
            currlocation: null,
            currbuilding: null,
            currfloor: null,
            currroom: null,
            currracks: null,
            currpos: null,
        });

        // Validation rules
        const rules = {
            location: { required },
            building: { required },
            floor: { required },
            room: { required },
            racks: { required },
            pos: { required },
            device: {},
            moveDate: {},
            moveBy: {},
            currlocation: {},
            currbuilding: {},
            currfloor: {},
            currroom: {},
            currracks: {},
            currpos: {},
        };

        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        const handleSubmit = async () => {
            v$.value.$touch();
            console.log("invode submit btn");
            // console.log(formData.status);
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                isLoading = true;
                console.log("submitted the form");
                if (moveId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewMoved(formData);
                    console.log(resp.status);
                    console.log(resp.data);
                } else {
                    let resp = await updateMoved(formData, moveId);
                    console.log(resp.status);
                    console.log(resp.data);
                }
                isLoading = false;
            }
        }

        const options = ref(['list', 'of', 'options']);
        const optionsObject = ref([{
            value: 1,
            text: "Option",
        }, {
            value: 2,
            text: "Option",
        }]);
        return {
            formData,
            myBreadcrumbs,
            ROUTER,
            // titleForm,
            v$,
            optionsObject,
            rules,
            handleSubmit,
            options,
            isLoading,
        };
    }
}
</script>

<style scoped>

</style>