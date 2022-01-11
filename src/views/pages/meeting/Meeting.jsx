import './meeting.css'

export default function Transaction() {
  return (
    <div className="newUser bg-white align-items-center">
      <div className=''>
      <div className="container align-items-center justify-content-center">
        <h1 className="newUserTitle">Meeting ID</h1>
      </div>
      <div className="newUserForm">
        <form>
          <div className="newUserItem">
            <label>User ID</label>
            <input type="text" placeholder="john" required />
          </div>
          <div className="newUserItem">
            <label>Client ID</label>
            <input type="text" placeholder="John Smith" />
          </div>
          <div className="newUserItem">
            <label>Ref Objective ID</label>
            <input type="RefObjective ID" placeholder="john@gmail.com" />
          </div>
          <div className="newUserItem">
            <label>Text</label>
            <input type="Text" placeholder="Text" />
          </div>
          <div className="newUserItem">
            <label>Start Time</label>
            <input type="text" placeholder="Start Time" />
          </div>
          <div className="newUserItem">
            <label>End Time</label>
            <input type="text" placeholder="End Time" />
          </div>
          <div className="Button container justify-content-center">
            <button className="newUserButton">Create</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}
