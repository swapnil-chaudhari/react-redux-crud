export default function reducer(state={
    posts    : [],
    categories   : [],
    addPost   : [],
    fetching : false,
    fetched  : false,
    deleting : false,
    deleted  : false,
    error    : null,
    message  : {
                    success : '',
                    fail    : '',
                },
    errorClass : '',
    isOpen : false,
    modalAction : '',
}, action) {
    switch (action.type) {
        case 'FETCH_POSTS': {
            return {...state }
        }
        case 'FETCH_ERROR': {
            return {...state, fetching:false, error:action.payload}
        }
        case 'CANT_FETCH': {
            return {...state, fetching:false, error:action.payload}
        }
        case 'FETCH_COMPLETED': {
            return {...state , fetching:false,fetched:true, message : { success:{ results : ''} }, posts:action.payload}
        }
        case 'DELETE_POST': {
            return {...state, deleteing:true}
        }
        case 'DELETE_COMPLETED': {
            return {...state, deleteing:false, deleted:true}
        }
        case 'FETCH_CATEGORIES': {
            return {...state , fetching:true}
        }
        case 'FETCH_CATEGORIES_COMPLETED': {
            return {...state , fetching:false,fetched:true, categories:action.payload}
        }
        case 'OPEN_MODAL': {
            return Object.assign({}, state, {
                        message : {success:'', fail: ''},
                        errorClass: '',
                        isOpen:true,
                        modalAction: 'ADD',
                      })
        }
        case 'HIDE_MODAL': {
            return Object.assign({}, state, {
                        isOpen:false,
                        modalAction: '',
                      })
        }
        case 'SAVE_POST': {
            return {...state , isOpen:false,modalAction:'', message : {success: action.payload, fail:''}}
        }
        case 'SAVE_POST_ERROR': {
            return {...state ,errorClass: 'alert alert-danger' , message : {success:'', fail: action.payload}}
        }
        case 'EDIT_POST': {
            console.log(state.posts);
            const index = state.posts.findIndex(x => x.id === action.payload);
            const editPost  = state.posts[index];
            return {...state , isOpen:true,modalAction:'EDIT', editPost : editPost, message : {success : '', fail : ''}, errorClass: ''}
        }
        case 'UPDATE_POST': {
            console.log('UPDATE_POST');
            return {...state , isOpen:false,modalAction:'', message : {success: action.payload}}
        }
        case 'UPDATE_POST_ERROR': {
            console.log('UPDATE_POST_ERROR');
            return {...state ,errorClass: 'alert alert-danger' , message : {success:'', fail: action.payload}}
        }
        default : {
            return state
        }
    }

}
