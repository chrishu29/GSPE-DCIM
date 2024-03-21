<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <div class="container mx-auto">
            <div
                class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                <div class="flex flex-col items-left mb-4 md:mb-0">
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <MyIcon name="pencil-plus" color="white" size="24px" />
                        <h2 class="ml-2 text-2xl font-semibold text-white">{{titleForm}} Rack</h2>
                    </div>
                    <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <router-link to="">
                        <BaseButton type="secondary">Cancel</BaseButton>
                    </router-link>
                    <router-link to="">
                        <BaseButton :onclick="handleSubmit" type="primary">Save</BaseButton>
                    </router-link>
                </div>
            </div>
                <!--  Loading  -->
                <div v-if="isLoading">
                    <LoadingState />
                </div>

            <div class="py-5 sm:py-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-section  rounded-lg text-left">
                        <div
                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                            <MyIcon name="map-marker-circle" />
                            <h3 class="text-lg leading-6 font-medium text-white">Rack Info</h3>
                        </div>
                        <div class="grid grid-cols-1 gap-3 p-4">
                            <div>
                                <TextInput v-model="formData.name" :is-required="true"
                                :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''"
                                :has-error="v$.name.$error" label="Name" placeholder="" />
                            </div>
                            <div class="">
                                <SelectSingleInput :modelValue="formData.room" :is-required="true"
                                @update:modelValue="formData.room = $event" :options="options"
                                label="Room" :has-error="v$.room.$error"
                                :error-msg="v$.room.$errors[0] ? `${v$.room.$errors[0].$message}` : ''" />
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div class="col-span-1">
                                    <SelectSingleInput :modelValue="formData.groupno" :is-required="true"
                                    @update:modelValue="formData.groupno = $event" :options="options"
                                    label="Group No." :has-error="v$.groupno.$error"
                                    :error-msg="v$.groupno.$errors[0] ? `${v$.groupno.$errors[0].$message}` : ''" />
                                </div>
                                <div class="col-span-1">
                                    <SelectSingleInput :modelValue="formData.rackpos" :is-required="true"
                                    @update:modelValue="formData.rackpos = $event" :options="options"
                                    label="Rack Position" :has-error="v$.rackpos.$error"
                                    :error-msg="v$.rackpos.$errors[0] ? `${v$.rackpos.$errors[0].$message}` : ''" />
                                </div>
                            </div>
                            <div>
                                <label for="facility" class="block text-sm font-medium text-gray-700">Facility </label>
                                <input type="text" id="name" name="facility"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                            <div>
                                <TextInput v-model="formData.serialno" :is-required="true"
                                :error-msg="v$.serialno.$errors[0] ? `${v$.serialno.$errors[0].$message}` : ''"
                                :has-error="v$.serialno.$error" label="Serial Number" placeholder="" />
                            </div>
                            <div class="">
                                <label for="u1-pos" class="block text-sm font-medium text-gray-700">U1 Position
                                </label>
                                <select id="u1-pos" name="u1-pos"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>Select position</option>
                                </select>
                            </div>
                            <div>
                                <label for="model" class="block text-sm font-medium text-gray-700">Model </label>
                                <input type="text" id="model" name="model"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                            <div>
                                <label for="keylockinfo" class="block text-sm font-medium text-gray-700 ">Key/Lock
                                    Information </label>
                                <input type="text" id="keylockinfo" name="keylockinfo"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="maxkw" class="block text-sm font-medium text-gray-700 ">Maximum KW </label>
                                    <input type="text" id="maxkw" name="maxkw"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                </div>
                                <div>
                                    <label for="max-weight" class="block text-sm font-medium text-gray-700 ">Maximum Weight
                                    </label>
                                    <input type="text" id="max-weight" name="max-weight"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                </div>
                            </div>
                            <div>
                                <label for="date-instal" class="block text-sm font-medium text-gray-700 ">Date of
                                    Installation
                                </label>
                                <input type="date" id="date-instal" name="date-instal"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">

                            </div>
                            <div>
                                <label for="asign-to" class="block text-sm font-medium text-gray-700 ">Assign To
                                </label>
                                <select id="asing-to" name="asign-to"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>Select user</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-6">
                        <div class="bg-section  rounded-lg text-left">
                            <div
                                class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                <MyIcon name="ruler-square" />
                                <h3 class="text-lg leading-6 font-medium text-white">Dimension Info</h3>
                            </div>
                            <div class="grid grid-cols-1 gap-3 p-4">
                                <div>
                                    <label for="type" class="block text-sm font-medium text-gray-700 ">Type
                                    </label>
                                    <select id="type" name="type"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                        <option>Select type</option>
                                    </select>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <TextInput v-model="formData.width" :is-required="true"
                                        :error-msg="v$.width.$errors[0] ? `${v$.width.$errors[0].$message}` : ''"
                                        :has-error="v$.width.$error" label="Width" placeholder="" />
                                    </div>
                                    <div>
                                        <TextInput v-model="formData.height" :is-required="true"
                                        :error-msg="v$.height.$errors[0] ? `${v$.height.$errors[0].$message}` : ''"
                                        :has-error="v$.height.$error" label="Height" placeholder="" />
                                    </div>
                                </div>
                                <div>
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox bg-white border-gray-300 rounded">
                                        <span class="ml-2">Descending units (Units are numbered top-to-bottom)</span>
                                    </label>
                                </div>

                            </div>
                        </div>


                        <div class="bg-section  rounded-lg text-left">
                            <div
                                class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                <MyIcon name="ruler-square" />
                                <h3 class="text-lg leading-6 font-medium text-white">Tags & Comment</h3>
                            </div>
                            <div class="grid grid-cols-1 gap-3 p-4">
                                <div>
                                    <label for="tags" class="block text-sm font-medium text-gray-700 ">Tag
                                    </label>
                                    <textarea rows="2"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Tag"></textarea>
                                </div>
                                <div>
                                    <label for="comments" class="block text-sm font-medium text-gray-700 ">Comments
                                    </label>
                                    <textarea rows="4"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Comments"></textarea>
                                </div>

                            </div>
                        </div>


                        <div class=" bg-section  rounded-lg text-left">

                            <div
                                class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                <MyIcon name="ruler-square" />
                                <h3 class="text-lg leading-6 font-medium text-white">Map Area</h3>
                            </div>
                            <div class="grid grid-cols-1 gap-4 p-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="x1" class="block text-sm font-medium text-gray-700 ">X1
                                        </label>
                                        <input type="text" id="x1" name="x1"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    </div>
                                    <div>
                                        <label for="y1" class="block text-sm font-medium text-gray-700 ">Y1
                                        </label>
                                        <input type="text" id="y1" name="y1"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    </div>
                                    <div>
                                        <label for="x2" class="block text-sm font-medium text-gray-700 ">X2
                                        </label>
                                        <input type="text" id="x2" name="x2"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    </div>
                                    <div>
                                        <label for="y2" class="block text-sm font-medium text-gray-700 ">Y2
                                        </label>
                                        <input type="text" id="y2" name="y2"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    </div>
                                </div>
                                <div>
                                    <label for="zoom" class="block text-sm font-medium text-gray-700">Zoom
                                    </label>
                                    <input type="text" id="zoom" name="zoom"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-section rounded-lg mt-6">
                    <div
                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                        <MyIcon name="ruler-square" />
                        <h3 class="text-lg leading-6 font-medium text-white">Room Area</h3>
                    </div>
                    <div class="p-4">
                        <img src="https://placehold.co/1500x250"
                            alt="Map placeholder image with markers indicating locations" class="rounded-md">
                    </div>
                </div>
            </div>
        </div>
        </form>
    </BaseLayout>
