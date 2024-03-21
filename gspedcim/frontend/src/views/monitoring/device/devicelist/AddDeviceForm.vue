<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <!-- Information Card -->
            <div class="container mx-auto">
                    <div class="container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                        <div class="flex flex-col items-left mb-4 md:mb-0">
                            <div class="flex text-blue-600 mr-4 mb-2 align-center">
                                <MyIcon name="cellphone-link" color="white" size="24px" />
                                <h2 class="ml-2 text-2xl font-semibold text-white">Add Device</h2>
                            </div>
                            <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                        </div>

                        <div class="flex flex-col md:flex-row gap-4">
                            <router-link  :to=ROUTER.DEVICE.PATH>
                                <BaseButton type="secondary" minWidth="150px">Cancel</BaseButton>
                            </router-link>
                            <router-link to="">
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
                            <!-- Column 1: Hardware Section -->
                            <div class="space-y-6">
                                    <div class="bg-section shadow sm:rounded-lg">
                                        <div
                                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                            <MyIcon name="harddisk" />
                                            <h3 class="text-lg leading-6 font-medium text-white">Hardware</h3>
                                        </div>
                                        <div class="px-3 py-4">
                                            <div class="mb-4">
                                                <label for="mfr" class="block text-sm font-medium text-left mb-1">Manufacturer</label>
                                                <div class="bg-white shadow-sm px-3 py-2">
                                                    <select id="mfr" class="w-full bg-white outline-none" v-model="formData.manufacturer">
                                                        <option value="">Select Manufacturer</option>
                                                        <option v-for="option in mfrOptions" :key="option.value" :value="option.value">
                                                            {{ option.text }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <label for="type" class="block text-sm font-medium text-left mb-1">Device Type</label>
                                                <div class="bg-white shadow-sm px-3 py-2">
                                                    <select id="type" class="w-full bg-white outline-none" v-model="formData.deviceTypeId">
                                                        <option value="">Select Device Type</option>
                                                        <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                                                            {{ option.text }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="mb-4">
                                                <TextInput v-model="formData.height" helper="10" :is-required="true"
                                                    :error-msg="v$.height.$errors[0] ? `${v$.height.$errors[0].$message}` : ''"
                                                    :has-error="v$.height.$error" label="Height" placeholder="" />
                                            </div>
                                            <div class="mb-4">
                                                <TextInput v-model="formData.weight" helper="10" :is-required="true"
                                                    :error-msg="v$.weight.$errors[0] ? `${v$.weight.$errors[0].$message}` : ''"
                                                    :has-error="v$.weight.$error" label="Weight" placeholder="" />
                                            </div>
                                            <div class="mb-4">
                                                <TextInput v-model="formData.wattage" helper="250" :is-required="true"
                                                    :error-msg="v$.wattage.$errors[0] ? `${v$.wattage.$errors[0].$message}` : ''"
                                                    :has-error="v$.wattage.$error" label="Wattage" placeholder="" />
                                            </div>
                                            <div class="mb-4">
                                                <TextInput v-model="formData.noPower" helper=""
                                                    :error-msg="v$.noPower.$errors[0] ? `${v$.noPower.$errors[0].$message}` : ''"
                                                    :has-error="v$.noPower.$error" label="No.Powered Connecion" placeholder="" />
                                            </div>
                                            <div class="mb-4">
                                                <div class="mb-4">
                                                <TextInput v-model="formData.noPorts" helper=""
                                                    :error-msg="v$.noPorts.$errors[0] ? `${v$.noPorts.$errors[0].$message}` : ''"
                                                    :has-error="v$.noPorts.$error" label="No Ports" placeholder="" />
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-sm font-medium text-gray-700 label">Front Pic File</label>
                                                <input type="file" @change="handleImageChange($event, 'front')" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-sm font-medium text-gray-700 label">Rear Pic File</label>
                                                <input type="file" @change="handleImageChange($event, 'rear')" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Column 2: Device Info, Key/Value, Tags & Comment Sections -->
                            <div class="space-y-6">
                                <!-- Device Info Section -->
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                            <MyIcon name="monitor-cellphone-star" />
                                            <h3 class="text-lg leading-6 font-medium text-white">Device Info</h3>
                                        </div>
                                        <div class="px-3 py-4">
                                            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                                <div class="sm:col-span-2">
                                                    <TextInput v-model="formData.name" :is-required="true"
                                                        :error-msg="v$.name.$errors[0] ? `${v$.name.$errors[0].$message}` : ''"
                                                        :has-error="v$.name.$error" label="Name" placeholder="" />
                                                </div>
                                                <div class="sm:col-span-2">
                                                    <label for="role" class="block text-sm font-medium text-left mb-1">Device Role</label>
                                                    <div class="bg-white shadow-sm px-3 py-2">
                                                        <select id="role" class="w-full bg-white outline-none" v-model="formData.deviceRole">
                                                            <option value="">Select Device Role</option>
                                                            <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                                                            {{ option.text }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                
                                <!-- Key/Value Section -->
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                            <MyIcon name="script-text-key" />
                                            <h3 class="text-lg leading-6 font-medium text-white">Key / Value</h3>
                                        </div>
                                        <div class="px-3 py-4">
                                            <div v-for="(kv, index) in formData.deviceKeyValues" :key="index" class="mb-4 flex items-center">
                                                <div class="flex-1 mr-2">
                                                    <label class="block text-sm font-medium text-gray-700">Key</label>
                                                    <input v-model="kv.key" placeholder="Key" class="w-full">
                                                </div>
                                                <div class="flex-1">
                                                    <label class="block text-sm font-medium text-gray-700">Value</label>
                                                    <input v-model="kv.value" placeholder="Value" class="w-full">
                                                </div>
                                                <div>
                                                    <MyIcon name="trash-can" color="red" @click="removeKeyValue(index)" class="cursor-pointer"/>
                                                </div>
                                            </div>
                                            <div class="mt-6">
                                                <MyIcon name="plus-box" color="green" @click="addKeyValue" class="cursor-pointer"/>
                                            </div>
                                        </div>

                                </div>
                                
                                <!-- Tags & Comment Section -->
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                            <MyIcon name="tag-text" />
                                            <h3 class="text-lg leading-6 font-medium text-white">Tags & Comment</h3>
                                        </div>
                                        <div class="px-3 py-4">
                                            <div class="">
                                                <TextInput v-model="formData.tags"
                                                    :error-msg="v$.tags.$errors[0] ? `${v$.tags.$errors[0].$message}` : ''"
                                                    :has-error="v$.tags.$error" label="Tag" placeholder="" />
                                            </div>
                                            <div class="mt-6">
                                                <TextInput v-model="formData.comments"
                                                    :error-msg="v$.comments.$errors[0] ? `${v$.comments.$errors[0].$message}` : ''"
                                                    :has-error="v$.comments.$error" label="Comments" placeholder="" />
                                            </div>
                                        </div>
                                </div>
                            </div>

                            <!-- Column 3: SNMP Configuration and Item List Sections -->
                            <div class="space-y-6">
                                <!-- SNMP Configuration Section -->
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                            <MyIcon name="cog" />
                                            <h3 class="text-lg leading-6 font-medium text-white">SNMP Configuration</h3>
                                        </div>
                                        <div class="px-3 py-4">
                                            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                                <div class="sm:col-span-2">
                                                    <SelectSingleInput :modelValue="formData.snmpVersion"
                                                    @update:modelValue="formData.snmpVersion = $event" :options="options"
                                                    label="SNMP Version" :has-error="v$.snmpVersion.$error"
                                                    :error-msg="v$.snmpVersion.$errors[0] ? `${v$.snmpVersion.$errors[0].$message}` : ''" />
                                                </div>
                                                <div class="sm:col-span-2">
                                                    <TextInput v-model="formData.snpmReadOnlyCommunity"
                                                    :error-msg="v$.snpmReadOnlyCommunity.$errors[0] ? `${v$.snpmReadOnlyCommunity.$errors[0].$message}` : ''"
                                                    :has-error="v$.snpmReadOnlyCommunity.$error" label="SNMP Read Only Community" placeholder="" />
                                                </div>
                                                <div class="sm:col-span-2">
                                                    <TextInput v-model="formData.consecutiveSnmpFailures"
                                                    :error-msg="v$.consecutiveSnmpFailures.$errors[0] ? `${v$.consecutiveSnmpFailures.$errors[0].$message}` : ''"
                                                    :has-error="v$.consecutiveSnmpFailures.$error" label="Consecutive SNMP Failure" placeholder="" />
                                                        <span style="font-size: 12px; color: blue;">*Polling is disabled after three consecutive failures</span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                
                                <!-- Item List Section -->
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                            class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                            <MyIcon name="format-list-text" />
                                            <h3 class="text-lg leading-6 font-medium text-white">Item List</h3>
                                        </div>
                                        <div class="px-3 py-4">
                                            <div class="mb-4 grid grid-cols-8 gap-4">
                                                <div class="col-span-6">
                                                    <TextInput v-model="formData.itemsList"
                                                    :error-msg="v$.itemsList.$errors[0] ? `${v$.itemsList.$errors[0].$message}` : ''"
                                                    :has-error="v$.itemsList.$error" placeholder="" />
                                                </div>
                                                <div class="col-span-2 grid grid-cols-2">
                                                    <div>
                                                        <MyIcon name="trash-can" color="red" />
                                                    </div>
                                                    <div>
                                                        <MyIcon name="plus-box" color="green" />
                                                    </div>
                                                </div>
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
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useRoute, useRouter } from 'vue-router';
import { required } from '@vuelidate/validators';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import { createNewDevice, updateDevice, getDetailDevice } from '@/services/monitoring/Device/device';
import { fetchMfrList } from '@/services/monitoring/Device/mfr';
import { fetchTypeList } from '@/services/monitoring/Device/device-type';
import { fetchRoleList } from '@/services/monitoring/Device/device-roles';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

const { showSnackbar } = useSnackbar();

interface KeyValue {
  key: string;
  value: string;
}

export default {
    name: "Device-Form",
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
            roleOptions: [] as any[],
            typeOptions: [] as any[],
            mfrOptions: [] as any[],
        }
    },
    computed: {
        transformedDeviceKeyValues() {
            return this.formData.deviceKeyValues.map(kv => `${kv.key}:${kv.value}`);
        }
    },

    setup() {
        let isLoading = false;
        const router = useRouter();
        const deviceId = useRoute().params.id as string;

        // const { titleForm } = useTitleForm();
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: ROUTER.DEVICE.NAME, to: ROUTER.DEVICE.PATH },
            { text: ROUTER.DEVICE_FORM.NAME },
        ];

        // Form state
        const formData = reactive({
            name: '',
            deviceRole: null,
            manufacturer: null,
            deviceTypeId: null,
            height: null,
            weight: null,
            wattage: null,
            noPower: null,
            noPorts: null,
            frontPicture: '',
            frontPictureFileName: '',
            rearPicture: '',
            rearPictureFileName: '',
            snmpVersion: null,
            snpmReadOnlyCommunity: null,
            consecutiveSnmpFailures: null,
            comments: '',
            tags: '',
            deviceKeyValues: [] as KeyValue[],
            itemsList: [] as string[],
        });

        // Validation rules
        const rules = {
            manufacturer: {},
            deviceTypeId: {},
            height: { required },
            weight: { required },
            wattage: { required },
            noPower: {},
            noPorts: {},
            name: { required },
            deviceRole: {},
            frontPicture: {},
            frontPictureFileName: {},
            rearPicture: {},
            rearPictureFileName: {},
            snmpVersion: {},
            snpmReadOnlyCommunity: {},
            consecutiveSnmpFailures: {},
            comments: {},
            tags: {},
            deviceKeyValues: {},
            itemsList: {},
        };
        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        //prefill form data
        const prefillData = async () => {
            try {
                const resp = await getDetailDevice(deviceId);
                console.log(resp);
                if (resp && resp.data) {
                    Object.assign(formData, resp.data);
                    //Ensure formData.manufacturer is set to the manufacturer's ID (value) when prefilling the form data
                    formData.manufacturer = resp.data.manufacturer.id; 
                    formData.deviceTypeId = resp.data.deviceType.id;
                    formData.deviceRole = resp.data.deviceRole.id;
                    formData.snmpVersion = resp.data.snmpVersion;
                    formData.deviceKeyValues = resp.data.deviceKeyValues || []; // Replace with actual key from response
                    formData.itemsList = resp.data.itemsList || []; // Replace with actual key from response
                    formData.name = resp.data.name;
                    formData.frontPicture = resp.data.frontPicture;
                    formData.frontPictureFileName = resp.data.frontPictureFileName;
                    formData.rearPicture = resp.data.rearPicture;
                    formData.rearPictureFileName = resp.data.rearPictureFileName;
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
             // Transform deviceKeyValues into a single line string for each record
            const transformedKeyValues = formData.deviceKeyValues.map(kv => `${kv.key}:${kv.value}`);
            // Ensure each item in itemsList is a string
            const transformedItemsList = Array.isArray(formData.itemsList)
            ? formData.itemsList.map(item => String(item))
            : [];

            // Create a new object for submission, replacing deviceKeyValues with the transformed string
            const submissionData = {
                ...formData,
                deviceKeyValues: transformedKeyValues,
                itemsList: transformedItemsList
            };

            // Now use submissionData for your submission logic
            console.log("Submitting Data: ", JSON.stringify(submissionData));
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                isLoading = true;
                console.log("submitted the form");
                if (deviceId === 'new') {
                    console.log(JSON.stringify(submissionData));
                    let resp = await createNewDevice(submissionData);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);
                } else {
                    let resp = await updateDevice(formData, deviceId);
                    showSnackbar('Successfully Updated', SnackbarType.Success);
                    console.log(resp.status);
                    console.log(resp.data);
                }
                isLoading = false;
                router.go(-1);
            }
        };

        const addKeyValue = () => {
            formData.deviceKeyValues.push({ key: '', value: '' });
        };

        const removeKeyValue = (index: number) => {
            formData.deviceKeyValues.splice(index, 1);
        };

        const addItemToList = () => {
            formData.itemsList.push('');
        };

        const removeItemFromList = (index: number) => {
            formData.itemsList.splice(index, 1);
        };

        const options = ref([1, 2, 3]);
        const optionsObject = ref([{
            value: 1,
            text: "Option",
        }, {
            value: 2,
            text: "Option",
        }]);

        onMounted(() => {
            prefillData();
        });

        return {
            formData,
            myBreadcrumbs,
            ROUTER,
            // titleForm,
            v$,
            optionsObject,
            rules,
            handleSubmit,
            prefillData,
            addKeyValue,
            removeKeyValue,
            addItemToList,
            removeItemFromList,
            options,
            isLoading,
        };
    },

    methods:{
        //fetch dropdowns
        async fetchType() {
                    try {
                        const response = await fetchTypeList();
                        this.typeOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
                    } catch (err) {
                        console.error('Error fetching Type options:', err);
                    }
                },
                //fetch dropdowns
                async fetchManufacturer() {
                    try {
                        const response = await fetchMfrList();
                        this.mfrOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
                    } catch (err) {
                        console.error('Error fetching Manufacturer options:', err);
                    }
                },
                //fetch dropdowns
                async fetchRole() {
                    try {
                        const response = await fetchRoleList();
                        this.roleOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
                    } catch (err) {
                        console.error('Error fetching Role options:', err);
                    }
                },
        //image proccessing to get image file name and image encode to Base64
        handleImageChange(event:any, type:any) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // Check if reader.result is not null and is a string
                    if (reader.result && typeof reader.result === 'string') {
                        const base64String = reader.result.split(',')[1]; // Splitting and taking the part after the comma
                        if (type === 'front') {
                            this.formData.frontPictureFileName = file.name;
                            this.formData.frontPicture = base64String; // Only base64 string without the prefix
                        } else if (type === 'rear') {
                            this.formData.rearPictureFileName = file.name;
                            this.formData.rearPicture = base64String; // Only base64 string without the prefix
                        }
                    }
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }
        }
    },


    mounted() {
        this.fetchManufacturer();
        this.fetchType();
        this.fetchRole();
    },
}
</script>

<style scoped></style>