<template>
  <div class="vetsList-container-card">
    <div class="d-flex align-items-center">
      <img :src="randomImage(vet.id)" />
      <div class="vetsList-container-card-body">
        <b><i class="bi bi-calendar-event"></i> {{ vet.date }}</b>
        <b
          ><i class="bi bi-clock"></i> {{ vet.timeStart }} -
          {{ vet.timeFinish }}</b
        >
        <span>Dr {{ vet.name }}</span>
      </div>
    </div>
    <div v-if="vet.selected">
      <i class="bi bi-check2-circle"></i>
    </div>
    <div class="cursor-pointer" @click="selectVet(vet)" v-else>
      <i class="bi bi-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "VetsCard",
  props: {
    vet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    randomImage: function (id) {
      return `https://xsgames.co/randomusers/assets/avatars/${
        id === 4714 ? "female" : "male"
      }/46.jpg`;
    },
    selectVet: function () {
      this.$emit("selectVet", this.vet);
    },
  },
};
</script>

<style lang="scss" scoped>
.vetsList-container-card {
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
</style>
