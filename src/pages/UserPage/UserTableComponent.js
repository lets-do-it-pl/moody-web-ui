import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Table } from 'reactstrap';


const URL = 'http://localhost:1234/api/users'

const UserTableComponent = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
      getData()
  }, [])

  const getData = async () => {

    const response = await axios.get(URL)
    console.log('response', response)
    setUsers(response.data)
}

const removeData = (id) => {

  axios.delete(`${URL}/${id}`).then(res => {
      const del = users.filter(user => id !== user.id)
      setUsers(del)
  })
}
const renderHeader = () => {
  let headerElement = ['id','name', 'surname', 'isActive', 'userType', 'operation']

  return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
  })
}

const renderBody = () => {
  return users && users.map(({ id, name, surname, isActive, userType }) => {
      return (
          <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{surname}</td>
              <td>{isActive}</td>
              <td>{userType}</td>
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