import { useAuth } from "../context/AuthContext";
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils";



function StatCard(props){
  const {lg,title,children}=props
  return <div className={"bg-slate-300 rounded-lg border-[1px] p-2 m-1 hover:border-slate-900 dark:bg-slate-700 dark:border-slate-900 dark:hover:border-slate-100 " + (lg ? 'col-span-2' : '')}>
        <h4 className="text-lg font-bold">{title}</h4>
        {children}
  </div>
}



export default function Stats() {
  const {globalData}=useAuth()
  const stats = calculateCoffeeStats(globalData)
  const caffeineLevel= calculateCurrentCaffeineLevel(globalData)
  const warningLevel= caffeineLevel < statusLevels['low'].maxLevel ? 'low' :
                      caffeineLevel < statusLevels['moderate'].maxLevel ? 'moderate' : 'high'

 
  return <>

    <div className="mt-8 flex items-center ml-2 gap-2 ">
      <i className="fa-solid fa-chart-simple scale-150" />
      <h2 className="text-2xl font-bold ml-2">Stats</h2>
    </div>
    <div className="grid grid-cols-2 ">
        <StatCard lg title="Active Caffiene Level"> 
          <div className="flex gap-2  items-center" >
            <p><span className="text-4xl ">{caffeineLevel}</span> mg</p>
            <h5 className={" p-2 rounded-md w-12 text-center mt-2 " + (warningLevel === 'low' ? 'text-green-400 bg-green-700': warningLevel === 'moderate' ? 'text-orange-300 bg-orange-500 w-24 ' : 'text-red-300 bg-red-600')}>{warningLevel}</h5>
          </div>
          <p>{ ( warningLevel === 'low' ?  statusLevels['low'].description : warningLevel === 'moderate' ? statusLevels['moderate'].description : statusLevels['high'].description) }</p>

        </StatCard>
        <StatCard title="Daily Caffiene " >
          <p><span className="text-4xl ">{stats.daily_caffeine}</span>mg</p>
           </StatCard>
        <StatCard title="Avg # of Coffees" >
        <p><span className="text-4xl ">{stats.average_coffees}</span>mg</p>
        </StatCard>
        <StatCard title="Daily Cost($)" >
        <p>$ <span  className="text-4xl ">{stats.daily_cost}</span></p>
        </StatCard>
        <StatCard title="Total Cost($)" >
        <p>$ <span className="text-4xl ">{stats.total_cost}</span></p> </StatCard>
    </div>
  
    <table className=" text-lg border-2 ml-1 mb-2 mr-4 mt-8 border-gray-400 border-solid rounded-lg w-full p-2 ">
      <thead className="font-bold border-2  border-gray-400 border-solid  bg-blue-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:border-slate-100 ">
        <tr className="border-2 border-gray-400 border-solid">
          <th className="border-2 border-gray-400 border-solid p-2 ">Coffee Name</th>
          <th className="border-2 border-gray-400 border-solid">Number of purchase</th>
          <th className="border-2 border-gray-400 border-solid">Number of Total</th>
        </tr>
      </thead>
      <tbody className="border-2 border-gray-400 border-solid bg-slate-200 ">
        {getTopThreeCoffees(globalData).map((coffee,coffeeIndex)=>{
          return(
            <tr key={coffeeIndex}className="border-2 border-gray-400 border-solid dark:bg-slate-500 ">
              <td className="p-2 border-2 border-gray-400 border-solid hover:bg-gray-300  dark:hover:text-slate-900">{coffee.coffeeName}</td>
              <td className="border-2 border-gray-400 border-solid pl-3 hover:bg-gray-300  dark:hover:text-slate-900">{coffee.count}</td>
              <td className="border-2 border-gray-400 border-solid text pl-3 hover:bg-gray-300  dark:hover:text-slate-900">{coffee.percentage}</td>
            </tr>
          ) 
        })}
      </tbody>
    </table>
  
  </>;
}
