// Structure types 

export interface IIdName {
    id: string,
    name: string
}

export interface EmployeeListElement extends IIdName {}

export interface PositionListElement extends IIdName {}

export interface DepartmentListElement extends IIdName {}

export interface Employee {
    position: IIdName,
    employee: IIdName,
    employees: Employee[] | null
}

export interface Employees {
    employees: Employee | null,
    employeeList: EmployeeListElement[]
    positionList: PositionListElement[],
    department: DepartmentListElement,
    departmentList: DepartmentListElement[]
}

export enum EmployeesActionTypes {
    SET_EMPLOYEES_DATA = "SET_EMPLOYEES_DATA"
}

export interface setEmployeesAction {
    type: EmployeesActionTypes.SET_EMPLOYEES_DATA,
    payload: Employees
}

export type EmployeesAction = setEmployeesAction