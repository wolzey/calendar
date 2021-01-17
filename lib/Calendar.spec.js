import Vue from "vue";
import { mount } from "@vue/test-utils";
import { expect } from "chai";

import Calendar from "./Calendar";

const selectors = {
  CELLS: ".w-date-cell",
  SELECTED: ".selected",
  DISABLED: ".disabled",
  EMPTY: ".w-empty-cell"
};

describe("Calendar", function() {
  let wrapper;

  beforeEach(function() {
    wrapper = mount(Calendar, {});
  });

  it("should, if no props are sent in it uses the current month and year", function() {
    const emptyCells = wrapper.findAll(selectors.EMPTY);
    const firstDateCell = wrapper.find(selectors.CELLS);
    expect(emptyCells.length).to.equal(5);
    expect(firstDateCell.exists()).to.equal(true);
    expect(firstDateCell.text()).to.equal("1");
  });

  it("should send a date object back when a cell is clicked", function() {
    wrapper.find(selectors.CELLS).trigger("click");
    expect(wrapper.emitted("cell-select").length).to.equal(1);
  });

  it("should only select one cell at a time when selection is set to single", async function() {
    wrapper.setProps({ selectionType: "single" });

    const dateCells = wrapper.findAll(selectors.CELLS);

    for (let i = 0; i < 3; i++) {
      dateCells.at(i).trigger("click");
    }

    await Vue.nextTick();

    expect(wrapper.findAll(selectors.SELECTED).length).to.equal(1);
  });

  it("should disable dates when i'm in disabled mode instead of selecting them", async function() {
    wrapper.setProps({ selectionType: "disable" });
    wrapper.find(selectors.CELLS).trigger("click");

    await Vue.nextTick();

    expect(wrapper.findAll(selectors.DISABLED).length).to.be.greaterThan(0);
  });

  it("should select multiple if the selection type is 'multi'", async function() {
    wrapper.setProps({ selectionType: "multi" });

    const dateCells = wrapper.findAll(selectors.CELLS);

    for (let i = 0; i < 3; i++) {
      dateCells.at(i).trigger("click");
    }

    await Vue.nextTick();

    expect(wrapper.findAll(selectors.SELECTED).length).to.be.greaterThan(1);
  });

  describe("Min and Max ranges", function() {
    it("should disable all dates that are before my minDate", async function() {
      const d = new Date();
      const minDate = new Date(d.getFullYear(), d.getMonth(), 10);
      wrapper.setProps({ minDate });

      await Vue.nextTick();

      expect(wrapper.findAll(selectors.DISABLED).length).to.be.greaterThan(0);
    });

    it("should disable all dates that are after my maxDate", async function() {
      const d = new Date();
      const maxDate = new Date(d.getFullYear(), d.getMonth(), 20);
      wrapper.setProps({ maxDate });

      await Vue.nextTick();
      expect(wrapper.findAll(selectors.DISABLED).length).to.be.greaterThan(0);
    });
  });
});
