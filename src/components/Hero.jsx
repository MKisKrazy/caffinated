export default function Hero() {
  return (
    <>
    <h1 className="text-3xl mt-10 ml-2">Coffee Tracking for Coffee Devotees!</h1>
    <div className="text-xl mt-10 ml-2">
      <h3 className="pb-4">Try <span>Caffinated</span> and start ...</h3>
                <div className="grid gap-3">
                <p>✅ Tracking every coffee</p>
                <p>✅ Measuring your blood caffeine levels</p>
                <p>✅ Costing and quanitifying your addition</p>
                </div>
               
    </div>
    <div className="bg-slate-500 border-2 rounded-lg p-3 font-mono mt-12 m-2 ml-3">
                <div className="flex gap-3 mb-3">
                    <i className="fa-solid fa-circle-info pt-[6px] "></i>
                    <h3 className="text-xl">Did you know...</h3>
                </div>
                <h5 className="font-bold">That caffeine&apos;s half-life is about 5 hours?</h5>
                <p>This means that after 5 hours, half the caffeine you consumed is still in your system, keeping you alert longer! So if you drink a cup of coffee with 200 mg of caffeine, 5 hours, later, you&apos;ll still have about 100 mg of caffeine in your system.</p>
            </div>
    </>
  )
}
