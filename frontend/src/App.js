import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { Container } from 'react-bootstrap';
import Homescreen from './screens/Homescreen'
import Productscreen from './screens/Productscreen'
import Cartscreen from './screens/Cartscreen'
import Loginscreen from './screens/LoginScreen'
import Registerscreen from './screens/RegisterScreen'
import Profilescreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import TestScreen from './screens/TestScreen'
import OrderListScreen from './screens/OrderListScreen'

function App() { 
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container> 
          <Route path="/register" component={Registerscreen} />
          <Route path="/profile" component={Profilescreen} />
          <Route path="/login" component={Loginscreen} />
          <Route path="/admin/userList" component={UserListScreen}  />
          <Route path="/admin/user/:id/edit" component={UserEditScreen}  />
          <Route path="/admin/productlist" component={ProductListScreen} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen}  />
          <Route path="/product/:id" component={Productscreen} />
          <Route path="/cart/:id?" component={Cartscreen}  />
          <Route path="/shipping" component={ShippingScreen}  />
          <Route path="/payment" component={PaymentScreen}  />
          <Route path="/placeorder" component={PlaceOrderScreen}  />
          <Route path="/order/:id" component={OrderScreen}  />
          <Route path="/admin/orderlist" component={OrderListScreen}  />
  
          <Route path="/page/:pageNumber" component={Homescreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={Homescreen} exact />
          <Route path="/search/:keyword" component={Homescreen} exact />
          <Route path="/" component={Homescreen} exact />

          <Route path="/lol" component={TestScreen} />
         </Container>
      </main>
      <Footer />
  
    </Router>
  );
}

export default App;
