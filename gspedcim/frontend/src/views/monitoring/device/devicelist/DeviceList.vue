<template>
    <BaseLayout>
        <div class="min-h-screen flex">
            <!-- Sidebar -->
            <div class="w-64 bg-white shadow-md">
                <div class="px-6 py-4">
                    <!-- Sidebar Header -->
                    <div class="text-left">
                        <h1 class="text-base font-semibold text-gray-500">DEVICE</h1>
                    </div>
                    <!-- Sidebar Links -->
                    <nav class="mt-5">
                        <router-link to="/" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Dashboard</router-link>
                        <router-link to="/devices" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Devices List</router-link>
                        <router-link to="/events" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Stored Device</router-link>
                        <router-link to="/settings" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Allocated Device</router-link>
                    </nav>
                    <br>
                    <!-- Sidebar Header -->
                    <div class="text-left">
                        <h1 class="text-base font-semibold text-gray-500">DEVICE Settings</h1>
                    </div>
                    <!-- Sidebar Links -->
                    <nav class="mt-5">
                        <router-link to="/" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Schedule Maintanance</router-link>
                        <router-link to="/devices" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Received Devices</router-link>
                        <router-link to="/events" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Relocate Devices</router-link>
                        <router-link to="/settings" class="block text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-gray-100">Return Devices</router-link>
                    </nav>
                </div>
            </div>
            
            <!-- Main content -->
            <div class="flex-1 p-4">
                <!-- Information Card -->
                <!-- <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
                    <div class="w-full p-4  bg-white shadow-lg rounded-lg  col-span-2 bg-header">
                        <div class="flex flex-col items-start gap-y-5">
                            <div class="flex flex-col items-left mb-4 md:mb-0">
                                <div class="flex text-blue-600 mr-4 mb-2 align-center">
                                    <MyIcon name="cellphone-link" color="white" size="24px" />
                                    <h2 class="ml-2 text-2xl font-semibold text-white">Device</h2>
                                </div>
                                <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                            </div>

                            <div class="flex space-x-2 mt-2 w-full justify-between">
                                <router-link  :to=ROUTER.RECEIVED.PATH>
                                    <BaseButton type="secondary" minWidth="150px">Go to Received Device></BaseButton>
                                </router-link>
                                <router-link  :to=handleNavigateToAddDevice()>
                                    <BaseButton minWidth="150px">Add Device</BaseButton>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="w-full p-4  bg-white shadow-lg rounded-lg col-span-4  overflow-hidden sm:rounded-md bg-header">
                        <label for="filterdata" class="block text-md font-medium text-left mb-4 text-white">Filter Data</label>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                 <label for="location"
                                    class="block text-sm font-medium text-left mb-1 text-white">Location</label>
                                <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                                    <select id="role" class="w-full bg-white outline-none" v-model="filterRole">
                                        <option value="">Role</option>
                                        <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                 <label for="status" class="block text-sm font-medium text-left mb-1 text-white">Status</label> 
                                <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                                    <select id="type" class="w-full bg-white outline-none" v-model="filterType">
                                        <option value="">Type</option>
                                        <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="time-zone" class="block text-sm font-medium text-left mb-1 text-white">Time
                                    Zone</label> 
                                <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                                    <select id="mfr" class="w-full bg-white outline-none" v-model="filterMfr">
                                        <option value="">Manufacturer</option>
                                        <option v-for="option in mfrOptions" :key="option.value" :value="option.value">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="mt-4">
                            <label for="search" class="sr-only">Search</label>
                            <div class="flex space-x-2 bg-white  px-3 py-1  rounded-[30px] shadow">
                                <input type="text" placeholder="Search..." class="px-2 bg-white outline-none w-full">
                                <MyIcon name="magnify" size="24px" />

                            </div>
                        </div>
                    </div>
                </div> -->

                <div>
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <MyIcon name="cellphone-link" color="black" size="24px" />
                        <h2 class="ml-2 text-2xl font-semibold text-black">Device</h2>
                    </div>
                    <div class="flex text-blue-600 mr-4 mb-2 align-center">
                        <router-link :to="handleNavigateToAddDevice()">
                            <button class="flex items-center justify-center text-black rounded shadow" style="min-width: 120px; background-color: cadetblue; align-items: center; padding: 8px 12px; font-size: 14px;">
                                <MyIcon name="plus" color="black" style="margin-right: 8px;"/>
                                Add Device
                            </button>
                        </router-link>
                        <button class="flex items-center justify-center rounded ml-2 shadow" style="background-color: cadetblue; padding: 8px 12px;">
                            <MyIcon name="repeat-variant" color="black" />
                        </button>
                        <div class="flex bg-white  px-3 py-1 rounded ml-2 shadow" style="min-width: 500px;">
                            <input type="text" placeholder="Search..." class="px-2 bg-white outline-none w-full">
                            <MyIcon name="magnify" size="24px" />
                        </div>
                    </div>
                    <!--filters-->
                    <div v-click-outside="closeDropdown" class="flex inline-block text-left">
                        <button @click="dropdownOpen = !dropdownOpen" class="inline-flex items-center justify-center p-2 bg-white-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style="font-size: 0.875rem; /* 14px */ height: 2rem; /* 32px */ width: 2rem; /* 32px */">
                            <MyIcon name="filter" color="black" size="20px" />
                        </button>

                        <div v-if="dropdownOpen" class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                            style="max-height: 240px; overflow-y: auto;">
                            <!-- Scrollable dropdown content -->
                            <!-- Role Filters -->
                            <div class="px-4 py-2">
                                <span style="font-size: large; font-weight: 500;">Role</span>
                                <div v-for="option in roleOptions" :key="`role-${option.value}`">
                                    <input type="checkbox" :value="option.value" v-model="filters.role"> {{ option.text }}
                                </div>
                            </div>
                            <!-- Type Filters -->
                            <div class="px-4 py-2">
                                <span style="font-size: large; font-weight: 500;">Type</span>
                                <div v-for="option in typeOptions" :key="`type-${option.value}`">
                                    <input type="checkbox" :value="option.value" v-model="filters.type"> {{ option.text }}
                                </div>
                            </div>
                            <!-- Manufacturer Filters -->
                            <div class="px-4 py-2">
                                <span style="font-size: large; font-weight: 500;">Manufacturer</span>
                                <div v-for="option in mfrOptions" :key="`manufacturer-${option.value}`">
                                    <input type="checkbox" :value="option.value" v-model="filters.manufacturer"> {{ option.text }}
                                </div>
                            </div>
                        </div>

                        <!-- Dynamic Badges for Selected Filters -->
                        <template v-if="selectedRoleNames.length">
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Role: {{ selectedRoleNames.join(', ') }}</span>
                        </template>
                        <template v-if="selectedTypeNames.length">
                            <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">Type: {{ selectedTypeNames.join(', ') }}</span>
                        </template>
                        <template v-if="selectedManufacturerNames.length">
                            <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">Manufacturer: {{ selectedManufacturerNames.join(', ') }}</span>
                        </template>
                    </div>
                </div>
                
                <!--  Loading  -->
                <div v-if="isLoading">
                    <LoadingState />
                </div>

                <div v-if="devicesList.length <= 0 && !isLoading">
                    <EmptyState />
                </div>

                <!-- Tables -->
                <div v-if="devicesList.length > 0 && !isLoading" class="container mx-auto mt-4 rounded-lg bg-white">
                    <!-- todo: implement data to table  -->
                    <!-- implement pagination feature, or search for table component pkg -->
                    <div class="overflow-x-auto overflow-y-auto pb-4">
                        <table class="min-w-full">
                            <thead class="bg-subheader p-4 bg-white shadow-lg  text-white mb-3">
                                <tr>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Name</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Manufacturer</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Device Type</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Height</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Weight</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Wattage</th>
                                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <!-- Repeat for each row -->
                                <!-- locationList store all data where filteredLocationList store all data and data after the filter are added -->
                                <tr v-for="device in filteredDeviceList" :key="device.id">
                                    <td class="text-left py-3 px-4">{{ device.name }}</td>
                                    <td class="text-left py-3 px-4">{{ device.deviceRole }}</td>
                                    <td class="text-left py-3 px-4">{{ device.manufacturerName }}</td>
                                    <td class="text-left py-3 px-4">{{ device.deviceTypeName }}</td>
                                    <td class="text-left py-3 px-4">{{ device.height }}</td>
                                    <td class="text-left py-3 px-4">{{ device.weight }}</td>
                                    <td class="text-left py-3 px-4">{{ device.wattage }}</td>
                                    <td class="text-center py-3 px-4">
                                        
                                        <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                            @click="handleNavigateToEditDevices(device.id)" />
                                        <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                            @click="showConfirmDialog(device.id)" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
    <ConfirmDialog :isVisible="isDialogVisible" message="Are you sure you want to delete this item?" @confirm="ConfirmDialog"
        @cancel="hideConfirmDialog" yes-color="blue" />
