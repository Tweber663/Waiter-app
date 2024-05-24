import NavBar from "../common/NavBar"
import Tables from "../views/Tables"
import styles from './Home.module.scss'
import Footer from "../common/Footer"
import TableError from "../views/TableError"
import AddTable from "../views/AddTable"
import Navigation from "../features/Navigation"
import { Container } from "react-bootstrap"
const Home = () => {

    return (
       <div>
        <Container>
        <TableError/>
        <Tables/>
        </Container>
        <AddTable/>
        <Navigation/>
        {/* <Footer/> */}
       </div> 
    )
} 

export default Home