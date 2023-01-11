import React, { createRef, useState, SyntheticEvent } from 'react';
import './FlexInputMask.css';
export interface IPlaceHolderItem {
    text: string;
    isPersistant?: boolean;
    isVariableLength?: boolean;
    delimiterText?: string;
    regex?: string;
}

export interface IInputMaskProps {
    placeHolder: IPlaceHolderItem[];
    style?: any;
    customCssClass?: string;
    onChange?: (instance: FlexInputMask, newValue: string) => boolean;
    onSectionGotFocus?: (instance: FlexInputMask) => void;
    onSectionLostFocus?: (instance: FlexInputMask) => void;
}

interface IsymbolItem {
    charValue: string;
    changed: boolean;
}

interface IsectionValue {
    items: IsymbolItem[];
}

enum EditMode {
    replace = "replace",
    insert = "insert"
}

export interface IInputMaskState {
    focused: boolean;
    valueArray: IsectionValue[];
    sectionAlredyEdited: boolean[];
    selectedSectionIndex: number;
    selectedPositionStart: number;
    editMode: EditMode;
}

interface IMaskSymbolProps {
    parent: FlexInputMask;
    sectionIndex: number;
    position: number;
    value: IsymbolItem
}

function isFirstSectionSymbolChanged(event: any) {
    let result = event.target.parentElement.getElementsByClassName("fim-root__symbol")[0].className.includes("fim-root__symbol_edited");
    return result;
}

const MaskSymbol = (props: IMaskSymbolProps) => {
    let isFocused = props.parent.state.focused && props.parent.state.selectedSectionIndex == props.sectionIndex
        && props.parent.state.selectedPositionStart == props.position;
    let clStr = "fim-root__symbol"
    if (props.value.changed) {
        clStr += " fim-root__symbol_edited"
    }
    let valStr = props.value.charValue;
    if (isFocused && props.parent.state.editMode == EditMode.replace) {
        clStr += " fim-root__symbol_focusedReplace";
    }
    if (isFocused && props.parent.state.editMode == EditMode.insert) {
        clStr += " fim-root__symbol_focusedInsert";
    }
    if (valStr === " ") {
        clStr += " fim-root__symbol_emptyTerminated";
    }
    return (
        <div onBlur={(e: any) => {
            const [sectionIndex, position] = e.target.id.split("_");
            if (position > 0 && !isFirstSectionSymbolChanged(e)) {
                return;
            }
            props.parent.setSymbolAsChanged(props)
        }}
            id={props.sectionIndex + "_" + props.position}
            key={props.sectionIndex + "_" + props.position}
            className={clStr} >
            {valStr}
        </div>
    );
}


export class FlexInputMask extends React.PureComponent<IInputMaskProps, IInputMaskState>{
    rootRef: React.RefObject<HTMLDivElement>;
    sectionLengthArray: any[];
    notCommitedValueArray: any[] = [];
    constructor(props: IInputMaskProps) {
        super(props);
        let sectionsVal: IsectionValue[] = [];
        if (props.placeHolder) {
            sectionsVal = props.placeHolder.map((ph) => {
                let sitems: IsymbolItem[] = [];
                for (let i = 0; i < ph.text.length; i++) {
                    let newSitem: IsymbolItem = { charValue: ph.text.charAt(i), changed: false };
                    sitems.push(newSitem);
                }
                let newItem: IsectionValue = { items: sitems };
                return newItem;
            });
        }
        let currSectInd = props.placeHolder.findIndex(s => !s.isPersistant);
        this.state = {
            focused: false,
            editMode: EditMode.replace,
            valueArray: sectionsVal,
            sectionAlredyEdited: props.placeHolder.map(itm => false),
            selectedSectionIndex: 0,
            selectedPositionStart: 0
        }
        this.rootRef = createRef();
        this.sectionLengthArray = new Array(props.placeHolder.length);
    }

