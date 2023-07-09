// The about section
import '../styles/About.css'
import aboutLogo from '../assets/about.png'

// Will need a new photo for the team section.

function About() {
    return (
        <div>
            <div className='Text'>
                <h1 style={{paddingBottom: 20, fontSize: 40}}> What is an ALPHpaca? </h1>
                <div className='container'>
                    <div className='Description text'>
                        <p>
                            ALPHpaca's are a sparkling water fueled project designed towards bringing open source utilties and Alephium compatible Dapps.
                            There will be a maximum supply of 1152 ALPHpacas.
                            ALPHpaca's will not only be NFTs but unique opportunities for any project interested in the NFT space.
                            We aim to build NFT minting services and a marketplace where holders can receive reduced costs.
                            We also plan to have a game, where we turn the NFT economy into a collectible on-chain nft marketplace that you can participate and earn with your ALPHpaca.

                        </p>
                    </div>
                    <div className='image'>
                        <img src={aboutLogo} alt='ALPHpaca Example'/>
                    </div>
                </div>
            </div>
            <div className='Text'>
                <h1 style={{paddingBottom: 20, fontSize: 40}}> Who is the Team? </h1>
                <div className='container'>
                    <div className='image'>
                        <img src={aboutLogo} alt='ALPHpaca Example'/>
                    </div>
                    <div className='Description text'>
                        <p>
                            The ALPHpaca team as of now is myself "Benjamin" and 3 secretly chosen and trusted Alephium members to deliver quality control
                            or in other words the best ALPHpaca designs.
                            <br/> <br/>
                            My Credentials:
                            I am a senior college student studying Software Development with as of now a minor in Finance.
                            I am fluent in most programming structures and syntax; I am mostly a fan of Rust and Typescript.

                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About