import { Reducer } from 'redux';

const sceneReducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SCENE/SUBMIT':
      const scene = { ...state, ...action.value };

      return scene;
    default:
      return state;
  }
};

export default sceneReducer;
