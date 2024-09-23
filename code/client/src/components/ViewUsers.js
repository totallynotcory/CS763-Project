//will update this file with better error handling as per Mosh video

import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient.js';

function ViewUsers() {

    const [data, setData] = useState([{}])
  
    useEffect(() => {
        apiClient.get('/view-users')
        .then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
        <h1>Viewing Users</h1>
        {(typeof data === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            data.map((user, i) => (
            <p key={i}>{i+1}.  ID: {user.userId}  |  Name: {user.name}  |  Email: {user.email}</p>
            ))
        )}
        </>
    )
  }
  
  export default ViewUsers

