import styles from './TableDetails.module.scss'
import { useState } from "react"
import TableForm from "./TableForm"
import { useParams, useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "../features/Navigation"
import clsx from "clsx"
import { useDispatch, useSelector } from 'react-redux'
import { fetchingTables, grabingTotalAmount, orderPlacedDelete, orderPlacedTableReset } from '../../redux/tableRedux'


const TableDetails = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [trigger, setTrigger] = useState(false);
    const [blurOn, setBlurOn] = useState(false); 
    const [blurOnRestart, setBlurOnRestart] = useState(false);
    const [blurInfo, setBlurInfo] = useState(); 
    const tableTemp = useSelector(state => state.tables.addTableTempOrder)
    const totalAmount = useSelector(state => grabingTotalAmount(state.tables.menuOrderTemp, id, 0));


    const orderAddedTrigger = (e) => {
        if (e === 'subimted') {
        setTrigger(true);
        setTimeout(() => {
                setTrigger(false);
            }, 2000)
        } 
    };

    const restartHandler = (e) => {
        e.preventDefault()
        dispatch(orderPlacedTableReset({
            id: id, 
            orderPlaced: false,
            status: 'Free', 
            peopleAmount: "2", 
            maxPeopleAmount: "4", 
            time: "00:00",
            timeStamp: "00:00",
            bill: "0", 
            info: "Type your notes here:", 
            menuOrder: tableTemp[0].menuOrder.map((order) => {
                return {
                   title: order.title, 
                   id: id, 
                   tableNum: id, 
                   photo: order.photo, 
                   basePrice: order.basePrice, 
                   quantity: 0,
                   totalAmount: 0,
                   checkbox: order.checkbox, 
                   orderServed: false,
                }
            })
        }, id))
        dispatch(orderPlacedDelete(id));
        navigate("/home");
        dispatch(fetchingTables());
    }

    const blurOffHandler = (e) => {
        if (e.target.classList.contains("TableDetails_blurWindowRestart__lC2NP")) setBlurOnRestart(false);
    }

    return (
        <div className={styles.mainBox}>
             <div className={clsx(styles.blurWindow, blurOn && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    {blurInfo}
                    <button onClick={() => setBlurOn(false)} className={"btn btn-warning"}>OK</button>
                </div>
             </div>

             <div onClick={blurOffHandler} className={clsx(styles.blurWindowRestart, blurOnRestart && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    <h6 className={styles.restartInfo}>
                    Switching the table to "Free" will restart the table and remove the active orders to which this table belongs. Are you sure you want to continue? 
                    </h6>
                    <button onClick={restartHandler} className={"btn btn-warning"}>Yes</button>
                    <button onClick={() => { 
                        setBlurOnRestart(false) 
                    }} className={"btn btn-outline-white"}>No</button>
                </div>
             </div>

            <Container>
                <h1 className={styles.title}>Table {id}</h1>
               
                {totalAmount.length ?  
                <h1 className={styles.totalAmount}>${totalAmount[0].calculatedPrecent}</h1> 
                : 
                <h1 className={styles.totalAmount}>$0</h1> 
                } 
                <TableForm 
                setBlurInfo={setBlurInfo} 
                setBlurOnReset={setBlurOnRestart} 
                setBlurOn={setBlurOn} 
                passedTriggerFunc={orderAddedTrigger} 
                />
            </Container>
            <Navigation selected="Home" passed={trigger} />
        </div>
    );
}

export default TableDetails;