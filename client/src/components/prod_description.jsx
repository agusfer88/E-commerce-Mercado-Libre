import React, { Component } from 'react';
import { withRouter } from 'react-router'

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

              <img src={this.state.prod.picture}  alt=""/>
              <p>{this.state.prod.title}</p>
              <p>{this.state.description}</p>
            </div>
        );
    }
    
};

export default  withRouter (Description);