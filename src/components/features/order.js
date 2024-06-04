import styles from './order.module.scss'
import { useState } from 'react';
import clsx from 'clsx';
import shortid from 'shortid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { orderPlacedPutReset } from '../../redux/tableRedux';

const Order = ({id, table}) => {
    const dispatch = useDispatch();
    const tableId = id; 
    console.log(id)
    const tableTemp = useSelector(state => state.tables.addTableTempOrder)
    const [innerHidden, setInnerHidden] = useState(true);
    const [arrowDown, setArrowDown] = useState(true);
    const [arrowUp, setArrowUp] = useState(false);

    const sliderHandler = () => {
        setInnerHidden(prev => !prev);
        setArrowDown(prev => !prev);
        setArrowUp(prev => !prev);
    }

    const deleteHandler = (e) => {
        dispatch(orderPlacedPutReset({
            bill: "0", 
            id: tableId, 
            info: "Type your notes here:", 
            maxPeopleAmount: "4", 
            menuOrder: tableTemp.menuOrder, 
            peopleAmount: "2", 
            status: 'Free', 
            timeStamp: "00:00"
        }, tableId))

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
                    <h6>Order placed 60min ago</h6>
                    <button>Food served</button>
                    <button onClick={deleteHandler}>Delete order</button>
                </ul>
            </div>
        </div>
    )
}

export default Order