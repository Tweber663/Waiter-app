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
      
    // const addedTables = useSelector(state => gettingTables(state.tables));
    // console.log(addedTables)
    console.log('searchid:', searchId);
    const Bla = useSelector(state => searchFilter(state.tables, searchId));
    console.log('test:', Bla)

    const addedTables = useSelector(state => state.tables)
    console.log("before rendering:", addedTables);
    // if (!addedTables.tables.length) return (<BarLoader/>)
    return (
        <div>
            <h1 className={styles.pageTitle}>All Tables</h1>
            <TableSearch setSearchId={setSearchId}/>
        <div className={styles.tables}>
                {Bla ? (
                    Bla.map((table) => (
                        <Table key={table.id} table={table} />
                    ))
                ) : (
                    <div>Loading</div>
                )}
        </div>
        </div>
    );
};

export default Tables