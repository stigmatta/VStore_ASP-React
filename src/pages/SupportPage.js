import SupportAccordion from '../components/SupportAccordion'
import Searchbar from "../components/Searchbar";
import GreenButton from "../components/GreenButton";

export default function SupportPage(){
    return(
        <div>
            <h1 className='text-[48px] font-black imd:block sm:hidden mb-4'>Support</h1>
            <Searchbar placeholder="Find help"  width="lg:max-w-[40rem]" border="border-[2px] border-solid border-white"></Searchbar>
            <div className='grid gap-[15px] mt-9'>
            <SupportAccordion title={"Game Problems"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"Refund"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"My account"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"Client"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"Community problems"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"Device problems"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"Gifts"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            <SupportAccordion title={"FAQ"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu nec porttitor tempus, velit risus.</SupportAccordion>
            </div>
            <div className="flex flex-col items-center text-center mt-12">
               <h1 className='text-[40px] font-black mb-6'>Have any other questions?</h1>
               <GreenButton
    text="Contact us on our email!"
    height="5rem"
    fontSize="25px"
    weight='700'
    className="w-full sm:w-full md:w-full lg:w-[30%]"/></div>
 </div>);}