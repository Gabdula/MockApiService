import React from 'react';
import { useDispatch } from 'react-redux';
import './ModalInfo.css'
import { setModalInfo } from '../../store/Reducers/ModalInfoReducer';

const ModalInfo = (props) => {
  const dispatch = useDispatch()

  const emptyError = {
    modalActive: false,
    imgInfo: '',
    title: '',
    text: ''
  }

  let image;
  switch (props.imgInfo) {
    case 'error':
      image = 'image/modalInfo-error.svg';
      break;
    case 'accept':
      image = 'image/modalInfo-accept.svg'
      break;
    case 'alert':
      image = 'image/modalInfo-alert.svg'
      break;
    default:
      break;
  }

  return (
    <div className={props.active ? "modal active" : "modal disable"} onClick={() => dispatch(setModalInfo(emptyError))}>
      <div className='modal__content' onClick={e => e.stopPropagation()}>
          <img src={image} alt="info" />
          <p className='modal__title'>{props.title}</p>
          <p className='modal__text'>{props.text}</p>
          <button className='modal_button' onClick={() => dispatch(setModalInfo(emptyError))}>OK</button>
      </div>
    </div>
  );
}

export default ModalInfo;
