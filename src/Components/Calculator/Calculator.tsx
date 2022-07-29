import React from "react";
import "./Calculator.scss";
import Settings from "./Settings/Settings";

export type product = { name: string; price: number; count: number };

export interface CalculatorProps {}

export interface CalculatorState {
    products: product[];
    cashGiven: number;
}

export class Calculator extends React.Component<
    CalculatorProps,
    CalculatorState
> {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                { name: "Erdbeeren", price: 3.9, count: 0 },
                { name: "Himbeeren", price: 3.6, count: 0 },
                { name: "Heidelbeeren", price: 2.4, count: 0 },
                { name: "Kirschen", price: 3.9, count: 0 },
                { name: "Brombeeren", price: 5, count: 0 },
                { name: "Marmelade", price: 3.5, count: 0 },
            ],
            cashGiven: 0
        };
    }

    componentDidMount(): void {
        let products = JSON.parse(localStorage.getItem('products')) || null;

        if (Array.isArray(products) && products[0]?.name) {
            this.setState({
                products
            })
        }
    }

    public resetState = (event): void => {
        event.preventDefault();
       
        this.setState(prevState => {
            const newProductState = prevState.products.map(el => {
                el.count = 0;
                return el;
            })
            
            return {
                products: newProductState,
                cashGiven: 0
            }
        })
    };

    public updateCashGiven = ({ target: { value } }): void => {
        let inputValue;

        if (Number.isNaN(parseFloat(value))) {
            inputValue = 0;
        } else if (typeof value === "string") {
            inputValue = parseFloat(value);
        }

        this.setState({
            cashGiven: inputValue
        });
    };

    public updateProductCount = (event: any, index: number): void => {
        event.preventDefault();

        this.setState((prevState) => {
            let products = prevState.products.map((el, i) => {
                if (index === i) {
                    el.count = el.count + 1;
                }
                return el;
            });

            return { products };
        });
    };

    public updateProductPrice = (event: any, index: number): void => {
        const { target: {value} } = event;
        
        this.setState((prevState) => {
            prevState.products[index].price = value;

            return {
                products: [...prevState.products],
            };
        }, () => {
            const productsWithoutCount = this.state.products.map(el => {
                el.count = 0;
                return el;
            });

            localStorage.setItem('products', JSON.stringify(productsWithoutCount));
        });
    };

    public getChange = (): number => {
        return this.state.cashGiven - this.getTotalPrice();
    }

    public getTotalPrice = (): number => {
        return this.state.products.reduce((acculumator, el) => (acculumator + (el.count * el.price)), 0);
    }

    public formatAsCashValue = (value: number): string => {
        var formatter = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        });

        return formatter.format(value);
    };

    render() {
        const productButtons = this.state.products.map((el, index) => {
            return (
                <button
                    className={`products__buttonElement ${el.count > 0 ? 'products__buttonElement--selected' : ''}`}
                    onClick={(event) => this.updateProductCount(event, index)}
                    key={index}
                >
                    <strong>{el.name}</strong>
                    <p>{`${el.count} x ${el.price}`}</p>
                </button>
            );
        });

        return (
            <div className="Calculator">
                <h1>Aschentrup Price Calculator</h1>
                <Settings
                    products={this.state.products}
                    updateProductPrice={this.updateProductPrice}
                />

                <form className="Form">
                    <div className="products">{productButtons}</div>

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
                                {this.formatAsCashValue(this.getTotalPrice())}
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
                                {this.formatAsCashValue(this.getChange())}
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Calculator;
