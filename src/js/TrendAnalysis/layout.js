"use strict";

(function (React, ReactDOM, rc, antd, pageStatusDataStore, global) {
  if (!rc) {
    rc = window.rc = {};
  }

  var getState = function getState() {
    return {
      currentStatus: pageStatusDataStore.getCurrentStatus()
    };
  };

  rc.Layout = React.createClass({
    displayName: "Layout",

    render: function render() {
      return React.createElement(
        "div",
        { id: "wrapper" },
        React.createElement(rc.DataPanel, null),
        React.createElement(rc.DisplayPanel, null),
        React.createElement(rc.FunctionPanel, null)
      );
    }
  });

  ReactDOM.render(React.createElement(rc.Layout, null), document.getElementById('content'));
})(window.React, window.ReactDOM, window.rc, window.antd, window.pageStatusDataStore, window);