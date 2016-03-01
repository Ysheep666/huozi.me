const AntRadio = Antd.Radio

const RadioButton = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio-button',
    };
  },
  render() {
    return (
      <AntRadio {...this.props} />
    );
  }
});

Antd.Radio.Button = RadioButton
