var express = require('express');
var router = express.Router();
var axios = require('axios');

// FIRST RUOTE 
router.get('/items', function(req, res){
  const q = req.query.q;
  axios
  .get("https://api.mercadolibre.com/sites/MLA/search?limit=4&q="+q)
  .then(result =>{
    console.log("entro aca")
    const data = result.data
    const apicategories = data.available_filters.find(c => c.id === 'category')
    const categories = apicategories.values;

    categories.sort(function(a,b){
      if (a.results > b.results){
        return -1;
      }
      if (a.results < b.results){
        return 1;
      }
      return 0
    })




    const products = data.results.map(function(products){
      // //aca defino como quiero los products
      return{
 
        // items: [
        //   {
            id: products.id,
            title: products.title,
            price: {
              currency: products.currency_id,
              amount: String(products.price).split('.')[0],
              decimals: String(products.price).split('.') [1] || '0'
            },
            picture: products.thumbnail,
            condition: products.condition,
            free_shipping: products.shipping.free_shipping,
            location: products.address.state_name
        //   }
        // ]
      }
    })
    res.json({
      categories: categories[0],
      items: products
    })
  })
  .catch(function(err){ // es un Fail, cuando explota algo.
    console.log ('Something went wrong! '+ err)
  })  
})






/* SECOND RUOTE */
router.get('/items/:id', function(req, res) {
  //el param forman parte del path, no son cosas que nosotros le ponemos en la ruta
  const id = req.params.id
  axios.get('https://api.mercadolibre.com/items/' + id)
  .then(resultProduct => {
    const category = resultProduct.data.category_id;
    const resultProductProp = resultProduct.data
    axios.get('https://api.mercadolibre.com/items/' + id + '/description')
      .then(resultDescription => {
        axios.get('https://api.mercadolibre.com/categories/' + category)
          .then(resultCategory => {
            const resultCategoryMap = resultCategory.data.path_from_root.map(c => {return c.name})

            const myProducts = {

              categories: resultCategoryMap,
              item: { 
                id:  resultProductProp.id,
                title: resultProductProp.title,
                price: {
                  currency: resultProductProp.currency_id,
                  amount: String(resultProductProp.price).split(".")[0],
                  decimal: String(resultProductProp.price).split(".")[1] || "0"
                },
                picture: resultProductProp.thumbnail,
                condition: resultProductProp.condition,
                shipping: resultProductProp.shipping.free_shipping,
                sold_quantity: resultProductProp.sold_quantity
               
              },
              categoryId: category,
              description: resultDescription.data.plain_text,

            }
          res.json(myProducts)
          })
      .catch(function (err) {console.log('Something went wrong! ', err)}) 
    })
  })
});














module.exports = router;
