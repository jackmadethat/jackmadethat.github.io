import { useState } from 'react'
import './card.css';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

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
      <h2 className="subtitle">3D Artist, Game Designer & Full Stack Web Developer</h2>

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
      
      <h2><span className={visible_Coding ? "title" : "title active"} onClick={() => toggleCoding()}>Coding</span> / <span className={visible_Coding ? "title active" : "title"} onClick={() => toggleGameDev()}>Game Dev</span></h2>
      <div className="buttonBox">
        {visible_Coding ? 
          <div className="card-grid">
            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  underscore YT
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Personal channel featuring portfolio pieces and teaching Unreal Engine.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                    <CardItem translateZ={20} className="signup-btn">
                      <a href="https://www.youtube.com/@underscore00" target="_blank">View Project</a>
                    </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Vehicle Config
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Online vehicle configurator using Unity and WebGL, similar to Forza or Need for Speed.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/vehicleconfigurator" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Tank Game
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Top-down tank game prototype made with Unity and WebGL.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/tankgame" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Airplane Game
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Third-person flight game prototype made with Unity and WebGL.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/airplanegame" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        : 
          <div className="card-grid">
            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Rapid Reader
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Functional, intuitive speed reading tool, compatible with PDF and EPUB files.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                    <CardItem translateZ={20} className="signup-btn">
                      <a href="https://jackmadethat.github.io/rapidreader" target="_blank">View Project</a>
                    </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Fitness Protocol
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Stylish workout companion featuring various programs, trackers and interval timer.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/protocol" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Kill Team
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  Rulebook and companion for a tabletop war game including score tracker and dice roller.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/killteam" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Scoundrel
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  An engaging single player, dungeon-crawling, roguelike card game.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/scndrl" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            <CardContainer>
              <CardBody className="card">
                <CardItem translateZ={50} className="card-title">
                  Animus
                </CardItem>
                <CardItem translateZ={60} className="card-description">
                  A fitness tracker with user accounts, persistent stats, and visual data.
                </CardItem>
                <CardItem translateZ={100} className="card-image">
                  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" />
                </CardItem>
                <div className="card-footer">
                  <CardItem translateZ={20} className="signup-btn">
                    <a href="https://jackmadethat.github.io/animus" target="_blank">View Project</a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        }
      </div>
    </div>
  )
}

export default App
