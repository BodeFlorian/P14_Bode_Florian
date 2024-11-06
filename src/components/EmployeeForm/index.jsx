import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AddressForm } from './../AddressForm'
import { ModalComponent } from './../ModalComponent'
import { formatDate } from './../../utils/dateUtils/formatDate'
import { departments } from '../../utils/data/departments'
import Dropdown from './../Dropdown'

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
          id="date-of-birth"
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="jj/mm/aaaa"
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          id="start-date"
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

        <Dropdown
          options={departments}
          onSelect={setDepartment}
          defaultValue={department}
          label="Department"
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
