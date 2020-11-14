import api from "../api/index";

const findByIdPessoa = async ({ idPessoa }) => {
	return await api.get(`checkin-checkout/${idPessoa}`);
};
const save = async ({ checkin, checkout, idPessoa }) => {
	const checkinCheckout = { checkin, checkout, idPessoa };
	return await api.post(`checkin-checkout`, checkinCheckout);
};
const deleteByCpfPessoa = async ({ cpfPessoa }) => {
	return await api.delete(`checkin-checkout/${cpfPessoa}`);
};

export { findByIdPessoa, save, deleteByCpfPessoa };
