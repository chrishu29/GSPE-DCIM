<template>
    <BaseLayout>
        <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
            <div class="w-full p-4  bg-white shadow-lg rounded-lg  col-span-2 bg-header">
                <div class="flex flex-col items-start gap-y-5">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="floor-plan" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">{{ ROUTER.FLOOR.NAME }} List</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>
                    <div class="flex space-x-2 mt-2 w-full justify-end">
                        <router-link :to="handleNavigateToAddFloor()">
                            <BaseButton minWidth="150px">Add Floor</BaseButton>
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
                            <select id="floor" class="w-full bg-white outline-none" v-model="filterFloor">
                                <option value="">Floor</option>
                                <option v-for="option in floorOptions" :key="option.value" :value="option.value">
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

        <div v-if="floorList.length <= 0 && !isLoading">
            <EmptyState />
        </div>

        <div class="container mx-auto mt-4 rounded-lg bg-white">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-subheader p-4 bg-white shadow-lg  text-white mb-3">
                        <tr>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Floor</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Location</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Building</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Max Wattage</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <!-- Repeat for each row -->
                        <tr v-for="floor in filteredFloorsList" :key="floor.id">
                            <td class="text-left py-3 px-4">{{ floor.name }}</td>
                            <td class="text-left py-3 px-4">{{ floor.locationName }}</td>
                            <td class="text-left py-3 px-4">{{ floor.buildingName }}</td>
                            <td class="text-left py-3 px-4">{{ floor.maximumKW }}</td>
                            <td class="text-center py-3 px-4">                                
                                <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                    @click="handleNavigateToEditFloor(floor.id)" />
                                <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                    @click="showConfirmDialog(floor.id)" />
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
import { fetchFloorList, deleteFloor } from '@/services/monitoring/Location/floor';
import { fetchLocationDropdowns } from '@/services/monitoring/Location/location';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default {
    name: "Floor-List",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
    },
    computed: {
        handleNavigateToAddFloor() { return () => `${this.$route.path}/form/new`; }
    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.FLOOR.NAME} List`, to: ROUTER.FLOOR.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    data() {
        return {
            floorList: [] as any[],
            isLoading: false,
            isDialogVisible: false,
            selectedId: 0,
            filterLocation: '',
            filterFloor: '',
            errorMsg: "" as any,
            path: this.$route.path,
            filteredFloorsList: [] as any[],
            locationOptions: [] as any[],
            floorOptions: [] as any[],
        }
    },

    methods: {
        async delay(duration: number) {
            return new Promise(resolve => {
                setTimeout(resolve, duration);
            });
        },
        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchFloorList();
                this.floorList = response.data.data;
                this.filteredFloorsList = [...this.floorList]; // Initialize the filtered list
                this.floorOptions = this.floorList.map(floor => ({ value: floor.name, text: floor.name }));
                showSnackbar('Success fetch list', SnackbarType.Success);
            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
        },

        //navigate to edit page
        handleNavigateToEditFloor(floorId: number) {
            console.log("tapp"+ floorId);
            console.log(this.$router.push(`${this.path}/form/${floorId}`));
            return () => this.$router.push(`${this.path}/form/${floorId}`);
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

            const response = await deleteFloor(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.floorList.findIndex(floor => floor.id === id);
                if (index !== -1) {
                    this.floorList.splice(index, 1);
                }
        },

        //filter data function
        filterData() {
            console.log("Filtering with floor:", this.filterFloor);
            console.log("Filtering with location:", this.filterLocation);
            this.filteredFloorsList = this.floorList.filter(floor => {
                console.log("Location id:", floor.name);
                const matchesfloor = !this.filterFloor || floor.name === this.filterFloor;
                const matcheslocation = !this.filterLocation || floor.locationId === this.filterLocation;
                // const matchesTimeZone = !this.filterTimeZone || location.timeZone === this.filterTimeZone;
                // const matchesSearch = !this.searchText || location.name.toLowerCase().includes(this.searchText.toLowerCase());

                // return matchesLocation && matchesStatus && matchesTimeZone && matchesSearch;
                return matchesfloor && matcheslocation;
            });
            console.log("Filtered locations:", this.filteredFloorsList);
        },

        async fetchLocationOptions() {
            try {
                const response = await fetchLocationDropdowns();
                this.locationOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
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
        filterFloor() {
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