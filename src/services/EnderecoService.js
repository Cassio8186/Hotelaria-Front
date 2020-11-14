import api from "../api/index";

const save = async ({ bairro, cep, idCidade, idPessoa, logradouro }) => {
	const endereco = { bairro, cep, idCidade, idPessoa, logradouro };
	return await api.post("enderecos", endereco);
};
const findAllById = async ({ idPessoa }) => {
	return await api.get(`enderecos/${idPessoa}`);
};
const deleteById = async ({ id }) => {
	return await api.delete(`enderecos/${id}`);
};

export { save, findAllById, deleteById };
