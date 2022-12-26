import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';

export default function Home(props) {

    const ctx = document.getElementById('myChart');

    useEffect(() => {

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
                datasets: [{
                    label: '# of Transactions',
                    data: [12, 19, 3, 5, 2],
                    borderWidth: 1,
                    backgroundColor: "rgb(73, 45, 126)"
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'SALES PROGRESS'
                    }
                }
            },
        });
        
    }, [ctx])

    return (
        <div className={props.formState === 'Home' ? 'show' : 'hide'}>
            <h1>Home</h1>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#835ea8' }}>
                        <h3>$535,000</h3>
                        <span>Average Loan Amount</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#492d7e' }}>
                        <h3>09</h3>
                        <span>Total Transactions</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#cbbedd' }}>
                        <h3>$1023.76</h3>
                        <span>Total Debits</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="conw wc" style={{ background: '#a495c7' }}>
                        <h3>07</h3>
                        <span>Closed Transactions</span>
                    </div>
                </div>
            </div>
            <br/>
            <div>
                <canvas id="myChart"></canvas>
            </div>
        </div>
    )
}