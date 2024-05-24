import NavBar from "../common/NavBar"
import styles from './TableDetails.module.scss'
import { useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"

const TableDetails = () => {

    const {id} = useParams();

    return (
        <Container>
            <NavBar/>
            <h1>Table{id}</h1>
            <TableForm/>
        </Container>
    )
}

export default TableDetails