import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {FlexInputMask} from './RFlexInputMask/index';


interface ITabButtonProps {
  caption:string;
  isActive?:boolean;
  onClick:()=>void;
}

const TabButton = (props:ITabButtonProps) => {
  let cls = "tab-button";
  if(props.isActive){
    cls = "tab-button-active";
  }
  return (<div className={cls} onClick={()=>{
    if(props.onClick){
      props.onClick();
    }
  }}>{props.caption}</div>);
};

enum TabEnum{
  Templates="Templates",
  Events="Events",
  Style="Style"
}

interface ITabContentProps{
  activeTabName:TabEnum
}

function getText1(){
  let s="<pre>\n"+
" <code id=\"htmlViewer\" style=\"color:rgb(171, 178, 191); font-weight:400;background-color:rgb(40, 44, 52);background:rgb(40, 44, 52);display:block;padding: .5em;\">&lt;FlexInputMask placeHolder={[\n"+
" {text:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;email:&quot;</span>,isPersistant:<span style=\"color:rgb(86, 182, 194); font-weight:400;\">true</span>},\n"+
" {text:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;abc&quot;</span>,delimiterText:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;@&quot;</span>,regex:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;^[a-zA-Z0-9#!%$\u2018&amp;+*\u2013/=?^_`.{|}~]*$&quot;</span>,isVariableLength:<span style=\"color:rgb(86, 182, 194); font-weight:400;\">true</span>},\n"+
" {text:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;gmail&quot;</span>,delimiterText:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;.&quot;</span>,regex:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;^[a-zA-Z0-9]*$&quot;</span>,isVariableLength:<span style=\"color:rgb(86, 182, 194); font-weight:400;\">true</span>},\n"+
" {text:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;com&quot;</span>,regex:<span style=\"color:rgb(152, 195, 121); font-weight:400;\">&quot;^[a-zA-Z]*&quot;</span>,isVariableLength:<span style=\"color:rgb(86, 182, 194); font-weight:400;\">true</span>}\n"+
" ]} \n"+
" /&gt;</code>\n"+
"</pre>";

  return {__html: s};
}

function renderTemplates(){
   return(
      <div>
        <h3>Email</h3>
        <div style={{background: "rgb(40, 44, 52)", overflowX: "auto"}} dangerouslySetInnerHTML={getText1()} ></div>
        <FlexInputMask placeHolder={[
        {text:"email:",isPersistant:true},
        {text:"abc",delimiterText:"@",regex:"^[a-zA-Z0-9#!%$‘&+*–/=?^_`.{|}~]*$",isVariableLength:true},
        {text:"gmail",delimiterText:".",regex:"^[a-zA-Z0-9]*$",isVariableLength:true},
        {text:"com",regex:"^[a-zA-Z]*",isVariableLength:true}
        ]}/>
      </div>
   );
}


const TabContent = (props:ITabContentProps)=>{
  let tabjsx =<div/>;
  if (props.activeTabName == TabEnum.Templates){
    tabjsx = renderTemplates();
  }
  return(
    <div className="tab-content" >
      {tabjsx}
    </div>
  )
}





function App() {
  const [activeTabName,setActiveTab] = useState(TabEnum.Templates);
  let onBtnClick = (caption:TabEnum)=>{
    setActiveTab(caption);
  }
    return(
    <div className='page'>
      <div className='wrapper'>
        <div className='title'>react-flexinput-mask Demos</div>
        <div className='buttonContainer'>
          <TabButton caption={TabEnum.Templates} isActive={activeTabName == TabEnum.Templates} onClick={()=>onBtnClick(TabEnum.Templates)} />
          <TabButton caption={TabEnum.Events} isActive={activeTabName == TabEnum.Events} onClick={()=>onBtnClick(TabEnum.Events)} />
          <TabButton caption={TabEnum.Style} isActive={activeTabName == TabEnum.Style} onClick={()=>onBtnClick(TabEnum.Style)} />
        </div>
        <TabContent activeTabName={activeTabName} />
      </div>
    </div>
  );
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
