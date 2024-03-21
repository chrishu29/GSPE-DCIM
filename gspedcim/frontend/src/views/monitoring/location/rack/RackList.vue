
<template>
    <BaseLayout>
        <div class="container mx-auto mt-5 grid grid-cols-6 w-full gap-6">
            <div class="w-full p-4  bg-white shadow-lg rounded-lg  col-span-2 bg-header">
                <div class="flex flex-col items-start gap-y-5">
                    <div class="flex flex-col items-left mb-4 md:mb-0">
                        <div class="flex text-blue-600 mr-4 mb-2 align-center">
                            <MyIcon name="file-cabinet" color="white" size="24px" />
                            <h2 class="ml-2 text-2xl font-semibold text-white">{{ ROUTER.RACK.NAME }} List</h2>
                        </div>
                        <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                    </div>
                    <div class="flex space-x-2 mt-2 w-full justify-end">
                        <router-link :to="handleNavigateToAddRack()">
                            <BaseButton minWidth="150px">Add Rack</BaseButton>
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
                            <select id="rack" class="w-full bg-white outline-none ">
                                <option>Rack 1</option>
                                <option>Rack 2</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <!-- <label for="status" class="block text-sm font-medium text-left mb-1 text-white">Status</label> -->
                        <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                            <select id="room" class="w-full bg-white outline-none ">
                                <option>Room 1</option>
                                <option>Room 2</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <!-- <label for="status" class="block text-sm font-medium text-left mb-1 text-white">Status</label> -->
                        <div class="bg-white shadow-sm  px-3 py-2 rounded-[30px]">
                            <select id="type" class="w-full bg-white outline-none ">
                                <option>Type 1</option>
                                <option>Type 2</option>
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

        <div v-if="rackList.length <= 0 && !isLoading">
            <EmptyState />
        </div>

        <div class="container mx-auto mt-4 rounded-lg bg-white">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-subheader p-4 bg-white shadow-lg  text-white mb-3">
                        <tr>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Name</th>
                            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Room</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Model</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Facility</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Is Decending</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Height</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Width</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Type</th>
                            <!-- <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Serial Number</th> -->
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Tag</th>
                            <th class="text-center py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <!-- Repeat for each row -->
                        <!-- locationList store all data where filteredLocationList store all data and data after the filter are added -->
                        <tr v-for="racks in filteredRackList" :key="racks.id">
                            <td class="text-left py-3 px-4">{{ racks.roomName }}</td>
                            <td class="text-left py-3 px-4">{{ racks.roomId }}</td>
                            <td class="text-left py-3 px-4">{{ racks.model }}</td>
                            <td class="text-left py-3 px-4">{{ racks.facility }}</td>
                            <td class="text-left py-3 px-4">{{ racks.descending }}</td>
                            <td class="text-left py-3 px-4">{{ racks.height }}</td>
                            <td class="text-left py-3 px-4">{{ racks.width }}</td>
                            <td class="text-left py-3 px-4">{{ racks.type }}</td>
                            <td class="text-left py-3 px-4">{{ racks.tag }}</td>
                            <td class="text-center py-3 px-4">
                                <MyIcon name="flash" color="orange" tooltip="power" :hoverDecor="true" />
                                <MyIcon name="thermometer" color="green" tooltip="Temp" :hoverDecor="true" />
                                <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                    @click="handleNavigateToEditRacks(racks.id)" />
                                <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                    @click="showConfirmDialog(racks.id)" />
                            </td>
                        </tr>
                    </tbody>
                    <!-- <tbody class="text-gray-700">
                        Repeat for each row
                        <tr>
                            <td class="text-left py-3 px-4">TRPD test 1 </td>
                            <td class="text-left py-3 px-4">Taman Tekno, Blok C No. 19, Tangerang Selatan</td>
                            <td class="text-center py-3 px-4">42HP_Z</td>
                            <td class="text-center py-3 px-4">1</td>
                            <td class="text-center py-3 px-4">N</td>
                            <td class="text-center py-3 px-4">20</td>
                            <td class="text-center py-3 px-4">20</td>
                            <td class="text-center py-3 px-4">4 Post Cabinet</td>
                            <td class="text-center py-3 px-4">9435390</td>
                            <td class="text-center py-3 px-4">Tech1</td>
                            <td class="text-center py-3 px-4">
                                <a href="#" class="text-green-600 hover:text-green-800 mx-2">
                                    <MyIcon :onclick="handleNavigateToEditRacks(1)" name="pencil" color="blue" />
                                </a>
                                <a href="#" class="text-red-600 hover:text-red-800 mx-2">
                                    <MyIcon name="trash-can" color="red" />
                                </a>
                            </td>
                        </tr>
                    </tbody> -->
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
import { fetchRacksList, deleteRacks, fetchRacksDropdowns } from '@/services/monitoring/Location/rack';
import { fetchRoomDropdowns } from '@/services/monitoring/Location/room';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default {
    name: "Rack-List",
    components: {
        BaseLayout,
        MyIcon,
        BaseButton,
        Breadcrumb,
    },

    computed: {
        handleNavigateToAddRack() { return () => `${this.$route.path}/form/new`; }
    },

    setup() {
        const myBreadcrumbs = [
            { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
            { text: `${ROUTER.RACK.NAME} List`, to: ROUTER.RACK.PATH },
        ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    data() {
        return {
            rackList: [] as any[],
            racks: [] as any[],
            rooms: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
            filterRack: '',
            filterRoom: '',
            filteredRackList: [] as any[],
            rackOptions: [] as any[],
            roomOptions: [] as any[],
        }
    },

    methods: {
        async fetchRack() {
            try {
                const response = await fetchRacksDropdowns();
                this.racks = response.data.map((item:any) => ({ value: item.id, text: item.name }));
                this.rackOptions = response.data.map((item:any) => ({ value: item.name, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },
        
        async fetchRoom() {
            try {
                const response = await fetchRoomDropdowns();
                this.rooms = response.data.map((item:any) => ({ value: item.id, text: item.name }));
            } catch (err) {
                console.error('Error fetching location options:', err);
            }
        },

        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchRacksList();
                this.rackList = response.data.data;
                showSnackbar('Success fetch list', SnackbarType.Success);

            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
        },

        handleNavigateToEditRacks(racksId: number) {
            return () => this.$router.push(`${this.path}/form/${racksId}`);
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

            const response = await deleteRacks(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.rackList.findIndex(rack => rack.id === id);
                if (index !== -1) {
                    this.rackList.splice(index, 1);
                }
        },
        //filter data function
        filterData() {
            const selectedRoomText = this.roomOptions.find(rc => rc.value === this.roomOptions)?.text;
            this.filteredRackList = this.rackList.filter(racks => {
                const matchesRoom = !this.filterRoom || racks.Name === selectedRoomText;
                const matchesRack = !this.filterRoom || racks.name === this.filterRoom;
                return matchesRoom && matchesRack;
            });
        },
    },
    
    mounted() {
        this.handleFetchData();
        this.fetchRoom();
        this.fetchRack();
    },

    watch: {
        filterRoom() {
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