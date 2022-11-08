import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FlexInputMask} from './RFlexInputMask/index';

function App() {
  return ( 
    <div className="App">
      <FlexInputMask placeHolder={[
        {text:"email:",isPersistant:true},
        {text:"abc",delimiterText:"@",regex:"^[a-zA-Z0-9#!%$‘&+*–/=?^_`.{|}~]*$",isVariableLength:true},
        {text:"gmail",delimiterText:".",regex:"^[a-zA-Z0-9]*$",isVariableLength:true},
        {text:"com",regex:"^[a-zA-Z]*",isVariableLength:true}
      ]} onChange={(instance)=>{
          console.log(instance.getFormattedValue());
          return true;
      }}/>
      <FlexInputMask placeHolder={[
        {text:"phone number:(",isPersistant:true},
        {text:"555",regex:"^[0-9]*$"},
        {text:")",isPersistant:true,regex:"^[0-9]*$"},
        {text:"221",delimiterText:"-",regex:"^[0-9]*$"},
        {text:"215",regex:"^[0-9]*$"},
      ]} />
    </div>
  );
}  

export default App;
