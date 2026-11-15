"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Guest } from "@/lib/guests";
import { getInvitationCopy } from "@/lib/invitation-copy";

export default function Invitation({ guest }: { guest?: Guest }) {
  const copy = getInvitationCopy(guest);
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "closing">(
    "closed",
  );
  const envelopeRef = useRef<HTMLButtonElement>(null);
  const letterRef = useRef<HTMLElement>(null);
  const opened = phase === "opening" || phase === "open";
  const busy = phase === "opening" || phase === "closing";

  useEffect(() => {
    if (!busy) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(
      () => {
        setPhase(phase === "opening" ? "open" : "closed");
      },
      reducedMotion ? 0 : phase === "opening" ? 1900 : 1400,
    );
    return () => window.clearTimeout(timer);
  }, [phase, busy]);

  useEffect(() => {
    if (phase !== "open") return;
    // Wait until the visible letter has been committed before moving to it.
    const frame = window.requestAnimationFrame(() => {
      const letter = letterRef.current;
      if (!letter) return;
      letter.focus({ preventScroll: true });
      letter.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  function toggleEnvelope() {
    if (busy) return;
    setPhase(opened ? "closing" : "opening");
  }

  function closeLetter() {
    setPhase("closing");
    envelopeRef.current?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <main
      className={`invitation ${opened ? "is-open" : ""}`}
      data-phase={phase}
    >
      <header className="masthead" lang="en">
        <Link href="/" aria-label="Trang chủ">
          a little milestone<span> / graduation invitation</span>
        </Link>
        <span className="edition">ONE CHAPTER ENDS, ANOTHER BEGINS</span>
      </header>
      <section className="intro" aria-labelledby="title">
        <p className="eyebrow" lang="en">FOR SOMEONE SPECIAL</p>
        <h1 id="title" lang="en">
          A day to remember.
          <br />
          Made better <em>with you.</em>
        </h1>
        <p className="description">
          Một hành trình sắp khép lại, một chương mới sắp bắt đầu.
          <br className="desktop-break" /> {copy.introduction}
        </p>
      </section>
      <div className="envelope-area">
        <span className="little-star star-one" aria-hidden="true">
          ✧
        </span>
        <span className="little-star star-two" aria-hidden="true">
          ✧
        </span>
        <button
          ref={envelopeRef}
          className="envelope-button"
          onClick={toggleEnvelope}
          aria-disabled={busy}
          aria-expanded={opened}
          aria-controls="letter"
          aria-label={opened ? "Đóng phong bì" : "Mở phong bì để đọc lời mời"}
        >
          <span className="envelope" aria-hidden="true">
            <span className="envelope-back" />
            <span className="paper">
              <span className="paper-mark">✦</span>
              <span className="paper-small">MINH TRIỀU</span>
              <span className="paper-title">
                My
                <br />
                graduation
              </span>
              <span className="paper-line" />
              <span className="paper-note">{copy.envelopeNote}</span>
            </span>
            <span className="envelope-front" />
            <span className="envelope-flap" />
            <span className="seal">
              <span>T</span>
            </span>
            <span className="envelope-caption">a new chapter awaits</span>
          </span>
        </button>
        <p className="open-hint" role="status">
          {busy
            ? opened
              ? "Một lời mời đang được hé mở…"
              : "Cất lại một chút yêu thương…"
            : opened
              ? copy.openedHint
              : "Chạm vào dấu sáp để mở thư"}
          <span>
            {opened ? "WITH LOVE, ALWAYS" : "A LITTLE SURPRISE AWAITS"}
          </span>
        </p>
      </div>
      <section
        ref={letterRef}
        tabIndex={-1}
        hidden={phase !== "open"}
        className="letter"
        id="letter"
        aria-labelledby="letter-title"
      >
        <p className="eyebrow" lang="en">A GRADUATION INVITATION</p>
        <h2 id="letter-title" lang="en">
          A little milestone,
          <br />
          <em>a whole lot of joy.</em>
        </h2>
        <p>{copy.greeting}</p>
        <p>
          {copy.story}
        </p>
        <p>
          {copy.invitation}
        </p>
        <div className="event-details">
          <div>
            <span lang="en">WHEN</span>
            <strong><time dateTime="2026-11-29">29/11/2026</time></strong>
            <p>11:00 – 12:30<br />16:30 – đến khi kết thúc</p>
            <p>{copy.timeNote}</p>
          </div>
          <div>
            <span lang="en">WHERE</span>
            <strong>Hội trường Trần Chí Đáo</strong>
            <p>Nhà Điều hành Đại học Quốc gia Thành phố Hồ Chí Minh.</p>
            <a
              className="maps-button"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hội trường Trần Chí Đáo, Nhà Điều hành Đại học Quốc gia Thành phố Hồ Chí Minh")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xem Hội trường Trần Chí Đáo trên Google Maps (mở tab mới)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Xem bản đồ <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <section className="invitation-contact" aria-labelledby="contact-title">
          <h3 id="contact-title" lang="en">GET IN TOUCH</h3>
          <div className="invitation-contact-row">
            <div className="invitation-contact-person">
              <strong>Minh Triều</strong>
              <span>0834 665 607</span>
            </div>
            <a className="invitation-call-button" href="tel:+84834665607" aria-label="Gọi Minh Triều qua số 0834665607">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
              </svg>
              Gọi
            </a>
          </div>
        </section>
        <p className="signature">{copy.closing}</p>
        <p className="signature-name">Minh Triều</p>
        <button className="text-button" onClick={closeLetter}>
          Gấp lại lời mời ↑
        </button>
      </section>
      <footer lang="en">
        <span>SENT WITH LOVE AND GRATITUDE</span>
        <span>Made of memories & a little magic ✧</span>
      </footer>
    </main>
  );
}
