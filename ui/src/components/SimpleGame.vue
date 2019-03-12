<template>
  <div>
    <div class="row m-0 justify-content-center">
      <SimplePlayer :player="player1" title="Your score" />
      <Result v-if="vs === 'player'" />
      <SimplePlayer
        v-show="vs === 'player'"
        :player="player2"
        title="Opponent's score"
      />
      <Result v-if="vs === 'computer'" />
      <ComputerPlayer
        v-show="vs === 'computer'"
        :player="player2"
        title="Opponent's score"
      />
    </div>
    <button class="btn btn-success my-3" @click="reset">Reset</button>
  </div>
</template>

<script>
import SimplePlayer from "@/components/players/SimplePlayer.vue";
import Result from "@/components/Result.vue";
import ComputerPlayer from "@/components/players/ComputerPlayer.vue";
import { mapState } from "vuex";
export default {
  name: "SimpleGame",
  props: {
    vs: String
  },
  components: {
    SimplePlayer,
    ComputerPlayer,
    Result
  },
  computed: {
    ...mapState({
      player1: state => state.player1,
      player2: state => state.player2
    })
  },
  methods: {
    reset: function() {
      this.$store.dispatch("reset");
    }
  }
};
</script>
