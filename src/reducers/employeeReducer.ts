import { Employees, EmployeesAction, EmployeesActionTypes } from "../types/structureTypes"

const defaultState:  null = null

const employeeReducer = (state: Employees | null = defaultState, action: EmployeesAction): Employees | null => {
    switch (action.type) {
        case EmployeesActionTypes.SET_EMPLOYEES_DATA: return action.payload
        default: return state
    }
}

export default employeeReducer