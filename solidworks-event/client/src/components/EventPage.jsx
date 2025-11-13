import { useEffect, useState, useRef } from "react";
import "./EventPage.css";
import { useNavigate } from "react-router-dom";

import CkonnectLogo from "../assets/CkonnectLogo.png";
import DSLogo from "../assets/DSLogo.png";
import DSBanner from "../assets/DS.png";
import VenueImage from "../assets/facadenight.jpg";
import SolidCAMLogo from "../assets/SolidCAM SponserLogo.png";
import KeyFocusDomains from "../assets/Key Focus Domains.jpg";

export default function EventPage() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [regClosed, setRegClosed] = useState(false);
  const regClosedRef = useRef(null); // <-- ref for scrolling
  const navigate = useNavigate();

  // Countdown Timer
  useEffect(() => {
    const eventDate = new Date("Nov 13, 2025 09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: days < 10 ? "0" + days : days,
        hours: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🚫 Registration permanently closed + scroll into view
  const showFinalForm = () => {
    setRegClosed(true);

    // Scroll to message after it renders
    setTimeout(() => {
      regClosedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="head-left">
          <img src={CkonnectLogo} alt="Left Logo" />
        </div>
        <div className="head-right">
          <img src={DSLogo} alt="Right Logo" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>SOLIDWORKS 2026 Launch Event – Kochi</h1>

          <div className="event-info">
            📅 November 13, 2025 • ⏰ 09:00 AM - 02:00 PM<br />
            📍Kochi, Kerala - India
          </div>

          <h3>Address</h3>
          <p>
            <b>Novotel Kochi Infopark</b><br />
            Kakkanad, Kochi, Kerala 682030<br />
            India
          </p>

          <button className="register-btn" onClick={showFinalForm}>
            REGISTER NOW
          </button>

          {/* Countdown */}
          <div className="countdown">
            <div><span>{countdown.days}</span><br />Days</div>
            <div><span>{countdown.hours}</span><br />Hours</div>
            <div><span>{countdown.minutes}</span><br />Minutes</div>
            <div><span>{countdown.seconds}</span><br />Seconds</div>
          </div>

          <div className="sponsors">
            <p>Our Event Partner</p>
            <img src={SolidCAMLogo} alt="SolidCAM Logo" />
          </div>
        </div>

        <div className="hero-right">
          <img src={DSBanner} alt="Event Banner" />
          <img src={KeyFocusDomains} alt="Key-Focus Domains" />
        </div>
      </section>

      {/* 🚫 REGISTRATION CLOSED MESSAGE WITH SCROLL */}
      {regClosed && (
        <div
          ref={regClosedRef}
          style={{
            textAlign: "center",
            padding: "40px",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#b30000",
            background: "#fff3f3",
            borderRadius: "12px",
            margin: "30px auto",
            width: "90%",
            border: "2px solid #ffb3b3"
          }}
        >
          Registration Closed — Thank you for your interest!
          
          <div
            style={{
              fontSize: "18px",
              marginTop: "10px",
              color: "#555",
              fontWeight: "normal"
            }}
          >
            We appreciate your enthusiasm for the SOLIDWORKS 2026 Launch Event.
            <br />
            Registrations are now officially closed.
          </div>
        </div>
      )}
    </div>
  );
}
