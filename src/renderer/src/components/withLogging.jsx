import React from 'react';

// HOC that logs props with a custom title
const withLogging = (Component, logHeading) => {
    const WrappedComponent = props => {
        // Log the props or any specific data you want
        console.log(`${logHeading}:`, props);

        // Render the wrapped component with the given props
        return <Component {...props} />;
    };

    WrappedComponent.displayName = `WithLogging(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withLogging;
