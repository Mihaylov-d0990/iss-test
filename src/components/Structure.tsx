import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"
import React from "react"

import Select from "./Select"
import { Employee } from "../types/structureTypes"

function Structure() {
    const [open, setOpen] = React.useState<boolean>(true)
    const { fetchEmploees,
            fetchControlData } = useActions()
    const employees = useTypedSelector(state => state.employees)
    
    const fetchData = async () => {
        await new Promise((resolve) => fetchEmploees(resolve))
        await new Promise((resolve) => fetchControlData(resolve))
    }

    React.useEffect(() => {
        fetchData()
    }, []) 

    
    const edit = require("../images/edit.svg").default  

    return (
        <div className="structure">
            <div className="container">
                <div className="structure__content">
                    <div className="structure__add">
                        <div className="structure__title title" onClick={() => setOpen(open => !open)}>Организационно-штатная структура ФОИВ</div>
                        {
                            open ?
                            <>
                                <div className="structure__add-button">
                                    <img src={edit} alt="" />
                                    Редактировать
                                </div>
                            </> : <></>
                        }
                    </div>
                </div>
                {
                    open ?
                    <>
                        <div className="structure__list">
                            <ol>
                                <li>
                                    {employees ? <Select id={employees?.department.id} array={employees?.departmentList} /> : <></>}
                                    {employees?.employees ? <Select id={employees?.employees?.position.id} array={employees?.positionList} /> : <></>}
                                    {employees?.employees ? <Select id={employees?.employees?.employee.id} array={employees?.employeeList} /> : <></>}   
                                    <img className="structure__edit" src={edit} alt="" />
                                    {employees?.employees?.employees ? 
                                        <ol>
                                            {employees?.employees?.employees.map((item: Employee) => {
                                                return (
                                                    <li key={item.employee.id}>
                                                        <Select id={item.position.id} array={employees?.positionList} />
                                                        <Select id={item.employee.id} array={employees?.employeeList} />
                                                        <img className="structure__edit" src={edit} alt="" />
                                                        <label className="structure__delete">X</label>
                                                        {item.employees ? 
                                                        <ol>
                                                            {item.employees?.map((item : Employee) => {
                                                                return (
                                                                    <li key={item.employee.id}>
                                                                        <Select id={item.position.id} array={employees?.positionList} />
                                                                        <Select id={item.employee.id} array={employees?.employeeList} />
                                                                        <img className="structure__edit" src={edit} alt="" />
                                                                        <label className="structure__delete">X</label>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ol> : <></>}
                                                        
                                                    </li>
                                                    
                                                )
                                            })}
                                        </ol> : <></>
                                    }                        
                                </li>
                                <li>
                                    {employees ? <Select id={employees?.departmentList[1].id} array={employees?.departmentList} /> : <></>}
                                    {employees?.employees ? <Select id={employees?.employees?.position.id} array={employees?.positionList} /> : <></>}
                                    {employees?.employees ? <Select id={employees?.employees?.employee.id} array={employees?.employeeList} /> : <></>} 
                                    <img className="structure__edit" src={edit} alt="" />
                                </li>
                            </ol>
                        </div>
                    </> : <></>
                }
                <div className="structure__api-error">Документации по API было недостаточно чтобы реализовать функционал структуры ¯\_(ツ)_/¯</div>
            </div>
        </div>
    )
}

export default Structure