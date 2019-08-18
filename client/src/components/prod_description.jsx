import React, { Component } from 'react';
import { withRouter } from 'react-router';
import "./styles/description.css";

class Description extends Component {

    constructor(props){
        super(props)
        this.state = {
            prod: [],
            description: ""
        }
    
    };
    
    componentDidMount () {
       console.log(this.props)
        fetch('http://localhost:3030/api/items/' + this.props.match.params.id)
        .then(res => res.json())
        .then(data =>{
            this.setState({
                prod: data.item,
                description: data.description
            })
        })
        console.log("hizo el fetch a items"+this.state.prod)
    };
   
 
    render(){
       
        return (
            <div>
                <p className="title">{this.state.prod.title}</p>
              <img className="pic" src={this.state.prod.picture}  alt=""/>
             
              <p className="description">{this.state.description}</p>
            </div>
        );
    }
    
};

export default  withRouter (Description);