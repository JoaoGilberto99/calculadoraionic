import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  currentNumber = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber = false;

  public getNumber(v: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  public getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op: string, secondOp: number): number {
    switch (op) {
      case '+':
        return (this.firstOperand ?? 0) + secondOp;
      case '-':
        return (this.firstOperand ?? 0) - secondOp;
      case '*':
        return (this.firstOperand ?? 0) * secondOp;
      case '/':
        if (secondOp === 0) {
          // Handle division by zero, returning 0 or another appropriate value
          return 0;
        }
        return (this.firstOperand ?? 0) / secondOp;
      case '=':
        return secondOp;
      default:
        return 0;
    }
  }

  public getOperation(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
