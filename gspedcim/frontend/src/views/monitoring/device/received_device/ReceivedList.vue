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
                            <router-link  :to=ROUTER.INSTALLED.PATH>
                                <BaseButton type="secondary" minWidth="150px">Go to Install Device ></BaseButton>
                            </router-link>
                            <router-link  :to=handleNavigateToAddReceived()>
                                <BaseButton minWidth="150px">Add Received</BaseButton>
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
                                <select id="role" class="w-full bg-white outline-none" v-model="filterRole">
                                    <option value="">Role</option>
                                    <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <!-- <label for="status" class="block text-sm font-medium text-left mb-1 text-white">Status</label> -->
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
                            <!-- <label for="time-zone" class="block text-sm font-medium text-left mb-1 text-white">Time
                                Zone</label> -->
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
            </div>

            <!--  Loading  -->
            <div v-if="isLoading">
                <LoadingState />
            </div>

            <div v-if="receivedList.length <= 0 && !isLoading">
                <EmptyState />
            </div>

            <!-- Tables -->
            <div v-if="receivedList.length > 0 && !isLoading" class="container mx-auto mt-4 rounded-lg bg-white">
                <div class="overflow-x-auto">
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
                            <tr v-for="receive in filteredReceivedList" :key="receive.id">
                                <td class="text-left py-3 px-4">{{ receive.name }}</td>
                                <td class="text-left py-3 px-4">{{ receive.deviceRole }}</td>
                                <td class="text-left py-3 px-4">{{ receive.manufacturerName }}</td>
                                <td class="text-left py-3 px-4">{{ receive.deviceTypeName }}</td>
                                <td class="text-left py-3 px-4">{{ receive.height }}</td>
                                <td class="text-left py-3 px-4">{{ receive.weight }}</td>
                                <td class="text-left py-3 px-4">{{ receive.wattage }}</td>
                                <td class="text-center py-3 px-4">
                                    
                                    <MyIcon name="pencil" color="blue" tooltip="edit" :hoverDecor="true"
                                        @click="handleNavigateToEditReceived(receive.id)" />
                                    <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                        @click="showConfirmDialog(receive.id)" />
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
import { fetchReceivedList, deleteReceived } from '@/services/monitoring/Device/receive';
import { fetchMfrList } from '@/services/monitoring/Device/mfr';
import { fetchTypeList } from '@/services/monitoring/Device/device-type';
import { fetchRoleList } from '@/services/monitoring/Device/device-roles';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default{
    name: "Received-List",
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
            receivedList: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
            filterRole: '',
            filterType: '',
            filterMfr: '',
            filteredReceivedList: [] as any[],
            roleOptions: [] as any[],
            typeOptions: [] as any[],
            mfrOptions: [] as any[],
        }
    },

    setup() {

    const myBreadcrumbs = [
        { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
        { text: `${ROUTER.RECEIVED.NAME} List`, to: ROUTER.RECEIVED.PATH },
    ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    computed: {
        handleNavigateToAddReceived() { return () => `${this.$route.path}/form/new`; }
    },

    methods: {
        //fetch data list from API
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchReceivedList();
                this.receivedList = response.data.data;
                this.filteredReceivedList = response.data.data;
                showSnackbar('Success fetch list', SnackbarType.Success);

            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
            console.log("Fetched Devices:", this.receivedList);
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

        handleNavigateToEditReceived(recId: number) {
            return () => this.$router.push(`${this.path}/form/${recId}`);
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

            const response = await deleteReceived(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.receivedList.findIndex(rec => rec.id === id);
                if (index !== -1) {
                    this.receivedList.splice(index, 1);
                }
        },
        filterData() {
            const selectedRoleText = this.roleOptions.find(role => role.value === this.filterRole)?.text;
            const selectedTypeText = this.typeOptions.find(type => type.value === this.filterType)?.text;
            const selectedMfrText = this.mfrOptions.find(mfr => mfr.value === this.filterMfr)?.text;

            this.filteredReceivedList = this.receivedList.filter(rec => {
                const matchesRole = !this.filterRole || rec.deviceRole === selectedRoleText;
                const matchesType = !this.filterType || rec.deviceTypeName === selectedTypeText;
                const matchesMfr = !this.filterMfr || rec.manufacturerName === selectedMfrText;

                return matchesRole && matchesType && matchesMfr;
            });

            // console.log("Filtered List:", this.filteredDeviceList);
        }
    },
    
    mounted() {
        this.handleFetchData();
        this.fetchManufacturer();
        this.fetchType();
        this.fetchRole();
    },
}
</script>