import Logout from "./Logout";
import User from "./User";
import Dashboard from "./Dashboard";
import $ from 'jquery';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  // const ENDPOINT = "https://teamapi.upgrace.in"
  const ENDPOINT = "http://localhost:7070"
  let sessionData = localStorage.getItem('session')
  if (sessionData != null) {
    // Clear the clicks

    $('.loggedIn').attr('href', '/dashboard')
    $('.loggedIn > p').html("Dashboard")

    $('.loginBtn').hide()
  }

  function calculator(loanAmount, creditDiv) {
    loanAmount.on('input', () => {
      if (loanAmount.val() !== '') {
        let credits = (parseInt(loanAmount.val()) * 0.35) / 100
        creditDiv.html('$' + credits.toFixed(2))
      } else {
        creditDiv.html('$0')
      }
    })
  }

  calculator($('.loanAmount'), $('.credits'))

  return (
    <Router>
      <div className="App">
      </div>
      <Routes>
        <Route exact path='/Logout' element={<Logout />}></Route>
        <Route exact path='/user' element={<User endpoint={ENDPOINT} session={sessionData} />}></Route>
        <Route exact path='/dashboard' element={<Dashboard calculator={calculator} endpoint={ENDPOINT} session={sessionData} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
