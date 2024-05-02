import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTablePost } from "../../redux/tableRedux";
import { ifTableAlredyExists } from "../../redux/tableRedux";
import { ifTableLimitReached } from "../../redux/tableRedux";

const AddTable = () => {

   const dispatch = useDispatch();
   const [verifyInfo, setVerifyInfo] = useState(false);
   const [tableNum, setTableNum] = useState(0);
   const ifTableIdUsed = useSelector(state => ifTableAlredyExists(tableNum, state));
   const ifTableLimit = useSelector(state => ifTableLimitReached(state));

   const verifyHandler = (e) => {
    e.preventDefault();
    const regEx = /^(?:[1-9]|10)$/;
    if (regEx.test(e.target.value)) {
        setVerifyInfo(true)
        setTableNum(e.target.value);
    } 
   }
   console.log(ifTableLimit)
   const addDispatch = (e) => {
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
            alert('Table limit reached')
        } else {
            alert('table alredy exsists')
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