if (typeof Antd === 'undefined') {
  Antd = {}
}

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
  };
  return createForm(options);
};

Form.Item = FormItem;
Form.ValueMixin = ValueMixin;
Form.Form = Form;
Form.Input = Antd.Input;

Antd.Form = Form;
