<template>
    <div>
        <input type="file" />
        <div class="dropBox" @dragenter="dragEnter"></div>
    </div>
</template>

<script setup lang="ts">
function dragEnter(event) {
    console.log(event)
}
</script>

<style lang="scss" scoped>
.dropBox {
    width: 500px;
    height: 500px;
    border: 1px solid black;
}
</style>
