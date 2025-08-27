import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../css/QuoteGenerator.css";

interface QuoteShape {
  line: string;
  by: string;
}

const QuotesApp: React.FC = () => {
  const [current, setCurrent] = useState<QuoteShape | null>(null);
  const [busy, setBusy] = useState(false);
  const [notify, setNotify] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  //check online activity
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch a random quote from backend
  const fetchQuote = async () => {
    setBusy(true);
    try {
      const resp = await axios.get("http://localhost:5000/quotes");
      const info = resp.data;

      setCurrent({
        line: info.text,
        by: info.author || "Anonymous"
      });
    } catch (e) {
      console.warn("Could not fetch quote:", e);
      setCurrent({
        line: "Something went wrong. Try again later.",
        by: "Server"
      });
    } finally {
      setBusy(false);
    }
  };

  // Download the quote
  const downloadFile = () => {
    if (!current) return;
    const fileContent = `"${current.line}"\n— ${current.by}`;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "random_quote.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotify("Quote saved to file!");
    setTimeout(() => setNotify(""), 1800);
  };

  // Share on WhatsApp
  const WhatsAppclick = () => {
    if (!current) return;
    const encodedText = encodeURIComponent(`"${current.line}" — ${current.by}`);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, "_blank");
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="magic-wrapper">
      <h2 className="page-title">Quotes App</h2>

      {!isOnline && (
        <div className="offline-box">
           No Internet Connection.Please connect to Internet
        </div>
      )}

      <div className="quote-box">
        {busy ? (
          <div className="loading-ring" />
        ) : (
          current && (
            <div className="line-card">
              <p className="line-text">“{current.line}”</p>
              <p className="line-author">— {current.by}</p>
            </div>
          )
        )}
      </div>

      <div className="control-row">
        <button onClick={fetchQuote} className="btn funky" disabled={busy}>
          Get New
        </button>
        <button
          onClick={downloadFile}
          className="btn outline"
          disabled={!current || busy}
        >
          Save
        </button>
        <button
          onClick={WhatsAppclick}
          className="btn greenish"
          disabled={!current || busy}
        >
          WhatsApp
        </button>
      </div>

      {notify && <div className="pop-msg">{notify}</div>}
    </div>
  );
};

export default QuotesApp;
