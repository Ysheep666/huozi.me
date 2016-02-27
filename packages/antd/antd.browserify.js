global.React = React
global.ReactDOM = ReactDOM

AsyncValidator = require('async-validator')
classNames = require('classnames')
hoistStatics = require('hoist-non-react-statics')
assign = require('object-assign')
warning = require('warning')
scrollIntoView = require('dom-scroll-into-view')
velocity = require('velocity-animate')

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
}

ClassNames = classNames
