<template>
    <div class="text-left">
        <label v-if="label" :class="['block text-sm font-medium', { 'required': isRequired }]">
            {{ label }}
        </label>
        <p class="helper " v-if="helper">{{ helper }}</p>

        <textarea v-if="rows && typeof modelValue === 'string'" :rows="rows"
            :class="['w-full shadow-sm sm:text-sm', borderType, { 'is-valid': hasError }, { 'has-label': label }]"
            type="text" :placeholder="placeholder" :value="modelValue" :disabled="disabled" @input="handleInput($event)"
            style="padding: 10px;"></textarea>
        <!-- <input v-else-if="inputType === 'date'"
            :class="['sm:text-sm', borderType, size, { 'is-valid': hasError }, { 'has-label': label }]" :type="inputType"
            :placeholder="placeholder" :value="modelValue" :disabled="disabled" @input="handleInput($event)"> -->
        <input v-else :class="['sm:text-sm', borderType, size, { 'is-valid': hasError }, { 'has-label': label }]"
            :type="inputType" :placeholder="placeholder" :value="modelValue" :disabled="disabled"
            @input="handleInput($event)">
        <p v-if="hasError" class="text-red-600 text-sm">{{ errorMsg }}</p>
    </div>
</template>


<script lang="ts">
import { PropType } from 'vue';
import TheIcon from '../icon/TheIcon.vue';

// type ModelValueType = string | number | Record<string, any> | null;

export default {
    name: "Text-Input",
    props: {
        modelValue: {
            type: [String, Number, Object, null] as PropType<any>,
            default: "",
            isRequired: true,
        },
        rows: Number,
        label: String,
        helper: String,
        placeholder: String,
        disabled: Boolean,
        errorMsg: {
            type: String,
            default: "This field is required.",
            isRequired: false,
        },
        hasError: {
            type: Boolean,
            default: false
        },
        inputType: {
            type: String,
            default: "text",
        },
        borderType: {
            type: String,
            default: "border",
        },
        size: {
            type: String,
            default: "md",
        },
        isRequired: {
            type: Boolean,
            default: false
        }
    },
    emits: ["update:modelValue"],
    methods: {
        handleInput(event: Event) {
            const target = event.target as HTMLInputElement;
            if (this.inputType === 'number') {
                this.$emit('update:modelValue', Number(target.value));
                return;
            }
            this.$emit('update:modelValue', target.value);
        }
    },
    components: { TheIcon }
}

</script>


<style scoped>
textarea {
    background-color: white;
}

textarea:disabled {
    background: #efefef;
    color: #bdbdbd;
    cursor: not-allowed;
}

textarea.flat {
    border: 0;
    background-color: transparent;
}

input {
    position: relative;
    font-size: 14px;
    line-height: 18px;
    outline: none;
    width: 100%;
    padding: 0 12px;
    text-align: left;
    background-color: white;
}

input:disabled {
    background: #efefef;
    color: #bdbdbd;
    cursor: not-allowed;
}

.border {
    border: 1px solid #828282;
    border-radius: 4px;
}

.is-valid {
    border: 1px solid#d32f2f;
    border-radius: 4px;
}

input.flat {
    border: 0;
    background-color: transparent;
}

input.md {
    height: 36px;
}

input.lg {
    height: 40px;
}

input:focus {
    border-color: #0091ea;
}

label {
    font-size: 12px;
    font-weight: 500;
    color: #1c1a27;

}

.text-input {
    text-align: left;
}

.helper {
    font-size: 11px;
    color: #43404f;
    /* margin-top: 1px;
    margin-bottom: 1px; */
}

.has-label {
    margin-top: 0.25rem;
}

.required::after {
    content: '*';
    color: red;
}

input[type=date] {
    padding: 0 6px 0 8px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    border-radius: 4px;
    font-size: 18px;
    opacity: 0.8;
    filter: invert(1);
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1
}


input[type=file] {
    padding: 0 12px 0 0;
}

input[type=file]::file-selector-button {
    background-color: #d0d0d0;
    color: #000;
    border: 0px;
    border-right: 1px solid #e5e5e5;
    padding: 8px 10px;
    margin-right: 12px;
    font-size: 13px;
    transition: .5s;
    cursor: pointer;
}

input[type=file]::file-selector-button:hover {
    background-color: #eee;
    border: 0px;
    border-right: 1px solid #e5e5e5;
}
</style>