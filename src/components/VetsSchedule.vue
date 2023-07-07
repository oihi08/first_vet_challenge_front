<template>
  <div class="vets-list">
    <div class="vets-list-filters">
      <input
        type="text"
        placeholder="Search by vet's name"
        v-model="searchName"
        class="form-control"
      />
      <div @click="onClickSortDate">
        <span v-if="sortType === 'asc-date'">
          <ArrowUpIcon />
        </span>
        <span v-else>
          <ArrowDownIcon />
        </span>
      </div>
    </div>
    <menu-icon />
    <div class="vets-list-container">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, index) in filterByName"
          :key="index"
        >
          <span class="vets-list-container-date">{{ item.date }}</span>
          <span class="vets-list-container-time">
            {{ item.timeStart }} - {{ item.timeFinish }}
          </span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <!--  <ul>
        <li v-for="(item, index) in filterByName" :key="index">
          <CalendarIcon />
          <span class="vets-list-container-date">{{ item.date }}</span>
          <span class="vets-list-container-time">
            {{ item.timeStart }} - {{ item.timeFinish }}
          </span>
          <span>{{ item.name }}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ArrowDownIcon from "vue-material-design-icons/ArrowDown.vue";
import ArrowUpIcon from "vue-material-design-icons/ArrowUp.vue";
import moment from "moment";

export default {
  name: "VetsSchedule",
  components: { ArrowDownIcon, ArrowUpIcon },
  data() {
    return {
      schedule: null,
      sortType: "asc-date",
      searchName: "",
    };
  },
  computed: {
    filterByName() {
      return this.schedule?.filter((item) => {
        return item.name.toLowerCase().includes(this.searchName);
      });
    },
  },
  created: function () {
    axios.get("http://127.0.0.1:8000/schedule").then((res) => {
      console.log("res", res.data);
      this.schedule = this.onSortByDate(res.data, "asc-date");
    });
  },
  methods: {
    onClickSortDate() {
      this.sortType = this.sortType === "asc-date" ? "desc-date" : "asc-date";
      this.schedule = this.onSortByDate(this.schedule, this.sortType);
    },
    onSortByDate(list, newSortType) {
      return list.sort((a, b) => {
        const dateA = moment(a.date + a.timeStart, "YYYY-MM-DD HH:mm");
        const dateB = moment(b.date + b.timeStart, "YYYY-MM-DD HH:mm");
        if (newSortType === "asc-date") {
          return dateA.isBefore(dateB) ? -1 : 1;
        } else {
          return dateB.isBefore(dateA) ? -1 : 1;
        }
      });
    },
  },
};
</script>
<style>
.vets-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vets-list-filters {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
/* input {
            margin-right: 6px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            color: white;
            background-color: #0054DD;
            cursor: pointer;
            border-radius: 4px;
            padding: 10px 20px;
        } */

.vets-list-container {
  width: 30rem;
  display: flex;
  justify-content: center;
}
</style>
