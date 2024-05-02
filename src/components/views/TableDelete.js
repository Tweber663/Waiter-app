import styles from './TableDelete.module.scss'
import { deleteTable } from '../../redux/tableRedux'
import { useDispatch } from 'react-redux'
const TableDelete = ({id}) => {
    const dispatch = useDispatch();

    const deleteHandler = (e) => {
        dispatch(deleteTable(id))
    }


    return (
        <button onClick={deleteHandler} className={styles.delete}>Delete</button>
    )
}

export default TableDelete