import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { tableErrMsgCheck } from '../../redux/tableRedux'
import { tableErrMsgClear } from '../../redux/tableRedux'
import { useDispatch } from 'react-redux'
import styles from './TableError.module.scss'

const TableError = () => {
    const dispatch = useDispatch();

    const errorMsg = useSelector(state => tableErrMsgCheck(state));
    const {notTriggered, error} = errorMsg;

    const currentState = useSelector(state => tableErrMsgClear(state));
    
    //Clears the error in store 
    const clickHandler = () => {
        dispatch(tableErrMsgClear(currentState));
    }

    if (!errorMsg) return (<div>Fuck you</div>)
    return (
        <div className={clsx(styles.messBlock, !notTriggered && styles.messBlockAppear)}>
            {(!notTriggered &&
             <div className={styles.messBox}>
                {error.length > 0 && (
                    <h6 className={styles.mess}>{error[0].error}</h6>
                )}
                <div className={styles.messBoxInner}>
                    <button onClick={() => clickHandler()} className={styles.messBtn}>OK</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default TableError