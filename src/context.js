import React, { Component } from "react";
//import User from './components/User';
import axios from "axios";
const UserContext = React.createContext();
// Provider , Consumer
const reducer = (state,action) =>{
  switch(action.type){
    case "DELETE_USER":
      return{
        ...state,
        users:state.users.filter(user=>action.payload !== user.id)
      }
      case "ADD_USER":
        return{
          ...state,
          users:[...state.users,action.payload]
        }
        case "UPDATE_USER":
          return{
            ...state,
            users:state.users.map(user=> user.id === action.payload.id? action.payload: user)
          }
      default:
        return state
  }
}
export class UserProvider extends Component {
  state = {
    users: [],
    dispatch : action=>{
      this.setState (state => reducer(state,action))
    }
  };
  componentDidMount = async(state,action)=> {//verilerimizi rest Api dan almak için yapılan işlemler.
    const response = await axios.get("http://localhost:3004/users")
    //console.log(responsePost)
    this.setState({
      users : response.data
    })
  }
  
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;

export default UserConsumer;
//ÇALIŞMA MANTIĞI
/* Eski State kaybetmemek için güncellenmiş halini alıp yeni state  kaydediyoruz.
state= {
  a : 10,
  b : 20,
  c : 30
}
{
   a : 10,
  b : 20,
  c : 30
}
*/