    componentDidUpdate(prevProps: Readonly<IInputMaskProps>, prevState: Readonly<IInputMaskState>, snapshot?: any): void {
        if (this.rootRef.current) {
            let currSectElm = this.rootRef.current.getElementsByClassName("fim-root__section")[this.state.selectedSectionIndex];
            let currSymbElm = currSectElm.getElementsByClassName("fim-root__symbol")[this.state.selectedPositionStart];
            let div = (currSymbElm as HTMLDivElement);
            //div.focus();
            console.log("didupdate", this.state.selectedPositionStart);
        }
    }

    getEditMode(sectionIndex = this.state.selectedSectionIndex, position = this.state.selectedPositionStart): EditMode {
        let section = this.state.valueArray[sectionIndex];
        let symb = section.items[position];
        let result = EditMode.replace;
        let allSymbolsChanged = section.items.every(itm => itm.changed);
        if (this.props.placeHolder[sectionIndex].isVariableLength && allSymbolsChanged) {
            result = EditMode.insert;
        }
        return result;
    }

    getFormattedValue(includeDelimiters: boolean = true) {
        let result = "";
        let sourceData = this.state.valueArray;
        if (this.notCommitedValueArray.length > 0) {
            sourceData = this.notCommitedValueArray;
        }
        this.props.placeHolder.forEach((ph, index) => {
            if (ph.isPersistant) {
                return;
            }
            if (includeDelimiters && ph.delimiterText) {
                result += sourceData[index] + ph.delimiterText;
            } else {
                result += sourceData[index];
            }
        });
        return result;
    }



    getNextEditableSectionIndex(currIndex: number) {
        let nextIndex = this.props.placeHolder.findIndex((itm, index) => {
            return (index > currIndex && !itm.isPersistant);
        })
        return nextIndex;
    }

    getPrevEditableSectionIndex(currIndex: number){
        for (let i=currIndex-1; i>=0;i--){
            let itm = this.props.placeHolder[i];
            if(!itm.isPersistant){
                return i;
            }
        }
        return -1;
    }

    getSelectedSection():IsectionValue{
        return this.state.valueArray[this.state.selectedSectionIndex];
    }

    gotoNextSection() {
        if (this.state.selectedSectionIndex < this.state.valueArray.length - 1) {
            let newSectionIndex = this.getNextEditableSectionIndex(this.state.selectedSectionIndex);
            if(newSectionIndex == -1){
                return;
            }
            let edMode = this.getEditMode(newSectionIndex,0);    
            let newValueArray = [...this.state.valueArray];
            newValueArray.forEach((sect, sectIndex) => sect.items.forEach((itm, itmIndex) => {
                if (sectIndex < newSectionIndex) {
                    itm.changed = true;
                }
            }));
            //newValueArray.forEach(sect=>{
            //    sect.items = sect.items.filter(itm=>itm.charValue!=" ");
            //});
            this.setState({ selectedSectionIndex: newSectionIndex,selectedPositionStart:0,editMode:edMode,valueArray:newValueArray });
        }    
    }

