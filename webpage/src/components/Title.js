// The title for the webpage
import '../styles/Title.css'

function Title() {
    return (
        <div>
            <div>
                <div className='Text' >
                    <h1 id='alphpaca'> ALPHpaca's </h1>
                    <p> A project built on Alephium </p>
                    <div class="Text" style={{minHeight: 0}}>
                        <div class="arrow animated bounce"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title