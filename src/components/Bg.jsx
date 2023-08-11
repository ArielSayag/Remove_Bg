import React from 'react';
import './Bg.css';
import axios from 'axios';
import logo from '../assets/logo.png';
import banner from '../assets/banner.png';
import { useState , useRef } from 'react';
import Original from './Original';
import NoBg from './NoBg';
import Eula from './Eula';
import close from "../assets/close1.png";
import download_folder from "../assets/Downloads Folder.png";
import not_robot from "../assets/not_robot.png";

function Bg() {

  const [display_no_bg_tab,setDisplay_no_bg_tab]=useState(false);
  const [show_eula,setShow_eula]=useState(false);
  const [show_popup,setShow_popup]=useState(false);
  const inputElement = useRef();
  const [image_name, setImage_name] = useState("");
  const [color_to_api, setColor_to_api] = useState("");
  const [checkbox_val, setCheckbox_val] = useState(false);

  const [isLoading,setIsLoading]=useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
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


  const download_image_func=(e)=>{

    
    if(!checkbox_val || image_name==="" ){
      alert("please check if: \n 1.select an image \n 2.confirm you are not a robot ");
      return;
    }
    fetch("http://localhost:5000/no_bg_"+image_name)
      .then(response => {
          response.blob().then(blob => {
              let url = window.URL.createObjectURL(blob);
              let a = document.createElement('a');
              a.href = url;
              a.download = `http://localhost:5000/${image_name}`;
              a.click();
        });   
    });
  }

  

  const closePopup=(e)=>{

    setCheckbox_val(false)
    if(e.target.classList.value === 'cancel' || e.target.classList.value ==='closeImg') {
      setShow_popup(false);
    } else {
      setShow_popup(true);
    }
    
  }

  const checkbox_checked=()=>{
    setCheckbox_val((current)=>!current)
  }

  const open_popup=()=>{
    setShow_popup(true);
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
        { display_no_bg_tab ? <Original image_name={image_name} /> : <NoBg isLoading={isLoading} image_name={image_name} send_color_func={send_color} /> }

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
            <button className='right_div_top_btn'  onClick={open_popup}>הורד</button>
            <div className='right_div_top_sub_sub_text'>איכות טובה עד 0.25 מגה פיקסל</div>
          </div>

          <div className='right_div_bottom'>
            <div className='right_div_bottom_text'>Pro</div>
            <div className='right_div_top_subtext'> 1280x1920 תמונה מלאה </div>
            <button className='right_div_top_btn'  onClick={open_popup}>HD הורד</button>
            <div className='right_div_top_sub_sub_text'>האיכות טובה יותר עד 25 מגה פיקסל</div>
          </div>
        </div>
      </div>
    </div>
    <div className='footer'>
      <img src={logo} alt="logo" className="logo_img" />
      <img src={banner} alt="banner_image" className="banner_img"/>
    </div>
    {show_popup ?  
         <>
            <div className="overlay">     </div>
            <div className="download_image_popup">
              <img src={close} onClick={closePopup} alt="close" className="closeImg"/>
                  <div className='top_image'> <img src={download_folder} alt="download" /></div>
                  <div className='download_image_popup_text'> אישור להורדת תמונה </div>
                  <div className='download_image_popup_subtext'>האם להוריד את התמונה?</div>
                  <div className='download_image_popup_btn_cont'> 
                    <input type="checkbox" className='checkbox' onChange={checkbox_checked}/>
                    <span > אני לא רובוט </span>

                    <img alt="not-robot" src={not_robot}/>
                    <br/>

                    <button className="cancel" onClick={closePopup}> ביטול </button>

                    <button className="aprove"  style={{backgroundColor: !checkbox_val ? 'gray': '#3f51b5'}} onClick={download_image_func}> אישור </button>
                  </div>
              </div>
           </>
            : "" }
   </div>
  )
}

export default Bg