import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./styles/searchbar.css";
import Icono_Search from "./assets/Icono_Search.png";
import Icono_Ada from "./assets/Ada_Iso_Blanco.png"

class Searchbar extends Component {
    constructor(){
        super()
        this.state = {
            inputValue : ""
        }
    }

    handleOnChangeInput(e){
        this.setState({
            inputValue: e.target.value
        })
 
    }
    handleKeyPress(e){
        if(e.which === 13) {
            const {inputValue} = this.state
            this.props.searchProduct(inputValue)
        }
    }

render(){
    const {inputValue} = this.state

    return(
        <div className="searchbar">
            <img src={Icono_Ada} className="icono_ada" alt="" />
            <div className="searcher">            
                <input onKeyPress={e => this.handleKeyPress(e)} placeholder=" Nunca dejes de buscar..." type="text" value={this.state.inputValue} onChange={e => this.handleOnChangeInput(e)}/> 
                <Link to="/productos" activeClassName="is-selected">
                    <button className="search_btn" type="button" onClick={() => this.props.searchProduct(inputValue)}><img alt="" src={Icono_Search}/></button>
                </Link>
            </div>
        </div>
    )

}


}







export default Searchbar;