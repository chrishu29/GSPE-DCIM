<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <div class="container mx-auto">
            <div
                class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                <div class="flex flex-col items-left mb-4 md:mb-0">
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <MyIcon name="pencil-plus" color="white" size="24px" />
                        <h2 class="ml-2 text-2xl font-semibold text-white">{{ titleForm }} Room</h2>
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

            <!-- <button type="submit"> Submit form </button> -->
            <div class=" mt-5">
                <div class="bg-section shadow rounded-lg pb-8">
                    <div
                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                        <MyIcon name="home-circle-outline" />
                        <h3 class="text-lg leading-6 font-medium text-white">Room Info</h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-3 py-4 text-left">
                        <div class="col-span-1">
                            <SelectSingleInput :modelValue="formData.locationId"
                                                @update:modelValue="updateLocation"
                                                :options="locationOptions"
                                                label="Location"
                                                :custom-label-function="(option:any) => option.text" 
                                                :is-required="true"/>
                        </div>
                        <div class="col-span-1">
                            <SelectSingleInput :modelValue="formData.buildingId"
                                                @update:modelValue="updateBuilding"
                                                :options="buildingOptions"
                                                label="Building"
                                                :custom-label-function="(option:any) => option.text" 
                                                :is-required="true"/>
                        </div>
                        <div class="col-span-1">
                            <SelectSingleInput :modelValue="formData.floorId"
                                                @update:modelValue="updateFloor"
                                                :options="floorOptions"
                                                label="Floor"
                                                :custom-label-function="(option:any) => option.text" 
                                                :is-required="true"/>
                        </div>

                        <div class="col-span-1 md:col-span-2">
                            <TextInput v-model="formData.name" :is-required="true"
                                :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''"
                                :has-error="v$.name.$error" label="Name" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.maximumKW" :is-required="true"
                                :error-msg="v$.maximumKW.$errors[0] ? `${v$.maximumKW.$errors[0].$message}` : ''"
                                :has-error="v$.maximumKW.$error" label="Maximum KW" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.roomNo" helper="250" :is-required="true"
                                :error-msg="v$.roomNo.$errors[0] ? `${v$.roomNo.$errors[0].$message}` : ''"
                                :has-error="v$.roomNo.$error" label="Room No." placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.row" helper="250" :is-required="true"
                                :error-msg="v$.row.$errors[0] ? `${v$.row.$errors[0].$message}` : ''"
                                :has-error="v$.row.$error" label="Rows" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.column" helper="250" :is-required="true"
                                :error-msg="v$.column.$errors[0] ? `${v$.column.$errors[0].$message}` : ''"
                                :has-error="v$.column.$error" label="Columns" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.racksInGroup" helper="250" :is-required="true"
                                :error-msg="v$.racksInGroup.$errors[0] ? `${v$.racksInGroup.$errors[0].$message}` : ''"
                                :has-error="v$.racksInGroup.$error" label="How many Rack(s) in a group?" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.groupInColumn" helper="250" :is-required="true"
                                :error-msg="v$.groupInColumn.$errors[0] ? `${v$.groupInColumn.$errors[0].$message}` : ''"
                                :has-error="v$.groupInColumn.$error" label="How many Group(s) in a Column?" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.groupInRow" helper="250" :is-required="true"
                                :error-msg="v$.groupInRow.$errors[0] ? `${v$.groupInRow.$errors[0].$message}` : ''"
                                :has-error="v$.groupInRow.$error" label="How many Group(s) in a Row?" placeholder="" />
                        </div>
                        <div class="col-span-1 md:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Picture File</label>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                        viewBox="0 0 48 48" aria-hidden="true">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12m28-24l-14 14m0 0l-7-7m21 21V20m0 56V32m0 0H4"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload">
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">
                                        PNG, JPG up to 10MB
                                    </p>
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
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
import { useTitleForm } from '@/helper/useTitleForm';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { createNewRoom, updateRoom, getDetailRoom } from '@/services/monitoring/Location/room';
import { fetchLocationDropdowns } from '@/services/monitoring/Location/location';
import { fetchBuildingDropdowns } from '@/services/monitoring/Location/building';
import { fetchFloorDropdowns } from '@/services/monitoring/Location/floor';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';

import VueMultiselect from 'vue-multiselect';
const { showSnackbar } = useSnackbar();

