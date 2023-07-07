<template>
  <div class="vetsList">
    <VetsFilters
      :sortType="sortType"
      v-model:searchName="searchName"
      @onClickSortDate="onClickSortDate"
    />
    <div class="vetsList-container">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, index) in filterByName"
          :key="index"
        >
          <VetsCard :vet="item" @selectVet="selectVet" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import VetsCard from "./VetsCard.vue";
import VetsFilters from "./VetsFilters.vue";

export default {
  name: "VetsSchedule",
  components: {
    VetsCard,
    VetsFilters,
  },
  data() {
    return {
      schedule: null,
      sortType: "asc-date",
      searchName: "",
    };
  },
  computed: {
    filterByName: function () {
      return this.schedule?.filter((item) => {
        return item.name.toLowerCase().includes(this.searchName.toLowerCase());
      });
    },
  },
  created: function () {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL_KEY}api/schedule`)
      .then((res) => {
        this.schedule = this.onSortByDate(res.data, "asc-date");
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
  },
  methods: {
    onClickSortDate() {
      this.sortType = this.sortType === "asc-date" ? "desc-date" : "asc-date";
      this.schedule = this.onSortByDate(this.schedule, this.sortType);
    },
    onSortByDate: (list, newSortType) => {
      return list?.sort((a, b) => {
        const dateA = moment(a.date + a.timeStart, "YYYY-MM-DD HH:mm");
        const dateB = moment(b.date + b.timeStart, "YYYY-MM-DD HH:mm");
        if (newSortType === "asc-date") {
          return dateA.isBefore(dateB) ? -1 : 1;
        } else {
          return dateB.isBefore(dateA) ? -1 : 1;
        }
      });
    },
    randomImage: (id) => {
      return `https://xsgames.co/randomusers/assets/avatars/${
        id === 4714 ? "female" : "male"
      }/46.jpg`;
    },
    selectVet: (vet) => {
      vet.selected = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.vetsList {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  &-container {
    display: flex;
    justify-content: center;
  }
}
</style>
