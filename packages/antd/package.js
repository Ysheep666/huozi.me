var fs = Npm.require('fs');

Package.describe({
	name: 'started:antd',
	version: '0.0.1',
	summary: 'Antd',
	git: ''
});


Package.onUse(function(api) {
  api.use(['react', 'ecmascript', 'cosmos:browserify']);
  api.imply(['react']);

  api.addFiles([
    'antd.browserify.options.json',
    'antd.browserify.js',
    'lib/form/utils.js',
    'lib/form/createForm.jsx',
    'lib/menu/util.js',
    'lib/menu/Divider.jsx',
    'lib/menu/DOMWrap.jsx',
    'lib/menu/MenuMixin.jsx',
    'lib/menu/MenuItem.jsx',
    'lib/menu/MenuItemGroup.jsx',
    'lib/menu/SubMenuStateMixin.jsx',
    'lib/menu/SubPopupMenu.jsx',
    'lib/menu/SubMenu.jsx',
    'lib/menu/Menu.jsx',
    'lib/select/util.js',
    'lib/select/DropdownMenu.jsx',
    'lib/select/Option.jsx',
    'lib/select/OptGroup.jsx',
    'lib/select/SelectTrigger.jsx',
    'lib/select/FilterMixin.jsx',
    'lib/select/Select.jsx',
    'lib/tabs/utils.js',
    'lib/tabs/KeyCode.js',
    'lib/tabs/InkBarMixin.jsx',
    'lib/tabs/TabPane.jsx',
    'lib/tabs/Nav.jsx',
    'lib/tabs/Tabs.jsx',
    'components/common/openAnimation.js',
    'components/layout/row.jsx',
    'components/layout/col.jsx',
    'components/layout/index.jsx',
    'components/affix/index.jsx',
    'components/icon/index.jsx',
    'components/button/button-group.jsx',
    'components/button/button.jsx',
    'components/button/index.jsx',
    'components/input/index.jsx',
    'components/input-number/index.jsx',
    'components/select/index.jsx',
    'components/radio/radio.jsx',
    'components/radio/group.jsx',
    'components/radio/radioButton.jsx',
    'components/switch/index.jsx',
    'components/date-picker/locale/zh_CN.js',
    'components/date-picker/PickerMixin.jsx',
    'components/date-picker/RangePicker.jsx',
    'components/date-picker/index.jsx',
    'components/menu/index.jsx',
    'components/popover/index.jsx',
    'components/dropdown/dropdown.jsx',
    'components/dropdown/dropdown-button.jsx',
    'components/dropdown/index.jsx',
    'components/form/Form.jsx',
    'components/form/FormItem.jsx',
    'components/form/ValueMixin.jsx',
    'components/form/index.jsx',
    'components/message/index.jsx',
    'components/modal/Modal.jsx',
    'components/modal/confirm.jsx',
    'components/modal/index.jsx',
    'components/tooltip/index.jsx',
    'components/popconfirm/index.jsx',
    'components/tabs/index.jsx',
    'components/progress/index.jsx',
    'components/upload/getFileItem.js',
    'components/upload/uploadList.jsx',
    'components/upload/index.jsx',
    'components/queue-anim/index.jsx'
  ], 'client');

  var styles = getStyleFiles('style')
  styles.splice(styles.indexOf('style/index.less'), 1)

  api.use(['lauricio:less-autoprefixer']);
  api.addFiles(styles, 'client', {isImport: true});
  api.addFiles('style/index.less', 'client');

  api.export('Antd', 'client');
  api.export('ClassNames', 'client');
});


Npm.depends({
  'array-tree-filter': '1.0.0',
  "async-validator": "1.5.0",
  'classnames': '2.2.0',
  'css-animation': '1.1.0',
  'exposify': '0.5.0',
  'gregorian-calendar': '4.1.0',
  'gregorian-calendar-format': '4.1.0',
  "hoist-non-react-statics": "1.0.3",
  'object-assign': '4.0.1',
  'dom-scroll-into-view': '1.1.0',
  'rc-animate': '2.0.2',
  'rc-calendar': '5.3.1',
  // 'rc-cascader': '0.8.1',
  // 'rc-checkbox': '1.2.0',
  // 'rc-collapse': '1.4.4',
  'rc-dialog': '5.3.2',
  'rc-dropdown': '1.4.4',
  'rc-input-number': '2.4.3',
  'rc-notification': '1.3.2',
  // 'rc-pagination': '1.4.0',
  'rc-progress': '1.0.4',
  'rc-queue-anim': '0.11.2',
  'rc-radio': '2.0.0',
  // 'rc-slider': '3.3.0',
  // 'rc-steps': '1.4.1',
  'rc-switch': '1.3.2',
  // 'rc-table': '3.9.0',
  'rc-time-picker': '1.1.1',
  'rc-tooltip': '3.3.1',
  // 'rc-tree': '1.1.0',
  // 'rc-tree-select': '1.1.1',
  'rc-trigger': '1.1.1',
  'rc-upload': '1.8.0',
  'rc-util': '3.1.2',
  'react-slick': '0.9.1',
  'velocity-animate': '1.2.3',
  'warning': '2.1.0'
});

function getStyleFiles(root) {
  var res = [];
  fs.readdirSync('packages/antd/' + root).forEach(function (file) {
    var filename = root + '/' + file;
    var stat = fs.statSync('packages/antd/' + filename)
    if (!stat.isDirectory()){
      if (filename.indexOf('.less') > 0) {
        res.push(filename);
      }
    } else {
      res = res.concat(getStyleFiles(filename));
    }
  });
  return res;
}
