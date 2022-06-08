const api = (data, method) => {
    return fetch('http://localhost:5000/api/v1/auth/login', {
        method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
}

export default api;