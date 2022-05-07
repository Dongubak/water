export default function Tbody(props: { index: number, LC: number[] ,key: number, perTax: number, combine: number[][]}): JSX.Element {

    const data: string[] = ["B01", "B02", "101","102", "201", "202", "301", "302", "401", "402"];
    let add = (props.combine[2][1] - props.combine[2][0]) / 9 * props.perTax;

    return (
          <tr>
            <td>{data[props.index]}</td>
            <td>{ props.LC[0] }</td>
            <td>{ props.LC[1] }</td>
            <td>{ props.LC[1] - props.LC[0] }</td>
            <td>{ Math.ceil(props.perTax * (props.LC[1] - props.LC[0]) + add) }</td>
          </tr>
    )
}