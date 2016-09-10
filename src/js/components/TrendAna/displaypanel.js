import React from "react"
import DataCard from "./DataCard";
import LineChartCard from "./LineChartCard";
import PieChartCard from "./PieChartCard";
import CreateObjCard from "./CreateObjCard";
import UploadCard from "./uploadCard";
import { History,Router,browserHistory } from "react-router";

var interact = window.interact;
var displayAreaDataStore = window.displayAreaDataStore
var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var global = window

var rc = window.rc;/*
(function (React, rc, antd, interact, displayAreaDataStore, displayAreaChangeActions, pageStatusDataStore, global) {*/

if (!rc) {
    rc = window.rc = {};
  }

  var getState = function getState() {
    var that = this;
    return {
      cards: displayAreaDataStore.getData(that.props.currentStatus)
    };
  };

  var DisplayPanel = React.createClass({
    displayName: 'DisplayPanel',

    getInitialState: function getInitialState() {
      return {
        cards: displayAreaDataStore.getData("INIT")
      };
    },

    onChange: function onChange(data) {
      this.setState({
        cards: data
      });
    },

    onStatusChange: function onStatusChange(data) {
      this.setState({
        cards: displayAreaDataStore.getData(data.currentStatus)
      });
    },

    componentDidUpdate: function componentDidUpdate() {
      if (!this.state.cards.length) {
        this.getDOMNode().classList.add('help-bg');
      } else {
        this.getDOMNode().classList.remove('help-bg');
      }
    },

    componentDidMount: function componentDidMount() {
      var that = this;
      this.interactable = global.setAreaDropable({
        element: this.getDOMNode(),
        accept: '.data-item, .data-block, .tile, .config-create-button, .function-button-nav, .config-upload-button',
        ondrop: function ondrop(event) {
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;
          var data = {};
          data.style = {};
          data.style.left = event.dragEvent.clientX + window.scrollX;
          data.style.top = event.dragEvent.clientY + window.scrollY;
          data.type = draggableElement.getAttribute('data-type');
          console.log(data.type);
          switch (data.type) {
            case 'TITLE':
              data.title = draggableElement.getAttribute('data-category');
              break;
            case 'ITEM':
              data.guidArr = new Array(draggableElement.getAttribute('data-factor_guid'));
              data.FACTOR_NAME = new Array(draggableElement.getAttribute('data-factor_name'));
              data.category = new Array(draggableElement.getAttribute('data-category'));
              break;
            case 'CREATE':

              data.title = 'Create New Object';
              data.editObj = 0;
              break;

            case 'NOTE':
              browserHistory.push("/km")
              break;
            case 'UPLOAD':
              data.title = 'Upload Statistics File';
      
              break;
            default:
              ;
          }
          displayAreaChangeActions.displayAreaAddCardAction(pageStatusDataStore.getCurrentStatus(), data);
        }
      });
      this.unsubscribe = displayAreaDataStore.listen(this.onChange);
      this.unsubscribeStatus = pageStatusDataStore.listen(this.onStatusChange);
    },

    // shouldComponentUpdate: function(nextProps, nextState) {
    //   if (this.state !== nextState) {
    //     return true;
    //   }
    // },

    componentWillUnmount: function componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      this.unsubscribe();
      this.unsubscribeStatus();
    },

    // componentWillUpdate: function() {
    //   this.setState(getState());
    // },

    render: function render() {
      return React.createElement(
        'div',
        { className: 'display-panel help-bg' },
        this.state.cards.map(function (item) {
          if (item.type == 'TITLE') {
            return React.createElement(DataCard, { key: item.id + "DataCard", card: item });
          } else if (item.type == 'ITEM' || item.type == 'WHAT_IF') {
            console.log("LineChart")
            return React.createElement(LineChartCard, { key: item.id + "LineChartCard", card: item });
          } else if (item.type == 'PIE') {
            return React.createElement(PieChartCard, { key: item.id + "PIEChartCard", card: item });
          } else if (item.type == 'CREATE') {

            return React.createElement(CreateObjCard, { key: item.id + "CreateObjCard", card: item });
          } else if (item.type == 'EDIT') {

            return React.createElement(CreateObjCard, { key: item.id + "EditObjCard", card: item });
          }
          else if(item.type == 'UPLOAD'){
            return React.createElement(UploadCard, { key: item.id + "UploadCard", card: item });
          }
        })
      );
    }
  });/*
})(window.React, window.rc, window.antd, window.interact, window.displayAreaDataStore, window.displayAreaChangeActions, window.pageStatusDataStore, window);*/



export default DisplayPanel