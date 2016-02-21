if (typeof Antd === 'undefined') {
  Antd = {}
}

const objectAssign = assign
const confirm = ModalConfirm

Antd.Modal.info = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'info-circle',
    okCancel: false,
  });
  return confirm(config);
};

Antd.Modal.success = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'check-circle',
    okCancel: false,
  });
  return confirm(config);
};

Antd.Modal.error = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'exclamation-circle',
    okCancel: false,
  });
  return confirm(config);
};

Antd.Modal.confirm = function (props) {
  const config = objectAssign({}, props, {
    okCancel: true,
  });
  return confirm(config);
};
