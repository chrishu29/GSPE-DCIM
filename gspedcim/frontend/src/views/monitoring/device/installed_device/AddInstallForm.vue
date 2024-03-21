<template>
    <BaseLayout>
        <form @submit.prevent="handleSubmit">
            <!-- Information Card -->
            <div class="container mx-auto">
                <div class="container mx-auto mt-5 p-4  flex justify-between items-center gap-6 bg-header rounded-lg shadow-md shadow-indigo-300">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="cellphone-link" color="white" size="24px" />

                            <h2 class="ml-2 text-2xl font-semibold text-white">Add Installed Device</h2>

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
                                            <label for="device" class="block text-sm font-medium text-left mb-1">Device</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="device" class="w-full bg-white outline-none" v-model="formData.device">
                                                    <option value="">Select Device</option>
                                                    <option v-for="option in deviceOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label for="serialNo" class="block text-sm font-medium text-left mb-1">Serial Number</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="serialNo" class="w-full bg-white outline-none" v-model="formData.serial">
                                                    <option value="">Select Serial Number</option>
                                                    <option v-for="option in serialOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <TextInput v-model="formData.installDate"
                                                :error-msg="v$.installDate.$errors[0] ? `${v$.installDate.$errors[0].$message}` : ''"
                                                :has-error="v$.installDate.$error" label="Install Date" placeholder="" />
                                        </div>
                                        <div class="mb-4">
                                            <label for="install-by" class="block text-sm font-medium text-left mb-1">Install By</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="install-by" class="w-full bg-white outline-none" v-model="formData.installBy">
                                                    <option value="">Select Installed By</option>
                                                    <option v-for="option in installByOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-section shadow sm:rounded-lg">
                                    <div
                                        class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                        <MyIcon name="human-dolly" />
                                        <h3 class="text-lg leading-6 font-medium text-white">Device Location & Management</h3>
                                    </div>
                                    <div class="px-3 py-4">
                                        <div class="mb-4">
                                            <label for="status" class="block text-sm font-medium text-left mb-1">Status</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="status" class="w-full bg-white outline-none" v-model="formData.status">
                                                    <option value="">Select Status</option>
                                                    <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-sm font-medium text-gray-700 label">Device Location</label>
                                            <div class="flex items-center mt-2">
                                                <input type="checkbox" id="checkbox" class="ml-4 mr-2">
                                                <label for="checkbox">Is PDU Device</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-section shadow sm:rounded-lg">
                                <div
                                    class="w-full flex items-center justify-center gap-2 py-1 px-3 text-left bg-header sm:rounded-tl-lg sm:rounded-tr-lg text-white">
                                    <MyIcon name="map-marker-radius" />
                                    <h3 class="text-lg leading-6 font-medium text-white">Location</h3>
                                </div>
                                <div class="px-3 py-4">
                                    <div class="grid grid-cols-1 gap-y-6 gap-xq4 sm:grid-cols-2">
                                        <div class="sm:col-span-2">
                                            <label for="location" class="block text-sm font-medium text-left mb-1">Location</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="location" class="w-full bg-white outline-none" v-model="formData.location">
                                                    <option value="">Select Location</option>
                                                    <option v-for="option in locationOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="building" class="block text-sm font-medium text-left mb-1">Building</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="building" class="w-full bg-white outline-none" v-model="formData.building">
                                                    <option value="">Select Building</option>
                                                    <option v-for="option in buildingOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="floor" class="block text-sm font-medium text-left mb-1">Floor</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="floor" class="w-full bg-white outline-none" v-model="formData.floor">
                                                    <option value="">Select Floor</option>
                                                    <option v-for="option in floorOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="room" class="block text-sm font-medium text-left mb-1">Room</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="room" class="w-full bg-white outline-none" v-model="formData.room">
                                                    <option value="">Select Room</option>
                                                    <option v-for="option in roomOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="racks" class="block text-sm font-medium text-left mb-1">Racks</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="racks" class="w-full bg-white outline-none" v-model="formData.racks">
                                                    <option value="">Select Rack</option>
                                                    <option v-for="option in racksOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="position" class="block text-sm font-medium text-left mb-1">Position</label>
                                            <div class="bg-white shadow-sm px-3 py-2">
                                                <select id="position" class="w-full bg-white outline-none" v-model="formData.pos">
                                                    <option value="">Select Position</option>
                                                    <option v-for="option in positionOptions" :key="option.value" :value="option.value">
                                                        {{ option.name }}
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
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import { createNewInstalled, updateInstalled, getDetailInstalled, serialNumbersDevice, installStatusDevice } from '@/services/monitoring/Device/installed';
import { fetchDeviceList,  } from '@/services/monitoring/Device/device';
import { fetchLocationList,  } from '@/services/monitoring/Location/location';
import { fetchBuildingList,  } from '@/services/monitoring/Location/building';
import { fetchFloorList,  } from '@/services/monitoring/Location/floor';
import { fetchRoomList,  } from '@/services/monitoring/Location/room';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import LoadingState from '@/components/state/Loading.vue';

