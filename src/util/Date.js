export default {
	convertToBackendDate(date) {
		const splitDate = date.split("/");
		const day = splitDate[0];
		const month = splitDate[1];
		const year = splitDate[2];

		return `${year}-${month}-${day}`;
	},
	convertFromBackendDate(date) {
		const splitDate = date.split("-");

		const day = splitDate[2];
		const month = splitDate[1];
		const year = splitDate[0];
		const formatedDate = `${day}/${month}/${year}`;

		return formatedDate;
	}
};
