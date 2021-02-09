<template>
  <div class="font-proxima">
    <slot name="currentDate" :date="displayDate" :next="nextMonth" :prev="prevMonth" />
    <div class="w-calendar-container">
      <div v-for="day of cellHeaders" class="w-cell-header" :key="day">{{ day }}</div>
      <div v-for="empty of emptyCells" class="w-empty-cell" :key="`empty-${empty}`" />
      <div
        v-for="day of totalDays"
        class="w-date-cell"
        :class="{ selected: isSelected(day), disabled: isDisabled(day) }"
        :key="day"
        @click.stop="cellSelect(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
import dateFns from "./methods";

const dayMap = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default {
  data() {
    return {
      currentDate: new Date(),
      selectedDates: [],
      disabledDates: []
    };
  },

  props: {
    selectionType: {
      type: String,
      required: false,
      default: "single"
    },

    selectedDate: {
      type: Date,
      required: false
    },

    value: {
      type: [Array, Date],
      required: false,
      default() {
        return [];
      }
    },

    minDate: {
      type: [Number, Date],
      required: false,
      default() {
        return null;
      }
    },

    maxDate: {
      type: [Number, Date],
      required: false,
      default() {
        return null;
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
    },

    displayDate() {
      return {
        month: months[this.currentDate.getMonth()],
        year: this.currentDate.getFullYear()
      };
    }
  },

  mounted() {
    if (this.selectedDate) {
      this.currentDate = this.selectedDate;
    }

    if (this.value) {
      if (this.selectionType === "single") {
        this.selectedDates = [this.value.toString()];
      }

      if (this.selectionType === "multi") {
        this.selectedDates = this.value.map(val => val.toString());
      }

      if (this.selectionType === "disable") {
        this.disabledDates = this.value.map(val => val.toString());
      }
    }
  },

  methods: {
    handleDisableSelection(day) {
      const date = this.cellToString(day);

      if (this.disabledDates.includes(date)) {
        this.disabledDates.splice(this.disabledDates.indexOf(date), 1);
      } else {
        this.disabledDates.push(date);
      }

      this.emitChange(this.disabledDates);
    },

    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    },

    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    },

    cellToString(day) {
      return this.convertToDate(day).toString();
    },

    convertToDate(day) {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    },

    handleDateSelection(day) {
      if (this.isDisabled(day)) return;
      const date = this.convertToDate(day);

      this.selectedDates = [date.toString()];
      this.emitChange(date);
    },

    handleMultiSelection(day) {
      if (this.isDisabled(day)) return;

      const date = this.cellToString(day);

      if (this.selectedDates.includes(date)) {
        this.selectedDates.splice(this.selectedDates.indexOf(date), 1);
      } else {
        this.selectedDates.push(date);
      }

      this.emitChange(this.selectedDates);
    },

    cellSelect(day) {
      switch (this.selectionType) {
        case "single":
          this.handleDateSelection(day);
          break;
        case "multi":
          this.handleMultiSelection(day);
          break;
        case "disable":
          this.handleDisableSelection(day);
          break;
        case "range":
          this.handleMultiSelection(day);
          break;
        default:
          throw new Error("invalid selection type");
      }
    },

    emitChange(val) {
      this.$emit("cell-select", val);
    },

    isSelected(day) {
      return this.selectedDates.includes(this.cellToString(day));
    },

    isDisabled(day) {
      const date = this.convertToDate(day);

      if (this.disabledDates.includes(this.cellToString(day))) return true;
      if (this.minDate && date < this.minDate) return true;
      if (this.maxDate && date > this.maxDate) return true;

      return false;
    }
  }
};
</script>

<style lang="scss">
$background: #26a0a9;
$light-gray: #e4e4e4;
$light-gray-1: #767676;
$dark-gray: #2e2e2e;
$hover: #f6f6f6;

@font-face {
  font-family: "WProxima";
  src: url(./assets/fonts/ProximaNova-Semibold.otf) format("opentype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "WProxima";
  src: url(./assets/fonts/ProximaNova-Regular.otf) format("opentype");
  font-weight: normal;
  font-style: normal;
}

.font-proxima {
  font-family: "WProxima";
  font-weight: normal;
}

.w-calendar-container {
  font-family: "WProxima";
  width: 100%;
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, minmax(30px, 48px));

  @media only screen and (min-width: 760px) {
    grid-template-columns: repeat(7, minmax(48px, 70px));
  }

  grid-auto-rows: auto;
  font-size: 14px;
  font-weight: 600;
}

.w-date-cell {
  cursor: pointer;
  background: white;
  border-radius: 3px;
  text-align: center;
  border: 1px solid $light-gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $dark-gray;
  font-weight: normal;

  &::before {
    content: "";
    display: flex;
    padding-top: 100%;
  }

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
  font-family: "WProxima";
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #767676;
  line-height: 14px;
  font-weight: normal;
}
</style>
