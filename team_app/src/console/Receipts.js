export default function Receipts(props) {
    return (
        <tr>
            <th scope="row">{props.uid}</th>
            <td>{props.leadUID}</td>
            <td>{props.emailAddress}</td>
            <td><a target="_blank" href={props.endpoint + '/' +props.imageFile}>Click to view</a></td>
            <td>${props.inputRecAmt}</td>
            <td>{props.inputtxnAdd}</td>           
        </tr>
    )
}