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

const TableForm = () => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    //Sends fetch request
    useEffect(() => {
        dispatch(fetchingTables());
    }, [dispatch]) //Stops from erros / get's triggered once

    //Current table id
    const {id} = useParams();
    //Getting table information from store
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
    const activeOrders = useSelector(state => (checkingforOrders(state)));

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();


    const handlerChange1 = (e) => {
        setPepAmount(e.target.value)
    }

    const handlerChange2 = (e) => {
        setMaxPepAmount(e.target.value)
    }

    const handleBlur = () => {
        if (pepAmount < 1 || pepAmount > 10) setPepAmount(1);
        if (maxPepAmount < 1 || maxPepAmount > 10) setMaxPepAmount(1);
        if (Number(pepAmount) > Number(maxPepAmount)) setPepAmount(maxPepAmount);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchingTablesPUT({
            id, 
            status: e.target.selectStatus.value,
            peopleAmount: e.target.peopleAmount.value, 
            maxPeopleAmount: e.target.maxPeopleAmount.value, 
            bill: e.target.bill.value,
            info: e.target.textInfo.value,
            menuOrder: menuOrderTemp[0].orderMenu,
            timeStamp: now.toLocaleTimeString().slice(0, 5)
        }));
        navigate("/")
        dispatch(orderPlacedPost(activeOrders))
    }


    const [changeStatus, setChangeStatus] = useState(false);
    const [currentStatus, setCurrentStauts] = useState(status);
    const changeHandler = (e) => {
        e.preventDefault();
        if (e.target.value === 'Busy') {
            setChangeStatus(true)
        } else {
            setChangeStatus(false);
        }
        if (status === 'Busy' && e.target.value !== "Busy") {
            setCurrentStauts(e.target.value)
        }
    }


    const slider1Handler = () => {
        setSlider1(current => !current)
    }
    const slider2Handler = () => {
        setSlider2(current => !current)
    }

    var pattern = /[a-zA-Z]/;
    if( id > 30 || pattern.test(id)) return <Navigate to="/"/>
    if (table.length == 0) return <p>Loading...</p>
    return (
        <div className={styles.formBox}>
        <form onSubmit={submitHandler}>
        <div  className={clsx(styles.slider1_btn, slider1 && styles.slider1_btnActive)} onClick={slider1Handler}>
            <div className={styles.title}>Table details</div>
            <div className={clsx(styles.vSymbolBox)}>
                <img className={clsx(styles.vSymbol, slider1 && styles.vSymbolRotateDown, !slider1 && styles.vSymbolRotateUp)} src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
            </div>
        </div>
        <div className={clsx(styles.slider1_content, slider1 && styles.slider1_content_visible)}>

           <div className={styles.formType}>
            <label className={styles.label1}>Status</label>
            {status && (
                 <select onChange={changeHandler} name="selectStatus" defaultValue={status} className={`form-select ${styles.select}`}>
                        <option value='Free'>Free</option>
                        <option value='Reserved'>Reserved</option>
                        <option value='Busy'>Busy $</option>
                        <option value='Cleaning'>Cleaning</option>
                </select>
            )}
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

        <div onClick={slider2Handler} className={clsx(styles.slider2_btn, slider2 && styles.slider2_btnActive)}>
            <div className={styles.title}>Menu</div>
            <div className={clsx(styles.vSymbolBox)}>
                <img className={clsx(styles.vSymbol, slider2 && styles.vSymbolRotateDown, !slider2 && styles.vSymbolRotateUp)} src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
            </div>
        </div>
        <div className={clsx(styles.slider2_content, slider2 && styles.slider2_content_visible, !slider1 && styles.slider2_content_extended)}>
            <MenuSelect selectedTable={menuOrderTemp}/>
        </div>
             <div>
                <button className={styles.btn} onClick={handleBlur}>+</button>
            </div>
        </form>
      
        </div>

    )
}

export default TableForm