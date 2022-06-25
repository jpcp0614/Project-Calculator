import React, { Component } from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import '../styles/Calculator.css';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

class Calculator extends Component {

  state = { ...initialState };

  setOperation = (operation) => {
    if (this.state.current === 0) {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
      });
    } else {
      const equals = operation === '=';
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      try {
        // eslint-disable-next-line no-eval
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit = (n) => {
    // usar o ponto somente uma vez
    if (n === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    // limpar quando tiver 0 no display ou clearDisplay estiver true
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

    // se o display está limpo ou não
    const currentValue = clearDisplay ? '' : this.state.displayValue;

    // novo valor que será colocado no display
    const displayValue = currentValue + n;

    // digito o valor, a flag clearDisplay deve ser false
    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState });
  }

  render() {
    const { displayValue } = this.state;
    const { addDigit, clearMemory, setOperation } = this;
    return (
      <div className="calculator">
        <Display value={ displayValue } />
        <Button label="AC" click={ clearMemory } triple />
        <Button label="/" click={ setOperation } operation />
        <Button label="7" click={ addDigit } />
        <Button label="8" click={ addDigit } />
        <Button label="9" click={ addDigit } />
        <Button label="*" click={ setOperation } operation />
        <Button label="4" click={ addDigit } />
        <Button label="5" click={ addDigit } />
        <Button label="6" click={ addDigit } />
        <Button label="-" click={ setOperation } operation />
        <Button label="1" click={ addDigit } />
        <Button label="2" click={ addDigit } />
        <Button label="3" click={ addDigit } />
        <Button label="+" click={ setOperation } operation />
        <Button label="0" click={ addDigit } double />
        <Button label="." click={ addDigit } />
        <Button label="=" click={ setOperation } operation />
      </div>
    );
  }
}

export default Calculator;
