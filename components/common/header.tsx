import Image from 'next/image';

const Header = ({ children }) => {
    return (
        <div className='w-full py-8 fixed top-0 2xl:container mx-auto xl:px-20 md:px-12 px-4'>
            <div className='relative flex justify-between'>
                <a href='#home' className='flex gap-3 items-center link'>
                    <Image src='/logo.svg' alt='Logo - Ayush Singh' width={15} height={15} />
                    <span className='font-bold uppercase tracking-wide'>AYUSH SINGH</span>
                </a>
                <div className='outer-menu'>
                    <input className='checkbox-toggle link absolute top-0 right-0 w-6 h-6 opacity-0' type='checkbox' />
                    <div className='hamburger absolute top-0 right-0 w-6 h-6 flex items-center justify-center'>
                        <div className='relative flex-none w-full bg-white duration-300 flex items-center justify-center'></div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Header;