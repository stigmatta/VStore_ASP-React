export default function LabelInput({label,mt,width="90%"}){
    return(
        <div className="flex flex-col min-w-[100%] " style={{marginTop:mt,width:width}}>
            <label>{label}</label>
            <input className="bg-gray-formInput rounded-md h-14 px-3" type="text"></input>
        </div>
    )
}
// ~sm/l:~w-[20em]/[46.8125rem] 