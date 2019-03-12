<template>
  <div class="col-11 col-lg-4 py-5">
    <h3>{{ title }}</h3>
    <p>{{ player.score }}</p>
    <div class="row justify-content-center">
      <div
        @click="play(ROCK)"
        v-show="player.showRock"
        class="col-2 cursor-pointer p-0 mx-3"
      >
        <img class="w-50" src="@/assets/rock.svg" />
      </div>
      <div
        @click="play(PAPER)"
        v-show="player.showPaper"
        class="col-2 cursor-pointer p-0 mx-3"
      >
        <img class="w-50" src="@/assets/paper.svg" />
      </div>
      <div
        @click="play(SCISSORS)"
        v-show="player.showScissors"
        class="col-2 cursor-pointer p-0 mx-3"
      >
        <img class="w-50" src="@/assets/scissors.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { SCISSORS, PAPER, ROCK } from "@/constants.js";
import { mapState } from "vuex";

export default {
  name: "SimplePlayer",
  props: {
    player: Object,
    title: String,
    remote: Boolean
  },
  computed: {
    ...mapState({
      gameId: state => state.gameId
    })
  },
  data() {
    return {
      SCISSORS: SCISSORS,
      ROCK: ROCK,
      PAPER: PAPER
    };
  },
  methods: {
    play: function(card) {
      this.$store.dispatch("playCard", { card: card, id: this.player.id });
      if (this.remote) {
        this.$socket.emit("play", { gameId: this.gameId, card: card });
      }
    }
  }
};
</script>