    gotoPrevSection(){
        if (this.state.selectedSectionIndex > 0) {
            let newSectionIndex = this.getPrevEditableSectionIndex(this.state.selectedSectionIndex);
            if(newSectionIndex == -1){
                return;
            }
            let newSection = this.state.valueArray[newSectionIndex];
            let edMode = this.getEditMode(newSectionIndex,0);    
            this.setState({ selectedSectionIndex: newSectionIndex,selectedPositionStart:newSection.items.length-1,editMode:edMode });
        }    
    }

 
    handleKeyboardInput(keyboardKey:string,e: SyntheticEvent|undefined = undefined ) {
        let section = this.state.valueArray[this.state.selectedSectionIndex];
        let prevSection:IsectionValue|null = null;
        let preventDefault = ()=>{
            if (e){
                e.preventDefault();
            }            
        }
        if(this.state.selectedSectionIndex>0){
            prevSection = this.state.valueArray[this.state.selectedSectionIndex-1];
        }
        let setPosition = (newPos:number)=>{
            let edMode = this.getEditMode(this.state.selectedSectionIndex,newPos);
            let newValArray = [...this.state.valueArray];
            newValArray.forEach((sect,sectIndex)=>sect.items.forEach((itm,itmIndex)=>{
                if(sectIndex<this.state.selectedSectionIndex){
                    itm.changed = true;
                }
                if(sectIndex==this.state.selectedSectionIndex && itmIndex<=newPos){
                    itm.changed = true;
                }
            }));
            this.setState({ selectedPositionStart: newPos, editMode:edMode, valueArray:newValArray });            
        };
        switch (keyboardKey) {
            case "End":
                preventDefault();
                setPosition(section.items.length - 1);
                return;
            case "Home":
                preventDefault();
                setPosition(0);
                return;
            case "ArrowLeft":
                if (this.state.selectedPositionStart > 0) {
                    setPosition(this.state.selectedPositionStart - 1)
                } else {
                    this.gotoPrevSection();
                }
                return;
            case "ArrowRight":
                if (this.state.selectedPositionStart < section.items.length - 1) {
                    setPosition(this.state.selectedPositionStart + 1)
                    console.log("right:",this.state.selectedPositionStart + 1);
                } else {
                    this.gotoNextSection();
                }
                return;
            case "Backspace":
                if(this.state.selectedPositionStart>0){
                    let newSectionItems = [...this.getSelectedSection().items];
                    newSectionItems.splice(this.state.selectedPositionStart-1,1);
                    let newValArray = [...this.state.valueArray];
                    newValArray[this.state.selectedSectionIndex].items = newSectionItems;
                    this.setState({selectedPositionStart:this.state.selectedPositionStart-1, valueArray:newValArray});
                }
                return;
            case "Delete":
            default:
                if(keyboardKey.length>1){
                    return;
                }
                this.setSymbolValue(keyboardKey);

        }
    }

    handleSectionGotFocus(event: any) {
        if (this.props.onSectionGotFocus) {
            this.props.onSectionGotFocus(this);
        }
        if (!event.target.id) {
            return;
        }
        let [sectionIndexStr, positionStr] = event.target.id.split("_");
        let sectionIndex = parseInt(sectionIndexStr);
        let sectionValue = this.state.valueArray[sectionIndex];

        let position = parseInt(positionStr);
        let allSymbolsUnchanged = !sectionValue.items.some(itm => itm.changed);
        let newValueArray = this.state.valueArray;
        if (allSymbolsUnchanged) {
            position = 0;
        } else {
            let firstNotChangedPosition = sectionValue.items.findIndex(itm => !itm.changed);
            if (firstNotChangedPosition > -1) {
                position = firstNotChangedPosition;
            }
        }
        if (sectionIndex > 0) {
            newValueArray = [...this.state.valueArray];
            newValueArray.forEach((sect, sectIndex) => sect.items.forEach((itm, itmIndex) => {
                if (sectIndex < sectionIndex) {
                    itm.changed = true;
                }
            }));
        }

        let newAlreadyEdited = [...this.state.sectionAlredyEdited];
        if (sectionIndex != this.state.selectedSectionIndex) {
            newAlreadyEdited[this.state.selectedSectionIndex] = true;
        }
        let edMode = this.getEditMode(sectionIndex, position);
        this.setState(
            {
                selectedSectionIndex: sectionIndex,
                selectedPositionStart: position,
                editMode: edMode,
                sectionAlredyEdited: newAlreadyEdited,
                valueArray: newValueArray
            });
        console.log("newPosition:", position);
    }

    handleSectionLostFocus(event: any) {
        return;
        let fireLostFocusEvent = () => {
            if (this.props.onSectionLostFocus) {
                this.props.onSectionLostFocus(this);
            }
        }
        fireLostFocusEvent();
        const [sectionIndex, position] = event.target.id.split("_");
        this.setState(
            {
                selectedSectionIndex: sectionIndex,
                selectedPositionStart: position,
            });
    }

    setSymbolAsChanged(symbProps: IMaskSymbolProps) {
        let newValueArray = [...this.state.valueArray];
        newValueArray[symbProps.sectionIndex].items[symbProps.position].changed = true;
        this.setState({ valueArray: newValueArray });
    }

    setSymbolValue(char: string) {
        if(this.props.placeHolder[this.state.selectedSectionIndex].delimiterText == char){
            this.gotoNextSection();
            return;
        }
        let oldSection = this.state.valueArray[this.state.selectedSectionIndex];
        let updSymb = { ...oldSection.items[this.state.selectedPositionStart] };
        let newPosition = this.state.selectedPositionStart + 1;
        let currEditMode = this.getEditMode();
        if (!updSymb.changed && newPosition < oldSection.items.length) {
            currEditMode = EditMode.replace;
        }
        let newSectionItems = [...oldSection.items];
        let newValueArray = [...this.state.valueArray];
        let emptyItm: IsymbolItem = { charValue: " ", changed: true };
        if(char=="l"){
            let s=1;
        }
        if (currEditMode == EditMode.replace) {
            updSymb.charValue = char;
            updSymb.changed = true;
            newSectionItems[this.state.selectedPositionStart] = updSymb;
            if (newPosition == oldSection.items.length) {
                currEditMode = EditMode.insert;
                newSectionItems.push(emptyItm);
            }
        } else {
            let newSymb: IsymbolItem = { charValue: char, changed: true };
            if (newPosition >= newSectionItems.length) {
                if (updSymb.charValue == " ") {
                    updSymb.charValue = char;
                    newSectionItems[this.state.selectedPositionStart] = updSymb;
                }
                newSectionItems.push(emptyItm);
            } else {
                newSectionItems.splice(this.state.selectedPositionStart, 0, newSymb);
            }
        }
        let newValueStr = "";
        newSectionItems.forEach(itm => newValueStr += itm.charValue);
        if (!this.validateChanges(this.state.selectedSectionIndex, newValueStr.trim())) {
            return;
        }
        newValueArray[this.state.selectedSectionIndex].items = newSectionItems;
        this.setState({ valueArray: newValueArray, selectedPositionStart: newPosition, editMode: currEditMode }, () => console.log("set:", this.state));
    }

    renderInputSection(ph: IPlaceHolderItem, sectionIndex: number) {
        let renderDelim = () => <div className='fim-root__delimiter' key="delimiter" >{ph.delimiterText}</div>;
        let symbolsJsx = [];
        let sectionValue = this.state.valueArray[sectionIndex];
        for (let i = 0; i < sectionValue.items.length; i++) {
            let symbItem = sectionValue.items[i];
            let newSymb = <MaskSymbol parent={this} sectionIndex={sectionIndex} position={i} value={symbItem} />
            symbolsJsx.push(newSymb);
        }
        symbolsJsx.push(renderDelim());
        return (
            <div className="fim-root__section" onClick={(e: any) => {
                this.handleSectionGotFocus(e);
            }} onBlur={(e: any) => {
                this.handleSectionLostFocus(e);
            }} >
                {symbolsJsx}
            </div>
        );
    }


    render() {
        let clsStr = "fim-root" + (this.props.customCssClass ? this.props.customCssClass : "");
        return (
            <div tabIndex={0} ref={this.rootRef} className={clsStr} style={this.props.style}
                onFocus={(e) => {
                    let firsInputSectionIndex = this.props.placeHolder.findIndex(itm => !itm.isPersistant);
                    this.setState({ focused: true, selectedSectionIndex: firsInputSectionIndex });
                }}
                onBlur={() => this.setState({ focused: false })}
                onKeyDown={(e) => {
                    this.handleKeyboardInput(e.key,e);
                }} >
                {this.props.placeHolder.map((itm, index) => {
                    return this.renderInputSection(itm, index);
                })}
            </div>
        );
    }

    validateChanges(sectionIndex: number, textToValidate: string): boolean {
        let regexStr = this.props.placeHolder[sectionIndex].regex;
        if (!regexStr) {
            return true;
        }
        let regex = new RegExp(regexStr);
        let rv = regex.test(textToValidate);
        if (!rv) {
            console.log(textToValidate, rv, this.state);
        }
        return rv;
    }
}

