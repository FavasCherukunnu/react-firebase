



export function ButtonBasic({
    text,
    onClick,
    icon
}) {
  return (
    <button className=' px-3 py-1 font-bold bg-green-500 flex  hover:bg-green-600 text-white rounded shadow-sm' onClick={onClick}>
        {icon&&icon}
        <div>{text}</div>
    </button>
  )
}
