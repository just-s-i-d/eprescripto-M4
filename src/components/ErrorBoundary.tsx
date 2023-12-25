import { Button, Spin } from "antd";
import { Component, ReactNode, Suspense } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  refreshComponent?: VoidFunction;
  error?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: Error): void {
    console.trace(error); //eslint-disable-line
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError || this.props.error) {
      return (
        <div className="flex flex-col gap-1 justify-center items-center">
          <h2 className="text-lg font-bold">Something went wrong</h2>
          {this.props.refreshComponent && (
            <Button onClick={this.props.refreshComponent}>Try again</Button>
          )}
        </div>
      );
    }
    return <Suspense fallback={<Spin />}>{this.props.children}</Suspense>;
  }
}

export default ErrorBoundary;
