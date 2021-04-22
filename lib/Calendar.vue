<template>
  <div class="font-proxima w-full">
    <slot name="currentDate" :date="displayDate" :next="nextMonth" :prev="prevMonth" />
    <div class="w-calendar-container">
      <div v-for="day of cellHeaders" class="w-cell-header" :key="day">{{ day }}</div>
      <div v-for="empty of emptyCells" class="w-empty-cell" :key="`empty-${empty}`" />
      <div
        v-for="day of totalDays"
        class="w-date-cell"
        :class="{ selected: isSelected(day), disabled: isDisabled(day), 'in-range': isInRange(day) }"
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
  props: {
    disabledDates: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },

    isRange: {
      type: Boolean,
      required: false,
      default: false
    },

    selectedDate: {
      type: Date,
      required: false,
      default() {
        return new Date();
      }
    },

    value: {
      type: [Array, Date, Object, Number],
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
    valueIsRange() {
      return this.value && typeof this.value === "object";
    },

    compareableStartDate() {
      if (!this.valueIsRange) return;

      return this.value.start ? this.convertToComparable(this.value.start) : undefined;
    },

    compareableEndDate() {
      if (!this.valueIsRange) return;

      return this.value.end ? this.convertToComparable(this.value.end) : undefined;
    },

    totalDays() {
      return dateFns.daysInMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    },

    emptyCells() {
      return dateFns.startingDayInWeek(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
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
        month: months[this.selectedDate.getMonth()],
        year: this.selectedDate.getFullYear()
      };
    }
  },

  methods: {
    handleRangeValue(val) {
      if (val.start && val.end) {
        this.selectedDates = [val.start.toDateString(), val.end.toDateString()];
      }
    },

    convertToComparable(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },

    isInRange(date) {
      if (!this.value.start || !this.value.end) return false;

      const converted = this.convertToComparable(this.convertToDate(date));

      return converted > this.compareableStartDate && converted < this.compareableEndDate;
    },

    nextMonth() {
      this.$emit("next-month", new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1));
    },

    prevMonth() {
      this.$emit("prev-month", new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1));
    },

    cellToString(day) {
      return this.convertToDate(day).toDateString();
    },

    convertToDate(day) {
      return new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), day);
    },

    cellSelect(day) {
      this.$emit("cell-select", this.convertToComparable(this.convertToDate(day)));
    },

    isSelected(day) {
      const date = this.cellToString(day);

      if (this.value && typeof this.value === "object") {
        if (this.value.start && this.value.start.toDateString() === date) return true;
        if (this.value.end && this.value.end.toDateString() === date) return true;

        return false;
      }

      return this.value.includes(this.cellToString(day));
    },

    hasDate(arr, date) {
      return arr.find(v => this.convertToComparable(v).getTime() === this.convertToComparable(date).getTime());
    },

    isDisabled(day) {
      const date = this.convertToDate(day);

      if (this.hasDate(this.disabledDates, date)) return true;
      if (this.minDate && date < this.minDate) return true;
      if (this.maxDate && date > this.maxDate) return true;

      return false;
    }
  }
};
</script>

<style lang="scss">
$background: #26a0a9;
$background-range: #93d0d4;
$light-gray: #e4e4e4;
$light-gray-1: #767676;
$dark-gray: #2e2e2e;
$hover: #f6f6f6;

.w-full {
  width: 100%;
}

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
  grid-template-columns: repeat(7, minmax(30px, auto));

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

  &.in-range {
    background-color: $background-range;
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
