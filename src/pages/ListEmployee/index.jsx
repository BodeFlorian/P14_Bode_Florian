import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmployees } from '../../redux/EmployeeSlice'
import EmployeeTable from './../../components/EmployeeTable'

const ListEmployee = () => {
  const employees = useSelector(selectEmployees)

  return (
    <div id="employee-div">
      <h1>Current Employees</h1>
      <EmployeeTable employees={employees} />
      <Link to="/">Home</Link>
    </div>
  )
}

export default ListEmployee
