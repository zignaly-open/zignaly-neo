import React, { ComponentClass, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorStub from './components/ErorStub';

export const withRouter = function <T>(
  Component: ComponentClass<T> | FunctionComponent<T>,
) {
  return (props: T) => {
    const location = useLocation();
    return <Component href={location.pathname} {...props} />;
  };
};

interface ErrorBoundaryProps {
  href?: string;
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

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.props.href !== prevProps.href) {
      this.setState({ error: undefined });
    }
  }

  render() {
    if (this.state.error) {
      return <ErrorStub />;
    }
    return this.props.children;
  }
}

export default withRouter(ZigErrorBoundary);
