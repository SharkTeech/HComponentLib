<template>
    <div id="button" @click="changeMode">
        <div class="main">
            <div class="thumb" :style="{ transform: thumbStyle }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let thumbStyle = ref('translateX(2px, 2px)')

let isDark = false

const emits = defineEmits(['changeMode'])

function changeMode() {
    isDark = !isDark
    if (isDark) thumbStyle.value = 'translate(40px, 2px)'
    else thumbStyle.value = 'translate(2px, 2px)'
    emits('changeMode')
}
</script>

<style lang="scss" scoped>
#button {
    width: 120px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--gray-1);
    cursor: pointer;

    .main {
        width: 60px;
        height: 20px;
        border-radius: 10px;
        background-color: var(--gray-2);

        .thumb {
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background-color: var(--gray-1);
            transform: translate(2px, 2px);
            transition: all 0.3s;
        }
    }
}
</style>
