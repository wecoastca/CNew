import { Reducer } from "redux";

export type FormState = {
  flowNum?: number;
  source?: string;
  isSubmited?: boolean;
};
const initialState: FormState = {
  flowNum: 0,
  source: "",
  isSubmited: false,
};
const formReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM/SUBMITED":
      const formReducer = { ...state, ...action.value };
      return formReducer;
    default:
      return state;
  }
};

export default formReducer;
