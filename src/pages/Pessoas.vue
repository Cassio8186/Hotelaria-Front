<template>
	<div class="">
		<q-btn to="/pessoas/cadastrar" color="positive">Adicionar Pessoa</q-btn>
		<ListaPessoas />
	</div>
</template>

<script>
import ListaPessoas from "../components/ListaPessoas.vue";
import WakeBackendMixin from "../mixins/WakeBackendMixin";

export default {
	name: "Pessoas",
	components: { ListaPessoas },
	mixins: [WakeBackendMixin]
};
</script>

<style></style>
