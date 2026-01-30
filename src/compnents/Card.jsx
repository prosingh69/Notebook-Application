import React, { useState } from 'react'
import { CircleX } from 'lucide-react';
import Card2 from './Card2';

const Card = () => {
    const [word, setWord] = useState({title:"",para:""});
    const [entry, setEntry] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); 
    function Change(){
      console.log(word)
        setEntry([word,...entry])
        console.log("Form Submit");        
        setWord({...word,title:"",para:""})
    }
    function deleteNote(index){
      console.log(index);
      const Note =[...entry];
      Note.splice(index,1);
      setEntry(Note)
    }
    function showNote(item){
      console.log("Opening Note:", item);
      setSelectedNote(item);
    }
    function updateNote(updatedNote) {
    const updatedEntries = entry.map((item) => 
        // Agar title match kare (ya index se bhi kar sakte ho) toh naya data replace karo
        item === selectedNote ? updatedNote : item
    );
    setEntry(updatedEntries);
    setSelectedNote(updatedNote); // Modal mein bhi update dikhe
}
  return (
    <div className='lg:flex items-start'>
      <form className='p-10 flex flex-col lg:w-1/2 ' onSubmit={(e)=>{
        e.preventDefault();
        Change(e);
        }}>
        <h1 className='bg-yellow-500 px-5 rounded font-medium text-[17px] text-amber-50 mb-5' >ADD NOTES</h1>
        <input 
        className='bg-transparent border-2 border-gray-600 text-white mb-10 w-full font-medium text-2xl p-4 rounded-lg placeholder-gray-500 focus:border-white focus:outline-none' 
        type="text" 
        placeholder='ENTER TITLE' 
        value={word.title}
        onChange={(e)=>{
            setWord({...word , title:e.target.value})
        }}/>
        <textarea className='bg-transparent border-2 border-gray-600 text-white mb-10 w-full p-4 lg:h-90 h-30 font-medium text-[17px] rounded-lg placeholder-gray-500 focus:border-white focus:outline-none no-scrollbar'placeholder='Write Here' id="2" value={word.para} onChange={(e)=>{
            setWord({...word , para:e.target.value})
        }}></textarea>
        <button className='bg-yellow-500 hover:bg-yellow-400 text-black font-bold mb-10 w-full py-3 rounded-2xl transition-colors text-[19px] cursor-pointer'>ADD NOTE</button>
      </form>
      <div className=' lg:w-1/2 p-10'>
        <h1 className='bg-yellow-500 px-5 rounded font-medium text-[17px] text-amber-50'>RECENT NOTES</h1>
        <div className='overflow-y-auto h-35 lg:h-160 no-scrollbar'>
        {entry.map(function(item,index){
            return(
              <div onClick={()=>{showNote(item)}} key={index} className='border my-5 rounded-[10px] px-5 relative cursor-pointer hover:bg-white/10 '>
                <h1 className='text-3xl text-white border-b-2 border-white-500 py-2 font-bold uppercase'>
                  {item.title.split(" ").slice(0, 5).join(" ")}
                  {item.title.split(" ").length > 5 ? "..." : ""}</h1>
                <p className='text-[17px] font-medium py-3 px-5'>
                  {item.para.split(" ").slice(0, 10).join(" ")}
                  {item.para.split(" ").length > 10 ? "..." : ""}
                </p>
                <h1 className='absolute top-2.5 right-4 cursor-pointer active:scale-90' onClick={(e)=>{e.stopPropagation(); deleteNote(index)}}><CircleX className='hover:stroke-red-500' size={30} color="#ffff" /></h1>
              </div>
              )
        })}
        </div>
      </div>
      {selectedNote && (
          <Card2 
            data={selectedNote} 
            onClose={() => setSelectedNote(null)} 
            onSave={updateNote}
          />)}
    </div>
  )
}

export default Card
