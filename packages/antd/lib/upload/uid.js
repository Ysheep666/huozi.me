const now = +(new Date());
let index = 0;

RcUploadUid = function uid() {
  return 'rc-upload-' + now + '-' + (++index);
}
