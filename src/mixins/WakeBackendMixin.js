import api from "../api";
import loadingMessages from "../assets/loadingMessages.json";

/**
 *
 * @param {Array<String>} messages
 */
const generateRandomLoadingMessage = messages => {
	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	const randomMessage = messages[getRandomInt(0, messages.length - 1)];
	return randomMessage;
};

const mixin = {
	methods: {
		pingBackend: async () => {
			const response = await api.get("/ping");

			const isBackendAwaken = response.status == 204;
			return isBackendAwaken;
		},
		showLoading() {
			this.$q.loading.show({
				message: generateRandomLoadingMessage(loadingMessages)
			});
		},

		hideLoading() {
			this.$q.loading.hide();
		}
	},
	computed: {
		showWakingMessage() {
			return this.isBackendConnected == false;
		}
	},

	async mounted() {
		this.showLoading();
		let response = false;
		while (response == false) {
			try {
				response = await this.pingBackend();
			} catch (e) {
				console.log("Backend not connected");
			}
		}
		this.isBackendConnected = true;
		this.hideLoading();
	}
};

export default mixin;
