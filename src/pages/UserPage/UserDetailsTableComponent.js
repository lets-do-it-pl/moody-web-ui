import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { Card, CardBody, Table } from 'reactstrap';

const URL = 'http://localhost:1234/{id}/details'

const UserDetailsTableComponent = () => {
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
      getData()
  }, [])

  const getData = async () => {

    const response = await axios.get(URL)
    console.log('response', response)
    setUserDetails(response.data)
}

const renderHeader = () => {
    let headerElement = ['id','name', 'surname', 'isActive', 'userType', 'createDate']
  
    return headerElement.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return userDetails && userDetails.map(({ id, name, surname, isActive, userType, createDate }) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{isActive}</td>
                <td>{userType}</td>
                <td>{createDate}</td>       
            </tr>
        )
    })
  }
  return (
    <>
        <h1 id='title'>User Details Table</h1>
        <Card className="mb-3">
        <CardBody>
        <Table dark id='userDetails'>
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

export default  UserDetailsTableComponent;