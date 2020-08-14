
// import { GET_userList, /*SOCKET_UserList*/ } from '../services/placesList';

export default {

  namespace: 'placesList',

  state: {
    placesList: [],
    searchBoxAddress: {},
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *GET_PlacesList({ payload, callback, loading }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'set_places_list', payload });
      if (loading) { loading(false); }
      if (callback) { callback(); }
    },
    *GET_SearchBoxAddress({ payload, callback, loading }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'set_search_box_address', payload });
      if (loading) { loading(false); }
      if (callback) { callback(); }
    },
    /*
    *SOCKET_UserList({ payload, callback, loading, token }, { call, put }) {  // eslint-disable-line
      // const data = yield call(GET_userList, 'testEvent', payload, token);
      // console.log(call.toString());
      // console.log(put.toString());
      yield put({ type: 'set_user_list', payload: payload });
    },
    */
  },

  reducers: {
    set_places_list(state, { payload }) {
      return { ...state, placesList: payload };
    },
    set_search_box_address(state, { payload }) {
      return { ...state, searchBoxAddress: payload };
    },
  },

};
