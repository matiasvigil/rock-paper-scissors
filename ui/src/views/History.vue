<template>
  <div class="mt-5">
    <h3>History</h3>
    <ul class="p-0">
      <li
        class="row justify-content-center align-items-center"
        v-for="item in items.slice().reverse()"
        :key="item.id"
      >
        <div class="col-3 pt-3">
          <img
            v-if="item.player1.scissors"
            class="w-25 h-25 p-3"
            src="@/assets/scissors.svg"
          />
          <img
            v-if="item.player1.rock"
            class="w-25 h-25 p-3"
            src="@/assets/rock.svg"
          />
          <img
            v-if="item.player1.paper"
            class="w-25 h-25 p-3"
            src="@/assets/paper.svg"
          />
        </div>
        VS
        <div class="col-3">
          <img
            v-if="item.player2.scissors"
            class="w-25 h-25 p-3"
            src="@/assets/scissors.svg"
          />
          <img
            v-if="item.player2.rock"
            class="w-25 h-25 p-3"
            src="@/assets/rock.svg"
          />
          <img
            v-if="item.player2.paper"
            class="w-25 h-25 p-3"
            src="@/assets/paper.svg"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "History",
  computed: {
    ...mapState({
      items: state => state.history.items
    })
  }
};
</script>
