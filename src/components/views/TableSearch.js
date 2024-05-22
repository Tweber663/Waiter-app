import { Form } from "react-bootstrap"


const TableSearch = (passed) => {

    const searchHandler = (e) => {
        e.preventDefault();
        passed.setSearchId(e.target.value)
    }
    
    return (
        <form onChange={searchHandler}>
            <input></input>
        </form>
    )
}


export default TableSearch