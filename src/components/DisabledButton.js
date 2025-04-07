export default function DisabledButton({title,width,height})
{
    return (
        <button className="bg-gray-formInput font-extrabold text-text text-gray" style={{width:width,height:height}}>{title}</button>
    )
}
