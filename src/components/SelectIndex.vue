<template>
  <div>
    <br />
    <div class="d-flex justify-center mb-6">
      <h3>Please Select an Index</h3>
    </div>
    <v-select
      :items="indexData"
      item-text="name"
      item-value="id"
      label="Indices"
      @change="getselectedIndex"
    ></v-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import Config from "../../config.json";

export default {
  name: "SelectIndex",
  data() {
    return {
      defId: "",
      defName: "",
      indexData: [],
      initialSelect: {},
    };
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
    getselectedIndex(event) {
      this.$emit("selected", event);
      // console.log(event)
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getIsLoading"]),
  },
  beforeMount() {
    //dont forget on symfony server in public/index.php set headers
    // fetch("https://index-view.herokuapp.com/api/indices")
    if (this.isLoggedIn) {
      this.setIsLoading(true);
      const storedData = JSON.parse(localStorage.getItem("userData"));
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedData.token}`,
        },
      };
      fetch(`${Config.VUE_APP_BACKEND_URL}/indices`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          this.indexData = data;
          this.initialSelect = this.indexData[0];
          this.defName = this.indexData[0].name;
          this.setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  },
};
</script>
