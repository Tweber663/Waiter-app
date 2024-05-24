import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchingTables } from "../../redux/tableRedux"
import { useSelector } from "react-redux"
import Table from "./Table"
import AddTable from "./AddTable"
import styles from './Tables.module.scss'
import TableDelete from "./TableDelete"
import { gettingTables } from "../../redux/tableRedux"
import { BarLoader } from "react-spinners"
import TableSearch from "./TableSearch"
import { searchFilter } from "../../redux/tableRedux"

const Tables = () => {
    const dispatch = useDispatch();

    const [tableFetched, setTableFetched] = useState(false);
    const [searchId, setSearchId] = useState('')
;
    useEffect(() => {
        dispatch(fetchingTables());
        setTableFetched(true);
    }, [dispatch]) //Stops from erros / get's triggered once
      

    const addedTables = useSelector(state => searchFilter(state.tables, searchId));
    console.log('pre-render:', addedTables)
    return (
        <div>
            <TableSearch setSearchId={setSearchId}/>
            <div className={styles.tables}>
                    {addedTables.length > 0 ? (
                        addedTables.map((table) => (
                            <Table key={table.id} table={table}/>
                        ))
                    ) : (
                        <div>
                            <div>No tables Found</div>
                            <BarLoader/>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Tables