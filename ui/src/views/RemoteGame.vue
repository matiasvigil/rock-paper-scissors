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
    let game = this.$route.params.id;
    if (typeof game !== "undefined") {
      this.$store.dispatch("resetGameId", game);
    } else {
      this.$store.dispatch("resetGameId", this.generateGameId());
    }
    window.addEventListener("beforeunload", this.unsubscribe);
  },
  mounted() {
    this.$socket.emit("subscribe", this.gameId);
    this.$store.dispatch("resetPlayer2", false);
    this.$store.dispatch("disablePlayer1");
  },
  computed: {
    ...mapState({
      player1: state => state.players.player1,
      player2: state => state.players.player2,
      usersCount: state => state.game.usersCount,
      gameId: state => state.game.gameId
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
      if (this.usersCount === 0 && data.gameId === this.gameId) {
        this.fullGame = true;
        this.$store.dispatch("resetGameId", "");
      }
    },
    disconnected: function() {
      console.log("Player disconnected...");
    },
    subscribe: function(usersCount) {
      this.$store.dispatch("setUserCount", usersCount.toString());
    },
    subscribed: function(usersCount) {
      this.fullGame = false;
      this.$store.dispatch("setUserCount", usersCount.toString());
      this.$router.push({ name: "remoteGame", params: { id: this.gameId } });
      if (usersCount === 2) {
        this.$store.dispatch("enablePlayer1");
      }
    },
    unsubscribe: function(usersCount) {
      this.$store.dispatch("setUserCount", usersCount.toString());
      this.$store.dispatch("resetPlayer2", false);
      this.$store.dispatch("disablePlayer1");
      console.log("Opponent disconnected...");
    },
    unsubscribed: function(usersCount) {
      this.$store.dispatch("setUserCount", usersCount.toString());
      this.$store.dispatch("resetPlayer2", false);
      this.$store.dispatch("disablePlayer1");
      console.log("Opponent disconnected...");
    },
    reset: function() {
      this.$store.dispatch("resetPlayer1", true);
      this.$store.dispatch("resetPlayer2", false);
      this.$store.dispatch("resetResult");
    }
  }
};
</script>
