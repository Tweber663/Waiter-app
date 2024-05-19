import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTablePost } from "../../redux/tableRedux";
import { ifTableAlredyExists } from "../../redux/tableRedux";
import { ifTableLimitReached } from "../../redux/tableRedux";
import { tableErrMsg } from "../../redux/tableRedux";
import styles from './AddTable.module.scss'
import { updateStore } from "../../redux/tableRedux";
import { addTableTemplate } from "../../redux/tableRedux";

const AddTable = () => {

   const dispatch = useDispatch();
   const [verifyInfo, setVerifyInfo] = useState(false);
   const [tableNum, setTableNum] = useState(0);
   const [devault, setDefault] =useState();
   const [inputValue, setInputValue] =useState();
   const tableTemp = useSelector(state => addTableTemplate(state, tableNum));
   const ifTableIdUsed = useSelector(state => ifTableAlredyExists(tableNum, state));
   const ifTableLimit = useSelector(state => ifTableLimitReached(state));
   const currentStateMess = useSelector(state => state.tables.Message);

   const verifyHandler = (e) => {
    let targetValue = e.target.value;
    e.preventDefault();
    setInputValue(targetValue)
    const regEx = /^[1-6]$/;
    if (/[a-zA-Z}+]/.test(targetValue)) {
        dispatch(tableErrMsg({stateMessage: currentStateMess, id: 4, notTriggered: false}));
        setInputValue('')
        setTableNum('');
    } else if (regEx.test(targetValue) && targetValue <= 6) {
        setVerifyInfo(true)
        setTableNum(targetValue);
    } else if (targetValue == 0  || targetValue > 10 && !undefined){
        dispatch(tableErrMsg({stateMessage: currentStateMess, id: 2, notTriggered: false}));
        setInputValue('')
        setTableNum('');
    }
   }

   const addDispatch = (e) => {
    e.preventDefault();
    if (verifyInfo && !ifTableIdUsed && !ifTableLimit) {
        dispatch(fetchTablePost(tableTemp.addTableTempOrder[0]))
        setVerifyInfo(false);
        } else if (ifTableLimit){
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 1, notTriggered: false}));
        } else if (tableNum === 0 || tableNum > 6){
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 2, notTriggered: false}));
        } else if (ifTableIdUsed) {
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 3, notTriggered: false}));
        } else {
            console.log('evrything else')
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={submitHandler} className={styles.addTableForm}>
            <label>Table Number:</label>
            <input name="verify" defaultValue={devault} value={inputValue} className="form-control" onChange={verifyHandler} type="text"></input>
            <button className="btn btn-warning" onClick={addDispatch}>Add Table +</button>
        </form>
    )
}

export default AddTable