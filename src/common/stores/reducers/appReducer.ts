import { getData } from '@/common/hooks/useLocalStoragre';

const theme = getData('theme') ?? 'dark';

const initialState = {
  showConnect: false,
  theme: theme,
  is_login: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SHOW_CONNECT':
      return {
        ...state,
        showConnect: action.payload,
      };
    case 'SHOW_REGISTER':
      return {
        ...state,
        showRegister: action.payload,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        is_login: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'USER_QUOTA':
      return {
        ...state,
        user_quota: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
