/* TechMagpies Community — content.
   ----------------------------------------------------------------------
   EVERYTHING IN THIS FILE IS SAMPLE CONTENT (sample: true).
   Replace the entries with real, permission-checked ones and delete
   `sample: true` — the "Sample" badges disappear automatically.

   - project.github / project.demo : real URLs. If github is empty, the page links to
     the GitHub topic page for the project's first technology instead (clearly labelled).
   - project.photo / story.photo : image path (the sample projects use illustrated app screenshots; swap for real screenshots), e.g. 'assets/img/community/priya.jpg'.
     Only add a photo with the student's permission. Without one, a colourful initials tile is shown.
   - dates are offsets from "today" so the sample schedule never goes stale.
   ---------------------------------------------------------------------- */
window.TM_COMMUNITY = {
  projects: [
    {
      id: 'campus-attendance', sample: true, photo: 'assets/img/community/projects/campus-attendance.jpg', icon: 'clipboard', tone: 'blue',
      title: 'Campus Attendance Tracker',
      author: 'Kumkum Singh', college: '',
      short: 'A Django web app that lets lecturers mark attendance in two taps and sends weekly summaries.',
      long: 'Lecturers pick a class, tick absentees and submit. Students see their attendance percentage per subject, and a weekly summary is generated for every section. Built as a team project to replace paper registers.',
      tech: ['Python', 'Django', 'SQLite', 'Bootstrap'],
      highlights: ['Role-based login for lecturers and students', 'Weekly attendance summary per section', 'CSV export for department records'],
      github: '', demo: ''
    },
    {
      id: 'smart-irrigation', sample: true, photo: 'assets/img/community/projects/smart-irrigation.jpg', icon: 'wave', tone: 'green',
      title: 'Smart Irrigation Controller',
      author: 'Mohitha', college: '',
      short: 'ESP32 + soil-moisture sensors that water a small farm plot only when the soil is dry.',
      long: 'Soil-moisture readings are sampled every few minutes and a relay opens the valve only below a threshold. A small dashboard shows live moisture and the watering history.',
      tech: ['ESP32', 'Embedded C', 'MQTT', 'IoT'],
      highlights: ['Low-power sampling cycle', 'Threshold tuning from the dashboard', 'Saves water compared with a fixed timer'],
      github: '', demo: ''
    },
    {
      id: 'resume-scorer', sample: true, fit: 'contain', photo: 'assets/img/community/projects/resume-scorer.jpg', icon: 'file', tone: 'purple',
      title: 'Resume Keyword Scorer',
      author: 'Abhi', college: '',
      short: 'Paste a job description and a resume; get a keyword-match score and missing skills.',
      long: 'A small NLP tool that extracts skills from a job description, compares them with a resume and lists the gaps to fix. Runs entirely in the browser.',
      tech: ['JavaScript', 'NLP', 'HTML', 'CSS'],
      highlights: ['Runs fully client-side', 'Highlights missing keywords', 'Exports a short improvement checklist'],
      github: '', demo: ''
    },
    {
      id: 'ev-range', sample: true, fit: 'contain', photo: 'assets/img/community/projects/ev-range.jpg', icon: 'car', tone: 'orange',
      title: 'EV Range Estimator',
      author: 'Sole', college: '',
      short: 'Estimates electric-scooter range from battery size, load and terrain using a simple model.',
      long: 'Takes battery capacity, rider weight and route profile and estimates range with a documented energy model. Includes a notebook that explains each assumption.',
      tech: ['Python', 'NumPy', 'Jupyter', 'Matplotlib'],
      highlights: ['Documented energy model', 'Plots for slope and load', 'Notebook walkthrough'],
      github: '', demo: ''
    },
    {
      id: 'study-planner', sample: true, fit: 'contain', photo: 'assets/img/community/projects/study-planner.jpg', icon: 'calendar', tone: 'pink',
      title: 'Exam Study Planner',
      author: 'Gouri', college: '',
      short: 'Turns a syllabus and exam dates into a day-by-day revision plan.',
      long: 'Enter subjects, topic weightage and exam dates; the planner spreads revision across the available days and keeps a buffer for mock tests.',
      tech: ['React', 'JavaScript', 'LocalStorage'],
      highlights: ['Weighted topic scheduling', 'Works offline', 'Printable weekly view'],
      github: '', demo: ''
    },
    {
      id: 'sign-detect', sample: true, photo: 'assets/img/community/projects/sign-detect.jpg', icon: 'eye', tone: 'sky',
      title: 'Traffic Sign Detector',
      author: 'Harsh', college: '',
      short: 'A small CNN that recognises common traffic signs from webcam frames.',
      long: 'Trained on a public traffic-sign dataset and exported for lightweight inference. The write-up compares two architectures and explains the trade-offs.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'CNN'],
      highlights: ['Compares two model sizes', 'Real-time webcam demo', 'Clear evaluation notes'],
      github: '', demo: ''
    }
  ],

  challenge: {
    id: 'weekly', sample: true,
    title: 'Build a Mini Habit Tracker',
    difficulty: 'Beginner – Intermediate',
    short: 'Build a small web app that lets a user add daily habits, tick them off and see a 7-day streak.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    deadlineDow: 0, deadlineHour: 23, deadlineMin: 59,          // next Sunday, 11:59 PM
    description: 'Habits stick when progress is visible. Build a compact tracker that keeps people consistent — no frameworks required, but you may use one if you prefer.',
    instructions: [
      'Let the user add and delete habits.',
      'Let the user mark a habit done for today, and show the last 7 days as a row of dots.',
      'Show the current streak for each habit.',
      'Save data in the browser so it survives a refresh.',
      'Make it usable on a phone-sized screen.',
      'Bonus: add a simple weekly summary.'
    ],
    submit: 'Share a GitHub repository link (and a live link if you have one) plus a two-line description of what you built.'
  },

  teams: [
    {
      id: 'team-health', sample: true, icon: 'bulb',
      title: 'Hospital Queue Display',
      short: 'A web display and token system to cut waiting-room confusion in small clinics.',
      long: 'We are building a lightweight token and queue display for small clinics: reception issues tokens, the waiting-room screen shows who is next. Looking for teammates to finish a working prototype.',
      skills: ['HTML/CSS', 'JavaScript', 'Node.js', 'UI design'],
      roles: [['Frontend developer', 1], ['Backend developer', 1], ['UI designer', 1]]
    },
    {
      id: 'team-drone', sample: true, icon: 'cpu',
      title: 'Line-Following Robot',
      short: 'An Arduino-based line follower with PID tuning for a college tech fest.',
      long: 'A two-wheel robot that follows a track using IR sensors with PID control. We need people for sensor calibration, motor-driver wiring and the PID tuning notes.',
      skills: ['Arduino', 'Embedded C', 'Electronics', 'Control basics'],
      roles: [['Embedded developer', 1], ['Hardware / wiring', 1]]
    },
    {
      id: 'team-ml', sample: true, icon: 'chart',
      title: 'Crop Disease Classifier',
      short: 'An image classifier for common leaf diseases, with a simple phone-friendly demo.',
      long: 'Train and evaluate a classifier on a public leaf-disease dataset and wrap it in a small web demo. Looking for help with data cleaning, model evaluation and the demo page.',
      skills: ['Python', 'Machine Learning', 'TensorFlow / PyTorch', 'Flask'],
      roles: [['ML engineer', 2], ['Web developer', 1]]
    }
  ],

  sessions: [
    {
      id: 'session-backend', sample: true, icon: 'server',
      title: 'Backend Careers: From Django to Production',
      mentor: 'Sample Mentor 1', role: 'Senior Backend Engineer',
      topic: 'Backend development', dayOffset: 3, hour: 19, min: 0, duration: '60 min',
      about: 'A relaxed walkthrough of what junior backend engineers actually do, the skills interviewers look for, and how to build a portfolio project that shows them.',
      agenda: ['What a backend role looks like day to day', 'Project ideas that stand out', 'Live Q&A']
    },
    {
      id: 'session-resume', sample: true, icon: 'file',
      title: 'Resume Review Clinic',
      mentor: 'Sample Mentor 2', role: 'Engineering Manager',
      topic: 'Resumes and placements', dayOffset: 6, hour: 18, min: 30, duration: '45 min',
      about: 'Bring your resume. The mentor reviews a few live (with permission) and explains what recruiters scan for in the first ten seconds.',
      agenda: ['Resume structure that passes ATS', 'Writing project bullets that show impact', 'Live reviews']
    },
    {
      id: 'session-embedded', sample: true, icon: 'cpu',
      title: 'Getting Started with Embedded & IoT',
      mentor: 'Sample Mentor 3', role: 'Embedded Systems Engineer',
      topic: 'Electronics / IoT', dayOffset: 10, hour: 19, min: 30, duration: '60 min',
      about: 'A beginner-friendly session on choosing a first board, a first sensor project and how to document it for a portfolio.',
      agenda: ['Choosing a first board', 'A weekend project, step by step', 'Live Q&A']
    }
  ],

  stories: [
    {
      id: 'member-kumkum-singh',
      name: 'Kumkum Singh',
      headline: 'Aspiring Data Scientist | Ambassador | Open to Work',
      location: 'Andhra Pradesh, India',
      about: 'Kumkum Singh is an aspiring Data Science professional passionate about exploring opportunities in technology, developing practical skills, and gaining industry experience. As an ambassador, she is interested in connecting with people, sharing knowledge, and exploring new learning opportunities. She is focused on growing her technical expertise and building a strong professional foundation.',
      interests: ['Data Science', 'Technology', 'Continuous learning'],
      photo: 'assets/img/a1.jpg',
      linkedin: 'https://www.linkedin.com/in/kumkum-singh-ds-a373b0379/'
    },
    {
      id: 'member-sane-guru-mohitha',
      name: 'Sane Guru Mohitha',
      headline: 'B.Tech CSE Student | Web Developer | Prompt Engineer | AI Enthusiast',
      education: 'Gouthami College for Women',
      about: 'Sane Guru Mohitha is a Computer Science and Engineering student at Gouthami College for Women, passionate about web development and emerging technologies. With interests in Python, Java, C, HTML, and CSS, she enjoys exploring AI-driven solutions and building innovative applications. She is enthusiastic about learning, experimenting with technology, and transforming creative ideas into practical solutions.',
      interests: ['C', 'Java', 'Python', 'HTML', 'CSS', 'Web Development', 'Prompt Engineering', 'Artificial Intelligence'],
      photo: 'assets/images/students/mohitha-saneguru.jpg',
      linkedin: 'https://www.linkedin.com/in/sanegurumohitha1516/'
    },
    {
      id: 'member-swarnima-tyagi',
      name: 'Swarnima Tyagi',
      headline: 'Student | Aspiring Professional',
      education: 'Indian Institute of Technology',
      about: 'Swarnima Tyagi is a student at the Indian Institute of Technology, focused on developing her academic and professional journey. She is building her professional network and exploring opportunities to learn, grow, and expand her experience. Her journey reflects an interest in continuous learning and professional development.',
      interests: ['Continuous learning', 'Professional development'],
      photo: 'assets/img/a3.jpg',
      linkedin: 'https://www.linkedin.com/in/swarnima-tyagi-a24a6b253/'
    }
  ],

  guidelines: [
    ['Be kind and constructive', 'Give feedback that helps people improve. Critique the work, never the person.'],
    ['Share your own work', 'Submit projects you built yourself or with your team, and credit anyone who helped.'],
    ['Respect privacy', 'Do not share anyone\'s personal details, photos or achievements without their permission.'],
    ['Keep it safe', 'Never post keys, passwords or private data in a repository or a message.'],
    ['Help others grow', 'Answer a question, review a project, or offer to team up. Everyone here is learning.']
  ]
};
