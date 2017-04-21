import React, { Component } from 'react'
import Header from './../layouts/Header'
import Content from './Content'

class Home extends Component {
    render() {
        return (
          <div id="wrapper">
            <Header />
            <Content />
          </div>
        );
    }
}


export default Home;