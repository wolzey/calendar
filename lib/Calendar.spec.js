import { mount } from "@vue/test-utils";
import { expect } from "chai";

import Calendar from "./Calendar";

describe("Calendar", function() {
  let wrapper;

  before(function() {
    wrapper = mount(Calendar, {});
  });

  it("should, if no props are sent in it uses the current month and year", function() {
    const emptyCells = wrapper.findAll(".w-empty-cell");
    const firstDateCell = wrapper.find(".w-date-cell");
    expect(emptyCells.length).to.equal(5);
    expect(firstDateCell.exists()).to.equal(true);
    expect(firstDateCell.text()).to.equal("1");
  });

  it("should send a date object back when a cell is clicked", function() {
    wrapper.find(".w-date-cell").trigger("click");
    expect(wrapper.emitted("cell-select").length).to.equal(1);
  });

  it("should set the selected date when a date cell is clicked", async function() {
    await wrapper.find(".w-date-cell").trigger("click");
    expect(wrapper.find(".selected"));
  });
});
