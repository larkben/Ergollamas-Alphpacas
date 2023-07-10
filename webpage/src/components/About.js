// The about section
import '../styles/About.css'
import aboutLogo from '../assets/about.png' //? should consider combining imports
import teamLogo from '../assets/theTeam.png'
import alephiumInfo from '../assets/whyAlephium.png'
import asperite from '../assets/asperiteCreation.png'

// Will need a new photo for the team section.

function About() {
    return (
        <div>
            <div className='Text'>
                <div className='Text whatisALPHpaca' style={{paddingLeft: 10, paddingRight: 10}}>
                    <h1 style={{paddingBottom: 20, fontSize: 40}}> <a name="section1"> What is an ALPHpaca? </a> </h1>
                    <div className='container' style={{backgroundColor: 'rgba(0, 0, 25, 0.8)', padding: 25}}>
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
            </div>
            <div className='Text'>
                <h1 style={{paddingBottom: 20, fontSize: 40}}> Who is the Team? </h1>
                <div className='container'>
                    <div className='image'>
                        <img src={teamLogo} alt='ALPHpaca Example'/>
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
            <div className='Text'>
                <h1 style={{paddingBottom: 20, fontSize: 40}}> Why Alephium? </h1>
                <div className='container'>
                    <div className='Description text'>
                        <p>
                            Building on Alephium is personal choice and we strongly believe it will be a prosperous ecosystem in the future where ALPHpaca's will find the most opportunity
                            and the most value.
                            <br/> <br/>
                            It is our mission to deliver ALPHpaca's with present and constantly evolving future utility; constantly pushing Alephium's innovative technology to
                            its limits.
                        </p>
                    </div>
                    <div className='image'>
                        <img src={alephiumInfo} alt='ALPHpaca Example'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About