const { showSnackbar } = useSnackbar();

export default{
    name: "Install List",
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
            deviceOptions: [] as any[],
            serialOptions: [] as any[],
            installByOptions: [] as any[],
            statusOptions: [] as any[],
            locationOptions: [] as any[],
            buildingOptions: [] as any[],
            floorOptions: [] as any[],
            roomOptions: [] as any[],
            racksOptions: [] as any[],
            positionOptions: [] as any[],
            selectedDeviceId : '',
        }
    },

    setup() {
        let isLoading = false;
        const router = useRouter();
        const installId = useRoute().params.id as string;

        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.INSTALLED.NAME} List`, to: ROUTER.INSTALLED.PATH },
            { text: ROUTER.INSTALLED_FORM.NAME },
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
            serial: null,
            installDate: '',
            installBy: null,
            status: null,
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
            serial: { required },
            installDate: {},
            installBy: {},
            status: {},
        };

        // Vuelidate instance
        const v$ = useVuelidate(rules, formData);

        //prefill form data
        const prefillData = async () => {
            try {
                const resp = await getDetailInstalled(installId);
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
            console.log(formData.status);
            if (v$.value.$invalid) {
                console.log("invalid");
            }
            if (!v$.value.$error) {
                // formData.status = selectedStatusOption.value; // Extract the ID
                console.log("status ID : ",formData.status);
                isLoading = true;
                console.log("submitted the form");
                if (installId === 'new') {
                    console.log(JSON.stringify(formData));
                    let resp = await createNewInstalled(formData);
                    console.log(resp.status);
                    console.log(resp.data);
                    showSnackbar('Successfully Added', SnackbarType.Success);

                } else {
                    let resp = await updateInstalled(formData, installId);
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
            v$,
            optionsObject,
            rules,
            handleSubmit,
            options,
            isLoading,
        };
    },

    methods:{
        //fetch dropdowns
        async fetchDevice() {
            try {
                const response = await fetchDeviceList();
                this.deviceOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },
        
        //fetch dropdowns
        async fetchSerialNum() {
            try {
                if (this.formData.serial) {
                    this.selectedDeviceId = this.formData.serial;
                }
                const response = await serialNumbersDevice(this.selectedDeviceId);
                this.deviceOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },
        
        //fetch dropdowns
        async fetchStatusDevice() {
            try {
                const response = await installStatusDevice();
                this.statusOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },
        
        //fetch dropdowns
        async fetchLocation() {
            try {
                const response = await fetchLocationList();
                this.locationOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },

        //fetch dropdowns
        async fetchBuilding() {
            try {
                const response = await fetchBuildingList();
                this.buildingOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },
        
        //fetch dropdowns
        async fetchFloor() {
            try {
                const response = await fetchFloorList();
                this.floorOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },
        
        //fetch dropdowns
        async fetchRoom() {
            try {
                const response = await fetchRoomList();
                this.floorOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Manufacturer options:', err);
            }
        },

    },
    
    mounted() {
        this.fetchDevice();
        this.fetchSerialNum();
        this.fetchStatusDevice();
        this.fetchLocation();
        this.fetchBuilding();
        this.fetchFloor();
        this.fetchRoom();
    },
}
</script>

<style scoped>
</style>