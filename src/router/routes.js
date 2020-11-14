const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [{ path: "", component: () => import("pages/Index.vue") }]
	},

	{
		path: "/pessoas",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{ path: "", component: () => import("pages/Pessoas.vue") },
			{
				path: "cadastrar",
				component: () => import("pages/CadastrarPessoa.vue")
			},
			{
				path: "gerenciar/:cpf",
				component: () => import("pages/GerenciarPessoa.vue")
			},
			{
				path: "checkin-checkout/:cpf",
				component: () => import("pages/GerenciarCheckin.vue")
			}
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "*",
		component: () => import("pages/Error404.vue")
	}
];

export default routes;
