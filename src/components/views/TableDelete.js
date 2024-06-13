import styles from './TableDelete.module.scss'
import { deleteTable } from '../../redux/tableRedux'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { orderPlacedDelete } from '../../redux/tableRedux';

const TableDelete = ({id}) => {
    const dispatch = useDispatch();

    const currentState = useSelector(state => state)

    const deleteHandler = (e) => {
        dispatch(deleteTable(id, currentState));
        dispatch(orderPlacedDelete(id));
    }

    return (
        <button onClick={deleteHandler} className={styles.delete}><i className="fa-regular fa-trash-can"></i></button>
    )
}

export default TableDelete