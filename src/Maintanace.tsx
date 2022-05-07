import {Table} from 'react-bootstrap';
import React from 'react';
export default function Maintanace(props: { LC: number[][], setLast: React.Dispatch<React.SetStateAction<number[]>>, current: number[], tax:number, setTax: React.Dispatch<React.SetStateAction<number>>, setCurrent: React.Dispatch<React.SetStateAction<number[]>>, combine:number[][] }) {     
    
    return(
        <div>
            <h2>수정페이지</h2>
            <label>수도요금입력</label><input style={{ width: '60px' }}value={ props.tax } onChange={ (e) => {props.setTax(Number(e.target.value))} }></input>
            <button onClick={ () => {
                props.setLast([...props.current]);
            } }>당월➡전월</button>
            <Table striped bordered hover size="sm">
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
                  props.combine.map( (e, i) => <TbodyF key={ i } index={i} LC={ e } arr = { props.LC } setCurrent={ props.setCurrent } current={props.current} combine={props.combine}></TbodyF>
                  )
                }
              </tbody>
            </Table>
        </div>       
    )
}

function TbodyF(props: { index: number, LC: number[] ,key: number, arr: number[][], setCurrent: React.Dispatch<React.SetStateAction<number[]>>, current: number[], combine: number[][] }): JSX.Element {

    const data: string[] = ["B01", "B02", "101", "102", "201", "202", "301", "302", "401", "402"];

    return (
          <tr>
            <td>{data[props.index]}</td>
            <td>{ props.LC[0] }</td>
            <td>
                <input style={{ width: "45px" }}value={ props.combine[props.index][1] } onChange={ (e) => {
                    let copy = [...props.current];
                    copy[props.index] = Number(e.target.value);
                    props.setCurrent(copy);
                } }></input>
            </td>
            <td>{ props.LC[1] - props.LC[0] }</td>
          </tr>
    )
}