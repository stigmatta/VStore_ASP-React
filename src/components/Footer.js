import VLogo from "./VLogo";

export default function Footer(){
    return(
        <footer className="flex absolute bottom-0 h-fit w-full ~py-5/8 ~px-5/80 mt-16 bg-gray-footer bg-footer-gradient bg-blend-overlay">
            <div className= "flex w-full flex-col gap-10">
                <div name="first-row" className="flex w-full justify-between">
                    <div className="flex gap-6 items-center h-fit">
                        <svg className="hoverSvg" name="facebookImg" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M38.25 19.4375C38.25 9.0875 29.85 0.6875 19.5 0.6875C9.15 0.6875 0.75 9.0875 0.75 19.4375C0.75 28.5125 7.2 36.0687 15.75 37.8125V25.0625H12V19.4375H15.75V14.75C15.75 11.1312 18.6938 8.1875 22.3125 8.1875H27V13.8125H23.25C22.2188 13.8125 21.375 14.6562 21.375 15.6875V19.4375H27V25.0625H21.375V38.0938C30.8438 37.1562 38.25 29.1687 38.25 19.4375Z" fill="#EEEEEE"/>
                        </svg>
                        <svg className="hoverSvg" name="twitterImg" width="41" height="33" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.1117 4.1875C38.668 4.84375 37.1117 5.275 35.4992 5.48125C37.1492 4.4875 38.4242 2.9125 39.0242 1.01875C37.468 1.95625 35.743 2.6125 33.9242 2.9875C32.443 1.375 30.3617 0.4375 27.9992 0.4375C23.593 0.4375 19.993 4.0375 19.993 8.48125C19.993 9.11875 20.068 9.7375 20.1992 10.3188C13.5242 9.98125 7.58047 6.775 3.62422 1.91875C2.93047 3.1 2.53672 4.4875 2.53672 5.95C2.53672 8.74375 3.94297 11.2187 6.11797 12.625C4.78672 12.625 3.54922 12.25 2.46172 11.6875V11.7437C2.46172 15.6437 5.23672 18.9062 8.91172 19.6375C7.73204 19.9618 6.49304 20.0067 5.29297 19.7687C5.80223 21.3671 6.7996 22.7658 8.14487 23.768C9.49015 24.7702 11.1157 25.3257 12.793 25.3563C9.94985 27.6072 6.42549 28.8239 2.79922 28.8062C2.16172 28.8062 1.52422 28.7687 0.886719 28.6937C4.44922 30.9812 8.68672 32.3125 13.2242 32.3125C27.9992 32.3125 36.118 20.05 36.118 9.41875C36.118 9.0625 36.118 8.725 36.0992 8.36875C37.6742 7.24375 39.0242 5.81875 40.1117 4.1875Z" fill="#EEEEEE"/>
                        </svg>
                        <svg className="hoverSvg" name="youtubeImg" width="39" height="27" viewBox="0 0 39 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.75 19.0625L25.4812 13.4375L15.75 7.8125V19.0625ZM37.425 4.38125C37.6688 5.2625 37.8375 6.44375 37.95 7.94375C38.0812 9.44375 38.1375 10.7375 38.1375 11.8625L38.25 13.4375C38.25 17.5437 37.95 20.5625 37.425 22.4937C36.9562 24.1812 35.8688 25.2687 34.1813 25.7375C33.3 25.9812 31.6875 26.15 29.2125 26.2625C26.775 26.3937 24.5438 26.45 22.4813 26.45L19.5 26.5625C11.6438 26.5625 6.75 26.2625 4.81875 25.7375C3.13125 25.2687 2.04375 24.1812 1.575 22.4937C1.33125 21.6125 1.1625 20.4312 1.05 18.9312C0.91875 17.4312 0.8625 16.1375 0.8625 15.0125L0.75 13.4375C0.75 9.33125 1.05 6.3125 1.575 4.38125C2.04375 2.69375 3.13125 1.60625 4.81875 1.1375C5.7 0.89375 7.3125 0.725 9.7875 0.6125C12.225 0.48125 14.4562 0.425 16.5187 0.425L19.5 0.3125C27.3563 0.3125 32.25 0.6125 34.1813 1.1375C35.8688 1.60625 36.9562 2.69375 37.425 4.38125Z" fill="#EEEEEE"/>
                        </svg>
                    </div>
                    <a href="to_top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <svg className="hoverSvg" name="toUpImg" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="1.4375" width="35" height="34" rx="2.5" stroke="#EEEEEE"/>
                            <path d="M11 22.4375L18 14.4375L25 22.4375" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>

                </div>

                <div name="second-row" className="flex w-full justify-between">
                    <p className="font-medium text-text/5 w-5/6 md:w-2/3  opacity-80">© 2025 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                        <br/>
                        VAT included in all prices where applicable
                    </p>
                    <VLogo width={39} height={39}/>
                </div>

                <div name = "third-row" className="flex gap-6 flex-wrap">
                    <p>Terms of service</p>
                    <p>Jobs</p>
                    <p>Rules</p>
                    <p>Contracts</p>
                    <p>Gift cards</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                </div>
            </div>

        </footer>
    )
}