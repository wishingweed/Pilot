import React from "react"

import {Card,message,Button,Cascader,Icon,Table,Upload,Row,Col} from "antd"
var global = window

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



var UploadCard = React.createClass({
		displayName: "UploadCard",

		mixins: [componentMixin],

		getInitialState: function getInitialState() {
			return {
				echoData: false,
				tableHeader: [],
				tableData: [],
				isDisabled: false,
				kmType: []
			};
		},

		componentDidMount: function componentDidMount() {
			
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {

			global.resetPosition(this.getDOMNode());
		},
		onConfirm: function onConfirm() {

			if (displayAreaDataStore.uploadConfirm(this.state.tableData)) {
				message.success('Local file uploaded to HANA successfully.', 3.5);
			} else {
				message.error('Upload failed.', 3.5);
			}
		},
		onReset: function onReset() {
			this.setState({
				echoData: false,
				tableHeader: [],
				tableData: [],
				isEnabled: false,
				kmType: []
			});
		},
		onChange: function onChange(value) {
			console.log(value);
			this.setState({
				kmType: value
			});
		},

		render: function render() {
			var that = this;

			var columns = [];
			var data = [];

			var jsonKey = [];

			var areaData = [{
				value: 'DVM',
				label: 'Data Volume Management',
				children: [{
					value: 'KMHDR',
					label: 'Article Header'
				}, {
					value: 'KMBSC',
					label: 'Basic Info'
				}, {
					value: 'KMDVM',
					label: 'Data Strategy'
				}]
			}, {
				value: 'CPM',
				label: 'Capacity Management',
				disabled: true,
				children: [{
					value: 'KMHDR',
					label: 'Article Header'
				}, {
					value: 'KMBSC',
					label: 'Basic Info'
				}, {
					value: 'KMDVM',
					label: 'Data Strategy'
				}]
			}, {
				value: 'BPI',
				label: 'Business Process Improvement',
				disabled: true,
				children: [{
					value: 'KMHDR',
					label: 'Article Header'
				}, {
					value: 'KMBSC',
					label: 'Basic Info'
				}, {
					value: 'KMDVM',
					label: 'Data Strategy'
				}]
			}];

			var props = {
				name: 'file',
				accept: '.csv',

				action: 'http://10.97.144.117:8000/SmartOperations/services/testUpload.xsjs',
				headers: {
					authorization: 'Basic ' + btoa('ZENGHENG:Sap12345')
				},
				beforeUpload: function beforeUpload(file) {
					var isCSV = file.type === 'application/vnd.ms-excel';
					if (!isCSV) {
						message.error('Only CSV File Supported', 3.5);
					}
					return isCSV;
				},
				onChange: function onChange(info) {
					if (info.file.status !== 'uploading') {
						console.log(info.file, info.fileList);
					}
					if (info.file.status === 'done') {
						message.success(info.file.name + ' read succeeded.', 3.5);
						for (var i = 0; i < info.fileList[0].response.fileHeader.length; i++) {
							var headerItem = {
								title: info.fileList[0].response.fileHeader[i],
								dataIndex: 'column_' + i.toString()
							};
							jsonKey[i] = 'column_' + i.toString();
							columns.push(headerItem);
						}

						for (var i = 0; i < info.fileList[0].response.fileData.length; i++) {
							/*var dataItem = {
        key: i.toString(),
        column_0: info.fileList[0].response.fileData[i][0],
        column_1: info.fileList[0].response.fileData[i][1],
        column_2: info.fileList[0].response.fileData[i][2]
       }*/
							var dataItem = {
								key: i.toString()
							};
							for (var j = 0; j < jsonKey.length; j++) {
								dataItem[jsonKey[j]] = info.fileList[0].response.fileData[i][j];
							}

							data.push(dataItem);
						}

						that.setState({
							echoData: true,
							tableHeader: columns,
							tableData: data,
							isEnabled: true
						});
					} else if (info.file.status === 'error') {
						message.error(info.file.name + ' upload failed.', 3.5);
					}
				}
			};

			var displayTable;
			switch (this.state.echoData) {
				case true:
					{
						displayTable = React.createElement(
							"div",
							{ style: { marginTop: 16, height: 300 } },
							React.createElement(Table, { columns: this.state.tableHeader, scroll: { y: 260 }, dataSource: this.state.tableData, size: "small", pagination: false })
						);
						break;
					}
				case false:
					{
						displayTable = React.createElement(
							"div",
							{ style: { marginTop: 16, height: 300 } },
							React.createElement(
								Upload.Dragger,
								props,
								React.createElement(
									"p",
									{ className: "ant-upload-drag-icon" },
									React.createElement(Icon, { type: "upload" })
								),
								React.createElement(
									"p",
									{ className: "ant-upload-text" },
									"CLICK or DRAG Local File to This Area to Upload"
								),
								React.createElement(
									"p",
									{ className: "ant-upload-hint" },
									"1. Upload and Review the Data"
								),
								React.createElement(
									"p",
									{ className: "ant-upload-hint" },
									"2. Click CONFIRM Button to Submit to DB"
								),
								React.createElement(
									"p",
									{ className: "ant-upload-hint" },
									"3. Single .CSV File Supported Only"
								)
							)
						);
						break;
					}

				default:
					;

			}

			var submitBtn;
			switch (this.state.echoData) {
				case true:
					{
						submitBtn = React.createElement(
							"div",
							null,
							React.createElement(
								Row,
								null,
								React.createElement(
									Col,
									{ span: 21 },
									React.createElement(Cascader, { className: "cascade-upload", options: areaData, disabled: true })
								),
								React.createElement(
									Col,
									{ span: 2 },
									React.createElement(Button, { type: "ghost", shape: "circle", icon: "reload", onClick: this.onReset })
								),
								React.createElement(
									Col,
									{ span: 1 },
									React.createElement(Button, { type: "primary", shape: "circle", icon: "caret-right", onClick: this.onConfirm })
								)
							)
						);
						break;
					}
				case false:
					{
						submitBtn = React.createElement(
							"div",
							null,
							React.createElement(
								Row,
								null,
								React.createElement(
									Col,
									{ span: 21 },
									React.createElement(Cascader, { className: "cascade-upload", options: areaData, value: this.state.kmType, placeholder: "Please Select a KM Type", onChange: this.onChange })
								),
								React.createElement(
									Col,
									{ span: 2 },
									React.createElement(Button, { type: "ghost", shape: "circle", icon: "reload", disabled: true })
								),
								React.createElement(
									Col,
									{ span: 1 },
									React.createElement(Button, { type: "primary", shape: "circle", icon: "caret-right", disabled: true })
								)
							)
						);
						break;
					}

				default:
					;
			}

			return React.createElement(
				Card,
				{ className: "upload-card",
					title: this.props.card.title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }) },
				submitBtn,
				displayTable
			);
		}
	});


 export default UploadCard;