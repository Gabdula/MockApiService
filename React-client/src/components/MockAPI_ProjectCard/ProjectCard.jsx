import React, { useState, useEffect } from 'react';
import { formatDate } from '../../services/FormatDateService';
import { v4 as uuidv4 } from 'uuid';
import './ProjectCard.css';
import { useDispatch, useSelector } from 'react-redux';
import ModalInfo from '../ModalInfo/ModalInfo';
import { setModalInfo } from '../../store/Reducers/ModalInfoReducer';
import { cloneProjectAction, deleteProjectAction, editProjectAction } from '../../store/Actions/ProjectActions';
import useComponentVisible from '../../hooks/ComponentVisible';

const ProjectCard = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [settingActive, setSettingsActive] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [modalActiveEdit, setModalActiveEdit] = useState(false);
  const [modalActiveDelete, setModalActiveDelete] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [prefixApi, setPrefixApi] = useState('');
  const { user } = useSelector((state) => state.userStore);
  let checkBtn;

  useEffect(() => {
    setChecked(props.isActive);
  }, []);

  if (checked) {
    checkBtn = 'On';
  } else {
    checkBtn = 'Off';
  }

  const onClickClone = () => {
    setSettingsActive(false)
    dispatch(cloneProjectAction(props.projectID, user.user.id))
  } 
  const onClickEdit = () => {
    setSettingsActive(false)
    setModalActiveEdit(true)
  } 
  const onClickDelete = () => {
    setSettingsActive(false)
    setModalActiveDelete(true)
  } 
  const checkFieldsOnClickEdit = () => {
    setSettingsActive(false)
    if (projectName === '' || projectName === undefined) {
      dispatch(
        setModalInfo({
          modalActiveEdit: true,
          imgInfo: 'error',
          title: 'Ошибка изменения проекта',
          text: 'Поле для ввода названия проекта не может быть пустым.',
          buttonOff: 'OK',
        }),
      );
    } else {
      dispatch(editProjectAction(props.projectID, projectName, prefixApi, user.user.id));
      setModalActiveEdit(false);
      setProjectName('')
      setPrefixApi('')
    }
  };

  const checkFieldsOnClickDelete = () => {
    setSettingsActive(false)
    dispatch(deleteProjectAction(props.projectID, user.user.id));
    setModalActiveDelete(false);
  };

  let id = uuidv4();
  return (
    <>
      <div className="project-card">
        <div className={props.menuOpen ? "project-card-container" : "project-card-container card-container-open"}>
          <div className="project-card-topCard">
            <div>
              <div className="project-card__title">
                <p>{props.projectName}</p>
              </div>
              <div className="project-card-time">
                <img src="image/projectcard-clock.svg" alt="clock" />
                <p>{formatDate(props.dateCreate)}</p>
              </div>
            </div>
            <div className="project-card__settings">
              <div
                className="project-card__settings-circle"
                onClick={() =>
                  setIsComponentVisible((isComponentVisible) => (isComponentVisible = !isComponentVisible))
                }>
                <img src="image/projectcard-settings.svg" alt="settings" />
              </div>
              {isComponentVisible  ? <div ref={ref} className="settings-container">
                <p>Properties</p>
                <div>
                  <img src="image/settings-copylink.svg" alt="copy-link" />
                  <p>Copy link</p>
                </div>
                <hr />
                <div onClick={() => onClickClone()}>
                  <img src="image/settings-clone.svg" alt="clone" />
                  <p>Clone</p>
                </div>
                <div onClick={() => onClickEdit()}>
                  <img src="image/settings-edit.svg" alt="edit" />
                  <p>Edit</p>
                </div>
                <hr />
                <div onClick={() => onClickDelete()}> 
                  <img src="image/settings-delete.svg" alt="delete" />
                  <p>Delete</p>
                </div>
              </div> : ''}
            </div>
          </div>
          <div className="project-card-bottomCard">
            <div className="project-card-on-off">
              <input
                checked={checked}
                onChange={() => setChecked((checked) => (checked = !checked))}
                type="checkbox"
                id={id}
              />
              <label htmlFor={id}>Toggle</label>
              <p>{checkBtn}</p>
            </div>
            <div className="project-card-count-resources">
              <progress value={8} max={10} style={{ width: '150px' }}></progress>
              <span>10/10</span>
            </div>
          </div>
        </div>
      </div>
      {modalActiveEdit ? (
        <ModalInfo active={modalActiveEdit} setActive={setModalActiveEdit} width={30} align="stretch">
          <div className="modal-create-content">
            <div className="modal-create__title">
              <p>Edit project</p>
              <hr />
            </div>
            <div className="modal-create__input">
              <div>
                <span>Project Name</span>
                <p>Here you enter the new name of your project</p>
                <input
                  type="text"
                  placeholder="Example: Project1, ..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div>
                <span>API Prefix (optional)</span>
                <p>You can edit an endpoint for your project</p>
                <input
                  type="text"
                  placeholder="Example: todo/list"
                  value={prefixApi}
                  onChange={(e) => setPrefixApi(e.target.value)}
                />
              </div>
              <hr />
            </div>
            <div className="modal-create__buttons">
              <button onClick={() => setModalActiveEdit(false)}>Cancel</button>
              <button onClick={() => checkFieldsOnClickEdit()}>Save</button>
            </div>
          </div>
        </ModalInfo>
      ) : (
        ''
      )}
      {modalActiveDelete ? (
        <ModalInfo active={modalActiveDelete} setActive={setModalActiveDelete} width={45}>
          <div className="modal-create-content">
            <div className='modal__content__flex'>
              <img src='image/modalInfo-alert.svg' alt="alert" />
              <p className="modal__title">Удаление проекта</p>
              <p className="modal__text">Вы точно хотите удалить проект?</p>
            </div>
            <div className="modal-create__buttons"> 
              <button onClick={() => setModalActiveDelete(false)}>Cancel</button>
              <button onClick={() => checkFieldsOnClickDelete()}>Yes</button>
            </div>
          </div>
        </ModalInfo>
      ) : (
        ''
      )}
    </>
    
  );
};

export default ProjectCard;
