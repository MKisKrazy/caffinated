import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
  const { children } = props;
  const [showModal,setShowModal]=useState(false)
  const {globalUser,logout}= useAuth()

  const header = (<header className="font-mono flex justify-between top-1">
            <div className="px-2 pt-2">
                <h1 className="text-3xl pt-1 font-bold font-serif" >CAFFINATED</h1>
                <p className="px-2 text-sm">For Coffee Insatiates</p>
            </div>

            { globalUser ? (<button onClick={()=>{logout()}} className="flex gap-3 py-3 px-2 justify-center bg-blue-300 m-2 rounded-md items-center shadow-xl hover:scale-105 dark:bg-blue-900">
                <p>Logout</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>):(
              <button onClick={()=>{
                setShowModal(true)
              }} className="flex gap-3 py-3 px-2 justify-center bg-blue-300 m-2 rounded-md items-center shadow-xl hover:scale-105 dark:bg-blue-900">
                  <p>Sign up free</p>
                  <i className="fa-solid fa-mug-hot"></i>
              </button>
            )
            }
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
