import axios from "axios";
import { hashHistory } from 'react-router'
import  *  as type   from './actionTypes'

export const postApi     = "http://192.168.1.127/react/react-demo-app/blog.php";
export const categoryApi = "http://192.168.1.127/react/react-demo-app/category.php";

export const fetchError = () => {
    console.log('fetchErrors actions')
    return {
        type: type.FETCH_ERROR,
        payload:[],
    }
}

export const fetchCompleted = () => {
    console.log('fetchCompleted actions')
    return {
        type: type.FETCH_COMPLETED,
    }
}

function fetchPosts() {
    console.log('fetchPosts actions')
    return function(dispatch) {
        dispatch({type: type.FETCH_POSTS, payload: []})

        axios.get(postApi)
        .then((response) => {
            dispatch({type: type.FETCH_COMPLETED, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: type.FETCH_ERROR, payload: err})
        })
    }
}
export default fetchPosts;

export function savePost(post){
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch, getState) {
        axios.post(postApi, post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: type.SAVE_POST_ERROR, payload: response.data.error})
            else {
                console.log('before save', getState());
                dispatch({type: type.SAVE_POST, payload: response.data})
                dispatch(fetchPosts());
                dispatch(fetchCategories());
                console.log('after save', getState());
            }

        })

    }
}

export function editPost(id) {
    console.log('EDIT_POST actions')
    console.log(id);
    return function(dispatch) {
        dispatch({type: type.EDIT_POST, payload: id})
    }
}


export function updatePost(post, id) {
    console.log('UPDATE_POST actions')
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch) {
        axios.put(postApi + '?id='+id, post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: type.UPDATE_POST_ERROR, payload: response.data.error})
            else {
                dispatch({type: type.UPDATE_POST, payload: response.data})
                dispatch(fetchPosts());
                dispatch(fetchCategories());
            }
        })
    }
}

export function deletePost(id) {
    console.log('DELETE_POST actions')
    console.log(id);
    return function(dispatch) {
        dispatch({type: type.DELETE_POST})
        let endpoint = postApi + '?id='+id;

        axios.delete(endpoint)
        .then((response) => {
            dispatch({type: type.DELETE_COMPLETED})
            dispatch(fetchPosts());
            dispatch(fetchCategories());
            hashHistory.push('/posts');
        })
        .catch((err) => {
            dispatch({type: type.CANT_FETCH, payload: err})
        })
    }
}

export function fetchCategories() {
    console.log('fetchCategories actions')
    return function(dispatch) {
        dispatch({type: type.FETCH_CATEGORIES, payload: []})

        axios.get(categoryApi)
        .then((response) => {
            console.log('response' , response.data);
            dispatch({type: type.FETCH_CATEGORIES_COMPLETED, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: type.FETCH_ERROR, payload: err})
        })
    }
}

export function openModal() {
    return function(dispatch){
        dispatch({ type:type.OPEN_MODAL });
    }
}

export function hideModal() {
    return function(dispatch){
        dispatch({ type:type.HIDE_MODAL });
    }
}
