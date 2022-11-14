import React from 'react';
import {FlexInputMask} from 'react-flexinput-mask/index';
import './custom.css';

function App() {
    return (
    //@ts-ignore
    <FlexInputMask customCssClass="custom-flex-input-mask1" placeHolder={[      
      {text:"abc",delimiterText:"@",regex:"^[a-zA-Z0-9#!%$‘&+*–/=^_~]*$",isVariableLength:true},
      {text:"gmail",delimiterText:".",regex:"^[a-zA-Z0-9]*$",isVariableLength:true},
      {text:"com",regex:"^[a-zA-Z]*",isVariableLength:true}
     ]}/>);
}
