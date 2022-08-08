<template>
	<div class="loading-box">
		<div class="loading" :style="lodingStyle"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

let lodingStyle = reactive({
	width: '0',
	visibility: 'hidden',
});

function startLoading() {
	let i = 0;
	lodingStyle.visibility = 'visible';
	const loading = () => {
		lodingStyle.width = i + '%';
		i++;
		if (i >= 95) stopLoading();
		else requestAnimationFrame(loading);
	};
	requestAnimationFrame(loading);
}

function stopLoading() {
	lodingStyle.visibility = 'hidden'
    lodingStyle.width = '0';
}

defineExpose({
	startLoading,
	stopLoading,
});
</script>

<style scoped lang="scss">
.loading-box {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	width: 100%;
	height: 10px;

	.loading {
		visibility: hidden;
		width: 0;
		height: 5px;
		background-color: green;
	}
}
</style>
