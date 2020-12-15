import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import { Link } from 'react-router-dom';


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
    nonAvaiTime: []

  }

  componentDidMount() {
    this.getSingleStore();
    console.log(this.props.loggedInUser)

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
                  <Link to={`/storeDetails/appointment/${this.state.store._id}`}>Créer un compte pour prendre RDV</Link>
                </>)
              }



              <a href='#'>Voir les produits</a>
            </div>
            <hr />
            <h3>Description</h3>
            <p>{this.state.store.description}</p>
          </div>

        </div>

      </div>

    )
  }
}

export default StoreDetails

