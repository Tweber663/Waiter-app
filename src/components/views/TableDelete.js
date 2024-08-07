import styles from './TableDelete.module.scss'
import { deleteTable } from '../../redux/tableRedux'
import { useDispatch, useSelector } from 'react-redux'
import { orderPlacedDelete } from '../../redux/tableRedux';

const TableDelete = ({id}) => {
    const dispatch = useDispatch();
    const currentState = useSelector(state => state)
    const deleteHandler = (e) => {
        if (currentState.tables.tables.length === 1) {
            console.log('cannot delete last table')
        } else {
            dispatch(deleteTable(id, currentState));
            dispatch(orderPlacedDelete(id));
        }
    }

    return (
        <button onClick={deleteHandler} className={styles.delete}><i className="fa-regular fa-trash-can"></i></button>
    )
}

export default TableDelete