import styles from './TableDetails.module.scss'
import { useEffect, useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "../features/Navigation"
import clsx from "clsx"
import { useDispatch } from 'react-redux'
import { orderPlacedTableReset } from '../../redux/tableRedux'
import { useSelector } from 'react-redux'
import { orderPlacedDelete } from '../../redux/tableRedux'
import { grabingTotalAmount } from '../../redux/tableRedux'
import { selectedTable } from "../../redux/tableRedux";

const TableDetails = () => {
    const dispatch = useDispatch(); 
    const { id } = useParams(); 
    const [trigger, setTrigger] = useState(false);
    const [blurOn, setBlurOn] = useState(false); 
    const [blurOnRestart, setBlurOnRestart] = useState(false);
    const [blurInfo, setBlurInfo] = useState(); 
    const tableTemp = useSelector(state => state.tables.addTableTempOrder)
    const totalAmount = useSelector(state => grabingTotalAmount(state.tables.menuOrderTemp, id, 0));

    const table = useSelector(state => selectedTable({state, id}));
    let {bill} = table[0] || {};

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
    }

    const blurOffHandler = (e) => {
        if (e.target.classList.contains("TableDetails_blurWindowRestart__lC2NP")) setBlurOnRestart(false);
    }

    return (
        <div>
             <div className={clsx(styles.blurWindow, blurOn && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    {blurInfo}
                    <button onClick={() => setBlurOn(false)} className={"btn btn-warning"}>OK</button>
                </div>
             </div>

             <div onClick={blurOffHandler} className={clsx(styles.blurWindowRestart, blurOnRestart && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    <h6 className={styles.restartInfo}>
                        Switching table to 'Free' will restart the table and delete active orders this table belongs to. Are you sure you want to proceed? 
                    </h6>
                    <button onClick={restartHandler} className={"btn btn-warning"}>Yes</button>
                    <button onClick={() => { 
                        setBlurOnRestart(false) 
                    }} className={"btn btn-outline-white"}>No</button>
                </div>
             </div>

            <Container>
                <h1 className={styles.title}>Table {id}</h1>
               
                {totalAmount[0]? 
                <h1 className={styles.totalAmount}>${totalAmount[0].tableTotalAmount}</h1>
                : 
                <h1 className={styles.totalAmount}>${bill}</h1>
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