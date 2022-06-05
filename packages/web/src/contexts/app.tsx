// import React, {
//   createContext,
//   useCallback,
//   useEffect,
//   useMemo,
//   useReducer,
// } from 'react';
//
// export const SET_USER = 'set user';
// export const CLEAR_USER = 'clear user';
// export const SET_TOKEN = 'set token';
//
// const LOCAL_STORAGE_NAME = 'zigraffleApp';
//
// function getInitialState() {
//   let initialState = {};
//   try {
//     initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
//     if (typeof initialState !== 'object' || !initialState) {
//       initialState = {};
//     }
//   } catch {
//     // Do nothing
//   }
//   return initialState;
// }
// export const appContext = createContext(getInitialState());
//
// const { Provider } = appContext;
//
// export const AppProvider = ({ children }) => {
//   const [appState, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case SET_USER:
//         return {
//           ...state,
//           user: action.data,
//         };
//       case SET_TOKEN:
//         return {
//           ...state,
//           token: action.data,
//         };
//       case CLEAR_USER:
//         return {};
//       default:
//         throw new Error();
//     }
//   }, initialState);
//
//   const { user, token } = appState;
//
//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(appState));
//   }, [appState]);
//
//   const clear = useCallback(() => dispatch({ type: CLEAR_USER }), [dispatch]);
//   const setToken = useCallback(
//     (data) => dispatch({ type: SET_TOKEN, data }),
//     [dispatch],
//   );
//   const setUser = useCallback(
//     (data) => dispatch({ type: SET_USER, data }),
//     [dispatch],
//   );
//
//   const api = useMemo(() => {
//     const fetcher =
//       (httpMethod, contentType = 'application/json') =>
//       (method, body) =>
//         fetch((process.env.REACT_APP_API_BASE || '/api/v1/') + method, {
//           headers: {
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//             ...(contentType ? { 'Content-type': contentType } : {}),
//             Accept: 'application/json',
//           },
//           method: httpMethod,
//           ...(body
//             ? {
//                 body:
//                   contentType === 'application/json'
//                     ? JSON.stringify(body)
//                     : body,
//               }
//             : {}),
//         }).then(async (response) => {
//           if (response.ok) {
//             return response.json();
//           }
//           if (response.status === 401) clear();
//           throw await response.json();
//         });
//     return {
//       get: (method, query) =>
//         fetcher('GET')(
//           `${method}${
//             query
//               ? `?${new URLSearchParams(Object.entries(query)).toString()}`
//               : ''
//           }`,
//         ),
//       upload: (file) => {
//         const form = new FormData();
//         form.append('media', file);
//         return fetcher('POST', null)('upload', form);
//       },
//       put: fetcher('PUT'),
//       post: fetcher('POST'),
//       delete: fetcher('DELETE'),
//     };
//   }, [clear, token]);
//
//   return (
//     <Provider
//       value={{
//         api,
//         user,
//         setToken,
//         setUser,
//         clear,
//         isAuthenticated: !!token && !!user?._id,
//       }}
//     >
//       {children}
//     </Provider>
//   );
// };
