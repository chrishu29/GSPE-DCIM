<template>
    <BaseLayout>
        <div>
            <!-- Information Card -->
            <div class="container mx-auto mt-5">
                <div class="w-full p-4  bg-white shadow-lg rounded-lg bg-header">
                    <div class="flex flex-col items-start">
                        <div class="flex flex-col items-left mb-4 md:mb-0">
                            <div class="flex text-blue-600 mr-4 mb-2 align-center">
                                <MyIcon name="cellphone-link" color="white" size="24px" />
                                <h2 class="ml-2 text-2xl font-semibold text-white">Device</h2>
                            </div>
                            <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                        </div>

                        <div class="flex space-x-2 mt-2 w-full justify-between">
                            <router-link  :to=ROUTER.DEVICE.PATH>
                                <BaseButton type="secondary" minWidth="150px">Go to Device List ></BaseButton>
                            </router-link>
                            <router-link  :to=handleNavigateToAddMoved()>
                                <BaseButton minWidth="150px">Add Move</BaseButton>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!--  Loading  -->
            <div v-if="isLoading">
                <LoadingState />
            </div>

            <div v-if="movedList.length <= 0 && !isLoading">
                <EmptyState />
            </div>

            <!-- Tables -->
            <div class="container mx-auto mt-4 rounded-lg">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-subheader p-4 bg-white shadow-lg  text-white mb-3">
                            <tr>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Serial No.</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Location</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Old Location</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Building</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Old Building</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Floor</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Old Floor</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Room</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Old Room</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Rack</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Old Rack</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Position</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Old Position</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Move At</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            <!-- Repeat for each row -->
                            <tr v-for="device in movedList" :key="device.id">
                                <td class="text-left py-3 px-4">{{ device.serial }}</td>
                                <td class="text-left py-3 px-4">{{ device.location }}</td>
                                <td class="text-left py-3 px-4">{{ device.oldLocation }}</td>
                                <td class="text-left py-3 px-4">{{ device.building }}</td>
                                <td class="text-left py-3 px-4">{{ device.oldBuilding }}</td>
                                <td class="text-left py-3 px-4">{{ device.floor }}</td>
                                <td class="text-left py-3 px-4">{{ device.oldFloor }}</td>
                                <td class="text-left py-3 px-4">{{ device.room }}</td>
                                <td class="text-left py-3 px-4">{{ device.oldRoom }}</td>
                                <td class="text-left py-3 px-4">{{ device.rack }}</td>
                                <td class="text-left py-3 px-4">{{ device.oldRack }}</td>
                                <td class="text-left py-3 px-4">{{ device.position }}</td>
                                <td class="text-left py-3 px-4">{{ device.oldPosition }}</td>
                                <td class="text-left py-3 px-4">{{ device.moveAt }}</td>
                                <td class="text-center py-3 px-4">
                                    
                                    <MyIcon name="trash-can" color="red" tooltip="delete" :hoverDecor="true"
                                        @click="showConfirmDialog(device.id)" />
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
import { fetchMovedList, deleteMoved } from '@/services/monitoring/Device/move';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();


export default{
    name: "Moved-List",
    components: {
        BaseLayout,
        BaseButton,
        Breadcrumb,
        MyIcon,
        ROUTER,
    },

    setup() {

    const myBreadcrumbs = [
        { text: ROUTER.DCIM_MONITORING.NAME, to: ROUTER.DCIM_MONITORING.PATH },
        { text: `${ROUTER.MOVED.NAME} List`, to: ROUTER.MOVED.PATH },
    ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    data() {
        return {
            movedList: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
        }
    },
    
    computed: {
        handleNavigateToAddMoved() { return () => `${this.$route.path}/form/new`; }
    },

    methods: {
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchMovedList();
                this.movedList = response.data.data;
                showSnackbar('Success fetch list', SnackbarType.Success);

            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
            console.log("Fetched Devices:", this.movedList);
        },

        //show dialog popup for delete data
        showConfirmDialog(id:number) {
            this.$nextTick(() => {
                this.isDialogVisible = true;
            });
            this.selectedId = id;
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

            const response = await deleteMoved(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.movedList.findIndex(device => device.id === id);
                if (index !== -1) {
                    this.movedList.splice(index, 1);
                }
        },
    },
    
    mounted() {
        this.handleFetchData();
    },
}
</script>