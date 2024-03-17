import { useEffect } from "react"
import { useForm } from "react-hook-form"
import './styles/FormUser.css'

const FormUser = ({ createUser, userEdit, updateUser, setUserEdit, formIsClose, setFormIsClose, handleShowMessage }) => {

  const { handleSubmit, register, reset } = useForm()


  useEffect(() => {
    //llenar el formulario
    reset(userEdit)
  }, [userEdit])


  const submit = data => {

    if (userEdit) {
      updateUser('/users/', userEdit.id, data)
      handleShowMessage()
      setUserEdit()
    }
    else {
      createUser('/users/', data)
      handleShowMessage()
    }

    setFormIsClose(true)
    //limpiar el formulario
    reset(
      {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
      }
    )
  }


  const handleFormClose = () => {
    setFormIsClose(true)
    reset(
      {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
      }
    )
    setUserEdit()
  }

  return (
    <div className={`form-container ${formIsClose && 'form__close'}`}>
      <form className="form" id="form" onSubmit={handleSubmit(submit)}>
        <header className="form__header">
          <h2 className="form__title"> Crud Usuario </h2>
          <div onClick={handleFormClose} className="form__exit">
            <i className='bx bx-x'></i>
          </div>
        </header>
        <label className="form__label">
          <span className="form__field">Correo</span>
          <input className="form__input" placeholder="nombre@dominio.com" {...register('email')} type="email" required autoComplete="off" maxLength={150} />
        </label>
        <label className="form__label">
          <span className="form__field">Contraseña</span>
          <input className="form__input" placeholder="123456" {...register('password')} type="password" required autoComplete="off" maxLength={25} />
        </label>
        <label className="form__label">
          <span className="form__field">Nombres</span>
          <input className="form__input" placeholder="Juan Alberto" {...register('first_name')} type="text" required autoComplete="off" maxLength={25} />
        </label>
        <label className="form__label">
          <span className="form__field">Apellidos</span>
          <input className="form__input" placeholder="Diaz Blund" {...register('last_name')} type="text" required autoComplete="off" maxLength={25} />
        </label>
        <label className="form__label">
          <span className="form__field">Cumpleaños</span>
          <input className="form__input" {...register('birthday')} type="date" />
        </label>
        <button className="form__btn">Aceptar</button>

      </form>

    </div>
  )
}

export default FormUser