<template>
    <div id="calendar">
        <div class="container">
            <div class="top-bar">
                <button @click="prevYear">&lt;&lt;</button>
                <button @click="prevMonth">&lt;</button>
                <button>{{ year }}-{{ month }}</button>
                <button @click="nextMonth">&gt;</button>
                <button @click="nextYear">&gt;&gt;</button>
            </div>
            <div class="calendar-week">
                <div
                    v-for="(item, index) of weeks"
                    :key="index"
                    class="week-item"
                >
                    {{ item }}
                </div>
            </div>
            <div class="calendar-days">
                <!-- <div
                    v-for="(item, index) of days"
                    :key="index"
                    class="day"
                    :class="{
                        day__selected: selectedDayIndex === index && !isNowDay,
                        day__isNow: selectedDayIndex === index && isNowDay,
                    }"
                    :style="{ color: item.isCurMonth ? '#606266' : '#c0c4cc' }"
                    @click="selectDay(index)"
                >
                    {{ item.day }}
                </div> -->
                <Day
                    v-for="(item, index) of days"
                    :key="index"
                    :dayDate="item"
                    :isSelected="selectedDayIndex === index"
                    @click="selectDay(index)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Day from './day.vue';

//记录当前日期，用作是否为当天对比
let nowDate = ref<Date>(new Date());

let year = ref<number>(1970);

let month = ref<number>(1);

let day = ref<number>(1);

//记录月份天数
let monthDayTotal = ref<number>(30);

//记录每月第一天为周几
let firstDayOfMonth = ref<number>(1);

const weeks = reactive<Array<string>>([
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
]);

const days = reactive<Array<Day>>([]);

//选中的日期
let selectedDayIndex = ref<number>(2);

interface Day {
    year: number;
    month: number;
    day: number;
    isPrevMonth: boolean;
    isCurMonth: boolean;
    isNextMonth: boolean;
    isNowDay: boolean;
}

function isSameDate(year: number, month: number, day: number): boolean {
    return (
        year === nowDate.value.getFullYear() &&
        month === nowDate.value.getMonth() + 1 &&
        day === nowDate.value.getDate()
    );
}

function prevMonth() {
    month.value--;
    if (month.value <= 0) {
        year.value--;
        month.value = 12;
    }
    createCalendar();
}

function nextMonth() {
    month.value++;
    if (month.value >= 13) {
        year.value++;
        month.value = 1;
    }
    createCalendar();
}

function prevYear() {
    year.value--;
    createCalendar();
}

function nextYear() {
    year.value++;
    createCalendar();
}

function selectDay(index: number) {
    const selectedDate: Day = days[index];
    day.value = selectedDate.day;
    if (selectedDate.isPrevMonth) prevMonth();
    else if (selectedDate.isNextMonth) nextMonth();
    else selectedDayIndex.value = index;
}

//生成日历
function createCalendar() {
    //获取目标月份信息
    const targetDate: Date = new Date(year.value, month.value - 1, 1);

    //获取每月第一天的周信息
    firstDayOfMonth.value = targetDate.getDay();
    //获取每月天数
    monthDayTotal.value = getDayTotal(year.value, month.value);

    createDays();
}

//获取月份天数
function getDayTotal(year: number, month: number) {
    const monthDayData = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
        monthDayData[1] = 29;
    return monthDayData[month - 1];
}

//生成日期
function createDays() {
    days.splice(0, days.length);
    //获取上月月份天数
    let lastMonthDays = getDayTotal(
        month.value - 1 <= 0 ? year.value - 1 : year.value,
        month.value - 1 <= 0 ? 12 : month.value - 1
    );
    //上月月份信息
    for (let i = 0; i < firstDayOfMonth.value; i++)
        days.unshift({
            year: month.value - 1 <= 0 ? year.value - 1 : year.value,
            month: month.value - 1 <= 0 ? 12 : month.value - 1,
            day: lastMonthDays--,
            isPrevMonth: true,
            isCurMonth: false,
            isNextMonth: false,
            isNowDay: false,
        });
    //当前月份信息
    for (let i = 1; i <= monthDayTotal.value; i++)
        days.push({
            year: year.value,
            month: month.value,
            day: i,
            isPrevMonth: false,
            isCurMonth: true,
            isNextMonth: false,
            isNowDay: isSameDate(year.value, month.value, i),
        });
    //下月月份信息
    for (let i = firstDayOfMonth.value + monthDayTotal.value; i < 42; i++)
        days.push({
            year: month.value + 1 >= 13 ? year.value + 1 : year.value,
            month: month.value + 1 >= 13 ? 1 : month.value + 1,
            day: i - (firstDayOfMonth.value + monthDayTotal.value) + 1,
            isPrevMonth: false,
            isCurMonth: false,
            isNextMonth: true,
            isNowDay: false,
        });
    locateDay();
}

//定位日期
function locateDay() {
    for (
        let i = firstDayOfMonth.value;
        i < firstDayOfMonth.value + monthDayTotal.value;
        i++
    )
        if (days[i].day === day.value) selectedDayIndex.value = i;
}

onMounted(() => {
    //获取当前年份
    year.value = nowDate.value.getFullYear();
    //获取当前月份
    month.value = nowDate.value.getMonth() + 1;
    //获取当前日期
    day.value = nowDate.value.getDate();
    //初始化渲染
    createCalendar();
});
</script>

<style lang="scss" scoped>
#calendar {
    width: 100%;
    height: 100%;

    .container {
        width: 100%;
        // height: 500px;
        display: flex;
        flex-direction: column;

        .top-bar {
            height: 50px;
            display: flex;
            justify-content: space-around;

            button {
                padding: 0 10px;
                background: transparent;
                border: none;
                cursor: pointer;

                &:hover {
                    color: #409eff;
                }
            }
        }

        .calendar-week {
            height: 50px;
            display: flex;
            justify-content: space-around;

            .week-item {
                padding: 0 20px;
                line-height: 50px;
            }
        }

        .calendar-days {
            flex: 1;
            display: grid;
            grid-template-rows: repeat(6, 1fr);
            grid-template-columns: repeat(7, 1fr);
        }
    }
}
</style>
