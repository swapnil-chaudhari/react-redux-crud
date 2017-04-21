import React, { Component } from 'react';
import Posts from './Posts';
import AddPost from './AddPost';
import EditPost from './EditPost';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:{
                success:'',
                addFail:'',
            },
            posts : [],
            categories : [],
            editPostData:[],
            isOpen : false,
            showAddPost:false,
            isEditMode : false,
            isValidResult:false,
            errorClass:'',
        }
    }

    componentWillMount(){
        this.getPosts();
        this.getCategories();
    }

    getPosts(){
        let endpoint = 'http://192.168.1.127/react/react-demo-app/blog.php';
        fetch(endpoint)
        .then((response) => { return response.json(); })
        .then((results) => {
            this.setState({posts:results});
        });
    }

    getCategories(){
        let endpoint = 'http://192.168.1.127/react/react-demo-app/category.php';
        fetch(endpoint)
        .then((response) => { return response.json(); })
        .then((results) => {
            this.setState({categories:results});
        });
    }

    savePost(post) {
        let endpoint = 'http://192.168.1.127/react/react-demo-app/blog.php';
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
           body: JSON.stringify({
               title: post.title,
               description: post.description,
               category: post.category,
           })
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            if (response.results) {
                this.setState({ message : {success: response.results }});
                this.setState({ isValidResult: true });
                this.setState({ isOpen: false });
                this.getPosts();
            } else {
                var errors = Object.keys(response.error).map((k, idx) => {
               return (
                 <li key={idx}>{response.error[k]}</li>
               );
            });
            this.setState({ errorClass: 'alert alert-danger' });
            this.setState({ message : {addFail: errors }});
            this.getPosts();
            }
        }.bind(this));
    }

    editPost(id){
        let posts = this.state.posts;
        let index = posts.findIndex(x => x.id === id);
        this.setState({editPostData:posts[index]});
        this.setState({isEditMode: true});
        this.setState({isOpen: true});
        this.setState({message : ''});
        this.setState({ errorClass: '' });
    }

    updatePost(post,id) {
        let endpoint = 'http://192.168.1.127/react/react-demo-app/blog.php?id='+id;
        fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                title: post.title,
                description: post.description,
                category: post.category,
            })
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            if (response.results) {
                this.setState({ isValidResult: true });
                this.setState({ message : {success: 'Post updated successfully.' }});
                this.getPosts();
                this.setState({isEditMode: false});
            } else {
                   var errors = Object.keys(response.error).map((k, idx) => {
                   return (
                     <li key={idx}>{response.error[k]}</li>
                   );
                });
                this.setState({ errorClass: 'alert alert-danger' });
                this.setState({ message : {addFail: errors }});
                this.getPosts();
                this.setState({isEditMode: true});
            }
        }.bind(this));

        this.setState({showAddPost:false});

    }

    deletePost(id){
        let endpoint = 'http://localhost/react/react-demo-app/blog.php?id='+id;
        fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.text();
        }).then(function(response,e){
            if (response) {
                this.setState({ message : {success: 'Post deleted successfully.' }});
                this.setState({ isValidResult: true });
                this.getPosts();
            } else {
                this.setState({ message: 'Sorry! Something went wrong.' });
            }
        }.bind(this));
    }

    openModal() {
      this.setState({message : ''});
      this.setState({ errorClass: '' });
      this.setState({ isOpen: true });
      this.setState({ showAddPost: true });
      this.setState({isEditMode: false});
    }

    hideModal(isOpen) {
      if (isOpen) {
          this.setState({ isOpen: false });
      }
    }


    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Blogs <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Blogs
                                </li>
                            </ol>
                            <div className="row">
                                { this.state.isValidResult === true ?
                                    <span className="crud-message-success">{this.state.message.success}</span>
                                : null }
                                <button
                                    type="button"
                                    onClick={this.openModal.bind(this)}
                                    className="btn btn-primary"
                                    style={{margin:10 + 'px', float:'right'}}>ADD POST
                                </button>

                                { this.state.showAddPost === true ?
          		                        <AddPost
                                            categories={this.state.categories}
                                            message={this.state.message}
                                            errorClass={this.state.errorClass}
                                            isOpen={this.state.isOpen}
                                            savePost={this.savePost.bind(this)}
                                            onHideModal={this.hideModal.bind(this)} /> : null
                                }
                                { this.state.isEditMode === true ?
          		                        <EditPost
                                            categories={this.state.categories}
                                            message={this.state.message}
                                            errorClass={this.state.errorClass}
                                            isOpen={this.state.isOpen}
                                            updatePost={this.updatePost.bind(this)}
                                            onHideModal={this.hideModal.bind(this)}
                                            post={this.state.editPostData} /> : null
                                }

                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <Posts
                                            posts={this.state.posts}
                                            onDelete={this.deletePost.bind(this)}
                                            onEdit={this.editPost.bind(this)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
