import React from "react";
import { useState, useEffect, useRef } from "react"; 
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

export default function Home() {
  const [inputValue, setInputValue] = useState(0);
  const previousInputValue = useRef(0);
  const reference = collection(firestore, "counts");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  let data = {
    count: inputValue,
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    try {
      addDoc(reference, data);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Enter Count:</label>
        <input 
          type="number" 
          value={inputValue}
          onChange={ (e) => setInputValue(e.target.value)} />
        <button type="submit">Save</button>

        <h2>Current Value: {inputValue}</h2>
        <h2>Previous Value: {previousInputValue.current}</h2>
      </form>
    </div>
  )
}