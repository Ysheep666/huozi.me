if (typeof Antd === 'undefined') {
  Antd = {}
}

const objectAssign = assign
const {Modal, Icon, Button} = Antd

ModalConfirm = function (config) {
  const props = objectAssign({}, config || {});
  let div = document.createElement('div');
  document.body.appendChild(div);

  let d;
  props.iconClassName = props.iconClassName || 'question-circle';

  let iconClassType = props.iconClassName;

  let width = props.width || 416;

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  props.okText = props.okText || (props.okCancel ? '确定' : '知道了');
  props.cancelText = props.cancelText || '取消';

  function close() {
    d.setState({
      visible: false
    });
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  }

  function onCancel() {
    let cancelFn = props.onCancel;
    if (cancelFn) {
      let ret;
      if (cancelFn.length) {
        ret = cancelFn(close);
      } else {
        ret = cancelFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  function onOk() {
    let okFn = props.onOk;
    if (okFn) {
      let ret;
      if (okFn.length) {
        ret = okFn(close);
      } else {
        ret = okFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  let body = (
    <div className="ant-confirm-body">
      <Icon type={iconClassType} />
      <span className="ant-confirm-title">{props.title}</span>
      <div className="ant-confirm-content">{props.content}</div>
    </div>
  );

  let footer = null;
  if (props.okCancel) {
    footer = (
      <div className="ant-confirm-btns">
        <Button type="ghost" size="large" onClick={onCancel}>
          {props.cancelText}
        </Button>
        <Button type="primary" size="large" onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    );
  } else {
    footer = (
      <div className="ant-confirm-btns">
        <Button type="primary" size="large" onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    );
  }

  ReactDOM.render(<Modal
    prefixCls="ant-modal"
    className="ant-confirm"
    visible
    closable={false}
    title=""
    transitionName={props.transitionName || 'zoom'}
    footer=""
    maskTransitionName="fade" width={width}>
    <div style={{ zoom: 1, overflow: 'hidden' }}>{body} {footer}</div>
  </Modal>, div, function () {
    d = this;
  });
}
