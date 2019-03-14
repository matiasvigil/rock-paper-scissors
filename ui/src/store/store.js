import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {
  SCISSORS,
  PAPER,
  ROCK,
  TIE,
  WIN_PLAYER1,
  WIN_PLAYER2
} from "@/constants.js";

export default new Vuex.Store({
  state: {
    player1: {
      id: "1",
      score: 0,
      card: "",
      showScissors: true,
      showPaper: true,
      showRock: true
    },
    player2: {
      id: "2",
      score: 0,
      card: "",
      showScissors: true,
      showPaper: true,
      showRock: true
    },
    result: "",
    gameId: "",
    gameCount: 0,
    usersCount: 0,
    historyItems: []
  },
  mutations: {
    SET_CARD_PLAYER1(state, cardValue) {
      state.player1.card = cardValue;
    },
    SET_CARD_PLAYER2(state, cardValue) {
      state.player2.card = cardValue;
    },
    SHOW_ONLY_SCISSORS_PLAYER1(state) {
      state.player1.showScissors = true;
      state.player1.showPaper = false;
      state.player1.showRock = false;
    },
    SHOW_ONLY_PAPER_PLAYER1(state) {
      state.player1.showPaper = true;
      state.player1.showScissors = false;
      state.player1.showRock = false;
    },
    SHOW_ONLY_ROCK_PLAYER1(state) {
      state.player1.showRock = true;
      state.player1.showPaper = false;
      state.player1.showScissors = false;
    },
    SHOW_ONLY_SCISSORS_PLAYER2(state) {
      state.player2.showScissors = true;
      state.player2.showPaper = false;
      state.player2.showRock = false;
    },
    SHOW_ONLY_PAPER_PLAYER2(state) {
      state.player2.showPaper = true;
      state.player2.showScissors = false;
      state.player2.showRock = false;
    },
    SHOW_ONLY_ROCK_PLAYER2(state) {
      state.player2.showRock = true;
      state.player2.showPaper = false;
      state.player2.showScissors = false;
    },
    RESET_PLAYER1(state, value) {
      state.player1.card = "";
      state.player1.showScissors = value;
      state.player1.showPaper = value;
      state.player1.showRock = value;
    },
    RESET_PLAYER2(state, value) {
      state.player2.card = "";
      state.player2.showScissors = value;
      state.player2.showPaper = value;
      state.player2.showRock = value;
    },
    RESET_RESULT(state) {
      state.gameCount += 1;
      state.result = "";
    },
    RESET_GAME_ID(state, value) {
      state.gameId = value;
    },
    SET_TIE_RESULT(state) {
      state.result = TIE;
      state.historyItems.push({
        id: state.gameCount,
        player1: {
          rock: state.player1.showRock,
          scissors: state.player1.showScissors,
          paper: state.player1.showPaper
        },
        player2: {
          rock: state.player2.showRock,
          scissors: state.player2.showScissors,
          paper: state.player2.showPaper
        }
      });
    },
    WIN_PLAYER1(state) {
      state.player1.score += 1;
      state.result = WIN_PLAYER1;
      state.historyItems.push({
        id: state.gameCount,
        player1: {
          rock: state.player1.showRock,
          scissors: state.player1.showScissors,
          paper: state.player1.showPaper
        },
        player2: {
          rock: state.player2.showRock,
          scissors: state.player2.showScissors,
          paper: state.player2.showPaper
        }
      });
    },
    WIN_PLAYER2(state) {
      state.player2.score += 1;
      state.result = WIN_PLAYER2;
      state.historyItems.push({
        id: state.gameCount,
        player1: {
          rock: state.player1.showRock,
          scissors: state.player1.showScissors,
          paper: state.player1.showPaper
        },
        player2: {
          rock: state.player2.showRock,
          scissors: state.player2.showScissors,
          paper: state.player2.showPaper
        }
      });
    },
    SET_USER_COUNT(state, value) {
      state.usersCount = value;
    }
  },
  actions: {
    setUserCount({ commit }, value) {
      commit("SET_USER_COUNT", value);
    },
    reset({ commit }) {
      commit("RESET_PLAYER1", true);
      commit("RESET_PLAYER2", true);
      commit("RESET_RESULT");
    },
    resetPlayer1({ commit }, value) {
      commit("RESET_PLAYER1", value);
    },
    resetPlayer2({ commit }, value) {
      commit("RESET_PLAYER2", value);
    },
    resetResult({ commit }) {
      commit("RESET_RESULT");
    },
    resetGameId({ commit }, value) {
      commit("RESET_GAME_ID", value);
    },
    playCard({ state, commit }, payload) {
      if (payload.id === state.player1.id) {
        commit("SET_CARD_PLAYER1", payload.card);
        switch (payload.card) {
          case SCISSORS: {
            commit("SHOW_ONLY_SCISSORS_PLAYER1");
            break;
          }
          case PAPER: {
            commit("SHOW_ONLY_PAPER_PLAYER1");
            break;
          }
          case ROCK: {
            commit("SHOW_ONLY_ROCK_PLAYER1");
            break;
          }
        }
      } else {
        commit("SET_CARD_PLAYER2", payload.card);
        switch (payload.card) {
          case SCISSORS: {
            commit("SHOW_ONLY_SCISSORS_PLAYER2");
            break;
          }
          case PAPER: {
            commit("SHOW_ONLY_PAPER_PLAYER2");
            break;
          }
          case ROCK: {
            commit("SHOW_ONLY_ROCK_PLAYER2");
            break;
          }
        }
      }
      this.dispatch("updateScore");
    },
    updateScore({ state, commit }) {
      if (
        state.player1.card !== "" &&
        state.player2.card !== "" &&
        state.result === ""
      ) {
        let result =
          parseInt(state.player1.card) - parseInt(state.player2.card);
        if (result === 0) {
          commit("SET_TIE_RESULT");
        } else if (result === -1 || result === 2) {
          commit("WIN_PLAYER2");
        } else if (result === 1 || result === -2) {
          commit("WIN_PLAYER1");
        }
      }
    }
  }
});
