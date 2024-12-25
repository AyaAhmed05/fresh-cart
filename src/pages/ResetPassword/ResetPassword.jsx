import { useFormik } from 'formik'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { object, ref, string } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';


export default function ResetPassword() {
    const [error, setError]= useState(null)

    const navigate = useNavigate();
    const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const validationSchema = object({
      email: string().required("email is required").email("email is invalid"),
      newPassword: string().required("password is required").matches(passwordRegex, "password should be minimum 8 characters , at least one upper case letter, one number and one special character"),
    })
    async function sendDataToLogin(values){
      try{
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          method:"PUT",
          data : values,
         };
         let {data} = await axios.request(options);
          console.log(data)
          navigate("/login");
         
      } catch(error) {
        console.log(error);
        setError(error.response.data.message)

      }
      
    }
    const formik= useFormik({
      initialValues: {
        email:"",
        newPassword:"",
      },
      validationSchema: validationSchema,
      onSubmit: sendDataToLogin
    });
  return (
    <>
    <section>
        <h2 className="text-3xl text-primary font-semibold my-4">
            <i className="fa-regular fa-circle-user me-3"></i>
            <span>Reset Password</span>
            
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
           {error ? (<div className='text-red-500 font-semibold'>{error}</div>):""}

            <div>
                <input type="email" placeholder="email" name="email" className="form-control w-full" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.email && formik.touched.email && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>}
            <div>
                <input type="password" placeholder="password" name="newPassword" className="form-control w-full" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            </div>
            <button type="submit" className="btn bg-primary hover:bg-primary text-white w-full">
                Submit
            </button>

        </form>
      </section>
    </>
    
  )
}
