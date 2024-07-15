// Here is iam using Formik to handle the Form and YUP to handle the Validations



import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login.avif'
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('This field Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('This field Required'),
});

const Signin = () => {
    const navigate = useNavigate()

    return (
        <>

            <div className='col-md-12' style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div className='col-md-6' style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
                <img src={login} alt='banner' style={{width:'50%'}} />
                </div>


                <div className='col-md-6' style={{display:'flex', justifyContent:'center', alignItems: 'center',  height:'100vh'}}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            const data = localStorage.getItem('user');
                            let  authData = JSON.parse(data)
                            if( authData == null){
                                alert("User not EXist")
                            }else {
                                // console.log(authData, "a")
                                const checkEmail = authData && authData.length > 0 && authData.find((ele)=>ele.email == values.email)
                                // console.log(checkEmail, "RRR")
                                if(checkEmail == undefined){
                                    alert("this mail id not exist in the database")
                                }else if(checkEmail.email == values.email && checkEmail.password == values.password ){

                                    navigate('/home')
                                }else{
                                    alert("Invalid Email/Password")
                                }

                            }
                            
                        }}
                    >

                        {({ errors, touched }) => (
                            <Form>

                                <div className='col-md-12 text-start px-5'>
                                    <div className='col-md-12'>
                                        <div className='col-md-12'>
                                            <label className='col-md-12' htmlFor="email">Email</label>
                                            <Field
                                                name="email"
                                                type="email"
                                                className={errors.email && touched.email ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                                            />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>
                                    </div>


                                    <div className='col-md-12'>
                                        <div className='col-md-12'>
                                            <label className='col-md-12' htmlFor="password">Password</label>
                                            <Field
                                                name="password"
                                                type="password"
                                                className={errors.password && touched.password ? 'input-error col-md-12' : 'col-md-12 inputFields '}
                                            />
                                            <ErrorMessage name="password" component="div" className="error-message" />
                                        </div>
                                    </div>
                                    <div className='d-flex' style={{justifyContent:'space-between'}}>
                                    <a href='#'><Link to="/">Sign up</Link></a>
                                    <a href='#'>Forget password</a>
                                    </div>

                                    <button className='btn btn-success mt-4 col-md-12' type="submit">Log me in</button>

                                </div>





                            </Form>
                        )}
                    </Formik>
                </div>

            </div>

        </>
    )
}

export default Signin