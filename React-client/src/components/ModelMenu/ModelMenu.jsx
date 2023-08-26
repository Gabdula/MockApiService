import React, { useState, useEffect } from 'react';
import './ModelMenu.css';
import { useNotification } from '../Notification/NotificationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva';
import { ModelBlock } from './ModelBlock';
import { Context } from '../../Context/ModelConvas.context';
import { getModelsAction } from '../../store/Actions/ModelActions';
import { ConnectionLine } from './ConnectionLine';
import ModalInfo from '../ModalInfo/ModalInfo';
import FakerSelect from '../FakerSelect/FakerSelect';

const ModelMenu = () => {
  const { project } = useSelector((state) => state.projectStore);
  let prefixApi =
    project[0].prefix_api === null ? '/:endpoint' : `/${project[0].prefix_api}/:endpoint`;
  let linkModel = `http:/localhost:5001/model/${project[0].project_id}${prefixApi}`;
  const dispatchNotification = useNotification();

  const dispatch = useDispatch();
  const { model } = useSelector((state) => state.modelStore);
  useEffect(() => {
    dispatch(getModelsAction(project[0].project_id));
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkModel.replace('/:endpoint', ''));
    dispatchNotification({
      type: 'SUCCESS',
      message: 'Ссылка успешно скопирована',
      title: 'Successful Request',
    });
  };

  const [modelObject, setModelObject] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('blockModel') !== null) {
      let storedBlockModel = JSON.parse(localStorage.getItem('blockModel'));
      setModelObject(storedBlockModel);
    }
  }, []);

  const [refreshConnection, setRefreshConnection] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [clientSchema, setClientSchema] = useState([
    {
      title: 'CreatedAt',
      dataGenerate: 'FAKER.JS',
      subData: 'DATE.RECENT',
    },
    {
      title: 'name',
      dataGenerate: 'FAKER.JS',
      subData: 'NAME.FULLNAME',
    },
    {
      title: 'avatar',
      dataGenerate: 'STRING',
      subData: '',
    },
  ]);



  // const getFakeName = (id) => {
  //   return fakeName ? options.find(c => c.value === fakeName) : ''
  // }

  // const onChangeFakeName = (newFakeName) => {
  //   setFakeName(newFakeName.value)
  // }

  return (
    <Context.Provider
      value={{ modelObject, setModelObject, refreshConnection, setRefreshConnection }}>
      <div className="ModelMenu-wrapper">
        <div className="ModelMenu-container">
          <div className="ModelMenu-link">
            <p>Copy link to get fake API data:</p>
            <div className="ModelMenu-link__container">
              <p>{linkModel}</p>
              <button onClick={() => handleCopyLink()}>
                <img src="image/settings-clone.svg" alt="clone" />
              </button>
            </div>
          </div>
          <div className="ModelMenu-schema">
            <Stage width={window.innerWidth / 1.3} height={window.innerHeight}>
              <Layer>
                {/* :endpoint container */}
                <Rect
                  x={30}
                  y={-1}
                  width={150}
                  height={30}
                  stroke={'#868366'}
                  cornerRadius={[0, 0, 10, 10]}
                />
                {/* :endpoint text */}
                <Text
                  x={54}
                  y={3}
                  text=":endpoint"
                  fontFamily="Open Sans"
                  fontSize={(2.5 * window.innerHeight) / 100 || 766}
                />
                {/* :endpoint connector */}
                <Rect
                  x={90}
                  y={29}
                  width={30}
                  height={5}
                  stroke={'#868366'}
                  cornerRadius={[0, 0, 10, 10]}
                />
                {/* model container */}

                {Array.isArray(model)
                  ? model.map((item, key) => {
                      return (
                        <>
                          <ConnectionLine
                            index={key}
                            bindingModel={item.binding_model}
                            modelID={item.model_id}
                            item={model}
                          />
                          <ModelBlock
                            index={key}
                            modelID={item.model_id}
                            modelJson={item.model_json}
                            modelName={item.model_name}
                            bindingModel={item.binding_model}
                          />
                        </>
                      );
                    })
                  : null}
              </Layer>
            </Stage>
          </div>
          <div className="ModelMenu-buttons">
            <div className="ModelMenu-buttons__first">
              <button onClick={() => setModalActive(true)}>
                <div className="ModelMenu-buttons__flex">
                  <img src="image/plus.svg" alt="plus" />
                  CREATE RESOURCE
                </div>
              </button>
            </div>
            <div>
              <button>GENERATE ALL</button>
              <button>RESET ALL</button>
            </div>
          </div>
        </div>
      </div>
      {modalActive ? (
        <ModalInfo active={modalActive} setActive={setModalActive} width={60} align="stretch">
          <div className="modal-create-content">
            <div className="modal-create__title">
              <p>Create model</p>
              <hr />
            </div>
            <div className="modal-create__input">
              <div>
                <span>Model Name</span>
                <p>Here you enter the name of your model</p>
                <input type="text" placeholder="Example: Project1, ..." />
              </div>
              <hr />
            </div>
            <div className="schema__inputs modal-create__input">
              <div>
                <span>Schema (optional)</span>
                <p>Schema will be used to generate mock data</p>
                <div>
                  <input type="text" value={'id'} />
                  <input type="text" value={'Object ID'} readOnly={true} />
                </div>
                {clientSchema.map((item, index) => {
                  return (
                    <>
                      <div className="Schema-container">
                        <FakerSelect/>

                        <input type="text" value={item.title} />
                        <input type="text" value={item.dataGenerate} />

                        {item.subData === '' ? '' : <input type="text" value={item.subData} />}
                        <button>
                          <img src="/image/schema-close.svg" alt="close" />
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className='temp'>temp</div>
              <hr />
            </div>
            <div className="modal-create__buttons">
              <button onClick={() => setModalActive(false)}>Cancel</button>
              <button>Create</button>
            </div>
          </div>
        </ModalInfo>
      ) : (
        ''
      )}
    </Context.Provider>
  );
};

export default ModelMenu;
