import styles from './ServiceCharge.module.scss'
import { useState } from 'react'
import clsx from 'clsx';
import { addServiceChargeToTemp, grabingTotalAmount } from '../../redux/tableRedux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { menuPlacedGet } from '../../redux/tableRedux';
import { checkMenuOrderId } from '../../redux/tableRedux';

const ServiceCharge = () => {
    const dispatch = useDispatch(); 
    let {id} = useParams();
    const [precent, setPrecent] = useState(0);
    useSelector(state => (grabingTotalAmount(state.tables.menuOrderTemp, id, precent)))
    const menuOrderTemp = useSelector(state => checkMenuOrderId(state, id));
    const currentState = useSelector(state => state);
    const [isSelected, setIsSelected] = useState(Number(menuOrderTemp[0].service)); 
    console.log(isSelected)

   useEffect(() => {
    dispatch(menuPlacedGet()); 
   }, [])

    const handlerClick = (e, index) => {
        const length = e.target.innerHTML.length
        if (isSelected === index) {
            setIsSelected(0);
            dispatch(addServiceChargeToTemp(currentState.tables.menuOrderTemp, 0, id))
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
                <div onClick={(e) => handlerClick(e, 5)} className={clsx(styles.circle, isSelected === 5 && styles.selected)}><h6>5%</h6></div>
                <div onClick={(e) => handlerClick(e, 15)} className={clsx(styles.circle, isSelected === 15 && styles.selected)}><h6>15%</h6></div>
                <div onClick={(e) => handlerClick(e, 25)} className={clsx(styles.circle, isSelected === 25 && styles.selected)}><h6>25%</h6></div>
            </div>
        </div>
    )
}

export default ServiceCharge

