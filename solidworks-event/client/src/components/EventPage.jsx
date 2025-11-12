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

  const [showForm, setShowForm] = useState(false);
  const [regClosed, setRegClosed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const API_URL = "https://solidworks-kochi.onrender.com";
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

  // ✅ Show form only before 7 PM today
  const showFinalForm = () => {
    const now = new Date();
    const close = new Date();
    close.setHours(19, 0, 0, 0); // 7PM

    if (now > close) {
      setRegClosed(true);
      return;
    }

    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const submitFinalForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value.trim(),
      phone: e.target.phone.value.trim(),
      email: e.target.email.value.trim(),
      organization: e.target.organization.value.trim(),
      designation: e.target.designation.value.trim(),
    };

    if (Object.values(formData).some((v) => !v)) {
      alert("Please fill all the required fields.");
      setIsSubmitting(false);
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/confirmation");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("Server error, please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
            📅 November 13, 2025 • ⏰ 09:00 AM - 02:00 PM
            <br />
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

      {/* ✅ Inline Registration Closed Message */}
      {regClosed && (
        <div
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
            Registrations are now closed.
          </div>
        </div>
      )}

      {/* Registration Form */}
      {showForm && !regClosed && (
        <section className="final-form" ref={formRef}>
          <h2>Complete Your Registration</h2>
          <div className="container-flex">
            <form className="order" onSubmit={submitFinalForm}>
              <div className="form-section">
                <label>Full Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-section">
                <label>Phone Number</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" />
              </div>
              <div className="form-section">
                <label>Email ID</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-section">
                <label>Organization</label>
                <input type="text" name="organization" required />
              </div>
              <div className="form-section">
                <label>Designation</label>
                <input type="text" name="designation" required />
              </div>
              <button className="submit-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Confirm Registration"}
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
