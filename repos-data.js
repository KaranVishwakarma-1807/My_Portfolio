const GITHUB_REPOS = [
  {
    id: 'desktop-tutorial',
    name: 'desktop-tutorial',
    created: '2024-11-21',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/desktop-tutorial',
    category: 'Learning',
    shortDescription: 'My first GitHub repository — learning version control and the basics of pushing code.',
    about: [
      'This is where my GitHub journey began. I created it to understand commits, branches, and how to collaborate with a remote repository.',
      'It was a small step, but it set the foundation for every project that followed.'
    ]
  },
  {
    id: 'rain-dodge',
    name: 'Rain-Dodge',
    created: '2024-11-21',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Rain-Dodge',
    category: 'Games',
    shortDescription: 'A Pygame dodge game where you avoid falling raindrops — my first real game project.',
    about: [
      'Built with Python and Pygame, Rain-Dodge taught me game loops, collision detection, and sprite handling.',
      'It was one of my earliest attempts at turning programming concepts into something playable and fun.'
    ]
  },
  {
    id: 'galaxy-fighter',
    name: 'Galaxy-Fighter',
    created: '2024-11-25',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Galaxy-Fighter',
    category: 'Games',
    shortDescription: 'A space shooter built in Pygame with enemy waves and score tracking.',
    about: [
      'Galaxy-Fighter expanded on my game dev basics with shooting mechanics, enemy spawning, and progressive difficulty.',
      'Working on this project deepened my understanding of object-oriented design in game contexts.'
    ]
  },
  {
    id: 'galaxy-invader',
    name: 'Galaxy-Invader',
    created: '2024-11-29',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Galaxy-Invader',
    category: 'Games',
    shortDescription: 'A Space Invaders-style arcade game with retro gameplay and wave-based enemies.',
    about: [
      'Inspired by classic arcade games, Galaxy-Invader focused on grid-based enemy movement and player shooting.',
      'This project marked the end of my initial game dev burst in late 2024 — four games in under two weeks.'
    ]
  },
  {
    id: 'car-racer',
    name: 'Car-Racer',
    created: '2024-12-08',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Car-Racer',
    category: 'Games',
    shortDescription: 'A lane-based car racing game where you dodge obstacles at increasing speed.',
    about: [
      'Car-Racer introduced scrolling backgrounds and speed progression to my Pygame toolkit.',
      'It wrapped up my game development phase and pushed me toward web and applied CS projects.'
    ]
  },
  {
    id: 'login-form',
    name: 'Login-Form',
    created: '2025-02-15',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Login-Form',
    category: 'Web',
    shortDescription: 'A styled login and registration form built with HTML, CSS, and JavaScript.',
    about: [
      'After games, I shifted to web fundamentals. Login-Form was my first focused UI project with form validation and responsive layout.',
      'It reinforced how much polish matters in frontend work — spacing, typography, and feedback states.'
    ]
  },
  {
    id: 'spam-email-classifier',
    name: 'Spam-Email-Classifier',
    created: '2025-05-06',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Spam-Email-Classifier',
    category: 'ML / AI',
    shortDescription: 'A machine learning model that classifies emails as spam or ham using NLP techniques.',
    about: [
      'Part of my May 2025 ML burst — four AI projects in one day. This one used text preprocessing and classification algorithms on email datasets.',
      'It was my first end-to-end ML pipeline: data cleaning, feature extraction, training, and evaluation.'
    ]
  },
  {
    id: 'mnist-cnn-digit-recognition',
    name: 'MNIST-CNN-Digit-Recognition',
    created: '2025-05-06',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/MNIST-CNN-Digit-Recognition',
    category: 'ML / AI',
    shortDescription: 'A convolutional neural network trained on MNIST for handwritten digit recognition.',
    about: [
      'Built a CNN from scratch concepts — conv layers, pooling, and dense layers — to classify 0–9 digits.',
      'Achieving high accuracy on MNIST gave me confidence to tackle more complex computer vision problems.'
    ]
  },
  {
    id: 'face-mask-detection',
    name: 'Face-Mask-Detection',
    created: '2025-05-06',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Face-Mask-Detection',
    category: 'ML / AI',
    shortDescription: 'Real-time face mask detection using computer vision and a trained classification model.',
    about: [
      'Combined OpenCV for video capture with a trained model to detect whether faces are wearing masks.',
      'This project bridged my ML coursework with practical CV applications — a theme that continued with hand-gesture-engine.'
    ]
  },
  {
    id: 'ai-chatbot',
    name: 'AI-Chatbot',
    created: '2025-05-06',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/AI-Chatbot',
    category: 'ML / AI',
    shortDescription: 'A conversational chatbot built with NLP and intent-based response handling.',
    about: [
      'Explored natural language processing basics — tokenization, intent matching, and response generation.',
      'May 2025 was my most active month on GitHub: four ML projects that shifted my focus toward AI engineering.'
    ]
  },
  {
    id: 'play-listen-now',
    name: 'play-listen-now',
    created: '2025-06-29',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/play-listen-now',
    category: 'Web',
    shortDescription: 'A music listening web app with playlist management and playback controls.',
    about: [
      'An early step into media-focused web apps. Handled audio playback, UI state, and playlist organization.',
      'This project planted the seed for later music and video player builds in early 2026.'
    ]
  },
  {
    id: 'simplesite',
    name: 'SimpleSite',
    created: '2025-09-21',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/SimpleSite',
    category: 'Web',
    shortDescription: 'A clean, minimal static website template for quick project landing pages.',
    about: [
      'Focused on semantic HTML, responsive CSS, and a simple structure that could be reused across projects.',
      'SimpleSite reinforced that good web projects start with solid layout fundamentals.'
    ]
  },
  {
    id: 'hand-gesture-engine',
    name: 'hand-gesture-engine',
    created: '2026-01-18',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/hand-gesture-engine',
    category: 'AI / Open Source',
    shortDescription: 'Open-source Python package for real-time gesture recognition using MediaPipe and OpenCV.',
    about: [
      'MediaPipe gave me landmarks quickly, but turning raw points into reliable gestures took iteration. I focused on configurable thresholds so others could tune behavior without forking the library.',
      'Packaging for PyPI was its own project — README clarity, version bumps, and making the API predictable mattered as much as the CV logic.'
    ]
  },
  {
    id: 'online-music-player',
    name: 'Online_Music_Player',
    created: '2026-02-08',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Online_Music_Player',
    category: 'Web',
    shortDescription: 'A browser-based music player with queue management and custom playback UI.',
    about: [
      'Built on lessons from play-listen-now with a more polished interface and better state management.',
      'Part of a February 2026 media app sprint that also included the video player and WatchParty.'
    ]
  },
  {
    id: 'online-video-player',
    name: 'Online_Video_Player',
    created: '2026-02-12',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Online_Video_Player',
    category: 'Web',
    shortDescription: 'A custom video player with controls, progress tracking, and responsive layout.',
    about: [
      'Handled HTML5 video APIs, custom control overlays, and fullscreen behavior.',
      'Directly informed the media sync challenges I would tackle in WatchParty the next day.'
    ]
  },
  {
    id: 'watchparty',
    name: 'WatchParty',
    created: '2026-02-13',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/WatchParty',
    category: 'Cloud',
    shortDescription: 'Browser-based watch party with real-time sync, chat, and video calling — deployed on Azure.',
    about: [
      'The idea started simple: friends watch the same video at the same time. The hard part was playback sync when everyone\'s network behaved differently.',
      'I leaned on Socket.IO for room state, Azure Blob for assets, and Metered for voice/video. The biggest lesson was designing reconnect flows — users drop Wi‑Fi mid-movie more often than you\'d expect.'
    ]
  },
  {
    id: 'texty',
    name: 'Texty',
    created: '2026-02-16',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Texty',
    category: 'Web',
    shortDescription: 'A messaging-style web application with real-time chat and clean UI.',
    about: [
      'Explored real-time messaging patterns — message threads, timestamps, and user presence.',
      'Texty rounded out a busy February focused on social and media web experiences.'
    ]
  },
  {
    id: 'slidepuzzle',
    name: 'SlidePuzzle',
    created: '2026-03-29',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/SlidePuzzle',
    category: 'Android',
    shortDescription: 'Interactive touch-based slide puzzle game for Android built in Kotlin.',
    about: [
      'Game logic was straightforward; UX wasn\'t. Invalid moves had to feel impossible without lag, and the board needed to stay readable on smaller screens.',
      'Finishing a small app end-to-end — logic, UI, and edge cases — gave me more confidence than reading another chapter on Android theory alone.'
    ]
  },
  {
    id: 'strings',
    name: 'Strings',
    created: '2026-04-01',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Strings',
    category: 'Tools',
    shortDescription: 'A string manipulation and text utility tool for common programming tasks.',
    about: [
      'Focused on practical text operations — parsing, formatting, encoding, and validation helpers.',
      'A smaller utility project that sharpened my attention to edge cases in string handling.'
    ]
  },
  {
    id: 'coderoom',
    name: 'CodeRoom',
    created: '2026-04-11',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/CodeRoom',
    category: 'Web',
    shortDescription: 'A collaborative coding space or sandbox environment for writing and sharing code snippets.',
    about: [
      'Explored editor integration, syntax highlighting, and sharing workflows for code snippets.',
      'CodeRoom combined my interest in developer tools with real-time web app patterns.'
    ]
  },
  {
    id: 'interactive-grid-chrome-extension',
    name: 'Interactive-Grid-Chrome-Extension',
    created: '2026-05-02',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Interactive-Grid-Chrome-Extension',
    category: 'Browser Extension',
    shortDescription: 'A Chrome extension that overlays an interactive grid on web pages for layout debugging.',
    about: [
      'My first browser extension — learned manifest v3, content scripts, and popup UI patterns.',
      'Useful for designers and developers who need quick visual alignment guides on any webpage.'
    ]
  },
  {
    id: 'my-portfolio',
    name: 'My_Portfolio',
    created: '2026-05-20',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/My_Portfolio',
    category: 'Web',
    shortDescription: 'This portfolio site — HTML, CSS, and JS with Azure deployment and interactive sections.',
    about: [
      'Built to showcase projects, certifications, and my learning journey. Includes SPA navigation, dark mode, and custom interactions.',
      'The site itself is a project — every section reflects something I learned from the repos that came before it.'
    ]
  },
  {
    id: 'karanvishwakarma-1807',
    name: 'KaranVishwakarma-1807',
    created: '2026-06-10',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/KaranVishwakarma-1807',
    category: 'Profile',
    shortDescription: 'My GitHub profile README — a landing page for my GitHub account.',
    about: [
      'A special repository that renders on my GitHub profile. Showcases stats, featured projects, and quick links.',
      'Treating my profile as a product helped me think about first impressions for recruiters and collaborators.'
    ]
  },
  {
    id: 'aseprite-builder',
    name: 'aseprite-builder',
    created: '2026-06-14',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/aseprite-builder',
    category: 'Tools',
    shortDescription: 'Build automation and tooling around the Aseprite pixel art editor.',
    about: [
      'Explored build pipelines and tooling for creative software — compiling, packaging, and scripting around Aseprite.',
      'A detour into dev tooling that broadened my understanding of build systems beyond web and mobile.'
    ]
  },
  {
    id: 'ninjo',
    name: 'Ninjo',
    created: '2026-06-25',
    type: 'personal',
    url: 'https://github.com/KaranVishwakarma-1807/Ninjo',
    category: 'Web',
    shortDescription: 'My most recent project — a modern web application (details evolving).',
    about: [
      'Ninjo represents the latest chapter in my GitHub journey, building on everything from games to cloud deployments.',
      'Stay tuned — this repo is actively being developed and will be updated as the project matures.'
    ]
  },
  {
    id: 'trainwise',
    name: 'TrainWise',
    created: null,
    type: 'collaborative',
    url: 'https://github.com/garvit835/TrainWise',
    category: 'Collaboration',
    shortDescription: 'A collaborative student training and skill development platform.',
    about: [
      'Worked with teammates on architecture, feature delivery, and shared code ownership.',
      'TrainWise taught me how to coordinate PRs, reviews, and merge conflicts in a team codebase.'
    ]
  },
  {
    id: 'peerlift',
    name: 'PeerLift',
    created: null,
    type: 'collaborative',
    url: 'https://github.com/Rudzzy/PeerLift---Student-Skill-Exchange-Platform',
    category: 'Collaboration',
    shortDescription: 'A student skill exchange platform — peer-to-peer learning and mentorship.',
    about: [
      'Contributed to a platform where students trade skills and knowledge with each other.',
      'Collaborative projects like PeerLift pushed me beyond solo repos and into real team workflows.'
    ]
  },
  {
    id: 'visionvault-ai',
    name: 'visionvault-ai',
    created: null,
    type: 'collaborative',
    url: 'https://github.com/meet-jain14/visionvault-ai',
    category: 'Collaboration',
    shortDescription: 'A collaborative AI vision project for image analysis and intelligent search.',
    about: [
      'Joined forces on an AI-powered vision platform — combining CV models with search and storage.',
      'Working on visionvault-ai connected my ML background with production-oriented team development.'
    ]
  }
].sort((a, b) => {
  if (!a.created && !b.created) return 0;
  if (!a.created) return 1;
  if (!b.created) return -1;
  return new Date(a.created) - new Date(b.created);
});
