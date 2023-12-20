import React, { ComponentClass, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorStub from './components/ErorStub';

export const withRouter = function <T>(
  C: ComponentClass<T> | FunctionComponent<T>,
) {
  return (props: T) => {
    const history = useNavigate();
    return <C history={history} {...props} />;
  };
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ZigErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error }
> {
  state = {
    error: undefined as Error,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error) {
      return <ErrorStub />;
    }
    return this.props.children;
  }
}

export default withRouter(ZigErrorBoundary);
