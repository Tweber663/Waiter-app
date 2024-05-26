import NavBar from "../common/NavBar"
import styles from './TableDetails.module.scss'
import { useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "../features/Navigation"

const TableDetails = () => {

    const {id} = useParams();

    return (
        <div>
        <Container>
            <h1 className={styles.title}>Table{id}</h1>
            <TableForm/>
        </Container>
          <Navigation/>
        </div>
    )
}

export default TableDetails