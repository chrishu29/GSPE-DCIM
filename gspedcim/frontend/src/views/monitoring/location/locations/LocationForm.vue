<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <div class="container mx-auto">
                <div
                    class=" container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="pencil-plus" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">{{ titleForm }} Location</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <router-link to="">
                            <BaseButton type="secondary">Cancel</BaseButton>
                        </router-link>
                        <router-link to="">
                            <BaseButton type="primary" :onclick="handleSubmit">Save</BaseButton>
                        </router-link>
                    </div>
                </div>
                <!--  Loading  -->
                <div v-if="isLoading">
                    <LoadingState />
                </div>
                <div v-else class=" mt-5">
                    <div class="">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-section shadow sm:rounded-lg">
                                <div
                                    class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                    <MyIcon name="map-marker-circle" />
                                    <h3 class="text-lg leading-6 font-medium text-white">Location Info</h3>
                                </div>
                                <div class="px-3 py-4">
                                    <div class="mb-4">
                                        <TextInput v-model="formData.name" :is-required="true"
                                            :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''"
                                            :has-error="v$.name.$error" label="Name" placeholder="" />
                                    </div>
                                    <div class="mb-4">
                                        <TextInput v-model="formData.slug" label="Slug" placeholder="" />

                                    </div>
                                    <div class="mb-4">
                                        <TextInput v-model="formData.facility" label="Facility" placeholder="" />
                                    </div>
                                    <div class="mb-4">
                                        <TextInput v-model="formData.asn" label="ASN" placeholder="" />
                                    </div>
                                    <div class="mb-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <SelectSingleInput :modelValue="formData.timezone"
                                                @update:modelValue="formData.timezone = $event" :options="options"
                                                label="Timezone" />
                                        </div>
                                        <div>
                                            <SelectSingleInput :modelValue="formData.status"
                                                @update:modelValue="updateStatus"
                                                :options="statusDropDown"
                                                label="Status"
                                                :custom-label-function="(option:any) => option.text" />

                                            <!-- <SelectSingleInput
                                                :modelValue="formData.status"
                                                :is-required="true"
                                                @update:modelValue="updateStatus"
                                                :options="statusDropDown"
                                                label="Status"
                                                :has-error="v$.status.$error"
                                                :custom-label-function="(option:any) => option.text"
                                                :error-msg="v$.status.$errors[0] ? `${v$.status.$errors[0].$message}` : ''" /> -->
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <TextInput v-model="formData.description" :rows="4" label="Description"
                                            placeholder="Description..." />
                                    </div>
                                    <div class="mb-4 grid grid-cols-2 gap-4">
                                        <TextInput v-model="formData.latitude" :is-required="true" input-type="number"
                                            :error-msg="v$.latitude.$errors[0] ? `${v$.latitude.$errors[0].$message}` : ''"
                                            :has-error="v$.latitude.$error" label="Latitude" placeholder="" />
                                        <TextInput v-model="formData.longitude" :is-required="true" input-type="number"
                                            :error-msg="v$.longitude.$errors[0] ? `${v$.longitude.$errors[0].$message}` : ''"
                                            :has-error="v$.longitude.$error" label="Longitude" placeholder="" />
                                    </div>
                                    <div>
                                        <img src="https://placehold.co/600x250"
                                            alt="Map placeholder image with markers indicating locations"
                                            class="rounded-md">
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                        <MyIcon name="map-marker-circle" />
                                        <h3 class="text-lg leading-6 font-medium text-white">Contact Info</h3>
                                    </div>
                                    <div class="px-3 py-4">
                                        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                            <div class="sm:col-span-2">
                                                <TextInput v-model="formData.contactName" :is-required="true"
                                                    :error-msg="v$.contactName.$errors[0] ? `${v$.contactName.$errors[0].$message}` : ''"
                                                    :has-error="v$.contactName.$error" label="Contact Name"
                                                    placeholder="" />
                                            </div>
                                            <div class="sm:col-span-2">

                                                <TextInput v-model="formData.contactNo" :is-required="true"
                                                    :error-msg="v$.contactNo.$errors[0] ? `${v$.contactNo.$errors[0].$message}` : ''"
                                                    :has-error="v$.contactNo.$error" label="Phone
                                                    Number" placeholder="" />
                                            </div>
                                            <div class="sm:col-span-2">
                                                <TextInput v-model="formData.contactEmail" :is-required="true"
                                                    :error-msg="v$.contactEmail.$errors[0] ? `${v$.contactEmail.$errors[0].$message}` : ''"
                                                    :has-error="v$.contactEmail.$error" label="Email" placeholder="" />
                                            </div>
                                            <div class="sm:col-span-2">
                                                <TextInput v-model="formData.physicalAddress" :is-required="true" :rows="4"
                                                    :error-msg="v$.physicalAddress.$errors[0] ? `${v$.physicalAddress.$errors[0].$message}` : ''"
                                                    :has-error="v$.physicalAddress.$error" label="Physical Address"
                                                    placeholder="" />

                                            </div>
                                            <div class="sm:col-span-2">
                                                <TextInput v-model="formData.shippingAddress" :is-required="true" :rows="4"
                                                    :error-msg="v$.shippingAddress.$errors[0] ? `${v$.shippingAddress.$errors[0].$message}` : ''"
                                                    :has-error="v$.shippingAddress.$error" label="Shipping Address"
                                                    placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                        <MyIcon name="map-marker-circle" />
                                        <h3 class="text-lg leading-6 font-medium text-white">Tags & Comment</h3>
                                    </div>
                                    <div class="px-3 py-4">
                                        <div class="">
                                            <TextInput v-model="formData.tags" :has-error="v$.tags.$error" label="Tag"
                                                placeholder="" />
                                        </div>
                                        <div class="mt-6">
                                            <TextInput v-model="formData.comment" :rows="4" label="Comments"
                                                placeholder="" />
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
import { useTitleForm } from '@/helper/useTitleForm';
import { reactive, ref, onMounted, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useRoute, useRouter } from 'vue-router';
import { required } from '@vuelidate/validators';
import { createNewLocation, updateLocation, fetchStatus, getDetailLocation } from '@/services/monitoring/Location/location';
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


