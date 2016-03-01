if (typeof Antd === 'undefined') {
  Antd = {}
}

const {Switch} = Rc

Antd.Switch = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-switch',
    };
  },
  render() {
    const { prefixCls, size, className } = this.props;
    const cls = classNames({
      [className]: !!className,
      [`${prefixCls}-small`]: size === 'small',
    });
    return <Switch className={cls} {...this.props} />;
  }
});
