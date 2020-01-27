import React, { Component } from 'react'
import UserConsumer from "../context";
import axios from "axios";



class UpdateUser extends Component {

  state = {
      name : "",
      department :"",
      adres : "",
      error : false
  } 
   
  changeInput = (e) => {
      this.setState({
          
          [e.target.name] : e.target.value
      })
  }
  componentDidMount = async () => {
    const {id} = this.props.match.params;
    
    const response = await axios.get(`http://localhost:3004/users/${id}`);

    const {name,adres,department} = response.data;

    this.setState({
        name,
        adres,
        department
    });

  }
  validateForm = () => {
    const {name,adres,department} = this.state;
    if (name === "" || adres === "" || department === "") {
        return false;
    }
    return true;
    
}
  updateUser = async (dispatch,e) => {
      e.preventDefault();

      // Update User
      const {name,adres,department} = this.state;
      const {id} = this.props.match.params;
      const updatedUser = {
        name,
        adres,
        department
      };
      if (!this.validateForm()) {
        this.setState({
            error :true
        })
        return;
        }
      const response = await axios.put(`http://localhost:3004/users/${id}`,updatedUser);

      dispatch({type: "UPDATE_USER",payload : response.data});

      // Redirect
      this.props.history.push("/");
  } 
  render() {
    const {name,adres,department,error} = this.state;
    return <UserConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
     
                    <div className = "col-md-8 mb-4">
                      <div className="card">
                          <div className="card-header">
                          <h4>Update User Form</h4>
                          </div>
                          <div className="card-body">
                          {
                            error ? 
                            <div className = "alert alert-danger">
                               Lütfen eksik bilgilerinizi kontrol ediniz.
                            </div>
                            :null
                         }
                              <form onSubmit = {this.updateUser.bind(this,dispatch)}>
                                  <div className="form-group">
                                      <label htmlFor="name">Name</label>
                                      <input 
                                      type="text"
                                      name = "name"
                                      id = "id"
                                      placeholder = "Enter Name"
                                      className ="form-control"
                                      value = {name}
                                      onChange = {this.changeInput}
              
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="department">Department</label>
                                      <input 
                                      type="text"
                                      name = "department"
                                      id = "department"
                                      placeholder = "Enter Department"
                                      className ="form-control"
                                      value = {department}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="adres ">Adres</label>
                                      <input 
                                      type="text"
                                      name = "adres"
                                      id = "adres"
                                      placeholder = "Enter Adres"
                                      className ="form-control"
                                      value = {adres}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                  <button className = "btn btn-danger btn-block" type = "submit">Update User</button>
                              
                              
                              </form>
                          </div>
                      
                      </div>
                      
                    </div>
                  )
            }
        }
    
    </UserConsumer>
    
  }
}
export default UpdateUser;