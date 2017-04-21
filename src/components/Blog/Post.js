import React, { Component } from 'react';

class Post extends Component {

    deletePost(id) {
        this.props.onDelete(id);
    }

    editPost(id) {
        this.props.onEdit(id);
    }
    render() {

            return (
              <tr>
                  <td>{this.props.post.id}</td>
                  <td>{this.props.post.title}</td>
                  <td>{this.props.post.description}</td>
                  <td>{this.props.post.name}</td>
                  <td>
                    <a href="#" className="btn btn-warning" onClick={this.editPost.bind(this, this.props.post.id)} style={{margin : 2 + 'px'}}>EDIT</a>
                    <a href="#" className="btn btn-danger" onClick={this.deletePost.bind(this, this.props.post.id)} style={{margin : 2 + 'px'}}>DELETE</a>
                  </td>
              </tr>

        );
    }
}

export default Post;
