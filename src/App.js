import React, {Component} from 'react';
import {connect} from 'react-redux'
import {HashRouter, Route} from 'react-router-dom'
import { thunkLoadEmployees } from './store'
import Home from './Home'


class App extends Component{
    constructor(){
        super()
    }
    componentDidMount(){ this.props.loadEm() }

    render(){
        return (
            <HashRouter>
                <Route path='/employees' component={Home}/>
            </HashRouter>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadEm : () => {
            dispatch(thunkLoadEmployees())
        }
    }
}

export default connect(null, mapDispatchToProps)(App)