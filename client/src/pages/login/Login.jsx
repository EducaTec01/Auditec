import { useState } from "react"
import "./login.scss"
import Capacitacion from "../capacitacion/capacitacion";
import logoImage from "../../components/login/galgo.jpg";
import logoImageITT from "../../components/login/ITTLogo.png";
import logoAuditec from "../../components/sidebar/logo-transparente.png";

const Login = () => {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);

    const handdleLogin = (e) =>{
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response=> response.json())
            .then(result => {
                console.log(result.token)
                if(result.token){
                    localStorage.setItem('token', result.token)
                    setLoginSuccessful(true);
                    
                } else {
                    setLoginSuccessful(false);
                }
            })
            .catch(error =>{
                console.log(error)
            })
    }

    return (
      <>
        {loginSuccessful ? <Capacitacion />:
          <div className="custom-form">
            <div className="login">
              <div className="loginL">
                <div className="loginLogo">
                  <img src={logoImageITT} alt="ITTLogo" className="logo"/>
                  <img src={logoAuditec} alt="ITTLogo" className="logo"/>
                </div>
  
                <div className="loginBienvenida">
                  <p className="textoBienvenida">Bienvenido</p>
                  <form className="flex flex-col pt-3 md:pt-8" onSubmit={handdleLogin}>
                    <div className="flex flex-col pt-4">
                      <label htmlFor="email" className="text-lg">
                        Usuario
                      </label>
                      <input
                        onChange={(event) => { setUsername(event.target.value) }}
                        placeholder="username"
                        type="text"
                        className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
  
                    <div className="flex flex-col pt-4">
                      <label htmlFor="password" className="text-lg">
                        Contraseña
                      </label>
                      <input
                        onChange={(event) => { setPassword(event.target.value) }}
                        placeholder="password"
                        type="password"
                        className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
  
                    <div className="flex flex-col pt-4">
                      <button
                        type="submit"
                        className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-5 rounded-md"
                      >
                        Iniciar Sesión
                      </button>
                    </div>
  
                    <div className="text-center pt-12 pb-12">
                      <p>
                        ¿Olvidaste tu contraseña? <a href="register.html" className="underline font-semibold">Haz clic.</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
  
              <div className="loginR">
                <img src={logoImage} alt="galgo" className="loginGalgo"/>
              </div>
            </div>
          </div>
        }
      </>
    );
  };

export default Login;