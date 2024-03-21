<template>
    <div class="text-left">
        <label :class="['block text-sm font-medium text-gray-700', { 'required': isRequired }]">{{ label }}</label>
        <!-- Todo: styling mulitselect height md:36px  and border -->
        <VueMultiselect :class="['mt-1 shadow-sm rounded-md',
            { 'invalid': hasError }]" v-model="innerValue" :options="options" :custom-label="customLabelFunction"
            selectedLabel="" :disabled="disabled" :placeholder="placeholder" selectLabel="" deselectGroupLabel=""
            deselectLabel="">
        </VueMultiselect>
        <p class="helper" v-if="helper && !hasError">{{ helper }}</p>
        <p v-if="hasError" class="text-red-600 text-sm">{{ errorMsg }}</p>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import VueMultiselect from 'vue-multiselect';
type ModelValueType = string | number | Record<string, any> | any[] | boolean | null;

export default {
    name: "SelectSingleInput",
    components: { VueMultiselect },
    props: {
        modelValue: {
            type: Object as PropType<ModelValueType>,
            default: () => (null)
        },
        hasError: Boolean,
        customLabelFunction: {
            type: Function,
            default: (option: any) => option
        },
        errorMsg: {
            type: String as PropType<string | null>,
            default: 'This field is required'
        },
        options: {
            type: Array,
            default: () => []
        },
        label: String,
        helper: String,
        placeholder: {
            type: String,
            default: "Select...",
        },
        disabled: Boolean,
        isRequired: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        innerValue: {
            get() {
                return this.modelValue;
            },
            set(value: Object) {
                console.log(value);
                this.$emit('update:modelValue', value);
            }
        }
    },

}

</script>

<style scoped>
.helper {
    font-size: 10px;
    color: #43404f;
    margin-top: 4px;
    /* margin-top: 4px;
    margin-bottom: 4px; */
}

.required::after {
    content: '*';
    color: red;
}
</style>