import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
          newPost : {},
          editPost:{},
        }
        console.log(this.props.message);
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
        let categoriesOptions = this.props.categories.map(category => {
            return <option key={category.id} value={category.id}> {category.name} </option>
        });

          return (
              <div className="container App">
              <Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal.bind(this)}>
                    <ModalHeader>
                      <ModalClose onClick={this.hideModal.bind(this)}/>
                      <ModalTitle>Add Post</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className={this.props.errorClass}>
                            {this.props.message.addFail}
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
