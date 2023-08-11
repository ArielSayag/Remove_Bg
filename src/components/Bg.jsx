import React from 'react';
import './Bg.css';
import axios from 'axios';
import logo from '../assets/logo.png';
import banner from '../assets/banner.png';
import { useState , useRef } from 'react';
import Original from './Original';
import NoBg from './NoBg';
import Eula from './Eula';

function Bg() {

  const [display_no_bg_tab,setDisplay_no_bg_tab]=useState(false);
  const [show_eula,setShow_eula]=useState(false);
  const inputElement = useRef();
  const [image_name, setImage_name] = useState("");
  const [color_to_api, setColor_to_api] = useState("");

  const change_tab=(e)=>{
    if(e.target.classList.value === "no_bg"){
      setDisplay_no_bg_tab(false)
    }
    else{
      setDisplay_no_bg_tab(true)
    }

  }

  function upload_file() {
    inputElement.current.click();
  }

  const open_eula=()=>{
    setShow_eula(true)
  }

  const close_popup=()=>{
    setShow_eula(false);
  }

  const send_file_to_back=async (e)=>{

    const data=e.target.files[0];
    if(data.type==="image/png" || data.type==="image/jpg" || data.type==="image/jpeg" ){

      const formData=new FormData();

      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
      }

      formData.append(
          "myFile",
          data,
          data.name
      );  
    formData.append( "color_to_api",  color_to_api);
    
    await axios.post(`http://localhost:5000/upload_file`, formData, config)
      .then(res => {
        console.log(res);
        setImage_name(res.data.imageName);
    }).catch(error => {
      console.error("An error occurred during the POST request:", error);
    });
      
    }else{
      alert('file type not supported');
    }
    
  }

  const send_color=(color)=>{

    setColor_to_api(color);

  }

  return (
    <div className="Bg">
    <div className="header">
       <span className='header_text'> העלאת תמונה כדי להסיר את הרקע </span>
       <button className="header_btn" onClick={upload_file}> העלאת תמונה</button>
       <input type="file" ref={inputElement} onChange={send_file_to_back} className="input_file"/>
       <span className='header_subtext'>פורמטים נתמכים png,jpeg</span>
    </div>
    <div className='main_div'>
      <div className='left_div'>
        <div className='main_div_tabs_header'>
          <span  className="no_bg" onClick={change_tab} style={{borderBottom: !display_no_bg_tab ? "3px solid #9C27B0" :"" }}>הסר רקע</span>
          <span className='original' onClick={change_tab} style={{borderBottom: display_no_bg_tab ? "3px solid #9C27B0" : ""}} >מקורי</span>
        </div>
        { display_no_bg_tab ? <Original image_name={image_name} /> : <NoBg image_name={image_name} /> }

        <div className='left_div_footer'>
          <button className='eula_btn' onClick={open_eula} >תקנון החברה</button>
          <span className='eula_text'>על ידי העלאת תמונה אתה מסכים לתנאים וההגבלות </span>
          {show_eula ? <Eula closePopup={close_popup}/> : ""}
        </div>
      </div>

      <div className='right_div'>
        <div className='right_div_middle_div'>
          <div className='right_div_top'>
            <div className='right_div_top_text'>תמונה חינם</div>
            <div className='right_div_top_subtext'> 612x408 תצוגה מקדימה של תמונה </div>
            <button className='right_div_top_btn'>הורד</button>
            <div className='right_div_top_sub_sub_text'>איכות טובה עד 0.25 מגה פיקסל</div>
          </div>

          <div className='right_div_bottom'>
            <div className='right_div_bottom_text'>Pro</div>
            <div className='right_div_top_subtext'> 1280x1920 תמונה מלאה </div>
            <button className='right_div_top_btn'>HD הורד</button>
            <div className='right_div_top_sub_sub_text'>האיכות טובה יותר עד 25 מגה פיקסל</div>
          </div>
        </div>
      </div>
    </div>
    <div className='footer'>
      <img src={logo} alt="logo" className="logo_img" />
      <img src={banner} alt="banner_image" className="banner_img"/>
    </div>

   </div>
  )
}

export default Bg