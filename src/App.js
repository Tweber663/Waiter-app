import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/pages/Home";
import TableDetails from "./components/views/TableDetails";
import NotFound from "./components/pages/NotFound";
import styles from './App.module.scss'
import Welcome from "./components/pages/Welcome";

const App = ()  => {

  return (

    <Container className={styles.cont}>
     <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/tables/:id" element={<TableDetails/>} />
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </Container>
  )
}



export default App;
