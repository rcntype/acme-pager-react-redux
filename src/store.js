import { createStore, applyMiddleware } from 'redux'
import thunks from 'redux-thunk'
import axios from 'axios'



const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES'
const LOAD_PAGES = 'LOAD_PAGES'


const actionLoadEmployees = employees => ({type: LOAD_EMPLOYEES, employees})
const actionLoadEmployeesPage = employees => ({type: LOAD_PAGES, employees})

const thunkLoadEmployees = () => async (dispatch) => {
    
    const employees = (await axios.get('/api/employees')).data
    dispatch(actionLoadEmployees(employees))
}

const thunkLoadEmployeesPage = (page) => async (dispatch) => {
    
    const employeesPage = (await axios.get(`/api/employees/${page}`)).data
    dispatch(actionLoadEmployeesPage(employeesPage))
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_EMPLOYEES : return action.employees
        case LOAD_PAGES : return action.employees
        default : return state
    }
}

const store = createStore( reducer, applyMiddleware(thunks))

export default store

export {
    thunkLoadEmployees,
    thunkLoadEmployeesPage
}