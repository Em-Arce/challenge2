import React from "react";
import { useState, useEffect, useRef } from "react"; 
import { firestore } from "../firebase";
import { doc, onSnapshot } from "@firebase/firestore";

export default function Home() {
  // const reference = collection(firestore, "counts");

  const [currentValue, setCurrentValue] = useState(0);
  // const [counter, setCounter] = useState(0);
  let counter = useRef(0);

  // fetch data from firebase
  window.addEventListener( "load", () => {
    fetchCurrentDatum();
  });

  const fetchCurrentDatum = doc(firestore, "counts", "UqUyiscWk2f8Dy8OrJYW");
  
  onSnapshot(fetchCurrentDatum, (doc) => {
      // console.log(doc.data(), doc.id);
      var data = doc.data().currentCount;
      setCurrentValue(data);
  });

  // set the current counter to currentValue
  useEffect(() => {
    counter.current = currentValue;
    // eslint-disable-next-line
  }, [counter.current]);

  // console.log(counter)
  const increment = () => {
    // alert(`before increment current value ${counter.current}`)
    counter.current += 1;
    // alert(`after increment current value ${counter.current}`)
  };

  const decrement = () => {
    counter.current -= 1;
  };

  const reset = () => {
    counter.current = 0;
  };

  useEffect(()=> {
    increment();
  //   decrement();
  //   reset();
  // eslint-disable-next-line
  }, [counter.current]);

  // let data = {
  //   currentCount: currentValue,
  // }

  // make this into update instead of save new entry
  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   // console.log(counter);
  //   alert("Counter saved")
  //   try {
  //     addDoc(reference, data);
  //   } catch(error) {
  //     console.log(error);
  //   }
  // };

  //https://www.youtube.com/watch?v=7aDG3L-bTS8
  // TODO: getalldata, then try orderby and limit

  return (
    <div>
      <h2>Previous Value from DB: {currentValue}</h2>
      <h2>Counter Value: {counter.current}</h2>
      <button onClick={increment}>+</button> <br></br>
      <button onClick={decrement}>-</button> <br></br>
      <button onClick={reset}>Reset</button>
      {/* <form onSubmit={handleSave}>
        <label>Counter:</label>
        <input 
          type="number" 
          value={currentValue}
          onChange={
            (e) => (setCounter(e.target.value))
          } /><br></br>
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
}