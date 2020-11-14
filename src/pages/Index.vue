<template>
	<q-page class="flex flex-center column">
		<img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
	</q-page>
</template>

<script>
import WakeBackendMixin from "../mixins/WakeBackendMixin";

export default {
	name: "PageIndex",
	mixins: [WakeBackendMixin]
};
</script>
