import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Table } from 'reactstrap';
import API from '../../api/API';


const UserTableComponent = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
      setUsers([userData])
      userData()
  }, [])


 const userData = API.GetUsers;

const removeData = (id) => {

  axios.delete(`${URL}/${id}`).then(res => {
      const del = users.filter(user => id !== user.id)
      setUsers(del)
  })
}
const renderHeader = () => {
  let headerElement = ['id','name', 'surname', 'isActive', 'userType', 'email', 'operation']

  return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
  })
}

const renderBody = () => {
  return users && users.map(({ id, name, surname, isActive, userType, email }) => {
      return (
          <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{surname}</td>
              <td>{isActive}</td>
              <td>{userType}</td>
              <td>{email}</td>
              <td className='operation'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                    
          </tr>
      )
  })
}
return (
  <>
      <h1 id='title'>User Table</h1>
      <Card className="mb-3">
      <CardBody>
      <Table dark id='user'>
          <thead>
              <tr className="table-dark">{renderHeader()}</tr>              
          </thead>
          <tbody className="table-primary">
              {renderBody()}
          </tbody>
      </Table>
      </CardBody>
          </Card>
  </>
)
}
export default UserTableComponent;