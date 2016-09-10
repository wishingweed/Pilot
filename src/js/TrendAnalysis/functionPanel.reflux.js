'use strict';

(function (Reflux, $, global) {

  global.functionPanelItemChangeActions = Reflux.createActions(['functionPanelAddPageAction', 'functionPanelRemovePageAction']);

  global.functionPanelDataStore = Reflux.createStore({
    listenables: [global.functionPanelItemChangeActions],
    functionPanelData: [{
      pageStatus: "INIT",
      content: [{
        name: 'Analysis',
        info: 'ANALYSIS',
        type: 'ANALYSIS'
      }, {
        name: 'Knowledge',
        info: 'NOTE',
        type: 'NOTE'
      }]
    }],
    onFunctionPanelAddPageAction: function onFunctionPanelAddPageAction(pageStatus) {
      this.functionPanelData.push({
        pageStatus: pageStatus,
        content: [{
          name: "Root-Cause",
          info: "RCA",
          type: "RCA"
        }, {
          name: "Simulate",
          info: "WHAT_IF",
          type: "WHAT_IF"
        }]
      });
    },
    onFunctionPanelRemovePageAction: function onFunctionPanelRemovePageAction(pageStatus) {
      var that = this;
      $.each(this.functionPanelData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          that.functionPanelData.splice(idx, 1);
          return false;
        }
      });
    },
    getData: function getData(pageStatus) {
      if (pageStatus) {
        var tmpData = [];
        $.each(this.functionPanelData, function (idx, item) {
          if (pageStatus === item.pageStatus) {
            tmpData = item.content;
            return false;
          }
        });

        return tmpData;
      } else {
        return this.functionPanelData;
      }
    },
    isStatusExisted: function isStatusExisted(pageStatus) {
      var flag = 0;
      $.each(this.functionPanelData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    }

  });
})(window.Reflux, window.jQuery, window);