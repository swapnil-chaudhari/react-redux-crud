import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Blog from './components/Blog/Blog'
import Post from './components/Post/Post'
import { Provider } from 'react-redux'
import store from "./store"



class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path='/' component={Post} />
                    <Route path='/posts' component={Post} />
                    <Route path='/blogs' component={Blog} />
                </Router>
            </Provider>
        );
    }
}

export default App;
