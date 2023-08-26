// import React, { useEffect, useState } from 'react';
// import { getProjectModelAction } from '../../store/Actions/ModelActions'; 
// import { useDispatch, useSelector } from 'react-redux';

// const WrapperRequest = () => {
//   const dispatch = useDispatch();
//   const { model } = useSelector((state) => state.modelStore);
//   useEffect(() => {
//     dispatch(getProjectModelAction('0bb98ee5-15bc-4c5d-9898-55b05def18e1/api/1/qwerty/1/foo')); 
//   }, []);
  
//   return (
//     <div>
//       <pre>{JSON.stringify(model, null, 2)}</pre>
//     </div>
//   );
// }

// export default WrapperRequest;
