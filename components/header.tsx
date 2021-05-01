import Image from 'next/image';

const Header = ({ menuRef }) => {
    return (
        <div className='w-full py-8 fixed top-0 2xl:container mx-auto xl:px-20 md:px-12 px-4'>
            <div className="relative flex justify-between">
                <a href="#home" className="flex gap-3 items-center">
                    <Image src="/logo.svg" alt="Logo - Ayush Singh" width={15} height={15} />
                    <span className="font-bold uppercase tracking-wide">AYUSH SINGH</span>
                </a>
                <div className="outer-menu">
                    <input className="checkbox-toggle link" type="checkbox" />
                    <div className="hamburger">
                        <div></div>
                    </div>
                    {menuRef}
                </div>
            </div>
        </div>
    )
}

export default Header;