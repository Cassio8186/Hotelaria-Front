actions
<template>
	<div>
		<q-table
			:columns="columns"
			:data="pessoas"
			title="Pessoas Cadastradas"
			:visible-columns="[]"
			:loading="isLoadingPessoas"
			no-data-label="Não há
		pessoas cadastradas"
			loading-label="Carregando pessoas cadastradas"
			rows-per-page-label="Registros por página"
			virtual-scroll
			row-key="id"
			separator="cell"
		>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th
						v-for="col in props.cols"
						:key="col.name"
						:props="props"
					>
						{{ col.label }}
					</q-th>
					<q-th auto-width>Gerenciar Pessoa</q-th>
					<q-th auto-width>Checkin/Checkout</q-th>
				</q-tr>
			</template>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td
						v-for="col in props.cols"
						:key="col.name"
						:props="props"
					>
						{{ col.value }}
					</q-td>
					<q-td auto-width align="center">
						<q-btn
							size="sm"
							color="accent"
							round
							dense
							:props="props"
							@click="gerenciarPessoa(props.row)"
							icon="edit"
						/>
					</q-td>
					<q-td auto-width align="center">
						<q-btn
							size="sm"
							color="accent"
							round
							dense
							:props="props"
							@click="checkinCheckout(props.row)"
							icon="hotel"
						/>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>

<script>
import { PessoaService, CheckinCheckoutService } from "../services";
export default {
	name: "ListaPessoas",
	methods: {
		gerenciarPessoa(pessoa) {
			this.$router.push(`/pessoas/gerenciar/${pessoa.cpf}`);
		},
		checkinCheckout(pessoa) {
			this.$router.push(`/pessoas/checkin-checkout/${pessoa.cpf}`);
		},
		async savePessoa() {},
		efetuarCheckinCheckout(pessoa) {
			this.$router.push(`/checkin-checkout/${pessoa.cpf}`);
		},
		async findAllPessoas() {
			this.isLoadingPessoas = true;
			try {
				const pessoas = await (await PessoaService.findAll()).data;
				this.pessoas = pessoas;

				await this.getCheckinCheckout();

				this.isLoadingPessoas = false;
			} catch (e) {
				this.findAllPessoas();
			}
		},
		async getCheckinCheckout() {
			const pessoas = this.pessoas.map(async pessoa => {
				const idPessoa = pessoa.id;
				let pessoaWithCheckinCheckout;
				try {
					const checkinCheckout = (
						await CheckinCheckoutService.findByIdPessoa({
							idPessoa
						})
					).data;
					pessoaWithCheckinCheckout = {
						...pessoa,
						...checkinCheckout
					};
				} catch (e) {
					pessoaWithCheckinCheckout = { ...pessoa };
				}

				return pessoaWithCheckinCheckout;
			});
			Promise.all(pessoas).then(pessoasWithCheckinCheckout => {
				this.pessoas = pessoasWithCheckinCheckout;
			});
		}
	},
	mounted() {
		this.findAllPessoas();
	},
	data: () => ({
		isLoadingPessoas: false,
		pessoas: [],
		columns: [
			{
				name: "id",
				label: "id",
				field: data => data.id,
				sortable: true,
				required: false
			},
			{
				name: "cpf",
				label: "cpf",
				field: data => data.cpf,
				sortable: true,
				required: true
			},
			{
				name: "nome",
				label: "Nome",
				field: data => data.nome,
				sortable: true,
				required: true
			},
			{
				name: "checkin",
				label: "Checkin",
				field: data => data.checkin,
				sortable: true,
				required: true
			},
			{
				name: "checkout",
				label: "Checkout",
				field: data => data.checkout,
				sortable: true,
				required: true
			}
		]
	})
};
</script>
