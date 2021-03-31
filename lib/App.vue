<template>
  <div class="container">
    <w-calendar :min-date="minDate" selection-type="disable" :max-date="maxDate" :value="[new Date()]">
      <template #currentDate="{ date, next, prev }">
        <div class="date-content">
          <button @click="prev">Prev</button>
          {{ date.month }} {{ date.year }}
          <button @click="next">Next</button>
        </div>
      </template>
    </w-calendar>
  </div>
</template>

<script>
import WCalendar from "./Calendar";

export default {
  components: {
    WCalendar
  },

  data() {
    return {
      minDate: new Date().setDate(new Date().getDate() - 1),
      maxDate: new Date().setDate(new Date().getDate() + 90),
      selectedDate: new Date(2018, 0, 21),
      value: [new Date()]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem;
}

.date-content {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
