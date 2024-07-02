import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import { selectedTable } from "../../redux/tableRedux"
import styles from './People.module.scss'


const People = () => {

    const {id} = useParams();
    const table = useSelector(state => selectedTable({state, id}));

    let { peopleAmount, maxPeopleAmount} = table[0] || {};

    const handleBlur = () => {
        if (pepAmount < 1 || pepAmount > 10) setPepAmount(1);
        if (maxPepAmount < 1 || maxPepAmount > 10) setMaxPepAmount(1);
        if (Number(pepAmount) > Number(maxPepAmount)) setPepAmount(maxPepAmount);
    }

    
    const [pepAmount, setPepAmount] = useState(peopleAmount);
    const [maxPepAmount, setMaxPepAmount] = useState(maxPeopleAmount);


    const handlerChange1 = (e) => {
        e.preventDefault();
        setPepAmount(e.target.value)
    }

    const handlerChange2 = (e) => {
        e.preventDefault();
        setMaxPepAmount(e.target.value)
    }

    return (
        <div className={styles.formType}>
                    <label className={styles.label2}>People</label>
                    <input onChange={(e) => handlerChange1(e)} onBlur={handleBlur} name="peopleAmount" value={pepAmount} className={`form-control ${styles.input}`} type="text"></input>
                    /
                    <input onChange={(e) => handlerChange2(e)} onBlur={handleBlur} name="maxPeopleAmount" value={maxPepAmount} className={`form-control ${styles.input}`} type="text"></input> 
                </div>
    )
}

export default People