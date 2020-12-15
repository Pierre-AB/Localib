import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import { Link } from 'react-router-dom';
import StoreMap from '../Maps/storeMap'
import ListOfProducts from '../Products/listOfProducts'



//  ######   #######  ##     ## ########   #######  ##    ## ######## ##    ## ######## 
// ##    ## ##     ## ###   ### ##     ## ##     ## ###   ## ##       ###   ##    ##    
// ##       ##     ## #### #### ##     ## ##     ## ####  ## ##       ####  ##    ##    
// ##       ##     ## ## ### ## ########  ##     ## ## ## ## ######   ## ## ##    ##    
// ##       ##     ## ##     ## ##        ##     ## ##  #### ##       ##  ####    ##    
// ##    ## ##     ## ##     ## ##        ##     ## ##   ### ##       ##   ###    ##    
//  ######   #######  ##     ## ##         #######  ##    ## ######## ##    ##    ##    




class StoreDetails extends React.Component {

  state = {
    store: {},
    orders: [],
    storeIsLoaded: false,
    nonAvaiTime: [],
    timeSlot: 15,
    nonAvaiTime: [],
    listOfProducts: [],
    storeProducts: []
  }

  componentDidMount() {
    this.getSingleStore();
    console.log(this.props.loggedInUser)
    this.getProducts();

    // const day = new Date().getDay();
    // this.setState({
    //   pickedDate: this.state.store.openingHours
    // })

  }

  //  $$$$$$\            $$\                                              $$\ $$\           
  // $$  __$$\           \__|                                             $$ |$$ |          
  // $$ /  $$ |$$\   $$\ $$\  $$$$$$\   $$$$$$$\        $$$$$$$\ $$$$$$\  $$ |$$ | $$$$$$$\ 
  // $$$$$$$$ |\$$\ $$  |$$ |$$  __$$\ $$  _____|      $$  _____|\____$$\ $$ |$$ |$$  _____|
  // $$  __$$ | \$$$$  / $$ |$$ /  $$ |\$$$$$$\        $$ /      $$$$$$$ |$$ |$$ |\$$$$$$\  
  // $$ |  $$ | $$  $$<  $$ |$$ |  $$ | \____$$\       $$ |     $$  __$$ |$$ |$$ | \____$$\ 
  // $$ |  $$ |$$  /\$$\ $$ |\$$$$$$  |$$$$$$$  |      \$$$$$$$\\$$$$$$$ |$$ |$$ |$$$$$$$  |
  // \__|  \__|\__/  \__|\__| \______/ \_______/        \_______|\_______|\__|\__|\_______/ 


  // GET STORE DETAILS

  getSingleStore = () => {
    const { params } = this.props.match;
    // console.log("params", params)
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/stores/${params.id}`)
      // axios.get(`http://localhost:5000/api/stores/${params.id}`)
      .then(lookedUpStore => {
        this.setState({
          store: lookedUpStore.data,
          storeIsLoaded: true
        });

      })
      .catch(err => console.log("Error on getting store details:", err))
  }

  getProducts = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((productsFromDb) => {
        const allProducts = productsFromDb.data;
        this.setState({
          listOfProducts: allProducts,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };






  //                                      $$\                     
  //                                     $$ |                    
  //  $$$$$$\   $$$$$$\  $$$$$$$\   $$$$$$$ | $$$$$$\   $$$$$$\  
  // $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$ |$$  __$$\ $$  __$$\ 
  // $$ |  \__|$$$$$$$$ |$$ |  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
  // $$ |      $$   ____|$$ |  $$ |$$ |  $$ |$$   ____|$$ |      
  // $$ |      \$$$$$$$\ $$ |  $$ |\$$$$$$$ |\$$$$$$$\ $$ |      
  // \__|       \_______|\__|  \__| \_______| \_______|\__|      




  render() {
    let background = this.state.store.picture;
    const loggedUser = this.props.loggedInUser
    const storeIsLoaded = this.state.storeIsLoaded;
    // const dayInfo = this.splitDay();

    // // const nonAvaiTime = this.state.nonAvaiTime;

    // console.log('🚨 this.state.pickedDate=', this.state.pickedDate)

    // if (this.state.orders.length > 0 && this.state.pickedDate) { this.drawAvailability()}
    let ProductFilteredStoreId = []
    let store = this.state.store

    this.state.listOfProducts.forEach(product => { // Boucle sur chaque produit
          if (product.store_id === store._id) { // Si store ID = store ID
            ProductFilteredStoreId.push(store) // push dans ProductFilteredStoreId array
          }
        
      })   
    
    let productList = [...ProductFilteredStoreId]

    return (

      <div>
        <div className="page-container-mobile">
          <div className="top-detail-section" style={{ backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})` }}>
            <div className="relativeParent">
              <div className="detail-store-info">
                <h1>{this.state.store.fullName}</h1>
                <p className="nearby-store-address">{this.state.store.businessType}</p>
                <p className="nearby-store-address">{this.state.store.address}</p>
              </div>
            </div>
          </div>
          <div className="bottom-detail-section">
            <div className="tri-btn">
              <Link to={`/storeDetails/appointment/${this.state.store._id}`}>Conseils vidéo</Link>
              {loggedUser ?
                (<>
                  <Link to={`/storeDetails/appointment/${this.state.store._id}`}>Prendre RDV</Link>
                </>) :
                (<>
                  <Link to={`/signup`}>Créer un compte pour prendre RDV</Link>
                </>)
              }
              <a href='#'>Voir les produits</a>
            </div>
            <hr />
            <h3>Description</h3>
            <p>{this.state.store.description}</p>
          </div>
          {storeIsLoaded ? (
            <div>
              <StoreMap store={this.state.store} />
              <ListOfProducts product={productList}/>         
            </div>
            ) : "" }
        </div>
      </div>
    )
  }
}

export default StoreDetails;