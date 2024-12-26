import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header/Header';
import Cones from './ShopPopcorn/Cones';
import Footer from './Footer/Footer';

function Sweet() {
    const { name } = useParams();
    const [data, setData] = useState({
        title: '',
        font: '',
        backgroundColor: '',
        titlecolor: '',
        fontcolor: '',
        subtitle: '',
        img: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/shop.json');
                const result = await response.json();
                setData(result[name] || {});
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [name]);

    const parts = data.title.includes(data.font)
        ? data.title.split(data.font)
        : [data.title, ''];

    const bgcolor = '#E22733';
    const color = 'white';
    const title = '#613223';

    return (
        <div className="bg-beigess">
            <span className="max-md:bg-[#E22733]" />
            <span className="max-md:bg-[#84C4EC]" />
            <span className="max-md:bg-[#E7730D]" />
            <span className="max-md:bg-[#006838]" />
            <div>
                <Header bgcolor={bgcolor} color={color} title={title} />
                <div style={{ backgroundColor: data.backgroundColor }}>
                    <div className="px-[30px] max-w-[1180px] md:pt-52 pt-16 mx-auto duration-300">
                        <div
                            style={{ background: data.backgroundColor }}
                            className="flex justify-between text-white max-md:text-center leading-[0.9] max-md:leading-[1.2] rounded-tl-[120px] rounded-br-[100px] duration-300"
                        >
                            <div className="md:pl-20 md:mr-16 max-md:w-full pt-14 max-lg:w-[70%]">
                                <p
                                    style={{ color: data.titlecolor }}
                                    className="text-[19px] max-lg:text-[17px] mb-5"
                                >
                                    {data.subtitle}
                                </p>
                                <div>
                                    <span
                                        style={{ color: data.titlecolor }}
                                        className="text-[60px] max-[1200px]:text-[50px] max-lg:text-[45px] max-md:text-[33px] inline"
                                    >
                                        {parts[0]}
                                    </span>
                                    <span
                                        style={{ color: data.fontcolor }}
                                        className="text-[90px] max-[1200px]:text-[60px] max-lg:text-[55px] max-md:text-[39px] font-turbinado"
                                    >
                                        {data.font}
                                    </span>
                                    <span
                                        style={{ color: data.titlecolor }}
                                        className="text-[60px] max-[1200px]:text-[50px] max-lg:text-[45px] max-md:text-[33px] inline"
                                    >
                                        {parts[1]}.
                                    </span>
                                </div>
                            </div>
                            <div className="inline max-md:hidden relative bottom-4 max-md:top-2">
                                <img
                                    className="object-cover min-h-[300px] rounded-tl-[120px] float-right rounded-br-[120px] ml-10"
                                    src={data.img}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="hidden max-md:block relative top-2">
                            <img
                                className="max-h-[179px] w-full object-cover rounded-tl-[80px] rounded-br-[80px]"
                                src={data.img}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <Cones pathName={name} />
                <Footer />
            </div>
        </div>
    );
}

export default Sweet;
