import api from "../api/index";

const findAllBySiglaEstado = async ({ siglaEstado }) => {
	return await api.get(`cidades/${siglaEstado}`);
};

export { findAllBySiglaEstado };
