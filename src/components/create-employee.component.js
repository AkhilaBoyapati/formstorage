import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class CreateEmployee extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeePhone = this.onChangeEmployeePhone.bind(this);
    //this.onChangeEmployeeAddress = this.onChangeEmployeeAddress.bind(this);
    this.addAddress =this.addAddress.bind(this);
    this.handleChange =this.handleChange.bind(this);
    this.handleRemove=this.handleRemove.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      phone: '',
      Address:[{pincode:'',address:'',fromdate:new Date(),todate:new Date()}]
    // Address:[{address:'',pincode:''}],
  /*address:{},
     Address:[address]   */
      
    }
  }

  onChangeEmployeeName(e) {
    this.setState({name: e.target.value})
  }

  onChangeEmployeeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeEmployeePhone(e) {
    this.setState({phone: e.target.value})
  }

//  onChangeEmployeeAddress(e) {
//     this.setState({Address:e.target.value})
//   }
  

 /* onChangeEmployeeAddress1(e) {
    this.setState({address1: e.target.value})
  }

  onChangeEmployeeAddress2(e) {
    this.setState({address2: e.target.value})
  }*/

  onSubmit(e) {
    e.preventDefault()

    console.log(`Employee successfully created!`);
    console.log(`Name: ${this.state.name}`);
    console.log(`Email: ${this.state.email}`);
    console.log(`Phone: ${this.state.phone}`);
    /*console.log(`address:${this.state.address}`);
    console.log(`address1:${this.state.address1}`);
    console.log(`address1:${this.state.address2}`);*/


    this.setState({name: '', email: '', phone: '',Address:[{pincode:'',address:'',fromdate:'',todate:''}]})

   const employeeObject = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      Address:this.state.Address
    
      
    };
    axios.post('http://localhost:4000/employees/create-employee', employeeObject)
      .then(res => console.log(res.data));

    this.setState({ name: '', email: '', phone: '' })
    console.log(employeeObject)
  }

  addAddress(){
    
    this.setState( {Address:[...this.state.Address,{address:'',pincode:'',fromdate:'',todate:''}]})
  }

  
  handleChange(index,e){
    const values=[...this.state.Address];
    values[index][e.target.name]=e.target.value;
    this.setState(values);
    //this.setState({Address:''})
  }
  handleRemove(index){
    this.state.Address.splice(index,1);
    console.log(this.state.Address,'$$$$')
  this.setState({Address:this.state.Address})
  
  }
  

   render() 
   {
  //let add=this.state.Address
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeEmployeeName}/>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmployeeEmail}/>
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={this.state.phone} onChange={this.onChangeEmployeePhone}/>
        </Form.Group>

       {/* <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.Address.address} onChange={this.onChangeEmployeeAddress}/><br/>
          <Form.Control type="text" value={this.state.address1} onChange={this.onChangeEmployeeAddress1}/><br/>
          <Form.Control type="text" value={this.state.address2} onChange={this.onChangeEmployeeAddress2}/>
  </Form.Group>*/}
  {
    
       this.state.Address.map((add,index)=>
       {
             return(
              <div key={index}>
            <Form.Label>Address</Form.Label>
             <Form.Control type="text" value={add.address} onChange={(e)=>this.handleChange(index,e)} name="address" placeholder="address"/><br/>
             <Form.Control type="text" value={add.pincode} onChange={(e)=>this.handleChange(index,e)} name="pincode" placeholder="pincode"/><br/>
             {/* <DatePicker
              selected={this.state.Address.fromdate}
              name="fromdate" placeholder="FromDate"
               onChange={(date)=>this.setState(
                
                 { Address:[...this.state.Address,{fromdate:date}]},
                 console.log(this.state.Address)
                
               )
             
              }
             
              /> <br/> */}
               
            
             {/* <DatePicker
              selected={this.state.Address.todate}
              name="todate" placeholder="ToDate"  
               onChange={(date)=> this.setState(
               {Address:[...this.state.Address,{todate:date}]}
              ) }
               
            /><br/> */}
             <Form.Control type="datetime-local" value={add.fromdate} onChange={(e)=>this.handleChange(index,e)} name="fromdate" placeholder="FromDate"/><br/>
             <Form.Control type="datetime-local" value={add.todate} onChange={(e)=>this.handleChange(index,e)} name="todate" placeholder="ToDate"/><br/>
             
             &nbsp;<Button variant="primary" onClick={()=>this.addAddress(index)}> Add</Button>&nbsp;&nbsp;
              <Button  variant ="danger"  onClick={()=>this.handleRemove(index)}>Remove</Button>
                    
              </div>
            );
          })
        
        }
        &nbsp; <Button variant="success" size="lg" block="block" type="submit">&nbsp;
          Create Employee
        </Button>
      </Form>
    </div>);
  }
}