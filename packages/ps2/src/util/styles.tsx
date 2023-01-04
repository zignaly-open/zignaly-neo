export const withAttrs = (Component, attrs) => (props) =>
  <Component {...attrs} {...props} />;
