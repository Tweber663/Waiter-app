import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import styles from './Table.module.scss'
import { NavLink } from "react-router-dom";
import TableDelete from "./TableDelete";
import clsx from "clsx";

const Table = (table) => {

    const {id,status} = table.table;
    return (
            <Row>
                <Col className={styles.col}>
                    <div className={styles.holder}>
                        <li className={styles.gird} key={id}>
                                <h2>Table{id}
                                <span className={styles.spanOne}>Status: </span>
                                <span className={styles.spanTwo}>{status}</span>
                                </h2> 
                        </li>
                        <TableDelete id={id}/>
                        <NavLink to={`tables/${id}`}>
                            <button className="btn btn-primary">ShowMore</button>
                        </NavLink>
                    </div>
                </Col>
            </Row>
    )
}

export default Table;