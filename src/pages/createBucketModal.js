import React, { useState } from 'react'
import { DownArrow } from '../assets/icon';
import ModalLayout from '../modal/modal'

export default function CreateBucketModal({ modalstate, setModalstate }) {
    const [currencyDropDown, setCurrencyDropDown] = useState(false);
    const [currencies, setCurrencies] = useState([
        "C1","C2", "C3", "C4"
    ])
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
                                <div className="selectBoxOptionContainer">
                                    {currencyDropDown && (
                                        <div>
                                            <ul>
                                                {currencies.map((option, key) => (
                                                    <li
                                                        className="font-normal text-base cursor-pointer flex items-center hoverSelectOption"
                                                        key={key}
                                                        value={key}
                                                        onClick={() => {
                                                            setCurrencyDropDown(false);
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
                </div>
            </div>
        </ModalLayout>
    )
}
