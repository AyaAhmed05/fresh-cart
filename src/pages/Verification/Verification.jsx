import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';


export default function Verification() {
    const navigate = useNavigate()

    const [error, setError]= useState(null)
    async function onSubmit(values){
        try{
          const options = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            method:"POST",
            data : values,
           };
           let {data} = await axios.request(options);
          // setmessage(data.message)
           if(data.status==="Success"){
          
            navigate("/resetPassword");
           }
           
        } catch(error) {
          console.log(error);
          setError(error.response.data.message)
        }
        
      }
  const validationSchema = object({
        resetCode: string().required("code is required")
    })
  const formik = useFormik({
    initialValues:{
        resetCode:'',
    },
    validationSchema,
    onSubmit,
  })
  return (
    <>
       <section>
          <h2 className="text-3xl text-primary font-semibold my-4">
            <i className="fa-regular fa-circle-user me-3"></i>
            <span>Verify Code</span>
          </h2>
          <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
            {error ? (<div className='text-red-500 font-semibold'>{error}</div>):""}
              <div>
                <input type='text' className='form-control w-full' placeholder='code' name='resetCode' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

              </div>
              <button type='submit' className='bg-primary w-full text-white btn hover:bg-primary'>
                Submit
              </button>
          </form>
       </section>
    </>
  )
}
