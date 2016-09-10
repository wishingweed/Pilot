import React from "react"

import { Slider , Modal, message,Card,Icon	} from "antd"
import LineChart from  "./LineChart"
import PredictLineChart from "./PredictLineChart"
var global =window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore
	var componentMixin = {
		removeCard: function removeCard() {
			var that = this;
			return function () {
				// if (that.interactable) {
				//   that.interactable.unset();
				//   that.interactable = null;
				// }
				// if (that.interactDrag) {
				//   that.interactDrag.unset();
				//   that.interactDrag = null;
				// }
				// if (that.interactDrop) {
				//   that.interactDrop.unset();
				//   that.interactDrop = null;
				// }
				var currentStatus = pageStatusDataStore.getCurrentStatus();

				if (currentStatus === "INIT" || this.props.card.type !== "ITEM" || currentStatus.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.');
				}
			};
		}
	};

	var LineChartCard = React.createClass({
		displayName: "LineChartCard",

		mixins: [componentMixin],
		getInitialState: function getInitialState() {
			return {
				rangeMin: this.props.card.lineChartAxis[0].length - 30,
				rangeMax: this.props.card.lineChartAxis[0].length,
				rangeLimit: this.props.card.lineChartAxis[0].length
			};
		},
		onChange: function onChange(value) {
			this.setState({
				rangeMin: value[0],
				rangeMax: value[1]
			});
		},
		//var confirm = Modal.confirm;
		showConfirmEdit: function showConfirmEdit(text) {
			var that = this;
			Modal.confirm({
				title: 'Edit Object',
				content: 'coming soon ...',
				onOk: function onOk() {

					that.removeCard().bind(that);
				},
				onCancel: function onCancel() {},
				okText: 'OK',
				cancelText: 'Cancel'
			});
		},
		showConfirmMark: function showConfirmMark(guid, text) {
			var that = this;
			Modal.confirm({
				title: 'Pin to Data Area',
				content: 'Please confirm to pin [' + text + '] to left Data Area',
				onOk: function onOk() {
					if (displayAreaDataStore.pinObject(guid, '1')) {
						message.success('Object Successfully Pinned to Data Area', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
					} else {
						message.error('Failed to Pin Object', 3.5);
					}
				},
				onCancel: function onCancel() {
					if (displayAreaDataStore.pinObject(guid, '0')) {
						message.success('Object Successfully Un-Pinned From Data Area', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
					} else {
						message.error('Failed to Un-Pin Object', 3.5);
					}
				},
				okText: 'Pin',
				cancelText: 'Un-Pin'
			});
		},
		showConfirmDelete: function showConfirmDelete(guid, text) {
			var that = this;
			Modal.confirm({
				title: 'Caution! Delete Object',
				content: 'Please confirm to delete object [' + text + ']',
				onOk: function onOk() {

					if (displayAreaDataStore.deleteObject(guid)) {
						message.success('Object Successfully Deleted', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
						//that.removeCard();
						displayAreaChangeActions.displayAreaRemoveCardAction(pageStatusDataStore.getCurrentStatus(), that.props.card.id);
					} else {
						message.error('Failed to Delete Object', 3.5);
					}
				},
				onCancel: function onCancel() {},
				okText: 'Delete',
				cancelText: 'Cancel'
			});
		},
		componentDidMount: function componentDidMount() {
			var that = this;

			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			this.interactDrop = global.setAreaDropable({
				element: this.getDOMNode(),
				accept: '.function-button, .data-item, .config-button',
				ondrop: function ondrop(event) {
					var draggableElement = event.relatedTarget,
					    dropzoneElement = event.target;
					var currentStatus = pageStatusDataStore.getCurrentStatus();
					var cardId = that.props.card.id;
					var data = {};

					data.info = draggableElement.getAttribute('data-info');

					switch (data.info) {
						case "ANALYSIS":
							console.log('case ANALYSIS');
							var factorName = that.props.card.FACTOR_NAME[0];
							var nextStatus = "ANALYSIS " + factorName;
							if (pageStatusDataStore.getAllStatus().indexOf(nextStatus) < 0) {
								var sIntervalCallId;

								(function () {
									var addStatus = function addStatus() {
										if (displayAreaDataStore.isStatusExisted(nextStatus) && dataPanelDataStore.isStatusExisted(nextStatus) && functionPanelDataStore.isStatusExisted(nextStatus)) {
											clearInterval(sIntervalCallId);
											pageStatusChangeActions.pageStatusAddAction(nextStatus);
										}
									};

									displayAreaChangeActions.displayAreaAddPageAction(nextStatus, cardId);
									dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
									functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);

									sIntervalCallId = setInterval(function () {
										addStatus();
									}, 100);
									;
								})();
							} else {
								pageStatusChangeActions.pageStatusChangeAction(nextStatus);
							}

							break;
						case "RCA":
							console.log('case RCA');
							if (!dataPanelDataStore.isSubItemExisted(currentStatus)) {
								var cardGuid;
								var sIntervalCallId;

								(function () {
									var addPieCard = function addPieCard() {
										if (dataPanelDataStore.isSubItemExisted(currentStatus)) {
											clearInterval(sIntervalCallId);
											var oData = {
												type: "PIE",
												style: style,
												objList: dataPanelDataStore.getObjList(currentStatus)
											};
											displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
										}
									};

									var style = {
										top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
										left: 240
									};
									cardGuid = that.props.card.guidArr[0];

									dataPanelItemChangeActions.dataPanelRCAAddItemAction(currentStatus, cardGuid);

									sIntervalCallId = setInterval(function () {
										addPieCard();
									}, 200);
								})();
							} else if (!displayAreaDataStore.isCardExisted(currentStatus, "PIE")) {
								var _style = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: 240
								};
								var oData = {
									type: "PIE",
									style: _style,
									objList: dataPanelDataStore.getObjList(currentStatus)
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case "WHAT_IF":
							console.log('case WHAT_IF');
							if (!displayAreaDataStore.isCardExisted(currentStatus, "WHAT_IF") && displayAreaDataStore.getCardLineNumber(currentStatus, cardId) > 1) {
								var _style2 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: that.getDOMNode().clientWidth + 240 + 30
								};
								var guidArr = that.props.card.guidArr;
								var oData = {
									FACTOR_NAME: that.props.card.FACTOR_NAME,
									type: "WHAT_IF",
									style: _style2,
									factorGuid: guidArr[0],
									factorGuidStr: guidArr.slice(1).join(","),
									category: that.props.card.category[0]
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case currentStatus + "-ITEM":
							console.log('case ' + currentStatus + '-ITEM');
							if (currentStatus != "INIT" && that.props.card.type != "WHAT_IF") {

								data.guid = draggableElement.getAttribute('data-factor_guid');
								data.FACTOR_NAME_S = draggableElement.getAttribute('data-factor_name');
								data.category = draggableElement.getAttribute('data-category');
								displayAreaChangeActions.displayAreaChangeCardAction(currentStatus, data, cardId);
							}
							break;
						// case "INIT-ITEM":
						//   data.guid = draggableElement.getAttribute('data-factor_guid');
						//   data.FACTOR_NAME_S = draggableElement.getAttribute('data-factor_name');
						//   displayAreaChangeActions.displayAreaChangeCardAction(currentStatus, data, cardId);
						//   break;

						case "NOTE":
							console.log('NOTE');

							break;

						case "DELETE":
							console.log('DELETE');

							that.showConfirmDelete(that.props.card.guidArr, that.props.card.FACTOR_NAME);

							break;

						case "EDIT":
							console.log('EDIT');
							//that.showConfirmEdit(that.props.card.FACTOR_NAME);
							if (!displayAreaDataStore.isCardExisted(currentStatus, "EDIT")) {

								var _style3 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: 240
								};
								var oData = {
									type: "EDIT",
									style: _style3,
									title: "Edit Object - " + that.props.card.FACTOR_NAME[0],
									editObj: that.props.card.guidArr[0]
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}
							break;

						case "MARK":
							console.log('MARK');
							that.showConfirmMark(that.props.card.guidArr, that.props.card.FACTOR_NAME);

							break;
						default:
							;
					}
				}
			});
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		render: function render() {
			var title = "",
			    lineNameArr = [];
			if (this.props.card.type === "ITEM") {
				lineNameArr = this.props.card.FACTOR_NAME[0];
				title = "Trend Analysis " + lineNameArr;
			} else if (this.props.card.type === "WHAT_IF") {
				lineNameArr = this.props.card.lineNameArr;
				title = "Predict Analysis " + this.props.card.FACTOR_NAME[0];
			}

			////////////////
			if (this.props.card.type === "ITEM") {
				var arrLen = this.props.card.FACTOR_NAME.length;
				var subLineChart = [];

				for (var i = 0; i < arrLen; i++) {

					subLineChart[i] = React.createElement(LineChart, {
						chartAxisArr: this.props.card.lineChartAxis[i],
						chartValueArr: this.props.card.lineChartValue[i],
						lineNameArr: this.props.card.FACTOR_NAME[i],
						axisMin: this.state.rangeMin,
						axisMax: this.state.rangeMax,
						factorCate: this.props.card.category[i],
						showLabel: i === 0 ? true : false

					});
				}
			} else if (this.props.card.type === "WHAT_IF") {
				var subLineChart = React.createElement(PredictLineChart, { chartAxisArr: this.props.card.lineChartAxis,
					chartValueArr: this.props.card.lineChartValue,
					lineNameArr: lineNameArr,
					axisMin: this.state.rangeMin,
					axisMax: this.state.rangeMax,
					factorCate: this.props.card.category[0]
				});
			}

			////////////////

			return React.createElement(
				Card,
				{ className: "line-card",
					title: title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }),
					bodyStyle: {
						padding: 0
					} },
				subLineChart,
				React.createElement(Slider, { min: 1, max: this.state.rangeLimit, range: true, defaultValue: [this.state.rangeMin, this.state.rangeMax], onChange: this.onChange.bind(this) })
			);
		}
	});

export default LineChartCard;