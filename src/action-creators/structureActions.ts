//  "target":"3fa85f64-5717-4562-b3fc-2c963f66afa6", // id структуры // DELETE UPDATE // необязательное поле в CREATE
//  "nsiId":"00000000-0000-0000-0002-000000000001", // id департамента 
//  "nsi":"00000000-0000-0000-0003-000000000001", // id должности 
//  "childNodes":[null], // ?

//  В swagger не было нормальной документации для API Сервиса организационно-штатной структуры(ОШС).
//  Так что прищлось рабоать без структур. 

import { Dispatch } from "react"
import { EmployeesAction, 
        PositionListElement, 
        EmployeeListElement, 
        Employees, 
        EmployeesActionTypes,
        Employee} from "../types/structureTypes"

import { DepartmentListElement } from "../types/structureTypes"

export const fetchEmploees = (resolve: Function | null) => {
    return async (dispatch: Dispatch<EmployeesAction>) => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        const responseDepartments = await fetch("http://localhost:8080/api/v1/nsi/DEPARTMENT/page")
        const departmentData: DepartmentListElement[] = (await responseDepartments.json()).content
        const department = departmentData[0]

        let responseEmployees = await fetch("http://localhost:8080/api/v1/user/employee/page")
        let usersData = (await responseEmployees.json()).content
        
        let departmentUsers: string[] = []

        usersData.forEach((item: any) => {
            if (item.department.id === department.id) departmentUsers.push(item.id) 
        })

        if (departmentUsers.length < 5) {
            for (let i: number = 0; i < 5; i++) {
                const name = `Тест${i} Тест${i} Тест${i}`.split(" ")
                const response = await fetch("http://localhost:8080/api/v1/user/rou/emplyee", {
                body: `{
                    "department":"${department.id}",
                    "email":"email${i}@mail.ru",
                    "firstName":"${name[1]}",
                    "lastName":"${name[2]}",
                    "middleName":"${name[0]}",
                    "password":"password${i}",
                    "position":"00000000-0000-0000-0003-00000000000${i+1}",
                    "region":"00000000-0000-0000-0001-000000000001"}`,
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                method: "POST"
                })
                const dataX = await response.json()
                const userId = dataX.id

                await fetch(`http://localhost:8080/api/v1/user/employee?id=${userId}&phone=88005553535`, {
                    headers: {
                        Accept: "*/*"
                    },
                    method: "PATCH"
                })
            }

        }

        responseEmployees = await fetch("http://localhost:8080/api/v1/user/employee/page")
        usersData = (await responseEmployees.json()).content
        const employeesData: EmployeeListElement[] = []
        usersData.forEach((item: any) => {
            if (item.department.id === department.id) employeesData.push({id: item.id, name: `${item.middleName} ${item.firstName[0]}. ${item.lastName[0]}.`}) 
        })

        const responsePositions = await fetch("http://localhost:8080/api/v1/nsi/POSITION/page")
        const positionData: PositionListElement[] = (await responsePositions.json()).content

        const financier: Employee = {
            employee: {
                name: employeesData[3].name,
                id: employeesData[3].id
            },
            position: {
                name: positionData[3].name,
                id: positionData[3].id
            },
            employees: null
        }

        const analyst: Employee = {
            employee: {
                name: employeesData[4].name,
                id: employeesData[4].id
            },
            position: {
                name: positionData[4].name,
                id: positionData[4].id
            },
            employees: null
        }

        const financierDirector: Employee = {
            employee: {
                name: employeesData[1].name,
                id: employeesData[1].id
            },
            position: {
                name: positionData[1].name,
                id: positionData[1].id
            },
            employees: [financier, analyst]
        }

        const developmentDirectore: Employee = {
            employee: {
                name: employeesData[2].name,
                id: employeesData[2].id
            },
            position: {
                name: positionData[2].name,
                id: positionData[2].id
            },
            employees: null
        }

        const director: Employee = {
            employee: {
                name: employeesData[0].name,
                id: employeesData[0].id
            },
            position: {
                name: positionData[0].name,
                id: positionData[0].id
            },
            employees: [financierDirector, developmentDirectore]

        }

        const employees: Employees = {
            department: departmentData[0],
            departmentList: departmentData,
            employeeList: employeesData,
            employees: director,
            positionList: positionData
        }

        dispatch({type: EmployeesActionTypes.SET_EMPLOYEES_DATA, payload: employees})

        await fetch("http://localhost:8080/api/logout")

        if (resolve) resolve()
        
    }
}
