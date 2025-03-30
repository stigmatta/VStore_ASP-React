export default function LabelInput({label}){
    return(
        <div className="flex flex-col">
            <label>{label}</label>
            <input className="bg-gray-formInput rounded-md h-14 w-[46.8125rem] px-3" type="text"></input>
        </div>
    )
}