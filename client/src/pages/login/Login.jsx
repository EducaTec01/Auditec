import { useState } from "react"
import "./login.scss"

const Login = () => {

  const  [password, setPassword] = useState ('')
  const  [user , setUser] = useState ('')

  const handdleLogin = (e) =>{
    e.preventDefault();
    const data = {
      user: user,
      password: password
    };

    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json'
      },
      body: JSON.stringify(data)
    })
     .then(response => response.json())
     .then(result => {
        console.log(result)
     })
     .catch(error =>{
        console.log(error)
     })
  }

  return (
    <div>
      <form>
        <label>User:</label>
        <input onChange={(event) => {setUser(event.target.value)} } placeholder="user" type="text"/>
        <label>Password:</label>
        <input onChange={(event) => {setPassword(event.target.value)}} placeholder="password" type="password"/>
        <button onClick={handdleLogin}>LOGIN</button>
      </form>
    </div>
  )
}

export default Login