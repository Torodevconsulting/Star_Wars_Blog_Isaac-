export const Footer = () => (
  <footer className="sw-footer">
    <div className="sw-footer__inner">

      <div className="sw-footer__brand">
        <svg viewBox="0 0 130 40" fill="white" xmlns="http://www.w3.org/2000/svg" height="28">
          <text x="0" y="30" fontSize="28" fontFamily="'Orbitron', sans-serif" letterSpacing="2" fill="white">SW</text>
          <line x1="64" y1="8" x2="64" y2="32" stroke="#FFE81F" strokeWidth="2"/>
          <text x="72" y="18" fontSize="8" fontFamily="'Orbitron', sans-serif" fill="#FFE81F" letterSpacing="1">STAR</text>
          <text x="72" y="30" fontSize="8" fontFamily="'Orbitron', sans-serif" fill="#FFE81F" letterSpacing="1">WARS</text>
        </svg>
        <p className="sw-footer__quote">"May the Force be with you."</p>
      </div>

      <div className="sw-footer__links">
        <span className="sw-footer__links-title">EXPLORE</span>
        <a href="/people" className="sw-footer__link">👤 Characters</a>
        <a href="/vehicles" className="sw-footer__link">🚀 Vehicles</a>
        <a href="/planets" className="sw-footer__link">🪐 Planets</a>
      </div>

      <div className="sw-footer__links">
        <span className="sw-footer__links-title">DATA SOURCES</span>
        <a href="https://www.swapi.tech" target="_blank" rel="noreferrer" className="sw-footer__link">SWAPI.tech API</a>
        <a href="https://starwars-visualguide.com" target="_blank" rel="noreferrer" className="sw-footer__link">Star Wars Visual Guide</a>
        <a href="https://www.starwars.com/databank" target="_blank" rel="noreferrer" className="sw-footer__link">Official Databank</a>
      </div>

      <div className="sw-footer__links">
        <span className="sw-footer__links-title">BUILT WITH</span>
        <a href="https://react.dev" target="_blank" rel="noreferrer" className="sw-footer__link">⚛️ React</a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="sw-footer__link">⚡ Vite</a>
        <a href="https://4geeks.com" target="_blank" rel="noreferrer" className="sw-footer__link">🎓 4Geeks Academy</a>
      </div>

	  <div className="sw-footer__links">
  		<span className="sw-footer__links-title">Developed by:</span>
  		<a href="https://www.torodevelop.com" target="_blank" rel="noreferrer" className="sw-footer__link">🛠️ Toro Development</a>
	</div>

    </div>

    <div className="sw-footer__bottom">
      <div className="sw-footer__bottom-inner">
        <span className="sw-footer__copy">
  			© {new Date().getFullYear()} Star Wars Databank — Built by{" "}
  			<a href="https://www.torodevelop.com" target="_blank" rel="noreferrer" style={{ color: "var(--yellow)", textDecoration: "none" }}>
    		Toro Development
  			</a>
		</span>
        <span className="sw-footer__side">
          Star Wars and all related marks are trademarks of Lucasfilm Ltd.
        </span>
      </div>
    </div>
  </footer>
);