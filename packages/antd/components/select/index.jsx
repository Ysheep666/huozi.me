if (typeof Antd === 'undefined') {
  Antd = {}
}

const {Option, OptGroup} = Select
const AntSelect = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-select',
      transitionName: 'slide-up',
      optionLabelProp: 'children',
      choiceTransitionName: 'zoom',
      showSearch: false,
    };
  },
  render() {
    let {
      size, className, combobox, notFoundContent
    } = this.props;

    const cls = classNames({
      'ant-select-lg': size === 'large',
      'ant-select-sm': size === 'small',
      [className]: !!className,
    });

    if (combobox) {
      notFoundContent = null;
    }
    return (
      <Select {...this.props}
        className={cls}
        notFoundContent={notFoundContent} />
    );
  }
});

AntSelect.Option = Option;
AntSelect.OptGroup = OptGroup;

Antd.Select = AntSelect;
