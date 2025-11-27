import { useState } from 'react'

const App = () => {
  const [visible_Coding, setVisible_Coding] = useState(false);

  const toggleCoding = () => {
    setVisible_Coding(false);
  };

  const toggleGameDev = () => {
    setVisible_Coding(true);
  };

  return (
    <div className="container">
      <div>
          <img src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/sig.png" className="logo" alt="Jack Made That" />
      </div>
      <h1><span className="bigBracket">&#091;</span> Jack Made That <span className="bigBracket">&#093;</span></h1>
      <h2><span className={visible_Coding ? "title" : "title active"} onClick={() => toggleCoding()}>Coding</span> / <span className={visible_Coding ? "title active" : "title"} onClick={() => toggleGameDev()}>Game Dev</span></h2>
      <div className="buttonBox">
        {visible_Coding ? 
          <div>
            <a href="https://www.youtube.com/@underscore00" target="_blank" className="mainBtn">underscore YT</a>
            <a href="https://jackmadethat.github.io/vehicleconfigurator" target="_blank" className="mainBtn">Vehicle Config</a>
            <a href="https://jackmadethat.github.io/TankGame" target="_blank" className="mainBtn">Tank Game</a>
            <a href="https://jackmadethat.github.io/airplanegame" target="_blank" className="mainBtn">Airplane Game</a>
          </div>
        : 
          <div>
            <a href="https://jackmadethat.github.io/protocol" target="_blank" className="mainBtn">Fitness Protocol</a>
            <a href="https://jackmadethat.github.io/killteam" target="_blank" className="mainBtn">Kill Team</a>
            <a href="https://jackmadethat.github.io/scndrl" target="_blank" className="mainBtn">Scoundrel</a>
            <a href="https://jackmadethat.github.io/animus" target="_blank" className="mainBtn">Animus</a>
          </div>
        }

      </div>
      <div className="contact">
        <div className="socmed-container">
            <div className="socmed-box"><a href="https://www.youtube.com/c/underscore00" target="_blank"><img draggable="false" alt="YouTube" src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/socmed/socmed_youtube.png"/></a></div>
            <div className="socmed-box"><a href="https://www.artstation.com/artbybeven" target="_blank"><img draggable="false" alt="ArtStation" src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/socmed/socmed_artstation.png"/></a></div>
            <div className="socmed-box"><a href="https://www.instagram.com/vr_bev/" target="_blank"><img draggable="false" alt="Instagram" src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/socmed/socmed_instagram.png"/></a></div>
            <div className="socmed-box"><a href="https://www.linkedin.com/in/jack-beven/" target="_blank"><img draggable="false" alt="LinkedIn" src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/socmed/socmed_linkedin.png"/></a></div>
            <div className="socmed-box"><a href="https://github.com/jackmadethat" target="_blank"><img draggable="false" alt="GitHub" src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/socmed/socmed_github.png"/></a></div>
            <div className="socmed-box"><a href="mailto:jack.beven@gmx.com" target="_blank"><img draggable="false" alt="E-Mail" src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/socmed/socmed_mail.png"/></a></div>
        </div>
      </div>
    </div>
  )
}

export default App
