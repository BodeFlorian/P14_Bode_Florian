import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockEmployees } from '../../utils/data/mockEmployees'

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (newEmployee) => {
    return newEmployee
  },
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: mockEmployees,
  },
  extraReducers: (builder) => {
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload)
    })
  },
})

export const selectEmployees = (state) => state.employees.employees
export default employeeSlice.reducer
