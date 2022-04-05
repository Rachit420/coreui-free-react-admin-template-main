import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import RemoveIcon from '@material-ui/icons/Remove'
import './editrefNew.css'
import '../../../components/Emotions/emotion.css'
import { IconButton } from '@material-ui/core'
import { Slider } from '@material-ui/core'
import Emotions from 'src/components/Emotions/Emotions'
import { useHistory } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'

const EditrefNew = () => {
  const history = useHistory()
  const userData = JSON.parse(sessionStorage.getItem('user-info'))

  const { id } = useParams()
  const [value1, setValue1] = useState(2)
  const [value2, setValue2] = useState(25)
  const [divIndex, setIndex] = useState('')
  const { render, emotion, ids } = Emotions()
  const [emotId, setEmotIds] = useState('')
  // console.log(ids);
  const [inputField1, setInputField1] = useState('')
  const [inputField, setInputField] = useState([
    {
      objectiveName: '',
      associatedEmotions: [],
    },
  ])
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
    console.log(resp.data)
    const data = resp.data
    setDetails(data)
    // setInputFieldNew(resp.data.refObjective)
    setInputField(resp.data.refObjective)
    setInputField1(resp.data.title)
    // console.log(details.refObjective)
  }

 
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
    // if (inputField.length > 0) {
    //   for (var i = 0; i < inputField.length; i++) {
    //     if (inputField[i].objectiveName === '') {
    //       return alert('objective name is empty')
    //     } else if (inputField[i].associatedEmotions.length == 0) {
    //       return alert('No emotion added')
    //     }
    //   }
    // }
    // for (var i = 0; i < details.refObjective.length; i++) {
    //   inputField.push(details.refObjective[i])
    // }
    // console.log(inputField)
    const Data = {
      refObjective: inputField,
      refObjectiveId: id,
      status: details.status,
      userId: userData.username,
      title:inputField1,
    }
    // console.log('InputField', inputField)
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
    setEmotIds(ids)
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
      // ev.target.appendChild(nodeCopy)
      // Drop[i].childNodes[1].hidden = false
      // Drop[i].childNodes[1].classList.add('pointer')
      // Drop[i].childNodes[1].addEventListener('click', deleteEmot)
      console.log('true')
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
    document.getElementById('createObj').classList.add('disabled')
    document.getElementById('expAtt').classList.remove('disabled')
    // console.log(Drop.length)
    // document.getElementById('hidden').addEventListener('click',deleteEmot)
    setIndex(index)
  }
  // console.log(catchIndex)
  const deleteEmot1 = (event) => {
    let delEmot = event.currentTarget.parentNode.id
    var index = event.currentTarget.parentNode.parentNode.id
    console.log(event.currentTarget.parentNode)
    console.log(event.currentTarget.parentNode.parentNode.id)
    // var emotIndex = inputField
    console.log(delEmot)
   
    // event.currentTarget.parentNode.remove()
    const val = [...inputField]
    // console.log(inputField[index].associatedEmotions)
    for (var i = 0; i < val[index].associatedEmotions.length; i++) {
      if (val[index].associatedEmotions[i].emotionId == delEmot) {
        val[index].associatedEmotions.splice(i, 1)
      }
    }
    setInputField(val)
  
    console.log(inputField[index].associatedEmotions)

    document.getElementById('emot').classList.remove('disabled')
    document.getElementById('expAtt').classList.add('disabled')
    console.log(delEmot)
  }

  const deleteEmot = (event) => {
    let delEmot = event.currentTarget.parentNode.id
    var index = event.currentTarget.parentNode.parentNode.id
    console.log(event.currentTarget.parentNode)
    console.log(event.currentTarget.parentNode.parentNode.id)
    // var emotIndex = inputField
    console.log(delEmot)
   
    event.currentTarget.parentNode.remove()
    const val = [...inputField]
    // console.log(inputField[index].associatedEmotions)
    for (var i = 0; i < val[index].associatedEmotions.length; i++) {
      if (val[index].associatedEmotions[i].emotionId == delEmot) {
        val[index].associatedEmotions.splice(i, 1)
      }
    }
    setInputField(val)
  
    console.log(inputField[index].associatedEmotions)

    document.getElementById('emot').classList.remove('disabled')
    document.getElementById('expAtt').classList.add('disabled')
    console.log(delEmot)
  }


  const AddEmotions = (index, event) => {
    console.log('nothing to add now')
    const emValue = [...inputField]
    console.log(emotId)
    console.log(index)
    console.log(emValue[index].associatedEmotions.length)
    console.log(asscociatedEmotion.emotionId)
    // var EmotName = event.currentTarget.name
    if(emValue[index].associatedEmotions.length == 0){
      console.log('noadding')
      emValue[index].associatedEmotions.push(asscociatedEmotion)
    }
    else{
      let j = 0
      let count = 0
      // const j = emValue[index].associatedEmotions.emotionId.indexOf(asscociatedEmotion.emotionId)
      for(var i=0; i< emValue[index].associatedEmotions.length; i++){
       
      if(asscociatedEmotion.emotionId == emValue[index].associatedEmotions[i].emotionId){
      
      j=i
      count++
      }
     
    }
    if(count == 0){
      emValue[index].associatedEmotions.push(asscociatedEmotion)
    }else{
      emValue[index].associatedEmotions[j].criticality = critically
        emValue[index].associatedEmotions[j].weightage = weightage
    }
  }
  document.getElementById('createObj').classList.remove('disabled')
    // emValue[index].associatedEmotions.push(asscociatedEmotion)
    setInputField(emValue)
    //    emotionArray.push(asscociatedEmotion);
    document.getElementById('emot').classList.remove('disabled')
    document.getElementById('expAtt').classList.add('disabled')
    console.log(emValue[index].associatedEmotions)
  }

  function value(event,value1, value2) {
    var index = event.currentTarget.parentNode.parentNode.id
    console.log(event.currentTarget.name)
    setEmotIds(event.currentTarget.name)
    setIndex(index)
    console.log(index)
    console.log(value1, value2)
    setCritically(value1)
    setWeightage(value2)
    document.getElementById('expAtt').classList.remove('disabled')
    document.getElementById('emot').classList.add('disabled')
    document.getElementById('createObj').classList.add('disabled')
  }

  const color = ['#0040ff', '#ff8000', 'orange', 'green', 'purple']

  const handleChange1 = (event, newValue) => {
    setCritically(newValue)
  }
  const handleChange2 = (event, newValue) => {
    setWeightage(newValue)
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
    emotionId: emotId,
    criticality: critically,
    weightage: weightage,
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
          <div id='createObj' className="border border-bottom mb-4 createObj">
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
                value={inputField1}
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
                        style={{borderStyle: 'dotted', borderRadius: 1}}
                      >
                       
                        {
                        input.associatedEmotions.map((sub, index) => {
                          return (
                        
                            <div key={index} className="inputBtn justify-content-center" id={sub.emotionId}>
                              <span className="close pointer" onClick={(event) => deleteEmot1(event)}>
                                <TiDeleteOutline color="red" id="deleteButton" />
                              </span>
                            
                                <input
                                  type="button"
                                  className="btn btn-circle btn-sm"
                                  style={{ background: color[index] }}
                                  onClick={(event) => value(event,sub.criticality, sub.weightage)}
                                  id="input"
                                  name={sub.emotionId}
                                  value=""
                                />
                                <br />
                                <label htmlFor={sub.emotionId} className="text-center">
                                  <b>{sub.emotionId}</b>
                                </label>
                            
                                {/* <p key={sub.score}>{sub.score ? sub.score.toFixed(2) : ''}</p> */}
                              
                            </div>
                    
                          )
                        })
                      }
                       
                      </div>
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
          <Link to="/objective2" className="btn btn-primary mx-2">
              Cancel
            </Link>
          <Link to="" className="btn btn-warning" onClick={handleSubmit}>
              Apply Changes
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
            value={critically}
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
            value={weightage}
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
export default EditrefNew
