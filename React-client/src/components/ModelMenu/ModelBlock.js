import { useState, useContext, useEffect } from 'react';
import { Rect, Text, Line, Group } from 'react-konva';
import { Context } from '../../Context/ModelConvas.context';

export const ModelBlock = (props) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [pos, setPos] = useState('');
  const { modelObject, setModelObject, setRefreshConnection } = useContext(Context);
  
  const {modelTitle, setModelTitle} = useState('');

  useEffect(() => {
    if (localStorage.getItem('blockModel') !== null) {
      let storedBlockModel = JSON.parse(localStorage.getItem('blockModel'));
      setPositionX(storedBlockModel[props.index]?.x);
      setPositionY(storedBlockModel[props.index]?.y);
      setRefreshConnection(false);
    } else {
      let newElement = {id: props.index, x: 0, y: 0}
      setModelObject(modelObject => [...modelObject, newElement])
      console.log(modelObject)
      setRefreshConnection(true);
    }
    
  }, []);

  
  const updateModel = () => {
    localStorage.setItem('blockModel', JSON.stringify(modelObject));
    

    const newModel = modelObject.map((obj) => {
      if (obj.id === props.index) {
        return { ...obj, id: props.index, x: positionX, y: positionY };
      } 
      return obj;
    });
    setModelObject(newModel);
  };

  return (
    <Group
      draggable
      x={positionX}
      y={positionY}
      onDragMove={(e) => {
        setPositionX(Math.round(e.target.x()));
        setPositionY(Math.round(e.target.y()));
        updateModel();
        setPos(`x: ${positionX}, y: ${positionY}`);
      }}>
      <Rect
        width={150}
        height={120}
        stroke={'#868366'}
        cornerRadius={[0, 0, 10, 10]}
        fill="white"
      />
      <Text
        align="center"
        width={150}
        y={-25}
        text={pos}
        fontFamily="Open Sans"
        fontSize={(2.5 * window.innerHeight) / 100 || 766}
      />
      <Line points={[0, 35, 150, 35]} stroke={'#868366'} />
      <Text
        align="center"
        width={150}
        y={7}
        text={"/" + props.modelName}
        fontFamily="Open Sans"
        fontSize={(2.5 * window.innerHeight) / 100 || 766}
      />
      <Rect
        x={-5}
        y={3}
        width={5}
        height={30}
        stroke={'#868366'}
        cornerRadius={[10, 0, 0, 10]}
        fill="white"
      />
      <Rect
        x={150}
        y={3}
        width={5}
        height={30}
        stroke={'#868366'}
        cornerRadius={[0, 10, 10, 0]}
        fill="white"
      />
    </Group>
  );
};
