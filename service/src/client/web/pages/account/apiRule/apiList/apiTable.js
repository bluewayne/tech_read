/**
 * Created by liujinhe on 17/2/10.
 */

import React from 'react';
import {Link} from 'react-router';
import { Table, Input, Popconfirm,message } from 'antd';
import EditableCell from '../../../../components/EditableCell.js'

import {api} from '../../../../util'

class EditableTable extends React.Component {//不能用PureComponent
    constructor(props) {
        super(props);

        this.updateRule = this.updateRule.bind(this);
        this.conRow2Rule = this.conRow2Rule.bind(this);

        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '30%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
            },
            {
                title: 'ruleList',
                dataIndex: 'ruleList',
                width: '30%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'ruleList', text),
            },{
                title: 'apiUrl',
                dataIndex: 'apiUrl',
                width: '30%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'apiUrl', text),
            }, {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    const { editable } = this.state.data[index].name;

                    console.log('editable   :'+editable);
                    return (<div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.editDone(index, 'save')}>Save</a>
                                    <Popconfirm title="Sure to cancel?"
                                                onConfirm={() => this.editDone(index, 'cancel')}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                                :
                                <span><a onClick={() => this.edit(index)}>Edit</a></span>
                        }
                    </div>);
                },
            }];
        this.state = {
            data: []
        }


        console.log('hellow');


    }

    componentWillReceiveProps(nextProps) {
        //console.log('come to componentWillReceiveProps');

        this.setState({
            data: nextProps.ds
        })

        console.log('nextProps.ds   :' + JSON.stringify(nextProps.ds));
        //this.setState({
        //    likesIncreasing: 'dd'
        //});
    }

    updateRule(rule, callback) {
        //console.log('updateRule rule :'+JSON.stringify(rule));

        //console.log('api    :'+JSON.stringify(api))

        api.updateRule(rule, function (res) {
            message.success('update rule success');
            callback();
        })


    }

    renderColumns(data, index, key, text) {


        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
            editable={editable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
            />);
    }

    handleChange(key, index, value) {
        //console.log('key  :' + key);
        //console.log('index  :' + index);
        //
        //console.log('value  :' + value);

        const { data } = this.state;
        data[index][key].value = value;
        this.setState({data});
    }

    edit(index) {
        const { data } = this.state;
        console.log('come to edit');
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {

                data[index][item].editable = true;
            }
        });
        this.setState({data});
    }

    conRow2Rule(row) {
        delete row.key;

        //console.log('conRow2Rule')
        for (let index in row) {
            row[index] = row[index]['value']
        }

        return row;

    }

    editDone(index, type) {
        const { data } = this.state;


        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });


        this.setState({data}, ()=> {

            //console.log('this.setState callback');
            //console.log({...data[index]})
            //console.log('this.setState after callback');

            this.updateRule(this.conRow2Rule({...data[index]}), () => {//setState的第二个参数是回调函数，是在组件渲染成功后触发的。这里的status有连个值cancel和save,table根据这个status选择是否用新的值替换旧的值


                Object.keys(data[index]).forEach((item) => {
                    if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                        delete data[index][item].status;
                    }
                });
            })

        })

    }

    render() {
        const { data } = this.state;


        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return <Table bordered dataSource={dataSource} columns={columns}/>;
    }
}

export default EditableTable;