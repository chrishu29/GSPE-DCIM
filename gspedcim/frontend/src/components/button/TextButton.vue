<template>
    <!-- todo: add tooltip feature -->
    <button :class="[className]">
        <TheIcon :name="icon" :color="color" />
        <span class="txt truncate" :class="{ 'has-padding': hasText }">{{ text }}</span>
    </button>
</template>
  
<script lang="ts">
import TheIcon from '../icon/TheIcon.vue';

export default {
    name: "TextButton",
    props: {
        icon: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false,
            default: ""
        },

        color: {
            type: String,
            required: false,
            default: "black"
        },
        bgcolor: {
            type: String,
            required: false,
            default: "bg-felgrau"
        },
        bordered: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "primary",
        }
    },
    computed: {
        hasText() {
            return this.text.trim().length > 0;
        },
        className() {
            // Applies base classes
            let classes = ' font-semibold btn flex rounded shadow-md focus:outline-none ';

            // Check for button type
            if (this.type === 'primary') {
                // For primary, use the provided color for text and bg-color for background
                classes += `  ${this.color} ${this.bgcolor}`;
            } else if (this.type === 'secondary') {
                // For secondary, apply default styles (black text, whitegh background, and bordered)
                classes += ' black whitegh bordered';
            }

            return classes;
        }
    },
    components: { TheIcon }
}
</script>
  
<style scoped>
.btn {
    height: 32px;
    min-width: 32px;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border: none;
    padding: 1px 3px;
    border-radius: 4px;
}

.black {
    color: #000000;
}

.white {
    color: #fff;
}

.blue {
    color: var(--blue-fs);
}

.blue-neon {
    color: var(--blue-neon);
}

.blue-picton {
    color: var(--blue-picton);
}

.grey {
    color: var(--grey-ship);
}

.light-green {
    color: var(--green-yellow);
}

.red {
    color: red;
}



.whitegh {
    background-color: var(--white-ghost);
}

.bg-blue-fs {
    background-color: var(--blue-fs);
}

.bg-blue-picton {

    background-color: var(--blue-picton);
}

.bg-blue-neon {
    background-color: var(--blue-neon);
}

.bg-felgrau {
    background-color: var(--felgrau);
}

.bg-none {
    background-color: transparent;
}


.txt {
    font-size: 14px;
}

.has-padding {
    padding: 0 8px;
}

.bordered {
    border: 1px solid var(--felgrau);
}
</style>
  