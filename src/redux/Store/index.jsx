import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import employeeReducer from './../EmployeeSlice'

const persistConfig = {
  key: 'employees',
  storage,
}

const persistedEmployeeReducer = persistReducer(persistConfig, employeeReducer)

const store = configureStore({
  reducer: {
    employees: persistedEmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
export default store
