import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {

    deletePost(id){
        this.props.onDelete(id);
    }

    editPost(id){
        this.props.onEdit(id);
    }

    render() {
        let postList;
            if (this.props.posts) {
                postList = this.props.posts.map(post => {
                    return <Post onDelete={this.deletePost.bind(this)} onEdit={this.editPost.bind(this)} key={post.id} post={post} />
                })
            }

            return (
               <div className="posts">
               <table className="table table-bordered table-hover">
                   <thead>
                       <tr>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Description</th>
                           <th>Category</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                        {postList}
                   </tbody>
               </table>
              </div>
        );
    }
}

export default Posts;
