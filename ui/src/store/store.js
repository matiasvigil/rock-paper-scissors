import Vue from "vue";
import Vuex from "vuex";
import * as players from "@/store/modules/players.js";
import * as game from "@/store/modules/game.js";
import * as history from "@/store/modules/history.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    players,
    game,
    history
  }
});
