<template>
    <div id="day">
        <div class="container">
            <div
                class="day"
                :class="{
                    day__isCurMonth: dayDate.isCurMonth,
                    day__isSelected: isSelected && !dayDate.isNowDay,
                    day__isNowDay: !isSelected && dayDate.isNowDay,
                    day__isSelected__isNowDay: isSelected && dayDate.isNowDay,
                }"
            >
                {{ props.dayDate.day }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps(['dayDate', 'isSelected']);

const { dayDate, isSelected } = toRefs(props);
</script>

<style scoped lang="scss">
#day {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        .day {
            width: 48px;
            height: 48px;
            border-radius: 24px;
            color: #c0c4cc;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;

            &__isCurMonth {
                color: #606266;
            }

            &__isSelected {
                background: #f5f5f5;
            }

            &__isNowDay {
                color: #409eff;
            }

            &__isSelected__isNowDay {
                background: #409eff;
                color: #f5f5f5 !important;
            }

            &:hover {
                color: #409eff;
            }
        }
    }
}
</style>
