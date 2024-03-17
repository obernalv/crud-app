import { useState } from 'react';
import './styles/UserCard.css'
import Msj from './MsjCard'
import mensajesApp from './js/mensajesApp'

const UserCard = ({ user, deleteUser, setUserEdit, handleOpenForm, handleShowMessage}) => {

    //mensajes emergentes
    const [showConfirmation, setShowConfirmation] = useState(false);

    //detecta cuando se pasa el mouse sobre la card
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        deleteUser('/users/', user.id)
        handleShowMessage()
    }

    const handleEdit = () => {
        setUserEdit(user)
        handleOpenForm(false)
    }


    return (

        <article className="card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <h2 className='card__title'>{`${user.first_name} ${user.last_name}`}</h2>
            <ul className='card__list'>
                <li className='card__item'>
                    <span className='card__label'>Correo</span>
                    <span className='card__value'>{user.email}</span>
                </li>
                <li className='card__item'>
                    <span className='card__label'>Cumpleaños</span>
                    <span className='card__value'>{user.birthday}</span>
                </li>
            </ul>
            {
                isHovered && (

                    <div className='card__opt'>

                        <button onClick={() => setShowConfirmation(true) }>
                            <i className='bx bxs-trash btn-delete'></i>
                        </button>
                        <button onClick={handleEdit}>
                            <i className='bx bx-edit-alt btn-edit'></i>
                        </button>

                        {
                            showConfirmation && (
                                <Msj
                                    messageTitle="Eliminar Usuario"
                                    messageDetalle={mensajesApp.questionsDelete}
                                    valorProcesar={`${user.first_name} ${user.last_name}`}
                                    icono={'/images/advertencia.png'}
                                    onConfirm={handleDelete}
                                    onCancel={() => setShowConfirmation(false)}
                                />
                            )
                        }

                    </div>

                )

            }

        </article>

    )
}

export default UserCard