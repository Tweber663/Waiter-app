import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/pages/Home";
import TableDetails from "./components/views/TableDetails";
import NotFound from "./components/pages/NotFound";
import styles from './App.module.scss'
import Welcome from "./components/pages/Welcome";
import Orders from "./components/pages/Orders";
import Menu from "./components/pages/Menu";

const App = ()  => {

  return (

    <Container className={styles.cont}>
    <Router basename="/">
      <Route path="/" component={<Welcome />} />
      <Route path="/home" component={<Home />} />
      <Route path="/home/tables/:id" component={<TableDetails />} />
      <Route path="/orders" component={<Orders />} />
      <Route path="/menu" component={<Menu />} />
      <Route path="*" component={<NotFound />} />
    </Router>
  </Container>
  )
}



export default App;
