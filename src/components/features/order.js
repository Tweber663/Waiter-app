import styles from './order.module.scss'
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import shortid from 'shortid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { orderPlacedTableReset } from '../../redux/tableRedux';
import { orderPlacedDelete } from '../../redux/tableRedux';

const Order = ({id, table}) => {
    const dispatch = useDispatch();
    const tableId = id; 
    const tableTemp = useSelector(state => state.tables.addTableTempOrder)
    const [timer, setTimer] = useState(() => {
        const timeNow = new Date();
        const timePast = table.menuOrder[0].timeStamp;
        const difference = timeNow.getTime() - timePast;
        return Math.round(difference / 1000 / 60);
    });

    const [innerHidden, setInnerHidden] = useState(true);
    const [arrowDown, setArrowDown] = useState(true);
    const [arrowUp, setArrowUp] = useState(false);
    const [refresh, setRefresh] = useState(true);

    const sliderHandler = () => {
        setInnerHidden(prev => !prev);
        setArrowDown(prev => !prev);
        setArrowUp(prev => !prev);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);


    const deleteHandler = (e) => {
        dispatch(orderPlacedTableReset({
            bill: "0", 
            id: tableId, 
            info: "Type your notes here:", 
            maxPeopleAmount: "4", 
            menuOrder: tableTemp[0].menuOrder, 
            peopleAmount: "2", 
            status: 'Free', 
            timeStamp: "00:00"
        }, id))
        dispatch(orderPlacedDelete(id));
        setRefresh(prev => !prev)
    }

    return (
        <div className={styles.orderBox}>
            <div className={clsx(styles.outerBox)} onClick={sliderHandler}>
                <div>Table: {table.id}, Time: {table.timeStamp}, Items: ...</div>
                <img className={clsx(styles.arrowImg, arrowDown && styles.arrowFlipDown, arrowUp && styles.arrowFlipUp)} alt="arrow" src={`${process.env.PUBLIC_URL}/images/arrow.png`}/>
            </div>

            <div className={clsx(styles.innerBox, innerHidden && styles.innerBoxHidden)}>
                <ul>
                    <h6>Items: {table.menuOrder.map((order) => <span key={id}>{order.title}, </span>)}</h6>
                    <h6>Order Status: cooking;</h6>
                    <h6>{timer} min ago</h6>
                    <button>Food served</button>
                    <button onClick={deleteHandler}>Delete order</button>
                </ul>
            </div>
        </div>
    )
}

export default Order