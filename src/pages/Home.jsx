import React from "react";
import { useState, useEffect, useRef } from "react"; 
import { firestore } from "../firebase";
import { addDoc, collection, doc, 
  query, orderBy, onSnapshot
} from "@firebase/firestore";

export default function Home() {
  const reference = collection(firestore, "counts");

  const [currentValue, setCurrentValue] = useState("");

  window.addEventListener( "load", () => {
    fetchCurrentDatum();
  });

  const fetchCurrentDatum = doc(firestore, "counts", "UqUyiscWk2f8Dy8OrJYW");
  // getDoc(fetchCurrentDatum)
  //   .then((doc) => {
  //     console.log(doc.data(), doc.id);
  //     var data = doc.data().count;
  //     setCurrentValue(data);
  // });

  onSnapshot(fetchCurrentDatum, (doc) => {
      // console.log(doc.data(), doc.id);
      var data = doc.data().currentCount;
      setCurrentValue(data);
  });

  const [counter, setCounter] = useState(0);
  // console.log(counter)
  const increment = () => {
    setCounter(count => count + 1);
  };

  const decrement = () => {
    setCounter(count => count - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  let data = {
    currentCount: counter,
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(counter);
    alert("Counter saved")
    try {
      addDoc(reference, data);
    } catch(error) {
      console.log(error);
    }
  };

  

  //https://www.youtube.com/watch?v=7aDG3L-bTS8
  // TODO: getalldata, then try orderby and limit

  return (
    <div>
      
      <h2>Current Value: {currentValue}</h2>
      <h2>Counter Value: {counter}</h2>
      <button onClick={increment}>+</button> <br></br>
      <button onClick={decrement}>-</button> <br></br>
      <button onClick={reset}>Reset</button>
      <form onSubmit={handleSave}>
        <label>Counter:</label>
        <input 
          type="number" 
          value={counter}
          onChange={(e) => setCounter(e.target.value)} /><br></br>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}