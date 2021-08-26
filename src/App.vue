<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>Index View</h1>
    </v-app-bar>

    <v-main>
      <div class="d-flex justify-center mb-6">
      <SelectIndex @selected="onSelected" />
      </div>
      <div class="d-flex justify-center mb-6">
      <br>
      <ShowIndex :indexId="this.indexID" :key="this.indexID" />
      </div>
        
    </v-main>
  </v-app>
</template>

<script>
import SelectIndex from "./components/SelectIndex.vue";
import ShowIndex from "./components/ShowIndex.vue";

export default {
  name: "App",

  components: {
    SelectIndex,
    ShowIndex,
  },

  methods: {
    onSelected(value) {
      this.indexID = value;
    },
  },

  data() {
    return {
      indexID: 0,
    };
  },
};
</script>
