import Navigation from "../features/Navigation"
import styles from './Orders.module.scss'
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { checkingforOrders } from "../../redux/tableRedux"
import { useEffect } from "react"
import { fetchingTables } from "../../redux/tableRedux"
import { useDispatch } from "react-redux"
import { orderPlacedPost } from "../../redux/tableRedux"
import { useState } from "react"

const Orders = () => {

    const dispatch = useDispatch(); 

    const [active, setActive] = useState([]);

    useEffect(() => {
        dispatch(fetchingTables());
    }, [dispatch]) //Stops from erros / get's triggered once

    const activeOrders = useSelector(state => (checkingforOrders(state)));

    
    useEffect(() => {
        dispatch(orderPlacedPost(activeOrders))
    }, [activeOrders]);

    return (
        <div>
             <Container>
                 <h1 className={styles.title}>Orders</h1>
                 {activeOrders.map((table) => (
                    table.map((order) => (
                        <h1>{order.title}, {order.totalAmount}, {order.tableNum}</h1>
                    ))
                 ))}
             </Container>
            <Navigation/>
        </div>
    )
}


export default Orders