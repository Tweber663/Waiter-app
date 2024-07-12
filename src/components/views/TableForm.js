import { useEffect, useState } from "react";
import styles from './TableForm.module.scss'
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectedTable, grabingTotalAmount, orderPlacedPut, orderPlacedPost, checkingforOrders, checkMenuOrderId, fetchingTablesPUT, fetchingTables } from "../../redux/tableRedux";
import clsx from "clsx";
import MenuSelect from "../features/MenuSelect";
import Toggle from "../features/Toggle";
import People from "../features/People";
import ServiceCharge from "../features/ServiceCharge";

const TableForm = (passed) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchingTables());
    }, [dispatch]) 

    const {id} = useParams();
    const table = useSelector(state => selectedTable({state, id}));
    
    const menuOrderTemp = useSelector(state => checkMenuOrderId(state, id));
    let {info} = table[0] || {};
    console.log(menuOrderTemp); 

    const [slider1, setSlider1] = useState(false); 
    const [slider2, setSlider2] = useState(true);
    const totalAmount = useSelector(state => grabingTotalAmount(state.tables.menuOrderTemp, id));
    const [busyStatus, setBusyStatus] = useState('')
 
    const activeOrders = useSelector(state => (checkingforOrders(state, id)));


    const now = new Date();
    const timeStamp = now.getTime();

    const submitHandler = (e) => {
        e.preventDefault();
        if (busyStatus === "Busy" && activeOrders.length && totalAmount.length) {
            dispatch(fetchingTablesPUT({
                id, 
                orderPlaced: true,
                status: busyStatus,
                peopleAmount: e.target.peopleAmount.value, 
                maxPeopleAmount: e.target.maxPeopleAmount.value, 
                timeStamp: timeStamp,
                time: `${now.getHours()}:${now.getMinutes()}`,
                bill: totalAmount[0].tableTotalAmount,
                billPlusService: totalAmount[0].calculatedPrecent > totalAmount[0].tableTotalAmount ? totalAmount[0].calculatedPrecent : totalAmount[0].tableTotalAmount, 
                billDifference: totalAmount[0].service > 0? totalAmount[0].calculatedPrecent - totalAmount[0].tableTotalAmount : 0,
                info: e.target.textInfo.value,
                service: menuOrderTemp[0].service > 0? menuOrderTemp[0].service : 0, 
                menuOrder: menuOrderTemp[0].menuOrder,
            }));
            debugger
            if (activeOrders && !table[0].orderPlaced) dispatch(orderPlacedPost(activeOrders, id, timeStamp))
            if (activeOrders && table[0].orderPlaced) dispatch(orderPlacedPut(activeOrders, id, timeStamp, false))
            passed.passedTriggerFunc('subimted');
        } else if (busyStatus !== "Busy" && !activeOrders.length) {
            passed.setBlurOn(true)
            passed.setBlurInfo(
            <ul className={styles.blurInfo}>
                <li><h1>1. Order not send! Ensure that table status is switched to "Busy"</h1></li>
                <li><h1>2. Ensure you have at least 1 item selected in your "Menu"</h1></li>
            </ul>)
        } else if (busyStatus === "Busy" && !activeOrders.length) {
            passed.setBlurOn(true); 
            passed.setBlurInfo(<h1>1. Ensure you have at least 1 item selected in your "Menu"</h1>)
        }else if (!totalAmount.length) {
            passed.setBlurOn(true); 
            passed.setBlurInfo(<h1>To update table order ensure to change at least one menu item</h1>)
        } else {
            passed.setBlurOn(true);
            passed.setBlurInfo(<h1>1. Order not send! Ensure that table status is switched to "Busy"</h1>)
        }
    }

    const slider1Handler = (e) => {
        e.preventDefault();
        setSlider1(current => !current)
    }
    const slider2Handler = (e) => {
        e.preventDefault();
        setSlider2(current => !current)
    }

    var pattern = /[a-zA-Z]/;
    if( id > 30 || pattern.test(id)) return <Navigate to="/"/>
    if (table.length == 0) return <p>Loading...</p>
    return (
        <div className={styles.formBox}>
            <form onSubmit={submitHandler}>
                <div className={styles.orderBox}>
                    <div onClick={slider1Handler}  className={clsx(styles.slider1_btn)}>
                    <div><h2 className={styles.title}>Table details </h2></div>
                        <div className={clsx(styles.vSymbolBox)}>
                            <img alt="icon" className={clsx(styles.vSymbol, slider1 && styles.vSymbolRotateDown, !slider1 && styles.vSymbolRotateUp)} src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
                        </div>
                    </div>
                    <div className={clsx(styles.slider1_content, slider1 && styles.slider1_content_visible)}>

                        <Toggle busyStatus={setBusyStatus} setBlurOnReset={passed.setBlurOnReset}/>
                        <People/>
                        <ServiceCharge/>
                        <div className={styles.formType}>
                            <label className={styles.label4} >Notes</label>
                            <textarea defaultValue={info} name="textInfo" className={clsx("form-control", styles.textarea)}></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.orderBox}>
                    <div onClick={slider2Handler} className={clsx(styles.slider2_btn)}>
                        <div><h2 className={styles.title}>Menu</h2></div>
                        <div className={clsx(styles.vSymbolBox)}>
                            <img className={clsx(styles.vSymbol, slider2 && styles.vSymbolRotateDown, !slider2 && styles.vSymbolRotateUp)} src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
                        </div>
                    </div>
                    <div className={clsx(styles.slider2_content, slider2 && styles.slider2_content_visible, !slider1 && styles.slider2_content_extended)}>
                        <MenuSelect selectedTable={menuOrderTemp}/>
                    </div>
                        <div>
                            {!table[0].orderPlaced? (
                            <button className={styles.btn}><i class="fa-solid fa-plus"></i></button>
                            ) : (
                            <button className={styles.btn}><i class="fa-solid fa-arrows-rotate"></i></button>) 
                            }
                        </div>
                </div>
            </form>
        </div>

    )
}

export default TableForm