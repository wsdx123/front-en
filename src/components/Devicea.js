import React, { Component } from 'react';
import { Select,Table } from 'antd';
import axios from 'axios';
import './components.css';

const { Option } = Select;

const datagram = [];

const columns = [
    {
        title: '장치명',
        dataIndex: 'dname',
        key: 'dname'
    },
    {
        title: 'mac주소',
        dataIndex: 'mac',
        key: 'mac'
    },
    {
        title: '우선순위',
        dataIndex: 'dpri',
        key: 'dpri'
    }
];


class Devicea extends Component {

    constructor(props){
        super(props);
    }

    /*getapi(){
        axios.get("https://192.168.0.137:8000/groups?zone_id=5b3a3583adcd134a7e36b35a",{
            headers: {
                'access-token': localStorage.token,
                'user_id': localStorage.onlogin
            }
        }).then((response) => {
            console.log(response.data);
        });
    };*/



    render() {
        //this.getapi();
        return (
            <div>
                <h2>zzz</h2>
                <span>지역</span>
                <Select className='dropbox' defaultValue="nx" placeholder="전체">
                    <Option value='nx'>(주)엔엑스 테크놀로지</Option>
                    <Option value='test2'>test2</Option>
                </Select>
                <span>허브</span>
                <Select className='dropbox'  placeholder="전체">
                    <Option value='test1'>test1</Option>
                    <Option value='test2'>test2</Option>
                </Select>
                <span>그룹</span>
                <Select showSearch className='dropbox'  placeholder="전체">
                    <Option value='test1'>test1</Option>
                    <Option value='test2'>test2</Option>
                    <Option value='abc'>아아아</Option>
                    <Option value='test4'>나나나</Option>
                </Select>
                <span>장치</span>
                <Select className='dropbox'  placeholder="전체">
                    <Option value='test1'>test1</Option>
                    <Option value='test2'>test2</Option>
                </Select>
                <span>우선순위</span>
                <Select className='pdropbox'  placeholder="전체">
                    <Option value='test1'>test1</Option>
                    <Option value='test2'>test2</Option>
                </Select>
                <Table dataSource={datagram} columns={columns} />
            </div>
        );
    }
}

export default Devicea;