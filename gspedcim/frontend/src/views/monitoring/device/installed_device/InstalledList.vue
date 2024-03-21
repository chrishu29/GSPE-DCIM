<template>
    <BaseLayout>
        <div>
            <!-- Information Card -->
            <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
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
                            <router-link  :to=ROUTER.UNINSTALLED.PATH>
                                <BaseButton type="secondary" minWidth="150px">Go to Uninstall Device ></BaseButton>
                            </router-link>
                            <router-link  :to=handleNavigateToAddInstall()>
                                <BaseButton minWidth="150px">Add Install</BaseButton>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="w-full p-4  bg-white shadow-lg rounded-lg col-span-4  overflow-hidden sm:rounded-md bg-header">
                    <label for="filterdata" class="block text-md font-medium text-left mb-4 text-white">Filter Data</label>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                                <select id="location" class="w-full bg-white outline-none" v-model="filterLocation">
                                    <option value="">Location</option>
                                    <option v-for="option in locationOptions" :key="option.id" :value="option.name">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                                <select id="rack" class="w-full bg-white outline-none" v-model="filterRack">
                                    <option value="">Rack</option>
                                    <option v-for="option in rackOptions" :key="option.id" :value="option.name">
                                        {{ option.name }}
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
            </div>

            <!--  Loading  -->
            <div v-if="isLoading">
                <LoadingState />
            </div>

            <div v-if="installedList.length <= 0 && !isLoading">
                <EmptyState />
            </div>

            <!-- Tables -->
            <div class="container mx-auto mt-4 rounded-lg">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-subheader p-4 bg-white shadow-lg  text-white mb-3">
                            <tr>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Name</th>
                                <!-- <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Location</th> -->
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                                <!-- <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Serial No.</th> -->
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
                            <tr v-for="ins in filteredInstalledList" :key="ins.id">
                                <td class="text-left py-3 px-4">{{ ins.name }}</td>
                                <td class="text-left py-3 px-4">{{ ins.deviceRole }}</td>
                                <td class="text-left py-3 px-4">{{ ins.manufacturerName }}</td>
                                <td class="text-left py-3 px-4">{{ ins.deviceTypeName }}</td>
                                <td class="text-left py-3 px-4">{{ ins.height }}</td>
                                <td class="text-left py-3 px-4">{{ ins.weight }}</td>
                                <td class="text-left py-3 px-4">{{ ins.wattage }}</td>
                                <td class="text-center py-3 px-4">
                                    
                                    <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                        @click="handleNavigateToEditInstalled(ins.id)" />
                                    <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                        @click="showConfirmDialog(ins.id)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
import { fetchInstalledList, deleteInstalled } from '@/services/monitoring/Device/installed';
import { fetchLocationList } from '@/services/monitoring/Location/location';
import { fetchRacksList } from '@/services/monitoring/Location/rack';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default{
    name: "Installed-List",
    components: {
        BaseLayout,
        BaseButton,
        Breadcrumb,
        MyIcon,
        ROUTER,
        ConfirmDialog,
    },

    data() {
        return {
            installedList: [] as any[],
            isLoading: false,
            isDialogVisible: false,
            errorMsg: "" as any,
            path: this.$route.path,
            selectedId: 0,
            filterLocation: '',
            filterRack: '',
            filteredInstalledList: [] as any[],
            locationOptions: [] as any[],
            rackOptions: [] as any[],
        }
    },

    setup() {

        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.INSTALLED.NAME} List`, to: ROUTER.INSTALLED.PATH },
        ];
            return {
                myBreadcrumbs,
                ROUTER,
            };
    },
    
    computed: {
        handleNavigateToAddInstall() { return () => `${this.$route.path}/form/new`; }
    },

    methods: {
        //fetch dropdowns
        async fetchLoc() {
            try {
                const response = await fetchLocationList();
                this.locationOptions = response.data.data;
                console.log(this.locationOptions);
            } catch (err) {
                console.error('Error fetching Type options:', err);
            }
        },

        //fetch dropdowns
        async fetchRack() {
            try {
                const response = await fetchRacksList();
                this.rackOptions = response.data.data;
            } catch (err) {
                console.error('Error fetching Type options:', err);
            }
        },

        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchInstalledList();
                this.installedList = response.data.data;
                this.filteredInstalledList = response.data.data;
                showSnackbar('Success fetch list', SnackbarType.Success);
            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
            console.log("Fetched Devices:", this.installedList);
        },

        //navigate to edit page
        handleNavigateToEditInstalled(insId: number) {
            console.log("Selected Device ID for edit:", insId);
            console.log("Navigating to path:", `${this.path}/form/${insId}`);
            this.$router.push(`${this.path}/form/${insId}`);
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
            const response = await deleteInstalled(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.installedList.findIndex(ins => ins.id === id);
                if (index !== -1) {
                    this.installedList.splice(index, 1);
                }
        },

        filterData() {
            const selectedLocationText = this.locationOptions.find(loc => loc.value === this.filterLocation)?.text;
            const selectedRackText = this.rackOptions.find(rc => rc.value === this.filterRack)?.text;

            this.filteredInstalledList = this.installedList.filter(installed => {
                const matchesLocation = !this.filterLocation || installed.location === selectedLocationText;
                const matchesRack = !this.filterRack || installed.rack === selectedRackText;

                return matchesLocation && matchesRack;
            });
        }
    },
    
    mounted() {
        this.handleFetchData();
        this.fetchLoc();
        this.fetchRack();
    },

    watch: {
        filterLocation() {
            this.filterData();
        },
        filterRack() {
            this.filterData();
        },
        searchText() {
            this.filterData();
        },
        locationsList: {
            handler() {
                this.filterData();
            },
            deep: true,
        },
    }
}
</script>