import { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const res = await axios.post(`http://localhost:3000/${endpoint}`, { 
        username: user, 
        password: pass 
      });

      if (isRegister) {
        alert("Registered Successfully!");
      } else {
        // Log the token to the browser console for debugging
        console.log("Your Login Token:", res.data.token); 
        alert("Login Successful");
      }

    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div>
      <h1>{isRegister ? "Register" : "Login"}</h1>
      <input placeholder="User" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Pass" onChange={e => setPass(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      
      <button onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
}

export default App;