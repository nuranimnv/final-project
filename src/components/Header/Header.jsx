import React, { useState, useEffect, useContext } from 'react';
import { Disclosure, DisclosureButton, Menu, MenuButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { RiShoppingBagLine } from 'react-icons/ri';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import Cart from '../Cart'
import "../../index.css"
import { Context } from '../../context/ContextProvider';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header({ bgcolor, color, title, onClick }) {
    const [basket, setBasket] = useContext(Context)
    let [data, setData] = useState("")
    const [isFixed, setIsFixed] = useState(false);
    let [click, setClick] = useState(false)
    let [show, setShow] = useState([])
    let [link, setLink] = useState("")
    let [order, setOrder] = useState(0)
    let [opens, setOpens] = useState("none")
    let [showHeader, setShowHeader] = useState({})
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let file = "/data.json"

        fetch(file).then(res => res.json()).then(res => {
            data = res;
            setData(res)
        })

        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.onscroll = handleScroll;
        let order = 0
        basket.map(item => (
            order += item.count
        )
        )
        setOrder(order)
    }, [basket]);

    const handleClick = () => {
        setClick(!click)
    }

    const togglePopup = () => {
        setIsVisible(!isVisible);
    };

    const searchBox = (e) => {
        let searchs = data?.shop?.filter(item => {
            return (
                item.collections?.find(collection => collection.toLowerCase().includes(e.target.value.toLowerCase())) ||
                item.flavors?.find(flavor => flavor.toLowerCase().includes(e.target.value.toLowerCase())) ||
                item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.type.toLowerCase().includes(e.target.value.toLowerCase())
            )
        });

        setShow(searchs.length > 3 ? searchs.slice(0, 3) : searchs)
    };

    const shows = (e) => {
        setLink(e.target.innerText.toLowerCase().split(" ").join("-"));
    }

    useEffect(() => {
        basket && localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])
    const openCart = () => {
        setOpens(!opens)
    }

    const handleOpen = (e) => {
        let target = e.currentTarget.innerText;
        setShowHeader((prev) => ({
            ...prev,
            [target]: !prev[target]
        }));
    }

    return (
        <Disclosure as="nav" className={`duration-300  ${!opens ? "z-50" : "z-40"} ${isFixed ? `fixed py-3 max-lg:py-0 top-0 left-0 w-full   bg-white shadow-md ` : click ? "bg-white   absolute w-full" : 'bg-transparent absolute mt-[12px] w-full top-3 z-50'}`}>
            {({ open }) => (
                <>
                    <div style={{ display: opens }} >
                        <Cart open={opens} setOpen={setOpens} />
                    </div>
                    <div className={`bg-white max-lg:hidden fixed top-0 w-full h-[auto] z-30 shadow-lg rounded-br-[100px] ${isVisible ? 'popup-visible' : 'popup-hidden'}`}>
                        <div className="p-10 mx-auto   justify-center  max-w-[650px]  max-lg:mt-20">
                            <div className="font-sofia">
                                <input onInput={searchBox} type="text" className=' w-full py-2 rounded-full  border-2 border-[#613223] pl-5 placeholder:text-[#CFC1BC]' placeholder='what are you looking for?' />
                                <h2 className='text-[12px] mt-5'>Popular Search Terms</h2>
                                <div className="mt-5">
                                    {show.map((item, i) => {
                                        return (
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center">
                                                    <img src={`${item.img}`} className="h-[40px]" alt="" />
                                                    <NavLink
                                                        onClick={shows}
                                                        to={item.link ? `/shop/product/${item.link}` : '/shop'}  // Eğer link yoksa ana sayfaya yönlendir
                                                        className="ml-2 font-bold capitalize"
                                                    >
                                                        {item.name.split("-").join(" ")}
                                                    </NavLink>
                                                </div>
                                                <p>Product</p>
                                            </div>
                                        );
                                        
                                    })}

                                </div>
                            </div>

                        </div>
                        <div className="absolute right-0 top-0 p-7  w-max "><IoIosClose onClick={togglePopup} className='bg-[#CFC1BC] rounded-full text-[#613223] cursor-pointer' strokeWidth={2} size={32} /></div>
                    </div>
                    <div className="mx-auto py-4 px-2 lg:px-8 ">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                                <DisclosureButton onClick={handleClick} className="relative rounded-full inline-flex items-center justify-center bg-[#613223] p-2 text-white ">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-9 w-9" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon strokeWidth={2} className="block h-9 w-9" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex  flex-1 items-center justify-center lg:items-stretch lg:justify-between ">
                                {!click ?
                                    <NavLink to={"/"} className="flex flex-shrink-0 items-center gap-2 z-30">
                                        <img
                                            className='w-[200px] max-[1492px]:w-[170px] max-[1200px]:w-[150px] max-md:w-[135px]'
                                            src="/assets/img/logo.svg"
                                            alt="Your Company"
                                        />
                                    </NavLink>
                                    : <div className='flex gap-x-4'>
                                        <div className=" p-3 rounded-full bg-[#EDF0F7] ">
                                            <FaSearch onClick={togglePopup} size={25} className='cursor-pointer' />
                                        </div>
                                        <div className="p-3 rounded-full bg-[#EDF0F7]">
                                            <NavLink to={"/my-account"}><GoPerson onClick={onClick} strokeWidth={2} className='' size={28} /></NavLink>
                                        </div>

                                    </div>

                                }

                                <div className="flex flex-col ">
                                    <div className={`${isFixed ? "hidden" : ''} flex justify-end gap-x-3 mt-4 mb-1 max-lg:hidden text-[${title}]`}>
                                        <p className='border-r-2 font-sofia border-gray-600 px-3 hover:underline'><NavLink to={"/fundraising/"}>Fundraising </NavLink> </p>
                                        <p className='font-sofia hover:underline'><NavLink to={"/corporate-gifts/"}> Corporate Gifting</NavLink></p>
                                    </div>
                                    <div className={`${isFixed ? `mt-5 text-[#613223]` : `text-[${title}] `} flex items-center `}>
                                        <div className="hidden lg:ml-6 lg:block">
                                            <div className="flex items-center">
                                                <div className={`flex items-center  text-[20px] max-[1492px]:text-[16px] max-[1250px]:text-[14px] font-bold gap-8 max-[1500px]:gap-2 `}>
                                                    <div className="#link1 ">
                                                        <NavLink to={"/create-your-own/"} className=" uppercase create pb-[5px]">Create your own
                                                        </NavLink>
                                                    </div>
                                                    <div className="#link2 create explore relative ">
                                                        <NavLink to={"/shop/"} className='relative '>
                                                            <div className="flex items-center uppercase gap-x-2">Shop popcorn <FaAngleDown className={`${isFixed ? "text-[#e22733]" : ``}`} /></div>
                                                        </NavLink>

                                                        <div className='explore-content relative  z-50'>
                                                            <div style={{ borderRadius: "0 50px 0 50px" }} className="flex shadow-xl absolute translate-x-[-25%] max-[1492px]:translate-x-[-40%] mr-3 p-8 w-[980px] max-[1350px]:w-[910px] h-[360px] mt-[2px] z-50 text-[#613223] bg-white">
                                                                <div className="1 border-r border-[#E22733] z-50 pr-10 font-sofia font-bold">
                                                                    <h3 className='text-[#E22733] text-[11px]'>FLAVORS.</h3>
                                                                    <div className="grid grid-cols-2 gap-2 gap-x-12  mt-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <img className='w-[40px] h-[40px]' src="/assets/img/Header1.webp" alt="" />
                                                                            <p className='text-[15px] hover:text-[#E22733] hover:underline duration-300 group '><NavLink to={'/shop/product-flavor/chocolate/'} className="flex items-center relative"> <span> Chocolate</span> <span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <img className='w-[40px] h-[40px]' src="/assets/img/Header2.webp" alt="" />
                                                                            <p className='text-[15px] hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product-flavor/caramel/"} className="flex items-center relative" ><span>Caramel</span><span className='invisible absolute group-hover:visible  right-[-10px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <img className='w-[40px] h-[40px]' src="/assets/img/Header3.webp" alt="" />
                                                                            <p className='text-[15px] hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product-flavor/kettle/"} className="flex items-center relative" ><span>Kettle</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <img className='w-[40px] h-[40px]' src="/assets/img/Header4.webp" alt="" />
                                                                            <p className='text-[15px] hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product-flavor/cheese/"} className="flex items-center relative" ><span>Cheese</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <img className='w-[40px] h-[40px]' src="/assets/img/Header5.webp" alt="" />
                                                                            <p className='text-[15px] hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product-flavor/sweet/"} className="flex items-center relative" ><span>Sweet</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <img className='w-[40px] h-[40px]' src="/assets/img/Header6.webp" alt="" />
                                                                            <p className='text-[15px] hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product/spicy/"} className="flex items-center relative"><span>Spicy</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                    </div>
                                                                    <NavLink to={"/popcorn-flavors/"}>
                                                                        <button className='flex items-center gap-4 rounded-full mt-14 bg-[#FED455]  hover:bg-[#ffa400] duration-300 py-4 px-8 hovers text-[16px]'><NavLink to={"/popcorn-flavors/"}>All Flavors</NavLink><FaArrowRightLong className='hover_right' /></button>
                                                                    </NavLink>
                                                                </div>
                                                                <div className="2 ml-10  flex font-sofia ">
                                                                    <div className="2-1">
                                                                        <h3 className='text-[#E22733] text-[11px]'>TYPES.</h3>
                                                                        <div className="text-[#613233] text-[15px] mt-4 ">
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 relative group'><NavLink to={"/shop/product-flavor/cones/"} className="relative"><span>Cones</span> <span className='invisible absolute group-hover:visible top-1 right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 relative group'><NavLink to={"/shop/product-flavor/tins/"} className="relative"><span>Tins</span> <span className='invisible absolute group-hover:visible top-1 right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 relative group'><NavLink to={"/shop/product-flavor/gift-baskets/"} className="relative"><span>Gift Baskets</span> <span className='invisible absolute group-hover:visible top-1 right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span> </NavLink> </p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 relative group'><NavLink to={"/shop/product-flavor/bags/"} className="relative"><span>Bags</span> <span className='invisible absolute group-hover:visible top-1 right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                        <NavLink to={"/shop"}>
                                                                            <button className='flex items-center gap-4 rounded-full mt-[70px] bg-[#FED455] hover:bg-[#ffa400] duration-300 min-w-[150px]  py-4 pl-8 px-10 max-[1400px]:px-7 hovers font-sofia  text-[16px]'>Shop All <FaArrowRightLong className='hover_right' /></button>
                                                                        </NavLink>
                                                                    </div>
                                                                    <div className="2-2 font-sofia font-bold">
                                                                        <h3 className='text-[#E22733] text-[11px]'>COLLECTIONS.</h3>
                                                                        <div className="text-[#613233] text-[15px] mt-4 ">
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product-flavor/nearly-naked"} className="flex items-center relative"><span>Nearly Naked</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[10px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/zebra"} className="flex items-center relative"><span>Zebra® Popcorn</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-10px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/product/popcornopolis®-takis-fuego®-tall-cone"} className="flex items-center relative"><span>Takis Fuego®</span><span className='invisible absolute group-hover:visible  right-[-20px] group-hover:right-[10px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink> </p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/bagged-popcorn/double-drizzle-popcorn-bag/"} className="flex items-center relative"><span>Double Drizzle</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[5px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300 group'><NavLink to={"/shop/unicorn-popcorn®"} className="flex items-center relative"><span>Unicorn Popcorn®</span><span className='invisible absolute group-hover:visible  right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink></p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="2-3 ml-16 max-xl:ml-10 relative">
                                                                        <div className="relative w-[190px] h-[190px] ">
                                                                            <div className="hover:opacity-80 duration-300">
                                                                                <img className="w-full h-full object-cover rounded-br-[25px]  opacity-80  rounded-tl-[25px]" src="/assets/img/350x350_Nav_Nearly_Naked.webp" alt="Best Sellers" />
                                                                                <div className="relative bottom-9 bg-gradient-to-t hover:underline hover:text-[#e22733] duration-300 from-white to-transparent text-[#613223] text-center p-2 rounded-br-[25px] rounded-tl-[25px]">
                                                                                    <NavLink to={"/shop/best-sellers"} className="font-sofia text-[17px] opacity-100 group relative"><span>Best Sellers</span><span className='invisible absolute group-hover:visible top-[5px] right-[-15px] group-hover:right-[-20px] duration-200 text-[#e22733]'><FaArrowRightLong /></span></NavLink>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="#link3 create explore">
                                                        <NavLink to={"/shop/gifts"} href='#' className='relative '>
                                                            <div className="flex items-center uppercase gap-x-2">
                                                                Shop by occasion
                                                                <FaAngleDown className={`${isFixed ? "text-[#e22733]" : ''}`} />
                                                            </div>
                                                        </NavLink>
                                                        <div style={{ borderRadius: "0 50px 0 50px", }} className="absolute explore-content max-[1492px]:w-[220px] shadow-xl font-sofia font-bold text-[#613223] bg-white capitalize p-10 pr-14 mt-1 z-30 text-[15px] duration-300 ">
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/gifts"}>gifts</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/snacking"}>snacking</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/movie-night"}>movie night</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/family-favorites"}>family favorites</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/party-time/"}>party time</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/delicious-deals"}>deals</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/new-arrivals"}>new arrivals</NavLink></p>
                                                            <p className='mb-2 hover:text-[#E22733] hover:underline duration-300'><NavLink to={"/shop/best-sellers"}>best sellers</NavLink></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                                            <div className={`flex items-center max-lg:hidden `}>
                                                <FaSearch onClick={togglePopup} size={22} className=' mx-4 cursor-pointer' />

                                                <NavLink to={"/my-account/"}><GoPerson onClick={onClick} strokeWidth={2} className='mx-4' size={25} /></NavLink>
                                            </div>
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <MenuButton className="relative flex rounded-full   text-sm  focus:ring-offset-2 ">
                                                        <div>
                                                            {!click ?
                                                                <div onClick={openCart} style={{ backgroundColor: bgcolor, color: color }} className={`outline-none inline-block w-[55px] h-[55px] px-[12px]   relative  rounded-full text-xs font-medium uppercase leading-normal `}>
                                                                    <div>
                                                                        <RiShoppingBagLine strokeWidth={1.2} size={25} className='mt-[13px] outline-none ml-[2px] ' />
                                                                        <p className="ms-3 bg-[#613223] rounded-full px-[3px] font-sofia font-bold relative bottom-[12px]  text-white">{order}</p>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div onClick={openCart} className={` inline-block px-[14px] bg-[#fed455] outline-none text-[#613223] relative p-1 rounded-full text-xs font-medium uppercase leading-normal `}>
                                                                    <div >
                                                                        <RiShoppingBagLine strokeWidth={1.2} size={25} className='mt-[10px] outline-none ml-[2px]' />
                                                                        <p className="ms-3 bg-[#613223] rounded-full px-[5px] relative bottom-[12px] text-white">{order}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </MenuButton>
                                                </div>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </Disclosure >
    );
}
