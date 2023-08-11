import React , {useState , useRef} from 'react';
import "./NoBg.css";
import Spinner from "../assets/spinner.svg";
function NoBg(props) {

  const inputElement=useRef();
  const [color,setColor]=useState("#000");
  
  const choose_color=()=>{
    inputElement.current.click();
  }

  const change_color=(e)=>{
    setColor(e.target.value);
    props.send_color_func(color);
  }

  

  return (

    <div className='no_bg_tab'>
      <span className='no_bg_tab_text'>אל תשכח להויריד את הקבצים שלך. הם ימחקו אוטומטית כשתצא מהדף</span>
      <div className='color_div' onClick={choose_color}>
        <span className='display_text'>צבע רקע</span>
        <span className='display_color' style={{backgroundColor:color}}></span>
      </div>
      <input ref={inputElement} onChange={change_color} className='input_color' type='color' />

      {props.image_name ?  
        <div className='image_no_bg_div'>
          <img className="image_no_bg" src={"http://localhost:5000/no_bg_"+props.image_name} alt="no_bg_image"/>
        </div> 
      :
      props.isLoading ?  <div className='spinner'>
        <img src={Spinner} alt="spinner" />
      </div>:""}
    </div> 
  )
}

export default NoBg