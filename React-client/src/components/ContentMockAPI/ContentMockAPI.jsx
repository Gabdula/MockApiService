import React, { useEffect, useState } from 'react';
import ProjectCard from '../MockAPI_ProjectCard/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import './ContentMockApi.css';
import { createProjectAction, getUserProjectsAction } from '../../store/Actions/ProjectActions';
import ModalInfo from '../ModalInfo/ModalInfo';
import { setModalInfo } from '../../store/Reducers/ModalInfoReducer';

const ContentMockAPI = (props) => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [prefixApi, setPrefixApi] = useState('');
  const { user } = useSelector((state) => state.userStore);
  const { project, isLoadingProject } = useSelector((state) => state.projectStore);

  useEffect(() => {
    dispatch(getUserProjectsAction(user.user.id));
  }, []);

  const checkFieldsOnClick = () => {
    if (projectName === '' || projectName === undefined) {
      dispatch(
        setModalInfo({
          modalActive: true,
          imgInfo: 'error',
          title: 'Ошибка создания проекта',
          text: 'Поле для ввода названия проекта не может быть пустым.',
          buttonOff: 'OK',
        }),
      );
    } else {
      dispatch(createProjectAction(projectName, user.user.id, prefixApi));
      setModalActive(false);
      setProjectName('')
      setPrefixApi('')
    }
  };

  return (
    <>
      <div className="ContentMockAPI-create">
        <span>Project</span>
        <span>{project.length}/5</span>
        <button onClick={() => setModalActive(true)}>+ Create</button>
      </div>
      <div className={props.menuOpen ? "ContentMockAPI-container" : "ContentMockAPI-container container-open"}>
        {project.length > 0 ? (
          project.map((item, key) => (
            <ProjectCard
              key={key}
              menuOpen={props.menuOpen}
              projectID={item.project_id}
              dateCreate={item.date_create}
              isActive={item.isactive}
              prefixApi={item.prefix_api}
              projectName={item.project_name}
            />
          ))
        ) : (
          <div className="ContentMockAPI-empty-project">You don't have any projects yet...</div>
        )}
      </div>
      {modalActive ? (
        <ModalInfo active={modalActive} setActive={setModalActive} width={30} align="stretch">
          <div className="modal-create-content">
            <div className="modal-create__title">
              <p>Create project</p>
              <hr />
            </div>
            <div className="modal-create__input">
              <div>
                <span>Project Name</span>
                <p>Here you enter the name of your project</p>
                <input
                  type="text"
                  placeholder="Example: Project1, ..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div>
                <span>API Prefix (optional)</span>
                <p>You can add an endpoint for your project</p>
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
              <button onClick={() => setModalActive(false)}>Cancel</button>
              <button onClick={() => checkFieldsOnClick()}>Create</button>
            </div>
          </div>
        </ModalInfo>
      ) : (
        ''
      )}
    </>
  );
};

export default ContentMockAPI;
