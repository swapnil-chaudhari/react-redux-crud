import React, { Component } from 'react'
import  fetchPosts, { editPost, updatePost, deletePost, fetchCategories, savePost, openModal, hideModal } from "./../../actions/postActions"
import store from "./../../store"
import { connect } from "react-redux"
import Posts from './Posts'
import AddPost from './AddPost';
import EditPost from './EditPost';

class Content extends Component {
    componentWillMount() {
        store.dispatch((dispatch) => {
            dispatch(fetchPosts());
            dispatch(fetchCategories());
        })
    }

    savePost(post) {
        store.dispatch(savePost(post));
        // store.dispatch(fetchPosts());
    }

    openModal() {
        store.dispatch(openModal());
    }

    hideModal(isOpen) {
        store.dispatch(hideModal());
    }

    deletePost(id) {
        store.dispatch(deletePost(id));
    }

    editPost(id) {
        store.dispatch(editPost(id));
    }

    updatePost(post, id) {
        store.dispatch(updatePost(post, id));
        store.dispatch(fetchPosts());
    }

    render() {
        console.log('fetch data : ', this.props);
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Posts <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Posts
                                </li>
                            </ol>
                            <div className="row">
                                { typeof this.props.message !== 'undefined'  ?
                                    <span className="crud-message-success">{this.props.message.success.results}</span>
                                : null }
                                <button
                                    type="button"
                                    onClick={this.openModal.bind(this)}
                                    className="btn btn-primary"
                                    style={{margin:10 + 'px', float:'right'}}>ADD POST
                                </button>

                                { this.props.modalAction === 'ADD' ?
                                    <AddPost
                                        categories={this.props.categories}
                                        message={this.props.message}
                                        errorClass={this.props.errorClass}
                                        isOpen={this.props.isOpen}
                                        savePost={this.savePost.bind(this)}
                                        onHideModal={this.hideModal.bind(this)}
                                    /> : null
                                }

                                { this.props.modalAction === 'EDIT' ?
          		                        <EditPost
                                            categories={this.props.categories}
                                            message={this.props.message}
                                            errorClass={this.props.errorClass}
                                            isOpen={this.props.isOpen}
                                            updatePost={this.updatePost.bind(this)}
                                            onHideModal={this.hideModal.bind(this)}
                                            post={this.props.editPost}
                                        /> : null
                                }

                                <Posts
                                    posts={this.props.posts}
                                    onDelete={this.deletePost.bind(this)}
                                    onEdit={this.editPost.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    posts : store.posts.posts,
    categories : store.posts.categories,
    editPost : store.posts.editPost,
    modalAction : store.posts.modalAction,
    isOpen : store.posts.isOpen,
    message :store.posts.message,
    errorClass : store.posts.errorClass,
  };
}

export default connect(mapStateToProps)(Content);

// import { connect } from "react-redux"
// import { bindActionCreators } from 'redux'
// const  mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(fetchPosts,dispatch)
// }
//
// export default connect(null, mapDispatchToProps)(Content);
