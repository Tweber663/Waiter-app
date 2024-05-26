import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTablePost } from "../../redux/tableRedux";
import { ifTableAlredyExists } from "../../redux/tableRedux";
import { ifTableLimitReached } from "../../redux/tableRedux";
import { tableErrMsg } from "../../redux/tableRedux";
import styles from './AddTable.module.scss'
import { updateStore } from "../../redux/tableRedux";
import { addTableTemplate } from "../../redux/tableRedux";
import clsx from "clsx";
import { tableErrMsgCheck } from "../../redux/tableRedux";

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
   const [addClicked, setAddClicked] = useState(false);

   
   const errorMsg = useSelector(state => tableErrMsgCheck(state));
   const {notTriggered, error} = errorMsg;
   //notTriggered = false (error activated)

   const verifyHandler = (e) => {
    let targetValue = e.target.value;
    e.preventDefault();
    setInputValue(targetValue)
    const regEx = /^[1-9]$|^10$/;
    if (/[a-zA-Z]/.test(targetValue)) {
        dispatch(tableErrMsg({stateMessage: currentStateMess, id: 4, notTriggered: false}));
        setInputValue('')
        setTableNum('');
        setVerifyInfo(false)
    } else if (regEx.test(targetValue) && targetValue <= 10) {
        console.log(true)
        setVerifyInfo(true)
        setTableNum(targetValue);
    } else if (targetValue == 0  || targetValue > 10 || targetValue === !undefined){
        setVerifyInfo(false)
        dispatch(tableErrMsg({stateMessage: currentStateMess, id: 2, notTriggered: false}));
        setInputValue('')
        setTableNum('');
    } else {
        console.log(true)
    }
   }

   const addDispatch = (e) => {
    e.preventDefault();
    if (verifyInfo && !ifTableIdUsed && !ifTableLimit) {
        dispatch(fetchTablePost(tableTemp.addTableTempOrder[0]))
        setVerifyInfo(false);
        setAddClicked(false);
        } else if (ifTableLimit){
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 1, notTriggered: false}));
            setInputValue('')
            setTableNum('');
        } else if (tableNum === 0 || tableNum > 10){
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 2, notTriggered: false}));
            setInputValue('')
            setTableNum('');
        } else if (ifTableIdUsed) {
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 3, notTriggered: false}));
            setInputValue('')
            setTableNum('');
        } else {
            console.log('evrything else')
        }
    }
    // <button className={styles.btn} onClick={addDispatch}>+</button>
    const submitHandler = (e) => {
        e.preventDefault()
    }

    const selectTableDispatch = (e) => {
        e.preventDefault();
        setAddClicked(true);
    }

    const clickOutside = (e) => {
        e.preventDefault();
       if (e.target.classList.contains("AddTable_mainBox__nXfWC")) {
        setAddClicked(false)
        setInputValue("");
       }
    }

    console.log('tableNum:', tableNum)


    return (
        <div onClick={clickOutside}  className={clsx(styles.mainBox, addClicked && styles.mainBoxVisible)}>
            <div className={styles.btnBox}>
                 <button className={styles.btn} onClick={selectTableDispatch}>+</button>
            </div>
            
            <div className={clsx(styles.formBox, addClicked && styles.formBoxVisible)}>
            <h1 className={styles.title}>Add Table number:</h1>
                <form onSubmit={submitHandler} className={styles.addTableForm}>
                    <input name="verify" defaultValue={devault} value={inputValue} className="form-control" onChange={verifyHandler} type="text"></input>
                    <button className='btn btn-warning' onClick={addDispatch}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddTable