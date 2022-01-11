import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import './objective2.css'
import { Link } from 'react-router-dom'
import { CBadge } from '@coreui/react'
import { BsPieChart, BsArrowDown } from 'react-icons/bs'
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const pageSize = 10

export default function WidgetLg() {
  const [Objective, setUser] = useState([])
  const [paginatedPosts, setPaginatedPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [ids, setIds] = useState([])
  const [disabled, setDisabled] = useState(0)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result = await axios.get('http://13.212.153.21:3000/refobjectives')
    setUser(result.data)
    setPaginatedPosts(_(result.data).slice(0).take(pageSize).value())
  }

  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo - 1) * pageSize
    const paginatedPost = _(Objective).slice(startIndex).take(pageSize).value()
    setPaginatedPosts(paginatedPost)
  }
  const sort = (objective) => {
    setPaginatedPosts(objective.reverse())
    // console.log("hello");
    // console.log(objective);
  }
  const deleteUser = () => {
    setDisabled(0)
    const id = {
      refObjectiveIds: ids,
    }
    console.log(id)
    axios
      .post(`http://13.212.153.21:3000/deleterefobjectives`, id)
      .then((response) => {
        loadUsers()
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function state() {
    if (disabled == 0) return true
    else return false
  }

  const handleId = (event) => {
    const id = event.target.value
    if (event.target.checked) {
      setIds([...ids, id])
      setDisabled(disabled + 1)
    } else {
      const uncheck = event.target.value
      const index = ids.findIndex((id) => id == uncheck)
      ids.splice(index, 1)
      setDisabled(disabled - 1)
    }
  }

  const DateFormatter = (date) => {
    if (!date) {
      return 'no data'
    }
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let day = date.substring(8, 10)
    let year = date.substring(0, 4)
    const d = new Date(date.substring(0, 10))
    let name = month[d.getMonth()].substring(0, 3)
    return day + ' ' + name + ', ' + year
  }
  const pageCount = Objective ? Math.ceil(Objective.length / pageSize) : 0
  const pages = _.range(1, pageCount + 1)

  return (
    <div className="widgetTitle">
      <div className="widgetLg1">
        <div className="container title">
          <i className="titleIcons  p-2 mb-3 shadow bg-white rounded">
            <BsPieChart size={30} color="red" />
          </i>
          <h3 className="mx-3"> Create New Reference Objective</h3>
        </div>
        <div className="container justify-content-end">
          <i className="titleIcons mr-3 shadow p-2 mb-3 bg-dark rounded">
            <AiFillStar size={30} color="white" />
          </i>
          <Link
            className="text-decoration-none px-5 mx-2 btn text-white"
            to="/objective2/createNewRef"
            id="btn"
          >
            Create
          </Link>
        </div>
      </div>
      <div className="container justify-content-end">
        {/* <span className='border border-danger'><AiOutlineSearch size={30} /> */}
        <input
          placeholder="search...."
          className="border-0 border border-danger"
          type="text"
        ></input>
      </div>
      <div className="widgetLg">
        {/* <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr" key='tableHead'>
              <th className="text-center widgetLgTh col-1" scope="col" >#</th>
              <th className="widgetLgTh col-4" scope="col">Name</th>
              <th className="text-center widgetLgTh" scope="col">Active Since
                <button type='submit bg-black' className='btn p-0' onClick={() => sort(paginatedPosts)}>
                  <BsArrowDown size={30} />
                </button>
              </th>
              <th className="text-center widgetLgTh">Status
                <button type='submit bg-black' className='btn p-0' >
                  <BsArrowDown size={30} />
                </button>
              </th>
              <th className="text-center widgetLgTh col-2">Outcome</th>
              <th className="widgetLgTh text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((user) => (
              <tr key={user.id}>
                <td scope="row" className="text-center"><input type="checkbox" value={user.id} id="checkbox" className='checkbox'
                  onChange={event => handleId(event)}
                /></td>
                <td className="text-start" scope="row">
                <div>
                  <p className='m-0' ><b>{ !user.title ? "Null" : user.title }</b></p>
                  <p>Description</p>
                </div>
                </td>
                <td className="text-center"><b>{DateFormatter(user.updatedOn)}</b></td>
                <td className="text-center">
                  <CBadge color="success">{ !user.status ? "null" : user.status}</CBadge>
                </td>
                <td className="text-center" >{ !user.score ? "" : user.score.toFixed(1) }</td>
                <td className="text-center">
                  <Link className="btn btn-primary" to={'/'+user.id + '/details/'} props={user.id} >Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="col-1 text-center" scope="col">
                #
              </CTableHeaderCell>
              <CTableHeaderCell className="col-2">Name</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Active Since</CTableHeaderCell>
              <CTableHeaderCell>
                <button
                  type="submit bg-black"
                  className="btn p-0"
                  onClick={() => sort(paginatedPosts)}
                >
                  <BsArrowDown size={25} />
                </button>
              </CTableHeaderCell>
              <CTableHeaderCell className="text-end">Status</CTableHeaderCell>
              <CTableHeaderCell>
                <button
                  type="submit bg-black"
                  className="btn p-0"
                  onClick={() => sort(paginatedPosts)}
                >
                  <BsArrowDown size={25} />
                </button>
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center col-2">Outcome</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedPosts.map((user, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <input
                    type="checkbox"
                    value={user.id}
                    id="checkbox"
                    className="checkbox"
                    onChange={(event) => handleId(event)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{!user.title ? '' : user.title}</div>
                  {/* <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div> */}
                </CTableDataCell>
                <CTableDataCell className="text-center" colspan="2">
                  {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                  {DateFormatter(user.updatedOn)}
                </CTableDataCell>

                <CTableDataCell className="text-center" colspan="2">
                  <CBadge color="success">{!user.status ? 'null' : user.status}</CBadge>
                  {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  {/* <CIcon size="xl" icon={item.payment.icon} /> */}
                  {!user.score ? '' : user.score.toFixed(1)}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {/* <div className="small text-medium-emphasis">Last login</div> */}
                  {/* <strong>{item.activity}</strong> */}
                  <Link
                    className="btn btn-primary"
                    to={'/' + user.id + '/details/'}
                    props={user.id}
                  >
                    Details
                  </Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
      <div className="container">
        <div className="container">
          <div className="container justify-content-end">
            <button
              className="btn m-2 bg-white border border-3 border-danger text-danger"
              id="deleteBtn"
              onClick={deleteUser}
              disabled={state()}
            >
              <RiDeleteBin5Line color="red" />
              <b className=" mx-2 pt-1">Delete</b>
            </button>
            {/* <button className="btn m-2 text-danger"><b>Delete</b></button> */}
          </div>
          <div className="container justify-content-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li key="nav_prev" className="page-item">
                  <Link
                    className={currentPage === 1 ? 'page-link disabled-link' : 'page-link'}
                    to="#"
                    aria-label="Previous"
                    onClick={() => pagination(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                {pages.map((page, index) => (
                  <li
                    key={index}
                    className={page === currentPage ? 'page-item active' : 'page-item'}
                  >
                    <Link className="page-link active" to="#" onClick={() => pagination(page)}>
                      {page}
                    </Link>
                  </li>
                ))}
                <li key="nav_next" className="page-item">
                  <Link
                    className={
                      currentPage === pages.length ? 'page-link disabled-link' : 'page-link'
                    }
                    to="#"
                    aria-label="Next"
                    onClick={() => pagination(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
