
export default {

  namespace: 'globall',

  state: {
    detailed: {}
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *detailed_change({ payload, callback, loading }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'set_detailed', payload });
      if (loading) { loading(false); }
      if (callback) { callback(); }
    }
  },

  reducers: {
    set_detailed(state, { payload }) {
      return { ...state, detailed: payload };
    },
  },

};