</template>
<script lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';
import { fetchDeviceList, deleteDevice } from '@/services/monitoring/Device/device';
import { fetchMfrList } from '@/services/monitoring/Device/mfr';
import { fetchTypeList } from '@/services/monitoring/Device/device-type';
import { fetchRoleList } from '@/services/monitoring/Device/device-roles';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default{
    name: "Device-List",
    directives: {
        clickOutside: {
            // When the bound element is inserted into the DOM...
            mounted(el, binding) {
                // Define a click event listener on the document
                el.clickOutsideEvent = function(event:any) {
                // Check if the click is outside the element and the handler is a function
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value(event); // Execute the handler function
                }
                };
                document.addEventListener("click", el.clickOutsideEvent);
            },
            unmounted(el) {
                // Remove the event listener from the document when the component is destroyed
                document.removeEventListener("click", el.clickOutsideEvent);
            },
        },
    },
    components: {
        BaseLayout,
        BaseButton,
        Breadcrumb,
        MyIcon,
        ROUTER,
        LoadingState,
        EmptyState,
        ConfirmDialog,
    },
    
    data() {
        return {
            devicesList: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
            filterRole: '',
            filterType: '',
            filterMfr: '',
            searchText: '',
            filteredDeviceList: [] as any[],
            roleOptions: [] as any[],
            typeOptions: [] as any[],
            mfrOptions: [] as any[],
            dropdownOpen: false,
            filters: {
                role: [] as any[],
                type: [] as any[],
                manufacturer: [] as any[],
            },
        }
    },

    setup() {

    const myBreadcrumbs = [
        { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
        { text: `${ROUTER.DEVICE.NAME} List`, to: ROUTER.DEVICE.PATH },
    ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },
    
    computed: {
        handleNavigateToAddDevice() { return () => `${this.$route.path}/form/new`; },
        selectedRoleNames() {
            return this.filters.role.map(id => this.roleOptions.find(option => option.value === id)?.text).filter(Boolean);
        },
        selectedTypeNames() {
            return this.filters.type.map(id => this.typeOptions.find(option => option.value === id)?.text).filter(Boolean);
        },
        selectedManufacturerNames() {
            return this.filters.manufacturer.map(id => this.mfrOptions.find(option => option.value === id)?.text).filter(Boolean);
        },
    },

    methods: {
        // Close the dropdown
        closeDropdown() {
            this.dropdownOpen = false;
        },
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
        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchDeviceList();
                this.devicesList = response.data.data;
                // this.roleOptions = this.devicesList.map(role => ({ value: role.deviceRoleId, text: role.deviceRole }));
                // this.typeOptions = this.devicesList.map(role => ({ value: role.deviceType, text: role.deviceTypeName }));
                // this.mfrOptions = this.devicesList.map(role => ({ value: role.manufacturer, text: role.manufacturerName }));
                this.filteredDeviceList = response.data.data;
                showSnackbar('Success fetch list', SnackbarType.Success);

            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
            console.log("Fetched Devices:", this.devicesList);
        },

        //navigate to edit page
        handleNavigateToEditDevices(devId: number) {
            console.log("Selected Device ID for edit:", devId);
            console.log("Navigating to path:", `${this.path}/form/${devId}`);
            this.$router.push(`${this.path}/form/${devId}`);
        },

        //show dialog popup for delete data
        showConfirmDialog(id:number) {
            this.$nextTick(() => {
                this.isDialogVisible = true;
            });
            this.selectedId = id;
            // this.deleteItem(id);
            console.log("Dialog visible state:", this.isDialogVisible, "Selected ID:", this.selectedId);
        },
        //hide dialog
        hideConfirmDialog() {
            this.isDialogVisible = false;
        },
        //hide dialog and delete the data
        ConfirmDialog() {
            console.log("run confirm dialog");
            this.deleteItem(this.selectedId);
            this.hideConfirmDialog();
        },
        //delete function for the selected id
        async deleteItem(id:number) {
            console.log('Attempting to delete item with ID:', id);

            const response = await deleteDevice(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.devicesList.findIndex(device => device.id === id);
                if (index !== -1) {
                    this.devicesList.splice(index, 1);
                }
        },

        filterData() {
        this.filteredDeviceList = this.devicesList.filter((device) => {
            const roleMatch = !this.filters.role.length || this.filters.role.includes(device.role);
            const typeMatch = !this.filters.type.length || this.filters.type.includes(device.type);
            const manufacturerMatch = !this.filters.manufacturer.length || this.filters.manufacturer.includes(device.manufacturer);
            return roleMatch && typeMatch && manufacturerMatch;
        });
    },


    },
    
    mounted() {
        this.handleFetchData();
        this.fetchManufacturer();
        this.fetchType();
        this.fetchRole();
    },

    watch: {
        filterRole() {
            this.filterData();
        },
        filterType() {
            this.filterData();
        },
        filterMfr() {
            this.filterData();
        },
        searchText() {
            this.filterData();
        },
        isDialogVisible(newValue) {
            console.log("Dialog visibility changed to:", newValue);
        },
        locationsList: {
            handler() {
                this.filterData();
            },
            deep: true,
        },
    }
}
</script>@/services/monitoring/Device/device