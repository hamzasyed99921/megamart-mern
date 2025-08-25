import axios from "axios";  

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    // withCredentials: true,
    headers:{
        "Content-Type": 'application/json'
    }
})

export const signup = async(data) => {
    let response;

    try {
        response =  await api.post('/register', data)
    } catch (error) {
        return error
    }

    return response
    
}


export const login = async(data) => {
    let response;

    try {
        response =  await api.post('/login', data)
    } catch (error) {
        return error
    }

    return response
    
}

export const logout = async() => {
    let response;

    try {
        response =  await api.post('/logout')
    } catch (error) {
        return error
    }

    return response
    
}

// Contact Api
export const contact = async(data) => {
    let response;

    try {
        response =  await api.post('/contact', data)
    } catch (error) {
        return error
    }

    return response
    
}

// Product API

export const createProducts = async(data) => {
    let response;

    try {
        response = await api.post('/product', data, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 second timeout
        });
        
        return response;
    } catch (error) {
        console.error('Error in createProducts:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        return error;
    }
}

export const getProducts = async() => {
    let response;

    try {
        response =  await api('/product/all')
    } catch (error) {
        return error
    }

    return response
    
}
export const getProductsById = async(id) => {
    let response;
    try {
        response =  await api(`/product/${id}`)
    } catch (error) {
        return error
    }

    return response
    
}

export const deleteProduct = async(id) => {
    let response;
    try {
        response =  await api.delete(`/product/${id}`)
    } catch (error) {
        return error
    }

    return response
    
}

export const updateProduct = async(id, data) => {
    let response;
    try {
        response =  await api.put(`/product/${id}`, data)
    } catch (error) {
        return error
    }

    return response
    
}

export const placeOrder = async(data) => {
    let response;

    try {
        response = await api.post('/order', data)
    } catch (error) {
        return error
    }

    return response
}

// Orders API
export const getOrders = async () => {
    let response;
    try {
        response = await api('/order/all');
    } catch (error) {
        return error;
    }
    return response;
};

export const approveOrder = async (id) => {
    let response;
    try {
        response = await api.put(`/order/${id}/approve`);
        console.log(response)
    } catch (error) {
        console.log(error)
        return error;
    }
    return response;
};


