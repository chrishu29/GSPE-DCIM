<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <div class="container mx-auto">
            <div
                class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                <div class="flex flex-col items-left mb-4 md:mb-0">
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <MyIcon name="pencil-plus" color="white" size="24px" />
                        <h2 class="ml-2 text-2xl font-semibold text-white">{{ titleForm }} Floor</h2>
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
            
            <div class=" mt-5">
                <div class="bg-section shadow rounded-lg pb-8">
                    <div
                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                        <MyIcon name="map-marker-circle" />
                        <h3 class="text-lg leading-6 font-medium text-white">Floor Info</h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-3 py-4 text-left">
                        <div class="col-span-1">
                            <SelectSingleInput :modelValue="formData.locationId"
                                                @update:modelValue="updateLocation"
                                                :options="locationOptions"
                                                label="Location"
                                                :custom-label-function="(option:any) => option.text" />
                            <!-- <SelectSingleInput :modelValue="formData.locationName" :is-required="true"
                                @update:modelValue="updateLocation = formData.locationName = $event" :options="locationOptions"
                                :custom-label-function="(option:any) => option.text"
                                label="Floor" :has-error="v$.locationName.$error"
                                :error-msg="v$.locationName.$errors[0] ? `${v$.locationName.$errors[0].$message}` : ''" /> -->
                        </div>
                        <div class="col-span-1">
                            <SelectSingleInput :modelValue="formData.buildingId"
                                                @update:modelValue="updateBuilding"
                                                :options="buildingOptions"
                                                label="Building"
                                                :custom-label-function="(option:any) => option.text" />
                            <!-- <SelectSingleInput :modelValue="formData.name" :is-required="true"
                                @update:modelValue="formData.name = $event" :options="options"
                                label="Building" :has-error="v$.name.$error"
                                :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''" /> -->
                        </div>

                        <div class="col-span-1">
                            <TextInput v-model="formData.name" :is-required="true"
                                :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''"
                                :has-error="v$.name.$error" label="Name" placeholder="" />
                        </div>
                        <div class="col-span-1">
                            <TextInput v-model="formData.maximumKW"
                                :error-msg="v$.maximumKW.$errors[0] ? `${v$.maximumKW.$errors[0].$message}` : ''"
                                :has-error="v$.maximumKW.$error" label="Maksimum KW" placeholder="" />
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
import { useTitleForm } from '@/helper/useTitleForm';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { createNewFloor, updateFloor, getDetailFloor } from '@/services/monitoring/Location/floor';
import { fetchLocationDropdowns } from '@/services/monitoring/Location/location';
import { fetchBuildingDropdowns } from '@/services/monitoring/Location/building';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

const { showSnackbar } = useSnackbar();


export default{
    name: "Floor-Form",
    components: {
        BaseLayout,
        BaseButton,
        Breadcrumb,
        MyIcon,
        TextInput,
        SelectSingleInput,
        LoadingState,
    },
    data() {
        return{
            locationOptions: [] as any[],
            buildingOptions: [] as any[],
            selectedLocationOption: '',
            selectedBuildingOption: '',
        };
    },
    setup() {
        const router = useRouter();
        let isLoading = false;
        const locationOptions = ref();
        const buildingOptions = ref();
        let selectedLocationOption = ref();
        let selectedBuildingOption = ref();
        const floorId = useRoute().params.id as string;
        const { titleForm } = useTitleForm();

        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.FLOOR.NAME} List`, to: ROUTER.FLOOR.PATH },
            { text: ROUTER.FLOOR_FORM.NAME },
        ];

        // Form state
        const formData = reactive({
                name: '',
            maximumKW: 0,
            locationId: null,
            buildingId: null,
        });

        // Validation rules
        const rules = {
            locationId: { required },
            buildingId: { required },
            name: { required },
            maximumKW: {},
        };

        // check if the fetch data are success and the try to populate the data to elements for the edits
        const prefillData = async () => {
            try {
                const resp = await getDetailFloor(floorId);
                if (resp && resp.data) {
                    formData.locationId = resp.data.locationId;
                    formData.buildingId = resp.data.buildingId;
                    // Set other formData fields as necessary
                    formData.name = resp.data.name;
                    formData.maximumKW = resp.data.maximumKW;
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching floor data:', err);
            }
        };

        const fetchDropDownLocation = async () => {
            try {
                const resp = await fetchBuildingDropdowns();
                if (resp && Array.isArray(resp.data)) {
                    buildingOptions.value = resp.data.map((item) => ({
                        value: item.id,
                        text: item.name,
                    }));
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching status drop down data:', err);
            }
        };

        const fetchDropDownBuilding = async () => {
            try {
                const resp = await fetchLocationDropdowns();
                if (resp && Array.isArray(resp.data)) {
                    locationOptions.value = resp.data.map((item) => ({
                        value: item.id,
                        text: item.name,
                    }));
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching status drop down data:', err);
            }
        };
        
        const updateLocation = (selectedOption:any) => {
            formData.locationId = selectedOption.value;
            selectedLocationOption = selectedOption.value;
        };

        const updateBuilding = (selectedOption:any) => {
            formData.buildingId = selectedOption.value;
            selectedBuildingOption = selectedOption.value;
        };

        onMounted(() => {
            prefillData();
            fetchDropDownLocation();
            fetchDropDownBuilding();
        });

        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        const handleSubmit = async () => {
            v$.value.$touch();
            console.log("invode submit btn");
            console.log(formData);
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                isLoading = true;
                console.log("submitted the form");
                if (floorId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewFloor(formData);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);

                } else {
                    let resp = await updateFloor(formData, floorId);
                    showSnackbar('Successfully Updated', SnackbarType.Success);
                    console.log(resp.data);
                }
                isLoading = false;
                router.go(-1);
            }
        }

        // const options = ref(['list', 'of', 'options']);
        // const optionsObject = ref([{
        //     value: 1,
        //     text: "Option",
        // }, {
        //     value: 2,
        //     text: "Option",
        // }]);
        return {
            formData,
            myBreadcrumbs,
            ROUTER,
            titleForm,
            v$,
            // optionsObject,
            rules,
            handleSubmit,
            prefillData,
            updateLocation,
            updateBuilding,
            // options,
            locationOptions,
            buildingOptions,
            selectedLocationOption,
            selectedBuildingOption,
            isLoading,
        };
    }
}
</script>


<style>
</style>