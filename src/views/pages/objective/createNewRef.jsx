import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RemoveIcon from '@material-ui/icons/Remove'
import './objective.css'
import { IconButton } from '@material-ui/core'
import { Slider } from '@material-ui/core'
import Emotions from 'src/components/Emotions/Emotions'
import { useHistory } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'

const CreateNewRef = () => {
  const history = useHistory()
  const userData = JSON.parse(sessionStorage.getItem('user-info'))

  const [value1, setValue1] = useState(2)
  const [value2, setValue2] = useState(25)
  const [divIndex, setIndex] = useState('')
  const { render, emotion, ids } = Emotions()
  // console.log(ids);
  const [inputField1, setInputField1] = useState('')
  const [inputField, setInputField] = useState([
    {
      objectiveName: '',
      associatedEmotions: [],
    },
  ])
  function handleChangeInput1(event) {
    // console.log(event.target.value);
    const value = event.target.value
    setInputField1(value)
    // console.log(inputField1);
  }

  const handleChangeInput = (index, event) => {
    const values = [...inputField]
    values[index][event.target.name] = event.target.value
    setInputField(values)
    // console.log(values[index][event.target.name]);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const Data = {
      refObjective: inputField,
      title: inputField1,
      userId: userData.username,
      status: userData.status,
    }
    // console.log('InputField', inputField1, inputField)
    // console.log(inputField[0].objectiveName)
    // console.log(Data.refObjective)
    console.log(Data)
    if (!Data.title) {
      alert('title field can not be empty')
    } else {
      axios
        .post('http://13.212.153.21:3000/saverefobjective', Data)
        .then((response) => {
          history.push('/objective2')
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log('success')
    }
  }

  const AddsubObjective = () => {
    setInputField([...inputField, { objectiveName: '', associatedEmotions: [] }])
  }
  const handleRemoveFields = (index) => {
    const values = [...inputField]
    console.log(index)
    values.splice(index, 1)
    setInputField(values)
  }
  function allowDrop(ev) {
    ev.preventDefault()
  }
  // const catchIndex = drop()
  const drop = (ev, index) => {
    console.log(index)
    ev.preventDefault()
    var data = ev.dataTransfer.getData('Text')
    var Drop = document.getElementById(index).children
    var nodeCopy = document.getElementById(data).cloneNode(true)
    // console.log(nodeCopy)
    // nodeCopy.id = ids /* We cannot use the same ID */
    let count = 0
    for (var i = 0; i < Drop.length; i++) {
      if (Drop[i].id == nodeCopy.id) {
        count++
      }
    }
    if (count == 0) {
      ev.target.appendChild(nodeCopy)
      Drop[i].childNodes[1].hidden = false
      Drop[i].childNodes[1].classList.add('pointer')
      Drop[i].childNodes[1].addEventListener('click', deleteEmot)
    } else if (count > 0) {
      alert(nodeCopy.id + ' exist')
      document.getElementById('emot').classList.remove('disabled')
      return
    }
    // let numb = document.getElementById(Drop).childNodes;
    console.log(Drop)
    // numb[1].hidden = false
    // documnet.gelElementById('hidden').hidden = false
    document.getElementById('emot').classList.add('disabled')
    document.getElementById('expAtt').classList.remove('disabled')
    // console.log(Drop.length)
    // document.getElementById('hidden').addEventListener('click',deleteEmot)
    document.getElementById('createObj').classList.add('disabled')
    setIndex(index)
  }
  // console.log(catchIndex)
  const deleteEmot = (event) => {
    let delEmot = event.currentTarget.parentNode.id
    var index = event.currentTarget.parentNode.parentNode.id
    // console.log(event.currentTarget.parentNode)
    // console.log(event.currentTarget.parentNode.parentNode.id)
    // var emotIndex = inputField
    // console.log(emotIndex)
    console.log(inputField[index].associatedEmotions)
    for (var i = 0; i < inputField[index].associatedEmotions.length; i++) {
      if (inputField[index].associatedEmotions[i].emotionId == delEmot) {
        inputField[index].associatedEmotions.splice(i, 1)
      }
    }
    console.log(inputField[index].associatedEmotions)
    event.currentTarget.parentNode.remove()
    document.getElementById('emot').classList.remove('disabled')
    document.getElementById('expAtt').classList.add('disabled')
    console.log(delEmot)
  }
  const AddEmotions = (index, event) => {
    console.log('nothing to add now')
    const emValue = [...inputField]
    console.log(index)
    emValue[index].associatedEmotions.push(asscociatedEmotion)
    setInputField(emValue)
    //    emotionArray.push(asscociatedEmotion);
    document.getElementById('emot').classList.remove('disabled')
    document.getElementById('expAtt').classList.add('disabled')
    document.getElementById('createObj').classList.remove('disabled')
    console.log(emValue[index].associatedEmotions)
  }

  const handleChange1 = (event, newValue) => {
    setValue1(newValue)
  }
  const handleChange2 = (event, newValue) => {
    setValue2(newValue)
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
      value: 1,
      label: '1%',
    },
    {
      value: 100,
      label: '100%',
    },
  ]
  const asscociatedEmotion = {
    emotionId: ids,
    criticality: value1,
    weightage: value2,
  }

  //   console.log(asscociatedEmotion,Data);
  return (
    <div className="container-fluid newObj">
      <div className="container h-100 justify-content-around">
        <div id="emot" className="container border border-3 h-100 w-25 d-inline-block mt-3">
          <div id="emotion">
            <h5 className="mt-3">Emotions</h5>
            <div className="container emotion">{render}</div>
          </div>
        </div>
        <div className="container border border-3 p-0 h-100 w-50 d-inline-block mt-3 bg-white">
          <div id="createObj" className="border border-bottom mb-4 createObj">
            <div className="px-4 mt-5">
              <label className="">
                <b>Title of the Refrence objective</b>
              </label>
              <br />
              <input
                type="text"
                name="title"
                className="w-100"
                onChange={(event) => handleChangeInput1(event)}
                value={inputField1.title}
              />
            </div>
            {inputField.map((input, index) => {
              return (
                <div key={index}>
                  <div className="mt-5 mb-3 mx-0 p-3 bg-light" id="subObjective">
                    <label className="">
                      <b>Sub objective</b>
                    </label>
                    <IconButton
                      disabled={index == 0}
                      onClick={(event) => handleRemoveFields(index, event)}
                    >
                      <RemoveIcon />
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
                        className="container border emotCont"
                        id={index}
                        name="Drp"
                        onDrop={(event) => drop(event, index)}
                        onDragOver={(event) => allowDrop(event)}
                        style={{ borderStyle: 'dotted', borderRadius: 1 }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
            <button
              className="border border-dark border-2 rounded-3 float-end mx-2"
              id="subBtn"
              onClick={() => AddsubObjective()}
            >
              + Add Sub Objective
            </button>
          </div>
          <div className="container w-100 d-flex justify-content-center">
            <Link className="btn text-white w-50" to="/" id="createObjLink" onClick={handleSubmit}>
              Create
            </Link>
          </div>
        </div>
        <div
          id="expAtt"
          className="container border border-3 h-100 w-25 d-inline-block mt-3 px-3 disabled"
        >
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
            value={value1}
            onChange={handleChange1}
            valueLabelDisplay="on"
            id="customRange1"
          />
          <label htmlFor="customRange2" className="form-label">
            Weightage
          </label>
          <Slider
            min={1}
            max={100}
            marks={Weightage}
            defaultValue={5}
            value={value2}
            onChange={handleChange2}
            valueLabelDisplay="on"
            id="customRange2"
          />
          <button className="btn btn-primary" onClick={(event) => AddEmotions(divIndex, event)}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateNewRef
