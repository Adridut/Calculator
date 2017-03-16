// @flow

import React, {Component} from 'react';
import {Text, AppRegistry, View} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+'],
    ['C', 'CE']
];

class ReactCalculator extends Component {

    state: {
        previousInputValue: string,
        inputValue: string,
        lastInput: string,
        actualValue: string,
        result: number,
        selectedSymbol: string
    }

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            actualValue: 0,
            result: 0,
            selectedSymbol: '',
            inputs: new Array,
            count : -1
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                    <Text style={Style.displayResult}>{this.state.result}</Text>
                </View>
                <View style={Style.inputContainer}>{this._renderInputButton()}</View>
            </View>
        )
    }

    _renderInputButton() {
        let views = [];
        for (var r = 0; r < inputButtons.length; r++) {
            let row = inputButtons[r];
            let inputRow = [];

            for (var i = 0; i < row.length; i++) {
                let input = row[i];

                inputRow.push(<InputButton value={input} highlight={this.state.selectedSymbol === input}
                                           onPress={this._onInputButtonPressed.bind(this, input)} key={r + "-" + i}/>);
            }

            views.push(
                <View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>
            )
        }
        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
        actualValue = (this.state.actualValue * 10) + num;
        symbol = this.state.selectedSymbol;
        if (symbol == null){
            symbol = '';
        }
        previousInputValue = this.state.previousInputValue;

        this.setState({
            actualValue: actualValue,
            inputValue: (previousInputValue + symbol + actualValue),
            result: eval(previousInputValue + symbol + actualValue)
        })
    }

    _handleStringInput(str) {
        switch (str) {
            case 'CE':
                this.setState({previousInputValue: 0, inputValue: 0, result: 0, selectedSymbol: null, actualValue: 0});
                break;
            case 'C':
                inputValue = this.state.inputValue.toString();
                actualValue = this.state.actualValue.toString();
                inputs = this.state.inputs;
                count = this.state.count;
                previousInputValue = this.state.previousInputValue.toString();
                if (inputValue.charAt(inputValue.length - 2) == '+' || inputValue.charAt(inputValue.length - 2) == '-' ||
                    inputValue.charAt(inputValue.length - 2) == '/' || inputValue.charAt(inputValue.length - 2) == '*' || inputValue.charAt(inputValue.length - 2) == '.') {
                    inputValue = inputValue.slice(0, -2);
                    previousInputValue = previousInputValue.slice(0, -2);
                    actualValue = this.state.inputs[count];
                } else {
                    actualValue = actualValue.slice(0, -1);
                    inputValue = inputValue.slice(0, -1);
                }
                if (inputValue.length == 0) {
                    inputValue = 0;
                    previousInputValue = 0;
                    actualValue = 0;
                    count = -1;
                    inputs = [];
                }
                this.setState({
                    inputValue: inputValue,
                    previousInputValue: previousInputValue,
                    actualValue: actualValue,
                    selectedSymbol: null,
                    result: eval(inputValue),
                    count : count,
                    inputs: inputs
                });
                break;
            case '.':
            case '/':
            case '*':
            case '+':
            case '-':
                inputs = this.state.inputs;
                inputs.push(this.state.inputValue);
                count = this.state.count + 1
                this.setState({selectedSymbol: str, previousInputValue: this.state.inputValue, actualValue: 0, inputs: inputs, count: count});
                break;
            case '=':
                result = this.state.result;
                this.setState({
                    inputValue: result,
                    actualValue: 0,
                    previousInputValue: 0,
                    selectedSymbol: null
                })
                break;
        }
    }
}

AppRegistry.registerComponent('AwesomeProject', () => ReactCalculator);
