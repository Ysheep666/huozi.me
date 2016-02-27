const {getValuePropValue} = RcSelectUtil
const MenuItem = Menu.Item
const MenuItemGroup = Menu.ItemGroup
const OptGroup = RcSelectOptGroup

RcSelectFilterMixin = {
  filterOption(input, child) {
    if (!input) {
      return true;
    }
    const filterOption = this.props.filterOption;
    if (!filterOption) {
      return true;
    }
    if (child.props.disabled) {
      return false;
    }
    return filterOption.call(this, input, child);
  },
  renderFilterOptions(inputValue) {
    return this.renderFilterOptionsFromChildren(this.props.children, true, inputValue);
  },

  renderFilterOptionsFromChildren(children, showNotFound, iv) {
    let sel = [];
    const props = this.props;
    const inputValue = iv === undefined ? this.state.inputValue : iv;
    const childrenKeys = [];
    const tags = props.tags;
    React.Children.forEach(children, (child)=> {
      if (child.type === OptGroup) {
        const innerItems = this.renderFilterOptionsFromChildren(child.props.children, false);
        if (innerItems.length) {
          let label = child.props.label;
          let key = child.key;
          if (!key && typeof label === 'string') {
            key = label;
          } else if (!label && key) {
            label = key;
          }
          sel.push(<MenuItemGroup key={key} title={label}>
            {innerItems}
          </MenuItemGroup>);
        }
        return;
      }
      const childValue = getValuePropValue(child);
      if (this.filterOption(inputValue, child)) {
        sel.push(<MenuItem
          value={childValue}
          key={childValue}
          {...child.props}
        />);
      }
      if (tags && !child.props.disabled) {
        childrenKeys.push(childValue);
      }
    });
    if (tags) {
      // tags value must be string
      let value = this.state.value || [];
      value = value.filter((singleValue) => {
        return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
      });
      sel = sel.concat(value.map((singleValue)=> {
        return <MenuItem value={singleValue} key={singleValue}>{singleValue}</MenuItem>;
      }));
      if (inputValue) {
        const notFindInputItem = sel.every((option)=> {
          return getValuePropValue(option) !== inputValue;
        });
        if (notFindInputItem) {
          sel.unshift(<MenuItem value={inputValue} key={inputValue}>{inputValue}</MenuItem>);
        }
      }
    }
    if (!sel.length && showNotFound && props.notFoundContent) {
      sel = [<MenuItem disabled value="NOT_FOUND" key="NOT_FOUND">{props.notFoundContent}</MenuItem>];
    }
    return sel;
  },
};
