<template>
    <BaseDevice>
        <div class="device">
            <div class="head">
                <div class="title">{{ ROUTER.DEVICE_CATEGORY.NAME }}</div>
                <div class="subtitle">
                    <router-link :to="`${ROUTER.DEVICE_CATEGORY.PATH}/form/new`">
                        <TextButton icon="plus" color="white" text="Add Device" />
                    </router-link>
                    <TextButton icon="reload" color="white" @click="loadData"></TextButton>
                    <div class="searchbar items-center bg-gray-200 px-3 py-1.5">
                        <input type="text" placeholder="Search by name..." v-model="deviceParam.name"
                            class=" bg-gray-200 outline-none ml-2">
                        <TheIcon name="search" color="grey" />
                    </div>
                </div>
            </div>
            <!-- <div v-if="isLoading">
                <LoadingState />
            </div> -->
            <!-- <div v-if="data.length <= 0 && !isLoading">
                <EmptyState />
            </div> -->

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
                            <div class="filter-item" v-if="selectedType">
                                <span>Device Type: {{ selectedType?.name }}</span>
                                <TheIcon color="white" name="x-small" @click="selectType(undefined)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="errMsg">
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
                            <!-- <div @click="toggleDropdownRole" class="header-container">
                            {{ header.text }}
                            <ul v-if="isDropdownRoleVisible" class="custom-dropdown">
                                <li v-for="option in roleOptions" :key="option.id" @click.stop="selectRole(option)">
                                    {{ option.name }}
                                </li>
                            </ul>
                        </div> -->
                        </template>
                        <template #header-manufacturerName="header">
                            <div @click="isDropdownMfrVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>
                        <template #header-deviceTypeName="header">
                            <div @click="isDropdownTypeVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>
                        <template #loading>
                            <LoadingState />
                        </template>
                        <template #empty-message>
                            <EmptyState />
                        </template>
                        <template #item-name="{ name, id }">
                            <router-link :to="`${ROUTER.DEVICE_CATEGORY.PATH}/form/${id}`">
                                {{ name }}
                            </router-link>
                        </template>
                        <template #item-actions="{ id }">
                            <!-- todo: reduce icon size -->
                            <TheIcon color="blue" @click="editItem(id)" name="edit" />
                            <TheIcon color="red" @click="deleteDeviceCategory(id)" name="delete" />
                        </template>
                        <!-- todo: styling pagination button  -->
                    </Vue3EasyDataTable>
                </div>
            </div>

        </div>
        <ConfirmDialog :isVisible="isDialogVisible" message="Are you sure you want to delete this category?"
            @confirm="onConfirm" @cancel="onCancel" yes-color="blue" />
        <!-- todo: refactor to be general dialog  -->
        <ModalFilter :options="roleOptionsStore.options" :isVisible="isDropdownRoleVisible"
            @update:isVisible="isDropdownRoleVisible = $event" @selected="selectRole" title="Select a Role" />
        <ModalFilter :options="mfrOptionsStore.options" :isVisible="isDropdownMfrVisible"
            @update:isVisible="isDropdownMfrVisible = $event" @selected="selectMfr" title="Select a Manufacture" />
        <ModalFilter :options="typeOptionsStore.options" :isVisible="isDropdownTypeVisible"
            @update:isVisible="isDropdownTypeVisible = $event" @selected="selectType" title="Select a Type" />
    </BaseDevice>
</template>

<script lang="ts" setup>
import { debounce } from '@/helper/debounce';
import { useRoute } from 'vue-router';
import BaseDevice from './BaseDevice.vue';
import TextButton from '@/components/button/TextButton.vue';
import TheIcon from '@/components/icon/TheIcon.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item, ServerOptions, SortType } from "vue3-easy-data-table";
import { fetchDeviceCategoryList, deleteCategory } from '@/services/monitoring/Device/device-category';
import { LoadingState, EmptyState, ErrorState } from '@/components/state';
import { useSnackbar, SnackbarType } from '@/services/snackbarService';
import { rowPerPage, DropdownOption } from '@/constants';
import type { DeviceParam } from '@/services/monitoring/Device/device-category';
// import { useDelay } from '@/helper/miscelanus';
import { ROUTER } from '@/constants'
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import ModalFilter from './ModalFilter.vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';
import router from '@/router';
import { useMfrOptionsStore, useRoleOptionsStore, useTypeOptionsStore } from '@/views/monitoring/device/states/dropdownDevice';
import { useConfirmDialog } from '@/components/dialog/useConfirmDialog';
import { handleClickOutside } from '@/helper/miscelanus';

const { confirmDeletion, onCancel, onConfirm } = useConfirmDialog();

const { showSnackbar } = useSnackbar();
const roleOptionsStore = useRoleOptionsStore();
const mfrOptionsStore = useMfrOptionsStore();
const typeOptionsStore = useTypeOptionsStore();

