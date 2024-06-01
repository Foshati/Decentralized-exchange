"use client";
import { useState, useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Select from "react-select";
import styles from "./Home.module.css";

export default function Header() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [chainValue, setChainValue] = useState(null);
  let address;

  useEffect(() => {
    Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }, []);

  const valueOptions = [
    { value: "eth", label: "Ethereum" },
    { value: "goerli", label: "Goerli" },
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "#000000",
      backgroundColor: "#ffffff",
    }),
  };

  const changeHandler = (selectedOption) => {
    setChainValue(selectedOption);
  };

  const handleSubmit = async () => {
    address = document.querySelector("#contractAddress").value;
    if (!address) {
      alert("Please provide a valid address.");
      return;
    }

    const chain = chainValue
      ? EvmChain[chainValue.value.toUpperCase()]
      : EvmChain.ETHEREUM;

    try {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address,
        chain,
      });

      setResult(`$ ${response.toJSON().usdPrice}`);
      setShowResult(true);
      setChainValue(null);
      document.querySelector("#contractAddress").value = "";
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please check the address and chain.");
    }
  };

  return (
    <section className={styles.main}>
      <form
        className={styles.getTokenForm}
        name="create-profile-form"
        method="POST"
        action="#"
      >
        <label className={styles.label} htmlFor="contractAddress">
          Add ERC20 Contract Address
        </label>
        <input
          className={styles.contractAddress}
          type="text"
          id="contractAddress"
          name="contractAddress"
          maxLength="120"
          required
        />
        <label className={styles.label} htmlFor="chainSelect">
          Select Chain
        </label>
        <Select
          styles={customStyles}
          options={valueOptions}
          value={chainValue}
          instanceId="chainSelect"
          onChange={changeHandler}
        />
      </form>
      <button className={styles.form_btn} onClick={handleSubmit}>
        Submit
      </button>
      <section className={styles.result}>
        {showResult && (
          <div>
            <img
              src="https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7.png"
              alt="Token"
              className={styles.imgResponsive}
            />
            <p>{result}</p>
          </div>
        )}
      </section>
    </section>
  );
}
