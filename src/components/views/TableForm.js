import { useEffect, useState } from "react";
import styles from './TableForm.module.scss'
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedTable } from "../../redux/tableRedux";
import { useDispatch } from "react-redux";
import { fetchingTables } from "../../redux/tableRedux";
import { fetchingTablesPUT } from "../../redux/tableRedux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import MenuSelect from "../features/MenuSelect";
import { checkMenuOrderId } from "../../redux/tableRedux";
import { checkingforOrders } from "../../redux/tableRedux";
import { orderPlacedPost } from "../../redux/tableRedux";
import { orderPlacedPut } from "../../redux/tableRedux";
import { grabingTotalAmount } from "../../redux/tableRedux";

const TableForm = (passed) => {
    const dispatch = useDispatch();
    //Sends fetch request
    useEffect(() => {
        dispatch(fetchingTables());
    }, [dispatch]) //Stops from erros / get's triggered once

    //Current table id
    const {id} = useParams();
    const table = useSelector(state => selectedTable({state, id}));
    const menuOrderTemp = useSelector(state => checkMenuOrderId(state, id));
    let { bill, status, peopleAmount, maxPeopleAmount, info} = table[0] || {};

    if (status !== "Busy") bill = "0";
    if (peopleAmount < 1 ||  peopleAmount > 10) peopleAmount = 1;
    if (maxPeopleAmount < 1 ||  maxPeopleAmount > 10) maxPeopleAmount = 1;

    const [pepAmount, setPepAmount] = useState(peopleAmount);
    const [maxPepAmount, setMaxPepAmount] = useState(maxPeopleAmount);
    const [slider1, setSlider1] = useState(false); 
    const [slider2, setSlider2] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [offBusy, setOffBusy] = useState(false)
    const totalAmount = useSelector(state => grabingTotalAmount(state.tables.menuOrderTemp, id));
    const [busyStatus, setBusyStatus] = useState(() => {
        if (table[0]) {
            return table[0].status
        }
    })


    useEffect(() => {
        if (busyStatus === "Busy")  {
            setIsChecked(true)
        } else {
            setIsChecked(false);
            setOffBusy(true)
        }
    }, [])


    const activeOrders = useSelector(state => (checkingforOrders(state, id)));
    
    const toggleHandler = (e) => {
        setIsChecked(prev => !prev)
        e.target.checked === true? setBusyStatus("Busy") : setBusyStatus("Free");
        setBusyStatus(prev => {
           if (prev === "Free") {
            passed.setBlurOnReset(true);
            setChangeStatus("Free")
           } else {
            setOffBusy(false)
            setBusyStatus("Busy")
           }
        }); 

    }

    const handlerChange1 = (e) => {
        e.preventDefault();
        setPepAmount(e.target.value)
    }

    const handlerChange2 = (e) => {
        e.preventDefault();
        setMaxPepAmount(e.target.value)
    }

    const handleBlur = () => {
        if (pepAmount < 1 || pepAmount > 10) setPepAmount(1);
        if (maxPepAmount < 1 || maxPepAmount > 10) setMaxPepAmount(1);
        if (Number(pepAmount) > Number(maxPepAmount)) setPepAmount(maxPepAmount);
    }

    const now = new Date();
    const timeStamp = now.getTime();

    const submitHandler = (e) => {
        e.preventDefault();
        if (busyStatus === "Busy" && activeOrders.length) {
            dispatch(fetchingTablesPUT({
                id, 
                orderPlaced: true,
                status: busyStatus,
                peopleAmount: e.target.peopleAmount.value, 
                maxPeopleAmount: e.target.maxPeopleAmount.value, 
                timeStamp: timeStamp,
                time: `${now.getHours()}:${now.getMinutes()}`,
                bill: totalAmount[0].tableTotalAmount,
                info: e.target.textInfo.value,
                menuOrder: menuOrderTemp[0].menuOrder,
            }));
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
        } else {
            passed.setBlurOn(true);
            passed.setBlurInfo(<h1>1. Order not send! Ensure that table status is switched to "Busy"</h1>)
        }
    }

    const [changeStatus, setChangeStatus] = useState(false);
    const [currentStatus, setCurrentStauts] = useState(status);

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
                    <img className={clsx(styles.vSymbol, slider1 && styles.vSymbolRotateDown, !slider1 && styles.vSymbolRotateUp)} src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
                </div>
            </div>
            <div className={clsx(styles.slider1_content, slider1 && styles.slider1_content_visible)}>

                <div className={styles.formType}>
                <label className={styles.label1}>Status</label>
                    <div class={clsx("form-check form-switch", styles.toggleBox)}>
                        <input onChange={toggleHandler} class={clsx("form-check-input", styles.toggle)} type="checkbox" role="switch" checked={isChecked} />
                        <div className={styles.toggleMessage1}>Free</div>
                        <div className={clsx(styles.toggleMessage2, offBusy && styles.toggleMessage2Off)}>Busy</div>
                        <div onClick={() => {
                            // setOffBusy(true)
                            // setIsChecked(false)
                            passed.setBlurOnReset(true);
                        }} className={clsx(styles.toggleOverLay, !offBusy && styles.toggleOverLayOn)}></div>
                    </div>
                </div> 
                <div className={styles.formType}>
                    <label className={styles.label2}>People</label>
                    <input onChange={(e) => handlerChange1(e)} onBlur={handleBlur} name="peopleAmount" value={pepAmount} className={`form-control ${styles.input}`} type="text"></input>
                    /
                    <input onChange={(e) => handlerChange2(e)} onBlur={handleBlur} name="maxPeopleAmount" value={maxPepAmount} className={`form-control ${styles.input}`} type="text"></input> 
                </div>
                <div className={clsx(styles.formType, 
                    changeStatus === true || currentStatus !== 'Busy' && styles.hide )}>
                        <label className={styles.label3}>Bill  $</label>
                        <input name='bill' defaultValue={bill} 
                        className={`form-control ${styles.input}`} 
                        type='text'>
                        </input>
                </div>
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
                    <button className={styles.btn} onClick={handleBlur}><i class="fa-solid fa-plus"></i></button>
                    ) : (
                    <button className={styles.btn} onClick={handleBlur}><i class="fa-solid fa-arrows-rotate"></i></button>) 
                    }
                </div>
        </div>
        </form>
      
        </div>

    )
}

export default TableForm