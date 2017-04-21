import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editedPost:{},
        }
        console.log(props);
    }

    hideModal() {
      this.props.onHideModal(this.props.isOpen);
    }

    updatePost(e) {
        this.setState({newPost:{
            title : this.refs.title.value,
            description : this.refs.description.value,
            category : this.refs.category.value,
        }}, function (){
            this.props.updatePost(this.state.newPost, this.props.post.id);
        });
    }

    render() {
        let categoriesOptions = this.props.categories.map(category => {
        let selected = '';
            if (category.id === this.props.post.categoryId) {
                selected = 'selected';
            }

            return <option selected={selected} key={category.id} value={category.id}> {category.name} </option>
        });

        return (
            <div className="container App">
            <Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal.bind(this)}>
                  <ModalHeader>
                    <ModalClose onClick={this.hideModal.bind(this)}/>
                    <ModalTitle>Edit Post</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                      <div className={this.props.errorClass}>
                          {this.props.message.addFail}
                      </div>
                      <form role="form">
                          <div className="form-group">
                              <label>Title</label>
                              <input ref="title" defaultValue={this.props.post.title} className="form-control" />
                          </div>

                          <div className="form-group">
                              <label>Description</label>
                              <textarea ref="description" defaultValue={this.props.post.description}  className="form-control" rows="3"></textarea>
                          </div>

                          <div className="form-group">
                              <label>Category</label>
                              <select ref="category" className="form-control">
                                  <option value=''>SELECT</option>
                                  {categoriesOptions}
                              </select>
                          </div>
                      </form>
                  </ModalBody>
                  <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal.bind(this)}>
                      Close
                    </button>
                    <input type='button' onClick={this.updatePost.bind(this)} className='btn btn-primary' value='Update' />
                  </ModalFooter>
                </Modal>
              </div>
        );
    }
}

export default EditPost;
