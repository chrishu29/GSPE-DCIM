<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <div class="container mx-auto">
            <div
                class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                <div class="flex flex-col items-left mb-4 md:mb-0">
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <MyIcon name="pencil-plus" color="white" size="24px" />
                        <h2 class="ml-2 text-2xl font-semibold text-white">{{ titleForm }} Building</h2>
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
                        <h3 class="text-lg leading-6 font-medium text-white">Building Info</h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-3 py-4 text-left">
                        <div class="col-span-1">
                            <SelectSingleInput :modelValue="formData.locationId"
                                                @update:modelValue="updateLocation"
                                                :options="locationOptions"
                                                label="Location"
                                                :custom-label-function="(option:any) => option.text" />
                        </div>
                        <div class="col-span-1">    
                            <TextInput v-model="formData.maximumKW" :is-required="true"
                                :error-msg="v$.maximumKW.$errors[0] ? `${v$.maximumKW.$errors[0].$message}` : ''"
                                :has-error="v$.maximumKW.$error" label="Maximum KW" placeholder="" />
                        </div>
                        <div class="col-span-1 md:col-span-2">
                            <TextInput v-model="formData.name" :is-required="true"
                                :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''"
                                :has-error="v$.name.$error" label="Name" placeholder="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>

    </BaseLayout>
</template>

<script lang="ts">
import { useTitleForm } from '@/helper/useTitleForm';
import { reactive, onMounted, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useRoute, useRouter } from 'vue-router';
import { required } from '@vuelidate/validators';
import { createNewBuilding, updateBuilding, getDetailBuilding } from '@/services/monitoring/Location/building';
import { fetchLocationDropdowns } from '@/services/monitoring/Location/location';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

const { showSnackbar } = useSnackbar();

export default{
    name: "Building-Form",
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
            selecteStatusOption: 0,
        };
    },
    setup() {
        const router = useRouter();
        // let selectedLocationOption = ref();
        let isLoading = false;
        const buildingId = useRoute().params.id as string;
        const { titleForm } = useTitleForm();

        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.BUILDING.NAME} List`, to: ROUTER.BUILDING.PATH },
            { text: ROUTER.BUILDING_FORM.NAME },
        ];

        // check if the fetch data are success and the try to populate the data to elements for the edits
        const prefillData = async () => {
            try {
                const resp = await getDetailBuilding(buildingId);
                console.log(resp);
                if (resp && resp.data) {
                    Object.assign(formData, resp.data.location);

                        // if (Array.isArray(resp.data.status)) {
                        //     statusDropDown.value = resp.data.status.map((item:any) => ({
                        //         value: item.id,
                        //         text: item.name
                        //     }));
                        //     formData.status = resp.data.status[0].id;
                        // }
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching Building data:', err);
            }
        };

        const updateLocation = (selectedOption:any) => {
            formData.locationId = selectedOption.value;
            // selectedLocationOption = selectedOption.id;
            console.log("Updated formData.locationId:", formData.locationId);
        };
        
        onMounted(() => {
            prefillData();
        });

        // Form state
        const formData = reactive({
            name: '',
            maximumKW:0,
            locationId: 0,
        });

        // Validation rules
        const rules = {
            name: { required },
            maximumKW: {  },
            locationId: { required },
        };

        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        const handleSubmit = async () => {
            v$.value.$touch();
            console.log("invode submit btn");
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                console.log('formData.locationId after changed : '+formData.locationId);
                isLoading = true;
                console.log("submitted the form");
                if (buildingId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewBuilding(formData);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);

                } else {
                    let resp = await updateBuilding(formData, buildingId);
                    showSnackbar('Successfully Updated', SnackbarType.Success);
                    console.log(resp.status);
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

        watch(formData, (newVal) => {
            console.log('Updated formData:', newVal);
        }, { deep: true });
        
        return {
            formData,
            // selectedLocationOption,
            myBreadcrumbs,
            ROUTER,
            titleForm,
            v$,
            // optionsObject,
            rules,
            handleSubmit,
            prefillData,
            updateLocation,
            // options,
            isLoading,
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
    },

    mounted() {
        this.fetchLocationOptions();
    },
}
</script>


<style scoped>
</style>