import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context";
import axios from "axios";
//import User from './User';
//var uniqid = require('uniqid');
const Animation = posed.div({
    visible : {
        opacity : 1,
        applyAtStart :{
            display : "block"
        }
    },
    hidden:{
        opacity : 0,
        applyAtEnd :{
            display :"none"
        }
    }
});
class AddUser extends Component {

    state={
        visible : false,
        name : "",
        department :"",
        adres : "",
        error : false
        
    }
    validateForm = () =>{
        const {name,adres,department}=this.state;
        if(name===""||adres===""||department===""){
            return false;
        }
        return true;
    }

    changeInput = (e)=>{
        this.setState({
            // Name = "Name"
            [e.target.name] : e.target.value

        })
    }
    addUser = async(dispatch,e) =>{
        e.preventDefault();
        const {name,adres,department} = this.state;
        const newUser = {
           // id : uniqid(),
            name,
            adres,
            department
        }
        if(!this.validateForm()){
            this.setState({
                error:true
            })
            return;
        }
        const response = await axios.post("http://localhost:3004/users",newUser);

        dispatch({type : "ADD_USER",payload:response.data})
        //Redirect
        this.props.history.push("/")

    }
    changeVisibility = (e) =>{
        this.setState({
            visible : !this.state.visible
        })
    }
   
    render() {
        const {visible,name,department,adres,error} = this.state;
        return <UserConsumer>
            {
                value => {
                    const{dispatch} = value;
                    return (
                        <div className="col-md-8 mb-4">
                         <button onClick ={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Add Form" : "Show Add Form"}</button>
                         <Animation pose ={visible ? "visible" : "hidden"}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add User Form</h4>
                                    <div className="card-body">
                                        {
                                            error ?
                                            <div className="alert alert-danger">
                                                Lütfen Eksik Bilgilerinizi Kontrol Edin.
                                            </div>
                                            :null
                                        }
                                        <form onSubmit = {this.addUser.bind(this,dispatch)}>
                                            <div className="form-group">
                                              <label htmlFor="name">Name:</label>
                                              <input
                                               type="text"
                                               name="name"
                                               id="id"
                                               placeholder="Enter Name"
                                               className="form-control"
                                               value ={name}
                                               onChange = {this.changeInput}
                                               ></input>
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="department">Department:</label>
                                              <input
                                               type="text"
                                               name="department"
                                               id="department"
                                               placeholder="Enter Department"
                                               className="form-control"
                                               value ={department}
                                               onChange = {this.changeInput}
                                               ></input>
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="adres">Adres:</label>
                                              <input
                                               type="text"
                                               name="adres"
                                               id="adres"
                                               placeholder="Enter Adres"
                                               className="form-control"
                                               value ={adres}
                                               onChange = {this.changeInput}
                                               ></input>
                                            </div>
                                            <button type="submit" className="btn btn-danger btn-block">Add User</button>
                                        </form>
            
                                    </div>
            
                                </div>
                            </div>
                            </Animation>
                        </div>
                    )

                }

            }
                
            </UserConsumer>
       
    }
}
export default  AddUser;