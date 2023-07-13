// The about section
import '../styles/About.css'

import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Distribution from './Distribution';

import ALPHpaca from "../assets/92.png"

function About() {
    const textRef = useRef(null);

    const [showPicture, setShowPicture] = useState(false);

    const intro = `Hello, welcome to ALPHpacas,

We are a NFT project founded on Alephium. There are and ever will be 1,152 ALPHpaca's roaming on the Alephium blockchain.
    
All ALPHpacas are composed of traits, some rare, some common and some that are completely 1/1. All traits are hand designed with no AI help or influence.
    
To meet or stay updated with ALPHpaca news and updates you can join our Discord or follow us on Twitter.`; 

    useEffect(() => {
        const options = {
            strings: [intro],
            typeSpeed: 20,
            onComplete: () => {
                setShowPicture(true);
            }

        };
    
        const typed = new Typed(textRef.current, options);
    
        return () => {
            if (typed) {
                typed.destroy();
            }
        };

    }, []);

    return (
        <div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
            </style>
            <div className='Text'>
                <div style={{alignContent: 'center'}}>
                    <div className='rcorners1' style={{backgroundColor: '#662115', padding: 25}}>
                        <h1 style={{fontFamily: 'VT323, monospace', letterSpacing: 5}}> A LITTLE ABOUT US... </h1>
                        <div className='container rcorners1' style={{backgroundColor: 'orangered', padding: 30, height: 650}}>
                            <p className='css-fix text typed-cursor' ref={textRef} style={{minWidth: 550, maxWidth: 550, color: '#060a18', fontFamily: 'VT323, monospace'}}>{intro}</p>
                            <div className='rcorners1' style={{backgroundColor: '#060a18', padding: 15}}>
                                <img src={ALPHpaca} alt='ALPHpaca' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Distribution/>
        </div>
    );
}

export default About;