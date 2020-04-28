import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { thunkLoadEmployeesPage } from './store'


const Home = ({rows, count, newPage}) => {

  
    if(!count){
        return <span>Still Loading...</span>
    } else {
        const abc = Math.ceil(count/50)
        const pagers = (new Array(abc).fill('')).map((item, idx) => {
            return {
                number: idx + 1,
                idx
            }
        })
        const loadPage = (page) => {
            console.log(page)
            newPage(page)
        }
        return (
            <div>
                <h1>ACME Pager</h1>
                <table className='bigContainer'>
                    <thead className='table-head'>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Title</th>

                        </tr>
                    </thead>
                    <tbody className='table-body'>{
                        rows.map(employee => {
                            return(
                                <tr key={employee.id}>
                                    <td >{employee.firstName}</td>
                                    <td >{employee.lastName}</td>
                                    <td >{employee.email}</td>
                                    <td >{employee.title}</td> 
                                </tr>
                            )
                        })
                    }</tbody>
                </table>
                <ul className='pageLinks'>{
                    pagers.map(page => {
                        return (
                            <Link to={`/employees/${page.idx}`} key={page.number} onClick={(ev => loadPage(page.idx))}>{page.number}</Link>
                        )
                    })
                }</ul>
                
            </div>
        ) 
    }

}

const mapStateToProps = ({rows, count}) => ({rows, count})

const mapDispatchToProps = (dispatch) => {
    return {
        newPage: (page) => dispatch(thunkLoadEmployeesPage(page))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)