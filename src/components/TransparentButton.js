export default function TransparentButton({title,radius}) {

    return (
        <button
            style={{borderRadius:radius}}
          className="h-fit opacity-70 px-[10px] py-[8px] border-solid border-2 border-gray-lightest transition-all duration-200
                     hover:opacity-100"
        >
            {title}
        </button>
    )
}