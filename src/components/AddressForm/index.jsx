import React from 'react'
import Dropdown from './../Dropdown'

export const AddressForm = ({
  street,
  city,
  state,
  zipCode,
  setStreet,
  setCity,
  setState,
  setZipCode,
  states,
}) => {
  const stateNames = states.map((s) => s.name)

  const handleStateSelect = (selectedState) => {
    const selectedAbbreviation =
      states.find((s) => s.name === selectedState)?.abbreviation || ''
    setState(selectedAbbreviation)
  }

  return (
    <fieldset className="address">
      <legend>Address</legend>

      <label htmlFor="street">Street</label>
      <input
        type="text"
        id="street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <label htmlFor="state">State</label>
      <Dropdown
        options={stateNames}
        onSelect={handleStateSelect}
        defaultValue={states.find((s) => s.abbreviation === state)?.name || ''}
      />

      <label htmlFor="zip-code">Zip Code</label>
      <input
        type="number"
        id="zip-code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
    </fieldset>
  )
}
