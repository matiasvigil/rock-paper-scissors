export const state = {
  items: []
};

export const mutations = {
  PUSH_HISTORY(state, payload) {
    let player1 = payload.player1;
    let player2 = payload.player2;
    state.items.push({
      id: state.gameCount,
      player1: {
        rock: player1.showRock,
        scissors: player1.showScissors,
        paper: player1.showPaper
      },
      player2: {
        rock: player2.showRock,
        scissors: player2.showScissors,
        paper: player2.showPaper
      }
    });
  }
};

export const actions = {
  addResultToHistory({ commit, rootState }) {
    commit("PUSH_HISTORY", {
      player1: rootState.players.player1,
      player2: rootState.players.player2
    });
  }
};
