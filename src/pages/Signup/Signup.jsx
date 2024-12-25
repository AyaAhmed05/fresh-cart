import { useFormik } from 'formik'
import axios from 'axios';
import React, { useState } from 'react'
import { object, ref, string } from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate;

  const [accountExistError, setAccountExistError]= useState(null);
  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex=/^(02)?01[0125][0-9]{8}$/
  const validationSchema = object({
    name: string().required("name is required").min(3,"name must be at least 3 characters").max(25, "name can not be more than 25 characters"),
    email: string().required("email is required").email("email is invalid"),
    password: string().required("password is required").matches(passwordRegex, "password should be minimum 8 characters , at least one upper case letter, one number and one special character"),
    rePassword: string().required("repassword is required").oneOf([ref("password")],"password and repassword should be the same"),
    phone: string().required("phone no. is required").matches(phoneRegex,"sorry, we accept Egyptian phone numbers only"),
  })
  async function sendDataToRegister(values){
    try{
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method:"POST",
        data : values,
       };
       let {data} = await axios.request(options);
       if(data.message==="success"){
        setTimeout(()=>{navigate("/");},2000);
       }
    } catch(error) {
          setAccountExistError(error.response.data.message);
    }
    
  }
  const formik= useFormik({
    initialValues: {
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema: validationSchema,
    onSubmit: sendDataToRegister
  });
  return <>
     <h1 className='text-xl text-slate-700 mb-5 font-semibold'>
       <i className='fa-regular fa-circle-user mr-2'></i>Register Now
     </h1>
     <form className='space-y-3' onSubmit={formik.handleSubmit}>
        <div className="name">
           <input type="text"
             className='form-control w-full' 
             placeholder='type your name'
             value={formik.values.name} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="name"/>
             {formik.errors.name && formik.touched.name && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.name}</p>}
        </div>
        <div className="email">
           <input type="email"
             className='form-control w-full' 
             placeholder='Email address'
             value={formik.values.email} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="email"/>
             {formik.errors.email && formik.touched.email && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>}
             {accountExistError && (<p className='text-red-500 mt-1 text-sm'>*{accountExistError}</p>

             )}
        </div>
        <div className="password">
           <input type="password"
             className='form-control w-full' 
             placeholder='Password'
             value={formik.values.password} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="password"/>
             {formik.errors.password && formik.touched.password && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.password}</p>}
        </div>
        <div className="rePassword">
           <input type="password"
             className='form-control w-full' 
             placeholder='rePassword'
             value={formik.values.rePassword} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="rePassword"/>
             {formik.errors.rePassword && formik.touched.rePassword && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.rePassword}</p>}
        </div>
        <div className="phone">
           <input type="tel"
             className='form-control w-full' 
             placeholder='Phone Number'
             value={formik.values.phone} onBlur={formik.handleBlur}
             onChange={formik.handleChange} name="phone"/>
             {formik.errors.phone && formik.touched.phone && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.phone}</p>}
        </div>
        <button type='submit' className='btn bg-primary hover:bg-primary text-white w-full'>Sign up</button>
     </form>
  
  </>
}
