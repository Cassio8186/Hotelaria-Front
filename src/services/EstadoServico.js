import api from "../api/index";

const findAllEstados = async () => {
	return await api.get(`estados`);
};

export { findAllEstados };
