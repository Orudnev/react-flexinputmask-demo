import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {FlexInputMask} from './RFlexInputMask/index';
import {DemoEventsCommonUseCaseHtmlStr} from './codeSamples';

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

enum templaneEnum{
  email,
  phoneNumber,
  creditCard,
  eventsCommonUseCase,
  eventsCustomValidation
}



function getDescription(tmpl:templaneEnum){
  let htmlStr = "";
  switch(tmpl){
    case templaneEnum.email:
      htmlStr = '<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c2{color:#808080;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:10.5pt;font-family:"Courier New";font-style:normal}.c10{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c6{background-color:#1e1e1e;padding-top:0pt;padding-bottom:0pt;line-height:1.3571428571428572;orphans:2;widows:2;text-align:left}.c1{font-size:10.5pt;font-family:"Courier New";color:#9cdcfe;font-weight:400}.c9{font-size:10.5pt;font-family:"Courier New";color:#808080;font-weight:400}.c3{font-size:10.5pt;font-family:"Courier New";color:#ce9178;font-weight:400}.c8{font-size:10.5pt;font-family:"Courier New";color:#4ec9b0;font-weight:400}.c0{font-size:10.5pt;font-family:"Courier New";color:#d4d4d4;font-weight:400}.c4{font-size:10.5pt;font-family:"Courier New";color:#569cd6;font-weight:400}.c5{text-decoration:none;vertical-align:baseline;font-style:normal}.c7{background-color:#ffffff;max-width:936pt;padding:0pt 0pt 0pt 0pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c7 doc-content"><p class="c6"><span class="c0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c9">&lt;</span><span class="c8">FlexInputMask</span><span class="c0">&nbsp;</span><span class="c1">placeHolder</span><span class="c0">=</span><span class="c4">{</span><span class="c0 c5">[</span></p><p class="c6"><span class="c0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c1">text:</span><span class="c3">&quot;abc&quot;</span><span class="c0">,</span><span class="c1">delimiterText:</span><span class="c3">&quot;@&quot;</span><span class="c0">,</span><span class="c1">regex:</span><span class="c3">&quot;^[a-zA-Z0-9#!%$&lsquo;&amp;+*&ndash;/=?^_`.{|}~]*$&quot;</span><span class="c0">,</span><span class="c1">isVariableLength</span><span class="c1">:</span><span class="c4">true</span><span class="c0 c5">},</span></p><p class="c6"><span class="c0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c1">text:</span><span class="c3">&quot;gmail&quot;</span><span class="c0">,</span><span class="c1">delimiterText</span><span class="c1">:</span><span class="c3">&quot;.&quot;</span><span class="c0">,</span><span class="c1">regex:</span><span class="c3">&quot;^[a-zA-Z0-9]*$&quot;</span><span class="c0">,</span><span class="c1">isVariableLength</span><span class="c1">:</span><span class="c4">true</span><span class="c0 c5">},</span></p><p class="c6"><span class="c0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c1">text:</span><span class="c3">&quot;com&quot;</span><span class="c0">,</span><span class="c1">regex:</span><span class="c3">&quot;^[a-zA-Z]*&quot;</span><span class="c0">,</span><span class="c1">isVariableLength</span><span class="c1">:</span><span class="c4">true</span><span class="c0 c5">}</span></p><p class="c6"><span class="c0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</span><span class="c4">}</span><span class="c2">/&gt;</span></p><p class="c10"><span class="c4 c5"></span></p></body></html>';
      break;
    case templaneEnum.phoneNumber:
      htmlStr= '<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c1{color:#d4d4d4;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:10.5pt;font-family:"Courier New";font-style:normal}.c5{background-color:#1e1e1e;padding-top:0pt;padding-bottom:0pt;line-height:1.3571428571428572;orphans:2;widows:2;text-align:left}.c6{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c2{font-size:10.5pt;font-family:"Courier New";color:#d4d4d4;font-weight:400}.c8{font-size:10.5pt;font-family:"Courier New";color:#808080;font-weight:400}.c9{font-size:10.5pt;font-family:"Courier New";color:#4ec9b0;font-weight:400}.c3{font-size:10.5pt;font-family:"Courier New";color:#9cdcfe;font-weight:400}.c0{font-size:10.5pt;font-family:"Courier New";color:#ce9178;font-weight:400}.c4{font-size:10.5pt;font-family:"Courier New";color:#569cd6;font-weight:400}.c7{background-color:#ffffff;max-width:936pt;padding:0pt 0pt 0pt 0pt}.c10{text-decoration:none;vertical-align:baseline;font-style:normal}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c7 doc-content"><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c8">&lt;</span><span class="c9">FlexInputMask</span><span class="c2">&nbsp;</span><span class="c3">style</span><span class="c2">=</span><span class="c4">{</span><span class="c2">{</span><span class="c3">width:</span><span class="c0">&quot;250px&quot;</span><span class="c2">}</span><span class="c4">}</span><span class="c2">&nbsp;</span><span class="c3">placeHolder</span><span class="c2">=</span><span class="c4">{</span><span class="c1">[</span></p><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c3">text:</span><span class="c0">&quot;(&quot;</span><span class="c2">,</span><span class="c3">isPersistant:</span><span class="c4">true</span><span class="c1">},</span></p><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c3">text:</span><span class="c0">&quot;555&quot;</span><span class="c2">,</span><span class="c3">regex:</span><span class="c0">&quot;^[0-9]*$&quot;</span><span class="c1">},</span></p><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c3">text:</span><span class="c0">&quot;)&quot;</span><span class="c2">,</span><span class="c3">isPersistant:</span><span class="c4">true</span><span class="c2">,</span><span class="c3">regex:</span><span class="c0">&quot;^[0-9]*$&quot;</span><span class="c1">},</span></p><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c3">text:</span><span class="c0">&quot;221&quot;</span><span class="c2">,</span><span class="c3">delimiterText:</span><span class="c0">&quot;-&quot;</span><span class="c2">,</span><span class="c3">regex:</span><span class="c0">&quot;^[0-9]*$&quot;</span><span class="c1">},</span></p><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</span><span class="c3">text:</span><span class="c0">&quot;215&quot;</span><span class="c2">,</span><span class="c3">regex:</span><span class="c0">&quot;^[0-9]*$&quot;</span><span class="c1">},</span></p><p class="c5"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</span><span class="c4">}</span><span class="c2">&nbsp;</span><span class="c8 c10">/&gt;</span></p><p class="c6"><span class="c1"></span></p></body></html>';
      break;
    case templaneEnum.creditCard:
      htmlStr = '<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c10{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c6{background-color:#1e1e1e;padding-top:0pt;padding-bottom:0pt;line-height:1.3571428571428572;orphans:2;widows:2;text-align:left}.c5{font-size:10.5pt;font-family:"Courier New";color:#c586c0;font-weight:400}.c8{font-size:10.5pt;font-family:"Courier New";color:#4ec9b0;font-weight:400}.c9{font-size:10.5pt;font-family:"Courier New";color:#808080;font-weight:400}.c2{font-size:10.5pt;font-family:"Courier New";color:#569cd6;font-weight:400}.c0{font-size:10.5pt;font-family:"Courier New";color:#ce9178;font-weight:400}.c3{font-size:10.5pt;font-family:"Courier New";color:#d4d4d4;font-weight:400}.c1{font-size:10.5pt;font-family:"Courier New";color:#9cdcfe;font-weight:400}.c4{text-decoration:none;vertical-align:baseline;font-style:normal}.c7{background-color:#ffffff;max-width:936pt;padding:0pt 0pt 0pt 0pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c7 doc-content"><p class="c6"><span class="c3">&nbsp; </span><span class="c2">let</span><span class="c3">&nbsp;</span><span class="c1">section</span><span class="c3">&nbsp;= {</span><span class="c1">text:</span><span class="c0">&quot;1111&quot;</span><span class="c3">,</span><span class="c1">delimiterText:</span><span class="c0">&quot;-&quot;</span><span class="c3">,</span><span class="c1">regex:</span><span class="c0">&quot;^[0-9]*$&quot;</span><span class="c3 c4">};</span></p><p class="c6"><span class="c3">&nbsp; </span><span class="c5">return</span><span class="c3 c4">(</span></p><p class="c6"><span class="c3">&nbsp; &nbsp; </span><span class="c9">&lt;</span><span class="c8">FlexInputMask</span><span class="c3">&nbsp;</span><span class="c1">style</span><span class="c3">=</span><span class="c2">{</span><span class="c3">{</span><span class="c1">width:</span><span class="c0">&quot;300px&quot;</span><span class="c3">}</span><span class="c2">}</span><span class="c3">&nbsp;</span><span class="c1">placeHolder</span><span class="c3">=</span><span class="c2">{</span><span class="c3 c4">[</span></p><p class="c6"><span class="c3">&nbsp; &nbsp; &nbsp; {...</span><span class="c1">section</span><span class="c3 c4">},</span></p><p class="c6"><span class="c3">&nbsp; &nbsp; &nbsp; {...</span><span class="c1">section</span><span class="c3 c4">},</span></p><p class="c6"><span class="c3">&nbsp; &nbsp; &nbsp; {...</span><span class="c1">section</span><span class="c3 c4">},</span></p><p class="c6"><span class="c3">&nbsp; &nbsp; &nbsp; {...</span><span class="c1">section</span><span class="c3">,</span><span class="c1">delimiterText:</span><span class="c2">undefined</span><span class="c3 c4">}</span></p><p class="c6"><span class="c3">&nbsp; &nbsp; &nbsp; ]</span><span class="c2">}</span><span class="c3">&nbsp;</span><span class="c9">/&gt;</span><span class="c3 c4">&nbsp; </span></p><p class="c6"><span class="c3 c4">&nbsp; );</span></p><p class="c10"><span class="c3 c4"></span></p></body></html>';
      break;
    case templaneEnum.eventsCommonUseCase:
      htmlStr = DemoEventsCommonUseCaseHtmlStr;
      break;
    case templaneEnum.eventsCustomValidation:
      htmlStr = '<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c1{color:#d4d4d4;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:10.5pt;font-family:"Courier New";font-style:normal}.c4{background-color:#1e1e1e;padding-top:0pt;padding-bottom:0pt;line-height:1.3571428571428572;orphans:2;widows:2;text-align:left}.c10{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c2{font-size:10.5pt;font-family:"Courier New";color:#d4d4d4;font-weight:400}.c6{font-size:10.5pt;font-family:"Courier New";color:#569cd6;font-weight:400}.c9{font-size:10.5pt;font-family:"Courier New";color:#c586c0;font-weight:400}.c0{font-size:10.5pt;font-family:"Courier New";color:#9cdcfe;font-weight:400}.c8{font-size:10.5pt;font-family:"Courier New";color:#808080;font-weight:400}.c7{font-size:10.5pt;font-family:"Courier New";color:#dcdcaa;font-weight:400}.c3{font-size:10.5pt;font-family:"Courier New";color:#ce9178;font-weight:400}.c12{color:#6a9955;font-weight:400;font-size:10.5pt;font-family:"Courier New"}.c15{color:#000000;font-weight:400;font-size:11pt;font-family:"Arial"}.c13{font-size:10.5pt;font-family:"Courier New";color:#b5cea8;font-weight:400}.c14{font-size:10.5pt;font-family:"Courier New";color:#4ec9b0;font-weight:400}.c11{text-decoration:none;vertical-align:baseline;font-style:normal}.c5{background-color:#ffffff;max-width:936pt;padding:0pt 0pt 0pt 0pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c5 doc-content"><p class="c4"><span class="c6">const</span><span class="c2">&nbsp;</span><span class="c7">DemoEventsCustomValidation</span><span class="c2">&nbsp;= ()</span><span class="c6">=&gt;</span><span class="c1">{</span></p><p class="c4"><span class="c2">&nbsp; </span><span class="c6">let</span><span class="c2">&nbsp;</span><span class="c0">section</span><span class="c2">&nbsp;= {</span><span class="c0">text:</span><span class="c3">&quot;1111&quot;</span><span class="c2">,</span><span class="c0">delimiterText:</span><span class="c3">&quot;-&quot;</span><span class="c2">,</span><span class="c0">regex:</span><span class="c3">&quot;^[0-9]*$&quot;</span><span class="c1">};</span></p><p class="c4"><span class="c2">&nbsp; </span><span class="c9">return</span><span class="c1">&nbsp;(</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; </span><span class="c8">&lt;</span><span class="c14">FlexInputMask</span><span class="c2">&nbsp;</span><span class="c0">style</span><span class="c2">=</span><span class="c6">{</span><span class="c2">{</span><span class="c0">width:</span><span class="c3">&quot;300px&quot;</span><span class="c2">}</span><span class="c6 c11">}</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c0">onChange</span><span class="c2">&nbsp;= </span><span class="c6">{</span><span class="c2">(</span><span class="c0">instance</span><span class="c2">,</span><span class="c0">newValue</span><span class="c2">)</span><span class="c6">=&gt;</span><span class="c1">{</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c6">let</span><span class="c2">&nbsp;</span><span class="c0">sectionIndex</span><span class="c2">&nbsp;= </span><span class="c0">instance</span><span class="c2">.</span><span class="c0">state</span><span class="c2">.</span><span class="c0">currentPosition</span><span class="c2">.</span><span class="c0">sectionIndex</span><span class="c1">;</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c9">if</span><span class="c2">( </span><span class="c0">sectionIndex</span><span class="c2">!= </span><span class="c13">0</span><span class="c1">){</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c11 c12">//in is not 0 section, no need to validate</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c9">return</span><span class="c2">&nbsp;</span><span class="c6">true</span><span class="c1">;</span></p><p class="c4"><span class="c1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c9">return</span><span class="c2">&nbsp;(</span><span class="c0">newValue</span><span class="c2">&nbsp;!= </span><span class="c3">&quot;1234&quot;</span><span class="c1">);</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; }</span><span class="c6 c11">}</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c0">placeHolder</span><span class="c2">=</span><span class="c6">{</span><span class="c1">[</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; {...</span><span class="c0">section</span><span class="c1">},</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; {...</span><span class="c0">section</span><span class="c1">},</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; {...</span><span class="c0">section</span><span class="c1">},</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; {...</span><span class="c0">section</span><span class="c2">,</span><span class="c0">delimiterText:</span><span class="c6">undefined</span><span class="c1">}</span></p><p class="c4"><span class="c2">&nbsp; &nbsp; &nbsp; &nbsp; ]</span><span class="c6">}</span><span class="c2">&nbsp;</span><span class="c8">/&gt;</span><span class="c1">&nbsp; &nbsp; &nbsp; </span></p><p class="c4"><span class="c1">&nbsp; );</span></p><p class="c4"><span class="c1">};</span></p><p class="c10"><span class="c11 c15"></span></p></body></html>';  
      break;
    default:
  }
  return {__html: htmlStr};
}