const data = ref<Item[]>([]);
const selectedRole = ref<DropdownOption>();
const selectedMfr = ref<DropdownOption>();
const selectedType = ref<DropdownOption>();
const isLoading = ref(false);
const errMsg = ref('');
const serverItemsLength = ref(0);

const isDropdownRoleVisible = ref(false);
const isDropdownMfrVisible = ref(false);
const isDropdownTypeVisible = ref(false);
const isDialogVisible = ref(false);

let nameFilter = '';

const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: rowPerPage,
    sortBy: "",
    sortType: "desc",
});

const deviceParam = ref<DeviceParam>({
    page: serverOptions.value.page,
    sortBy: serverOptions.value.sortBy,
    sortType: serverOptions.value.sortType,
    pageSize: serverOptions.value.rowsPerPage,
    name: "",
    deviceRole: selectedRole.value?.id,
    manufacturer: selectedMfr.value?.id,
    deviceType: selectedType.value?.id,
    // other param here
});

const selectRole = (option: DropdownOption | undefined) => {
    selectedRole.value = option;
    deviceParam.value.deviceRole = option?.id;
    isDropdownRoleVisible.value = false;
    isDropdownMfrVisible.value = false;
};
const selectMfr = (option: DropdownOption | undefined) => {
    selectedMfr.value = option;
    deviceParam.value.manufacturer = option?.id;
    isDropdownMfrVisible.value = false;
};
const selectType = (option: DropdownOption | undefined) => {
    selectedType.value = option;
    deviceParam.value.deviceType = option?.id;
    isDropdownTypeVisible.value = false;
};

async function loadData() {
    console.log("Loading data");
    isLoading.value = true;
    errMsg.value = "";
    try {
        const response = await fetchDeviceCategoryList(deviceParam.value);
        // await useDelay(2000);
        console.log("resp : " + response.data.data);
        data.value = response.data.data;
        serverItemsLength.value = response.data.totalRecords;
        serverOptions.value.page = response.data.page;
        showSnackbar('Success fetch list', SnackbarType.Success);
    } catch (err) {
        console.log(err);
        errMsg.value = String(err) || 'An unexpected error occurred';
        showSnackbar(`${err}`, SnackbarType.Error);
    } finally {
        isLoading.value = false;
    }
}

// function confirmDeletion() {
//     isDialogVisible.value = true;
//     return new Promise(resolve => {
//         resolveConfirmation = resolve;
//     });
// }

// function onCancel() {
//     if (resolveConfirmation) {
//         resolveConfirmation(false);
//     }
//     isDialogVisible.value = false;
// }


// function onConfirm() {
//     if (resolveConfirmation) {
//         resolveConfirmation(true);
//     }
// }

async function deleteDeviceCategory(id: number) {
    isDialogVisible.value = true;
    const userConfirmed = await confirmDeletion();
    if (userConfirmed) {
        isLoading.value = true;
        try {
            const response = await deleteCategory(id);
            console.log('Deletion response:', response.data);
            showSnackbar("Device Category Successfully Deleted", SnackbarType.Success);
            loadData();
        } catch (error) {
            console.log(error);
            showSnackbar("Delete Device Category Failed!", SnackbarType.Error);
        } finally {
            isLoading.value = false;
            isDialogVisible.value = false;
        }
    } else {
        isDialogVisible.value = false;
    }
};
onMounted(async () => {
    document.addEventListener('click', handleClickOutside);
    loadData();
    await roleOptionsStore.fetchRoleOptions();
    await mfrOptionsStore.fetchMfrOptions();
    await typeOptionsStore.fetchTypeOptions();
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
watch(serverOptions, () => {
    deviceParam.value.page = serverOptions.value.page;
    deviceParam.value.pageSize = serverOptions.value.rowsPerPage;
    deviceParam.value.sortBy = serverOptions.value.sortBy as string;
    deviceParam.value.sortType = serverOptions.value.sortType as SortType;
}, {
    deep: true
});
const debouncedLoadData = debounce(loadData, 400);

watch(deviceParam, (newVal) => {
    if (newVal.name !== nameFilter) {
        debouncedLoadData();
        nameFilter = newVal.name;
    } else {
        loadData();
    }
}, { deep: true });

// const showRow = (item: ClickRowArgument) => {
//     document.getElementById('row-clicked').innerHTML = JSON.stringify(item);
// };

// const filterOptions = computed((): FilterOption[] => {
//     const filterOptionsArray: FilterOption[] = [];

//     if (selectedRole.value?.name !== 'all') {
//         filterOptionsArray.push({
//             field: 'role',
//             comparison: '=',
//             criteria: selectedRole.value?.name ?? '',
//         });
//     }
//     return filterOptionsArray;
// });
const headers: Header[] = [
    { text: "Name", value: "name" },
    { text: "Role", value: "deviceRole" },
    { text: "Manufacture", value: "manufacturerName" },
    { text: "Device Type", value: "deviceTypeName", },
    { text: "Height", value: "height", sortable: true },
    { text: "Weight (kg)", value: "weight", sortable: true },
    { text: "Wattage", value: "wattage", sortable: true },
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

