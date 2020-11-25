<template>
	<q-layout view="hHh lpR fFf" class="layout">
		<q-header elevated class="bg-primary text-white" height-hint="98">
			<q-toolbar>
				<q-toolbar-title>
					<q-btn to="/" color="secondary">Hotelaria</q-btn>
					<q-space />
					Não insira informações pessoais, este site é apenas para
					estudo.
				</q-toolbar-title>
			</q-toolbar>

			<q-tabs align="center">
				<q-route-tab to="/pessoas" label="Gerenciar Pessoas" />
				<q-route-tab
					:to="`/pessoas/checkin-checkout/${cpf}`"
					label="Checkin e Checkout"
					disable
				/>
			</q-tabs>
		</q-header>

		<q-page-container class="q-mb-lg">
			<router-view />
		</q-page-container>

		<q-footer elevated class="bg-grey-8 text-white">
			<q-toolbar>
				<q-toolbar-title>
					Hotelaria
				</q-toolbar-title>
				<q-space />
				Por: Cássio Lopes
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
export default {
	name: "MainLayout",
	computed: {
		cpf() {
			return this.$route.params.cpf;
		}
	}
};
</script>
<style></style>
