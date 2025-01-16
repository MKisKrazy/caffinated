import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
  const { children } = props;
  const [showModal,setShowModal]=useState(false)
  const {globalUser,logout}= useAuth()
  const [darkMode,setDarkMode]=useState(false)
  
  const header = (<header className="font-mono flex justify-between top-1">
            <div className="px-2 pt-2">
                <h1 className="text-xl pt-1 font-bold font-serif md:text-3xl" >CAFFINATED</h1>
                <p className="text-xs md:px-2 md:text-sm">For Coffee Insatiates</p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 m-0 p-0">
            <button onClick={()=>{
              if(document.getElementById('html').classList.contains("dark")){
                document.getElementById('html').classList.remove("dark")
                setDarkMode(false)
              }else{
                document.getElementById('html').classList.add("dark")
                setDarkMode(true)
              } 
            }}><i className={darkMode ? "fa-solid fa-sun" : 'fa-solid fa-moon'}/></button>

{ globalUser ? (<button onClick={()=>{logout()}} className="flex gap-1 py-3 px-2 justify-center bg-blue-300 m-1 rounded-md items-center shadow-xl hover:scale-105 dark:bg-blue-900">
                <p>Logout</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>):(
              <button onClick={()=>{
                setShowModal(true)
              }} className="flex gap-1 py-3 px-1 justify-center bg-blue-300 m-1 rounded-md items-center shadow-xl hover:scale-105 dark:bg-blue-900">
                  <p>Sign up free</p>
                  <i className="fa-solid fa-mug-hot"></i>
              </button>
            )
            }
            </div>
            
            
  </header>)

  const footer =(<footer className="font-mono text-center bottom-0 mt-8">
    <p><span >Caffinated</span> was made by <a target="_blank" href="https://www.linkedin.com/in/maheshkrishna02/">Mahesh Krishna</a> &nbsp;using ReactJs.<br/>Check out the project on <a target="_blank" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>
</footer>) 

  function handleCloseModal(){
    setShowModal(false)
  }
  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
        <Authentication  handleCloseModal={handleCloseModal} />
      </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
