<template>
  <div>
    <div v-if="this.id === 0"></div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="this.indexData"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import Config from "../../config.json";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "ShowIndex",
  props: ["indexId"],
  data() {
    return {
      headers: [
        {
          text: "Name (100g serving)",
          align: "start",
          sortable: false,
          value: "instrument.name",
        },
        { text: "Market Name", value: "market.name" },
        { text: "isin", value: "instrument.isin" },
        { text: "wkn", value: "instrument.nsin.wkn" },
        { text: "weight", value: "weight" },
      ],
      id: this.indexId,
      indexData: [],
    };
  },
  watch: {
    id: function () {
      if (this.id === 0) {
        return;
      } else {
        this.fetchIndex(this.id);
      }
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },

  created() {
    if (this.id === 0) {
      return;
    } else {
      this.fetchIndex(this.id);
    }
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
    fetchIndex(indexID) {
      this.setIsLoading(true);
      const storedData = JSON.parse(localStorage.getItem("userData"));
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedData.token}`,
        },
      };
      //dont forget on symfony server in public/index.php set headers
      // fetch(`https://index-view.herokuapp.com/api/index/${indexID}`)
      fetch(`${Config.VUE_APP_BACKEND_URL}/index/${indexID}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          this.setIsLoading(false);
          return (this.indexData = data);
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>