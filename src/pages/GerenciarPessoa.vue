<template>
	<div>
		<MensagemDeErro
			:errorMessage="errorMessage"
			:errors="errors"
			:showError="showError"
			:simpleMessage="simpleMessage"
		/>
		<FormPessoa
			@savePessoa="updatePessoa"
			@deletePessoa="deletePessoa"
			:update="true"
			:pessoa="pessoa"
			v-if="isPessoaFetched"
		/>
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
		simpleMessage: "",
		pessoa: {},
		isPessoaFetched: false
	}),
	methods: {
		...Validators,
		...Date,
		async deletePessoa(pessoa) {
			try {
				await PessoaService.deleteById({ id: pessoa.id });
			} finally {
				this.$router.push("/pessoas");
			}
		},
		async getPessoa(cpf) {
			try {
				const pessoa = await (await PessoaService.findByCpf({ cpf }))
					.data;

				pessoa.dataNascimento = Date.convertFromBackendDate(
					pessoa.dataNascimento
				);
				pessoa.dataEmissaoRg = Date.convertFromBackendDate(
					pessoa.dataEmissaoRg
				);
				return pessoa;
			} catch (error) {
				this.trataErrorsApi(error);
			}
		},
		async updatePessoa(pessoa) {
			console.log(pessoa);
			try {
				const updatedPessoa = await PessoaService.update({
					id: pessoa.id,
					nome: pessoa.nome,
					cpf: this.cpfPessoa,
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
					message: "Pessoa atualizada com sucesso",
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
	},
	async mounted() {
		const pessoa = await this.getPessoa(this.cpfPessoa);

		this.pessoa = pessoa;
		this.isPessoaFetched = true;
	},
	computed: {
		cpfPessoa() {
			return this.$route.params.cpf;
		}
	}
};
</script>

<style></style>
