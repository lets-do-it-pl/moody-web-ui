import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { Card, Table } from 'reactstrap';



let UserTableComponent = () => {
 const [users, setUsers] = useState([]);
 

 useEffect(() => {
     const fetchData = async () => {
         const response = await axios.get('http://localhost:1234/api/user');
         setUsers(response.data);
     }
     fetchData();
 }, []);

 const removeData = (id) => {

    axios.delete(`${URL}/${id}`).then(res => {
        const del = users.filter(user => id !== user.id)
        setUsers(del)
    })
  }
  const renderHeader = () => {
    let headerElement = ['id','username', 'password', 'fullName','email',  'isActive', 'userType', 'operation']
  
    return headerElement.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
  }
  
  const renderBody = () => {
    return  users.map(({ id, username, password , fullName,  email , isActive, userType}) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{username}</td>
                <td>{password}</td>
                <td>{fullName}</td>
                <td>{email}</td>
                <td>{isActive}</td>
                <td>{userType}</td>
                
                <td className='operation'>
                          <button className='button' onClick={() => removeData(id)}>Delete</button>
                      </td>                     
            </tr>
        )
    })
  }
 return(
     
    <div>
    <h1 id='title'>User Table</h1>
  <Card className="mb-3">
  
  <Table dark id='user'>
      <thead>
          <tr className="table-dark">{renderHeader()}</tr>              
      </thead>
      <tbody className="table-primary">
          {renderBody()}
      </tbody>
  </Table>
 
      </Card>
 </div>
    
 );

} 
export default UserTableComponent;

        