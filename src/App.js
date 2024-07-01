import { Routes, Switch, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Home from "./components/pages/Home";
import TableDetails from "./components/views/TableDetails";
import NotFound from "./components/pages/NotFound";
import styles from './App.module.scss'
import Welcome from "./components/pages/Welcome";
import Orders from "./components/pages/Orders";
import Menu from "./components/pages/Menu";

const App = ()  => {
  console.log('bla')
  return (
    <Container className={styles.cont}>
      <Switch>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/tables/:id" element={<TableDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/*" element={<NotFound />} />
      </Switch>
  </Container>
  )
}



export default App;
