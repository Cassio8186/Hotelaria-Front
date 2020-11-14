<template>
	<div>
		<q-form class="q-gutter-md" @submit="onSubmit">
			<q-input
				filled
				type="string"
				label="Cpf"
				hint="Digite CPF Sem pontos"
				:readonly="update"
				lazy-rules
				v-model="form.cpf"
				:rules="[val => isValidCPF(val) || 'Digite um cpf valido']"
			/>

			<q-input
				filled
				label="Digite seu nome e sobrenome"
				hint="Nome e Sobrenome"
				type="string"
				lazy-rules
				v-model="form.nome"
				:rules="[
					val =>
						(val && val.length > 7) ||
						'Informe seu nome e sobrenome'
				]"
			/>

			<q-input
				filled
				type="string"
				hint="Digite seu email"
				label="email"
				lazy-rules
				v-model="form.email"
				:rules="[val => isValidEmail(val) || 'Digite um email valido']"
			/>
			<q-input
				filled
				type="string"
				hint="Digite seu Estado Civil"
				label="Estado Civil"
				lazy-rules
				v-model="form.estadoCivil"
				:rules="[
					val => (val && val.length > 1) || 'Informe seu estado civil'
				]"
			/>
			<q-input
				filled
				type="string"
				label="Genero"
				hint="Digite seu Genero"
				lazy-rules
				v-model="form.genero"
				:rules="[
					val => (val && val.length > 1) || 'Informe seu Genero'
				]"
			/>
			<q-input
				filled
				type="string"
				label="Orgão emissor"
				hint="Digite seu Orgão emissor"
				lazy-rules
				v-model="form.orgaoEmissor"
				:rules="[
					val =>
						(val && val.length > 1) || 'Informe seu Orgão emissor'
				]"
			/>
			<q-input
				filled
				type="string"
				hint="Digite seu rg"
				label="rg"
				lazy-rules
				v-model="form.rg"
				:rules="[val => (val && val.length > 1) || 'Informe seu RG']"
			/>

			<q-input
				filled
				v-model="form.dataNascimento"
				label="Data de Nascimento"
				hint="Insira data de nascimento. "
				:mask="dayMonthYearDateMask"
				:rules="[isValidDate]"
			>
				<template v-slot:append>
					<q-icon name="event" class="cursor-pointer">
						<q-popup-proxy
							ref="qDateProxy"
							transition-show="scale"
							transition-hide="scale"
						>
							<q-date
								v-model="form.dataNascimento"
								mask="DD-MM-YYYY"
							>
								<div class="row items-center justify-end">
									<q-btn
										v-close-popup
										label="Fechar"
										color="primary"
										flat
									/>
								</div>
							</q-date>
						</q-popup-proxy>
					</q-icon>
				</template>
			</q-input>

			<q-input
				filled
				v-model="form.dataEmissaoRg"
				:mask="dayMonthYearDateMask"
				label="Data de Emissão do RG"
				hint="Insira Data de Emissão do RG. [Formato: AAAA-MM-DD]"
				:rules="[isValidDate]"
			>
				<template v-slot:append>
					<q-icon name="event" class="cursor-pointer">
						<q-popup-proxy
							ref="qDateProxy"
							transition-show="scale"
							transition-hide="scale"
						>
							<q-date
								v-model="form.dataEmissaoRg"
								mask="DD-MM-YYYY"
							>
								<div class="row items-center justify-end">
									<q-btn
										v-close-popup
										label="Fechar"
										color="primary"
										flat
									/>
								</div>
							</q-date>
						</q-popup-proxy>
					</q-icon>
				</template>
			</q-input>

			<div class="q-gutter-md">
				<q-btn :label="saveBtnLabel" type="submit" color="primary" />
				<q-btn
					v-if="!update"
					label="Resetar"
					type="reset"
					color="primary"
					flat
					class="q-ml-sm"
					@click="onReset"
				/>
				<q-btn
					v-if="update"
					label="Remover Pessoa"
					color="primary"
					@click="onRemoverPessoa"
				/>
			</div>
		</q-form>
	</div>
</template>

<script>
import { Validators, Date } from "../util";
import { PessoaService } from "src/services";

export default {
	name: "FormPessoa",
	components: {},
	props: {
		update: {
			type: Boolean,
			required: false,
			default: false
		},
		pessoa: {
			type: Object,
			required: false
		}
	},
	data: () => ({
		form: {
			nome: "",
			cpf: "",
			dataEmissaoRg: "",
			dataNascimento: "",
			email: "",
			estadoCivil: "",
			genero: "",
			orgaoEmissor: "",
			rg: "",
			checkin: "",
			checkout: ""
		},
		dayMonthYearDateMask: "##/##/####",
		showError: false,
		errors: [],
		errorMessage: ""
	}),
	methods: {
		...Date,
		...Validators,
		onRemoverPessoa() {
			this.$emit("deletePessoa", this.pessoa);
		},
		onReset() {
			this.form = {
				nome: "",
				cpf: "",
				dataEmissaoRg: "",
				dataNascimento: "",
				dataCheckin: "",
				dataCheckout: "",
				email: "",
				estadoCivil: "",
				genero: "",
				orgaoEmissor: "",
				rg: ""
			};
			this.showError = false;
		},
		onSubmit() {
			this.$emit("savePessoa", this.form);
		}
	},
	mounted() {
		if (this.pessoa) {
			this.form = this.pessoa;
		}
	},
	computed: {
		/**
		 * @returns {String}
		 */
		saveBtnLabel() {
			return this.update == false
				? "Salvar Cadastro"
				: "Alterar Cadastro";
		}
	}
};
</script>

<style></style>
