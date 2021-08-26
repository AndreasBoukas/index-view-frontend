<template>
  <div>
    <div v-if="this.id === 0">

    </div>
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

  created() {
    if (this.id === 0) {
      return;
    } else {
      this.fetchIndex(this.id);
    }
  },
  methods: {
    fetchIndex: function (indexID) {
      //dont forget on symfony server in public/index.php set headers
      fetch(`http://localhost:8000/api/index/${indexID}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          return (this.indexData = data);
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>