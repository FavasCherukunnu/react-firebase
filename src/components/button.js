
export const Buttonvarients = {
  primary: 'primary',
  secondary: 'secondary'
}


export function ButtonBasic({
  text,
  onClick,
  varients = Buttonvarients.primary,
  icon,
  className,
  type='button'
}) {
  switch (varients) {
    case Buttonvarients.primary:
      return (
        <button type={type} className={`px-3 py-1 font-bold bg-green-500 flex  hover:bg-green-600 text-white rounded shadow-sm ${className}`} onClick={onClick}>
          {icon && icon}
          <div>{text}</div>
        </button>
      )

    case Buttonvarients.secondary:
      return (
        <button type={type} className={`px-3 py-1 font-bold border border-gray-300 flex bg-gray-100 hover:bg-gray-200 text-gray-900 rounded shadow-sm hover:shadow-md ${className}`} onClick={onClick}>
          {icon && icon}
          <div>{text}</div>
        </button>
      )

    default:
      return (
        <button type={type} className={`px-3 py-1 font-bold bg-green-500 flex  hover:bg-green-600 text-white rounded shadow-sm ${className}`} onClick={onClick}>
          {icon && icon}
          <div>{text}</div>
        </button>
      )
  }
}


export function RoundedIconButton({ icon, className, onClick = () => { }, varient = Buttonvarients.primary,height=36,width=36 }) {

  const style = {
    maxHeight:height,
    minHeight:height,
    maxWidth:width,
    minWidth:width
  }

  switch (varient) {

    case Buttonvarients.primary:
      return (
        <div onClick={onClick} style={style} className={` bg-green-400 hover:bg-green-500 rounded-full  border shadow-lg hover:shadow-xl flex items-center justify-center text-white cursor-pointer ${className} `}>
          {icon}
        </div>
      )
    
    case Buttonvarients.secondary:
      return (
        <div onClick={onClick}  style={style} className={` bg-gray-50 hover:bg-gray-200 rounded-full  border shadow-lg hover:shadow-xl flex items-center justify-center text-gray-900 cursor-pointer ${className} `}>
          {icon}
        </div>
      )

    default:
      return (
        <div onClick={onClick}  style={style} className={` bg-green-400 hover:bg-green-500 rounded-full  border shadow-lg hover:shadow-xl flex items-center justify-center text-white cursor-pointer ${className} `}>
          {icon}
        </div>
      )


  }

}