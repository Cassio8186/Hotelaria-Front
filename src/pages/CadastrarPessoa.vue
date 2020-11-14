<template>
	<div>
		<MensagemDeErro
			:errorMessage="errorMessage"
			:errors="errors"
			:showError="showError"
			:simpleMessage="simpleMessage"
		/>
		<FormPessoa @savePessoa="savePessoa" />
	</div>
</template>

<script>
import { Validators, Date } from "../util";
import { PessoaService } from "../services";

import MensagemDeErro from "../components/MensagemDeErro.vue";
import FormPessoa from "../components/FormPessoa.vue";

export default {
	name: "CadastrarPessoa",
	components: { FormPessoa, MensagemDeErro },
	data: () => ({
		errorMessage: "",
		errors: [],
		showError: false,
		simpleMessage: ""
	}),
	methods: {
		...Validators,
		...Date,
		async savePessoa(pessoa) {
			try {
				const savedPessoa = await PessoaService.save({
					nome: pessoa.nome,
					cpf: pessoa.cpf,
					dataEmissaoRg: this.convertToBackendDate(
						pessoa.dataEmissaoRg
					),
					dataNascimento: this.convertToBackendDate(
						pessoa.dataNascimento
					),
					email: pessoa.email,
					estadoCivil: pessoa.estadoCivil,
					genero: pessoa.genero,
					orgaoEmissor: pessoa.orgaoEmissor,
					rg: pessoa.rg
				});
				this.$q.notify({
					message: "Pessoa cadastrada com sucesso",
					color: "green",
					icon: "success"
				});
				this.$router.push("/pessoas");
			} catch (e) {
				this.tratamentoErro(e);
				this.$q.notify({
					message: "Erro ao cadastrar pessoa",
					color: "red",
					icon: "error"
				});
			}
		},
		tratamentoErro(exception) {
			const { errors, message, simpleMessage } = exception.response.data;
			this.errors = errors;
			this.errorMessage = message;
			this.showError = true;
			this.simpleMessage = simpleMessage;
		}
	}
};
</script>

<style></style>
