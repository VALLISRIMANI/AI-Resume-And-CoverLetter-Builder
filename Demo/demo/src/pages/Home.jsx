import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function SaaSResumeCoverLetterBuilderPage() {
  const [userInput, setUserInput] = useState({
    companyName: '',
    experienceLevel: 'Fresher',
    coverLetterTone: 'Formal',
    jobDescription: '',
    currentResume: '',
  });

  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGeminiGenerate() {
    setLoading(true);
    setGeneratedContent('');

    const prompt = `
You are a professional career coach and resume optimization expert.

Your task is to generate a tailored cover letter, improve resume content, and perform an ATS compatibility analysis using the inputs provided.

Inputs:
Company Name: ${userInput.companyName}
Experience Level: ${userInput.experienceLevel} (Fresher or Experienced)
Job Description: ${userInput.jobDescription}
Current Resume: ${userInput.currentResume}
If the resume is empty, create a complete draft aligned with the job description.
Preferred Cover Letter Tone: ${userInput.coverLetterTone} (Formal, Informal, Casual, Professional)

Output Instructions:
Return the response in clearly separated sections. Keep the content professional, concise, ATS-friendly, and easy to render in a React application.

1. Tailored Cover Letter
Write a customized cover letter addressed to ${userInput.companyName}.
Use the specified tone: ${userInput.coverLetterTone}.
Align skills, experience, and achievements closely with the job description.
Keep the letter role-specific and impactful.

2. Optimized Resume Content
Provide improved resume content tailored to the job description, including:
A short professional summary
Achievement-focused bullet points for experience or projects
A relevant and optimized skills section
Use strong action verbs and measurable results where possible.

3. Keyword Match Analysis
Identify the most important keywords and skills from the job description.
Check whether they appear in the provided resume.
Clearly list matched keywords and missing keywords that should be added.

4. ATS Match Score
Estimate an ATS compatibility score on a scale of 0 to 100.
Briefly justify the score based on keyword alignment, relevance, and structure.

Ensure the output is structured, scannable, and production-ready.
`;

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      setGeneratedContent(
        data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      );
    } catch {
      setGeneratedContent('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

return (
    <div className="app-shell">
        <div className="container py-5">
            <header className="text-center mb-5 fade-in">
                <h1>
                    <i className="fa-solid fa-file-lines icon"></i>
                    AI Resume & Cover Letter Builder
                </h1>
                <p className="text-muted">
                    <i className="fa-solid fa-robot icon"></i>
                    ATS-optimized. Recruiter-ready.
                </p>
            </header>

            <section className="card form-card fade-up" style={{ maxWidth: 720 }}>
                <div className="grid">
                    <label className="form-label">
                        <i className="fa-solid fa-building icon"></i> Company Name
                    </label>
                    <input className="form-control" name="companyName" placeholder="Enter company name" onChange={handleInputChange} />
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            <i className="fa-solid fa-user-graduate icon"></i> Experience Level
                        </label>
                        <select className="form-select" name="experienceLevel" onChange={handleInputChange}>
                            <option>Fresher</option>
                            <option>Experienced</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            <i className="fa-solid fa-pen-nib icon"></i> Cover Letter Tone
                        </label>
                        <select className="form-select" name="coverLetterTone" onChange={handleInputChange}>
                            <option>Formal</option>
                            <option>Professional</option>
                            <option>Casual</option>
                        </select>
                    </div>
                </div>

                <div className="mt-3">
                    <label className="form-label">
                        <i className="fa-solid fa-briefcase icon"></i> Job Description
                    </label>
                    <textarea className="form-control" rows={4} name="jobDescription" placeholder='Paste The Job Description...' onChange={handleInputChange} />
                </div>

                <div className="mt-3">
                    <label className="form-label">
                        <i className="fa-solid fa-file icon"></i> Current Resume
                    </label>
                    <textarea className="form-control" rows={4} name="currentResume" placeholder='Paste Your Resume Content Here..' onChange={handleInputChange} />
                </div>

                <div className="d-grid mt-4">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleGeminiGenerate}
                        disabled={loading}
                    >
                        <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'} icon`}></i>
                        {loading ? 'Generating…' : 'Generate Resume & Cover Letter'}
                    </button>
                </div>
            </section>

            <section className="output-wrapper fade-up" style={{ maxWidth: 960 }}>
                {!generatedContent && !loading && (
                        <div className="text-center text-muted">
                            <p> Your generated resume and cover letter will appear here.</p>
                        </div>
                )}
                {loading && (
                    <div className="resume-output shimmer">
                        <p>Generating your content, please wait...</p>
                    </div>
                )}
                {generatedContent && !loading && (
                    <div className="resume-output slide-in">
                        <ReactMarkdown>{generatedContent}</ReactMarkdown>
                    </div>
                )}
            </section>
        </div>
    </div>  
    );
}

export default SaaSResumeCoverLetterBuilderPage;