</template>
<script lang="ts">

import BaseLayout from '@/components/layout/BaseLayout.vue';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
import { useTitleForm } from '@/helper/useTitleForm';
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { createNewRacks, updateRacks } from '@/services/monitoring/Location/rack';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

import VueMultiselect from 'vue-multiselect';

export default {
    name: "Rack-Form",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
        TextInput,
        VueMultiselect,
        SelectSingleInput,
        LoadingState,
    },
    setup() {
    let isLoading = false;
    const rackId = useRoute().params.id as string;
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: ROUTER.RACK.NAME, to: ROUTER.RACK.PATH },
            { text: ROUTER.RACK_FORM.NAME },
        ];
        const { titleForm } = useTitleForm();

        // Form state
        const formData = reactive({
            room: null,
            groupno: null,
            rackpos: null,
            name: '',
            serialno: '',
            width: '',
            height: '',
        });

        // Validation rules
        const rules = {
            room: { required },
            groupno: { required },
            rackpos: { required },
            name: { required },
            serialno: { required },
            width: { required },
            height: { required },
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
                if (rackId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewRacks(formData);
                    console.log(resp.status);
                    console.log(resp.data);
                } else {
                    let resp = await updateRacks(formData, rackId);
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
            titleForm,
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


<style>
.required::after {
    content: '*';
    color: red;

}

.input-icon {
    position: relative;
    display: inline-block;
}

.input-icon .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.input-icon input[type="text"] {
    padding-left: 30px;
}
</style>