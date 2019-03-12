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
      <div v-show="player.card === ''" class="col-6 p-0 mx-3">
        <button @click="play" class="btn btn-warning">Play</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ComputerPlayer",
  props: {
    player: Object,
    title: String
  },
  computed: {
    ...mapState({
      player1: state => state.player1,
      player2: state => state.player2
    })
  },
  methods: {
    play: function() {
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
