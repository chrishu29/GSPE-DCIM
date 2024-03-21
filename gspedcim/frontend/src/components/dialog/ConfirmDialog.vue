<template>
    <transition name="fade">
        <div class="dialog-backdrop" v-if="isVisible">
            <div id="deleteModal" tabindex="-1" aria-hidden="true"
                class=" overflow-y-auto overflow-x-hidden z-50 justify-center items-center  md:inset-0 h-modal ">
                <div class="relative w-full max-w-md h-full md:h-auto">
                    <!-- Modal content -->
                    <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button" @click="cancel"
                            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="deleteModal">
                            <MyIcon name="close" />
                            <!-- <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg> -->
                            <span class="sr-only">Close modal</span>
                        </button>
                        <MyIcon :name="icon" size="40px" color="#BDBDBD" />
                        <!-- <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                        </svg> -->
                        <p class="mb-6 text-gray-500 dark:text-gray-300">{{ message }}</p>
                        <div class="flex justify-center items-center space-x-4 ">
                            <BaseButton @click="cancel" type="secondary">
                                No, cancel
                            </BaseButton>
                            <!-- <button data-modal-toggle="deleteModal" type="button" @click="cancel"
                                class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button> -->
                            <BaseButton @click="confirm" type="primary">
                                Yes, I'm sure
                            </BaseButton>
                            <!-- <button type="submit" @click="confirm" :class="[
                                'py-2', 'px-3', 'text-sm', 'font-medium',
                                'text-center', 'text-white', 'rounded-lg',
                                'comfirmbtn',
                                `hover:bg-${yesColor}-700`, 'focus:ring-4',
                                'focus:outline-none', 'focus:ring-red-300',
                                `bg-${yesColor}-600`,
                                `dark:bg-${yesColor}-500`, `dark:hover:bg-${yesColor}-600`, `dark:focus:ring-${yesColor}-900`
                            ]">
                                Yes, I'm sure
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
  
<script lang="ts">
import MyIcon from '../icon/MyIcon.vue';
import BaseButton from '../button/BaseButton.vue';

export default {
    components: {
        MyIcon,
        BaseButton
    },
    props: {
        isVisible: Boolean,
        message: {
            type: String,
            default: "Are you sure you want to delete this item?"
        },
        icon: {
            type: String,
            default: "trash-can"
        },
        yesColor: {
            type: String,
            default: "red",
        }

    },
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            this.$emit('cancel');
        }
    }
};
</script >
  
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {
    background: white;
    padding: 20px;
    border-radius: 5px;
}

/* .comfirmbtn{

} */
</style>
  