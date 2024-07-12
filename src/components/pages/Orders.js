import Navigation from "../features/Navigation"
import styles from './Orders.module.scss'
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchingTables, orderPlacedGet } from "../../redux/tableRedux"
import { useDispatch } from "react-redux"
import Order from "../features/order"
import { useRef} from "react"
import clsx from "clsx"
import { MoonLoader } from "react-spinners"

const Orders = () => {
    const dispatch = useDispatch(); 
    const orderRef = useRef(null)
    const [blurOn, setBlurOn] = useState(true)

    useEffect(() => {
        dispatch(fetchingTables());
        dispatch(orderPlacedGet());
    }, [dispatch])
    
    const activeOrdersServer = useSelector(state => state.tables.ordersServer);

    const deleteHandler = () => {
        if (orderRef.current) {
            orderRef.current.deletes();
        }
    }

    return (
        <div>
             <Container>
                 <h1 className={styles.title}>Active Orders</h1>
                    <div className={styles.orderBox}>
                        <ul>
                            {activeOrdersServer?
                                <div> {activeOrdersServer.length ?  activeOrdersServer.map((table) => (
                                    <Order ref={orderRef} setBlurOn={setBlurOn} id={table.id} table={table} activeOrders={activeOrdersServer}/>
                                )) 
                                : 
                                <div className={styles.noOrders}><h4>You have no active orders</h4><img alt="meme" className={styles.meme} src={`${process.env.PUBLIC_URL}/images/meme.png`} /></div>}</div> :  <div className={styles.spinnerBox}>
                                <MoonLoader className={styles.spinner} color="#000000"size="70"/>
                                </div>
                             }
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
                        <h1 className={styles.infoText}>Deleting order will also restart the "table" it belongs to. Are you sure you want to proceed?</h1>
                        <div className={styles.buttons}>
                            <button onClick={deleteHandler} className="btn btn-warning">Yes</button>
                            <button onClick={() => setBlurOn(true)} className="btn">No</button>
                        </div>
                   </div>
                </div>
             </div>
            <Navigation selected="Orders" />
        </div>
    )
}


export default Orders