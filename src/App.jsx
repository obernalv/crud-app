import { useEffect, useState } from 'react'
import './App.css'
import useCrud from './hooks/useCrud'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'
import MsjCard from './components/MsjCard'

function App() {

  const [userEdit, setUserEdit] = useState()
  const [formIsClose, setFormIsClose] = useState(true)

  const [showMessage, setShowMessage] = useState(false)

  const BASEURL = 'https://users-crud.academlo.tech'
  const [users, message, getUser, createUser, deleteUser, updateUser] = useCrud(BASEURL)

  useEffect(() => {
    getUser('/users/')

  }, [])

  const handleOpenForm = () => {
    setFormIsClose(false)
  }

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (

    <div className='app'>


      {
        message && showMessage && (
          <MsjCard
            messageTitle="Información"
            messageDetalle={message}
            valorProcesar={''}
            icono={'/images/check.png'}
            onCancel={handleCloseMessage}
            autoCloseDelay={2000}
          />

        )
      }


      <header className='app__header'>
        <h1 className='app__title'>Lista de Usuarios</h1>
        <button onClick={handleOpenForm} className=' btn2'> <i className='bx bx-user-plus'></i> </button>
      </header>

      {/* {error && <div className='error-message'>Error: {error.message}</div>}
      {message && <div className='success-message'>{message}</div>} */}

      <FormUser
        createUser={createUser}
        userEdit={userEdit}
        updateUser={updateUser}
        setUserEdit={setUserEdit}
        formIsClose={formIsClose}
        setFormIsClose={setFormIsClose}
        handleShowMessage={handleShowMessage}
      />

      <div className='user-container'>
        {

          users?.map(user => (
            <UserCard
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setUserEdit={setUserEdit}
              handleOpenForm={handleOpenForm}
              handleShowMessage={handleShowMessage}
            />
          ))


        }
      </div>
    </div>

  )
}

export default App
