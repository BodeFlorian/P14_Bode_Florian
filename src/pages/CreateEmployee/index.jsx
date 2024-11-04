import React from 'react'
import { Link } from 'react-router-dom'
import EmployeeForm from './../../components/EmployeeForm'
import { states } from './../../utils/data/states'
import { useDispatch } from 'react-redux'
import { addEmployee } from './../../redux/EmployeeSlice'

const CreateEmployee = () => {
  const dispatch = useDispatch()

  const saveEmployee = (employee) => {
    dispatch(addEmployee(employee))
  }

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/list">View Current Employees</Link>
        <EmployeeForm states={states} saveEmployee={saveEmployee} />
      </div>
    </>
  )
}

export default CreateEmployee
