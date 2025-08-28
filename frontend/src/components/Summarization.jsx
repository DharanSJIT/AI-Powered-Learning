import React, { useState } from 'react';
import axios from 'axios';

const Summarization = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    setLoading(true);

    try {
      // Send the text to the OpenAI summarization API route
      const response = await axios.post("http://localhost:4000/api/openai/summarize", {
        text,
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error during summarization:", error);
    } finally {
      setLoading(false);
    }
  };

  // Internal CSS Styles
  const styles = {
    body: {
      fontFamily: "'Arial', sans-serif",
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f6f9',
      color: '#333',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    card: {
      background: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px',
      margin: '20px',
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '20px',
    },
    textInput: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '20px',
      resize: 'none',
      boxSizing: 'border-box',
    },
    textInputFocus: {
      outline: 'none',
      borderColor: '#3498db',
    },
    submitBtn: {
      padding: '10px 20px',
      fontSize: '1.1rem',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    submitBtnDisabled: {
      backgroundColor: '#b0c4de',
    },
    submitBtnHover: {
      backgroundColor: '#2980b9',
    },
    summaryContainer: {
      marginTop: '20px',
      textAlign: 'left',
    },
    summaryTitle: {
      fontSize: '1.5rem',
      color: '#2c3e50',
    },
    summaryText: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#34495e',
      wordWrap: 'break-word',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Text Summarizer</h1>
          <textarea
            value={text}
            onChange={handleInputChange}
            placeholder="Enter text to summarize"
            rows="6"
            style={styles.textInput}
            onFocus={(e) => e.target.style.borderColor = styles.textInputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={loading ? { ...styles.submitBtn, ...styles.submitBtnDisabled } : styles.submitBtn}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = styles.submitBtnHover.backgroundColor)}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3498db')}
          >
            {loading ? "Summarizing..." : "Summarize Text"}
          </button>

          {summary && (
            <div style={styles.summaryContainer}>
              <h2 style={styles.summaryTitle}>Summary:</h2>
              <p style={styles.summaryText}>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarization;
