global.React = React
global.ReactDOM = ReactDOM

AsyncValidator = require('async-validator')
classNames = require('classnames')
hoistStatics = require('hoist-non-react-statics')
assign = require('object-assign')
warning = require('warning')
scrollIntoView = require('dom-scroll-into-view')
velocity = require('velocity-animate')
GregorianCalendar = require('gregorian-calendar')
GregorianCalendarLocale = require('gregorian-calendar/lib/locale/zh_CN')
DateTimeFormat = require('gregorian-calendar-format')

Rc = {
  Util: require('rc-util'),
  Animate: require('rc-animate'),
  QueueAnim: require('rc-queue-anim'),
  Notification: require('rc-notification'),
  Tooltip: require('rc-tooltip'),
  Dialog: require('rc-dialog'),
  Progress: require('rc-progress'),
  InputNumber: require('rc-input-number'),
  Trigger: require('rc-trigger'),
  Dropdown: require('rc-dropdown'),
  Upload: require('rc-upload'),
  Radio: require('rc-radio'),
  Calendar: require('rc-calendar'),
  TimePicker: require('rc-time-picker'),
  Switch: require('rc-switch'),
}

Rc.Calendar.MonthCalendar = require('rc-calendar/lib/MonthCalendar')
Rc.Calendar.DatePicker = require('rc-calendar/lib/Picker')
Rc.Calendar.RangeCalendar = require('rc-calendar/lib/RangeCalendar')
Rc.Calendar.CalendarLocale = require('rc-calendar/lib/locale/zh_CN')

ClassNames = classNames
