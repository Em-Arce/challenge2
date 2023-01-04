import React from "react";
import { useState, useEffect } from "react"; 
import { firestore } from "../firebase";
import { 
  addDoc, 
  collection, 
  doc, 
  getDocs, 
  updateDoc,
  deleteDoc
} from "@firebase/firestore";

export default function Home() {
  const [newCount, setNewCount] = useState(0);
  const [currentValue, setCurrentValue] = useState([]);
  const countsRef = collection(firestore, "counts");
  
  // on refresh get counts from db once
  useEffect(() => {
    const getCounts = async () => {
      const data = await getDocs(countsRef);
      setCurrentValue(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };
    getCounts();
  }, []);
  
  const addCount = async () => {
    await addDoc(countsRef, { currentCount: Number(newCount)});
  };

  const deleteCount = async (id) => {
    const countDoc = doc(firestore, "counts", id);
    await deleteDoc(countDoc);
  };

  // increase counter by 1 and save to db
  const increment = async (id, currentCount) => {
    // console.log(`id: ${id}, currentCount: ${currentCount}`);
    const countDoc = doc(firestore, "counts", id);
    const newFields = { currentCount: currentCount + 1 };
    await updateDoc(countDoc, newFields);
  };

  const decrement = async (id, currentCount) => {
    // console.log(`id: ${id}, currentCount: ${currentCount}`);
    const countDoc = doc(firestore, "counts", id);
    const newFields = { currentCount: currentCount - 1 };
    await updateDoc(countDoc, newFields);
  };

  const reset = async (id) => {
    const countDoc = doc(firestore, "counts", id);
    const newFields = { currentCount: 0 };
    await updateDoc(countDoc, newFields);
  };

  return (
    <div>
      <input type="number"
        placeholder="Enter a number"
        onChange={(event) => {setNewCount(event.target.value)}}
      />
      <button onClick={addCount}>Add Count</button>

      <h1>All Counts</h1>
      {currentValue.map((count) => {
        return (
          <div key={count.id}>
            <h3> Counter: {count.currentCount}</h3>
            <button onClick={() => {
              increment(count.id, count.currentCount)
            }}>{" "} Increase</button>
            <button onClick={() => {
              decrement(count.id, count.currentCount)
            }}>{" "} Decrease</button>
            <button onClick={() => {
              reset(count.id)
            }}>{" "} Reset</button>
            <button onClick={() => {
              deleteCount(count.id)
            }}>{" "} Delete Count</button>
          </div>
        );
      })
      }
    </div>
  );
}