<template>
  <div class="main">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h1>Rock Paper Scissors</h1>

    <div class="row justify-content-center m-0 mt-3">
      <button
        class="tab btn btn-primary mx-2 col-10 col-md-auto"
        :class="[selectedGame(tab) ? 'btn-primary' : 'btn-secondary']"
        :key="tab"
        v-for="tab in tabs"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <SimpleGame v-show="selectedTab === 'Local Player VS Player'" vs="player" />

    <SimpleGame
      v-show="selectedTab === 'Local Player VS Computer'"
      vs="computer"
    />

    <div v-if="selectedTab === 'Remote Player VS Player'">
      <RemoteGame />
    </div>
  </div>
</template>

<script>
import SimpleGame from "@/components/SimpleGame.vue";
import RemoteGame from "@/components/RemoteGame.vue";

export default {
  name: "Home",
  components: {
    SimpleGame,
    RemoteGame
  },
  created() {
    let game = this.$route.query.gameId;
    console.log("GAMEEE " + game);
    if (typeof game !== "undefined") {
      this.$store.dispatch("resetGameId", game);
      this.selectedTab = "Remote Player VS Player";
    }
  },
  data() {
    return {
      tabs: [
        "Local Player VS Player",
        "Local Player VS Computer",
        "Remote Player VS Player"
      ],
      selectedTab: "Local Player VS Computer"
    };
  },
  methods: {
    selectedGame: function(tab) {
      return tab === this.selectedTab;
    }
  }
};
</script>
