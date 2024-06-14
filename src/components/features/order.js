import styles from './order.module.scss'
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import shortid from 'shortid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { orderPlacedTableReset } from '../../redux/tableRedux';
import { orderPlacedDelete } from '../../redux/tableRedux';
import { orderPlacedGet } from '../../redux/tableRedux'
import { orderPlacedPut } from '../../redux/tableRedux'
import { useImperativeHandle, forwardRef } from 'react';
import { useRef } from 'react';

const Order = forwardRef(({id, table, activeOrders, setBlurOn}, ref) => {
    const dispatch = useDispatch();
    const tableId = id; 
    const tableTemp = useSelector(state => state.tables.addTableTempOrder)


    const [timer, setTimer] = useState(() => {
        const timeNow = new Date();
        const timePast = table.menuOrder[0].timeStamp;
        const difference = timeNow.getTime() - timePast;
        const minutes =  Math.round(difference / 1000 / 60)
        if (minutes <= 60) {
            return minutes;
        } else {
            return 60;
        }
    });

    const [innerHidden, setInnerHidden] = useState(true);
    const [arrowDown, setArrowDown] = useState(true);
    const [arrowUp, setArrowUp] = useState(false);
    const [foodServed, setFoodServed] = useState('Food served?');
    const [foodStatus, setFoodStatus] = useState('time-left.png');
    const [green, setGreen] = useState(true)
    const [yellow, setYellow] = useState(false);
    const [red, setRed] = useState(false);
    const [orderStatus, setOrderStatus] = useState('Cooking')
    const [orderStats, setOrderStats] = useState(false)

    const sliderHandler = () => {
        setInnerHidden(prev => !prev);
        setArrowDown(prev => !prev);
        setArrowUp(prev => !prev);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prev => {
                if (prev <= 60) {
                    console.log('correct')
                    return prev + 1;
                } else {
                    return 60
                }
            });
        }, 60000);

        if (timer > 20 && timer < 40) {
            setGreen(false);
            setYellow(true);
        } else if (timer >= 40 && timer <= 60) {
            setGreen(false);
            setYellow(false);
            setRed(true);
        }

        return () => clearInterval(intervalId);
    }, [timer]);


    const deletes = (e) => {
        setBlurOn(false)
        dispatch(orderPlacedTableReset({
            id: tableId, 
            orderPlaced: false,
            status: 'Free', 
            peopleAmount: "2", 
            maxPeopleAmount: "4", 
            timeStamp: "00:00",
            bill: "0", 
            info: "Type your notes here:", 
            menuOrder: tableTemp[0].menuOrder.map((order) => {
                return {
                   title: order.title, 
                   id: tableId, 
                   tableNum: tableId, 
                   photo: order.photo, 
                   basePrice: order.basePrice, 
                   quantity: 0,
                   totalAmount: 0,
                   checkbox: order.checkbox, 
                   orderServed: false,
                }
            })
        }, id))
        dispatch(orderPlacedDelete(id));
        dispatch(orderPlacedGet())
    }

    useImperativeHandle(ref, () => ({
        deletes,
    }));

    const foodServedHandler = (e) => {
        e.preventDefault();
        setFoodServed('Served')
        setFoodStatus('check-mark.png');
        dispatch(orderPlacedGet());
        dispatch(orderPlacedPut(activeOrders, id, table.menuOrder[0].timeStamp, true));
        setOrderStatus('finished')
    }

    useEffect(() => {
        if (table.menuOrder[0].orderPlaced) {
            setFoodServed('Served');
            setFoodStatus('check-mark.png');
            setOrderStatus('finished');
            setOrderStats(true); 
        }
    }, [])

    return (
        <div className={styles.orderBox}>
            <div className={clsx(styles.outerBox)} onClick={sliderHandler}>
                <h2 className={styles.title}>Table: {table.id}, Time: {table.timeStamp}, Items...</h2>
                <img className={styles.imgTimeLeft} src={`${process.env.PUBLIC_URL}/images/${foodStatus}`}/>
                <img className={clsx(styles.arrowImg, arrowDown && styles.arrowFlipDown, arrowUp && styles.arrowFlipUp)} alt="arrow" src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
            </div>

            <div className={clsx(styles.innerBox, innerHidden && styles.innerBoxHidden)}>
                <ul>
                    <h6>Items: {table.menuOrder.map((order) => <span className={styles.orderStats} key={id}>{order.title}, </span>)}</h6>
                    <h6>Order Status: <span className={styles.orderStats}>{orderStatus}</span></h6>
                    <h6 className={clsx(orderStats && styles.finished)}>
                        Order placed: <span className={clsx(green && styles.green, yellow && styles.yellow, red && styles.red)}>{timer} min ago</span>
                    </h6>
                    <button onClick={foodServedHandler} className={styles.btnFoodServed}><span>{foodServed}</span></button>
                    <i className={clsx("fa-regular fa-trash-can", styles.imgDelete)} onClick={() => setBlurOn(false)}></i>
                </ul>
            </div>
        </div>
    )
}
)

export default Order