function renderCreditCardDemo(){
  let section = {text:"1111",delimiterText:"-",regex:"^[0-9]*$"};
  return(
    <FlexInputMask style={{width:"300px"}} placeHolder={[
      {...section},
      {...section},
      {...section},
      {...section,delimiterText:undefined}
      ]} />  
  );
}

function renderTemplates(){
   return(
      <div>
        <h2>Email</h2>
        <div className='description'>Code example below creates a masked input allowing to enter an email address contained 3 sections of variable length:
          <ul>
            <li>local part (placeholder value is "abc")</li>
            <li>domain name section 1 (placeholder value is "gmail") </li>
            <li>domain name section 2 (placeholder value is "com") </li>
          </ul>
          Each section has symbol filter (based on regular expression) preventing illegal symblol input. Regexp filter of 1-st section 
          allows to enter alphabetic, number and some special characters, filters of the 2 and 3 sections allow to enter only alphabetic and number 
          symbols:
        </div>        
        <div style={{ overflowX: "auto"}} dangerouslySetInnerHTML={getDescription(templaneEnum.email)} ></div>
        <div className='live-demo-title'>Live Demo:</div>
        <FlexInputMask placeHolder={[
          {text:"abc",delimiterText:"@",regex:"^[a-zA-Z0-9#!%$‘&+*–/=?^_`.{|}~]*$",isVariableLength:true},
          {text:"gmail",delimiterText:".",regex:"^[a-zA-Z0-9]*$",isVariableLength:true},
          {text:"com",regex:"^[a-zA-Z]*",isVariableLength:true}
          ]}/>

        <h2 style={{marginTop:"30px"}}>Phone number</h2>
        <div className='description'>Code example below creates a masked input allowing to enter a phone number contained 5 sections 
            of fixed length. Sections 1 and 3 ("(" and ")") are not input-elements. They're used as delimiters that 
            will not be included to resulting value, the 2-nd section is used for entering area code and 4,5 sections are designed
            to entering symbols of phone number. Each section has symbol filter (based on regular expression) preventing illegal 
            symblols input. Regexp filters of sections 2,3,5 allows to enter only number symbols:
        </div>  
        <div style={{ overflowX: "auto"}} dangerouslySetInnerHTML={getDescription(templaneEnum.phoneNumber)} ></div>
        <div className='live-demo-title'>Live Demo:</div>
        <FlexInputMask style={{width:"250px"}} placeHolder={[
          {text:"(",isPersistant:true},
          {text:"555",regex:"^[0-9]*$"},
          {text:")",isPersistant:true,regex:"^[0-9]*$"},
          {text:"221",delimiterText:"-",regex:"^[0-9]*$"},
          {text:"215",regex:"^[0-9]*$"},
          ]} />
        <h2 style={{marginTop:"30px"}}>Credit card number</h2>
        <div className='description'>Code example below creates a masked input allowing to enter a credit card number:
        </div>  
        <div style={{ overflowX: "auto"}} dangerouslySetInnerHTML={getDescription(templaneEnum.creditCard)} ></div>
        <div className='live-demo-title'>Live Demo:</div>
        {renderCreditCardDemo()}
      </div>
   );
}

