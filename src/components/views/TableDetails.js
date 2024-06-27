import styles from './TableDetails.module.scss'
import { useEffect, useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "../features/Navigation"
import clsx from "clsx"
import { useDispatch } from 'react-redux'

const TableDetails = () => {
    const dispatch = useDispatch(); 
    const { id } = useParams(); 
    const [trigger, setTrigger] = useState(false);
    const [blurOn, setBlurOn] = useState(false); 
    const [blurOnRestart, setBlurOnRestart] = useState(false);
    const [blurInfo, setBlurInfo] = useState(); 
    const [resetConfrim, setResetConfrim] = useState(false);

    const orderAddedTrigger = (e) => {
        if (e === 'subimted') {
        setTrigger(true);
        setTimeout(() => {
                setTrigger(false);
            }, 2000)
        } 
    };


    const restartHandler = () => {
        setResetConfrim(true); 
    }

    const blurOffHandler = (e) => {
        if (e.target.classList.contains("TableDetails_blurWindowRestart__lC2NP")) setBlurOnRestart(false);
    }

    return (
        <div>
             <div className={clsx(styles.blurWindow, blurOn && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    {blurInfo}
                    <button onClick={() => setBlurOn(false)} className={"btn btn-warning"}>OK</button>
                </div>
             </div>

             <div onClick={blurOffHandler} className={clsx(styles.blurWindowRestart, blurOnRestart && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    <h6>
                        Switching table to 'Free' will restart the table and all it's active orders. Are you sure you want to proceed? 
                    </h6>
                    <button onClick={clsx(restartHandler)} className={"btn btn-warning"}>Restart</button>
                </div>
             </div>

            <Container>
                <h1 className={styles.title}>Table {id}</h1>
                <TableForm 
                setBlurInfo={setBlurInfo} 
                setBlurOnReset={setBlurOnRestart} 
                setBlurOn={setBlurOn} 
                passedTriggerFunc={orderAddedTrigger} 
                />
            </Container>
            <Navigation passed={trigger} />
        </div>
    );
}

export default TableDetails;