const MenuItemGroup = Menu.ItemGroup

function getValuePropValue (child) {
  const props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  throw new Error('no key or value for ' + child);
}

function getPropValue (child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }
  return child.props[prop];
}

function isCombobox (props) {
  return props.combobox;
}

function isMultipleOrTags (props) {
  return props.multiple || props.tags;
}

function isMultipleOrTagsOrCombobox (props) {
  return isMultipleOrTags(props) || isCombobox(props);
}

function isSingleMode (props) {
  return !isMultipleOrTagsOrCombobox(props);
}

function toArray (value) {
  let ret = value;
  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }
  return ret;
}

function getSelectKeys (menuItems, value) {
  if (value === null || value === undefined) {
    return [];
  }
  let selectedKeys = [];
  React.Children.forEach(menuItems, (item) => {
    if (item.type === MenuItemGroup) {
      selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
    } else {
      const itemValue = getValuePropValue(item);
      const itemKey = item.key;
      if (value.indexOf(itemValue) !== -1 && itemKey) {
        selectedKeys.push(itemKey);
      }
    }
  });
  return selectedKeys;
}

RcSelectUtil = {getValuePropValue, getPropValue, isCombobox, isMultipleOrTags, isMultipleOrTagsOrCombobox, isSingleMode, toArray, getSelectKeys}
