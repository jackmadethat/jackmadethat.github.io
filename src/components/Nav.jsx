import MoonPhase from './MoonPhase.jsx'
import Zodiac from './Zodiac.jsx'

const Nav = () => {
  const date = new Date();
  const now = date.toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
  const region = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="topBar">
      <p className="leftSideTop" style={{ fontFamily: 'Kode Mono' }}>
        <div id="menu">
          <div id="menuBtn">&#9746; Menu</div>
          <div id="menuContent">
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Art & Graphics</a>
            <a href="#">Coding/Game Dev</a>
          </div>
        </div>
      </p>
      <p className="rightSideTop" style={{ fontFamily: 'Kode Mono' }}><MoonPhase date={date} /> | <Zodiac date={date} /> | {region}</p>
    </div>
  )
}

export default Nav
