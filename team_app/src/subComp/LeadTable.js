export default function LeadTable(props) {
    return (
        <tr>
            <th scope="row">{props.count}</th>
            <td>{props.leadname}</td>
            <td>{props.leadamt}</td>
            <td style={{ fontWeight: "700", color: props.leadstatus === 'Approved' ? 'green' : 'red' }}>{props.leadstatus}</td>
        </tr>
    )
}