import React from "react";
import "./Calculator.scss";

export interface CalculatorProps {}


export class Calculator extends React.Component<CalculatorProps, any> {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    public getInitialState = (): object => ({
        products: [
            { name: "erdbeeren", price: 2.5, count: 0 },
            { name: "himbeeren", price: 3.1, count: 0 },
            { name: "heidelbeeren", price: 1.9, count: 0 },
            { name: "kirschen", price: 2.7, count: 0 },
            { name: "brombeeren", price: 2.7, count: 0 },
            { name: "marmelade", price: 3.3, count: 0 },
        ],
        totalPrice: 0,
        cashGiven: 0,
        change: 0,
    });

    public resetState = (event): void => {
        event.preventDefault();
        this.setState(this.getInitialState());
    };

    public updateCashGiven = ({ target: { value } }): void => {
        let inputValue;

        if (Number.isNaN(parseFloat(value))) {
            inputValue = 0;
        } else if (typeof value === 'string') {
            inputValue = parseFloat(value);
        }

        this.setState({
            cashGiven: inputValue,
            change: inputValue - this.state.totalPrice,
        });
    };

    public updateProductCount = (event, index): void => {
        event.preventDefault();

        this.setState(prevState => {
            let products = prevState.products.map((el, i) => {
                if (index === i) {
                    el.count = (el.count + 1);
                }
                return el;
            });

            let totalPrice = 0;
            products.forEach((el) => {
                if (el.count > 0) {
                    totalPrice += (el.count * el.price);
                }
            });

            return { products, totalPrice };
        });
    };

    public formatAsCashValue = (value: number): string => {
        var formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        });

        return formatter.format(value);
    };

    render() {
        const buttons = this.state.products.map((el, index) => {
            return (
                <button
                    onClick={(event) => this.updateProductCount(event, index)}
                    key={index}
                >
                    <strong>{`${el.name}`}</strong> <br /> {`(${el.count} x ${el.price.toFixed(2)}€)`}
                </button>
            );
        });

        return (
            <div className="Calculator">
                <h1>Aschentrup Price Calculator</h1>
                <form className="Form">
                    <div className="buttons">{buttons}</div>

                    <div className="inputs">
                        <input
                            onChange={this.updateCashGiven}
                            className="cashGiven"
                            type="number"
                            value={this.state.cashGiven}
                        />

                        <button
                            onClick={(event) => this.resetState(event)}
                            className="reset"
                            value="reset"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="summary">
                        <p>
                            <span className="label">Total Price:</span>
                            <span className="value">
                                {this.formatAsCashValue(this.state.totalPrice)}
                            </span>
                        </p>
                        <p>
                            <span className="label">Cash Given:</span>
                            <span className="value">
                                {this.formatAsCashValue(this.state.cashGiven)}
                            </span>
                        </p>
                        <hr />
                        <p>
                            <span className="label">Change:</span>
                            <span className="value">
                                {this.formatAsCashValue(this.state.change)}
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Calculator;
