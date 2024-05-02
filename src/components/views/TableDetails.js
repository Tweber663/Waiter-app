import NavBar from "../common/NavBar"
import styles from './TableDetails.module.scss'
import { useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"

const TableDetails = () => {

    const {id} = useParams();

    return (
        <div>
            <NavBar/>
            <h1>Table{id}</h1>
            <TableForm/>
        </div>
    )
}

export default TableDetails