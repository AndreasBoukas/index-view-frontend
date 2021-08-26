<template>
  <div>
    <br>
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
    getselectedIndex(event) {
      this.$emit("selected", event);
      // console.log(event)
    },
  },
  beforeMount() {
    //dont forget on symfony server in public/index.php set headers
    fetch("http://localhost:8000/api/indices")
      .then((res) => res.json())
      .then((data) => {
        this.indexData = data;
        this.initialSelect = this.indexData[0];
        this.defName = this.indexData[0].name;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
