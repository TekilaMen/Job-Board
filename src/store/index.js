import { createStore } from "vuex";

export default createStore({
  state: {
    loggedInUser: false,
    loggedInEntreprise: false,
    idLogged: null,
    roleLogged: null,
    acessToken: null,
  },
  mutations: {
    loginUser(state) {
      state.loggedInUser = true;
    },

    loginEntreprise(state) {
      state.loggedInEntreprise = true;
    },

    idLogged(state, id) {
      state.idLogged = id;
    },

    roleLogged(state, role) {
      state.roleLogged = role;
    },

    getAcessToken(state, token) {
      state.acessToken = token;
    },

    logout(state) {
      (state.loggedInEntreprise = false), (state.loggedInUser = false), (state.idLogged = null), (state.roleLogged = null), (state.acessToken = null);
    },
  },
  actions: {},
  modules: {},
});
