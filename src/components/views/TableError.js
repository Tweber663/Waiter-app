import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { tableErrMsgClear, tableErrMsgCheck } from '../../redux/tableRedux'
import { useDispatch } from 'react-redux'
import styles from './TableError.module.scss'

const TableError = () => {
    const dispatch = useDispatch();

    const errorMsg = useSelector(state => tableErrMsgCheck(state));
    const {notTriggered, error} = errorMsg;

    const currentState = useSelector(state => tableErrMsgClear(state));

    const clickHandler = () => {
        dispatch(tableErrMsgClear(currentState));
    }
    return (
        <div className={clsx(styles.messBlock, !notTriggered && styles.messBlockAppear)}>
            {(!notTriggered &&
             <div className={styles.messBox}>
                <div className={styles.messHolder}>
                    {error.length > 0 && (
                        <h6 className={styles.mess}>{error[0].error}</h6>
                    )}
                    <div className={styles.messBoxInner}>
                        <button onClick={() => clickHandler()} className="btn btn-warning">OK</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default TableError