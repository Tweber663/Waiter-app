import Navigation from "../features/Navigation"
import styles from './Orders.module.scss'
import { Container } from "react-bootstrap"
const Orders = () => {


    return (

        <div>
             <Container>
                 <h1 className={styles.title}>Orders</h1>
             </Container>
            <Navigation/>
        </div>
    )
}


export default Orders