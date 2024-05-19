"use client";
import React, { useState } from "react";
import tokenList from "./tokenList.json";
import { ArrowDownUp } from "lucide-react";

export default function Swap() {
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");

  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[2]);
  const [changeToken, setChangeToken] = useState(1);

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
    setChangeToken(changeToken === 1 ? 2 : 1); // تغییر مقدار changeToken
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
      <div className="w-2/5 card bg-base-200">
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
              <div className="flex items-center">
                <img src={tokenOne.img} className="w-6 h-6 mr-2" />
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
                <div className="">
                  {tokenList?.map((e, i) => {
                    return (
                      <div className="" key={i} onClick={() => modifyToken(i)}>
                        <img src={e.img} alt={e.ticker} className="" />
                        <div className="">
                          <div className="">{e.name}</div>
                          <div className="">{e.ticker}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </dialog>
          </div>
          <div onClick={switchTokens}>
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
              <div className="flex items-center">
                <img src={tokenTwo.img} className="h-6 mr-2 w-7" />
                <span className="truncate">{tokenTwo.ticker}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
