import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Table from "./Table"
import AddTable from "./AddTable"
import styles from './Tables.module.scss'
import { MoonLoader } from "react-spinners"
import TableSearch from "./TableSearch"
import { searchFilter, fetchingTables } from "../../redux/tableRedux"

const Tables = () => {
    const dispatch = useDispatch();

    const [tableFetched, setTableFetched] = useState(false);
    const [searchId, setSearchId] = useState('')

    useEffect(() => {
        dispatch(fetchingTables());
        setTableFetched(true);
    }, [dispatch]) 

    const addedTables = useSelector(state => searchFilter(state.tables, searchId));

    if (addedTables === 'undefined') return (<h1>No tablesyy</h1>)
    return (
        <div>
            <TableSearch setSearchId={setSearchId}/>
            <div className={styles.tables}>
                    {addedTables.length > 0 ? (
                        addedTables.map((table) => (
                            <Table key={table.id} table={table}/>
                        ))
                    ) : (
                        <div className={styles.spinnerBox}>
                            <MoonLoader className={styles.spinner} color="#000000"size="70"/>
                        </div>
                    )}
            </div>
            <AddTable/>
        </div>
    );
};

export default Tables