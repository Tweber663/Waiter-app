import styles from './ServiceCharge.module.scss'
import { useState } from 'react'
import clsx from 'clsx';
import { addServiceChargeToTemp, grabingTotalAmount } from '../../redux/tableRedux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { menuPlacedGet } from '../../redux/tableRedux';

const ServiceCharge = () => {
    const dispatch = useDispatch(); 
    let {id} = useParams();
    const [isSelected, setIsSelected] = useState(0); 
    const [precent, setPrecent] = useState(0);
    useSelector(state => (grabingTotalAmount(state.tables.menuOrderTemp, id, precent)))
    const currentState = useSelector(state => state);
    
    
   useEffect(() => {
    dispatch(menuPlacedGet()); 
   }, [])

    const handlerClick = (e, index) => {
        const length = e.target.innerHTML.length
        if (isSelected === index) {
            setIsSelected(0);
        } else {
            const precentage = e.target.innerHTML.slice(0, length -1)
            setIsSelected(index);
            setPrecent(precentage);
            dispatch(addServiceChargeToTemp(currentState.tables.menuOrderTemp, precentage, id))
        }
    }
    return (
        <div  className={styles.formType}>
            <label>Service</label>
            <div className={styles.circleBox}>
                <div onClick={(e) => handlerClick(e, 1)} className={clsx(styles.circle, isSelected === 1 && styles.selected)}><h6>5%</h6></div>
                <div onClick={(e) => handlerClick(e, 2)} className={clsx(styles.circle, isSelected === 2 && styles.selected)}><h6>15%</h6></div>
                <div onClick={(e) => handlerClick(e, 3)} className={clsx(styles.circle, isSelected === 3 && styles.selected)}><h6>25%</h6></div>
            </div>
        </div>
    )
}

export default ServiceCharge

