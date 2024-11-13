"use client";

export default function ConsolePage() {
  return (
    <div>
      <h1>Hello Page</h1>
      <button className="bg-red-500 text-white" onClick={()=>{console.log("Hola a todos")}}>Hola mundo</button>
    </div>
  );
}