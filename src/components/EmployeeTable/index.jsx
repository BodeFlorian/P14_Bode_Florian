import React, { useState } from 'react'
import './index.scss'

const EmployeeTable = ({ employees }) => {
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(newSortOrder)
  }

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)
  const indexOfLastEmployee = currentPage * rowsPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  )

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="employee-table-container">
      <div className="employee-table-controls">
        <label className="employee-table-rows">
          Show
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          entries
        </label>
        <label className="employee-table-search">
          Search:
          <input
            type="search"
            aria-controls="employee-table"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>

      <table id="employee-table" className="employee-table">
        <thead className="employee-table-header">
          <tr role="row">
            {[
              'firstName',
              'lastName',
              'startDate',
              'department',
              'dateOfBirth',
              'street',
              'city',
              'state',
              'zipCode',
            ].map((field) => (
              <th
                key={field}
                onClick={() => handleSort(field)}
                className={`sorting ${sortField === field ? (sortOrder === 'asc' ? 'sorting__asc' : 'sorting__desc') : ''}`}
              >
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, ' $1')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="employee-table-body">
          {currentEmployees.map((employee, index) => (
            <tr key={index} className="employee-table-row">
              <td className="employee-table-cell">{employee.firstName}</td>
              <td className="employee-table-cell">{employee.lastName}</td>
              <td className="employee-table-cell">{employee.startDate}</td>
              <td className="employee-table-cell">{employee.department}</td>
              <td className="employee-table-cell">{employee.dateOfBirth}</td>
              <td className="employee-table-cell">{employee.street}</td>
              <td className="employee-table-cell">{employee.city}</td>
              <td className="employee-table-cell">{employee.state}</td>
              <td className="employee-table-cell">{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="employee-table-footer">
        <p className="employee-table-total">
          Total Employees: {filteredEmployees.length}
        </p>
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">{currentPage}</span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeTable
