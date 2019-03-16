import { SCISSORS, PAPER, ROCK } from "@/constants.js";

export const state = {
  player1: {
    id: "1",
    score: 0,
    card: "",
    enabled: true,
    showScissors: true,
    showPaper: true,
    showRock: true
  },
  player2: {
    id: "2",
    score: 0,
    card: "",
    enabled: true,
    showScissors: true,
    showPaper: true,
    showRock: true
  }
};

export const mutations = {
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
  INCREMENT_PLAYER1_SCORE(state) {
    state.player1.score += 1;
  },
  INCREMENT_PLAYER2_SCORE(state) {
    state.player2.score += 1;
  },
  DISABLE_PLAYER1(state) {
    state.player1.enabled = false;
  },
  DISABLE_PLAYER2(state) {
    state.player2.enabled = false;
  },
  ENABLE_PLAYER1(state) {
    state.player1.enabled = true;
  },
  ENABLE_PLAYER2(state) {
    state.player2.enabled = true;
  }
};

export const actions = {
  playCard({ state, commit, dispatch }, payload) {
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
    dispatch("updateScore");
  },
  incrementPlayer1Score({ commit }) {
    commit("INCREMENT_PLAYER1_SCORE");
  },
  incrementPlayer2Score({ commit }) {
    commit("INCREMENT_PLAYER2_SCORE");
  },
  resetPlayer1({ commit }, value) {
    commit("RESET_PLAYER1", value);
  },
  resetPlayer2({ commit }, value) {
    commit("RESET_PLAYER2", value);
  },
  disablePlayer1({ commit }) {
    commit("DISABLE_PLAYER1");
  },
  enablePlayer1({ commit }) {
    commit("ENABLE_PLAYER1");
  }
};
