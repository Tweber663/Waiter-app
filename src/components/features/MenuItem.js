import { useState } from 'react';
import styles from './MenuItem.module.scss'
import clsx from 'clsx'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateMenuItem } from '../../redux/tableRedux';

const MenuItem = (passed) => {
    const dispatch = useDispatch();
    const {title, id, photo, basePrice, totalAmount} = passed.menuItem;
    const [count, setCount] = useState(0);

    const [checked, setChecked] = useState(false);
    const [price, setPrice] = useState(basePrice);

    const onChangeAdd = (e) => {
        e.preventDefault();
        setCount(prevCount => prevCount + 1);
        if(count >= 0) setChecked(true);
        dispatch(updateMenuItem({
           title, 
           id, 
           photo, 
           basePrice: basePrice,
           quantity: count + 1,
           totalAmount: count * basePrice + basePrice
        }))
    }

    const onChangeMinus = (e) => {
        e.preventDefault();
        setCount(prevCount => prevCount -1);
        if(count <= 1) {
            setChecked(false);
            setCount(0);
        }
    }
    const temp = () => {}

    return (
        // <form onSubmit={submitHandler}>
            <div className={styles.orderBox}>
                <input onChange={temp} checked={checked} type="checkbox"></input>
                <p>{totalAmount}</p>
                <div className={styles.foodView}>
                    <img className={styles.foodPicture} alt="menu" src={`${process.env.PUBLIC_URL}/images/${photo}`}/>
                    <p className={styles.foodDescription}>{title}</p>
                </div>
                <div className={styles.orderAmount}>
                    <button type="button" onClick={onChangeAdd} className={clsx("btn btn-outline-dark", styles.btnAdd)}><span>+</span></button>
                    <input onChange={temp} value={count} className={clsx(styles.inputAmount, "form-control")} type="text"></input>
                    <button onClick={onChangeMinus} className={clsx("btn btn-outline-dark", styles.btnSub)}><span>-</span></button>
                </div>
            </div>
    //    </form>
    )
}

export default MenuItem