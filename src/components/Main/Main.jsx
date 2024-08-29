import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const{onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    //Enter function
    let handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (input) {
                onSent()
            }
            else {
                null
            }

        }
    }

  return (
    <div className='main'>
        <div className="nav">
            <p> Gemini </p>
            <img src={assets.user_icon}/>
        </div>

        <div className="main-container">

            {!showResult
                ? <>
                        <div className="greet">
                            <p><span>Hello, Dev</span></p>
                            <p>How can I help you today?</p>
                         </div>

                        <div className="cards">
                            <div className="card">
                                <p> Suggest a Python library to solve a problem </p>
                                <img src = {assets.code_icon}/> 
                            </div>
                            <div className="card">
                                <p> What's the time it takes to walk to several landmarks </p>
                                <img src = {assets.compass_icon}/> 
                            </div>
                            <div className="card">
                                <p> Ideas to surprise a friend on their birthday. </p>
                                <img src = {assets.bulb_icon}/> 
                            </div>
                            <div className="card">
                                <p> What's the time it takes to walk to several landmarks </p>
                                <img src = {assets.message_icon}/> 
                            </div>
                        </div>
                  </>

                  :

                   <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon}/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon}/>
                            {loading
                            ? 
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            :
                            
                                <p dangerouslySetInnerHTML={{ __html: resultData }} ></p>                               
                                
                            }
                            
                        </div>
                   </div> 
            
            }
    
               <div className="main-bottom">
                <div className="search-box">
                    <input onKeyDown={handleEnter} onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                         : null
                        }
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps | cloned by - <span>Shivam Trar</span>
                </p>
            </div>

        </div>

    </div>
  )
}

export default Main
