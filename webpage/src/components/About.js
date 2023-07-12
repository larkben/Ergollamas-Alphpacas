// The about section
import '../styles/About.css'

import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

function About() {
    const textRef = useRef(null);

    const intro = `Hello, welcome to ALPHpacas,

We are a NFT project founded on Alephium. There are and ever will be 1,152 ALPHpaca's roaming on the Alephium blockchain.
    
All ALPHpacas are composed of traits, some rare, some common and some that are completely 1/1. All traits are hand designed with no AI help or influence.
    
To meet or stay updated with ALPHpaca news and updates you can join our Discord or follow us on Twitter.`; 

    useEffect(() => {
        const options = {
            strings: [intro],
            typeSpeed: 20,

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
            <div className='Text'>
                <div style={{alignContent: 'center'}}>
                    <h1> A little about us... </h1>
                    <p className='css-fix' ref={textRef} style={{maxWidth: 850}}>{intro}</p>
                </div>
            </div>
        </div>
    );
}

export default About;