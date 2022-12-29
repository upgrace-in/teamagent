import { useEffect, useState } from "react"
import Chart, { controllers } from 'chart.js/auto';

export default function Home(props) {

    const [avgLoanAmt, setavgLoanAmt] = useState(0)
    const [totalTxn, settotalTxn] = useState(0)
    const [totalDebits, settotalDebits] = useState(0)
    const [closedTxn, setclosedTxn] = useState(0)

    // const ctx = document.getElementById('myChart');

    // useEffect(() => {

    //     new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
    //             datasets: [{
    //                 label: '# of Transactions',
    //                 data: [12, 19, 3, 5, 2],
    //                 borderWidth: 1,
    //                 backgroundColor: "rgb(73, 45, 126)"
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             plugins: {
    //                 legend: {
    //                     position: 'top',
    //                 },
    //                 title: {
    //                     display: true,
    //                     text: 'SALES PROGRESS'
    //                 }
    //             }
    //         },
    //     });

    // }, [ctx])

    useEffect(() => {
        /*
        Home: 
        1.Average of all closed loans 
        2.total transactions by year. 
        3.Total debits are all receipts they upload. The total amount 
        4.closed transactions are yearly closed. 
        5.sales progress graph, this is a yearly graphic showing transactions close per month. As they slid the dot the number of closed transaction will populate. 
        6.total should be the same as top total transactions. I put the wrong number should 9.
        */
        if (props.leadDatas !== undefined) {
            let totaltxn = 0
            let avgcount = 0
            let closedTxn = 0
            let avgLoanAmt = 0
            props.leadDatas.map(data => {
                
                // totalTxn: total transactions by year. 
                if (parseInt(data.createdon) === new Date().getFullYear()) {
                    if (data.transaction === 'CLOSED') {
                        // closedTxn: closed transactions are yearly closed
                        closedTxn++
                    }
                    totaltxn++
                }

                if (data.transaction === 'CLOSED') {
                    // avgLoanAmt: Average of all closed loans
                    avgcount++
                    avgLoanAmt = avgLoanAmt + parseInt(data.loanAmt)
                }
            });
            console.log(totaltxn, avgLoanAmt, avgcount, closedTxn)
            setavgLoanAmt(avgLoanAmt / avgcount)
            settotalTxn(totaltxn)
            setclosedTxn(closedTxn)
        }

        // totalDebits: total debits are all receipts they upload
        const receipts = props.fetchReceipts().then((val) => {
            console.log(val)
        })
    }, [props.leadDatas])

    return (
        <div className={props.formState === 'Home' ? 'show' : 'hide'}>
            <h1>Home</h1>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#835ea8' }}>
                        <h3>${avgLoanAmt}</h3>
                        <span>Average Loan Amount</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#492d7e' }}>
                        <h3>{totalTxn}</h3>
                        <span>Total Transactions</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#cbbedd' }}>
                        <h3>${totalDebits}</h3>
                        <span>Total Debits</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#a495c7' }}>
                        <h3>{closedTxn}</h3>
                        <span>Closed Transactions</span>
                    </div>
                </div>
            </div>
            <br />
            <div>
                <canvas id="myChart"></canvas>
            </div>
        </div>
    )
}