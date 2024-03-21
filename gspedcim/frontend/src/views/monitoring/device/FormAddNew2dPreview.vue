<template>
    <BaseDevice>
        <LoadingState v-if="isLoading" :is-block="true" />
        <div class="device">
            <div class="head">
                <div class="title">Create New Device 2D Preview </div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" @click="submitForm" />
                </div>
            </div>
            <div class="form-content form-container grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                <div class="col-span-7">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <TextInput class="" label="Name" :is-required="true" v-model="formData.name"
                            :has-error="v$.name.$error" />
                    </div>

                    <!-- Front Image Selection and Preview -->
                    <div class="mb-4 gap-4">
                        <label class="block text-sm font-medium">Front Pic File</label>
                        <input type="file" @change="handleImageChange($event, 'front')" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <!-- Conditional Image preview -->
                        <div class="mt-2 max-h-40">
                            <img v-if="formData.frontPicture" :src="`data:image/jpeg;base64,${formData.frontPicture}`" alt="Front Picture Preview" class="mt-2 max-h-40">
                            <img v-else src="https://placehold.co/600x150" alt="Placeholder" class="h-full">
                        </div>
                    </div>

                    <!-- Rear Image Selection and Preview -->
                    <div class="mb-4 gap-4">
                        <label class="block text-sm font-medium">Rear Pic File</label>
                        <input type="file" @change="handleImageChange($event, 'rear')" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <!-- Conditional Image preview -->
                        <div class="mt-2 max-h-40">
                            <img v-if="formData.rearPicture" :src="`data:image/jpeg;base64,${formData.rearPicture}`" alt="Front Picture Preview" class="mt-2 max-h-40">
                            <img v-else src="https://placehold.co/600x150" alt="Placeholder" class="h-full">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseDevice>
</template>


<script lang="ts" setup>
import TextButton from '@/components/button/TextButton.vue';
import BaseDevice from './BaseDevice.vue';
import { useRouter } from 'vue-router';
import TextInput from '@/components/Form/TextInput.vue';
import { reactive, ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { LoadingState } from '@/components/state';
import { SnackbarType, useSnackbar } from '@/services/snackbarService';
import { useDelay } from '@/helper/miscelanus';
import { createNewPreview } from '@/services/monitoring/Device/device-2d';

function goBack() {
    router.go(-1);
}
const { showSnackbar } = useSnackbar();
const router = useRouter();

const isLoading = ref(false);


const formData = reactive({
    name: '',
    frontPicture: '',
    frontPictureFileName: '',
    rearPicture: '',
    rearPictureFileName: '',
});

function handleImageChange(event: Event, type: 'front' | 'rear') {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        const base64String = reader.result as string;
        if (type === 'front') {
            formData.frontPictureFileName = file.name;
            formData.frontPicture = base64String.split(',')[1]; // Store only the Base64 part
        } else if (type === 'rear') {
            formData.rearPictureFileName = file.name;
            formData.rearPicture = base64String.split(',')[1];
        }
    };

    reader.onerror = error => console.log('Error reading file:', error);
}

// Validation rules
const rules = {
    name: { required },
    frontPicture: { required },
    frontPictureFileName: { required },
    rearPicture: { required },
    rearPictureFileName: { required },

}

// Vuelidate instance
const v$ = useVuelidate(rules, formData);

async function submitForm() {

console.log("invoke submit form");
v$.value.$touch();

if (!v$.value.$invalid) {

    const finalData = { ...formData };

    try {
        isLoading.value = true;
        await useDelay(2000);
        const resp = await createNewPreview(finalData);
        console.log(JSON.stringify(finalData));
        if (resp.status == 201) {
            showSnackbar('Category Successfully Created', SnackbarType.Success);
            // todo
            // invoke fetch dropdown category store here
            goBack();
        } else if (resp.status == 200) {
            showSnackbar('Category Successfully Updated', SnackbarType.Success);
            // todo
            // invoke fetch dropdown category store here
            goBack();
        } else {
            throw ("Something went wrong with code " + resp.status);
        }
    } catch (e) {
        showSnackbar(`Error : ${e}`, SnackbarType.Error);

        console.log(e);
    } finally {
        isLoading.value = false;
    }
}
}

</script>


<style scoped>
.cate-title {
    font-weight: bold;
}

.cate-device {
    /* background-color: beige; */
    margin-bottom: 20px;
}

.cate-hardware {
    margin-bottom: 12px;

    /* background-color: aquamarine; */
}

.cate-simulate {
    /* background-color: aqua; */
    margin-bottom: 12px;
}

.img-label {
    font-size: 12px;
}
</style>