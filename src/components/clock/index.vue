<template>
    <div id="clock">
        <div class="hour-point-big">12</div>
        <div class="hour-point-small">1</div>
        <div class="hour-point-small">2</div>
        <div class="hour-point-big">3</div>
        <div class="hour-point-small">4</div>
        <div class="hour-point-small">5</div>
        <div class="hour-point-big">6</div>
        <div class="hour-point-small">7</div>
        <div class="hour-point-small">8</div>
        <div class="hour-point-big">9</div>
        <div class="hour-point-small">10</div>
        <div class="hour-point-small">11</div>
        <div class="center-point"></div>
        <div class="hour-hand" :style="hourHandActive"></div>
        <div class="minute-hand" :style="minuteHandActive"></div>
        <div class="second-hand" :style="secondHandActive"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const hours = reactive<Array<number>>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

let hourDeg = 0;

let minuteDeg = 0;

let secondDeg = 0;

let hourHandActive = ref(`transform: rotateZ(0deg);`);

let minuteHandActive = ref(`transform: rotateZ(0deg);`);

let secondHandActive = ref(`transform: rotateZ(0deg);`);

function active() {
    secondDeg = (secondDeg + 6) % 360;
    if (secondDeg % 60 === 0) {
        minuteDeg = (minuteDeg + 1) % 360;
        if (minuteDeg % 12 === 0) hourDeg = (hourDeg + 1) % 360;
    }
    hourHandActive.value = `transform: rotateZ(${hourDeg}deg);`;
    minuteHandActive.value = `transform: rotateZ(${minuteDeg}deg);`;
    secondHandActive.value = `transform: rotateZ(${secondDeg}deg);`;
}

function startClock() {
    setInterval(active, 1000);
}

onMounted(() => {
    startClock();
});
</script>

<style lang="scss" scoped>
#clock {
    box-sizing: border-box;
    width: 1000px;
    height: 1000px;
    border-radius: 500px;
    border: 1px solid black;
    position: relative;

    .center-point {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: black;
        transform: translate(-10px, -10px);
    }

    .hour-hand {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4px;
        height: 200px;
        background-color: black;
        margin-left: -2px;
        margin-top: -200px;
        transform-origin: 2px 200px;

        &::before {
            position: absolute;
            top: -1px;
            left: 1px;
            content: '';
            display: block;
            width: 4px;
            height: 25px;
            background-color: black;
            transform-origin: 0 0;
            transform: rotateZ(45deg);
        }

        &::after {
            position: absolute;
            top: 1px;
            left: -1px;
            content: '';
            display: block;
            width: 4px;
            height: 25px;
            background-color: black;
            transform-origin: 0 0;
            transform: rotateZ(-45deg);
        }
    }

    .minute-hand {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4px;
        height: 300px;
        background-color: black;
        margin-left: -2px;
        margin-top: -300px;
        transform-origin: 2px 300px;

        &::before {
            position: absolute;
            top: -1px;
            left: 1px;
            content: '';
            display: block;
            width: 4px;
            height: 25px;
            background-color: black;
            transform-origin: 0 0;
            transform: rotateZ(45deg);
        }

        &::after {
            position: absolute;
            top: 1px;
            left: -1px;
            content: '';
            display: block;
            width: 4px;
            height: 25px;
            background-color: black;
            transform-origin: 0 0;
            transform: rotateZ(-45deg);
        }
    }

    .second-hand {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4px;
        height: 400px;
        background-color: black;
        margin-left: -2px;
        margin-top: -400px;
        transform-origin: 2px 400px;
        // transform: rotateZ(90deg);

        &::before {
            position: absolute;
            top: -1px;
            left: 1px;
            content: '';
            display: block;
            width: 4px;
            height: 25px;
            background-color: black;
            transform-origin: 0 0;
            transform: rotateZ(45deg);
        }

        &::after {
            position: absolute;
            top: 1px;
            left: -1px;
            content: '';
            display: block;
            width: 4px;
            height: 25px;
            background-color: black;
            transform-origin: 0 0;
            transform: rotateZ(-45deg);
        }
    }

    .hour-point-big {
        position: absolute;
        // width: 2px;
        // height: 30px;
        // background-color: black;
        transform-origin: 0 0;
        font-size: 20px;

        &:nth-child(1) {
            left: 50%;
            top: 0;
        }
        &:nth-child(4) {
            right: 0;
            top: 50%;
            // transform: rotateZ(90deg);
        }
        &:nth-child(7) {
            left: 50%;
            bottom: 0;
            // transform: rotateZ(180deg);
        }
        &:nth-child(10) {
            left: 0;
            top: 50%;
            // transform: rotateZ(-90deg);
        }
    }

    .hour-point-small {
        position: absolute;
        // width: 2px;
        // height: 25px;
        // background-color: black;
        transform-origin: 0 0;
        font-size: 20px;

        &:nth-child(2) {
            left: 75%;
            top: 6.75%;
            // transform: rotateZ(30deg);
        }
        &:nth-child(3) {
            right: 6.75%;
            top: 25%;
            // transform: rotateZ(60deg);
        }
        &:nth-child(5) {
            right: 6.75%;
            bottom: 25%;
            // transform: rotateZ(180deg);
        }
        &:nth-child(6) {
            right: 25%;
            bottom: 6.75%;
            // transform: rotateZ(-90deg);
        }
        &:nth-child(8) {
            left: 25%;
            bottom: 6.75%;
            // transform: rotateZ(30deg);
        }
        &:nth-child(9) {
            left: 6.75%;
            bottom: 25%;
            // transform: rotateZ(60deg);
        }
        &:nth-child(11) {
            left: 6.75%;
            top: 25%;
            // transform: rotateZ(30deg);
        }
        &:nth-child(12) {
            left: 25%;
            top: 6.75%;
            // transform: rotateZ(60deg);
        }
    }
}
</style>
