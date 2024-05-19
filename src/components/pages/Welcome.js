import { useState } from "react"
import styles from './Welcome.module.scss'
import { MoonLoader, ScaleLoader } from "react-spinners"

const Welcome = () => {


const [locading, setLoading] = useState(false);



 return (
    <div>
      <MoonLoader 
      color="#000000"
      size="80"
      loading={locading}
      />
      <div className={styles.mainBox}>
         <img className={styles.waiter} alt="waiterIcon" src={`${process.env.PUBLIC_URL}/images/waiter.png`}/>
         <h1 className={styles.title}>TableWise</h1>
         <p className={styles.subTitle}>Table management made simple</p>
      </div>
      <button className={styles.btn}>START</button>
   </div>

 )    
}


export default Welcome