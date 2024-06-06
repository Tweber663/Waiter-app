import NavBar from "../common/NavBar"
import styles from './TableDetails.module.scss'
import { useEffect, useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "../features/Navigation"

// setTimeout(() => {
//     triggered = false;
//     setTrigger(prev => !prev)
// }, 2000)

const TableDetails = () => {
    const { id } = useParams();
    const [trigger, setTrigger] = useState(false);

    const orderAddedTrigger = (e) => {
        if (e === 'subimted') {
        setTrigger(true);
        setTimeout(() => {
                setTrigger(false);
            }, 2000)
        } 
    };

    return (
        <div>
            <Container>
                <h1 className={styles.title}>Table {id}</h1>
                <TableForm passedTriggerFunc={orderAddedTrigger} />
            </Container>
            <Navigation passed={trigger} />
        </div>
    );
}

export default TableDetails;