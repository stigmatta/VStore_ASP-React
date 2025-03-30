export default function GrayButton({ text, width, height,flexGrow,opacity,px}) {
    return (
      <button style={{flexGrow:flexGrow, width: width, height: height,paddingInline:px}} className=" bg-gray-light rounded-md text-white hover:bg-gray-lighterInput">
        <span style={{opacity:opacity}}>{text}</span>
      </button>
    );
  }
  