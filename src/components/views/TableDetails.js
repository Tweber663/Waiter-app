import styles from './TableDetails.module.scss'
import { useEffect, useState } from "react"
import TableForm from "./TableForm"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "../features/Navigation"
import clsx from "clsx"

const TableDetails = () => {
    const { id } = useParams(); 
    const [trigger, setTrigger] = useState(false);
    const [blurOn, setBlurOn] = useState(false); 
    const [blurInfo, setBlurInfo] = useState(); 

    const orderAddedTrigger = (e) => {
        if (e === 'subimted') {
        setTrigger(true);
        setTimeout(() => {
                setTrigger(false);
            }, 2000)
        } 
    };

    return (
        <div>
             <div className={clsx(styles.blurWindow, blurOn && styles.blurWindowOn)}>
                <div className={styles.infoWindow}>
                    {blurInfo}
                    <button onClick={() => setBlurOn(false)} className={"btn btn-warning"}>OK</button>
                </div>
             </div>
            <Container>
                <h1 className={styles.title}>Table {id}</h1>
                <TableForm setBlurInfo={setBlurInfo} setBlurOn={setBlurOn} passedTriggerFunc={orderAddedTrigger} />
            </Container>
            <Navigation passed={trigger} />
        </div>
    );
}

export default TableDetails;