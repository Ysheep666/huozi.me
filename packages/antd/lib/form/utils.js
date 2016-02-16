
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
}

function argumentContainer(Container, WrappedComponent) {
  Container.displayName = `Form(${getDisplayName(WrappedComponent)})`;
  Container.WrappedComponent = WrappedComponent;
  return hoistStatics(Container, WrappedComponent);
}

function getValueFromEvent(e) {
  // support custom element
  if (!e || !e.target) {
    return e;
  }
  const {target} = e;
  return target.type === 'checkbox' ? target.checked : target.value;
}

function getErrorStrs(errors) {
  if (errors) {
    return errors.map((e) => {
      if ('message' in e) {
        return e.message;
      }
      return e;
    });
  }
  return errors;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}

function mirror(obj) {
  return obj;
}

RcFormUtils = {
  argumentContainer: argumentContainer,
  mirror: mirror,
  getValueFromEvent: getValueFromEvent,
  getErrorStrs: getErrorStrs,
  isEmptyObject: isEmptyObject,
  flattenArray: flattenArray
}
