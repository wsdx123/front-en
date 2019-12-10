import React, {Component} from 'react';
import {Form, Input, Icon, Button, message} from 'antd';
import {Redirect} from 'react-router-dom';
import enbrix from './enbrix.png';
import axios from 'axios';
import './Tbox.css';

class Tbox extends Component{

    constructor(props){
        super(props);
        this.state = {
            logged: 2
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                axios.post('http://35.200.71.110:3000/users', {
                    user_id: values.email,
                    user_password: values.password
                } )
                .then((response) => {
                    localStorage.onlogin = values.email;
                    localStorage.token = response.data.token;
                    this.setState({
                        logged: response.data.result_code
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        logged: error.result_code
                    });
                    console.log(this.state.logged);
                    this.props.form.setFields({
                        password: {
                            value: '',
                            errors: [new Error('일치하지 않습니다.')]
                        }
                    })
                })
            } else{
                message.error('이메일과 비밀번호를 입력하십시오.');
            }
        })
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        if(this.state.logged === 0 || localStorage.onlogin) {
            return <Redirect to="/maintenance" />
        }
        return(
            <div className='TBox-header'>
                <Form onSubmit={this.handleSubmit}>
                    <img src={enbrix} alt="enbrix" />
                    <Form.Item>
                        {getFieldDecorator('email',{
                            rules: [{required: true, message: '이메일을 입력하세요.'}],
                        })(
                            <Input 
                                prefix={<Icon type='mail' />}
                                placeholder='이메일'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password',{
                            rules: [{required: true, message: '비밀번호를 입력하세요.'}],
                        })(
                            <Input
                                prefix={<Icon type='lock' />}
                                placeholder='비밀번호'
                                type='password'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>
                            로그인
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const LoginB = Form.create({name: 'Login-en'})(Tbox);
export default LoginB;