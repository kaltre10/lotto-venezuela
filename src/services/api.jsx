const api = (url, data, method) => {
    return fetch(url, {
        method,
        mode: "cors",
        headers: {
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify(data)
    });
}

export default api;