import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getCaffeineAmount, timeSinceConsumption } from "../utils";
import { useAuth } from "../context/AuthContext";
export default function History() {
  const {globalData}=useAuth()
  return <>
      <div className="mt-8 flex items-center ml-2 gap-2">
        <i className="fa-solid fa-timeline scale-150" />
        <h2 className="text-2xl font-bold ml-2">History</h2>
    </div>

    <p className="mt-3"><i>Hover for more information</i></p>
    <div className="grid grid-cols-12 mt-3">
      {Object.keys(globalData).sort((a,b)=>a-b).map((utcTime,coffeeIndex)=>{
          const coffee = globalData[utcTime]
          const timeSinceConsume = timeSinceConsumption(utcTime)
          const originalAmount = getCaffeineAmount(coffee.name)
          const remainingAmount = calculateCurrentCaffeineLevel({
            [utcTime]:coffee
          })
          const summary = `${coffee.name} | ${timeSinceConsume} | $${coffee.cost} | ${originalAmount}mg / ${originalAmount}mg`

          return(
            
                <div title={summary} key={coffeeIndex} className="p-1 m-1"> 
                  <i className="fa-solid fa-mug-hot scale-150" />
                </div>
          )
      })}
    </div>
  </>
}
