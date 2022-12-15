import Dashboard from "./Dashboard";
import Logout from "./Logout";
import User from "./User";
import $ from 'jquery';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  const ENDPOINT = "http://localhost:9000"
  let sessionData = localStorage.getItem('session')
  if (sessionData != null) {
    // Clear the clicks

    $('.loggedIn').attr('href', '/dashboard')
    $('.loggedIn > p').html("Dashboard")

    $('.loginBtn').hide()
  }

  let loadAmount = $('#loanAmount')
  let creditDiv = $('#credits')

  loadAmount.on('input', () => {
    if (loadAmount.val() !== '') {
      let credits = (parseInt(loadAmount.val()) * 0.35) / 100
      creditDiv.html('$' + credits.toFixed(2))
    } else {
      creditDiv.html('$0')
    }
  })

  return (
    <Router>
      <div className="App">
      </div>
      <Routes>
        <Route exact path='/Logout' element={<Logout />}></Route>
        <Route exact path='/user' element={<User endpoint={ENDPOINT} session={sessionData} />}></Route>
        <Route exact path='/dashboard' element={<Dashboard endpoint={ENDPOINT} session={sessionData} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
