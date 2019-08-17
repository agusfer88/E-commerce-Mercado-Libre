import React  from 'react';
import { Link } from "react-router-dom";

 
const Prodcard = props => {
  

const prod =  props.products.items && props.products.items.map(

  p => <div>
          <Link to={`/productos/${p.id}`}>
        
              <div><img src={p.picture} alt=""/></div>
              <div>$ {p.price.amount}, {p.price.decimals} {p.price.currency}</div> 
              <div><p>{p.location}</p></div>
              <div><p>{p.title}</p></div>
          </Link>

      </div>
  
)

    return (
      <div>
        {prod}
      </div>
    );
  

}

export default Prodcard;