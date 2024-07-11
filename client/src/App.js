import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  
  const [userList, setUserList] = useState([]);
  
  const addUser = () => {
    Axios.post('http://localhost:3000/create', {
      name: name, 
      age: age, 
      email: email, 
      position: position
    }).then((response) => {
      setUserList([...userList, 
        {
        name: name, 
        age: age, 
        email: email, 
        position: position,
        }
     ]);
     console.log(response);
    });
  };

  const getUsers = () => {
    Axios.get('http://localhost:3000/users').then((response) => {
      setUserList(response.data);
    });
  }
  
  return (
    <div className="App">
      <div className="data">

      <label>Name:</label>
      <input type="text" onChange={(event) => {
        setName(event.target.value);
      }} />

      <label>Age:</label>
      <input type="Number" onChange={(event) => {
        setAge(event.target.value);
      }} />

      <label>Email</label>
      <input type="text" onChange={(event) => {
        setEmail(event.target.value);
      }} />

      <label>Position:</label>
      <input type="text" onChange={(event) => {
        setPosition(event.target.value);
      }} />

      <button onClick={addUser}>Add User</button>
      </div>
      
      <div className='users'>
        <button onClick={getUsers}>Show Users</button>

        {userList.map((val, key) => {
          return <div className='user'> 
          <h3>Name: {val.name}</h3> 
          <h3>Age: {val.age}</h3>
          <h3>Email: {val.email}</h3>
          <h3>Position: {val.position}</h3>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
