# Getting Started

## Installation

You can install the calendar using `npm` or `yarm`

```bash
yarn add @wolzey/calendar

# OR

npm i @wolzey/calendar
```

## Using / Overwriting Styles

To use the default styles you need to import the default styles

```javascript
import "@wolzey/calendar/dist/WCalendar.css";
```

or if you are using Nuxt you can import using the `css` property in `nuxt.config.js`

```javascript
{
  css: ['@wolzey/calendar/dist/WCalendar.css'],
  // ...
}
```

or write your own with the following class names

```css
.w-cell-header {
  /* your header styles */
}

.w-date-cell {
  /* your cell styles */
}

.w-calendar-container {
  /* your layout styles */
}
```

## Example Usage

in this example we use the scoped slot to bring in the date to show the current month on top of the calendar. We also can bring in some helper functions to go to the next or previous month. You can also implement these yourself if you do not want them above the calendar.

```html
<w-calendar>
  <template #currentDate="{ date, next, prev }">
    <div class="date-content">
      <button @click="prev">Prev</button>
      {{ date.month }} {{ date.year }}
      <button @click="next">Next</button>
    </div>
  </template>
</w-calendar>
```
