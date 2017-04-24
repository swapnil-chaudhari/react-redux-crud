import React, { Component } from 'react';

class SideBar extends Component {

  render() {
    return (
      <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav side-nav">
              <li className="active">
                  <a href="index.html"><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
              </li>
              <li>
                  <a href="#posts"><i className="fa fa-fw fa-table"></i> Posts</a>
              </li>

          </ul>
      </div>
    );
  }
}

export default SideBar;
