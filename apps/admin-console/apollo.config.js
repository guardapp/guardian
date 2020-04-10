module.exports = {
	client: {
		service: {
			name: 'guardian',
			url: 'http://localhost:8080/graphql',
			// optional headers
			headers: {
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInNjb3BlcyI6WyJBRE1JTiJdLCJpYXQiOjE1ODY0NDM4MDYsImV4cCI6MzE3Mjg5MTIxMiwiaXNzIjoiZ3VhcmRpYW5AdXNlciIsInN1YiI6IkNlbGVzdGluZThAeWFob28uY29tIn0.y1djHxXgzzwA_Bmxyg0JfN9nADqxMXR4WPfGbtIFu0k',
			},
			// optional disable SSL validation check
			skipSSLValidation: true,
		},
	},
};
