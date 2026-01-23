# AI Resume & Cover Letter Builder 🚀

An AI-powered web application that generates **tailored resumes**, **custom cover letters**, and **ATS compatibility insights** using Google Gemini AI.

This project was built as a **personal learning project** to understand how real-world AI APIs are integrated into frontend applications.

---

## 🔥 Features

- ✍️ Tailored cover letter generation
- 📄 Resume optimization based on job description
- 📊 ATS match score (0–100)
- 🔍 Keyword match & missing keyword analysis
- ⚡ Real-time AI content generation
- 🧾 Clean Markdown-rendered output

---

## 🛠 Tech Stack

**Frontend**
- React
- JavaScript
- Vite
- CSS & Bootstrap
- react-markdown

**AI**
- Google Gemini API
- Model: `gemini-2.0-flash`

**Deployment**
- Render

---

## 🧠 How It Works

1. User enters:
   - Company name
   - Job description
   - Resume content (optional)
   - Experience level & tone
2. On button click, a structured prompt is sent to the Gemini API.
3. The AI returns:
   - Tailored cover letter
   - Optimized resume content
   - Keyword analysis
   - ATS compatibility score
4. Output is rendered using Markdown for readability.

---

## 📦 Environment Setup

Create a `.env` file in the root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
