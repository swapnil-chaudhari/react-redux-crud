import axios from "axios";
import { hashHistory } from 'react-router'

export const FETCH_ERROR = 'FETCH_ERROR'
export const fetchError = () => {
    console.log('fetchErrors actions')
    return {
        type: FETCH_ERROR,
        payload:[],
    }
}

export const FETCH_COMPLETED = 'FETCH_COMPLETED'
export const fetchCompleted = () => {
    console.log('fetchCompleted actions')
    return {
        type: FETCH_COMPLETED,
    }
}

export const FETCH_POSTS = 'FETCH_POSTS'
function fetchPosts() {
    console.log('fetchPosts actions')
    return function(dispatch) {
        dispatch({type: "FETCH_POSTS", payload: []})
        let endpoint = 'http://192.168.1.127/react/react-demo-app/blog.php';

        axios.get(endpoint)
        .then((response) => {
            dispatch({type: FETCH_COMPLETED, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_ERROR, payload: err})
        })
    }
}
export default fetchPosts;

export const SAVE_POST = 'SAVE_POST'
export function savePost(post){
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch) {
        axios.post('http://192.168.1.127/react/react-demo-app/blog.php', post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: 'SAVE_POST_ERROR', payload: response.data.error})
            else {
                dispatch({type: SAVE_POST, payload: response.data})
                dispatch(fetchPosts());
            }

        })

    }
}

export const EDIT_POST = 'EDIT_POST'
export function editPost(id) {
    console.log('EDIT_POST actions')
    return function(dispatch) {
        dispatch({type: EDIT_POST, payload: id})
    }
}

export const UPDATE_POST = 'UPDATE_POST'
export function updatePost(post, id) {
    console.log('UPDATE_POST actions')
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch) {
        axios.put('http://192.168.1.127/react/react-demo-app/blog.php?id='+id, post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: 'UPDATE_POST_ERROR', payload: response.data.error})
            else {
                dispatch({type: UPDATE_POST, payload: response.data})
            }

        })
    }
}

export const DELETE_POST = 'DELETE_POST'
export function deletePost(id) {
    console.log('DELETE_POST actions')
    console.log(id);
    return function(dispatch) {
        dispatch({type: DELETE_POST})
        let endpoint = 'http://localhost/react/react-demo-app/blog.php?id='+id;

        axios.delete(endpoint)
        .then((response) => {
            dispatch({type: 'DELETE_COMPLETED'})
            dispatch(fetchPosts())
            hashHistory.push('/posts');
        })
        .catch((err) => {
            dispatch({type: "CANT_FETCH ", payload: err})
        })
    }
}

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export function fetchCategories() {
    console.log('fetchCategories actions')
    return function(dispatch) {
        dispatch({type: "FETCH_CATEGORIES", payload: []})
        let endpoint = 'http://192.168.1.127/react/react-demo-app/category.php';

        axios.get(endpoint)
        .then((response) => {
            console.log('response' , response.data);
            dispatch({type: 'FETCH_CATEGORIES_COMPLETED', payload: response.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_ERROR, payload: err})
        })
    }
}

export const OPEN_MODAL = 'OPEN_MODAL'
export function openModal() {
    return function(dispatch){
        dispatch({ type:OPEN_MODAL });
    }
}

export const HIDE_MODAL = 'HIDE_MODAL'
export function hideModal() {
    return function(dispatch){
        dispatch({ type:HIDE_MODAL });
    }
}
