import { useState } from 'react';
import styles from './MenuItem.module.scss'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateMenuItem } from '../../redux/tableRedux';
import { checkMenuItem } from '../mechanisms/brains';

const MenuItem = ({selectedTable, menuItems}) => {
    const dispatch = useDispatch();


    // let {status, bill, id, info, maxPeopleAmount, peopleAmount, menuOrder} = selectedTable;
    let {title, id, photo, basePrice, totalAmount, checkbox, quantity, tableNum} = menuItems;
    
    const [count, setCount] = useState(quantity);
    const [checked, setChecked] = useState(checkbox);



    const onChangeAdd = (e) => {
        e.preventDefault();
        setCount(prevCount => prevCount + 1);
        if(count >= 0) {
            setChecked(true);
        }
        dispatch(updateMenuItem({
           title, 
           id, 
           tableNum,
           photo, 
           checkbox: true,
           basePrice: basePrice,
           quantity: count + 1,
           totalAmount: count * basePrice + basePrice
        }))
    }

    const onChangeMinus = (e) => {
        e.preventDefault();
        let test = false;
        setCount(prevCount => {
            if (prevCount < 1) {
                return prevCount = 0;
            } 

            return prevCount - 1;
        });
        if(count < 2) {
            setChecked(false);
            test = true;
        } 
        dispatch(updateMenuItem({
            title, 
            id, 
            tableNum,
            photo, 
            checkbox: checked,
            basePrice: basePrice,
            quantity: count - 1,
            totalAmount: test === false? totalAmount - basePrice : 0
         }))
    }
    const temp = () => {}
    return (
        <div>
            <div className={styles.orderBox}>
                <input onChange={temp} checked={checked} type="checkbox"></input>
                <div className={styles.orderCost}>

                <p>${totalAmount}</p>
                <p>{basePrice}</p>
                </div>
                <div className={styles.orderView}>
                    <img className={styles.foodPicture} alt="menu" src={`${process.env.PUBLIC_URL}/images/${photo}`}/>
                    <p className={styles.foodDescription}>{title}</p>
                </div>
                <div className={styles.orderAmount}>
                    <button type="button" onClick={onChangeAdd} className={clsx("btn btn-outline-dark", styles.btnAdd)}><span>+</span></button>
                    <input onChange={temp} value={count} className={clsx(styles.inputAmount, "form-control")} type="text"></input>
                    <button onClick={onChangeMinus} className={clsx("btn btn-outline-dark", styles.btnSub)}><span>-</span></button>
                </div>
            </div>
        </div>
    )
}

export default MenuItem