import axios from "axios";
import { useState } from "react"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const port = import.meta.env.VITE_PORT_SPRING;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    datadenaissance:""
  })
  const notify = (mssg) => {
    toast.success(`${mssg}`, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

  const [err, setErr] = useState("")

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }




  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const submit = async () => {
    console.log(user)
    
    try {
      const res = await axios.post(`http://localhost:${port}/api/users/register/professor`, user)
      console.log(res.data)
      notify(res.data.message)
      setUser({
        email: "",
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        datadenaissance:""
      })
    } catch (error) {
      console.log(error.response.data.message)
      setErr(error.response.data.message)
      toast.error(`${error.response.data.message}`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
    }
      
   
    
  }

  return (
    <div >
    <div className={`dark:bg-slate-900 bg-gradient-to-r from-blue-300 to-green-300 flex h-full items-center py-16 min-h-screen font-[Poppins]`}>
   <main class="w-full max-w-lg  mx-auto p-6">
          <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block  text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
                <p class="mt-2   text-sm text-gray-600 dark:text-gray-400">
                
                
                </p>
              </div>


              <div class="mt-5">

                <div class="grid gap-y-4">
                <div>
                    <div class="relative">
                      <input  name="datadenaissance"  placeholder="datadenaissance" value={user.datadenaissance} onChange={handleInput} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>
                  <div>
                   
                    <div class="relative">
                      <input type="text"  placeholder="firstName" id="nom" name="firstName" value={user.firstName} onChange={handleInput} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>

                  </div>
                  <div>
                  
                    <div class="relative">
                      <input type="text" id="prenom"  placeholder="lastName" name="lastName" value={user.lastName} onChange={handleInput} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>

                  </div>
                  <div>
                    <div class="relative">
                      <input type="text" id="prenom" placeholder="userName" name="userName" value={user.userName} onChange={handleInput} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>

                  </div>
                  
                  
                  <div>
                    <div class="relative">
                      <input type="email" id="email"  placeholder="email" name="email" value={user.email} onChange={handleInput} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>

                  <div>
                    <div class="flex justify-between items-center">
                      
                    </div>
                    <div class="relative">
                      <input type="password" id="password"  placeholder="password" name="password" value={user.password} onChange={handleInput} class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="password-error" />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    
                  </div>
                 
                  {/* {err && <p class="text-sm text-red-600 mt-2" >{err}</p>} */}
               
              


                  <div className="flex flex-col gap-4">
  <a
    href="/login"
    className="flex-1 py-3 px-4 inline-flex justify-center items-center text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-blue-600"
  >
    Login
  </a>
  <button
    onClick={submit}
    className="flex-1 py-3 px-4 inline-flex justify-center items-center text-sm font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-green-600"
  >
    Register
  </button>
</div>

                </div>


              </div>
            </div>
          </div>
        
        </main>
      </div>
      <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    </div>


  )
}

export default Register