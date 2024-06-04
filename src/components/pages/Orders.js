import Navigation from "../features/Navigation"
import styles from './Orders.module.scss'
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { checkingforOrders } from "../../redux/tableRedux"
import { useEffect } from "react"
import { fetchingTables } from "../../redux/tableRedux"
import { useDispatch } from "react-redux"
import { useState } from "react"
import Order from "../features/order"

const Orders = () => {

    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(fetchingTables());
    }, [dispatch]) //Stops from erros / get's triggered once

    const activeOrders = useSelector(state => (checkingforOrders(state)));

    return (
        <div>
             <Container>
                 <h4 className={styles.title}>Active Orders</h4>
                    <div className={styles.orderBox}>
                        <ul>
                            {activeOrders.map((table) => (
                                <Order id={table.tableId} table={table}/>
                            ))}
                        </ul>
                    </div>
             </Container>
            <Navigation/>
        </div>
    )
}


export default Orders