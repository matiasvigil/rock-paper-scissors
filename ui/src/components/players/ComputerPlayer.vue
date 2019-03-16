<template>
  <div class="col-11 col-lg-4 py-5">
    <h3>{{ title }}</h3>
    <p>{{ player.score }}</p>
    <div class="row justify-content-center">
      <div v-show="player.showRock" class="col-2 p-0 mx-3">
        <img class="w-50" src="@/assets/rock.svg" />
      </div>
      <div v-show="player.showPaper" class="col-2 p-0 mx-3">
        <img class="w-50" src="@/assets/paper.svg" />
      </div>
      <div v-show="player.showScissors" class="col-2 p-0 mx-3">
        <img class="w-50" src="@/assets/scissors.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "@/eventsBus.js";

export default {
  name: "ComputerPlayer",
  props: {
    player: Object,
    title: String
  },
  created() {
    EventBus.$on("play", this.play);
  },
  beforeDestroy() {
    EventBus.$off("play");
  },
  computed: {
    ...mapState({
      player1: state => state.players.player1,
      player2: state => state.players.player2
    })
  },
  methods: {
    play: function() {
      console.log("play-computer");
      var random = Math.random();
      var card = Math.floor(random * 3);
      this.$store.dispatch("playCard", {
        card: card.toString(),
        id: this.player.id
      });
    }
  }
};
</script>
