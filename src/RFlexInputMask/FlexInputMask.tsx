import React from 'react';
import './FlexInputMask.css';
export interface IPlaceHolderItem {
    text: string;
    isPersistant?: boolean;
    isVariableLength?:boolean;
    delimiterText?: string;
    regex?:string;
}

export interface IInputMaskProps {
    placeHolder: IPlaceHolderItem[]; 
    onChange?:(instance:FlexInputMask)=>boolean;   
}

interface inputMaskPosition {
    sectionIndex: number;
    position: number;
}

export interface IInputMaskState {
    currentPosition: inputMaskPosition;
    valueArray: any[];
    sectionAlredyEdited: boolean[];
}

export class FlexInputMask extends React.Component<IInputMaskProps, IInputMaskState>{
    sectRefs: any[] = [];
    initValueArray: any[];
    sectionLengthArray: any[];
    notCommitedValueArray:any[]=[];
    constructor(props: IInputMaskProps) {
        super(props);
        let val: any = [];
        if (props.placeHolder) {
            val = props.placeHolder.map((itm) => {
                return itm.text;
            });
        }
        let currSectInd = props.placeHolder.findIndex(s => !s.isPersistant);
        this.state = {
            currentPosition: { sectionIndex: currSectInd, position: 0 },
            valueArray: val,
            sectionAlredyEdited:props.placeHolder.map(itm=>false)
        }
        this.initValueArray = val;

        this.sectRefs = new Array(props.placeHolder.length);
        this.sectRefs.forEach(itm => itm = React.createRef());
        this.sectionLengthArray = new Array(props.placeHolder.length);
    }

    componentDidUpdate() {
        let ref = this.sectRefs[this.state.currentPosition.sectionIndex];
        if (ref) {
            ref.focus();
            this.setPositionInCurrentSection(this.state.currentPosition.position);
        }
    }

    getFormattedValue(includeDelimiters:boolean = true){
        let result = "";
        let sourceData = this.state.valueArray;
        if(this.notCommitedValueArray.length>0){
            sourceData = this.notCommitedValueArray;
        }
        this.props.placeHolder.forEach((ph,index)=>{
            if(ph.isPersistant){
                return;
            }
            if(includeDelimiters && ph.delimiterText){
                result+=sourceData[index]+ph.delimiterText;
            } else {
                result+= sourceData[index];
            }
        });
        return result;
    }

    getPositionInCurrentSection(){
        let sel = window.getSelection();
        let pos = 0;
        if (sel) {
            pos = sel.focusOffset;
        }
        return pos;
    }

    setPositionInCurrentSection(pos:number){
        if(pos<0){
            return;
        } 
        let ref = this.sectRefs[this.state.currentPosition.sectionIndex];
        if (ref) {
            let range = document.createRange()
            let sel = window.getSelection()
            if(ref.childNodes.length>0){
                range.setStart(ref.childNodes[0], pos);
                range.collapse(true);
                if (sel) {
                    sel.removeAllRanges();
                    sel.addRange(range);
                }    
            }
        }
    }

    getNextEditableSectionIndex(currIndex:number){
        let nextIndex = this.props.placeHolder.findIndex((itm,index)=>{
            return (index>currIndex && !itm.isPersistant);
        })
        return nextIndex;
    }
    
    gotoNextSection(currIndex:number,doNotCycle:boolean=false){
        let nextIndex =  this.getNextEditableSectionIndex(currIndex);
        if(nextIndex != -1){
            this.setState({currentPosition:{sectionIndex:nextIndex,position:0}});  
        } else {
            if(doNotCycle){
                return;
            }
            let firstEditableSectIndex = this.props.placeHolder.findIndex(itm=>!itm.isPersistant);
            if(firstEditableSectIndex != -1){
                this.sectRefs[firstEditableSectIndex].focus();
            }
        }
    }

