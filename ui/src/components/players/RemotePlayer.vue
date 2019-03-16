<template>
  <div class="col-11 col-lg-4 py-5">
    <h3>{{ title }}</h3>
    <p>{{ player.score }}</p>
    <div class="row justify-content-center h-75">
      <div v-show="showRock" class="col-2 p-0 mx-3">
        <img class="w-50" src="@/assets/rock.svg" />
      </div>
      <div v-show="showPaper" class="col-2 p-0 mx-3">
        <img class="w-50" src="@/assets/paper.svg" />
      </div>
      <div v-show="showScissors" class="col-2 p-0 mx-3">
        <img class="w-50" src="@/assets/scissors.svg" />
      </div>
      <p v-show="waitingOpponent" class="align-self-center js-loading">
        Waiting other player {{ usersCount === "2" ? "move" : "connect" }}...
      </p>
      <p v-show="waitingPlayer" class="align-self-center js-loading">
        Waiting your move...
      </p>
    </div>
  </div>
</template>

<script>
import { SCISSORS, PAPER, ROCK } from "@/constants.js";
import { mapState } from "vuex";

export default {
  name: "RemotePlayer",
  props: {
    player: Object,
    title: String
  },
  computed: {
    showPaper() {
      return this.player1.card !== "" && this.player.showPaper;
    },
    showScissors() {
      return this.player1.card !== "" && this.player.showScissors;
    },
    showRock() {
      return this.player1.card !== "" && this.player.showRock;
    },
    waitingOpponent() {
      return this.player.card === "";
    },
    waitingPlayer() {
      return !this.waitingOpponent && this.player1.card === "";
    },
    ...mapState({
      usersCount: state => state.game.usersCount,
      player1: state => state.players.player1,
      gameId: state => state.game.gameId
    })
  },
  data() {
    return {
      SCISSORS: SCISSORS,
      ROCK: ROCK,
      PAPER: PAPER
    };
  },
  sockets: {
    play: function(data) {
      this.$store.dispatch("playCard", { card: data.card, id: this.player.id });
    }
  }
};
</script>
