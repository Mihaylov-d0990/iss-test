import { DepartmentListElement, EmployeeListElement, PositionListElement } from "../types/structureTypes"

type combineListElementsArray = DepartmentListElement[] | EmployeeListElement[] | PositionListElement[]
type combineListElements = DepartmentListElement | EmployeeListElement | PositionListElement

interface props {
    id: string,
    array: combineListElementsArray
}

const Select = (props: props) => {
    return (
        <select defaultValue={props.id} >
            {props.array.map((item: combineListElements) => {
                return  <option key={item.id} value={item.id}>{item.name}</option>
            })}
        </select>
    )
}

export default Select