const DemoEventsCommonUseCase = ()=>{
  const [onSectionGotFocusValue,setOnSectionGotFocusValue] = useState("");
  const [onChangeValue,setOnChangeValue] = useState("");
  const [onSectionLostFocusValue,setOnSectionLostFocusValue] = useState("");
  let section = {text:"1111",delimiterText:"-",regex:"^[0-9]*$"};
  return (
    <> 
      <FlexInputMask style={{width:"300px"}} 
        onSectionGotFocus = {(instance)=>{
          setOnSectionGotFocusValue(
            " value with delimiters = "+instance.getFormattedValue()+" value w/o delimiters ="+instance.getFormattedValue(false));
        }}
        onChange = {(instance)=>{
          setOnChangeValue(
            " value with delimiters = "+instance.getFormattedValue()+" value w/o delimiters ="+instance.getFormattedValue(false));
          return true;
        }}
        onSectionLostFocus = {(instance)=>{
          setOnSectionLostFocusValue(
            " value with delimiters = "+instance.getFormattedValue()+" value w/o delimiters ="+instance.getFormattedValue(false));
        }}
        placeHolder={[
        {...section},
        {...section},
        {...section},
        {...section,delimiterText:undefined}
        ]} />      
      <div>
        <span style={{paddingRight:"10px"}}>onSectionGotFocus:</span>{onSectionGotFocusValue}
      </div>
      <div>
        <span style={{paddingRight:"10px"}}>onChange:</span>{onChangeValue}
      </div>
      <div>
        <span style={{paddingRight:"10px"}}>onSectionLostFocus:</span>{onSectionLostFocusValue}
      </div>
    </>
  )
}
 
