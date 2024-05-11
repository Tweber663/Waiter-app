import { useEffect, useState } from "react";
import styles from './TableForm.module.scss'
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedTable } from "../../redux/tableRedux";
import { useDispatch } from "react-redux";
import { fetchingTables } from "../../redux/tableRedux";
// import { fetchingTablesPUT } from "../../redux/tableRedux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Footer from "../common/Footer";


const TableForm = () => {
    const disptach = useDispatch();
    
    const navigate = useNavigate();
    
    //Sends fetch request
    useEffect(() => {
        disptach(fetchingTables());
    }, [disptach]) //Stops from erros / get's triggered once

    //Current table id
    const {id} = useParams();
    //Getting table information from store
    const table = useSelector(state => selectedTable({state, id}));

    let { bill, status, peopleAmount, maxPeopleAmount } = table[0] || {};

    if (status !== "Busy") bill = "0";
    if (peopleAmount < 1 ||  peopleAmount > 10) peopleAmount = 1;
    if (maxPeopleAmount < 1 ||  maxPeopleAmount > 10) maxPeopleAmount = 1;

    const [pepAmount, setPepAmount] = useState(peopleAmount);
    const [maxPepAmount, setMaxPepAmount] = useState(maxPeopleAmount);
    
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
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     console.log(e)
    //     disptach(fetchingTablesPUT({
    //         id, 
    //         status: e.target.selectStatus.value,
    //         peopleAmount: e.target.peopleAmount.value, 
    //         maxPeopleAmount: e.target.maxPeopleAmount.value, 
    //         bill: e.target.bill.value
    //     }));
    //     navigate("/")
    // }


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


    var pattern = /[a-zA-Z]/;
    if( id > 30 || pattern.test(id)) return <Navigate to="/"/>
    if (table.length == 0) return <p>Loading...</p>
    return (
        <form>

           <div className={styles.formType}>
            <label className={styles.label1}>Status</label>
            {status && (
                 <select onChange={changeHandler} name="selectStatus" defaultValue={status} className={`form-select ${styles.select}`}>
                        <option value='Free'>Free</option>
                        <option value='Reserved'>Reserved</option>
                        <option value='Busy'>Busy</option>
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
            <button className="btn btn-primary" onClick={handleBlur}>Submit</button>
            <Footer/>
        </form>
    )
}

export default TableForm