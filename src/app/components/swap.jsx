"use client";
import React, { useState } from "react";
import tokenList from "./tokenList.json";
import { ArrowDownUp } from "lucide-react";
import Image from "next/image";

export default function Swap() {
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");

  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[2]);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    setChangeToken(changeToken === 1 ? 2 : 1);
  }

  function modifyToken(i) {
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    closeModal();
  }

  function openModal() {
    document.getElementById("my_modal_3").showModal();
  }

  function closeModal() {
    document.getElementById("my_modal_3").close();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md card bg-[#18191B]">
        <div className="card-body">
          {/* input 1 */}
          <div className="relative">
            <input
              onChange={changeAmount}
              value={tokenOneAmount}
              type="text"
              placeholder="0"
              className="w-full input input-bordered"
            />
            <button
              className="absolute top-0 right-0 btn w-28"
              onClick={openModal}
            >
              {/* Image button */}
              <div className="flex items-center">
                <Image
                  src={tokenOne.img}
                  alt={tokenOne.ticker}
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                <span>{tokenOne.ticker}</span>
              </div>
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button
                    className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </form>
                <h3 className="text-lg font-bold">Select token</h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Ticker</th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                      {tokenList?.map((e, i) => (
                        <tr
                          key={i}
                          className="cursor-pointer hover:bg-base-200"
                          onClick={() => modifyToken(i)}
                        >
                          <th>{i + 1}</th>
                          <td>
                            <Image
                              src={e.img}
                              alt={e.ticker}
                              className="object-cover w-16 h-16"
                              width={100}
                              height={100}
                            />
                          </td>
                          <td>{e.name}</td>
                          <td>{e.ticker}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </dialog>
          </div>
          <div
            className="my-4 text-center cursor-pointer"
            onClick={switchTokens}
          >
            <ArrowDownUp />
          </div>

          {/* input 2 */}
          <div className="relative">
            <input
              value={tokenTwoAmount}
              type="text"
              placeholder="0"
              className="w-full input input-bordered"
              disabled={true}
            />
            <button
              className="absolute top-0 right-0 btn w-28"
              onClick={openModal}
            >
              {/* Image button */}
              <div className="flex items-center">
                <Image
                  src={tokenTwo.img}
                  alt={tokenTwo.ticker}
                  width={24}
                  height={24}
                  className="h-6 mr-2 w-7"
                />
                <span className="truncate">{tokenTwo.ticker}</span>
              </div>
            </button>
          </div>
          <div className="btn btn-active" disabled={!tokenOneAmount}>
            Swap
          </div>
        </div>
      </div>
    </div>
  );
}
