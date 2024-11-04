import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const loadEmployeesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('employees')
    return serializedState ? JSON.parse(serializedState) : []
  } catch (e) {
    console.error('Erreur lors du chargement des employés', e)
    return []
  }
}

const saveEmployeesToLocalStorage = (employees) => {
  try {
    const serializedState = JSON.stringify(employees)
    localStorage.setItem('employees', serializedState)
  } catch (e) {
    console.error('Erreur lors de la sauvegarde des employés', e)
  }
}

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (newEmployee, { getState }) => {
    const { employees } = getState().employees

    const updatedEmployees = [...employees, newEmployee]

    saveEmployeesToLocalStorage(updatedEmployees)

    return newEmployee
  },
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: loadEmployeesFromLocalStorage(),
  },
  extraReducers: (builder) => {
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload)
    })
  },
})

export const selectEmployees = (state) => state.employees.employees

export default employeeSlice.reducer
