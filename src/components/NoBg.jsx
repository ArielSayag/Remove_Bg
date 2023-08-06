import React , {useState , useRef} from 'react';
import "./NoBg.css";

function NoBg() {

  const inputElement=useRef();
  const [color,setColor]=useState("#000");

  const choose_color=()=>{
    inputElement.current.click();
  }

  const change_color=(e)=>{
    setColor(e.target.value);
  }

  return (

    <div className='no_bg_tab'>
      <span className='no_bg_tab_text'>אל תשכח להויריד את הקבצים שלך. הם ימחקו אוטומטית כשתצא מהדף</span>
      <div className='color_div' onClick={choose_color}>
        <span className='display_text'>צבע רקע</span>
        <span className='display_color' style={{backgroundColor:color}}></span>
      </div>
      <input ref={inputElement} onChange={change_color} className='input_color' type='color' />
    </div>
  )
}

export default NoBg