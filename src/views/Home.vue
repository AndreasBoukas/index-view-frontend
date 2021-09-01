<template>
  <div>
    <v-main>
      <!-- Loading Circle -->
      <div v-if="getIsLoading" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <!-- Select Dropdown -->
      <div class="d-flex justify-center mb-6">
        <SelectIndex @selected="onSelected" />
      </div>
      <!-- Data Table -->
      <div class="d-flex justify-center mb-6">
        <br />
        <ShowIndex :indexId="this.indexID" :key="this.indexID" />
      </div>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import SelectIndex from "@/components/SelectIndex.vue";
import ShowIndex from "@/components/ShowIndex.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    SelectIndex,
    ShowIndex,
  },

  methods: {
    onSelected(value) {
      this.indexID = value;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getIsLoading"]),
  },
  mounted() {
    //redirect the user to the login page if the user is not logged in
    if (!this.isLoggedIn) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      indexID: 0,
    };
  },
};
</script>
