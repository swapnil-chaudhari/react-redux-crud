import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';


class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
          newPost : {},
          editPost:{},
        }
    }

    hideModal() {
      this.props.onHideModal(this.props.isOpen);
    }

    savePost(e) {
        this.setState({newPost:{
            title : this.refs.title.value,
            description : this.refs.description.value,
            category : this.refs.category.value,
        }}, function (){
            this.props.savePost(this.state.newPost);
        });
    }

    render() {
        let categoriesOptions = '';
        if (typeof this.props.categories === 'undefined') {}
        else {
            categoriesOptions = this.props.categories.map(category => {
                return <option key={category.id} value={category.id}> {category.name} </option>
            });
        }
        let errors =''
        if (typeof this.props.message.fail === 'undefined') {}
        else {
            errors = Object.keys(this.props.message.fail).map((k, idx) => {
                return (
                    <li key={idx}>{this.props.message.fail[k]}</li>
                );
            });
        }
          return (
              <div className="container App">
              <Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal.bind(this)}>
                    <ModalHeader>
                      <ModalClose onClick={this.hideModal.bind(this)}/>
                      <ModalTitle>Add Post</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className={this.props.errorClass}>
                            {errors}
                        </div>
                        <form role="form">
                            <div className="form-group">
                                <label>Title</label>
                                <input ref="title" key={new Date().getTime()} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea ref="description" key={new Date().getTime()} className="form-control" rows="3"></textarea>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select ref="category" key={new Date().getTime()} className="form-control">
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
                      <input type='button' onClick={this.savePost.bind(this)} className='btn btn-primary' value='Save' />
                    </ModalFooter>
                  </Modal>
                </div>

        );
    }
}

export default AddPost;
