import React, { useState } from "react";
import "./Settings.scss";
import { product } from "../Calculator";

export interface SettingsProps {
    products: product[];
    updateProductPrice: any;
}

export const Settings = (props: SettingsProps) => {
    const { products } = props;
    const [ isOpen, setIsOpen ] = useState(false);

    const priceInputs = products.map((el, index) => {
        return (
            <div className="Settings__Buttons__Element">
                <p className="Settings__Buttons__Element__Name">{el.name}</p>
                <input
                    className="Settings__Buttons__Element__Button"
                    onChange={(event) =>
                        props.updateProductPrice(event, index)
                    }
                    type="number"
                    name={el.name}
                    value={el.price}
                    key={index}
                />
            </div>
        )
    });

    return (
        <div className="Settings">
            <div 
                className="Settings__Toggle"
                onClick={() => { setIsOpen(!isOpen) }}>Settings</div>
            <div className={`Settings__Buttons ${isOpen ? '' : 'Settings__Buttons--closed'}`}>
                {priceInputs}
            </div>
        </div>
    )
}

export default Settings;
