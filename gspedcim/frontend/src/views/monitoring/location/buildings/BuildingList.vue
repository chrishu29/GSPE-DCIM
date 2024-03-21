<template>
    <BaseLayout>
        <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
            <div class="w-full p-4  bg-white shadow-lg rounded-lg  col-span-2 bg-header">
                <div class="flex flex-col items-start gap-y-5">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="map-marker-multiple" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">{{ ROUTER.BUILDING.NAME }} List</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>
                    <div class="flex space-x-2 mt-2 w-full justify-end">
                        <router-link :to="handleNavigateToAddBuilding()">
                            <BaseButton minWidth="150px">Add Building</BaseButton>
                        </router-link>

                    </div>
                </div>
            </div>
            <div class="w-full p-4  bg-white shadow-lg rounded-lg col-span-4  overflow-hidden sm:rounded-md bg-header">
                <label for="filterdata" class="block text-md font-medium text-left mb-4 text-white">Filter Data</label>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <!-- <label for="location"
                                class="block text-sm font-medium text-left mb-1 text-white">Location</label> -->
                        <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                            <select id="location" class="w-full bg-white outline-none" v-model="filterLocation">
                                <option value="">Location</option>
                                <option v-for="option in locationOptions" :key="option.value" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <!-- <label for="status" class="block text-sm font-medium text-left mb-1 text-white">Status</label> -->
                        <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                            <select id="building" class="w-full bg-white outline-none" v-model="filterBuilding">
                                <option value="">Building</option>
                                <option v-for="option in buildingOptions" :key="option.value" :value="option.value">
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
        </div>

        <!--  Loading  -->
        <div v-if="isLoading">
            <LoadingState />
        </div>
        <div v-if="buildingList.length <= 0 && !isLoading">
            <EmptyState />
        </div>
        
        <div v-if="buildingList.length > 0 && !isLoading" class="container mx-auto mt-4 rounded-lg bg-white">
            <!-- todo: implement data to table  -->
            <!-- implement pagination feature, or search for table component pkg -->
            <div class="overflow-x-auto overflow-y-auto pb-4">
                <table class="min-w-full">
                    <thead class="bg-subheader p-4 bg-white shadow-lg text-white mb-3">
                        <tr>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Name</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Location</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Max Wattage</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700">
                        <!-- Repeat for each row -->
                        <tr v-for="building in filteredBuildingsList" :key="building.id">
                            <td class="text-left py-3 px-4">{{ building.name }}</td>
                            <td class="text-left py-3 px-4">{{ building.locationName }}</td>
                            <td class="text-left py-3 px-4">{{ building.maximumKW }}</td>
                            <td class="text-center py-3 px-4">                                
                                <!-- <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                    @click="handleNavigateToEditLocation(location.id)" /> -->
                                <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                    @click="showConfirmDialog(building.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </BaseLayout>
    <ConfirmDialog :isVisible="isDialogVisible" message="Are you sure you want to delete this item?" @confirm="ConfirmDialog"
        @cancel="hideConfirmDialog" yes-color="blue" />
</template>

<script lang="ts">

import BaseLayout from '@/components/layout/BaseLayout.vue';
import MyIcon from '@/components/icon/MyIcon.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue';
import ROUTER from '@/constants/router';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';
import { deleteBuilding, fetchBuildingList } from '@/services/monitoring/Location/building';
import { fetchLocationDropdowns } from '@/services/monitoring/Location/location';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default {
    name: "Building-List",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
        ConfirmDialog,
        LoadingState,
        EmptyState,
    },
    data() {
        return {
            buildingList: [] as any[],
            locations: [] as any[],
            isLoading: false,
            isDialogVisible: false,
            selectedId: 0,
            errorMsg: "" as any,
            path: this.$route.path,
            filterLocation: '',
            filterBuilding: '',
            searchText: '',
            filteredBuildingsList: [] as any[],
            locationsList: [] as any[],
            locationOptions: [] as any[],
            buildingOptions: [] as any[],
        }
    },
    computed: {
        handleNavigateToAddBuilding() { return () => `${this.path}/form/new`; }
    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.BUILDING.NAME} List`, to: ROUTER.BUILDING.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    methods: {
        async fetchLocation() {
            try {
                const response = await fetchLocationDropdowns();
                this.locations = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },

        async handleFetchData() {
            try {
                this.isLoading = true;
                await this.fetchLocation();

                const response = await fetchBuildingList();
                this.buildingList = response.data.data.map((building:any) => {
                    const location = this.locations.find(loc => loc.value === building.locationId);
                    return {
                        ...building,
                        locationName: location ? location.text : '-'
                    };
                });
                this.buildingOptions = this.buildingList.map(building => ({ value: building.name, text: building.name }));

                // Initialize filteredBuildingsList with the full building list
                this.filteredBuildingsList = [...this.buildingList];
                showSnackbar('Success fetch list', SnackbarType.Success);
            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
        },

        handleNavigateToEditBuilding(deviceId: number) {
            return () => this.$router.push(`${this.path}/form/${deviceId}`);
        },

        //show dialog popup for delete data
        showConfirmDialog(id:number) {
            this.isDialogVisible = true;
            this.selectedId = id;
            console.log("clicked" + this.isDialogVisible);
            console.log("Id : " + this.selectedId);
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

            const response = await deleteBuilding(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.buildingList.findIndex(building => building.id === id);
                if (index !== -1) {
                    this.buildingList.splice(index, 1);
                }
        },

        //filter data function
        filterData() {
            const selectedLocationText = this.locationOptions.find(loc => loc.value === this.filterLocation)?.text;
            this.filteredBuildingsList = this.buildingList.filter(building => {
                const matchesLocation = !this.filterLocation || building.locationName === selectedLocationText;
                const matchesBuilding = !this.filterBuilding || building.name === this.filterBuilding;
                return matchesLocation && matchesBuilding;
            });
        },
        
        async fetchLocationOptions() {
            try {
                const response = await fetchLocationDropdowns();
                this.locationOptions = response.data.map((item:any) => ({ value: item.name, text: item.name }));
                console.log("Location options:", this.locationOptions);
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },
    },
    
    mounted() {
        this.handleFetchData();
        this.fetchLocationOptions();
    },
    
    watch: {
        filterLocation() {
            this.filterData();
        },
        filterBuilding() {
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