import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Screen = styled.input`
  width: 100%;
  height: 50px;
  font-size: 24px;
  text-align: right;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const Operation = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  font-size: 24px;
  border-radius: 5px;
  border: none;
  margin: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

function Calculator() {
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');
  const [operation, setOperation] = useState('');

  const handleNumberClick = (event) => {
    setCurrentValue(currentValue + event.target.value);
    setOperation(operation + event.target.value);
  };

  const handleOperatorClick = (event) => {
    if (currentValue === '') return;
    if (previousValue !== '' && operator !== '(') {
      handleEqualsClick();
    }
    setPreviousValue(currentValue);
    setCurrentValue('');
    setOperator(event.target.value);
    setOperation(operation + event.target.value);
  };

  const handleClearClick = () => {
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
    setOperation('');
  };

  const handleEqualsClick = () => {
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    if (isNaN(current) || isNaN(previous)) return;
    let result;
    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = previous / current;
        break;
      default:
        return;
    }
    setPreviousValue(result.toString());
    setCurrentValue('');
    setOperator('');
    setOperation(operation + '=' + result.toString());
  };

  const handleOpenParenthesisClick = () => {
    if (currentValue !== '') {
      setPreviousValue(currentValue);
      setCurrentValue('');
      setOperator('*');
      setOperation(operation + '*(');
    } else {
      setOperation(operation + '(');
    }
  };

  const handleCloseParenthesisClick = () => {
    if (previousValue === '' || operator === '') return;
    handleEqualsClick();
    setOperator(')');
    setOperation(operation + ')' + operator);
  };

  return (
    <CalculatorWrapper>
      <Screen type="text" value={currentValue} disabled />
      {previousValue && (
        <Operation>{previousValue + ' ' + operator}</Operation>
      )}
      {operation && <Operation>{operation}</Operation>}
      <Row>
        <Button onClick={handleNumberClick} value="7">
          7
        </Button>
        <Button onClick={handleNumberClick} value="8">
          8
        </Button>
        <Button onClick={handleNumberClick} value="9">
          9
        </Button>
        <Button onClick={handleOperatorClick} value="/">
          ÷
        </Button>
      </Row>
      <Row>
        <Button onClick={handleNumberClick} value="4">
          4
        </Button>
        <Button onClick={handleNumberClick} value="5">
          5
        </Button>
        <Button onClick={handleNumberClick} value="6">
          6
        </Button>
        <Button onClick={handleOperatorClick} value="*">
          ×
        </Button>
      </Row>
      <Row>
        <Button onClick={handleNumberClick} value="1">
          1
        </Button>
        <Button onClick={handleNumberClick} value="2">
          2
        </Button>
        <Button onClick={handleNumberClick} value="3">
          3
        </Button>
        <Button onClick={handleOperatorClick} value="-">
          -
        </Button>
      </Row>
      <Row>
        <Button onClick={handleOpenParenthesisClick} value="(">
          (
        </Button>
        <Button onClick={handleNumberClick} value="0">
          0
        </Button>
        <Button onClick={handleCloseParenthesisClick} value=")">
          )
        </Button>
        <Button onClick={handleOperatorClick} value="+">
          +
        </Button>
      </Row>
      <Row>
        <Button onClick={handleClearClick}>C</Button>
        <Button onClick={handleEqualsClick}>=</Button>
      </Row>
    </CalculatorWrapper>
  );
}

export default Calculator;
