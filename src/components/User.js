import React, { Component } from "react";
import PropTypes from "prop-types";
import UserConsumer from "../context";
import axios from "axios";
import {Link} from "react-router-dom"
class User extends Component {
  static defaultProps = {
    name: "Bilgi Yok",
    adress: "Bilgi Yok",
    departman: "Bilgi Yok"
  };
  //Arrow function seklinde yazılan fonksiyonlar otomatik "bind" işlemi yapılmış olur
  onClickEvent = (e) => {
    //  console.log(e.target);
    //  console.log("Test");
    // console.log(this.props.name);
    //console.log(number)
    this.setState({
      isVisible: !this.state.isVisible //Set state fonksiyonu ile state in değerini değiştiriyoruz.
    });
  };
  onDeleteUser = async(dispatch,e) => {
    const{id}=this.props;
    // delete Request
   await axios.delete(`http://localhost:3004/users/${id}`)//rest api dan dinamik olarak verileri silme
    // Consumer Dispatch
     dispatch({type : "DELETE_USER",payload:id});
  };
componentWillUnmount(){//Componentleri kaldırmadan hemen önce çalışır.
  console.log("Component Will Unmount")
}
  constructor(props) {
    super(props);
    // constructor içinde bind işlemi
    //this.onClickEvent = this.onClickEvent.bind(this);
    this.state = {
      isVisible: false
    };
  }
  render() {
    //Destructing
    const { name, department, adres,id } = this.props;
    const { isVisible } = this.state;
    return (
    <UserConsumer>

      {
        value =>{
          const {dispatch}=value;
            return (
                  <div className="col-md-8 mb-4" >
                    <div className="card" >
                      <div className="card-header d-flex justify-content-between"  onClick={this.onClickEvent.bind(this)} style={isVisible ? {backgroundColor:"#75cb84",color:"white"} :{backgroundColor:"#62848d",color:"white"}}>
                        <h4 className="d-inline">
                          {name}
                        </h4>
                        <i onClick={this.onDeleteUser.bind(this,dispatch)} className="fa fa-trash"style={{ cursor: "pointer" }}></i>
                      </div>
                      {isVisible ? (
                        <div className="card-body">
                          <p className="card-text">Adres:{adres}</p>
                          <p className="card-text">Departman:{department}</p>
                          <Link to={`edit/${id}`} className="btn btn-dark btn-block">Update User</Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
        }
      }

    </UserConsumer>)

   
  }
}
// User.defaultProps ={
//     name:"Bilgi Yok",
//     adress:"Bilgi Yok",
//     departman:"Bilgi Yok"
// }
User.propType = {
  name: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  departman: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
export default User;
