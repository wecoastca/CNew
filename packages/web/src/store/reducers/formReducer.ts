import { Reducer } from 'redux';
// в сторе буду хранить количество цветов, чтобы наплодить копий моделей
// ресурс, откуда можно скачать модель
// триггер, говорящий сцене, когда нужно запустить сбор букета
export type FormState = {
    flowNum?: number;
    source?: string;
    isSubmited?: boolean;
}
const initialState: FormState = {
  flowNum: 0,
  source: '',
  isSubmited: false,
};
const formReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM/SUBMITED':
      const formReducer = { ...state, ...action.value };
      return formReducer;
    default:
      return state;
  }
};

export default formReducer;
