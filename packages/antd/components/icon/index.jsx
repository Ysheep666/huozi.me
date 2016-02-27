if (typeof Antd === 'undefined') {
  Antd = {}
}

Antd.Icon = props => {
  let { type, className = '', ...other } = props;
  className += ` anticon anticon-${type}`;
  return <i className={className} {...other} />;
};
