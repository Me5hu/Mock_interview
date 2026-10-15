import { useEffect, useMemo, useState } from 'react'
import { Activity, ArrowLeft, ArrowRight, Atom, Award, BookOpen, Check, CheckCircle2, ChevronRight, CircleHelp, Clock3, Code2, Coffee, Database, GraduationCap, LayoutDashboard, LogOut, Menu, Play, RotateCcw, ShieldCheck, Sparkles, Target, Terminal, Trophy, UserRound, X, Zap } from 'lucide-react'
import { courses, questionBank } from './data'

const iconMap = { layout: LayoutDashboard, code: Code2, atom: Atom, terminal: Terminal, coffee: Coffee, database: Database }
const emptyStats = { attempts: [], bestScores: {} }
const readStore = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }

export default function App() {
  const [student, setStudent] = useState(() => readStore('skillcheck-student', null))
  const [authMode, setAuthMode] = useState('register')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', college: '' })
  const [authError, setAuthError] = useState('')
  const [page, setPage] = useState('dashboard')
  const [course, setCourse] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)
  const [stats, setStats] = useState(() => readStore('skillcheck-stats', emptyStats))
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showReview, setShowReview] = useState(false)

  useEffect(() => { if (student) localStorage.setItem('skillcheck-student', JSON.stringify(student)) }, [student])
  useEffect(() => { localStorage.setItem('skillcheck-stats', JSON.stringify(stats)) }, [stats])

  const questions = course ? questionBank[course.id] : []
  const currentQuestion = questions[questionIndex]
  const answeredCount = Object.values(answers).filter(v => v !== undefined).length
  const score = questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
  const percent = questions.length ? Math.round(score / questions.length * 100) : 0
  const previousBest = course ? stats.bestScores[course.id] : null

  function handleAuth(e) {
    e.preventDefault()
    setAuthError('')
    if (!authForm.email.trim() || !authForm.password.trim()) { setAuthError('Please enter your email and password.'); return }
    if (authMode === 'register' && !authForm.name.trim()) { setAuthError('Please enter your full name.'); return }
    if (authForm.password.length < 4) { setAuthError('For this demo, password must be at least 4 characters.'); return }
    const profile = { name: authMode === 'register' ? authForm.name.trim() : (authForm.name.trim() || authForm.email.split('@')[0]), email: authForm.email.trim(), college: authForm.college.trim() }
    setStudent(profile)
    localStorage.setItem('skillcheck-student', JSON.stringify(profile))
    setPage('dashboard')
  }
  function logout() {
    setStudent(null); setPage('dashboard'); setCourse(null); setFinished(false)
    setAuthForm({ name: '', email: '', password: '', college: '' })
  }
  function beginInterview(selected) {
    setCourse(selected); setQuestionIndex(0); setAnswers({}); setFinished(false); setShowReview(false); setPage('interview')
  }
  function finishInterview() {
    const correct = questionBank[course.id].reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
    const result = { courseId: course.id, courseName: course.name, score: correct, total: questionBank[course.id].length, percent: Math.round(correct / questionBank[course.id].length * 100), answers: { ...answers }, date: new Date().toISOString() }
    setStats(old => ({ attempts: [result, ...old.attempts].slice(0, 20), bestScores: { ...old.bestScores, [course.id]: Math.max(old.bestScores[course.id] ?? 0, result.percent) } }))
    setFinished(true)
    setPage('result')
  }
  function selectAnswer(optionIndex) { setAnswers(old => ({ ...old, [questionIndex]: optionIndex })) }
  function nav(to) { setPage(to); setShowMobileNav(false) }

  if (!student) return <AuthScreen mode={authMode} setMode={setAuthMode} form={authForm} setForm={setAuthForm} error={authError} onSubmit={handleAuth} />

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Choose a course', icon: BookOpen },
    { id: 'results', label: 'My results', icon: Trophy }
  ]

  return <div className="portal">
    <aside className={`sidebar ${showMobileNav ? 'open' : ''}`}>
      <div className="brand"><div className="brand-icon"><GraduationCap size={23}/></div><span>skill<span>check</span></span><button className="mobile-close icon-button" onClick={() => setShowMobileNav(false)}><X size={18}/></button></div>
      <div className="side-label">STUDENT PORTAL</div>
      <nav>{navItems.map(item => { const Icon = item.icon; return <button key={item.id} className={`nav-link ${page === item.id || (page === 'interview' && item.id === 'courses') || (page === 'result' && item.id === 'results') ? 'active' : ''}`} onClick={() => nav(item.id)}><Icon size={18}/>{item.label}<ChevronRight size={15} className="nav-chevron"/></button> })}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-symbol"><Sparkles size={18}/></div><strong>Ready to test your skills?</strong><p>Choose a course and answer five questions to see your score.</p><button onClick={() => nav('courses')}>Start interview <ArrowRight size={14}/></button></div><button className="student-mini" onClick={logout}><div className="student-avatar">{student.name?.charAt(0)?.toUpperCase() || 'S'}</div><div><strong>{student.name}</strong><small>Student account</small></div><LogOut size={16} className="logout-icon"/></button></div>
    </aside>
    {showMobileNav && <div className="scrim" onClick={() => setShowMobileNav(false)}/>}
    <main className="main">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-button" onClick={() => setShowMobileNav(true)}><Menu size={20}/></button><span>Student portal</span><span className="slash">/</span><strong>{page === 'dashboard' ? 'Dashboard' : page === 'courses' ? 'Course selection' : page === 'interview' ? 'Interview in progress' : page === 'result' ? 'Interview result' : 'My results'}</strong></div><div className="topbar-right"><span className="secure"><ShieldCheck size={15}/> Practice mode</span><div className="top-avatar">{student.name?.charAt(0)?.toUpperCase() || 'S'}</div></div></header>
      <div className="content">
        {page === 'dashboard' && <Dashboard student={student} stats={stats} onChoose={() => nav('courses')} onStart={beginInterview}/>}
        {page === 'courses' && <CourseSelection stats={stats} onStart={beginInterview}/>}
        {page === 'interview' && course && currentQuestion && <div className="interview-page">
          <button className="back-link" onClick={() => { if (window.confirm('Leave this interview? Your current answers will be lost.')) nav('courses') }}><ArrowLeft size={16}/> Back to courses</button>
          <div className="interview-header"><div><span className="eyebrow">COURSE INTERVIEW</span><h1>{course.name} <span>assessment</span></h1><p>Choose one answer for each question. Your result appears after question 5.</p></div><div className="assessment-badge"><Clock3 size={17}/><span><strong>5 MCQs</strong><small>One question at a time</small></span></div></div>
          <div className="interview-layout"><div className="question-card">
            <div className="question-card-top"><span className="question-step">QUESTION <b>{String(questionIndex + 1).padStart(2,'0')}</b><span> / 05</span></span><span className="answered-tag"><CheckCircle2 size={14}/>{answeredCount} answered</span></div>
            <div className="progress-track"><div style={{ width: `${(questionIndex + 1) / questions.length * 100}%` }}/></div>
            <h2>{currentQuestion.q}</h2><p className="choose-hint">Select the best answer from the options below.</p>
            <div className="options-list">{currentQuestion.options.map((option, i) => <button key={option} className={`option ${answers[questionIndex] === i ? 'selected' : ''}`} onClick={() => selectAnswer(i)}><span className="option-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span><span className="option-check">{answers[questionIndex] === i && <Check size={15}/>}</span></button>)}</div>
            <div className="question-footer"><button className="btn btn-outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex(i => i - 1)}><ArrowLeft size={16}/> Previous</button><span>{questionIndex + 1} of {questions.length}</span>{questionIndex < questions.length - 1 ? <button className="btn btn-primary" onClick={() => setQuestionIndex(i => i + 1)}>Next question <ArrowRight size={16}/></button> : <button className="btn btn-primary" onClick={() => { if (answeredCount < questions.length && !window.confirm(`You have answered ${answeredCount} out of 5 questions. Submit anyway?`)) return; finishInterview() }}>Submit interview <CheckCircle2 size={16}/></button>}</div>
          </div><aside className="interview-aside"><div className="aside-course-icon"><CourseIcon course={course}/></div><span className="aside-label">CURRENT COURSE</span><h3>{course.name}</h3><p>{course.description}</p><div className="aside-divider"/><div className="aside-detail"><BookOpen size={16}/><span><strong>5 questions</strong><small>Multiple choice</small></span></div><div className="aside-detail"><Target size={16}/><span><strong>One correct answer</strong><small>Per question</small></span></div><div className="aside-detail"><Award size={16}/><span><strong>Instant result</strong><small>Score and answer review</small></span></div><div className="notice"><CircleHelp size={16}/><p>You can go back to change an answer before submitting your interview.</p></div></aside></div>
        </div>}
        {page === 'result' && course && <ResultPage course={course} answers={answers} score={score} percent={percent} onCourses={() => nav('courses')} onDashboard={() => nav('dashboard')} onRetry={() => beginInterview(course)} showReview={showReview} setShowReview={setShowReview}/>}
        {page === 'results' && <ResultsPage stats={stats} onOpenCourse={(a) => { const c = courses.find(x => x.id === a.courseId); if (c) { setCourse(c); setPage('result'); setFinished(true); setAnswers(a.answers || {}); setShowReview(true); } }} onCourses={() => nav('courses')}/>}
      </div>
      <footer className="footer"><span>© 2026 SkillCheck Student Portal</span><span><span className="online-dot"/> Progress is saved on this device</span><span>Learn · Practice · Improve <Sparkles size={13}/></span></footer>
    </main>
  </div>
}

function AuthScreen({ mode, setMode, form, setForm, error, onSubmit }) {
  const isRegister = mode === 'register'
  return <div className="auth-page"><div className="auth-left"><div className="auth-brand"><div className="brand-icon"><GraduationCap size={23}/></div><span>skill<span>check</span></span></div><div className="auth-hero"><div className="hero-kicker"><span/> STUDENT INTERVIEW PORTAL</div><h1>Your next opportunity starts with <span>practice.</span></h1><p>Prepare for placements with course-based MCQ interviews. Answer questions, check your score, and track your improvement.</p><div className="hero-points"><div><span><Check size={15}/></span>Short, focused course assessments</div><div><span><Check size={15}/></span>Instant score and answer explanations</div><div><span><Check size={15}/></span>Practice at your own pace</div></div><div className="hero-art"><div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/><div className="art-paper"><div className="paper-check"><CheckCircle2 size={29}/></div><strong>Interview complete!</strong><span>Your result is ready</span><div className="paper-score"><div><small>SCORE</small><b>4/5</b></div><div className="score-bars"><i/><i/><i/><i/><i/></div></div></div><div className="art-float float-star"><Sparkles size={19}/></div><div className="art-float float-trophy"><Trophy size={20}/></div></div></div><div className="auth-left-footer">BUILT FOR LEARNING. DESIGNED FOR CONFIDENCE.</div></div><div className="auth-right"><div className="auth-form-wrap"><div className="mobile-auth-brand"><div className="brand-icon"><GraduationCap size={22}/></div><span>skill<span>check</span></span></div><div className="form-heading"><div className="form-icon"><UserRound size={21}/></div><div className="eyebrow">{isRegister ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}</div><h2>{isRegister ? 'Create student account' : 'Sign in to SkillCheck'}</h2><p>{isRegister ? 'Register to start your course interviews.' : 'Enter your details to continue your practice.'}</p></div><form onSubmit={onSubmit} className="auth-form">
    {isRegister && <><label>Full name</label><div className="input-wrap"><UserRound size={17}/><input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Enter your full name" autoComplete="name"/></div></>}
    <label>Email address</label><div className="input-wrap"><span className="at-icon">@</span><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@example.com" autoComplete="email"/></div>
    {isRegister && <><label>College / institution <span className="optional">(optional)</span></label><div className="input-wrap"><GraduationCap size={17}/><input value={form.college} onChange={e => setForm({...form,college:e.target.value})} placeholder="Your college name"/></div></>}
    <label>Password</label><div className="input-wrap"><ShieldCheck size={17}/><input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} placeholder="At least 4 characters" autoComplete={isRegister?'new-password':'current-password'}/></div>
    {error && <div className="auth-error">{error}</div>}
    <button className="btn btn-primary auth-submit" type="submit">{isRegister ? 'Create account' : 'Sign in'} <ArrowRight size={17}/></button>
    </form><div className="auth-switch">{isRegister ? 'Already registered?' : 'New to SkillCheck?'} <button onClick={() => setMode(isRegister?'login':'register')}>{isRegister?'Sign in':'Create an account'}</button></div><div className="demo-note"><ShieldCheck size={15}/><span>Demo mode: account details are stored only in this browser. Do not use a real password.</span></div></div><div className="auth-right-footer">© 2026 SkillCheck <span>•</span> Student practice portal</div></div></div>
}

function CourseIcon({course}) {
  const Icon = iconMap[course.icon] || BookOpen
  return <Icon size={25}/>
}

function Dashboard({student, stats, onChoose, onStart}) {
  const attempts = stats.attempts || []
  const average = attempts.length ? Math.round(attempts.reduce((s,a)=>s+a.percent,0)/attempts.length) : 0
  return <div className="dashboard-page"><div className="welcome-banner"><div><div className="eyebrow"><Sparkles size={13}/> STUDENT DASHBOARD</div><h1>Welcome back, {student.name.split(' ')[0]}! <span>✦</span></h1><p>Ready to test what you know? Choose a course and start your interview.</p><button className="btn btn-primary" onClick={onChoose}><Play size={16} fill="currentColor"/> Start an interview <ArrowRight size={16}/></button></div><div className="welcome-graphic"><div className="graphic-circle circle-back"/><div className="graphic-circle circle-front"><GraduationCap size={48}/></div><div className="graphic-chip"><Zap size={15}/> Let's grow!</div><div className="graphic-star">✦</div></div></div>
    <div className="stat-grid"><Stat icon={Activity} label="Interviews taken" value={attempts.length} color="violet" note="Your practice sessions"/><Stat icon={Target} label="Average score" value={`${average}%`} color="mint" note="Across all attempts"/><Stat icon={Trophy} label="Best course score" value={`${Math.max(0,...Object.values(stats.bestScores || {}))}%`} color="amber" note="Your personal best"/><Stat icon={BookOpen} label="Available courses" value={courses.length} color="blue" note="Choose what to practice"/></div>
    <div className="section-heading"><div><span className="eyebrow">PICK YOUR NEXT CHALLENGE</span><h2>Available courses</h2><p>Select a course to begin a 5-question MCQ interview.</p></div><button className="view-all" onClick={onChoose}>View all courses <ArrowRight size={15}/></button></div>
    <div className="course-grid dashboard-courses">{courses.slice(0,3).map(c=><CourseCard key={c.id} course={c} best={stats.bestScores?.[c.id]} onStart={onStart}/>)}</div>
    <div className="bottom-grid"><div className="recent-card"><div className="section-heading compact"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Recent interviews</h2></div><button className="view-all" onClick={onChoose}>Practice more <ArrowRight size={14}/></button></div>{attempts.length ? attempts.slice(0,3).map((a,i)=><div className="recent-row" key={`${a.date}-${i}`}><div className="recent-course-icon"><BookOpen size={17}/></div><div className="recent-copy"><strong>{a.courseName}</strong><small>{new Date(a.date).toLocaleDateString()}</small></div><div className="recent-score"><strong>{a.score}/{a.total}</strong><small>{a.percent}% score</small></div><span className={`result-chip ${a.percent>=60?'passed':'review'}`}>{a.percent>=60?'Passed':'Keep practicing'}</span></div>) : <div className="empty-recent"><div className="empty-recent-icon"><BookOpen size={20}/></div><strong>No interviews yet</strong><p>Your completed interviews and scores will appear here.</p><button className="btn btn-outline" onClick={onChoose}>Choose a course <ArrowRight size={14}/></button></div>}</div><div className="tip-card"><div className="tip-bulb"><Sparkles size={20}/></div><span className="eyebrow">A LITTLE REMINDER</span><h3>Progress comes from practice.</h3><p>Read each question carefully, eliminate options you know are incorrect, and review the explanations after your result.</p><div className="tip-bottom"><CheckCircle2 size={16}/> <span>One question at a time</span></div></div></div>
  </div>
}

function Stat({icon:Icon,label,value,color,note}) {
  return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={19}/></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div></div>
}

function CourseSelection({stats,onStart}) {
  const [search,setSearch] = useState('')
  const filtered = useMemo(()=>courses.filter(c=>`${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase())),[search])
  return <div className="courses-page"><div className="page-title-row"><div><span className="eyebrow">COURSE LIBRARY</span><h1>Choose your course</h1><p>Each interview contains five multiple-choice questions. Your score appears at the end.</p></div><div className="total-course-badge"><BookOpen size={18}/><span><strong>{courses.length} courses</strong><small>Available to practice</small></span></div></div><div className="course-search"><BookOpen size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses..."/></div><div className="course-grid">{filtered.map(c=><CourseCard key={c.id} course={c} best={stats.bestScores?.[c.id]} onStart={onStart}/>)}</div>{!filtered.length&&<div className="empty-recent"><strong>No matching courses</strong><p>Try searching another course name.</p></div>}<div className="how-it-works"><div className="how-icon"><ShieldCheck size={20}/></div><div><strong>How the interview works</strong><p>Choose a course → answer 5 MCQs one by one → submit your answers → see your score, pass status, and explanations.</p></div></div></div>
}

function CourseCard({course,best,onStart}) {
  return <article className="course-card"><div className="course-card-top"><div className={`course-icon ${course.color}`}><CourseIcon course={course}/></div><span className="level-pill">{course.level}</span></div><h3>{course.name}</h3><p>{course.description}</p><div className="course-meta"><span><BookOpen size={14}/> 5 questions</span><span><Clock3 size={14}/> 5 min approx.</span></div>{best!==undefined&&<div className="best-score"><Trophy size={13}/> Your best: <strong>{best}%</strong></div>}<button className="course-start" onClick={()=>onStart(course)}>Start interview <ArrowRight size={16}/></button></article>
}

function ResultPage({course,answers,score,percent,onCourses,onDashboard,onRetry,showReview,setShowReview}) {
  const qs = questionBank[course.id]
  const passed = percent >= 60
  return <div className="result-page"><div className="result-back"><button className="back-link" onClick={onDashboard}><ArrowLeft size={16}/> Dashboard</button></div><div className="result-hero"><div className={`result-medal ${passed?'success':'retry'}`}>{passed?<Trophy size={31}/>:<Target size={31}/>}</div><span className={`status-pill ${passed?'pass':'retry'}`}>{passed?'INTERVIEW COMPLETED':'KEEP PRACTICING'}</span><h1>{passed?'Great work!':'Good effort!'}</h1><p>{passed?'You reached the passing score for this course. Keep practicing to improve your result.':'Every attempt helps you learn. Review the explanations and try again to improve your score.'}</p><div className="score-ring" style={{'--score':`${percent*3.6}deg`}}><div><strong>{percent}%</strong><span>YOUR SCORE</span></div></div><div className="result-stats"><div><span>Correct answers</span><strong>{score} <small>/ {qs.length}</small></strong></div><div><span>Incorrect answers</span><strong>{qs.length-score} <small>/ {qs.length}</small></strong></div><div><span>Passing score</span><strong>60<small>%</small></strong></div></div><div className="result-actions"><button className="btn btn-primary" onClick={()=>setShowReview(!showReview)}><BookOpen size={16}/>{showReview?'Hide answer review':'Review answers'}</button><button className="btn btn-outline" onClick={onRetry}><RotateCcw size={16}/> Try again</button><button className="btn btn-outline" onClick={onCourses}>Other courses <ArrowRight size={15}/></button></div></div>
    {showReview&&<div className="review-panel"><div className="review-heading"><div><span className="eyebrow">LEARN FROM YOUR ANSWERS</span><h2>Answer review</h2></div><span className="review-count">{score}/{qs.length} correct</span></div>{qs.map((q,i)=>{const correct=answers[i]===q.answer;return <div className="review-item" key={i}><div className={`review-mark ${correct?'correct':'wrong'}`}>{correct?<Check size={16}/>:<X size={16}/>}</div><div className="review-content"><strong>{i+1}. {q.q}</strong><p className={correct?'your-answer':'your-answer wrong-text'}>Your answer: {answers[i]===undefined?'Not answered':q.options[answers[i]]}</p><p className="correct-answer">Correct answer: {q.options[q.answer]}</p><div className="explanation">{q.explanation}</div></div></div>})}</div>}
    <div className="result-footnote"><ShieldCheck size={16}/> Your result is saved to this browser's interview history.</div></div>
}

function ResultsPage({stats,onOpenCourse,onCourses}) {
  const attempts = stats.attempts || []
  return <div className="results-page"><div className="page-title-row"><div><span className="eyebrow">YOUR PROGRESS</span><h1>My results</h1><p>Review the scores from your completed course interviews.</p></div><div className="results-total"><Trophy size={19}/><span><strong>{attempts.length}</strong><small>Completed</small></span></div></div>{attempts.length?<div className="results-table"><div className="results-table-head"><span>COURSE</span><span>DATE</span><span>SCORE</span><span>STATUS</span><span/></div>{attempts.map((a,i)=><div className="results-table-row" key={`${a.date}-${i}`}><div className="result-course-name"><div className="result-table-icon"><BookOpen size={17}/></div><strong>{a.courseName}</strong></div><span className="result-date">{new Date(a.date).toLocaleDateString()}</span><strong className="table-score">{a.score}/{a.total} <small>({a.percent}%)</small></strong><span className={`result-chip ${a.percent>=60?'passed':'review'}`}>{a.percent>=60?'Passed':'Keep practicing'}</span><button className="icon-button open-result" title="Open result" onClick={()=>onOpenCourse(a)}><ChevronRight size={18}/></button></div>)}</div>:<div className="no-results"><div className="no-results-icon"><Trophy size={26}/></div><h2>Your results will show up here.</h2><p>Complete your first course interview to start building your progress history.</p><button className="btn btn-primary" onClick={onCourses}>Choose a course <ArrowRight size={15}/></button></div>}</div>
}
