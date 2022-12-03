import SubmitSocialMediaForm from "./subComp/SubmitSocialMediaForm";
import UserForm from "./subComp/UserForm";
import $ from 'jquery';
import {useEffect} from 'react';

function App() {

  useEffect(() => {
    let loadAmount = $('#loanAmount')
    let creditDiv = $('#credits')

    loadAmount.on('input', () => {
      if(loadAmount.val() !== ''){
        let credits = (parseInt(loadAmount.val()) * 0.35)/100
        creditDiv.html('$'+credits.toFixed(2))
      }else{
        creditDiv.html('$0')
      }
    })
  }, [])

  return (
    <div className="App">
      <UserForm />
    </div>
  );
}

export default App;