const DemoEventsCustomValidation = ()=>{
  let section = {text:"1111",delimiterText:"-",regex:"^[0-9]*$"};
  return (
    <FlexInputMask style={{width:"300px"}} 
        onChange = {(instance,newValue)=>{
          let sectionIndex = instance.state.currentPosition.sectionIndex;
          if( sectionIndex!= 0){
            //in is not 0 section, no need to validate
            return true;
          } 
          return (newValue != "1234");
        }}
        placeHolder={[
        {...section},
        {...section},
        {...section},
        {...section,delimiterText:undefined}
        ]} />      
  );
};

function renderEvents(){
  return(
    <div>
      <h2>Events (demonstration of how events work )</h2>
      <div style={{ overflowX: "auto", background:"#1e1e1e"}} dangerouslySetInnerHTML={getDescription(templaneEnum.eventsCommonUseCase)} ></div> 
      <div className='live-demo-title'>Live Demo:</div>
      <DemoEventsCommonUseCase />
      <h2>Using onChange event for validate user input using custom function</h2>
      <div className='description'>
          If you return "false" from onChange event handler the input of new character would be blocked. 
          The example below demonstrate how to prevent input "1234" into the section[0] of the credit card input:
      </div>
      <div style={{ overflowX: "auto"}} dangerouslySetInnerHTML={getDescription(templaneEnum.eventsCustomValidation)} ></div> 
      <div className='live-demo-title'>Live Demo:</div>
      <DemoEventsCustomValidation />
    </div>    
  );
}


const TabContent = (props:ITabContentProps)=>{
  let tabjsx =<div/>;
  switch(props.activeTabName){
    case TabEnum.Templates:
      tabjsx = renderTemplates();
      break;
    case TabEnum.Events:
      tabjsx = renderEvents();
      break;      
  }
  if (props.activeTabName == TabEnum.Templates){
    tabjsx = renderTemplates();
  }
  return(
    <div className="tab-content" >
      {tabjsx}
    </div>
  )
}

//<TabButton caption={TabEnum.Style} isActive={activeTabName == TabEnum.Style} onClick={()=>onBtnClick(TabEnum.Style)} />
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
        {text:"(",isPersistant:true},
        {text:"555",regex:"^[0-9]*$"},
        {text:")",isPersistant:true,regex:"^[0-9]*$"},
        {text:"221",delimiterText:"-",regex:"^[0-9]*$"},
        {text:"215",regex:"^[0-9]*$"},
      ]} />
    </div>
  );
}  

export default App;
