import { useState } from "react"
import styles from './Welcome.module.scss'
import { MoonLoader} from "react-spinners"
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Container } from "react-bootstrap";

const Welcome = () => {

   const [toggle, setToggle] = useState(true);

   setTimeout(() => {
      setToggle(false)
   }, 1000)
   
   if (toggle === true) return (
   <div className={styles.spinnerBox}>
      <MoonLoader className={styles.spinner} color="#000000"size="70"/>
   </div>)
   return (
      <Container>
         <div className={clsx(styles.mainBox)}>
         <div className={clsx(styles.innerBox)}>
            <img className={styles.waiter} alt="waiterIcon" src={`${process.env.PUBLIC_URL}/images/waiter.png`}/>
            <h1 className={styles.title}>TableWise</h1>
            <p className={styles.subTitle}>Table management made simple</p>
         </div>
         <NavLink to="/home">
            <button className={styles.btn}>START</button>
         </NavLink>
         </div>
      </Container>
   )    
}


export default Welcome