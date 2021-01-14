<template>
  <div class="w-calendar-container">
    <div v-for="day of cellHeaders" class="w-cell-header" :key="day">{{ day }}</div>
    <div v-for="empty of emptyCells" class="w-empty-cell" :key="`empty-${empty}`" />
    <div
      v-for="day of totalDays"
      class="w-date-cell"
      :class="{ selected: isSelected(day) }"
      :key="day"
      @click.stop="cellSelect(day)"
    >
      {{ day }}
    </div>
  </div>
</template>

<script>
import dateFns from "./methods";

const dayMap = {
  0: "Su",
  1: "Mo",
  2: "Tu",
  3: "We",
  4: "Th",
  5: "Fr",
  6: "Sa"
};

export default {
  data() {
    return {
      currentDate: new Date(),
      selectedDates: []
    };
  },

  props: {
    selectedDate: {
      type: Object,
      required: false
    },

    dates: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },

  computed: {
    totalDays() {
      return dateFns.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth());
    },

    emptyCells() {
      return dateFns.startingDayInWeek(this.currentDate.getFullYear(), this.currentDate.getMonth());
    },

    cellHeaders() {
      let days = [];
      for (let i = 0; i < 7; i++) {
        days.push(dayMap[i]);
      }

      return days;
    }
  },

  methods: {
    cellToString(day) {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day).toString();
    },

    cellSelect(day) {
      const date = this.cellToString(day);

      if (this.selectedDates.includes(date)) {
        this.selectedDates.splice(this.selectedDates.indexOf(date), 1);
      } else {
        this.selectedDates.push(date);
      }

      this.$emit("cell-select", date);
    },

    isSelected(day) {
      return this.selectedDates.includes(this.cellToString(day));
    }
  }
};
</script>

<style lang="scss" scoped>
$background: #26a0a9;
$light-gray: #e4e4e4;
$light-gray-1: #767676;
$dark-gray: #2e2e2e;
$hover: #f6f6f6;

@font-face {
  font-family: "Proxima";
  src: local("Proxima"), url(./assets/fonts/ProximaNova-Semibold.otf) format("opentype");
}

@font-face {
  font-family: "ProximaReg";
  src: local("ProximaReg"), url(./assets/fonts/ProximaNova-Regular.otf) format("opentype");
}

.w-calendar-container {
  font-family: "Proxima";
  width: 100%;
  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: repeat(7, 40px);
  grid-auto-rows: auto;
  font-size: 14px;
}

.w-date-cell {
  width: 38px;
  height: 38px;
  cursor: pointer;
  background: white;
  border-radius: 3px;
  text-align: center;
  border: 1px solid $light-gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $dark-gray;

  &.selected {
    background-color: $background;
    color: white;

    &:hover {
      background-color: $background;
      opacity: 0.75;
    }
  }

  &.disabled {
    background-color: $hover;
    color: $light-gray;
  }

  &:hover {
    background-color: $hover;
  }
}

.w-cell-header {
  font-family: "ProximaReg";
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #767676;
  line-height: 14px;
}
</style>
