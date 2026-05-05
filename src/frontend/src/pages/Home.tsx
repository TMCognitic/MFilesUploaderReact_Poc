import React from 'react';
 
import 'devextreme/dist/css/dx.light.css';
 
import Button from 'devextreme-react/button';
 
export class Home extends React.Component {
    render() {
        return (
            <Button
                text="Click me for test DevExtreme"
                onClick={this.sayHelloWorld}
            />
        );
    }
 
    sayHelloWorld() {
        alert('Hello world!');
    }
}