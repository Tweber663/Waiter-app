import { useDispatch } from "react-redux";
import { gettingTables } from "./redux/tableRedux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchingTables } from "./redux/tableRedux";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/pages/Home";
import TableDetails from "./components/views/TableDetails";
import NotFound from "./components/pages/NotFound";

const App = ()  => {

  return (
    <Container>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tables/:id" element={<TableDetails/>} />
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </Container>
  )
}



export default App;
