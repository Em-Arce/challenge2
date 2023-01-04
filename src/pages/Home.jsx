import React from "react";
import { useState, useEffect, useRef } from "react"; 
import { firestore } from "../firebase";
import { addDoc, collection, doc, 
  query, orderBy, onSnapshot 
} from "@firebase/firestore";

export default function Home() {
  // const reference = collection(firestore, "counts");

  // const [inputValue, setInputValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  // const [counter, setCounter] = useState(0);
  
  // let counter = useRef(currentValue);
  


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
  // console.log(`current value ${currentValue}`);
  const [counter, setCounter] = useState(currentValue);
  // console.log(`counter value ${counter}`);

  // set the current counter to currentValue
  // useEffect(() => {
  //   counter.current = currentValue;
  //   // eslint-disable-next-line
  // }, [currentValue]);

  // useEffect(()=> {
  //   increment();
  //   decrement();
  //   reset();
  // // eslint-disable-next-line
  // }, [counter.current]);


  // console.log(counter)
  
  const increment = () => {
    // console.log(`before increment current value ${counter}`);
    setCounter(counter + 1);
    // console.log(`after increment current value ${counter}`);
  };

  const decrement = () => {
    // console.log(`before decrement current value ${counter}`);
    setCounter(counter - 1);
    // console.log(`after decrement current value ${counter}`);
  };

  const reset = () => {
    // console.log(`before reset current value ${counter}`);
    setCounter(0)
    // console.log(`after reset current value ${counter}`);
  };

  
  // let data = {
  //   currentCount: inputValue,
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
      <h2>Counter Value: {counter}</h2>
      <button onClick={increment}>+</button> <br></br>
      <button onClick={decrement}>-</button> <br></br>
      <button onClick={reset}>Reset</button>
      {/* <form onSubmit={handleSave}>
        <label>Input:</label>
        <input 
          type="number" 
          value={inputValue}
          onChange={
            (e) => (setInputValue(e.target.value))
          } /><br></br>
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
}