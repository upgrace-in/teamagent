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
  let sessionData = JSON.parse(localStorage.getItem('session'))
  if (sessionData != null) {
    // Clear the clicks

    $('.loggedIn').attr('href', '/dashboard')
    $('.loggedIn > p').html("Dashboard")

    $('.loginBtn').hide()
  }

  function checkUserExists(session) {
    fetch(ENDPOINT + '/checkUserExists?emailAddress=' + session['emailAddress'], {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    }).then(function (response) {
      return response.json()
    }).then(function (val) {
      if (val['msg'] === false) {
        // logout
        window.location.href = '/logout'
      } else {
        // update the session
        localStorage.setItem("session", JSON.stringify(val['data'][0]))
        $('.username').text(val['data'][0]['name']);
      }
    });
  }

  function calculator(loanAmount, creditDiv) {
    loanAmount.on('input', () => {
      if (loanAmount.val() !== '') {
        let credits = (parseInt(loanAmount.val()) * 0.30) / 100
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
        <Route exact path='/dashboard' element={<Dashboard calculator={calculator} endpoint={ENDPOINT} session={sessionData} checkUserExists={checkUserExists} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
