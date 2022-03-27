import React, { useEffect, useState } from 'react'
import { DownArrow } from '../assets/icon';
import ModalLayout from '../modal/modal'

export default function CreateBucketModal({ modalstate, setModalstate }) {
    const [currencyDropDown, setCurrencyDropDown] = useState(false);
    const [currencies, setCurrencies] = useState([
        "C1", "C2", "C3", "C4"
    ])
    const [checkSum, setCheckSum] = useState(0);
    const [activateButton, setActivateButton] = useState(false);
    const [bucketData, setBucketData] = useState({
        name: "",
        desc: "",
        type: "",
        image: "",
    })
    const [finCurr, setFinCurr] = useState([]);
    const handleCurr = (curr) => {
        setCurrencies(currencies.filter((currancy) => currancy != curr));
        setFinCurr([...finCurr, { "curr": curr, per: 0 }]);
    }

    const handlePerChange = (curr, val) => {
        setFinCurr(finCurr.map((cur) => {
            if (cur.curr === curr) {
                if(val==""){
                    // setCheckSum(parseInt(checkSum, 10)-parseInt(cur.per,10));
                    // return cur
                }
                else{
                    console.log(checkSum,val,parseInt(checkSum,10),parseInt(val,10));
                    setCheckSum(parseInt(checkSum, 10)-parseInt(cur.per,10)+parseInt(val, 10));
                }
                return { "curr": curr, per: val };
            }
            else {
                return cur;
            }
        }))
    }
    useEffect(() => {
        if (
            bucketData.name != "" &&
            bucketData.desc != "" &&
            bucketData.type != "" &&
            bucketData.image != ""
        ) {
            setActivateButton(true);
        } else {
            setActivateButton(false);
        }
    }, [bucketData]);
    

    const handleChange = (name, value) => {
        setBucketData({ ...bucketData, [name]: value });
    }
    console.log(bucketData, checkSum);

    return (
        <ModalLayout modalstate={modalstate} setModalstate={setModalstate}>
            <div>
                <div className='p-10'>
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="font-bold text-xl">Add Bucket</div>
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setModalstate();
                                }}
                            >
                                <h1 className='font-bold cursor-pointer'>X</h1>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h1 className='text-xl mb-2'>Bucket Name</h1>
                            </div>
                            <input
                                type="text"
                                value={bucketData.name}
                                className='w-full p-3 outline-none bg-transparent rounded-lg'
                                style={{ border: "1px solid #7AC231" }}
                                name="name"
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder='Bucket name'

                            />
                        </div>

                        <div>
                            <div>
                                <h1 className='text-xl mb-2 mt-4'>Description</h1>
                            </div>
                            <textarea
                                type="text"
                                value={bucketData.desc}
                                className='w-full p-3 outline-none bg-transparent rounded-lg'
                                style={{ border: "1px solid #7AC231" }}
                                name="description"
                                onChange={(e) => handleChange("desc", e.target.value)}
                                placeholder='Bucket name'

                            />
                        </div>


                        <div>
                            <div>
                                <h1 className='text-xl mb-2 mt-4'>Type</h1>
                            </div>
                            <input
                                type="text"
                                value={bucketData.type}
                                className='w-full p-3 outline-none bg-transparent rounded-lg'
                                style={{ border: "1px solid #7AC231" }}
                                name="type"
                                onChange={(e) => handleChange("type", e.target.value)}
                                placeholder='Bucket name'

                            />
                        </div>

                        <div>
                            <div>
                                <h1 className='text-xl mb-2 mt-4'>Image</h1>
                            </div>
                            <input
                                type="file"
                                className='bg-transparent'
                                onChange={(e) => handleChange("image", e.target.value)}
                            />
                        </div>



                        <div className="mt-7 " onMouseLeave={() => setCurrencyDropDown(false)}>
                            <h1 className="font-semibold"></h1>
                            {/* Normal select box */}
                            <div
                                className="mt-3 cursor-pointer relative"
                                onClick={() => setCurrencyDropDown(!currencyDropDown)}
                            >
                                <div
                                    className="flex justify-between p-3 textInput font-normal text-base rounded-lg text-white"
                                    style={{ border: "2px solid #7AC231" }}
                                >
                                    <p>{"Select" || currencies[0]}</p>
                                    <DownArrow />
                                </div>

                                <div className='relative'>

                                    <div className="absolute w-full" style={{ backgroundColor: "#1D2024" }}>
                                        {currencyDropDown && (
                                            <div>
                                                <ul>
                                                    {currencies.map((option, key) => (
                                                        <li
                                                            className="font-normal w-full text-base cursor-pointer flex items-center hoverSelectOption "
                                                            key={key}
                                                            value={key}
                                                            onClick={() => {
                                                                setCurrencyDropDown(false);
                                                                handleCurr(option);
                                                            }}
                                                        >
                                                            <div className="flex justify-between px-2 py-2">
                                                                {option}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='mt-6'>
                                {finCurr.map((cur) => {
                                    return (
                                        <div>
                                            <div className='flex justify-between items-center mt-3'>
                                                <p>{cur.curr}</p>
                                                <input
                                                    type="Number"
                                                    value={cur.per}
                                                    className='w-1/2 p-3 outline-none bg-transparent rounded-lg text-white'
                                                    style={{ border: "1px solid #7AC231" }}
                                                    name={cur.curr}
                                                    min={0}
                                                    onChange={(e) => handlePerChange(cur.curr, e.target.value)}

                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    {activateButton ?
                        <button className='mt-4 cursor-pointer p-3 text-white rounded-md hov-dark'>
                            Create
                        </button>
                        :
                        <button className='mt-4 cursor-pointer p-3 text-white rounded-md deactivate'>
                            Create
                        </button>

                    }
                </div>
                <div>
                </div>
            </div>
        </ModalLayout>
    )
}
