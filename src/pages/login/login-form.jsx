import React, {Component} from 'react'
import {Form,Input,Button,Icon} from 'antd'

const FormItem=Form.Item

//收集表单数据
//验证表单
 class LoginForm extends Component {
   handleSubmit = (event) => {
     //阻止事件默认行为
     event.preventDefault();
     const {form}=this.props
     form.validateFields((err, values) => {
       if (!err) {
         // 读取输入的数据,values是包含所有输入数据的对象
         const volues=this.props.from.getFieldsValue()
       }else {
         //表单不通过
       }
     });
   }
   //自定义检验密码
   validatePwd=(rule, value, callback)=>{
     /*
      2. 密码必须输入,长度必须是4到8位
      */
     value=value.trim()
     if(value===''){
       callback('密码必须输入')
     }else if(value.length<4 || value.length>8){
       callback('密码长度必须是4到8位')
     }else {
       callback()
     }
   }
  render() {
    // getFieldDecorator(): 用来包装表单项组件标签生成新的组件标签
    const {getFieldDecorator}=this.props.form
    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        {/*用户名*/}
        <Form.Item>
          {
            getFieldDecorator('username',{  //配置对象：属性名是特定的名称
              //初始值
              initialValue:'admin',
              // 声明式检验
              /*
               1. 用户名必须输入,长度不能小于4
               */
              rules: [
                { whitespace:true,required: true, message: '必须输入用户名' },
                {min:4,message:'用户名长度不能小于4'}
              ],
            })(
              <Input type='text' prefix={<Icon type="user"/>} placeholder="请输入用户名" />
            )
          }
        </Form.Item>
        {/*密码*/}
        <FormItem>
          {
            getFieldDecorator('password',{
              /*
               2. 密码必须输入,长度必须是4到8位
               */
              initialValue:'',
              rules:[{validator:this.validatePwd}]
              }
            )(
              <Input type='password' prefix={<Icon type="lock"/>} placeholder="请输入密码" />
            )
          }
        </FormItem>
        {/*登录*/}
        <FormItem>
          <Button type='primary' htmlType="submit" className='login-form-button'>登录</Button>
        </FormItem>
      </Form>
    )
  }
}
/*
 Form.create(): 高阶函数
 Form.create()(form组件): 返回一个包装了form组件的新组件: Form(LoginForm)
 作用: 向form组件传递一个属性: form: 对象(包含了很多方法)
 form对象:
 1). 操作表单输入数据
 2). 表单验证
 */
const WrapLoginForm=Form.create()(LoginForm)
export default WrapLoginForm
