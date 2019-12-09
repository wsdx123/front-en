import React, { Component } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, message, Avatar } from 'antd';
import './Home.css';
import enbrix from './enbrix-logo-basic-white2.svg';
import usericon from './account_circle-24px.svg';
import { Reporta, Searcha, Region, Controla, Schedulem,
    Userm, Usinga, Devicea, DashBoard, LogManage, Setting,
    policyAdd, policyZone, policyGroup } from '../components';
import axios from "axios";


const { Header, Sider, Content } = Layout;
const {SubMenu} = Menu;

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            logoutflag: false
        }
    }
    dmenu = () => {
        return(
            <Menu>
                <div className='infoheader'>
                    {localStorage.onlogin}
                </div>
                <Menu.Item onClick={this.preparevent} className='dmenuheader'>
                    <Icon type="apartment" />나의 사이트
                </Menu.Item>
                <Menu.Item onClick={this.logout} className='dmenuheader'>
                    <Icon type="export" />로그아웃
                </Menu.Item>
            </Menu>
        )
    };

    /*jAuth(){
        axios.get('http://35.200.71.110:3000/users/check',{
                headers: {
                    'x-access-token': localStorage.token
                }
            }).then((res) =>{
                console.log(res.data);
        });
    };*/
    getapi(){
        axios.get("https://192.168.0.137:8000/groups?zone_id=5b3a3583adcd134a7e36b35a",{
            headers: {
                'access-token': localStorage.token,
                'user_id': localStorage.onlogin
            }
        }).then((response) => {
            console.log(response.data);
        });
    }


    preparevent =() => {
        message.info('개발중');
    };

    logout = () => {
        localStorage.clear();
        this.setState({
            ...this.state,
            logoutflag: true
        });
    };

    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    };

    render() {
        if(this.state.logoutflag){
            return <Redirect to="/" />
        }
        //this.jAuth();
        this.getapi();
        return (
            <div>
                {
                    !localStorage.onlogin && <Redirect to="/" />
                }
                <Layout style={{minHeight: '100vh'}}>
                    <Header className='en-Header'>
                        <Icon 
                            className='MIcon'
                            type="menu"
                            onClick={this.toggle} 
                        />
                        <img src={enbrix} alt="enbrix" className='imglay'/>
                        <span className='MIcon1'>(주)엔엑스 테크놀로지</span>
                        <Dropdown overlay={this.dmenu} trigger={['click']}>
                            <Avatar size="large" src={usericon} className='dropm'/>
                        </Dropdown>
                    </Header>
                    <Layout>
                        <Sider theme="dark" trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Menu theme="dark" mode="inline" defaultOpenKeys={['sub2','sub1','sub3']} defaultSelectedKeys={[this.props.location.pathname]} >
                                <Menu.Item key='dashboard'>
                                    <Link to="/maintenance/dashboard">
                                        <span>
                                            <Icon type="/maintenance/dashboard" />
                                            <span>대시보드</span>
                                        </span>
                                    </Link>
                                </Menu.Item>
                                <SubMenu
                                    key='sub1'
                                    title={
                                        <span>
                                            <Icon type="search" />
                                            <span>검색 및 분석</span>
                                        </span>
                                    }
                                >  
                                    <Menu.Item key='/maintenance/search'>
                                        <Link to="/maintenance/search">검색 및 분석</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/maintenance/report'>
                                        <Link to="/maintenance/report">리포트</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key='/maintenance/control'>
                                    <Link to="/maintenance/control">
                                        <span>
                                            <Icon type="poweroff" />
                                            <span>일괄 제어</span>
                                        </span>
                                    </Link>
                                </Menu.Item>
                                <SubMenu 
                                    key='sub2'
                                    title={
                                        <span>
                                            <Icon type="tool" />
                                            <span>관리</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key='/maintenance'>
                                        <Link to="/maintenance">지역,허브,장치 관리</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/maintenance/schedule'>
                                        <Link to="/maintenance/schedule">스케줄 관리</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/maintenance/usermanage'>
                                        <Link to="/maintenance/usermanage">사용자 관리</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/maintenance/useadd'>
                                        <Link to="/maintenance/useadd">사용량 합산</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/maintenance/deviceall">
                                        <Link to="/maintenance/deviceall">장치 일괄설정</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu 
                                    key='sub3'
                                    title={
                                        <span>
                                            <Icon type="thunderbolt" />
                                            <span>에너지절감 정책</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key='/maintenance/policyAdd'>
                                        <Link to="/maintenance/policyAdd">정책 템플릿</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/maintenance/policyZone'>
                                        <Link to="/maintenance/policyZone">지역단위 정책</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/maintenance/policyGroup'>
                                        <Link to="/maintenance/policyGroup">그룹단위 정책</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key='/maintenance/log'>
                                    <Link to="/maintenance/log">
                                        <Icon type="desktop" />
                                        <span>로그 관리</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='/maintenance/setting'>
                                    <Link to="/maintenance/setting">
                                        <Icon type="setting" />
                                        <span>환경설정</span>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content className='contents'>
                            <Switch>
                                <Route exact path="/maintenance" component={Region} />
                                <Route path="/maintenance/dashboard" component={DashBoard} />
                                <Route path="/maintenance/search" component={Searcha} />
                                <Route path="/maintenance/report" component={Reporta} />
                                <Route path="/maintenance/control" component={Controla} />
                                <Route path="/maintenance/schedule" component={Schedulem} />
                                <Route path="/maintenance/usermanage" component={Userm} />
                                <Route path="/maintenance/useadd" component={Usinga} />
                                <Route path="/maintenance/deviceall" component={Devicea} />
                                <Route path="/maintenance/log" component={LogManage} />
                                <Route path="/maintenance/setting" component={Setting} />
                                <Route path="/maintenance/policyAdd" component={policyAdd} />
                                <Route path="/maintenance/policyZone" component={policyZone} />
                                <Route path="/maintenance/policyGroup" component={policyGroup} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Home;