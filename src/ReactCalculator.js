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

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            lastInput: 0,
            actualValue: 0,
            result: 0,
            selectedSymbol: null
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

                inputRow.push(<InputButton value={input} highlight={this.state.selectedSymbol === input} onPress={this._onInputButtonPressed.bind(this, input)} key={r + "-" + i}/>);
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
        lastInput = num;
        actualValue = (this.state.actualValue * 10) + num;
        symbol = this.state.selectedSymbol,
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
                    inputValue = this.state.inputValue
                    if (inputValue.charAt(inputValue.length - 2) == '+' || inputValue.charAt(inputValue.length - 2) == '-' ||
                  inputValue.charAt(inputValue.length - 2) == '/' || inputValue.charAt(inputValue.length - 2) == '*' || inputValue.charAt(inputValue.length - 2) == '.'){
                      inputValue = inputValue.slice(0, -2);
                    }else{
                      inputValue = inputValue.slice(0, -1);
                    }
                    if (inputValue.length == 0){
                      inputValue = 0;
                    }
                this.setState({
                  inputValue: inputValue,
                  selectedSymbol: null,
                  result: eval(inputValue)
                });
                break;
            case '.':
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({selectedSymbol: str, previousInputValue: this.state.inputValue, actualValue: 0});
                break;
            case '=':
              result = this.state.result;
              this.setState({
                inputValue: result,
                selectedSymbol: null
              })
              break;
        }
    }
}

AppRegistry.registerComponent('AwesomeProject', () => ReactCalculator);
