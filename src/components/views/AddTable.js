import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './AddTable.module.scss'
import { tableErrMsg, addTableTemplate, menuPlacedGet, ifTableLimitReached, ifTableAlredyExists, fetchTablePost } from "../../redux/tableRedux";
import clsx from "clsx";

const AddTable = () => {

   const dispatch = useDispatch();
   const [verifyInfo, setVerifyInfo] = useState(false);
   const [tableNum, setTableNum] = useState(0);
   const [devault] =useState();
   const [inputValue, setInputValue] =useState();
   const tableTemp = useSelector(state => addTableTemplate(state, tableNum));
   const ifTableIdUsed = useSelector(state => ifTableAlredyExists(tableNum, state));
   const ifTableLimit = useSelector(state => ifTableLimitReached(state));
   const currentStateMess = useSelector(state => state.tables.Message);
   const [addClicked, setAddClicked] = useState(false);

   useEffect(() => {
    dispatch(menuPlacedGet()); 
   }, [])

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

    return (
        <div onClick={clickOutside}  className={clsx(styles.mainBox, addClicked && styles.mainBoxVisible)}>
            <div className={styles.btnBox}>
                 <button className={styles.btn} onClick={selectTableDispatch}><i class="fa-solid fa-plus"></i></button>
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