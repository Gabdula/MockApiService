import { useState, useEffect, useContext } from 'react';
import { Rect, Text, Line, Group } from 'react-konva';
import { Context } from '../../Context/ModelConvas.context';
export const ConnectionLine = (props) => {
  const [pointsArray, setPointsArray] = useState([]);
  const { modelObject, setModelObject, refreshConnection } = useContext(Context);
  useEffect(() => {
    let child;
    let parent;
    for (let i = 0; i < modelObject.length; i++) {
      child = i;
      for (let j = 0; j < modelObject.length; j++) {
        if (props.item[j].model_id === props.item[i].binding_model) {
          parent = j;
        }
      }
      if (child !== undefined && parent !== undefined ) {
        setPointsArray((pointsArray) => [
          ...pointsArray,
          [
            modelObject[parent]?.x + 155,
            modelObject[parent]?.y + 18,
            modelObject[child]?.x - 5,
            modelObject[child]?.y + 18,
          ],
        ]);
      } else {
        setPointsArray((pointsArray) => [
          ...pointsArray,
          [105, 35, modelObject[props.index]?.x - 5, modelObject[props.index]?.y + 18],
        ]);
      }
    }
  }, [refreshConnection]);

  useEffect(() => {
    for (let i = 0; i < pointsArray.length; i++) {
      console.log(pointsArray)
      if (pointsArray[i][2] !== modelObject[i].x) {
        pointsArray[i][2] = modelObject[i].x - 5;
      }
      if (pointsArray[i][3] !== modelObject[i].y) {
        pointsArray[i][3] = modelObject[i].y + 18;
      }

      for (let k = 0; k < modelObject.length; k++) {
        if (props.item[k].model_id === props.item[props.index].binding_model) {
          if (pointsArray[i][0] !== modelObject[k]?.x) {
            pointsArray[i][0] = modelObject[k]?.x + 155;
          }
          if (pointsArray[i][1] !== modelObject[k]?.y) {
            pointsArray[i][1] = modelObject[k]?.y + 18;
          }
        } 
        if (props.item[props.index].binding_model === null){
          pointsArray[i][0] = 105;
          pointsArray[i][1] = 35;
        }
      }
    }
    console.log(refreshConnection)
  }, [modelObject, pointsArray, refreshConnection]);

  return <Line points={pointsArray[props.index]} stroke={'#868366'} />;
};
