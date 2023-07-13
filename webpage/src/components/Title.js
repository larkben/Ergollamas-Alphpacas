// The title for the webpage
import '../styles/Title.css'

function Title() {
    return (
        <div>
            <div>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
                </style>
                <div className='Text' style={{fontFamily: 'VT323, monospace'}}>
                    <h1 id='alphpaca'> ALPHpaca's </h1>
                    <p> A project built on Alephium </p>
                </div>
            </div>
        </div>
    )
}

export default Title