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
                        </div>

                        <div class="flex space-x-2 mt-2 w-full justify-between">
                            <breadcrumb :breadcrumbs="myBreadcrumbs"></breadcrumb>
                            <router-link  :to=ROUTER.MOVED.PATH>
                                <BaseButton type="secondary" minWidth="150px">Go to Move Device ></BaseButton>
                            </router-link>
                            <!-- <router-link  :to=ROUTER.LOCATIONS_FORM.PATH>
                                <BaseButton minWidth="150px">Add Uninstall</BaseButton>
                            </router-link> -->
                        </div>
                    </div>
                </div>
            </div>

            <!--  Loading  -->
            <div v-if="isLoading">
                <LoadingState />
            </div>

            <div v-if="uninstallList.length <= 0 && !isLoading">
                <EmptyState />
            </div>

            <!-- Tables -->
            <div class="container mx-auto mt-4 rounded-lg">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-subheader p-4 bg-white shadow-lg  text-white mb-3">
                            <tr>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Name</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Serial No.</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Uninstall By</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Uninstall At</th>
                                <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            <!-- Repeat for each row -->
                            <tr v-for="device in uninstallList" :key="device.id">
                                <td class="text-left py-3 px-4">{{ device.name }}</td>
                                <td class="text-left py-3 px-4">{{ device.Serial }}</td>
                                <td class="text-left py-3 px-4">{{ device.uninstallBy }}</td>
                                <td class="text-left py-3 px-4">{{ device.uninstallAt }}</td>
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
import { fetchUninstalledList, deleteUninstall } from '@/services/monitoring/Device/uninstall';
import { LoadingState, EmptyState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';

const { showSnackbar } = useSnackbar();

export default{
    name: "Uninstall Device List",
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
        { text: `${ROUTER.UNINSTALLED.NAME} List`, to: ROUTER.UNINSTALLED.PATH },
    ];
        return {
            myBreadcrumbs,
            ROUTER,
        };
    },

    data() {
        return {
            uninstallList: [] as any[],
            isLoading: false,
            errorMsg: "" as any,
            path: this.$route.path,
            isDialogVisible: false,
            selectedId: 0,
        }
    },

    methods: {
        async handleFetchData() {
            try {
                this.isLoading = true;
                const response = await fetchUninstalledList();
                this.uninstallList = response.data.data;
                showSnackbar('Success fetch list', SnackbarType.Success);

            } catch (err) {
                console.log(err);
                this.errorMsg = err;
                showSnackbar(`${err}`, SnackbarType.Error);
            } finally {
                this.isLoading = false;
            }
            console.log("Fetched Devices:", this.uninstallList);
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

            const response = await deleteUninstall(id);
                console.log('Deletion response:', response.data);
                
                // Update locationsList to reflect the deletion
                const index = this.uninstallList.findIndex(device => device.id === id);
                if (index !== -1) {
                    this.uninstallList.splice(index, 1);
                }
        },
    },
    
    mounted() {
        this.handleFetchData();
    },
}
</script>