    handleSectionChange(event: any, index: number) {
        let newValue:string = event.target.textContent;
        let currSection = this.props.placeHolder[index];
        let delim = currSection.delimiterText;
        if(delim && newValue.includes(delim)){ 
            //delimiter detected, do not add delimiter symbol to current section, go to next section           
            event.target.textContent = this.state.valueArray[index];            
            this.gotoNextSection(index);
            return;
        }

        let rollbackChanges = ()=>{
            //do not store new added symbol, restore previous cursor position
            let pos = this.getPositionInCurrentSection();
            event.target.textContent = this.state.valueArray[index];   
            this.setPositionInCurrentSection(pos-1);            
        };

        let customValidation = ()=>{
            if (this.props.onChange){
                let result = this.props.onChange(this);
                if(!result){
                    rollbackChanges();
                }
                return result;
            }
            return true;
        }

        if(newValue && !this.validateChanges(index,newValue)){
            //validation using regexp failed
            rollbackChanges(); 
            return;
        }
        
        let newArray = [...this.state.valueArray];
        newArray[index] = newValue;
        this.notCommitedValueArray = [...newArray];
        let pos = this.getPositionInCurrentSection();
        if (!currSection.isVariableLength && newValue.length>this.initValueArray[index].length){
            //section length limit is reached, replace new symbol over the old one
            let newSymbol = newValue.substring(pos-1,pos);
            newValue = this.state.valueArray[index].substring(0,pos-1)+newSymbol+this.state.valueArray[index].substring(pos);
            newValue = newValue.substring(0,this.initValueArray[index].length);            
            event.target.textContent=newValue;  
            newArray[index] = newValue;
            this.notCommitedValueArray = [...newArray];
            if(!customValidation()){
                return;
            }
            if(pos>=this.initValueArray[index].length){
                this.setState({ valueArray: newArray});
                this.gotoNextSection(index,true);    
                return;    
            }         
            this.setState({ valueArray: newArray, currentPosition: { sectionIndex: index, position: pos } });
            this.notCommitedValueArray = [];
            return;
        }
        if(event.target.getElementsByTagName("div").length==0){
            if(!customValidation()){
                return;
            }
            this.setState({ valueArray: newArray, currentPosition: { sectionIndex: index, position: pos } });
            if(!currSection.isVariableLength && newValue.length == this.initValueArray[index].length){
                this.gotoNextSection(index,true);
            }
        } else {
            //"Enter" pressed
            event.target.removeChild(event.target.getElementsByTagName("div")[0]);
            event.target.textContent=newValue;            
            this.gotoNextSection(index);
        }     
    }



    handleSectionGotFocus(event: any, index: number){   
        let prevIndex = this.state.currentPosition.sectionIndex;
        let newPos = this.state.currentPosition.position;
        if(index > prevIndex){
            newPos = 0;
        }
        if(index < prevIndex){
            newPos = this.initValueArray[index].length;
        }
       
        this.sectionLengthArray[index] = this.sectRefs[index].clientWidth; 
        if(!this.state.sectionAlredyEdited[index]){
            let aeArr = [...this.state.sectionAlredyEdited];
            aeArr[index] = true;
            let vArr = [...this.state.valueArray];
            vArr[index] = "";
            this.setState({sectionAlredyEdited:aeArr,valueArray:vArr,currentPosition:{sectionIndex:index,position:newPos}});
            return;
        } 
        if(this.state.currentPosition.sectionIndex != index){
            this.setState({currentPosition:{sectionIndex:index,position:newPos}});
        }
    }

    handleSectionLostFocus(event:any,index: number){
       if(!this.state.valueArray[index]){
           let newArr = [...this.state.valueArray];
           newArr[index] = this.initValueArray[index];
           setTimeout(() => {
            this.setState({valueArray:newArr});               
           }, 200); 
       }
    }

    renderInputSection(ph: IPlaceHolderItem, index: number) {
        let classStr = "section";
        if(ph.isPersistant){
            classStr += " persistant";
        } else {
            if(this.state.sectionAlredyEdited[index]){
                classStr += " inputEdited";
            } else {
                classStr += " input";
            }                
        }

        let sectionStyle={width:"auto"};
        if(this.sectionLengthArray[index] &&  !this.state.valueArray[index]){
            sectionStyle.width= this.sectionLengthArray[index]+"px";
        }

        let section =
            <div suppressContentEditableWarning={true}
                key={index}
                ref={(el) => {
                    //@ts-ignore
                    this.sectRefs[index] = el;
                }}
                className={classStr}
                style={sectionStyle}
                contentEditable={!ph.isPersistant}
                onInput={e => this.handleSectionChange(e, index)}
                onFocus={e =>{this.handleSectionGotFocus(e, index)}}
                onBlur={e =>{this.handleSectionLostFocus(e, index)}}
            >
                {this.state.valueArray[index]}
            </div>
        let delim = undefined;
        if (ph.delimiterText) {
            delim =
                <div key={"delim"+index} className="section delimiter">
                    {ph.delimiterText}
                </div>
        }
        if(!delim){
            return section;
        }
        return [section,delim];
    }

    render() {
        return (
            <div className="flex-input-mask">
                {this.props.placeHolder.map((itm, index) => {
                    return this.renderInputSection(itm, index);
                })}
            </div>
        );
    }

    validateChanges(index:number,textToValidate:string):boolean{
        let regexStr = this.props.placeHolder[index].regex;
        if(!regexStr){
            return true;
        }
        let regex = new RegExp(regexStr);
        let rv = regex.test(textToValidate);
        return rv;
    }


}

