import Navigation from "../features/Navigation"
import styles from './Orders.module.scss'
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchingTables } from "../../redux/tableRedux"
import { useDispatch } from "react-redux"
import Order from "../features/order"
import { orderPlacedGet } from "../../redux/tableRedux"
import { useRef} from "react"
import clsx from "clsx"

const Orders = () => {
    const dispatch = useDispatch(); 
    const orderRef = useRef(null)
    const [blurOn, setBlurOn] = useState(true)

    useEffect(() => {
        dispatch(fetchingTables());
        dispatch(orderPlacedGet());
    }, [dispatch]) //Stops from erros / get's triggered once

    const activeOrdersServer = useSelector(state => state.tables.ordersServer);

    const deleteHandler = () => {
        if (orderRef.current) {
            orderRef.current.deletes();
        }
    }

    return (
        <div>
             <Container>
                 <h4 className={styles.title}>Active Orders</h4>
                    <div className={styles.orderBox}>
                        <ul>
                            {activeOrdersServer ?  activeOrdersServer.map((table) => (
                                <Order ref={orderRef} setBlurOn={setBlurOn} id={table.id} table={table} activeOrders={activeOrdersServer}/>
                            )) : <h1>Loading</h1>}
                        </ul>
                    </div>
             </Container>
             <div onClick={(e) => {
                if (e.target.classList.contains('Orders_windowBlur__ZmWzX')) {
                    setBlurOn(true);
                }
             }} className={clsx(styles.windowBlur, blurOn && styles.blurOff)}>
                <div className={styles.infoWindow}>
                    <div className={styles.infoMessage}>
                        <h1 className={styles.title}>Deleting order will also restart the "table" it belongs to. Are you sure you want to proceed?</h1>
                        <div className={styles.buttons}>
                            <button onClick={deleteHandler} className="btn btn-warning">Yes</button>
                            <button onClick={e => setBlurOn(true)} className="btn">No</button>
                        </div>
                   </div>
                </div>
             </div>
            <Navigation />
        </div>
    )
}


export default Orders