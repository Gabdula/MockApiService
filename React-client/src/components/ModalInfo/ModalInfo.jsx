import React from 'react';
import { useDispatch } from 'react-redux';
import './ModalInfo.css';
import { setModalInfo } from '../../store/Reducers/ModalInfoReducer';

const ModalInfo = (props) => {
  const dispatch = useDispatch();
  // console.log(props)
  const emptyError = {
    modalActive: false,
    imgInfo: '',
    title: '',
    text: '',
  };

  let image;
  switch (props.imgInfo) {
    case 'error':
      image = 'image/modalInfo-error.svg';
      break;
    case 'accept':
      image = 'image/modalInfo-accept.svg';
      break;
    case 'alert':
      image = 'image/modalInfo-alert.svg';
      break;
    default:
      break;
  }

  const buttonOffClickHandle = () => {
    dispatch(setModalInfo(emptyError));
  };
  const closeModal = () => {
    dispatch(setModalInfo(emptyError));
    props.setActive(false);
  };
  // console.log(props.children)
  return (
    <div className={props.active ? 'modal active' : 'modal disable'} onClick={() => closeModal()}>
      <div className='modal__overlay'>

      <div
        className="modal__content"
        style={props.children !== undefined ? { width: `${props.width}vw`, alignItems: `${props.align}` } : {}}
        onClick={(e) => e.stopPropagation()}>
        {props.children === undefined ? (
          <div className='modal__content__flex'>
            <img src={image} alt="info" />
            <p className="modal__title">{props.title}</p>
            <p className="modal__text">{props.text}</p>
            <div className="modal__buttons">
                <button className="modal_button" onClick={() => buttonOffClickHandle()}>OK</button>
            </div>
          </div>
        ) : (
          props.children
        )}
      </div>
      </div>
    </div>
  );
};

export default ModalInfo;
