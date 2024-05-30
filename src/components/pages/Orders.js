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


    return (
        <div>
             <Container>
                 <h4 className={styles.title}>Orders</h4>
                 {activeOrders.map((order) => (
                        <h4>{order.title}, {order.totalAmount}, {order.tableNum}</h4>
                    ))}
             </Container>
            <Navigation/>
        </div>
    )
}


export default Orders