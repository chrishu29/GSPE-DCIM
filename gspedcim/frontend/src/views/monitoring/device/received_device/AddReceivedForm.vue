<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <!-- Information Card -->
            <div class="container mx-auto">
                <div class="container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="cellphone-link" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">Add Received Device</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <router-link  :to=ROUTER.RECEIVED.PATH>
                            <BaseButton type="secondary" minWidth="150px">Cancel</BaseButton>
                        </router-link>
                        <router-link to=''>
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
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                <select id="mfr" class="w-full bg-white outline-none" v-model="formData.mfr">
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
                                                <select id="type" class="w-full bg-white outline-none" v-model="formData.deviceType">
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
                                    </div>
                                </div>
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                        <MyIcon name="tag-text-outline" />
                                        <h3 class="text-lg leading-6 font-medium text-white">Tags</h3>
                                    </div>
                                    <div class="px-3 py-4">
                                        <div class="">
                                            <TextInput v-model="formData.tag"
                                                :error-msg="v$.tag.$errors[0] ? `${v$.tag.$errors[0].$message}` : ''"
                                                :has-error="v$.tag.$error" label="Tags" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-section shadow sm:rounded-lg">
                                <div
                                    class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                    <MyIcon name="monitor-cellphone-star" />
                                    <h3 class="text-lg leading-6 font-medium text-white">Device</h3>
                                </div>
                                <div class="px-3 py-4">
                                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div class="sm:col-span-2">
                                            <label for="name" class="block text-sm font-medium text-left mb-1">Device Name</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="name" class="w-full bg-white outline-none" v-model="formData.deviceName">
                                                    <option value="">Select Device Name</option>
                                                    <option v-for="option in deviceNameOptions" :key="option.id" :value="option.name">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
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
                                        <div class="sm:col-span-2">
                                            <div class="grid grid-cols-8 gap-4">
                                                <div class="col-span-6">
                                                    <SelectSingleInput :modelValue="formData.serialNum"
                                                    @update:modelValue="formData.serialNum = $event" :options="options"
                                                    label="Serial No. (Chasis Serial No.)" :has-error="v$.serialNum.$error"
                                                    :error-msg="v$.serialNum.$errors[0] ? `${v$.serialNum.$errors[0].$message}` : ''" />
                                                </div>
                                                <div class="col-span-2 grid grid-cols-2">
                                                    <div class="mt-6">
                                                        <MyIcon name="trash-can" color="red" />
                                                    </div>
                                                    <div class="mt-6">
                                                        <MyIcon name="plus-box" color="green" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <div class="sm:col-span-2">
                                                <label for="receivedDate" class="block text-sm font-medium text-left mb-1">Received Date</label>
                                                <input type="date" id="receivedDate" class="w-full bg-white outline-none px-3 py-2 shadow-sm" v-model="formData.receivedDate" />
                                            </div>

                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="received-by" class="block text-sm font-medium text-left mb-1">Received By</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="received-by" class="w-full bg-white outline-none" v-model="formData.receivedBy">
                                                    <option value="">Select Receiver</option>
                                                    <option v-for="option in deviceFromOptions" :key="option.value" :value="option.value">
                                                        {{ option.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="from" class="block text-sm font-medium text-left mb-1">Device From</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="from" class="w-full bg-white outline-none" v-model="formData.deviceFrom">
                                                    <option value="">Select Device From</option>
                                                    <option v-for="option in deviceFromOptions" :key="option.value" :value="option.value">
                                                        {{ option.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="storage" class="block text-sm font-medium text-left mb-1">Storage</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="storage" class="w-full bg-white outline-none" v-model="formData.storage">
                                                    <option value="">Select Storage</option>
                                                    <option v-for="option in deviceStorageOptions" :key="option.value" :value="option.value">
                                                        {{ option.text }}
                                                    </option>
                                                </select>
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
import BaseLayout from '@/components/layout/BaseLayout.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
// import { useTitleForm } from '@/helper/useTitleForm';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { createNewReceived, updateReceived, getDetailReceived } from '@/services/monitoring/Device/receive';
import { fetchDeviceList, getDeviceFrom, getDeviceStorage } from '@/services/monitoring/Device/device';
import { fetchMfrList } from '@/services/monitoring/Device/mfr';
import { fetchTypeList } from '@/services/monitoring/Device/device-type';
import { fetchRoleList } from '@/services/monitoring/Device/device-roles';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

const { showSnackbar } = useSnackbar();

interface dateSplit {
  year: string;
  month: string;
  day: string;
  dayOfWeek: string;
}

interface deviceNames {
  id: string;
  name: string;
}

export default{
    name: "Received List",
    components: {
        BaseLayout,
        BaseButton,
        Breadcrumb,
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
            deviceFromOptions: [] as any[],
            deviceStorageOptions: [] as any[],
            deviceNameOptions: [] as deviceNames[],
        }
    },

    setup() {
        let isLoading = false;
            const router = useRouter();
            const receivedId = useRoute().params.id as string;
        // const { titleForm } = useTitleForm();

        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.RECEIVED.NAME} List`, to: ROUTER.RECEIVED.PATH },
            { text: ROUTER.RECEIVED_FORM.NAME },
        ];

        // Form state
        const formData = reactive({
            deviceId :0,
            receivedDate: [] as dateSplit[],
            receivedBy: 0,
            deviceFrom: 0,
            customerId: 0,
            storage: 0,
            tag: '',
            serialNum: [] as string[],
            mfr: null,
            deviceType: null,
            height: '',
            weight: '',
            wattage: '',
            deviceName: null,
            deviceRole: null,
        });

        // Validation rules
        const rules = {
            mfr: {},
            deviceType: {},
            height: { required },
            weight: { required },
            wattage: { required },
            deviceId: {},
            customerId: {},
            serialNum: {},
            tag: {},
            deviceName: {},
            deviceRole: {},
            receivedDate: {},
            receivedBy: {},
            deviceFrom: {},
            storage: {},
        };

        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        const prefillData = async () => {
            try {
                const resp = await getDetailReceived(receivedId);
                console.log(resp);
                if (resp && resp.data) {
                    Object.assign(formData, resp.data);
                    //Ensure formData.manufacturer is set to the manufacturer's ID (value) when prefilling the form data
                    // formData.manufacturer = resp.data.manufacturer.id; 
                    // formData.deviceTypeId = resp.data.deviceType.id;
                    // formData.deviceRole = resp.data.deviceRole.id;
                    // formData.snmpVersion = resp.data.snmpVersion;
                    // formData.deviceKeyValues = resp.data.deviceKeyValues || []; // Replace with actual key from response
                    // formData.itemsList = resp.data.itemsList || []; // Replace with actual key from response
                    // formData.name = resp.data.name;
                    // formData.frontPicture = resp.data.frontPicture;
                    // formData.frontPictureFileName = resp.data.frontPictureFileName;
                    // formData.rearPicture = resp.data.rearPicture;
                    // formData.rearPictureFileName = resp.data.rearPictureFileName;
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
                isLoading = true;

                // Prepare the payload with only the necessary fields
                const payload = {
                    deviceId: formData.deviceId,
                    receiveDate: formData.receivedDate,
                    receiveBy: formData.receivedBy,
                    deviceFrom: formData.deviceFrom,
                    customerId: formData.customerId,
                    storage: formData.storage,
                    tags: formData.tag,
                    serialNumbers: formData.serialNum instanceof Array ? formData.serialNum : [formData.serialNum],
                };
                if (receivedId === 'new') {
                    console.log(JSON.stringify(payload));
                    let resp = await createNewReceived(payload);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);
                } else {
                    let resp = await updateReceived(payload, receivedId);
                    showSnackbar('Successfully Updated', SnackbarType.Success);
                    console.log(resp.status);
                    console.log(resp.data);
                }
                isLoading = false;
                router.go(-1);
            }
        };
        
        onMounted(() => {
            prefillData();
        });

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
            prefillData,
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
        //fetch dropdowns
        async fetchDeviceFrom() {
            try {
                const response = await getDeviceFrom();
                this.deviceFromOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching Role options:', err);
            }
        },
        //fetch dropdowns
        async fetchDeviceStorage() {
            try {
                const response = await getDeviceStorage();
                this.deviceStorageOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching Role options:', err);
            }
        },
        
        //fetch dropdowns
        async fetchDeviceName() {
            try {
                const resp = await fetchDeviceList();
                console.log(resp);
                if (resp && resp.data && Array.isArray(resp.data.data)) {
                    // Map through each device and create an object with only id and name
                    this.deviceNameOptions = resp.data.data.map((device:any) => ({
                        id: device.id,
                        name: device.name
                    }));
                } else {
                    console.error('Unexpected response structure:', resp);
                }
            } catch (err) {
                console.error('Error fetching Building data:', err);
            }
        },
    },
    
    mounted() {
        this.fetchManufacturer();
        this.fetchType();
        this.fetchRole();
        this.fetchDeviceFrom();
        this.fetchDeviceStorage();
        this.fetchDeviceName();
    },
}
</script>

<style scoped>

</style>