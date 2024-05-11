import NavBar from "../common/NavBar"
import Tables from "../views/Tables"
import styles from './Home.module.scss'
import Footer from "../common/Footer"
import TableError from "../views/TableError"
import AddTable from "../views/AddTable"
const Home = () => {

    return (
       <div>
        <TableError/>
        <NavBar/>
        <h1>All Tables</h1>
        <Tables/>
        <AddTable/>
        <Footer/>
       </div> 
    )
} 

export default Home