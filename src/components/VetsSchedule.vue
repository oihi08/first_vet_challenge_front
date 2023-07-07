<template>
  <div class="vetsList">
    <div class="vetsList-filters">
      <input
        type="text"
        placeholder="Search by vet's name"
        aria-label="Search by vet's name"
        v-model="searchName"
        class="form-control"
      />
      <button
        class="btn btn-primary vetsList-sort-button"
        @click="onClickSortDate"
      >
        Sort Date
        <span v-if="sortType === 'asc-date'">
          <i class="bi bi-arrow-up"></i>
        </span>
        <span v-else>
          <i class="bi bi-arrow-down"></i>
        </span>
      </button>
    </div>
    <div class="vetsList-container">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, index) in filterByName"
          :key="index"
        >
          <div class="vetsList-container-card">
            <div class="d-flex align-items-center">
              <img :src="randomImage(item.id)" />
              <div class="vetsList-container-card-body">
                <b><i class="bi bi-calendar-event"></i> {{ item.date }}</b>
                <b
                  ><i class="bi bi-clock"></i> {{ item.timeStart }} -
                  {{ item.timeFinish }}
                </b>
                <span>Dr {{ item.name }}</span>
              </div>
            </div>
            <div v-if="item.selected">
              <i class="bi bi-check2-circle"></i>
            </div>
            <div class="cursor-pointer" @click="selectVet(item)" v-else>
              <i class="bi bi-chevron-right"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "VetsSchedule",
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
    onClickSortDate: () => {
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
  &-filters {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    width: 30rem;
    input {
      margin-right: 6px;
    }
  }
  &-sort-button {
    display: flex;
    align-items: center;
  }
  &-container {
    width: 30rem;
    display: flex;
    justify-content: center;
    &-card {
      display: flex;
      align-items: center;
      img {
        width: 20%;
        height: 20%;
        border-radius: 15px;
      }
      &-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        span {
          color: rgba(113, 128, 150, 1);
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
