import { TIE, WIN_PLAYER1, WIN_PLAYER2 } from "@/constants.js";

export const state = {
  result: "",
  gameId: "",
  gameCount: 0,
  usersCount: 0
};

export const mutations = {
  RESET_RESULT(state) {
    state.gameCount += 1;
    state.result = "";
  },
  RESET_GAME_ID(state, value) {
    state.gameId = value;
  },
  SET_TIE_RESULT(state) {
    state.result = TIE;
  },
  WIN_PLAYER1(state) {
    state.result = WIN_PLAYER1;
  },
  WIN_PLAYER2(state) {
    state.result = WIN_PLAYER2;
  },
  SET_USER_COUNT(state, value) {
    state.usersCount = value;
  }
};

export const actions = {
  setUserCount({ commit }, value) {
    commit("SET_USER_COUNT", value);
  },
  reset({ commit, dispatch }) {
    dispatch("resetPlayer1", true);
    dispatch("resetPlayer2", true);
    dispatch("enablePlayer1");
    commit("RESET_RESULT");
  },
  resetResult({ commit }) {
    commit("RESET_RESULT");
  },
  resetGameId({ commit }, value) {
    commit("RESET_GAME_ID", value);
  },
  updateScore({ rootState, state, commit, dispatch }) {
    let player1 = rootState.players.player1;
    let player2 = rootState.players.player2;
    if (player1.card !== "" && player2.card !== "" && state.result === "") {
      let result = parseInt(player1.card) - parseInt(player2.card);
      if (result === 0) {
        commit("SET_TIE_RESULT");
      } else if (result === -1 || result === 2) {
        dispatch("incrementPlayer2Score");
        commit("WIN_PLAYER2");
      } else if (result === 1 || result === -2) {
        dispatch("incrementPlayer1Score");
        commit("WIN_PLAYER1");
      }
      dispatch("addResultToHistory");
    }
  }
};
