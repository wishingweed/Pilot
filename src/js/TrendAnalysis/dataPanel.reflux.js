'use strict';

(function (Reflux, $, global) {

  global.dataPanelItemChangeActions = Reflux.createActions(['dataPanelItemAddAction', 'dataPanelRCAAddItemAction', 'dataPanelAddPageAction', 'dataPanelRemovePageAction']);

  global.dataPanelDataStore = Reflux.createStore({
    listenables: [global.dataPanelItemChangeActions],
    dataPanelData: [{
      pageStatus: "INIT",
      content: []
    }],
    onDataPanelItemAddAction: function onDataPanelItemAddAction(pageStatus, data) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (pageStatus === item.pageStatus) {
          item.content = data;
          that.trigger(item.content);
          return false;
        }
      });
    },
    onDataPanelAddPageAction: function onDataPanelAddPageAction(pageStatus) {
      this.dataPanelData.push({
        pageStatus: pageStatus,
        content: [{
          title: "Performance",
          objList: []
        }, {
          title: "Service",
          objList: []
        }, {
          title: "Business",
          objList: []
        }, {
          title: "Resource",
          objList: []
        }]
      });
    },
    onDataPanelRemovePageAction: function onDataPanelRemovePageAction(pageStatus) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          that.dataPanelData.splice(idx, 1);
          return false;
        }
      });
    },
    onDataPanelRCAAddItemAction: function onDataPanelRCAAddItemAction(pageStatus, cardGuid) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (pageStatus === item.pageStatus) {
          var len = 0;
          $.each(item.content, function (idx1, item1) {
            len += item1.objList.length;
          });
          if (!len) {
            var url = "http://10.97.144.117:8000/SmartOperations/services/calcRate.xsjs?factorId=" + cardGuid;
            $.ajax({
              url: url,
              method: 'get',
              dataType: 'json',
              headers: {
                //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'DataServiceVersion': '2.0',
                'X-CSRF-Token': 'Fetch'
              }
            }).done(function (resp) {
              resp.results.forEach(function (d) {
                if (d.FACTOR_CATEGORY === "B") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Business") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                } else if (d.FACTOR_CATEGORY === "S") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Service") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                } else if (d.FACTOR_CATEGORY === "R") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Resource") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                }
              });
              that.trigger(item.content);
            }).fail(function () {
              console.error('Data panel fetch error:');
              console.error(arguments);
            });
          } else {
            return false;
          }
        }
      });
    },
    getData: function getData(pageStatus) {
      if (pageStatus) {
        var that = this;
        var tmpData = [];
        $.each(this.dataPanelData, function (idx, item) {
          if (pageStatus === item.pageStatus) {
            if (item.content.length === 0) {

              that.getDataPanelData(pageStatus);
            } else {
              tmpData = item.content;
            }
            return false;
          }
        });

        return tmpData;
      } else {
        return this.dataPanelData;
      }
    },
    getSpeData: function getSpeData(pageStatus, text) {
      var tmpData = [];
      $.each(this.dataPanelData, function (idx, item) {
        if (pageStatus === item.pageStatus) {
          $.each(item.content, function (idx1, item1) {
            if (text === item1.title) {
              tmpData = item1;
            }
          });
          return false;
        }
      });
      return tmpData;
    },
    getDataPanelData: function getDataPanelData(pageStatus) {

      switch (pageStatus) {
        case "INIT":
          this.getInitPageData(pageStatus);
          break;
        case "ANALYSIS":
          this.getAnalysisPageData(pageStatus);
          break;
        default:
          ;
      }
    },
    getInitPageData: function getInitPageData(pageStatus) {
      var ajaxData = [];
      var that = this;
      var ajaxTotal = 0;
      var ajaxCount = 0;
      var urls = {
        bUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27B%27%20and%20FACTOR_TYPE%20eq%20%27TBL%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5',
        sUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27S%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5',
        rUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27R%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5'
      };

      var _loop = function _loop(url) {
        ajaxTotal++;
        $.ajax({
          url: urls[url],
          method: 'get',
          dataType: 'json',
          headers: {
            //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'DataServiceVersion': '2.0',
            'X-CSRF-Token': 'Fetch'
          }
        }).done(function (data) {
          ajaxCount++;

          var title = '';
          var index = void 0;
          switch (url) {
            case 'bUrl':
              title = 'Business';
              index = 0;
              break;
            case 'sUrl':
              title = 'Service';
              index = 1;
              break;
            case 'rUrl':
              title = 'Resource';
              index = 2;
              break;
            default:
              ;
          }
          ajaxData.splice(index, 0, {
            title: title,
            objList: data.d.results
          });

          if (ajaxCount == ajaxTotal) {
            dataPanelItemChangeActions.dataPanelItemAddAction(pageStatus, ajaxData);
          }
        }).fail(function () {
          console.error('Data panel fetch error:');
          console.error(arguments);
        });
      };

      for (var url in urls) {
        _loop(url);
      }
    },
    getAnalysisPageData: function getAnalysisPageData(pageStatus) {},
    isStatusExisted: function isStatusExisted(pageStatus) {
      var flag = 0;
      $.each(this.dataPanelData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    },
    isSubItemExisted: function isSubItemExisted(pageStatus) {
      var flag = 0;
      $.each(this.dataPanelData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          $.each(item.content, function (idx1, item1) {
            if (item1.objList.length) {
              flag = 1;
              return false;
            }
          });
          return false;
        }
      });
      return !!flag;
    },
    getObjList: function getObjList(pageStatus) {
      var objList = [];
      $.each(this.dataPanelData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          $.each(item.content, function (idx1, item1) {
            objList = objList.concat(item1.objList);
          });
          return false;
        }
      });
      return objList;
    }

  });
})(window.Reflux, window.jQuery, window);