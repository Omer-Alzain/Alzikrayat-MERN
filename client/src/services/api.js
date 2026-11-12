const request = async (url, options = {}) => {
    const isFormData = options.body instanceof FormData;
    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...options.headers
        }
    });

    const data = response.status === 204 ? null : await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(data.message || 'The request could not be completed.');
        error.status = response.status;
        error.errors = data.errors || [];
        throw error;
    }

    return data;
};

const api = {
    get: (url) => request(url),
    post: (url, body) => request(url, {
        method: 'POST',
        body: body instanceof FormData ? body : JSON.stringify(body)
    }),
    delete: (url) => request(url, { method: 'DELETE' })
};

export default api;
