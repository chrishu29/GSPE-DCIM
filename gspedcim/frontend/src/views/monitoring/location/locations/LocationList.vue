<template>
    <BaseLayout>
        <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
            <div class="w-full p-4  bg-white shadow-lg rounded-lg  col-span-2 bg-header">
                <div class="flex flex-col items-start gap-y-5">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="map-marker-multiple" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">Location</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>

                    <div class="flex space-x-2 mt-2 w-full justify-between">
                        <router-link :to=ROUTER.LOCATIONS_MAPS.PATH>
                            <BaseButton type="secondary" minWidth="150px">{{ ROUTER.LOCATIONS_MAPS.NAME }}</BaseButton>
                        </router-link>
                        <router-link :to="handleNavigateToAddLocations()">
                            <BaseButton minWidth="150px">Add Location</BaseButton>
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
                            <select id="status" class="w-full bg-white outline-none" v-model="filterStatus">
                                <option value="">Status</option>
                                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <!-- <label for="time-zone" class="block text-sm font-medium text-left mb-1 text-white">Time
                                Zone</label> -->
                        <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                            <select id="time-zone" class="w-full bg-white outline-none">
                                <option>Timezone</option>
                                <option>UTS</option>
                                <option>PST</option>
                                <option>CST</option>
                                <option>EST</option>
                                <option>EDT</option>
                                <option>CIT</option>
                                <option>EIT</option>
                                <option>WIT</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="mt-4">
                    <label for="search" class="sr-only">Search</label>
                    <div class="flex space-x-2 bg-white  px-3 py-1  rounded-[30px] shadow">
                        <input type="text" placeholder="Search..." class="px-2 bg-white outline-none w-full" v-model="searchText">
                        <MyIcon name="magnify" size="24px" />

                    </div>
                </div>
            </div>
        </div>
        <!-- <button @click="handleNavigateToEditLocation(1)">goto detaul</button> -->
        <!--  Loading  -->
        <div v-if="isLoading">
            <LoadingState />
        </div>
        <div v-if="locationsList.length <= 0 && !isLoading">
            <EmptyState />
        </div>

        <div v-if="locationsList.length > 0 && !isLoading" class="container mx-auto mt-4 rounded-lg bg-white">
            <!-- todo: implement data to table  -->
            <!-- implement pagination feature, or search for table component pkg -->
            <div class="overflow-x-auto overflow-y-auto pb-4">
                <table class="min-w-full">
                    <thead class="bg-subheader p-4 bg-white shadow-lg text-white mb-3">
                        <tr>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Location Name</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Physical Address</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Facility</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Time Zone</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Contact Name</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Status</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700">
                        <!-- Repeat for each row -->
                        <!-- locationList store all data where filteredLocationList store all data and data after the filter are added -->
                        <tr v-for="location in filteredLocationsList" :key="location.id">
                            <td class="text-left py-3 px-4">{{ location.name }}</td>
                            <td class="text-left py-3 px-4">{{ location.physicalAddress }}</td>
                            <td class="text-left py-3 px-4">{{ location.facility }}</td>
                            <td class="text-left py-3 px-4">{{ location.timezone }}</td>
                            <td class="text-left py-3 px-4">{{ location.contactName }}</td>
                            <td class="text-left py-3 px-4">{{ location.contactEmail }}</td>
                            <td class="text-center py-3 px-4">
                                <span :class="[location.status === 'Active' ? 'bg-green-500' : 'bg-red-500', 'text-white', 'py-1', 'px-3', 'rounded-full', 'text-xs']">{{ location.status
                                }}</span>
                            </td>
                            <td class="text-center py-3 px-4">
                                
                                <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                    @click="handleNavigateToEditLocation(location.id)" />
                                <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                    @click="showConfirmDialog(location.id)" />
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
import { deleteLocation, fetchLocationList, fetchStatus, fetchLocationDropdowns  } from '@/services/monitoring/Location/location';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
// import { useDelay } from '@/helper/miscelanus';
// import {useDelay} from '@/helper/miscelanus';

const { showSnackbar } = useSnackbar();

/*
todo:
- handle pagination
- lazy load 
- refactor table to be reusable componet
*/
export default {
    name: "Location-List",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
        LoadingState,
        EmptyState,
        ConfirmDialog,
    },
    data() {
        return {
            locationsList: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
            filterLocation: '',
            filterStatus: '',
            filterTimeZone: '',
            searchText: '',
            filteredLocationsList: [] as any[],
            locationOptions: [] as any[],
            statusOptions: [] as any[],
            timeZoneOptions: [] as any[],
        }
    },
    computed: {
        handleNavigateToAddLocations() { return () => `${this.$route.path}/form/new`; },
    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.LOCATIONS.NAME} List`, to: ROUTER.LOCATIONS.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },
    methods: {
        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchLocationList();
                this.locationsList = response.data.data;
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
        handleNavigateToEditLocation(locationId: number) {
            console.log("tapp"+ locationId);
            console.log(this.$router.push(`${this.path}/form/${locationId}`));
            return () => this.$router.push(`${this.path}/form/${locationId}`);
        },
        //show dialog popup for delete data
        showConfirmDialog(id:number) {
            this.isDialogVisible = true;
            this.selectedId = id;
            // this.deleteItem(id);
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

            const response = await deleteLocation(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.locationsList.findIndex(location => location.id === id);
                if (index !== -1) {
                    this.locationsList.splice(index, 1);
                }
        },
        //filter data function
        filterData() {
            console.log("Filtering with status:", this.filterStatus);
            console.log("Filtering with location:", this.filterLocation);
            this.filteredLocationsList = this.locationsList.filter(location => {
                console.log("Location id:", location.id);
                const matchesLocation = !this.filterLocation || location.id === this.filterLocation;
                const matchesStatus = !this.filterStatus || location.status === this.filterStatus;
                // const matchesTimeZone = !this.filterTimeZone || location.timeZone === this.filterTimeZone;
                // const matchesSearch = !this.searchText || location.name.toLowerCase().includes(this.searchText.toLowerCase());

                // return matchesLocation && matchesStatus && matchesTimeZone && matchesSearch;
                return matchesLocation && matchesStatus;
            });
            console.log("Filtered locations:", this.filteredLocationsList);
        },

        async fetchStatusOptions() {
            try {
                const response = await fetchStatus();
                this.statusOptions = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching status options:', err);
            }
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
        this.fetchStatusOptions();
        this.fetchLocationOptions();
    },
    watch: {
        filterLocation() {
            this.filterData();
        },
        filterStatus() {
            this.filterData();
        },
        filterTimeZone() {
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

<style scoped></style>@/services/monitoring/Location/location