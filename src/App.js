import React, { Component } from "react";
import "./App.css";
//import User from './components/User';
import Navbar from "./layout/Navbar";
import Users from "./components/Users";
import AddUser from "./Forms/AddUser";
import UpdateUser from "./Forms/UpdateUser";
//import Test from "./components/TestLifeCycles";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Contribute from "./Pages/Contribute";
// const Home = () =>{
//   return(
//     <h3>Home Page</h3>
//   )
// }
// const About = () =>{
//   return(
//     <h3>About Page</h3>
//   )
// }

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar title="Personel Bilgileri"></Navbar>
            <hr></hr>
            <Switch>
              <Route exact path ="/" component = {Users}/>
              <Route exact path ="/add" component = {AddUser}/>
              <Route  exact path ="/github" component = {Contribute}/>
              <Route exact path="/edit/:id" component ={UpdateUser}></Route>
              <Route component = {NotFound}></Route>
            </Switch>
        </div>
      </Router>
      
    );
  }
}

export default App;
