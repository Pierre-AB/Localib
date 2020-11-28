import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [],
      listOfProducts: [],
      latitude: "",
      longitude: "",
    };
    this.askLocation = this.askLocation.bind(this);
  }

  startApp() {
    this.getLocation();
  }

  askLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        console.log('success geoloc 🗺', pos)
        // success
        this.setState({
          latitude: lat,
          longitude: lng
        })
        axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}`)

          .then(responseFromApi => {
            this.setState({
              listOfStores: responseFromApi.data
            })
          })
      })
    } else {
      alert("Please turn on your geolocalisation")
    }
  }


  // Bring the products data
  getProducts = () => {
    axios
      .get(`http://localhost:5000/api/products`)
      .then((productsFromDb) => {
        const allProducts = productsFromDb.data;
        this.setState({
          listOfProducts: allProducts
        })
        console.log("list of Products", this.state.listOfProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // AXIOS.GET STORES (store id)
  // AXIOS.GET PRODUITS (renvoie tous les produits)

  
     
     // Search (front) sur PRODUITS [array de store ID contenant camemberts]
     // Si productStoreId = StoreId ==> RENVOIE LES STORES
     // Render


  componentDidMount() {
    this.askLocation()
    this.getProducts()
  }

  render(){ 
    console.log("list of Products", this.state.listOfProducts);

    // Let's filter the name before rendering 
    const onNameFilter = this.state.listOfStores.filter(store => {
      // does the store's name matches the query ?
      const matchName = store.fullName.includes(this.props.query);
      return matchName;
    })

    // Let's filter the products before rendering

    // Make an array of products matching
    const onProductFilter = this.state.listOfProducts.filter(product => { // [array de store ID contenant camemberts]
      // does the store's have the product match in the query ?
      const matchProduct = product.name.includes(this.props.query);
      return matchProduct;
    })
    console.log("onproductfilter", onProductFilter);

    // Make an array of store Id containing "query"
    let ProductFilteredStoreId = []
    onProductFilter.forEach(product => {
      console.log("store ID", product.store_id)
    })
   

    // Switch rendering regarding content of the search bar
    let renderedList;

    if (this.props.query.length !== "") {
      renderedList = [...onNameFilter /*, ...onProductFilter*/]
    } else { // Par défaut, renvoie full listOfStores
      renderedList = this.state.listOfStores
    }
    

    return(
      <>
        <h3>Alimentation</h3>
        <div className="horizontal-scroll-container">

          {/* Loading stores message */}
          {this.state.listOfStores.length <= 0 && "Loading stores . . . "}

          {/* Display stores when loaded */}
          {renderedList.map(store => {

            // Use store picture as background
            let background = store.picture
            
            return (
              <Link to={`/storeDetails/${store._id}`} >
                <div key={store._id} className="category-card" style={{backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})`}}>
                  <div className="category-store-info">
                    <h4>{store.fullName}</h4>
                    <p className="category-store-address">{store.distance} meters</p>
                  </div>
                </div>
              </Link>
            )
          })
          }

        </div>
      </>
    )
  }
}
export default SearchList;