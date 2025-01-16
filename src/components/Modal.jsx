import ReactDom from 'react-dom'


export default function Modal(props) {
  const {children,handleCloseModal} = props
  return ReactDom.createPortal(
    <div className='z-[100] flex justify-center items-center h-screen w-screen p-5 fixed top-0 left-0 '>
      <button onClick={handleCloseModal} className='bg-[#f8fafc] opacity-80 z-[99] w-full inset-0 absolute border-none shadow-none'/>
      <div className='z-[101] flex flex-col gap-5 p-5 max-w-[600px] w-full min-h-[400px] border-1 border-solid border-[#f1f5f9] bg-white rounded-lg dark:bg-slate-900'>
          {children}
        </div>
    </div>,document.getElementById('portal')
        
  )
}
