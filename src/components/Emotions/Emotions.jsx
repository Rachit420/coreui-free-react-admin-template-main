import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './emotion.css'

export default function Emotions() {
  const [emotion, setEmotion] = useState([])
  const [ids, setIds] = useState()
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const emotions = await axios.get('http://13.212.153.21:3000/emotions')
    // setUser(emotion.data);
    // console.log(emotions.data);
    setEmotion(emotions.data)
  }
  function drag(ev, value) {
    ev.dataTransfer.setData('Text', ev.target.id)
    setIds(value)
  }
  const id = (value) => {
    // console.log(value)
    // setIds(value);
  }
  const color = ['#0040ff', '#ff8000', 'orange', 'green', 'purple', 'red']

  function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return randomColor
    //random color will be freshly served
  }

  return {
    ids,
    emotion,
    render: (
      <div className="h-75 w-100 row">
        {emotion
          ? emotion.map((data, index) => {
              return (
                <div
                  key={index}
                  className="inputBtn justify-content-center"
                  draggable
                  onDragStart={(event) => drag(event, data.id)}
                  onClick={() => id(data.id)}
                  id={data.id}
                >
                  <input
                    type="button"
                    className="btn btn-circle btn-sm"
                    style={{ background: generateRandomColor() }}
                    key={data.id}
                    id="input"
                    name={data.name}
                    value=""
                  />
                  <br />
                  <label htmlFor={data.name} className="text-center">
                    <b>{data.name}</b>
                  </label>
                </div>
              )
            })
          : 'no Data'}
      </div>
    ),
  }
}
