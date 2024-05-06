import PropTypes from 'prop-types';
import './styles/MsjCard.css';
import { useEffect } from 'react';

const MsjCard = ({ messageTitle, messageDetalle, valorProcesar, icono ,onConfirm, onCancel, autoCloseDelay }) => {

  useEffect(() => {
    if (autoCloseDelay && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        if (onCancel) onCancel();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoCloseDelay, onCancel]);

  return (
    <div className="card-mensaje">
      <h2 className='mensaje__title'>{messageTitle}</h2>
      <div className="mensaje__content">
        <div className='mensaje__icono'><img src={icono} alt={messageTitle} /></div>
        <p className='mensaje__detalle'>{`${messageDetalle} ${valorProcesar}`}</p>
      </div>
      {onConfirm && onCancel && (
        <div className="mensaje__control">
          <button className='control-btn btn-ok' onClick={onConfirm}>Aceptar</button>
          <button className='control-btn btn-can' onClick={onCancel}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

MsjCard.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  messageTitle: PropTypes.string.isRequired,
  messageDetalle: PropTypes.string,
  icono: PropTypes.string,
  valorProcesar: PropTypes.string,
  tipoOperacion: PropTypes.oneOf(['actualizar', 'eliminar', 'informacion']),
};

MsjCard.defaultProps = {
  icono: '/images/information.png',
  valorProcesar: '',
  tipoOperacion: 'informacion', // Por defecto, mensaje de información
};

export default MsjCard;
