/**
 * Curated project metadata, merged with live GitHub stats by repo name in
 * `src/utils/github.js`.
 *
 * This is an allowlist, not a denylist. The old approach showed every repo and
 * required editing an exclusion set each time a throwaway repo was pushed, so
 * coursework exercises kept leaking onto the page. Now nothing appears unless
 * it is listed here.
 */

/** Large cards, in display order. `title` and `summary` override GitHub's. */
export const FEATURED_PROJECTS = [
  {
    repo: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    summary:
      "A multi-user finance app with budget tracking, categorised expenses, and reporting. Built on Next.js 14 App Router with MongoDB, and deployed to real users rather than left on localhost.",
    stack: ["Next.js 14", "TypeScript", "MongoDB", "Vercel"],
    highlight: "Live",
  },
  {
    repo: "Bangla-Sentiment-Analysis",
    title: "Bangla Sentiment Analysis",
    summary:
      "A 5-class sentiment classifier for Bangla text using TF-IDF features and logistic regression, evaluated on a real annotated corpus and shipped as an interactive Streamlit app.",
    stack: ["Python", "scikit-learn", "NLP", "Streamlit"],
  },
  {
    repo: "Real-Time-Chat-App",
    title: "Real-Time Chat Platform",
    summary:
      "A live chat platform for Jahangirnagar University students. Django Channels over WebSockets with Redis as the channel layer, and HTMX for partial updates without a heavy front-end bundle.",
    stack: ["Django Channels", "WebSockets", "Redis", "HTMX"],
    language: "Python",
  },
  {
    repo: "Android-QR-scanner-app",
    title: "Android QR Scanner",
    summary:
      "A native Android scanner with Firebase authentication, cloud-synced scan history across devices, and a built-in QR generator. Built with CameraX and ML Kit.",
    stack: ["Kotlin", "Firebase", "CameraX", "ML Kit"],
  },
  {
    repo: "face-recognition-project",
    title: "Face Recognition Attendance",
    summary:
      "An automated attendance system pairing OpenCV face detection with a KNN classifier, fronted by a Streamlit dashboard for enrolment and daily attendance records.",
    stack: ["Python", "OpenCV", "KNN", "Streamlit"],
  },
  {
    repo: "Hand-Gesture-Recognition",
    title: "Hand Gesture Recognition",
    summary:
      "Real-time gesture classification from a webcam feed, using MediaPipe hand landmarks as features for a TensorFlow model rather than raw pixels — far less data for far better accuracy.",
    stack: ["Python", "MediaPipe", "TensorFlow"],
    // GitHub's language detection misreports this repo as PureBasic.
    language: "Python",
  },
];

/** Smaller cards below the featured set — GitHub's own description is used. */
export const SECONDARY_PROJECTS = [
  { repo: "ESP32-hand-sign-translator", language: "C++" },
  { repo: "Google-Search-Analysis" },
  { repo: "Voting-System-Project", language: "Python" },
  { repo: "Leetcode-Solutions" },
];

export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Kotlin: "#A97BFF",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00B4AB",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
};

export const FALLBACK_LANGUAGE_COLOR = "#8b8b93";
