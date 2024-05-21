import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";


// export const handleRegister = async formData => {
//   event.preventDefault();
//   console.log(formData);
//    if (formData.password !== formData.confirmPassword) {
//     alert("La contraseña no coincide");
//     return;
//   }

//  }; 

function RegisterUserPage() {

  const [fileName, setFileName] = useState('Max 2 MB');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
		firstName: '',
		email: '',
		telefono: '',
		password: '',
		confirmPassword: '',
    lastName1: '',
    lastName2: '',
    photoFile: null,
	});

  const errorRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("La contraseña no coincide");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      // Aquí debes ajustar la URL según tu configuración de backend
      const response = await axios.post('/user/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data); // O manejar la respuesta como necesites
      navigate('/'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        // Verifica específicamente si el mensaje es por un usuario duplicado
        if (error.response.data.msg === 'User already exists') {
          setErrorMsg("El usuario ya existe. Por favor, intenta con otro correo electrónico.");
        } else {
          setErrorMsg(error.response.data.msg); // Otros mensajes de error del backend
        }
      } else {
        setErrorMsg("Error al registrar el usuario. Por favor, intenta de nuevo más tarde.");
      }
      console.error(error);
    }
  };

  const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

  const handleFileChange = event => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0]; // Siempre toma el primer archivo, asegurando que solo se procesa uno
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: file
      }));
      setFileName(file.name); // Actualiza el estado con el nombre del archivo
    }
  };
  
  const styles = {
    //backgroundImage: "url(/src/img/backgroundLogin.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative">
    <header className="bg-red-800 text-white text-4xl font-bold text-center py-4">
    <h1>CompuFacil</h1>
   </header>
    <div className="absolute inset-x-0 bg-cover bg-center"  style={styles} >
      <p
        ref={errorRef}
        className={errorMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>
      <div className="flex flex-col items-center justify-center px-6 my-4 mx-auto lg:py-0">

        <div className="w-full bg-[#edebc9] rounded-lg shadow dark:border max-w-lg xl:p-0 dark:bg-white-800 dark:border-gray-700" >
          <div className="flex flex-col items-center justify-center ">
            <div className="w-6/12 ">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  //onsult(e);
                }}
              >
                <h2 className="my-9 text-[5 0px] font-bold text-center leading-tight tracking-tight text-black text-3xl ">
                  Registro
                </h2>
                <div className="w-full px-3 mb-6 mb-0">
                    <label
                      className="flex justify-center uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-foto"
                    >
                      Foto
                    </label>

                    <div className="flex justify-center items-center ">
                      <div className="relative">
                        <label
                          title="Click to upload"
                          htmlFor ="photoFile"
                          className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-white hover:before:borderwhite group dark:before:borderwhite before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                        >
                          <div className="w-max relative">
                            <img
                              className="w-12"
                              src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                              alt="file upload icon"
                              width="512"
                              height="512"
                            />
                          </div>
                          <div className="relative items-center">
                            <span className="block relative text-black group-hover:text-blue-500">
                              Subir archivo
                            </span>
                            <span className="mt-0.5 block text-sm text-black ">
                              {fileName}
                            </span>
                          </div>
                        </label>
                        <input
                          hidden={true}
                          type="file"
                          name="photoFile"
                          id="photoFile"
                          onChange={handleFileChange}
                        />
                      </div>

                    </div>

                <div className="flex flex-wrap -mx-20 mb-6">
                  <div className="w-full px-3 mb-6 mb-0">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-firstName"
                    >
                      Nombre
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      name='firstName'
                      defaultValue={formData.firstName}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-lastName1"
                    >
                      Apellido 1
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      name='lastName1'
                      defaultValue={formData.lastName1}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-lastName2"
                    >
                      Apellido 2
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      name='lastName2'
                      placeholder=""
                      defaultValue={formData.lastName2}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-20 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-celular"
                    >
                      Correo
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      name='email'
                      defaultValue={formData.email}
                    />
                  </div>         
                </div>

                <div className="flex flex-wrap -mx-20 mb-2">
                  <div className="w-full px-3 mb-6 mb-0">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-descripcion"
                    >
                      Contraseña
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      name='password'
                      defaultValue={formData.password}
                    />
                  </div>
                  <div className="w-full px-3 mb-6 mb-0">
                    <label
                      className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                      htmlFor="grid-descripcion"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      onChange={ handleInputChange}
                      className="appearance-none block w-full bg-white-200 text-black border rounded-2xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white shadow-xl"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      name='confirmPassword'
                      defaultValue={formData.confirmPassword}
                    />
                  </div>
                </div>
                
              
                <div className="flex justify-center flex-wrap -mx-20 mb-2">

                      <div>
                        <button
                          type="submit"
                          className="justify-center text-white bg-red-800 font-medium rounded-lg text-md px-9 py-2.5 text-center 
                    hover:bg-gradient-to-r hover:from-teal-300 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1"
                        >
                          Registrar
                        </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default RegisterUserPage;
