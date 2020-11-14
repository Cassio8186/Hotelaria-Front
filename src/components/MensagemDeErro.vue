<template>
	<div>
		<q-dialog v-model="showError">
			<q-card>
				<q-card-section>
					<div class="text-h6">Erro</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<strong>{{ simpleMessage }}</strong>

					<q-space />
					Detalhes do erro para Nerds:
					<q-space />

					<span
						v-for="errorMessage in errors"
						:errorMessage="errorMessage"
						:key="errorMessage"
					>
						<li>Erro: {{ errorMessage }}</li>
						<q-space />
					</span>

					Mensagem detalhada de erro: {{ errorMessage }}
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="OK" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
export default {
	name: "MensagemDeErro",
	props: ["showError", "errors", "errorMessage", "simpleMessage"]
};
</script>

<style></style>
