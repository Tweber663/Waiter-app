
import Tables from "../views/Tables"
import styles from './Home.module.scss'
import TableError from "../views/TableError"
import Navigation from "../features/Navigation"
import { Container } from "react-bootstrap"
const Home = () => {



    return (
       <div className={styles.boxEntireApp}>
        <Container>
            <TableError/>
            <Tables/>
        </Container>
        <Navigation selected="Home"/>
       </div> 
    )
} 

export default Home