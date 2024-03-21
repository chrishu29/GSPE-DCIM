<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal-overlay" @click.self="close">
            <div class="modal-content">
                <h2>{{ title }}</h2>
                <div class="modal-body">
                    <ul>
                        <li v-for="option in options" :key="option.id" @click="selectOption(option)">
                            {{ option.name }}
                        </li>
                    </ul>
                </div>
                <button @click="close">Close</button>
            </div>
        </div>
    </transition>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { DropdownOption } from '@/constants';


defineProps<{
    options: DropdownOption[];
    isVisible: boolean;
    title: string;
}>();

const emit = defineEmits(['update:isVisible', 'selected']);

const selectOption = (value: DropdownOption) => {
    emit('selected', value);
    close();
};

const close = () => {
    emit('update:isVisible', false);
};
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 90%;
    max-height: 80vh;
    z-index: 1001;
}

.modal-body {
    overflow-y: auto;
    max-height: 60vh;
}

h2 {
    margin-top: 0;
    font-size: 18px;
    font-weight: 600;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
}

li {
    cursor: pointer;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s;
}

li:hover {
    background-color: #f9f9f9;
}

li:last-child {
    border-bottom: none;
}

button {
    display: inline-block;
    margin-top: 20px;
    margin-top: auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}
</style>

  