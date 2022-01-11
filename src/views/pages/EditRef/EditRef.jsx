import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import RemoveIcon from '@material-ui/icons/Remove'
import { IconButton } from '@material-ui/core'
import Emotions from 'src/components/Emotions/Emotions'
import './editRef.css'
import axios from 'axios'
import { Slider } from '@material-ui/core'

const EditRef = () => {
  const { id } = useParams()
  const history = useHistory()
  const { render, emotion, ids } = Emotions()
  const [inputField, setInputField] = useState([
    {
      objectiveName: '',
      associatedEmotions: [],
    },
  ])
  // const [newDetails, setNewDetails] = useState({
  //     objectiveName:'',
  //     associatedEmotions:[]
  // });
  const [details, setDetails] = useState({
    refObjective: [],
    title: '',
    score: '',
  })
  const [critically, setCritically] = useState(2)
  const [weightage, setWeightage] = useState(0)

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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    for (var i = 0; i < details.refObjective.length; i++) {
      inputField.push(details.refObjective[i])
    }
    console.log(inputField)

    const Data = {
      refObjective: inputField,
      refObjectiveId: id,
      status: 'Active',
      userId: 'kunal',
      title: 'Title',
    }
    // console.log("InputField",inputField1,inputField);
    console.log(Data)
    axios
      .post('http://13.212.153.21:3000/saverefobjective', Data)
      .then((response) => {
        history.push('/objective2')
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const AddsubObjective = () => {
    setInputField([...inputField, { objectiveName: '', associatedEmotions: [] }])
  }

  const handleChangeInput = (index, event) => {
    const values = [...inputField]
    values[index][event.target.name] = event.target.value
    setInputField(values)
    // console.log(values[index][event.target.name]);
  }

  const AddEmotions = (index, event) => {
    console.log('nothing to add now')
    const emValue = [...inputField]
    console.log(index)
    emValue[index].associatedEmotions.push(asscociatedEmotion)
    setInputField(emValue)
    //    emotionArray.push(asscociatedEmotion);

    console.log(emValue[index].associatedEmotions)
  }

  const handleRemoveFields = (index) => {
    const values = [...inputField]
    console.log(index)
    values.splice(index, 1)
    setInputField(values)
  }

  function value(value1, value2) {
    console.log(value1, value2)
    setCritically(value1)
    setWeightage(value2)
  }

  function allowDrop(ev) {
    ev.preventDefault()
  }

  function drop(ev, index) {
    ev.preventDefault()
    var data = ev.dataTransfer.getData('Text')
    var Drop = document.getElementById(index).children
    var nodeCopy = document.getElementById(data).cloneNode(true)
    nodeCopy.id = ids /* We cannot use the same ID */
    let count = 0
    for (var i = 0; i < Drop.length; i++) {
      if (Drop[i].id == nodeCopy.id) {
        count++
        console.log(count)
      }
    }
    if (count == 0) {
      ev.target.appendChild(nodeCopy)
    } else if (count > 0) {
      alert(nodeCopy.id + ' exist')
    }
  }

  const handleChange1 = (event, newValue) => {
    setCritically(newValue)
  }
  const handleChange2 = (event, newValue) => {
    setWeightage(newValue)
  }

  const asscociatedEmotion = {
    emotionId: ids,
    criticality: critically,
    weightage: weightage,
  }
  const handleDatat = () => {
    console.log(details.title)
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
    <div className="container mt-0">
      <div className="container justify-content-around h-100">
        <div className="container border border-3 w-25 d-inline-block bg-red mt-3">
          <div id="emotion" className="editTable">
            <h5 className="mt-3">Emotions</h5>
            <div className="mx-3">{render}</div>
          </div>
        </div>
        <div className="container border h-100 w-50 d-inline-block mt-3 bg-white">
          <div className="refObjective row" id="refObjective">
            <p className="p-0 mx-2 mt-2">
              <b>
                Reference objective <span>{details.title}</span>
              </b>
            </p>
            <div className="row mt-0">
              {details.refObjective
                ? details.refObjective.reverse().map((item, index) => {
                    return (
                      <>
                        <div key={index} className="container w-100 justify-content-between">
                          <p key={item.objectiveName}>
                            <b>{item.objectiveName}</b>
                          </p>
                          <p key={item.id}>
                            <b>{item.score ? item.score.toFixed(1) : 'null'}%</b>
                          </p>
                        </div>
                        <div key={index + 1} className="container">
                          {item.associatedEmotions.map((sub, index) => {
                            return (
                              <div key={index} className="inputBtn justify-content-center">
                                <li>
                                  <input
                                    type="button"
                                    className="btn btn-circle btn-sm"
                                    style={{ background: color[index] }}
                                    onClick={() => value(sub.criticality, sub.weightage)}
                                    key={sub.emotionId}
                                    id="input"
                                    name={sub.emotionId}
                                    value=""
                                  />
                                </li>
                                <li>
                                  <label
                                    htmlFor={sub.emotionId}
                                    key={sub.emotionId}
                                    className="text-center"
                                  >
                                    <b>{sub.emotionId}</b>
                                  </label>
                                </li>
                                <li>
                                  <p key={sub.emotionId}>{sub.score ? sub.score.toFixed(2) : ''}</p>
                                </li>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )
                  })
                : 'loading...'}
            </div>
            <div className="row" id="subObjective">
              {inputField.map((input, index) => {
                return (
                  <div key={index}>
                    <div className="mb-3 mx-0 p-3 bg-light" id="subObjective">
                      <label className="">
                        <b>Sub objective</b>
                      </label>
                      <IconButton>
                        <RemoveIcon onClick={(event) => handleRemoveFields(index, event)} />
                      </IconButton>
                      <br />
                      <input
                        type="text"
                        className="w-100"
                        name="objectiveName"
                        value={input.objectiveName}
                        onChange={(event) => handleChangeInput(index, event)}
                      />
                      <p className="m-3">
                        <b>Add Behaviours/Emotions to be measured</b>
                      </p>
                      <div className="container" id="div1">
                        <div
                          className="container bg-white"
                          id={index}
                          onDrop={(event) => drop(event, index)}
                          onDragOver={(event) => allowDrop(event)}
                        ></div>
                        <div>
                          <button
                            className="btn border border-dark rounded-circle float-end mx-2"
                            name="associatedEmotions"
                            type="button"
                            onClick={(event) => AddEmotions(index, event)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className=" border-bottom">
              <button
                className="btn border border-dark border-2 float-end"
                id="subBtn1"
                onClick={() => AddsubObjective()}
              >
                + Add Sub Objective
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-end m-3">
            <Link to="/objective2" className="btn btn-primary mx-2">
              Cancel
            </Link>
            <Link className="btn btn-warning" onClick={handleSubmit}>
              Apply Changes
            </Link>
          </div>
        </div>
        <div className="container border border-3 w-25 d-inline-block mt-3">
          <div className="editTable">
            <h5 className="mt-3">Expression attributes</h5>
            <div className="mt-4">
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
                onChange={handleChange1}
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
                defaultValue={50}
                value={weightage}
                onChange={handleChange2}
                valueLabelDisplay="on"
                id="customRange2"
              />
            </div>
            {/* <button type='button' className='btn btn-primary' onClick={() => handleDatat()}>Apply</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditRef
