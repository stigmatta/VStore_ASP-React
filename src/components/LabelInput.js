export default function LabelInput({label,mt}){
    return(
        <div className="flex flex-col min-w-[90%] " style={{marginTop:mt}}>
            <label>{label}</label>
            <input className="bg-gray-formInput rounded-md h-14 px-3" type="text"></input>
        </div>
    )
}
// ~sm/l:~w-[20em]/[46.8125rem] 