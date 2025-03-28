import { Link } from "react-router-dom";

export default function HeaderDropdown(){
    return(
        <div class="relative inline-block text-left">
            <div class="absolute -right-3 z-10 mt-4 w-fit origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                    <Link to = "/Main">
                        <a href="#" class="block px-4 py-2 text-sm text-gray" role="menuitem" tabindex="-1" id="menu-item-0">Discover</a>
                    </Link>
                    <Link to = "/Support">
                        <a href="#" class="block px-4 py-2 text-sm text-gray" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                    </Link>
                    <Link to = "/News">
                        <a href="#" class="block px-4 py-2 text-sm text-gray" role="menuitem" tabindex="-1" id="menu-item-2">News</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}