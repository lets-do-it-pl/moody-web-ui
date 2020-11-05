import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

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

const removeData = (name) => {

  axios.delete(`${URL}/${name}`).then(res => {
      const del = users.filter(user => name !== user.name)
      setUsers(del)
  })
}
const renderHeader = () => {
  let headerElement = ['name', 'surname', 'email', 'isActive', 'userType']

  return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
  })
}

const renderBody = () => {
  return users && users.map(({ name, surname, email, isActive, userType }) => {
      return (
          <tr key={name}>
              <td>{name}</td>
              <td>{surname}</td>
              <td>{email}</td>
              <td>{isActive}</td>
              <td>{userType}</td>
              <td className='opration'>
                        <button className='button' onClick={() => removeData(name)}>Delete</button>
                    </td>
          </tr>
      )
  })
}

return (
  <>
      <h1 id='title'>User Table</h1>
      <table id='user'>
          <thead>
              <tr>{renderHeader()}</tr>
          </thead>
          <tbody>
              {renderBody()}
          </tbody>
      </table>
  </>
)
}
export default UserTableComponent;