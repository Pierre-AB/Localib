import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Loader Icon
import { useLoading, ThreeDots } from '@agney/react-loading';

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

  componentDidMount() {
    this.askLocation()
    this.getProducts()
  }

  render(){ 
    // Let's filter the name before rendering 
    const onNameFilter = this.state.listOfStores.filter(store => {
      // does the store's name matches the query ?
      const matchName = (store.fullName).toLowerCase().includes((this.props.query).toLowerCase());
      return matchName;
    })


    // Let's filter the products before rendering

    // Make an array of products matching
    let ProductFilteredStoreId = []

    const onProductFilter = this.state.listOfProducts.filter(product => { // [array de store ID contenant camemberts]
      // does the store's have the product match in the query ?
      const matchProduct = (product.name).toLowerCase().includes((this.props.query).toLowerCase());
      return matchProduct;
    })

    // Matching store ID of products and store ID of stores
    onProductFilter.forEach(product => { // Boucle sur chaque produit
      this.state.listOfStores.forEach(store => { // Boucle sur chaque store
        if (product.store_id && store._id) { // Ne compare pas les undefined
          if (product.store_id === store._id) { // Si store ID = store ID
            ProductFilteredStoreId.push(store) // push dans ProductFilteredStoreId array
          }
        }
      })   
    })   

    // Switch rendering regarding content of the search bar
    let renderedList;

    if (this.props.query.length !== "") {
      renderedList = [...onNameFilter, ...ProductFilteredStoreId]
    } else { // Par défaut, renvoie full listOfStores
      renderedList = this.state.listOfStores
    }
    

    return(
      <>
        <div className="vertical-scroll-container">

          {/* Loading stores message */}
          {renderedList.length <= 0 && <ThreeDots width="30" />}

          {/* Display stores when loaded */}
          {renderedList.map(store => {

            // Use store picture as background
            let background = store.picture
            
            return (
              <Link to={`/storeDetails/${store._id}`} >
                <div key={store._id} className="vertical-list">
                  <div className="vertical-list-image" style={{backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})`}}></div>
                  <div className="vertical-store-info">
                    <h4>{store.fullName}</h4>
                    <p className="vertical-store-address">{store.address}</p>
                    <p className="vertical-store-address">{store.distance} meters</p>
                  </div>
                </div>
                <hr />
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