export default {
    name: "Location-Form",
    components: {
        BaseLayout,
        Breadcrumb,
        BaseButton,
        MyIcon,
        TextInput,
        SelectSingleInput,
        LoadingState,
    },
    data(){
        return{
            statusDropDown: [] as any[],
            errorMsg: "" as any,
            selectedStatusOption: 0,
        }
    },

    setup() {
        const router = useRouter();
        const statusDropDown = ref();
        let selectedStatusOption = ref();
        let isLoading = false;
        const locationId = useRoute().params.id as string;
        console.log("Parsed Data ID : "+ locationId);
        const { titleForm } = useTitleForm();
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: ROUTER.LOCATIONS.NAME, to: ROUTER.LOCATIONS.PATH },
            { text: ROUTER.LOCATIONS_FORM.NAME },
        ];

        // check if the fetch data are success and the try to populate the data to elements for the edits
        const prefillData = async () => {
            try {
                const resp = await getDetailLocation(locationId);
                console.log(resp);
                Object.assign(formData, resp.data.location);
                if (resp && resp.data) {
                    Object.assign(formData, resp.data.location);

                    if (Array.isArray(resp.data.status)) {
                        statusDropDown.value = resp.data.status.map((item:any) => ({
                            value: item.id,
                            text: item.name
                        }));
                        formData.status = resp.data.status[0].id;
                    }
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching location data:', err);
            }
        }

        const fetchDropDownStatus = async () => {
            try {
                const resp = await fetchStatus();
                if (resp && Array.isArray(resp.data)) {
                    statusDropDown.value = resp.data.map((item) => ({
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

        const updateStatus = (selectedOption:any) => {
            formData.status = selectedOption;
            selectedStatusOption = selectedOption;
        };

        onMounted(() => {
            fetchDropDownStatus();
            prefillData();
        });

        // Form state
        const formData = reactive({
            name: '',
            slug: '',
            facility: '',
            asn: '',
            status: null,
            timezone: null,
            description: '',
            physicalAddress: '',
            shippingAddress: '',
            contactName: '',
            contactNo: '',
            contactEmail: '',
            tags: '',
            comment: '',
            latitude: null,
            longitude: null,
        });

        // Validation rules
        const rules = {
            name: { required },
            latitude: { required },
            longitude: { required },
            asn: {},
            description: {},
            timezone: {},
            status: { required },
            facility: {},
            contactName: { required },
            slug: {},
            contactNo: { required },
            contactEmail: { required },
            physicalAddress: { required },
            tags: {},
            shippingAddress: { required },
            comment: {},
        };
        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);


        const handleSubmit = async () => {
            v$.value.$touch();
            console.log("invode submit btn");
            console.log(formData.status);
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                formData.status = selectedStatusOption.value; // Extract the ID
                console.log("status ID : ",formData.status);
                isLoading = true;
                console.log("submitted the form");
                if (locationId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewLocation(formData);
                    console.log(resp.status);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);

                } else {
                    let resp = await updateLocation(formData, locationId);
                    showSnackbar('Successfully Updated', SnackbarType.Success);
                    console.log(resp.status);
                    console.log(resp.data);
                }
                isLoading = false;
                router.go(-1);
            }
        }

        const options = ref(['list', 'of', 'options']);
        const optionsObject = ref([{
            value: 0,
            text: "Option",
        }, {
            value: 1,
            text: "Option",
        }]);
        
        watch(formData, (newVal) => {
            console.log('Updated formData:', newVal);
        }, { deep: true });

        return {
            formData,
            selectedStatusOption,
            myBreadcrumbs,
            ROUTER,
            titleForm,
            v$,
            optionsObject,
            rules,
            handleSubmit,
            options,
            isLoading,
            statusDropDown,
            updateStatus,
            prefillData,
        };
        
    },

}
</script>

<style scoped></style>