
export const Buttonvarients = {
  primary:'primary',
  secondary:'secondary'
}


export function ButtonBasic({
  text,
  onClick,
  varients=Buttonvarients.primary,
  icon
}) {
  switch (varients) {
    case Buttonvarients.primary:
      return (
        <button className=' px-3 py-1 font-bold bg-green-500 flex  hover:bg-green-600 text-white rounded shadow-sm' onClick={onClick}>
          {icon && icon}
          <div>{text}</div>
        </button>
      )
    
    case Buttonvarients.secondary:
      return (
        <button className=' px-3 py-1 font-bold border border-gray-300 flex bg-gray-100 hover:bg-gray-200 text-gray-900 rounded shadow-sm hover:shadow-md' onClick={onClick}>
          {icon && icon}
          <div>{text}</div>
        </button>
      )
  
    default:
      return (
        <button className=' px-3 py-1 font-bold bg-green-500 flex  hover:bg-green-600 text-white rounded shadow-sm' onClick={onClick}>
          {icon && icon}
          <div>{text}</div>
        </button>
      )
  }
}


export function RoundedIconButton({icon,className,onClick=()=>{}}) {
  return (
    <div onClick={onClick} className={` bg-green-400 hover:bg-green-500 rounded-full h-9 w-9 border shadow-lg hover:shadow-xl flex items-center justify-center text-white cursor-pointer ${className} `}>
      {icon}
    </div>
  )
}