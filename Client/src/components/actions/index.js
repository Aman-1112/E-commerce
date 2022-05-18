import axios from 'axios';

export const fetchAllProducts = () => {
    return (
        async (dispatch, _getState) => {
            const res = await axios.get('/api/v1/product/List');
            // console.log(res.data.data);
            const data = res.data.data;
            dispatch({ type: 'FETCH_PRODUCTS', payload: data })
        }
    )
}

export const fetchSearchedProducts = (searchItem) => {
    return (
        async (dispatch, _getState) => {
            const res = await axios.get(`/api/v1/product/search/${searchItem}`);
            // console.log(res.data.productList);
            dispatch({ type: 'FETCH_SEARCHED_PRODUCTS', payload: res.data.productList })
        }
    )
}

export const fetchProduct = (productId) => {
    return (
        async (dispatch, _getState) => {
            const res = await axios.get(`/api/v1/product/${productId}`);
            //console.log(res.data.data);
            dispatch({ type: 'FETCH_PRODUCT', payload: res.data.data })
        }
    )
}