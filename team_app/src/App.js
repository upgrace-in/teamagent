import SubmitSocialMediaForm from "./subComp/SubmitSocialMediaForm";
import Dashboard from "./Dashboard";
import UserForm from "./subComp/UserForm";
import $ from 'jquery';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {

  useEffect(() => {
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
  }, [])

  return (
    <Router>
      <div className="App">
        <UserForm />
      </div>
      <Routes>
        <Route exact path='/SubmitSocialMediaForm' element={<SubmitSocialMediaForm />}></Route>
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
