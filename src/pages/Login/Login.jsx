import { useFormik } from 'formik'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { object, ref, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';

export default function Login() {
  let {setToken} = useContext(UserContext);
  const [inCorrectEmailorPasswordError, setInCorrectEmailorPasswordError]= useState(null);
  const navigate = useNavigate();
  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    email: string().required("email is required").email("email is invalid"),
    password: string().required("password is required").matches(passwordRegex, "password should be minimum 8 characters , at least one upper case letter, one number and one special character"),
  })
  async function sendDataToLogin(values){
    try{
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method:"POST",
        data : values,
       };
       let {data} = await axios.request(options);
       if(data.message==="success"){
        localStorage.setItem("token",data.token);
        setToken(data.token);
        setTimeout(()=>{navigate("/");},2000);
       }
    } catch(error) {
      console.log(error);
      setInCorrectEmailorPasswordError(error.response.data.message)
    }
    
  }
  const formik= useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    validationSchema: validationSchema,
    onSubmit: sendDataToLogin
  });
  return <>
     <h1 className='text-xl text-slate-700 mb-5 font-semibold'>
       <i className='fa-regular fa-circle-user mr-2'></i>Login
     </h1>
     <form className='space-y-3' onSubmit={formik.handleSubmit}>
        
        <div className="email">
           <input type="email"
             className='form-control w-full' 
             placeholder='Email address'
             value={formik.values.email} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="email"/>
             {formik.errors.email && formik.touched.email && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>}
             
        </div>
        <div className="password">
           <input type="password"
             className='form-control w-full' 
             placeholder='Password'
             value={formik.values.password} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="password"/>
             {formik.errors.password && formik.touched.password && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.password}</p>}
             {inCorrectEmailorPasswordError && <p className='text-red-500 mt-1 text-sm'>*{inCorrectEmailorPasswordError}</p>}
        </div>
        
        <button type='submit' className='btn bg-primary hover:bg-primary text-white w-full'>Login</button>
        <Link to={'/forgetPassword'} className='text-red-500 underline '>Forget Password</Link>
     </form>
  
  </>
}
