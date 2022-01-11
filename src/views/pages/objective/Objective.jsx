import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './objective.css'
import { Link } from 'react-router-dom'
import { CBadge } from '@coreui/react'
import { BsPieChart } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'

export default function WidgetLg() {
  const [users, setUser] = useState([])

  useEffect(() => {
    // console.log("Kaisa hai");
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:3003/users')
    setUser(result.data.reverse())
    console.log(result)
  }

  return (
    <div className="widgetTitle">
      <div className="widgetLg1">
        <h3>
          <icon className="mx-auto pb-3 shadow p-2 mb-3 bg-white rounded">
            <BsPieChart size={30} color="red" />
          </icon>{' '}
          Create New Reference Objective
        </h3>
        {/* <p>This dashboard was created was an example of the flexability that arichetet offer</p></h3> */}
        <div className="CreateButton">
          <icon className="mr-3 shadow p-2 mb-3 bg-dark rounded">
            <AiFillStar size={30} color="white" />
          </icon>
          <button className="btn px-5" id="btn">
            <Link className="text-decoration-none text-white" to="/objective/createNewRef">
              Create
            </Link>
          </button>
        </div>
      </div>
      <div className="widgetLg">
        <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr">
              <th className="text-center" scope="col">
                #
              </th>
              <th className="widgetLgTh col-4" scope="col">
                Name
              </th>
              <th className="text-center" scope="col">
                Active Since
              </th>
              <th className="text-center">Status</th>
              <th className="text-center col-2">Outcome</th>
              <th className="widgetLgTh text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td scope="row" className="text-center">
                  <input type="checkbox" className="checkbox" value={user.id} id="checkbox" />
                </td>
                <td className="text-start" scope="row">
                  {user.name}
                </td>
                <td className="text-center">{user.activeSince}</td>
                <td className="text-center">
                  <CBadge color="success">{user.status}</CBadge>
                </td>
                <td className="text-center">{user.outcome}</td>
                <td className="text-center">
                  <button className="btn btn-primary">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn m-2 bg-white border border-3 border-danger"
          id="deleteBtn" /*onClick={deleteUser}*/
        >
          <RiDeleteBin5Line color="red" />
        </button>
        <button className="btn m-2 px-5 text-white bg-success">Edit</button>
      </div>
    </div>
  )
}
