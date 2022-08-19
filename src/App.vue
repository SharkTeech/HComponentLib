<template>
    <div class="container">
        <div class="top-bar">
            <!-- <button @click="lightMode">白日模式</button>
            <button @click="darkMode">暗夜模式</button> -->
            <Button @change-mode="changeMode" />
        </div>
        <div class="main-box">
            <div class="aside">
                <Tree :data="items" />
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import Tree from '@/components/tree/index.vue'

const items: Array<Object> = [
    {
        id: 0,
        name: '时间组件',
        url: '',
        children: [
            { id: 1, name: '日历', url: '/calendar', children: [] },
            { id: 2, name: '时钟', url: '/clock', children: [] },
        ],
    },
    { id: 3, name: 'Form', url: '/form', children: [] },
    { id: 4, name: 'ToDo', url: '/toDo', children: [] },
]

function changeMode() {
    const mode = document.body.getAttribute('mode')
    if (!mode) document.body.setAttribute('mode', 'dark')
    else document.body.removeAttribute('mode')
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .top-bar {
        height: 50px;
        background-color: var(--theme-color);
    }

    .main-box {
        flex: 1;
        display: flex;

        .aside {
            height: 100%;
        }

        .main {
            flex: 1;
        }
    }
}
</style>
