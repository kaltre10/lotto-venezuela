const api = (url, data, method) => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
}

export default api;