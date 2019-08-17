import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Searchbar from './components/searchbar';
import Prodcard from './components/prod_card';
import Description from './components/prod_description';




class App extends Component {
  constructor(){
    super()
    this.state = {
      products: [],

    }
  }

  searchProduct(searchbardata){
    // aca el fetch
    console.log("paso la data" + searchbardata)
 
        fetch('http://localhost:3030/api/items?q=:'+ searchbardata)
        .then(res => res.json())
        .then(data =>{
            this.setState({
                products: data,
                productDetail: ""
            })
        })
      console.log("hizo el fetch"+this.state.products)
      
    }
  


  render() {
    return (
      <div className="App">
      
        <BrowserRouter>
        <div>

          <Route exact path="/">
            <Searchbar searchProduct={(searchbardata)=> this.searchProduct(searchbardata)}></Searchbar>
          </Route>

       
          <Route  exact path="/productos"  render={() => (
            <Prodcard products={this.state.products} ></Prodcard>
              )}
              />
          

          <Route exact path="/productos/:id" render={() => (
            <Description></Description>

          )} 
          />
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
