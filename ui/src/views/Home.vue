<template>
  <div class="main">
    <div class="container-fluid">
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

      <SimpleGame v-show="selectedTab === 'Player VS Player'" vs="player" />

      <SimpleGame v-show="selectedTab === 'Player VS Computer'" vs="computer" />

      <div v-if="selectedTab === 'Player VS Remote Player'">
        <RemoteGame />
      </div>
    </div>
  </div>
</template>

<script>
import SimpleGame from "@/components/SimpleGame.vue";
import RemoteGame from "@/views/RemoteGame.vue";

export default {
  name: "Home",
  components: {
    SimpleGame,
    RemoteGame
  },
  created() {
    let game = this.$route.params.id;
    if (typeof game !== "undefined") {
      this.$store.dispatch("resetGameId", game);
      this.selectedTab = "Player VS Remote Player";
    }
  },
  data() {
    return {
      tabs: [
        "Player VS Player",
        "Player VS Computer",
        "Player VS Remote Player"
      ],
      selectedTab: "Player VS Computer"
    };
  },
  methods: {
    selectedGame: function(tab) {
      return tab === this.selectedTab;
    }
  }
};
</script>
