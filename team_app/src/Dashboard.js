import { useEffect } from "react"
import $ from 'jquery'

export default function Dashboard() {

    useEffect(() => {
        let sessionData = localStorage.getItem('session')
        if (sessionData == null) {
            window.location.href = '/'
        } else {
            alert("Welcome " + JSON.parse(sessionData)['emailAddress'])
        }
        $('.hide_it').hide()
    }, [''])

    return (
        <>
            <h1>Dashboard Coming Soon...</h1>
        </>

    )
}