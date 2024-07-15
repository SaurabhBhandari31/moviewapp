// I am using dummy data to show the functionalties puropse 




import React, {useEffect, useState} from 'react';
import banner from '../../assets/images/signup.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import LocationData from '../Helper';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('This field Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('This field Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field Required'),
  address: Yup.string()
    .required('This field Required'),
  country: Yup.string()
    .required('This field Required'),
  state: Yup.string()
    .required('This field Required'),
  city: Yup.string()
    .required('This field Required'),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Invalid pincode')
    .required('This field Required'),
  istCode: Yup.string()
    .required('This field Required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('This field Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('This field Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('This field Required'),
});

const signupAuthData =[]


const Signup = () => {
  const [countryList, setCountryList]= useState([])
  const [stateList, setStateList]= useState([])
  const [cityList, setCityyList]= useState([])



  const navigate = useNavigate()

  useEffect(()=>{
    // console.log(LocationData)
    const country = LocationData.countries.map((ele, i)=>{
      return{
        name:ele.name,
        id: i
      }
    })
    setCountryList(country)
  },[])

  const handleCustomChange = (event, setFieldValue) => {
    const {name, value} = event.target
    if(name == "country"){
      const selectedCountry = value;
       const getStateData = LocationData.countries.find((item)=>item.name == value)
       const getState= getStateData.states.map((ele, i)=>{
        return{
          name: ele.name,
          id: i
        }
       })
       setStateList(getState)
      setFieldValue('country', selectedCountry);
      setFieldValue('state', '');
      setFieldValue('city', '');
      
    }
    if(name == "state"){
      const seletectedState = value;
      let  getCities = LocationData.countries.map((ele)=>ele.states)
      getCities = getCities.flat().find((item)=>item.name== value)
      getCities = getCities.cities.map((ele, i)=>{
        return{
          name: ele.name,
          id: i
        }
       })


      setCityyList(getCities)
      setFieldValue('state', seletectedState);
      setFieldValue('city', '');
    }
    if(name == "city"){
      const selectedCity = value;
      setFieldValue('city', selectedCity);
    }


}
  return (

    <>
      <div className='col-md-12' style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div className='col-md-6 text-center'style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <img src={banner} alt='banner' style={{width:'50%'}} />
        </div>

        {/* Second section start here */}

        <div className='col-md-6 ' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              address: '',
              country: '',
              state: '',
              city: '',
              pincode: '',
              istCode: '',
              mobileNumber: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              signupAuthData.push(values)
              localStorage.setItem('user', JSON.stringify(signupAuthData));
              navigate('/signin');
            }}
          >

            {({ errors, touched, handleChange, setFieldValue }) => (
              <Form>

                <div className='col-md-12 text-start px-5'>

                  <div className='col-md-12 d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='col-md-5'>
                      <label className='col-md-12' htmlFor="firstName">First Name</label>
                      <Field
                        name="firstName"
                        type="text"
                        className={errors.firstName && touched.firstName ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      />
                      <ErrorMessage name="firstName" component="div" className="error-message" />
                    </div>
                    <div className='col-md-5'>
                      <label className='col-md-12' htmlFor="lastName">Last Name</label>
                      <Field
                        name="lastName"
                        type="text"
                        className={errors.lastName && touched.lastName ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      />
                      <ErrorMessage name="lastName" component="div" className="error-message" />
                    </div>
                  </div>


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
                      <label className='col-md-12' htmlFor="address">Address</label>
                      <Field
                        name="address"
                        type="text"
                        className={errors.address && touched.address ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      />
                      <ErrorMessage name="address" component="div" className="error-message" />
                    </div>
                  </div>


                  {/* country and state */}

                  <div className='col-md-12 d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='col-md-5'>
                      <label className='col-md-12' htmlFor="country">Country</label>
                      <Field
                        name="country"
                        as="select"
                        onChange={(e) => handleCustomChange(e, setFieldValue)}
                        className={errors.country && touched.country ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      >
                        <option value="">Select Country</option>
                        {countryList && countryList.length >0 && countryList.map((item)=>{
                          return(
                            <>
                            <option value={item.name}>{item.name}</option>
                            </>
                          )
                        })}
                      </Field>
                      <ErrorMessage name="country" component="div" className="error-message" />
                    </div>
                    <div className='col-md-5'>
                      <label className='col-md-12' htmlFor="state">State</label>
                      <Field
                        name="state"
                        as="select"
                        onChange={(e) => handleCustomChange(e, setFieldValue)}
                        className={errors.state && touched.state ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      >
                        <option value="">Select State</option>
                        {stateList && stateList.length >0 && stateList.map((item)=>{
                          return(
                            <>
                            <option value={item.name}>{item.name}</option>
                            </>
                          )
                        })}
                      </Field>
                      <ErrorMessage name="state" component="div" className="error-message" />
                    </div>
                  </div>

                  {/* City  and Pincode */}

                  <div className='col-md-12 d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='col-md-5'>
                      <label className='col-md-12' htmlFor="country">City</label>
                      <Field
                        name="city"
                        as="select"
                        onChange={(e) => handleCustomChange(e, setFieldValue)}
                        className={errors.city && touched.city ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      >
                        <option value="">Select City</option>
                        {cityList && cityList.length >0 && cityList.map((item)=>{
                          return(
                            <>
                            <option value={item.name}>{item.name}</option>
                            </>
                          )
                        })}
                      </Field>
                      <ErrorMessage name="city" component="div" className="error-message" />
                    </div>
                    <div className='col-md-5'>
                      <label className='col-md-12' htmlFor="state">Pincode</label>
                      <Field
                        name="pincode"
                        type="text"
                        className={errors.pincode && touched.pincode ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      />
                      <ErrorMessage name="pincode" component="div" className="error-message" />
                    </div>
                  </div>


                  {/* ist   and Mobile */}

                  <div className='col-md-12 d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='col-md-2'>
                      <label className='col-md-12' htmlFor="istCode">IST Code</label>
                      <Field
                        name="istCode"
                        as="select"
                        className={errors.istCode && touched.istCode ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      >
                        <option value="">Select IST Code</option>
                        <option value="Code1">+91</option>
                        <option value="Code2">+92</option>
                        <option value="Code1">+93</option>
                        <option value="Code2">+94</option>
                        {/* Add more options as needed */}
                      </Field>
                      <ErrorMessage name="istCode" component="div" className="error-message" />
                    </div>
                    <div className='col-md-9'>
                      <label className='col-md-12' htmlFor="mobileNumber">Mobile Number</label>
                      <Field
                        name="mobileNumber"
                        type="text"
                        className={errors.mobileNumber && touched.mobileNumber ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      />
                      <ErrorMessage name="mobileNumber" component="div" className="error-message" />
                    </div>
                  </div>

                  {/* End here two pair section */}

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


                  <div className='col-md-12'>
                    <div className='col-md-12'>
                      <label className='col-md-12' htmlFor="confirmPassword">Confirm Password</label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={errors.confirmPassword && touched.confirmPassword ? 'input-error col-md-12' : 'col-md-12 inputFields'}
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                    </div>
                  </div>


                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    {/* <a href='#'>Sign up</a> */}
                    <div></div>
                    <a href='#'><Link to="/signin">Sign in</Link></a>
                  </div>


                  <button className='btn btn-success mt-4 col-md-12' type="submit">Submit</button>

                </div>
              </Form>
            )}
          </Formik>

        </div>

      </div>



    </>



  );
};

export default Signup;