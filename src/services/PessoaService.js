import api from "../api/index";

const findAll = async () => {
	return await api.get("pessoaFisicas");
};
const findByCpf = async ({ cpf }) => {
	return await api.get(`pessoaFisicas/${cpf}`);
};
const deleteById = async ({ id }) => {
	return await api.delete(`pessoaFisicas/${id}`);
};
const save = async ({
	cpf,
	dataEmissaoRg,
	dataNascimento,
	email,
	estadoCivil,
	genero,
	nome,
	orgaoEmissor,
	rg
}) => {
	const pessoa = {
		cpf,
		dataEmissaoRg,
		dataNascimento,
		email,
		estadoCivil,
		genero,
		nome,
		orgaoEmissor,
		rg
	};
	return await api.post("pessoaFisicas", pessoa);
};

const update = async ({
	id,
	cpf,
	dataEmissaoRg,
	dataNascimento,
	email,
	estadoCivil,
	genero,
	nome,
	orgaoEmissor,
	rg
}) => {
	const pessoa = {
		id,
		cpf,
		dataEmissaoRg,
		dataNascimento,
		email,
		estadoCivil,
		genero,
		nome,
		orgaoEmissor,
		rg
	};
	return await api.put("pessoaFisicas", pessoa);
};

export { findAll, findByCpf, deleteById, save, update };
