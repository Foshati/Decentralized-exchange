"use client";

import React from "react";
import tokenList from "./tokenList.json";
import { useState } from "react";

export default function Swap() {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div class="card bg-base-200 w-2/5 ">
        <div class="card-body">
          <div className="relative">
            <input
              type="text"
              placeholder="0"
              className="w-full input input-bordered"
            />
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="absolute top-0 right-0 btn w-28"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <div className="flex items-center ">
                <img src={tokenOne.img} className="w-6 h-6 mr-2" />
                <span> {tokenOne.ticker}</span>
              </div>
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="text-lg font-bold">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click on ✕ button to close
                </p>
              </div>
            </dialog>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="0"
              className="w-full input input-bordered"
            />
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="absolute top-0 right-0 btn w-28"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <div className="flex items-center">
                <img src={tokenTwo.img} className="h-6 mr-2 w-7" />
                <span className="truncate"> {tokenTwo.ticker}</span>
              </div>
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="text-lg font-bold">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click on ✕ button to close
                </p>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
