import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import styles from './Table.module.scss'
import { NavLink } from "react-router-dom";
import TableDelete from "./TableDelete";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Table = (table) => {

    const {id,status, peopleAmount, maxPeopleAmount, bill} = table.table;

    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
        if (status === "Busy") {
            setIsBusy(true)
        } else {
            setIsBusy(false)
        }
    }, [table])

    return (
            <div className={styles.holder}>
                <div className={styles.top}>
                    <h2>Table {id}</h2>
                        <div className={clsx(styles.status, isBusy && styles.statusBusy)}></div>
                    <TableDelete className={styles.delete} id={id}/>
                </div>

                <div className={styles.middle}>
                <h6>14:34</h6>
                <h6>{status}</h6>
                <h6>{peopleAmount}/{maxPeopleAmount}</h6>
                <h6 className={styles.bill}>${bill}</h6>
                </div>

                <div className={styles.bottom}>
                <NavLink className={styles.navLink} to={`tables/${id}`}>Show More</NavLink>
                </div>
            </div>
    )
}

export default Table;