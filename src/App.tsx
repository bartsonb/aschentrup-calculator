import React from "react";
import Calculator from "./Components/Calculator/Calculator";
import './App.css';

export interface AppProps {}

export class App extends React.Component<AppProps, any> {
    render() {
        return (
            <Calculator />
        );
    }
}

export default App;
