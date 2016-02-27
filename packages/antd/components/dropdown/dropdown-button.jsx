const {Button, Icon} = Antd
const Dropdown = AntdDropdown
const ButtonGroup = Button.Group

const align = {
  points: ['tr', 'br'],
  overlay: {
    adjustX: 1,
    adjustY: 1,
  },
  offset: [0, 3],
  targetOffset: [0, 0],
};

AntdDropdownButton = React.createClass({
  getDefaultProps() {
    return {
      align,
      type: 'default',
    };
  },
  render() {
    return (
      <ButtonGroup className="ant-dropdown-button">
        <Button type={this.props.type}>
          {this.props.children}
        </Button>
        <Dropdown {...this.props}>
          <Button type={this.props.type}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
});
