<template>
    <div id="tree">
        <ul class="container">
            <li
                v-for="item of props.data"
                :key="item.id"
                class="tree-node"
                @click="selectNode(item)"
            >
                <router-link
                    :to="item.url"
                    class="tree-node__content"
                    :class="{ 'tree-node__selected': selectedId === item.id }"
                >
                    {{ item.name }}
                </router-link>
                <div v-if="item.children.length !== 0">
                    <ul v-show="selectedTitleId === item.id" class="container">
                        <li
                            v-for="item of item.children"
                            :key="item.id"
                            class="tree-node"
                            @click.stop="selectNode(item)"
                        >
                            <router-link
                                :to="item.url"
                                style="padding-left: 30px"
                                class="tree-node__content"
                                :class="{
                                    'tree-node__selected':
                                        selectedId === item.id,
                                }"
                            >
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import './index.scss'
import { ref } from 'vue'
import Tree from './index.vue'

const props = defineProps(['data'])

let selectedId = ref<number>(-1)

let selectedTitleId = ref<number>(-1)

function selectNode(item: Object) {
    if (item.children.length) {
        if (selectedTitleId.value === item.id) selectedTitleId.value = -1
        else selectedTitleId.value = item.id
    } else selectedId.value = item.id
}
</script>

<style></style>
