import React from 'react';
import logo from './logo.svg';
import './App.css';
import {InputMask} from './InputMask';

function App() {
  return (
    <div className="App">
      <InputMask placeHolder={[
        {text:"email:",isPersistant:true},
        {text:"abc",delimiterText:"@",regex:"^[a-zA-Z0-9#!%$‘&+*–/=?^_`.{|}~]*$",isVariableLength:true},
        {text:"gmail",delimiterText:".",regex:"^[a-zA-Z0-9]*$",isVariableLength:true},
        {text:"com",regex:"^[a-zA-Z]*$",isVariableLength:true}
      ]} onChange={(instance)=>{
          console.log(instance.getFormattedValue());
          return true;
      }}/>
      <InputMask placeHolder={[
        {text:"phone number:(",isPersistant:true},
        {text:"555"},
        {text:")",isPersistant:true},
        {text:"221",delimiterText:"-"},
        {text:"215"},
      ]} />
    </div>
  );
}  

export default App;
