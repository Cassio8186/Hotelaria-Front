<template>
	<div class="q-ma-md">
		<div class="dados-pessoa q-mb-xl">
			<p class="text-body1">CPF: {{ pessoa.cpf }}</p>
			<p class="text-body1">Nome: {{ pessoa.nome }}</p>
			<p class="text-body1">Email: {{ pessoa.email }}</p>
			<p class="text-body1">Genero: {{ pessoa.genero }}</p>
			<p class="text-body1">Nascimento: {{ dataNascimentoConvertida }}</p>
		</div>
		<MensagemDeErroVue
			:errorMessage="errorMessage"
			:errors="errors"
			:showError="showError"
			:simpleMessage="simpleMessage"
		/>
		<q-form class="q-gutter-md" @submit="onSubmit">
			<q-input
				v-model="form.checkin"
				label="Data de Checkin"
				hint="Insira Data de Checkin."
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
							<q-date v-model="form.checkin" mask="DD-MM-YYYY">
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
				v-model="form.checkout"
				:mask="dayMonthYearDateMask"
				label="Data de Checkout"
				hint="Insira Data de Checkout."
				:rules="[isValidDate]"
			>
				<template v-slot:append>
					<q-icon name="event" class="cursor-pointer">
						<q-popup-proxy
							ref="qDateProxy"
							transition-show="scale"
							transition-hide="scale"
						>
							<q-date v-model="form.checkout" mask="DD-MM-YYYY">
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

			<div>
				<q-btn label="Efetuar checkin" type="submit" color="primary" />
				<q-btn
					label="Resetar"
					type="reset"
					color="primary"
					flat
					class="q-ml-sm"
					@click="onReset"
				/>
				<q-btn
					label="Remover reserva"
					color="primary"
					flat
					class="q-ml-sm"
					@click="onRemoverReserva"
					v-if="isUpdating"
				/>
			</div>
		</q-form>
	</div>
</template>

<script>
import { Validators, Date } from "../util";
import { PessoaService, CheckinCheckoutService } from "../services";
import MensagemDeErroVue from "src/components/MensagemDeErro.vue";

export default {
	name: "GerenciarPessoa",
	components: { MensagemDeErroVue },
	data: () => ({
		showError: false,
		errors: [],
		errorMessage: "",
		simpleMessage: "",
		pessoa: {},
		form: { checkin: "", checkout: "" },
		isUpdating: false
	}),
	computed: {
		/**
		 * @returns {String}
		 */
		cpf() {
			return this.$route.params.cpf;
		},
		/**
		 * @returns {String}
		 */
		dataNascimentoConvertida() {
			const { dataNascimento } = this.pessoa;
			if (dataNascimento) {
				const date = this.convertFromBackendDate(
					this.pessoa.dataNascimento
				);
				return date;
			}

			return "";
		},
		/**
		 * @returns {String}
		 */
		dayMonthYearDateMask() {
			return "##/##/####";
		}
	},
	methods: {
		...Validators,
		...Date,

		async findPersonByCpf() {
			try {
				const pessoa = (
					await PessoaService.findByCpf({ cpf: this.cpf })
				).data;

				this.pessoa = pessoa;
			} catch (e) {
				this.trataErrorsAxios(e);
			}
		},
		onReset() {},
		async saveCheckin() {
			const idPessoa = this.pessoa.id;
			const cpfPessoa = this.pessoa.cpf;
			const checkin = this.convertToBackendDate(this.form.checkin);
			const checkout = this.convertToBackendDate(this.form.checkout);
			try {
				await CheckinCheckoutService.deleteByCpfPessoa({
					cpfPessoa
				});
				await CheckinCheckoutService.save({
					idPessoa,
					checkin,
					checkout
				});
				this.$q.notify({
					message: "Reserva efetuada com sucesso",
					color: "blue"
				});
				this.$router.push("/pessoas");
			} catch (e) {
				this.trataErrorsApi(e);
			}
		},
		trataErrorsApi(exception) {
			const { errors, message, simpleMessage } = exception.response.data;
			this.$q.notify({
				message: "Erro ao efetuar reserva",
				color: "red",
				icon: "error"
			});

			this.errors = errors;
			this.errorMessage = message;
			this.simpleMessage = simpleMessage;
			this.showError = true;
		},
		onSubmit() {
			this.saveCheckin();
		},
		async findPersonCheckinByCpf() {
			const idPessoa = this.pessoa.id;
			try {
				const checkinCheckout = (
					await CheckinCheckoutService.findByIdPessoa({ idPessoa })
				).data;

				const { checkin, checkout } = checkinCheckout;
				this.form.checkin = checkin;
				this.form.checkout = checkout;
				this.isUpdating = true;
			} catch (e) {}
		},
		async onRemoverReserva() {
			const cpfPessoa = this.pessoa.cpf;
			await CheckinCheckoutService.deleteByCpfPessoa({ cpfPessoa });
			this.$router.push("/pessoas");
		}
	},

	async mounted() {
		await this.findPersonByCpf();
		await this.findPersonCheckinByCpf();
	}
};
</script>
