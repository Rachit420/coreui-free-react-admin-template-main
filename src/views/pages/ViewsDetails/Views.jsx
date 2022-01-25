import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './view.css'
import { Link, useParams } from 'react-router-dom'
import { Slider } from '@material-ui/core'

const Details = () => {
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const resp = await axios.get(
      `http://13.212.153.21:3000/aggregateemotionrefobjective?refObjectiveId=${id}`,
    )
    console.log(resp)
    const data = resp.data
    setDetails(data)
    console.log(data)
  }

  const [details, setDetails] = useState({
    refObjective: [],
    title: '',
    score: '',
  })
  // const [associatedEmotion, setAssociatedEmotion] = useState([{}]);
  const [critically, setCritically] = useState(2)
  const [weightage, setWeightage] = useState(0)

  function value(value1, value2) {
    // console.log(value1,value2);
    setCritically(value1)
    setWeightage(value2)
  }
  const Critically = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 5,
      label: '5',
    },
  ]

  const Weightage = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 100,
      label: '100%',
    },
  ]

  const color = ['#0040ff', '#ff8000', 'orange', 'green', 'purple']

  return (
    <div className="container h-100">
      <div className="w-75 bg-white referenceTable">
        <div className="container">
          <p>
            <b>
              Reference objective <span>{details.title}</span>
            </b>
          </p>
        </div>
        <div className="h-75 m-2" id="refObj">
          {details.refObjective
            ? details.refObjective.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="container justify-content-between">
                      <p>
                        <b>{item.objectiveName}</b>
                      </p>
                      <p>
                        <b>{item.score ? item.score.toFixed(1) : ''}%</b>
                      </p>
                    </div>
                    <div className="container">
                      {item.associatedEmotions.map((sub, index) => {
                        return (
                          <div key={index} className="inputBtn justify-content-center">
                            <li>
                              <input
                                type="button"
                                className="btn btn-circle btn-sm"
                                style={{ background: color[index] }}
                                onClick={() => value(sub.criticality, sub.weightage)}
                                id="input"
                                name={sub.emotionId}
                                value=""
                              />
                            </li>
                            <li>
                              <label htmlFor={sub.emotionId} className="text-center">
                                <b>{sub.emotionId}</b>
                              </label>
                            </li>
                            <li>
                              <p>{sub.score ? sub.score.toFixed(2) : ''}</p>
                            </li>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            : 'loading...'}
        </div>
        <div className="d-flex justify-content-end mx-3">
          <Link to={'/details/' + id + '/edit'} className="btn btn-primary w-25" id="editBtn">
            Edit
          </Link>
        </div>
      </div>
      <div className="border border-3 w-30 d-inline-block referenceTable">
        <div className="m-3">
          <h5 className="mt-3">Expression attributes</h5>
          <b>
            <p>Flexibility</p>
          </b>
          <label htmlFor="customRange2" className="form-label">
            Critically
          </label>
          <Slider
            min={1}
            max={5}
            marks={Critically}
            defaultValue={2}
            value={critically}
            valueLabelDisplay="on"
            id="customRange2"
          />
          <label htmlFor="customRange2" className="form-label">
            Weightage
          </label>
          <Slider
            min={0}
            max={100}
            marks={Weightage}
            defaultValue={5}
            value={weightage}
            valueLabelDisplay="on"
            id="customRange2"
          />
        </div>
      </div>
    </div>
  )
}

export default Details
