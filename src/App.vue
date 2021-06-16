<template>
	<div class="app">
		<router-view />
	</div>
</template>

<script lang="ts">
export default {
	name: 'App',
}
</script>
<style lang="scss">
html,
body,
#app {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
}
.app {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