export default {
    name: "Room-Form",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
        TextInput,
        VueMultiselect,
        SelectSingleInput,
    },
    data() {
        return{
            locationOptions: [] as any[],
            buildingOptions: [] as any[],
            floorOptions: [] as any[],
            // selecteStatusOption: 0,
        };
    },
    setup() {
        let isLoading = false;
        const router = useRouter();
        const roomId = useRoute().params.id as string;
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: ROUTER.ROOM.NAME, to: ROUTER.ROOM.PATH },
            { text: ROUTER.ROOM_FORM.NAME },
        ];
        const { titleForm } = useTitleForm();

        // Form state
        const formData = reactive({
            name: '',
            roomNo: '',
            maximumKW: null,
            row: '',
            groupInRow: '',
            column: '',
            groupInColumn: '',
            racksInGroup: '',
            pictureFile: '',
            pictureFileName: '',
            floorId: null,
            locationId: null,
            buildingId: null,

        });

        // Validation rules
        const rules = {
            locationId: { required },
            buildingId: { required },
            floorId: { required },
            name: { required },
            roomNo: { required },
            maximumKW: { },
            row: { required },
            column: { required },
            racksInGroup: { required },
            groupInColumn: { required },
            groupInRow: { required },
            pictureFile: { required },
            pictureFileName: { required }
        };

        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        // check if the fetch data are success and the try to populate the data to elements for the edits
        const prefillData = async () => {
            try {
                const resp = await getDetailRoom(roomId);
                console.log(resp);
                if (resp && resp.data) {
                    Object.assign(formData, resp.data);
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching Building data:', err);
            }
        };

        const handleSubmit = async () => {
            v$.value.$touch();
            console.log("invode submit btn");
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                // console.log('formData.locationId after changed : '+formData.locationId);
                isLoading = true;
                console.log("submitted the form");
                if (roomId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewRoom(formData);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);

                } else {
                    let resp = await updateRoom(formData, roomId);
                    showSnackbar('Successfully Updated', SnackbarType.Success);
                    console.log(resp.status);
                    console.log(resp.data);
                }
                isLoading = false;
                router.go(-1);
            }
        }

        // const selected = ref(null);
        // const options = ref(['list', 'of', 'options']);

        // how to watch specific model 
        // watch( () => formData.selected2, (newVal, oldVal) => {
        //     if (newVal !== oldVal) {
        //         console.log("change");
        //     }
        // });

        
        const updateLocation = (selectedOption:any) => {
            formData.locationId = selectedOption.value;
            // selectedLocationOption = selectedOption.id;
            console.log("Updated formData.locationId:", formData.locationId);
        };
        const updateBuilding = (selectedOption:any) => {
            formData.buildingId = selectedOption.value;
            // selectedLocationOption = selectedOption.id;
            console.log("Updated formData.buildingId:", formData.buildingId);
        };
        const updateFloor = (selectedOption:any) => {
            formData.floorId = selectedOption.value;
            // selectedLocationOption = selectedOption.id;
            console.log("Updated formData.floorId:", formData.floorId);
        };

        onMounted(() => {
            prefillData();
        });

        return {
            formData,
            myBreadcrumbs,
            ROUTER,
            titleForm,
            v$,
            rules,
            handleSubmit,
            updateLocation,
            updateBuilding,
            updateFloor,
            // selected,
            // options,
        };
    },
    
    methods:{
        async fetchLocationOptions() {
            try {
                const response = await fetchLocationDropdowns();
                this.locationOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },
        async fetchBuildingOptions() {
            try {
                const response = await fetchBuildingDropdowns();
                this.buildingOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },
        async fetchFloorOptions() {
            try {
                const response = await fetchFloorDropdowns();
                this.floorOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },

        //method for saving file name and encode base64
        handleFileUpload(event: Event) {
            const input = event.target as HTMLInputElement;
            if (input && input.files && input.files.length > 0) {
                const file = input.files[0];
                this.formData.pictureFileName = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target && e.target.result) {
                        const base64String = e.target.result as string;
                        // Remove the Data URL scheme (e.g., "data:image/png;base64,") and keep only the base64 part
                        this.formData.pictureFile = base64String.split(',')[1];
                    }
                };
                reader.readAsDataURL(file);
            }
        },
    },
    
    mounted() {
        this.fetchLocationOptions();
        this.fetchBuildingOptions();
        this.fetchFloorOptions();
    },
}
</script>


<style>
.required::after {
    content: '*';
    color: red;
}
</style>