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
import { orderPlacedGet } from "../../redux/tableRedux"

const Orders = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(fetchingTables());
        dispatch(orderPlacedGet());
    }, [dispatch]) //Stops from erros / get's triggered once

    const activeOrdersServer = useSelector(state => state.tables.ordersServer);
    console.log(activeOrdersServer)

    return (
        <div>
             <Container>
                 <h4 className={styles.title}>Active Orders</h4>
                    <div className={styles.orderBox}>
                        <ul>
                            {activeOrdersServer ?  activeOrdersServer.map((table) => (
                                <Order id={table.id} table={table}/>
                            )) : <h1>Loading</h1>}
                        </ul>
                    </div>
             </Container>
            <Navigation/>
        </div>
    )
}


export default Orders