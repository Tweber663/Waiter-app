import clsx from "clsx";
import styles from './Toggle.module.scss'
import { selectedTable } from "../../redux/tableRedux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkingforOrders } from "../../redux/tableRedux";

const Toggle = (passed) => {
    const {id} = useParams(); 
    const activeOrders = useSelector(state => (checkingforOrders(state, id)));


    const table = useSelector(state => selectedTable({state, id}));
    const [isChecked, setIsChecked] = useState(table[0].status === "Busy"? true : false); 
    const [busyStatus, setBusyStatus] = useState(table[0].status === "Free"? true : false);
    const [overLay, setOverLay] = useState(table[0].status === "Busy"? true : false); 
    
    useEffect(() => {
        passed.busyStatus(table[0].status === "Busy"? "Busy" : "false"); 
    }, [])

    const toggleToggler = (e) => {
        setIsChecked(prev => !prev);
        console.log(e.target.checked)
        if (activeOrders.length) {
            if (e.target.checked === true) {
                setBusyStatus(false)
                setOverLay(true);
                passed.busyStatus("Busy"); 
            } else {
                setBusyStatus(true)
                passed.busyStatus("false"); 
            } 
            if (isChecked) passed.setBlurOnReset(true); 
        } else {
            if (e.target.checked === true) {
                setBusyStatus(false)
                setOverLay(true);
                passed.busyStatus("Busy"); 
            } 
        }
    }

    const overlayHandler = () => {
        if (activeOrders.length) {
            passed.setBlurOnReset(true);
        } else {
            setOverLay(false);
            setIsChecked(prev => !prev);
            setBusyStatus(true)
        }
    }

    return (
        <div className={styles.formType}>
        <label className={styles.label1}>Status</label>
            <div class={clsx("form-check form-switch", styles.toggleBox)}>
                <input onClick={toggleToggler} class={clsx("form-check-input", styles.toggle)} type="checkbox" role="switch" checked={isChecked}/>
                <div className={clsx(styles.toggleMessage1)}>Free</div>
                <div className={clsx(styles.toggleMessage2, busyStatus && styles.toggleMessage2Off)}>Busy</div>        
                <div onClick={overlayHandler} 
                className={clsx(styles.toggleOverLay, overLay && styles.toggleOverLayOn)}>
                </div>    
            </div>
        </div> 
    )
}


export default Toggle