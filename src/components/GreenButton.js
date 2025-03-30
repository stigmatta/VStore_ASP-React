export default function GreenButton({ text, px, height,weight,size }) {
    return (
      <button style={{fontWeight:weight,fontSize:size, paddingInline: px, height: height }} className="w-fit flex justify-center items-center bg-green rounded-md text-gray hover:bg-green-lighter">
        {text}
      </button>
    );
}
  