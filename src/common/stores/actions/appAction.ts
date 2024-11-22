export const showConnect = (showConnect: boolean) => {
  return {
    type: 'SHOW_CONNECT',
    payload: showConnect,
  };
};
export const showRegister = (showRegister: boolean) => {
  return {
    type: 'SHOW_REGISTER',
    payload: showRegister,
  };
};

export const setIsLogin = (isLogin: boolean) => {
  return {
    type: 'SET_LOGIN',
    payload: isLogin,
  };
};

export const setTheme = (theme: string) => {
  return {
    type: 'SET_THEME',
    payload: theme,
  };
};

export const setUserQuota = (userQuota: any) => {
  return {
    type: 'USER_QUOTA',
    payload: userQuota,
  };
};
