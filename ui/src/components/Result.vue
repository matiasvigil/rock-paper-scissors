<template>
  <div
    class="col-10 col-lg-2 p-0 m-0 align-self-center text-danger font-weight-bold"
  >
    <h2 v-show="result === TIE">Its a Tie</h2>
    <h2 v-show="result === WIN_PLAYER1">You Win</h2>
    <h2 v-show="result === WIN_PLAYER2">Opponent Wins</h2>
  </div>
</template>

<script>
import { TIE, WIN_PLAYER1, WIN_PLAYER2 } from "@/constants.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      TIE: TIE,
      WIN_PLAYER1: WIN_PLAYER1,
      WIN_PLAYER2: WIN_PLAYER2
    };
  },
  computed: {
    ...mapState({
      result: state => state.game.result
    })
  }
};
</script>
