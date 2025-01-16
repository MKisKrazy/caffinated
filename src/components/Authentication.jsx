import { useState } from "react"
import { useAuth } from "../context/AuthContext"


export default function Authentication(props) {
  const {handleCloseModal}= props
  const [isRegistration,setIsRegistration]=useState(false)
  const [email,setEmail]= useState('')
  const [password,setPassword]=useState('')
  const [isAuthenticating,setIsAuthenticating]=useState(false)
  const [error,setError]=useState(null)

  const { login, signup }= useAuth()
  async function handleAuthenticate(login,signup){
    
    if(!email || !email.includes('@') || !password || !password.length>6){
      return
    }

    try{
      setIsAuthenticating(true)
      setError(null)
      if(isRegistration){
       await signup(email,password)
      }else{
       await login(email,password)
      }
      handleCloseModal()

    }catch(err){
      console.log(err.message)
      setError(err.message)
    }
    finally{
      setIsAuthenticating(false)
      
    }
  }


  return (
  <>
    <h2 className="text-2xl font-bold">{isRegistration ? 'Sign Up' : 'Login'}</h2>
    <p>{isRegistration ? 'Create an account' : 'Signin to your account!'} </p>
    {error && (<p>❌{error}</p>)}
    <input value={email} onChange={(e)=>{
      setEmail(e.target.value)
    }} placeholder="Email" type="email" className="p-3 rounded-lg  border-[1px] border-solid border-gray-500 dark:text-black"/>
    <input value={password} onChange={(e)=>{
      setPassword(e.target.value)
    }} placeholder="********" type="password" className="p-3 rounded-lg  border-[1px] border-solid border-gray-500 dark:text-black"/>
    <button onClick={()=>{handleAuthenticate(login,signup)}} className="shadow-lg p-3 rounded-lg text-center border-[1px] border-solid border-gray-500 hover:scale-105"><p>{isAuthenticating ? 'Authenticating...':'Submit'}</p></button>
    <hr />
    <div>
      <p>{isRegistration ? 'Already have an account?':'Don\'t have an account?'}</p>
      <button onClick={()=>{
        setIsRegistration(!isRegistration)
      }} className="shadow-lg p-3 rounded-lg text-center border-[1px] border-solid border-gray-500 hover:scale-105">{isRegistration ? 'Sign in' : 'Sign up'}</button>
    </div>
  </>
  )
}
