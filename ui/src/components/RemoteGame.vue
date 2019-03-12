<template>
  <div v-if="!fullGame">
    <div class="row m-0 justify-content-center">
      <SimplePlayer :player="player1" title="Your score" :remote="true" />
      <Result />
      <RemotePlayer :player="player2" title="Opponent's score" />
    </div>
    <button class="btn btn-success my-3" @click="reset">Reset</button>
  </div>
  <div v-else class="my-5 text-danger">
    <h3>GAME IS FULL</h3>
    <button @click="newGame" class="btn btn-warning">New Game</button>
  </div>
</template>

<script>
import SimplePlayer from "@/components/players/SimplePlayer.vue";
import RemotePlayer from "@/components/players/RemotePlayer.vue";
import Result from "@/components/Result.vue";
import { mapState } from "vuex";

export default {
  name: "RemoteGame",
  components: {
    RemotePlayer,
    SimplePlayer,
    Result
  },
  data() {
    return {
      fullGame: false
    };
  },
  beforeDestroy() {
    this.$socket.emit("unsubscribe", this.gameId);
  },
  created() {
    console.log("Created");
    let game = this.$route.query.gameId;
    if (typeof game !== "undefined") {
      this.$store.dispatch("resetGameId", game);
    } else {
      this.$store.dispatch("resetGameId", this.generateGameId());
    }
    window.addEventListener("beforeunload", this.unsubscribe);
  },
  mounted() {
    console.log("mounted");
    this.$socket.emit("subscribe", this.gameId);
    this.$store.dispatch("resetPlayer2", false);
  },
  computed: {
    ...mapState({
      player1: state => state.player1,
      player2: state => state.player2,
      usersCount: state => state.usersCount,
      gameId: state => state.gameId
    })
  },

  methods: {
    reset: function() {
      this.$store.dispatch("resetPlayer1", true);
      this.$store.dispatch("resetPlayer2", false);
      this.$store.dispatch("resetResult");
      this.$socket.emit("reset", this.gameId);
    },
    unsubscribe: function() {
      this.$socket.emit("unsubscribe", this.gameId);
    },
    newGame() {
      let gameId = this.generateGameId();
      this.$store.dispatch("resetGameId", gameId);
      this.$socket.emit("subscribe", gameId);
    },
    generateGameId() {
      let gameId = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 6; i++) {
        gameId += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return gameId;
    }
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    gameIsFull: function(data) {
      console.log("Game is full");
      if (this.usersCount === 0 && data.gameId === this.gameId) {
        this.fullGame = true;
        this.$store.dispatch("resetGameId", "");
      }
    },
    disconnected: function() {
      console.log("Player disconnected...");
    },
    subscribe: function(usersCount) {
      console.log("subscribe");
      this.$store.dispatch("setUserCount", usersCount.toString());
    },
    subscribed: function(usersCount) {
      this.fullGame = false;
      this.$store.dispatch("setUserCount", usersCount.toString());
      console.log("pushing query " + this.gameId);
      this.$router.push({ name: "home", query: { gameId: this.gameId } });
    },
    unsubscribe: function(usersCount) {
      this.$store.dispatch("setUserCount", usersCount.toString());
      this.$store.dispatch("resetPlayer2", false);
      console.log("Opponent disconnected...");
    },
    reset: function() {
      console.log("reset");
      this.$store.dispatch("resetPlayer1", true);
      this.$store.dispatch("resetPlayer2", false);
      this.$store.dispatch("resetResult");
    }
  }
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
