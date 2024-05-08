import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchingTables } from "../../redux/tableRedux"
import { useSelector } from "react-redux"
import Table from "./Table"
import AddTable from "./AddTable"
import styles from './Tables.module.scss'
import TableDelete from "./TableDelete"

const Tables = () => {
    const disptach = useDispatch();

    const [tableFetched, setTableFetched] = useState(false)

    useEffect(() => {
        disptach(fetchingTables());
        setTableFetched(true);
    }, [disptach]) //Stops from erros / get's triggered once
      
    const addedTables = useSelector(state => state.tables);
    if (addedTables.tables.length === 0) return <p>Loading...</p>
    return (
        <div> 
          {tableFetched && (
            <ul>
              {addedTables.tables.map((table) => (
                <Table table={table}/>
              ))}
            </ul>
          )}
         <AddTable/>
        </div>

      );
}

export default Tables