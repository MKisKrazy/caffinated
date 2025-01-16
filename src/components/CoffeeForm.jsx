import { coffeeOptions } from "../utils";
import { useState } from "react";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CoffeeForm(props) {
  const { isAuthenticated} = props
  const [showModal,setShowModal]=useState(false)
  const [showCoffeeTypes,setShowCoffeeTypes]=useState(false)
  const [selectedCoffee,setSelectedCoffee]=useState(null)
  const [coffeeCost,setCoffeeCost]= useState(0)
  const [hour,setHour]=useState(0)
  const [mins,setMins]=useState(0)
  const {globalData,setGlobalData,globalUser}=useAuth()

  async function  handleSubmitForm(){
    if(!isAuthenticated){
      setShowModal(true)
        return;
    }
    //guard clause
    if(!selectedCoffee){
      return
    }
     
        //new variable
        const newGlobalData = {
          ...(globalData || {})
        }
        //dynamic values
        const newData={
          name:selectedCoffee,
          cost:coffeeCost
        }
        const nowTime = Date.now()
        const timeToSubtract= (hour * 60 * 60 * 1000) + (mins * 60 * 1000)
        const timeStamp = nowTime-timeToSubtract
        newGlobalData[timeStamp]=newData
        console.log(selectedCoffee,timeStamp,coffeeCost)
        //updating global state
        setGlobalData(newGlobalData)
    
        //persisting data in firestore
        const useRef = doc(db,'users',globalUser.uid)
        const res = await setDoc(useRef,{
          [timeStamp]:newData
        },{merge:true})
    setCoffeeCost(0)
    setMins(0)
    setHour(0)
    setSelectedCoffee(null)
  }

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
    <div className="flex items-center p-2 gap-2 justify-center">
      <i className="fa-solid fa-pencil" />
      <h2 className="text-2xl font-bold">Start Tracking Today</h2>
    </div>
    <h4 className="pl-2 pb-2 text-lg text-center">Select coffee type</h4>
    <div className="grid gap-2  md:grid-cols-3 grid-cols-2">
      {coffeeOptions.slice(0,5).map((option,optionIndex)=>{
        return(
          <button onClick={()=>{
            setSelectedCoffee(option.name) 
          setShowCoffeeTypes(false)}} key={optionIndex} className={"bg-slate-300 rounded-lg border-[1px] p-2 m-1 hover:border-slate-900 dark:bg-slate-700 dark:border-slate-900 dark:hover:border-slate-100" + (option.name === selectedCoffee ? ' border-slate-900' : ' ')}>
        <h4>{option.name}</h4>
        <p>{option.caffeine} mg</p>
        </button>
        )
      })}
      <button onClick={()=>{setShowCoffeeTypes(true)
        setSelectedCoffee(null)
      }} className={"bg-slate-300 rounded-lg  border-[1px] p-2 m-1 hover:border-slate-900 dark:bg-slate-700 dark:border-slate-900 dark:hover:border-slate-100" + (showCoffeeTypes ? ' border-slate-900' : ' ')}>
        <h4>Other</h4>
        <p>n/a</p>
      </button>
    </div>

      { showCoffeeTypes && (
        <select name="coffee-list" onChange={(e)=>{
          setSelectedCoffee(e.target.value)
          console.log(e.target.value)
        }} className="font-bold text-lg border-2 ml-1 mb-2 mr-2 mt-8 bg-blue-100 border-gray-500 border-solid rounded-md w-full p-2 dark:bg-slate-700">
        <option value={null} >Select Type</option>
        {coffeeOptions.map((option,optionIndex)=>{
          return(
            <option key={optionIndex} value={option.name}>
              {option.name} ({option.caffeine} mg)
            </option>
          )
        })}
      </select>)}

      <h4 className="font-bold text-lg mt-4 ml-2">Add the cost ($)</h4>
      <input onChange={(e)=>{
        setCoffeeCost(e.target.value)
      }} value={coffeeCost} className="w-full p-2 ml-1 mb-2 mr-2 mt-1 rounded-md border-solid bg-blue-100 border-2 border-gray-500 dark:bg-slate-700 " placeholder="4.50" type="number"/>

      <h4 className="font-bold text-lg mt-4 ml-2">Time Since Consumption</h4>
        <div className="flex gap-3">
        <div className="flex-1">
          <h6 className="font-bold text-lg mt-4 ml-2">Hours</h6>
          <select  onChange={(e)=>{
            setHour(e.target.value)
          }} id="hours-select" className=" text-lg border-2 ml-1 mb-2 mr-2 mt-2 bg-blue-100 border-gray-500 border-solid rounded-md w-full p-2 dark:bg-slate-700">
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23].map((hour,hourIndex)=>{
              return(
                <option key={hourIndex} value={hour}>{hour}</option>
              )
            })
            }
          </select>
        </div>

        <div className="flex-1">
          <h6 className="font-bold text-lg mt-4 ml-2">Minutes</h6>
          <select onChange={(e)=>{
            setMins(e.target.value)
          }} id="mins-select" className=" text-lg border-2 ml-1 mb-2 mr-2 mt-2 bg-blue-100 border-gray-500 border-solid rounded-md w-full p-2 dark:bg-slate-700">
            {[0,5,10,15,30,45].map((min,minIndex)=>{
              return(
                <option key={minIndex} value={min}>{min}</option>
              )
            })
            }
          </select>
        </div>
        </div>
        

        <button onClick={()=>{
          handleSubmitForm()

        }} className="bg-blue-100 border-none rounded-lg p-3 text-center shadow-xl mt-3 ml-1 hover:border-solid border-2 border-blue-400 font-semibold dark:bg-slate-700">
          <p className="text-lg">Add Entry</p>
        </button>
    </>
  )
}
