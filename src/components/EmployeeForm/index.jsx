import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AddressForm } from './../AddressForm'
import { ModalComponent } from './../ModalComponent'
import Dropdown from './../Dropdown'

const formatDate = (date) => {
  if (!date) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const EmployeeForm = ({ states, saveEmployee }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [department, setDepartment] = useState('Sales')
  const [modalVisible, setModalVisible] = useState(false)

  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Legal',
  ]

  const handleSaveEmployee = () => {
    const employeeData = {
      firstName,
      lastName,
      dateOfBirth: formatDate(dateOfBirth),
      startDate: formatDate(startDate),
      street,
      city,
      state,
      zipCode,
      department,
    }

    saveEmployee(employeeData)
    setModalVisible(true)
    setTimeout(() => setModalVisible(false), 3000)
  }

  return (
    <>
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="jj/mm/aaaa"
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="jj/mm/aaaa"
        />

        <AddressForm
          street={street}
          city={city}
          state={state}
          zipCode={zipCode}
          setStreet={setStreet}
          setCity={setCity}
          setState={setState}
          setZipCode={setZipCode}
          states={states}
        />

        <label htmlFor="department">Department</label>
        <Dropdown
          options={departments}
          onSelect={setDepartment}
          defaultValue={department}
        />
      </form>

      <button type="button" onClick={handleSaveEmployee}>
        Save
      </button>

      {modalVisible && (
        <ModalComponent
          message="Employee Created!"
          onClose={() => setModalVisible(false)}
        />
      )}
    </>
  )
}

export default EmployeeForm
