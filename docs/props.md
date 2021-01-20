# Props

## Available Props

| Name          | Type                 | Required | Default      | Available Options        | Description                                |
| ------------- | -------------------- | -------- | ------------ | ------------------------ | ------------------------------------------ |
| selectionType | `String`             | `false`  | `single`     | `single, multi, disable` | Change the selection behavior              |
| selectedDate  | `Date`               | `false`  | `Date.now()` | `any date`               | Change the current month / year view       |
| value         | `Date / Array<Date>` | `false`  | `[]`         | `N/A`                    | set the value on mount                     |
| minDate       | `Date`               | `false`  | `null`       | `N/A`                    | Any date before this date will be disabled |
| maxDate       | `Date`               | `false`  | `null`       | `N/A`                    | Any date after this date will be disabled  |
