import React, { Component } from 'react';
import './Hello.css'


 class Hello extends Component{
    render(){
        return(
            <div className="hello">Hello, {this.props.name}</div>
            );
        
    }
}

export default Hello;
