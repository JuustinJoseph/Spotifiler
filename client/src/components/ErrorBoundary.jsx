import React from "react";
import ErrorScreen from "./ErrorScreen";

// Catches render crashes (e.g. unexpected data shapes) instead of a blank page.
class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Render error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorScreen
          error={{
            status: null,
            title: "Something went wrong",
            message: "The page crashed while displaying your data.",
            detail: this.state.error.message,
          }}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
