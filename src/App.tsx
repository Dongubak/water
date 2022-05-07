import { useState } from 'react';
import './App.css';
import { Navbar, Container, Nav, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Tbody from './Tbody';
import {Route, Routes} from 'react-router-dom';
import Maintanace from './Maintanace';

const data = {
  lastMonth: [
      4529,
      5628,
      0,
      2708,
      8023,
      4954,
      4164,
      4072,
      4659,
      3883 ],
  currentMonth : [
      4535,
      5651,
      18,
      2726,
      8048,
      4972,
      4181,
      4091,
      4682,
      3890
      ]
}


function App() {
  let [last, setLast] = useState<number[]>(data.lastMonth);
  let [current, setCurrent] = useState<number[]>(data.currentMonth);
  let [LC, setLC] = useState<number[][]>(last.map((e, i) => [e, current[i]]));
  let combine = last.map((e, i) => [e, current[i]]);
  let [tax, setTax] = useState<number>(232080);
  let navigate = useNavigate();


  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={ () => navigate('/')}>수도요금</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => navigate('./fix') }>수도요금 수정</Nav.Link>
            <Nav.Link href="#features">수동요금 공지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/fix' element={ <Maintanace LC={ LC } setLast={setLast} current={current} tax={tax} setTax={setTax} setCurrent={setCurrent} combine={combine}></Maintanace> }>
        </Route>
        <Route path='/' element={ <Tables combine={combine} tax={tax}></Tables> }>
          {/* <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>전월</th>
                <th>당월</th>
                <th>사용량</th>
              </tr>
            </thead>
            <tbody>
              {
                LC.map( (e, i) => <Tbody key={ i } index={i} LC={ e }></Tbody>
                )
              }
            </tbody>
          </Table> */}
        </Route>
      </Routes>
    </div>
  );
}
function Tables(props: { combine: number[][], tax:number}) {
  let perTax = props.tax / props.combine.map( (e) => e[1] - e[0]).reduce( (acc, cur) => acc + cur);

  return (
    <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>전월</th>
                  <th>당월</th>
                  <th>사용량</th>
                  <th>요금</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.combine.map( (e, i) => <Tbody key={ i } index={i} LC={ e } perTax={perTax} combine={props.combine}></Tbody>
                  )
                }
              </tbody>
            </Table>
  )
}

export default App;
