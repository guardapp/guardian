module.exports = {
	client: {
		service: {
			name: 'guardian',
			url: 'http://192.168.1.161:8080/graphql',
			// optional headers
			headers: {
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTcsInNjb3BlcyI6WyJBRE1JTiJdLCJpYXQiOjE1ODU5NDg0MTgsImV4cCI6MzE3MTkwMDQzNiwiaXNzIjoiZ3VhcmRpYW5AdXNlciIsInN1YiI6IkpvcmR5bjM3QHlhaG9vLmNvbSJ9._0siJCaOgoG4huso-IQvdZN8dyrT0vrTA-jt-yau_28',
			},
			// optional disable SSL validation check
			skipSSLValidation: true,
		},
	},
};
