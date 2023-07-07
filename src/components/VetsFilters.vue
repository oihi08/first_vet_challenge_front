<template>
  <div class="vetsList-filters">
    <input
      type="text"
      placeholder="Search by vet's name"
      aria-label="Search by vet's name"
      :value="searchName"
      @input="$emit('update:searchName', $event.target.value)"
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
</template>

<script>
export default {
  name: "VetFilters",
  props: {
    sortType: {
      type: String,
      required: true,
    },
    searchName: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickSortDate: function () {
      this.$emit("onClickSortDate");
    },
  },
};
</script>

<style lang="scss" scoped>
.vetsList-filters {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 450px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  input {
    margin-right: 6px;
  }
  &-sort-button {
    display: flex;
    align-items: center;
  }
}
</style>
