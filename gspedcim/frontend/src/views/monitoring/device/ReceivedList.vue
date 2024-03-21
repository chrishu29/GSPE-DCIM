<template>
    <BaseDevice>
        <div class="device">
            <div class="head">
                <div class="title">{{ ROUTER.DEVICE_LIST_RECEIVED.NAME }} List</div>
                <div class="subtitle">
                    <router-link :to="`${ROUTER.DEVICE_LIST_RECEIVED.PATH}/form/new`">
                        <TextButton icon="plus" color="white" text="Receive New Device" />
                    </router-link>
                    <TextButton icon="reload" color="white"></TextButton>
                    <div class="searchbar items-center bg-gray-200 px-3 py-1.5">
                        <input type="text" placeholder="Search..." class="bg-gray-200 outline-none ml-2">
                        <TheIcon name="search" color="grey" />
                    </div>
                </div>
            </div>
            <div class="table-content">
                <!-- Filters -->
                <div class="bg-gray-200 rounded">
                    <div class="pr-4 pl-1 pt-1 ">
                        <span class="text-sm ">Filters:</span>
                    </div>
                    <div class="flex items-center pb-1.5">
                        <div class="flex flex-wrap gap-y-1">
                            <div class="filter-item" v-if="selectedRole">
                                <span>Role: {{ selectedRole?.name }}</span>
                                <TheIcon color="white" name="x-small" @click="selectRole(undefined)" />
                            </div>
                            <div class="filter-item" v-if="selectedMfr">
                                <span>Manufacture: {{ selectedMfr?.name }}</span>
                                <TheIcon color="white" name="x-small" @click="selectMfr(undefined)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="errMsg && !isLoading">
                    <ErrorState :error-message="errMsg" />
                </div>
                <div v-else>
                    <Vue3EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
                        :server-items-length="serverItemsLength" :loading="isLoading" table-class-name="table-device"
                        buttons-pagination>
                        <template #header-deviceRole="header">
                            <div @click="isDropdownRoleVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>
                        <template #header-manufacturerName="header">
                            <div @click="isDropdownMfrVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>

                        <template #item-actions="{ id }">
                            <!-- todo: reduce icon size -->
                            <TheIcon color="blue" @click="editItem(id)" name="edit" />
                            <TheIcon color="red" @click="deleteDeviceReceive(id)" name="delete" />
                        </template>
                    </Vue3EasyDataTable>
                </div>
            </div>
        </div>
        <!-- todo: refactor to be general dialog  -->
        <ModalFilter :options="roleOptionsStore.options" :isVisible="isDropdownRoleVisible"
            @update:isVisible="isDropdownRoleVisible = $event" @selected="selectRole" title="Select a Role" />
        <ModalFilter :options="mfrOptionsStore.options" :isVisible="isDropdownMfrVisible"
            @update:isVisible="isDropdownMfrVisible = $event" @selected="selectMfr" title="Select a Manufacture" />
    </BaseDevice>
</template>

<script lang="ts" setup>
import ModalFilter from './ModalFilter.vue';
import BaseDevice from './BaseDevice.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import TextButton from '@/components/button/TextButton.vue';
import TheIcon from '@/components/icon/TheIcon.vue';
import { DropdownOption, ROUTER, rowPerPage } from '@/constants';
// import { useSnackbar } from '@/services/snackbarService';
import { useMfrOptionsStore, useRoleOptionsStore } from './states/dropdownDevice';
import { ReceivedParam } from '@/services/monitoring/Device/receive';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Header, Item, ServerOptions, SortType } from 'vue3-easy-data-table';
import { useRoute } from 'vue-router';
import router from '@/router';

const data = ref<Item[]>([]);

// const { showSnackbar } = useSnackbar();
const roleOptionsStore = useRoleOptionsStore();
const mfrOptionsStore = useMfrOptionsStore();
const isDropdownRoleVisible = ref(false);
const isDropdownMfrVisible = ref(false);

const serverItemsLength = ref(0);
const isLoading = ref(false);
const errMsg = ref('');
const selectedRole = ref<DropdownOption>();
const selectedMfr = ref<DropdownOption>();


const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: rowPerPage,
    sortBy: "",
    sortType: "desc",
});


const receiveParam = ref<ReceivedParam>({
    page: serverOptions.value.page,
    sortBy: serverOptions.value.sortBy,
    sortType: serverOptions.value.sortType,
    pageSize: serverOptions.value.rowsPerPage,
    name: "",
    deviceRole: selectedRole.value?.id,
    manufacturer: selectedMfr.value?.id,
    deviceFrom: undefined,
    receiveDate: undefined,
    receivedBy: undefined,
    deviceType: undefined,
});

const selectRole = (option: DropdownOption | undefined) => {
    selectedRole.value = option;
    receiveParam.value.deviceRole = option?.id;
    isDropdownRoleVisible.value = false;
    isDropdownMfrVisible.value = false;
};
const selectMfr = (option: DropdownOption | undefined) => {
    selectedMfr.value = option;
    receiveParam.value.manufacturer = option?.id;
    isDropdownMfrVisible.value = false;
};
async function loadData() { };

async function deleteDeviceReceive(id: number) {
    console.log(id);
    // const userConfirmed = await confirmDeletion();
    // if (userConfirmed) {
    //     isLoading.value = true;
    //     try {
    //         // const response = await deleteCategory(id);
    //         console.log('Deletion response:', response.data);
    //         showSnackbar("Device Category Successfully Deleted", SnackbarType.Success);
    //         loadData();
    //     } catch (error) {
    //         console.log(error);
    //         showSnackbar("Delete Device Category Failed!", SnackbarType.Error);
    //     } finally {
    //         isLoading.value = false;
    //         isDialogVisible.value = false;
    //     }
    // } else {
    //     isDialogVisible.value = false;
    // }
};

onMounted(async () => {
    loadData();
    await roleOptionsStore.fetchRoleOptions();
    await mfrOptionsStore.fetchMfrOptions();
});

onUnmounted(() => {

});
watch(serverOptions, () => {
    receiveParam.value.page = serverOptions.value.page;
    receiveParam.value.pageSize = serverOptions.value.rowsPerPage;
    receiveParam.value.sortBy = serverOptions.value.sortBy as string;
    receiveParam.value.sortType = serverOptions.value.sortType as SortType;
}, {
    deep: true
});

const headers: Header[] = [
    { text: "Name", value: "name" },
    { text: "Role", value: "deviceRole" },
    { text: "Manufacture", value: "manufacturerName" },
    { text: "Receive By", value: "receiveBy", },
    { text: "Receive Date", value: "receiveDate", sortable: true },
    { text: "From", value: "deviceFrom" },
    { text: "Action", value: "actions" },
];

const items = computed(() => data.value);
const route = useRoute();
const currentPath = route.path;
const editItem = (id: number) => {
    router.push(`${currentPath}/form/${id}`).catch(err => {
        console.error(err);
    });
};

</script>

<style scoped></style>
