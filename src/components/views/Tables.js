import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchingTables } from "../../redux/tableRedux"
import { useSelector } from "react-redux"
import Table from "./Table"
import AddTable from "./AddTable"
import styles from './Tables.module.scss'
import TableDelete from "./TableDelete"
import { gettingTables } from "../../redux/tableRedux"

const Tables = () => {
    const dispatch = useDispatch();

    const [tableFetched, setTableFetched] = useState(false)

    useEffect(() => {
        dispatch(fetchingTables());
        setTableFetched(true);
    }, [dispatch]) //Stops from erros / get's triggered once
      
    // const addedTables = useSelector(state => gettingTables(state.tables));
    // console.log(addedTables)

    const addedTables = useSelector(state => state.tables)
    console.log(addedTables)
    if (!addedTables.tables) return (<h5>Still loading</h5>)
    return (
        <div>
            <ul>
                {addedTables.tables ? (
                    addedTables.tables.map((table) => (
                        <Table key={table.id} table={table} />
                    ))
                ) : (
                    <li>Loading</li>
                )}
            </ul>
        </div>
    );
};

export default Tables