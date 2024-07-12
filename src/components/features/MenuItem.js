import { useState } from 'react';
import styles from './MenuItem.module.scss'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuItem, checkMenuOrderId } from '../../redux/tableRedux';

const MenuItem = ({menuItems}) => {
    const dispatch = useDispatch();

    let {title, id, photo, basePrice, totalAmount, checkbox, quantity, tableNum} = menuItems;

    const [count, setCount] = useState(quantity);
    const [checked, setChecked] = useState(checkbox);
    const menuOrderTemp = useSelector(state => checkMenuOrderId(state, tableNum));


    const onChangeAdd = (e) => {
        let total = basePrice;
        e.preventDefault();
        const billedItems = menuOrderTemp[0].menuOrder.filter((item) => item.quantity > 0? item : null);
        billedItems.forEach((order) => {
            total += order.totalAmount;
        })

        setCount(prevCount => prevCount + 1);
        if(count >= 0) setChecked(true);

        dispatch(updateMenuItem({
           title, 
           id, 
           tableNum,
           photo, 
           checkbox: true,
           basePrice: basePrice,
           quantity: count + 1,
           totalAmount: count * basePrice + basePrice,
        }, total))
    }

    const onChangeMinus = (e) => {
        e.preventDefault();
        let total = basePrice;
        const billedItems = menuOrderTemp[0].menuOrder.filter((item) => item.quantity > 0? item : null);
        billedItems.forEach((order) => {
            total = order.totalAmount - total;
        })

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

        console.log(count)
        if (!count == 0) {
            dispatch(updateMenuItem({
                title, 
                id, 
                tableNum,
                photo, 
                checkbox: checked,
                basePrice: basePrice,
                quantity: count - 1,
                totalAmount: test === false? totalAmount - basePrice : 0
             }, total))
        }
    }
    const temp = () => {}
    return (
        <div>
            <div className={styles.orderBox}>
                <input onChange={temp} checked={checked} type="checkbox"></input>
                <div className={styles.orderCost}>
                    <p className={styles.totalAmount}>${totalAmount}</p>
                    <p>${basePrice}</p>
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