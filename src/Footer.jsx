import { Mail, Linkedin, Instagram, Facebook, Github } from "lucide-react";
import { SiGithub, SiFacebook, SiInstagram } from "react-icons/si";

import './footer.css';

// https://lucide.dev/license
// https://github.com/simple-icons/simple-icons/blob/master/DISCLAIMER.md

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <div className="logo-box">
            <img src="https://raw.githubusercontent.com/jackmadethat/jackmadethat.github.io/refs/heads/main/backup/img/sig.png" className="logo" alt="Jack Made That" />
          </div>
          <span>Jack Made That</span>
        </div>
        <nav className="footer-links">
          <a>Blog</a>
          <a>Portfolio</a>
          <a>Resume</a>
          <a href="mailto:jack.beven@gmx.com" target="_blank" rel="noopener noreferrer">Contact</a>
        </nav>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="copyright">
          © jackmadethat.github.io | Jack Beven 2026
        </div>
        <div className="socials">
          <a href="https://github.com/jackmadethat/" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="https://www.linkedin.com/in/jack-beven/" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://facebook.com/bevman" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
          <a href="https://instagram.com/vr_bev" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="mailto:jack.beven@gmx.com" target="_blank" rel="noopener noreferrer">
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
}