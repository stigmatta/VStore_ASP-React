export  default  function GreenButton ({width,height,text}) {
    return (
        <button className="text-gray rounded bg-green hover:bg-green-lighter" style={{width:width,height:height}}>{text}</button>
    )
}