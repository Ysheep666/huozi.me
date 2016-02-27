const {Dropdown} = Rc

AntdDropdown =  React.createClass({
  getDefaultProps() {
    return {
      transitionName: 'slide-up',
      prefixCls: 'ant-dropdown',
    };
  },
  render() {
    const { overlay, ...otherProps } = this.props;
    const menu = React.cloneElement(overlay, {
      openTransitionName: 'zoom-big',
    });
    return (
      <Dropdown {...otherProps} overlay={menu} />
    );
  }
});
