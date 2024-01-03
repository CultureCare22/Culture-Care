import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">Intake Form</header>
      <br></br>
      <form>
        <text>Hello Mrs.Ramirez,</text>
        <br></br>
        <br></br>
        <text className='form-text'>
          I hope you are well. My name is <input type='text' placeholder="Name"/>. 

        I am a <select>
          <option value="Teen">Teen</option>
          <option value="Adult" selected>Adult</option>
          <option value="Student">Student</option>
        </select> in <input type='text' placeholder="Location"/>.

        I am reaching out because I am interested in receiving therapy for <input type='text' placeholder="Area of Concerns"/>. 

        It is  <select>
          <option value="First time">my first time</option>
          <option value="Not first time" selected>NOT my first time</option>
        </select> receiving therapy.

        Is there any way I can begin the process with you?
        <br></br>
        Sincerely,
        <br></br>
        <input type='text' placeholder="Name"/>
        
        </text>
      </form>

      
    </div>
  );
}

export default App;
