<template>
    <div id="to-do" ref="parent">
        <div class="box" @dragenter="dragEnter">
            <ul class="item-group">
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    1
                </li>
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    2
                </li>
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    3
                </li>
            </ul>
        </div>
        <div class="box">
            <ul class="item-group" @dragenter="dragEnter" @drop="drop">
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    4
                </li>
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    5
                </li>
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    6
                </li>
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    7
                </li>
                <li
                    class="item"
                    @mousedown="selectItem"
                    @dragstart="dragStart"
                    @dragend="dragEnd"
                >
                    8
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let target = null

let startOffSetX = 0
let startOffSetY = 0

let preClientX = 0
let preClientY = 0

const parent = ref()

function getData(event, target) {
    const rect = target.getBoundingClientRect()
    startOffSetX = event.clientX - rect.left
    startOffSetY = event.clientY - rect.top
    preClientX = event.clientX
    preClientY = event.clientY
}

function moveAt(event) {
    const left = event.clientX - preClientX
    const top = event.clientY - preClientY
    target.style.transformOringin = `${startOffSetX}px ${startOffSetY}px`
    target.style.transform = `translate(${left}px, ${top}px)`
}
let cloneNode = null

function getCloneNode(target) {
    cloneNode = target.cloneNode()
    cloneNode.style.opacity = '0.5'
}

function selectItem(event) {
    target = event.target
    getData(event, target)
    target.style.opacity = '0.5'
    target.setAttribute('draggable', true)
    // parent.value.appendChild(target)
    // target.parentNode.removeChild(target)
}

function dragStart(event) {
    target.style.cursor = 'move'
    // target.style.position = 'absolute'
    // target.style['z-index'] = '9999'
    // target.addEventListener('drag', moveAt)
}

function dragEnd() {
    // target.removeEventListener('drag', moveAt)
    target.style.cursor = 'pointer'
    target.style.opacity = '1'
}

function dragEnter(event) {
    event.preventDefault()
    if (event.target.nodeName === 'UL') event.target.appendChild(target)
    if (event.target.nodeName === 'LI' && target !== event.target) {
        event.target.parentNode.insertBefore(target, event.target)
    }
}

// function drop() {
//     // event.preventDefault()
//     // if (event.target.nodeName === 'UL') event.target.appendChild(cloneNode)
//     // if (event.target.nodeName === 'LI' && target !== event.target) {
//     //     event.target.parentNode.insertBefore(cloneNode, event.target)
//     // }
//     console.log('drop')
// }
</script>

<style lang="scss" scoped>
#to-do {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--col-bg);
    display: flex;
    justify-content: space-around;

    .box {
        width: 400px;
        height: 60%;
        border: 2px solid #f5f5ff;
        border-radius: 40px;
        padding: 20px 0;
        background: pink;

        .item-group {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: auto;
            overflow-x: hidden;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-track {
                border-radius: 2px;
            }
            &::-webkit-scrollbar-thumb {
                background: rgba(217, 217, 217, 0.6);
                opacity: 0.2;
                border-radius: 4px;
            }

            .item {
                width: 300px;
                height: 100px;
                border: 2px solid #f5f5ff;
                border-radius: 20px;
                padding: 0 10px;
                margin: 0 auto;
                margin-bottom: 20px;
                color: var(--col-fg);
                text-align: center;
                line-height: 100px;
                list-style: none;
                transition: all 0.3s linear;
                background-color: #f5f5f5;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }
    }
}
</style>
