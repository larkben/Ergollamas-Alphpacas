// The about section
import '../styles/About.css'
import aboutLogo from '../assets/about.png'

function About() {
    return (
        <div>
            <div className='Text'>
                <h1 style={{paddingBottom: 20, fontSize: 40}}> What is an ALPHpaca? </h1>
                <div className='container'>
                    <div className='Description text' style={{float: 'left'}}>
                        <p>
                            ALPHpaca's are a sparkling water fueled project designed towards bringing open source utilties and Alephium compatible Dapps.
                            There will be a maximum supply of 1152 ALPHpacas.
                            ALPHpaca's will not only be NFTs but unique opportunities for any project interested in the NFT space.
                            We aim to build NFT minting services and a marketplace where holders can receive reduced costs.
                            We also plan to have a game, where we turn the NFT economy into a collectible on-chain nft marketplace that you can participate and earn with your ALPHpaca.

                        </p>
                    </div>
                    <div className='image'>
                        <img src={aboutLogo} alt='ALPHpaca Example' style={{float: 'right'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About