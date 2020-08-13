
export default {

  namespace: 'globall',

  state: {
    viewTable: false,
    viewMenu: false,
    inputValue:''
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *viewTable_change({ payload, callback, loading }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'set_view_table', payload });
      if (callback) callback(loading);
    },
    *viewMenu_change({ payload, callback, loading }, { call, put }) {  // eslint-disable-line
      console.log(123);
      yield put({ type: 'set_view_menu', payload });
      if (callback) callback(loading);
    },
    *inputValue_change({ payload, callback, loading }, { call, put }) {  // eslint-disable-line
      console.log(123);
      yield put({ type: 'set_input_value', payload });
      if (callback) callback(loading);
    }
  },

  reducers: {
    set_view_table(state, { payload }) {
      return { ...state, viewTable: payload };
    },
    set_view_menu(state, { payload }) {
      return { ...state, viewMenu: payload };
    },
    set_input_value(state, { payload }) {
      return { ...state, inputValue: payload };
    },
  },

};
