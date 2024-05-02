import { Navbar } from "react-bootstrap"
import {Container} from "react-bootstrap"
import styles from './NavBar.module.scss'

const NavBar = () => {
    
    
    return (
      <Navbar className={styles.corners} bg="primary" data-bs-theme="dark">
       <Container>
          <Navbar.Brand>Waiter.app</Navbar.Brand>
           <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <a className={styles.home} href="/">Home</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar