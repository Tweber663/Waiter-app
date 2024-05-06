import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTablePost } from "../../redux/tableRedux";
import { ifTableAlredyExists } from "../../redux/tableRedux";
import { ifTableLimitReached } from "../../redux/tableRedux";
import { tableErrMsg } from "../../redux/tableRedux";

const AddTable = () => {

   const dispatch = useDispatch();
   const [verifyInfo, setVerifyInfo] = useState(false);
   const [tableNum, setTableNum] = useState(0);
   const ifTableIdUsed = useSelector(state => ifTableAlredyExists(tableNum, state));
   const ifTableLimit = useSelector(state => ifTableLimitReached(state));
   const currentStateMess = useSelector(state => state.tables.Message);

   const verifyHandler = (e) => {
    e.preventDefault();
    const regEx = /^[1-6]$/;
    if (regEx.test(e.target.value)) {
        setVerifyInfo(true)
        setTableNum(e.target.value);
    } 
   }
   const addDispatch = (e) => {
    console.log(tableNum)
    e.preventDefault();
    if (verifyInfo && !ifTableIdUsed && !ifTableLimit) {
        dispatch(fetchTablePost({
            id: tableNum,
            status: 'free',
            peopleAmount: 2, 
            maxPeopleAmount: 5, 
            bill: 0,
        }))
        } else if (ifTableLimit){
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 1, notTriggered: false}));
        } else if (tableNum === 0 || tableNum > 7){
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 2, notTriggered: false}));
        } else {
            dispatch(tableErrMsg({stateMessage: currentStateMess, id: 3, notTriggered: false}));
        }
    }

    
    return (
        <form>
            <label>Table Number:</label>
            <input name="verify" onChange={verifyHandler} type="number"></input>
            <button onClick={addDispatch}>Add Table</button>
        </form>
    )
}

export default AddTable