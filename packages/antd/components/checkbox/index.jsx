if (typeof Antd === 'undefined') {
  Antd = {}
}

const RcCheckbox = Rc.Checkbox

Antd.Checkbox = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-checkbox'
    };
  },
  render() {
    return <RcCheckbox {...this.props} />;
  }
});
