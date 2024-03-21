
<template>
    <BaseLayout>
        <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
            <div class="w-full p-4  bg-white shadow-lg rounded-lg  col-span-2 bg-header">
                <div class="flex flex-col items-start gap-y-5">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="map-marker-multiple" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">{{ ROUTER.ROOM.NAME }} List</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>
                    <div class="flex space-x-2 mt-2 w-full justify-end">
                        <router-link :to="handleNavigateToAddRoom()">
                            <BaseButton minWidth="150px">Add Room</BaseButton>
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
                            <select id="room" class="w-full bg-white outline-none" v-model="filterRoom">
                                <option value="">Room</option>
                                <option v-for="option in roomOptions" :key="option.value" :value="option.value">
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

        <div v-if="roomList.length <= 0 && !isLoading">
            <EmptyState />
        </div>

        <div class="container mx-auto mt-4 rounded-lg bg-white">
            <div class="overflow-x-auto overflow-y-auto pb-4">
                <table class="min-w-full">
                    <thead class="bg-subheader p-4 bg-white shadow-lg text-white mb-3">
                        <tr>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Name</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Location</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Building</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Room No.</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700">
                        <!-- Repeat for each row -->
                        <!-- locationList store all data where filteredLocationList store all data and data after the filter are added -->
                        <tr v-for="rooms in filteredRoomList" :key="rooms.id">
                            <td class="text-left py-3 px-4">{{ rooms.name }}</td>
                            <td class="text-left py-3 px-4">{{ rooms.locationName }}</td>
                            <td class="text-left py-3 px-4">{{ rooms.buildingName }}</td>
                            <td class="text-left py-3 px-4">{{ rooms.roomNo }}</td>
                            <td class="text-center py-3 px-4">
                                <MyIcon name="flash" color="orange" tooltip="power" :hoverDecor="true" />
                                <MyIcon name="thermometer" color="green" tooltip="Temp" :hoverDecor="true" />
                                <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                    @click="handleNavigateToEditRoom(rooms.id)" />
                                <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                    @click="showConfirmDialog(rooms.id)" />
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
import { fetchRoomList, deleteRoom } from '@/services/monitoring/Location/room';
import { fetchLocationDropdowns } from '@/services/monitoring/Location/location';
import { fetchBuildingDropdowns } from '@/services/monitoring/Location/building';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default {
    name: "Room-List",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
    },
    computed: {
        handleNavigateToAddRoom() { return () => `${this.$route.path}/form/new`; }
    },
    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.ROOM.NAME} List`, to: ROUTER.ROOM.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    data() {
        return {
            roomList: [] as any[],
            locations: [] as any[],
            buildings: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
            filterLocation: '',
            filterRoom: '',
            filteredRoomList: [] as any[],
            locationOptions: [] as any[],
            roomOptions: [] as any[],
        }
    },

    methods: {
        async fetchLocation() {
            try {
                const response = await fetchLocationDropdowns();
                this.locations = response.data.map((item:any) => ({ value: item.id, text: item.name }));
                this.locationOptions = response.data.map((item:any) => ({ value: item.name, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },
        
        async fetchBuilding() {
            try {
                const response = await fetchBuildingDropdowns();
                this.buildings = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },

        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                // Fetch and process locations and buildings
                // await this.fetchLocation();
                await this.fetchBuilding();

                const response = await fetchRoomList();
                this.roomList = response.data.data.map((room:any) => {
                    const location = this.locations.find(loc => loc.value === room.locationId);
                    const building = this.buildings.find(build => build.value === room.buildingId);

                    return {
                        ...room,
                        locationName: location ? location.text : '-',
                        buildingName: building ? building.text : '-'
                    };
                });
                this.roomOptions = this.roomList.map(room => ({ value: room.name, text: room.name }));
                // Initialize filteredRoomList with the full room list
                this.filteredRoomList = [...this.roomList];
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
        handleNavigateToEditRoom(roomId: number) {
            console.log("tapp"+ roomId);
            console.log(this.$router.push(`${this.path}/form/${roomId}`));
            return () => this.$router.push(`${this.path}/form/${roomId}`);
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

            const response = await deleteRoom(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.roomList.findIndex(room => room.id === id);
                if (index !== -1) {
                    this.roomList.splice(index, 1);
                }
        },

        //filter data function
        filterData() {
            const selectedLocationText = this.locationOptions.find(loc => loc.value === this.filterLocation)?.text;
            this.filteredRoomList = this.roomList.filter(rooms => {
                const matchesLocation = !this.filterLocation || rooms.locationName === selectedLocationText;
                const matchesRoom = !this.filterRoom || rooms.name === this.filterRoom;
                return matchesLocation && matchesRoom;
            });
        },
    },
    
    mounted() {
        this.handleFetchData();
        this.fetchLocation();
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