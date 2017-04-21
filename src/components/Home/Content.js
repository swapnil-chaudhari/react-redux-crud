import React, { Component } from 'react';

class Content extends Component {

  render() {
    return (
      <div id="page-wrapper">
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-12">
                      <h1 className="page-header">
                          Dashboard <small>Statistics Overview</small>
                      </h1>
                      <ol className="breadcrumb">
                          <li className="active">
                              <i className="fa fa-dashboard"></i> Dashboard
                          </li>
                      </ol>
                  </div>
              </div>
          </div>
      </div>     
    );
  }
}

export default Content;
