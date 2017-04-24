import axios from "axios";
import { hashHistory } from 'react-router'
import  *  as type   from './actionTypes'

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
        let endpoint = 'http://192.168.1.127/react/react-demo-app/blog.php';

        axios.get(endpoint)
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

    return function(dispatch) {
        axios.post('http://192.168.1.127/react/react-demo-app/blog.php', post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: type.SAVE_POST_ERROR, payload: response.data.error})
            else {
                dispatch({type: type.SAVE_POST, payload: response.data})
                dispatch(fetchPosts());
                dispatch(fetchCategories());
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
        axios.put('http://192.168.1.127/react/react-demo-app/blog.php?id='+id, post, headers)
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
        let endpoint = 'http://localhost/react/react-demo-app/blog.php?id='+id;

        axios.delete(endpoint)
        .then((response) => {
            dispatch({type: type.DELETE_COMPLETED})
            dispatch(fetchPosts())
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
        let endpoint = 'http://192.168.1.127/react/react-demo-app/category.php';

        axios.get(endpoint)
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
