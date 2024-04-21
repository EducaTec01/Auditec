import React, { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./CreateUserComponent.scss";

const CreateUserComponent = ({ onCancel, onSave }) => {
  const initialUser = { nombreUsuario: "", Nombre: "", Clave: "", RepetirClave: "", Acceso: "Veterinario" };
  const [modifiedUser, setModifiedUser] = useState(initialUser);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordRequirementsError, setPasswordRequirementsError] = useState(false);
  const [usernameLengthError, setUsernameLengthError] = useState(false);
  const [fullNameFormatError, setFullNameFormatError] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [usernameExistsError, setUsernameExistsError] = useState(false); // Nuevo estado para el error de nombre de usuario existente

  useEffect(() => {
    if (passwordChanged) {
      setPasswordMatchError(modifiedUser.RepetirClave !== modifiedUser.Clave);
    }
  }, [modifiedUser.Clave, modifiedUser.RepetirClave, passwordChanged]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "nombreUsuario") {
      newValue = newValue.replace(/[^A-Za-zñÑ0-9]/g, '');
      setUsernameLengthError(newValue.length < 6);
      setUsernameExistsError(false); // Reiniciar el estado de error de nombre de usuario existente al cambiar el nombre de usuario
    } else if (name === "Nombre") {
      newValue = newValue.replace(/[^A-Za-zñÑ\s]+/g, '').replace(/\s{2,}/g, ' ');
      const nameParts = newValue.split(" ");
      setFullNameFormatError(nameParts.length < 2 || nameParts.some(part => part.length === 0));
    }

    setModifiedUser({ ...modifiedUser, [name]: newValue });

    if (name === "Clave") {
      setPasswordMatchError(newValue !== modifiedUser.RepetirClave);
      setPasswordRequirementsError(!validatePassword(newValue));
      setPasswordChanged(true);
    } else if (name === "RepetirClave" && passwordChanged) {
      setPasswordMatchError(newValue !== modifiedUser.Clave);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSave = () => {  
    if (modifiedUser.nombreUsuario.trim() === '') {
      setUsernameLengthError(true);
      return;
    }
  
    if (modifiedUser.Nombre.trim() === '') {
      setFullNameFormatError(true);
      return;
    }
    
    if (usernameLengthError || fullNameFormatError) {
      return;
    }
  
    if (modifiedUser.Clave !== modifiedUser.RepetirClave) {
      setPasswordMatchError(true);
      return;
    }
  
    if (!validatePassword(modifiedUser.Clave)) {
      setPasswordRequirementsError(true);
      return;
    }
  
    // Verificar si el nombre de usuario ya existe
    fetch(`http://localhost:3001/usuario/check-username/${modifiedUser.nombreUsuario}`)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          setUsernameExistsError(true); // Establecer el estado de error de nombre de usuario existente
        } else {
          // Si el nombre de usuario no existe, continuar con la creación del usuario
          fetch('http://localhost:3001/usuario/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedUser),
          })
            .then(response => response.json())
            .then(data => {
              onSave(data);
              setModifiedUser(initialUser); // Resetear el formulario después de guardar con éxito
            })
            .catch(error => console.error('Error creating user:', error));
        }
      })
      .catch(error => console.error('Error checking username:', error));
  };  
  

  return (
    <div className="create-user">
      <h2>Crear Usuario</h2>
      <div className="container">
        <label htmlFor="nombreUsuario">Usuario</label>
        <input type="text" name="nombreUsuario" value={modifiedUser.nombreUsuario} onChange={handleInputChange} />
        {usernameLengthError && <span style={{ color: 'red' }}>El nombre de usuario debe tener al menos 6 caracteres</span>}
        {usernameExistsError && <span style={{ color: 'red' }}>El nombre de usuario ya está en uso. Por favor, elija otro.</span>} {/* Nuevo mensaje de error */}
        <label htmlFor="nombre">Nombre Completo</label>
        <input type="text" name="Nombre" value={modifiedUser.Nombre} onChange={handleInputChange} />
        {fullNameFormatError && <span style={{ color: 'red' }}>El nombre completo debe tener al menos un nombre y un apellido</span>}
        <label htmlFor="clave">Contraseña</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="Clave"
            value={modifiedUser.Clave}
            onChange={handleInputChange}
          />
          <div className="icon">
            <div className="password-icon" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOff style={{ fontSize: '2vw'}}/> : <Visibility style={{ fontSize: '2vw'}} />}
            </div>
          </div>
        </div>
        {passwordRequirementsError && <span style={{ color: 'red' }}>La contraseña debe contener por lo menos: una letra mayúscula, un dígito y 6 caracteres </span>}
        <label htmlFor="repetirClave">Repetir Contraseña</label>
        <input
          type="password"
          name="RepetirClave"
          value={modifiedUser.RepetirClave}
          onChange={handleInputChange}
        />
        {passwordMatchError && !passwordRequirementsError && <span style={{ color: 'red' }}>Las contraseñas no coinciden</span>}
        <label htmlFor="acceso">Tipo de Acceso</label>
        <select name="Acceso" value={modifiedUser.Acceso} onChange={handleInputChange}>
          <option value="Veterinario">Veterinario</option>
          <option value="Recepcionista">Recepcionista</option>
        </select>
        <div className="actions">
          <button 
            style={{ backgroundColor: '#f2f2f2', color: 'black', marginRight: '0.5vw', border: '0.2vw solid #f2f2f2', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }}                              
            onClick={onCancel
            }>Cancelar
          </button>
          <button 
            style={{ backgroundColor: '#d8f3dc', color: 'black', marginLeft: '0vw', border: '0.2vw solid #d8f3dc', padding: '1vw 1vw', borderRadius: '0.5vw', cursor: 'pointer' }} 
            onClick={handleSave}
            >Guardar
          </button>
        </div>
        </div>
    </div>
  );
};

export default CreateUserComponent;
