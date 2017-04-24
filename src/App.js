import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router'
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
                </Router>
            </Provider>
        );
    }
}

export default App;
