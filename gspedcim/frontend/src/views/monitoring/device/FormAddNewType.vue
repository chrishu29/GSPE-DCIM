<template>
    <BaseDevice>
        <LoadingState v-if="isLoading" :is-block="true" />
        <div class="device">
            <div class="head">
                <div class="title">Create New Device Type</div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" @click="submitForm" />
                </div>
            </div>
            <div class="form-content form-container grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                <div class="col-span-7">
                    <div class="cate-device">     
                        <div class="cate-title mb-2">
                            Device Type
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput class="" label="Name" :is-required="true" v-model="formData.name"
                                :has-error="v$.name.$error" />
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
import { createNewType } from '@/services/monitoring/Device/device-type';
import { LoadingState } from '@/components/state';
import { SnackbarType, useSnackbar } from '@/services/snackbarService';
import { useDelay } from '@/helper/miscelanus';

function goBack() {
    router.go(-1);
}
const { showSnackbar } = useSnackbar();
const router = useRouter();

const isLoading = ref(false);


const formData = reactive({
    name: '',
});


// Validation rules
const rules = {
    name: {required},

}
// Vuelidate instance
const v$ = useVuelidate(rules, formData);

async function submitForm() {

    console.log("invoke submit form");
    v$.value.$touch();

    if (!v$.value.$invalid) {

        const finalData = { ...formData };

        console.log(finalData);

        try {
            isLoading.value = true;
            await useDelay(2000);
            const resp = await createNewType(finalData);
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