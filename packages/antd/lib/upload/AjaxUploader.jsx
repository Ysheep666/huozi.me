const request = RcUploadRequest
const uid = RcUploadUid
const {PropTypes} = React

const AjaxUploader = React.createClass({
  propTypes: {
    multiple: PropTypes.bool,
    onStart: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    headers: PropTypes.object,
    beforeUpload: PropTypes.func,
    withCredentials: PropTypes.bool,
  },

  onChange(e) {
    const files = e.target.files;
    this.uploadFiles(files);
  },

  onClick() {
    if (this.props.notAToClick) {
      return;
    }

    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },

  onFileDrop(e) {
    if (e.type === 'dragover') {
      return e.preventDefault();
    }

    const files = e.dataTransfer.files;
    this.uploadFiles(files);

    e.preventDefault();
  },

  uploadFiles(files) {
    const len = files.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        const file = files.item(i);
        file.uid = uid();
        this.upload(file);
      }
      if (this.props.multiple) {
        this.props.onStart(Array.prototype.slice.call(files));
      } else {
        this.props.onStart(Array.prototype.slice.call(files)[0]);
      }
    }
  },

  upload(file) {
    const props = this.props;
    if (!props.beforeUpload) {
      return this.post(file);
    }

    const before = props.beforeUpload(file);
    if (before && before.then) {
      before.then(() => {
        this.post(file);
      });
    } else if (before !== false) {
      this.post(file);
    }
  },

  post(file) {
    const props = this.props;
    let data = props.data;
    if (typeof data === 'function') {
      data = data(file);
    }

    request({
      action: props.action,
      filename: props.name,
      file: file,
      data: data,
      headers: props.headers,
      withCredentials: props.withCredentials,
      onProgress: e => {
        props.onProgress(e, file);
      },
      onSuccess: ret => {
        props.onSuccess(ret, file);
      },
      onError: (err, ret) => {
        props.onError(err, ret, file);
      },
    });
  },

  render() {
    const hidden = {display: 'none'};
    const props = this.props;
    return (
      <span
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onDrop={this.onFileDrop}
        onDragOver={this.onFileDrop}
        role="button"
        tabIndex="0"
        >
        <input type="file"
               ref="file"
               style={hidden}
               accept={props.accept}
               multiple={this.props.multiple}
               onChange={this.onChange}/>
        {props.children}
      </span>
    );
  },
});

RcUploadAjaxUploader = AjaxUploader;
