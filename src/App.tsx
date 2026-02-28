// @ts-nocheck
import { useState, useEffect } from "react";

const SPORTS = [
  "Baseball",
  "Basketball",
  "Soccer",
  "Softball",
  "Lacrosse",
  "Hockey",
  "Football",
  "Volleyball",
  "Tennis",
  "Swimming",
  "Wrestling",
  "Track & Field",
  "Gymnastics",
  "Cheer",
];
const GENDERS = ["Boys", "Girls", "Co-Ed"];
const AGE_GROUPS = [
  "6U",
  "8U",
  "10U",
  "12U",
  "14U",
  "16U",
  "18U",
  "High School",
];
const PRICE_TIERS = [
  "$ (Under $500/yr)",
  "$$ ($500–$1500/yr)",
  "$$$ ($1500–$3000/yr)",
  "$$$$ ($3000+/yr)",
];
const TRAVEL_LEVELS = [
  "Local Only",
  "Regional (1–2 hr)",
  "State Travel",
  "National Travel",
];

const RATING_CATEGORIES = [
  {
    id: "coaching",
    label: "Coaching Quality",
    icon: "🏆",
    desc: "Skill, communication, player development",
  },
  {
    id: "player_dev",
    label: "Player Development",
    icon: "📈",
    desc: "Skill-building, feedback, growth",
  },
  {
    id: "fun_factor",
    label: "Fun Factor",
    icon: "😄",
    desc: "Enjoyment, camaraderie, memories",
  },
  {
    id: "value",
    label: "Value for Money",
    icon: "💰",
    desc: "Cost vs. quality and experience",
  },
  {
    id: "organization",
    label: "Organization",
    icon: "📋",
    desc: "Scheduling, communication, admin",
  },
  {
    id: "team_culture",
    label: "Team Culture",
    icon: "🤝",
    desc: "Atmosphere, sportsmanship, inclusivity",
  },
  {
    id: "facilities",
    label: "Facilities & Gear",
    icon: "🏟️",
    desc: "Practice fields, equipment, uniforms",
  },
  {
    id: "win_loss",
    label: "Competitive Success",
    icon: "🥇",
    desc: "Tournament results, rankings",
  },
];

const YES_NO_CATEGORIES = [
  { id: "tryout_required", label: "Tryout Required", icon: "📝" },
  { id: "individual_tryout", label: "Individual Tryout Format", icon: "👤" },
  { id: "facility_access", label: "Gym / Facility Access", icon: "🏋️" },
];

const SAMPLE_PROGRAMS = [
  // ── Long Island / Mineola area ──────────────────────────────────────────
  {
    id: 1,
    name: "Elite Diamond Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U"],
    travel: "State Travel",
    priceTier: "$$$",
    location: "Mineola, NY",
    description:
      "Competitive travel baseball organization with a focus on fundamentals and character development. Strong coaching staff with high school and collegiate backgrounds.",
    overallRating: 4.3,
    totalReviews: 47,
    ratings: {
      coaching: 4.5,
      organization: 4.1,
      player_dev: 4.4,
      team_culture: 4.2,
      value: 3.8,
      facilities: 4.0,
      win_loss: 4.6,
      fun_factor: 4.1,
      tryout_ease: 3.8,
      tryout_format: 3.5,
      facility_access: 4.2,
    },
    collegeCommits: { total: 8, d1: 2, d2: 3, d3: 3, recentYear: 2024 },
    tags: ["Competitive", "Development-focused", "Active parent community"],
    verified: true,
  },
  {
    id: 2,
    name: "Nassau FC Soccer",
    sport: "Soccer",
    gender: "Girls",
    ageGroups: ["8U", "10U", "12U", "14U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$",
    location: "Garden City, NY",
    description:
      "Club soccer with emphasis on technical skill and team play. Great for players looking to develop at a competitive but balanced level without breaking the bank.",
    overallRating: 4.6,
    totalReviews: 83,
    ratings: {
      coaching: 4.8,
      organization: 4.5,
      player_dev: 4.7,
      team_culture: 4.9,
      value: 4.2,
      facilities: 4.3,
      win_loss: 4.0,
      fun_factor: 4.8,
      tryout_ease: 4.6,
      tryout_format: 4.4,
      facility_access: 4.1,
    },
    collegeCommits: { total: 23, d1: 7, d2: 9, d3: 7, recentYear: 2024 },
    tags: ["Great coaches", "Positive culture", "College placement track"],
    verified: true,
  },
  {
    id: 3,
    name: "Long Island Lacrosse Club",
    sport: "Lacrosse",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U"],
    travel: "National Travel",
    priceTier: "$$$$",
    location: "Syosset, NY",
    description:
      "Elite travel lacrosse with a full national tournament schedule. Top-tier coaching staff with collegiate and professional playing backgrounds.",
    overallRating: 3.9,
    totalReviews: 31,
    ratings: {
      coaching: 4.2,
      organization: 3.5,
      player_dev: 4.1,
      team_culture: 3.6,
      value: 3.2,
      facilities: 4.5,
      win_loss: 4.8,
      fun_factor: 3.4,
      tryout_ease: 2.9,
      tryout_format: 2.5,
      facility_access: 4.7,
    },
    collegeCommits: { total: 31, d1: 14, d2: 11, d3: 6, recentYear: 2024 },
    tags: ["High commitment", "Pricey", "Elite exposure"],
    verified: false,
  },

  // ── Albany, NY ──────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Capital District Lacrosse",
    sport: "Lacrosse",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$",
    location: "Albany, NY",
    description:
      "Community-rooted travel lacrosse club in the Capital Region. Strong emphasis on skill development and keeping the game fun and accessible for players of all levels.",
    overallRating: 4.4,
    totalReviews: 29,
    ratings: {
      coaching: 4.5,
      organization: 4.3,
      player_dev: 4.4,
      team_culture: 4.7,
      value: 4.5,
      facilities: 3.9,
      win_loss: 3.8,
      fun_factor: 4.7,
      tryout_ease: 4.6,
      tryout_format: 4.2,
      facility_access: 3.8,
    },
    collegeCommits: { total: 4, d1: 0, d2: 1, d3: 3, recentYear: 2024 },
    tags: ["Great culture", "Accessible tryouts", "Family friendly"],
    verified: true,
  },
  {
    id: 5,
    name: "Mohawk Valley Attack",
    sport: "Lacrosse",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$$",
    location: "Albany, NY",
    description:
      "Competitive club lax program pushing for state-level play. Known for rigorous individual tryout evaluations and strong showcase exposure for high school players.",
    overallRating: 4.1,
    totalReviews: 22,
    ratings: {
      coaching: 4.3,
      organization: 3.9,
      player_dev: 4.4,
      team_culture: 3.9,
      value: 3.7,
      facilities: 4.1,
      win_loss: 4.5,
      fun_factor: 3.8,
      tryout_ease: 3.5,
      tryout_format: 4.6,
      facility_access: 4.3,
    },
    collegeCommits: { total: 11, d1: 3, d2: 5, d3: 3, recentYear: 2024 },
    tags: ["Individual tryout evals", "Showcase-focused", "Serious commitment"],
    verified: true,
  },

  // ── Boston / New England ─────────────────────────────────────────────────
  {
    id: 6,
    name: "New England Storm Softball",
    sport: "Softball",
    gender: "Girls",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$$",
    location: "Framingham, MA",
    description:
      "One of the top softball clubs in New England. Coaches have deep ties to the college recruiting pipeline and run structured, position-specific tryouts.",
    overallRating: 4.7,
    totalReviews: 61,
    ratings: {
      coaching: 4.9,
      organization: 4.6,
      player_dev: 4.8,
      team_culture: 4.5,
      value: 4.0,
      facilities: 4.6,
      win_loss: 4.7,
      fun_factor: 4.4,
      tryout_ease: 4.0,
      tryout_format: 4.8,
      facility_access: 4.5,
    },
    collegeCommits: { total: 34, d1: 12, d2: 14, d3: 8, recentYear: 2024 },
    tags: ["College pipeline", "Top coaching", "Position-specific evals"],
    verified: true,
  },
  {
    id: 7,
    name: "Mass Premier Basketball",
    sport: "Basketball",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U"],
    travel: "National Travel",
    priceTier: "$$$$",
    location: "Worcester, MA",
    description:
      "AAU-affiliated basketball club with a national tournament schedule including Nike EYBL events. High visibility program with active college scouts at games.",
    overallRating: 3.7,
    totalReviews: 44,
    ratings: {
      coaching: 3.8,
      organization: 3.4,
      player_dev: 3.9,
      team_culture: 3.3,
      value: 2.9,
      facilities: 4.2,
      win_loss: 4.6,
      fun_factor: 3.1,
      tryout_ease: 2.8,
      tryout_format: 3.2,
      facility_access: 4.4,
    },
    collegeCommits: { total: 19, d1: 11, d2: 5, d3: 3, recentYear: 2024 },
    tags: ["High visibility", "Expensive", "Win-at-all-costs vibe"],
    verified: false,
  },

  // ── Chicago area ─────────────────────────────────────────────────────────
  {
    id: 8,
    name: "Midwest Elite Volleyball Club",
    sport: "Volleyball",
    gender: "Girls",
    ageGroups: ["12U", "14U", "16U", "18U"],
    travel: "National Travel",
    priceTier: "$$$",
    location: "Naperville, IL",
    description:
      "Premier girls volleyball club competing in USAV nationals. World-class training facility with full weight room and film study sessions built into practice.",
    overallRating: 4.5,
    totalReviews: 78,
    ratings: {
      coaching: 4.7,
      organization: 4.6,
      player_dev: 4.8,
      team_culture: 4.3,
      value: 3.9,
      facilities: 4.9,
      win_loss: 4.5,
      fun_factor: 4.2,
      tryout_ease: 3.8,
      tryout_format: 4.3,
      facility_access: 4.9,
    },
    collegeCommits: { total: 28, d1: 8, d2: 12, d3: 8, recentYear: 2024 },
    tags: ["Elite facilities", "Film study", "USAV nationals"],
    verified: true,
  },

  // ── Dallas / Texas ───────────────────────────────────────────────────────
  {
    id: 9,
    name: "Lone Star Baseball Academy",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U", "16U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$",
    location: "Frisco, TX",
    description:
      "High-volume program with teams at every age group. Affordable entry point into travel baseball with solid coaching and well-maintained fields.",
    overallRating: 4.0,
    totalReviews: 112,
    ratings: {
      coaching: 4.0,
      organization: 3.8,
      player_dev: 3.9,
      team_culture: 4.1,
      value: 4.7,
      facilities: 4.3,
      win_loss: 3.8,
      fun_factor: 4.3,
      tryout_ease: 4.5,
      tryout_format: 3.8,
      facility_access: 4.3,
    },
    collegeCommits: { total: 6, d1: 1, d2: 2, d3: 3, recentYear: 2024 },
    tags: ["Best value", "Good for beginners", "Large program"],
    verified: true,
  },
  {
    id: 10,
    name: "Texas Rush Soccer",
    sport: "Soccer",
    gender: "Co-Ed",
    ageGroups: ["8U", "10U", "12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$",
    location: "Plano, TX",
    description:
      "One of the largest club soccer organizations in North Texas. Consistent results at state cups with a developmental pathway from recreational to elite.",
    overallRating: 4.2,
    totalReviews: 156,
    ratings: {
      coaching: 4.2,
      organization: 4.4,
      player_dev: 4.1,
      team_culture: 4.3,
      value: 4.4,
      facilities: 4.0,
      win_loss: 4.2,
      fun_factor: 4.3,
      tryout_ease: 4.3,
      tryout_format: 3.9,
      facility_access: 4.0,
    },
    collegeCommits: { total: 17, d1: 4, d2: 7, d3: 6, recentYear: 2024 },
    tags: ["Well organized", "All ages", "State cup contender"],
    verified: true,
  },

  // ── Florida ──────────────────────────────────────────────────────────────
  {
    id: 11,
    name: "Sunshine State Cheer",
    sport: "Cheer",
    gender: "Girls",
    ageGroups: ["6U", "8U", "10U", "12U", "14U"],
    travel: "National Travel",
    priceTier: "$$$$",
    location: "Orlando, FL",
    description:
      "All-star cheer program with multiple national championship appearances. Demanding schedule and high commitment level — not for the faint of heart.",
    overallRating: 4.2,
    totalReviews: 53,
    ratings: {
      coaching: 4.6,
      organization: 4.0,
      player_dev: 4.5,
      team_culture: 4.0,
      value: 3.2,
      facilities: 4.4,
      win_loss: 4.8,
      fun_factor: 3.9,
      tryout_ease: 3.4,
      tryout_format: 3.7,
      facility_access: 4.6,
    },
    collegeCommits: { total: 9, d1: 3, d2: 4, d3: 2, recentYear: 2024 },
    tags: ["National championships", "High commitment", "Expensive but elite"],
    verified: true,
  },

  // ── Denver / Colorado ────────────────────────────────────────────────────
  {
    id: 12,
    name: "Rocky Mountain Hockey Club",
    sport: "Hockey",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$$",
    location: "Denver, CO",
    description:
      "AAA and AA level ice hockey with excellent rink access and year-round skating programs. Tryouts are individual station-based so every skater gets a real look.",
    overallRating: 4.5,
    totalReviews: 38,
    ratings: {
      coaching: 4.6,
      organization: 4.4,
      player_dev: 4.6,
      team_culture: 4.4,
      value: 3.8,
      facilities: 4.8,
      win_loss: 4.3,
      fun_factor: 4.4,
      tryout_ease: 4.5,
      tryout_format: 4.9,
      facility_access: 4.8,
    },
    collegeCommits: { total: 13, d1: 4, d2: 5, d3: 4, recentYear: 2024 },
    tags: [
      "Individual tryout stations",
      "Year-round ice",
      "Strong development",
    ],
    verified: true,
  },
];

const SAMPLE_REVIEWS = [
  {
    id: 1,
    programId: 1,
    author: "Dave M.",
    role: "Parent",
    date: "Jan 2025",
    text: "Coaches genuinely care about developing the whole player. My son has grown so much in two seasons. Communication could improve but the coaching more than makes up for it.",
    ratings: {
      coaching: 5,
      organization: 3,
      player_dev: 5,
      team_culture: 4,
      value: 4,
      facilities: 4,
      win_loss: 5,
      fun_factor: 4,
    },
    helpful: 12,
  },
  {
    id: 2,
    programId: 1,
    author: "Karen T.",
    role: "Parent",
    date: "Nov 2024",
    text: "Great program overall. Tournament schedule is demanding but the boys love it. Tryouts are competitive and they cut kids which some parents don't like but keeps the level high.",
    ratings: {
      coaching: 4,
      organization: 4,
      player_dev: 4,
      team_culture: 4,
      value: 4,
      facilities: 4,
      win_loss: 5,
      fun_factor: 4,
    },
    helpful: 8,
  },
  {
    id: 3,
    programId: 2,
    author: "Jess R.",
    role: "Parent",
    date: "Feb 2025",
    text: "Best decision we made for our daughter. The head coach is exceptional — builds confidence, teaches the game the right way. Girls love their teammates. Worth every penny.",
    ratings: {
      coaching: 5,
      organization: 5,
      player_dev: 5,
      team_culture: 5,
      value: 5,
      facilities: 4,
      win_loss: 4,
      fun_factor: 5,
    },
    helpful: 21,
  },
];

const TRAINER_RATING_CATEGORIES = [
  {
    id: "communication",
    label: "Communication",
    icon: "💬",
    desc: "Responsiveness, clarity, follow-through",
  },
  {
    id: "results",
    label: "Results & Improvement",
    icon: "📈",
    desc: "Measurable skill gains over time",
  },
  {
    id: "value",
    label: "Value ($/hr)",
    icon: "💰",
    desc: "Cost relative to quality of training",
  },
  {
    id: "facility",
    label: "Facility Quality",
    icon: "🏋️",
    desc: "Space, equipment, and training environment",
  },
  {
    id: "credentials",
    label: "Experience & Credentials",
    icon: "🎓",
    desc: "Background, certifications, playing history",
  },
];

const SAMPLE_TRAINERS = [
  {
    id: "t1",
    name: "Mike Torrelli",
    title: "Baseball Hitting & Pitching Coach",
    sport: "Baseball",
    location: "Mineola, NY",
    rate: "$85/hr",
    sessionTypes: ["1-on-1", "Small Group (2–4)"],
    specialties: ["Hitting mechanics", "Arm care", "Mental approach"],
    bio: "Former D1 pitcher at Hofstra with 12 years of private instruction. Works with players 8U through college prep. Known for video-based swing analysis and measurable results.",
    overallRating: 4.8,
    totalReviews: 64,
    ratings: {
      communication: 4.9,
      results: 4.8,
      value: 4.4,
      facility: 4.6,
      credentials: 5.0,
    },
    tags: ["Video analysis", "Arm care specialist", "College prep"],
    verified: true,
    featured: true,
    bookingUrl: "https://calendly.com",
  },
  {
    id: "t2",
    name: "Dana Kowalski",
    title: "Girls Soccer Skills Trainer",
    sport: "Soccer",
    location: "Garden City, NY",
    rate: "$70/hr",
    sessionTypes: ["1-on-1", "Small Group (2–4)", "Team Sessions"],
    specialties: ["First touch", "Shooting technique", "Goalkeeper training"],
    bio: "Former NWSL academy player. Trains girls 8U–18U on Long Island. Runs weekly small group clinics at Garden City Sports Complex with access to full-size turf.",
    overallRating: 4.6,
    totalReviews: 41,
    ratings: {
      communication: 4.7,
      results: 4.6,
      value: 4.8,
      facility: 4.5,
      credentials: 4.4,
    },
    tags: ["Female coach", "Turf facility", "Small group clinics"],
    verified: true,
    featured: false,
    bookingUrl: "https://calendly.com",
  },
  {
    id: "t3",
    name: "Chris Abreu",
    title: "Speed, Agility & Athletic Performance",
    sport: "Multi-Sport",
    location: "Albany, NY",
    rate: "$65/hr",
    sessionTypes: ["1-on-1", "Small Group (2–4)", "Team Sessions"],
    specialties: [
      "40-yard dash",
      "Lateral quickness",
      "Strength & conditioning",
    ],
    bio: "NSCA-certified strength coach working out of Capital Region Athletic Performance Center. Works with athletes across all sports ages 10–18. Combines film review with on-field drills.",
    overallRating: 4.5,
    totalReviews: 37,
    ratings: {
      communication: 4.4,
      results: 4.7,
      value: 4.6,
      facility: 4.8,
      credentials: 4.5,
    },
    tags: ["NSCA certified", "Multi-sport", "Film & drills"],
    verified: true,
    featured: false,
    bookingUrl: "https://calendly.com",
  },
  {
    id: "t4",
    name: "Tyler Graves",
    title: "Lacrosse Attack & Midfield Trainer",
    sport: "Lacrosse",
    location: "Albany, NY",
    rate: "$75/hr",
    sessionTypes: ["1-on-1", "Small Group (2–4)"],
    specialties: ["Dodging", "Shooting on the run", "Off-ball movement"],
    bio: "Played attackman at Syracuse (walk-on). Now trains Albany-area youth lax players looking to earn starting spots or get college exposure. Known for no-nonsense individual evaluations.",
    overallRating: 4.3,
    totalReviews: 19,
    ratings: {
      communication: 4.2,
      results: 4.5,
      value: 4.1,
      facility: 3.9,
      credentials: 4.7,
    },
    tags: ["Syracuse background", "Individual focus", "College exposure"],
    verified: false,
    featured: false,
    bookingUrl: null,
  },
  {
    id: "t5",
    name: "Priya Nair",
    title: "Volleyball Setter & Libero Coach",
    sport: "Volleyball",
    location: "Naperville, IL",
    rate: "$90/hr",
    sessionTypes: ["1-on-1", "Small Group (2–4)"],
    specialties: [
      "Setting mechanics",
      "Defensive positioning",
      "Reading the game",
    ],
    bio: "D1 volleyball at Northwestern. Trains position-specific players from club teams across Chicagoland. Video breakdown included in every session. Waitlist often 3–4 weeks.",
    overallRating: 4.9,
    totalReviews: 88,
    ratings: {
      communication: 4.8,
      results: 5.0,
      value: 4.3,
      facility: 4.7,
      credentials: 5.0,
    },
    tags: ["Northwestern alum", "Video included", "High demand"],
    verified: true,
    featured: true,
    bookingUrl: "https://calendly.com",
  },
  {
    id: "t6",
    name: "Marcus Webb",
    title: "Basketball Guard Development",
    sport: "Basketball",
    location: "Worcester, MA",
    rate: "$80/hr",
    sessionTypes: ["1-on-1", "Small Group (2–4)"],
    specialties: ["Ball handling", "Pull-up jumper", "On-ball defense"],
    bio: "Former JUCO standout and high school varsity coach. Works with guards 12U–18U on IQ, footwork, and handles. Known for making sessions competitive and game-realistic.",
    overallRating: 4.2,
    totalReviews: 26,
    ratings: {
      communication: 4.0,
      results: 4.4,
      value: 4.5,
      facility: 3.8,
      credentials: 4.2,
    },
    tags: ["Guard specialist", "Game-realistic drills", "Affordable"],
    verified: false,
    featured: false,
    bookingUrl: "https://calendly.com",
  },
];

const SAMPLE_TRAINER_REVIEWS = [
  {
    id: 1,
    trainerId: "t1",
    author: "Rob D.",
    role: "Parent",
    date: "Jan 2025",
    text: "Mike completely transformed my son's swing in 6 sessions. He uses video breakdown every time and explains the why behind every adjustment. Best investment we've made.",
    ratings: {
      communication: 5,
      results: 5,
      value: 4,
      facility: 5,
      credentials: 5,
    },
    helpful: 18,
  },
  {
    id: 2,
    trainerId: "t1",
    author: "Sarah M.",
    role: "Parent",
    date: "Dec 2024",
    text: "Books up fast — had to wait 3 weeks for a slot. But worth it. My daughter went from getting pulled off the mound to striking out top batters. Mike is the real deal.",
    ratings: {
      communication: 5,
      results: 5,
      value: 4,
      facility: 4,
      credentials: 5,
    },
    helpful: 11,
  },
  {
    id: 3,
    trainerId: "t5",
    author: "Jen K.",
    role: "Parent",
    date: "Feb 2025",
    text: "Priya is in a different league. She had my daughter's setting mechanics corrected within two sessions. We drive 40 minutes each way and it's completely worth it.",
    ratings: {
      communication: 5,
      results: 5,
      value: 4,
      facility: 5,
      credentials: 5,
    },
    helpful: 24,
  },
];

function StarRating({
  value,
  onChange,
  size = "md",
  showNumber = true,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: string;
  showNumber?: boolean;
}) {
  const [hover, setHover] = useState(0);
  const sizes: { [key: string]: string } = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`${sizes[size]} transition-transform hover:scale-110 ${
          onChange !== undefined ? "cursor-pointer" : "cursor-default"
          }`}
          style={{
            color: (hover || value) >= star ? "#F59E0B" : "#D1D5DB",
            background: "none",
            border: "none",
            padding: 0,
          }}
          onMouseEnter={() => onChange !== undefined && setHover(star)}
          onMouseLeave={() => onChange !== undefined && setHover(0)}
          onClick={() => onChange !== undefined && onChange(star)}
        >
          ★
        </button>
      ))}
      {showNumber && (
        <span style={{ fontSize: 13, color: "#6B7280", marginLeft: 4 }}>
          {value ? value.toFixed(1) : "–"}
        </span>
      )}
    </div>
  );
}

function RatingBar({ label, value, icon }: { label: string, value: number, icon: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <span style={{ fontSize: 13, color: "#374151" }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1e3a5f" }}>
          {value.toFixed(1)}
        </span>
      </div>
      <div style={{ height: 6, background: "#E5E7EB", borderRadius: 99 }}>
        <div
          style={{
            height: "100%",
            width: `${(value / 5) * 100}%`,
            background: "linear-gradient(90deg, #1e3a5f, #3B82F6)",
            borderRadius: 99,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}
function ProgramCard({ program, onClick }: { program: any, onClick: (p: any) => void }) {
  const isPending = program.status === "pending";
  const overallColor = !program.overallRating
    ? "#9CA3AF"
    : program.overallRating >= 4.5
    ? "#10B981"
    : program.overallRating >= 4
    ? "#3B82F6"
    : program.overallRating >= 3.5
    ? "#F59E0B"
    : "#EF4444";
  return (
    <div
      onClick={() => onClick(program)}
      style={{
        background: isPending ? "#FAFAFA" : "#fff",
        border: isPending ? "1.5px dashed #D1D5DB" : "1px solid #E5E7EB",
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        opacity: isPending ? 0.9 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,95,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111827",
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                letterSpacing: 1,
              }}
            >
              {program.name}
            </span>
            {program.verified && !isPending && (
              <span
                style={{
                  fontSize: 11,
                  background: "#DBEAFE",
                  color: "#1D4ED8",
                  padding: "2px 8px",
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                ✓ Verified
              </span>
            )}
            {isPending && (
              <span
                style={{
                  fontSize: 11,
                  background: "#FEF3C7",
                  color: "#92400E",
                  padding: "2px 10px",
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                ⏳ Pending Review
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 12,
                background: "#F3F4F6",
                padding: "3px 10px",
                borderRadius: 99,
                color: "#374151",
              }}
            >
              ⚽ {program.sport}
            </span>
            <span
              style={{
                fontSize: 12,
                background: "#F3F4F6",
                padding: "3px 10px",
                borderRadius: 99,
                color: "#374151",
              }}
            >
              👥 {program.gender}
            </span>
            {program.priceTier && (
              <span
                style={{
                  fontSize: 12,
                  background: "#F3F4F6",
                  padding: "3px 10px",
                  borderRadius: 99,
                  color: "#374151",
                }}
              >
                💲 {program.priceTier}
              </span>
            )}
            {program.travel && (
              <span
                style={{
                  fontSize: 12,
                  background: "#F3F4F6",
                  padding: "3px 10px",
                  borderRadius: 99,
                  color: "#374151",
                }}
              >
                ✈️ {program.travel}
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            background: overallColor,
            color: "#fff",
            borderRadius: 12,
            padding: "8px 14px",
            minWidth: 60,
            flexShrink: 0,
          }}
        >
          {program.overallRating ? (
            <>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                {program.overallRating.toFixed(1)}
              </div>
              <div style={{ fontSize: 10, opacity: 0.9 }}>
                {program.totalReviews} reviews
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>
                No
              </div>
              <div style={{ fontSize: 10 }}>reviews yet</div>
            </>
          )}
        </div>
      </div>
      <p
        style={{
          fontSize: 13,
          color: "#6B7280",
          marginBottom: 10,
          lineHeight: 1.5,
        }}
      >
        {program.description}
      </p>
      {program.tags.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {program.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                background: "#EEF2FF",
                color: "#4338CA",
                padding: "2px 8px",
                borderRadius: 99,
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>
          📍 {program.location}
          {program.ageGroups.length > 0
            ? ` · ${program.ageGroups.join(", ")}`
            : ""}
        </div>
        {program.collegeCommits && program.collegeCommits.total > 0 && (
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              background: "#FFF7ED",
              border: "1px solid #FED7AA",
              borderRadius: 99,
              padding: "3px 10px",
            }}
          >
            <span style={{ fontSize: 11 }}>🎓</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#C2410C" }}>
              {program.collegeCommits.total} college commits
            </span>
            {program.collegeCommits.d1 > 0 && (
              <span style={{ fontSize: 11, color: "#9A3412" }}>
                · {program.collegeCommits.d1} D1
              </span>
            )}
          </div>
        )}
      </div>
      {isPending && (
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "#92400E",
            background: "#FFFBEB",
            padding: "6px 12px",
            borderRadius: 8,
          }}
        >
          🕐 Under moderation — your submission is live to you. It'll be
          publicly searchable once approved (usually within 24 hrs).
        </div>
      )}
    </div>
  );
}
function ReviewCard({ review }: { review: any }) {
  return (
    <div
      style={{
        background: "#FAFAFA",
        border: "1px solid #F3F4F6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>
            {review.author}
          </span>
          <span
            style={{
              fontSize: 12,
              background: review.role === "Parent" ? "#D1FAE5" : "#DBEAFE",
              color: review.role === "Parent" ? "#065F46" : "#1E40AF",
              padding: "1px 8px",
              borderRadius: 99,
              marginLeft: 8,
            }}
          >
            {review.role}
          </span>
        </div>
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{review.date}</span>
      </div>
      <p
        style={{
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.6,
          marginBottom: 10,
        }}
      >
        {review.text}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6,
        }}
      >
        {Object.entries(review.ratings)
          .slice(0, 4)
          .map(([key, val]) => {
            const cat = RATING_CATEGORIES.find((c) => c.id === key);
            return (
              <div
                key={key}
                style={{
                  fontSize: 11,
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 8,
                  padding: "4px 6px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div style={{ color: "#6B7280" }}>
                  {cat?.icon} {cat?.label.split(" ")[0]}
                </div>
                <div style={{ fontWeight: 700, color: "#1e3a5f" }}>{val}/5</div>
              </div>
            );
          })}
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: "#9CA3AF" }}>
        👍 {review.helpful} found helpful
      </div>
    </div>
  );
}

function WriteReviewModal({ program, onClose, onSubmit }: { program: any, onClose: () => void, onSubmit: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("Parent");
  const [ratings, setRatings] = useState({});
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const COMMON_TAGS = [
    "Great coaches",
    "Poor communication",
    "Expensive but worth it",
    "High commitment",
    "Player development focus",
    "Win-at-all-costs",
    "Positive culture",
    "Unorganized",
    "College placement",
    "Fun atmosphere",
  ];

  const [showMoreRatings, setShowMoreRatings] = useState(false);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const coreRated = RATING_CATEGORIES.slice(0, 5).every((c) => ratings[c.id]);
  const allRated = RATING_CATEGORIES.every((c) => ratings[c.id]);
  const ratedCats = RATING_CATEGORIES.filter((c) => ratings[c.id]);
  const overall = coreRated
    ? (
        ratedCats.reduce((a, c) => a + ratings[c.id], 0) / ratedCats.length
      ).toFixed(1)
    : null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              color: "#1e3a5f",
              letterSpacing: 1,
            }}
          >
            Write a Review · {program.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#9CA3AF",
            }}
          >
            ✕
          </button>
        </div>

        {step === 1 && (
          <div>
            <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
              You are reviewing as a:
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["Parent", "Player", "Coach", "Organization"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    border: `2px solid ${role === r ? "#1e3a5f" : "#E5E7EB"}`,
                    borderRadius: 10,
                    background: role === r ? "#1e3a5f" : "#fff",
                    color: role === r ? "#fff" : "#374151",
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: role === r ? 600 : 400,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Core 5 — always shown */}
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              Rate the essentials:
            </p>
            {RATING_CATEGORIES.slice(0, 5).map((cat) => (
              <div
                key={cat.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  padding: "10px 14px",
                  background: "#F9FAFB",
                  borderRadius: 10,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}
                  >
                    {cat.icon} {cat.label}
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                    {cat.desc}
                  </div>
                </div>
                <StarRating
                  value={ratings[cat.id] || 0}
                  onChange={(v) => setRatings((r) => ({ ...r, [cat.id]: v }))}
                />
              </div>
            ))}

            {/* Expandable additional categories */}
            <button
              onClick={() => setShowMoreRatings((s) => !s)}
              style={{
                width: "100%",
                padding: "8px",
                background: "none",
                border: "1.5px dashed #D1D5DB",
                borderRadius: 10,
                fontSize: 13,
                color: "#6B7280",
                cursor: "pointer",
                marginBottom: showMoreRatings ? 10 : 16,
              }}
            >
              {showMoreRatings
                ? "▲ Hide additional ratings"
                : "▼ Add more ratings (tryouts, facilities, etc.)"}
            </button>

            {showMoreRatings && (
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: 10,
                  }}
                >
                  Quick Facts — just Yes or No
                </p>
                {YES_NO_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                      padding: "10px 14px",
                      background: "#F9FAFB",
                      borderRadius: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {cat.icon} {cat.label}
                    </span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() =>
                          setRatings((r) => ({ ...r, [cat.id]: true }))
                        }
                        style={{
                          padding: "5px 14px",
                          borderRadius: 8,
                          border: "1.5px solid #16a34a",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          background:
                            ratings[cat.id] === true ? "#16a34a" : "#fff",
                          color: ratings[cat.id] === true ? "#fff" : "#16a34a",
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() =>
                          setRatings((r) => ({ ...r, [cat.id]: false }))
                        }
                        style={{
                          padding: "5px 14px",
                          borderRadius: 8,
                          border: "1.5px solid #dc2626",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          background:
                            ratings[cat.id] === false ? "#dc2626" : "#fff",
                          color: ratings[cat.id] === false ? "#fff" : "#dc2626",
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {coreRated && (
              <div
                style={{
                  textAlign: "center",
                  background: "#EEF2FF",
                  borderRadius: 12,
                  padding: 10,
                  marginBottom: 14,
                }}
              >
                <div style={{ fontSize: 11, color: "#4338CA" }}>
                  Your score so far
                </div>
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#1e3a5f",
                    fontFamily: "'Bebas Neue', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {overall}
                </div>
              </div>
            )}
            <button
              disabled={!coreRated}
              onClick={() => setStep(2)}
              style={{
                width: "100%",
                padding: "12px",
                background: coreRated ? "#1e3a5f" : "#D1D5DB",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: coreRated ? "pointer" : "not-allowed",
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              What tags describe this program? (pick all that apply)
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 18,
              }}
            >
              {COMMON_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setTags((ts) =>
                      ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]
                    )
                  }
                  style={{
                    fontSize: 12,
                    padding: "5px 12px",
                    borderRadius: 99,
                    border: `1.5px solid ${
                      tags.includes(t) ? "#4338CA" : "#E5E7EB"
                    }`,
                    background: tags.includes(t) ? "#EEF2FF" : "#fff",
                    color: tags.includes(t) ? "#4338CA" : "#374151",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              Write your review
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience — what went well, what could improve, what parents or players should know before joining..."
              style={{
                width: "100%",
                minHeight: 120,
                padding: 12,
                border: "1.5px solid #E5E7EB",
                borderRadius: 10,
                fontSize: 14,
                resize: "vertical",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: 12,
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ← Back
              </button>
              <button
                disabled={text.length < 20}
                onClick={() => {
                  onSubmit({ role, ratings, text, tags, overall });
                  onClose();
                }}
                style={{
                  flex: 2,
                  padding: 12,
                  background: text.length >= 20 ? "#10B981" : "#D1D5DB",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: text.length >= 20 ? "pointer" : "not-allowed",
                }}
              >
                Submit Review ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgramDetail({ program, reviews, onBack, onReview }: { program: any, reviews: any[], onBack: () => void, onReview: () => void }) {
  const [showAllRatings, setShowAllRatings] = useState(false);
  const programReviews = reviews.filter((r) => r.programId === program.id);
  const isPending = program.status === "pending";
  const hasRatings =
    program.overallRating != null &&
    Object.keys(program.ratings || {}).length > 0;

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#1e3a5f",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          marginBottom: 16,
          padding: 0,
        }}
      >
        ← Back to Search
      </button>

      {/* Pending banner */}
      {isPending && (
        <div
          style={{
            background: "#FFFBEB",
            border: "1.5px solid #FCD34D",
            borderRadius: 14,
            padding: "12px 18px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 22 }}>⏳</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E" }}>
              This listing is pending moderation
            </div>
            <div style={{ fontSize: 13, color: "#78350F" }}>
              Visible to you now. Our team will verify and publish it publicly
              within 24 hours — we review every submission to keep listings
              accurate and trustworthy.
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2442 100%)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              {program.name}
            </h1>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 6,
              }}
            >
              {program.verified && !isPending && (
                <span
                  style={{
                    fontSize: 12,
                    background: "rgba(59,130,246,0.3)",
                    padding: "3px 10px",
                    borderRadius: 99,
                  }}
                >
                  ✓ Verified Organization
                </span>
              )}
              {isPending && (
                <span
                  style={{
                    fontSize: 12,
                    background: "rgba(251,191,36,0.3)",
                    color: "#FCD34D",
                    padding: "3px 10px",
                    borderRadius: 99,
                  }}
                >
                  ⏳ Pending Review
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 13, opacity: 0.85 }}>
                📍 {program.location}
              </span>
              <span style={{ fontSize: 13, opacity: 0.85 }}>
                ⚽ {program.sport}
              </span>
              <span style={{ fontSize: 13, opacity: 0.85 }}>
                👥 {program.gender}
              </span>
              {program.ageGroups?.length > 0 && (
                <span style={{ fontSize: 13, opacity: 0.85 }}>
                  🎂 {program.ageGroups.join(", ")}
                </span>
              )}
              {program.travel && (
                <span style={{ fontSize: 13, opacity: 0.85 }}>
                  ✈️ {program.travel}
                </span>
              )}
              {program.priceTier && (
                <span style={{ fontSize: 13, opacity: 0.85 }}>
                  💲 {program.priceTier}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 16,
              padding: "12px 20px",
              flexShrink: 0,
            }}
          >
            {hasRatings ? (
              <>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    lineHeight: 1,
                    fontFamily: "'Bebas Neue', sans-serif",
                  }}
                >
                  {program.overallRating.toFixed(1)}
                </div>
                <StarRating
                  value={program.overallRating}
                  size="sm"
                  showNumber={false}
                />
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                  {program.totalReviews} reviews
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 4 }}>
                  ✍️
                </div>
                <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.4 }}>
                  No reviews
                  <br />
                  yet
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 14,
            }}
          >
            Rating Breakdown
          </h3>
          {hasRatings ? (
            <>
              {(showAllRatings
                ? RATING_CATEGORIES
                : RATING_CATEGORIES.slice(0, 4)
              ).map((cat) => (
                <RatingBar
                  key={cat.id}
                  label={cat.label}
                  icon={cat.icon}
                  value={program.ratings[cat.id] ?? 0}
                />
              ))}
              <button
                onClick={() => setShowAllRatings(!showAllRatings)}
                style={{
                  marginTop: 8,
                  marginBottom: 16,
                  fontSize: 13,
                  color: "#2563eb",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {showAllRatings
                  ? "▲ Show fewer ratings"
                  : `▼ Show all ${RATING_CATEGORIES.length} ratings`}
              </button>

              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 10,
                }}
              >
                Quick Facts
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {YES_NO_CATEGORIES.map((cat) => {
                  const val = program.ratings[cat.id];
                  const isYes = val === true || val === 1 || val === "yes";
                  const isNo = val === false || val === 0 || val === "no";
                  return (
                    <div
                      key={cat.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "#374151" }}>
                        {cat.icon} {cat.label}
                      </span>
                      <span
                        style={{
                          fontWeight: 700,
                          color: isYes
                            ? "#16a34a"
                            : isNo
                            ? "#dc2626"
                            : "#9ca3af",
                        }}
                      >
                        {isYes ? "✅ Yes" : isNo ? "❌ No" : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "20px 0",
                color: "#9CA3AF",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
              <div style={{ fontSize: 13 }}>
                Ratings will appear here once reviews come in.
              </div>
              <button
                onClick={onReview}
                style={{
                  marginTop: 14,
                  padding: "9px 20px",
                  background: "#1e3a5f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Be the first to review →
              </button>
            </div>
          )}
        </div>
        <div>
          <div
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: 20,
              marginBottom: 14,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              About This Program
            </h3>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
              {program.description}
            </p>
            {program.tags?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginTop: 12,
                }}
              >
                {program.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      background: "#EEF2FF",
                      color: "#4338CA",
                      padding: "3px 10px",
                      borderRadius: 99,
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
            {program.collegeCommits && program.collegeCommits.total > 0 && (
              <div
                style={{
                  marginTop: 16,
                  background: "#FFF7ED",
                  border: "1.5px solid #FED7AA",
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#C2410C",
                    marginBottom: 10,
                  }}
                >
                  🎓 College Commits ({program.collegeCommits.recentYear})
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 8,
                  }}
                >
                  {[
                    ["Total", program.collegeCommits.total, "#C2410C"],
                    ["D1", program.collegeCommits.d1, "#1D4ED8"],
                    ["D2", program.collegeCommits.d2, "#7C3AED"],
                    ["D3", program.collegeCommits.d3, "#047857"],
                  ].map(([label, val, color]) => (
                    <div
                      key={label}
                      style={{
                        textAlign: "center",
                        background: "#fff",
                        borderRadius: 10,
                        padding: "8px 4px",
                        border: "1px solid #FED7AA",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color,
                          lineHeight: 1,
                        }}
                      >
                        {val}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#92400E", marginTop: 8 }}>
                  * Self-reported by program. Data reflects known commitments
                  for the listed year.
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              background: "#FEF3C7",
              border: "1px solid #FCD34D",
              borderRadius: 16,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>📣</div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#92400E",
                marginBottom: 2,
              }}
            >
              Advertise Here
            </div>
            <div style={{ fontSize: 11, color: "#B45309" }}>
              Reach families searching for {program.sport} programs
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>
          Reviews ({programReviews.length})
        </h3>
        <button
          onClick={onReview}
          style={{
            padding: "10px 20px",
            background: "#1e3a5f",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Write a Review
        </button>
      </div>
      {programReviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
      {programReviews.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>✍️</div>
          <div>Be the first to review this program!</div>
        </div>
      )}
    </div>
  );
}
function TrainerCard({ trainer, onClick }: { trainer: any, onClick: (t: any) => void }) {
  const ratingColor =
    trainer.overallRating >= 4.7
      ? "#10B981"
      : trainer.overallRating >= 4.2
      ? "#3B82F6"
      : trainer.overallRating >= 3.8
      ? "#F59E0B"
      : "#EF4444";
  return (
    <div
      onClick={() => onClick(trainer)}
      style={{
        background: "#fff",
        border: trainer.featured ? "2px solid #3B82F6" : "1px solid #E5E7EB",
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: trainer.featured
          ? "0 4px 16px rgba(59,130,246,0.15)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,95,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = trainer.featured
          ? "0 4px 16px rgba(59,130,246,0.15)"
          : "0 2px 8px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {trainer.featured && (
        <div
          style={{
            position: "absolute",
            top: -1,
            right: 16,
            background: "#3B82F6",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "0 0 8px 8px",
            letterSpacing: 1,
          }}
        >
          ⭐ FEATURED
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #1e3a5f, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 20,
              color: "#fff",
              fontWeight: 800,
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            {trainer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 3,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
                {trainer.name}
              </span>
              {trainer.verified && (
                <span
                  style={{
                    fontSize: 11,
                    background: "#DBEAFE",
                    color: "#1D4ED8",
                    padding: "2px 8px",
                    borderRadius: 99,
                    fontWeight: 600,
                  }}
                >
                  ✓ Verified
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 6 }}>
              {trainer.title}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 12,
                  background: "#F3F4F6",
                  padding: "2px 10px",
                  borderRadius: 99,
                  color: "#374151",
                }}
              >
                ⚽ {trainer.sport}
              </span>
              <span
                style={{
                  fontSize: 12,
                  background: "#F3F4F6",
                  padding: "2px 10px",
                  borderRadius: 99,
                  color: "#374151",
                }}
              >
                💲 {trainer.rate}
              </span>
              <span
                style={{
                  fontSize: 12,
                  background: "#F3F4F6",
                  padding: "2px 10px",
                  borderRadius: 99,
                  color: "#374151",
                }}
              >
                📍 {trainer.location}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            background: ratingColor,
            color: "#fff",
            borderRadius: 12,
            padding: "8px 14px",
            minWidth: 56,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1 }}>
            {trainer.overallRating.toFixed(1)}
          </div>
          <div style={{ fontSize: 10, opacity: 0.9 }}>
            {trainer.totalReviews} reviews
          </div>
        </div>
      </div>
      <p
        style={{
          fontSize: 13,
          color: "#6B7280",
          lineHeight: 1.5,
          marginBottom: 10,
        }}
      >
        {trainer.bio}
      </p>
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}
      >
        {trainer.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 11,
              background: "#EEF2FF",
              color: "#4338CA",
              padding: "2px 8px",
              borderRadius: 99,
            }}
          >
            #{t}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {trainer.sessionTypes.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 11,
              background: "#F0FDF4",
              color: "#166534",
              padding: "2px 10px",
              borderRadius: 99,
              border: "1px solid #BBF7D0",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function TrainerDetail({ trainer, reviews, onBack }: { trainer: any, reviews: any[], onBack: () => void }) {
  const trainerReviews = reviews.filter((r) => r.trainerId === trainer.id);
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#1e3a5f",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          marginBottom: 16,
          padding: 0,
        }}
      >
        ← Back to Trainers
      </button>

      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2442 100%)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                fontFamily: "'Bebas Neue', sans-serif",
                flexShrink: 0,
              }}
            >
              {trainer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                  flexWrap: "wrap",
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 26,
                    letterSpacing: 2,
                  }}
                >
                  {trainer.name}
                </h1>
                {trainer.verified && (
                  <span
                    style={{
                      fontSize: 12,
                      background: "rgba(59,130,246,0.3)",
                      padding: "3px 10px",
                      borderRadius: 99,
                    }}
                  >
                    ✓ Verified
                  </span>
                )}
                {trainer.featured && (
                  <span
                    style={{
                      fontSize: 12,
                      background: "rgba(251,191,36,0.25)",
                      color: "#FCD34D",
                      padding: "3px 10px",
                      borderRadius: 99,
                    }}
                  >
                    ⭐ Featured
                  </span>
                )}
              </div>
              <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8 }}>
                {trainer.title}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, opacity: 0.8 }}>
                  📍 {trainer.location}
                </span>
                <span style={{ fontSize: 13, opacity: 0.8 }}>
                  ⚽ {trainer.sport}
                </span>
                <span style={{ fontSize: 13, opacity: 0.8 }}>
                  💲 {trainer.rate}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 16,
              padding: "12px 20px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                lineHeight: 1,
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              {trainer.overallRating.toFixed(1)}
            </div>
            <StarRating
              value={trainer.overallRating}
              size="sm"
              showNumber={false}
            />
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              {trainer.totalReviews} reviews
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 14,
            }}
          >
            Rating Breakdown
          </h3>
          {TRAINER_RATING_CATEGORIES.map((cat) => (
            <RatingBar
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              value={trainer.ratings[cat.id] ?? 0}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              About
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {trainer.bio}
            </p>
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Specialties
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {trainer.specialties.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 12,
                      background: "#F3F4F6",
                      padding: "3px 10px",
                      borderRadius: 99,
                      color: "#374151",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Session Types
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {trainer.sessionTypes.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 12,
                      background: "#F0FDF4",
                      color: "#166534",
                      padding: "3px 10px",
                      borderRadius: 99,
                      border: "1px solid #BBF7D0",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {trainer.bookingUrl ? (
            <div
              style={{
                background: "linear-gradient(135deg, #1e3a5f, #1D4ED8)",
                borderRadius: 16,
                padding: 18,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 8,
                }}
              >
                Ready to book a session?
              </div>
              <a
                href={trainer.bookingUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  background: "#10B981",
                  color: "#fff",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Book a Session →
              </a>
            </div>
          ) : (
            <div
              style={{
                background: "#FEF3C7",
                border: "1px solid #FCD34D",
                borderRadius: 16,
                padding: 16,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "#92400E",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                📩 Contact to Book
              </div>
              <div style={{ fontSize: 12, color: "#78350F" }}>
                This trainer hasn't set up online booking yet.
              </div>
            </div>
          )}
          <div
            style={{
              background: "#FEF3C7",
              border: "1px solid #FCD34D",
              borderRadius: 14,
              padding: 14,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>📣</div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#92400E",
                marginBottom: 2,
              }}
            >
              Are you a trainer?
            </div>
            <div style={{ fontSize: 11, color: "#B45309" }}>
              List your services free. Get featured for more reach.
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>
          Reviews ({trainerReviews.length})
        </h3>
        <button
          style={{
            padding: "10px 20px",
            background: "#1e3a5f",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Write a Review
        </button>
      </div>
      {trainerReviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
      {trainerReviews.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>✍️</div>
          <div>No reviews yet — be the first!</div>
        </div>
      )}
    </div>
  );
}
function AddProgramModal({ onClose, onSubmit }: { onClose: () => void, onSubmit: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState("parent");
  const [form, setForm] = useState({
    name: "",
    sport: "",
    gender: "",
    location: "",
    description: "",
    ageGroups: [],
    travel: "",
    priceTier: "",
    website: "",
    contactEmail: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleAge = (ag) =>
    set(
      "ageGroups",
      form.ageGroups.includes(ag)
        ? form.ageGroups.filter((x) => x !== ag)
        : [...form.ageGroups, ag]
    );

  const step1Valid = form.name && form.sport && form.gender && form.location;
  const step2Valid = form.travel && form.priceTier && form.ageGroups.length > 0;

  const handleSubmit = () => {
    const newProgram = {
      id: Date.now(),
      name: form.name,
      sport: form.sport,
      gender: form.gender,
      ageGroups: form.ageGroups,
      travel: form.travel,
      priceTier: form.priceTier,
      location: form.location,
      description: form.description || "No description provided yet.",
      overallRating: null,
      totalReviews: 0,
      ratings: {},
      tags: [],
      verified: tab === "org",
      status: "pending",
    };
    onSubmit(newProgram);
  };

  const inputStyle = {
    padding: "10px 14px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 10,
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: 560,
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                color: "#1e3a5f",
                letterSpacing: 1,
                marginBottom: 2,
              }}
            >
              Add a Program
            </h2>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    height: 4,
                    width: 32,
                    borderRadius: 99,
                    background: step >= n ? "#1e3a5f" : "#E5E7EB",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#9CA3AF",
            }}
          >
            ✕
          </button>
        </div>

        {/* Role tabs */}
        {step === 1 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["parent", "org"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "9px",
                  border: `2px solid ${tab === t ? "#1e3a5f" : "#E5E7EB"}`,
                  borderRadius: 10,
                  background: tab === t ? "#1e3a5f" : "#fff",
                  color: tab === t ? "#fff" : "#374151",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {t === "parent" ? "👋 Parent / Player" : "🏢 Organization"}
              </button>
            ))}
          </div>
        )}

        {tab === "org" && step === 1 && (
          <div
            style={{
              background: "#EEF2FF",
              borderRadius: 12,
              padding: 14,
              marginBottom: 18,
              fontSize: 13,
              color: "#4338CA",
            }}
          >
            🎉 Organizations get a <strong>free verified listing</strong> with
            the ability to respond to reviews, post updates, and access
            analytics.
          </div>
        )}

        {/* STEP 1 — Basic Info */}
        {step === 1 && (
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={labelStyle}>Program Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Garden City Storm Baseball"
                style={inputStyle}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <label style={labelStyle}>Sport *</label>
                <select
                  value={form.sport}
                  onChange={(e) => set("sport", e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select sport...</option>
                  {SPORTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Gender *</label>
                <select
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select...</option>
                  {GENDERS.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Location (City, State) *</label>
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Mineola, NY"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                Description{" "}
                <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
                  (optional)
                </span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Brief overview of the program — what makes it unique, coaching philosophy, etc."
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              />
            </div>
            <button
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              style={{
                padding: 12,
                background: step1Valid ? "#1e3a5f" : "#D1D5DB",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: step1Valid ? "pointer" : "not-allowed",
              }}
            >
              Continue → Details
            </button>
          </div>
        )}

        {/* STEP 2 — Program Details */}
        {step === 2 && (
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={labelStyle}>
                Age Groups Offered *{" "}
                <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
                  (select all that apply)
                </span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {AGE_GROUPS.map((ag) => (
                  <button
                    key={ag}
                    onClick={() => toggleAge(ag)}
                    style={{
                      padding: "6px 14px",
                      border: `1.5px solid ${
                        form.ageGroups.includes(ag) ? "#1e3a5f" : "#E5E7EB"
                      }`,
                      borderRadius: 99,
                      background: form.ageGroups.includes(ag)
                        ? "#EEF2FF"
                        : "#fff",
                      color: form.ageGroups.includes(ag)
                        ? "#1e3a5f"
                        : "#374151",
                      fontSize: 13,
                      cursor: "pointer",
                      fontWeight: form.ageGroups.includes(ag) ? 600 : 400,
                    }}
                  >
                    {ag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Travel Level *</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {TRAVEL_LEVELS.map((t) => (
                  <button
                    key={t}
                    onClick={() => set("travel", t)}
                    style={{
                      padding: "9px 12px",
                      border: `1.5px solid ${
                        form.travel === t ? "#1e3a5f" : "#E5E7EB"
                      }`,
                      borderRadius: 10,
                      background: form.travel === t ? "#1e3a5f" : "#fff",
                      color: form.travel === t ? "#fff" : "#374151",
                      fontSize: 13,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {t === "Local Only"
                      ? "🏠"
                      : t === "Regional (1–2 hr)"
                      ? "🚗"
                      : t === "State Travel"
                      ? "✈️"
                      : "🌎"}{" "}
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Annual Cost Range *</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {PRICE_TIERS.map((p) => (
                  <button
                    key={p}
                    onClick={() => set("priceTier", p)}
                    style={{
                      padding: "9px 12px",
                      border: `1.5px solid ${
                        form.priceTier === p ? "#1e3a5f" : "#E5E7EB"
                      }`,
                      borderRadius: 10,
                      background: form.priceTier === p ? "#1e3a5f" : "#fff",
                      color: form.priceTier === p ? "#fff" : "#374151",
                      fontSize: 13,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: 12,
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#374151",
                }}
              >
                ← Back
              </button>
              <button
                disabled={!step2Valid}
                onClick={() => setStep(3)}
                style={{
                  flex: 2,
                  padding: 12,
                  background: step2Valid ? "#1e3a5f" : "#D1D5DB",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: step2Valid ? "pointer" : "not-allowed",
                }}
              >
                Continue → Contact
              </button>
            </div>
          </div>
        )}
        {/* STEP 3 — Contact + Review notice */}
        {step === 3 && (
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={labelStyle}>
                Website{" "}
                <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
                  (optional)
                </span>
              </label>
              <input
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://yourprogram.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                Contact Email{" "}
                <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
                  (optional — not shown publicly)
                </span>
              </label>
              <input
                value={form.contactEmail}
                onChange={(e) => set("contactEmail", e.target.value)}
                placeholder="coach@example.com"
                style={inputStyle}
              />
            </div>

            {/* Moderation notice */}
            <div
              style={{
                background: "#FFFBEB",
                border: "1.5px solid #FCD34D",
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#92400E",
                  marginBottom: 6,
                }}
              >
                ⏳ How moderation works
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#78350F",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Your program will appear <strong>immediately</strong> as
                "Pending Review" so you can see it live. Our team reviews every
                submission within 24 hours to make sure listings are accurate
                and not fake — no shill pages, no hit jobs. Once approved it
                becomes fully public and searchable.
              </p>
            </div>

            {/* Summary card */}
            <div
              style={{
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                Review your submission:
              </div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  ["Program", form.name],
                  ["Sport", `${form.sport} · ${form.gender}`],
                  ["Location", form.location],
                  ["Ages", form.ageGroups.join(", ")],
                  ["Travel", form.travel],
                  ["Price", form.priceTier],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#6B7280" }}>{label}</span>
                    <span style={{ color: "#111827", fontWeight: 500 }}>
                      {val || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  flex: 1,
                  padding: 12,
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#374151",
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 2,
                  padding: 12,
                  background: "#10B981",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Submit Program ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home"); // home | results | detail | trainer-detail
  const [programs, setPrograms] = useState(SAMPLE_PROGRAMS);
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [trainers] = useState(SAMPLE_TRAINERS);
  const [trainerReviews] = useState(SAMPLE_TRAINER_REVIEWS);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const [filters, setFilters] = useState({
    sport: "",
    gender: "",
    travel: "",
    price: "",
    search: "",
    showTrainers: true,
    showPrograms: true,
  });
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [toast, setToast] = useState(null);

  // Build unified, interleaved results list: programs + trainers matched by sport/search
  // Sponsored trainers are injected at position 3 and 7 if they match the sport filter
  const filteredPrograms = programs.filter((p) => {
    if (!filters.showPrograms) return false;
    if (filters.sport && p.sport !== filters.sport) return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.travel && p.travel !== filters.travel) return false;
    if (filters.price && p.priceTier !== filters.price) return false;
    if (
      filters.search &&
      !p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !p.location.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const filteredTrainers = trainers.filter((t) => {
    if (!filters.showTrainers) return false;
    if (filters.sport && t.sport !== filters.sport && t.sport !== "Multi-Sport")
      return false;
    if (
      filters.search &&
      !t.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !t.location.toLowerCase().includes(filters.search.toLowerCase()) &&
      !t.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  // Interleave: sort each by rating desc, then weave trainers into program list
  // Featured trainers get injected at slot 3 and 7; others appear naturally interspersed
  const buildUnifiedResults = () => {
    const progs = [...filteredPrograms]
      .sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0))
      .map((p) => ({ ...p, _type: "program" }));
    const featured = filteredTrainers
      .filter((t) => t.featured)
      .map((t) => ({ ...t, _type: "trainer", _sponsored: true }));
    const regular = filteredTrainers
      .filter((t) => !t.featured)
      .sort((a, b) => b.overallRating - a.overallRating)
      .map((t) => ({ ...t, _type: "trainer", _sponsored: false }));
    // Inject featured trainer at index 2 (after 2 programs), then every 5 programs inject a regular trainer
    const result = [...progs];
    featured.forEach((ft, i) =>
      result.splice(Math.min(2 + i * 5, result.length), 0, ft)
    );
    regular.forEach((rt, i) =>
      result.splice(Math.min(6 + i * 4, result.length), 0, rt)
    );
    return result;
  };
  const unifiedResults = buildUnifiedResults();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleReviewSubmit = (data) => {
    const newReview = {
      id: reviews.length + 1,
      programId: selectedProgram.id,
      author: "You",
      role: data.role,
      date: "Just now",
      text: data.text,
      ratings: data.ratings,
      helpful: 0,
    };
    setReviews((r) => [...r, newReview]);
    showToast(
      "✅ Your review was submitted! Thank you for helping other families."
    );
  };

  const Logo = ({ height = 55 }) => (
    <img
      src="https://i.imgur.com/9zwYUWm.png"
      alt="Trophy"
      style={{ height, width: "auto", objectFit: "contain", display: "block" }}
    />
  );

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#111827",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 12,
            fontSize: 14,
            zIndex: 2000,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          {toast}
        </div>
      )}

      {showReviewModal && selectedProgram && (
        <WriteReviewModal
          program={selectedProgram}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Header */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 58,
          }}
        >
          <button
            onClick={() => {
              setView("home");
              setSelectedProgram(null);
              setSelectedTrainer(null);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Logo />
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowAddProgram(true)}
              style={{
                padding: "7px 14px",
                border: "1.5px solid #1e3a5f",
                borderRadius: 8,
                background: "#fff",
                color: "#1e3a5f",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Add Program
            </button>
            <button
              onClick={() => setShowAddTrainer(true)}
              style={{
                padding: "7px 14px",
                border: "1.5px solid #10B981",
                borderRadius: 8,
                background: "#fff",
                color: "#10B981",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + List as Trainer
            </button>
            <button
              style={{
                padding: "7px 14px",
                background: "#1e3a5f",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Advertise
            </button>
          </div>
        </div>
      </header>

      {showAddProgram && (
        <AddProgramModal
          onClose={() => setShowAddProgram(false)}
          onSubmit={(newProgram) => {
            setPrograms((prev) => [...prev, newProgram]);
            setShowAddProgram(false);
            showToast(
              "✅ Program added! It's visible as 'Pending Review' and will go live once our team verifies it."
            );
          }}
        />
      )}

      {showAddTrainer && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 28,
              width: "100%",
              maxWidth: 520,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  color: "#1e3a5f",
                  letterSpacing: 1,
                }}
              >
                List as a Trainer
              </h2>
              <button
                onClick={() => setShowAddTrainer(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                background: "#F0FDF4",
                border: "1.5px solid #BBF7D0",
                borderRadius: 12,
                padding: 14,
                marginBottom: 18,
                fontSize: 13,
                color: "#166534",
              }}
            >
              🎉 <strong>Free basic listing</strong> — get discovered by
              families in your sport & area. Upgrade to{" "}
              <strong>Featured ($29/mo)</strong> for boosted placement in search
              results.
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <input
                placeholder="Your Full Name"
                style={{
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <input
                placeholder="Title (e.g. Baseball Hitting Coach)"
                style={{
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <select
                  style={{
                    padding: "10px 14px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                  }}
                >
                  <option value="">Sport</option>
                  {SPORTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                  <option>Multi-Sport</option>
                </select>
                <input
                  placeholder="Rate (e.g. $75/hr)"
                  style={{
                    padding: "10px 14px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                  }}
                />
              </div>
              <input
                placeholder="Location (City, State)"
                style={{
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <input
                placeholder="Booking link (Calendly, website, etc.) — optional"
                style={{
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <textarea
                placeholder="Short bio — background, specialties, what makes you different..."
                style={{
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  minHeight: 80,
                  resize: "vertical",
                  fontFamily: "inherit",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <button
                  onClick={() => {
                    setShowAddTrainer(false);
                    showToast(
                      "✅ Trainer listing submitted! We'll review and publish within 24 hours."
                    );
                  }}
                  style={{
                    padding: 12,
                    background: "#F3F4F6",
                    color: "#374151",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Free Listing
                </button>
                <button
                  onClick={() => {
                    setShowAddTrainer(false);
                    showToast(
                      "⭐ Featured listing submitted! Check your email to complete payment."
                    );
                  }}
                  style={{
                    padding: 12,
                    background: "#1e3a5f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ⭐ Get Featured — $29/mo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
        {/* HOME — intent-first landing */}
        {view === "home" && (
          <div>
            {/* Hero */}
            <div style={{ textAlign: "center", padding: "32px 0 28px" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#3B82F6",
                  letterSpacing: 2,
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                Clubs. Travel Programs. Trainers. Development.
              </div>
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 44,
                  color: "#1e3a5f",
                  letterSpacing: 2,
                  lineHeight: 1.05,
                  marginBottom: 10,
                }}
              >
                THE SMARTER WAY TO
                <br />
                <span style={{ color: "#3B82F6" }}>Find the Right Program</span>
              </h1>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: 15,
                  maxWidth: 480,
                  margin: "0 auto 28px",
                }}
              >
                Real parent reviews for youth travel teams and trainers — from
                families who've been there.
              </p>

              {/* ── INTENT SPLIT ─────────────────────────────────────── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  maxWidth: 640,
                  margin: "0 auto 32px",
                }}
              >
                {/* Program card */}
                <button
                  onClick={() => {
                    setFilters((f) => ({
                      ...f,
                      showPrograms: true,
                      showTrainers: false,
                    }));
                    setView("results");
                  }}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 14,
                    padding: "16px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#1e3a5f";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(30,58,95,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🏆</div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 17,
                      color: "#1e3a5f",
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    FIND A PROGRAM
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}
                  >
                    Travel clubs and leagues — rated by real families.
                  </div>
                </button>

                {/* Trainer card */}
                <button
                  onClick={() => {
                    setFilters((f) => ({
                      ...f,
                      showPrograms: false,
                      showTrainers: true,
                    }));
                    setView("results");
                  }}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 14,
                    padding: "16px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#10B981";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(16,185,129,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 17,
                      color: "#065F46",
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    FIND A TRAINER
                  </div>

                  <div
                    style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}
                  >
                    Private, One-one-One, Groups, Specialists & Developmental
                    Programs
                  </div>
                </button>
              </div>

              {/* Quick search — secondary, not the hero */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                <input
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      search: e.target.value,
                      showPrograms: true,
                      showTrainers: true,
                    }))
                  }
                  placeholder="Search by name, sport, or city..."
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    color: "#374151",
                  }}
                  onKeyDown={(e) => e.key === "Enter" && setView("results")}
                />
                <button
                  onClick={() => setView("results")}
                  style={{
                    padding: "10px 20px",
                    background: "#1e3a5f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Browse by sport — compact pill row */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              {[
                ["⚾", "Baseball"],
                ["⚽", "Soccer"],
                ["🏀", "Basketball"],
                ["🥍", "Lacrosse"],
                ["🏒", "Hockey"],
                ["🏐", "Volleyball"],
                ["🎾", "Tennis"],
                ["🤸", "Gymnastics"],
              ].map(([icon, sport]) => (
                <button
                  key={sport}
                  onClick={() => {
                    setFilters((f) => ({
                      ...f,
                      sport,
                      showPrograms: true,
                      showTrainers: true,
                    }));
                    setView("results");
                  }}
                  style={{
                    padding: "7px 16px",
                    background: "#fff",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 99,
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 500,
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#1e3a5f";
                    e.currentTarget.style.background = "#EEF2FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  {icon} {sport}
                </button>
              ))}
            </div>

            {/* Top rated — leaner, no section header clutter */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 12,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 17,
                  color: "#1e3a5f",
                  letterSpacing: 1,
                }}
              >
                TOP RATED NEAR YOU
              </h3>
              <button
                onClick={() => {
                  setFilters((f) => ({
                    ...f,
                    showPrograms: true,
                    showTrainers: true,
                  }));
                  setView("results");
                }}
                style={{
                  fontSize: 13,
                  color: "#3B82F6",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                See all →
              </button>
            </div>
            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {[...programs]
                .sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0))
                .slice(0, 2)
                .map((p) => (
                  <ProgramCard
                    key={p.id}
                    program={p}
                    onClick={(prog) => {
                      setSelectedProgram(prog);
                      setView("detail");
                    }}
                  />
                ))}
              {trainers
                .filter((t) => t.featured)
                .slice(0, 1)
                .map((t) => (
                  <TrainerCard
                    key={t.id}
                    trainer={t}
                    onClick={(tr) => {
                      setSelectedTrainer(tr);
                      setView("trainer-detail");
                    }}
                  />
                ))}
            </div>

            {/* Sponsor ad */}
            <div
              style={{
                background: "linear-gradient(135deg, #1e3a5f, #1D4ED8)",
                borderRadius: 14,
                padding: "18px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 3,
                    letterSpacing: 1,
                  }}
                >
                  SPONSORED
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 20,
                    color: "#fff",
                    letterSpacing: 1,
                  }}
                >
                  ⚾ Diamond Sports Gear
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                  Bats, gloves, training equipment — 20% off for travel teams
                </div>
              </div>
              <button
                style={{
                  padding: "9px 18px",
                  background: "#F59E0B",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Shop Now →
              </button>
            </div>
          </div>
        )}

        {/* UNIFIED RESULTS */}
        {view === "results" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 24,
                    color: "#1e3a5f",
                    letterSpacing: 1,
                  }}
                >
                  SEARCH RESULTS
                </h2>
                <p style={{ fontSize: 13, color: "#6B7280" }}>
                  {filteredPrograms.length} programs · {filteredTrainers.length}{" "}
                  trainers
                </p>
              </div>
              <button
                onClick={() => setView("home")}
                style={{
                  background: "none",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 8,
                  padding: "7px 14px",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#374151",
                }}
              >
                ← Home
              </button>
            </div>

            {/* Filters bar */}
            <div
              style={{
                background: "#fff",
                padding: 14,
                borderRadius: 14,
                border: "1px solid #E5E7EB",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, search: e.target.value }))
                    }
                    placeholder="Search..."
                    style={{
                      padding: "7px 12px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 8,
                      fontSize: 13,
                      width: 180,
                    }}
                  />
                  <select
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, sport: e.target.value }))
                    }
                    value={filters.sport}
                    style={{
                      padding: "7px 10px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  >
                    <option value="">All Sports</option>
                    {SPORTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <select
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, gender: e.target.value }))
                    }
                    value={filters.gender}
                    style={{
                      padding: "7px 10px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  >
                    <option value="">All Genders</option>
                    {GENDERS.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                  <select
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, price: e.target.value }))
                    }
                    value={filters.price}
                    style={{
                      padding: "7px 10px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  >
                    <option value="">All Prices</option>
                    {PRICE_TIERS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        showPrograms: !f.showPrograms,
                      }))
                    }
                    style={{
                      padding: "5px 12px",
                      borderRadius: 99,
                      border: "1.5px solid",
                      borderColor: filters.showPrograms ? "#1e3a5f" : "#E5E7EB",
                      background: filters.showPrograms ? "#EEF2FF" : "#fff",
                      color: filters.showPrograms ? "#1e3a5f" : "#9CA3AF",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    🏆 Programs
                  </button>
                  <button
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        showTrainers: !f.showTrainers,
                      }))
                    }
                    style={{
                      padding: "5px 12px",
                      borderRadius: 99,
                      border: "1.5px solid",
                      borderColor: filters.showTrainers ? "#10B981" : "#E5E7EB",
                      background: filters.showTrainers ? "#F0FDF4" : "#fff",
                      color: filters.showTrainers ? "#10B981" : "#9CA3AF",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    🎯 Trainers
                  </button>
                </div>
              </div>
            </div>

            {/* Unified results list */}
            <div style={{ display: "grid", gap: 14 }}>
              {unifiedResults.map((item, idx) => (
                <div key={item._type + item.id}>
                  {item._type === "program" ? (
                    <ProgramCard
                      program={item}
                      onClick={(p) => {
                        setSelectedProgram(p);
                        setView("detail");
                      }}
                    />
                  ) : (
                    <TrainerCard
                      trainer={item}
                      onClick={(t) => {
                        setSelectedTrainer(t);
                        setView("trainer-detail");
                      }}
                    />
                  )}
                  {/* Inject "Get Listed as Trainer" CTA after item 4 if trainers are visible */}
                  {idx === 4 && filters.showTrainers && (
                    <div
                      style={{
                        background: "linear-gradient(135deg, #064E3B, #065F46)",
                        borderRadius: 14,
                        padding: "16px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255,0.6)",
                            marginBottom: 3,
                            letterSpacing: 1,
                          }}
                        >
                          FOR INDEPENDENT TRAINERS
                        </div>
                        <div
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 18,
                            color: "#fff",
                            letterSpacing: 1,
                          }}
                        >
                          🎯 Get Discovered on Trophy
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.8)",
                          }}
                        >
                          Free listing · Featured from $29/mo · Booking link
                          included
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAddTrainer(true)}
                        style={{
                          padding: "9px 18px",
                          background: "#10B981",
                          color: "#fff",
                          border: "none",
                          borderRadius: 10,
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        Get Listed →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {unifiedResults.length === 0 && (
              <div
                style={{ textAlign: "center", padding: 60, color: "#9CA3AF" }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                  No results found
                </div>
                <div style={{ fontSize: 14 }}>
                  Try adjusting your filters or add what's missing
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROGRAM DETAIL */}
        {view === "detail" && selectedProgram && (
          <ProgramDetail
            program={selectedProgram}
            reviews={reviews}
            onBack={() => {
              setView("results");
              setSelectedProgram(null);
            }}
            onReview={() => setShowReviewModal(true)}
          />
        )}

        {/* TRAINER DETAIL */}
        {view === "trainer-detail" && selectedTrainer && (
          <TrainerDetail
            trainer={selectedTrainer}
            reviews={trainerReviews}
            onBack={() => {
              setView("results");
              setSelectedTrainer(null);
            }}
          />
        )}
      </main>

      <footer
        style={{
          borderTop: "1px solid #E5E7EB",
          background: "#fff",
          padding: "20px",
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABSEAAANrCAYAAAC5mF26AAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAABSGgAwAEAAAAAQAAA2sAAAAAlVe+ogAAAAlwSFlzAAALEwAACxMBAJqcGAAAABxpRE9UAAAAAgAAAAAAAAG2AAAAKAAAAbYAAAG1AAH5by5jHHEAAEAASURBVHgB7N0HnB1lvf/x+7r/W5QiLcm2AKmbbWdbdjcV1HsVqaFXQeUKFgREBGkKiCIqSifSpQZISEIogoioVOklhBpKQgoJhARSII3f//t7ZubsObubAA6DcvLB1+Occ/bM7tkz7002n3lm5t/ef/99Y/AeYAADGMAABjCAAQxgAAMYwAAGMIABDGAAA+kMmDqjhhX8F7fHf0v3idkwvH8YwAAGMIABDGAAAxjAAAYwgAEMYAADGMCAG4gjZLwMNTLcft+IkMwEZSYsBjCAAQxgAAMYwAAGMIABDGAAAxjAAAY+BgNEyI/hTaToU/QxgAEMYAADGMAABjCAAQxgAAMYwAAGMLBmA8URUl03/OfPZyYklZtAiwEMYAADGMAABjCAAQxgAAMYwAAGMICBj8EAEfJjeBOp3Guu3Lw3vDcYwAAGMIABDGAAAxjAAAYwgAEMYAADPURIzgnJDwY/GBjAAAYwgAEMYAADGMAABjCAAQxgAAMY+HgN9BQiORybGZJMNcYABjCAAQxgAAMYwAAGMIABDGAAAxjAwMdqoGuIJEIC7GMFxp6Dj3fPAe8n7ycGMIABDGAAAxjAAAYwgAEMYAADpWGAC9MQ4QixGMAABjCAAQxgAAMYwAAGMIABDGAAAxjI1AAREmCZAmNvRWnsrWA7sh0xgAEMYAADGMAABjCAAQxgAAMYSGOACEmEJEJiAAMYwAAGMIABDGAAAxjAAAYwgAEMYCBTA0RIgGUKLE0hZ132sGAAAxjAAAYwgAEMYAADGMAABjCAgdIwQIQkQhIhMYABDGAAAxjAAAYwgAEMYAADGMAABjCQqQEiJMAyBcbeitLYW8F2ZDtiAAMYwAAGMIABDGAAAxjAAAYwkMYAEZIISYTEAAYwgAEMYAADGMAABjCAAQxgAAMYwECmBoiQAMsUWJpCzrrsYcEABjCAAQxgAAMYwAAGMIABDGAAA6VhgAhJhCRCYgADGMAABjCAAQxgAAMYwAAGMIABDGAgUwNESIBlCoy9FaWxt4LtyHbEAAYwgAEMYAADGMAABjCAAQxgII0BIiQRkgiJAQxgAAMYwAAGMIABDGAAAxjAAAYwgIFMDRAhAZYpsDSFnHXZw4IBDGAAAxjAAAYwgAEMYAADGMAABkrDABGSCEmExAAGMIABDGAAAxjAAAYwgAEMYAADGMBApgaIkADLFBh7K0pjbwXbke2IAQxgAAMYwAAGMIABDGAAAxjAQBoDREgiJBESAxjAAAYwgAEMYAADGMAABjCAAQxgAAOZGiBCAixTYGkKOeuyhwUDGMAABjCAAQxgAAMYwAAGMIABDJSGASIkEZIIiQEMYAADGMAABjCAAQxgAAMYwAAGMICBTA0QIQGWKTD2VpTG3gq2I9sRAxjAAAYwgAEMYAADGMAABjCAgTQGiJBESCIkBjCAAQxgAAMYwAAGMIABDGAAAxjAAAYyNUCEBFimwNIUctZlDwsGMIABDGAAAxjAAAYwgAEMYAADGCgNA0RIIiQREgMYwAAGMIABDGAAAxjAAAYwgAEMYAADmRogQgIsU2DsrSiNvRVsR7YjBjCAAQxgAAMYwAAGMIABDGAAA2kMECGJkERIDGAAAxjAAAYwgAEMYAADGMAABjCAAQxkaoAICbBMgaUp5KzLHhYMYAADGMAABjCAAQxgAAMYwAAGMFAaBoiQREgiJAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMjVAhARYpsDYW1EaeyvYjmxHDGAAAxjAAAYwgAEMYAADGMAABtIYIEISIYmQGMAABjCAAQxgAAMYwAAGMIABDGAAAxjI1AAREmCZAktTyFmXPSwYwAAGMIABDGAAAxjAAAYwgAEMYKA0DBAhiZBESAxgAAMYwAAGMIABDGAAAxjAAAYwgAEMZGqACAmwTIGxt6I09lawHdmOGMAABjCAAQxgAAMYwAAGMIABDKQxQIQkQhIhMYABDGAAAxjAAAYwgAEMYAADGMAABjCQqQEiJMAyBZamkLMue1gwgAEMYAADGMAABjCAAQxgAAMYwEBpGCBCEiGJkBjAAAYwgAEMYAADGMAABjCAAQxgAAMYyNQAERJgmQJjb0Vp7K1gO7IdMYABDGAAAxjAAAYwgAEMYAADGEhjgAhJhCRCYgADGMAABjCAAQxgAAMYwAAGMIABDGAgUwNESIBlCixNIWdd9rBgAAMYwAAGMIABDGAAAxjAAAYwgIHSMECEJEISITGAAQxgAAMYwAAGMIABDGAAAxjAAAYwkKkBIiTAMgXG3orS2FvBdmQ7YgADGMAABjCAAQxgAAMYwAAGMJDGABGSCEmExAAGMIABDGAAAxjAAAYwgAEMYAADGMBApgaIkADLFFiaQs667GHBAAYwgAEMYAADGMAABjCAAQxgAAOlYYAISYQkQmIAAxjAAAYwgAEMYAADGMAABjCAAQxgIFMDREiAZQqMvRWlsbeC7ch2xAAGMIABDGAAAxjAAAYwgAEMYCCNASIkEZIIiQEMYAADGMAABjCAAQxgAAMYwAAGMICBTA0QIQGWKbA0hZx12cOCAQxgAAMYwAAGMIABDGAAAxjAAAZKwwARkghJhMQABjCAAQxgAAMYwAAGMIABDGAAAxjAQKYGiJAAyxQYeytKY28F25HtiAEMYAADGMAABjCAAQxgAAMYwEAaA0RIIiQREgMYwAAGMIABDGAAAxjAAAYwgAEMYAADmRogQgIsU2BpCjnrsocFAxjAAAYwgAEMYAADGMAABjCAAQyUhgEiJBGSCIkBDGAAAxjAAAYwgAEMYAADGMAABjCAgUwNECEBlikw9laUxt4KtiPbEQMYwAAGMIABDGAAAxjAAAYwgIE0BoiQREgiJAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMjVAhARYpsDSFHLWZQ8LBjCAAQxgAAMYwAAGMIABDGAAAxgoDQNESCIkERIDGMAABjCAAQxgAAMYwAAGMIABDGAAA5kaIEICLFNg7K0ojb0VbEe2IwYwgAEMYAADGMAABjCAAQxgAANpDBAhiZBESAxgAAMYwAAGMIABDGAAAxjAAAYwgAEMZGqACAmwTIGlKeSsyx4WDGAAAxjAAAYwgAEMYAADGMAABjBQGgaIkERIIiQGMIABDGAAAxjAAAYwgAEMYAADGMAABjI1QIQEWKbA2FtRGnsr2I5sRwxgAAMYwAAGMIABDGAAAxjAAAbSGCBCEiGJkBjAAAYwgAEMYAADGMAABjCAAQxgAAMYyNQAERJgmQJLU8hZlz0sGMAABjCAAQxgAAMYwAAGMIABDGCgNAwQIYmQREgMYAADGMAABjCAAQxgAAMYwAAGMIABDGRqgAgJsEyBsbeiNPZWsB3ZjhjAAAYwgAEMYAADGMAABjCAAQykMUCEJEISITGAAQxgAAMYwAAGMIABDGAAAxjAAAYwkKkBIiTAMgWWppCzLntYMIABDGAAAxjAAAYwgAEMYAADGMBAaRggQhIhiZAYwAAGMIABDGAAAxjAAAYwgAEMYAADGMjUABESYJkCY29FaeytYDuyHTGAAQxgAAMYwAAGMIABDGAAAxhIY4AISYQkQmIAAxjAAAYwgAEMYAADGMAABjCAAQxgIFMDREiAZQosTSFnXfawYAADGMAABjCAAQxgAAMYwAAGMICB0jBAhCRCEiExgAEMYAADGMAABjCAAQxgAAMYwAAGMJCpASIkwDIFxt6K0thbwXZkO2IAAxjAAAYwgAEMYAADGMAABjCQxgARkghJhMQABjCAAQxgAAMYwAAGMIABDGAAAxjAQKYGiJAAyxRYmkLOuuxhwQAGMIABDGAAAxjAAAYwgAEMYAADpWGACEmEJEJiAAMYwAAGMIABDGAAAxjAAAYwgAEMYCBTA0RIgGUKjL0VpbG3gu3IdsQABjCAAQxgAAMYwAAGMIABDGAgjQEiJBGSCIkBDGAAAxjAAAYwgAEMYAADGMAABjCAgUwNECEBlimwNIWcddnDggEMYAADGMAABjCAAQxgAAMYwAAGSsMAEZIISYTEAAYwgAEMYAADGMAABjCAAQxgAAMYwECmBoiQAMsUGHsrSmNvBduR7YgBDGAAAxjAAAYwgAEMYAADGMBAGgNESCIkERIDGMAABjCAAQxgAAMYwAAGMIABDGAAA5kaIEICLFNgaQo567KHBQMYwAAGMIABDGAAAxjAAAYwgAEMlIYBIiQRkgiJAQxgAAMYwAAGMIABDGAAAxjAAAYwgIFMDRAhAZYpMPZWlMbeCrYj2xEDGMAABjCAAQxgAAMYwAAGMICBNAaIkERIIiQGMIABDGAAAxjAAAYwgAEMYAADGMAABjI1QIQEWKbA0hRy1mUPCwYwgAEMYAADGMAABjCAAQxgAAMYKA0DREgiJBESAxjAAAYwgAEMYAADGMAABjCAAQxgAAOZGiBCAixTYOytKI29FWxHtiMGMIABDGAAAxjAAAYwgAEMYAADaQwQIYmQREgMYAADGMAABjCAAQxgAAMYwAAGMIABDGRqgAgJsEyBpSnkrMseFgxgAAMYwAAGMIABDGAAAxjAAAYwUBoGiJBESCIkBjCAAQxgAAMYwAAGMIABDGAAAxjAAAYyNUCEBFimwNhbURp7K9iObEcMYAADGMAABjCAAQxgAAMYwAAG0hggQhIhiZAYwAAGMIABDGAAAxjAAAYwgAEMYAADGMjUABESYJkCS1PIWZc9LBjAAAYwgAEMYAADGMAABjCAAQxgoDQMECGJkERIDGAAAxjAAAYwgAEMYAADGMAABjCAAQxkaoAICbBMgbG3ojT2VrAd2Y4YwAAGMIABDGAAAxjAAAYwgAEMpDFAhCRCEiExgAEMYAADGMAABjCAAQxgAAMYwAAGMJCpASIkwDIFlqaQsy57WDCAAQxgAAMYwAAGMIABDGAAAxjAQGkYIEISIYmQGMAABjCAAQxgAAMYwAAGMIABDGAAAxjI1AAREmCZAmNvRWnsrWA7sh0xgAEMYAADGMAABjCAAQxgAAMYSGOACEmEJEJiAAMYwAAGMIABDGAAAxjAAAYwgAEMYCBTA0RIgGUKLE0hZ132sGAAAxjAAAYwgAEMYAADGMAABjCAgdIwQIQkQhIhMYABDGAAAxjAAAYwgAEMYAADGMAABjCQqQEiJMAyBcbeitLYW8F2ZDtiAAMYwAAGMIABDGAAAxjAAAYwkMYAEZIISYTEAAYwgAEMYAADGMAABjCAAQxgAAMYwECmBoiQAMsUWJpCzrrsYcEABjCAAQxgAAMYwAAGMIABDGAAA6VhgAhJhCRCYgADGMAABjCAAQxgAAMYwAAGMIABDGAgUwNESIBlCoy9FaWxt4LtyHbEAAYwgAEMYAADGMAABjCAAQxgII0BIiQRkgiJAQxgAAMYwAAGMIABDGAAAxjAAAYwgIFMDRAhAZYpsDSFnHXZw4IBDGAAAxjAAAYwgAEMYAADGMAABkrDABGSCEmExAAGMIABDGAAAxjAAAYwgAEMYAADGMBApgaIkADLFBh7K0pjbwXbke2IAQxgAAMYwAAGMIABDGAAAxjAQBoDREgiJBESAxjAAAYwgAEMYAADGMAABjCAAQxgAAOZGiBCAixTYGkKOeuyhwUDGMAABjCAAQxgAAMYwAAGMIABDJSGASIkEZIIiQEMYAADGMAABjCAAQxgAAMYwAAGMICBTA0QIQGWKTD2VpTG3gq2I9sRAxjAAAYwgAEMYAADGMAABjCAgTQGiJBESCIkBjCAAQxgAAMYwAAGMIABDGAAAxjAAAYyNUCEBFimwNIUctZlDwsGMIABDGAAAxjAAAYwgAEMYAADGCgNA0RIIiQREgMYwAAGMIABDGAAAxjAAAYwgAEMYAADmRogQgIsU2DsrSiNvRVsR7YjBjCAAQxgAAMYwAAGMIABDGAAA2kMECGJkERIDGAAAxjAAAYwgAEMYAADGMAABjCAAQxkaoAICbBMgaUp5KzLHhYMYAADGMAABjCAAQxgAAMYwAAGMFAaBoiQREgiJAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMjVAhARYpsDYW1EaeyvYjmxHDGAAAxjAAAYwgAEMYAADGMAABtIYIEISIYmQGMAABjCAAQxgAAMYwAAGMIABDGAAAxjI1AAREmCZAktTyFmXPSwYwAAGMIABDGAAAxjAAAYwgAEMYKA0DBAhiZBESAxgAAMYwAAGMIABDGAAAxjAAAYwgAEMZGqACAmwTIGxt6I09lawHdmOGMAABjCAAQxgAAMYwAAGMIABDKQxQIQkQhIhMYABDGAAAxjAAAYwgAEMYAADGMAABjCQqQEiJMAyBZamkLMue1gwgAEMYAADGMAABjCAAQxgAAMYwEBpGCBCEiGJkBjAAAYwgAEMYAADGMAABjCAAQxgAAMYyNQAERJgmQJjb0Vp7K1gO7IdMYABDGAAAxjAAAYwgAEMYAADGEhjgAhJhCRCYgADGMAABjCAAQxgAAMYwAAGMIABDGAgUwNESIBlCixNIWdd9rBgAAMYwAAGMIABDGAAAxjAAAYwgIHSMECEJEISITGAAQxgAAMYwAAGMIABDGAAAxjAAAYwkKkBIiTAMgXG3orS2FvBdmQ7YgADGMAABjCAAQxgAAMYwAAGMJDGABGSCEmExAAGMIABDGAAAxjAAAYwgAEMYAADGMBApgaIkADLFFiaQs667GHBAAYwgAEMYAADGMAABjCAAQxgAAOlYYAISYQkQmIAAxjAAAYwgAEMYAADGMAABjCAAQxgIFMDREiAZQqMvRWlsbeC7ch2xAAGMIABDGAAAxjAAAYwgAEMYCCNASIkEZIIiQEMYAADGMAABjCAAQxgAAMYwAAGMICBTA0QIQGWKbA0hZx12cOCAQxgAAMYwAAGMIABDGAAAxjAAAZKwwARkghJhMQABjCAAQxgAAMYwAAGMIABDGAAAxjAQKYGiJAAyxQYeytKY28F25HtiAEMYAADGMAABjCAAQxgAAMYwEAaA0RIIiQREgMYwAAGMIABDGAAAxjAAAYwgAEMYAADmRogQgIsU2BpCjnrsocFAxjAAAYwgAEMYAADGMAABjCAAQyUhgEiJBGSCIkBDGAAAxjAAAYwgAEMYAADGMAABjCAgUwNECEBlikw9laUxt4KtiPbEQMYwAAGMIABDGAAAxjAAAYwgIE0BoiQREgiJAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMjVAhARYpsDSFHLWZQ8LBjCAAQxgAAMYwAAGMIABDGAAAxgoDQNESCIkERIDGMAABjCAAQxgAAMYwAAGMIABDGAAA5kaIEICLFNg7K0ojb0VbEe2IwYwgAEMYAADGMAABjCAAQxgAANpDBAhiZBESAxgAAMYwAAGMIABDGAAAxjAAAYwgAEMZGqACAmwTIGlKeSsyx4WDGAAAxjAAAYwgAEMYAADGMAABjBQGgaIkERIIiQGMIABDGAAAxjAAAYwgAEMYAADGMAABjI1QIQEWKbA2FtRGnsr2I5sRwxgAAMYwAAGMIABDGAAAxjAAAbSGCBCEiGJkBjAAAYwgAEMYAADGMAABjCAAQxgAAMYyNQAERJgmQJLU8hZlz0sGMAABjCAAQxgAAMYwAAGMIABDGCgNAwQIYmQREgMYAADGMAABjCAAQxgAAMYwAAGMIABDGRqgAgJsEyBsbeiNPZWsB3ZjhjAAAYwgAEMYAADGMAABjCAAQykMUCEJEISITGAAQxgAAMYwAAGMIABDGAAAxjAAAYwkKkBIiTAMgWWppCzLntYMIABDGAAAxjAAAYwgAEMYAADGMBAaRggQhIhiZAYwAAGMIABDGAAAxjAAAYwgAEMYAADGMjUABESYJkCY29FaeytYDuyHTGAAQxgAAMYwAAGMIABDGAAAxhIY4AISYQkQmIAAxjAAAYwgAEMYAADGMAABjCAAQxgIFMDREiAZQosTSFnXfawYAADGMAABjCAAQxgAAMYwAAGMICB0jBAhCRCEiExgAEMYAADGMAABjCAAQxgAAMYwAAGMJCpASIkwDIFxt6K0thbwXZkO2IAAxjAAAYwgAEMYAADGMAABjCQxgARkghJhMQABjCAAQxgAAMYwAAGMIABDGAAAxjAQKYGiJAAyxRYmkLOuuxhwQAGMIABDGAAAxjAAAYwgAEMYAADpWGACEmEJEJiAAMYwAAGMIABDGAAAxjAAAYwgAEMYCBTA0RIgGUKjL0VpbG3gu3IdsQABjCAAQxgAAMYwAAGMIABDGAgjQEiJBGSCIkBDGAAAxjAAAYwgAEMYAADGMAABjCAgUwNECEBlimwNIWcddnDggEMYAADGMAABjCAAQxgAAMYwAAGSsMAEZIISYTEAAYwgAEMYAADGMAABjCAAQxgAAMYwECmBoiQAMsUGHsrSmNvBduR7YgBDGAAAxjAAAYwgAEMYAADGMBAGgNESCIkERIDGMAABjCAAQxgAAMYwAAGMIABDGAAA5kaIEICLFNgaQo567KHBQMYwAAGMIABDGAAAxjAAAYwgAEMlIYBIiQRkgiJAQxgAAMYwAAGMIABDGAAAxjAAAYwgIFMDRAhAZYpMPZWlMbeCrYj2xEDGMAABjCAAQxgAAMYwAAGMICBNAaIkERIIiQGMIABDGAAAxjAAAYwgAEMYAADGMAABjI1QIQEWKbA0hRy1mUPCwYwgAEMYAADGMAABjCAAQxgAAMYKA0DREgiJBESAxjAAAYwgAEMYAADGMAABjCAAQxgAAOZGiBCAixTYOytKI29FWxHtiMGMIABDGAAAxjAAAYwgAEMYAADaQwQIYmQREgMYAADGMAABjCAAQxgAAMYwAAGMIABDGRqgAgJsEyBpSnkrMseFgxgAAMYwAAGMIABDGAAAxjAAAYwUBoGiJBESCIkBjCAAQxgAAMYwAAGMIABDGAAAxjAAAYyNUCEBFimwNhbURp7K9iObEcMYAADGMAABjCAAQxgAAMYwAAG0hggQhIhiZAYwAAGMIABDGAAAxjAAAYwgAEMYAADGMjUABESYJkCS1PIWZc9LBjAAAYwgAEMYAADGMAABjCAAQxgoDQMECGJkERIDGAAAxjAAAYwgAEMYAADGMAABjCAAQxkaoAICbBMgbG3ojT2VrAd2Y4YwAAGMIABDGAAAxjAAAYwgAEMpDFAhCRCEiExgAEMYAADGMAABjCAAQxgAAMYwAAGMJCpASIkwDIFlqaQsy57WDCAAQxgAAMYwAAGMIABDGAAAxjAQGkYIEISIYmQGMAABjCAAQxgAAMYwAAGMIABDGAAAxjI1AAREmCZAmNvRWnsrWA7sh0xgAEMYAADGMAABjCAAQxgAAMYSGOACEmEJEJiAAMYwAAGMIABDGAAAxjAAAYwgAEMYCBTA0RIgGUKLE0hZ132sGAAAxjAAAYwgAEMYAADGMAABjCAgdIwQIQkQhIhMYABDGAAAxjAAAYwgAEMYAADGMAABjCQqQEiJMAyBcbeitLYW8F2ZDtiAAMYwAAGMIABDGAAAxjAAAYwkMYAEZIISYTEAAYwgAEMYAADGMAABjCAAQxgAAMYwECmBoiQAMsUWJpCzrrsYcEABjCAAQxgAAMYwAAGMIABDGAAA6VhgAhJhCRCYgADGMAABjCAAQxgAAMYwAAGMIABDGAgUwNESIBlCoy9FaWxt4LtyHbEAAYwgAEMYAADGMAABjCAAQxgII0BIiQRkgiJAQxgAAMYwAAGMIABDGAAAxjAAAYwgIFMDRAhAZYpsDSFnHXZw4IBDGAAAxjAAAYwgAEMYAADGMAABkrDABGSCEmExAAGMIABDGAAAxjAAAYwgAEMYAADGMBApgaIkADLFBh7K0pjbwXbke2IAQxgAAMYwAAGMIABDGAAAxjAQBoDREgiJBESAxjAAAYwgAEMYAADGMAABjCAAQxgAAOZGiBCAixTYGkKOeuyhwUDGMAABjCAAQxgAAMYwAAGMIABDJSGASIkEZIIiQEMYAADGMAABjCAAQxgAAMYwAAGMICBTA0QIQGWKTD2VpTG3gq2I9sRAxjAAAYwgAEMYAADGMAABjCAgTQGiJBESCIkBjCAAQxgAAMYwAAGMIABDGAAAxjAAAYyNUCEBFimwNIUctZlDwsGMIABDGAAAxjAAAYwgAEMYAADGCgNA0RIIiQREgMYwAAGMIABDGAAAxjAAAYwgAEMYAADmRogQgIsU2DsrSiNvRVsR7YjBjCAAQxgAAMYwAAGMIABDGAAA2kMECGJkERIDGAAAxjAAAYwgAEMYAADGMAABjCAAQxkaoAICbBMgaUp5KzLHhYMYAADGMAABjCAAQxgAAMYwAAGMFAaBoiQREgiJAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMjVAhARYpsDYW1EaeyvYjmxHDGAAAxjAAAYwgAEMYAADGMAABtIYIEISIYmQGMAABjCAAQxgAAMYwAAGMIABDGAAAxjI1AAREmCZAktTyFmXPSwYwAAGMIABDGAAAxjAAAYwgAEMYKA0DBAhiZBESAxgAAMYwAAGMIABDGAAAxjAAAYwgAEMZGqACAmwTIGxt6I09lawHdmOGMAABjCAAQxgAAMYwAAGMIABDKQxQIQkQhIhMYABDGAAAxjAAAYwgAEMYAADGMAABjCQqQEiJMAyBZamkLMue1gwgAEMYAADGMAABjCAAQxgAAMYwEBpGCBCEiGJkBjAAAYwgAEMYAADGMAABjCAAQxgAAMYyNQAERJgmQJjb0Vp7K1gO7IdMYABDGAAAxjAAAYwgAEMYAADGEhjgAhJhCRCYgADGMAABjCAAQxgAAMYwAAGMIABDGAgUwNESIBlCixNIWdd9rBgAAMYwAAGMIABDGAAAxjAAAYwgIHSMECEJEISITGAAQxgAAMYwAAGMIABDGAAAxjAAAYwkKkBIiTAMgXG3orS2FvBdmQ7YgADGMAABjCAAQxgAAMYwAAGMJDGABGSCEmExAAGMIABDGAAAxjAAAYwgAEMYAADGMBApgaIkADLFFiaQs667GHBAAYwgAEMYAADGMAABjCAAQxgAAOlYYAISYQkQmIAAxjAAAYwgAEMYAADGMAABjCAAQxgIFMDREiAZQqMvRWlsbeC7ch2xAAGMIABDGAAAxjAAAYwgAEMYCCNASIkEZIIiQEMYAADGMAABjCAAQxgAAMYwAAGMICBTA0QIQGWKbA0hZx12cOCAQxgAAMYwAAGMIABDGAAAxjAAAZKwwARkghJhMQABjCAAQxgAAMYwAAGMIABDGAAAxjAQKYGiJAAyxQYeytKY28F25HtiAEMYAADGMAABjCAAQxgAAMYwEAaA0RIIiQREgMYwAAGMIABDGAAAxjAAAYwgAEMYAADmRogQgIsU2BpCjnrsocFAxjAAAYwgAEMYAADGMAABjCAAQyUhgEiJBGSCIkBDGAAAxjAAAYwgAEMYAADGMAABjCAgUwNECEBlikw9laUxt4KtiPbEQMYwAAGMIABDGAAAxjAAAYwgIE0BoiQREgiJAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMjVAhARYpsDSFHLWZQ8LBjCAAQxgAAMYwAAGMIABDGAAAxgoDQNESCIkERIDGMAABjCAAQxgAAMYwAAGMIABDGAAA5kaIEICLFNg7K0ojb0VbEe2IwYwgAEMYAADGMAABjCAAQxgAANpDBAhiZBESAxgAAMYwAAGMIABDGAAAxjAAAYwgAEMZGqACAmwTIGlKeSsyx4WDGAAAxjAAAYwgAEMYAADGMAABjBQGgaIkERIIiQGMIABDGAAAxjAAAYwgAEMYAADGMAABjI1QIQEWKbA2FtRGnsr2I5sRwxgAAMYwAAGMIABDGAAAxjAAAbSGCBCEiGJkBjAAAYwgAEMYAADGMAABjCAAQxgAAMYyNQAERJgmQJLU8hZlz0sGMAABjCAAQxgAAMYwAAGMIABDGCgNAwQIYmQREgMYAADGMAABjCAAQxgAAMYwAAGMIABDGRqgAgJsEyBsbeiNPZWsB3ZjhjAAAYwgAEMYAADGMAABjCAAQykMUCEJEISITGAAQxgAAMYwAAGMIABDGAAAxjAAAYwkKkBIiTAMgWWppCzLntYMIABDGAAAxjAAAYwgAEMYAADGMBAaRggQhIhiZAYwAAGMIABDGAAAxjAAAYwgAEMYAADGMjUABESYJkCY29FaeytYDuyHTGAAQxgAAMYwAAGMIABDGAAAxhIY4AISYQkQmIAAxjAAAYwgAEMYAADGMAABjCAAQxgIFMDREiAZQosTSFnXfawYAADGMAABjCAAQxgAAMYwAAGMICB0jBAhCRCEiExgAEMYAADGMAABjCAAQxgAAMYwAAGMJCpASIkwDIFxt6K0thbwXZkO2IAAxjAAAYwgAEMYAADGMAABjCQxgARkghJhMQABjCAAQxgAAMYwAAGMIABDGAAAxjAQKYGiJAAyxRYmkLOuuxhwQAGMIABDGAAAxjAAAYwgAEMYAADpWGACEmEJEJiAAMYwAAGMIABDGAAAxjAAAYwgAEMYCBTA0RIgGUKjL0VpbG3gu3IdsQABjCAAQxgAAMYwAAGMIABDGAgjQEiJBGSCIkBDGAAAxjAAAYwgAEMYAADGMAABjCAgUwNECEBlimwNIWcddnDggEMYAADGMAABjCAAQxgAAMYwAAGSsMAEZIISYTEAAYwgAEMYAADGMAABjCAAQxgAAMYwECmBoiQAMsUGHsrSmNvBduR7YgBDGAAAxjAAAYwgAEMYAADGMBAGgNESCIkERIDGMAABjCAAQxgAAMYwAAGMIABDGAAA5kaIEICLFNgaQo567KHBQMYwAAGMIABDGAAAxjAAAYwgAEMlIYBIiQRkgiJAQxgAAMYwAAGMIABDGAAAxjAAAYwgIFMDRAhAZYpMPZWlMbeCrYj2xEDGMAABjCAAQxgAAMYwAAGMICBNAaIkERIIiQGMIABDGAAAxjAAAYwgAEMYAADGMAABjI1QIQEWKbA0hRy1mUPCwYwgAEMYAADGMAABjCAAQxgAAMYKA0DREgiJBESAxjAAAYwgAEMYAADGMAABjCAAQxgAAOZGiBCAixTYOytKI29FWxHtiMGMIABDGAAAxjAAAYwgAEMYAADaQwQIYmQREgMYOCfamC13n8f+ststZY+il7PatOD8XMKbsfP0wdtrUOfK3zcl8koXKfw43qmP7fo64ev0/01Ra+54PFur7vL59HXKfq83Of9wAAGMIABDGAAAxjAAAYwsE4ZIEICfp0CTwQhBH0SBlbrzxUf0deKQp3uRBEwHwBD8ev2f6sU81av9nDoT3/flr273N5evNTe0Vi8ZKktWbrMFmu8tegdm//mQpv3xlv2uo/5C3oYb9m8+Rr6eE8jWs/XjT7H3HkLwtdauXKV+Vi1yoe/nlV6LR5Ao9fV7UWv5YE1vd/R+xN9yuStWdNzeTyxxBILGMAABjCAAQxgAAMYwMCn1wARUv/6BTDvAQYw8GENrA6R0MNcNHw9pbS1ZLjoQ/68JcuWKyC+a/PeXGQz5rxhU597xR57+kV75KkX7MEnnrOJt9xt51wy2X53xc12+fg77cKrbrUfnXKxfePw0+2gI063b/3gdDvkqN/ad48+w/b85on2xd2PtK13O8JGjTnMRu50qI3c8VAbteP3wtJvjx5zuG015vthbL3z923rnY+wrXfxZTRG62Oj9JyRWvpzO7Y7xL5xxBl26pnj7LQzr7bfnHudnTF2vJ19wQQ77+KJduHlel3X/dGumXCnjb/pbrv770/bA489Z/c8NM3uvOcJm/r8DJutkDn79QU2Y/YbCprLPvB9SZ6QvP+F72sUJ7GZvDcssYABDGAAAxjAAAYwgAEMfJoNECGJkERYDGBgDQY6g5hmAX7Af++9954t1QzFWbPnKSy+ZI9OnW53/O1Ru2by3+wKRbtfn3eD/eAnF9thx4+1PQ861b6y3wlWs/VBtnn7AVbVup+VNe5ln+23vf17xZft/1VuY//Zdzv7j8qv2H/q/n9UbGP/UfalePxveOwzm3/F1tfz1++/YxgbDNjR8mPgGNtAY/2BO9v6A3zofjLij/nHN4zHBuF5O4Xn/dfmO9i/99lG40v27/qa/6/8y2Hpt6PXtq39h17bZ/qPsd65fa2saR/bpH5P26huT2vd7gjb5cCf2ZhvnGTb7HOcfe8nF9oZF0y034ydYGdcONFuuuPv9uCjz9kjTzxvz774mr39zhJ77933wiHoa3t7P81/yfLa+SURAxjAAAYwgAEMYAADGMBAZIAIuYb4ABD+kMDAumMgiY3Jck1B7F0Fsxdfnm1/vn+q3XjHA3bauePth6dcat/60Zn25d2Ps//d/Rhr/vy3rW/b12zzoV+3TWr3ts8O2t0+M2BX+0y/ne0zW44Jy/UU8DwKblS9i20yZDfbtGY326xmd+utmFfWuLeV5/ay8gbd1rLC72uU5fzx+GP+8TD2jJfJ/eg5/jnC54nX9fW7j330WOHYN9yv0NeoaNrXKjWSpT+volH3fZnz21pPz+ul19urfi/r1bC3guQ+tnHNHrbB4N1s/cG72obVu9r6g3a1z/bf2dYbuJPeg51s07o9tP5eVtW4h1WPPND+Z7ej7Ct7/sj2Ovg0O+rkS+zHp11p4yb/xSbc+oA99eyrNl+HkS9ZsubZlPrjOz8j1Q9hL/yZ9cmphfe5Xfz+8H7wfmAAAxjAAAYwgAEMYAADn7QBIiQRkn+oY2DdMdDtUOoeZjjq3IfzdEjxk9Nessm33We/On+SHfOLS22Xr5+kaHa0NWv2Yr+m/ayvQtznBu2i2YM+g9DHzgqLO9tGCm8bKSxuXL2HbVa7ZwiLfRTeyjzcNSkWNikI+tDMx2goJDZGMbEs5+HRxx7FSwXJPvEoa9DHehxaz8Nl0XM7Hwuf1z+e/xp6Tf661jgK1o0/r3/ucq2fHx43w/fj35viZLNGi2KlZnb6qNT9ypb9rErDP+Zh1EPkZhqbDtH7NHhnvU9aVuv90vu28ZA9rErxs0rvb+7z37GOLx1qX97tOPv2kefYT08fZ5Nuvcf+pgA8W7NNly1+x95fubxbL/aQ7OexfL9LlPyk/3Ll6/ELHQYwgAEMYAADGMAABjCAgWIDREgC1LoToNjW6+a2DjGqMzb6XwI+a27FipW2dNl7OnfhfLv3wWn2u6v+YAf+8Fzb8+BTNJvxINtCca23YuKG/XayDRUZ19Mhyxtqht8mmrG4aa0Hxj1CYOxd71EwioghzuVve+BLQt4eYWZjFO+SWYsFMU8h0D+WBMHkeVEwLAiFDbodRvJ5P2iZPL/gc6wxOnY+J5pl6ev65y/4HLqdfKxoGYKqZlAqMlYoRoYg6VEyP/bWzMq9rSpESUVGhUq/HYYCZWVzNOuyXLMt++hr9NHn6a0Zlh4sN9IsUT90/HODd7Fe2h7ldXvZ4NHftvavHG7b7v9zO/GMcXbNDXfZY08+b7PmzLd3dVj8ihUrgvWkUPIXf/Ff/LwfvB8YwAAGMIABDGAAAxjAwD/DABGSMLVuhim2ewlu9+gq1OEqzkl90tJnxS3WIb3z5i+056a/Zrf86SG74Ipb7ciTLrTtD/iJDRz2DdtsyO72uYE6t2K/7WwjLXvV7mZ9FAV99mFvHXbsI8xEVHDsE48yj49hKNRpWe6HUmv40g+l7hwKd/H9CgU2PxzZR1HE+zD3PQB2GVEk/KAQ2dPHk7DoH0tuR8vwNfz1dPla+fvdXqtmQ/oh3B4g/XDtrkMhsvIjjArFyjD0+cp8lqUHTg+0mi1a4aPJt4sOYR+yk21SvaNt1H9721DnxfTtMmT0Qbbfd39hPzntMpty27029ZmXbc7rb4ZzT/pfsIX/+d3wly4zJkvwzwJ+ofxn/ELJ18QdBjCAAQxgAAMYwMAHGSBCEqP4BygGPoUGkitTa4Zjt7j0vi16e4m9MnOu3f/wVDv/sil2yDHn2Ff2OtoGDN9fF2vR+Qk314VV+m5rG/TfIQRHD4JVmo0XYpmf+1BRLZyT0WcChrgYBcfyEBs9OCajp+gYBcgKrRuGAlpFfnRGyCRGdl32HCej0Jf/WEEg/EdDZD4qFnyutT4W4mPyOnwZhdRwDskQIIsj5NrCY5WiZH4mZBwo/bHo/Y9mTVYoPoahrxO9f4VLv63PoeDZV6Gyb/NeOjxeM1Nrd7H1ttze/qtqW13kZwfNsNzLttrpcDv4B7+xy8bdZvc9ONVenjHH3lmytLBHhtv+l6Ufyv1Bf2nycX6xwgAGMIABDGAAAxjAAAYw8I8ZIEISoPhHNwY+HQbi8zlGMx2LZ7UtemepPfPCTLvznsfszIsm2rePPsu+vOdR1r9t33DF6f9ScPys4tQmuhCMx0WPV37uwXDxFcWs6IIvydJnAXqETGYIriVE6tyM0SzHZFk4A7KnCOlB0gPamoZCngfQOPCtcRmHwzUGyHhWZhRQk9evpUfVLiN6/WuZ+ZhEyqLXVBgjPT4mI5oJWan3Nz+SuFiwzAfHgsc6o6UiZP7z6X2KY2RyDk2/7++Lv4edF+qJ3jN/76r0cQ+TVT6TtVYXyFFo/u++24QriW/Rspd9cdfv26HHnmVjL7/J7n7gKXtpxlwdwr2iKEomv1AQJf+xXyyS948l7x8GMIABDGAAAxjAAAYwUGiACEmA+nQEKLbTOridotmOq1at6jbb8a1Fi+2Oux+3My6aZAceeaZtvetRVj38azpMd3fbYNBO0ZWnddGY3jqnYBK3/ErPyVWdo3gVBb8wk88PJy4aSZQrjIrJ7MeelmufEemHExeHx65fr/h+8vq6L6MAF+JkiKRdomLBrM3Ow8WTw8bjZbioTfF6yazPbkGyKDwm0a84QPpr7Hoodj5AFsZIzTCt9BHH32S7JEEyWUbrRiGyM0b61+g53OZDbYilhdsrec/1uTxaKr72qt09HG6//hbb2vpbbqdtsqfVb32gbb//CXbCLy/XlbnvsucUs1etXFkUJZOrpr/PTMl18M8hfmks/KWR23jAAAYwgAEMYAADGEhjgAhJ3OIflRj4FzLg4XGVrmxcHB6XLl1mDz/5op1x6S32zR+dZyN3Osq2bNnfNtGFStbXxWI21BWW/bZHxxCrNMPOL4rioSuJiyGWFYXG4vAXPc9Dlz/u0aqnEBnHRj/vY09DoSsKeZ3LwvNARiGyp69b/Nha46NeW7iATY8RMgqNyXkruy6LwmT+CtudQbLztRfEzqIQ2T1AlmvWoo9u54IsCpDJzMg4RIYYGW2f6GrYyceT5YePkEncDa9dUTG6qI+//z47tXBEUbJSMdOHP7+3LnqzyeAxtuGg6MI3ZToXaN0oRcn9TrCTT786XLBo4cJ3ukRwDttO80sH6/JLKwYwgAEMYAADGMAABtZdA0RIAtS/UIBad38Q+UPYr17tI1wtxJYvX2Hz3lhoN//pYTv6Z5fZqDE/1OG1+9hGukq1XyV5E11Ixq+eHC6q4pHMZ8l5WFJAjKJYdD8ESf+YR8UPFSCT52q5pgjpobGnAOmPfagImXyN4vCYj5/+PRSFv56DYPFh1cWzHTvj4+66YEvhKH5eiJIh1PXw2tf4GrqEyPyh091DZM8zIuPQWHAodjg8Ph8tOwNkt5mQ+W2ZvIfRMoTHHt77aHsUhki/vXt+VGodD5LuxMOuv2+96zRbUsY2GjDGKmWsY5tD7ZCjzrIrr/ujPff8K7ZEFzla7bNz3apGfpYkf5fwdwkGMIABDGAAAxjAAAYwgIG1GiBCAmStQIhjhNFsDPgFZTw6dv63ZNm74fx8N9z6gH3/pIut5X+/p0Nnd7b1Nt/eNlZ0LG/azyqa99Oy4LBqP3djiHZdlx6neop8a3usOGx1RkifNZeMONaFCKmglb9Ajd+O42Qcw/IXptH9ZLbeR132GCPDa4leRxQii8NiFCALw2Px7TJFyaIZkf499BQiw6zCngNo/r0tCpAeIbsPD4mdI5npuLZl4fOj29Hn7bJ9QliOX1/Be9JTCO4eIz1EatZsMgq+V/9aySHj5Qqlm9TsYRsqfm+wxQ4K3PvaV/Y5wc67eLLdr4vczJ23wFau9CCZ/MefF9n8ecH7yvuKAQxgAAMYwAAGMICBUjBAhCRCEiEx8MkYiM+nl+QaXy5ctMSemPaSXXvjX+2wH//O6r7wLVuv/xj77BZ+EZldrbJlP6ts3V+HVn9VASi+cEyDL5OLyHTGx3wYC/Hxo0RIPVcRKx8I/XY8ovjYdZZgEh8VskKE9GVyOwl6BYHLI2QIkR4jk1Hw9eKYlv/6Rfej53ceYlz4WhQfFdE6g6LHxeLg2KduNyscUYCMnld4u/iw5fh7yL/W5DUXLgtefzyTMD/rtMv95PDnzmX3yNgZKZOPRYdMR4/ra/nn7Pa++GOF78fabndul8Ig6RHS7/v2KQ6+kavkEPNKxW8/vN/fyw376erbFV+xTXV+yW32PNZ+c/54+/M9j9urM+eFn6O8b/9zxc2v5pelUvhlie8BxxjAAAYwgAEMYAADGEhvgAhJgPpkAhTv87r7PneJj6t0vsfHn37Jrpx4p33ryLMs9z8KjwN2tv+u2sE20sVkPDBW6nyPFT7zMbdvuF+hx6LhMxkLb3/ECKmZkxU+PFTml4pZBeGx++04Unmo8lE0+1ERKx8ik9sKkHosmmUXrfvRI2TBeuHrFka0zq8TBcg4Kuow4rJ49NHSg1lZ4dD5Dovu+8fCrMg4oIYgF32d/GvvFiK7xkDd7xIdu97Px0dFxOh2EhrXtkye27nsjJB6b5LXpfemaMZpfD8KjWuOkj2t0/n54wAZz6T1OOkf82WlHqvyK29rtmRvvX/r99OVt7fYTody723b7n28/eq86+22ux62mbPm51uk3/BfVrjSdvpfWPilj/cQAxjAAAYwgAEMYAADn24DREji2Lobx9j22W17hUePLoX/3f/oi/aL88bbjvufaFtoZtl6A8fYZ/rpgiA61LqPz25UdCxv3E9BJ5npGC/DzMfO2Fg8Y63wcGF/TuF9v925XvFMyYIQuYYA2XkItj6PnlMUtopCZDITsniZP9Q3hDFdpVtLHx7QKj2ixbdDUAvP6QxqnV8riY8KjDqXYRINk2UfXYin26jVY5qlFw3NhFR8jMauWvqI74dAGYfL5PvR68h/bb3GaAamXkO4Hb23UayLvo8oBhaEyW4zFpOPxd9z8r3Hy3DV6hD3PPBFwbFrxMzf18c7Q6Hfjl9D/N7lX3fh91B02+NtwfdX9DF/PNnO0feZt5R/PFo3OgQ+ek5lk16zoqQfAu/nkVxP55HcRO997gvfsd2//Us7+7Jb7bkXXyv8MYhiJLMjs/uzhz/XeW8xgAEMYAADGMAABjDwL2uACAnOf1mc7OH4lO3hUFiJwqNfsCP6b868t+zy6++wHf/vp7Zl69fiUKMLy1TvZr100Y8+Co59NNvRI6Tf9gDps8ryIXKN53zsjIuFobE8/3yPRMlz4qjkMckjZT4qRbcLZz52/dgaw1YS7cJh2IqPCnrl9T7WFiILw6Miml5HFNX0Ov11Fw5/7brf+dp8XT1fEa1wlNcpjHUdtXpMITIaej01GgpjZboSdLkCpN8OQ7MlK/xq4vpewufU568MrykOtHoNIdzG53kMh8Mnh8TH7220rXx7Je9112XyHsffezgHY8HtJCQWLeP3JQmayTJESK1b9FwPg0mo7bqMomH3jyePd112t9GTl3yQ1usIH9fr8/fGr8Tu55Lso/fQL5z0OV21vZe2w5Bh37Bv/OBMu/mP9+v0A4uSH42w5M+4T9mfcfy+wO8LGMAABjCAAQxgAAMYSGWACAmgVID4RzT/iHYDyUVmVq9abW+/s9TufXiaHXnyRTZoxMG6uMwutqFf0VpxrLfCWh8FK49WvT085oce08dCzCqMccntNUaurtErua8w5MHxQ4+uQcoDUzzCjDkPVAXP6TFCFgZIn3XnUczXSV5HdNtjYgiMdTocuV6HlmtZUafH9P5U1EbLMoXDPjonZh8dnl4Wxs7We9DO1kuHrfeOh9/upQv3bOZDz9lUH98sP8bo/hh9TMuBO4WxiS6usumAHW2zATvYpv23D8teuh+GnttL6/bWduqteNZ7sA7V1tcvUyz2eNnbr0au19Q7hExFS73eijh++iHh5QrKFT5jNR5lvswHZd+2/j371cz3zI8kDuYPje4SF8MMSA+PHiFDiOwMkPlt49tojRGya5RM7hdsx8JtGr/GzhAtS90e8+8jXj+OkCEkJ68xDraVzftalUZlsxvf0zbQDEnfNnWf/5Yd9dOL7KFHnrHFS5b6cdpxlOTPEf4uwQAGMIABDGAAAxjAAAZK3wARkghJhMTAP2ag4HDrd99bYS+9OtcuuvIW23bf4xWrFF623N56e6Dyw6x9xqNiTOfQLEgPkvEIAVK31xghi2KkQlC3KOmPFQyPR4X3P47b+SClCKUZiWXhathx2PLv06OcP+4zEf12mJGow5D1XnhULPMrfA/ZVY9r+AzE8HFFPs1MrBx6gFUM/Zr1UcTq0/5123ybI6zfDkfb5tseYVVf/p5tsd1RVnvgby33g0us7odXWM1RV1n10VfZoGOutoHHjrNBJ1xnA39yvQ36yXiNCdHyx9fb4B9fZ4OPv9YGHzfOqo+9xoZoDD76Chtw5KU28IhLbPDhF2tcaIMOPd8Gfvc8G6Qx+Nvn2uCDz7QB+//cttz5R9ZvzNHWf5djbeCux1v/7Y+0vlt90/q0aFs26Xts3z+MPrk9tM0VLxUp/TBwD5b+fZX54d96rCyemenLMPT+lClc+nsYAmV+++hzxvE3Hx/zgU8xUs8rnAmZPPejh8iegqTM5Lfx2m7rNeZDZPya8q9RQdlDpA7RDjMjm3X+SI2+Lfto7GubaSbq+v22s00Ujbfd+zi7ftKf7YWXZ9t7y1fkZ0i+r6vG88tX6f/yxTZmG2MAAxjAAAYwgAEMrIsGiJAEKP7Bi4EPbWB1fC67pJgsXfaePfLkC3bi6VdZ4/8cYp/pu51tqNl3fm7HKl1cJsyGU9iJImPxsluA9AgZj6JDkwsDpN/2YLXGWFQQiJJQlCzzoatroPQZb/GIn1OmZTT862lWX+O+iksauehiOdHMRQU1zRos1wy3Mo1yzTQs16zDisH6/gftGIXIlq9Zhc5/ufkXv2Nb7niU9d3uBzZw7xOt4bCxiomXKCReajXHXm2tZ99hjeffZYN/fbsNOfcea7l2mrVPeN6ar3vWGsc9bc3jnrW2SS9bx80zbejNs2zoLbOt9ebZ1qzRotvNt2oZxhxrvdWHPq7H/XlDb9LzfR1fTnlNY6Y1a7T67Rv9/mvWOnmGtU561YZO1pj4sm6/bM3XP2eNVz9trdc+Y0N1u0Ovp3XcVGu48H69zttsyOm3W+sF99jQ8+5S3LzS+n3nHBuoMfh751v1986zLXY/ziq+eLD1/YpC6hcPsT7NCs8KdOV+pfMaRdhBO1mZZmKWuRfNli332ZceajXLsjKnGaL+fuvw5vIw/L5vC207Bb8kMHuUzAfBZDuHZRIZfekmCu93vV1oxj9f1+EfL3wseb4e09dPDqkP8dEDZMHw80Umw6+uXaWZkZsP9XOf7qVIv4P9V9X2Nmj0N+3Hv7jU7n1wqi1ZrNmR8X+f1C8kn/TX+6S+L74Ov9RjAAMYwAAGMIABDGDgX88AEZIA9aEDFD/A/3o/wJ/cNim+0Myc+Qts7GU32o4HnGB9NdNrg/472qaa8VahwFTZpCtb+1WtFfYqdLhxiHhJ5IuXhbHRZ8Ilozj2FIaf5HYSgNa0jAJT50Vh/HyHGiFEJZ/Dl3HQCrFR56HMHz7soVHfg4+GaFSgjgNgAABAAElEQVTU6nuo1vMHKToOUCgboGCmaObfY9+OA61qxLdsi91Otv5f+1UIcDUnaybij8db7el/tobfPajxd2tVzGubqKh4vcYNL1rLZEW+ydOtcfJL1jjpJctNfMka9HjDDS9bvUbdeN2+/gUNLSdMt3rdr79O96970XLXT4/GeC01Gifoc2g0ab388Ps+xidjur72dGuKR6M+b7itz9d0nR7XsvHaF+LxvJbPW+7a56xh3HNaPm8Nfv86LfUamvR6mie+Ys2TXrHWGz1cvmztU161thsVMnW/9aZX9b29ZM0eUa+ZZi3j9fmuedrqzr3P6s++zxrOu99qfnaTDTn6Shv4vQs16/I8BdrjrN8XDrEthn3T+mp2ZKVHXI+TirwV1Tp3pWaTuqVKReCqxq8q9HnIi66cHtnxGZWdIx8dw6HiMpEsPUYWnLczcZJ/fnDittxR4bJnb9HFhZIQ6RfWUXRcy+icJekzJBUl5a/XkJ1tPc0a9vNHbrPHMXaSgv6LL89K2qDOdKCZkT4+5r+rdCx4+BrvLl9tS99bZTqTQvjv4/46fL51+e8Nvnf8YwADGMAABjCAAQwUGyBCfsz/sANYMTDej0/5+6H4sWrVqhBAvFAseOttG3v5jfa/exylqzLvZp/z8xHqsOJKHXJdqQCZnymoQFeh2Wz5GYYhPhZHwHAYbj5AJrMgC5/T9XbPIagzIHlsjKOjQlNF0fCopM9Xr5gYhr82f406b1/j/lbVsL/19eio4FgxWIcRD9D5EPtrhuNARbA6fW9DD7KqrQ63LXc7xQYecpENOPZ6qz7zz1Z70YNWd/GjVqvZgg03vGC5yS9a3c2vWMPNr1q9wlz9ja9Yo0buBoVGhcRGjZyHRQ97Cnz1WtaPi0bdNc9brW7XKQbWX+vPKRgeHxULPUA2Xu9hUcExHs0TFARv8KH4p2VLMvR4iw89LxnNWrdZ933ZUjCa9bnDuFZBcpzC5DgFSb2Wxqs9IOq2XlvOh15TowdLDY+XHjab9f0kgdPjpo/c9VpPsdKjaE4zKxsnv2JNN860Js3IbLpJMzE1o7NFo3mKXt8UvaZrn7aWKx61xovus7pTJ1ntjy616u/qEPH9TrXNP/8d26L9ANtCF3/pW72L9dVM0wodzlyh2ZR+Ts0qBeRK9+YhWSNEST/MW9u/cHTGx86LCCVGynXl8UJHxbfX5M4f7wyQPiOyUjMcO8eag2QyW7JS31NVuKDNPtZLh7Ov328H23jwTjb0S9+yn595jb2xIL6Qjf6e8os+pf3zVJ9AP8VRfFy6fJU9OWuxPTFzsS1+d6W9+uYym7lg2cfyddK+Ttb/lP+9we9VqX9W+RngZwADGMAABjCAgVI1QITkl2V+WcZAdwP52VfR9KiFby+2Kyb8yUbvdLii4666+q8uVqJz+lXqUGMPkNGhylHU87DnATJESD93o8e/LiOZ+ZjMiOxcds6K7HxO4WM9BaHOmW7RlZ49RBZGSP+4ZtIphFZ6sKpXePRRp2g1RLFq4B7WZ6CCVbWe03SAVX3hMOu7y4nW96BzrN/x19mgs++2gZc/bgOvesqqJ7xgNYqKNTe+bLWKjbWKaPWa/Verw5frFRrDrEXNYMyN91mLWioo+kxCH026HcU9PeaBT6EvF4Y+rmVDfig+KgR68IuG4qPioI9Ghb/G6woi5AQFxThC5uOjR8gQIBUf9fEkQIZlHB6TCNl6vT7uj+lzNuvzN+trRhFSMdHj49U6JNvjY4iR0euMQqQCo57r4dJnUfqsyihMFtz2WZoKkk0+/LYCbJhFqdsteq+aFSeb9L416b1sUrBtunmGNdzk0VYfU5j0WaL1NzxvNVc+brWX/N1qzr7LBp4wzvp/51zbci9dbX0bbScd2lwlj1U+Y1KHc1fqcG4/12Z01W9Z0QxIv3BOmc7BWaargfsIVzIPVwbvNBIFSg/VPY2ezCWPrS1Cdp0ZWRgoo495jEzOb5rMkizTOTE3GjJGMXJna/3Sd8J5VpcsXZZ6luIq/UwveneFvbboXXtq1jt230sL7dm5CpDvrQw//0/NWGAvzlkURciPIXiW6i9NfF/8gwADGMAABjCAAQxgAAP/uAEiJAGqe4DiPVm33xMFCP/Po8Xr89+y8664xdq2/Z5tXK0r/Cr4RLO4dCisZnFV5Ef3ANl9JqQHyc5RPBPSQ2N0FeXi+Nh5iG3h4bZ+OwSj5DDbrktFJ784jF/BOQwPUwpUZX71Z82iCxdQ0TkrKz6vi77seaoN+M4FVn3iJMudf48ORZ5mDTpEutbjosYQHW4chg6Zrr5hutXoMOc6jQYd6tygoBYtNdNRQS4ZnbMFFd5C2HtB53VUtFNozM8yDDMMo1mGHvxyPkKU7LLU+o0hQvoMRI99Cn9+mLXioS+bPUQmsx8Llx4giyJkPPtR6ySzIKMIqed5hNTnDVFRr9MDaRIfc9fosGzFSJ8J2eDDP+avKZ4RmcyKDPf9kG7F1+gxfe9hxqSWPmPSv254Tb5Mhs4/qdmSrQqSLRrNeo+b9R43+czRCYqwfqi6DwXJnA5fb5qiWZUeKvVYg86TWTf2ARty0kQbfOiFNmDfUxUmj7AKXdinTDGxTIc5l1fvrCgps5plWB4CZBIjk2UcJet9dqRuJ6PHmZFJeCxYKhhG54SMYuTaDsXu/rHoPJf+MxROWeDB3m9r+HkkK3S/l05xsJEOSx++4xF2wy332rJ3l3+kGOmzHlfpPK4Ll66wR2e+bXdMe8PufPYNe3zmIlu0dLmCYzQzct5b79jzry2wd5ev1Of/x3+h4Jcx3jsMYAADGMAABjCAAQxgYG0GiJAEt3U7uLH989vfD/dMDtWc/foCu2Tc7da+3WG2vi42s4kOga3U1X394hrF8TEOkWHmY+cMyPxMyILoWBggo9vRDMni6JjMelxzfAwxMhxu6zMc45lrPtNRMzPD8KtOV+vcjbpYTO9BY6yXh0cdtlsx6tu2+ZgTbIAO8605dYo1XPqgwtfzOixYhwjrAi4NN71mdbpAS61CXq1mEtZNeFUzGzXGx0vdrtfj9TqcuUEjp6iWH2EmYBQIPdCF8BjiYxQePT6GodDoEbJJMc8jXzjkWUufGemjczakZkZq/QZFPT8PZIMCYbJMDslu1NcvPBdkdEh2cmh2vPRAmQw/DFvrJMNnRjZrJmR0eLZmI3rU1Aih0yOjXmeIjh4eFSEbFCPr/bYezyk0hpmefuh1HCP9sWjmpy/1vXmQDEOzQPUxH816rh++3eJDMyN9Ge777Mgw4sf9Y7rfGsLlS9aqaBmGAmWrAmWLli2aRdkSzkGpQ7t1iHejLqpTf+2zNnjsfdb/p1Nsi4POsqodjrGKEQfrIkO6Onu1DrGXhzD8tl+122dIyk4fj5YKkN2GYmQImv7xMEsyjt/JuSOLIuSaD7/uHiD9uYU/O7rtpy+IR/LzU6Xn9G3+qm02ZA9d8Gk3+9YPz7HHnnoxnCPSa2Tyl7tu+J0w/DH/OfblO8tW2tOzF9sfnpprNz0+1x6cvsDeeOddW60rcEfPWW3zdIqFp16aa0s1S9L/Sz4nS355xAAGMIABDGAAAxjAAAY+bgNESP1D7eN+U/l8vKefRgMeIFbr5+Gu+560L+9zrK23+Xa2ga5eXNnih1x7IElmaiVXANaMLZ+1lY8pHzZCru3w7CRC+tJDZLTso2U0PBhF0Sicj0+Rs6JOQUcXLikfpLCkc1T2VoDsowuYVG6lcwnudqINOfQiazztD9amw6nbb9LFU/44z5o1Gm6dpUOpZ1j9xBkhONbHwTE3YaZm4c1UaJyhyBeNnJYhSIbn6ByP12t4iFTE83M0+iHSPlvRhx/O7Ic1RzMffRkHyDg+Nvmh2B4eFfXCeRbjCOmBz88LWaePR+MFLf38kFGQ9PNEJiN/fsgQIvUaFBrzF6VJLlDjj4WhuKiIF0VGvT4F02j4Y3qOvg+fUelR02+HuBk/p1EhMBn+OfyCNC0KtUPj0abzPPpoD8sZ1qbH2/wq27poTRh6vkfDEBD1+VtDWIziY4sOW2/WCEFS32NLfigM6yI4rQqUrXodLRq+HKr1fbTpe/Ix1Ef8OT1YNvv36OefVJhsVFDO6bX4e1dzwcM26NRbbcD3L7Mt9znNKr9wqJVpFmxvhcjeukK3h+o+XYJkbwVJH1GU7BogPXzHsyEVITuvkN318Gu59Ktj+4VqkmWXi9bkZxKHiB+FyBAg9bzo8Gw9pquDe4isbD7ANug3xgYNO9DGXjrJZsx63X9ko/88PCZDAdIvNDN93lK78+k37KZHZ9tfps21F3Xo9dJ4pqMHyNWrV9nrby6yJ56fZW8uiq7K/Wn8c4vXzN+3GMAABjCAAQxgAAMY+PQYIEISIYmw67CB5GIXXjKemz7LDjn+fM103NPWG7ijQp4HkP3CLLLk6tE9zoL0CNk1ouTva3aih0JFxGTkA04ScgqWPistzEzTxWM6w+Ne4fyTvcPh2v65NHy2ow6r7tNPr1OhtEyvs2qbI23g/51huVMmWevv7rP2656xdp1nsP222Tb01jmaLTdb5x98TYfyzrLGia8p2r2mQ3+1VGBsUnD00ejL633oIirxY03XK2r5x3yp+BjGdYpdYXh8jMc4BTsFyKZrNMLS42MUI5t8BqQ/frVmCer8irmrNLPwqmfDyF39bBQkFcwaPf4prDUrJLZ4wPOg54Fvymu6AnU0OrQcfvNsG37TLBvmS83i9DHiVi01RvxhTrjt98Njt8zSx5OhdW9Jhtb3dfW8YT7+4GOOdWi0+9B7FkZ8v+O2ufr4XBt+++s24rZkzLWRetzHCH1spJ47SuuN0ueLlnNs9C0aep2jNeN0tF7zKAXCUfoeRioAj9D3N0zhsE0zPds0U3Kowmzr1c+E0XLVM9ai96ZZ71OLZmK26j1sU4j157Yr/LYrmHZotCuk+v02jaG67YeWe3D1WaoNCqB1CqJ+7k4/tL5u4nSrvepJqx17t1XrKub9Dz7L+m7zAyvXuU179d/Bem25nfXRuRj9PJIeF/to9JbPPj4jUo91zoqU0xAgNQNXPy/hkOyii9LEQdLjY9cRh8h8gNT9ch+K/NGpDrSMz6tarmUYuhq4x8jK1q/p9exjG+lK7S1fPNh+eU7BxWsUFleuXGXPaObj7VPftMmPvm5/e3a+vTT3bVvynmY5eqT0GZL637J337NXZ823Z6fPsbcXpz/fJL/0fXp+6WNbsa0wgAEMYAADGMAABv6ZBoiQ63CA+mfC42v/a/zB5/HRD828dsrfbNROR+iCGLroTK3Oj6eZV+WaTRiN+HyPjVqGoeiYzH5Mlvno2DVIelDRKIiQFQXRMQRJhUe/cEwyohCpCKnDq8sUI8t0ERm/QnVZjW7rqtW9QnjcWVesPtD66QIyQ4641BrOutOar3nSWnXOwLbbZ2vMjcPjLF3kRKFxsq7EPOk1HcKr8KgA6fGx+QY9phmPzQqMzQqPYVynK0xrNF2nqzkrOoaR3PZlEh/j8BguGBPiowLkNdFouloh0W9fpUOar9KhyFfq4i5XPmtNut2sANmsQ5V9pl+b4tswhbFhU2YoKr4WgmEIenrtIxX6fIzw23/UbR+6P0rLUVpupZmco2+fF26P/uP8cH+rO/S4jz/Nt63vmBfdTh4L9+PH/hQ9b7QeG62Pj9LSx0iNERrD9dgwfQ2Pjh0Kiz7ab9VQYPTbw/T4cB+6H4Jn4VLxcaQPxc1RPgri41aKj9GYFZZb6xDqrabMtNH6/kdr1uJoHU49Uu/JCM1wHK6ZjcN06HaHRptmhrZ5hFSQbL1SgVJRcqhGm2aJepRsj6NkFCGjWZN+zku/II5fibxen6tOh3fX+tB5Jmsm6b5fxXyCDi9XqK6/9GGrPv0O63foJTpc/8dW2abQN3B76735NlY+cKfoQjeKkWXu0YNkiJEeITWjV6MiHJLtMbLgwjNNut01PhbeDzMd/eeoIDzmHyv8+Up+5vziT/qZbN5fM5O/bhXNX9fP6t624eC9bOev/8Keffl1neNxhd37wps24eF5dtuT8+2pGQvt7aXvhavbh/ion3Pf6bDwnaX28sx59uKMebZYH/c4yZ/HvAcYwAAGMIABDGAAAxjAwCdhgAjJP8D4B+i6aCC++MzLM+fawcecY+WaZbVprWZ7acZVeZNihy89QvpybfExREgPJXE46RYj4wjpsSYfIhVsdH49H+Gcjj7rTMOvbO0Xkymr03N15eoqjcohCj8DFR4H+EVx9PgXDrf+3zzHak65yRp+/5jlJmpm4c06nPhWzV68RbMXb9b5ARW2WhQeW2+cpTHbmicrRE7WUjMgmybqdjx8JmSTh8jxGtdpfUXG5mRc23m7Sbcb9Xjjtfo6GrlxmmGnyNgQlppxd43uKzw2XKlzN16pWY5X6HDrKzUL8modTqzDszt0HskRms0YopzPErwtGlvdrhmCiozhfhwXPTB6aEwi5MgQJH2moR5T+PMxSmO0Py++HdbR80ZrvcKxle73NAqfM9pjZtcIqceGaXSEEOkxsnMM022fCTk8zITU7Ee9hjAUJz1IjtT3F404ROYj5GuKjYqQ2jbJGK2ZkKMUHkdpNuQozfocpdmfI+MxQssROrzag2QUJRVsFRaHeXDU7NI2xdw2zSb1INmi0eqRUlGyVbNJ/dBtP5ekn/vSDy3PKUJ6iKyf4DFSFxZSjByiCFxzvcZ4Ha6tMUSPVWvU6PPWjNXh2z+eaIO++mvbfPiBumq6ZkZqZnDFkF10VfXdIqeKkdHpAhTPkwipZWVBiKzy24XhMX9bPys6vUH+Zyb52ckvPUwWfDzMiowjZNMBmvX7NStvOVCx9CDbrPlA+/ct97XvnjLZbnxkjo1/eK49MH2hzXt7ma1YtSqa/aifdf9lYsXKlfbGwsX20mvzbebcBbbsveX82b8u/tnP94x7DGAAAxjAAAYwgIF/ogEi5D/xzf8kKjNfg70ZXQ3oT1yfAGlPPqM4tsORtmH1HtZH4dEPafaRhEePj52jpwvSJLO0CiKkxxMPkcnSZ0EmIx8hFRMLZj5GITKeCVmrQ151EY7eugjHZoqPm+X0urb5oW152CVWc+5fdV5GnUfxZl2ARFdIrtOsx9yNioMKWc2aSeejRTMefbROVoRUfGxReGxRgPSlR8gwQnz0w7AVLf1QbJ/xGMfHJoXFpnGKjQqL0cxGRSwPjBr1Hhk1uzF3VRQc63W7/gqdr1Ejp+DYrMOAh97wqs6P6LMaFRoV6zzwJSEwxD+Pjkl4jGPkKAW8fFBMwmK8TMJjEiGT5xVGSL+dH2sIj8lr8GVnhFSAXEuEHKaZliFE6vO3xyHSZ0j68AjpsyGTCDlS30tRhNQsSJ8NOVKHYI/SIdgeIMNQjB3tQ9vK42My83GEYuEIRcZoTNdyug0vGvqYP0eHXw/Xcrgvdej1ML3nbTpM22dGtlwxzZo0Gi9/WhH4Gc2M1SxUzZT081/6eS1zfmi2wmaNYmStzkVZo2BZq1GnUaPZlkMUN2s0fFmtGZi1WnfIJY/ZIJ1PdJAO2978C9+1SoXzysGaHakrb1fUacawh3TFxuS8kB4hPT5GY28tux6O7Ve+1s/HWiNkQYAMP0f6+dIOgQr/Wcjtb30aD7DeTQfaJrmv28a5/7P6HU+xs2543O5+br69Mn+JLdch2f4zr6vXaOmzH9+3JTr8evYbi+zlWW/YnPmLbPmK6CrY/rGufz5wn/cEAxjAAAYwgAEMYAADGMjKABGSCMk/QtchAx4fV65cbZNuu89qP3+QbVyjqNKimVUeHzUbMgqQ0ezHzgCZxEiPI4XhsfB2l3CSzORKAmTRIdkKjuGQbJ0HT+d3LNfMx3JdJKSPDn3dVIFnUz/sdLtjbeARV1r97x6wpikKgpo1WK+ZjnWTFR4n6f7E+CIpE1/VuRM1PEJOikZrlxCZj5ETFSg1osOw4/josxwVHHNX6XyMmsGY+73O03ipxiU6TFej7lIfz1r9Zc9b/e91Hkcfel6DZjo2Kli26MrZHVP8nIx+CLVHvflR2FPc8xmNYfgsxWQo3I1WsAtDMwdHxyOEyDXEyChERjMhP2yE9NCYhMfO6FgYIP12NAvSQ6kfih0djj1fh2PHMyH18XYPkAURMomSYTakHh8RRjRDc6S//nA+SM2GjAPkSD8HZLcAqVmhIUC+EmY+RnExCpDDNdNxuAJg4fDDsouDZBIoFSMVLsPHtN4wxUQ/dHuoDttuuVwx8qLHLXf+o9Z4vmbMXqBx8ZOWu2yagrK2pUdGnYOyTofG1ypW1uqxOp2vs04OanXYfK0On6+94lkbctU0RUnd12H4NVq3+hd/supvX2D9dB7JylZdLKZuF8VIH7tapc+E9NmOHh59FmRRgIziowfID46QBTMhw8zizghZoQC5ae1+tsGQfa3ui0faj357o65sPd+WrFhlK312c/7Psmj248pVq22Rzvk4e/5Ce2X2m1ousvdCgPSnrv0XKz0jXKiKULn29+mD3kc+zvuHAQxgAAMYwAAGMICBTgNEyA/4hxhYOrHwXny63wsPkMt0gYqzLp0Szme38ZDddF7FA/IB0i98kUTIKDb6IaBJgIyWHyVC+kVsykNEiWdDaiZkmDGmC2uEC2/o4jJ9dDXrzXSoay8/vPWLh1n/715gDb+9y9pu0CG1Cnc5XcG6ThcVqdfhug0aOY0mHzfocGkfCpDNmn3Y5EuPkQqRLZN8NqTO/+jDb9+gxzTbsdlnOfr5Gv1wacXE3CUKUhdNtYYLnlLsfMoaxj4ZRr2Wfr/+gqf1cY+RipB6fjjEWheXCbMdp+hCL7d6GPTzMs4Psx7DORsV5cIMSA+Sup0fHh/9foiQcYhUtBvt4a5gmUTGrkufCdn52BzbKsymjGZQRl8j/vxxfEzCY/HMxyhC5uNofD7IEB91Hsnh8RimCNmhANmhz5WPkPp6HX/U+SA1/JyRI/SxZEQXqolmRY7UxW2Sc0KO0CzIEToP5EhFyFGa/ThScXhkmAE5QzMgNQtS2y8cbu2zGkN8VFzU4evDNANxjUPxMETJLqFyuNYZrqgY4qViZMfluqDN+YqQpz9ojb+4zxp+fo81/Oxuy/38Xsv96n7Lnf2IoqS28eXavjpnZ72HSR3eXX+FR2YNrd+gIF13mWLkpdOsRmPw77VUqGy4RiH8wies9qSbbMBXT7fK/znc+jTr56Nm1xAjq3J7WFWIjfuGZXS7hwj5gbMhPfJrPf0MVmmmsp8TcoPBe1qVzoX6tSPH2gNPzvQf6ei//N9jUXz0P6tXaEbkgreX2szXF9qMOQts9rxFtnjZCqXFwgAZ3U4uUJX8Ge+f9O2ly+2Z1xYrWhbGzU/3n4HJ98eS7YgBDGAAAxjAAAYwgIF/jgEiZP4fb/+cDQB83vdPwoCXBw+QR5881jYYtJMO6dzX+rYeEK5+7VfAroyH367QeSALY2NyTsjoytjJ7Mc1zHxMZkCGZRRR/Kq/UYzUFax1SGllze7Wu78u/KELfVR++YdWffil1nTuPbqysQKfZtI162rKjQpXHh1DeFSsalJobPTYqOHRMQTIECKjmZDNfkh2CJAKjuNf0XkCX7CWy3R1ZcXE5nMet+YzH7Gm3z5ijWc8Yg1nPqoL2TwWjXOesNy5miF33lPWeN5UzZzTobxjo5G78BnNnPMrXOsq1bqYTZtmPHZoxuOwPyjAKQqGodsjfYRI6KEwGqMVJ334/dHhsTgY5iOkB0ifCZkso1mRyfkio6Wv4+ePjNaNlvEsyhAho3NL5mdZ6rHRioQhQCoUJrfz0VHhsPD2SIVGvxDNCC3D7Mc/KTwqRLbpsUYF0zp93Xq9xkZ9Xr/fqOe16HaLPu7LZr22Nl15vON2xUZdDGikZqsmEXK4AqRfvXu4tuNwBcgRio/DNftxuOLjCG3X4dp2flj1MD/kOsxijMOjzus4LBk6zNpvd4SlPq7DpPMfi58zXLMUh2sm4zBdVbtdV9MeeulUax77mDWe+ZA1/PpBy532d0XIB6zx5/db08/us8af3me5kxQjT/yr1Z/4F6s/9V6r1/MazvbZkjKgMN2o8NgoO42aBeszYhsuVoRWjK67aJrVXvi01Vw41ao1aj1OX/S0DTnnERty8u028Lu/t8ptjg6nNKjUxZ2qFN376qrbVQqUlX5l64LhwT8MD/X50fmzVRlmDvuMSl9vf9u4ejf73JDd7cBjxtrdD79gyoLhP4+HXQOi/3myXDMj57+12F5VfJwxe4EOwdYVst9VgAx/30Xr6qZPnAz/+ePJ5/EH5r65xMb/9WV78IW39XhhtOTP60/iz2u+Bs4wgAEMYAADGMAABkrVABEy/KMM4KUKnO8rsu1hYeHbi23YNgfp6te7WpUfSqpAksTHZBlFyCSGRMsoQvZ0TkgPkQWHjhYGyCSy6KIaHlI21zntKhVRevvVhhU/B3/j19byq1t1cZGpNlRXR25RtGpSsGpUSGxUqPKZjk26oEvTBN1WVGzW7TB0u1W3h+rCJUMneRxUfFTECledvuRpaz7vcWv5zcPWctoD1qLw1KLw1HLK/dZ8qg7r/uXfrelXD1njbx+1JkXIxrOfUPx8MsTHxvOnWtPYpxQhn7SmC6YpYD5nLTpMu1UXrumYoitD3/K6td2s5c1zbJiuFD1cY4QCoh+C7BFyVDI8OOq2h8f8iGc6+izIrXQ7GprNqMDnIzkku3A5So/nRz5ExgFS97fS8EO6PVIWRcgkRN6hGOkzHbuFR5/B6OFxfhjD4wDZfuc8a9I6DYqY7XfMsW3unmf7P7TAjp+6yH77wmI7y8eLS+w3zy+2nz7zjh31+EL74WNv2f73vxmuwj1Ur6P1D7N0Be1Zen9mKdZqqSt+d2ibDtPFaDoUIYdpWw3Tdu3QxWY6NPvRr2rd4TMfQ1xUYPTY+IHDg+PzCpNaavbiMF2Qpk2HXrdePFXb8XEFZkXmXytAKj7mTtWMx58rOv5Msx9/do/lTtE4+W5rOOlv1vATnV/0hLssp1F//F90X0Hyp5otKSe5MxQkx8rDRZpNefEz1nThNAXKpzWmWb2M1J73hM5P+rjV6OtVazlEobvmd09a3flPWMMv77bqQ6+yqu2P13lWD9Ah2jo/pM+K9BDpP28a4Wcs/HwkIT+K9B7qQ+jXMhzO3byP9dH6GyjYd+z4fbvo+jvDzEb/WVYWzEfDrn/GrdQFaebpAjR++PUrs3QIdpgBudz80OzV4e87Xzv6z5eF6/ujr85ZZL+7+Tm747F5Or9keEbRcwqfz21+d8AABjCAAQxgAAMYwAAGPooBIiQRkn9grgMGPC4sWfqebT3me7ZZ3e7d4mMSIX1ZOAuy83YSTD546dHR16vU4aNbNHzV+uq8kxU65+OWWx1iue9fYsMveVChamYIVk23vGY5RcicZsnlJnqA1PDwGMdHD5BNClZNClctClhD9fhQXZCkRReFadah1I1naXbjLxUbNaOtVRFp6Ml/s6Ga6Tb0xHus5aR7rfnke63pFA2fCfeLKELmfuMzInWo7lk+C9JnP+qw7PM0+/GCZ6z1cl15+RpdXEYXrenQBW06bpqrGZCa8XfTnBAg2xUih2k2ZIiQfji2Rj5AenzsYXSGRw+QHyE+FoZIxcsQJeP46BEyzJL0iJnMrvQAmYwwIzK6P0q3kxjph4xH53HU8o75NkwzH4dqZmObHt/+L/PtsCcW2rkvv2OT5i23uxastEcWrrSp76y2p95eaU+9s8oe1/2HFqywv7y+3B56a6X9Zf4Ku/qlpXbmtLftmIffsjE+s/Lm161V8bFNEbJdSw+QHZr92K5t2K5t2aaLyXiAbNch1B0KkB06xN1nO4ahw507FBc7wjK6PazgdocOmW7X6NA5G9uv0MxHheemsdqOZz+qQ68f0qHWGiFAKiYqQOdO0ZCL3E81+1Hx0WdANvxY0VHxseGEP1vD8Vpq5I6Lx7F/tpw+Xi9HOfeiINlyzpM6tNtnyuqQ/fMUGz1AauZktYLnEPkb4rfPejQ8Vq/b9Wc8ZM1nPGhtx0y2zUd+S+c91YWYWjz665Bqj5DJ8BAZh/sQIDX7scxnQOpnp1zP9avVV291kJ12/kTNZnxT0dGDoMUhsedfdPx8r/MXLbGX9PzpM+bZzDlv2VvhStmrowgZf47wifR//suC/i/cXaqZkg9MnWVnjH/cxt89S7Mp/fGev85H+SWD5/IeYgADGMAABjCAAQxgAAOJASLkOhCgko3Nct39wffKsOzdlfb5XQ5ThNTFaBQbex7FsyCjCLm28OjRJJoNGQ4d1YzHKo2+9TqPXZ0OJ1VM6bfDcdZ00iSdB1BR6U9zbehtumL1zbpAzE0zdWVrD5AaIUDO1BWMFSGToStXN2rWY6Oio199uv4SHQJ75sNWc9r9VutR6cS/WfOJd1vrSR4f79VQfNRoPfmvCpB/UYD8qzX5OOVuazpVh+JqdmTjr3SOwDN8JuQT1qi41KjDr5sveNbaLlH4utKvtqwZexNmWZtHyBs9Qio+6jDs9jhCdmgmpJ8L0iPkyDAUIeMQ2RkgFf/C7EddHCY/8/EfmAFZFCHjmZFxhExmQUZhUl/PQ2QSIOPZkCE+6nYUIfV6/TyOuj9CUbJDsyT9nJsjddtnM541fYlNUXj8qyLj/YtW2N+1fFCR8TEtH1u02h5epCCp+Pj4guX22IL37O7Xl9nf5r5r981dbn9XiHxMz334TcVJPXa5Zk0e+cCbtoPCZodfJEjbt32i4qO2Y1uIkB4gp1ubAmR7EiDj+NiuANmuC8P46OgyPD62h/j4rA67ftpaL9Ss1XM0o/WMh61RAbJRM11z2sb5GZCKz0mAbPCoeJIC5E88QCo+hgB5pwKkxnHxOFZLH8fcafXH/On/s/fecVLW5/r/f7/v95TvSTQqW+hsne2NLqhYYm+xG42JSY4FsQHSFEE6iPRepfdepUmHpZdl6bAsyxZ61eC5fu/7eWZ2V4znaNTo0Q+v3Pk8MzvzzMwz97S313VfXgVaLFECqskE9pWIsjKR2wh0Xae47hsUy+3GsMb32KhYbj+2yzrFUynd1ymj4woF/jxK4fUaAyCfI8QGVWTqswBIA5EELwEi/SAom5tqSkgKIHkjQU3XAe2jar+gV1sP1s69ecDDq/by/R//Y9FVLld8+oIOYr8+kFcMgDzpWbJPAiHPX/7MS8Qu/xng7RTIaEnZB46f1pB5O9Vu9AYNX7CHy3Ob9tno0rP/x+Ne/pi67V/uZ6x77t1z73rA9YDrAdcDrgdcD7ge+GY94CCkg5DuR9YvoAcMOBiEbOBBSFNCBu2hX4GRvn26TAFZptYKqbb+/sr1CM+ITACmAFFMyVX5/pZK7zpfdWeTIL2sUOkL85SOAjIDhZwp5dJm5CmF4JhkEquTAI5JWJ+Tp2HJ5nQyqdOJqB0DzN6L7b5eMUDF2JaAoXcWK7kVgDEIH9PbrgRCfgp09MFj+ntLlfbuUqW2WQL4XKZkzk82AGWquE7M/uuWjVJtCzBzG7P8diqmL+nHgwglGbYP+/VBJY8hvGYCNm/uS+Y07MUzsBZ7EDIfZd9xfyakZ8cG6AWVkOXt2GUg0lSRIfBYfv16JWSp/doSpv8egPRUjygfg2vpZQCQ19qyQ+DRV0ACGwGCdYGOtbFapwMy6yw8rj+sLtKggxf0yanPtQrIuALIuJxaeQqwSG0585m2nUcBCZTccfKyVgIe15Vc1oaiC9pUdFFbSy5pK0ByY/EVbSj+TNlAyG1Ay11nr2oH+1t87ILabihWXXuOUT9mkGSdxQzIzHE+gMwEQGYCH7MMQAaBY9boXGUSFGMV2s6ybcJiMgmLySChOm3wdqWReJ1iKliCZ5KAgh589AJoeJ4tfMbs12avtueeSjQFZBsUjq3Nfg1Y9MDjYgAkRU951XwR4JFqRp9ZNV2sQNNFiqcCzSjbZo1tvlDR9GKN1ksU1XaZalC2xgC741uRnv2noap4R3PdVPMVhdV6WeFZf1F4xh9JoX8eAMkcVmBkGHMevUR6TzX8tG4kIf7fo0jYTntWv3uxo9Zk55YqFK9+cfVrrdf2RcdgoVmtS1BAHjpxChv2SeWxFnN639FCLNkndazovIpPXdTnXM7+2fUuMiP2UOFZzVt/WB9N2aLOEzZpwJydOnHmsu1SX3BZ90Xqm32RcsfJHSfXA64HXA+4HnA94HrA9YDrAdcD36wHHITk15ZrFncMfu49YODh8pWQEtKHkJGosSL/HoT0bKLXKiJ9NWQoRKMMRHI54GOEwceYRz1FV5WHWwOF5mDLPaS6y08qC+CVyazADOYEZjL7MZPAEoOQqajkkg1QkWJtZRAykQTrwJBdikFdFg08igYWxTb7RIF3zD67QsmtVyilNcpG1GmpbQxGLgM6lq8lnAeEpFK8WoYacoU37y+m/TrV6LSJfW9T+uA9aoTK8l7mFTYw4PgxMyZHWhAKNm/uQzxhNLGoIuMmEZAzxZK27b77lmwLpzE1ZJ2gErI8hPTmQZZassvDx9D2fwMhDT6GCtBY10DkNUDSFJDlIaR3mVIIWTYf0oOQzHg0COkDSNSbnLYgmYeWndCHuWe1AriYfe5vWgVwXGYWa0DiWrY3nv1Ma1gXF17UkMMXtbyAhOULV9Ryyzk98slxvfBpgdpuKUHxeFbTj1zQwryLwMnPtPW0DyFNPbkFZWQO9u1t2Lj77zqjx+bxHAN4U00BSbK1AcgM4GMmAUKe8hH4aNDRA48GHD3o6IPHzBHYrgmKSR+yU2mEx6Rih06xoCFmfyajPExCGZuE0tXgY6LNf7TZjwBBm/9oFuwQgExsDYBEAWkAMgH4aEDbq1L4CIBsurCs3l6oQKjeYpuKe2uBYt+cr6g356rG23NUlar+zgJFtVikGo2nKvLeDrqh9mu6sXYTVaj7hirUbqywmi8pPPPPHogMT/uDp4wMC8LICoRA/XvUQ5768a6n3tXH01fr88985ePXhc6Uf68yWmhKyZKzF3SEFOzDBad9AIn6cfy81eo2aJryis7pWPE5HS++oNMXP9fZS59pP8rHxVuOaNiCXeo/e6f6Td+ugXO26UDBOQgl/yONpvztuG33Gel6wPWA6wHXA64HXA+4HnA94HrA9cD30QMOQjoI6X5s/gJ6wMDCZeDGLQ+/phu8mZDYpYMQ0tYvW7OvBZCh02Ug0ldKMu8RiFIh6gHdhI206mMdlPrRUtWcx7zHpcXKwOpr8LEmIM0AXuacfFSQKPFmHlMqENILokFpaBbswIgcb8ZeNOAomqCQWKBjPBVogRW25XIFWrGigLRZfslWAKUUlGhpKB7TvBXwyHlp3vnAydaUhY9QUS1WoFLboNuG7dFfSXHuvLGEOYYoAIuxFJ+6pIWFlzQr/5JmHjqvWXnnNXbfGfXeWqK2awv18pJ8/dYUm8DIALAyFVt2TRSOtQxCAhvrzCskGduqfEJ20B5tlmyzSZty8X+oUvjIsaprNY+0aQOR3rYPJD3gaGDS9mUzIe3vVrZtINKs18Gy5Ot6C/z7ZmttC6ghvfqD7aeAjldQOH6u9YDHVcV/08qiz7Te1IwoH6cXXFK7Haf1/Ipi3W5BPDNOaP4RQk7OXdYdS04qmtmO8czvDACPTcVae1ae7gJsvvjpcXXmmM07fom5kZ97QHILMyW3AyT3MFPS5kj223JKdxAoFA94TGceZDoQMgPw6BXQMWOkVQ5zOSn6Id3A4zALnTH4SOo14S8pJJ2nkG6ejA062Uu/XotNerUSDUACHxOBj4lY9Uvt1wBqTwHpBdAEAaTBR8BjwMoUjs0AjMDHwNsL/AI0BspV/FvzZRUHfIx9cx41V9FvzlF003mKYR81Xp2k8Ie664YG7+jGum/qpvpv6aZ6AMi6gMg6r6KGBEKihozI+DO27D8SCvUC9bx+HfuY/p16+E+dNH3hBp0H9Hr/7P3oG0DAL/7rC52/dIUk6zM6wuzHo6gfrU5euATMXK7ra9yjJi16AygvKa/knPbkndLqncc1ffVejVqwU0Pm7tDg2TtQP25T72mblHvsbPDm3Zer7+PLlduH6yPXA64HXA+4HnA94HrA9YDrAdcDX+0BByHtB58rdwx+5j1gEPKKQchHQhASFSTw0ZSQkVinzUr9JRDp2URD8NFWA5AEZtj5JF5XJHQmnNmSN0Q/rEq3N1Vq1yXKnEFoDEEnqcDHtLkAR6CjAcis2b6VOYM1fRaFIjIdRWQqcyADgKYYZuhFY6mOBT7GAR3jW66gsLYCDwMtllG+hTYRG63N70tCzZbELL9kKpXtVABTqlm0g2sawDK1NfuxkJH31ugJrL49NxZr7vELWg10zD59mfmG2IqxE6+nNpQA4LAZbwzWZv5mtakYhd+J80C4CxqAmu/VVQW6lceTSlBN1lzAHnCvjgFIA5FBGFnP0rG9MvgYqq+BkOyrPvUVAMl5HnwsvwaBY5kF2weQdUKwEhBpMNIv5j4GoWjdBUXMfyz25kV23HGKcBks1sDG1R6AJIik8ApzHi/rU45BR+DjbxcQKIMdPp25mMmT8lV/RoFWH8N6jQW73kLAMrM8M5jlmQZEtnmeCVSAsKAAdus0Zj7eN+uwWq0rBOZeBEB+pt2elftvysWifZCadfSCHpp1UHGoTtMJo0nHap0OgEwDOqYNJ42afkgZSlkqNYrYFOBjisFHkqeTexEmRFBMohdAs475jADIjsxpDNqvffjoA0gvARsAmUBPBOibAL0SoHcCAEgPPnoAEvBYHkB64HG+AsBGr94APlJxgMe4N+YpHvgYD3yMfWuu4oCXcW/PV+VnB6vCHe/qxvpvq8LNzXTTzU0pg5Cv+xCy9qsKRwkZZkrItD8pgvXGlOf179GPK+3ephozc7UKinz4ZwTwm34W2fzHU6gfjxaU6DAhNEcLsGAXFOsMAHLhGgKbbvtP/X/hd+mV5n2161CJVmw9rGmf7tGoeds1ZPZWDZq5RYNmbdXAWdvUZ1q2lm3L01UvtMZ9Hn7T58BdzvWK6wHXA64HXA+4HnA94HrA9YDrgW/fAw5C/szhk3tRfPsXxc/xmBmE/OzzL3Tro01Kg2m+HkL6cyFDKddfApBAyMikx3Vj3MO6qdZflPDmGNWfhK0WpV0aqsc0AKPBxixgo4W4GICs6UFIA5FmaQZCTicJeyizGEkyjmG2Yyw267iWKwFFn1IASAORVAAoaQAyAEz0Z/gRGmJBIszjMwBplVIOQqaRcpze2mzbSxXDvhr13aruzCQ0wLbp7BWCVi5rDcBtDaq/1cWAOKsitqlVhYSsFF3WqhP+uhp1pJ1ey2UtjGUX4C4bhd/0Y5fUavNJPbi0BAhZrJpASA9EemrIItSGVHkQ6Skhv6yGLAWJfwdA1uG8L1c+aksrHzqWqiHZr51f2/ub//c6QMg6dr4lYBuEBJLW8u5PgbruPq3NHINsjsFqrNOrgY/ZxcBWoOyM/Iv6wwqUkyg+62CLrzcjXw1nAVNJuX5sWYm2c7lVx89zeyRpAyAzsLBnzvArAwiZjjoyfTKzNJn3mDzOVzneOW2/mq3L1+TD5wC6n2sncyf3YNHee+GqFmDvfmwuVncAZApBMynYrZOBj8moHpMBj8mDLKmc1PL+BAdZ9TEAuVlJPbKV2HWjErFgJxJA4wFIs2Ez/9FTQb6P9RolbSKBRaaALQOQQEgDkFiwfQgZhI/NFjDvMVimgkTt6ANIgKNBxy/VXAXeAEICKhO4bMyLHyvy/s4Ku7Wlwhu+41VYg2aqgAqygqkg65WpICtk/VlhVIWMF/SrxKcU3aiJOgycTYDMKU956MPHb25//vxvf1PhydM6mGfzHgmgMQB5olinz1/Uys17lfbbxrqB8QjXxfxODzzXXhMW79LIeVs0eOYmDZzB3EeqP9V3erb6TNmohdlHgrMi3Xvlz/G93z0m19euB1wPuB5wPeB6wPWA6wHXAz+lHnAQ0kHIb6y++Sk1rrsv3+6N1IeQV3UbEPKGYDq2KSD/OyWkl3ZtykdPBUmKr60JhM6k/V7VXx/FPL/dAK9CVIH5SsOWa5XBvMcMAKSVN0PRS5VmG1Vk+lTCZgBNMdhoY9sAG4GPAYOPrVaWKh/j31mGgtEK+NgceGQAkgqQWpzgpRcvVhJqtmSgUjIKN6sUYKSpIFOAkLGoILO6bdIrc/I0G2C47QwQkUAOC1T51OCjATjWNYBHv4CSwMY1BiEp2zb46AFJTq86cUVrOZ0NRNuBsi+HGYc253AxEK/7rrP6HTMv6xqMnFcM+DMAaQXQC6khDUICB82ObeExpQDSTpeDkCHl45cBpAHJr0JID0QacPQg5DFv9UAl59Xm9mpz27WxZdfkubF07h67TmsTx2Fd0SUeD+EyANaNBMt8UnhB7bad0u22L8DjLTxnt/A83cL9ugW7+S0LSvTy+rPKxb49H5t65vxiIDPPM2rILGBk5owj8iDkNAvyOaB0IGQa8x6Tx+9VwrhcxX5M6vi4PShIj2sqCsjsYmzaJWbR/kKLAJ/3Tj+o6qge40fuJPl8lxIH71Ai8DGh/3Yl9NumJCByUm/qo01KNADZbaMSOq+n1imh4zU2bLNge/MfgwASO76ngPTgo98/pSpI1I/xXwKQKB5RNcajePTK4OPrAMfXg2uTOUpgO/AGoLLxDFV7oq8iGrVRZKN3FXFba0WEQGSDpgoDQoZhyQ7zrNiNmQn5sm7I/Iv+I/l5Va73khp3GK9ckqu/8FSH31z5GHq/u/zZZ8orLNHewwUehDx83CBksU6du6Al6wG4AMjrA48RcPN7/Yqgm1sea6PBKB4Hz96s/ige+1J9pm6kNqj7hDWauHyPLqCQDu3frd/ufdUdL3e8XA+4HnA94HrA9YDrAdcDrgdcD3y7HnAQ0kFI9wP0F9ADISVko0dfRyUFpAjasCMt0Tpoxw6F1Hgr8LEMQto2ABIbdkTsI4qs96oCqB/TsF0no4JLY0agFzYDgEyzQu1olT6HOZCEt2QQQJPInL9oFGw1UKjFES5j4DHQCss18x5Dykdb45otoT6hFntJxPHeajP8ULI194NE/DRjbNnASU8RyUzIGGBTHGnID6Osm7DvrHZgO97LHMPtp7Bg2+xHoKEpIE3ZaKtXQRVkCEiGIGQISq4jmGUH1zUA98qnJ9Qv5zxw8op2AyNzz36uXOYqrkQl2GnXOd299LRS558CABZhifbnMdYHBtpMyFL4+DUQMgQgbQ1ByNoGH0OnAZa27c1/LKeINBVkLdSntnqKSA9CcllusyZqyFoc+64AyM2kHW/gcazh8Ww4cVGrqREHzuiZ5ShWUT7W57m6DdXqLay3si+rRguLdBePqUsOicscy4/3X1AWULLBQlO7HlUswDne5noCItNQthqETJsMhJy4Tynjc5UyLgdV5B6Chpj1OXonatlcddh0ivvwudac+BwI+rnmHj6r+6YeUMXBOxXF3Mf4QdsVGED13aYE1I+JvSjmPyZ0J9G8iwHIDUog4dwAZEKHNUr4YLUSCKLxbNghCNnGErANQNo80RB8DNqwg1ZsD0B6EDIIHwGQcW9huTYI6akfsVu/PkfxwEeDkQEAZELjWYp+fhTBMx0Vfvu7pF+3VQRr+G2tgJDvKKJhc4U3eBsI6QPIMJSQNxJK82/Jf9R16X/VI6/21bLsg0Hl43+RPG3g75urH7mwLl35jOCZIuUePq79pF4fOHoCAFmkEgDk9CXZim/0n/pV/OPMnXzOS6f/VfQjavj4u6get6g/qsfegMdeUzboo8nr1GXsKg2eu03FPLf2pclCcNyXp2/35ckdL3e8XA+4HnA94HrA9YDrAdcDrgdcD3z7HnAQ8hcAoNwL49u/MH5ux8yDkH/7Qo1+98aXIKTNgvQVkUFVpMFJ0rFDANLgY6jCCaGpCISsVPsvih+2CQB1GAuu2XABUKjhbE6g2bHTsF2nmfIRCJlCGnJsr02KwiYbh0oxQLK1KSBt7mPAA5BB5WNz5kE2R8nYlDTspospZu6VqxCMNBAZAEgalEw0ZSQqyOqsNbuu07tAtRWoFvcDH3efuQg8PKP22YV6ZvFxtd96Djs1qc8eePTtyL4V+zOtIphlFZByFX8z5eM6FJBbAJXbSi4yM/G8/rr8uCqOPqpaMwr119WnNekocyWxeO85fUX7SJI+cPFzzUHZ9/DKM0pfcNILgamPPd0gpBcYcy18LAcSPbBogDEEHFkNQF5bZUCyTBlp4LEmENJAZC0DkdxOLfZdizWVUJk3CeDZyPzLLcy99KzXpCMvOnZObTYV6tbZR5Q17Yhu5rky+OgBSJ6zW9nXrVy/AfMfn1hxWjOY7Xjg7GVNP3RBHwE0Zx8uVq9tBfrj6hO6EyCZjCIyhhmSSdMOYsnerywgZMaEXBLGmelI2Zo6nu0JObp92j4N33MGxennWnqEeZxY36fuP6WbR+Uoot9OxQzaplgUkPGoHwMfbVGgxyYFumUr4KkfQwBynQIegARCAiATCKNJoLcS3sV+DXz0LdhfBpDx9Ec8fePXonIWbOCjByB9CBmL3ToO6GgAMq7JbODjHAWaAB9fHKvKj/ZU+J1tFXnnexQAkjmQEbejgrytpSJuwY6NFTuMWZAehKz/uv4j/SX9e9p/qu5j7fThqGW6VJp4ffVbAz8DkBcuX9bh40EAeeQEEPIEsyALVXzmnGYvzVZUnT/qV9ivwzKeB0A+TT2rX0c/pAaPtQI+blIv1I89J21Qj4nr1HHMp+ozfaMOo4S1fw5Aus+Hn9vnnXs8rqddD7gecD3gesD1gOsB1wM/3R5wENJBSKeA+UX0gPQ3IOQdj78VhJBBBaSpIK0MRnoAMgghDUR6MLIMQhqYjIz/nSJr/lWBoUBI5gGmEkaSDGhMJO04cdIBJaGMtOTrNOYLBrDXRrVdReDMCuAQsAjrtRc644XN+JbreMBjfDODj0v8ehtFo1eLWS38I1gASQORcQBKKwORcagfqwCXnvx4O8nWZ7Tz5AXlnjyvhYdP6dUVWMBJX44dsU/VRx7SvQDR9Scvaf95A5SfaQfwcCvrFsDkJmBi9km/NmHbXoe6cTL24cZri9UAZWfSNIN7Jao55yRKT7Nfn9SLa89o0qGLQMhLOsI+j18EWp6+pDe3nFEmisG6iy2pGss1VRYY49ux/eRr0q+BjaEy27WBx1qlBVicW1a12a7jVXD+I7DRLu9DSFv91O4s1iTu85/XniT5+rJ28Ji3YMO2dVH+WT28OE9Jkw+qFs/TLdiqG8zO4zFSwOOGc/PUcMExzz7+2LJiLTh2QRsJ51nM+sG2s3p+eZGaZQN2t5/XxAPntIz9zTxyVq03ndAd8w4pATt2NGEz0Sggq4/ZqRo8L1Ejtypu1HYlfryTMJqdBM9s15vL8zTn6GXNOXxBS49e1Pic07p1xA5VRv0YjQU7hvCZWOBjXOeNikf9GI/6MdDJ4ONaxX+whlqteABkAAAZAEDGAyDjW9NHFkCD+tECibyiR8rgY0hZu5CeWkAFwSMKSEu8jgFAxgIdY4GOMQYhUT9G/3WiKj7cQ2F3vq/wO95ThAcfgwCyEQCyESrI21oAIU0F2VSRKCFvqPWq/m/Si6rzVFeNmrGe2Y0+6MN4/Y0Sr6/9svQF700lZ89pf15BUAFZoH1HCpgFWaBjRafVoe9kQqKewoLN2AQStyukPKswXsvhQMjrYh7WzUDIXlM26SMUkN0BkB1Gr8SavUl5xec9AHnt7bnTP90va+65cc+N6wHXA64HXA+4HnA94HrA9cDPoQcchPxFACj3Yv05vFi/y2MwJeTfrn6hO5+4FkL66dieLftaCFlqyQ6BSIOQWLlr/kVxu4Qt+wAAQABJREFUg9aTjgyAtDASkpENQsYTShLHmjD+gALM9otuC3g027XNfSTpOjTrMY5Zj7Ge7drAIzDRACTgMfZtW1FBUnGl5UPIWA9G2t84bdfh+jXYz1+m7dHi/POAtrPadPyURuwo1G2o8aKH52IBJzBnDOq8SaR2Tziipxbkq012kXruPKXeOWfUk7CWD3POqmvOOXXc6Ve7naf153XMdwTKBcxGPsOCdgqUNaeQpO8SYORJZbDWnFusBxYVqQeJ06sAdXvPXdLx85e0E6D5+qbTXmBN3UVBEImysBREolisR4XgY2j1Zj8CGQ02huDjtWrI2igVrWoFKwsVowXFZAISM2YS+sNMx1SqPjbsKccuM78S0AqI3IIVeysBNJ22lajKuEPMfzysuwmGMdVjPQBkPaDxzVis63O/6sw6omcWHUVFelH5PKbR+8+p27aTugt7d+1ZzJucQ9o2oTV3cNvPcPmWq4s04UCJlpw4owmkMHfZmK+mnx7Viwty9ftZu/XY1B26f8oOPTR1p+6ftEf3T96rN5cc1bRDlzUDCDnjACCS9PE+KFarYruu0nOLajD7MQr4GNvJB5DxHdcpHgu2ByDb+wDSrPfxWLDjsffHMw80Hvt1vAFIwLSnfPyS+jEEIE0FaRDSAOR8Uq59AGkKyNg35iiasu2YxtNVhdTrsHs7ASDbooAEQlIRqCB9BWSbIIA0FWQLVQRCRjZsql9nvqoad7RRu34LAIbFHuT7R5WGpn60AJqCktPae+S49pkFG/i4/+hxHcg7rvySM3q3x1jdGPuYro9/muTt5wCQz5RCyAgg5PXYsRtgx+49bbN6Tt6ozuPXqNuE1dqff9oBSPe57/7jo+sB1wOuB1wPuB5wPeB6wPWA64EfpQcchHSN96M03ncBau663x4qG3W4ShjGXU+i1vKCaUJKyK+HkJHlrNi+JZvLBh5XZOaLihmwBoUgykeAX+KE/QoAH+PG7VPsWNZhexTdHsXaO4SEtFyFGs0HkAYfDR7GMvPRt10beAzWW6xWBiHfsloUrIWsCxXzZvA0f4+hqvP316bvQd13TiuPndGyI6f13tp8JZO4HDs8R6mjc5WBEjKVSkKdlzSeEJSxh1VtwmHVGHtQcRNJZwZOJkw5oqQpR5ltyXzDaceUgrU4GfiYYgnQKAprAvUyCNfJnHPCq4y5RUoHQNYBSlp4y10oD//wyXF123JKG7Bo5568SJr2JTVl/mGteSRnMzfzZmCdF0zDZb1gmvkGIs2CXQYj6wAWrWoBP61qAvm88u5DnrJQlmYFE6kzuX+ZnM6g0oGP6YTKpBssZTuVy7y24aQ2o/Dczv3Ziq18K7Mgt2HFHrvnpF74JE8vrT6uhxfkqS6Xr8P16gIxs3i8BmtfWnwIy/VpbSk8p3mHzrOvs3p5Ofdp8mFUk9i0AbL1uU91uQ9ZHLvMKYdVFzXsY1MPqsfao9rMc7Ef9d8B6jDzOA+iuNtdck65Jee1FOv1x7tKNBf15ELs3VP3ndeUfRc1Yx8zDfee08NjcvSb99cqqtsGRaN+jO24XnEd1gMfywBkXLtVigNux5GAHdeaGaKtsPGToO4BSE8BaerHUBl8BGh7ClqD1wBIKvZLABIQaQrINwGRVPU/jVHkg92Bj+0Aj+0VfhdlAPIOKyDk7QDI21sxC9IUkMyCBELeWLeZwqnHXh+hTbuOeyn0HuUz9eM/8Pli171wifmP+SXATF/5uB8LtqeAzC9AXXlG7300UTdGP6qbkn4PgPQVkKaCLFVCsn0df6/3+PuoILOBkFixCaJZueMY9+nbB+L8I4/DXecfe/7dcXPHzfWA6wHXA64HXA+4HnA94Hrg59wDDkL+Az8Sf84N4R7bz/MNz8AG2RPfGEJGmvX670DIikDIihl/ZHbfaqzXKCBJQ06gAgBIg5BxY/crtu92gmKY0df8U2zTzIFk3mO8ByBNwQho9GY+AhoNOBqEDAFIDz4agLTy4aMHINmOftNAJOsbi1StyXw9NmQzMAtQBjBbDNQatLVEycNM/ZijdMJp0qgUyqBkyhiCUj7ey4zC/crAMp415RDw7JAysCVnktidiTXZVpuR6BUgzwN+KAQzgwpDS/pOn31CCax3LS1U511n1J/5hj12nFSfnWc0Goi2vIBUbUufLjjvhcC8ssaAJbBxHmpDFI71DDoCF+tQtVEg1gL81eK2ahHuUtNuE3t7JvchI1jptnK/Qqftb1nT7HJASMoCf3z4WMB6HAt8vu7ETj0eFeQ2IORmZlzuwl6+m9mWK1GLjtx9Um+uKdCjzHK0NOzMmYQG8fiSud16hMt0xFY9C4j48sp8Ddx9Rh8fOK+nlhXpmYXcv0mHUEwe080GLQmzqUfV4f7Y/U7lb3cRTtR+Q4EmHDyvD7eeVCtAZ/MVx9R06RG2j6jHxuN6dc4BVWfOY/qQ7fowuxjYeUFT9l/0aiYgcgAq1Yxe2arUYZ1iu2xQnCkgP1inuPZASIPa7wMg32O2KMnqNl/UA5AoIONQQMaFAKSngKTPsOnHNQM8BivW4KMVVuwyCAl4BEjGvYkq8tVpqvxYH0Xe1YGZjx/4dUf7IHxkFiQAMhL4GNmopSo2aqFIwmhuJITmpvpv67bnP9LoOTt0/jIvMP59l/dQs22fu3hZucx83HMIBaTNf/SqwJsJeQjFactu4/WbGABkMtbr1BCA/D02bIOQqCGZ3RrOen3cI6r92LuoHzfqo4lrNH/dfn1+1e7gd7uP3+Xxuev+PD9f3PPqnlfXA64HXA+4HnA94HrA9YDrgW/aAw5COgj5nX40f9NGc5f7cd+UfDgi3f1U0zIlJKCiLCXbZkFaAR+t/jsImf6Covut9CBkkkFImweJAtJAZGDMPsUSJBIDWIxvhlXWbNdB+7S3evZrg4/B+hJ4NPhoheoxCB0NPHrw8c0FinpjgSq9Mk939FincQDAOQfPoaA7o+WoITusRRU4YrfSRhKCwpoKjEwh8CRlFBDSQCTKyBRTRnI/M1DuZUwiSIXKmHxIWQYgy0NIU/kZ6DMwWAoifcVhAuCt+85ibUfpt+bEBS0/fkErKFs/wcL8yTFmLzLncCUBMHOOntcTSwuUyr5qhaAjELGmwcSpBhSD4NO7ff+8TM63ygiuodM+IOX+GISkvgQhpx9HFQmInA7023hSG89e1SZTQRZe0i5UmcMOnNUjS4tQYxZh98ZWDkzNRN2ZDFQMoP68DUA65iBq0hNn9cDC/ShcD2kKj6Xv9lOqx/24Fct9HZSQdVGM1p+OipPr1EEFWQt4mTzhoJ6bf1hz8k5q1IFiNZq6T9WG7FLFQVtVceBWVRq4TZEkXscP3aPbuH49jnfEh1uU0nezhgE6Zx20cJqLmkkt4Plszr4qfbBBUR03ooIMAsh2AEhmi34FPnoAEggJgPQKBWScVwBIIGQsADIEH2OaLkBBS4Wgo6VhvwWQbDJH1Z8brsj7OnjAsaIHINsDHd/363bW24GQzICMJISm4m2tVOFmrNe13lTyQx/o/YFLlX/qsr28gPz/patXv9vr/NQ55ppiu845WKC9h0/4xekjBcU6eOKUGr8/VNdFmQLSwmfMgg14NBjJarMgw5INQj7F9tP6VezDynzsPXUYs1qTlu3WucsQSPd55z7vXA+4HnA94HrA9YDrAdcDrgdcD7ge+BF7wEHIH/HgOzD33X6wu+P3zY+fJ38ClNzzdLNSCGlhNAYh/WCaL0NIs19/VQkJnDQ7NvbPmL6fKnnKAUJpAJAehNzrQ8iRexTzLmq1t5jP1xSbLMpHUz96FQyV8ZSQBiGvBZBvcp7Zrj3wCDACPFpFvzFfUayVGs9XUuul6rPhhOYD+AxALs07r+E7C3XH2N1KHAqAHL5bySOAj1QpiAxCyGQgZAoQMg1wlj6RNG8DkUAxU0V6SkiAW6ka0kAfENIqAxBpisG0aflKxK7dE/XjymOkbx+5SLjKec09DHCk5h05z/264N23+WwvP3ZeY3JPq6GliJtqEGhXk9uoadARG3Mp+LTbDVYIOl67lt0v/z76EPII4BH4SnBO6vQCNWIW5AQCX7af/lwbSZ7OQQU5+dA5ZkQCKVE93jq/UPVJwq7F40lGhRnL/XhwUb7GoiRdXnRez35ySGGjduppLNsGWLtsLFTUx/tUh+NUH+hYdzIQEtt6PY5NbR5P0riDemjWIU1iJmSXjceU9XGOKg8g5XrIDsWhdrQKUAlU0tCdqj16r27lcdfm+Ed236xHp+zjugDIA5c0LfeC5u47pzGbi1Sr1xZVbo8V2xSQ7VajfsR+zezHOKBjbMtlXpkF269rAaT12jUA0uCjByCxXgfhYzzqR0u9rvRgV4U1ImDm9ndRPwIcvWqrincAHg0+3o4F+7Y2AMjWCr+1pX5V8w2FN3xHf31/otZsP+bBR3ttWcL0d0mZNoBZfPo88DFfuw8eV+6hE54Vew927EPHi5WDGvKtTh/rP6o/qBsSgYwASIOOFYCOYR6EtBUwaZVkEPIp/b+Yh1T/8baavGS7is5c8gCk3Y5733THwPWA6wHXA64HXA+4HnA94HrA9YDrgR+rBxyEdBDS/Sj9BfQAT7IHTO55unkQQgIfSyGkbX8VQvpzIEOhNE8q3NSRCU+glHxOMb1XKGUyoTQGIFFDJhFKk0ggTZwF0qB2DLy1VAECZ+INPAIcvVRrW0sVkMEZj57q0cCjX77yEfBo8JEy9WMUELIKADIK63Z7QNk8gN+sfWc8teFIAGT64G2q1menklDgGexKGb7LLxSRySgjk1FFJqOITP7YV0OaLdsDkQYhTRUZBJEhMBgCkp41GhWj2Z496zNKwwAQ7l3mPS7Ku4IdHHAGhJzD7MQ5wL65Vty32cGy0yuOnlPXjSc86GjWarOCe7djCswQiLSVsvmKocoot+2dVw5UGrD01JKAwPRpJJEDR1Ool9eWKBsAubmIMJrCy8pmFuQzS08wN/KEbmWGZUNmOdZCfZmO/TwKEPjYwjzNRUW6AIvv3TP3K3zYbsVP2Kt31xdrA+e//mmBqo7az8zHA2qIErIeINIAYn3AbArr7VMOqi2P7WFAZPTQfaoxKEfxgwCQg7Yp1golZOwAv+JRRAYG7FAaoLg+M0QzR+1TOLMf/7LgqD8TMgeovOesZjEz8oVxwMz26xT13mrFtvlU0VivY031aBDSrNdB+3Uc1muvTP1oNn8PPgIg6bkY0tRj3sa+j9rR1I/RJGBHs8bb+S9NU8VHegEfDSwCIBu960NIs1wbfPQAJNucb1UJQPmb+u8AIJvp981GafmG/SGmz8vqC1Kv//EvMPa6/NvVq8on6Xr3wWOeBdvmQBp8NDXkgWOFWr/zgO58uo3+tfJ9qpBkyddYr0Pw0Vt9AGkKSK+SeK2mPKl/rXaffv9qD505d9F77ftfMoxF/uP3113XHTvXA64HXA+4HnA94HrA9YDrAdcDrge+Sw84COl+kLkfpT/7HvDBg5GIe58tByFTffjoqSG/IYSM8CDks4rttRwIeUApQMgkoFISVuwkIGTMh9kAHwJBTAlJ2nV8EDz6adeARtKtvQoFz6B6DKkfyysgPfWjKSCpGq/PU+TL8/Ti2B2asfe0ZuSe0tKDpzR2N0nYI7arau9tShy0UwmDfcVdcghCeqrI3UryQOQeJY3KVRJqvCSbD8l9TSXVO515hgYhfRBZBgFD4M/mMaYD/TJQ/1klogZ8ZVUxAPIS0NGHjwYgZ2Mlns066+BZVmCaVwYmz2oBsyufX4ySEuhZ04OQB5Vl4LN8AR1D98NWU2hmAP4MRlqVAstyikl/VuRRICSzK1FE9tpzXttPfaaNBRe1teiSJnOf6vG3uoTqNKBqYodOA0LGEkBTF1XmsAOnNfPYWT224JBuHLBLlYfmKp3jYiE7n/A4nmF2ZDTAtiYK0lu4Xl2go6kiDdxmct6LK46r4fRDqjxsH+rHXMUP3gmA3A58BEAOoPoDIPttVUy/LShntyi691avEgHVNUftxdK/VfE9N6nHhiLNYMbmhB2nNW1HsdrM3qvq7daqamsAJMrHGFSPsZ7ykVAjDzyyGnhk29by8DEWyGhlANIH2gYg5wLGbR7kfFV7YaTC7mqnCrcQLmN1WxuFAyMjrAidiTRFpFdtgI+c5vzr6rylmk921ZhZm1RiikL+GXz8LspH+9A2knnl878p78RJ4CPgkRmQHnxkezeKyAP5hdq057AaPdnSB5CmcgxarsNRP4YDIEPlqyBDEPIJD0L+GxDyxde76czZC95tfZcvCu667oum6wHXA64HXA+4HnA94HrA9YDrAdcD30cPOAj5swdQ7oXyfbxQ/nfvowxC3udByMe+ZMP+NhAyMtFs2j6ETMWOnYoKMhkImUIlA7CiOqwC/gAhDUCiiCwPIb8CIAmcifMgpIFIv3wLNuAoCCCj3pinyq/OU+0PVmsIwSkzc09qDhBy6i7A2tBtiu61VQlArQSUdwkoIpOG7iCgZqcMRCaPsPIhZBJqyCTUkEnMhvQgJHDNh5A2HzIIIQ0KmjU7qEI05aIByDROp7OdgRIwadIRPbusUDMPX/TSow08hsoA5CxOz2QGo0HImdQMQOCCwwTnoPBrYPsmDMcDkSEA6Z1XBkLLg0iDkB6oDEFIbr+8bdvmRmYAH1MBjXeQuD2bQJqtKCANQq4nIKcVKdmZUwmSQQVZh1TrVFSccZOPKH78ITXfVKw5J05jwT6sClioqw7OUcyIvarLPnsRtDOPx/DAvGOqih3bQn7qMhcyi/uehioyZVyu/rzsqO6ae1hVR6N+5XoBVJQBjn08IDhuICDSFJBAxljgY0yfzUDrzYr5aJOiqRpUAoAyechuVey2UQ+O263xzJ8cQ7jQWKrvco4HKsnKpnxsjf3ag5Bmuw4qH9/xZz7a/Ec/ad1XP4b6ywOQXqI6EBv1YwzgO/qVqYp4oItuaNhCN1FhKCDDsFeH39oCENkSy7WFzjD30StTP76nCg1aqcrdHfRu/08AhWdMtOjBvO8KH+29xADkpSuf6WB+sQcgzX5tANJAZM6hfC+EZtu+o/rts+9iwX6IBGygI//RIMzmPZbCRwJoLITGs2Hb+U9ixX4StaQPIf+1+n36U5MQhPTfA/53v4+5zzL3/LkecD3gesD1gOsB1wOuB1wPuB74394DDkI6COmUkD/7HiiDkPeXQkjmQaYGZ0LaXMj/Vgn5hMyabXbsCCBkBJbQuF7LZBAyxSAkgCp1EhCSZOwa760AQgKMgJBx2Kd9BSSQyGzYpn40JaSnggQ6fi2E9OdARgMgfSv2XL06abem7CnW1N1FmpNzQi/PzlVEN4NZzB3sD/xCeZdoSkjmERqETLICRCahhkwyEEklMq8yETVkoqeG3IcaEqiGrdhTQxqIDJWnQvTViKmAt1ROWwK0XS5x3CHdR5DLpP3MgjT1IzXLCmhn8HFGcLVt7zRgcgbWcVNHvrT0mFIBtaaCtGCczNDt2Rq8zdL74J0H+GTNBEZ6SkiDkEEQ6dmxDUKizkxmTuVzK05oVeEVbTx+SWuYk2lW8EfnAx6nkMTNPMhaBNGkAiyrjz2gRxbkafLRs3pr3VGFDd6tqsDAuGF7FDtinxphtR6AInHW/jO6h9mRddl/iw35+sOsXD04l9vj2D0495A6bMkHOh9WdSBkPPM3E4btYv7jDgUAwvE8Jz6ABEL2AUL2MviIQhaVbNSHG1Wt+wbV6EH4DCrI6t05v+t6dVlJqjep2kPXnNAo7tf9/TepitmuDUSa4pGKt8TrUFnojNmvPdWjKR+D6kdTQFrgjCVeE0ZjNuwqfxilm5jpWKF+M4U1bIkKsqXCbgE+3vIOZWsLRQAjIzk/kvNuutnOb6UHXh2qzbkngvDRXkNYr7+n94rzF69oX14RlmuDjzb/sRD46EPIwwVFWrPtgG59+j39R/Sjikh7DgCJ6pE5j6Z4DIHH8qsPJ30IGZb0OIrJJ/QvVe/Vn14DQp45/73d7+/r8bv9uC/PrgdcD7gecD3gesD1gOsB1wOuB36ZPeAg5Pf0o9K9gH6ZL6D/Hc+7n9xrOq77f48dO/53/jzIr4OQBhuBjmUVgpCcZ3Zsgi9i+wAhpwEhAZDJqOPSsOomf7xHNVpjlfUAJADJkrC9GZAh8Fi2xgEgTf1oSkhfDWngqCyMJqSIrNp4nhJbLFbfdcc0ec9JIGSxhm9mDmK/zarYJVsJfbH7oqqLY/6gqSETCUFJHrbDh5BBEJmIIjIRCJlAWnYCasgErMAGIpPHB2dD2lxIrwCNrAYbbU3lcdljS8G2ncJlrRIBrQ2ZqTicZOd52LFnHTAA6UPIGfsNQp6Tv/oQcjowchpAb+aBMxq8vdi3M9tMxEkHPBBpMLIUQHogEvBoNmy2DT5+WQlpMNKfB1kGIY8oBRjZfGMJYTKXtPoYad15F9R3W4nqMcMyfeZxEr7zlUkFUHHWJfl6cE4xdUKxo3aTZE2AD8cjlVTzlAmH9ARBNZN5DLNRb943j1mTgNomawr0ztLD6rXrlJqvKlKTJcfVd1OeXluer3tn8tyP2qVolJBxQzj+NvsR+3UcCsg4FJBxAMjYnhsV++EGRXdfr6huzHrsulY1uqxRtS6rVR0AWQmV61Pjd2nCtpMavPq4Rq49qlcn7FD1lvQPIDIexaNXgMe4a8rSrz3lI/Ax1uAjykdbre+iX56myId76ob6zUm0fscHkA2AjgTLRDRorvAGzSjWhs08+Fjh5ma6vt5bSnjgfbUfskinzl2xl8x3tl2Xf4+w/Z2/dFl7jxZiuTYACXwEQu42CzYqyCMnirWDYJrbnuuofzMAmQ6ADEJIs2J74BEYaf9B4NoKKSENQoanPO5ByBebdMWOfZ5bde/P5Z8Ht+36wfWA6wHXA64HXA+4HnA94HrA9cCP0wMOQjoI6VQyP/se8EGKAZCHnm/xtRAyArhh9dVUbB9Ihpsa0iAk6bzxfVcwX5CEaYN0NicQy3Di0J2qYZbZEIQMKiF95WNQCRmcBenDR2AR4PHrIKQF01TCin1Pz7WasLtEE7A0mxLy9QX7deMHG1Sr90al9MPe238L9t8tsvATTw2JLdhs2aaGTBxuFYSQIwCQI1BCooYMACHjsRonjfHBYoDU7AQs2vGsgbHMjQQ2JnE6CTiXaJdhTbLLc71UZkq2W1+o+UDImYDHmSHwyPb0cjWNbQOQU/ed1RSbZbkP+/OCI0oYvQ/ICYQ08GnHLgQiTf1YrjwIGVJClqohbW4lIJIyu7gpIdOZW9l522mCegCQhOV8QlhO6w0lSprIHMoZBSR8H1fa9OOKGX9Ufyb5euLeIt0/fZ+qD9urLB5X1sf7lT4Ga/2Yg3p24XHNIlhnMvD0rrl5ih57kGMBlB19SDdPOKLbJ+XrfoJu2m8o1uR9JwGuxfpgZZ7unrAHFeQ2xfUzCLlZ8X02Kb73JsWhgDQAGdNjvWIAkNEAyCgAZI1Oq1Wt4ypVw75fpf1KpXVbqz4rj6OCPKEhK4/o/Tk5WLHLFJDxqB4tVCbOK8A18NEqltRrHzwCH1E9xgEj496Yqxp/GqsKzH68EahYAfDoldmw2fYAJMAxHGVkhIHIhk11Xa0mqCOb68nmo7RowyF7qfDPUq+/vw9m2+OFS1e0P89UjwYgUUICIXexbRDycEGxNu4+pD+3HacbMl4CPj7vQcgIgmjCU7BjU97oBO8/EoQgpCmUyyoMK3ZY0mNBCHmPSiHkz/497vt7ntyXUXcsXQ+4HnA94HrA9YDrAdcDrgdcD/xwPeAgpPtx5iDkz74HyiDko39spd/EPwqk+Kod+xtByMQnVDHxaWzQa5QxExCGYi/NwBlqvPje2G0tDbspScYGIlFC+jbsLwNIXwEZApBla0gJGU0itlX11y3deLGaz9ijKTklGrO9SKO3F+rtRQfU5pMDmrY9T/eP3alKproDRAZMDTl4q6eGNEVkIiDSwGgiVmGzCydgzU5ECRkLjIwflqtbue93ouC8G5h6/8zDunvqQd0zFRvsRCAkoDLGoCWJ2gmAR6/Myo2lO35Yju7hehP3+XbsaQA7g4/TsF0beJzKOtWDjwYgz2gKNXkvasj9p9SduZbJgL9kgnzSLBjHlJel6strIKQBSA9CmioyaMv21JF+gI4F1tjMylqEzAzKOa3leee0zNK6sYA/uiDfg44pU/MBlQXMsjymrImH1WZ9vh6emqvo4djCgY8WEJMFgMwcdxCF6H7dM/2wxu07r3EHzuu3c/KAsvwNNWTmOO4ridZpI/cpdeQB5j/uVeaQPfr9jMMaurVInxwqUfdVgMohKFP7EDjTFxDZK1txPTcotsc6xXRfqxjgY3Tn1YrqtEpRHVeq+gefqlp7K7bbLtdLE3I0fvNJDV97TL2XEd7TYQWBMos8+BgPcIwHOMZ5Kscy8BgHeIwFOsYYgMSCXeNPHyv8vk7MfTRbdXNv/mOFBqggUTyGmRqS88LqN/UqAhB5A/DxX1JeUsM/fKSFa/bq0mdXjRWa9/p7fV+0XZ4mpXovAHLvEb9yWHcDIHeifDyEAnLSoo3KfLyLrmtAQjfzKiPS/6DIVMAjEDLCVi/N3lTKfpWHj/42ADKZSrSZr4/rX6veoz97MyGdEtJ9ifx++9kdT3c8XQ+4HnA94HrA9YDrAdcDrgf+0R5wEPJ7/rH5jz4R7nruRfzD9QAQkj63f4/+oYUPIc2KbenYofLmQv7PSsgIVJCVmAuZ3G81Nl/swUCxdCoDKBfTZa2iTf1oELKpPxOyDEICIt9kbh/lh9AAkjwV5JchpJ1nCsgoIGSVJgtUF0jVf80RjQM+jtxaqBGbCzSW7YWo+VbuL9I7S46oOpZsTwmJGjJhkIHI7UpgPmEilTCE1GyvDELuUfTQHDUAAL6zMl+9NxdSReq/pUiDthVr4OZiDd1WqKHsv8v6Av1uGhZsC1wJqicTgZJJHsDMYf5hjloyv3AOqkEDjgYipxh4pAw6hsCjt40K0iDklL2n9HHOSd0z45BiTVEJhEwDQFqlTzQLeBBCBlcPQIZAZHD1U7XNpu1bttOZB3nzzKMamXNKnx47p0+ZBzmR288at1dRgMW0KXk8N8d5jo5hnT6sh6egCh26SynAxJooOrMAq1nclyzUnqYOvQ0IO/bgRU06clH3zM5TDJdLQ7mZyuNOG5mrlOE5Sh7KjE3mSCYMwILdbxfW+B3688z9mpxbSMBMvh4Zt5MQGsAwYTTxKCBjUUDGdgVEdl5DASEBkFEfAB55bqu+v1zV2rK2WaYHB27SiI1FGgkoHbzmqO7pjVoSsBiPutEAZLwByFBxvgHIGJKvY4CQsa/NVJUn+nizH28COpaqH4GOFcqVAcjwIIT8j7RXFX3Xe+r18afKKzzjvT7s/36I1+FJEqptBqQHII8WKRc7ds6RE6ggAZAoIMfOX6+4+9rq1w3fVYW7uxCYQzJ32u9VEfgYCYSMLB2dEIKQZerHEIAMNwBphR27FEK6dOwf5Pn8IXrE7dN9B3A94HrA9YDrAdcDrgdcD7ge+CX0gIOQDkK6H2m/gB6wRF/799wr7YGQj/jKqhCAtPUbQsjwpKdVKfC4ErotUk2UkDUJdjFbcdpoAB9qtpi3DEKaCjIIIVEyxobKA5AGIm0epA8hY4GNZskOnY4hFduSsWtwmUqvLdTvCCgZu71AIzefYBZkoYYDDEcz73D8DrNmn9TYXaf1yIRcRfXZqLjBgK/BqPBIyY5HCekFpQw2EElYCuAtZvAu3U+Yzoe2L2DjYKCmwcdB2wxCUsxstHUINQLV5cidhWoLDLuFWZKJgLcEQFwiasp4QGbMoF26Hev2uD3MhgREWpDL9P2nUUOeBkD6NYl1kgckbT2tCcDIKftOqTEBNQYhbcakBdVYOI4HI5nJ6CsjgZEcUy+UBiD5FRiJKjLDCjCZzN/vmHtUE5g5ueToGeZBntNY0sMTR+QoCmVjFhAyExv2zQTU3MYcylSCY9KAsZlWQMUs0sKtMsyiznkNCBoyJeSUQxd0/+wjqspjTeL8ZFuHkDYOfEweTOjPAAKAqMS+2K/7kFLec4tqk4jdN/uY5h0s1H/O3MksyC3MgUQJ2XWNYpn/GGsQEhVkdAcgpKkf31+hau8tV1XCjCq1WqZbUEz2Aw4PW5uv4evz9MyQDar2+jxfAfm2r3SMozdM8WiW6zgAZOwbc1TjL2MVfn8XVI+EzjRs5RchM6aALAWQWK8tmCa83tuoH1/XjTVf0x9bjdZeLNFXr/qA/of4wL969QsVn7ngKSA9CAmIzAVC7vEgZAEzIEs0eh6g9p52ANR2CieNu8JvOxGU854qMgsyMu2Zr0JIG5tQzoJdHkIaiAwvtWPfq7+82VNnUWDavx/i8bl9ui/KrgdcD7gecD3gesD1gOsB1wOuB1wPfJsecBDyFwCgvk1DuMv+PN9AQhDy7Xb9dX3MQ0DIYDJ2CESWh5BByFEWTMNMyBSUVyTuRiQ/o4oE21R6ZRjhLjlKwd6cYbMTCYeJboH92iCkp4Y0GGnb5SBkcB5kSA0ZmgsZApC2xgCYQhAy6u2lemvKHtR1JzRi03FUkKwGEAGRI7EAjwYgjgcmDkfN+OAEUp77Z6sqELI6tuwazCeMJagmgCoynooesBNl4wH131qsIVtPoH48oQFbCjXQqxOsdrp8FWoIp0ftKOT8Aj05Yz8wcxdWbGYfAiRjBwLkBu3WC3MPq9v64xrG/Zi6p4SQmlOaDRCcfeC0ZgMlZ7HOOAicZHsiEHIa9eGmYqzR7I/jZgCyVBFpSd0hVaTNiTQQGYSRXoBNUA0Z2jYQmch1Hl4E+Mu/qMUkXi+hJgM+63D9OGY81gJS1pl4RHXYzkTFmMn9z8KKnoW6syYQsibwsSbPYU3mXaZwXj0UlOMPXtDMY1f0CDMhK6P4TOA6BiATgbhJAwGQgMzEAahNscEnMQMykTWxN3M5PyKEpusmNZ6biyWcWZErDqhWP/qCBGxTQsZ2BEYyBzL6A+zY7cyC7UPIau+uUGUgZB3s2j2WHNaIDTzX1F9GbVa1JtitPav1XMWTlu4Vp22NazxN1Z8ZpLDb2yrs1tZ+kWodBoi0FOwws2F78LG5wuo1029qv6VfZzZRnSe7a/KCrfr8b2a95vUOoDel8Pf53mf7tf3nnzyjXGzX+/KKte9YMTASNaQVEDKvqEQjZjMv874OCruzoyrf20URv/1AEXd3UuRt76piOgpID0KaGjKUZG9qZX9G65dBJPDRAOQ1EPI/m/Z2EPJ7fm6/zz5x+/p+X3fueLrj6XrA9YDrAdcDrgdcD7ge+On3gIOQ7gfK9/rj273of5ov+hCEbN15KBDyQaBGMOQiBCE9NWTQjn0thDTowXnh3vosEPIx3fRoR1X5CJUbVugAarhYEo6jPMhYDjyWAkizYPtlANKrN/x07FhbUUOGygCkWbGrv75AiS2Xq/uSA/p483EN30htKvDLU0UajMSezYzFsUDC0YDFx5l1GIvi0cJokkjIjgU+1kAFGTdohx6YtE8DUD4OBSz25/pWA9ifV1i8+1vZaVYr7+/sfwD7H7GN/e8q1quLCYEZzFxJKoAKMI7HXe2jzYrqtVWZAMnfogZ9CtDZhPCZzuuwFLOf7usK1IQU6dHYpSflYsvOPaORO07qbqzR0YTf+ErIoBrSIGQpiCwHIUMw0mzawe3QHMlElJQPzs/TzKMXteDQWX1y5Jwmcls3W5L3aCAgf89i7mPNkViumWVZExCZhbLRtmsbgGTGpQchAZJppvTkeHXIPgmIvKRHZh1R5EAeq4FIlJ+JAMiE/sza7L9NCcDFQB/s71TAbNcAyAAzIGN7AII7rtcjo7drOpb5Ydvy1YjnIhl7dgw9EsMcyOh2zHrEgl3drNioIKu2Xq5KLZYpA4Vk50UHUUHmAyHz9fLHm1W18RzFNJmt2NdnKf71OUoAPibYDMg/jVPlB7sr/Lb3FEGFA+3MwhxuMBIIGU4ATVg9Zj+ifLyp9hv699RXVenWFnqp/UQVFJ/1lYEGH6nv+z3Ldm4A8ljRGU/xuD+vBADp115vu0j5Jac0axVq0Ue66qY7O6jKfd1V0eDjPR1V8d7OimwEhDQAmfa091qN5PVp5c1tLZdc/xUVZBBC+nbse/VSsz46d94pIb/v59jt76f5OeeeF/e8uB5wPeB6wPWA6wHXA64Hfvo94CCkg5Df+49w98L/6b3wQxDyvW4jdH3sg19VQhrkMPhIhVZPceWBRx9C2ulIEnpNCRnx0Aeq8eFmAkc2KaY9NtsWS1FBAhqxXvvqR7avgZClABKrtVmyPVt2OQgZA3w0CBnNeVVfW6Cstis1iHmQozblaygQclh2ORAJMBwKSDSoaOvHtm4tUZtVBWq/6jiJzflqsiRf9cbs0b0T92ggykmb99jPIGMQPvZHXRmCj/04zyCkd15om/32wwJu17Hb+XhHsdotR1VolmwsyInAt+Tem5UCiEvsuVmBHpuBcFjCOS5J/L0W0C65H6AJQNl76ymNB0COyznrpXw/Pf+oqhEMk0zgS+p41JDB8qzZIRhZbs1g2ysgpAFIu1w6MyUTgI13zzmiKYcvaCG28IVAyPF7Tqk+jzswYi82awolY01TPmKprsmMy1pYtQ1G1gJA1gKc1kIJWYfKBEpW6btJz3HfJhy6rOcX5AEhUX8adDUACXg1+JgAeDb4mMhjT+AYBHpmKwCEjPtwowIkYcezVumwVo0GbdYgAPKwbXl6ccpOZXRZh/rxU1SQyxWFDbv6e8tUrQ2FCrJS8yVKY05kh4UHNcwg5MZ8NR631YOQUY1nMvNxhgcfAy9PU42nBynyLhSDwMeKt7dTRKO2bLdRxC2tKUBkA0JdmAMZTvDM9TWb6NdZTfTbF/to4qKtuvK5P5bgh4CP9r5n/z77/G+oHE8DIItIwi4HIFFC7jtWpOOnmB26cqeyXuir39z5gao80EOV7uuqSsDHSvd08hSRFW9rBYDktZj6FHMhUR+Xvj7LVJARIeXjtWvIjl0FO/bbvZwS0n3Gu8941wOuB1wPuB5wPeB6wPWA6wHXAz+ZHnAQ0jXjT6YZHbz84eBlCEK+332kfhP7sCLSLHW3LJzGU1phyTYAWQYhfSjpw0jfBmqp2pHxD6vK490U3xPA9sE6RQGQYt8wpaOpGhcSHhLcZo2xCqkfy63RBiGBjuXLErFrMAMwChBZiWTsRj02oIjLQwV5TMOAkEOBkMM2FgAjgYKhQqk4ZBPzHYGFQ7FlG4gcvv2kb9XedVJ/mrVfjecf0JjdxerL5fplAxa5bqj6sv33yv7eF0jZh7UPULKPdzuE4qCKrINasMaHW5TSe6uSmHuY0otC6WdrMrbkJNYA6sh4ytaE/jv1IYEr40iw/ni3DyFfXHRUVQiGSRiDlZ0yGJlMEnUKq1+E4mDXDlWaWbetgI5+AS8J2Akwl/I2VJUTD19kNuUFzT6IEhLFZd0ROxSNejEd1WMGSsZMAGQm8xwzCenJGr4LKLlLdUj+rgukrM/9qD8mV6lYriM55ndN3qvZ+VfUdkORKmFjrzEAEMkaQAUZIPnaFJCe8hEVaLwByA+zCaCx2giE3aA45kDGdNugSh8QVNRxrZrM3ccMz3x1+OSQGny4TpVbLFENg4+tl6hqyyWqxulKAOskZkS+v+CAhqw/puHZ+XplzBZVepWZj6/MUuwrU7FeD8aq3EHhqAQjb3/fq4pYsc26HIEKMgIVpIHISA9GttK/pDZRyqPdNXrOJp06d8UDhD/kewwObJ2/9JkOHC/RHkvAxoK91wOPZsMGQGLDLjx9Vv1mrFG1BzrqBrNg399dle/rFqwuqnJvJ1W9t6sq39ICAPlEEEKGXpf2HwNCENJGI4Ts16H1cezYVNLvCKh5TP+XdOx3u4/Rlc8+d+/x7nPe9YDrAdcDrgdcD7gecD3gesD1gOuBn0QPOAjpGvEn0Yg/JBxw+/4vz3ZqFKZdD5SQcY+gsvr9VyFkUG31VQhZBiM9CBn3oKo82Uvx3XYopuUKQCLQkSTrmNfnY5210JCg1dqDkd8CQnL9GswArIEVO7LJIj03aqfGbsoDSuVpKDMCTQ1ZugIjh1gBCT0ICWAcsKlIvame2cXqRfXYUKi7J+bq1UVHNIwgmz4ASA84cr3Q2oftPuzXK26jT/kKnc/aGwBqSsnhKPvqAyGrowBNQv2Y9KGtlKkf7TRgLtEKEJkAkEwAVNbouVWtVh7XmJwzGrHjtMZix35tyTFVIxAmAABMHuMDSA9CGogMVqqpJM2yDXwsK5KqgY8pwMdU5jcGxuzVzdMOenMcZx04p5nUpD0nddvoHYoitToD+JiBkjEdNWb6oJ2ARoJpAJH1med5G9e/i301Gr9X6YTK2P2tCkxMI2F8NMB0IPczCit7VfYT19/s52a930rqNbMfUTtGAxrjuLxBx1i2Y7sRDtQdEMl2dNe1qkGFdVinsLZr9Mq0vXpr0i61XrhXd5J6HYP9ugrwsUqzRarSdKEqAqVTmBHZFmA8aG0eoDlPb0zerqovTVGVpwar4gOWGA1kRPEYaeCRqni7KSHfA0KGAGRLRXKZG1FB/rrW23qlw0zlHCr24KM3+/EHfq+/cPkz7cd2XR5AGoTcy3n7UUCeOHVWPSasUMU739dNd3VUpQdCAJIVGFnl/q6qek8XVbu3h6re0kyRAMXI1CdRQdp/GDAVcghC+gDSg5BJAEgrz4ZdDkImPap/qXq3Rk5aHISv37/t3L2v/nD/0cgdW3dsXQ+4HnA94HrA9YDrAdcDrgd+rj3gIOQP/MP059o47nH973pT/OIL3yr6buchuj7+IUUSelFeCRlhAJL6sh07BB9Dq4XTPKNKXL/K77optgN2bMJjYl4nfOa1+dQ8xTQmsbgURAIn/64ScqGuVUKaCtKbB+kpIRcogn39YdQ2jd+cryHrgJCEvwxhTuAQg5GUAcih1GArQOQglIoDqV4bC9V9Q5E+2lSiD9adUN0xu/XGJ0c0lOTr3qZqLAcWbbt3+WK/vcuVAUnvdPAyfbmtYVjDGw5hFmS3bCUA4BINQlKJPfwyEGnWbAORZlVOAEZWx6L9yJT9GryDeZCoNMej0DTbeAxKxHhSspPNlg149CEk6kcPQgIeSwFkEEZyOg1omAqA9CDkWFNS7lPtyQc0ev95D0BOI5Rmau5JPTRxt6IJjfEh5C5PDZkMSIxFyVgTGPnwpP16eto+PTAxR8lYsGNRMcbxOKK571Gs7YCmUwjYqT8uV5WBkLH9tnsQMg4LdjwQMobLR1nYTBA6GnyM6wqUpGK6rfcAZDXs1xXbE0LTeT1hNNmq3mK1HhiUrccHrtO9H61TjeaLFQF8rPgWBcTOYkZkh0UHNHTdUY3cdExP9pinG7En39SwtcKZ8+ipHVFBRpgSspEPICuyRqKCNPtyOOrB39Rrrrq/76UJBM9c+cyCZ374VGgLtTl7/pIXPGMhNJZ+nQt89AoF5P5834LdadQnJHe39GZAVgQ2ViSIxlNBmhoSIFmVuZA17ukGhOR0/deAkI/6akgPQAIePRVkOQDpgcdrIGRSUAmJGtIg5KjJi/4px8B9Hvzv+jxwz5d7vlwPuB5wPeB6wPWA6wHXA64HfqwecBDSQUinhPwF9ICBEvs3dNxcVUh4pDR51+BjqL4eQpoCCxCJIssgZEXs2JF3NFONd9d6EDL6NdSOjYGQjYGQrxIaYgVUCoXR2Frekm0A0isPPBp8DAJIbNhmx67BGgbUfHrEVo0DQg5GGReCkIOZF2ggcrBVEEIOYh0IYOyP0rEHELILELIbSsj3gZANRu9U00+OatC2IgBlOahogJHTdl4vtnsBOUtX2+Z2egE9y+q4+nLZIdnHdDMJ3FW7Mv8Q8JZA8rPBSK/YNiiZgCoyAXVkgoFIbNpRzIrMIjDnwy2nCdAp0bjtJWoN5ItBCRkXhJCeJRtFZArW7BRgY6g8EGkw0isfQBqE9EGkqSj3KQMY2W/naU3fzzxIQmmm7D2ll1AUxvbdrFQSrdOxWadjxbY5llVQK97B/MfGcw/o5QX7lN5/k6p2AR5iqTZloyVZV+q8UU9jyZ556Iz+MP+QKqHmjAJoxmDDjgVAxn2UzSxQIGRnQKIlXtv1TQXJMYnpyNzHDmtUmarWfqWeH5+t3w1br1/9dY7+9cVZ2K8/VRWUsw8OyNYdPVepEiEzFZvMVfjLM9Www1L1X7lfnWZv1T0txusmAOMNt5ByfYsBRkCkp4QMqiEBkRWpSrcDJfn7DfXfUeD+9mrT/xOVnLkUBG8/rPqPN05dJdim5OwFwGOhp4A0ALkH27VVjpeI7QPItsMW6sZ67+iG29sr/G6CZ7wQGuZAmhUbAFn5/g9VHRt2jYd7KP4vo1Tl9jcVkcTrLBU1JKn0VhFeOn15CGnAMVieDTu4nYgdO6iEHDZ+QfBYuC9ZP9aXLHe7rvdcD7gecD3gesD1gOsB1wOuB1wPlPWAg5C/AADlGr6s4X+pxyKkhNyZe0hVMwwoWvKuPxPSmwcZUkJ61s+Q8jG0Bm2gKLEMQoYHHlHlhq8oqtU64OISRRMiE1MeQJaCSMCkZ83+thBygcKaLNQzI7ZpHHZsg5BDgIIGIL0CGg6iBloBBgcAIa36AyJ7AiK7b8KKjS27E0DyYZR+rZcfJRkbdSSX7Q1Y9MugY74+Yh8f2cq+y4rzgqcNRvrbPsAcyHzKegO3qArgLR5oFwC++TASIGkwEphnq81JDAAiAygLo4GQqYO2q9smZlUCIcdsK1HzFUBIYGA8INKUkD6ERBFpEDJY5QFkmkFIgGMIQPoQMhdYuVdJhMu03VCsKaghx+w+pQk5J/XB2nxCcVBpEiZjsyDTgJHVgaMGGJ+aflBtVx7VE9N2qxLKRUu0tsdidmqzUlftslENhmzXKOZoduZ4JmHfrkYSeDQqSk8JCYQ0YFmt01pV+2CNogihiWL2o63V261W1fdXKazVCmV9uJbn54AadF+h//PHGfrVH6fqNy/PUmSzT5T07hI9PwZI+858VfjLNEW+NFPPDNqgbjM3Ku3ZPrru5jYKAzpWuLUVENJAZEtAJHUroTOcZxZsg5BhDVqpErDy0bfH6NPswx5wM+v1F1ev/qD/ccW7DQBk4enzygFAhhSQIQBp695jhSoghGbYnI264WZUmre8z0xLAORvO1KWhN1FkUDISvf1VLV7uqv6Iz05Lguwz+9Upft5rAlASMBjRQ9C+jDSLNh+lQOQIRDprY8p3CBk4qP6P1Xu0eAxcx2EdJ/xP+hr4Zf6meoet/te5XrA9YDrAdcDrgdcD7ge+Md6wEFI9wPF/UD5BfRAKJhmx55DqpwFXCSYJtIqCB9Dq6d4DKZkl22Xh5BPKyzwqKrf8pqiW2OzJUAm9lUg5CuoIF9BARmql+cq2lNEAiJRPobSsENr9JtBBaStwYpiNRVkdS5fAQj5xNAtGrXusPqvRskIDBy47pgGrj2mQevyNYDTA1AsDtgAfFxv8yHZZm7jB6sIQFl7XB3WHKOOqtni/eqBndsCZj7k8h9x3fLVk9N+HfPWD7mNnteUnfcht/sRt9OfoJw6qAerdFqneOzIga7rWf0KMBsxgE3ZoGS8lQcjsS4zPzJr8A71yC7RiM3FHohsjR07HggZoJI9NeQ+YKRfKeVW2061MgDJ/Me0YNl2ioXJsAaAkC8sztP4vec1etcpjdxRpMEoP+8ZswP141ZUkHuYBZmjil2xXQMaWyw/rs6A3ax+2aqGetECZTwbNUAymsdS3VSeQNT3VpC6feisnpixXxWxlUcxM9KUkDE9N6gGVutqqB2rtlvlQcdqBh/fW6Uq761kXamwd5apYb+N6rBkr2JbL9W//XGmrn9hsn79wgRVeHWmIl+bq7pdVqpO19UKvD5TGY2n69bXxyiR1HVTNhpk9KAjFuvwhs0V0aA5qdfNFdbwHYJnAHTYmn+d+YZqP/WRZq/YTer1P8d6bV807N/nf7uq/JIzvvoRC7YlYVvlWB3Bjn30hPL4e+fRS1Thtta6oVF7Rfy2s8Lv7KRwW4GR4dixI+4FQt7dRVUf/lCJ7ZYqaTgp5P03MzeyGRDyd1iymQkJePTmQ6J2jAjVl8BjCEgCIC0Z24OQj2DH/q0GjZ5lfnT3Hv/PPgYA6v/6ry+8Wbz23vv1dZW/BQtwbvDcq79znV/Cl1zXq+61+kvoc/cYf4F9zkikr/8c+O8+I0J/s+v7+3D98wvsn3/2dxh3e+578z+hBxyE/CccZPeB4T4wfuweCCkhN27LRV0F3CCYpqIHIVFElgORZeAxpIK0NQQhmT8HoDQ4Uq3eXxX9zqeKbozt+lUCaTwIWQ5EGoS0MoUkQTPXgshSS/bfgZDVOC8MO/d9QLLBqw6q9/LDHnwcADgbAAw0GDkAeNh/HWExgMVBpCn3Irzmmcm5qkWSc+2BO1i3qyYzEG9Gxdd86VH13QyE9IAjMJF99AyWwcW/X3mc71cPLtMdqPkRt9cHsJnVa6Mqk/wc12Wt4oFxBiO9lVmI8YBIUxV6axBEVmd+ZP1hu9RzY7GGotIctbVYLT8tUGBkDhWCkFirRwMhg5XCagCyFEJ6MHIvQDJYIQhpCduAzDum7teInLMaRZjM4O1FGkG9sfiQAh9tIogGxeTgHIV12qgM5lT2RDXZZtlhRZmNGvu1Bct4ELILUJnHE92V+Y2AyOem79PUvafVnsdfAyt2FZsXCVitbqCyMwCyw2pVAUJWbruS8gFklXdXqEqrZSRgL1d657V6axbzKNst17/9YZquf36Sfv38eN3wx4mq9Mpspbb8RI2AkFkvjVHMgwSz3PEesLGFKgPtPNDY4B0PPkY0AMjVf1vhNzdTRMMWurHuW7qu5pt6oeV47dhX4EFB+79/xmvMFJBmwT5WfMazYO8FOnoW7KAdezdAcveR4zpSfEpdxi4nQOc9XX8LjysEIO/sojDbpsKY/xgJlKx4b2cltZyvBCzvcQO3EmqEJb7RWyiOmQkJhPQB5GPeGgF8DFWpFbsUSAYhJPMgbww8pF9H36sZ81Z4x8eA2D/j+Pwyb8N+JF7VVQCilf3Q9I/3F6W9+d036Lty+/dv48f/XPV+VF/9gvt2bZUdj9D9/qarD2L9H96/zH768Z9Xd9zdc+B64Lv3QHnoaJ8JfDCUFd8l7PvEN67Qde065X+3ev/B6rvfV/d8u2PoesD1wD+7BxyELP9m7rbdD9WfaQ+EZkIeBJAE6j8HTHxWlQCRkWbL9qosmOarINKHkF4Cb/JTzJt7XFUynlF11GwxKBY9APkysNErzgM+WnkQ8pU5irHQGmzZngqSEBJbyyCkbftqyJAS0iBkBODy5m7r1HvpAfVFkdd/dZ76r8lTP6o/ELI/duN+KB4HsnZfdVR3DyfFmXmENTqj0utEdVyPRZiAlI4b1GDgNoJW8rBf53mqSIOOBiFD8NEgY2mx/x5ecV5wuztrt9UGIbmtT48opfs6Vf1gtQch4wBtIRgZB8CLMxAZhJBxwbVKp/W6b2wuaswiDaKGby5Sk0+OKWZ4jhIMQo6ycBqzVZeHkCgdDUSikvRBZDkAGQSRKQTbpNj1qPSxe9Up+6TG7CLVGsg5EOjaM7tQt6CsSxywG1t2jm7ouFG3D9uuIYTj/HnmXkAiyk0gpGfFBizGACVjWKOwY1ftskkNAafDSRUfm1uiO8btUiSwsgpgtRrQtRqzIKt+AHh8fyXqx09V+V2qjQ8go4GQye0Bs62X67mR2Xpk0FoUkJN03TPjdf2zHysCEJnwynQlvzha0Y/0UpW7PlDl299nDuJ7HoCshPqxIopHUz9GNGiqCBFyIx4AAEAASURBVA9ANlXYzW/rVxmNVe3udho8NVunz13x2c4/8TVrsOXEyXMegNxnlmvKnwd5QrsPn0AFWaD9x4v0/pAFgMQ2qtDofUXehfrxjo5UJ4UBHX0IiRX7LlNDdlN8s9lKIvDHUscD/bd580Qjbmmi8HhS7EMQMulaCBkCjrZ+WQkZAYS8LuZ+XqcPa8OWHO8Y/bO/WPzcb6/sxyW2/+APydBjNth24dJlXbx0Rbn787Rs1Xat37xHy1ZuUe9hM9W84zC93W6Q3mo3UG+/P0DNWN9pP0gtOgxW687D1K77KPUaNEVbtu9VQQEzRemnkpNnSlU0djuhf7Ydui+h2/+xVvuM8ZQ6tparb3t/vB/q1/7QZn//P3tnAR/F9b399/N/3//vVxco8ZAQ2Y3iroVCixSnFEpb2gJtobgnaHApFK1Bcajg7i6lRYq7BEiA4K5tn/c5987sTgwrRScfDufO7OzuzJ079t3nnHO3n2Mv/2j0mQlMzHGatjfUwGkogNNa/m8F+h+N7XuixxmVd3+nMv7IouaJNy2t5VLMe9KPYbNPFGzUwNEcG39y22/Sjl+6iYPnryPp8k1sO3VVRZpMi7+A6fHnMZVRJ5NpEn0i82YcYrFB2iTawsQr2Hf+BuL53t1nruEci+5d5b3ITflOfq46Z0r/WveHTNtm94E9Buwx8AiPARtCPsI7x76A2BfR+zUGzAfEK5evonD5hngt8l34s0K2FUKqAjXWUGwCR5cKkjDEm+ZF84h6F5kJOrJ8PpX5IAkV0wCQGkLOIoikSYg2K2Y7WIDGoYCjFUIa4dh8zYSQQVzGj2HeWQm3es5h0RVCyG8I/wavoKKRwPBr2pA1DL9mmPXA1YdQZvgmBHRlkRxCSAfBo3gnvZM+TOYRiJUbsV1BxP4Eil8KdKSy0TSBjKmM0LMv7UvD915FCMnlYubvRxABZAirPjulKAvzIobRxDsVkOR3E0Y6CfOcVBaG0Qd0X4tPpx/EkN+PY8jaJIaQH8cnc+IRNHwHokYZEJKwUUNIUURqc0FITpsKyBwKQDIM2/AaRBJejt7NIjJHMHrbOQLIk1R+8nv+OIHP5xxmCPUfCBu6A17d1+MjVsT+gSrJN3/YwerWWgEpKkhZVykwIyBSIGRQLwKxLzei++rj+HnnKbRaegg+3BZPFqMJpPl3XQ1/qiADmP8xc4cV8G/PgjOxyxFCGBnefjmyNF8Er09noGDn+fh0zO/wrTcJr7w7AZ61xsBRexQcVb9iyHE3VrnuQlgXpwrM+L/RHv7FY+H3OkOuJQS7SCulgPQq1AIZ8zaFR55GqNliFLbHn1KwQxQE9+v4uJPPuUm4dOzUeYLHJOwnfNybIBBSqmEnYScB5K7DxwgiE9Hiy4lUbcZQBdmFSsfu8CnVXUFIL4GQBI9ebxFAEkZKTsiwNnNYSV2K/TAsnj6CVcjDWWndq2gjQkjmhIxmKDYho69ASJqPxVToNae1J4iMMtvvEEK+zdDtKli/eY8NIe/jNV6rVqRL/2b19Rusin4ZhxKOY+Xv2zFswkJ0G/gz6rQYgNzlmiFH6cY8x9ZCBuc7yBhRHRkc1fBySGW8EFQRLwSLVcKL0g4qjxeyvI0XAmlZ2KZ/ma95Z+cPRXk+ZPqM95GtVCN83KwfGsQOwQ8/L8CK37Zg557DOHv+oloP93ppPHkn4/mfLiPf9Nv6beg1cAI69xuHDn1Go33vkfSj0KnvGG1fjkVcP21d+o9D16/Go9uACejO9/QYNAG9Bv+E3kN+xpdDf0H/byZh0LBpGDxsKr4ihN26U+d4/afrab//wZ4nk/f3X4TxV3Hx0hVcoGl/WXlznsy/cOkyLvBYstr5i5dw/oK2c/TKWARMxvyZsxdw8fIVBeCTf9/D3NYn47vlXvFWfWreS8oPDn+mYzps2P2jhHye/mGCZ6rbfP7j9Do3ihskinftrxMMXrjxFxIJGXecu465iVfRa9sFNN94Dp/8dgYlFp1CgbknUWTBSeSZnYTwmUcRNesYss46iuz0OWk5Zh9D9jnHkWNuEo05uWm5FpxA4UUnkX/hSeSjr7TqFN779TTa/HGBkPIS1hy/ggQCzkv87htcB3ayXi/lb70/H6f+ttfV3pf2GHiyxoANIZ+gC6J9cD5ZB+f93Z9yT/I3b/KvoODbjZCRENKPEFIK1JjVsZNBSAGQBnj0lnBs1X6XEPJdeEbXQCAhZPCnExHCfJDO+qJ8FCWkqYKk+lHgo1h97R0N+boBIrXy0QSRlpyQBJE6JyRVZFRLOmIWo93UnUoJ+c2qI+gwg6Bt3GaqEQ/jewLBwQSQ1UZvhn/nNXB0I/gjiHSyOIqT0M9BEx8m04SQkYSSjWfsZ9g2Q6sZZi3h1V9S3Si+Lz9LmQEcBT6a1psqy5787h4rqYLk8h//sgO+8n0CIXvSKxApMJJGCOmghRJIOgRE9qISk+uQlerBzosJUancHLJWQGQiakzfj5AfdiKa8FApIQU8iiLSBSDdSsjsAiENy6F8SghJgMn3Fv5xDwvynMKILWcx5A+CSBaV6bn2FAoN34bMfTcic59NaLOA+TW38kb2u50Mwyb4olpTFJtWCBlKhaSDBWyCe25Arcn7MXbbSYxgkZr8P2zCqyxE40sI60sA6UsA6d+RodgdmAey/UqEsvJ1aKuFCGDxGR8WofGozfHBXI91R65HdJMZ8KwxHgHvDYc/Q5F9S8TBrxQhHRWQUljGnzkg/VlwRkFIAkhfhmBLGLZnweZUP36BsDdjMXba77hBBYD8PUgljDxfXGfOycSTZ7GX0PFA4knsSzjphpBUP+45cky99kXXcciUn6HjhKu+pZgHkuZdshshJEHkmz2ohOS2E0b6lf8SjhbTleox/Cvm4KSFs5BR+JBNcFKd6lmowV1CSAJIQkgvBSWr4RVnBXhEVsFqwjHVX/Z17p4eflXnGf+JIuvE6fPYvucQpsxZSdXiaFT6qBNCinyCFxyVWAioHJ7xK4vnAyvg1bAqtKrqBxv54caL50yv6Jo8d1JJnpV5dZVJm+kt0jL+GCTv82QOUE+eczNGvqPg5XMEls8HV8DzQRXgxSJhpd9rh9huw/HL9CXYviseZ85dsK4y2/f/mihfIH0hf90HjMN/MhXD/3qVxH9838J/acr7lcGzfqXZH6XxrD/bYpnL4LnMZfFcAL0yttV0OU6/jecDuG0B7EevMnjZ5y18O3a++g75rvt7Lbz/fWKvX+o+lZ33N3+46TlkAt6r3wO1vuiNmvW7o8bn3ZRX7frd1PS7n3XFu591wTufxqFavc6oVrcTqnzSgcdXO5T/MAZl32+LsrViUOY9tmvFolDFxogbMB4XLlxWY8Tu/9T9fy99spdquwnxlzEz8RpmJVzBbEI002R6xpErmELoNSn+En4+eAk/HryIHw9cxIT9F/EzbSLbk2lTOH8ql5l++BJmHbmE2Xzf1ISrWHTqBhV8sq4cG4/pNUmtvNwUyPjmNpy9/hf2XriJJceu4svt51H3V8LGhUmIJGAMmp6IzNPopybCMfUoss7UoDEnfW4Cx7yEjfkII/PPSUI+mumlnW/OCeSdK5aEPJzOPfs4ctPn4nT2WceRbVYSojkvnJ8VzeVKLz+NhutOY8DOc5h39DLXiT+Syf2SdLZaWbXCj22/P67jxV7v+3NusvvxyexHG0I+phdC+4B8Mg/If3W/8sbpLJUE+Us3QIbw6koJmQxCZnuPykedC1JUj8pURWyjzYdhDSFrInNERQR+MAIhrIztdMFHgZAGgBT4aDUBklKohqDRDL8WL+pHqwWxMI2EY2dm+HZgqwVoNGELBi09jIHMYdhx1l5EdVyEMoN/Re+lB1B99CZk7rQaQXEEgKKE7CJwUEzAo9vCCM6ccb8iP4utxCw6iIEM5+5jAY0CHGVaGYFjX1ofw3qt0NP9CC4H/hqPT37aCh8Ct6AuKwkgVxN2rkJoDzG2CSRDCSNDWSlavINelIIVRm1BfyopvyLEFAg5gOCz3C97EPrDLkSPMiCkAEirETaqUGzDmxBSew0hs6nK2gzJVn6vyg1Zd2ECRm4/h8EbT2EQ808OYkXu+vMOs5r3WngwHLv1gnh8v+0UCvK7HQaA1EpIAY9aCSkQMlSFtG9AtgGb0ee34/hx1ynUIhB+gSHXmbjt3p1XwIvqR1FAhrRfRfXjSoQwhN7/k0nwZwEaf+Z/lLBr39rj8e6AlSgdx31a5Rt4CZArLuCRkI7w0a9ERxoBJPNACoD0pwrSjxDSn5YpfzN4FGiK6o2+wapNB9V9tNxQi8riXz1OLNcE3sHj6vWbOHLiDMHjCRw4egr7BULSRAkpKsg9h48RTCahx/B5VGy2YCVvbpcAVio8fViQRkNIAZE94FOyO3zLUQHZgiHYAh37S1V1Akjm2nRyfIYRQjpYPMijwGcKQvpYlJBWFaS0XUpIUwEpEFKK0kRXxUuhb6vX123crfrtQfXXk/I9erDp/08wFHrlWh7DX09EtTpdEFqgNov+vI3/61EK//UpjRdDKiAT8+R65yRQZH5d7+wCEM1zJSEi94sn1eOiINcm82hUuHpy/6Zn5mcoiMnPU+dm/mjkx8+X73gtsjrB3tv4f54CAMsgpMDH+LBBH4wYNwcbNu3GuRRAUoP7fw70pFdMCNlr0Di8HFoBGaj09CBM9eQ1REwgq8ofrK4nvK6wX+Rao/MP0+cQM4qj5Xwffrk+hH+uj+hr47VsHyD6zSZYt2mv2gEaQj6+0OJJOSbudjsU/PjrJkpUb43/8SqFZwiZ/5uZoF5gvWHPBpSFskAB0TTDPy/esOcJ3gW+P0fw/hyVw88FVcb/8XyTaQ1G4vLV6w/sWnC32/9YLa8UfcA3zCvtNzER0QRcUQRdWZVKj8o8+uxU62WdxddmJiJKFHy0yJkJyqJnJCD7jETk5nReWj4ul2/2UUK2o4RpxxRoi+BnVv3tPE7e4GH9GEJItdLqjPQ3Tl27iQ2nrmE0wWtjgr83lxxHJLc/85QEBE5NQBjhY/YZR9kfichFZWNO9mUuwkLTcs8kUKTl4fy8YoSJyS2J0zRCR1FMiuUWEwg5+wTbtDkn+foJ9q2GlTn5ejg/M5jfF8Hlyiw9iTYbT2Pi4YvYLCHcXGfXNljucR6rcWqvt32+s8fAEzUGbAhpD+gnakDbF9T0AY16mOPN5qdN++KlkIoaQirwaDwkWkKxXRDShJGi5pEHa/XgXBO+zjLIUm0QIeQiBRsdooYkdDTNBSA/n4lQw0Lqs92IuSIl9NoIv1bemA6mFyWkQMgAQkh/Ttf8dh36LzyE3vMP0Pah7thNCG49HxGsxpyZYb+BHQn/OtPitHcS+jnZ1kb4yOXEwmkOwso8zNnYet5BlROy18rDkDDr3gSOvZgzUqyn8ofRS+YRQA5gZe4eS/ej1o87UXXkFjSZvh3VR/6B8Lil8Ge4eFA3gZG0bgSREqbNitGhYgSSWaiWDGXxlrbzD2IQIedX/OwhaxLRbXk8CozZCedICcU2IaT41JaN86yW3ZjOTvAo87MKgCSolFBu56h9yDthL3qxAM73W85gIG9ABxJCDlh/Eu8zDNub6sX3J+/BmF1nUeXH3QghbBQVpISMKyUklZui3nQQQKqw9u7rENBtHSqN2aFCuHsQnmbhtj7bZjFebb8U3u2WI6wT+7jVYmT+bBb8Pp4Evw9+RuYPJiDz++PpxyHww7HIW38snAy/zlS0Eyted4ZvcQ0f/YuL+lHgYztkLh6jAKR/sdYMx26DV3M3QsGafTBx3kZcuSJPLQ8eQvDEiPMMFTx0/DTB4ykcPHqaEFLslLJ9iRKSfRyHkhiu3n8aMhVgAR0qPP1LdlUAUkLNvRmS7UUT+OjzOtWf5fogMpYh2KJ+7PcboqSaulQn70c1an8aCwCFsuiPR946KifkHUNIAZEuCFmNarzSyFm8LhK5rg+j7x7P87BW90l/nadifNLs1fi81QAUKl0fmZif81mq9p4PLItXeO70JOz1ycZCXVQqivrUi0pFL/a/hwKO0pb5AoTFa9PQ0YSPMk+fT93evaz5Hu35efIdLuNyPBdLLlBJlyFgT/xrVF++RDj6ImFPZp6v36jYFI3bDcaSlRtx/ZqRP5Xb9hfDB/+JutAcT5L78uOGffAM+yVDuIScv0MYq82TgFTgq/SJAq4CXaVPVL+Y2ynbr2GtKEK9uA1evAa9ElED0a9/gS07DslXPdAfHR7PcZv+Nf9hbY8Jqc+fPY833m2NTATwXoTQAul9cvD+QUFoAnX6VMZl/BRspzeWU8sTVvvSPGgvhL2Lr0fP5uiQbRew/uCvDw+rb/+N75Uf9qQve246S5AmwPEkchAa5qZZQVk+Aq78BGZiBQi9ClDJJ1aQ04VpRWnFOL8YIVgxKvbEis5jKDEtO8OQm2+5BMmP+CB/SLzX/jLXUfpF/s7e/AsLjl1Hl60XUGnpCQJF5lefdgRhU48gWgFYQldRNxqWR9SOXCa3CR85PxdNFJDi8xht8S5j/+ZhHypjv+YxLLfZNlSRoow0TYNKUVSeoJKSUFIUlHw9Bz8nguA4kjC48IIk1FxxCl23nMMO5pXU26QOGhUhpfvIPobudazY73v0rkH2Pnk89okNIW0IaUPIp2QMmA8GjdsMVDnJ/HgzbyofTW+qV3SIoKmANPNB6odmCcf2dZZFULXBCG1CCEnIqODj5yaENMCjQEcLhAz9bAaBJY1h2ab6MZjA0WpaCTkXgQSQ/k3moHiP5eg2ay+6z4tH19l70H3uHpQb8hsytV6KAKrwgjsS9DEkOLTTKsJIsZVw0msjgJQ2wWQYAVw4LbTTSuRnGHIsoeZXBI29l1P1uJIh2YSR/ahU/HJ1ovL9+dpAAsiOC/fi9aHr4E8lpT+BW1bCxY9/3o56U3aiwFdrWZBlKUOuGYbcnUpAqiKDqYjM0pUhyl2Ww6/Tcrz1/R/oTwDZf0W8gpCD+R1N5x1AthE7dFEaUUJazQIis1EZ6TaqH/maCSFdYNIFIVklmyAyfORu1JpzhMVnzmLQHwIiz2DIhhMEkUmoRfVl2ZFb+dop1Ju2x4CQOm9lcghJGGnk1gzpyjbD2VsRBA/fchK1p+yBF7crQyy3m30b0nIhfOpOg/eHk+H74S/wf/9HZH5vLAJpWWqNRXCNYSrc2rNQDLyLdWDVayofX9fgUQHI1wkgWYTG//VWhJFSAbspXsvbAJ+1H4Mte46qm3/572HcUFy8fB3xx88o4HiQMO/gsdPKlBry6EnOP4HEM+fQ+bu58GQOSE8qIFUINuGjD0Gkj0BICceWaVUhuwciWk0lgGRV9X6/EkD+RhWkFAciCGbbSQsTCNlzJTypDJOckHcDIZUKMqoqwU5VqopKI2/JekhKOq368GH03+PwnRrGueHjAapaBw6fhrLvEZBnr47nspTBi8zTmCGcQFHAn2kKqGnIJqBNmwHZkoE2E7jdB29CvLQ8YZ78cCRgVMDlq6HMN8k8ky8FlYMj3wcqbPzrH6bhELfP/JOK3veS1kDer/YtIeS7n3TGfxh6/ZoASJqHGEGkpzJuM2GkAo+udeb6EUh5y/pajesu03IdykiVfokqrXE06Zxa1cdhHNnrmPyBx7zX2LmD17pin3FsmKpfnZpA/8gpKV9MI5x0tc15hueYMO9LBFJ78IfTDJE18ePU5Wp86GM4+ffb++Pu+0PAVOdN5xA4TSAZIZsASCrr8hKi5SMoE8tPqFWAoEybwMdjLivMtlgRgZGEZsqYz7AIrfB8gZCn0H3vFWOf3f36PbB9akRaKLLNPjl4+Qa+2yth1qdQhKrObNMJHWk5CB7zETJKn+STPmI7rxgVkKbPw2XyiCJSqSIFSBqvGd71Hpnm52gzQCb7Mq9hAn+1CWxkm/2bj/2cV6lMCYXFyzyLFeDrBTg/P9WouWdTmUlVZh4qVCsvOoaYdaewOPESrqu0Go/wvnhKns0e2Ni2+/OhPEvY+zf9c4wNIe2D0j4on5IxoB4M+OPnp82+VDnFBELKzb0JIMWrm30+DKSGkHx4NJSQkt/M21EWgcxrF9poAZwCIT+nElIgpGpb4KOAR6t9Oh0hX8xUSkhRPSr1o4BIpYKcBwUhm81BFr6WmRAyus08NP9xK7rPOYi4WfvQg4VqGkzYBr+YpcgiocAshBIiEFKBSCoS6R0EjU7DwujDXGBSA0oBl4UY+tpx7l50Xbgf7efsRcsZe9Bw+m58PnUvWrDdnt9Th7AxF8FQZgLOQILMLPysABZhiWL7vfHb0WLOAbz59W8MzaYiMk6bkyAygjkhcxAsvfH1JnRYcBD9CCD7LjtMEEk1JGHnu/yOsGE7kFWUkFYAmaKdjdPKDPhoQkjTmyBSFJRRtEgCyXC+Jw+rZnf7nZW4CSIFQooacigrcg+mIrLejHj0+fU4Wszbx5yPzJlJFaRSQrLYjFZB0kthH+aydHRjWDnVo8HM+ViYYcN9GZY9iEDzo2n7IMV2vFosRqbaU5Cp1i/wfv9n+L43Af41xiKgxigEVh+JgEqDGXpN9WMRKTTTjiZFZyTkmsZ2ZlbB9hcAKeHXxRl+XbApQku2xOgpq5m79Kp6WJEHo4dxAb9w6SriCR0PGOBRAKRMixcIeSjpBJLOn0fH72YRrhJAFqfCsxRDrgU4Sgg2vTdBpPcbLL5TrDPzYPZAZMvpiO6/lspHAkhWWBcTNWTEl9wH9AImwwdvJMxeBs8cfCgXCMljzixMc8twbAXCCMoEQtKezfwWcrxex1ZCpnduNx6+ZJDduPknVXcH0bbbMIQX/BAZmd/xpeDySlnoSfWh5MMVsKcK/xCmaW+CR7d3VynnMrJ8OmaqHNN7/Xbz1ftdUM8C+fh9+jUJ1adKUr6fMFBtD0PGPcIqIWvRj9G+xzDs2XfYFVItD9t3c4zxkFR/51kgpEyN1gynLeeGkPw+BSFFAZkKQLrX1Vv60QohVc5MucbUQEZnVdRp3t+yTg/nR4i76RN72eRjyISQ23bsRxTHXAbmR5UfL9W9g9w/CHSmJQOPKe5F1GtqHpdVaWFELVuTatt3EZCrFtas36HGoSh77f5P3v932x9ynT1z9SZqLmWOwRlU681guDC9ALS8hFem5WM7P0FWAYGRtIJiVNqJFRLFnWFFCL6KGlaYvsg8gs15SRi09yL32SOqhFQh6fxBiudDgXO7WFim6+ZzKLuQodQMr87FkPPc0xlqLvCR2y2mYCMBopon813GsHRXm/3HdjJjP0pfahOIaTHjs03wq7wLQpowUvv8nK+NMJR9b7UCnDatICGk3k/ynQmEy4l4Y+4xtGIo+YoTl93FbAwAe7fjx17+nx1/dv/Z/fe0jgEbQt7lDfjTOlDs7X78T5J/StU8/n0/eobKtyQ5uUwIaSoNkhdJcD8siAJIQ0g+dMsDLsOxA96IZXXsRQo+OhWAvB2EnI5QgZD1aU21GtKEj+KlKraGkBKSPRcBzDGYpeks1Bi8Ft1n70NnWpeZexBLFV9U3DIExLAaM3MUahBJNSKBpMNiToZLmzBSecJIAZQO5jN0xq1FmW82oeCgjYhgZehQ5o0MkIrPDOUOJnwLIWTLTKVfYNxKBBM6BvN9IXxfCFWAwQSRQQSgNcfvQKu5+1H7l5348KedVEjuRoOp+9CcBXCazTqANrM1fOy9jOCPEFLCsTvTFxu3ExEsSpNNQUgjL6QASKoYrVDSBSH5WnaqIk34aHoTUEouySgxQshIhmaHjaTicepB9P/jLL7dfFopIof8cRrfslhN//Wn0e+3JLSlGtPRZx2cDE83w7EdhJJiAiEdLOgTyvyaIeyPUELbLAx9rzJ6O3qsOIrui+NRcODveL7OdGQkgMz03k/wqjkWPu+Ogj8toNp38C3NStAsLOPNCtc+RVlohrDRzzABj5kJHsUkB6Qsk6lAE5T5ZAB+3bBfPVDKg8rDOOdICNY5huIKcDSho6mA1P4U80OewmGaVMHOVLAlvJjbUoCjKB9TAUiGYPsTREa2nEEASeBoAkj2uwtCKgDJ1/h6+NBNVNUugRchpHdECgjJ0F8riEyWE9KEkJF82CeEfMb/TRQq0xAnT+tCJQ+jLx/V75SxJX9StVcK93zctA+BSHU8719agUcVIizho8rc4MyteHSDR9c8I1TaValcAOB9N+v3WtdL2tbXUrRNGMix4cGw8pdDyiMg53toHfcttu8+pEIjpT/uZH9J18ly8nfgIEP98jE0lhAyE6FiJn6PSwWpIKSEYsu6mOuXYp2T9Q/7m9OeVHJmCK3MMPgh6jv0eeDO1u1O1t9e5sGcV00I+eOURfDNqlWyLghpAEgNIXXROzeMNKdNLz+SGvch4rMTUhN0Z2GY9vpN+9QYsZWQ/3yfynF24OxVFCJgzEb1Yy4CSDFR8il4ppR7GppZIaQVRgqENE2BR4GPphFC5meF56XMo6iP6X++zvfzWKYkXK3XVd4jbz1zHd2YzqbY/KNUPWpgJ5CwgAUUmvBRKx5TAEbVZwIhrZZ6GQUsFYi0AEjzO1wgkq/dpi1KTCt8NNsmgBRvnVeI+0SsCCGkKCWLzD+GhhvOYhO321RGStXv+9m/9mfZ/WmPAXsMpDUGbAhpQ0j7YvOUjAHzweCXSYvxPEMMJc+SCz6KCtKlgDTbKSEkHyL5sC25zbwcZZC5aHNWP14EJ/MBpoaQVEBKKLahggwR+EhTEPLTqQg21JACHSUcO0ggpDICSM7LQjWkvObXcBYKdV6MOILHTjP3IW7mfnSZsQ8VBq+DT8tFyCIQklAwlJAshBbKadMcbDv5moBJpygklUpSYOVy5GIV688n7UZRgT6sBB3BXIjhhJFSTCaIBW4CmWcyiAAyRCAk4aUGkAIhlxF6LkNg24VUWC5DY1a5bsuK023mHULrOfGEe/GEkAfwOcOW2y9kbklCx54sqtNzySFW9T6CT7j+UcOpghyxUyshCSKjCR+1STttdaQVSFrbAi2luI2CkKKIFBA5liByxC68M4sVuTefwXebGJLN0OyhzBH5tXjmjOyxnCE6gzYhUKAjgZhTlJAGhBQA6SCUDWU/hHDbg9mPwR2WqX4t+y3VnfP3o874jchQZwoyvDsOHtVHw6v6CPhXZ+XrigOZF7Ejqzu3gHdhFmkp3BI+RVqqatd+Ral6JJD0I5wUAOlL+Pha/uYIK9UGHQfMwLnzZqjWg1e2yIORKGrOsNqqCzoy/6OrrVSQp5Bw8hSOnT2Lz+LGsmp3c3iV6MzQ6zgqHmklqH4sIWpIrYD0eb0b/NgOr/8Tsn5lAMi+VEAqYyi2qYTst5YFajjNZSK/24zwXsy3yYdtbwKjZErIFBBSFach5HEr86iEZEVsz6gqDJEthfK12jIXoOR/siGO5I3jhU71xcUr17B4zSbUbfElw6wr4xmfN/FaOBWk/KFFF5EReGYCsxRATwr/pDJjGReI/DcApHwmv0fsVsBRrZu5TDXX9pi5Kj2lgA7HUSbmcHyGYdRRxT/DiAnzqJg9cUf3AVYIuWf/ESpHa+EFhn2buSCTQUgBkYalXmejf+VaYpgCltwHr4VVQ6+hU+xx+9jel7gLFw0bT6V4dBUeX3LfYA3FlnsLM72B9T4jjbYJIWV5gdQcw3nLNELCMZ3v9q/Htp8enYdSuf4doPKvAOFU1PSjyEnLRRWkG0ISohnKPYGQbhCZXBVZiEDMVEQKgNQwMhGF59IWHsPOSzq/s5lvMa2H0gc5T2CbbPs1+j8EPm47i6KEck6GW+ececQIjza33a18TB8+mrDRCiC1KjKZEtJUSaanhhQYeSfwUQBkOhDSBI/5qYIsQNPT0k6uXhUgmYufUXh+EvrtuID9F7mP1LXy0RmfD3JM2N9l73d7DDy4MWBDSPsG5o4ePuyD8sEdlP9WX5sQcsyEuXguuCKTvEsFU970C4C8CwipHhrDWPygaFMEEUI6PpNwbLcK0vG5EYJteDd8nKYgZGg9QsjPpiGY4dZmPkg3hKT6UUHIuQpCBnCZ8JZz0HjcFgLIfehEwBdHpWEsFYclCHOC27FATMwyKhMJB9svpRGWmUZ45jAgpFZIahAZRFhZ5Kv1iJ17AGWHb0VEn/XIygIt0QxNjiKcDGVBmWCqHsVCRf1oeiorRQkZ0onf02Ex/NssQN2fdqH9giNoPvOAsiaEjJ9P3s32fsLHI0o12G0xC+ssZX5JThcbtwuRw7ZrFaQARwUhNXwUAGlCSO0FSGpLCR7N6WQQkipIDSF3I4LKyHB+3ntzD+MbQshvFYQ8g68Zmj2EYdlin7MfI1iJOUCUj6yeHSYQUtpSTZzmYDEfDSGlf5cgoO0ibvMSlBu2Ed0W7SZInoaXK4+AV9Xv4UP1o3+5vvAkZPQoKACS+R2VtSBsbEHw2EobwWNmFp/xKdRMgcry9b/G3BU7FXCQh4GHoWqRL5dj7iQrxx9grkcFHi0AUkKyZf7hpJNIOncePYbNxks5m8CjWCcqHzsz5LwjvBiOrSCkASB9S3SBHyuBh332I3JwnEYSNEb1+RXRAiAJHwVAaggpIdk0QsisgzgOh2+jUneOAk0+EVUtEJIqyLQgJKFUSgjpIRDS/y2UZVXaywRu5vb9W+eVx+FzVSfwv1837EKD1gPwsqMC/se7BDI4KxGUsWq1CiOuRu8Gd6nBmcC9lBDSBH4SAq3DoO+/AjI51EyeY1Fgnnsd0mqbIFDlaTShILfXl+HQGRyVCRHLo13X7+/oPsAKIX/9fSu8wiviVX6Gh1JBaiWkC0TyO3RuyPRgpAEgBfiy76TYjyghvSKqYfw0I9+ffX92R/vl0ToG3RCyQ/fvGV5fUVWFNyGkCsl2AUgBkWmAx1TzNLD04vh4lZC6GIsuneX52j633Z/7UunHJayinI3qvWgTQjIEWec01BBOlH0qHJvgLD+tgJgKzda+INtioqYsROhVWJmASM6fexTFFya5ANejACFN9eOBSzfRm/Cx8LwEhEw7hOwEkPm47gJdJYeimBmO7vKmQtTlDdBI5WQyBaRMsx/TBJAmiBTP70ozNNtURqaAkgo8mgAyLS/qRwUnBT6aJopIgZBiOpzeVEsWlnyfzCEZSfXrO8tOYuahy7h8Q0dO6XOLvkd6tM4z92fs29tk96M9Bh7eGLAhpH2T+xje5D68A+ZxPlmZEHL7rnhWmKQqQcAjK1G6IGQqEGl9OEgeju3JUFHfPB8jSwPCx/pzDRApMHKGMlMBGfrpNCogtbnbhJCfTlFqSJ0X0sgNaeSFDGYotp5PSEkgGdh4Nt7qtRztp+5GRyoPOxBEdpq2H10JJRv9uAtvsqpwGMFiltjFhIMEhO2W0EwgKcpIqiFFIUlFpBSmCeay74zaiQ5UL775zRZkZt7DEIZiO1jJ2kkLZWGZ4M5cnuaI43vFGxaqIKSoIQk/285H7fHbELc4gaHXB9Fq1n40nb4Hrbhe3ZYcZr7JgxAAKdZz2RHU5DqHSRi2oYI0oaPpU4Zjpxea7QKQRvi2UkIqNaShhKQaMoJ5IcPpHYSYVdhfEo79PZWQQwghBzIkewBDsof8noTYRYfxxvdbkIWqx1CGoUsotnitglyFIPaZQNvA2CUEkIuQifsoc+uFiJvDfu+xABmrDIMfcz96lewET8JHUUCK+tFLKSGbE0Q2h49SQwqIbImA11sjQ96miCjXBRNmb8Jl5qGSP13h9MEf1/LdfzL/UxKruO5LZLEZVsE2q1+bKsj9zAEZT9XNURahadz7J7yYsxE8WWTH5w3Cx9c7EEBy2wkhvQgevUowLLtEHHxYkCai8RTkYOEZgY1RfdZaAKTOAym5ICUnZCQBZLbBG5Dz+83INX4XUwhMJbxhKDaBkVJCCnw0jbAmWUg2l3FBSIbbihLSg/YfhmNXY9GQm8x3yM59is/x+kHqwOHjaBzLHKWOivhfr5KEb8yRSOiVidAxk4QpSxi76j9Rk5pGuCft20A+eT01gCQ0SZbzMDlI1K+lnHfn08lB5K0hpGv9CQVle0QN6UnQ58kiMp5cRwGvs+atlUPhtoVq1DIcT/K3cu0mZAx9W4FMqxIyTQhpAkn2lVI8uvpUQ1QNSgVCMgyX+2Hmgg3qOx4FWPE4X/Mfzrrr87nswGadhuKl0AoK9AuEdIPIlMcH7zUkV2SyY8a9jKuCPOFlBo7dKh93wvUbcu14ms9t92/bZV+N23MOEVMPE0SaSshElQMxj4QkE5TlUeHFhGUGNBMQaTUFJTnPCiMVlCT0ysM8hB/8dgYXGe78cMakta/kmsC0K1yXwbvOo8TcI3BMPoisUw5zPY/obeX65ub2mhBWK0I1aHTPk9dTLGNCR+UNAJkGhBQo6c4f6e7T24LIdKCkVTWZHFByHxGipjLLvlO5Pfm5BVlcpyBhpOQDlTyUX7AQj6hD5e/h7zPr/rPb9v6wx8CTMgZsCPlUP6DZB/KTciDfyXbIA538HYg/Cv88teAp1Siz3yokOx0IyQdIeWj3oyohoO4kOL6YT/AoANIKIRl6/ZmEX4v6UVtIPYGRU7XVm4IgUUM2nqOL1DBHpDs/pIaQIQIjlc1DWMt5qDNyMyHkPuaE3IcYWge2JTxbfH0WisnJ8OhAqiIVhCQ0UyAyVpSRoogUGLkcQbFLUZTgp82seBamicfHE3ai4IANyMpiMg5Wzw6QZZTykaHcBI9hNPHKCCAFRoYaIdmZYxYRQm4lcDyCmPkH0YLwsSVzVnZeQPBI5WPXRazoLQCSoditCCTzjNmlwqSzMlTaBI936lURG4GOVDda2wIgTZPiNKZJkZpIgsgwhmY7CSJrEkR+RxA5lArI/qyM2Ic3mF+tpSLyt5Pos+YYahLmRrMidgirgDu6MTS7Cz1D0qXoT1A75t9ssxB+refCo+lMvML99s63v6LKQIYNVxkCD1a89ixI4FhI4CMVkAIgC8m0hpDeVD2K8tGXYdiv5W2Gsp99i1Ub4tVYlP8ehvrRPF4kT+px5k3cl2AFkKJ81CYAUlSQpy5cQszg6Xg1rygg28OH6kdvVvn2FgjJ7fdSakjCR6mCTSjpbPAjshIyRn7JIjRUP0Yz5F0sSs3TFbEVhOR01IDfkfO7Tcg9Yityjt2B0NhfWGW4koKNvoSPYulBSAGVJoT0FmBGAJmJPxA8G1gGjTvovHrCjMztfZq8+aPL0jVb8Xq5hnguc2lVcMaTIMODICMTQ7DFe1BxakJIAXRuCGlpu8KcOc8F0Az4l6YC0g1Q0gMr1vlSBd1q1tfcbQ0plRLdFS4uEE+DvFTrlXI9DQipQCS3XcDfC8EVUL52HK5dv3lHY0SUkObfxKmL8SLHmepHfrZWk1qrYwvwJHRMx7xkfbgOCkAKGOU1RXJLRhSrhz0HdBVvO9T2cbxHkxHyN27cuIF368XhZUJIUT8mtzs/PjSANFIlMHRflJBNO32rhuHTdD77N7dVOnMo1YDOifHITjWcCscWJaQASNMUhJTCLEZxljRgpAtEGjBSKSVnJyAn39Pw99O4cvMhQ0ijINn+CzfQaP0pRE89hMgp8WobBQzm5jYLfMwtbZobOGoIq6GjCR8NL/3D9+RR/SV9lqLfjPkp1ZB3CiIl9DtZ4Zr0pql8NJdzg0gLgLSARw2PEwyIrFWR+QkhCxA+FqCXgkRR046i/KJTWHtah9DzRu2OrhH/5ji1P/txvB7Y62yP2/THgA0hbQhpX1ieojEgN5tHCVWylWyADHzg8yWE9MnGSrw0b2VmPkjxGkJKxVIzf5OZk0weOAOYty6IMDG0wTzmhdQKSMfn0wkjDQCZDEISPjIMW6shpU0lpABJ5oYMFQAphWqoegyh0k57XbgmpAVVli1YPZswsliP5WjBPI7tqIiMnbaXIHIv2jGkuO2UvehMBWKzX3YikqHUvoRmWZi3MbjDUmUhzGcoOQ3DOa/00PWEhQSXBJCxrLgdO/cgVYwHWB17HxpM3InKwzYhH2GRKB4dcUsRRnOy7YwTELnMgJLLWOCGIcrtFuPDcdvQnSrH2Dn7+TmstM2CL10IH7ssFgB5mOHYhxFHCFlhIvM0Dt+FqHsEkClhpVJNmrkkCRmjaVFiCkQy5JvAM3IspwkjwyU0mwrMujMPYjirZA9aexw9V59Ar7WEkatPYsCaExjw6wnmtTyM0t9uQXhXhrlTHZqlw2oqIKmCbLeCKsiF8G4xiwByIl6p8zPDjMcgS4XuyFSUlaELtaLiUUKsW8GXeSB9CR99CjVV5k3vXbgZvFj52id/IzTpPhlJZx6NMDqBVMfOGApIwsb9VEFq6Ki9TMcfkxDsC+j03Tx4FG6lgKO3FKIheBTzoiJShWOz7Vu0IyFkR4TWG43IvqySLkVo+q5hmL8lDyTHViQrp0cy/F981Fe/I8fXfyDviG3IO3Ibco/didBWY1iUppKCj77ZNIR0gcgUSshkeSGVko+hsYSQzwWURrP2g+Vw5/n96YOQst2yf4eMmIUs2Vl0JpBFZwQ4EnplCqdXAFIgpDZPeoFgpnmpvkwJIQVA3gmETA1YrIBR2iZYTDnfOm0u4/a3gpC3ApGW9TYgq9pebrOA2eETFkt33VYFKTfSAiGV5/ITJs1ngbOyBshNCSEFKqYFIc35yb2oMQUES27ObEU+wcFDSXqdnqJr85PyoKJOONx7NwkhK3/SES+GVFQA0q2CFCAphYh0MSL3+HbPE9BupjWQtuShlnB9US+/HFoFrTp8o8aHrZRN/+HubsaTdGbv7efgmMRw5HQgZF5R9ykAaYJIw1M1mN80vl6AbTGXSnLWEURNPYIv916CRPjq9TL9/Vn/O9lWCb+W31AWJl1F1SVJCkDmnn5YhUrnJthTwFG28TbmgrICH+/IDDBpQM2UMNKtiCREJPwTkJis8I1rWsLC9WsmbEzLu/rdhI6ihDTbyhv7i/sqv5jaX+5lTJAsXqBsqXlHMfXgeVznD7ZybN9JX9vL2P1kjwF7DNzJGLAhpH1StS8qT9EYkAfzi5euolq9bnguSyX4qQrZGkJqEGmFkG4QqYGkPCRQvaIeCKojc9ZqCP5oPJxfGBBSQCTBowKRVMuFiplKSAGQFhMIGVLXAJGNZrNaNhWRYgIhWajGtFC2BUKGtZqPiFbzUO3rdejAIjUSmt1OICRVkDEM0W5FyNd20g40/nErKn9HZVlPndMwjNWds/dYg2L91+FjAsN2BI4dCB5jBECyenUMw6jbzeE8TscxR2TX+Qe4zF7UHrcVuXtKde0lCKf6URlBZDhNqSMFUjJHZD5+btVR29CMMLQz1ZCdF2jrQgVkt4WH0IMAsjahp8DHiB+oVPyBwFBAJEOyxStVpJo259MbuSGVT/laymnrsi4QSQA5WpuCkgSRUWP2IvuQLSjPiuCdFh3CwLVMQr76OCFkEvquOom+K5JYvfs4ei87iuZUmdZgrszSAzegMGFZVvahHwGxd/2JCPxiEsIb/YzMb3VSwNGnSBsqHlkBW0FIFqChItKHwNG7YBNCyCbwInjMkLs+Isu0w6hp65TiineyD1X9KN+vQrDPUAHJEOyDonZUAJJqSANG7hMAeZyvMQ9k64FTWemboLWEhGDrHJCieNQgsr0KyfYtFMNw81iE1R+PyN6rES45H/syB2QfQkiVB5LwUQFIIxSbYdoRhJDZh2xEHvZ1Xqog83IcCYTMUv8beDHnqi8Ve7eDkC4VJB/OvRU4kyIQlZjrsAIGfK+LezxVD+o8v8nf8ZNnEdNzBF4KKsOchRJ6beQrFBBJCKnDkcUTPFotPRCp4KMF5llUhmofWKCJFapI2woWXW3uWwm1d02nsVzKzzGnlRKS35c8JPt2EJLnbQNAal8Vr4a8jbACtbH/0AnVZ3+z725302g+hN688Sf6f/2TUtxKWLdSQUp4t5hSPiaHjBpIpjfPAMHs+1cZLl+mRlvc5AOvrYJ8fB9iZEAl8gecfG/VJzSsxKJPNXnfYKghowwImar6fFpjWuCjqZalUpbHr8DJMSyuJ39yP3O7MWu/fgfjiMdbU/4oGT41AdmogHMpIae5QZsJ57QSMgWINOCkgloWuCXT+RjiHEkI+cP+i7zuyrVf1ufBQkgBkNc4ViYy12GROVRmcn0k9FnyNYrqT6ke04GPdwYa3f2U/vLyXanzQ7ryTMr6uExgo3XabLvnawApuSTdCkgzt2Ry6GgARn53fmUGfDT3k3h+V0oTCCn7Ly/HQP5pifhq62mcu870Lvyzj6k7OKaeoudKezzY4+Fex4ANIe0ThX1BeYrGgIaQV1D5o654wcGQ6pwfUAEpIdmmGvLWENKtTngX/pHlEVR1CMIaLaQSkvDRNFFDEkCKKQjJMGwrgJS2CSHFh34xwwUhBToKgBQf2ny+MgdDsQVChrdegBztl6D28D80iBQYOV2DyLaiZPxpN8owv95Ho9ej1fQtaPTLH/h0/Ga0mcHlqFTsTJVie0LIWEJHgZGxs2jiqWAUazd7n7LOXLYbw6cbTt6Jov2ZJ5IKyIguGkCG04eZIJKFWwI7UfHGitqNCUMFOHalArLLgni+Px69mBey+fx45Bi5E05DBRlFRaIVQuq2BUBaIaMARut0Ou0oE0SaEJLehJASlp2NYdlR325WOS6D2y5DtrhVeH/0DnRfkkAV5HF8KfBxxXFW8j6GvoSQX61IRP+VRxlGfkTlt6w3fgveH/EHPhq5DqWZrzCgXDcqGwkbi7SmylEAJCtg03wZhq0UkApCNkWGnJ8TQDZAzVajsGGPBh0y/h7mg6MCkHzgOnHmogqz1gBS4ONJKiG17Us4gUPHTxFOnkC9jqORiRW8fQkgfQkgfVj5W8NHegnJLkYFZKHWVEHGMM3ABIQz1N/BEGuBkLoKtvYCICMIIyMYni2vSS7InEM3IPcPW5GHCkhRQubjPsnLwkVZ6g2Cl7M8/Kg0vhWE9I7mA7nARz6kK89QbG8WpZF8h95UQ/40bclT98AgG7x7fwKqftQB/+tTguG9BF8KQBI+qtBr7ZOBx3QgpBWcKXDnApE6jNga/uzN7zDPjSYsTBdApgEc04KR1s+xthWE5PfdOYQ01lcgJPvAi9sr4+U/PiVRp0l/XLp8VZ4q7+I+AOo9zdsPxfNZyinoeO8QUofCe0RILtOqeCmkAvP9dVTjVn4ouNcbW/t9d7M/7/+ysgPjE44j51uf4xVnleQA0gUh0xrD5jz3MWbmC5VctxnD5RxXDdMX/KbGyMO8ljwpY0yuifKjQo2lSXBOTWRhFoZjE0TmEkAnENIAkSaEFJ/PNIGMt7E8M44gK5dfqsJ6zbH24ECWnNtOX/sLPbadY+GVwwSsrHpNwKZDrQkgWYhHFH9WeKi21QJgra/9o/ZtIKQARVPtqCCkuXwaQNIEjm4vMFKgZGqgqACjASBlf5mw+Fb7Li8Vkkr5Kvua65WV/dFhwymCSP1D35My/u3tMI9J29tj4cGPARtC3tXN94PfQfZBYff5/RwDctN+7foNxPYcg2eCqhgQUodi3yok2wzNNh+05UHYP7ICQir3R2jjJQzPFejoho9uCJlcAalgJBWQooIMNUwVrmHxGVFChlIJaQWQoS2Yb5LmJIQMa7UQYSyKkrvjEtQZtQkdCRc7CISU0Gz6WBaGqT5qO4un8D0dlqDkoN/wwbhN6LGI4dcCHql0bEflo4BIgZDtuLy8J3YW80wSQMZSASkgUoHKmQzxnr8HzafvQiGG1YZ1WUkQuZJKyBWIYOGacLZD4pgvkWrIogPXoy3Du7sTQAp87DafeSAJMVsRRhabsBshw3YgkvBRAKSGkASRAiOVETSabUMdaaokrd58r+mjqajUn2WASgNECpBURhApIdrZGJ6ddehmqjaXIpzh45EsqBPOoj3BrRejGMFYwyn70WdZAvovP4o+SxIJIhOZy/Iwi/bEo8WMg6z+vRuNJlJhOn4dSrUaC4/iMchUkMCR+R0lB6QCkAo+CoBk3kead/4meCGqHsJLtkG3b+fhivHruQKQD/F8qwDkX38yB+R5BRxVARqCR12IRgDkCeaGFADJNh+gW/X9Ca/maQo/5n30Y+EdAZCSC9LM++gt+R+LtmP17zYIrjOScHEdHOxTBRkJHCNV/kftI4z5YYSP8nq5sZtQmVXUc/+wjRByO0OxaaN3IjfVkFlq94Uv1Yx+LBTly7yryfJCWsKx04WQzMEWyPfOnm88qD/EPr+f565bfZbsW/lbyYrNxco3wX89S6pKy1IwRQMyUdtZQWQKBaSASIsK0gogpX0vEDItsHi386zw0WzfO4QUpaKoPwn8aM/4l8LIHxcoddKt+jat1y5cvIQGbfoxzJ0Q0qUytSgh1ffIdyW3ZPk3Dfgr8ySPqWdUVbwYVAFftB5oA6bH/JiVHbhxyx6EFPgAGag8TqaCVApIRlWkCdIFQroBpM4ZKj8k8NglhHwtvDKCcr2H1Wt32GPkPo0ROXeevHwdZRcfh4MQUishj6WCkALfrCAyVZtwS80TKCkVpg2fiyHPuamGXC9FTrjOD1IJKYMk8cpNNGMxPv/JR1j5WwrPJCAXgZwr76MCkMkhpBW+3hl0lPdbLR1lJL83lRpSAUbCRyoylQmIVO1bqybNAkEqhNsI41YQkt+REkTqkG8LMDYhsnjZT2mYAEjpK9d+5ufmoIK0K3OLn3AVFLSfz9K6Ptrz7HFhj4E7GwM2hLxPF3J7wN3ZgLP76eH2k4CgG/zV+8uhU/CfwCrwVUpIMx+kpVI2w6e8DdM5IY0iNWbYoYSKRlZE0Ns9ENxwMRwMu3YpIQVIqjDsFADSCh4ViJxMEDlZh2U30GrIUIb9aghpKCEVhFwAZ0taqwUKQjqYnzAnw6Q/H7eZhWmoXqQisq2EZU/dg9gZe/HpxF0oPXgdw6l/ReaYJagxdquqVC3AUcBjO4GOBoCMUW2ZFoi5h69RNanae9F2JkO+ac2n7ED+vqs1iGTOyZDOK5kzcgUKfrkG743agtYMt+6y8LAKv+5G8NiLOSGbEXoWYF7GkO93IIIQMkpsOCEkLVrZDu0NAGnCxXT9cHk/YabVfuA8vj9KPAGm1aJZ/VtCvSP6r4eDRXoi2i5FRAzVnGwLhIxsz7yWnOdkzsdizFnY9Oed6ELwGEtI22TqPjSZQiXoL6w+znblXvMQUKEnXi3YGl5F2sKnGEOwRf2o4KOEX7PwDJWRfswHmSnPF3g112do1nUctu/VxSXkIedhH/eyDldZfCOBYboCG0UBqYxVr3UI9knsPXKcOSCTsOtQImq2+AYv52pEBWRH+L/BMOziuhiNgpACIkUFyfBrv5JdEPrRCDgJpsP6rUO4qB0Zwh7BcOtwMYZcK1Pw8Xc4CSrf+XkbOq3ej2pMKZBrBNWPo3YgH+F5XoZi52BOUq+3Y+FDKOPHyvUaQmoQqYrTGBBSV2N2KyElV6G3oYR8hRAy+vV6WL91n35Qf6KvcVqV8eeff6L34AnM98h8mJnLIhPPU5kItzwkVDgFCNNg7F4hZHJA4gYmViWktW3mf9TzfLheysxiQ+Z0Gl5DR/0+Vwg2l3NDSPe6mCGr7vVxv6ZBjhkmLbC1Cgv0lEWuEvWwa98RNUbu5viUN0he4ZJVmvJzWPk4kqHuqp+lr3V/uwr+qH0g8FeHXKftpZhSJQUhn89cBn0G/6LWyVZCPvzz5t2MC+uysgPnLlqLDGGV8RrHh5eoH5UJfEwJIGWschkVxm+MUzMEW3kBkBy3hNSvhFZEjjfqISnprBojdsj+Px8j0pEbj11SwCl86lFkTxmObaohXYpIKglFTaigZOp2HvWani8wMjsrbpecn4j9Fx9sNXPZrg0En+UXHUWWyVL1m/CRoFCbtFmAxmrW7bxdm+8z4WSyz7B+XrJKhfaCAABAAElEQVS2zq9ogk/T5yGATM9yp/NaqjBtwkEzz6Q7v6RRcVuApDILaOR6uZSs1rYAx2TQUQNIgatqXzMkW3zUlAR8suIETlJd+ijc21nPO3b7n58P7D60+/BBjgEbQj7RD2j2wfQgD6bH4bsEQsoD+7BxC/Df0Hfgw5yQXlRNiaUuTGOCSEuVbIYSihpSksr7RFZC4BttEfzFAkJHHY4teSCVCtKAkA7JA1lXzK18lLYoIUMIIAVCigV/xhDtJqKEJIS0qiEtENJBJaSTIdmihnTSCnZdivpjNqMTQWHb6bvRiorIVgSRbQkiW9OaTN2JUqw8HN5pjVIqtpOwa4GPBJcCH2NMT+gYY0BIE0TGEEbKvFbTdiFu1nbUGLkeWVg929F5FQr2WY1aIzfxc/agy1wCSILHOOaD7MbQ616LDqIxVZT5qWwL+X47AeR2AkgxgkLTCBKjDagoYNFlCihqtaQLRsrrnB9J0JgMQHK+TAuAVK8pEMk2oZbAyKx8TxgBWGjsYoS3IYRsw8I8balYbbuYRk84Gx5LCMl2cJvFyMYcl8X7rUV5FkmpPWYnviCAbDr5AEp2mAHPkp2RsTDB4+sxBG9taW2ogJQwbFE/ShGa5vAnlMyY8wuEv9keI6euwcXL1+QZ4I6KXTyI4+bKtRtISDrD3I8GgCR8PGiYhGLvU/OTcIAKyA9ihuOV3E3hSwWkf4n28COAlHBsn+I0QklfAkjfYgSQpbrC8fE4hDWZirBuqxFJCBnZR3I+uiFkmArN/k0ByjACyHIE4h1WMR/p8gN46+e9yMN9lW/0dlcodo5v1sGnLPuUYdW+TJFgQsiU1bHTgpBSGduL73uFIa153/qCuf6O633wBF/j5CFIzmcde48goKjAcN6KKgQ7E6GFWf06pRovXQhJUJaeGlIXpKGii7A3bdAnoEWbqVhM7U04yfB5wmRvAZEuZau8ZsxXXqYJa1KZnHvN73KDxttBSLXOCvJUUTDnGb9SaBI7kGHVV9iD7MW7GCMyqA4lJCEPQ21fJoQ0Q7GTK01vBx5TQkkWVOLYfYl5KifPXqPGrQ0hH9/7N9mB0xasZih2JRaEknGq4aMnvTbJ9Wjke7TCx5RtgZBG0SIFIR3l8ea7rXGdP6TezZi1l01/LMm+WkUImZdVrKMImrIzPDmngnWEdNOoHEzD8nKeywQ6yjL0VhNQKRAyavIh1Fx5AklXHxy0km1aevwK3pifgBAW28nB9ctJsGhuVy62c9/CtBJStt0IRze86z3JAKMJMwU0StsAjtY2QaAJHpP5ZKCRxXE4LUVyBECq5dR0clB5ZxBSoKMASAt8lDbXyW16/7iBskBHgccmfDRAq9p22be6L3ISQoZNPIz2m87inFQagp02wz6/pH9+sfvG7ptbjQEbQt7FzfetOtJ+zT7QHocx8Bcf2OWpc/7yP/ByZA14itoxuwkhBUSa4DGlFxDJeQpCysMxpwk9Aoo0QZbP5xA8zmAhGlbFZsVrh2HSDpWcjy4AKcDRPe2CkHUmIbjuJIQ0nKUqZQuEdDAnpIM5IR3NCThpzhYEj6KGbEkvYdm0ULZztl+M2j9sJBAUYLgbzQghm07ZR68BYqupO/A+Q1wbTyacJHhsQ/Ao+SPbujwBJN+rjeCRYFFAZKyATVrrGbvQfsY2VPpuA3ypHKwwZC06ztyFroSPccwx2WneftoBlW+y4/z9+JAVtrN9vw2Ob7chfNg2RH5HAEkYqSwdIKkgpFJKEiAaoDI5cNyuASTfr+ab3gCRkcNlPu0H2kj5jO0IYzGe0LaLEEbAGMbQ63DxbRbB6bLFBJDaHPRBhJEBrZdQGckK4oM2oPbobSjUajoysPqzh4DHYjHapM3wYwnD9qb60bsAK1/nb0r1Y0O8Ubs/Nu1MYEEJeQR4dM4Hl65cZ4j1GaV8jD96mvBRW7zyooRkARoWUTjAHJB1Oo1GxnyEgASNfiU6EUAyFFvAo4Ri0yQPpG+xdvAv1QWOOizK1GQmHI0mIaLbGkT126BVkISNEpqtlZACIGmEkeVGb0HbpSxctJKgmrC66Lg9yEPFat4xVEMyH2Se8QydH7ASrxX6lBCS+Vp5XJrh2LeDkJInTSCkd1RlQsjyKF61BY4ePy074ol9WJcxdvXqNfRjgZSXQsur3HOZCC1SwzAJCRbloxkaLO10zBWSzWUJP0xLHz4aKi5+r0BIlRtSecnTaUJFDRtNcCz7UgCkd1b+CERTeT9ZBd2HOT59oqtyHj3Nm2NAFwJzw8a0Aaj5usBJs231bmgpKkgJfX4hoBTGT5x3V+ODA0mNJXnTug074J+zBjKGSWh3SgXk3QJIAZKEkFy3V0LfxrJVW9R6yQ9mj8M11V7H5Od6OS7/vPkn+g75Gc8Fva0q0ieHjwIi7xBCGlBSqqcLhJScoe/Wi5NbGHts3KdnFznYxu46w+Ixh5j3T5SQzAkpEFJBuiPIzRDc9GBkWoAyN0GWCSMFakVQhVh3zQnmZZR7z+Rj5d84dmR71p66hkKsyh1OACohxApAcnuU+lE8oaRsn9VkG7Vp+Gpus/ZpQEsFGTWAlM9NblpxqYGk5NfUOTZFhWlCSlEYCmiUwjjJjBBSFcsxl1XLuNWOqcK5+bqphFRKRlPRaAGQyRSOXFcTRJrA0Q0fTQhpQEcDPJowViBsLhYvys4+DZ+YgH47L+Iqc2wzxt4+Hh/A2P43jhf7M//9c5Ldx+n3sQ0h7ROHffF4asaAvnGXm7RFhJAvOvmwmJUwUUFIeqWGTAkfU05zOaXOoeeDgV+BLxBUdzqrAs9iVWypjj1NFalxKkWkAMkp2uoZqkfDWwFkaB0qIetMREh9gkwqIR2ihFQgUiCkNmcLIyTbCMt2tmSeSBascVIpGd16ESoy/2MzAsCWU3ah2eRdDCfeo0Hk1F1oTZVkSwLK1swbaVobgsg2VEsKlGxD8NiWJgBSQ0iBkgIgmQ9x8nY0+GUL3h22AXVYoKX73H1UP+5FB+aO7CDFbsQIIltSNSmQKWzIH3B+s4XwcQuivttK26aNYDIZjCSYjEwFJ7ViMpIgMlJAo8trRaUJG0VdKW3lzbYASFrEkE1wMG9lqISuC6ylYjRM1KNGKLuex75U8wl0FZRcjFAqI7MQsgYzPDu61WxkqT4YGYvEwIuKP5/X2zEEO1ZBSB8WYPEtQhUkcz9KEZrXGH4dXLwVOg6Zi6QzV2Ro8XzyiNyQkoZeoCIzngBSgKMCkISQqi3TooQkgEw4cRJHTp7GZ13HI2MBwlWCRh8CSB8pRmMCyDeMnJCvt2d4dkeEfjIWzmYz4WxMFSQhZBiLE0nou4RiS/i1qFBFESnwMYzzynBstCJ4bLfsEFWQh1Bn3kHkZ7h+PoZg5xsrIdnbCSF3IceAJfAq/ImqdO2bzV2YJk0IKSHYFlMQMpIQMqgs3vm0s8r9ykv/E3l+5yjD9evX0WfgeDwb8BYyEFZkItiQ6rlamScgLDkMSxc8plJAiiJSAKT27qrSAvZMNaTpzXkEjnyPt0BEo2CQ7A8PhhlLiPhr4RVZMOhtVgouxxDV8gQzDD/OJpCR3xFNdWJ0Zb6Xy0ZUYGXzt9Xyr4VVpIqskoJzAmBkWTH5DlkPyZOn1ofr6SVmTitvhZBGm30k2/IyCxcFZKuGP7bsNo7Xuxgj+hcGLF+zCRm5ThkZbpsW9E077Dql+lGmdX5KgZAZWBk7ME8t7D0oaRwkd9wjch55au4P7mIc3KJPZFBdu3YdnfuOxjMsXKQBYkoFJCFkStVjutNyTMv4rkrlbXl06jVKjVt7fNy//fX1zrOEkIcRzZyQOSQcm4pIBSEFQFosLehonacgHsGjgEgTRoZOOoxOW8/hMs8d//bDuJw31iZdQck5LIYz+aBSaGrgKNBRm1pHyzaZkFXNd4FIE0havQaRVnCp2gpACnQUEJmoAK5A3ByqrSuNS6EfrcKU16nIJCAUy85cmdlZLCeb2Ezxh9R09mn0zKWZk0V9cnE5E1ZKrsjcykx4KV4gZIpQava/GzBqZeOtp2X55GaC5JT7N9e0wwSRh5CN2xHN9qSD5//1/fpvjxv78//9Y9PuY7uP0xoDNoS8xc1UWh1mz7MPpMd6DPDBTv627DgA/7y1kVFCpQgiVd5HMyzbkg9S54UkcHTNk7axPMMCfXPVhm9ZFtKoOAS+lYbCv9p3CKw5CkEfjkfwxz9R+ThRhVsLjAw1gGQoQWQIlY+hYlRBioV8/AurCxNUNmU4dlOqIAVCSoEZMYJIgY1uE2Uk5xNCOlqIYpLQkpCycNcVqD1yM1oQRraYspMQcjcVkLupjGSBmSkCIqmOJIhsNX2PYXvR0phuQUjZkkVoWjCEuyVDsFtQQdmYALLRpB1UWO6k6pEVs+cfQBwVkJ0IIOOoquwyh3kkqZT8+OcdKPo94d/AjQj/ejMivtnEatQEkYSRUd9uRSTNhJGRBpQUb0JI8S5T87chgtBSGaeVp6oywmUaQIYrUMnPoY8SKDlgA0JiF6mcmlo1KuCWBX0IbsOUl7Y2DXH5uoKV9FRKOlotQmDdcXitZHt4sOiMX3EWXSGA9H2dIJIQUhSAvswJ6ctwbI8CzZkzsSmK1uyPOat17kGBj4/Cg6Ea4HwYOXfxilY9Cni0KiCpEBQAKZZ44jQB5Cl0/m4GMrAKtgKQRhVslf+RMNJXAUl6UUfSQmp+i7Bms+FoOpMAchrCG02Gk2HY4YSQ4X3XKQCpVJDMCekkhJSx0Yw5Q9stO0Il5BHELD2M92bspwqSEJKh7wIi8wqInMAcnnHTkVGp4kQhlzaEdIXtEja5IKQAMEMJ+Wrw26jXvB9u3uSx/gRe3+RB888/b+LbkVPwAiFHRm67B1XdmSIkN6E7P+Etw65TKiEVcBToaJpbBSlAUvLVpTaBgKJ4FAWkDhvNyPDTV9j/LwYRNgpUy/UeoovVRcG3G6NGg96oVqcrWnYZgW/HLsCIX5Zh1MQV9Evw3fiFGDJ6Nj5tMwRV6/VEjS++ROGKrRFeuB7B3AdUeVbA84TLz8vnsi3wTkNH/b0alOqq1+Z8vW4CIA2FpGwDx8xz/Iw3KjbCuXMX1KFyN9cz8/j+ZfoSVsZm7k32Y/I8kKnhrwtIhpsQUsCjtU0Iy+15mWpWZ/7aOHTkJNfLhpB3s18epWVlUJ0+fQ4fNeyJZzKXNmCjQEerybi9AzOOKw0hCdCprOw74Gc1bs2x+Cht++O2Lur6wMtEx/WnEDGFYMmEkPSieLMCSLOdh7AyuRHUCdRLCfAUiDwMByHkV9vP4dq/CSHVjyN/Y9Ppq3hrroQLx2sAyfXKlcLM7UjTu7ZBgGMa28R5Jsy0Kh/NUG+Bt2I5xCsQmcDK4ImIYF+GcT3C2XfZCRbzEjjmYqh1aearrLLsKCovS0IFsaXHUGnpcZRffAy5ZyWiINWceQgqJUw+kipEqTKeQ/WrhEpbVZUmaHSDRAmFTw4WzWXS88by3EYz1D4lgHQBXC6Tk9uTndtVgN+z7uRldUw+buPfXl/7ed4eAw93DNgQ8gl8SLMPqod7UD3q/S93CwcOH0PWN+rjFQcfZhVUZK5HgZAu2JhSAWlOmxBSlmVeSOaU9GBOwExF2sGD5klY5cVcel4l4uD9Zk/4leuLzBUHUln3HYLeH41QgklHnV8Ypm0oI43w7JBPqISsRyDJKtkOgkilhlQwUoNIZzIQyRBtQkcFIAVCtuDy9MEElhEMLS7HPJCfjt+GFpMJI6mEbEEY2YwQsgUhZEsWsdHgcZ+CkjKvBefJ6825rIRix7DqtuSYlHYnKtbEOrOydhxVj90II7vQxxBk1v15K0oN+wPRhH+OARsRMfQPRHy9CZE0BSEFRBoQUnsCQ4ZpKwApsDGVEUYa8yJM+GjCSALIcLYlxFuZtOW1YQScLHQT2X8DczsyRJ1KUlGNqoriBLVh7BerOQlsnZwnpuYT5Io60tF8Lvze+w6vvd6G+7A1VYBUPzIXol9x5j7kPlXGQiz+BJIehVrDi0VqPor9CTsP6pBfeSB8lB4Kz1+6agBIUTsy/FpBSMkDaQGQVD8eIYSMGTSVIdAt4CW5H0vG6dDr4lQ+iikAyXlsiyoy6J2vEc4QbGfT2QzFnoWwhtM5TfUvVY8CIUUBGUb4qEKw6Yuw0Ez9uZIDMkEDyCUEkUsOowoL/uSlEjL/eELIcQIh6VmJPLrTZBZyqMJwXAJ+qYwtQJJtbQzfdeUNtABIgZEGhPRiOHZGhmN3p0JQ/v7+Nx/8HtK1kxuF4aOn42Xmf3yFYCsTldmZVEiwBUAK4FDh14SKKYFjsmnCRlnOBR+1qtCqhHSFZLtApEBJ6X8dcv0a1YACQ19kpWhfnkvzlGqAGp/2QO+hkzF9wTps2BqPfYdOQorEX72ufwRSOyeN/9ilrFatXziSeAa/bdyvPqPboJ/wQeO+KFGlFYLyvY8XmTvxucAyeJV5MCXEWsC0hqVaMWaqIvU66jBxWWcJeX4huByattMVqO/2WiXH+E2G2g4ePgXPZSlDlacARRM8mt4EjBYvADItCMn3ZxKgyv6X7Sn/fiwu8tj9k52gq+ja1/K73UcPe3kZvUeY2qL8B7Gsnl6Wx5eMTRNAmm3xaZsomV2vGRBSlMDeVBh7MU3BgiXr1QHyKF1vHnaf3+v3C+y/yfyan61KQtiUwwxdJuQS1V66EJKVri0QUtouM6CdQDoFqwincrKdgyq9GQn/LqQSmLr97HVUWMAiNL8QkhLY5ZyiQZlASAFmJoxMEz7y9eTzBcCmBpEuAMntkrZsn1I28vuyW+Ej50eyP6VPs7JdfM5RVFqUhHqrT2HAjosYt/8Shu2+hI2nriPx0g0cvXQTR6/8icTLf+I4q3nvuXADU+KvYtaRKxi99xJiN5xHXb63NHNc5pkejwjmuYziZ8v3m4VxBBgq6CieCsW8VFKKV5XKXUDSAiC5zkodKV6ZGz6qHJ/8HPlM2Zd5VP+Y+1r6kt+t+pVwlP383pKjOHnlhjou73Us2u+zr3X2GHj6xoANIR/Sg5R9sD19B9ujss/1Q8IpFKscgxdDKzMvJB8QJMTaUDimDSI1fBQVpKmK9KJSyzt7LQKp5gSPHQlxOlNJ1skw5s+THHoEkt6EWCqkV6BWqTj4l+mOgIr9kKXaUATV/AHBH1A1+dFEBLGITXBjgY6EYgSQoU0IF2lOtp0EjALQzFyRGkqa0wIhmZeSMDKE4C2EEC6C4cXFe69BjWEb0fDn7SxYs0uBQ8kHqdWQOjRbgKSZJ1LgY2eGW3ecvVdZhzkMueZ0J1FA0lpM24UPJmxDmR+2IO9Qqh4HrkfoV1S/DSKAHExjKHYkQWTkUAGRm7VJaLYyKiK/MSwNMBlBOBnB+VYL53Q4Q7pTWhjnhX1PI5CUnJOOHmsRRIWj9Jn0k1QXV/2kQtrZf83mGCZ9KYCXfSXG5cIJIEMaTIFnuZ7ISPjoSfjoxWIsAiF96f2phsxM8JiZRWkCOZ0hb0tkrdgHM5fudMGSvx+hsMkbBCTHz5zTeR6PCoDU1a8PUPUohWgOEEIeSDypFJCHqIisFTsSL+VhaLnkepSQawUeO7u8b4nOKjekD+FkcK1hCG/MtAMsoBRGWB7WhMC80QyqIqmI7EcAybEgFbKdBowsNXILmi46hJjliYhZJhAykQDyCFrTSrPwT15RQU6gMQw7L0Fk/h93UVU5DJ4M1/URwE8I6QaQAiLNHIMpAKSE3xoQUoCUPMCP+Gn+E/egLvBR/r4eOR0vBZVnHkgCLEIKK4BU8EKghwKQAhhvByGtykezbfWmIlLAiLRlH2jl40tUPD4bUA4OqhU/bDwAP/y4EL9t2EUAcxrXbqSGjbzice31dc+E9gLadFt7tYFCItP5O3fuCjbvjMfkuWvQNPY75CzVUAHQZ/3ehAdhqK/kmRRYw3VVIFLGhcBSWW+2MzI03D/7u5g0fan6hr/uMnWCrOv16zcQ22MY/uv/lgaL4YSPJmRM1xNWCnAUaKnApcBLYx5DsaWg0jP+pVG9dhdcZSivDZge3/sjGVh7DyYgf5kGeCGQOSHVDwTMG2qFi+m0VSqFVK/pHwm8VM7U6li/frceu0/gDywP+h5R4N11nqs+WJGkFItSdCQHAWROAjgF7QiYchF2mZab7XSNYErDKXqCK7HsfH8eQshlLBJjnvvu9zbK5+4mgCwxJwFBLJgiOSBzCKAz19tYL1k3ZeZ85WX7BKqlNJ37UIFJ2RbjdQUdCfbEq20UaEsTaCvKx0guF0TlZ3ZCvepUNPbdehYLjl7BvnM3cOrqX7j2Z/rndjWoXf+lWI776SojG+IJJ387cRUjd55GnaWExcx56ZwUz3U5RNh4iDDxEIGheA0gtWcBGq6vSxnpgo660IxV7Zhmm/0mylcXbDbaGkKyr0WlOekIWv6ahMu8//q39vP9Hjf25z2+1xh73z05+86GkDaE5H3IkzOg7W25/b6UG8/TZy+gFsMDn83yNiEk8zXR0oaQEnptqiDFawjpqqgtELJAE0JIwitRQDJnnvKEOt5UkSkQydx63gSQ3gRa3lTWifmUoLqOYb/+pTohc5luCCjbCwEV+iGgxvfIUpdKycYCyZizkBYmhWkI1JxU6zlF6SdqPlFGKi9tmqHuc7bifIYYB9OCmCvSEbsUubqtQsmvfkdNFlv5/BcJu5YK2gzJJlSUfJBSlKbdjN1oN3Mn2tM6zdlNCMmckHytMQvd1J24G9UIivIzzDps4B8EjxvhEOA0cANBJIuRsJBLhAKRVEISREpeRgUihxog8muCSFoEYaRpAiR1W7zbwrmMgo9UUYYr0xAyjEBSG/NOMt9kmCgluWwo8z8Gc/t1CDsBpFKPSoVxwkYBjk3Zj8oIzAjPnALOqOILJYQMo8/ywQh4vNkFHlJ4hpDR+w1WgH5DqkETGLOdmfsskPsrgPvLo1Ab1GwzHut3HjVulWWsPTp5265ev4mEk2exP+GEgpAHTAApXuAj4ZAAyCNJhJAMF/yk0xi8nLeZGqN+JQVASvVrU/0oY1cAJAvTlGQRmg9GMfSaAJLw0UkQKRBS9WUjqiIJwMMJIZUSkt7JkOxSP2xGs8XxaLuC8HEFISRBZNtliWjDcOxmBJPFftzNUOwdWgVJAJl7nLR3ILB6L3gyb6CEYisQ6VJBEnylp4I0IKSoySTM1S97Dcxe8rvaR08OzNFQb8Gy9QjOVQPPB0u+xGoqHFhBSFFaKcWVqaISACl2OwgpgMNqJoC0zpO2hDJrAPkKw4ZfZChyobeb4ftxiwgFD/N8qpU+rmfIFLDxXhSpbkCpVcbuz9atixevYc+BY5g6azU+adSPsLEqC84QDEZUJIjU40WHZFPlLutOe5WgMscb9bB790H1IXc7PmT5S1QqfvhFDwLY0mq8eVghJPtbA0kDNprQ0fAuCGmCSDXfgJAM3e3cewyVljf5A8ejc16x7yluf09h7SMZWKt/34os+ZhGgEpdyQmp0iQkg4vJjy8TPppe/ZjgWl4DdTlOI4rWxRGG6wuisZWyd7dfrPvIbAswOnbhGkrPkyIuAu4IlRRUo8IvBYA0QWQuhm3nNkzarvkC+QT+0StYRyAXzenCsxMJzjSE/Os+P2vID1PnqeRssPoksvxM+MfvVOvPdXdBSFkni7nWl/PcbULFNGCkQEgNIPV25SDc02aoIOV1Qj2BrQ4C0NLzjqPP9gtYnnQNRy7fxBVT1q5GLEet/LuHPpB7duufjP3j/PxVxy6j27okFCZ8jJx4gKpFCUMniKTPo7yoQgVICoTU3gy1tqod04SPfI9SQqYBIDXM1WNEoG+2KRK+fwQ/Hbj7FB/30h/2e/75sW/3od2Hj8IYsCHkPVwQHoUdZ6+DfQK51zEgNzSiNmnfexT+G1ieAFKqZOs8jxpESqi1ddrIAalgpFZECpgUEClKSO/8jah2FAgpAJIgy4CRntI2AaThpdiHzPMpyfx6pQh53hSLU23/NwkkS3UgmCT8KtsVgdUGIqj2GIR8xuI2hJI6rJghxoRuYgIlwwRMGhAyjCrIcEJIKcTibEs1ZexihLRbgpD2S2nLEdxhFaKpGnx98AaUH7YZ1UZsQ/Ux2/Eh1WgfT9iBmmO3osqIzahMK/3tBuTnctkIGcO+ovWn8pFh1+HM+xjJ0OtItiMFQLogJNuGGjJisKGGFAhJi5A8kcoIIU0YaXoXjNSAUkFIztMw0g0kwwgkw77dDOd3Ynx98GY4Oi1HiAKNGkJKPk0NHg34SOjoEOgoJmHuhGcq3J19Fvr5RObw7AMPqhy9BA6XlH0iRgBJ+OhHEOlPEBnI/RQgYchvdUWvkatx9tJ1dS/8KMFHubO/fO0GK2BryHggkdBRzICQLjUkAeSh46eYA/Is6nYZjwys7C2gVRm3VVXAJjxXIJKqXpUD8s1uBJBjqFCcBWfDWcqHN9IqSKeASJnPkPZIKiAFQjr6rEeJYVvQcgkL0Kxk6PVKAZBH0ZYQsg29KCIbLjyEAsz/WHCcDsfOy5DsPLT84wiVa3ajEpIQSUFIMwyb3oBKEpLoygMpYdiGKeWbASFDCtRmCPBetZ/uFjLd6znl336fbMzRpNMoWuYL5pkrpxSQkidOhQIrWCHhniaANFSLt4OQfL81DFva0o8KSgq8NNv8XMmr+BpVfq86KqN4tRhMmLoKx06cUyBEdbR+urynB8x77Tvrg+klFmDasv0AOvUZi6wl6jFMm32kFIZU00bznM31F1VtBkK/su/H4PLlew+PPH/hMkq/31aBWA0cLUrIe4CQUrhHiu38r08pfD18hurTv/7684H25b3uA/t9qe/D5HhYsnKDKrj0amhFHqNSPZ2pEuT4lGNSHaf6OFNFa3icKVBp8SmPZVH1ZnBUQtGqLXCDkFrlH7bv3f/xMSLXzn3nrqPonMOEkIcMCEm4RKBkgrtcnK9MAUejbc4Tb843QF8OgZA0gVMSjlxp2XHspYJP/u7n8SIA8iZhXOwfZ+AgQI2eLApIUSZa1t0AjXpbZPus4DFlO30QKSpA6ZMcBHMasFIpKfCRKsCshLZl5ydh6M7zCjxe5zpJvyr7l36kZUdKd/Lvb6or/8R+guRBW06i1KwEZJt0kOuoVZGihFQQkgBSIKRSQ3Ib7gRAuvI/3gJC5iB8FRNgHU41ZIXFR5HA8HK1ZvbxeV/H+/08duzPSn3dsvvk4fSJDSHtE6V9onwKx4Dk3Bo4bBr+y0TvWgmpQaOGkakhpFZAagDpUkMqEPk+vPN9Ae+ibVUlZQm9VkCSXtSRKkekaov6UZSQYgz3ZYVhX0JIX4Zn+5bqAj9CLr+3usD/TXrO8ytFSFmClZiLx2hFXpleCGQ+vuCPxsPZgMVAqO4TKBlOABTOMOzwlmIaQoa3oXqy7SI4CSGd7ZfA2WEpwgjsHJ1XwBm3CmGdVyOyG6sZd12DCPHd13J6LSJ6/AZn11/hoIV2W4OQnmtVeK2o3CIJIsWk+IvbGIKdDERKWDaVkGJUQypjaHaEgEgDRobTi8m0ahtwMpxQ0mWihuR0GL3LBEB+u4l5IDmPIDQkdolSi4Y1Yei1qB8ldN2EkGyHEkCGEj6GEpg5lGkA6eT8oI/Hwrt0F8Ji9i8hnC9BowaQovpzA0h/Ua8WjkXB6gMwd9UeqpP0je+jFH4tN+GXrl5TAHI/IaMJIPe7IKSASVFBigLyFBJOn0eduAmqCI0fx6AfAas/obh4sxK2pBTwJUCXgjTOj8YiQsFGhlw3FAg5W5kKxyYYVxCy9Xzm5FwHx5frUFwA5OLDaL8qAW1WHkXsCm1t6QVCtqMSst48Vu2k6rEg1bWifpRQ7Ny0XEN/5THShGG1lSyh2AyvJTy6lQpSQKQJISW/Xu4yDXHwyHH1IPCkQMgbN24ijj+aPBPwNnNAvkdoYUANAg0FN1TOOTeE1Ioqgo70QGQaANIFHfkeLwI8T6XWI3h0VsZLIRWQ881GGP7/2XsP8Cqq7f3//zy/+716rbT0UNNOekIVEFRAOghWRCxYUbEhvRcbgr1XigKigIAVUEAFRFBA6RCSAKGE3qv3rv/7rj37nElDkgAhesKz2DNz2swuM3s+8661Pv1eDkAJaG4y8f9ZuskszITYKsLMjd9/Zfe+Q/LW6K+kVtMHpQIyYQfjeMLo3g9X7XKe6+Wh3q9p38CUs0jX/iyMs8RG92umYk0w41ZCet2x/0IJSVdsxx2bmbEZRuBiKEw/nfKDumL/XfptYdrx7/BeHReYT42fPBsJkJjlnTE/CSGtcUxymerIfMwBkTkgJB+0QAV+OR4AtOjQHzEMT2of+TvUV0kfA9vrj91HAdQyACEzFdKpmlCBIqAdwaRjXhjpBpDuZcDI6rBUGiEkvoOZse9EvMmthwmmina+ybeOqJTGv1lbjkgC4GCiqjgBIKHIIyxURSaBI7bbZe7bqSGkfa8DIwnX+F2OGVd1/AbgYzJAHo+x1bfb5J01+2Q31JjcH5xQ1fLd57N0n2F/kyrT7UdPAkbukquR+CZlCtSQ2EejfETpKCFzqx4VNuJ4fNDRHR8zpxs2FZAEsiwNqDbu6FSfJsNiUN8fph2UP0ugHs5lnft/6wyO5bM0LvxtVDrayA8h/QOgSDci/gFeOgZ47nYyN6oGJn334xK5FOqCCpj4B0EtQ/Xj6UNIvv9WCUqGO3btBwEhewI+9lYYGQp1XUjDPhKsYJJwsrcEIaMyLYSvAUSGqrsv1ZCDAB4HQ/2IWJFQRNLCCSUJJ5kkBK6wYY2dxCBUqQEQhTcbLlWufwMZtceJ56HPJb7b1xIPBaQagFAcIGRsn+8kDhAyrv9siRs4R+IAIWMBIeOG/iQJw+Y59pMkYpnGbYnD5kvCU44987MkPLdQEpD1OAFwKQFKN6rd4qF2i4MrttrLKNWsIhIQ0rplK4x0QCSBpBtGOhBSQaSjkmRWbZqHpRs+vmXgYwwgJN2z47APUb3gZv4oVKAEkISPqnikqzWUj6p4NPDRAEi4ED9CN2IoRgHNqt76jrpchzXup3WvKkCAR4WRUD+GAxRXJJCje/2VveWWx0fJ8vXZCi3ONzDAm5qjR09IZi4FJAGkAkkqIVUVaQDk5l17ZdA73yqADAN4rEgIqcdsYGQY1kNx7IxfSgAZ2WkUks5Q7TgdrtjTJbarAZCqhEQ9MyYkIWQUMpKzXeq9tRQKyM0yYAGUj/MAHwkhHRBpIWR/JKjp9FW61Pp4pdTXpDSrpCYyY9cct1aqvzZPQurdC2h0g88VGzffvmQ0dAf2qR+9KkjcpBOg0R27PGK8Nr2VSrcjvCWSM+3+lvt8ci7W2fnmLPhDAhG3tnwCzjmJtzoQ0gcic0ALBZMGcOQbG9IBkKxn1hnN57ZNAMlt7fAb7ZEBuoUmCnpi0LuSkbWHu6I3mefXWLC7hbiS6v5nzu/bstHfn/1A4q7oCGVkayQeQ7IjKNdfg9rQHEbhr2H8XFrGFqlYsyOydKOOPHS/Rl174eNpumN7IWR7VWxWiLlOLsf3/bpste4bH5Kdi77l/43C94FT1xnCJmBOPWHKdwZCAnoHxloAaeGjLdFvCB1zw0jOR1Qt6SiasU6AfgniwPYY8p6/f5zBexZW5kK4SicDQsYjtiDBYQosFXCRZgGkKRF7EKCyILMAMgWwj5YMq4os1d0W75S9zMp1Rvcb8REBNjv9kC1JAJ21XC7kmpCG8NENSHMs8zWX4XgtnDSKSbNulo3Sj3AzBUbVYyzUlkn4zEPzd8gKqEg5D/Edmy5yFXamx1Z+32d/z7ymP4w9+n3XEen0HZLiTMxAmzKxDBWRTpIZlMbN2sBGQtb8AaSFkblBJNSvhJBab4SxiP2J7ySUjEdbNJ+9XTYePqn1cm7qIL968W/z172/D5SGPuCHkOfkQuEfDKVhMPwz9tFMjjBDkHm/LJfyuOEuj5sAda8+BYQkoDQKSMQXc5aZHZvQMqTmfVKhzuNyWc0npGzNblK29pMScMWTgFjIotzAgMkQxBwM4jJVkVRLUmVnXbORECSsCdyyoYxkjMhwumpjPbQxbYixJsMk9NqnoJp8GjYMkIgKymFSqfULEtHhPYm+b6LEPf6FJPSaKQlQCcb3+95YfywDQiYAQsYBQsYPAYQkiMxl8boOGDnUAkrAyKcXqPt24vBFkkQQOWKRgsg4qN7iLIy0EJIKSSgUFUK+6qghXwN8pFlVpFPGolSzakgASquQJISkxXjLZRINBaQmt8HvR8PVXF3TH0PsS4BFLqtbMNV6NCj1qHyM6go45hjfF/PQdKl8y1sSTOjG+qUrPNSmFbGsMA5tEYbXKkEZGVgf6tNrhkjXp7+S3QeNa835BV3MpP/I0eNQN+4FaNwpGQobCR+t7fQub4IL9kaoIPu98YUEXdkd6lqAVsSA1HiPjgrSKCGpgAQgR5KlyI4foj8B8sKFnQpINQBHxoWksa6phqTitFrfuVIPGdEfmblRhv68XfrM2yZ9Yf0shERJCNkbSsgBgJDtp20AeFwhdaF+pCKyBiBkjY/XStJz30kgIBGVaxoPMg+AZFy/nBDSZkFWCInXyka0k1u6PMPh/bcBkNlwn2/RoRcgRDuEgLhNAhM6wHDuiafRDdtxxYbCysSFpNqqIPO5YFsA6S35GcA0umUzi/RFlVpIXIP75M2x3yrQ1To9b2MVYu9cN74cr/Zvxpxf5a6HhqnLcwVkFP98xmJ9qbDXO/ud3839TdWhAQogLYTMDSLzKiEZD9Jk03ZUkKqEbA8I1R5u7m0lvHpHWb5igx7I+Xa+KWxd/ZPffwKJi559aRwSF7V0ACOhoytz/amUkBiD1kXbgEgCyRsQI/dmjMc2MvLNKUpd/DFDz8A9heM2/GXGAYn5dANgHiAkYF0KzEBIrkMdie1uq8FEKPlYdbyX7+fnCSGTsFz5swwZvHSXHIZS0IA6LYoF6CCDlZNQoL+2co8kfooYiIBsNQEGGdPRByABGZFB2msuCGnBKkFkdWsK1Bzoin23qkmFsnDzTp6UhfiWW6DsZGzFLHlz5X7ZTbCKk25ONXzxj6/w5w7uhet3HY8VukU/vWiH1EI9pOA46ZZtEu2g5LI1QsgCLSeANEmJjAu+Qkh8TiEkSo0FinqMxu+Nzjj0t5h/FL4tzsC49DOJYp0f/G1WuvqgH0L6B7x/wP+j+gAnK5yyiKxct1Gq1e6E4PHXQyVDF2zc1FMRCaWRxoTUZa5bA4CEGokWjBh1QTQqiRJvk6ZdXpMbe7wvV946Qhp2ekFiW/WTS1KQHTOlq/wnvotclPSgXJLaVcoTTjboBeBFJR4Ud4RBTApCBZqCMCYHARDTdaNMMwlukHm7MVyICSObPQsbLqHNnzfltc+hfF7CWr0oVW54U2LunqDqyMQBP0giwGPC4LkSP/gHBY+JcMdOIIj0Gl+39hPeZ15jGc/3DqUy0oGRzy8CiPwFIJIwchFAJGCkqiIBINVVG7EiCSIVRgJEEkYqkHRgJIBkLM1CSGfdg9KDbbQYGqBkDKBW9JtLFUDGYTkGCWg0MQ+gFxWNCha90NHEK4wGLPPaw19I1MMEZnDNRn1URPZrr/qRcTgtgFT3a6oCTWzEy+r0lKvv/0BmLMxA1kzTT843NR377v7DRyXTyXSdSQCpqkeCR8eydkkaEtRs3LZT0jZnS8de7yOzN2JAQulJ0Mp4l1R80gggw6F8DEdcU/a7qLs+RsZrAkiARgBdDxSQWnKZxnqnEUBCjVr9WWQqhgJy2KJs6T9/G1yxASAd6+soIvsARDI2ZD8kqWkyeb3UQvzRKwAhaxFAjlmpSsikAVMBzzAWGb8PYyunApIqyFNBSIxDQMgygEzdrVrovAVmpztJMiDtwT6vIwM0lHypnQx8JIC0ZgGkVzll1FNWYZUvjKTyMYcRWGIbjclboMi7BK6knR97WdZmGLd2nDRL7XWS44UKya9nLZAn+78KV/1d3FTo47EQcuzEmXJxlVaoQyQGQqKbAFVBFgJC0s1d3XRZ0hW7PQBTc6nT8lHZDuDM65MfQpbW/vZfOXL0qPQc8q78GxAymKpkhY62zEf5iHGnbv1aGghpY0SaEAmAkCk3I9N2W/lo0lztu2enfxj1Lb+b40VLLrvW897gWvhT+PGU97vOfZuzMidsOCjVACGTAQxTAZBSARhTYCzdVp2xBh2rgdJnBkpWn8zPZ0oy4CMtARY+cYO8tXqvVhKOrtDnnDx1hLbAl8j0TQck5TPsK6BXTQsftfSBRS+AdMHI6lhWA5S0MNJdWgWoupQDRqYC3mld4HeikPim8w87ZDkycWMn1PLsX4ldJ7RaWDVqbFf9w4bZmw9IwykbFAybjN6oI3WnBqhFaV2s8weRrF9jdGvnsjsZkf0eCyKZtCcR35n69TZZQpVoidXHGehr/n1H8/nr0V8HZ7cP+CGkf5D5TzT/wD7ACQoVRnVbPYobbsQNY3xHKiEthPSCRx+ADHbgIwGkD0K2l/K4ae/82iz5LvOArM4E+EEW4t/XbpbPv1sik2YulRffmyEdHn9H6nd4TiKb9JHLqz8sFyc9LBelPKLqyUC4bhM8aow+usQyZiSVkmomkU0wIFEwlJEEkVREhjZ9xgBIwMfQ5iNhI3Q9rOlzUqn5c1K51Uipdss74nl4kiQO/EGSEOcxkSpHwDyvChLL8VRHWhuE5XwsjtuGMI7kAuOijezH8VBGMg6gmtc9m/EimcAGBhDpNYDIWMc8KD1w1c5jyKrNbTEoo99YIlEEkICPsci8HQ0lJ7OFG/jlKB8Bw6h6ZLIUH3gEjAR4jAGAjH4E73/4K6kGRV9YMyhICRsZZ5NKUwJIusGrChJJgFCGQp0acNUAeXzE1wB6+80E9kzcNJzhscVJ7f5DhwEgqX50FJCI98iYj1RE0tJoAJCb8J50lLf1eg/q3Meg7iSAtC7nBkQaNSTqA5mxw5ENOxoxIGM1xibqT4Ej3N5Z97psAGQsAKTGJEUG8qies+Te6Wny7JLtMmjBFhkICDkAZiFkP0JIGCEkAWRvxISs98kawMcVJhakAyFrj1snCY+OlmDExQvFOCOALCyEDHIg5Ftjv9L2K+1qIR7EzB+XSnAs3H6ToIBk+AcLH7V0qSDzgZB5ACSgmYUaChztugMgmUm6DBR5YXgg8/boGch4fUjr8XyKgVr4CTHuAx1lDA/mIOA9hlCRrvmEMfzrPvhtuKm3VJBrsl3nBpBUR55CCemCkExKQwh5QcUW0rLjINmJmK02xmXhj/XsTpbPt/0hBznv9gk7tXvvfrnx3sFyUdU2ZwRCmgzvUIcjWdf839Yq2GBfLN6x54SMVLPhix1jLy/oz7xHE+MQTmJsFW8/Su7z2HE5AYXi8F93SsVPNkiqAyEJ3QyEBFTkNpdVx3JBlgowSUsmiITF4b2RkzbIlI3OeVTnAsXosw6AzECSm2u/3CwJyEatCWMsfAQg8yobCRkd+GhLQkkvhHQvO0DSAkhVcmKblngfQWfcpxulG9yvs49Q/Yg/PZaSa7uC+5zumvZk13/y09ZD0nB6JgAhYlwCFJrEQSwZ89LUI+vSCyJRp7rsgEcDHwkgc1puCEm37NTpm6XK51uk5wrnXF7ssXo+1rN/nwrug/668dfN6fcBP4Q8by8mp9+I/g7vr6vC9gHOow4iwULzDn3MzYIqIQuCkFQ+WjMA0kLIYLgtVoAaxvPkJ3LbFxvlu3XZiEd3SA4dOSLHkcXyT2TuO3HyTzmAm9+dew7J2vRsmfHjKhk7dZGMHP2D3NprnFS/+WUo0AYjW3FPKV/3SQmkG7eTtTkYIJIWBIVaENy2gwEhQ+CGHQq3bAMiqYp8DolWHGVki+EShuWw5s8iduQzEt58mFS+/iXx3DdekgfMkRTEfEx8igpHKh0dAJkbPA7EdlicGty4ATF1me8jyESG7URkQWaMSMYCJIi0qkjNoA3XbAWRDoxkIhnPK4CMWmIZcSNjuIzSWgwya8cQQqKMfh3LbwBcIiFONNzL6VbtAVSkmzVjEGqMR5bYrkboSPj4EG06luGS/eBUCUfczBC4tTPxTBigo4JIwkisMwEN1Y8VkQ07CBA45aYXZNzXfyDJC2P5YCJ7Pk4cccO358AhYbZrt5ks2AZEUgm5PitbMrdmy3okZ7ldFZCPGRfsRn0BGmkEjoSRLM0yXdI9UEDGQQFJpamCR8bdhJLUg7ibZh3bVYkKGImkSFHdZ0rN4T/LwIXbZcgvWwEhASLnbzdqSJT9FEYaCNnbgZCPI2lNTcSDrP3RSoBIJyENlJC1x66RiI4jJSgambGhRP4rJaR1w7alUQ7dJOWRvOGLWYu0DUtzXD0ewAHAjCY3dJfLcEyByR3xgMSlgCwQQhrQaJVULAkjGXdOAaS7jDOx6bg9hAASmXxj4H4948flOG9Z2PD3uLZoh+Ah4a+w1wr7fgsh73j0WYWQzE5uXKxZvwSPbjs1hDSfo4rSQMh/BTeVJ4a+I4ehoqMKzf6mvyxd/Q+9S7YhRu8VrbrKJRFtMOasAtK6Y5uxmCcOpFcNidcxHo2hP2GZEJIhExgG5rff07QPFwdC6hfgPwLEEydOyOEjxzAXOizbtu3Cg1k8QF2RJtNnLjI24xeZ+s0CmfLlT7Jg8UrZvn0nbJccOIj5DdzOOb/x/WGAlaL7Ce7r4eP/lV4/Z0v4uDRJ/TQD6kICSJYGPtoyJ4hMB4ik5QSSBJB8P7Mz07XbMykdbt7r5fssN4QsRn/mnARtNnjRLvFMgPrSq4B0w0dn2Q0Z/2rZBSEJHpPVoIB0QGQiAOQLf+yVA6grZuQuTt87d+czX69kO3Nczt9+WBohYQ2VisyercmDuAzLCSIxRyF85PbThJCEmVYNmTwNWdGnbZGaM/EwmOF8OCZKMaw/d21WjLFRis47/vr0t7O7D/ghpH/w4hrhHxT/xDrgNOW+nq/If6CEDITyUbNkF6iAdEFIuIsGQ6lF10VCyICY6yX80QmSPC5TboOr6a/pO+BWt0eyduyRnXsPAkgek5OYrB8/yUm7mcRx8k47ion87v1HZNmqLTJ68iK5s/fHcsXNI6QqoFC5uj3ksiu6S7n6vSWg4QBRNSQS1YTCJTsEEDKkKQAkDRBSDeAxDCpINWTTDgOQDGfJ7U2fksptRsBVe4wk9ZohKYwBCRhJEBkHV+14xIwkeMxp3OYYXLvjaXhPAl226abNxDVURRJCwj07FopIYy4ImQNEEkY6RhDpQEgCSS5bAEm37DjEoYwC6CJkVACJkstG+Qjo2NUxAMiYh6cb+PgQlrsCQN4/ScJaDUd9wbUdsR9D4e5OABkG4BhOU9drgEnA3YCG/eBK/76sSN9tZq3ORP+8Gw/Yr517D6nbtQJIuGCzNADSWXYUkHTBzoAyshMBZC2jgAxnlvVGvaGG7AvgzczXNABIrLM+ojq+L/FPzFQX61hAyFgCyEe/NQCSEFJBJGJrIgN5DNrF0weZ1/vOkXpouwG4iRuEWJCDASEHEkIugEs2jBCy73wDIZkpewDs/hlQY4xdqVmxa368BvEgkRV7DDJkwyq26otEH+31ZpsQ0pcRm27Y1kxMSAsfNSs2FJBUQQYAsFWr21nWpG3WtiwdN0v5XHvQ1vx77pVPoEzEQw5kww4AgNQ4kF4lJFSQOA/5ElgAdjhqSB/EMDCDkJHbjArSByONCyg+h+8pG9VOIurcI3MWrtHfzhnnK599LJXXTN4P8lhsWbjjYn86fuy4NL+tF7KFt1Hw6IWQOQAkYeRfQUgDIA2EvF7+FdRIegx8V44cOY79KxqE1APT1jt7/50P58Wzd3T85sL1idz1wW9YtyFLPFffg2zW7VwQ0sJIjEWcp/Ia+oyCSDNWdQxzHfCRDzzLIsxEzeaPSPau/dqHC3tu437xj5+j2nbpH+tl3KRZ0mfYe9LuzsHS6IYeElW7syRc1UXCcK65tHJbuTyynVxatS2W28gl4a2wvYPE1essVavfIe07D5Neg9+RV96eonAyEyE/DuFBq/vvfAtjkretkE350HG5c3aWVKUSkhCSKkiAxByG7QohbakAEhDyU8ccGOmFkASRgJnReD3183RZtsfUS+7fL+w6++Yv2w5LHSQ/SUEMyOooqVL0qR9dy/mBR7hvV6dR3eh+3YGQdMs24BHfi+9OwnpNuGO/h/iPRzBvJYA8Lx/OFngt4nne6ZHOwpwth1BnGZKAemPdEUQSQlqXa1U8OvDRrXr8KyWkUVYiQQ1gJDOHJ0zdKtWm7ZQRaw5gB3BOwbgrbHv731+8c7G//vz1Vxr6gB9CFngC93fg0tCB/ftYtH7KiQH/Bo0YI5fjBjyAN/BUGqnldsG2AJIlACQhJKCIQkgqi3CzEdr1I7jfbIaL6XoZNisNsfgAiOAKmw7X7K24cdgP1eWJP6GMxGSE5QmoJKlCoPlcoXSXZPfuQ/Ljwg3y/Iez5dYeo6XWjU8jjmRPuRxKyXJImhIM11lmzQ6HS3aYNagew5ohaU1za1inGrIF7TkYgCSVkfhcZWyP6fShJDz5tSRR3Qg3a7pkxw1E7EgLGwdgu3fZAZD9EVeSZrcPsjDyF1VEepCsJvalxWLKX8WDOJFqAJEeWIzab94y+hW4WgNisYx5FcswJrbxPD1fIh+H8vFBKhwBFQEfoyx0ZKnKR5ZQPUL5GPPgNIWQdMVmxvDQlgCzUI4y2Y8FkJoFGnE4w6AEZDzEIGQsZwKWh57+Am20Tyv+v4DC5+N44o3j7v2H4Wq9Wy0DfYpGAOlWRFIFuRkJaDKhVOn98hQpCwDJRDOMA6mwkQlpsBxmDetMUhPV4W1JgALSA8BI+BhL+EgFJBP6OPCREDIGbtox3WeIp/d3EjtgrkShHzRAcqFBC3eqClIhJEBkf7WcELL3T3DVBoTs9CVu3MasMBDyIwMhq9Ml++3fJLThQ6rao+KnYAhpYGRuCBmIhwLl8TAgpckjkoVYmfwrre7Y3Pet2bslteF9cnEkQAQT0WgSGiohHfhoSwc8+mCkgYwKHXlucsNHXWfMSBiXqcID6LgcQC2uwb3y5exl/Gk9H52P46D4+8RjK9r1gp/j3060S9zV92rcTI3rCPgYcFrZsS10NMlpCB/VPHC1j71OLqzSTN79+Gt9SFVUCMl93Lxlh/y+Ml3+WAVbuUFVbb+vTDPlivWyDEal2+8o/8B22vJVG2DpsoK2Ol1WrsmQlWs3wjJl1bpMWYH1ZfiugwcPF6v+ilP37s/u3LUXisC1Zv+RyOcPNXNMPC4e47Ll62Xp8nWyhPY7ba1+5jcs//aHsw3lUtTFMn4ex8f37d93qFjHyD4y98clcinORRU49qg2xnjzxYXMD0DabQSRzjI+q1ASEDIk6Wa5LKKt1G/zuOzec6BQSjTuD/8OHj4mC39bI6+8N10BYhhcuy8IayoXhDSR/4Q3g7K3jT7w4EMPzoXCqt+mmeTDUjpKWCqtE849tyAjfHspB8B+SZU28u/Aa+WC4GZSznOjJF3zoDzW9035eNJ36D+ZcvSoSejG33a33fm0zDnghj3HpMUXGRKhEDLdgY8sHQNITHFZKsGiY4SQvmWfcpKxJQkhI1HWnpYha/edGQh5HPOTboirHDuRsBCJUNQA0QAMFUSydMNFLlvwqCUS7GC/LIQ08S8NkKQrNr8jFYlnmMQlETC2+mcbZPy6fZoEh3V1PrXd6e0L95r9z/sfu6O8sGwH3MsRAxQQkpmxmWCmxudMNmOUj4UprTu2KY0akhCSWcSjpm6Xpt/vlK2H/bEhT6+9SmMf8++zv22L1wf8ELIYk3J/5yte5/PXX8nWHyckoyd+C8XVjVIeN5K8wQ88JYSkAtINIeEqhQl7cBQym97zpsQiU2EqlK0kFAAAQABJREFUJntNx6+TaUs3SfrmHbIKMSLXbkR8vu17ZC9u4o6fOImseVBD5hp3BE0GgtG9ydzwcv9OwpV7+aqN8tpH38ldfUZJ7ZufhWt2XwDJXlK+AeJFwj07jFmzmzpZs5siczZiIIYDSFZs/owxgMiKaowX+bxUAoyshM9VAZiMvu1DJLH5EjByrsaMVEUkAFO8moGPBI/xCiDnGghpYWQ/bO+HbQPh2j10gcQhcU0sQGQM7aVFKBejBJSEQpIWg0zaMXDVthaNZbVX8D4ASMaQjAEUjXgEMLELASPgI4Bj1MPTDHAkdHTAI+GjAsguU8UDWOnBeyM7jZEQHHsIVKRh1yKrOBWQWDaux3RD7gMI10cC6z0pVZoOkec+nCsHjxrVWWGVJedq7LKv7Nl/SDNdZwBCWujoBpCZTlKazdk7ob7dLX1fnSoBOMYQJJqhu3UY1Y9QfTImZDjKUEDY0Kv76PaIm9+QBABfDwAjXa4JIBVCqhLSUUAi+YznCWQjR/xHDzKvx/SfKzFQyFaDKvbaD1bCFXuXKiHpjj3QUUGqEnIBVJBQQvaBEUIOQNn+8zSpMZbxIFfBLXu1VIcSsjoUkakvzZfgmndgPEEBCQgZYpWQXgWkVUJivGFbbgjJJFFlcaN+3Z1DkRjiBG7U/yzUzfq5as/T+h2cC8ZM+FYuhkK7fBwUkAoNHQDpzYadUwVpIGQu6OgGkApECEUMGGEW7MCE6wEQrpOKqR1k0lc/83RTeuss1/n0tOq5kJ9h/WxBmAPPVfdKObrIK4AkhERd5rC8KkgmoDHg0Q0h8fAL9R/gaSv/qXitTJw+hz9RZNUMP9v76Q8ltuH9ktq4i6Q0uleSruosyVffjZLL92L5Hkmxds09Ur3RfVIDVrPx/Wq1mjwgNa99UGo1fURqNXtY6jTvivfjtWvuB6Rbz58oMRjB6yIVRWPGfyORNW+XlGvuk5SraPfC7pZkNRwvjjmpYWdJbHi3JDS4W+KvhMLPGtYTGt6j25O1Pu6V6viemo26SM2rHpB585cX/Rixb+x333z/s1wMWFch1sB+H4AkjLTAMb/SBSH1fehHTNSVdBPUiC3l+s5D4FUBd33ndwrq43zd/jHR0bRvF8gjSG5VrdYdciEUjf8Jb47+e53OZUJSEGcWQNLMa+y51TyoMOdZLNsHrjzvYn7E9zJeb3hKB8SPxQMSxMS+vEpLuSC0KfpxK6nd7BHpPewD+Wb2Io27bfeloP0tke1wj2V/WrHzqDT+IlNiPklTZWNB8DFlImAkLQd49EFIhZGAjuqOjTIJsK/axAxp/M0m2X7ECfFSyPONt150X0XmZO6Xevj9JMSCTAWApFoxD3S0EDI/+EgACUulATK6LQWf4/clf5YlcQCRcdj3YYuz5YRTT959KeoxlMjneK5iK5vSTqt3IeTOg3OzdL5eA7BQs1wXAkC6VZGaRdxRUxo1JFSqiDmZjG0JU7dIwvQsmZh5UPta6azDkr1H89eZv/7/7n3ADyFL5OLgH1h/94FVGo6Pk+O5C36HCuguKFugClJ1EW/2MSnHU39fHEhnGa/biTkhCF1A+ZmQ6NZS5boBEofkGnTHqDE+QzpOWi9zV26R1Rk7ZEVGtqxEltn1mxFPafdBOXIMkCTHuOMkyTcmFEjiRoIgRWdR3FH80X07Ewq47xatk6fe/Frq3f6yVGjQXy6tA7AGVV9FuFxXBIwMR8zIcIDJcK4TRsIqAUhWggKSSWs0cQ2T13A73lsZ76t63YuIGzlOEvvPQfIaAEWqHfvNMesEjWpYt8twxU3oC1iJMr4PXqcBSsYhgU3scKohF0s0XLSjXvgF5S8Sg+XoF2nY7lgUyihASkLJWCS6ieo3W6pB1Rj54HSJfGiaRAE0Rmk5VaIQ45HGWI/RVD7SukyTWADI2PsnI+7l6+p6HQb367BrAWYRP1MBJOEb4msSxNEl+fKaj0uDO1+XWb9kaJ1SdXS+Kubour8drnNUOFJRa12vbekFkng9a8cugO4dcme/D6RsnccBGXHcBJAojfVDsiMqH7GOugi5qo9E3voOXLCpgJwhsVA6xhI2ukq6Y8fgtZgnZ4qnF9yv0Tdi4LYfDQAZCZf8qoPmyY24eRv6C5SQcMc2EHK7DLDu2C4I2QcQss+8LXLtZ+uk1li4XwNAEkKmjkUJaJ846CsdT4wHyQRRBkJibHF8qVkFpL1RZqw0ZwxSaYTM9pdUbSW9ho3SscSx4h5TpWWZnXJN2ia5AvDnkgiCQjwY4fERRJ6uqfoKdZMLQnrVkQQceK08VJDlYm6QT6Yu0LHwV3CjtNTh2dlPA3Zm/7AE0BCu/3hoRfh4egCS4LEACImkQ2WjWktwXDuZ/dMSc076C8iU3/HhQqGfvanLcPlXpetwPWOWcxrb+EZtZ1tSMVwe202JZajfysHKRhmjGu5yLNMuhZfAv8JbShQA1obMbWb/XNeq/Pbl7G0z18CRb34m/19waynjuVnK4NjKRN+ox1kWx8X+XE5LHJeHx0jj8TvmuUmXy7Bu8PmyWC+L9uQxV4L6b926jUU+Ro4fPjR87uUJ8u9QJC5iiBeNu1oEJaQXQjI8xU1yQXgLJER6T45x7lBA/+A5D5RW939tepb0e34UIPMDcmk1gEdk6i4XBXCO/eHcJggPM7jMc4qeF3KdK2yYC/Owx55z3aV9GHsLzs9UriOZGM7b/FyZyLZQSrYAmG8nNQG1n351vCq7uWPaNzQ+Hped9ZLoTw7Ym4ukMVQ0Jk4EhEQma1U9okzmslNy2a6nQDHJ7bRUrwFGElASQsJlOxkPo5MBASMB8jrO2SpHTqBNinGMHNoHj/8pd84EOEMsyFRCSABDr0t1DuBo1I8KGi1w1IfjDnzUbSaBDt3HvSAS2wkikyYjlACUlv0W7ZHDdMHGj5+98Xwuvtv2M1/Jfph18Li0RnxIJvepQYP602YJN9mvqYy0VrBC0gJMd5kCAEkImYTkNJGoz4cxPzqG80Jx+kDpboNz0c7+3/D3kdLZB/wQshgXR3+nL52d3t9upt04GVmXvkXqtuwKl8TrFCja7LMKIQkivWYn3XYibiBIIJWRMddJ5SsflLh3lwBCZklNuGVfMW6D9J2xQeHjSkDI5YCQK9O3yxooIzdl70csyJOnPbljAHneeHASg/+423ozQnXl13NXSdenpkrc9c9LGVVHAjTB5VqBJABjJQDGSgohn4YbNkEkgaRZNuvPAkICVDYeAhsklVs/L7EPTDSwkTEiASIToH5LJJAkeOxjLB6l13pjGZbQC2Wv2YgXOEc8gFSeZwEgARcjASGjRiyUyJGwEVwGnBy5CNsBIF+k+/XPEoE4gxGAilGwSMDHSAc6slTr8jleA4CExWA55oHPoYDE+5BMJaw1kvIw2QzhIxSQCiKRSTwMGcXpjhwGCBnasBfgXDe5d/AktIFx1z1f4/SwnY9j0rpl5z4DIBH/MZ3migFJKJnBuJAAkFvggp2FhAJ39h8t5RBDNJRKUMbDVADpA5GadR31QQAZcfObSEIDBSQyXKsbthc+GhDpUSAJANltlsSgTWOgfo2GSjXKsQi44kcCVt8LFcmwX3aYpDSqhDRqSAMikRGbSsh5W6U/IGS3uZvlyvFrkIQGENJJSlOdyxPWI+HQGMSDvB43sgVBSPcDAN8Y1AcBuPENhMsib7bfHP2VjqvSCCG13REjdvirEwAdWsEtkipIAsPThJCECmoGMloIab4D26wKC99HAHlptdYy8q3pCAlBBZc/ZtWprot6/sV594sZCxRuEeCcPoS0AJKlo4RE7NMAQJoAuGJfWrWFRNa4VZbCHZh/p9qPgl7jdeFP9J22nZ+TSz2A+Mm3AV51RHmrMYyrEDW8Rsif2wDMQlTlZkKRKEDDegWMqwujbkCilcdkzz4qeqCWLaE5I4/x0OEj8tiA9+SCqoiVyGRNzBivDy5w3sAx6AMM97HpcfHYcPze9/EcQ+uI77hNglNuQ8zVDlK7TTc5eMAcY0H1fKrtFkIOfH60jl8+xDRJoYoGIQOgggyMA4RMvln+DyrDl96dopCToDNHogvMDWz/zN69R/oAPsbW7ywXVW6hbtYE0eYc4oBHe47A+UCV0QogbwCQ9JkbQvIc61Weqwrdnn99pe8BCd/LB0b4boD3MhGtpVxka6l+bRf5ZNpc9QLhec7sf9H6+qna4LRf43wK86qpa/eJB0lpCBUVQjqAUWEjgGNyLrPb85SqkjQQMgnQL9GBkI8BQPHvtPcrn7HFzy9AdmeFpUgSk0qjchG/QdjodrlW+EjoWJARQtrYlgohqd40gJLxID343N0/7pDdThKa4uz3+fdZtgOMbY9zydS0vRL/CUCjxr6kO7pZ5roaISSXFUbmDyLVlRsqyjwQEtuSIUiIROzOJrO2yZq9x9iMxeoH5199+u9//W3i7wPF7QN+CJnPRa+4ler/vH9gloY+wEnB/gNHpN1dAwAh254WhGSCDLc7KGPRBePGMhyxk+Je+gFZ97IQOBxxZiZslKs+XieTlmbJarhjL3fUkASRtI3b9kIRySQEResrVvHAWRWVlZu275MPpyyS9t3GSmXAxEAkXAkFhKsEMFcFLspVmiMxDSBkZQWQgJAAk9Yq4XWFlXhvJcRSrAhQVbXVc3BxnixxgI/qmg0QmYBkJMYMdCR4tBbXe7bE9YT1+F5in/xO4rpBPdcNEAvbo+CqHYVEMxEAkMYIJKGWHPGrRAFuVYXLdcQDBJBfADhSCQnwCNho7HOUMEDHKFj0A1NQThHPA1Ml4vbREtxsCDJgD0KCHsJHCyGxjDoIvQZgEsq/wPo9JfjKXvLYiC8Rm/M4p4KotvNTKcd9O4p+sSl7r2zIggLSAZAbckHIDQCSVEhSAbkZceo6AUCWqdsdruiIgwkISeAYdrUBkaEssU4lZMhVfSXiljfhgg34CBVkLFyx4wgg6Y7NbVpyGfYk3K/7AEBCFUs3+WjEDY0e8pNEATBXY3Ki5xZJt+82A0IiKQ2S0zAmpHXJ9qohASH7IkHNIJRdZm2SOoj/WAcKSKuEpDt2nfHrpdItI6CcMRDS545tVZCm9KmQOQZdSsgEoxgsD7Az64elrEIntl7RxlZRx2RxP8fzUfqmrZLapAvgAWIFUq3kqB9t6bvZt8pIq3gkgCRUIPDwQUgvgCTMVAjJuroJLplN5f4nX5d9SIplxkPpqqvi1nXhP88bV5F3xkyHYvA6rUsDFFGff+GK7VNBumAkYkFWgCt2BUDIiys2k/otHpa0jC36G4XfN/Ngas/ufVKvZW8oaDE2ANWo6CdMVDjnLXMq/A14tEp/89CND+JM34PaE+PsIsQLbIhszwcPnKEsv0W95mFgb9uxF0lU+sh/qtCd2CRrYsxUhaZU+PGhocLUnMfkfZjI15z36XESFMII/BPhjn3AAa1FaQPCjWM4d3d88CkAwDb4HYRMwJgL0DFpQaQdh/mV6Ev6fn6GBmANCBkMJeS/Q5vJqHEzABsBm6FQc+8fO80ewNPXP/pSEqB8vLBSc7kUcV6pBK0AxS5DzbDkd5pzgD1XOBAS2+0DC3epIFIBpXndrOPci3NSfmbOTb7v4jk6FBbC44CnCa3DQ8/K4qXrdP+53+7jOKfLCm7/Jx+t3KsQ0qoaVeVItaNaWh4IaaFkHghJWAkQmQz1YyIgXwJAYcQnGfIkHtDpX1H7PD53GA+Jhi7eIZHjoVwkXFT4aADkX0LHfGGkiV/JZDsmAQ9VkJlQBWZIs683y+r9J9gyCuvOaZsUsY4Kt4++Pnfs5H/lnrmMsZkptaiEpCu7AyBzlG4Iifd5Y0byM14AifZwlpnsJoUQEtnL4wAhk5Ate2JG0R9uFO74/Ndxf335+0Bp6gN+CHlOTvz+QVGaBsU/ZV8xA5b//fk/eaD7y1IGcR3VRcneyPBmJocZJZbN0mshSCAm2ap2gEuXZ8g0qYl4MLXh3lHzUwSn/ihD7pu2Xuav3yarACJXZGYjRiQMqsgV6dmyHjH+Dh0tOohkO1EBYVUQnOzyBmXe4nR57JmpUvuWkYCKTMICNSDgVJVmwxAH0g0iASaxrXIzJKtpCvUkVIS0SkjoUpHuyw17SLV2wyX2wYmAj7NUFRkHEBmPxCRUPMY7ykeFjz0BH7sjYQnMA/UcYwiqe+8jX0sMYg1GwaU3Csluoob9LDHPQCE55Gep1u0bqXL/FB+ARBxIN3yMAHyMAHikRd4PCIn3EkBG3feZVL7lLQm6dpDGfwzFvod6ASRAZJMhSMBjlJDlkVk8oe0z8vbkxYI5J9QPiBV4nrrqcuLPbOmZ23dLmgMgCR/zNbyeBQXklt175TYAyMvqPCnBgLEhgMiM+RiC5EUKHxVEInYoFZCwiBtfl0TCR7YPE9EAQMZB9WggJN2vYYTH3dGGAMgxA+c68BFtRwA5dB4UkPOkClyx67yyVPr8uFUGLwSAdEHIQXDHJoRUEKlKSAMhO32DbJtQPuaAkB+vkZqjVyDTe0+FOQSQwXCtpjs2Y4/53LFzKyEx7jj2aLhRLocb3So1b0MiDZMZ+3x1sS/o3MoxzNfeA0i4AK6TFXDucSsg3cs+EGmOXcGBhY9e4GFe80JIB0Dws5dC9d2gXU9Zn7GNp4ySAwGlaO5hz7FPDnhdLkb8OyYNKQ6ErOBAyAC4Yf8ntIk0u66bbMKYLkp7MG4s/zZt2ibJ10DVHw3IBNWfVTP6IGTuaxrXOa5ymoYlQT/RY8Rx8njv6T5Cf6OkVJAcGzw/bsU5r8H13eSiKrheA6yajPEOcC3w2p37uHMmd+K5hpmgO3R5vljXBrbDwUNH5Mo2j+kYMxASilnvmHQeEHhhoIWCtkSfwms+MxAyAA9ZLkIbfDnjFx2r5lyBNnfafV1GlrS/e5D8O6CJXFKpBVTOdEUHfCSEVBBpwwbgdwAjCSLNAwt3SRWk63xyiuXcMDI3fLTfEwxlJS0U+08LQz1fioQ2oQC+YybO9GbTLuiceLa3Hzn2pwz9IUsixiJOMV2rEVok1QLICVBHwpJhSU7JZa/hvSkTLKw0pYGQdO3OkHjAv/jJGfIGlJb8K+qx8LN/7ELcSiROifsEsFAhJDN4n0LtmC94tO8nyDSKTV8G8I2ApngdyshZWU7yKed6VNT9Pr8/Z9oDjSILtx2E+3wGsoBnAEBCVQoIacpMVUFaGEl3bbeZjOR4LwClNS+EBIBkcp9kWBIgZBTgZt8lu3D20o5Q5L5wftep/x7f3z7+PlCUPuCHkKXoRqAoDez/jP/EcKo+wHnBC+9MQpwvPKnHzYKNC5kXQBoI4lNCYoKtEMS4MFWIuE4ioUKk6wYhZC26zPAJ66i18uq8TFm5aYcqIlc7JaEk3bTXZ+2WA0eOnZGJCeGavVnmcW2FOvL9SQs1w3Zi++GIGzkImbWhjoTysSpgJKEk4WNlqAgrNx0M1SReA8iqCIAXruUAxFPsJeHIJB150yvi6fo5wOP3Egd1XHxPgEg1rEP9GN8dJZRzsQ6ApMpO1XRU2SHTMjNXRz2CGI+PfQX7WiKgeKwGqMgENBoDUhWQUEGqAtIHH30QEu+F+jHq3olSqf1LEgRlX0gTgDYAx1B1wQZ4ZAnYygzgoSjLInFPi66jZMHvjsLIAbbsDyV5M11Qf1RFK5Q+VDjS1To3fKQqUrch6/omZF/fCuVTnze+QEzQboCxJgZmWGMmoiGIHAgQCUOs0FBAaALIyFveliS4X8fSACDj1AyAVAgJMEn1Y0wPgGS61EMBadWP0YCPUUORtXzYfImAVR68QBq/t0IGzqcKcrsMgVEJyWVCSCaosWrI/vO24bVt0v6LdEBIKB9VCQn4SADJG783F0tg3S5GXWMhJMCIG0ByOacSEmPVuVHm9kug/Gl8U1/Zs/egA+ZL33lv3/6D0ujGJ9WFkgmyFBa4lJBuNaQXLqIOdDkX2LB1Y5RPFnIgdh7gRLn4W+WrOct5iuDd2Bk59xTUp/8+283Dni69XlY3dqN+pGt1EZSQuNZYCFkBLtkXhDWRHoPekCO4DqBBCt0eFkKuQUbrqCvuBoSkEjIXhPQ+UMsJHH0AkupiYxZyMykKQetFlVvJw31eNt2lCPt3pvoAd2A1MnZXQXzKMtG8/hLUG/WjDaOiSshcUFVhILaZa7stea0HFMT4IYS8EDEXB438SI/RPhAoyn7v3rNf6rR6BPvXTh9qsi71AYIXRPrGYu6xaaCvC0LCnTkwvj3iXUIVnXSDLF+b7to/A55n/virpDZ9QP4d1FjK4RgroD+WRVgLjYeJsgIsT9gAhZCYtwAwGyOMtMucz5wejCz4ffwOAyCD45FYBwCS7tkhWA6Hez8T2VxWpZU83v8N2QYVP/+KUtfF+QxdsQ+f+FMGIExI1TFrvRAyReGiCzaOB4SEUl9hJJa9EBJA0kLKZAdGuiEk1XXJUzLkiy1UDxd+TPPYCJmP46HyC0t3SdRHcBfPBRcJJBVKAnqmuiwFy9bc29UN2wJIlgCZxjZKDFSWw5bskSN8UovfLU7dnv+fNf0NBymHoDJ9FJ4acWjDmgog6YJNGGkgpNc1WxWSPhBpYKVRTtplk2HcKCIthKQishruBW5BVvNDWrdF6wvnf536j8vfRv4+UJQ+4IeQ/puQv/kF139iKOjEYIHd9/OWSJXqHdRlia6K5kYmr3rC3KQZN9BgTKxpQcgwG4zs2oFVW0q120bAVQZP1OHawiyENT5DJsOP0qTRhDXy1aqtsi5rl6zetEvWbt4la2BrN+1UMEkQue/gUc6MzkxfxASbx+z9w/qqtGx5e+LP0v7x9yS8MdSRDXohQ/RAiWgBd+2mAwAfB8JQAmLRKsLCmVkaMLISyooAWZUAuiLbvypxiNmYQNfrXnC7hmIuHirHeMBHquviaFTWET5CAemBEtLT9SvxPPyVgkhmtI4CeIxS92sqHy14pPu1cbuOoDrSsUgt6YY9FfU7RsLgUk6gFsqYh4x9iP0LJ3jEvjERS0Wsh2gimoHy9KgfZa+6X5tJZ0H9oKS3Y++Q0fmYbIQLtsl6bZLQGAi5U6GkBZJUSG7cugNqyT1y71OfyWV1ewLGGvVnaCO6YsPghk9TCAn362DEhoy+Y7QkoZ1iAYfj4IIdD8VjHI3rjjLS090koPEw+zUS0MRA+Uj4GA3oGPUUAORTCyTy6QVS7amfpfLQhXLDhHWAj9kKIIcQQMJMCeUjoKNVRA4CqBzw01ZpMiVNwWPd8WulNqzmOMSHhAtY/DOzpEJKJ9yoYswBvhkXUR8sMQDSBSEVzNkbZY7BGxCDrZk81Pst1ONxqJlK102UPQ99/u3PchkyfAfE3awPRDSrbi4I6QUXBcBH7+sEDYQJDlww8eVMHMh7ur2CmKOlq45KcozyvMwxyn1oe+dAdXU1Ski6zxoXWq13L5B0Z8dmFm23GzYBJA2u2MiKzbiQ/xfcSAY/+y7i/TFOcNHOVTzXL1y8SuFjWSRhUVdjKgPpbuwAOAMcfbAx5/UM1zX0F5qv35h9LQfl7GsfTNHLSYm1A65h/Pvt99VyGdV9GCPquaAhC8wy143xAUVuc47LHh/KQIAyglZev5m4ZdBzxYOQ7CPZO3ZLdIN7VYkYREDqhFSwoRV0TOd6YGDGrOlLPhUk1YsGQl6KUDEx9e+UtEw+TDN9kXXx/FuTpDyO4UIAvfJo47JQOTJruyYcUhWkAyGxbEAk+yV+x23af3EOdUPIHMs8h+StOwMgDWzM/7PX49id17U038E5Uwjqm3DyEriNX9XmEVm1OoOHY+YsGADnoo8RtO3A3ODOL9MlZuw6qcGHYYhNnKIG2EjwCCOAdJvdrjAyB5Q0yWuSPjFKSA9AYO1pm2TeDoa7KOqY/q9sPHhCrv4cLt4T0jGfpCu2o2IkRFTY6GTtZkxKuH+n4PcLNL5HzUmeAzjGBDqe8Ruk8/dbJOvQySLv67loszP7G05/w3j6Jfuw1JwEV3rO2Tl3dyCkhYt/WdKNmzE6nZLv5zJjbFIxGYV6vvKrjZJx0IYCYh8vWp84s3Vwbsaaf5/99ezvAwX3AT+EPEcXfX8nLLgT+uum5OqGs671iMUVW+8OKQeVEG8WePOQUwnJdQtBDITk033jbmRuYoKQFKNS0x6SMm41Jh8ZUgOTRFp1TAzjRq+V7jMzZNWWPciQbSDkOpTGdmqZsXWPHFIlTHEnJ/y823jT4vvbtG2PTPz6N7m1+/sSfFUvKVe/G+BjP8SRJHzsr+7bdOGuCON6RQJIAD4mrqkEsFUZ7r1Vmj0rUbe8C8g4XeIZAxLuuwRZXrD1KFR2NADI2Ee+ktiuXwJCfiExAJAxSCYTTdMkNFA2UvkIwGiMbtdQPN5nbbLCSLpgV7npbSgehxkXY6j8whwLB3gLx36Fw/04HNsCG8CNHNBt1PTfkJHQqEXO5/HFxjqKmJ5ZSEKTsW23Zj+3CWh8EBIKSADs9Zt3IEZktmzGje7DwydLuSv7SHAjqD+boF7QPqFYVhCJOgkhhEQ9BDfsK9G3j5JEAEgFjk4MSDeAVAiJ170ZsBn7cSgA5DAASIDHKIBHtWd+lkhYtWcWSsTTi6XzNKgnFhI+bgN8pNrRByG5zSoihwJC9obbdkNmxkZimrqfrJU6n2B53Fqpi0l/9BPj4UII+IhxFwIXS0JIH3jMJx6kC0IqSMAN7QUVm8prH36l4QiKo2Qqib5iIeR93V9EVtnWBiB5lVOAKd7lU6mo8n+NgICxNglbyiKBVnz9u+S3P9L1hFASx1paf5MVth/xAhsgecnlTkxIN/DNCSGdOme9EyQVBCFj2gIYXQeA3kTeHjUVCt6iXwe5f7PmLkbGaICoWPMgzbgq43qmENIFHzF+bDgRLQHkDIA01zQDIQGREI+wPNzGQxDLb/IXP/AnVGVcEm1ox/SX3y5APEjGS4UrtgMgbXk64NHAMwIxtBHOG3SHD06Ey3nlljLh87lFP0ao7Pm3FmrUsNTbdQ6h6sxc+2ggZH5u2dgfjNUANcRw1BLHiYecDM9QD8nzNuPhE1oA2OR/Mn7aD8gM3l4uQuIXhm6g8pFZwQkg1QXbgZABVEKqEURaOM7+6bP8IeKpwGQRXnNApIXc6p6NY7u8cnNpfN3jsiF9q9bfuepb6MiyDVCo3eT1EkcICfjohZAOgPRCyHEAkblN30NY6RiUkUlw5bYQMgau0w2/ZHxFgqcizOkcd+gZmw5IzEd4YMe5pKodLUh0ylNBx/xesxASSs2kiZskHmU8jmHahgPoVUXYz1J+/4gjlt1HT8qDP26RGMzVFUISRBIoEiJasFhgyffmNQoRGGeTMDKOitMp6fIr3Or5e6aP//Pq+lyNbf/v2D7mL0tDX/BDyFJ+ESkNncy/j+fvyZATxEOHjkqD6x7DTTpuvBjknoqsPJYTQtp4R3yizxubYNyYBte4UxLeXYQYMYgxQwiJp9bVMelLxpPm2qNXyWd/bBXCRiohaQohCZcUMO1Ecpm9cgKZL30TlaLWGyc4PuMxcl1nmVzB3669h2T2z6ukc+93JaDuoxJEGNmoL2JBQvHYqJ+WFRVCQl0IuEdT4AelXUW4dIcz6QvcuiM7jYLyEclNVAEJhR3crQkffQASEBIA0kMAqRByGkCkyXIdDeUjk80QMkZaUwA5GSBykkTch9funSSVbngFUA3KR+yDgY90ObaGbQCjBJEBDaD4azVcRk1bRm8r/BW1/s7N57h/XgAJZWMmICRBpBdCIvlMOlyz6Z6dBhfsjC2AkFt3ygNPfSIBV/ZWV3QDIKmAdACkAyPD4K4ejHqJRvsYADlD4hUUAxi7FJAKJp9EfEioWmOZgAYJZ2IUPs6XGMJHQMeoZ2kLvVYVMT0TRi6Vx2ZslqGAkEN+dkNIu2xcsKmCfGZBtjw2O0vqTwR0hAKSELIuVJS0+ojFVanjSNwgI6Mq4KNVQrohpO8BAOCJF0D6VDgVAHkui2otM5iUBn8WWJSW8y73eUv2HolrcKeCBIUqXvBIYJEftMgfOuYFYwaEBeAcVRZZap966RP+nHMjdG76eWlphwL301HhbdSYi10U9CjEyaNo84EdBb+ngpCAj+UBIS9Hv72oajP5etbP2i5FDRPBD08HoLssGiAqluDRJG2xKkgFdFT5e4Gjo0zzrtuHagYwEVoTQpbDfkbVuE2Wrdxg9q8YoLTA+j2NOSjHNG3shJny/0JaqeJTVYZQROYPIXOp96jmY3spfCTwI5inQvU61BXOH9Vayk8L/3COsfAqYe4b/5YtT5OApNtxLoM7vFcJ6dvHv4aQ1h2bQJKwtb38GxDytq4vyO59xrV33OTvASlvlEujoFQlgIQC0sSABLx0KSDpiq3u2BZEoj/6QCTPC67+Cuh5ZmAk+01uc323F0bifI++FwoQeVlEG2l5a3/ZgWsg/4rTT073s1RCrt97VFpMTpcEQkhAxdTx6yQFJS0Z0JGWBz66timA5PscEOmDkJkKtFrM3CrZmmW6CMeE/nQSiv7eP+8Qz0frMY8E0PJCSEcFmRsyTgCYzG32PdzuLCcDtiUBkiYhM3QUtrf6cpPsAIjjfOR06+/v9r5PN+xDHM90k208D1QsCEbmgo+AjfSAIpRkwiCFkCiTYLH47q82u5PTFKFPnMZ58u/WLv7j+eeOyX9K2/shpP/E9o+98P5TBvmpjtPePDzQ6yUpA7en4CTcPOQBkC4lZJ6bNkJI3MDR5Qkg0vPsl1Lj80xASMSYAYSsgckHQaRn9Bq5CUqwZZk7NQ7kGrhgWzUk1ZHrN2M73LO37TogJ4rtTsoJTl4zE3z+7/s7CvfVT7/5VZre/aKEXfm4BF3ZXZPSMDGNwkhVRRJE5oKRVCASBDbsI5VbDhdP53EGQAJIxj/yJQwwsisBJFSQgI9qiPsYozZVYqCAjFYACdBI9aNjUfcBQAI80h27WucJEtb6ecSxZGIdxjlE3MNGgI4KIJH9mRmgsRyKuIdBDfrJVZ3fkYXLs3CzahL2nKrdS/o1TvgPo+437yB83KUAMj8I6QWQ23bImsxtcnu/sVLuCgMg6Yat7tdWBYkyhMrIa6CEBCSO7vwxXOUR3xGAON6x3AAynirWnrM0C7oH7tcxT1H9CAOAjAaAjLbw8blfJMoxQsh6b62Q3nO2KIAc/PNWRwlpACRVkdYGz8+WZ+Gy3XkmMmM78LHeRAMg605MkytGL5eQZkhKAwVXzqy2hP5uc5RcGH9GzeTc2GLslQXMqVqjkyxbkaEdm2O6pNv3dH/fnn/GTZsrFQAJDYAkYLTwsbAAkoDFAkqqn6DEUxVkW6nR6H7Zjpij/Dvd/fO/DzcBDmD6fUWaeOrD1RagT4EWwI2vrlnnXHfMqzrLqYQ0rtiAR4B7FTxtAGBaycVIJjJrzmKn7xb+pkNP9tjHl9+eIhdWReZudcH2uWEriFR4nx+E9MFHPlhTF1o9BkK6dlI2Gte02rfJ2jST8KmokLS4/Yjj5CQe0D3/xkT5d1Vcp/mw0I4Rx+XZp4S05win1PHgahvv8RFCtsWYw3EChC1ctMppg8KfP+w4/v6npRpzNTSxo9lHnMMsJM35cMGOUVua/cvhjg1ISrXmv5C4aOhLE+TYiZNI6DJDyiH+dBkAxADMUzT7tYJHJwlNPhDSCyIdCFlYEMk+/deAMjd4LGCdfUzr37YN5083Ig5uW2ndcaDs2XNA26C4/eVUn9e2wgRpbuZeSRy1WlI/XifV84WQ6/4CRK7LASkTJ2xQt+kEQL4oAL/rZ2XJgZOciBX+fMsxveXwCbkSD7OZkTsV35mKeWSqhYook7mM36QxLqXGpnSV9jV3qdm9AR4TJwCMAUQm4EHg+6v/2dcEdrhlO49IXbi9J7COMW8nRFSYmAdIFgAe+X6XadZy/R4IEfAdEfjeN1btlT+9D3HYJwrfL07Vr/2vFf7a6a8zf52VdB/wQ0icCUu6Efy/72+DkuoD9ubhdbjDlcGNSHBSR0yKCT9yqyEdJWQBEDKEWSerNpeIR9+VGtOQBRjwsSYmH6qIxASEashYJPJ4bna6pG3dK2sBIddCAUkQSQiZhmXG+1sHEJm95xAmK4W/Ecpbh3ai4yt1hu/8x/dzgsw/xiQcN32hNL5jpITU6wZ15JOAkH2MS3YjCyFNSbdnGoGglgCRTH5S7YbXJfaByUYF2fVLVUBaFaQHLtgeAki4YRNAeiEkYKMXQhJA0u5B9usOH0gwMl4znmEo3MG9KkjANYWPV/cDBGVsyz5IatJHOvWbJNn7kNgBx/RfZMDOWxfnzxhjpTMJzUYE5c+A2pHw0QJIVUICSnL7Blga1I8bt0ENCSXkrT0+lMtqPwkXbEBGKFKZjIbQUVWQBJAKI1FXcM+OvGOsusp71FWeEJJxO43bvLrOd4P7PNbjASDj+8+RuCE/igfwMeZpKCCfIYCEQQEZDfAYPdxYFMqo4Yuk6jOLpDVcxAbOA3xUFSQhJLJku+CjhZBDCCEX7JDrv4QaeMJqqQ83bAMh10tdKoVfni/BV9wvwVBCmiy+dty5AaQz9qDksu583ptihEW4BCqmJjf2lS0INcC6PZ/bPr99IzS/6/HhAFK5IaQFFIUpc8IWQkgm4LikUlN54c1JOtZ5zstvP/zb8u879hoxYdIcCfIAClNBpiCFpbtt3NupNKO54kFiOTeEvLhyM6ma2kFWIuEK/4rSBtrncc4b/tpEuQCuypoVG9cvrwqS7tgFQEgbt88ASAIhGo+D8Lq9XI4+WR/usoeQ9bmo+1eUY8rzGfRZPjDrcN/TcF9voWEbfAlfch6feUjhApHetsrZPozHSdB6Oc4fqY3udZKkoA8UYXzYPvLKO9Pl0ogbJSwZ8wh1g88FIdEO+oAB8wjtO7b07qNbCcn+0g6AroV8OftXYRKa8ojPWQHzkwCEragACMtENASRPhdswkijgMxd+lyzjSIyJ4y0/RV1pP3WXVenXs6rfCwAQFIh6UBIb3Zu9kscewjsP5VaIwHS23KA8bHxl6cPnKF7FW0rfNdsuDrHjlqlEDJ13DqjhESZQnUjwCQt6WOoIbXkcm5zXnPUkYlQRCZgnhcPYBg5Pl0eW7jDTK+KsN88/s8zDko0QvlUB4hUCKkA0snETQhp4SN+k/PLgiwFr6np+5loB+rP8ZlIdrNObv4mU3Ydh/dNEfbxbLXPuf5e1vXeoyfkppmbVRmawvoGULTmhot5lzGH4TzGZQox9TvwPSjp4h2B9urxS7Yc8Na1VvlZ6+Pnug79v5f/3MFfL/56+as+4IeQ/+CLz191Dv/rf/8TiL15mPXDbxIQ3VaCqITMExPSAhEDQdzxs+iOTaVRMG5Gg6o1k8o3DYYSEu7YSFBTCxMTwsgacDlNxdPs2NGrpcEHv8uXK7bC7XYvEtU4akjHJduASIBJJK/Zvf/wGZ4Y2kmPKS185ATsf4AgnITyb8eu/fLMm19JvRuGSoU6T0gIMmNrYhoLIqE81PiLVCNiWxiUkqpMBBQMubIH4mIOhQvwaIl7eJoTC5Lw0ZoLQiIOJN2wCSCj4IKtCkgCyLsmSMV2r0qgZnamCzagmqogoYR0KSArAk5WqIes3S2fkn6vfiuHMInkH9vzvB63qPjDx6CAhPutAsitxgWb8NFtdMlOgxt25rZsdcPu8eIUuaxmN6hCkfGayXdQJwZGGvioAJKwFuA2GgAyGRmuTaxOAyDVXZ4Qkq7XTEbDZEIEkP0AIAf/ILEOgCR8VAipAHKhAZDPA0I+v0iiYJG04Yvl9slpAJBbFDwOVgCZE0KabdtkGCDksHnbpdnn66UOIOSVFkKirI+wBYn9piDz620YPxhjjju2eQDgGnOEj9Zw066QwblpJzy5sFIzeRQ3rweZhKiUZfZkn80EYK7V5D7NqGvAihtsFWY5JyxgMpoA1E/Z6DYSXaejbERMUVTQ+T9GzrM5ib1GfDj+G7jIAhIVEkK6QWROCNkWCVGuFU+NDpK+cRu7AsJIFO2ae+DAIXm012tw7UZYEAAqjUfoQLDcSsickM5RPxIOKYDk9YyuwOg7gJCXVmkhTW7qjnNqyZ5X2QbMHt72jn6AVXTHZmZsC/QI+qjyNErP3MfnA8au8aGqQELI9nIJ4sk2bP2oHDhwuMhj488/GUZFZOiL45E9vZ2EngpCcr8JH93mnM8IJk1cSNMGTF7ERC4P93tTEhvdo9ntGeuT/VDhIwBkAI2eGFCTs8wNH806YLh1y3aXjjrSFz7AwkjTD/KtO+++2vo8BXQkeMxjVEPiPO4Yoaw+VMK4uhgg8u2PvtVwKmerz7EvUZH20R/ZEvPBSkkFjEsFSCSITIEl07wQEuARrxdoDphMRJmA74gfl4ZMy+lS9eMNMmAxz7ecWhVyTGP/eJ7uh4d3UfCg0WQy+E6raFT4CLCYpODRiUmJ3012m+Mibl3FU6zLOMqkcRsMhATgHL26ZLKTF7pOCluHhXg/46zyr+8vO+BGD5gLcEgQyczhqoh0lT4ImRM8KijGZ7TEvN9mIuc6PaKi8b13IiTNziNwe9d906LwfaMQx3U+1bF/Xwp5DvC38z9mbPghpL+z/2M6u/9CkPdCQBUSgdxmgABPvU56M6OKLFVCWhDCkgAyHwjpTLB1sg53yqB690iNj/+QWpPhjk0AiQmIxobEMjMqVnvjd7kFrzNL9oYtgJBUQxJCetWQgE9cxut7cFPECQvtzLad92udr/d9v87G8N9WxGca+d43ktx2mJSB+k4zTxNEQn2ortkKI6lG9JkqFBvCVbhhL6ncaiRctCdIfFfjjk3lo8cqIOmKfb9xx46+fzKWp0g04j9W6/ihhDUdhoQ5/ZFUxQGQCjodF+yr++K7+yDxzEAph31Kvn6k/LTMBLRnI56tm5YzVfes2wOHj0LZ6FNAusGjUUSa2JCMBZkJF+z1WdlyR9+xDoAcDLd0owqlOpRqyGBVRNING5AWANhz9zhJ0mRBRunohY8OgIxj2R1gsvf3EocYkHHIfq0KyGeggCR4hGkMyOcQAxLKx5gRi4yNXCzRsMjnF0vcS4wHmSnDFmTJoPmAjzCWdpnrZts2eQoxIfsyKc2njAO51ighCSBhV07aIFF3vSxByOYbAvfKv4aQJoGGD0IaUHJh5aby7kffcBgXScV0ptq38N9jbn7GTf0eSqB2GtvNKOsIVwoDH/N/LyFSYOJN8u+wRvLsy+MBWPwAsvBthPOK9iyRxwe8hdijcHd2IAxhUc528kEZjTmoijJCHZ8a0gchmZSmjSZUqtfiIdmzr+huqDz3ZSOswy13D5VLACFDknNDSAvo8od0Vg2pEBLXMx4f+04FGGMlPoRQJfwrKiAtUp3nc83bDoV4/NX3Iu4l3ZQNeDQgEsuOa7Zx0bbjwbZH3pIKYSohecwXhjaWDvcPk8OAnMV5iHUC6vYb738ayYEwT3CB4MAcLtkEkC4IqeM8n/1DO5iM9jzWG+USeGmUQQzIAK/6Ea8D2lkzikiqIl0qSCSuqZCPBWCbGrK0BzgWiNJrCiaxbvuv0ydsv//rkn0oP/jo3ua4ZRPo2+NAfysb2UpCUXdz5zE+59k5X1kI+cKirRLx/kqpDoBIl+yUj9cCPtIAIQEek6H2zwEfETsyaSy25Ta8NxGWgM/FQzkZBzgYAdD37tp9Om4K2/953AdP/CmtpiGMz1ioLQkc8X35xqdUpSYVmTktGeteAxzNEd8SIDIW267Bg0S6fBd2//6O72dDTVy/H3N1uNRTcUrvJQdGWqDoLgkXjSHcEub2aojZydBLup2lY7wPiAWEbIeQNJv4oBTta+oQS/mc5/zbbP34S39f+Pv3AT+E9J8E/ReCf3QfwEQAT56PI95Sy469MQmm8uBWQEc3gPRBSJ/KwipIzMSaE/YgxM8qj4l08mtzpdb0jTqhqfEZJiMAkdVZQhHp+WCNxLywWMb+vBFKNwJIuGA7rthpiAvJLMhqAJEboJQ8dLiI2RX/sk05ASrIiHMEmYb/lEV/ZMo9fUZLUN3uEoZs2pUb9wd4JAiEXdMbJbNRW0PsRigUw6+CezbcpMMRszAKbtVxDxFEIjs2YkCqG7ZNSEMAiW0eKCCr3PimKvtCr+5nMmADclL5aNSPUFzC3ZtwsyKS55Sr+bBce8+rsnTddt1PHMV5P4a5j7zJ3bgdABLtngmlY14Aadyy03GzvXH7Dtmyc7c88PREuaxODwm8apACx2AoQ40rNgBkkyES1IQgEq9hOeausZIEdWMsIGMc3K0tgIyH+pEKyLgnjQIyrs9siR/0o8QiAU3s03DBfhYA8jkoIAEeowkfFUCihOqRfTUG8DHmhV/VIkf8KnXeWi795iIpzfwtAI/WfBDSAslB8wyEfBQKAALIeog/Ve+T9TAmpEmT+thWuXVfCQZUIIQMyQ/8WwWkltbFkjewHHdInAGVX1kk96CSmX/FgQjnesLHPsG/xwe+Dpfy1lAtGlhkgIoFKbnLvMDCQIFc7+PNPWAS42WGp9xY4olFznXdntnfM7D4nu4vycVwTzbwkaDOtgXr3i6zNBDGByIJvIwphIxpBzgECImYkBeEXivXtOmKcBhFP8+zD21I3yJXt2XmbqjykwAhE21WbJaFhZAEXABYSIpyCeJV9nt2FH8CELLk1JD8fSYGqlTndilLaOVASI4ZL5B0QKQqDAuAe7adTHswKQ1iLgY0lEf6vCLHj5/Qa17h+46pl5PHT8rVN/eWck5827zu2BZAOhDS+6DB3XfMsgJIwkALAKFU5b6rStLZTndqmoJHW6orNt24aehnHsYeZRIk9jkso9/RAqCwtBbIuJiwALyfYNaWgXRXd1zWbZ/2hsHI0d/z7r/7fbmVkBZQeiGnHgePDeMGfe5iPFRqfFNPzUZf+LY4jbkA5nvHAPl6zckQz6icEDIF4DFFISRgpIWQuaFjAesJAJHxsNhx6VIN8HDihv3stoWem/AzP289jN9fg6Q0aQCcUC8iOY0PNNItHOvcht/zlT7FJiEqtxtFp/NZbsPnEgE0I3AMAxBKResX9XFW6vkv56Cn0Vbn6DtY5yt3HZEm0+CxBLEA4216ISRgosbjzF164aPvdQse3WUNfI5Ji2p8miaLd5jkUqa+C983/unt5D/+82fM+NvizLSFH0Keo5O8v8OemQ7rr8czXY8GtrFeewx9F+5AzaEkYVD5XBDSUUHmgJCYiJvJNibPmEgH88YtornE9f1Man+9RVInpQFEEkIy2PUGPCFN0wlulReXSvt3lsgv67dBDblD1gFKrQeMZExIumRbCJmG+JCbEOfuOG5uCCzOTttzIpSfEZAYSLIXruHvTYRirsVAxF98Eu7XfaTi1b2lImAjgaMCSQWRjioSIDIMasbQhlAuoqza9mUo9D6VaLhlm2zYJvajLt/9iYS1GgH1I9y58blQKiChtlQAiWVmvuZ3hOB1xqAsX6ubdOgxRjZlF01lcHbq8NRtwwkuAWQmAGQ63a8JIHO5YXvjQuK1rB07ZfvuPdJ1+GdSDi7ngYgBGYw4j3S/DkYMSOuGHQTwSCVkEF2wO4+VxJ7fSVwPJJmBq3VcN2sWQMING3BSs2ATQNL9mvBRjQASKsjhVD8SPiL2I12wRy6SaEJIAMho2ou/SeTIJdJ07BqNAUnYOHDeFscAIREjchDWWXI7y6EAkXci7lTtcVBBAkLWBYSsO2G91McE/or3l0lo/S4FQEiXC7YXROaGkNfLpYjDGl3nNlmz3kmcUYpuqNgvjiIWa7Obe8hFVXwQkmoun6tiLrjovfnPDb7cIACvEUICRF0Q1lRuuWeo7N138CydP07d90tivJ3p32Q7HTxwBO3UF+7OrVSZZoGQhVo5y9OBkG0Ag1qjfRpJ+zt7q0oVNVn4NqKSH39Ll6+X6NoAdFAVGwhZUEzI3GpI+zCNpXmgZlWQFZCwpQyO950xX+lvlJQSkg8W+LcA2avLI3ZsgGbEpju2VUOyNGrIv1JCeiGeQmFASECv/wOEHPb8WE18wwdvhe0/dv82bdwucVc9oJmrjRKSsSqxX6qEzAUg6Yp9CgiZsz/Zse0e8wZQWrit0FjBo4WPFjoCQFoISSCpAJIltuMBjjUmSeJrVrWrMUFRRwZEmvmNAZF2zsPSvT92H3OWPhhp+pYbSLohpM3UXYHqVMb5DW8i74yeZvrdmT6n4/sOYU516+drNDFNDcA5dclGmeJYMiAdTVWPY1CqrUFpLNGWcJfmNq4n4P0KIT9Ok+iPNsh3WfBkwV9h+xM/8/JvuyQSD6yphEyAJY6BQYmZ09Zi3THvPuZUahpFJ+AjVZw4tkSAyVjsWwJs/nYn5A/OIYXdx7/b+1nnm/cfk6ZT0yUK7ce4mUlQNqbQqIyEMSmQMYRXYoglNQdAAjLa16vjfcYw58d2WjLmPLU/XS9LkACHf6b+bOmv/79bf/Ifj79Pn24f8ENIP4T8x1+AT3ew/D3fZyAkeduEz+fIJUgUYDJkGyWJwkjcSNAV2wsgMfn2Ta45GXcgJMtqTaXaHS9Ira+3SjLcXWpMMkrIVIBIunrUwFPWmDeXS2i/n6TvpD+ggtyuIJKqSAshWRJEUhnJjNlbd+6DWvNsntTtZCh3SXco/C4m7SyXr82Szj0/kPArn4Db+RMSDmWiQkgvjDSKyDCoGWlMVkMQGVy/DwDiEIm49QN1vY5E8pqoByZJ1Y5IPkM1X4PeChkJGkMBM/Wz+nnfciBeC76yl3TuOwHxMjmROzuuWme+j4vsO3QY0HGn0MWaKkgDIamENGpIN4DcunOPbN6eLV2GfSxl6/aSICSbCWqMBD0uABmMbcG6jerIoRIJF+yEXogBiTiQ8d0R5xEZsVkqjPSqIA2AjBuI+I9IPuNxwccYgEcCyGiN/Qj4CBdsCyCjXzTwkQAy6sUlEvPSMukwJV2GQUXBxDRuCOleH8DXACkH/LRN2n2OpDSAkFRCXoHJuIWQNUbMlSAA/1DEMaMKMiQH+M8NITHmEnJCSN4oX1TpWmlyQzfZxxiq3sn92RwrZ+67ub8bMrdI3BV3AqYySy9AhQJIH4Q0N/qFBRYGDlAldlHVlvL2mK+h8PKrXYo2tg0A27lzr1zR6gm5uBoUYzj/+1SQOaGLgUcOhMSDKQNacikhqVCDK3b5aEDI0EbSpdcIdoUiz0P42Tnzl0nF1FulHBM8qRLyVBDSdS0DDMvtjm0gJMIDANCVj2orsxf8zp8oOXdsB0LO+v4XKQPISoUh3ZINhLQAEtdrZ+wUCPeooKSaUJV3VPxdh/V28q/Aq2TyF3O0/ouS1MxCyN8BgivXukv3zR2T0wdLHRDphY92XOfXh+y2/EAf+xf6lDUFqoCPfAgKiGcUkAZGlkX7XR7RUmN7XlqlpZTF+aB81dYSirYNT7pRqtToIJWr3yShWA7GtjJ478WVm2uyHqrMqYpU+OgoMS0cNfOf09l/N7T0gUj9ToWcBJ3G9du0CxJpAX6Xg7o96ap7ZPfuM/+wEQ0tu46ckHZTAeWQHbs6wNzpQUgXjHTgoxtKKoQE7POMJcTKkBX7+fC4cOOa+/Yn7L6ZW6TaB2slFt8XPwau3qOxrwCNpzIDSu0+OqUFqQ6spDqy2pg0ueHbLNnrTZJy5q5pRTvHlvzvs52yDxyVW7/KkBhCyAkZgJCZJgM5IGKKQkYT253x3d1G4Ohbdy/jfRMAIWFJcIGvi/n/4h1+CFla+4h/v0t+nP4d28APIf0QssiT/7/jgPjnHZMDIQG1fl+xASAEk3iqHunOBvjoyyrq3LgpgMSNkFcFaSbZnEgTRgZHNgdw6wr4iIntVMaDdCAkYCQhZC2oIePe/l1CBvwo1XrNlrHz1gE6MfbfDlVB2izZBJBu2wslDrwJCukAAEAASURBVP9Kqn3sjdaxYyfl/Uk/yTUdn1EQGcRkNHDNrohYkEYRCeBI1eJVVEHCACFDGsDq90LiGrhzt31JYu6eIFU7vCMVAB8D6/eUEMR5DMF7QwAzzecIMOHSjc/yu8rX7y3VGg+QZ9/5DlmlrSq0FEAV3Dzv2X8IiYay0bY7ACENgGTSGQWRDoSkKjITkDIb7tebs3dKhz4fyiW1e0IBOVQCCSEBcIOuAXi8xsBIgsnga4w7drXbP5AExHf0qAoSSsju1gAhu0MNSQhJ9+xeMyV2wFyJgwLS8yyVj0b9SACpBgDJ+I8KIFlCAakGCBkFAGkhZPLrK+RhZJEcOh8Q8ieAxp+sEtKUA6CApPUHhGRcyB5zt0hjuF9fAQhJ+KgQcvx6aYBA+3HdJyI2GZI4YLwRQFozKmQLIXFzDPioWbFdEJI3sbwJvwgPDe56dHjJAZJiXD85nucuWCblEAKiTBRv9gEpAJEIUQpUQlLhSPMqInMua4w4B3JcHt1O4hveJ0uWb+BPlSpX9ZI6z+X5XQeApW3IEs8VdyPpCGAxQVYB9Z8XQhrIYhVrXjdZB0JeGHKtPNH/dW2fPL99Gn2L52W8TT4cP0MurAyVJhK2BFlzQf2c17ECICQfojnjqgJjlGJ8BQNC/fLbmhLtP/baM/7TmXJRRcRdRrgUE1fRByB98N6MHwMiXWPDGTcmhiLdmAHxCCFjr5MLw5rINzMX6rXV1GfhbrYILvn37Xe/IK4i43GaB5gmIZCzj3zAQOMYzwEhXft4yj5l3+cAbgsgWfJYYAZCAhyjzS4FbLwIXh3BAK4J9e+SJjf2lL7PfCSjJ8yWSdMXyuKlG2TVmi2SloG5R3q2LMfygsXr5NUPv5DOj78grTsNkLh6d0oQoOZlAJNlEGrGwGoDHnOen+y+5V/65kpuCGnhoy0NsDfHYsDn5dVayPA3PtO6PZMPYTGLkhXbD0qdscslFXCuOpSGXggJ6JcCSwbwo+VQQBI8OpaYazkBSQfjoIaMw2di8Pk6UMllHjDJ8gozrrlv2w+dkKaYK1Z5FxBy1FqJGwUQ+eFagEioLZFMJtExrptllmbfEkeZZa7rNlVs+uAl1ZCV8H0jf98tJ3nuOKsPtws3jgpTT2fjvaz715ZuB0QG8IVLfSKTAQEwakIggkjARBrBolouGKkg0r7mLgEgU2HVALxHrdylkNlf76Wrb5yN/ub/Tn8fYB/wQ8jTmOj6B4t/sPy9+4ABWrvw1L1Osy4IAo8s2VBm5Xvj5gUE7if8mHzjJoBwIBjqgaDUDpL07kKp8eUmqUn4OAkxIamIRCKOWrDE91ZICBRp5Z+cI1c/96Ms3bAZqji4ZUMBqW7ZDoBcb8tNAFiIEanxIXHDWVJtQTWVJvLBbUE6Eud0H/m5RDYDJLziCSSsoYu2cc0mSNQYjg6EDEZ8yOAre8N6AlwCOjYaAPVjLwms112CASKDoagM0YQ2AI8KHwkge+M7+kjZK3pKQvvnZdqc1Xqzzf/O9wQ0bB/ezO7Ye1DWIOvtekDIDWhbQkg1CyGdkgrJrTt2yRa4YT8y8jO5oFZ3qQDgSNgYiBiQgQCQCiIBIwOtOzaVpbcBQPaaJR5VQUIBCSVknNccCNkDIJJZsAcgDiQAZCyyX3sAID3Df4YBQD5P8yWgoQKScSANgET5koGQVEFGvLBErvxgtfSFupGu1gMAINUc8GjX+2N7fwBKumvfP2uT1CeAHAdXbCohASDrYUJeHzd/VTu9LIFQ6oQ5Ksj8lZAGQqoKUiGkvdG9XsrBpbAskkEx6Qr/SkO/cI9d7vOoCd8gu3dzgAMqtHCDf0oIyfOMy/KBFqr04nYAj/8ARNz96EjZs+cgfwr147+OFboOHAi5clW6RNS6A0DGJKY5LQhJqKfXBRcosrH64PpaBmqv8tVayfsff6ntUzQA9l+4Ef9XXnl7MrJGt4DrL+NBOiAyBwwjeMxtbhWko+h3IGQAVHFlAZ5iGtwj23fsLdH+YyHkiFfGyyWRAKNIXKIwz3HBDqR7tqOCzKkctucKjhkLuUwcRY19iDiIbAOeQ377Y50eY1EUw3b/Jk+fi1iVqP94zh1o5kFmTiWkVQ/a0rWP+YznvA8bLIQ0D2FUDck+pjCynVxctQX6QXOJqn2H3HzPUzLm09myCh4MR/XhnR7iaf139NifsvT3DHkLKurbHn5Oouqg76OeqKxkP8oJUk/vWKwrtqogXWPDKiHZRlYNyeO5LKqN1Gr2sOzcvZ98yDl/2bJo5zLbVku2HpSU0YCQiPuYSgip8BHxILXMBSEdwOcGkD7ot1phXwIAUxxAZCygXzWAwFaICb7/hO50oc67bJxFWQelJq+P766RWKgh4z4E3IRrdgIsHsvxH66WBJTWErGs8JEA0mvcL2sGSBJaxuN7PQCl329xYhP6IaS3fVj3Y5cjYzrqJ2FchiTSJdudgRzzFmYbZ6ZxNXg1ES6mouS6F066ttvX+Z7KH66SN1bskpPO/NBci4rXnwt9PfPPAbzt7a+7op1D/fV2ZuvNDyH9JyX/ScnfBxSuHTl8TO57YiQylkJBALVFnpu2XACSNwh8yq83CrgR4FP8IKgQAqLbSuzASVJzxlapwSzZBJEoawBA1oQra3VMBEMG4oYF6rXyj3wl97wzHy7Z29VllxCS8JG2zinXbwag3GiUkkeO4um6d0J+Zk+Gp31xwcTV/i1cliH39h8rZeo8JmENe0qlRnTFZqxIo2YkXKQCMhiKxyC1HgofFUBCRRkMC2nQA4lsesIAI2F08WYW7goAkJ37fSKrM3bqz9Et/LT3sQT79ImTfyKu414DINF2xr0eLvaAjQSOVhFJF23GBM2C+nHT9p1yS78xckHtHhIA1+tAxHoMvIYAkqWBj0EEk1gPwmuRnccgw/V3BkAyGU3P72FwyfaWXIZbNlSSCVBAJiAJTRzhI2I/Ej56AB49I2iLxEPwiOQzHif5TAzUjzEvQf0Ii3oZ9tISlEslEq7Y7aHwGAJX7P4/ZcEIGw2ItMss+zk2AElrbpiWCRUkACTg4xXjDYSsCwVB7Td/xXF0x3hhUhrrim3VjywdBSTBo1VAonQrnC6PbIM4eJ3k+x+Xmf5RgokzCtsvucNHjhyXHgPflP8La6YunAZC2mPMp3QBSJsV15Y8BxkVpFHpEZJdHIF4fmOnY8z4b3QK2z6+9xt37LnzlsCFmmCOwMdRQuZyUdXrAOGKNQdAErJ41WoOhGScvssBWQKqtpJPPp+r/bdoEPJPxBU9Lr0Rz/jfoU0BIAkhLYh0KfJyJKexMJIQMieItErIQMTluxzAqWbzR+XgQRP+wlcn5/a6Y8FRt/5vysVV2ui12SghAcMIxNzmVRnmgntewOWALnXFvg5K6haqFEzP3Io2cMKPFPLaYffv+VcmIJu4gaQ53bHd++ge17n20c4lCirZ32BmzuH0M8Tx5LnycgBCwscr2jwh7330taxalyV4Zpjjj+3HfdUQKzxGC6CcktsZ91OPB6X9I4dfvnqjvA6VZJ1mXdEGLZ25EeEvj4dxOln+1fG4xoZCSKzrGGFpTLN163gxSXLKYy718vtf6K6Yh0zFO5eZtvqffPb7dgC+PzRGt4JHKARtHEiNBakqSEdd6FYZKuQD3AN0dJuBkKtUCVnp/VXSZc6WIqnzeaAf/4F4kO+slGrvrRYP7X3AzfdWSTxKY1jGw8CEHLZKErFO825XWElgaSwe+xz1wSq57ot02XyQKs1zO45L6vxxur/Luv9k1U7EzEQczo/TASKhhkQSnyS6Z49zso2PA4jEcooawCPW1Qgh3Wa3ozTvRaiG91bK2yt3+pWQPPf4zV8H/j6gfcAPIf0dwX8y8PcBMznHrP2tD6fL/wFCBkFRwpubnCASN2wKInNOtr03BZg80/0psFpLQKIXpM43WQoda0IJWXNyulptlLUwWQmlEhIZjMs9/q1UeeQLef2bPxD70cmWDdUjAeQ6xIM0BpcpqCHXAkRuRKKak3p3UcIXct6ZoN/wb/e+/5+99wCTotje/5/n//1dvVcFJS2bc94lKVFQwQwiQVAREyYUFZCckSQgCBIESQJKzhkkSc455yXD7pKDgKj3/N+3qmumZ9kFdkAWuD2Px+qZnaGrK3R3ffo951yUAROXSWjpxuJTvCFAZEskrWmi1Ix+VDlCAelbEsCxJJSPJRsARuqS237Y9iOIxHf88B1/gMoAuGHnKd5UWvaaKSmnrVh/ZsF0F49VtgcB5OHUs+irZLjTww2bEBJ9qUCkHUJCFbnvSArcsFPl5Jmz8mnHsfIIoGtuQkZCyNJfK+DoUxoAUoFIAMjSbSRP6dYS/u4QiQVcjAaEjIEKMhbgkRbXBCWMJU1lwW65SPIBQCZAARkPABmPzNex3wI+IvO1AZCxCkAiAQ3hI1yvDYBUEBIgMhIQMvL7DRLba7N8NP2gtFt+TFosdkNIO4A0EJKQsikg5AsIR1ACN/IlMOapgiyOm3dCyEKd50vOxz8QP0AQP4Q+8HTBdkNItwLSAiZqsYs5hsX4I5hnpSt/ZSm1sng+ZHJcct6cPH1Oanz5jTwY+LJazNuVkB5KI6WQxDnHw6XUgo74zIBId0mVKDKHx7wmsxes5a6ca1wm+8e+SGL7zV+8TnIAXLFNM4aQ/JvdjKupLhWINEpI/FtUloUXri4rN+ziLtQ1yL7fm9kmVGHSoXc+6wC3YiuesVFCZpgh21zXDIR0g0gNIQHq8mF+Rbwqb9RCqAN17s26B0AqKzeO842P20m2yEqAkPakNDbAp84NBvLZr9HoEwO5DIxE+/sg9uC//J6X1z9uLafPnlOxj2+mzdN+x7hjd+s7FjEr4Q2BB5i+9KRQZtSQVj0zrKO9vmm2LfioAKQFjQ3Y9gFcfgTJuWKhWO0GWLczKVmNJfM/VVe0Xdo639R7Qkle522v7XuOyFu1Oslj4UikFcdj0wBSx0llrNT02t9+PLb5YfWJ6Ru7EpJzxQeAlfEpy77ZTC4isRtfut6mzPw5/y/reEZsTpXwAW4IqRK44OFwASghacoNW7k9p1EXEj4C6qW1xMEAkPhbHIBlIP7eZjX7QbffTbW1dX7ib3qsOSEhfbdKWP8dEjOAIHK7xA3Av48ynuWAbRIP0JlgNwCuRLw3pv4G4Gj/Dn8T2m+LtFhxTC5CPY0B7924uIVzaWba4k5/l+Nrwu5TEg9lbOIwC0ISQAJKMqt4AZQFWFqm4CK2C9JcYBKqWm6bz22lgpCbHQh5p/vV2V/mz5NOm925NnMg5H16QXEm0Z2bRPdDW5ub7eWrtiEWVhXEV+LCzL5YwzZusA2EdCkgraf/eXFDnRc3zqqMfEWCX/hKio/bJUXgllOE4NGyohP3I0D1fgluv1hy1psluevOlNyfTZEyrabL0q0H5EDKSdllIKQCkVBBAkASQtJ2A2qlnD7P+6Usv4E0dWCJ9YqsWLdHKtb8XvIW/xJqRsJEgEWldmwA+FgfkNFYPfFDYhu/J/H+SYJIXfqXIIjEd4t/JZ0HzpULv//BfzrLj/NmxjcXD39SAYkkQnsMfEQcSMaCpO1TZpSQTDyUKoePpwDgnpVG30+WHE82AWCE8lEBSGQhVypIvocBQvryb0+3lODqAwAe50okAGRUs3kSDdgYA4tFfFFaXFPaAmRoh/rx6yWS2G6ZJHZaIQkEkHDBjoMKMg7qxzioH6mAjIPrdSwsDgAylgboqCBkj/USDYuiAUBGwB27wI9bpSEUHq2XHoHakaaVkC4ICbds81kbbH+56IiUQmykJ+HSVALuSISQxQghxyRJQuMx8hgT0lwDIN0KSKOGdCkhuQBXi1y9QH0ErqyfNu5+T4yPtGOI43rn3kNQFtWSR0IRyw/HpSCkihkHYOFazGNRnyGEpKqLENK4MeqSICk7VKIxT34gO3Yf4q7uyTZK22ZZ8Z7zmq8xE+bDFVgnpVF9g7HoQ/NQf9kAi4KR6UFIkziEELKiJKKP9h08qvbhUqhl6p7sb7irnkUMv6aIAQgI6aGEJAjTgD8vlZDXqCF5jTMGhR1hF+pNV+w8+arKw3Dv/rRRX6tuWQgsCI7QJpVqfA0XXWZP1g8IPRSQuFa750w60MsCXq65EovYnoj//H+5n5HqH7eRM+fOe6VcM2OSjfRlk96SHZDaD4mBdHZs3f68j3DV1TWv7XVMb5tjSase7fcaals9jIBSEP30SDAg6kdtZVfSMeWWrzoL/0Nz3cY5r/8tayqgrS5Kx54jJADxNHMDFPLYbpysyX6M1jzJCEKq0BSMH1lFHiOof+It2QwlJl+6vU2Z+Xtco4T8dukhuE1vBVwCeKQKUhliQAJEemTEBlRU8RVdbs547wEhAf4AIA2EjEEMx6CBO2XILh3CIDNzWh0g4ot+OuOA+PXeBjUkIGT/7bBtEttvq8ShjAOApCkQaZUJAJC0RKtMGKTfx+N9PLaNxSAMUGj/LTJs11khWjZj1yn1OGL7T95zSikhEwghhyN0koGQBJGE0zbjmNHZ1AEduU3giO+ZDOtpy5ABW6WfAyGdcZep63vmz3HOfL632syBkM6EcE6KzhhwPfFPOnBcCr/4BRaIWOww5pQCkdZCDQuI60NI/IYwEm52/oXelsK9lkhRqCE1gNwvRSfsxzYg5MRDEtV1peSqM03y1Jkheb+YJgGfTJTa/ZYCQgJQIVHJbgMilRpSg0jCSCojqaw7f/GyumfN2gsOb2RVNZRrF7dYr/pdRkoQMmj7ACb6lYLSEZDRVwFHAx916V8C8JGm/tZQchWpJxHPtZQRMzfJVcafvIfG5dW//lJwmK7zjP+oM52ngZBUQuJvBJCHACCTTyKuZrfxSLwDF2woHH1oz7SEWdt8DwiZl6rIUs0l6I1+EoEEM2FQP0Y2mw8QSfsNisjfJAYWS2u2QOKgfoz/erEkdrABSCgg4wkg4YatISTAI+EjXLAVfLQByBi4YBsAGalA5AYJ675BnsaC7Oulx5UKkkpI43bdgoloCCQVhDymtttALfne7INa+QgIWQwwshjUkEUBIZ/Edvg73bHAfBUQ8k2ohtJ3wyaETKuE9FVzEJAEsCQnXPX6QrnMFxeXWTsXMnfjwzpvQBy6yMJvIXst4sgqkEioRZhiARXCR0ILG4R0qx3Twkft8svkFIx390hoWSlTpZGcu3A3nCcy1zZ3Wz+yrwaPmIkYm1B/GfhoSg8ISdBiB5GeENIH/cJsw7mhwssNgJMd/V6yXG05fcb7mJ1UCR4+kiwFS9eQ7KifC0JChUfFIBV5VBnfNIQEVGKcwbz5obCDR8C3fSbw8LN0fvEicw5tVLRsXahRAeZwTIyzaId7ajtdwOcGXi4AyblmKSH/P78y0q7bMPnj6p+3cP7QasGP638vjzI7OZWQBgZbcTkzDyH1WCKI03CY73k+YP9UQeby1wAgX5S6LfrJqVsYP5mbaxa4Ao1k7Mx+mBN+UMzmJExUIBLnJNTt+vFSbXOEv0tjqo9i2T+m35hkByELJi9W41DX13uAZh42fzVzj4T+tAUQEmAJAImm3LDtEPIaJaSlinRBSLhAE0BCcUijuzMhZARszmHMaYzbTEFIdb/zt7yFhIa5e2yVyB+3S3Q/QMh+FoQkiLQsvv9WoSUARCaYEpArwbJ4lHEwlmob8DEKKshIlHMPeX++ydx4ubfO+xxgU/eekgSAx8Rh+2GAkMP2IiM5M5NTHWtMg2qjmtVxRN3xRAtiDBWEO78quQ1jAqQQ9FP/TY4S8n4eQ86x3Vtz/m7oLwdC3kML/bthwDh1uH9PMrwJOYf4V7Wa/IBMo+WhlMBih0DAqEUUACGITKtQoAqSRggJl2wkzPAFIElsNFKKzz4uRRAHkgpIAsgiKItPOSz54AqU96sZkufzmeILCJn3k8kS+/lkmbwS8XpSTiNJjXHJtgNISxEJ0HUg+RQWAszKmZX9oe6zea+tzNxwsx3HzV4rhSu2lkcLfSY+Jb4SfyoelfqRAJLv64k/PvcrUU98YTkery0FK3WQ2cv28OdZuujNzBzngV/FAvbYSSggARc1ZCRo9ASRWgkJQAmV5OHjJyQZmbA/a/uL5ChWH/CxJUAjkvUgjqYCkM+0skAk1Y/YfrKZ5C3/nYQ1+lWCoYAMg0UAQIY3+00iYFHNASKbL5DYFgslthUAZNslkvDNMkmgAhLgkRYPF+x4uGATQMYDPsYDPsYDPFIBqVSQUEAqFSQAZIxNBakgZM8NEo54kFUwftssPy7NLQDZHNCRRgipgKQqGS8ScSIRN/LVqQegfIQCkjEgDYSkW/ZPW6HsrIsYexXTgZBuV+xrIST+puaezgQbjARQS1ftuKfGixlbrPTq9TskDCqfx6CII2ikEjKPSkyDc44CjwZAssTiXake08JHLNhx7jExB3WJBBWhL8vrn7RFXDg+JeA5gnM0K88V9+6+CS569R8H9/9XrYdS7msCXWSNYk2rIi14omBkxhDSgOLXPmytxq+3fcMf70Fis9hS7yJeJVyVVWIaKPG8hZAKcqHegJAPB78gE2YuV/WjG6u3dbzV37ECKcknJaLEJ5Ib1+O0ENJ4LNxICemGkDh/QAmZO76i/H/IjD1kzK/qGL2tp7kGvFnzGwC5N6CErK5ApIrNeYsQki7JbgiJbdyDPBZTCQ8uysvX343C/YrdTfmfnmPmeu92M+45ZKoKK5CT4BB1MxDSlJ5KYT1XXPMkPQCpzmXmnIa5hOOnwrdei77yO2J282XuN7zpL85lhrOp+et+wMJtgEwAS3C/VSDSpnLLx5iQ6UDIRCoiASEZZ5EAMp8BkISQ+CwCiWQK4KHb7nPw4vA45974/MsfnL2EzNjwGPDtCSVkX0BIgMiYHwEh4Z4dB08EF4QEjFQgEqWCkASRUEpy2wDKOABHbfzdFgnvuxn13ibrU7M2xqs3/XYnfsOxNSvpjCQgfEy8gpAAkBgbBkJqEIlxgbFRYCigNUGjMqgg7aUFId1/3ymF8PcQ9E+/TalOTEjnPiTLrqV3Yh45+8jcddiBkM4JwTkhOGNAjQH1lBw3jkNGz5MHQ7lIeQM31VhwWvBRl24ASRipF6AEkDS6YwNCIu6XL+I0RbzRQUrMOCLFpkAFOfGABSGT8P6gFAaMCWw8W3xqTRPfz6dJYK0pkrfGRHmt0wJZtwfxBJE5eScUj7uU+tENIumSzTiDVNydhFvU3XHCNwsDnHwZPww3+nxt23NM3q7fT7Lnryl5itYFeITqsTjVjwCRgG9+yKpNEJmj0Bfywvs9ZPFGy3U0Cxe8mWlPLhr+uPqXHIULNl2uTfZrJqAhhDTmcscGgDx4DApIxP5s03uiZCtUV/I+3VJ8y2gAmffpFuq9j4KQX0uep1oBUiJ+5vNtJbj2JAmA+3UwXLHDoIIMA3ikhQM+RrZcINFIPhODOKOxAJDxUEAmdEIMSAUgVwFCagAZTwCJ+I92CBmPGJBxNEBIWiwAZExPuGLDogAfI1kiKU0c4kF+PucIXLEBHhfDABoVhESpICSyZWsYeRxqyaPSaNlxeXocXbD3SjFAyCKAkEUVkERs1C6IBwnljC8AjnbHJng0dj13bIZEoDLoNQAXJM2AK/OpszpmqAHgmem/rPwu58douPg+GFgWQIRgkSEgWHIhb4ePNwMgsWjHOYeW21LaZYerestOQ7ibu+Qckbkbs6zsG/u+2X5XLl+Rxq1+RBITKne1As/Djdn2UIoZgN1qSDuErASIbFNCop8eDi4nNRv24C687iP+9jfE/cyN+UCVplHgscycEpJqf1zPYMYd+7HIsrJkxRbuIksfCnH/27btk5BiH6JuVHVabs44Z2hPBZwXLI8FDSLTwC6CVRvcolqYEDIP1KgPBr6AxEC/cRdeHyN/e+rEGSlVoTFCuSDJFiCkX35LDXmrEBJ11/cZusxNCAnY3KTdYMQfxs0KXnfOY8B9ndf3Sv9VYLB28x+QzK+sOm/xHKbPY/qcdqsQkvPp0Yhy8vhztRBa4rA6Xj0/vZsz+JWcRZiXZ0dukygAOe1+rZWQblfbXQBPMLpip3HDVkleXMlfbCpIQMh4QMhQZLAuiRjgKZf+VI3lPpfcuL48uL0nf5cnoG706wEI2WebRPelbZWYPlskltZXW9yPAIyweBoAozYASGub0FF/Z7MCkHE/bpLg3pvkyeE75cB5hrm5N8/H7va8/fVn+/928ByUkPsk7pf9yCQOReTPiA8J4JhPAWmOCQ2n82NcFMS2h0EpyfcFMG6M6b/ju8iaHgRV648eSsgbj4l/8nidf/v2jyGnTZ02zewYcCCkA6C8XgBkdrA537+7T1Dqxho3IstWb8di4nWADi7KdLwj++LGKCHNDbZ5z6Q0vgpEIjg9MtMGPPkJAMx2KT4dsd8maRUklZBFsF18MtQryFbs++lk8QeIDPhssoR8NlHyvDta6g1cJbuPngKATHFBSBUP0ooJSQCpE56kKuXm3XND6XlTxZs6Qrrvf5otfkW/lFxPfIHEM4j5WKKucsH2LV5Xsuf7ROq3HyOpp60ENPfI+YjHdvnKH3Iw+bTKer0fiWY8ICRBpDEAyr2Hk6GSPCYpp85InfbDJHuBL6B8bCn+UEH6PtMcBjUkEvLkfRqqR0DIPCWbI67o1/JWl5ny8aDVUrDVb+LXYLaEAEAqa7FAQgEfw2GRgI/RbRZLTPslEtdxmUpAE4f4j8b9WsHHrmskAepHZYCOCTRAR1o8DfAxDhYL6BjTCxCy1waJgkXCwgEhSw3eKc2WWK7YS44BQh6TZgCPzdNYC3ynLdSSH847igRMiP84CipgGCFkEShESo7dL1E1+0lOhiwgKHHBR08I6eGGbbJjU5HMRTky99LduFajnuwGr+FBVp6PWe9xUxfKAwBRuRBHju6HWgmpFZGeSki9oE8v/qNLAQmoZVx9cwGwZAt7STp89wt3g+tb1qnYsrKNb8e+2X4XLlyU2k17yUNhzMxsd23W4M6c/02ZEYSk+tHVR9jOFlROuvT13t1ZJ0T5r8yev1Kp0QjnXEpIumIbs0AY40Ma1aC75DEY4/WOELWy5ALQ9s9fVQ7hwQnb8c6BLs97BHNNnjV7heSMJGxkPEj2gdUPCj5mBCHdQFjPEw0jcxPWo/0fRTiIiOLvyuqNWk3tzXgx9Tt0KFmKlm+AB5dodwUgbweExLzng06APbot062eoRu6D5gGNZ+a2Vl+78pa0B387c+/lQcRDiA36kszSkhVfx7DNYa+wTEZs0Nit7Kb/cXwEhUw98rjfLmMu8Mx281zvNyoD/n7I6cvSbGhcE8etBVQiS62Jt6fBR8VgLRBSFz7jPpRQ0g3fEz8CepDxl1EGQ9lZCCSx7z+6xG5eNV+zr25+uJbsp91w7/n232LRPywVaJ/QD1/2Ixys8T0hqGMpfUBXKRB3ZiRxfbZhO9twt9R9t0o/nioWGbEDkm+DEDqQEjPuWN5DAzddkqioX6MGwo15FBAyCG7oXDdhXInVKRuy4ft/IDOtALWdgF8h9u65OduKwhXfX8A5R89YkJyXGRu/Drfd9rLGQP31xhwIKRzEnQuBM4YcI0B3qTu3X9M4pFt8pFwZtCEGhKLtPQgpFl0mtIXgIQgMi8WDX5RFVTm38f7LpYnZx2VEojzQ5fsooSRhJBTDskTyFboX3saIORUpYQM/nSCBH44TsIRH3L0kr1wuYYSEotAJqPZAyBpktMQQioQic8OIH7kFbgD457SdQx300WK7fnnn3/L9LnrJf7FJsiI/LkEIGlNHiggcxX5Str1noHMpHQPQv3vGQWkyCUAyEMpp1wAcj+Uq0k0Zr22TEPJEypRzb5Dx6DaOycte05CG9QW36daiH+ZFuIHAOlXuoX4KhUkICTe+zyFuJBPNZX3us2V7wH0eiO+YuuZ+6VU56UShCzYIS0XKguF63UEYj9GtdUAMqbjUmS+ZvIZWBcd/5EAMgHqx4Tv1koiwCPNDiATkPk6AfBRQUgAyFgsVGIAHt0QciMg5EZ5fdIBaQ11YzMqHwEaCR8JIQ2INGVLxIz8elWKVAB4LwoIWXw0ACQNELIwyhLDd0jel5AFnAkcVMw6Ax9ZAobATOlKSGODkAQk/Dx7WFkZOGyWGjcEAXfTmL+ZulC5OWTkTHkg6EUFfAghXUpIyzXbgMiM40BqqKIApgtCVgDUfFVyRZeXHwZNuWfb52ba8E58hw2YdOCoPF+5IQAQwwfYAJgal57KeF4Lrg8hEQ8S8QhzxleSx0LLy4hJi7zuI457huTo1W8sVJUva/Wdcse2AUg1x0ydUXpAO8I7AyBZ6rpTaZwTkC625PuSjLAffN2Jtk5vH4x5ydfQ0TMlB0IVaBUkwqRcAyFxjU5znXb3g4FZujQQMhseFIYWfkfWbtIhQNLb/40+MxDy13mrJbzoh6gDIaROTEMIrGGpji2t4kJS5awsPTBn+0ypot0PH/zxb2UPryw16nSX3wmR7qJ7NvbP3MUbkaQGiWSiAXhxfAZCXgsfzTG6ASRB5LUQ0nyGEDc45/8//xcRu3OUeqip+0Q1QabHJeu6+eh5yT8QQI/JXBC/kSBSKR/hRpsPijVaolFBAiQp12uX+hHvLRdsXVoQkslgACH9oWJssjpVriiPEC6WTT1NmfECmnXbfeqSPIEEMn7dNkk4vA+ilG3C9XgTIKS2WJSxP2iLA5BUMNJASVfJv29UFsey93oJQKiVMr9sk+SLjhIyvXn9919XpSlCzYQN2oVM53sQ4xMqyMGAkFC30hJtYyAftvOnsQJ4r4zwUf1tu36P8VIQY8O3z1Y3hFTzl2Mi4/Hg/M1pG2cM3P9jwIGQzknQuRA4Y8A1BgjzLl+5KhXfb4O4kFbWWrU44+KBN9BYrHmYexGqIKRynwJgoXohvLzEtxgNCHkY0HG/VkNOApCxrOi4AxLRbrH4fgZXW2TIDoQSMqjmePF7f7SUazNHNh84BjdfqiEJIG0QEopIQsh9cNfei8+Pwx34bgYxvLnma+e+Y/Lc+53lP/lqin+pejJs6mq58oeSdLja/26/6PI4rvxxFQDytIKOhMD7baZApAUjFZBUbtrIgn3ugnQcOFPyFoMrOlywA5B0xh8xIKmE9IMK0hfbVEbmfaq55CrRSCq1Gi2d5iVJl0VHpfvCo9IPMLIn1IdvDt4kEa0XS0jrJRLWdplEwKLbL5eYjsslttNKqGthcMOOZQIaFQPSUkAi9qOCkJb60aggCSAVhASAjAN8jIVpCLkRC6CNEtFzoyTCDaz2vOPSCoCRasjmaSCkgZEsvwaobAx7Zvw+Kc6M2IwHCWP4gSJjDsjjPZcBwr6jYAhVZZ5KSMsV2wOM2CEJQQNgHeZYQKHXXRlT7+axn3Y8U1HG+HpnMR7e++wb+b9cpbVyCC7ZmYKQVE4q9aRVuiBkRcSYLCfhharI8tU7OVzvGbiftq2y9r1eILL9du45KMVeriWPRlW2wgcQ6hGIWRAP1wXzIMrDHRsqLh+XQQWplJA6KU1OfJ47ooJMm7uGu/Dq/G0gZJuOg+Q/gYCQBaC+o6sywaPdFLCzQOR1IKSOb4mHaJhjj4SVk/LvtZILv1/KMhWk6n/MFb4atPwR2ckR89ICe+lBSAVUPQBfOkpIE7IAffFQaDl55rUGsvfgMbUPb8abgZATZyyRQJzX8gAC3xYIiTGllNGc4+izHFEVpdDzdSQJCev4upvOeazP5St/StlqzdGmiKXNuuMcnbEKEvdGNhVk+hBSJ9qicpgPnv7l94K8U/t7K9EWF6Y3hnrp9SfruhTJRyIZagTusfGDqHLUCkiCx0Qo1hKHwljSCCEBlNyG2I94eJzoMjuEhBs14v5134J43aigDhFiQNON68u6/brntAR2WydB3XGd7wkI2XMTbCPCo2xEmBS3xeLarAxAMq73RhhLgEeXETzScE2HRcO7IfC7VVJr+l75UzXevffgLr3+vJ2fcVC1wj1MODKSxw/aLXGI75lAwxhJGLQDGcjR7wMxFlSJeKAYA/mxrYzbLoObv9reJgXUd1hukwAoWQdvTtXnU0Jq7M8xpw2cMfC/PQYcCOmcCJ0LgTMGPMYAbwZbd/1FssFdKzcXARZ85M21B4B0wRK4X+NvBkKy9ONiCEqLiHe7SolpWMTSqIKcfEAKo3xiEuAMtvMP3CL+dacqd2xCyMBPx2kQWWOMtB2zVg6nngJwTNYQEqrIvRaANC7Z+5QqMkVOn//d4xjuugubtZg8DGVNnW9+kcGTV6j6gpDc3fW2zQ0sIwAg/5QjgL6EjQpAHndDyCQFI08CSsKghkw6mioHj6fKibPn5ZtBc5Cgpz4UjlA/EkACPvojGY0/XK/9UPrRLRt/y128iTxbd4h8M2urfLdov3QH+OtBA9jri2QvA9alSr0ZcG3+brWEEkK2XyFRHVZIDAGkAo+rJBbqxzjGflTxH+GCbbleJ9oBpAUfE7EYS6ABPioIiQVLDBYv0TBCyBCoIMsgeH+zxcnIfk0FJFyyYXbwyO2my2jHpQ1UkB/PPwIAuVtKjEY2bMaDJIQcgdiQ4w5JTIORUFkR5tAVmxAS4BHzKK15KrQsEMk5hQcC2TGvXnm3pVxGX3CcZ5WrqNdzDHPhxMmz8sobjeRfPmXUgw0qgdKHkFywuxVRSjHEc9I1pl19mfX3scjyEvnEG7J2w16eytBG984c87pNbfP0dvwbaDQ1tth+azbsgDL+A8kZA4V7fqrbLABpICTGZLoQEvAkLYTUmbErIbN7RSQlelu2WnHuvIFK/M1VPBD5smk3BX9cWZlNUhqCSOWibQFIwsgMISQfsNGoNH5NHgx4Uap/1lkuIR6mN3W7HX1g/g3u/7NGvSQb1NMErFQX+pg+UMdje1CRHoRUwMtALcaDxFxBUpoHkf27Ws32koq5yJfZX+ZKDUl7D5okPnio4qMgpMmObSkhUUelgmSp6mceaJo2t5VKBa0BpIZzlZRSOnvoSzJ26hI+I83y/rimfQBU+Oo3bKb4MOEPQK8bQrof2urxZY71ekpId1+pLOboq4cRfuOpKs3kWMoZtS9dh8z3GX88edsJiQCUCwPgi4YR3MUj6UsCARNgUyKVb1CuKWPCmbRG1aPN4qGojId6MR4J14IGbJfBu/BQmJBUgSZTR1NmvOBm3SbtOCE+nVZJSDc8AOwBAAmLxjU4+ntclxEWJQbbMbhexwJI0muBIDLOApIsjWlIye/xO4CQeMjoh/uD+rP2cTesjJfj/f78HdvjMh6IfzQ9ScKRDCh+4E6JoyISZQL6lGbgI8t8lrkgpIGRVpkPY4Jm/p6A8ZGI98uOMDO5AdRsyxuPi2vmm9N3zth1xsB9MwYcCOkM5vtmMDsXq9twg2TdUI+avEj8sNB5LIoLFnPjbFvsuACk/oxJNpQBQCoIyfdwiwxCRs9iwzdK0RkHpbiCkPs1hIRr9hPINvzEOGRpbLdQ/GsSQEIR+el4CQKI9Pt4nBSoM0lmrkuSowSRVEIaCGmBSBMXkiCSwOv3S1fUDc5dOw4sEMl7YHWTfg/BEd4tXv7jDzmSelpBxgMGPqqS4NENIw2EPIQs2KcvnJe2A5AFHcl48pRsAhdsAkgNH/2foRqS71vDRR2fQSEZ8nJnKdN4olTtPEeajdki/VYmS19YdwC+75cnSy8oIgesTZWOiw5L2X4Ahe1WSkTHVRID9WMMEtAQPsYh/qOCkFYGbAMhPdWPG4QAUhkWKYSQ8ZZqQkPITRKJxRmVGG8jy/XX2DfhY4ulumxGEKnAowGQcM1GHVuvTpYK0w4gDiRcscfopDQKREIVWXTEHgms2h6LasKEagompIWP5n1aCKldLQF78r0u/0a21G96jFbwke6od+14v8619cTJMxpC5nkOAAtxZ23wgdvaFRvnHSqqbwZCImOuiTeYA/E2owq/Jas36AVnVkOke7F/dJ01YJo4dRHiB1ZQIIkQUsNzmxIyDYR0qSFtKkiVlAaJUBSEhCt2DoTriIByLunQCZ4OvQTpf8tlQMKXqn4ldC3WWZkJ91lHU+r6GrfgvIyn6AEi9fXLqCDzoG55E6E8839OOvYag+Qnf2Up9GLbXDhzTp6r2kSy47yhEu/g+JQS0nUctuuyC0K6VZAa5mmwpRI3xVRUqtR/w8W3Zu2ucvbsRe7Gq/OI+iH+V79VHzy0rKjqZ5SQBpiyvW8WQtpDL3DM0KX8X35lpDoyb59BPe/muZScelaeKv85FMNI+uNSQhK4on9c8NUAWE8Iae8jd5xbAmPOmQoqERn7btU6S92tzq2Z7zP2V4fZe8UfoC/iu/USCYv6bp1Ed10rsVAgxgH2MQlbPBLAMOlLHLNNAyAlACBp8Mht6z0/I3yExeFhcixiTEZA+TYx6byCxZ4Q8sb3pqzb9J0nxe+blRL2HZSa3+P6DovuDogIiyGItCwWQDJDI3hUwBLhVRjnGRaNB5D+gJB1ZyZxN2y4u3os3elxjgaRQ2cuywsjd0ooYnHGQSUbNwAPn2AJUEYqEAmVa6IxuN3nw3Y+lvZt9RlijQ7Qlh9/o8UiUVB+gOuNqYx97rT9ne5fZ3/OmLtbx4ADIZ2LkXMxdsaAewxYEHLb7iNS8NlPkeDh1TQQ0nLBS7MA0vAEShksSP3gzuYLUyVuyAt1nCrFZzE5DVxSASKVEhIQ8vGJSbADkoDMhQFfTpYAgMgAxoWsOU6CPxkv/h+MljeQSXjLfiQ1OYrYkICPdL82sSHtEJLbhwDErv7JoOOZvzm/Eyfoe/XGl+15GYqjw3DB3o9kMwfRzi4I6VI/agip3bNPIgv2SahTL8rAiUskV9E6kuvJRhaAhAKSwNGCj/6lv1YAMgBgMqRcVwl/o78EVB4gfhUHS74Px8gHvVfJD4sOyYA1yYCQx1wgsv/qFOm18ri8h0DzkR1XSxhcr6O7rcFCaq3EWRYPF2wXeKQK0lI/UvnoBpBwt4aCIgHKx3gYXbsYbyoaADIC9jiUIXV/OyqtVwA+AjJSCdmcJcxAyCYWjGyJz+rDnp6ADPBQQZYghByj3bGLjE2SQn2RxbfUp5hPmEPXgZBuAAnoiPmkFTR68cr4rNmjysvsRRvUQu9eBWwnTp2VV6s1kQfyPK8gpAKNVpZsDSHdANIDQl6jgLRUkS4IyQU7lJCFq2HBrmPd3attdCfOSdfbB9uNr/HTF0o2KBcZH1iHEHCHEeD4VKZU8loR6YpFmBZCAqIYCPlY5CtStGxtOXue8XC9XyCcOX1OSlasi1h8FTQAUwpjo4A0pV0JeWMI6QMI+X9+pWXY+PnquqjHT9ZcU9j+x+AJULRcHcmB+WEyY7shpCeA1DE5zTnDApFWPxBumezxPioz9ovSqfdIBVm5n+uNhev9jeEVPmnYXR6OAMDNp1WQOkt5GiUkzns3UkK6ISTmNeqYI/pVpS6c/ds6VtHrOl6v/rfjb2aufNWylzwaZoWxUQ9v3RDSDSJ5bksPQvKYLRUkSzVfqARFDFWAyOyYM8vX6CRC3p7TeA/SYAYehnVeJZFd18EAIWEx2I5F3ORYwkhYDLcBJ2MRM5nuzPFI8BKPBC/MPp1A6w9ISUAJ2KRti0QO2ILYx7tl02n7w+Cb7zP27wxASH88VAzrCggJ8BhFANkNEJHWHfU0xnrZjVASgFKZApT4Lq75tFgY7w388JDySwdCpjuH0Euy/th5KT5ku4QjdmNcP6hbCSEJILGdALhIS8S2MvS9gpAs+3HbMtt2ovmsPxIJYcwUBKzelGLFP1drrpsfG7djjjr/hvfXWaftnLb7p8aAAyEdAJXuRemfGnDOv3tvnMz++utveb9OF3nYigtpQIhdReILEOmOaVcVyknLCCKRwdcvH96Hl5WYNztKyelQh02BaypdsRWA3C+FAGsKwAoiYUd4a6ghPyGAZFzICRICEBn0yTjxfX+UfDlgKaAX4j8iPqROSkMQaRng414oJKmS5GfHUs8oNyDeVDlj7dbbgAuDC79fVuCRCseDgI6eANKmgKQqEm7YB6FKPQMA2ab/NHmsUC3JCQWkX5lWSD7jBpABhI9GAQlX7OBXukro6wMk5M2fJKzaUAl76xe8/1mCXh8qJb+aIq0m7JDB61Olx4pj0h1AkNYXIHII3LNrjt+lF1TWgiMOZTwWKAkIRE/wmAhXrESrVAAS0JHgMRGQURmgYyIXWSjjGPAewe2ZkTMMwfBfRWzHFlBftgQAVRDSApAaQh5XLthNACabQiHZCnV6F1mxGQfySUDI4gCQxQAiqYQsNv6ARDUeJzlVYg8szi0Iyflk1I8s3QCS2zYICTUgE9JkiygvxcvWFapu7uXxfRIQskL1pnDHJoTEQl2pHbkI167XfG/MfKbKDCGkWbQDXADSRkAJucKKCentgv1ebt/bUnecQ69c/kNadx4i/0b8QK0w1MpCnvdvPiYkFG1QtRmlau6ESriulJXXPmiLLMdUGnqh5rUeliXtPSh5C76FWIQYQ4SkSgVp4KMp00JIO4jUc05f3zD+4I5N5dmjkWVl3sL1vIxYSsgsWDCbB4Jb9kh8qZqSy5WYhsfDh4HmgaB13lCKuzQAEoo84xKvAJcFtnLHVJAHoITs3GukPo94eb3k9eEyxkj5d1tZEBIKb3VuI4CEoY46IY0dQOoHKqrNrfnunuMIy4A5bpLnPBD0vNRt3kt+/90Otm79unZb5odt7cD4h3xN+3Wp+AKc8txtwtioEDY8t7vUkOyj9CCkDUDaICTHYy70VzZkyJ726zLVX96c01g/JvWpOHSrBAL0RX27RqK6rIMBOtIIH7usUWUs3hNGxhFK4rM4qCRj8VCPCkOGLVFxGHm9ZAZqZKiOB5QMAaR8YcxuOXoBiV9cbXPz84b1mwF3bP+OKyUU9YoEeIwySk2qNWmoR0wai0W4lRgYS7PN99F4GBljWXTXVeLXaYV8Nt1xx05v7LPtp+0+DaAImIyM5PF9AZcJIummb7NEbCdCIUvL5zL9WT78jZaIfyPxx82Al5vVv8d/Mwz3W9Wn7Zfk35lUyoRHufmxkV6dnc/uvvOg0ydOn2R2DDgQ0nWxdAZPZgeP8/37c8yYp/r9fpkuueCGlwcKDOUOqiAJoYkdPuptum5rqyr+BJC0/FUlEK5fwcVqSokRm6ToNJ2UhhCyEFyxC44HgKTBJTsBN7OBXyI5DUBkECwESsgwWECNMRLz6ViZtioJ2bJPQg1J4JiqSwMibSXVkucu4GmrM6/14vIW2gGNKOcBINnuBJAu+EjY6OF+rd8zEc1+AMhzF3+X74bNk5xPfC45oID0RcZr36ebiR/jP1IFCQDpX6YNICS3W0gwXLDDq/STsNcHStgbgyXsTULInyUcxjLgjZ8l9qMx8hXG0EBAxz6rjwNCIlHNylQoJFMVnKw2codEQCURC+DITNfxPZEJG9tG/WjcrhOxgEqE2jEfwSMhJEuMPY4/QkgCyBhsRxJEQhHw4a+HpBUUl80BIo0C0gBIul8zDmRTqiMBIVviO6/AFbsYktCUBHwsPhbwkXEhxyTBFXu3+APG50K8MJVcQsFIDRI0hOS8smCCq+S8M1ABJUDLg1iUt+z4s/xhxYO8V8/Bp6Bgq/xOCw0hCSpc7tgmHhyO1wKRbkCBv6WBkBpYAB7FYAEPNSSVdlRChhZ6Q5au2Mq1VZa6096r/cN6M9bo+Qu/S816XVWMRGZzN0o8V1xIBVe0AtIjMzYgioFf2hWbELIixj9i5kFp+HDgi/JB7e6qfwgiM9tO5hq1es0WBfb19YlwzoBHXbrra4FI5Y6dMYT0SaisILZvfEVZv1kraXXd7vyC2Rzj7NnLJDh/da2gZlxLZelASKsvDFB1KVKt2JxuCAllHUD9wyHlZOiYuZlue3tfsQMZ37VU+TrycDhc9hWAZKgJjhXdzp5ZsbUyUNdRP3DQ85sPIBgXVgPIXIDWjwLmMcv97AVaBakTndzd91yn4Tpf8JkPAA2pHNbHaiCkeW+OPa0aUmfItoFIlxIS7Yo+fDBvaWnT5Wf508sQAeyr1PNXpDTCmAQBQkZ3XiOR364FjLTgIwEkwKQCkdgmfNS2WpUxCHNCTwPlto1rbbxye4biECUzUAfi2loRDwRTLl617r8yN2dYv5k7ASER35kQku7idBWPAgilRUOdaYxKTWU20GiAo4GU0QjNEmMMrtj+SF5Xa5oTJ9g+f7nNe2W+uq84KpGAhTFIxKcgJIAi3fIT0lgi3icCPLvN/l4DSAUhASINsAxEDM+as/bL6UuAkAD2WXVOTXvsznvTF07pjIWsGQMOhMQJ2Bl8Ths4Y8BzDPCmZG9SsiSUqgFXILp1UWmChQ9go1v9mBZAvi7+iFnnT0UkVJC+sEAmB4h9XQp0nC7FZh2UwhP3qViQhJCFFIAkhISr6vC9EtFmkYKQwVBDhgBEEkJGQA0Z8O5Iefe7ubIx6bjsgxpydxoISTDpsoNIXnPkpPyODN98Of3q2a832x68Mb2IGJv7kUhnP6CjKwmNB4AknDRAkgDyhJwFtOg9dqH4Fq8juUs2QsIZwMenEQvyaSSkUQAS8R+VCpJu2IgB+VJHCX+tr4RW7a8gZPibgJBUQlYHgKz+i0S8/YuEvzNcQt4eJWHvjJBXO86TLgsOSp9lR6UXlIc/rjslQzeckB9WJUvpn7ap4PUGOLrcrrE4YsxHl/qR4BFKx0SARmMJdDXDe0LIWEDICFhBBOivj+zcLQE8CRzTg5D8vAnjRC5LloZLknVW7JF7ACH3wB1bQ8hi4w9KgR9WK1fsvFhk6wy3XKQTPGr4aMqMlJAEPASYubE4n7dkgxrb98KiPKPxdurMealaozUg5AtaLWVBSB0LEucaFRdSg8ibhpAq8y8By6sSVvBNmf8blGx4eaMayqje/0ufs93OnL0gH9T9Rv6DOKQmM7MLgik1nhtA3iyEzAMI+UjQS9Kt30TVP1Td67XwzZ+rDKAbO3GuZAun8oyKOwI6A0rTgZAKQBp4Z0pPJWReQMjsUO8nlvpA9h04jvrdfJ1u99gwxzhu0nz1gE9ff28RQuL8kRtuzo/CtZdqyAXLN6o+8GaOEFLzdeDwcSn0XE24C1dU7e/j6oOMISRVgpzXWgHNbU8ISbfxh8LKypNlP5MTp86p/dzu9r3d/x4r+fvFS/J4mQ/xMATqX/MwiQpVAkljyk2bx+6phvRwxTZu2QpEAkIiWdK/fJ+Rpu36q5Az3vQX67c95Xcp2Xe9hCgIuRoQEmpIgsdvVwM+wlhaFov32pDsjX9DwjdaLMCeCnsCb4M4KCNjoJCM7rFW8nZbjYd2++QMMoVzQmd2TrN+M6mEtEHISBuEjAIEZezKaJYGQpqSMNJsWyUhpPou6w0IGfDNCqk0YpucZf2ycF7f7nF3q/8e2+JPnIM/BKANhEs774PiFYgEgFTbUDWiNMaHtua+yV3iM4JJfE8BSGzznooAk58HAFQ3W3hELl79yxobWXdevdX2cn7v9J0zBm7fGHAgpLpY3r4GdQan05b3yxjgTWH1zzrIo1A4GLcqnZSAbm+WQdHlZ5k/Sm0aRhJE+udHjCjEiop6p5sUmU4F5B55HPCx0Pj9UmDcPmX5xu6V/IiZF4d4MkG1p0jIx1oJGfrxeAlHgpoIlMHvjZCeUzbKXijtdh5Kll0EjweTLfOEkDsOJMN9+LRKKnC/9MWdPg6lgLTgIxWQSgXpASANfGR5QrnLnzl/QQZMWCKBpeqLTym4YEMB6f90U1gzGLdb6viPhJFPwQX7hQ4SXukHCSOAhIW/PggqyCESDghJFWQ4XLLDASJDYSFwyy/ZeZkUbbdY8rdYJPUm7ZFf4J7dd80JlajmZ4DIRrMPQf1bdIRCAAA450lEQVSIG2cFHAkdNXjk+wTlfm25YPNG2Zj1RD8BZRyMrmUxeIIfgb8/i2QyLeD+TXdst/oxGdvJCkq6lZAp0mp5itT87RiUj4CPzIytlJCICYl/o/iEgxINV+zcSJbhhwUo545RCmn46IaRGUJIKCKzhb8CxVF9OQgIz9edHhO3c3+nAbeqf9wOEPJFgFgk2rCS0yj4yAceruQ03LYppmxKSJfbJj9TSkhAWibdgGULLyctvvnpnm+n29nm3vxbhxDmosgLn8ojoa8AQtoAmAKQBHluCOlW3hGupK+EpGtpnnxV5JGA52XI6Pmqf3RypcyNZ4JLvnoPGKNcuwn000JIN5C06n1DCIljQSzjRwC/Srz8pRw6opPmeNNut+M3BkL2HTQRx4bjo8rTyo7toUQ1sEuVgFsKcvHBoc0M1AKEZPKdRxHWIW90FVm2eptqR2+gFo+Rr+17DkhMyfcANt0QknVl3EpVb9bd5YqM+YxtAyHdDxgMhKyiXLFzor4Pox9qN/9B7eN2tOed+Df+Qkzqtz9tLzkiAcbVHPFUt2s1pK2P0oBIzhsPGAkIydiYefJpCNmsTT+vkyWxIWduS5H4zsslFC7P0Z0BIWFRMG5H2wAkk7zF2k0BSSSAI4wE0FOlBSOpNoz+fo3kxL9bf/5+ueACTZmb06zfr2mUkJGAjrQoqDJpGip6llRo8nOWZtv1PdQ3GvWNRuI6/w7L5fHea2TvKSc5in0uoJck9fer8jziawchEVACHtISRGroCJCI92lNeZCoh7l8oKuN3iQaUGrPEvWe91XwPAkBsB66+ZTgcRPuWxx3bHv7O9sOM/hfHgMOhHQg5D29mP1fnrz/5LGbBdCAETPl0VAEh4ebVR7cVHvCxzcBII0ZAOku/fIDRiKbakAsYOSTtST/8A1SaAoApIKPSZIfJQFkIiyeBjfW8PaLEQ+SrtgThBAyDEpIqiHDaoyUp+pNkt82JsEd+7jsBIDcZZmGkYSSlgFQEkSmnEKWRmd+Z7oNLtgVkHYA6YKQ2j2bKsh9UD8eOI4YkBcuyMylWyXs2SbIhN0AbtYEj1BAPtVUAgAhAwEkA55poa1UMwlCluywyr0kvOqPyiKqDpCINwYJlZARgJARbw2VSEDIiLeHS+hbwwGix8lHgNhNF6VIdcQQfbXPevl57TEZsv6E9Ft3UgYhY/YPiBH5/NBdEkPgCPcwT3PfIKsn9lZcI+UuhJhFDLZPCB6DMgoWjXhI1ZDRvdUquFsDQhI4aiOANIbPoIJsujRVWi5LkapIvlSYABIgsjjGM5PSFAdcpwW83klyR1eGStgN8I27IgE/YaQngOTi1SxWCUeqQI32ojRoM+iuj492M3Pu7LmL8v7nHeUBX0JIQCJX0goCizTQIgMImQfKR20WhKQSki7ZUHhljygn7XuM5Lo20+P/Zur/v/Adtt2efYclttS78hjUpddCSD1GqYDU5gm93CCSIIXu2BZQgdowF5R4cxZ6r8JjMhS+mnToBzfg8nrMpFFCGtCvlZsYY9eBkCajNxOqPQhAWuOLLndBNmZ9jM2hfssewczTUHkqEGy5OqcDudQ5wwLDaSEk36t+AITMFlleCj7/GVSMt/ZAg32wcMl6qCsrKI8JtrkLQBoImQZAEpIqCMnSNbcNhHxNKb4fxVwOQOzQ8VOXchfw4DTg4u5dsJp7pp79x0Dp+5yeLzj2tOd1lzs2YXE6ENI9bwgk9ZzxsSBki/YDvISQeixN2JYK4LhCQUjCx0iAxygkqYmmATrGoCSATAsh4wyQdMFIQEqljCT4A+jrtkpy4d/tuua4/KHcbTOvbmY/z9t1QkIQvzEELuIRlgoyEnDRBSEJIgkWuU+XpQ8l1fdwfOq4ACGD2i+Vpwask8MXrmBPd+84utPXFrb7zlOX5ImftkgE3KZ53+QJHfV7z/uptPdXfG8BScBIAkgNJTdLNF28ERpnycHz3JUK88HnF3f6OJ39OWPeGQN33xhwIKQDKZyLgTMGrhkD5oZ6d9JRCcBiIncCA85rFzcuhtzwUW/74zNlgI7++TWI9EPJ7wUkvoWb7Tclqs1kKTT9EFSPWvmoACQUYwlwXY1D7Lw4QJsYZNQLqTcdCki4Y38ECAn4FP7RWImCa3YwXHK/6LMIKkhCyGOwFA0iARw1kOR7N4jk9rmLl9WNj3PxufHFhw118fIVV/ZrkwXbpYJMAyGTACCT4B5/6tw5mb18ixR/s4PkLl5fgkoDOCoXbAtAQgUZ8EwzfIayFD9rLqGvIBN2lT5QQP4oEVX7wQZKBJSQEYCQkYCQkVBCEkJGAkKGVRsucV9MkxozjgD6HZM6cw5L/lYr5L2BG+TnjSel/9oTUESmSL/VSFIz9SDiUyE4uu2pvIn5qOEjnvAzVpEFHlWmT2wz62csxh7HXxRiIRUYvFPqLIQKEq7YjPt4LYAkfGQ8SCojU+CKfUyeRbb3oiMJIXVSGiamKQEVZNHBmyVPyc/FJxoZ46lmsoNIBR8zgJAW3OGiNRcADrOjTpix/L4Yz+fO/y41vuws/8r7ovjx3KLAowGQptSqKbcSEqDCpYRkAhFt/Cw3lJB8n4slQGQ2ZKht0GaA1VaZXxA75wuuEkXWrd8BYMRYjggjgHHrcsV2QXMDIAnMbRDSikOogYoFIS2gwiQbfvkqy148ROJOvAkrYJSQVT/6WkFI7e7K+pl4hMYd26qzApAEkcYN25QWJFJzjcdYRR7we06+bNAb8TAve1W32zd2NDhq8HVfZP+urNTTWgl5fQip1KkuheprmFvoF8IuVQJsoW8eDntVqT0ZFoEvb+vM3/66YKU8ihiTHCNK/UgQifbWluaBggKSdvhott0Qkq7M2aFmzv/0e5KEGM98eTNGvD0mb39nxmTfnybKw4CQfrgXMvEg7SAycxCSimIoTC0I2RLqbm9iQhLi8vX9ooMS3HGFhHVCYhqlgkSJ7WiYApCEkLBYy+JQEkC6De7YBlIaRSSVhl1XSu5vlkmftcflL3U/nflzLuu35fg5KdBrnQR0RLxKlb0bJcAjLYpAUSkbb7JEPQlXowAgCV7DOixDop0VsvbYBezpxvdD3o6Df/J3DIFgjPtR8wIPZG5ln2z3uUlnJQZZ0OOsB7gJCkQCPkLFyBja17W0D3x578XPCCKZ4A8u+0WRpGbnCXtm7Huz/W+lnZ3fOn3ujIFrx4ADIR0AdUsXMGdSXTup7p82+VtlLy3/fisAkEriV/BtpcbwhSpSQcj8KGmEkrjhNkb1I43vFbCES7Yf4EBAxdZIRLNHEqGATETG4EQAyHgAm3iWsDgoyOKghozuvkZCP5sokR9OAICkjcf2WBjcs98bI13HbYAL8HHZcRAwEnG7tCWj1GYUknsAIfccPoHsznzy7f1C6/7pz4zHKm/KmQX7wHGdgOZg8mkkpIGlUUImHdMqyH1HUhGfMxlZsM/LKICxmDKNxQcAMhgKyMCnG8OaKBDJMtBSQ1IRGYBENCHlvoUKsreEvdYH8SAJIfvDBkgklJCRyI4d9dYQiUJMyCjEg4x+ewTcskdKsTZLpM6SE9J5fYpUHrRVIusvk9hGi+SDIVuErth91yBhzaoU6QaV4vM/78ENtRUgHe5AriDpAI0GPiYCNibYLB7bsQO2S+zA7RLZb7u8jJilrQA1XS7X+HebWtYEJeNA0gghqYKsMeeQFBkFV2yqIAkhMb5pJRAPMqHtTMkZV038Adr8bADSnWE4DRCx3CvNYpUqs2wRr0hcyQ9l736Cm3t/LF/Aw4E6TXvLvwPKarjlgpCAF67t9CCkUT+6ISThI92xCSJzKSVkRXkI2Zefq9JUfr+ETK14aYhx77fbnToXGffcidMWA+iWRZ8A1inlXZqxaoFyj3iQFuy6VtGFOHlQ4T0GCBlVtJorw7u3gOkiQHapCvUA6PjvEnYRMgL8uIAj39vN1F2XKsaicWU2EBIqzYfCXpb+P09TY8bbut2OftLj9i+pVrMD5n8lXEur6esvIB9hsDp/mPp7lFo5bdSpWuUJmIV+IYDMA4XhQ2HlpEzlRnIRbph8eVNf87v+Q6fAhb0c/m3MVxd8tFyxVb9Y81gByPRcsQkiCSE5pwmsKyulZqUaLVEv1u3WIIs3x+bNb8yD2yHDpwNCviB+BQDEVb9wvNkUkRhr5tzuAvcZKCK1a3YlQMgqKiZk645DACH/xtjMfJuwvxrO2CM+7QDkqILsRCOEBKSzLAalsdjOKwEj0xoBpfUZ4F6MZVFdVkpglxUycdcpPrvwejylQKX41I8bJG/71RLBDNkEkIhZqd3GCU4tI2C0m4GT1mdRCkASPq7Eb1ZIFJLSRHVcJv7tlsrYHafZFKykV/X0ZmzwN9wf/qd2/Y/9L5PHxPqcQcb02rOSJAwZxfMDROaDuaAjQtnkS8d0qBt+zwp7YwOVCmDivXLrRvK/IGQzr4R7o7OXnXiQ3o4d53d3dq467X3n2tuBkJk8aTuD884NTqets7Kt9cKdN0sDhs9CTLBy4lugul4EWYshBSANiMwIQioQCQiJxUiewjUkrucyyTflIODjHklQRgWk22IJJOFSG9lsjkR8OAbgcSJccWEAkBEfjZPg98dK0TpTZMaaPYgPmSzbDxyD6zWApA1GGghJN21uM2vzFRWMnPeBWdmmd+e+eSPKGJAHkYSG0JHxNA9w23rvVkICQAJS7kNczn1Hjsvpc+dlwhy4Y5VuKHmLNZSQMm4AqeAjASSAZNBTGkQGlWkuweU6SXCFnhJaqZeGkMiKrSEklJCEkLCoaoCQAJBRSEgT+e4oiXh/nLz4w3ppD7VjmyWH5BlkzczffLnEN14kT7RYIF3mHUDW7BT5ES7Zg9YmS+0ZhxDTaBsUjwSRGjwSPib2p0ElSRugLQFlwoBtEg8jhIyGxQ/cIZ/MPwpX7BQhcDTwkaUdQDZemgIISTsu5Sbvk8JKBblHZcRWEHLMfpUpO/T93nA/pSs2wHwaCKmSPLnUWbaFKhateqGqlUxM0lDhvVbyxxXcyKO/7ulxDHc9wp0J05fCzRfQIZZqOh6vBklpIaTLZVOpINOHkEoJaUFIZqbl+erxF76Uoyln1HrPgZCZGzMGcvwy+lcrKU1aFaE1Vi0IacaqG6qkExOSii4AsIdDX5KXqjUBIL4idKv2ZiyzU88jrmh+uBTnRL/rWKI3DyFNrEIXHCIYgiu2L0DdQyEvy/Cxc9S40XXLmuuGOkaA1ucqN0CynArWtdfyRnBByDSAS8EuO4Tk3KIK0kBIzDeAVsZMrdGgm1JVcT/e9AF/w1eP/uPkP5hvat5eAyHTAkhCSJjLDduthMytICSzSkOpGfqyfNFUx4M0Y9HbOt6p3/Ecw9ew0TPk4eDnxb/gW57w0YDI9CCk6iOjVkWJtjBGl+y8iK/9gG8ZZMce6pUSkvX68yriVY7cKrkBIcMtABkJ6BjF+JA0gkioJKM7rQCIpBkAuUKBxzgDH+2lgpD4977F775bIUsOeZ9EiHU8duaSlPxhnfh+Y0FIAkgoIK+BkAZGmtIOJA2IRD15TFE4lshOhJBLJW/bpdJ15XG5qsaud+ceb8cTj2/LoTNSDZ4RDSdslbZTd8m3s/ZK19l7pZtl36HsMmuPdJq5SzpM2yXtpu6UNlN3SOvJO6TVpO3SYsI2aT5+qzQbtxUltifib5N2SN2Rm6Xf0kNy5S+CPh7XzR0b7yW2pl6UJ/ohDiQUixo4rvcEj0gqk49mYKS17QKR+Ny1TfhoWTzK2J6bJBRws+Gcg6iT9+cZb9vc+V3mrvtOezntdafHgAMhHSjh9Q3onR6szv7u5AlS3zDwxmlP0jGoGl+HSzbcRploxigyXACSikgqH03pVkX6GjUk3OR8AREivhgiiZMPSRxi58UD2tAIIWPhos0yBiqyGGQXjoc7R1gtwMcPAB+piPwQcSHhlh2GOJF+74yRNzvNl+2Hjiq37O0KQsI9W4FI45qtS4LInQdSANdOy99MZuDM92vm+0WoxVwA0iggVamhpBtCngLQPaEUkGfPX5QpCzZIbBlkwC7RSIKfaSpBTzdC7EeCRw0ftSKykQSVbCDBzzWXmArfSGiF7yS4Yi8LQvaVsCpISAMVZPjrjAk5EErIgRpCvvOzRL87QiLeGy2RgNCv/4yb9hVHpPIAuPkAQCY0XSwJTRZIZN058ma/9dIf8SB/BKQctCZZui45KqUG75BYS/moAaQFH20QkvDRGCFknKWCfAYKxuYrARfhhm3AoykVhCSMhAKSELL58uNSa+FRpYBkEppiGL9FGQuSKsgxB6TwD2slz9O1xTfmNQUh7a7Yrizz14OQUMhQHfRoZAVp890wTkevVDB327mTxzFv8QbEuntVu3EqAGncsE2pAYYLWGQCQmYLKy+BBd6RNZv2cVdWmzmLoJsdB4SDdPvs3ne0/DsIcTupvnONUzf4ciu60rhjK2WXJ0jJHYu4hsiM/e/A56QigPrlK3+ofdxsnezfY59u27Ffwou/j3iEBnRdD0Jq9aNJsGaHkCqLsYKpUOMBYPsXeEPmLlzHXWTpXOP+T54+L6VerePKPM2QKFoFaSkhXepU+wMMG4SkWzbgqoHDVELmBuQjpP+8eV/u4prrgb2dr7fN315C+I5m7fvLf6A81olojBu2UUKavrHgI9r52qQ0lhJShVcgqK4sOaPLy5hpS7iLLO2D6x1/en9jfQcNmwIISSUkIaR7rriAN/rEPW/cfWP6yF0SHOOhCyEk7r8e8Ckl7boO8xpCXrp8VcoN2ii52iyXcGTHpht2JOAjLQrwkeYJIQ2M1GUsYJ5SQRJQQl1IUMn33A7DdqFeK2X9sVuDkOcuXZWKw7aKb4fVAJtISqNUkKinUmzqOlO5qUwBSGyjDsa08hHwkZ+hTjweHlekpYT0a7NUqo3bLamXTAbvO3dPjZkmB07+LsW+XyfZPp4veb5YJP71Fkpgg4US3GCBhDSkYVvZAglq8Ju2+vMlCBZYb54EfjXXZf7Y9q0LqzNbfOrMQVLH2QCXu+UqQSRTwGR4r6vnPCaWegjUF3E8gwBu8yvYSAC5Hgn+UJr312zrv/M7yuwQEtsJUEfS6Nod2WOjxPdeL6M23Vrs2YyP5c71n1MHp62dMXD7x4ADITM8Ud/+xnYGsNOm984YsG5U8PSSwKnc283hclUeN9ZUQ1puYYCOvteASAtA0kUbpiEkFkzchttcwMtNJOEXKM+oeBwBCDl8lwKSCkKORUxIWDT/Ngwute2WSNgHcMP+YKKEAUSGwi2byWqCoIoMqTFafp6/DW7ZyVBBAkZCEWkgpD1pjYkVyUQ1qVjQ/VcFTXfGIcchYwudowIyhepHrYB0uWEbGGlUkfg7XbGTjqbIGSggpyzYJHEvNBXfJwEgSzcFeARspBs2YKQdRAaVwt+faiTVv58rZVuj717pBgDZR0Lgjh36Wl8YMmNXGYDYkANVdmwqIWPe+kkSPxkusR+NBHyGGrbmJCn5zXIp1XmpxDWcL7G4OY+pNxc2W6K/moP3c6X1jCSoIVOlPyBkfygd3kIG9hgkmskHEJnPBh4TARvtZlSQ8QMJIbdJVP9t8v6cI9JqJVWPjAWp1Y92CNkYnxFANqYrNrJnV511ECpIumLvQzIaQEiWsFJj90t8k4mSA4DNH4tRrYJkcieahggZKSF1NlksVqEYyoGkIBFF35V5SzdzjXtfADUexxyAHqrYckMJSRWVcue0w0gLLl0fQiIRDeEF/x24YtMdOydA0qNos0ciKsjkX1dxV6rNsAa8zsLMOSfYr01UnxES1vyqC1RpcJnHwyQD8NwwhYApHaCSBkBS0aUSbBBCQgn5QEAZadZxsFcwxdSRfbp8zXYJgEKMY0craTMPId1Zm7VikFmjH4e6cisAJ196f6a8s2OE+9+8I0kii72jFMPueJc4Tpw/rpchW8WFJFi1QUgNIwkhX8O/V0HadhvFXXg9J/jb1JNn5e3PvkGMSWTbxjnOFQdSbfNhQuYhpAJvmMMr1+3kLjB372y7mzGW+RJQB9mxP6r7Lc49r6iHshlBSB2+gHPnehBS/02BYxXG4BWZjwc3PI9lVh3KdjwNV+fnByKJUJtlgJCAdBaATA9CEt5pNaQbQCroSACZ1gAhAxFv8aUhm2TPae9jcOu+/ls+HL9d8kKtGdkZcSABGgkgjdu4C0AaEGlKAyLx3riWa6hKBeRyicT9A92xg3FPmdhrrWw/eQm7u5PjSs8z7vPo6UtStecayVNrvkQ2WSLRTZdITOPFEgfPjthGC7ENa7RAomkAk9ENf4PN19ZgnkTZLBLbEfXnSTjugcLqz5XQL2ZL59n75A8+cL/B8VExmXzhqrw4FOFtuq0BdDTw0Vb2IIy0zLbtApDqN1BCsrTBSELIeCS5CUNW7DKDNyEe5MUb1ifz8+1O9p+zL6d/nDHwT4wBB0I6ENLrm9B/YkA6/+bdcqLjTZO+2f3r77+k3y/T5cGgl+GSbVNCEkYaCIltFRvSgo/2bZVVFVk9fQFUfAu+K7Htf5X48fsljgDyl50SMwyqNSgjCSJjFYQEjISqLAFuseG1p0kY3HFDP5wkIYgPGQJVXNgnE8Xv3dFSEbH2Vu06pFyDtTs2VI+WC7ZxyTblbkBIqiLPXrjTN593S39eW4+zjAEJl2sCyEOAjgSQxlQ8SDuIxHf2H2MW7POyekuSxJdtJbmKQeFYpgXgI5WPUEIqNSS2lRqysQSUbAhrIEVq9JNvoVKsMWiJ+JbtAQD5owRV/kGCK/eT4NcGSJCygRJcBSpIAMjKnWZK4xmb5fW+SyXqUyhga06Q4E8nImv6RAmvNQXxQidL6KeTJQxl2KdTJM97k+TNvuulH+JC9oIictCaE3D/OYxkM4z7aEFIy/3aAEijgEyg+7Vywd6OrNjbpTjgd5PlKdJsObNiwxUb1oRmwUiWjREDUrtiJ0sDfO+ZCUxIo9WPBkAWQwbvUhjfga99A1VPBZW0yRNCGhiJUqlljFLLuLly8c5FaBV5NPwVqVijNWJ2XlXn6swuQO/GcyoXnGs37ZaEUh9Kjkion+ii6QIWFrwghITdHIRkVmwNIemOnRNxBx8IfFHadv1FrsINUbeBXgjeje1xt9WJSTYuX/5D3vy4NVRdOO+7IKRdcccxmhGExNhN41KaBxAyL5Rd/y/v09L7p6kKpHgzlvkbvibNWKIU+hpCagCWcUxIM7/4PbsZSKbDHmTDXCtZrq7s2nNI7SNr+kWPU1bgt2UblHsyk74o8IjrqwaQdiWkZ5+4EtMoAGlUkfi9UkRCZYh+CSpUXSbMWnFLx8gfHzl+QspXb4oHlK+qxHXXg5AEktdmxXa7YzPTPdWyBNZBUKPugwcDX/cKhKR6mBCy6ketVUxLPWcIxtPpH9e8uRZCmliebkCJWLdol9yxr8rajbu8ahP+aFfKecnXZbn4AkJGGAj5DWAfLIpG1SDKaEA7Wky6Bghp/xxuztGwgPbL5K2RW+Toee8zT6sbTtSzzdx9EohM1hGW+pEu4xqUanBKeKpgJCEqgKhWOlLtaB2DKQEeowkfYYSQkR3wb36zRHICRA7beoJawTv4UBoHZq012RdURFbuAXhbZ55EA0BGI741AWQswGMswGNsIzxohToyhg9cG8x3G0BjtM2isB2pbI5EfvWrhNWdLbH1ZsmwpQe4G+u65773M3X4rzqH/ld+WndcJSpKAGBMgEIzsQdtrVVim5/B8tEIIfF3mv4ewCM+swPJBKgnExSMpAJyk4oz+cX0PciYjnO2s9a+pj+y5vriHg/O/p22yOox4EBI58TonBidMZDOGFD3DLhJ0wu+DQBPeQu+gQVMVaWEVJmyqW4kdCSIVPDRlFoFqT9DhmxL9eVHBRgUS2Hv9ZQEqMQIHg2EjCaIZGIaQEhaLFxa4wF2opFxMbQGICTUkMEAkASRdMkOR3zIwLdHSqdRq+TAMbpeM2N2Coylp0s2QaSKDwkQmXTkhFL4/C/fEHFRd+7iJVfimfQApIGRShkJAMmENaeRBXvdroPy7Ec9JHuRrySoTEvAR8SBROZrZWobCWkAIZUqEgrI+Cpd5PmWM6TZgmPSfOpWCVYqyB8BIPtIQIXe4l+pr4S/M0gKfD5Snms5VT4atFK6rzgk3ddDjbjgoDzfaZGEfoI+B4QMA3gkiAxGpvQgZE8PxjgIhjo2AHFCCzeeIz0BCHutPiH91p5EgppjUnjIDpXtOp8CkFBAQulIUwDSKhWAVBBym0QDQr6JeJJUQTYFXGwG+GiHkEoBaUHIRlBBNluRLDV+O4KENHDDHrUPCkiqILmNxDQY30V7L5ecRT4EeKmiEjV5qB+VGlIDSEJIN4jkgpXKLiqzoCADiMwJdVa3H8erRYU30CarbzLS2z8PZj+y3D9fqZ5kC2E8OQMjNHj0gI9Q1ikQma47NpWQGkASQmoQyWzOFeXfoS9L2beayyGEEOArvXo4n2VwE44F+pkz56XMa3WRFKU8zvOWe20aoHJzENLKjo0+Yabff/mWlokzl6k+0YApc31jIGTvQZMkJwE24xBSQYvSOwgJkAowx/lGN+UK730th/HAhS893zJXv1sfU3p/3P+MeSuhhC4Pl3OcD1RCmvQgJAGrHXQZBaStxHnEQMhcgH2hCKsybe567iLTqjpzfPztjl37EXv1E8kehX5A/W4EIdU8d811M+fd7th5MJf50Ca65HtyHjFDbza2nalTVpcM+VL+ncZwn+ec0ephz75hP/Hcrs0NGjWMZPzOtBAyD1SQOdEufshSv2a9UYdez9322jnNvtp49BwyWwMYtl0OGAeAp8wGIRWM1ADyWghp4KMdUi4DgIThHs0XiePqTtkp51Ts7Wv3f7P9wnoOX38M/+4SNyj1gJCe0JHgka7Wxggc3abrFg2VZhSMEJJxIbO3XSQ1pu2VS1dxb4v725ut2618j8eFZ/rqxX+Hr93IBP7U13C1/nKOxFDxCNgYDeioSrhfR0Ph6Gn0/gCErDdHW32UsCiWDVjOliiAyJA6M6VIi3my7fBZ1/5M3e33vSkX/pDS/TZK1HdrJLH7WkBIwEdlFnwkbHQBSNu2BSY1iPQEkgpmEkRCBRnTe7NEfb9Jhjmu2HdkjJk+dkrvzz9O2935tnMgpAOgnBOkMwYyGAPuxdDJU+egimkr/4HiwQcLGB/eYMMUhFQA0g4e7duEkHRFBbwkeIlGzK0nv5SEQduU63XsMCghf9kh0bAYKMeYLTthLJR2gDgxY1D+tFPC8WQ3FGrIkI8AoGAhcMema3YQ1JBxH46WKUt3ysFjGkDuOnQtgDRqSJbMoE0Q+ccfWlX2v3TR4Q3oX4gXlHrmAhLMQAFpUz4q2Gi9pwrS/rf9x07KqbPnZdnmvVKwalvJBgAZWLoVYGNzZYHPtACEbK5AJDNgB0EVGVi6iZT4ariU/36RPNt+kbyDfm49E0lbvpgI5eMgCas2WMq0mCz1R62T3ssPyE+bjsugHafk21XHpO6kXdJ4FrJTzz8kzecdllJtf5MAuuB/AjUsgGSIBR+DECc0CO76QTXGim+NCdIGv+kDFeQPBJGrjsuzvyDBkUpCY7lgEzzCGP8xfuBWXQJAxsGi4YZdYtg+aQiVY4sViPUI84CQAJIGQjZamqpjQgJCvjj5oDyBjO5F4H5dGK7YRQAjC49KkhLjDklMrYHI3FsBkB7zRIF4mwu2DUJes0iFYigvwBsXpHQvjixcTTZvO3jNguJeHrtckp3COPzkq67yEJR2hIy5FWS0gwmzDQip/sYSYNYyBR8JIO1mA5E5YspLDsTinLNgrdV2d2bBeS/3i6o7E2zgv5SUkxJZqgbaENmnjXqQY9MGvDwhJGEeFZDGTExIDSF94ipILsT6yxldVrlSs1O8gpDWIr5RmwHItE24RthDSMpSb3tmxSac1EpI13Go4zEqSAtCQoH3ENT+XzTtI+eomGczqHsDU96pG3S2jAYVoyf/htAC5RVkdZ9D3OcRd8Zyz35Jq4bUsEvHGMwJGFzouU9k1/5k7kiF5fBmzPK3azftkoAn3pQc0fi3VR8YIGypTV3qZltbE0LSMOfdxgcNWglJJXNY8fck5STjC5o2v9N9YPZ78yXbY0/SEQl74i11fD44x1/PHdsNIu1q4rSAEnCcMTyRfbzwi7XUAxVv+2rW1hQJQEzE4HY2CNkBEA8W1QHwzrJolAR3hIsxLoMyEp/FAPLx8+hvliqLQknzbb1Avlt4ADEGOW5vvs3SHgvbcO3Bs1IUSW7CWC+j0sywtEFH1zFo6EjwqI4D8DGaABLqyqgOSySgw2KJ6LZW1h25wEGlHrSnrcftf692xcPzeO09flbKdcD9zZezJLIhXKsR9zES8DESsFEbFY4AjACPNA0gGYYGxnA0lpm/KyCJz4Lw773QaalsP3Je7U8fj64Dt/lqO/eABCIBUAISx8QBRCagTQgjPQ3KR/zd4zMXrLRBSwDLBBoAJRPcxPfYJJE9N8vTiM194CzUseo86v24uP394dTFaVNnDNwNY8CBkM7J0brRdibk3TAh76468N6B4+JvtVgcPGKW/DscqgwqHlRMqgxAJP7uR4N6hipIDwgJsOIX97rEfI1YfoCNcYBTccN2SczPUELC4hAnMoEqSPyNf48dmSTRXVZLMCHUBxMQDxIQEslqQlSimvHiX22EVGozS7YdOiF7DgNE3gBCGhB5GKDtflGV3cyY4U0g3cWSEReTUJGJeuyg0b6tIeQZnSWbCsiz52T9DiRZqdZZshetL4HPEUC2UBb4DNSQhJCl+R4AEjDS/6nGUuyrYfLuxL1SY8Iu+XJakjRbdFRqjtgkr3y7WEoDKhZpOkvK9loqH4/aKJ8MXyeVeiyWkq3hSvTlVEDGyfJku0Xy0djd0gJKw4+R0TO81mT0vVE/jsV4oI0BhBwNOD1OclcfJbVHbVcu2T0BEPuuOC4VobSN7L8ZwFFDSAJIF4QkiFRGCKlVkNWmH5HWq5hsJllawCW7OcylhLRByIZMSANFZE0kpCmqwONeKQx4/gTGbWFCSMDz4kO2id+zddXCWkNIAHhLEexKSAMwn+4iFQt0pcyCYiYb1HzVPumA+Hmcg/cPRNPj8b/Spddo+U/gCwCJBBCEjGnBhB1AekJIDSOZXVubUULqEm6dUBD9y+85+brTT8q1+F5TVd3MvP4nvmOUhtu37xPfQm9JLsChPACPTOBCl1oDIXW8P0+AYgBkHgUiNYQ0/UMImT38ZYko/Lrs3X/Eurbw+mKuMzd/D8JF9Af1uwHQ2SFkRkrI9AAkIRmPx6o/k39ApflQ8IvSAuPlyh9/2BbOma/frfYL9ogHRv+Vzj1H6picDGdyzfnDQC6W7n7R25YKEsdHIOmGkJXwYORVKVXhSzwE0ICCsYG9qS/7gC7xDzO5lGpHAx6tkqA30xCyAlSfUP3lry7bdh7mLrwC1d4cz638xsyZqXOWSW4kEWNfqYRHCn6n0zfsF8tcYzDdzzSEfCjoJSn1Sm1JTsV9ixf9xXactDVVfAAhQ1wQkgCSbspuAEkQqcGdAXjplYR5FtgD1IvAdkCbhTJ6w3Hu5pZcnPn71HOX5eW+uOdrx30TMhKSaou2Sv3eXe9IpXR0w0cNIHUdowEfXRCy/RJkBl+G5DxLpfXsJFb2DkFI6zzHA3S9NAzcg2Q+T7aeK0FIMBOBGI/hgI4RlhFARgI4mjIK28bsIDIK4JEWSaM6EsrIvLVmSsWea+XIGbrIm3OY3vn6o+el4HdM/rNOYlHGfQclJOJCJioDXMwASCZmCCQJIKmmBIREHMhYxoPsvkGazT+K8Wr27d155lbmpfNbp82dMXB3jwEHQnpxQXcG9d09qJ3+uV39w5sHfQPBW5fN25MktPA7ki0Ki0uoHzWIxOIorRIyQwhJV26oIiNflfA3ukocoeMoqB8BIWMRG1IBSSgimTGbIDJhwgGJRYKRaLjVBn81A8loAKEQGzIYMIogMvSDMSprdkD1YdJ+xGqVYGUnXDztyse023TL3g23bcaITD19wXV89/uYYabbFCw6kwAVDxJAXgdCHkw5rSElvsskNGt3HpCi1TrJo8UQ4/HZluKvgCOhIwBk6ZYSoIxqSFiZZhJRuau89P0yeWP4Nqk5fo80nnNQmsw7CHetPVJ7ym6pM32vVB+xRQrCFcnvg3GSF1mwc7/+s/i88Yv4Vhsuvu+OlLzIih0E5WPFvhukHty8Hm82S/xrAD5DARvysQaQwVDBBn4wUsHIPPjtB4M3SH8kp+kBV+p+q5Llw6n7JGrAZgUZXS7YRglpIGR/qCD7bZMCP+2Rr5akKAhJJaSBkOmpIRsBQjaFCrLCDKogd0vRUXsAHwEhCSIZG3LCYcnfZobkJIDn3IASUockuBYkpIUHLjACiEO10KNhL8vYKUvVyuF+gpCcb3xNnL5YHoPKJxcU0m4IaYFHtgHNpYLktlsJ6d62gUiqIi01pA8gZLaIspK/9MfK9Zv70/PclLfrPHl//TsGqCxcuBoA7BXAFK1cuxYo2SAexqqCKVC3EUReCyHpil0Biq6XJb7EO3LgMFV43rUb+/EilIovV28FCIn9JVQD0CH0MWpIwki73RhCMg6hD+zh4JekU48RSjHubf1ux7WEx3jm3AWpWb+rMNO7W03NhxluS/chBvrL7vJLRTWTvXA++MClNwfUqC9WqSfnzkPtiZe39eVvh4+bI/8v+BWtbFQu8QSPNhh5PQiJMXOtErICPoNrN6Dr5h06Lqc3allvj8nb35k5822fkYjha4UvUMA+A0CcLnBMD0wCQqqM8s9KzYbfy3mM+78JzjKxbuE4/hseED2hVMzdeqmEtV8h4R3gjg2g54KQ7QH0lFnQETEeCSOpftSlHU56QsgwxFgMbrNIpm22IGQm6pb+cYh8MXYbYOkS1IlgUddNKzTd4NEoNyPxHWWoq/6+hpEKPhJA2kypIaHcDMZ3S/RcLclnOQe8Ow+lX/fr/Vuca9ybZWwnpRzFvfWB05K/ya8SgJiOEVA8hqMMr2tgJCEkDJ+x9ICQeE8YaZSQkfitjhGJzwAjfT6bIZ8M3SjnL+ts4Nzzn4jx/tmobYi7uUqiu2oVpIKQSg1JRaQxgkkNJ10qyTRwMoHKSQUfCSC1xSFOZDST2fTZJCuP/q7b9z56gJr5fr/emHD+5rTn//YYcCDkLV8w/7cHkHMCud/7nzdO+rbpypWriJfVRh4IrQAIWc0NIQEdCSINjPTle2VGCcmyqjK6j/kBKgQUeh83QAsljsARADIerrOMDxkHCEkgmUC3bADIBCT9iMZ2xLcrVDzAUKghg2EhAFKhcMUNrQEQ+T7csqGIG794pxxKPaniQqaFj/o94KMVH1KVh5jpmTdJ+hjvx7HMu94//vxTjp86BxdsC0BCBepWQrrdsj3csKGWZAzINVRAvtlJskEB6Y8kNP5UOrrAIwEkVJHKCCWbI7P1D/JU27kSWwdJYz4cKfG1xkv8Z2Mk/vNxkvD5JCnYYLo80XimlGg9Rwo0nCHRn0+RmDpTJPLTSXCxHyd+7wyXvNV/BoQcIT6I9Vi6y0qpM3EnfjNLxX6kK3bIR2OhhB2DcTBKAmuMUGrIwGo/y8eD18qAtccRG/KY/IgM2V9MQ4KjAVskFsBRZcEmgIRR+agNKki4YTMW5AtjDyIWZKqKB0kA6YKQgI0eakj8jclpPl90TEqNgwISyl1CyCfgjv04VJBPjN6PLNkHJOjNb6HoqSr+SOSkQKRSMaUHIT0XqS4IiUVqDsRZiyv5rqSkarfE+wlCmkU7MxwHQi2UA+ohBSSUEtICj9dAyPQAJD/zhJCEk3TRZiIUn8TX5N8Bz0rvAePUeexeABpZfR5iUhq+pv26WB5Bgp88CkJqFeS1INKCjx4QknCJINKuhKwAUFhRHvR/Vl6r8bWcgiKb8Ya9OVbW7fCRZCnyUh2o+gghjTt2RhDyeu7Yuv6say4cK8fNrHk6o7o3dbtdv+ExUi1aqvwXyGRd0QUhef00EFK7YqdV2fF9BhCSoBUg8lFAyDotfuAuLHW1d9c/Jnzq3GuE/F/Ai0opm8cOH5W7+w2UkBlASNYxF2JHL165XdXxdrXpP/vv/K2yvb/2YWtkxkaSHvQT50rah0zX9o3n/LlWHakB8r9DnpfBo+coaKXPYTd/38lGvIx7t9ZTd0rOFosVfIxQABIQEuCRpuAdgZ9l0SjTNQUlNYSkGjISSsjgdosl6ttlsvzAGVt/eTem2Ed89V28X8LbL1R1MBCS6kZlVh1d8BHvzbapP0s7fPTcBtyEujKo3VLps+KIrrOX56LMjym2izF3H7ISC7YlI+bjTPGvPRMg0oKQBJHKLAgJEKkgJEqlhFQQ0u2urWAk4CPVkFRF0n3b79Pp0mXmbjXXsWdZf+Ss5O+0SnzarZGYrmskDhYLABlPCGk3F4w0UNKzpGpSAcvuKK2YkvEo4wEgg6Cs/HjafiSkcR9j5tvK+a3TZs4YuN/HgAMhcUW43zvZOT6nj70fA+aGSS9Mu/afKI8iDlfuOCz46HIEY0B6AyHdAJIg0g5doIKkyxhjQ3KBghv14I8HSTwUZInDd0oiIGQCLB7u2fFUQ47AZ+P2Sb5JByR+IuJD/rxTQpvOlWCq4ZikBslqggEgQwEgw94bKQFQ0D3faJps2HtMko6lCGNDqmQ0gI4GQO6iApIG+LgHxs/3HD4hl5AFljdn3rfR3flb3the+eNPOXriHKAjMmBD4ZjW7dpkwXZ/jiQ0BJCIAXkw9YyU/uh7eQQxIDWAbKpAo1Y+GviI8mkqIltIWNnOUrjhdCnWfoE8h0VJxEcjJQJKxagaIyWyxggJf2+YhL47TELe/lmCYUHVh0rQ20Ml4O0hlg0VPwBIP3wn4P2RUDyOkbeHbpKayLoZ/QXctAGdwwggPxqjIGRIjVESBPN9+xd5usVMqTFwpfRfcVT6LDsOd+xkqT0DEHLgFoDI9CDkdokFgIyCCvL/Z+/8Y6oqwzj+V25u2R815IciIBeUCPuxNrVcG9WiKZUpstUMaiNWDAdK+o/hULfmTKVVrJQsJ1A5UVqb201XM8EGhCKj4bxWZgQmZKRTsWw+fb/Pe957z0WYXCOEdu/27j33cLn3Pe+Pc+753O/zfFMrffLS/i5ZC2ftUqggXwdoZKEikuYzQRASOSOpgszy/iwPUgXpKCEJITU3ZG2n3P92s9w1J0/XhTVtCqwFrgk3SHDfqDqKLTWhWCITcXOfv6Jcbx4I7W4mDG8sz2nOz197+2TOkwUIO880ikfmiQtSPjpA0r9vMBAZgJAGSBJCGjg5OfUZgKpMSXskT87ACX4s98dYaZsFxOs2fojw5AyFWgHn8oEwMhiiWBWkgZDMDWkhMZ2xER4PU5qXl2+BoqvfGQteX0I7f3LeMF/l3KdXYGzxGVQ9upSQNjfhsNSQqtTjMTyrBjCx9y6WpiO3Hn7xGBua2iUa7YngNdMJx74eQgb/iEHoReWqhVmmNuNAUyCFkHAAL92wgx8BxSdBcOhjwDG7eOmyvLpyM1IePK6wzQ8hLYBkfQMlZLB6lusWP3BiLO5MXijer1u1jaHOj9F/vflu1NjqQ6qB5zQPrY6Dc+x+8Khw2IHEw1RCal5g9ElUWpYcbPxO+yN0CHkNJj9/Skldh0SUAkICOhoISQBpAF4SQp8V4AHMqVqQ+ROpIORz1z7CPJNb0dQehDdPKTsk9yCHY0fPxREZL77JcZi2pG2Am/XaegeGOqDUqh3RbraX7dfa1Ubb/gB4rJcZaDcLwapu433i0A/p77fKj+dGUw3Jc51Zb9ywc5XfP/m8rvkXwEOvhmZ7ig4YNaQfRDI0G8BRS0ARqc+dfJEmLNtCSb7Gq+8RB7D52dEuHZ/u81ekDNEpD5R/i9D0RkBIhGMDRKYyJHswCGn3WeiI2oRtD4CQBJDMLwkl5FSEYu/2wRiHxzhqgDfQn7Zfw3W4T8JzYGzPgTCEdF0IwpN1bE/W8PjcyvHR7xPSe+4C8kkVIyQbObR4k6FAhWDFAZF+FWRADWmgi4GQFkRGIi9VzNwCgKBjkvrxCZkF9aOCSIRmUxmZShCJnH6zak8BRJ42jtlb2+D8RxgFAJmLfIC5n8i0HJYamba0RqYs2SH55Qfg+gzQiPyQJxCa7YNbtg9A8qQDHxVA4m8nO3tMAYw81fWb9APWub8Ujvu5hi+1Fy5dgTIUuR2hfOw82wcIabYDwNEoIn8CnDkNSKnqSKgle3//A33XK1mrKmXS7OUIwSZwhNIRhYY0akqj6sc1CiBjHy2T6QvelMRFFVA77hVP4R7JqWqT+4r3KHRMerEGILJKPLlVksgCGDkdoDEhp1oSUMcv3Ynxc8AkgOJU7I9+fqekLKuTwr3HZcGWBqgd4YieB5d0AMh4wMl4hGKzxDlqyJl47cPrv4Sy4Yy80wAQCRhZCAiZvK0NDtntcjcMalLgkk0FJJWRMwAgWTzvdchju2CCg/DtNXDFLkXuR4WQDoxkfshASDbNas5KyeEumVeL0GtHBan5IKmChEHN7N2dkpi/VZVB0TBwioJiWAG9H8gPhJAGPOpa0pt2rCmCONzA0iX2q8PtnJYaHjru5+QQ19pXVm6SO+BKbMChDeU1dXA49mAAcoh9fiXeQr2BnxSfISVlH+hN2P9JUfpfzAkLIZetfksmxj6hICkCql4Nsx0CKvnz2mm/WyWkHUNAYobYQgl5W0y6rN9cDWOwq5jXvJ7xtDv86xpBPB/7Dx6BAcgLUMxlYa1RAZnt1Nah2R2OHVBC+teZgjIeEwEk1WZ0Zc6UGJiAHPrmmH5GKO0aydfirl3+QvjspopdMiEmQ6KQziFSf+zjD344X9iCYxgsHJsQksdlnJZ5bFgjUEFGIBx+cipUhkh9UFnt1WP8N2uB4eJZeaUyARCSCm4/hLSKSD2f3QBaa/87IFvnjqPWTHpKyrfvc7UxtHkykuMxnPdiQ19bt01uB+A1wJ79juOyqtSBtY6PgcX+tRO0j//PfKeLkFJivjw0v1h8P3RrfwynPe7XoOeku++yZG8/KpEKIfEDIQEewKMH8I5FQeMgdTJDorW4YWQ94B+eQwmZqBCyXuZVtEgX4BYfoa5pd1vNNvM0XpPsj6CoWw23aMBCD/JYKiR1oGPQNgGqq+0KH/Hcgkdbz0SbtaDdKTDXSQGAi8d7F33+vVw1p5WQzkXXt3v45zH7v2SP7gfPb582dUp0wT6Yy3hVBcmwbA3NBpQ0uSHdMNJCSYJHQEdH/UgFJEOzTZ5IryQUeSVp1RcAkUb5yc9s6Twv6e82S8IbjVBBtkjKRqoiARKxbVSRprYKSdZ228BKmNoQUCqcZNg28kGixCGH+2JEMfX0/43JcHNqd9s/4Tr0ORXus3Cfjac58A8AAAD//8/Urd4AAEAASURBVOy9B5gURdf2/13///e+j/qYQGBzmp3ZSAbBjFnJOScRUBBEUJG0wJKjiZxzUJKSc5KwZCRKWsLCkoOCoIB6f/ep6prp2V1gd8E8c3Go7t6emeqq6p6uX9/nnP/z22+/wWe+NvCNAd8YuP0YgLpOgK9WnYfhwchyyBNXDXniq8I/bzX45a0O/3w2k3Vl1VjKPrT4KvCj5YmvzOXK8IuqAFfrmcj3RTLyTdiH/BMOIH7ifuTlslj8xO+Qd+oh5J9xFPHTk1FgxmFE91mHkDe/RFj9LxFSbypC605BSN3JLCciqNZ4uOpOwMKk/Ug9cwYHUk7h4LHTLE/jYMoZbcfP4qBlh1iKHUg5ixNnL+GXX36Rg/zbXw/lGC5f/QkpZy7i2OmLOH7mEpe1HZNt1vZjpy/gKE2Vpy7gyMnzSD17nn8/j/oJ4/BIsfcQ+GICgsSeT0Cwso4IfqEj1zshqAS3vdAZEWU/gaPCIISVHYDwqiPhbDwF1cdsxBNtZyOk5li46k9EZL3xiKwrNgEOlg6WEXXGKwuvPR5hysYhlH0YTAtvMAmvfPwN3p62F8U7LEFYwxmIfGsGHI2n06YhotE0hDfkOHjzC4RyPOSpPQWF2i3C59+kYsCaVAxcfxJN5iUjevgORA/bibhhuxA7YjdtD2KG7+W2PYiixQw/gAaLUtFjyxl0TDqNjuvFziDBsg5cb09rJ7buDGS9wYoUFJl8AMWmHMTjXxxEEY7RIlOSUXTaERQZuQv+L7fiuVEF/gVqwj9/DX1e8ByR80SbPh/8eE4o4zkk55Eyvs8vrioeDCuFl6u0w/mLV/724/FW15Vff/1VLicYOGom8jjLIndMJWV5YishT2xl5GapTG2vyL/dwWL5d8v0Z1SCHz/Dj9vkehNRsDo2bz+ovvNWdfJt/w2//vobrl+/gdJ12+O/EWWsvuB1m+NSxrW3Vea6zUyfxbHvxNR6BZbluV95/N+AFzBmykLVB/I9vFRlaXybMTNp+jL2aVWOCf4GxVXnuSMmv0fV+RvD36N0xnON+xvznG9S94rKHnWVRuxTdfHdgZQ/dYzIl1+4dBmla7fD/cGlEJCfx6R+Y+V31vzeeo5FflPt5ukPnkfsAzm+3LHSB/KbXZ79UhFLVm+39UF2fvOA4yfPouhrTXB/WEl+rowLfT+gxonteuY9XmQ/23ixL1tjJU9cBTzsKou32wyx6vhrlsfJH3keSyUvfX8Fz5Rqgf+Gl+UY5PFZ5scyQ+Nx+1lmbw+1r7QJ20L6zo99dX/Ya6j3Th/1WyDfldVjk/ckn/0RrwzYgICOa+Dqth6RXdfBqWwtnF3WwuVlaxDVhdbV21xcd3Xjvt1Myfdy3b/zNyg1did+vKGv51k9p9MejznHP192AEEfLUV09/Wqrq5u6/jdNmP9XV1ZH8uiWNotmuva1iCGyzGsfwzrG9N9LWJ7rEN8z/WI7paEoh9vwp6zV6WZ8Ju6JmXnfLib96ivdv/3081f8dH0nfB7ez7CWixBBM3x3lJlzpZLkNZc3KasFUtalM1cLRdz2yLaQgQ2m4cSXZfj2Hl9rPKFKw5dRP7+GxHRcyNi+21GDC223xZlcSzjuO6xTdbyJsT3p/XbqMv+m1lyX1rsx1sQznLKd5f0Ocvf+LT961u/m7Hie69v/PyzxsD/8XXoP6tDff3p68/fZwzIza++yVydtAvBnBjl4uTPMzmyAKQCjwQvt4WQvLnOWwUBUeUQ+lp7wsf9yD95HwqwzDfxAPJO3MeSIFJsErcRUuafcQQFZ6egMLdFtJxjwcepCkCG1JnIciK3TUKequNQu9sc7D50HEdTT+HAMZobQnoApIBIBSFPnEXyiXM4wPUzFy//STeh927Myp3ftZ+uI4Xw0QBIO4QUMGngpMBHZQIgU8/jxOlzOMvJ79vdpiDXE60QKNDxRQGOHWiEj2IWgAwuodcdBJARlYYivPwgwsiBCCkzEK5Gk1F90hY8l7iAEHI8nPXsEFIApDaBkA7Cx4ja4ywbi/BaBJEEl+H1x6Lq2C148wuCwmZfEzxqCKlA5FsCIqd7QCSBZCCBdP6P5qP/yhMYtPYkhiSdROO5yYga+q0HQg4niBy+WwHI6GG74RqyF09PSFbwscsGwsc0EFKApEBHBSItANl2XSpKzjmMIpMOoPjUAwpCFp16EEUJIovPTEFs2xnIVbA2x38N+OUnhDRg3g0gPSDyVhAyD/f9T8jr+GTEXNy8KWPjn3sjLxOhrTsOIP8zb+CxaA0fBUAayy6ElPcZmOnHyXxAfCXkdJZDhfpd8NNPN+RrfZMjXisy+q2QtrnKhxhPlm2OhyLLEF4JEM4chNTQkfuzzfWylALBBH6Vx30hr2Dil0vkK6zvNmXGdUlbPwMoFi7bgBD+Bj0WLWBUw8esQEiBkRr6CxDTEPJhR2k88XoTXLj4va1+matX2nrezbp8+YYt3yEX2+2xGD7MyCfw0Zg8uNAw0gBVO4BUD/kEYinTIEtDSAH45VQf5Ikui9Xr96hj1CA468cobz7Ch3yuJ2vjIbZb7ljTD1KatpXltNDarJs62ks9VgSU5oguj2crfKDgnnzX3YKtu+mP273XjMdla7YiFx+S5IyWsS/HxLY3IJLrBjimLe0A0rNsrl0aHj8Q/hoGjPxaPRy4XV1u9Tdpvz2nLuOJT5IQIhCyiwUgCR4FQGoIKdsFRkppg5DWstmugJ+BkAR7AiEDO69B1Ql7cIMAjz1l9VXWzuu0dZfP2Xf8ImISVxMyEjZ2Wa/LNOBR6hPFenuZbKNFEzpmBCFju68jiFyPOELIvD03wNElCYmLj+Ly9T/rIbQcrX7JOJfXDz/fRPOx2xDQbDHCWy5TIDKCIDLyPUJIuxkAaUoBkFyOInyMakUAaYOQzpaLENR0Dprxvurc5ev6i/j/3D1nkbd3EiL7bEG0ApEaQgqUjOsn4NEDHwVIxnNdmwdC6u2bEd57Eyrwvuj4ZfmNzfp1Je048K372tA3Bv7ZY8AHIW9xI+4b+P/sge/r3+z3r0xcXq7aBo+6KiIgH2GLmhQJeExrooZMr4T0IxDIQwjpL6qv2GqI6zQX+WZQDUnAmH/iQaogBUSKItJSRRJEFph+hPscQeGZxxDbNwnBb0xBWJ3JhI+TEFJngjZZpirSr8ooJIxeRWWfKCAFQhI+ihKSoNGYUUFKqYCkBSIv/MCnxH/ja8LVaz8j5SxBIwGjqB+PU+FpVJCeUgNKAyGPUgF5kurHSz9cxof9pyPP4+8h+CVRQAqAZEnwqACkgpBUQCoVZEdElOqPyErDEFFxCCIqDIGj/BCElR6A6DfGofqEzXim03wCxQlUp06EU1SQhI7KBEIKgFQQchxB5FhlEbXGQiy8+miEVhuO0p+vx0v9voGDkNH51kylhEwPIadRJTkNQW9MRd4P56HHkhR8tjoVg9enou5XB+EcQgg5lErIoRpAxgwn1CSAjKEyMpoQssHC4+ixWdSPpwghaYSORgkpywluCHkWndadQpNVJ6h8pAKSSsjiUn5xCEWVIvIIin9xGKEVOiN3NJV3VED6GRWkgEh1HhgAqc+J9BBSK4lyxFRGWNEG2LTjiJoo/Po3Ho+Zuc7K9aRmk254lGpIP4EWNgipFJGWQjI7SkitKCIEIJQUAJArqiK6f/qFBcCyfw3MzHH9XfeRQZd8OBURj9dDjhhR0AkcMvAobWmDSGo/Cz6mgZB5qMTLGVUWQQWrYu2m3XpcK5WMXG4z3w8G+kyctoRKyGqEPlWQWykgq1mlVkTeSQmZFkL6xVfEIwSuxansO3/hz4OQcnzXbxBAtB+E+4Je19cRpZg2ENKUWVBCKghcgWCsHEFZGTifrImUkxfu6toib16/cTce4YODnOxbDRtt8NFAXvF8yBBE2saNgnZmneCNSsjHOO4iC9fEhm37bGMl8+MkK2Mq+/vqh7LnL32PN1r0xv0hpa1jteCv3OfcBkDK9cgDHtMsy0MUtsOjrjIIzF8FSZv2qnbITl3ljSv3nUVY51UI7yygkRDSgo9OQkZnIsGj3bp8Y8FIU2owqUCkgEfCPYGPTi5H0kK4/sH8ZFU/z71T1s7rjI7r+s1fUGv8VoQlrCRUFBApJvW31I8sveCje11D1GgemzGPEnINYqmEFAgZ22M91ZBJCkRGdd+EQbwH+PkXoYB/xkM/ddspzceXJpHnr1xHyX4bkOedxXzwvhThShG5RIFIO4x0KyEViCR8FABpmYKQhI/OlgsRSRNVZJ6GM9GOD4mv/HRT9Zm0/RfbTiOsexIcfTcjuu8mpYhUqkgux9LilG3UQFKWBUz2tdYJJmWfaCojI3pvxLTdF9UR/Dmq0r/aNcJXn4zObd8237gwY8AHIbNwA2wazVf6TqB/6xgwk8BRUxbj4YjSCKDLacYQMiN3bJtLdl6CAQEzrgoIL9cF+enWmnfKARQghMxHCKkUkeOpiBR1JF2z8005hHwEkflnHkVB/j2SqrcwKiDD6kxCqCghFYichLB6AiInIZjqunELd+LYqXPYnwZAahXkObcS8hABpIKTVvnDlWvqRvDv1sdXrv5MV2qqG6ls1IrHjACkbDNqSO2CfYLvEfe/9p/MwGOF3iV0FNAo8LGD5YItrtgGRHamGzYBZMm+cFYeBkfFoXTFFiOMJIR0lBuMyMrD8WSHeXi932qlbIxifzjpfu00ENIq7RBS4KNDIGTNMQivORqRtUajyIfzEddsFlxvTYfr7RkEkdoiuR5JJaTbLbvRdPjXnYriCUvRc2kKei9LwadrjqPsF/sQOXg7Yg2EVPBxD6HkbjgH7UYJqm4TN55C4oZUpYLsJCBSQUgBkdoUhKQKMmHtGXRem4rycw8TlO9HcXHHFghJBeTjHJuPT6dK93NOGArXJ+yqShdKccMWMwphO4DUy+khJCfxVBA/QBfYhi0Hsk8sF7F/7G8Up3uWS/bQCfPxWFQZ1XYaQnpgpHHTvi2EVKDFAmAygXcbJ/eEmgI3RREpEDKUCtXla3ZaE7A/Y8L51/79lIbZf/A4worVIuQTNZaBkBkp22zwRCkmbwEhBag4S8NRtDa2UfkqL319NWVm20S9FY0/+BT3hxOqUQWZEYQUVaQ3iLRDO8+yBmQVuW8lPEoI+fgrTXGWD27k9cfDfw219uw7iuACVHnKmM0QQGZRCalcsbU7fA5XKRR++U1c+/lGNtuf/WSdsyvXbsfD0eUIDOV84/mqYLAFIu0QMkMQaRs3NlAnCkJxF88dT2gdUx69Bs7UfaGAdWbHyB+zn1y7ZAx/OXsl3cfLs74CxHlc4oLN49Cu8LLsbbcEj3YoyXNOXLEfjiiJp0o1x9nzP6h2yO49ybxdZ6lYXA2HKCETCRAF5LEU+CgQ0plI4JiRKSBpg5ECIJVpCOmge3QIYV/vlcds9TNALbv9wPeLqpIeAAt2pcKv7QpLrWmDkFL/NNDRAyTTQ0gFI1lvcckWCClqSIGQsQIhewmM3AhHr80YsvEsFZ08D/8U7wPTblIKiPwNyad/xBPsl9zvLER4q6WIoArSQdMQcjFVkdo0bNTKRwMgowgfxVwKQhJEvkcI+d4CRBNGPlZ/Gvp+tUt5Wsj3/MJDbjtnPwK7iiJyM6IUjKR7NuGiAEY3iFSqSA0hYwkhY7key32lDGc7Vhq/C+ev+lSQ2T1Pfe/L7jXD976/69jxQch/7ATPd1L+XU/Kv3K9RbUkjznPnP0eEUVqIRcnHgJb/DJQQUqcSAUaVRwrHQdP4kKK5SGEzC3bOXnxz18bcd0XoQABY36CIYkNKRAy33gqIcd9h3xjGRtSgCShT94vk1Fo2lHkG7CVsQAZE7K2AEgPhBSX7PD6UxFAN+CiTadi5fYjjHt4nu7Wt1BCEjwKhDx0XINIpZqkOvLvAiJ5t6rctC7/eE27VosCkq7YHtVjRiBSQ8ijp+iCTQB56fJlJHw6CznzN4ffswl0w6b7NQGkOw6kwEiqIUOogAwp0QmhL3eHq/JQqiCHWxCSMJIQMpwwMqL8IEJlWrVhKDdwPZ5qOw+RdLkWNaSrzjiCyHFUQ4qJElJUkFoJaVSQDkLIiOojEVV/HIq2X4zot75ENIFj1NsEkQIjBUBaJhAynCrJMEJIP6piy366Hr1XnUCv5TROip4dv4cQcgfiCSHjRQlJ9WMMAWTUELpkUwX59qLj6L7hJDoxfqQAyFtByARCyESqIFutPo4nRPlIV+xihJCPUwEpcSGLTU2mCpLxJ5uOQm5CLglF4KfgowUhVWiCW0NId3w6Ttxz0a3xUaqLZi3YaJvU/bOv5XKgx3gOxjxZlxN5mbwz1p8CWuIGzEn9nZSQCkAaWJYWRPL9CkJqECnXnkccFfDU6y2x6dtD/5o2zuxvioHC85ZsRC66ryslapYgpO4zjyu29Ico5SrgoYhSKPpKM3y3Py2wyPz4lh8fOZaaTXvivrCyNghZ3UsJmTUISeAjENJVDvHPNMDhIyfVuMiuq3Jm2zr9fhpCtkgYigdDS8OPIDIP65UxiPSAVC93bKU6NIDPAmEWhPSLL89jLIkXyr+HGzd+Ue0orCN9PW7fHzJGxIaNm0v3+pKqfrmVC7YVE9INIAVICpykpVVDWrBOAzsPpBNAp1z5qUx9gFC4VM32+Pn6zSzXMavHlPX9pa9+Q0rqGTxTtgXuY3/J/YyK4+iGkKYfMl96rnsMEcDrmri6v9myv9xyqe/Laj3ZcLjJWNeDliXj4Y9WwtlJYCMBogUgFYSkO7WTcR3FXMYyApKilhQAKepJlpEsHVRCRtBGbziha8jv02Mq6+PKc2z6vfKBp3/4GcX6r0dQR7pli4JT6m0BSANRo1gvL2O9ZD1ajMteJhCSKk4FIZUaMolu2UmEkBtYboSz+2ZM+vaMOhY5EE+d/pxlqcjGg+eRr/USKiIXwkFFpIGQkRaAVCBS3K7dpsGj6z2WYgZCtqAassV8uGjRLRYgsOF0TFitfwPley5eu4EGU3YjiO3iEmUjTUNIwkYBjlzXikiPEjLG2u7qs0HFlpxJ2C2vP7vdfN//54xXX7v72j2rY8AHIf8CPzRZ7TTf/r4T/c8cA7/ysalM0D5IHIIHGLsukBBRIKQ2o4AUAGmDkJyYSCIBAyFV7Cq6ZEv8Oz+qCIJLdkDBcXsJGhn/cfxBFScyHwFk3jF7kXf0HsSLyd8FUnKfgpMOISphBYLr0SVbICQhlyggBUKKGjKiwRT4Vx+Hl5kcZcfhUzjKIPoHCToOMQakiQWplmUbAaQ2k6hGktqcxeUff5K7qb/sDZXU7Rf2xfkffsRRUT8KfDxtoKMGjRnCSIkXyf1TGQPyh8tXMHTyKiogW8LvuY4qDmRgifYEkFbyGZWMRielCXq2A8Je7gFnBaodKwp4pAKyvIBHXaplumULjAwtNwDxTSahzvhvUbz1HAUdnQSOCkTS/drFZWftCQpQCoiM4LaIWmOUGjK8ynDkb/YlSg/fiqLt5iOSfRlNCBn19jQ3iBRVpFZDTkdIgy8ZH/JLtPhyL7ovP4a+q46jyzK67o/aybiPOxA3RNyxmZRmCEEkzTFwF8pMO4RuBJCd151AZwUhT1L9KEpIY5YSkgCyIwFkIvetRBVkIY6/YoSQRSeLS/ZBKiIP4kmC8ccHb4D/U+/AX8Vw47mQWQhpJuzWJP4hRzk8UbIlTp+7LLfyf9mxd++uPx41ZOuuo5mQR6AG4YvAR2N0TxeopWEkYWPaBDWcrMuEXasfTcn93dtk2fo8KpQk+cNDYaUZh7IRFq/4Vk2afuVE3Sib7t2x/fH9Z44huxNBeb+8Zi74hq67dMUmPDJKSAWa0sIkS70lcfA8AMUsW0CYnyMQ8oHQ11C2Tiec4LVHXrx8WZb5djLvq96kh4aQKiGNwDrthu0p76yEFPiv3P9Zd1Gu5WSM4kDGmdywVbsAa3dCqWPm65f9fXW7f72Y1xHWSx7uCbzzxH283fHIfto07DPQy0BIAfTl+XCkIhOnvIo3mvdU7W/GSlbrLO8T6zv4SwUhJdSE+l5V59uASDuMlGWBdareUmoQqVWCut45JZEO67z0G51ERxSYWa3r77G/Pv5fmLzpOhp90A//G/IqcufTAFLq730spi9MKcdmlu2lBrX6HOJ5I/Eled4E5auC6XPX3lV/CcTtPOc7/Lf1CkR1Wk0Q6Q0dFZgUOKmMsI+KSTeMtKCkApQKTAqE/EYBSIGQ4YSC0b3WYcn+c6qOur2zfl5795Pn/Td5nzlm40nkarsKjkQNIZ0sFYAU13IBo4SoytLCSNY3yjI7iFTJaVSCGh0b0rhmiyoyukcSonpuwudrUvGLioH+R5z7t/8Oadj1+8/Su2QZAt5ZpCCko4XAyMWEijSCRqcyqiJF+ehe1+pHUUBqWwAn4WNki7lwvjtPWVCzORi1Wj8Uku85QxfwSmO+RWj3DVQ3UgnZZyONakdlBJFcNzAynorJOLV9A5w91iBh4SFcZ1Id7768/bH59vW1j28M/LvHgA9C/iE3mP/uQea7yPzD+l/UkHxt3bGfCR/kRlqUXwIhNXj0TkojCjADID2lmnwol2xOBKl0CuB74xK+Rr5ZxwggD6IAVZD5RQE5ejfiR+xSFsfMw6KMlHiR+cU9mwq3sPfmuAGkTk5DF21CyHABkfWmIKjmOHSevBnHz1/EgRNnvCBkMhWPOjak5Y5trYtr9gG6cCenXsBVSWLxV71GsB/Of08AqRLMGOjoKY/ZsmJ7YKRky+Y+dFO/yBiQ0xcxmDizX+d5RtSPnRDwfAcFIiUOZOAL7dVyqNrWATFVByKizAClgIy0YkBKHEjlhk3wGClQkiYxIh3lBzM+4gCUYHKa2pN2oFi7uUoB6SRsdNLtWiCkKCQlMY2CkOKKLVZjDNWSY5jFcRFKDVmHyqO3IG9LAY5fIKqJUUQyRqRKVCMu2TMQyAzpz3Zegs6Lk9Ft2VFCyBS0XpiMvMN2IIZKSIGQsVQ/xg3eiZhBu5CfWbE/oGKyO92wOzF2ZCKTzRg1pIGQ4obdcR1jQtINuwshZctvjuMZhgwoOonw0QYhixFCPkUoHtN8HHI4KyJQKYItEE8QqWAkx7Y9JqRWB2uXSrcKknAnF+2hyAp4P3GsDDnav+GGXo5TX0+27UjmBJ7AhO2g4qXxuiDgUeCiW1nHdfeytd0bNur90wNJs12uV+J+SxAZXgZxxeti9RoLcvyd25vXAtOON2/cwORZqwn7zqvrdFZ+fwWwyKvHp5MgiVpyExJJe+eiYl0gpPSNXdWmk3CIes2AR3spfSXQmK7AhGD3h7yMus364dzFK/yG7P0mSt1ktNRo2h33MRNxLsLH3G4QKQBMw0hvV2wBeHbloG1ZjTUBeIwXSuiTk/Bn0cqt8jW6PdV5mL26ZrbddZv/xodCF/Bc2Q/xMK8jEpbBXBt03e8GQurs5AIhHwh+GV37TVDHJ+A9s3W07yf1vcEx1qBFH0LNMurapusq7Z8xhFQPHRVw9ABTA04VtGP7S6mSuQikk3iKeSvx819HszafMV7xj9Ih2aqvve73YvnXX5nAhK9xUxczjmhJ5CTAziXnSTq4yGNQ26RMa3Idspt1Xsl5ph6eVMAjDF/wSuVW+P7yNTn0bB27vPGHq9fRcNy3eLj1SkRTUegUs0FHpwKTBI8slSkI6Q0i3SpJQj1x3Y4UEEnoF0YIGddzHdYkp73WZK++un9UV6tjlnY+cuEqXh28GQHtqb4keBTTSk5CSAMg5XjUskfNKQAy2kBIWWadPW7ZjAspIJLu5GIqWQ2PQ1y0o5g9XDJyd+Y9xM+EavLyDs1wN8eW1TEs305vF9rMjccQ+s5shFLRGPEu40S2IJBURoWjF3i04CP3c4opCKkBpPNdQsh35/N9GkKGMFFNgfZLsHSvVjDKt207cQWFPxH3dA0cYxnnUcFHAZDKBEoSQPZmApvemwkgk/DCoI04dokP7fm6F+eY7zOyOk58+/vGzN9zDPgg5F/kxsZ3Av09T6B/bb9xInL58lVUa9SFakhORArUckNIo4DUsSIJHjOAkP6SmIaTDrEALvvR9SqsPGNDfkm4SMBYUCDkaALHkRaEHEY1m2Q3JoiMH7sX8ZJRm/EjY/pvRAgBVVidCQijGjKUmZjDWSoIyTKs1ngUevtLzNlwEKnnzlMNSbioMmIzK7ZAR6WMNEpIq7TUkfvV388zm+7P6q74r9TXMhG8dOWqUkAeE/WjccFWakgNIgVCqr8pGCnbLJUk3dPPXfoeX6/cDsdrnZHzyTYIfrEzAkvQFVvgI1WQgXTBDnzRcsku0RbPNBmF2LqjEVZOAKNRPgqAtJbpjh1pliVOZMXBjA85AM7qQ1Fx5EbUmLwTeVswo3UNxnusOZYxHyUGJAEkLYIZsR208BqjmJRmJJ7vsgSv9lmJ+Heno9LwzSj3+TdUOk5lXEgqIZUaUiCkuGXPQPibOk7k25N2odvSo+iy5AhjQh5Bw1n7ET2IrtgKQmoFZDwhZPSAXajIJEjihp2YJACSJU3UkKJ4VEY1ZAKXEwghO62lmzb3rTjvCIqICpJu2OKOrZWQzIjNsVp8yDbkfvodumILTJfkTN5qYL3uccf2QEhrwi4qSNqjURUQ/XQjrN2SrG7mf2Ef/5XG3O9TF8+kRZIqVW7YWamrBSJJLEhvCMlJuygib2tGFWlXRKZ5j0z++Rn+BAOP0kU4tkgNzFuwXrW1mkT9jdpdrgMaYkk7/opvkraj2hudEfdEI+xjXEd1PFm6x9GT7vY9RxOIM+YiwwOIOksAeZaUkGxbDYs9EPK+4JfQquMw/Mh+1oDd0/eZHVvqePhfjSYCIVm/+BpuCKljQxL8c+xkbDb4aIeSFvT2V9CrFPoNnAZR+7N2rGfW65jZY/Hsp9u8RafheMBRXoFVDfM01LslQFXH4A31vJWQArlk7FdgP1IJma8S7g98AZ8PnSXNmG3lr4y364SQ5d/ohAc5RuT6dvv6etfRAx/TbhcQqbdplSTrTgVtLnpKzJizWtXZ02Z/3v2iVGQ5H1y4GI7m0Sj2F+9vBNZn2Pbp4KMck5gdQJplfoa6thEaqxilr+OTITPUcUubZ+fYZQCfpUtzmYEbkePD5fQesSCkBSNdtlKW1bqBkVapICXBpFOMME/KSJaRVEmGcp8iTEgi2bf1+WLOmbs5b+S96rDVMQsAHMvf6kc+YozphLWMa7mO3001pMBIUXW6gapRc+oyivWMYh3FBEYqc7tnS/ZsbQpCCoxUCWvWIm+PtYjneiQ/u9u8g7jw43VVGY8SV9cvO/2R9fd42uIGr0nvjduE3I1mIKT5QoQ1X4CwdxkrkqBRYGSkMnG5tuCjKi34SAWkqCAVhGw+nyWt+Ty43p2L4CZz8EL31Ugh7DWvRd+dh4sK18geVEIKhKSJIlIrI63lXlu4vo0u+hth3LCzO06z3i5/3vnvq6uv7X1j4N6NAR+E5A+cb0D52sA3BrIyBvQNptywTPtqJV0omVAiHxPUiPKLExIvCKkmhHryp92xLTWkgpBVFIAUSBnAm/nAgnUY63ED4z4yNqRAxtF0xXZDSAIlgshYgZEEkXGikpS4keMOwNFpOULrT0QEM2OH0T07XOJC0iIIJCMJJ4OqTcRrjE24KzmVKkDCx1SawEfLDrrdsUURaTdRRJ7F4dTz+Pln3oj+Ra4Vv1D1dIEAWBSQGj5a6kcLQB4ziWcMdJTSgEoCyAs/XMGijfvhKNUROZ9qyyzYiRpACnykiRrSXyAkXbH9nmuP19pNRe2ByxBSUWJADncrHwVGRhI+SjxIMeWiLW7aykQRSRDJGJH5mk5B5VFbUH5IElxvsF+qM+4jFY9i4VwOYynmYhzI5zrMxWs9liD2DULlKiNQ6N0ZqDV6Kx5vQ5fuRl8QQho1pCSnmcF+n4bSfddSBXkEXQghu9N6Lk1GmQk7ETXoW+RVrtgcL3TDjhm0E4WH78WHq6mCpItXImFjFwGQNFFCdmQpEDKBpUDIDmtPo3MSM2Jz/ycsFWRRZmovokDkQRShKvIpxoJ0NhlL1Up5ZoqvaQFIAY4aRGoQrwGkWTZwXsV6I0gwyrKHnRXQqPUgpbr4d93M89Sy1NULlm5UcdByEXzlFjdstxJSK+xuDyAFuBizw0j7svV3QgCVMZuqo8cIOXLT3k8YhgvndQII1ugvfF+ggYSZMP549Sds3r4P1d/qxIc6jCNHNW3E429g34Gjapdfs6Lw5HGTTqHCG13xIBV5uSXxC9VZBkLKsrcaUgOUdErINBAyd0w5Znt+CX0GSWZyuZRq8JbV3105IHm/QMgHIgiA4gghqcQ3CkgpswQgBeRZEDIgX2U8zIdhlet3QarbZVzGgXzn7zMeZJxJSI1Rk+czuUk55BDoywcZBurpY7kFPFUQUv7mgXkZgjBRoyp37Ao8vtewbNU2PS4s9Wx2ju3i+UuIe6EJM2Pz+8Udm7/zxtJDU0/97HW93bIch/xdHlY+4iiFx19lLNED2YHq967fpK/kNW/JBrgK11KQ/jE+PFIhCzKEigIb72QGQEopEJLXKoJXccWOKl4LR1Psbs5ZPxap7zHCpSf7roNfG7pjd2BcyIRVSg1poKOLYNK9LCAyDYSUdaOW1LEjCSEJ+ByEe0H8vBKDtuHsVWZadp8javEuzhnzflZeTj6+Dp67hgKMO5i77TcaRAqAZJIdgZDajdwCjxaQjGLpBpACITMCkQpCSrIaKiLFlIu2xIskiKTlY/Ia+fy6E3ZjW+oVxta0Hkyo88bUMet9kpXzTY5dNYFuBvxMz5w3h6xHroZfE0TOp80jiFxAZeQCOAgkI5XSUdSOaY1hbQgelfF9kcq0GtJJVWTQO/PQbMxWnPreqBmBGTvOILo3QSQVkQIiBUJGUwkZLcu9NiGqz1aEMZFNm3lHcZ1tIw9usnJsvn1/37Hja19f+/4dxoAPQrp/OH0D9u8wYH11/CuMU7kx0ndFR5nwpUT5loQwTMiRr5ZyI/OCLTYIKZMTD4jUCWrEnVviRAbyZt4/sjSimo5mXMgjyCsQchQh5AgqIamAjB+6gy6139LoYsvlONlOEBk3/gDiCCZDW3yN8DoCIqd4IKSASEJIsYCq49F+LF1GGAfxyEmbWzbVjp5s2QZA6m0qYzah5AFa8skLVET+uSBS7kYFTl2ke9YRTpKP2SGkAZAsj7nNUkgSQMq2FALIH65cwTc7DiG2Qjc8+kRrBL6USOgo8FFcscUSEPBCAvwFQD7TDs+1GIM283ei6scLEFppJCIIG5X7Nd2wFYS0oKNOUkMAqZLVcB/ZT9yyKw6Co/oIFG0zG9XH78AznZYiRMBjdaoea4+Gs/5YxL89Gc989DXK9FqKEu1nEU4yyU21kXBUHYHgSsOUq3XJj9cyzudURBE8ut6ahiiqIMMaTENss6/wwcz96Eo37ESqIHssOYrWVC88PpRZsamCzEf4KElpJDlNHF2xK09PRk8qG7sknURXgkeBkB4lpAaRAiE7UAHZkdaO+5Sec5jAcZ9SQBaZvB+FCSFFFVl06mEUH7oZOYo3VmoxlQ1bwUdv1aPX+SAxUAnd3QCS54SexFZBENXES9fukXlHtlVKf+froxz3+UuXUa1xV/xv0KtqUq7VkB4XXw9kNLDxVqUdPHovKxdhC1bKsmShzc0s0P/j/xrK1+yANUk78ZM8dLBeWYJ4v9P9hIHSpk5Snj57EfNXbEAduib7xZfDf0NfpSqLkLBgLQTzgY6ASXmZ92ZmbMg15pebN/BK3c540EU3U4EsooQU+GhMYInbLAgp0NhuhDJ2JaRAyAdYv0GjZstX0LI3YTXHU5Vj5IFwiTVZ0w0hTZZsA8Ok9ADJ24E8AV78HWJ4EIFGAXyYtnD5Zqvt5PdW/95lpv0yv4+GsDdv3sTwifOZMKYScjCebB4DIOOMClKO4XZ1l79pYOdJAGMHW3J+GAhZkRnKS2KrGhf6tyQ7xyYNc5K/oSFPNWYGb7meeQCkbns+WPGqc9YhpAHDoogMyM8wFYy7WKFuAlJParffrIzpzPfJre+tOALUeFi7aQ8cPL8eUJnZGbuT54Ea9+p8sLe7Hkt3hpACKc37+FkMByD9+ABDF8hDEXndzbFKvXcc+x7ODqsQ2o5KSEJDBSEFRNJcaa0jtymzYKQFJT0Q0gKQnRijkXAysMMKlBm5Az/+TBd1DqZ70dZ6TKqPU59n2r7d7EPI9dEqhHRYSxBJ12yBkB2pzKS53Cb1FiApKkiaKjWEVFBSKSLTJ6uRrNli0ZZJ8pq4bmuoilyHCALPgoyPOJihW1KpKjUvfayeet6bY0/bhvrzreHHr/5NJWpqMDgJOd+ciWCCxdBm8xDO0tFcQCThI0s3hJTl5nYAyUSBBJdexvdGUSUZ+NbXeHfsFlyylJ+/cMiP3ZTK7OcaREYRQEYRQEYRQEbTDTu4C7Nhj92Ds1ckZBGv59lU6/4+7Za2HX3rvnb2jYG/4hjwQch79sPpG+B/xQHuq9PvMS6tGyPeEokqb9CY2bg/oizyMC6kimUlkxIFW8wk0HsSpUAkJ8sBooBUJSEk9w+ILofwZ99BQQKkfFSc5Ru1xw0h4wyEHLSdcf5oVLnFEkTGMXGNwMiovkkIbTiVwFHHg1RKSFkmmBT37NBaExBZ7wtMWLoXJ8/R7dooIS0I6VFA2gAk3bLN9v0WiLx67c8BkXLzKZMRUUAeYaw3DSAFRNqho14WdaSoITV4NCWzYDMG5MqtB1CwWk88ULgF1Y4dFWz0V+pHAsgS1vqLnZCHCsj4Gh/jw5nb0WRyEqr3W4SwSiMIFulqrWI/DlExIEX9KABSQ0itlFTLAiMJECMqcb8aIxDdaBJe6rsa5UZsQUEmC3omcSHKDFqDqiPWoe7IdajQdwkKNmFyoSqDuf8oumuPJrwcifCqwxDXdBrdyfjkna7YkQ11chonXZJC3/wC5T9bpxSQooRUasglyag4ke7Xn2+nCpIxRBkLUsrYwbvw1Jj9aMtYkD0YC1LiPHYlbLRDyE5cFzWkgpBrBE6motGyY3hi6j5Cx30ozDFZiBCyECGkJKgpPj2FKshRyo1aALxJzJQeOuqJut7Oc8GCkDJRVzH3uC6ZectSfcaktZx4ZQ/Q/BOudTLBW7B8C+OsMTEDM41rsCWuvVlVQmr4ouNFekNIE0NSPlNBTYInSUwSKJP/oNcJg2uiXbcR+Hb3IZ5zOv6b1OsPn2SpSZ1W38j3y+vnGzexc+9hjJ66CBXqtefYK4P/BL1MSCgPgSShCYFhPg3Bl1ixDbMCMeQ7TqScREEqzx5mlnYNH9NASEsNqdSPFkAx/eNd6piQuRgT8rGosniUirZ5S5LkK7INVtSbeS38qNtI9eArV7QAMK2EzAhCGihmB3negMz8NnlA5H/DS6F2k974XuIQ8rv0eSXnpVm+21IDSImrOHDkTCp/y1NVRzUuAaQ6Bi8AmUUIyTGcTg0p6joqIWXchxSojP0HUlQzZjf7t7x527bvOM7qsL7ertimvb3bOBsQksdh4KpkLg/MX42QvSTqN+2FE6lGHfhHXCd1X8kxLyCYLvrC27ifnh+55NrNsa8U23cCkG51tgDHjMxASF7j+HdRQQYXqII9+45zzGX/XDHq8nWHLiK0PaFh2+VwtV9BIEkQqYwg0ixbMNIOKJ0WjJRSx5HUishIBSBXIoKlP8Fmoy++k+aRE+QeniPq49TxSxvIS2JDvshYhbnaMTyLuGUrEGkgZBo1p03RqUCkgZJuRSSBoz17tkBIumobEGmgZBy35xUgSVVkKBPiVBm3B/N2ncc1Jvsxr3t3XbhV+8lVyHP9ke+9zDiflft9gwcbfI1QQsQwgsYImkBIhyoFShrFoynTwEcFI/XfXASZMYwd6dfoK3SfsYv3IbrRr934Fe/yIW9w13VwUAkpAFLiQDq6r0eJz7dge4rlhu8DkPdw7N9qHPi2//7nmq+N/+g29kHIe/rD6RvAf/QA9n3fnzXm9E2R3BAdTD6J6Kca0J2MN9gykXIrI2SCJwDGTPQ0gFExIrlNuWGzVCCSE+hAWoCzLJVuI1Bwgk5Kk09A4zBxp6UScvC3iBmwDdGfb0X0Z7SB2xA7nMlGRokqcg/jFS1HiMSEJHwMEwBZW2JCTkColISR/lXHIYbu2jNX70XqWQGMOj6kAY1a+SgQ0gMfzfIhAklRRB48cR4Su05uC/+osSdtfJ2KmdMXLjPL93kmldFgMSMAmXabApKElsoFO+k7BL3cEfcXeR9+jP/oV6KDyojtX4JunFRB+isI2Rm5nmMSmmp90WLKJmY83EeF4hLU6U93bFE3WkrHSMLISEJGJy2yMiGkshEsxTSUlDKiCqEllY1xb01CvvdnofTIDag8hnEeB67D672X4PmEOSj63jTGhaTyscZIRNUew5iRo7hM4Ek1ZHjVkXC+MRFVR3+LZ7stRWiDL1RSmgiWL/VcifaLjqAj1Y8dFx9Fp0XJaDLrO+QXQC3xIEUBOYxZsZkZO9+wvWi8MAX9Np9ENwtAKgjJ5URJTkPrROjYkdZBQOTaE2i/7jhemnkIhQkgi1IJWciCkAUZE7Lwl0dQ4PP1yFmsISf3VP64EzMZ4KjHugGO6cp47YatlDRUXj1KJd6i1bukq+memb2EEX/UePw9v0dmW3J+tU4czkQmryugIoo6pRZS0FDAoQUP3SX/bp/oey1rAKnVjwI1tXnvbz5PYnpWJjCrQNfh1xFesAbebN4Hcxatw9Wr11TfqP94zyBgz9jdtof5HF3qLN162qm/UsDjll0HMWDsbFRpkMh6VaUrckmGwSiljseP100/PswRWKMgB5dzMT7plJnL1QfI52amjrKfvPZ+dxgxvJ4/4qqoIIuAFi8lpFsRKdBEAxRv+KiBsVFCCvx6lG7OgQSk66kkk1dm65Su3pbb/oy5q5mJnupBHmcuQjuBd5mBkALH7OaBkx7oJcr8hxwV0XuQjp2o4HMm2zBdfW33l7p/dRunMDZxg3d6479hhLM8htysV265jsRZxnVdt8xASLMvAaRASGNGYcf296OL78P0NHiqzDv4/sqP2W5/M0YWLd/IxEUEm1R+q4RFbH8NIKXUbexpW6mfp32ztqzvE/x4Xsr9wiP8zqdeexfzFmuYLeeJadfbtX2W/ybngkW/jqScwrsJgxmfVrKLl1bHp65Jcv0xbZyutM5FgY7269GtICQ/S51DPMb/UAWZ2G8yj8uoVbN3r2HOsanrU5D7/WVwtl9uGUGkwMj2hJHGCCNddkvgujKtmHTDSQLJyI4rGZdxJcIJIf3aLUPv5TrsQ5bb2HZu3P690hUaii3bdx6hbVcjtAOVkB0IIAkinRLn0riUm1IgJE0ApNvVXJYtZaRx1XZnz1ZAkopJlbzmG8RQMamgJLfHEk7GMUZkPEFcBNWXDsajrDdxD6ZvP4VzV7T7slzTZLzosZi9/rK3gRnT6nO9/tOfLZtOXbyGCn1W46G6jI1NJWNEc+2WLaUCkc01iHQvEzRGpjXuI0pJ5zvMmN1sLmIEaFIRmTh9hxtEXrh2E01nfIdQZg2P6rsVkd03omCvDdhw+HtVM3u9fct33/e+NvS14b9pDPggZKZ/CH0nxr/pxPAd653Gu74xFNXWzZu/oN67/XA/JwiijMjNG2mjiNDwxQKR3C7rbghJxU6AgEduU0a1QyBVAEFPNUX+zzYinirHvMoVm660dK2NFRXk54SQn25B9MebEfUx3UIGbKUikiByDGETE4SEv/e1SkajAGRtxhWsSQgpVosgsvZ45KwwGkUbT8XG747i2Cm6ZYsSUikeDXw0paglNYw8RPBoTPY9TNfsa3+gIvJnAsgT57+nGzkBpJfykUpIyy37KEtvu6jXT57DaWYG3/DdcRSuwT4q1FIDSIJGv2cl5mMnBSL9CCADuJznmfYIer0b6gxYxizTR9F53l60/XI7avZkAPMydK9WqkeBjwIhh8JpACTjNxoY6eSyU2BkFaohq9BFu+Yw5G/5BSHkDBRlzMdibXnDW288nDVGI5oJaaLqjoOL8DGqzlhmzqYKkjAyki7cDnHZFgjJfapSQfnWzN28Sf6KyYe+wHMJi/HR/GR0ZgzIjouOIUHByGSUGrMDzs8kIc1OC0IyFiTVkC9PPoSeG0+h18ZUdCd4VCBSYCRNqSEtCClqyIS1BJNJx9FoxTHCx/3Mhk0ISRApELKgGDNiF6ErduibAwkPqaIjeE8XC9Ua6x74aM4BC1LKpJ0TVz+eAw8R0LxYrS2uUN3gu+7oyeZuqrWiijHxA2NtaugoE34CFjPxt5eyrCzNhF9N/jMDIW3vIyQQoCex6ESd+kBYaYQWqIbSdTpgwKivkHw41Q0nZAZmJouimJRswxIXy7PNclETgGWZ+jv3E9Cs3mNtV7M5239Xrv2E1Zv2ov+wr1CpcXfEP92AIJDZjak4f5TxK8VN1V8pHu2Ah+3A7Xmk7lTWfTZ8pvpEqU9mxpXsJy9RKwblJxinElUpvdi2t4KQXhCG+7lhJMe2G0KyTR8hAIssXBO7ed2VV2brlLbeAmbkNXnGUiaCqoAc0aybQEjLPCDMDsU0yDNwzF56QJlAMg3z/PMR4vJYHIVrY9KMVer70tZD1rU8iX++wz2kHg+iqNV1X5W0C69U+oCQvTSvH/wufm8uumILhFTJf7huPw5Tr8yVNggpMFLgmEDI+Ar4b0QplCj7Hn64fPcQctCor1VmbD8+fBGAaq+vaV/v+mYWQuo+0KDSLPOegd+hktmxbx7mOeAqWgujJy5gjLzrqn/0uaQBfkZ9pftL+sxzXyPL9nXVT1ZcO/nQX3+5iUmzvsHT5d/HfyMFFvNaIg9YlfJR2tYY2zgdhJRtFoi8A4SUc0auXxKW40F+j/PJN7HnwAk1XrJ7nsjxquNhOWLVEeRqtRQuqhadYgpAyjJBpDG1zcBJlnSz1mapJhNY0iKpmBRzdFyBMAK9PB8txSS67Kr2cl9npFk97Xz3y6qb1GfK6f/GxN0IYpIdBR87aACpIKQASLuJklMUnhaQNLEudcIay11bXLYtdaTJpu1OYiMgUty3CSYlZmScsnWIYkbwIKoiY3smKVf0RD783JpyifXT10/VGNJ7XNfnvvSFB1DqZbPNbJd9+fBRXYN5kOr1GxWX17Hp6AUM/eYIFae7sWj/eV5F+HcZu3xtTT6Hp9stRp7Gc5QSUoHIZoSQzQgg3TbPWpZSbK4q7UDSye2R3C4g0sX3RTabg17z9zMrt37tZ0zOEoO3Iaj7BuRjO4xcd8Kqwr3sZ99n3f254mtDXxv+vcaAD0Le0x/Lv1fn+05WX3/dizEgtymzF29EaKHanBTKJEgmJdo8ENITJ09BSMJHcR9UENJWyuQ3gBOmmMbDUGD8fuQdJnH9JJ4fIeQAKiGpgIz5ZAui+vOpLLMyRtNiBlEVyf1iRu2Ci4G0Q6mci6g5TsHIUJZiIVJWH8tYhGOQp+xgvNF7EU6cPc8ENWdwgGBRA0cmq1EqSA0iZZs2C0IyQU0yTdSQEpPx2s8SC+f3HUM/X79B1eYlywXbKCB1PEhxyZbkNAIivQGkXj9Ct7VTZ85j37GzKP0uM68WoAu2KCCfbc94j1oFmYcwMs9zBJDPdkSep9oi96vd8VT72UhceAD9VxxGz0UHMGDVYdT/bCmCygyEk3EaIysLfKQRMDrpLu2sOlybgEgBkAIOZT+1fRii649C8U5zUbzzAhR4/ytENZqCSALhKELivExUE88kNAIhXQSQTioixX3bWYNqSrpjO/hZjtrjUHboJioTU1FuwHrENp+N96YfROLy45YK8hg6Uw3Z9Ov9KEClbMwAgdZUz1IJGUclZH4mo3l3uaggU9GVWTa9ICSho3bLTmWCGjFJVpOK9muP4dVZhxR8FAhZmKYA5ES6YzNmaXy/1chZvCHhASeQ6SAkJ8/pIKS1jeeFmpxT8SQuwKJiuy/wRYz5chnPIsbjc0/kft9xdS/O+3v/GXI66cmZzLESeo9Sbrx+bCtxU8xDBZ4Ct5zw+1mmIYuexHspjuwTf0IYATFGBWkvZXu691nwQOIE5qG6MCdh1yMExbmjKyD2mQao2TgRIxiCYsfOg5CkMBoo6gmnmRzqqVsG/6vjk3315PMGYeTVa9ewn5ms1xBOfTriK7z5wad4tnwrXk9r8rvL4SGqwx8R12hRyVF5ptz61TiygR0FRFhfaZe8TLDC97TrMVpVILP9JBNmeY2fvkRBOKUylORABCTpIaT+Li/4YmCKuxR3bInbyGQ5dMV+4rUmOMOEJvLKbJ0y2k/ev2nrd4h5+k2qNdkubAulJBSwn6F7sGz3/CbZlzUoM+2o95HfJQGRediOjmL1GW5kno4HLF+sXnc+NzV8YHvKQOZLMvyePncJ/YbNRljhWkpRlzOmmgKocg0RCOmBWnrZG+JZ1w1z/bhN6VZCKkWknBt01c9bEf8b/CreafO5incq9cuobe+0zYyRxP4TGRexjLr2ZaSE9K67ad+MSo5XpZI0peyT0bFqkKz7hu1F5XgArwfV3+iIFSs34ccfryrgo7tHoL+tj251rEK0LFBk+knA0RV+1pLV21C2XqKCwkqpaiXdU8BVzkM3gNTXJK/zgOegXrc93LBfj9T1hdcdnhf2a4+cYw+EvYY+A2bS80H6J3t9ZPpQoNYNPiBuPXUH8rRcgqj2VENSuahApAGSGZUGSLpBpABJDSMjEzSIdCQQQhLyhRHiJR1Ne07f3flt6u8p9Wkk61xC8oVreKLnagS3kTqJGtIOHy3wKPDRDiDtCklRQypFJN9nQUitjBQguZpJbDwWw+WYRBpBpCgiY7owcY0Y3bRd3C7JeVxURxZm7Mj6Y7ZjxJqjWPrdGXx36gdcvc7259i7aY0/NcbkGNKYXBvMfj9S9Z5y8SoW7TmDroxtXYEP1guISrPtMvi9vxCvjdiKlO/FE8dqY5YLtp9E2DtzENh0PsIJICOUGQhpwKNVMgGNg6pHB8tIlhpEEj5aSkgNIZmwpukcOFvOx6fLj8hXqdfoDSko1GstJq5LUeNT+sLTR75lX1v4xoBvDGR9DPggJH8AfAPH1wa+MZDNMaBu5H/Ddd5wlavXhYoBmXSKMoU352YyQfWAf1pTKkhRQmoTV2zljk0IGcTJXzDdXAv2W8W4kIzpN/BbxAuAZJw/DSE3K/gY3SsJUT3Xw9V3A2Lomh3FuJEuJq8Jf38OFZBjEVqD8JHgURKhhFQTG4VgwjHJuhzGxCpDZ27AOWaKNrDR445th5AeFeQhC0IKiJTlQ6kXtGv273QNucbkGClnLkBgorebtQ1CZgQgqdQUt+0TBJBybI07TcTDRVuppDP+z4oCkhCSpQDI3KKIFCBZrDVyv9aLT9Nn4aneq9Fj8SF8vOwwei9ORq+F+9Fl9l4UaDgO4Uw246TCUQCkS5kFIAU4CoCsIgByJFxsZwUi6Y5doMVUPNtnGZ7rtUy5VD/Rfj4KtfwKBd6ZhiLMfh1blypIumC7ao5WKkhndQLIalRR0h1bQGR4tdF4vs83aLMiBS1n7UeD8TvRcekJJIgb9pJjyhW73eLDeHEEx8CnWxE3kFnUFYTcjejBe1FuOmHq5tOEj6noxoQ0GkKeUipI45rdhX+TLNmJdMPunpSCOvw8iQFZbLJ2xVbxIBkHspC4YlNVGVynL11BRZHGmGgKDKXJCp8RhDTng5Q8P0TZ86CjJPK+0Bgp7C+ZYgmc+vdei6yJFc8neZ0+/wOeK9WUsQQrsK3YzgpCpoU1AlnsltHEPyMAKYBM72tKOxCQZQWJBRQTKoiLrpS5uP0RqgzF/AkmnizTEu8xgUT/ITMwdMyZV4L8AABAAElEQVR8rFjzLbbtOIjd+46q2I276Nq8h8v7CBn3HzqOJSu2YtDYBRg9ZQl6DPgStd/tj2crvY/gIrUVZHwkspzKtP4YoaOCZbxuelS2kvlZLC2kkbqZdpH3VSL0K4M6dPfVE0VPu95ubBnA1O3TiQSf5ZFTwKcAMrZ7piCkG74YRaS0r7gCV6J6rRReKPcerly5qvr2dvW409/kA67z4cxL1duqeIrKFVuBagMhbx2n0A4g3b9PadpTKUz5uyRxCOX3SbJvV2vcC9t3HmL9r6ls1uog0v2nx61slmO4TqBwib8v67fsRULf8chb4m0qe5n5mO0qn5k7lp8t6kdxw1au2KYP5bfTADt7X2sQl77/7ftokCpgT8NIOTfk/KnExEsvoUPP0apekpFbTrM7tXXav5sxUrMp4wpH8LfeimNpd4XPuH7meDJTeh+P/jw5ds99hHhOSAzXx5zl2H5V8AKVpQOGf8VzLhnfX77iBq3puijNBjk+Cf9w8fvL2L5jP3oPmIqiJZurJEE5XBX4kIjnW76a6hrvBtwKQt4JRHLsWw8ztCLYc73R1xkBkDYIyQceD0aUxivVO+JwyllVy7Rtn9V1UWZfJ4RsPHYb8ry7ENEKQBoQyZJgy2NUFjJmZDpIaYCkVUYSRoo5ElbSJZqgj2BOoKBcZwSm6TGV9XF152OTz9S/j/JdS3amIrjVYoSLEtJSQ5okOybhjiTjsZv8Xf1NFJJiBJHG3ElsLEAZzVJMIGSsgEjCRuWiTSAYY1ms5aot+7j49wgC0ZD2axDKeJV5eySh2vg9qD95NxpN24dJW89AXMmXU8m4Yv8FrDxAO3gRq5MvYTQT5b331UG0mpOM6vToKdZzM1ztmYivNZMAtaHytB2PsT3LtivhR5j80ay9uPKzxKQ09wpAl5m7Gc9xNkKbLySQXEAYyRiRVDe6zcDHpgIgaSwVhBQQaZkCkVx2UQ0ZRagZSbfsqHfnYuL6Yyr2+zXe4yef+5Fu2vKwyvPdd+47s6+v9LWVbwz4xoD3GPBBSPXD6d0ovkHiaw/fGMjMGJAbQ72f3DVPn7ue2R05MZAJltyom8ldWgAp6xZ89EBITvpEgZKfkwsBkbyBd1brjUJ0tY4jWIz/jNmOP6PKja7YMZ8QQvZllj66w0T3IITstZ7KyA2IYqxI57Bv4eyXhPC3vkBY1VEKQAYLhKw6mgByJIIJykIrD0MQ4xuKgm/M3G1IpULlEEGfN4QkiEyrhBS37HQg8rxSQ8kdsmmLuy3lswRAisLxsABIlqJ6TGve6sfzCjwKfJT3pDJzbjLf9063Kcj5uADIDnS37gD/Z9vRBEK2oxs2y6cJIIu3Rq5XeyGg5VwE0r0qvv0SdPh6HwasPILeS5hNeuFB9F18EO8MW8c2YwxIAkYX287FZV1yuZqGjgIfXWxnAZAuwsqoOiPxVI9FePbjFXi251KqIReiaMJ8FGOW7Od6rUDJz9ag6AczFXx0KQUkP0dBSH6PfCZdsiOrjkHh1gvRcuFRdCB07LDkuCoTlhJAcj1x+VFUn0zVI8eFJKQRxWwc3bGjB+9BkdEH0ZbKxh50w5aM2AIdtaWBkKKCZDbsnnQz+uibY3h62n6lgiw2+TsUpUlcyMKigvziEPIN2sA2rYfHqIxTyZiUSkZgkd04kU4LIs35IKUAME48/4cqyP5DZhEMiCvhvRtDdzsG/wrvl2vKinXb4Sgk1xTCC7avtwLJgjZeENIASQFg2uzKx9sve96j3b65rkACP9OCOqqP2d+SQVkerOSgi+YDEeWYzft1/Ce0NO4nZHqQ2x5hnR5lDLkcDC/xmABNJrsJYPZzUTTeT4B5P8Hqfcyw+4CD0JGqLoEdAdY+sp+4uWr4KKVZFtBtB1F2oMM6CgSUY2adxcW/TJ2OuHEjKy7+WgnZ8MPP8J/wsnjMBiCzCiE97vEELazPw3Qzrf52N/YoSYJ7Apv98S5jo0qj7lQUllO/M/LQS9yyTZIaTynbxPTv0a1KT5xC67yV36f8NZikqBqCC9VSUCqwYD2C3b4YPGoO5i/bgo3bDuAEr8vnLl7GhUtXcOH7KzjGhGfrt+7F9Hlr0eWTKShTr6OKrSkxRnPQjV76NI8BkDEaQGoIKWPZ6kNVGogofWygnL3vzbZbl+kgZMAr6PP5NBU+RSshPb/fmTnf9W+cVueVqNZGZU83sTjtENL9u++ut6mjfbyaZVFA2lWQZrv9uM37TSkwUp9/ypOCsFhcpe8LLQM/9lnZuh3QpusIjJgwF6t4/Vi7cSd27jnMBz30bDh2iq7OKdjKpFOSaGb8tCV4t/0glKzdBo/lq8zPKKXO0YACtXkvUltBVp2x3A62rbHkBv/Wdcir/6QvzfVHA0h3eAIFHw2E5G8I13NEl+cYq4TZy7fL0GZT350KUvUnFXgXGeKj9KfrEdRyMaLa2KFjRssCIrndrpZME0cykjBSzEGVZEj71VTGbcCZH8Ql3pzLUvesjavMjD29j/5c+a5r/L3sumA/Aj5YQiBKNaIAxwTtMq5Kpdz0QEgXQaXso9y1bfEiTdIaFSvSApCyzQ0hLRCpIKSASFq03VS2bXHZXqsS3UgcyVi6K0vSm3BCz+B2KxHMzN0BHdfCj3Es/QgoA2iBYszyHdhhHeNqfoPcbVchoA0hZhvWk8cTw/dEU2EZxWUnLVJAq4BIgs48rVfisxWHFfSVtpDXTSaSeXfcdjzWkErr5osQ/g5VkQSPEcrmstTgUeCj3SJtMNIp4NEyZ9PZcL0zm/fRX1Et+TUmrE62vs/Tt/p64FnPfD+aseIrfW3mGwP/9jHgg5D3EB782weT7/j/bRdUzw2I3AvduPErXqzaFg86eYOt3OIsEMmJc1olpIGPUorixFgAIWRAgeoIpkosqFAd5OvwFeKohoz7dBuNbtcfE0IyHmR0n41wdSd87Ebrvo7La+Hqsx6OTzfCwezZzs68Sa5FNSSBmCggQ6jQC2acwmDGMAwhhAxhPMPcpT5XUG3FlsMK2h3gBNILRCoIKWpCy9wKSO2WLYpISVZz4Ph5qi+0GkBuCu/2PLjKOFcCHA+zPgIVFWy8A4SUjNkKQLLOJ04TRJ46h5Z9piNXsVYILNFeWcBzbeH/DOGjAMhn2xJAtkMeAsjcJToi5N3ZCJKJBdUQkR8uQY1hmwghjxJCHkavxYfRY95+9GWMoMrdFiKCrthRBIRRhJDaBEhq+KhLsz4UhVtNxQsfUwHJ5DZF28xGTNMpiKX6sXDH5SjefSVe+XwtXhuwDgVazoSrNoGjWwXJWJL8DhchZFilkYht+hXem08IuYwJYxanoMNixoFccpSZsY/g7a8ICD8jgPx4q4LVcZ8LhCSUHPwdGiw4hl6bTxBAnqArtgUgkwRAGmNMSCsuZLc1qei1/jgqzzuEAoSOxemCreJBUg0pEFIyYhdiPEjHOyMJFCRBAeO4ER55lJC3gZDc1w06FFCrQsVbaRR48W18dyhtTK27H0N3Owb/3Pfr64pRXQ2bsoCQgQCHbS1qKJ28wwBIlqKQTAciPUDxTuAxY6WSAZBWKa7ZAhkIVrTrr5Ssi8CQ/ASMtMCCtfhwRUNDf6qnBCTmYZ1lv1y8Hgok8ytQA/4Fa8KfoDGgIEEH3+OX34KOcnzKZBwJcLSgo8BXMX6OSvSl4I5tPJm6Sf0IIeV4H3aWQfFXm+LkydNqkpoVwF21WW/8h/F9H1MKSFE16hiJUnrMao904EW2m76R+nggZKMP+qu63IuxJR/Uqf8kPMT4gFp5z7iKdwUhCbj4m+N5cMDfLP4u+RNqBbDPgthPudmnDxAe/09QadwXWQWBRd7ESzUSULVxD9Rp1g91m/fDS1V4jeW+9xNM//95XlNxH+WBnIwH6T/luuzVjrbx69WW3G7AdzqYZ2Dc7Us3hKTbrySmuY+uvl9bCV30ePD8fmemTzRdAr6/dAUFSrfEIwJROa4NiPTEhbxVvexj1r6slcYSpkUDV/M3s55RaV1r5ZyQ+wueN3Ie5uQY+N/gUvj//F/B/w0piZxswxxUBrueaYgXKrdFkdffQ+TTjehp0QD3OSpznzL438CSdIMug8f4WQIf5XxU4JHnnwdAGghpg9lmnLvLtOeEvnbYry9ybroVkHxIkYcPKWSbqCBrN+1DBScVbvcI4skHHWdG6cLtl9I7ZAlcbRgXsu1Sj/pRoCS3OVUpy2nApFs5yXsCum0rEwBJMCkQ0r/tCpQavg3XJZOyex6lFu/6Hijj8ej5bDn/JWFK8y93w//DZSpOpSTWMW7jJuGOyyTeIcBT2xSIFBhpqSGNKtIqo1jaLZrr0UzAo80DJ8Vl2xNb8hvGiaQRTooi0tWZrtqdCBA7C4xcp124uS3GWo+WUqwT71kJGqWMZpzJKJZRnRhzUrYLWLVM3M0FQkbKMXA5QoHJVfj621PSDKqtpbx49QbK9F6DnG/OQXjzBQgjYAwXI4CMYBlBF2tjGkTOIZDUFslSAUgp3UYQ2Ww2HI15b/b2TExafUh3wD24x824f//t9z2+4/eNi3/fGPBBSPeP57+v830nvK/P79UYMMBg0cpvOQGugFxU75hJiZok2EBkAJfdENIGID0gUiYDNVSSmtBX30feT/l0mbH+YgVA9hcISRMlZDfetPGJs7gEufj0OZKlozvdYvqvh3PgZoR/NI8KyJEIJYAMIYAMqSQ2HMEVxQgi6ZKd49XP8HLzKdi+LwXHzpzDfpWoRlSQjA9JoCfxH5XrtQKSVoxIG4wUQCkgch9dqM5xcibt6bkhz/r4uvDDj0xAc46xKjWAlGQ0CjBS1eitfDSxIAVSch++53DqWQLIszh28izqtR6Lx4q8R/jYDoFKBdmWSkhRQbYhgKQ9QwhZvBX8XuhM151ZzPooN7crEcEb3TA+lY9LXIEW0/bikxWEeHTJ7rmQtuAAus7ej+epXAxjduwoukxHURGpymoEhjQnt2lV5DAUajYJL/dZhGe6LkC+5tOY5XosnG+ORXSz6Xi822o83mk5inVYilc+Y6bsgUl4ttMiRNUfw4zazKrNz3EQbIZXGoKnP/gaTb7Yi3bLjqPdwmPMiE2jKrLz0sN4f/5BPP75Zo6HTcj78TbkpVo2fuAORA/ajWpfHUGPTccJHwkgCRoFQnYVAGnMApFdWEpymj7crxld0CX+Y7HJdMWeJCpI7Y5dhCrIIlMOIl//1WzX+owPSFdsAnSBQ0qdlmHJybNSQ5pJNUsLNOQmOHogvCQGj1+oVAz3RPnyj/ot05MrdT5xgtV9wDT8D7NB+1ElLaDCDSIJdNIDSIFfYnYFUuaWtXoyLUww6wYM2UAE+1cl4mL/q7GggFEGY4JjRZIQuSGje5nHY4ePZr8MxxPf7wZStjElsEqBEAGGPE7CDUmq4yhUFavWbJH5qYqXd6drvex3idewpwhq7mfWZuWGrWJCpnfH9rjGS9vI95s20usCK6UPNADWLuwduo+Sr7gnil/5nG827IU/vzeXSuhCwEeI5HaZVQ/BDDjSAFf/Htn6TsaRZapdvZTLArbkd4oKVYlTTBgZSAsiQBYgKb9PonB9kLBRYiM+QBXsAwRaDwm8lfiOrIsAaRVGgMvKM8DAKveYlTYSsOtxX1f9p9pSxrh8jgA40++mtEM52WbMtp3HYiBkbhV7sDz+G/IaljHWobyyAyHNubhjdzKC89dBTrqTS5xSlRSIdTC/97dWQtrqZwFWU0cZP484Sit1uTq/+XeJBesZ72mXrWM254m0gSyz9Gd/CTyW63NOtm0O2qNUGz/IvnnIWUklA8pJgKofILBf5cEAAaZ2u+b73A8A5Fpj2tYcn2fMqLqbPvUqPeeCxLL1QEgTFkLOUcJHmsSFlMzxJWu0QyofNPKqd08AnvSvvHYfv4SYjxYjghDSSS8HY5FcFnN+tIRlWuPfCCe9jArJSJqDFkE46UhYjpyEf3XH71Df43nIoTnVna412f+75/OlrS7//AvqjNkGv48ISQkMIwkdlcs4YalKumNKJuCJFBMoKbBSttuhJZe9soNb61G8J3KbG1BaMSU7ETwq9SSBIZczsigFIwkkpTRmQUoBldoIHdWyVRJMagBpuZqLClIgpJiligyna3Ys4eiCXZ6HTNIRRy78hFd6rsEjDZjAr/k8hBIoioU3IYC8hTm43dFkNiJpUhqLeFsvu97+mkn4ZiKw3pfowazZEkdV2t661b0n4zX74+HenC++7/e1o28M/DljwAch/1ETtz9nEPlOXl+7mzFw9dp1JlX4gO534nomN/ScPHBy4J0R2wMhAzlRMPDRU1I5QjVkIJUpAYQ1zreGMTENISQT0sQSQoriLaY33a8ZLFw9feaNoAQYd7KMpDm6E6h9koTI/kkIpVt2cKVhCCV8VBBSAcjhdMcWG0obgpwvfYL63WYTJp5RIE9Kd5xIQsaDbuhICElXZx0P0igkBUxyH1FEppzBSWaxlmzhWQWRchMvADKZny8xIBV8FABpWVoAKQlpjEJSQUi+R+DjcSogEz77mgrIDwkdmen6BaogCR8FRiolpKghCSH9n/oQeZ5vT1UfXaF5A6xu4HmDKzBS3IhCeJP+RN+16MbMj/0I+7otOkz3p4NMVJOM5mO3UqFId2nGe4ypPhLRhI+ijHQJgOS6uLnnazwWL/dYiBKJ8xDdZCrC6o9HRIPxiGo6FfGt5+GpfuuZrGYJ4eQsPN5mHp7m8it9VqHo+zMZA3IUQSQBJONPPk3g+T7BZ/vlx/DRgiNoSwjZdhFjQS4+gvcXHMKLQ1mX3syk3m8L8nJs5GXiotgBO1B89H50WMskNBsFQuos2FJ2sQCklF2STisg2WXdafQkpOy8PgUvzWDMR4kFSXtcACStGKFkUQUm9yG83iecNJZW41myEOsJqzUBNhNiVcq4l4mzDRZxomog5MOceMYUr4t9yR41gzmHfKVcT9UppCY4Mrm68uPP+KDLKJWlVqkNBR4Z8EXI4IaHalnW9TYPALDDgFsvq88RN0r12UYN6YEKGppoOGQAloIuXgDL6ntR1uUT47oyjhMDGVkK5LKva5ht3mvGlLWuYBSX3aVnXHlgiIGQFagcpUKQsQCnzFwizZeJiaJ2xT7L0BSPv9ycYK0c4Z4APvnM9BBSQcZbgBcFz9xwjTEQLbXX6MnzVF1+vWtXU3VEDINxA4VfbkpXVlFbWspULxhmwJG9tEMkz3J6CCnqRQtCCoi0TCnuBC4qMMm/8yGaKPdVKfBL+pTnvzfw5Hix2krF7vQaowZAWqWCVmx3FTdS6qc/ywMi7WNAlvl9brP9zQYhxS1YspM7i9VTsUo94yEz48J2b0P3Xnmt3biL4K6OCruiIWTatrfVwz1e029T45b1FAgbTBD4ctWP4CxeW0NcAyCllOtmus+xH7dZNt8h5yfPWQGdPO8ERsr5J/3kL8BRQUcD/+VvNKV61KU+D2XZMnf7Sl94xoznWuDpX/c1yXb9sF+D1PWFDwkEQPrJuUUIGVmsDjZtT1Zte6+u/fqh8G9YtucUIj5YCIcbQlowUhSQhI8ZG/+mFJJWqdSThJIGQgqIpBLyUX5m10UHWW+dZMtT9yyOqyzPwTyfL4127OJPKMEHz8FUZirVoFI/agipFZwWgLRApAKQAiGN8VgMkEwLIqMII70gJO+NoniP5Da598zQNJSMUqBSYKWBlAIezbKUFogU12suR9ENW8yd5VsBSI9buXbLJkQlhAz8cCWPey2zZ19UY+fmTX1+rmbcyahWC+H/9lzGh6RRBRlG0KhAJMGiwEW7OSzY6CBstFsE18VECeloNAshb3yJkDenYuzKA+r7PA9OPf3hGQO260aW+9f3Xl87+sbAv2UM+CCk7wKZiQmK74Lwb7kg3NVxytN3/ps+dy0eFNUSJ24CauRm3u2OrSZ2NgiZgRJSYKSZ3PlTcRb0dFPE9aHbCmM+xvdj4pF+m6mCZHxCuqZES3wfy7VGgo5rW4GIbqsQzhvTyMSVCKkzDsHlhyr1oygggxkPUmJCCoQMJIQMKjsIfi/3wxvdZ2O/UjyeUW7Zyg3bDSBFEWkDkLKd8DHZMgUi+d79VERKEhnJap3ZthRoeZpxxZL5/sM28GgApCqphJSM3Glh5BHCSFFBHj15hrEtz6Pb4LlMMvMh1Y8JCH4xAUHKFbuDG0L6CYR8+kP4s3Q1+ZLwli7sbEMnb3wjeXPs4NN1AbkKRNIFq+yQTei+WLJkJyNx/mF0nncIXecfQo0+yxFfcxSimJxG1JAxNUZaIHIE8jcaj5d6zMdz3eYj/p0v2P7jEUYA6Wg0kRByGgp2WITn+qxD/ve+IoScQYXkRDjqTkDcW1MR23ASXeiHKwXkqwnz8P7cA2hNFeb785PResFRtJl/hO7YR/DenIN4fsAmRNMVP7bXJsT13ox4KmRjP2E2yUF78Oa8I+iZdJxgkbEgleLRo4LUAFJDyC7rCSKZEbs3Y0bWW3wURZh4pthkmoKQBJFS0hX7iakHUaj/CuQoVE8BLpm4KhdZm8use9JqB1JuCMm4ZxY0U+53VP00azdUK5Ks7JmZHS//jv1kYsO5joKRsgD8yAcclRt3o6KpnIY9hCsykb+1ElLAzq2BY0Z/0zDTwEdTekNIDZY18DBQIj3EEoDBfZTZgIYCInrdDSEN7HDvb95noEpGZVoIqesox5SLgCNnjCj0XkfnfmNV23mUSrf4LbcA0979x+AoWIduzuUVHLoVhNRKSNMuAmHMspTabVsrISURC92BGT912uwVVl3uPt6dUd43TxiCh8JL8felRholpAGBGakhzd80UHIDrjTtnxZCyrqXqd+1jPvKG0Ka/tN9ptpKAJTbRBlXkf1WkQCuAkIKVieYqsc+lLY04ItjJh2IM5+bcakhGT9DVNdUQT7+6ttIOXHG9ruURXhgjZHRkxchRwRBmrhiZwh/07Rr2npLO1swT86PnIznmP+5hli2bjdqMRTAIy65Vpq2YinL1rqnDaQ97GZvA/1eOU/doNC6D1HXaOscFKDsVia7z0F9brqv5e7vsMNH+7IdQJplcy6Y64e+Bplri1FB5uY5I8c+be6ae3ZemN8Gc34MX34A/s3mw9lah1lxtiZ4pEWKfbiYy4tVGcnS/C0tmFSqSZsyMoJQMiJhBR5usRhDGCtQLtLyfea75brtWb7F9eYezruk8XacvIJiXXnPx4zZUaybi6A0UkLLpDMNJN0A0oDINKWL68psCkkNJL1duQVGuiyzL5ttLgGKvK9SYNFaVhBSltOa5X6ttvPeVsWwFPdxmjvBjnErZ/0cjMkZ8MEylP98PU7/cA2/0i1essLLbfiY1ceQo8HXCGoyjy7ZGkCGETaGKwCp4aKBjApIMgmNw7IIxoF00KRUy41mIqLhDN6/TUcQQWT+ZjOx9FsdQuaP7Gffd/3+55KvjX1t/EePAR+EvIc/hn905/m+z3fB+CuOgQuXLqNU7XYWiJSbeqpKZMLGm3+3G7ZZvgWE1KpISw3JmEmOpuMQRZfs6P5UujEYuotu2AIco+XJtPW02sQEciVI9sblBJGEa73X8SZ7PoIIthSIJHgMthSQooJUELL8IISUG4DcL/dGt5ErcOYCE9WcOK0go7fq0agfDZAUFaSASbpPC6DksoBEceUWcHjtp+tyN37bG/KfCCtTz33v7X6dAYg8yozXRyTrdRoQedgCkKfPX8TH45Yh15OtEfyCAMiOCKIbtljg81RBPk937BK0Z1ojDy3qzYmIY/whp9wgWypSUZI6uRzZiU/a6XrkYLtGMP5TxZFbqXhIphLyMBIIATsTQnYhGGwxcTsq9FiKwoSLMbWoiKT7dGz1EXjuo1l4pdcCxDErdlgDZiivP1aVkY0nIa7VVyjeYwWe6cG+o0q1aNt5cHF7WN1xCCMsDq85EgWbTUGNwWvRet5BwsdDaDn3EGFkMj4kBG2/6AiazjqApz/ZwADwaxDPLJRxPTYQQm5EXP/NTE7zLSpMpWozSbJdn0CixHsUd2tLBekBkKeQSCVkIiFkzw2n0GH9CSajOUQV5EHliv043bGLTrEgJEHkM4STodX7MBFJJY5juu65J62c/LqX9Vg38EnHOLMmxJxwSpZgmYjmoKtsgRfewtadx+755POveD3Ifp1keqsntGqByymnLqJao0Q8EsEkFAITRPGk3E2lbbnM9rWbAo1M+JA7rd0CTqpkEtJP6cwCCzaw4aVyFdgscMUy1fe2db3dAA7Pfmb/DMu08MZr3QZaCGgMBNQQsjyBVnn8T8grqNE4UV9/2IC37QcLMO3YexhhheooJbtAsttDSPO9pjTwxYodKW0ey4QbUeUQygQvq5OM66YdWNyhXre4fhp30y07D8KPx6qyTSuwZQBj5koP1LL3ifdvlhd45JhT6/J7ZjevvuFnZbgufSZt5Bmjenxq11zps4fDXsUno+ajbqsBuD9YFNeEqAR9AjVvrYbM+PuUGlC+izER7wt+Ba9VbY3TTFjmUTBlre0N2Boweg6zfIuKTyAk+9qqn1FtmlK1ge18cHtDqG3SFrrNcxK+Fnz+TYib90Jml48oWpvnq9VO6rqpH+DY4X/G7Svt4Plc8/nm3NLfb/UbAaRWtbL0un6bc9Qq0/SjeejgVarzzwBI+7lgu45Y1yUVnoDH9hgfrj4a8Rp6D5quspV7Q7ys9UtG57X+PKDXvL0IZLIR5wdUMjKJiwaQFnAUCGmZAEm3CZi0zA4kxW3b0WYJIggkw3lfkKPVMkzfetz6Dbv7Omd0HHfext8HoW68vu1M+R7PdFmC4A8WUMnJetLdXNzHHYx1KSpOAZKOdFDSG1Q6RU1JxaQxF5c1kEzjri0PvuXe0yrVMmGkrLtVkmpdtlnKSVXyfstaF7WjUj4SPqptsm6ZJNKJsgCki+BRG+tAlaernV6X+97o9kxm8/5StJ6+B+d/ugnJev8r7WeqIpsO34QcdWcgmOAxjEBRQci3RAVpQUgbaFTAsTGho2UOlo7GDNMjKsiGs2j0mCGIdDYkiKw9Bc9+tADJp39U7X7nPvqzxobve3194xsDf/Ux4IOQt7jJ/at3nK9+vovLX3IMWJPZrxeuY4ynMoyXpjO7aggpN/4CIo17G12xuewxcc3muoBJ7qddtbnOSUrA0+9Q/cgbyv7b4KQK0jwtlhs1BSGtJ9dOqvfEIiWoOpOfOLquRkw3xopsMg1B5YZ4AGT5wQhiTMjACoMRWG4QgsoORFCpzxBZ7hPMWraDmU6pTGSMRQMhVWxIqh6VOlLAowUf3QBSgUidsEb+JgluJHHNpctX1eRfbpLT9tfVaz/jKFWTAi4VZOT+XurHdDBSqyGNIlJUk8dOncWZS5cwcvpK+IvqkerH0Bc7KfgYTDVk0AsCIbmdIDLwuTZMRvMBnMxYnbczM4szOLq4s4urkJOlgpBUQjrFOgrIXaEmG44Oy1Fu6Ba0J4TsQgjYiTAwgcrETgSRiVxvNW03yvZYjoKNpjCj9XBE1xsLV8NxKNBqOtWWExFQlwmCGkxEeMMpKNR+IYp3X4VCbRcw2Pl05G/Fp/P1xyOkxmhEN5yKMn0Zi3L6brShq/X7cw8SQFIFKQByXjI+mn8Qb0zdg2J9khDPGKD5qIKM51iIExBJMB3TewueHboHbVcyEQ2zXSdQ4ZioAKQAR8sIHA2ITEw6g+6EkD02nUSN/8fee4BJUXRt/9f/+r7vfR4fA3kz7E7YXYJZUTISJeecc845KkGySlBRoigZyRlFUIIiQUHJYck5qZjDe/73XdU107MBkQcUpLg8VnfP7Ex31eme6l/f5xxU3CaAfHrWQckNY/s0QSTgY755R+WxQWskPYsW0J9DIGQqN63mxlvdEGvwQBWkqogNKPAQQiN7DZvu3Lz990AmuV/9c9YJIN3Gm02RMxe+lvptR6Cwj1brsV8VzEnWEkb+EYR0A8vAcgoASZigAZsaR4CkFADSwA9AiwgafOBGzACSkDYZ+EgJXOhTLgtAEK38pBIyM+DfvwCe8pdsjjyP36h+u55fGMD04YbPJQP6NT2Ki7khpClIo4sAAbQg3NqEGOvWAEi2Os+h7n98FiCk78kasmOnDuO7dcDldxTy+FkqNuwDNSTUsTg/g3khqYA0ljaQDOlb57zlWIQARgc8qgdobvCIZeY31u814411AENayGerMcWYoW+UD8HH1PUAD9iojMuM9fuii0ldKAGT8LDp4cIt8LCC8M30s1bfpfzM1ACk9g3tsxpC/r/IYtK4/Uj5+uvvAG1u9pqjwz3b9HpNheurKt9UQgYgpO7vFArFVM4F5e/04YeRrxH+8SxUmgcPa6DVqufrSHmBSAr8nTnvVIv3U9l4I30QPPequc5DjIuByG4IyW3OOIY8UErjPAwBkHiPUlsGxsmMlzkfnGuHeUCC60hGwPnMeBDVZ+i7cu37n5Ua/g+Vyjdxn/IrYFSjCVskqi2UkFDMKQjpho5dARu7rnYMQJLrDowknFTLLiBJMOkFiIwDhIwFzMsECLnx0CVcW6iEdM9veM12r9/OZf1dBG/cj21JlyXvgDWSuR3Uf4CQnu4w7DPBqbcHgaTTYtlHOBlimDf2xPzRGI7RT3NBSZNnUsFAQEC3WpHLej5qWoJEbRoqBtfT3A51o3ktAfAx1KDyBIRMQMXteFgilnPQACVjUUxw7MfH5BeoIQki0RVy9uoPUu/lDZIZIDIWUDEAIaF4NCrHEPjYDBBSGaAjwq+1UQVJEAklJMzXZJ74Gs+RsJqzpPHozXLqEgsy/pXjfTt9yX72X3fe2r62fa19wELIv+zH0p509qS7N3yAk5LzF69IlYb9VKJ+VoINqA4CAFKDyCCA1DDSKCUNhIxETjW+JzyhknhqjhT/iO3igwJOJe7mhI2TMgUgP8TETJsfT739CBmKR1VIb18sD+R73gfomiwx5V+HIhIh2ICPMQCRUYSRFWDcXn6chJV6RZ6oN0HWfHJAziO/o4aNLuWjo3hU2w2MdLd83XkPFZEHEf7GgjW//oY8kQ6IJFn5ATfPhIkEkEcVfKTS8XoQUishDYDk3xxHFexL316TKYs3S7ZifSQcEDJr0RclBurHGMBHpYRkTkhYNMKvIwt0E2/tN+QR5B/KPuAT2AZUZqQSEqFBUECqvJpURSplJMKy+yPJO0Cuh6rSfuuk+OvbpMPCA/LiaoRlA0D2WX5Y2YtrDks/WFtUqqw0ar3k77FI8kEN2XDKZik9co1EQ+WYFRAya5MZktB2nsSjOnZih/mSvd1ceQRt3j5LpOTQD6TpuzsRbn1IugM+dl5yULog5LobvoPwsRPyQlacsEMeA3TMNXCTPAoI+TAsF4oT5RyCkGyAyEehkm2+7JgM2HRS+mw4DSXkuQBwJHgcAAAZMK5/cl6GfnZWOiF3ZJ55SfLUTBS5UQCSRWgOIjQbSsg5RyT/u/skslx/5EDDDS1BpKqAnAw+4oZZ38A6UIDr6oaZN82ECbwZrYIb0IqSkL+x7D18lt6QLIzt3rg+3PjvAG9uQs0o4C5d+U6adh4p90M5limxAkAIVHtKeZcMSCZXQJp1AyjRavgIaKBAAVs9VkE1pAEKutUgUoOe4BgH4YiCkIATQRASXA6Bjcpn6DcuSwN8hIIX13cH4IfeNwUOAbWywM/+E1tKcjxbR44cvZHQOQ2YFqzYjArQFSQTFL+ZodgySshUIWQARIb2jwnHZohxlhwVAIvLySMFG8kJXBf571ZBSPU5gB+LVnyMoisl8BsDhXIAPBoAyTYUQqaAZO4+x1gYIJV2G3yPhpDB8Q2MufszA8vBa0E41LvhrJSMqtVhuSpjrJ6XPM+3k71JZ+XzfSdRcAeV03OhojZ9Uo0xgZxzbQl8XlrrGtZpgMfvqCz/N7yY9BkyBer8n/6r/v8NqUNqt8V5pyC1U+37ZiGkypmKgjQAciWqdJJTyGnMxwwHky7IwwUbSgb4MQEfHyQEYCTWCQFDz4fQ9eBDAAJIN4TEOAUgpBtIpgEhASb195hWf08ohDR9beAj2+D5wGuFUb5yOROuP0xV03/4dKSX+MU5H279dZ8Xzm9+/EVKv7xRsnZYKT6o5RSEVODRAYxYJnhMboSPRiGpWheI9CKMOw7AKytAXUT3tbLnDB9wJIeQt/54bug3w3kA/sXRi1LulXUAkciFiH33oDBPHFvsO4GkF2CS5jNGIOkYAaQPRW6CIBKqSKgj42kOjCQANFW3NYzU0DF1CMnXXGAxGZRUcDIEPDrvTQEgNZBMJHyEJQA8qmXMfbNDlerHPufot14WfKHTLfz2q76eH8T4lOy/WsIbvoeckHjg2xxKSCogXapHtQzoaACkRy1znbkgCSA1hPQ0eU+8MELI+MZzJX2N2dL8ja3y9bWflA/c0BjBL+37bB9YH7A+YHzAQkh7UbQ/CtYHbrkPcHa95qNtuImFygM3DaxWmRaIDCojCSaThWzzphDbogByeIPnAbjyshI2wl78nAyqCaLzxBrwMR5PulVSdUw2GUrkY2XInph0Q83n77BUYqqhQE2F1xSAVPBRQUgoIaGGjMH2rBXGSuYSo1BwZbys2ZIkpxAqfRAwURencQCjAY2mTQNCGlDJitvME0nwyH9suW4AZBKAYlqmwaQBlLpNwvceRwGaq999J4MnrpAsUDdmQbXraKWAhPoREJIKSKWCREslZGTB7hJXdaw8gsqM2Qd+AhXkBskO2MhWqSEHYPJLwzaaBpJURSI0+wVMxGFx/dZBfbhByk7YLh0XA0augSoSMLLnsgOAhfsRLn0ACsaDDkjE+pK90n7+V1Jv8mdS/a1PpMrrG6XGm5ul9sRPpenMHdJ63i6leuzGvwdo7LHiMP7moLKegI89lx+Udgv2SJWJOyQPwupzILwpF9Sbj6AKei4aYHRO2kufSI7BW6T6nP3Sd+NJ6f7RyRAVpFE+DqQKUtk5eXHLeRmM5b6fnZFii5PkcSgen1UAkmpIGIAkq2EXeO+YJLaZLBkANyIeqeOoIOHLKXJB4gbVDZN4g61umPVNKQsQUPXDAhFjp65UfnCrYIz5Mf/ntQZAcsJmlnVlX30e/SKvvDUfABKFNwC62N/Mq8fQa93qZR2K7V5OBioBOYySUkOfIERwAwWzHAoeXUBQAaxUgFSy7aF+4vKbP4ArGoi4vo/+pQCV3l+dYxDHovqgklLcZoovhyrSXzn+lvbEF72qwhrHTliCMO6y+Ax3zkIdXn1jKkjui1ZCMvQ0DIrMdL5ykr9Maygyb2X4Hv2ByErk++9/kubdRkGdVxq5hAHuFIgkeDQgMhRCuqFkAEgSOLksBYB0/y45qjm+J6iEJMji2Js2FIyF+AxgFB9KhOO3MeJhKKP9z8ujhZvIjq+OqeNZse4L+C/2Jwf2G76sfVJDyOuDSNc1R/kGxoJKS1x7/p2tlIybuBAqqd+SqdbS9onk1xPu3IXzVyVPma5yv5ef61T9ht+6+5TLof2qfTwAaAPXSewvrpPp/eWlXb+xCo7+pkJrkVd65WcI4y8PZavxJZ6jDAHX/kUfSwtEur8nZDkFgHSFZBtlpLqu46GnyxcCx6KOk8fqNpyD7OvAuaiv9/q81Ocnry0ReD0T8qJGPlZbxkxaJj8CEJK4Ju/jW7XOsTp64Zo83R9KwM5QO3bGXIjFabpgLtQF62j9aFM1qCP9LguqJVeLp9tqBfTCASJzDfxYTl/5Xl2Yb9V+34rP4bFfRiGzzjM/Rz7MpRLNwjwEkTgmD/bbC/DqRWi6l8swXzcXkARY9TlGsKesJ+Y/NIZqq/km5kSce8LYmmWjUNSQ0gmhVu/TAJFh1KHKxuC6Crd2vZ5IyAgQqVoFHM2yhpAGRuoWIBIP4BOxb48ipc6CL3SxO6WIRF8cAIgs1AcgsjHAIvNCAjLGQfGojcvYDtCYukEB2YRGADlfCCI9jTWM9EIVmbHWLGn12mb59edf8U3mWqJc4rb59q3wEfsZZqxsa33h7/UBCyEtgLI/FtYHbosPELZVaNRfHoivCAUZVCqsKqom+7VcIdlaEZkSRDrbzU0dq5FC3RNRpKt4AMQ8CIVhjh81OVThM1A8AkAqCEkAaZ7eM6yoOyafML7mazVfqyAJHQkgkQ8yRgFIKiEJIV+TbFBEZkahmudavSubvjolJy5cBohEiDVgIVWOhwx8NK0bQiZf5nuw7aADIr/57kc5A7DJ8O60wGOK7UoheTlQtOYY8kBe/uaavLN8q4Tl6SKZUek6phhCsBVwJHzUYdhso2jIBZm13HDJhfCkHACQ2QEic6ASI1tCSGVURaYCIgkjFZREiDZzRXpg3v7r5Ynhm6TS5M+l69KDMuCDo9J39WHpCpjYfuEeAMq90nnpHoRR78O2/YCSB1HZGgpHAMoeaxBaveowis3AsN4NhWe6QuXYZcl+6YHlvgjD7gsg2e69fVIRla+fGbpJsmNinQM5Kh/GvjyMfc6Ffc6JnKAKQEIJmYhjKv7WTumy7ph0/ei4dIcK8gXkgmQINgHkIGUoQOOCkKyMPWTbWan9/gl5dPpByYvCM8/ActMUhDwsz8w7Jk+O/BB5NlsgXJJFDAghmV5AQ8jkoCKghFQ32Q4QICSimgl52dIDlOUv30UuXkFIJK45FkLezOQneIODux75BYqP95ZvlqzIOXg/1GTMg5dZhbiy0AeBnIFyhJAOiHRBRwMfNcAjtCHkSMv0mIYAJQAJA0NCgEcASAVVVkFAFQq8zN/feBvcj7QhpM7FeB8Kksxe8CG7Cv7GvrtOn+MNQ0fPkf8bXRZ9Z+APwY+GkKoiNtWPAQWkhizufdB9h/ervyGErIxxKS01mvd3iiZc5/uvt2+pvqaPh8e2GwV18pZvj9BenbM1FECmVEMaaBYATC7olPy85nrI7xNAVWTAko9vcF3BZpd/GL+JgI+GQ/0YCQCZ3l9anirZQj7ashehlMjnhuOcNnetPBRdRiJzAHbBZ7VPmr7GtjQVkXiPAWIKisH3obTMhM/4D4r3LFq9iV11k9cdraw6knRaHivWXh70AfTfMITU/h48P7iO84aV4x+tpgoL1W81AIPJ//4XORIRZv/zb9J76DT5n+hiqsI14aMxBSAVhOR5EDz/DNwPfo95IOCMiQLJKecb7oejfLikHzClDiJDAaSBkbrf6fPcN9Oq8wLXGo57Rqg9sz5eW2Yv2YSoCA3PQ0OYb+V5oT//0wPnJQfyI3oIIDsRQhoASQhJMJmGKUi5Cu9xmaqwDZgHkEdVYfoOq6Twq5/INz/8cpP+dGuPN/l1jX7+NfbtrQ8P4/hXSGSHZWoOyErhHsJIgEhjCkoqIIn5IYGkMaWUJJR0YGRyKKnAJCCkApNUS5qH4mw1pGRr4CTViwlqHW3yZcBKtY3bCR3xvgCA7PWRZKfhPdmxncbXg8vr8F6ASMyJvdheZMQn8smRy+wCNTZsN+w5J/FtF0sMw60Zmg3waCwOAJJGCGlaAyRVGLajgCSIJIDUBiCJ5diG8yRz1RkydO6X/Br8vjDVA1tjt3eck4+7Xbf9bX3g7vIBCyFTndzeXYNoTzo7XneiD3BSsuT9rRKXu45k5k0eIaRSRGoYGXJjFxKmjZsGozzBzUqkgjpoH6kOVWVViak/UbyAUUw4Hm/y96hlQEgAyHhMkv2Ajn48tfcZw+STy4mAkp5GM1UeyBiGYcMCEFIpIQEiy48FiBwjmYqNlJLtp8vnB0/KsfMaROockU5OSJMj8kZgpAMnFWBEzi+2zBkZNBa3SQNMusK0qYI8f/lrmblqu2RDmHVY/p66CnZA/RgEkDFF+ksM3hNTcqBkR0XDnIM/BdAjgCTYgwHkJRoQ6UDIRAMjAfw0nDTqSEyOASnjB+AJvwKSzBu5Tp546WMpO36LtJj3lXRdfkCBxG5L90vHRV9Jh0VfwnZLxyV7pNPSvWihjFy8Rzrg9XaL9knbBbsRZr0fMBIqSKgeuwNotkRI9/PjtsijVGMi1D6xH3IewXL1p62TXACSOfFaDuxLTqghsw/YJM++ul1arTwqXdYnSYcPT0ifjaiETeBI+Ih2sNNyeRDCrwduOSfD0HYBqHwK4dbPQPWYD/DxWQdAPgMImXtOkuRFleyYiv1R3deEYRuQ7kBIKmvg1+am19wEB1rcIBPKUKmXBX77n7iy8va8j3ha3JE3bnfiNSTlPrlvbtiTuNvBv02f7ZEi1XrIA6gIzQrDhIs6PFuHaQeAJAEkwWQKEIlxui6AJDiiBQEgl68Xeq39ItRH0vQVXuPcQOW6yy7YpMCHhqYa/PF4CVsrKgB4X3Rx6f3iePnhh5+dG8PUfyvZh5evfCtN2r2CXJLI5QsApkOxgxAyoIR0YEsQPhK+uMGtgZZUy1VCZebS0rTDSH6FgmwpxzT1ffrj99EXgn87d9kmyQhAmuVhFo7iw4IgfCRs1AApVBUZonjjb5Q6n82YBVut0CfAIpB0WRrvN9cFdS3AWKp1pRDU/sN0I5mg9CtapbPs2HNcefFPv/yi+mjs5MWSDjkuw6FGJYTUfqkBlypSQwiZAkQG/TIAInHdYbh3BnxGJnzWB+t36DEIyd8X7D93XyZf5gMT/lu34QuJe6KepEe+yszYB50PkjAuWb8aNWQafaqvkdhngMhMCRVlsKnijvEknCOMZe7XGi0GI1S9tIThc9R1lMfE8xA+GDwXnXPHmSeYcyy0dY1ZyFwjNTWk9oNQ39DfkTqE5HXeAe/q3MA6/RDG40zvqyBPFmsrH3z8pTq25H17O9Y5VvO3HJf4bivF2xnwsRMBZGoQEvOiEBhp1l0A0oGRXrQeWBzmVg92WC1V3vhUvvvpzoSQ7FP++xW+tO3wJSk/CpWkWy+RbF3QHwSQUIV6oIZ0m1ZFOsrIAIjUykg/1JFURTJUW4dra3VkPECkMoJILqMlaNRAEmARy2laAERqUKnDrA181KBRwUbCR7zXQMdQCAn4iO8koNTh2SgoiArhVcZ9JqeuQKWKK4vKAYt2xoYkiW6yQLKxOA2KzlABSRCpwSOgInI+Bgzv8ygFpFFBQv1IBSStEUAkjSHeDeZIdJ05Elt3prz9wQHneqxBJC9qt8O37Wfe2DXb9pPtp7vBByyEdE1i74YBs/toLyx3iw9g9qNufNv2eV3SJUL5gVC5SEBIZQCSqUFIrUrAzZ9STPImUKsZGLYVRujDm5A8bZHTZ4V4MPHyM5ePmiACSELpF99dqyAJIJURPqrQIj2p9mM9EU/Gs9V7V6LK67BsN4RkSHZMhXFQRY6RrBXHSkSxl6RKz5my78QFOYbKokoF6YaPhItuCOlexmsMuQ68HgId3QDSLOv3s9J2EE4CTAJCJp1G/kioKc9duiqrN++TuJL9ASB7SbbiL6gckNGqCI0JxSaIRIVs5IjMVnqY+Bu9iwnyWkkchLBlQMfsCGk2piEkYKSCj1RDukypJAkjHRAJABgM1waMfJEg8mPxquqNH8uTCI0uNW6b1Jq6U5rM2CVt5+8GdNwL4Ej4uF/aL9knHaiWBGxsj3yP7RB63fy9vVLn3a/k+dd2SG7kduQTfVaw1JUf10kOhNHTcvZdJzkBI3OgemQOB0Rmx3ezOE3DxYel49pj0vqDo9Lpw5PIBXlGhVpTAUkAybBrYwSQQ7Bt6LZzUm4pCs4ANOafc1jyzD4ozyAcm2rIZwEh885FiPbglZIJICM8F+G5o4IkSFfGm9cgpNDQIfnNK2EBbpjhu//OWlxK1e0nFy59q26OWNHzbjmP76z95I2N23izSROVY+2lMTMl7jHc+HvLAm4QRhLiEEjqNggf3euAPQSQIRDSQB+AhBDgoeFH6vDRXK9S+oXxD3cbqpyFrzgQJUWbDEgGQUhwH5VKDPuvjw/qt4RyCIOuIA+hH/oNGi/Xrl2/gADwIHzza6nTbBgqKZcFVCGEdGAiAQuWNXRMvQ0WUNGva2Wpzkf4ECDSy2/MUmN0a9W/wZtc+gD9on2fNyUd1JAEkIF+VP0HSAaQFQgVduBYKGhKbdwc1WMycBX87dJwK7VrAX+7CJaDhWoIrelP1SUD0jKUrtVTjuH3gf94jhkI2bLraKgDy6n3amBu+p+wS1tKCMnv0r4ZCA2G3zMf5IOesvJwoSby5d4jge/6s+e0gZBzl36M3+SaUJxin5QSEnAwLQBJEJkmhMRY4KFiFvRRFoQpvzF5nto3hpBy30xOu8PHz8qzpVrK/dlK4/ioKoQxtQXmAeZ4zRwh7VaPa3DM/kANybmH8p/g/pvj4HgGzz9nWY0J+8P4PperQ/0IpSvC1pt0GSdHT7KAC8dZH9+f7f8/836TN3fEot2qMrYP0M1PEKkUjm71I4EjrJNjXDbrnZFHUpmzDdu9sDhYLOZW97VaIZ2QTuVn5Ai9tef0rf1dVBcF9PvV73+Rl/AQNBHHFNluuWTtSKAKRSRUol4ASS+qh+uWywCRylyqyG6YZzrmpzLSUUfGA0rG9wCQhLENQEkAyQQDKJ3lBMBBGt9jlhOxrlSPgJWBlttSMQ0hHehI8BhihJBUUKIQY98NyH35kfRkxexrOl8jBkm+Q8h0/1lfSMa6gIctGIKt8z56ABzjCCBVuHVoGwjFNgAyBELOEw8gZGz9WRJZewYKEs6WRZ8kOX6ur8d/xm/te2+t79v+tP15N/iAhZCY8NwNA2X30Y7T3egDnJEcOX5echZsghuOGhLNsGrXDR2BTqSy5IoEc0PohpBMMo/ckFB3RFccjqIzfOqLJ9PdOCkEhMTT63iE1cQTQCrwiBZP7o358BSc5u+6AsVRkB+y9hSJBHTU+SAZlk0AyfVxsLEAkaMlttJYCSs5TFq+NF+FVZ9GwR2GZR8hFFSw0KgidUvoqMAj4aNZNmAyVQhJ4GgMn8u/4ftMa/7m5Hm5cPmq7Nh/Wp6p86qEF+wlsSUGQOnYV7ISOKKNhupRmxOCXYoAcrZ4Wi3GBHmt5Bi0WYdgQz3IytiJASUkIWTqIDI7QCRzRzIkmpYIFWQiWwUmuYwn9AjRzg446EfSdU8PhAR1x4QYE/In8Zn5R2yRIlAqlnjtc2Ul3/hCio7bJQVQROaJwchNiQlzHN6bDWPow8SbRYYSARyz05BwPQcKC9FyEkb2w7Z+AJEIzSaMfBhqyAoz9kjbtcelxaokab7qqPRAPsiXtpyBnYWdUzbkM7ZYh/pxMMKwRyEMuzXex5yP+QAgGYqdZ44Ox6YaMg+3Td0l0WV6S+ZEhHeisJKqiB2Aj7xJhX8SQhoz685Nt7ppVWogKH1w05whvowsXr3FmaDf/hvRu/FaceP7zJt5Y1jAP3MjzOX1G7+QinV7SWTOinI/lJGZVeEaHRpMhWAW5OLTxm0ANcqCSj4Fjgke3eYAHkIkbYRL+tqUEn6Ya5e7Teu9we0plJAGSiqIpoGWfo+GTe6CR1Qicp2htw96yij4+FTR5jJ20mL5CaGt/He9/sWrchzXmNK1+qjKx4QoGkI6SsgQpSOVaKmbAZUKQhL8Ahaly1pK3p1l8qDe6t9xlx/AFX7Gsbbr/Zo8hBQg/L2JeKwWoBHgkBo/9mEqYInvS8OY81GFXrt+s/Tvl0tZp97D97mN4+ooZZ2WY5cRqr9M3tJSv9VAFD7TVct/03HyCEP+RY1Tqx5j5AHAY/qfhpAE5EH4G/BLxycNjDOtGQOGwoflqqQA3jNFW8r+wyf+0A/S8hEDIUe8Pkce9KNwEfJV0kcIIg2US+G/gfMjef/qUOcw9Ev4wwCK8eXlzSkL1b5RAeneB27ctH2vFCnfWh7MVhLXYX4Wfb0yzj/MBZRxXpDcgucVIynU2OBv3XOPtJZTAmX9WQpqO+ei8Snd17x2ONcRjAlzP97vKS/ex+tI1gmy5AAAQABJREFU94FTUQFbj6u5RrmP7/Ysa9Xq4KV7JabjcsBDgMdOacFHzIk6XcccGEkA6cX74rAeC6j5nxYrpNe8nUiH8Wvg2nt7jiXUH/7cd8B51O+E/o2gL209dFGqjdkssR2WSebWmAN2RLg6FKJURnrRegEmNYzUeSN9mE8GwrMxv/QDRCrjfDNgGkRqIIkHqJjPEECqlsvGuutlzo0IGbk9Ee9zW3Zsp5lt2Z3X1XbMrbiu7cNQCKnUknhA2wvztV6Idum3Sfz9NkhfRJycuvKDOqd4/CcufS/P9V4pmevO1grIZoSOUDWmAiADSkgDIBvNgwoyaJ4G8ySu/lzYLPHVmyVhVd+VPG0WyJnL3/OrnPPYtP/NONq//XN+b/vL9tfd4wMWQiab9FjnvXuc147V3TFWnJCMeP09NTGPehxVP3mzRrWBMqMsY2u2sTU3LuYGgDcsuPlA+FYkIEL44/XF1wFPcvH0l0+oAxAST7DjHQAZDwBJ82MCrQ0AEipIH8yPybS/zSKJqjZBostR+aghZHQAQmKbApFjJLbiaMlcdLC0Gb5AVbI+gaIyh6GGJCwMqBwd6Mh1DRANWDStfr9b4Rhc1uDRFLIxrYGZhxwF5O4jZ6Ryp4lQQPYWT4mBkg2FaAggsxaFIRybodfRKEITBUAZXfIl8TeYIb6WiyW25SKlGGXuRKV8BIRMUCBSh2MnqJBsLmsVJMO0NXwkgHTMgZDZDYTEegKWEwAEE/rj6X4/bVrByPAiqgIAJAEXvd2gbsQEPA7LtNiubPU2H57m68TueD8m0vw7WiIAJC17H0BIx7IDRGZXIBKh2P03yPOTdkqL949L05XHpNGKY9Ji9TF5AZWuhwA4aoPqEQBSLaMdjGI0wwEoX/jklBRbcBSqx8NKBZkX7bMKRlIReRjFaI5Ijk7vSHoAyHCod5UpAOn2UfinAZCuljfJQdUMboyh9vk3oFD9diPl8tVrPBVCbrLtNexmr2Hsx1BTYZxO2OjVb3+QSbPXSsFyHSUdoM99ABisom1gAfNDqtyRBkA6KsgA4DEA0gE9aYNHc526kTYIRkKhl3u7ud65thHmOGYgpIEfBjwRbt2H4iPp4ivJsyXbSq+XpsiX+08qf7sRn+N7tu7YL57cDVDkhyrRGugfAyIdAMY+goXT0oCQ3M5907k4UZQMICxTXFn5+JOdal9ufR484wPwI6iL+e/b736W5l3HSEY/QpH5EAEPvoLhwkEQGToGZvz0b1BagOoPt7tApAHWBGD0qwfiykm2R6vLC8OnyZWvtTLV3R+/QlVGJWCFxv0xBgynZ6ElJ00AISQshX8aP3W1xjcUhASIvy+qOKB8HzmDlCLorZu+/vz++2/SbdBEeTCe5w78wyghFYjkMbpBedBnte+a/tWt8mOAwyxQNsY+WkM+/tT4R+gDGgM/vzxwTKrU6yPpPFDpIt1C1CMGQDot5gaR+Dxa8ocCaQJIE5WR7MGoGePgHMTse/D4FHhFn6s0BLyGAIZmRns/Kl8/AABZonofWfLBTuiL9b+/8jrPMf7ll1+l3ltbJCoFhHQpHwEV/cY6Yk7kmK8T5kjJjADSA4uDZYNy8t/NV8jkTUcRNo/xumNV/ebawFb7PUeDuSKnfnxMyg7fIGFtlkvGllBGAtIqGAlgG+csE0pSRapVkUF1pB+qSb964G1aN5BcKwlQSaZqmPsk4jVlBJDKMKdxltkGl/E+qCxDDH+bHduM5QgASfwdw7GRNzJH740AoB+hKjge7KLNi5zZq3aeByjm8WtvXL3jhORoNlfC60LJSPgIyBjXOFQBaaCkUkI66scAgEQeSG/DuVBBEkDOkbh6s8Vbd5Z468yQDBXelr7Td0Ahy++6+WuNGS/b2j60PvDP9gELIS2EDPxA25P9n32y/7XjayaAuk+//fYHKVCpm7rBjXoMIDIFgDQwUgNIghx9k4iJv1EE4QYjzAGR4YnlJaZED6geMWE2Kkg8zY7HpDEeT7MNgIw3ABKT55AJNybZ8QCR3pYLJYLgESBSAcjyaB2LQm7IaIRlx5R/VaLKvSIPPTdQGr0wCyHR34gCkUrhSBDpgpFGuahaAyA1ZAxCx1AgGQCaAJuHTlJBiWrcAI/KEAZ+GmHgH20/JCWajQGA7CFxxV6UWIDHbACQ2ZQSkgASVhhqyAI9Jbr4IPE1niO+FovF13yBeBF640eYejwgZAJyQiZABRk0rlMFyRyR2nKgzQEQydDtHICQNAUjDYhEGHQiTAFIVClPAIBUhsTohJBUMxojSExA5cZQ06AxnqCSBhDJNgFtAkOx8f7E3ggfV/YBWhom91BExuOzqYIsNXW3NF5zXBqsOCr1lh1T1n39SeR6PCNDASGHATrShjo2hACS27aekQoIw35mdpICkFRC5pl7RPIiN2QeKCPzzz8ijw//QNI/Uh+KW/geblTDQ+B4MlDuApC8adVKHbyH4AF+y3xsBJEbPtun7kb/2nPwXrmemWuN0zowih1+Aefq/KWbpUqjQcjtWVn+J7IoioGUxfgAlmF8TO42pTRzQZ4IAAaOvzIXBIzEcqjiza1+u5FlwkXn2gZVng7VDQKbQKEUpaKFDwVaAhAqIPE38EeqxwmbCD3+X2RJrNeWlj1el0VrtshJ5Jw1/27E33iDyn8fb96FENk6AJm66AhBE3NDatMQLNBPDpDUuSANjAm+JwsK2zAEPgP6PAbgLenEefUdN7I/N/cejj39XX2NUkTOmr9OnirWXO6LKaHGOkJVzmafUonHc1Sfp8EiM38Ueh2q4jewKnlrfrd07sjq8pCnHABkeWnYYYxs33VI7yD+7z5ONQbY96vXvkfUQAsoDWvBoKqD6dB2tsH+vR6MVBAY40PQzurk/4osIY3bjgL4REGsmwQD3OmffvxJyjR4Uf6NEGMW6qJlUaZVkcFQcQNLg9DOhKSz1T6t/TkzoHU2nIfrNn2h+iVULaj76HdU9Oa/q998J6+MnyNRUE8+EFtSolDUJgrXVsLeSJoDIZODyOQQMgrnTqjVxLo291gGzlNzvjrX9EC4u3M+Uu17f7bnUYG8tDxXsafMWLhBLl1xq8H+2usw++o7VIwvPmKjRLRfoaEawRrVjIBsXkBEQkUvVIA0XwfMoZRBNdkhaB4sewAmaXGwWBreF9Nhpfy72XJZ+eUZfJPO4en25TtvmX6kjX1j/n0NheqKz89IswlbJbztMkmHoi0x7ZejirZWRHpUP0FBivmkzqfJiuLGkPZHPfDmnBMROI4lAE4qw3pgGQ/JE7CeSMPriVg3lh1z16ABMBpIie2JqZqBmAZQ4u8RDZSD8yi0MV0+UACyyvgvZP6Os3Lw7Hfyw0/6/MFQqWsOj3/ppsMSixDqGMLERjCARpoXMDLU3hMf8j8qU/BRA0gvwrA9AJAeAMg4AMg45IT01JkucTXfkQwVp0n3t3eqUH36x53nD3af7JhYH7hTfMBCSAsh7Y+E9YHb7gOc+Kz4YJvc760AZUoddROtKg0bhZmpOIybgYCSzJn0uyGkUkNS7QAFBUMqvbXGoio28/VgIoj8PvGYJMZjoq1AJCbdGkJqABlP8IiJtHni7+c6LKbeuxKp1JAEkACSBkJiW1Q5gMhyAJHlXpXIMiMkc4lhMmjSejl17qocO2sqZWsIqZWRoYAxJNQ6BFAG30eIqf6WEBIA8jAA5EHAx4MIYz959pJ8ceiUFG08WsLzdZfYYv1hgI9F+zggkuHYGkDGFEKRmmKDxF9PKyB9SD7uA4D0smWY+oDNCj7GKwi5ETkdgzDSAMjsAw2IBIBUINKBkC8ARDoQkgAyEQpIWoKCkGgRGq8MxWQUgCRUNPARYDE+FdNVJfmaBpEKQPbC5JtGANmL8BGTeQUhuczw7HVSatKX0nDFcam7/KjUXpIkNRcflVarjgMynpFRW8/KiM/Ow87JiK3nFHgcivXhgJAvbzsjrdedgOrxiOQDeFSh2HMdCDkbIBJ5IPMjP2XE8z0lc0JV3JgyDBv+CAtV6Zp1AqFQ0xAS2+C7YYAcDyB0sXqLoQiJ/fW2n2N3yqTi79uP4M2m2Qded/iPoa8fb9ktnftMkIR8jaAafB4PRMorkKdgA+CiG+xoAEkQyWuNMQBIBSEJIo39EXg00FK/3ygagy2hTBDWBJeD26nsIhwhKOG+PoRr6H0o9pIxsYYUrtxHhox+Tz6FivHrb3/UB+v83/TBH7VGbbZ23XZce2sr2KX8N7Bfel+CwBTHjNeCx+BadsAtgRRz5KWHMjOxQCOEpGLf/pLfWYbmOyQS/bBn/3HpOmCSyhOZHjlCIxGeTYCrAaTuTy4TRPKYg4CZ25x1nONuOJXqsvoMfS3g50fh4UVGHPuDGKsiVfvJ7EWb5NJVA6Y0DHCPi9nnCyg6lpC/JcYA40ClIXwvGEqu/cQAvUgAPb2PKX1L+RHVqviN/J/okqg0PUXn77vJnIR0qW+uXpOi1frIAyhKwzQqYU7xH51/U1/z1Llk+i1Fa/pU9zV/15nL9NGiTZGy5ZzyWvZDsF/M+UzQpVVcv/z6m2zaukfqAary/M0MBXAMlJTR6nw0Skicr5wjBAz+qc4hjmNwLA14dLfBsXWu6zgGHpN7DmIUkoTDPA/vR7qBghW6ytwlG+UEfsPNv+BxuI/p9i/z+y9e/U4KDd0oUe2R+xDzIQ8gJKtd+wHUApEhzoPZeLScF4XMjbDuc8yLOZIXyx60sQCTMQCbGdqtlk8P64cdyUPo/67jvv73Gl8KtmacrkA5vfbLs9L+7R2SE4ULM7ZYin5jGLvpL/QdgKQq4MN+RH/6kGOTeTb9ePBNiwf8i1cPwTWQJHS8nikYifdkB5B0m4GTbAkx9TpbWABk4m+giFRKSKTZYQ7LiParEd69Xpq/85Us3XVBznz9szm8QMurojbkXMX5NHz2domo9rZ4m0IRCQAZp0AklZFuEKkL0XgNgIT6UQFIQkgCSIRhE0DG1pkp2QA142q9IzHVp0lYpRkybP5e9YWqMM5fcu2//efW9X3Mfr/tH+sDf9YHLIS0F0fXpM+eQH/2BLLvvzGf4Uzo629/kNqthmPiXlaohgyFkLwx0QqVtCEkbsJwY6ENy9krSOQTDSW+DSZKeGqsJ4OcHHKiDRBpICQmkHqinWyyjaf6Cki2XyZZa08VKh9ZlCZaKSDHCgFkVNkxjo2WmLJQRJYaJRkLD5HWg5fIgeMX5OgZwEJARBWGrdogXExL+Zjadq2mpBIyCCCPn74gO/cdlxodJ0hE3i4IwSaA7OsAyL4SC/hINWQMQrGzoghNTLEBEl93hsQ3XyZePNX3NVsMALkYlRAXqYmqHwrHeCgh46Fw1IZ1gkjAyeQQUodk67BspYQ0Kki0GkKiBYBUBgCZmAqEJDTUYDF1COkGk+Z9BkQmAEQqA4CMVyByreRCOHbJCZ9LfYRe14KasQYAZNWFR6QRYCRDrsfhyf+r28/JK9vOy0gUnhmpIKQGkK9AAdl142kphFDrPApCIu8jQCRVkEYJWXj+cUloNRHqRYT2QVmm/TMVCElgocCkc6PqApFBhVVN5IKsJjnyNZaNnx1UNwJ3x83ajZ3Pd9t1Tw0A/vfjj79I0rFzMvrNZVKsRn9ch2qhgEt55OqrAOUY0jw4cM20AQAJiKFARorWgA3TEhiaZbZcd8z5WxMuqsCGAn1B4KjUjniffo3bqSisAvBYXuV55HqBSj1l0JgF8unnh1WIP8GM+Xez4/LjTz/Jiy9Nkv+TrjCKopSG0gzGFvagpzS+uzTC2suqgj8Z0CpDcRUWWGERIBpfZ7jsQ7AHEIL9oKeU3BddTHLmbyw/oN9vdt9u7u9Mj2DMUcF35fvbpHiNfhjnKqp6OsNnDXBSylLnnDbbgq17LN1qOarpQpWRXKffZADs5HjlK99dZizeLBevIA2Dw0XTOhZeG/jvoy1fShZ/Vah1ATBVP5ZR/c88nzrXZxn0czlUXDaGvucYuCydlzlBaaUwFsXl/8uQXwa9PAOhswC0/wWE3LUnSbKin/4VVRJwleMLY6u+C+PO8Xf2IwP2T1uyfcPrfJ/aP38ZVE4vLo+jaA7TJ/BfWv1jtpuOvPbdj7Jo+SdStGpvPDxAjlekWoh8uApMn2vmHFMt1ZJqe3AsWZ08CmHY2rjsXg+Oq37IhL9HGhieeyx0xb5P5ysjMY/XkjptRsjCVVuRr1kXHLuRYzDHcrta7sOnB89LdkCyTABqka2WSXhLtkslug3yIDIXIipFZ229WLUxbFstkqwwtrRoGtK4RCGfdCRSukTAwhE1kqX5fMnQeJ5kbL1cPj/OnKZ34+8F/cyYc2LiSH5APtnDZ6/J+NUHpfTwjeIBbI1siYrabZZAIQooi/kkYSQhLkEk55gGSCooSZUkVJRUSKq5qFFKKjhJUPk+wGSoaWWkAxkVdHQpKfFZ+v1oAUcT8CCZ63zQHof9yIp9SkTqoeKAzSNXHpZdp67JtR9/VWOC/6kDDB6nOV62PHiR73FNbjdunUTWfBeVsudLrAMiNYx0oCRzQAJAeqiYVCHYgI8AkHH1Z0tsPcBHAkjMObMhFDum9nSJqfWuZAOIjKjxLmDkTJmx7qjqa1OkUu/P3egzdp9v1/XKfu697VsWQuKqaE8C2wfWB26/D3BetOmzfZIVeSGZbyxCgR7AngB8vD6E1DcWhJC4ScdNAW8MwhLKoxhLN0zQ8LQfT485QVNPqA2EVADSQEg87cfETdty8eOpvg+mVABtMfmuPkGBR4ZmR9EMgCwzWqJogJDRgJCRpUbKA/kGS5MBC5Ej8qwcOwdFJBSMBi4mpaF4NK8nbxmO7YaQBwBJjp+5iJxux6Va2/ESnruTeIr3RRg2ql0XRUGaogCQUEJSDalyQjIXJPJD+uugCnaLJeJD1UMfwSMgpIcQEmHZzHfkg7LRDwjpB4SkxRNKKggZDMUOKiG5zQ0hqYTUakgFIQ2AZKsgJHISmVBspYLUIdcGLrqBY/LlBIQRKWMoNlStygAh42kEkD2hGMBnFpu0S+oAONZaRgB5VKoAQFZfdFgGfnJWxu+8IK/tOC9jtp8HiKTqUUNIqiJHQx05YMtpKTY/SeeBhPoxHxWQ8wgg0QJKFlh4XJ4egpu2JxrhppbgUYdhqxyPLshoQjiDCkgCSReMJMygqhd/z1DKl8YuoNvj5v/2n1/2GvbHfWwUZ8xjRnXqri+TZODLs6UUCrLkyNdAha9mRKGMDPEovoECEwSACgwCQHCcCS90eCfHubpaV0CD2x0z66YNQEgHRgbAhqOyygJwlRmqKn5XxoTKKh9geuYEhJow6xN15LFibaQ+QnnHT1stW3cmyfeAakYZxjFXIawhCrI/7odQXxH5FUVRFizZII07jpM2PcZJ886vStPOr8BelmZY1vYKtruNr42Spp1G4u9GSqMOaGEN249ADtQR0rTjCGnWYZi8MGQKQKC+OQ793j+7nzf/ft51f//9zzIHobKVGw+UxDz1Ma4VES5eQYWNM9SZYcKRUDCq8XkMIIq5AgGndKuBVTRej0JYtz7HCYmZO7MawCOU+Rgv3zONpGz9gTJ2yioNH3Huq2OG8uh6x24g5Kfb9kiNNqOlTutRUrP5MKnVYphUbzZUqjZ5Sao3GSTVmw6SGs1gzQdLrZYvSa1WtCHKamO5LpbroK3dcpA0aDNYGrYZKLWb9pflaz5T16Hr7cP1XuMfJx2DkrzXG9IEPtACFbybdnkFy6OkMca/UYcR0qDdcGnQdrg0RBu0YVgeKo1gbBu0Gyb12gyTmmo/sX+tB8pLL09X5yK/I/V9cG83y3w3Hyr8LEtXfirVmuAB3DO1UISqnHqgkBlpAKhUVA8THDDJ89PARhbIU4ZxjlbGcQ2OOc9t5n3keZkBRY4yQNHO1APZ8zeS6s2Hyripq2TvodMqh2dgn/9gjAPvu82/BeyX3ccuSe95u6X7nN3SbdZe6TJjt3SCdZjxFdqv0H4pHaZ/Ke3f3QXbGWIdp++UTrDOjnWavgvLX0pHvK/DtM+l07vbpO+CPXL6qlZe/1XHdeu/h75kzFlwoCqB5OeHL8lgHGeVURvlya4IYQeUjG65DCAXD63bLpfYdgxnB5DsCCAJhSQjcBiuHQ/4qyJysJyAZWXOciLWlWE9EZYDYDI7wKIypXZ8H2ARsBHbVTEhhtEjZD4W3x0LVasf0T65+6+X2q9vl3EfJMmOo5cVeNTXD14ff1dKcN1X5thSa3G8ONZL3/wgNYaulSx1ABtRJZsqSGUIwfYoC+Z/JHxkCDYBJIvRaPg4HQrI6XiIrwFkNIBmVK3pCmxmrDoNeSLnytItJ9UDEH7frR9D+5m2T60P3M0+YCHkbZ4Q3M3OYffdXtxupQ9wcvzDTz/LgJffhUKjIsKyCSABe0IgJG7sVPgTW0cR5LQaQmpVgwq14k09FC0RiRXFV3WU+FikRqkfnUkhJ4YGQmIip2BjAEJCBYmQG2UAkQkMPWoxXyIrvobQbKgfASEjASEjy45GGDZaQMjI0rRXEK47AlASodn5+0vHEe/JcYRMs2q2qoYNAJnEytlnXIpI93IyQGngI1sqKvcjBPsEPm9/0hmpiSI0WZ7qLJ6SUEAW7Q3VY28NH9ESQCoIWbg3IOwL4oOSMx6qBy8BZDNCSKggA0rIxRKHCa8XUNEHkOhDjkcNIZ2QbMBI5oQ0lh2AkgVsNHQMwsfsCMOmqVBsAyFdADIRodiJrG5tICTCrG8EQiooqUCkBpDxAJHaoILsiQl6r/el0JhtUnN5ktRYCvC4OEmqLTgsVRYckg4fHJe3dl2UN784L68DQr62Ayo3qCGpiBy1FUASIdqvbEdBn6VJ8sRM5HwEdGQhGgLIZ6mCZC7I+cck38wDULn2gRqOYXyhKshASLaCRoRPLuiIG9sAhHSgEv06Iz4nf4UechkFKHgOWQh5B11LAQuYZ47jYv79+uv/yv6Dp+Std5dLe1RXLlWjpzxRrJnEPQHIFE9VFxVoZbTiDKq0DAgFTe8n8CgP2AElFiqghyFFBAvfsNgG88QFjYU8KgFqVlRKMSovlUHRRtVgegDPaPiR76k68uzzbQBUBkq7nm/I1NnrEXq6X04j9YP7H8PbuP8KPt7C+Yv7O27psrq//5vH3wFE6riwP3v2HQMoXAzAN1CeLtFCfLlrAy5XlYeg1EsHhd6DsHRUvGGM0wFKa6ugxioDQoDTA0plAujy5q4vBcp2lDoth8nYySvkM0DiX5wchgoIoNDMn/kNNf3O4GMdgOwABL6guYF5y423t6j/9Q7c+Nfe6DvVYd2QH7MvXH7kgHfzPVt27JMBo6ZJsSqdJXveOniggPHyQ8XrQeoFX2nARCh3cS6zQFWm7KhSDuUzHzSoiuU4B/ngwShKmU8zK+BkzgJNpGTN3tKu13iZNned7DkQLPbE7+W5yNDWkP1y7+PftIwdMt1yG1vXWPxNx/nf9zt9yphzPMn8ivVcDp24KnM3H5c+s7+UWuM+lcIvrJPHugFAtlsq2VpBLQllaXQbKErbAVK2hdK0LZSmWM4Gi6Vhrsk2rh1yTjrbPGhpsQCa2fA5se0Q9g7YGI/InATMYx/ruUby9n1fKozcLM3f2ipDlxyQJSgyk3Tpe1wKAlcHtfOhxYHM8bA1Y+TeZpa1jxw+9bUU6rEKhWpmQ+04R2IbzpZsDWZJtoYAjfVnStb6UDnWg9UFaMSD7ug670hU7WkSVXOqRNaYIpHVpyCse7KE06pOlixVp0jmKlMkY+WJ8j9lJ6iCNYs2H1MgMrg/Zr9sa/vE+sC97AMWQgYu0vZEuJdPBHvst9P/Qyc9h46cllx5G6H6MItDEEImB49mPRRCEkoaNaRJQh+FbdFIvh/xeAPxtJ4v8T0ArgAe1ZNptAmEkHhaHU8IaQCkmuhxsgcVJE1tXy6J2O5pNFMiEI5N+BgBCBlRBrkgAR8jSr8qEaVogJBUQ5YcBkXkCMkIENll6GzkbtQFZKhyJIRMAng0isjkrVZCAlTivUEIeVH2o3jDiXOXEOJ9UVoNmCGZnukiccWZ/xHwsUgv1VIJmY3LAJFZC6MIzXO9xVt9oiQ0R8gQ4WOzBVoJiXBshmR7oYj0AEbG4gm8B/AxCCEBIgdsgBoShWlgiW5zIKSqlq3Uj+58kDoXZGI/rXyk+lEZ4aMDIBNd8FFBSEfdGISLhIwI0SZsZK5IAx2pfITq0Q9jm4B8R4k9Vkv+Vz+V6guTpDoAZNVFh6TaoiNSef4habL8iIz5/LxMgApyPNo3ACBf//ycjHHCskcjL+QbX5xRFbSfnn5Q5YDMN/sQwCOqYTsKyDzIA5l3QRISws9Bjj2qX9wqSC7DF11mcp4FwKMKy6aql74JIElfxjaGU85eotVHtxoW2WvVrbtWcWxouEKF3KxfvPStfLH7iMxbsl6Gj54pLw6fIjUa95MKdXtJqWqd5dGCDSV3yZbyaOGGyI1IoEFFXUWlwsqIZWWAHRmhzEqfAHgZXwYK8BqSt1QbWCtUsG4FRdtgad5xlPQZNFmmz10rq1Z/JvsOnJCffwmGV5ud0goXva+3a/zZD785cFP3C0FnMlOvYxtbZb/ib2is7Gy2cTm4nZ91u/b5z36u2RfTryzgsRNhxss/2CKvT1koraDua9tztJSs2knycKxKt5Zny7SRZ0q1lrxl2mJbSygUB0nXF8ZLr4GTZOGKTyXp6Dn5DRDb/U/3358/bvV36EeO9//+L1uzzHXHzJiwv7Ec7OtfHTjt3sb3/Pn9SKtfNbzXfqiPUe+DhuKpLXOfjDmvm/0PtH9m/ziX4PmP3oZxmfuhN+gROHP+a/lw4xfy+tRF0qHPGKnaoA/Otf6Su0QzeaJIU3kSDxf4gOGJos3lqaItJHfxlpK7WFMpXrUblL5Q8rZ+SV7COf/OvLXy4ebdcuHKd+6hDXznnZzrTo+Nc71A/7jX//vlW+tTafnaX7tduxD9SpvzGwMgmeynAQ8Zfpdj568hj+QZeXPNfhm6EGrT6dulysj1UmnUR1JrzMfybD/kIe+8FPPOxdo6LMGD7qWSCEvouATbsI5tufu8L+VGbVB/V2HkR9J2MmDjgi9lzMqDsnznGdm0/7yc+eYn+U05vHFD/VDTjKM5H0L2Gysp+88cmz4k90d+sO2oRCKsOhNCqcPrwmohryMsvNbbEg7YmKUGDLAxDKAxrNokyVIND8irTJCwKm+hhVV+E+2bElH5LYDI8ZK58njJWHG8pMdD/f9b/FV5uMksPGTXKQtS7ldq+2q32X6yPnAv+ICFkKlerK3z3wvOb4/xr/RzToD093EqNWzsLBXmxOIdhIsMfVLmqB4ZRqWUkGydZbcSUheGQCJ6hGRH0aB6CC/QARO7ZapSIeFjglFCAkImAEImGPjYDgAST6S1uZYBJBNhnoYAkVRBQv0YQQBZivaKhD//smOjlBoykorIEkMkXb7eUrvzm3Lm/GUUwPga8PGiHD3rgEjCSFSrPaIM6kiqIrlMtSQgpAKRpxDOjVyQJ89dln1Jp6Vu9wmSKW9XQEfmfaQCUoPHrM/1lKzP9YChLdxdogt1Fw9CyBNUCDZyQCoVJFsCSF2QhjkhqYiMhRIy7sWPxQsloxd5HZUa0gUhVYXsAHxkGDbApClG03+DygMZVEECPPYDdESRGFoCDVWwWQmbeSATGVZtzMBGAxpTaVlYiBZUPwJEEib3WCMFxxBAHpbqCL+uCvVjVagfK8PqLTksLyPseuKXF2X8FxeghLwgbwBAvg4AOQYqyDHbzsqEL85Kh/UnVNXrPLMPQgF5UNg+O+eQPAsYyQI1eRYclYcHLpGMj6MaNqoBhyNFgPZJ+qULQoaAcg3JFYh0wKPyTfgpwznvjy0rnV+com5WeKNg/N62f+X15ia+y7lZ5zipO1Fzz+e03//ws3z73U9yFVWGj/CBAc7fg0dOybqNO2XN+h2y6sNtsnLtVlm1bptaXo129XosO+ubPtsrp89elTPnrsgpXAe+/+EXACR8V4p/et9DbzJv4njs3Cbtc4/nJSytf5evfifnLn4jZ89fdeyKnDt/Rc5Apc6w7tT+3dvnd/D3/e/qB1XUhtDI9Y+nMvPAfv/DT3L81Hk5igI4SbRjZ1V7DOfxcfz20s7jwQP//NdUzkmleAR8stfze/E6pH8OjF9jzeVhwcVvUG2bxlyLR85/K58fuyrbjlyRbSjgs+0I7YpsT7osO2BstyVdkb2nr8n5a7/I1R9+lcsokPNLKr6nv8Hpd0elafbl5tvgTxw/4zf49ua952XljlOyavtJWbb1pCyFLd96QlbAVsJWbTshq2FraNtPyPs7TsgHsLWfn1S2Du1HO7Wt33lCPvz8uBBurtxyWBZtPCinLgLm29+ktH+TbN/YvrkHfcBCyHtw0G/+h+tenIDYY741/sL5R7Avv/7mO4Q59YQasrKCPRpCshKoAx2Ttw6cNCAyUJ0WAJI516IeQe42JKjPVuoFqOd08u5EpYDUSsiEDoSQMAUgXeARMNIfAJLLsAyIyRCZengKDOVjpFI/OgpIBSFHSXhJ2kiJKAkIWXKohJUcIukL9JWGvd5GsZpzcu7SVcDFi5KkQCRhpDYNIg2Q1CBS5YMEhDwOBSSL29TuNkky5ekMhSPzPULtSOAICMk2BgAyujCsUDeJLghIWW6E+AEZGXqtACThI8znUkGqwjSAkNkUhPwIEBIGRSTND/UjlZBGDZmAbQzDDhggZCIL0bA1Ydj9CSCpfgxCSAUfHQCpKmIbAMn2DyCkAZDBFgCyO/IhdUMo0qufADoeVMrHKgCQhI8VoYCsOm+/DPrktEzafUnlgnzrC4ZjA0IiJJt5IceiIM2bn5+RPptOSUGGXSMMO+9MDSGfnQMIiXDsZ2C58dqTb34mYYXbqWrYrNoeAiAVINfAMVStm2wb8sKxWBKhJMNsn3q+kxw8dl7dO9ib1uA57z7/7/RlAwCpNNP7SpicUjEZvAW92aVg/5jvvNP75p+2f8n7/c+MpDq/lRAvOI7/tP754+MJ/W3/4/ff3r4y48kWe+YMp2n/aHTxPs5TnAcSanxd85a/+9js999e37nh/qVnufxC+9mN+lhyH3T/nfY/5YPq85U7cjXk+9zfffPL+rPVhwfOk+T7divX9bHd/P7eIWPvGnd7LHZMrA/8dz5gIaS9oNyGH7f/zintSf1P7j89meLUZj1CnaIBETMDMGbJhcqTsDBlqYDIVCBklIKPrIYJEPloNYlmdcxcVcXfcBJCeQEikVcnoQMhJHJDsqUSMgAhQ0GkVkVqCOlHTp545PeJQphJ+PNUPVIFyVyQUEI6AFJByBIjACKHIzR7COwleShfXynWYrx89tVxOXv5a616PHslACGDikgNIlUo9qlLKqfkgVOXpeVLCAl+tjNgY29YL4kBcMyKNmsRAMgigI+AkFGFu0kUAGRM6SHibzJXqRx9TXUINvNB6pBsgEhVmIaKSBSlgWUFhIx98SPxACZ6ABUJIVWhGkBIVTUbOSHjsY3VsxNeQMVsWn8Ayn4fS0K/DVA76mrYCU4uSKN+pAIyYK5q2DoM2xVqHaJ0DCofCR99NIRe+2ndASFRZCjv6C1Sdf5BVL8+pHI/Mvy6wnuHpPzc/dJ7/UmZ/NUlhGGfV/kggxASIHLHBXlr+1kZ9dkpKQ5w+TQUj3lnIRR71gGEYR+A+lFDyNwIx356+l6JqTZEMqEYSOQj9SQMxWRS5iilIjIZdFTrjlKXfklgjjYzfC8zconNWbJJzdx1+OQ/+Vy2x5byt0rDSgNC+LpaNqG0dr5x18031E16inEzcMCeAynPAdsntk/uYR/Ar78d/3t4/FP8Vti+sOeD9YG0fMBCSHvBsD+Y1gf+Qh/QEzStUhDphrxa92UrLeGoTJkqhHTgYzAfpM69pypdOhCSMDLyURqqW+YAUMrTQhLazpV4qOkSGIpNAAklZBBCmlBs3RolJFsqIf1IEs5lX4v3UKjmdQkrAdVjAEBSBTlCwgEgaRElACFLDFNh2VFURObvJ8/WHSMfbz8k57/+Ro5duKLCr40a0g0iD0EBeQJqSYZmtx36nmR8oq3K9agBJJWPQYvGchRyQEYWhAqy5CDxIWm4z1TCJnxsAmNrjOHYUET6QiAkAeTHCMveIB6EYrNQjRfKRy+WmR8y+6CN8vjILfL0K1vl6Ze3ypMjtsgTwz+Vx4d9Io8MQrVshHP7kffRj8IzfgBHfx8UkgmBkFhXKkjmejTh1TrPo8n1yHyPQdMw0kBIH6qb+7ogB+QrVEDuVwCS8LHyPCggASDLztovndccVQrICQjDnvjlJZm465K8tZNKyItQQmIZIdmjUYimBipoPz0L+R8Zhg0IqcOwGYp9UHLD8rx3WHxtkDwdFYmjGIKtwrBTg5CpAchk2wjOoYJ8wFNWug2YJN98x6qhOm9TWj+8drudlFkfsD5gfcD6gPUB6wPWB6wPWB+wPnAv+oCFkBZA/YUAyl5k7sWLTGrHrMOcRM4jifzTz7dGVdLyqgBIGNRkVEOG09IAkAx7JYTURiWkUUNiG0BkGKpexpToI9k7Q+3YebUGkSoUGyBSKSFTQkgThq0gJKob+mD+9mibvycRFV5TIFKrIAEhASU1hBwOCDkMNhQgElZsMADhUEmHYjWPVhkp89Zsk3NXv5HjyCXGQjUqTyShI8KzD0EBeeLcReTJ+Vp6vLJYMuXurMKvqX5kyHUMgKOCkKr4jAGQ3fEdL4oPicMJGD0Ajr4mzAHJNjmAxDrUkP5mLFiDSo1d35fYAQCQUEHGATiySI1/4CbJCcD41JitUnTqV1Jx3kGpuyxJGqw6Jg1WHpf6K45LvRXHsO2oVIeqsAIgYMmpu6XgG1/IE8M2o1L2evEDNqr8jVAzBvJAAkS6IWQQOhoAqeGjvwdAJtSPVEESQHo7vy9PDdskVd87gOrXB6UKwGOV9w5KpXkHpMzsA9J61VGVA3LyVwSQl2UyACQh5ARUx35rJ1qEY4/feU4afnACABL5HlkFWwFIKCCZCxKfkQeKyHwocvPwkJWS4bH6Ep0L4JFV2pHLMWUodioqSPhdiDISKsgwhGOng5rSl6e+7EZhEf6z1bDttT61657dZv3C+oD1AesD1gesD1gfsD5gfeBe9wELIS2EtBDS+sBf7ANGDalz4az8cKtk8JWVTDmQ1zFXFQnL6YDIEAipKw+bqsRBCJkMRgJCRiE/X1iOquKt+qokdEOBE+aDbAc1ZDsDIUPDsrUC0lFFttUh2T60vrZLACJRqKbZHAkvP04yU/2IXJBZYGFQQIYrAEkICStOEDkE7WCoIgdLZuSI9JUaIGNnrZeLyH954gLzQuqCNcz9eAzLzB354purJCxPV6gcmfeR+R67qzBswkgDJKPxWmSBbhLxXF/x1JysCs94mixQqkcNIRF27UBIgkkTlq2qY6siNUskG/ohK+BjLIrM+Advksdf/kyKTP5KKkFpWAdwr9Hak9L4g1MAkCekLqzeypNSVxnW0dZbdVLqrz4lDdfgPWtOSs2lx6TMzANS4I2d8vgQDSR9KCbjQz5HVdmaIBJgUgFIbg8Y8j1i2Qvw6GXuR4BILwCkp8v7khsAsuLsvQjDPgD140GpDMUiAWTpOfuk1oID8sauC/L2nosyGSrIKVBBToZNohoSQHIickJO+eq89PzkjORnHkgASFWIBhCSAPIZQkgAyLwIw35m0nbJUrQLYDVziSIPJMAiQ7HDUNVaFaNxckFGoDUVr5mLNAQ+qvfi7wAgM+esLun85aXji5MUgOT/7vWJhT1+O7m2PmB9wPqA9QHrA9YHrA9YH7A+YH0gNR+wENICKHvDbH3gL/aBUEjzG5LAj3p9rvwrugSgDmGPzg3phj4KBgEWpQ0hAR/xOgFkJHL2ReUEzHy4lnjqTJTErlDgOZWx2fqNGhKAUeWCbIvWMT9aP0GkgpBQQiI824fwbG+LhRJR+U3JXHy4ApAKQhYfJuGAjxHFCR+1RaIlhIxBjsiIIi9KeMHeMuTN5XLuMqqsXroiR0+jCvb5S3IRCslOoxZIhme7IcS6J9SPMIZaF0TVa6eNApCMKtRDA8jCfSWu5hQdXk3QSOgIFaS3sV72YF0DSCgksRzXdD7g6QLxt1wiiW1WqArWT762FeBxl1QA3Ku9/AQUg6elAcBjvdUaPNZZSeCorc6KE5LcamNbbagj1XaAyjoAknUBJmvhs6pAXVhy2m55bMhG5Hh8XzxdVwMwvq+qXnu53n0NjK0xrq+VOOSqjMfrz72xTSoTPsIqzYUBPlaCIrLsnP1KFfkycj2+swfgEbkgp9IIIqGInPIVFJEAke/uvShDEIZddMERgMYjkh8VsPOwAjYhJOwZKiLnHZZ8Mw5IZPkXJGM88ociBDtC5YEkfIQiMgAhHeAdqHwdCsDpg/RNBSDxd+kSKknZ+v3l4pVrxI9/8blkvy+1iY3dZv3C+oD1AesD1gesD1gfsD5gfcD6wJ3pAxZCWgBlb5qtD/wNPhAEkVSOnTl3VaoA5DzgQVg2AQ8sFEJSlQZTIJIt8j8qM0pI3Ubh71ioJgrKNQUin26GkGoUcOlMEMmcjwZC6sI0Jh8kIaQGkA6EbAP4qAwAsg2MIdotFkhU1YkAkUOhgoQBQkYoA4As5hggZGTxl1SOyJiSg1X4dFiBHtL2pdlyDBWwL1+5Il9fuyZTF2+QjHm7SXh+FKApBABZoCsMRWfYovBMFEAkLQLr4QCTcfheb9MlAI2LNXwkgIQROGog6YKRBJLNEaLdBgASKtBE5MR8eugGqbXiCJSMgI9QMjZYDWUjlus5yscAfASEJIxMC0ASQtJqwWo6Vgvvrw2lZC18VvUlR6UMCr7kHvmJxPdeK7EoDkQgSfgYhxydsVimeaDMzNZpteTo96GUenuXVCF8BHSsBAUkIWRFFKCpgOWKgJGDt5yTd/dfVdDxbQUhLwJEXpS3d19Ge0VmAE6+8dUFqbT8mAKQBeYeknzM+6jUj1oBSSVkPigkc3SdhTyQVeFLtRSA1GpH7VtaBan9LqiANEASuUgJH5X/BX0zI3wy7um6smHrYbrx33Ae3ZkTCzvhs+NifcD6gPUB6wPWB6wPWB+wPmB9wPpAaj5gIaQFUPbG2frA3+4DBDjrN+9EKHYVyZhYRYXBBkNjHQCpIKQGkEEISRjpApGEkA9TDQkQCVVlZPaKAHmdABKXiK+jDsfWSshk1bEBIQMgsg1AZHIIib/3tgYEVIrI8ZKpmFZBhhcjjCSAhPKRBgBp2kgVmj1IwpHHMR1CrtsMmQMA+Z28t/YziSvZW7LkQ97HQoCQgI8aQgI+Ajqy+jXDryMLIGQYFl1uNGDjYqgbdR5IpYB0QUgFIqGI9ChDpewWi1CEZxkK8kABiWNOgPoz/8ufINz6pIKQ9QENaQSQ9Zy2LiAiQaQCkKZNpoY0SkgDId0gsgaAZHVAwOrLj0uNFUcBKI9KBcDEAq9vl8QX1iEn5UqJRo7ObF1XSSzUj1kBRp8AGC0/ew8K0AA8AkBWRg7ISnM1eCSALDtrn/T86Li8exAAcreGjoSQ03ZfAoC8pFSQM9FO3XdJ6r9/QgoAMhaG2rEgVJAKQlL9OBMqSISN50UhmieHrpJMTzaSCIRPRyIPpBtAcjkUemv4yG0MxVbh2A6E1O/DtsdqSrrECjL89YU4f5AHEore1H5k7TY7+bI+YH3A+oD1AesD1gesD1gfsD5gfcD6gPYBCyEtgLI3ztYH/nYfIITkvw69x0k6bzlVJMRdKITQMblpJWRKCEkVZKQCR9VQeAR5JlGoJqI4CroAyHk7OIpHRxEZCM12KyGTQUgflJBUFXpbLxYPWk/z+RJZ+S3JQgBZlNDRKCFdEBJAUikiCSKLDZSIov0l/Ln+0rDHVMlRqpdkyA3FY6HegI4AkPmDEJLgMRIgMjI/FJCw6LIvq5DrOKV6XAAYSfUjVJDM9ahAJBSQhI+NdDh2fKulAI+AjwB+CZ1WSGInQEgcc6FXP5UmaxF+DfDIojMNABrrr0LhGSohsZyq/SkIeQzw8ZhUA4isuvyoVFl2BEAySWqsPCZVFh+W56d/JY8P3ygxHZaKB/uV5+XNUnkx8j7CKs1HSwAJUMgwbALIMjP3S+uVR+SdA1dUHkiqHqcp0wByKsKwZwBAzgSAbLHupBQCfCwCKwwVZEFHCamqYgNC5kF49rPjNkpE/laSJQHVsB+tk0IFqYGkUT0GW1OVXRVJIoSkQhdFkyIerSH3+ytIucZD5Nr3P//t54+d0NhJrfUB6wPWB6wPWB+wPmB9wPqA9QHrA3eDD1gIaQGUvYG2PnBH+AAh5InTl6VQhY7yYHwlCUPF4oAaMhUIGQolHTUkIJGGkFoNqVSROSujeEg1yVrnLfF1WSVehmUDOvpMaHYKFWSoEtLXGuHYUEF6W9EAItkyNLvKBBQ4GQKl42CYo4B0tayWHVlskEQVBYR8Dvkhnxsg/3myq2TO00MiC/cBgETOR4JGhmADPlIFqcKvHQAZ9fwIwMX5EtdkCYwAEqBRQUgCx2AotlJColo21ZuJnVZJIkKg41kZnAAS6wk43kJjtkiTD09LQ0JImFJDoqUS0g0g66AITSA35Aosu0CkVkIyL+SJkHBshmUTQBoIqUAkKmpXhVVZmgQ7otSRNZYclkKvb5ESk7+QGqjCXXkxwOPCw1IZlbcrzT8sFQEhKwJGlkEBmSZLD8lEFKGZhlDrqXsuq9BrQsipsCkIwZ6OdgbyQHbdfFbyv3dEnoMVQdGZ5+YdEoZj50c4toKQyAuZb+qXElOmh2SOryhRj9XTABK5ICOTKWtThmBr6MjtRiWp0gQARqZHNWxPnqaydVcS3daqIO019I64ht4Nk067j/bmyPqA9QHrA9YHrA9YH7A+cG/7gIWQ9ubJ3jxZH/ibfYC59LQR6Ozad1zi8zeWjAibjUDYrAGRWq3GXH7JVJEqZBbqNYZlY5kqSG1QrD1cFX8PIJmjsmR6pL7E1pkgPkA6LwrO+NsiPyQVkICRIYVpAPMC4dgAkISQPgUgNYSMa7lIaB5Y1lpTJQuK1WgISSBJI5AcrK3oIIksMkAiASEjCr8gUVBDRhXqi2I0vZQKkkpIwkcqIAkgI/J3lrB8CMEuNUK8DeZJbGN8F5WODMfmMuBjHArTsGUuyDjmhGyxBAV2oHrsslriAVkTOgM+wuKVAUgiLLvw2M+kyTpCSKggHQipwrGxHAohXSHZqQDIWqkCSEJIhGMDRDIku9oy2lFlVQEhKy8xdgQqSSgj8XrlxUek8qLDKGiDFsVkKi0AkASMLAOA2BrVuicDQL4DlSOh49uAjqoYDdSPGkAiJBtgssX601LgvSQpDCuiQrGPKEUkw7ELzD6gQrILQAkZV/UlyZJYWaIfry/hj9WFn+iCNFTShvoSfYjbTKtfDxSsgQKSMDITqrfHPtNIFq7eJr+ra4cNw7YTyXt7ImnH346/9QHrA9YHrA9YH7A+YH3A+sCN+oCFkBZA/c0Ayp6sN3qy/rPfZ0AkaCT+TZn9vjzgKysRjxNCBhVpChJRwRawYOhsUMmmc/hFAD5qYyESAKSECpLliUYS22SWeJCT0EcAqUCkAyOdqtgEkApCugAkIaQPlaa9LVEYBkYA6YEq0ttygcTUnCxZSiBHJBWRyAkZBuNyBABkhKOCjHjuBUDI/hIBABmBMOwIVMSOhBJShV4rAAkImR85IPN0Qhj3IPHWmwnouAAQkkpIDR1jAR5pGkSipSoS+xSP4jMJDoBUEBIgMr4LICQsgct4/blxW0MhJFWQjtV1gci0ckJq9WNKBaRWQQJCAi7SVF5IQMbqhJBLaVRCwhwQWWkJgCNMQ0i0qKpdCRCyIhSRZaCEbLD8iEzafUFmHqACEuZUw56ClpWwp6EgDStht/v4tORzA0j8LUOyC8IKEUIirLvIouOSve00yZKjpkQ/CgXkYwjDhrqWFbHpRykhZHIoyTyRTuXsXPTBKpIFUPs/3jLywssz5OdfflO++s8+L+312Y6v9QHrA9YHrA9YH7A+YH3A+oD1AesDt84HLIS0ENJCSOsDd4APBCEkL/Dfff+T1G41RP4V/byEQbkWltOASAOGDIi8HoR0w8iqEon8kBHx5SQ8TzvxA9552q9MBiEJJTWA9DMPpKOANADSB/hI0yCSEJIQEEpEVKKmIjKMVbMJIqGEDC/qQMgiOhRbQ8h+AJF9UoGQVEB2kfC8HSWiSH/x1pmOIjOAjASQAJGEjTQNIHWBGlWkhgpIAsiuawActQoyHipPBR4VhOQytl8PQqYIxw6tjk34yJBsE4JtitFQ+RgwFqOB6cI0BJBBI4ikGtKAyCoGQC4GfFwEheQiKiKTpNyCJGmIzxyPKtcz9lPpqAvQsAr2ZADISQSQXxJAXpLOG09JQQUgjyL8msVooIBEOHZBtAWR/7HAbIRlLzoqj/SaI5mfaIC8oISPUECyGI1SQQaVkAzJNrlFQ1WRRgVpUgJUR3qAavKAv7w8WaSFHDtx0QJIe928A66bt24yaCfWti+tD1gfsD5gfcD6gPUB6wPWB/4KH7AQ0t5I2Rsp6wN3iA+A66iwbK2G3HvghCTkbyL/iSsvYblqoVgNQKRSpGkQmbYa0sBH00IRmQtqSEDIKFhYQkWJLNoXOSHXID8kQSThI8wpSKOVkISQUD9SAemoIIMA0lFDogq1J2ALJbr6JAkrOSwQih2eQglpIGQvpYSMcJSQBJAR+TqpbXG1p+m8j4SPynTINaGjVkISQi6WWABIH+CinwCyKwHk6oAa0q2K5HY/CvIUeQ1KSJUT0gnHTqaCDFFAAkyqdQc+EkAmV0IGACRhpBtCugAkYWS1pbTkIBIAEhCyIgBkRbTlFh6Vpu+flLf2XAkBkG+jIvYUQsgvoYiEvYMQ7a4bTkl+qh3nIQwbOSBZDVsrIAEfCSCxXnjBcXl61DrJBNVrJPwmCiHYqho280AqEKnVkAo+OhAyFEC6wrGVErIG/K+aZIQPRT1STWbM/0gByN9/t5OUv2KSYr/D+pn1AesD1gesD1gfsD5gfcD6gPWBf44PWAhpAdQdAqD+OSeVvUDe7Fg6eSEVg9QgcsnqLZIF8Cd9YlWAoJqOURVplJBsk6shDXw0rc4NqfJDEkSiUA1Ds7OWfEHi27NQDUEkFZAEkUYJiRZKSH+qEBL5GAkfGZKtIORCiW0OaIhiNZE1EJpdbBggZ1pKyGA4NiFkBIrQEECGITdktsrjVdXrWBagAYDUakg3hAR8VAASikwHQPoBIP1dGX6tQaQbRvpVWLaGkEVf2yZN151SVbFVTkgDIR0l5K2BkFRDwpbRtBqS+SGruiBkZVeOSALIMgjHbrbmhEzYe1lVwp4KpSPzPaqCNICQkwEhp0IBOW33eenw8UnJj5yRhQgfWYTGaQsZBSQgZMFFx+TZ1zZKluegKs1ZEwCyjkQ+RuUjFI8IxabpcGwsE0qmyAupFZB8P3NBRjys4XeWR2tKuvjy0mfYu1oB+bvNA2mvczd7nbN/Z33H+oD1AesD1gesD1gfsD5gfeDe9QELIS2EtBDS+sAd4gOhIdmkPT//8r8yfNw8+VdMGVS4diAkACSBpAaRyQGkWTcA0rQoTgOYGYmcflRFRqFQTXj2ShJbboT4Oq6GKtIASLStCSCXpRqObXJCEkJ6neI0nhYAhbDYFvMlttl8ia76FnJDDkFF7OQ5IamEJISkErKHhAM8hhNA5ussWSuOFZ8qOMMq2LoSts4FqfNBKvWjAyBZ3Tu+2xrxdyOADMJHAyKNEpIQ0g84SSVkcULID10QEvCROSFNURo3hKyN14z60bTJC9XL9dEAAEAASURBVNKkroRMA0KyUrYTkq0gJJaphCyLXJDN15yUifuuyjv7UXxm7xV5m7Yb+R8dFaQGkBek3yenJN/cA6rydRGASFrhuQehgtRQsuCcw1IAisq8k3dIeIlukjl7NRSiqecASEcBeRMQUuWEhHryAW95qdBgoFz95sc75Fy5dyctdsJqx976gPUB6wPWB6wPWB+wPmB9wPrA3esDFkJaAGVvqq0P3LE+QBD5zbUfpHStfnJftnJQRUKZRnsYBWscEKmLh6SmiCSQNBCSrSlUw/DsalBEVkKuySqSrdo4ie/oFKppDQjZigAS1korIYNqSJ0TUueG1BCSIFLBSEBIBSORIzKu2TyAyAkSUXIEcjwOVNWxVU5IVMZWELJwbwlHYZowqCAzE0BWGiN+5JWMawb42BR5IJ3q155myAXpWGyzJajIjRDs9iiiA/DoowKSgJHmWlah2WodxwMI6euyRkHW4q9tl6ZrCSERjk0A6SggCSEJIBV4dLeBEOzjogHkCWERmkAhGndOSCwrBaTKCxlcrsZK2TRCSFgVKCKZG5LVsstDAdnl4zPyNuDjO/sAIPdc1YZq2FNgk5EDkgDybSggu2w4jnyPh4RVr4sAPBaZc1CegxWeBwOMLAhFZMGFxyXfhK0Ihe8s4TlqSMwTKETzKFSQAIhaAQn/gJqRdj31ow7LNnkgAS8Ryv2Ar6KUqNZbjp+8RHe8Y88VOxG7eydiduzs2FkfsD5gfcD6gPUB6wPWB6wP3Cs+YCGkBVD2ptr6wB3tAwQ/u/aelJwFmkn67NWhgKyjQWQKCHkjINJASVTLJqDMgYrHjzYST62J4kdYtpch2A6A1BDSHZLthpCmQA1bAyJ1iDbDsrM1mSex9d+RyLKjJbwQKmMXeRHKyP4SDiVkOKpjhxXoIZnzdpLosiMAIBHKDQjpAYQ00DHQNgeIbI48kACi3nYAo4COPoRfEzCmgJAOjFR5IBWAxHsdCFlsHCDkB4CQAIYaQp4MUUEGIKQrD6SBj2xrBsxVkMaAyGTwkUCymsuqqpBsHZZdGSCyAorGNHv/lEzae1WmAUBOAYBUtpvLVwAg0QJAToUasgtCsAvPOSD5Zx8CeISpFhASMJIgUsHI+VBBztwPmIv+zVkLALKBRD6u80CaEGwVhk0AeV0I6YRqO6H+4Shiky6hqiQUbCOfbj9ENxSbB9JODu+VyaE9Tuvr1gesD1gfsD5gfcD6gPUB6wO3wwcshLQA6o4GULfD6e1n3g0XUxOaTfDzuwJAqz7cITG5KkoW5OkLRz4/rYA0+SGpekwLQqYVog0I+UgNhGajWM3jAJH1p6n8kB4APx8VkS21GjJQnKYVICTNqZCtFJEtnHW0JkRbQUm8z9MK6sbGsySq7KsS9hxAZABC9pEs+bpJZImB4msyR1XbpopSKR+piCR0NIbPjWsJAInCOV6EVfs60xyVo2oJGl2qyMAy3tMZr3VG8Z0Oq6ToWA0h6wMc1ofi0SghTRi2OwQ7LfiYthLyBCpln5Dq+Gw3fORyVdqyEwjHPi5VACMrLDkmDVeflHG7dPj1JADIybuvyiQAyEkAkBMJIlGEZtrei9JtwwkpBPBIBaQGjgd0awAkwrOfW3BYigJGxtUZKeEItyaAjCKAdIrRBCGkAyCTQciUqkj6CgA18kFmyVVdsuSsLjMXbWS9JHudtL+V1gesD1gfsD5gfcD6gPUB6wPWB6wPWB/4L33AQsj/sgMt0LobgJbdx7vXTzX8IYjEqSrD3pgn6WPLIRwbasgAiDT5IU1roGNqLZWQZruGkJEKRFaWiCcbib/hdCgOVwMgIi8kw7IJJE1xGgdA6nDsUFWkjxDSUUQaCKlbhFADMGarNgG5CodACdkPuSB7IRy7j3jrvaMBJFWQUDx6mhE+OspHQEgPKmDH4XM9UGcyDyQhpNdASALI60BIKiW9eN0LEOlB8Z3nxiAn5AcnRUFIAMMQCIl1AyHdADK5AjI0FFuDR8JHDSAdCJkMRBJCVgOErIZiNRWWnUTo9yl5+XOoHQEfJwI+Tv7KAZCAj1yfilDst/ehCvbGkyhAAwBJ5eNshGDDlOqR6ke1jtDs9w5LceSV9DYaLWEoPsMQ7EiVB5LFaNyh2MwJSdMg0oRlq9ZdmAYQO5LqWFRgzwIfecBTToaMnou8pITg9hpy915D7NjZsbM+YH3A+oD1AesD1gesD1gfsD5wp/iAhZAWQlqSb33grvABgqCff/lNOg+aIvfHAUQiXNbkgwwHNDLLQchoYON1WgBI/q36GxarebqF+BvNRe5FQD4FIgkhYczHSBgJFWQKAygkhOR2gkdfAEZyHRARFt8af9toFvJEDgWE7C1xlccCcvI1hHITQDqmFJAEjwCQHiggPfhOLyp3e5EL0ttxhfg6EUQ6ANIFIVWYNkO1HSUkASUBpBdKyDgcS2FAyCbvuyAk4KHKB4m2DiGkY2lDSJ0TUhekcQDk8iCIrI6/V0pIQkjHqqKtopSQx6USQGR1AMgh26h4vCoTEHI9iQASLdWPE7E8FcvvoDp2h49OSj6ARgLIwoSPyg4gLBs5ILlMEIk8kMVQiObhbjMkE0AiAWT0E3UdFaSuiB1UQd4ohKQfINwfn/eAp7yUqtZTLl3+Tqlw75QfbLsfdvJofcD6gPUB6wPWB6wPWB+wPmB94P9n777jLKvrw///+0tio24BhW30ZoGFpWni14LSFhZYqiJFEIwl+T7Ur8Zoil81iSXfr0aNRkFpAiqCEutXY0nsJkYUwULvvbPr5/d+f849d+7MziyL3gN7dp8kx3PnzsydmXueU/Z1Pp/zYaDPBkRIAaoXAarP32Q+9zH9khhMy77tjnvKYSe/rfzR/IPq4iOj07Lz9hpFyIiP9e1yPxIi52x9QJm728llq5ecXRa8IhZ1iQC5MGJgbhkiF2aMnBoiBwEy42O7NaMiB6MjIzZmjFxw6kUxPfvssvmyD8Y07HPrffNjlGSNkBkecxRk7uNj5DY/PnaOgpwXEXJejoR85SBCRoisoyBrhIwgmfGxDZIRHvNakc0oyM+XefHylnGty33f1UTIYyMWHhPb0bGtcYSM2Hj4YDtsJDyO3m4iZIx4HA2Q8TEOibc/6JKrY39tedO/39yMgPzPJjpmhMz4+E//2QTIj0aA/LNvXlcWR3zc86yJALnvWU183HcQJXMxmufGKMidXn9O2TCmXm8eU683iwg5d5flZW6MiGy3VSNkMxpyxpGQMf06LWyw6MCy894vK9/9getA+tk1pp9d/s7wdwYDDDDAAAMMMMAAA9WACAmCHwYM9MpADk275ba7yx4H/Fn5w4UZIkdHRK5hhMzRj4MA2UTLJkDV1bS3ObDMefpLy6IYubjgtAh/p3x6EB8zQE4TIadGydGXcwr3IELOz32OiMzp1RkZT4pRkHXUYy5ok/GxCZAZH+vb5NtFuKwjIfOakIMQOT9HQ9YRkYNRkbkITUbIkS0j5Ly6XVq2eOXnyj7v+l6MhMyFaSYiZI6AHB0FmaMhR0dC1sVoRgJkhsgaHkf38T5tgMz9obEdktGx7q8qB198daycfXV5cwTIXHzmgxEcMzzm/gO5/fj28i8xAvIDcT3Il33p6rI4guOeGR1j2+cTsZ3187LP2TEKMkZA1i0WqXleLESzzSkfKBvG6tfDABnTr9v42Ozb0Y+j+ynTsevxTy85jT887HRY2Wjbg8oWzziyfOu7PzMC0s/FXv1cFIwFYwYYYIABBhhggIE+GBAh/UPLP7QY6J2BLETf+M7Pyk7PObFsuG1MqW6vD5nX+KtTswcjHdup1qvb1xgVETKvB7hjbNvHwiQxInL24lPL/ONzRGRcGzIC4cLRuPj73M4wOXj/HCE5sTWjHzNA5qjJBafGNOzccjr2aREhc4vRkDkte6YI2U7Vnhoh93731AiZ12d8hAi5ugAZkXHiepBXD68LeWgEyGa7KqZiR4T87DXldf92Q7P4TMTHDI81RGaA/NHt5WNx3/v+69ZyxKW/KbtGeNwjRjvukwEy4+MnYov9vrHllOxcpOZ/xAjIHU7757LRTkeXzeP6j5s9/Zg6BXuzGiGPiBCZW46GHI2P7e2MkLkCdhhpt8HI2Vmx0vqmYWTDrQ8u/3LOV2qAbK5D6g+ZPvwh43PklAEGGGCAAQYYYICBfhgQIQWo3gUoP1z68cOl6+OUpeiMC75SNtt+aYxkW14XFGlHtQ2v81jjYzParVk9u4mUq0zZzhCZEbJeEzD3h5ZNtz6wzNr9lWXhSz8RU6MjHMbU6YUxerENiFPDZEbK1YbKkfg4OqKyRsi89mMGybzuZI6ArCEyI+RgNORIjKxTsyNEzssYGaMdp98+N3kk5Lu/P3kk5OeuHk7HXh7hMLfRUZB1UZo1iJDNKMgY7RjvvyweM0dBZoTM/UGxEM1JX7w2wmMsRJPXfhyMfPyniI8f/NFtMQLy1vJ3P7y5vPjiX5dnnXVFXAfyirJX7Pf6RCxIEyFy70GIfHZGyBgB+SfnRYB81UfKJjseWZ6607Fl82c0K2HP3SVGQdap2G2EbParTseeEiEHIyBnxUI0m0aE/P+eul95699/ojzwwMN+Jvq9yAADDDDAAAMMMMAAAwx0YECE7OBJ7Tq+eHwRjoHflhyptnLlb8s73ndumb3N/iVHs83eKRYWmW7U48jU2yZGjo6UbOJjGyEzQM6qQfKQMium587a/bRYgTmmZmconBIhJ4Lkp2qAbCLkRKhsw+Rq42SOisz4mFsdATkYCZkjIPPluo/RmHVEZFwf8rS4P0ZE1gg5Mi07R0fOi9WzmyjZ3M4p2Vu+Mhamec8PyvFfjOnYMfrxmNiOrhEyRkNGLGwj5CrTsaeLkDkCMu6voyBjvyy3eIzcDrnkmgiQ19T90piCfdylV5V/+H5Mw46FZzJEvj/C4/t/HDHyx7fGIjS3xjUiry/PjanVz4rrP+55TgbI2A+uB7lX7PfKEZE5Ffu8yyNAXl62e8UHy8Yx4vGpO8Y1IHMUZFwPsgbIwcjHZhTkRIiciJDNNOy6OnaMgMzV0JsIfWiNzptst6yuhP2Gt51Z7rrngUjbfr74+cIAAwwwwAADDDDAAAMMdGFAhBQh1X0GemmgjZA5IvLP3/r+8kebP6/MiSA1eTp2Tr2N6DRp+u3U0ZBTI+RgRGTEyDnbH1Jmx4jIObufEiEyRkSeEgEwo+FwMZp2avVEhBwNj2tyu46ojAC5MCPkcCr25OnYGSdzava82M97RWwRIue98uIy71U5GrK5RuS8NkLmPu7PINlEyFiYJiLky2JUYkbIDJDDCBm3R0PkERET2xGR7WI07X40PmaEnLgWZI5+zPh4bd2WXnJdPOY15W3fuSWmYd/RjIDMAPnDiJGxffA/bymviwVolsQq17vGdR/3jGnWe+YIyNhyv6SGyLwdITLi5N5nX1a2fc1HYwr28rJZbhEg5w4DZITIGiGbKdijIbJGx51GAmTezgiZkTqm3Gd03jT2f/jU55fnHPTn5Yab70pKvfxe6OKPA4/pj04GGGCAAQYYYIABBhgYtwERUoDyj24GemugvW7f7bffU/Y76nXlD7Z4Qb3uX46GHI6IrCPfMjxOt7Wj4nI/ESObkZAxIjJjVWyzYrGaHBE575gzm6nSESEX1tWw2wjZTMVek+g46W0G8TED5MIIkAsjMi6M2JhbXhOyvS5kMxoyF6kZiZCnRxCtU7IzOk7dmgi55WAk5LPf+8NY+CUj5NUxEjIj5DUxHTuvC9ls7WjIJkJmiLx6uCL2pAiZoyDr6MfJEXLZYBTk0s9dF3HyuvLGb91UA+SH8hqQsfhMxscP/ejW8r4f3VJO/+rVZY+zflZ2/fjPamjcM0LkkhwFGVvu94gQuUfePjdCZLxu4SnvL0/a7vCy2Y4RGofxMReiGV2MZmIEZBsip4+Qh0WEjOMcK2FvGtuT5r2oLH7eqeUb32sWolnpZ0FvfxaM+48jj+cPbgYYYIABBhhggAEGxm9AhPSPTv/oZKD3BnIE24233FmOf9Xflz9auH+MfDyiRsiJGPlIAXJyhGyCZI6Wa0bMzdkhpmbHlO/ZuxxbFhz1kYiDMQKxRsicet1Mv8642F4ncjQ0tve1++Hr4hqRNT7mPlbNrluNkBEiY+p1jZG5j61O044AuSC29jqROSJyywiRW7YL1eTox5Fty7i9ZcbJWB37Of8YEfIr15VjPx8R8vPXlKNjOyq2YYSMGNlcF7IJkPWakDHacboAORohJxaiubosjbB5UIyG/PNv3BRTsG8vH4ntQz++o3zoB3E7pmP//fdvKodf8svyrI//tCw+86dx7cefxfbzGAH584iPuSp2jIL8RBMg9/jkr8pe8TabHfH28pRtDy1zd8jgeFQNzHNjNGQTGnM/dRvEyFiAZjRCzo5RkM1o2IzTESEjTD9l/n5lyQtPLz+78vrk0/vvAX8gjf8PJM+p55QBBhhggAEGGGCAgfEaECEFKP/4ZmCdMJAh6Yab7yx77f+q8oSFB5bZsULyrJh+O6sdAZlTstvbw/3oSMjpQmSOjowQGatmZ4icvc0BZc4zXlrmHfmhiIGfKfNOjsVqhjFy1VGRGR6n2xbWAJkRcrCNRsiIi3VEZBsgM0IOA2RclzI+bv3YESy3yBCZU7MHC9XU60QObmecnPenESFP/3xEyB9FhLy+HBcR8tiRCHlUhMMjY1s+iJCjIbINkLmvU7FH9qML0hwasXJpvP+BMXryFV+9vnwgVrw+479vLx/+r5iKHYvQfCiuA/nWf7+xHPjpX5XdPn5ZWRzbXnVrIuSeESMzQi6JBWmW5CjI835Zlpx5WXnq8neUDWLRmDmxEE0NkBGW8zqPcydtESEzStYwmUFyhghZp+PH8Y3Rj3N2OqxsFCNbt1p8bPn2D65MNmVFXF/UHxfj/ePC8+n5ZIABBhhggAEGGGCAgakGREgByj++GVhnDGRQ+uZ3f152ec5JZcMYQTc74lSNkDVCZYTM0NjGyKkBcjURchAiZ0eInLPdgWXjXY4r8476cIxQzFWtm+tBNrExrusY4bEZ7Tj9dSKHr28D5NSRkBkhZ9iaa0PGx4zXt1Oz58doyOFiNbFgTU7RnoiS00fI4WjIQYTMEZFTp2QfPpiSPQyQuShNXguyTscerIgdb3NovO/S2Od07w/E9R7P/fnt5WMRId//w1vK/43Vr1/7bzeU515wRcTHiI0RHPeMfY2QORKyTsmOkZCDKdkZIBd/+Mdl80P/pmy8fcTHCJCzY5sTx7FZaKa5xuPkEDkSJjNCDiLlxEjII5pRkIPjvtG2B5enPv2IcvEXf5BcyooVK9YZ/1N/wXvZH30MMMAAAwwwwAADDDCwNhkQIQUo/wBnYJ0ykGHpa9+9rOy0z/Fl422W1Sg1JwPUMES2EbLdj8bIietCDq8RGaMgJ93Oa0xud3DZZOcYEXnY+2JUYkTADI/tYjUnxdTqYYhsg+TEfpUIeUq8bupIyBkj5MRIyHY0ZF2oJkZLzj8tFqo5/eK6cvb8XLQmV9COqdhbnv658uyYjn1CHQkZK2THSMhjPn/tcEp2MxoyIuSkEBlTsQfTsVeJkBEc2xWx63TsCJnHf+Hq8s7v31jO/vlt5Z//67bynlgV++3fu6m88mvXln3i2o67x7TrHPGYU7CbCDnYfyJGRZ4Z98eU7D0/eUXZ9aP/VeYe+KYyK1as3nynoyM8HhUhOUNkRsjRRWamGxU5ESAzRDZvnwGy2WbFfoNt43EjIF/4+e+UvP7jypUC5Nr0B4nPxR/IDDDAAAMMMMAAAwys2wZESAFqnQpQfmCt2z+w1uT45mI1+d9Xv/1fZdvdjywbRXjKawfWEZBtiMx9HRk3GiBHb4+Ex3oNwZGXYzrvnAiRc2PBmk13PKpsuewfY+RixL9c3TqnX0eErPu8XUdJ5ojIZmteHgTJdiTkpAj5mbJoJECO3s7RkfXakIPp2O1oyGYfETJCZB0RWUNkRsgmRG552iUlF6Y5IaZKvyQC5HHTRsiJKdmjq2MPA2Q7FXsQIDM+5mI0yyJcHn3p1eVN345p2D+5pbzrBzeVv/nOzeVN/3FzOT5GRv7xubHgzNl53ccmQNbrQOZIyIiPGSVrkMwQeX4EyA99v2y+7G31mo2b73zMRIDMUZB1KvZohGxvT8TIZqRkGyLb18c+o3EEzA22XVo23e7QcsFnv119/NYUbD/7/f5ngAEGGGCAAQYYYICBx9SACAncYwpuTSKStxESf18DbYj8+IVfLnO2PahsHCEyI9Wka0TW0ZGj4bG9PRIcR1bMzsVM6hYRMkdV5ujKudstrY+55UF/VxaedmmEyJhKXSNkLFbTjoycFCCnTNEehshmYZpFERgXxbUeMz62W52aHffl1O82QtZp4DVGTixUUyNkvN/8uEZkTtGenzHy9Fic5tSLy7Pf84Ny4iNEyDolO6Jis0J2MxJyUoTMqdgRHw/LlbBj9OOhsc/FbU776nXlr797U3nbf9xY3vztG8trvn1TxMmryr4RIPc55/Kyd0TIvXMBmro14bENkEsiSO597pXlmf/4zTLngDdHJDwsRioeE9H46GYEZA2QgwiZz3m7TTMqso2Qua8jIYdve0TZKEaubhTT89/6rvPj+o/NIjQrf+s6kL/v95n397OaAQYYYIABBhhggAEGHo0BEVKEFCEZWMcMZGRqQlMOefvkxV8rm+18aNlwm7ieY4yInLVDrpzdjoTMfRsfp+7bGDm4v42QdR+vi32NYtsfUjaNUXZPff5by9anRCw85eIIkIMFazJEntSuoN3s66jIuG9hbu207YiRi2JKdhMhV90vjOA43dZGyfnxvpOvFzkYFRlTtLd8+WfLs9/1vXLS/4uRkJdeW7djY3/0paOrZE8sULO6CJlRsobIiJV5XcnTI2y+Pq75+JffvK689Ts3xuI315bnX3hljY/PPvfnZd9zflb2yQg5MhIyRz/mtuTsy8o+511Rdnjjp8ome7w8rrV5RA2QOQW7uQZkjF6NoNhOpx4GyDYutvtJQTJHQMboyHhdDcU7H142ieOz+S5Hlo+e9/VhgHw0vyS9rT+qGGCAAQYYYIABBhhggIHxGBAhBah1LECN5xvDD5i+P491xm0z7Ta+x8///LcjTh0ei9XECtc5InIQImfNGCDbIJkhcroIGfeNRMk5EbpmbXNw2Xyf15StTjg/QmSMSIwQmdOvc2r2/LqNxMgMk8MQGTFyMCJyugg5OT7GVO5BkGxGRmZ8jECZU7jraMlmyvb8uJ0jI/M6kU2E/H45+WuTI+QxUyLk8sEq2aMRcurK2Msu/k1dnOaYWGX7lXGNyTfEY74lAuSb/v2Gcuy/xujHuK7jPjECct9zMkC2ETJD5GUxGjJGPdap2M1q2PtGpNzu1WeUjXd7WYwqXV422+XYZhXsuAbkqhEyR0E2cXFqjMyp1nUbhMd67c+IzHMiQG66/dIIkEeUcz79jRogI037eed3HgMMMMAAAwwwwAADDDDwOBkQIR+nJ17kEgMYeGwMZImMb/Py4fO+VLZ4xvKyYVwXMBcpaUPkMDK2sXGm/Uh0bEZBtiFyECojRM7e5sAye9cTytbHfywC4GciADYhsomQeY3IHBk5GB05CJHtSMk6KrIdEZmjIgdbjY5xe2FeO/LUXMQm3n9wHckFdQRkO0pyECDjvnm5DULklidfVPb9h5kj5NGxSM2Rg1WyM0QeUadkDxamGayI3cTI38QoyN+UI2M77cvXlTd+PQPkDeU1X7+u7H/Rr8uesQDNXudeHhEytgiQw+3siI8xErJGyFycJl6/95n/XRYe9w+xuE+Ex7iu5txYhCanYM8ZCZA5ojFHQWZ8HN3XEY6jwTEjZH053q6OcG1GqG4cU7AzQJ5/8bcjQObUa9Ov/cx5bH7meJ49zwwwwAADDDDAAAMMTG9AhBQhnQFgYD0wEAEqYuQZF3y1PHWXw+MagREQ64jIwyJGDkY6Dq//2L48zX5KiKyjIQfvN2uHjJvLYmXng8qmT4+Vs5d/oF6TcV4sWDM/guMwRE4XITNI5rUjhxEypmfHCMcMkcOVs2t4bCJkGyJrjMyRkPl2ORIy9jk1e368bYbI+afEtOyTMkJ+L0ZC3lBe+q8T07HrSMg6GjIiZEytzhCZK2Q3EfLqWB07r/94Vckp2BkhD49RkMtje/m/XlPeFFOw3/TN68sJX7y27HvelWXx2b+IuPiLsndeAzIjY0bIGOm4d52O/bOyb0bIuL13jJRc8sHvlgWH/22MUjwipskfF/ExFqHZOadg5wjI3JrFZppp1RMRsgmNg2nWoxFyGCAzQua2vF7/cW6MhPzEhTECckX+8ltZV8P2h8D0fwh4XjwvDDDAAAMMMMAAAwww8FgYECEFqPUgQPlh8lj8MOnDx8hRkR8469Ly1J0OLRtvvTRG4cWIyFjlelYNiaNBsg2QEb2GkTLuG0bI5pqQzcs5EjLiY2ybZojcPl7OxXAihj3tgLeX+adGCMwgWEc+Th4NWa8LGffnvk7PjhC5aBAiF0a8zLjYhMiIj4Mp2wteHm8bt3ObH7fnD2/ny7nFx4r9vLwd7z8vFsrZ9++/O4iQ19QQeVxcE/LYDJCDLReYaSPkaIhsI2QNkZ/9TTnx0t+UN8TIxz//xvXlkIt/XZacc0VZfM6VZUkEyD3PvrzsGREyRzo2W0bImJIdIyGfHQHyOef/ouz2nq+XzV7whrLpNrkAzXFlTkzBnh0BcnbEx9xyGna9DuRgFGR7PcjJ+wyROTpy6gjIZnTrU7Y6pGy49aHlI+d8NUZA5ve+EZB9+N70Ofo9xQADDDDAAAMMMMDAum9AhBQhRUgG1g8DdUpujocs5UNnXlyetuNBZaOtDo7wldcObCJiGyMnwuNMETIjZRMfJ/aHRhjLoHloXOMwbm97YNlkm1iw5kXviAVoclRijFTM6dh5ncg6GjKmaucCNpO2XKymiZI5PXtRbhkjIyi2WxMhM0Tm6MqJfd5uImQTJ2uEjPedd+Jnyj4RIU+qIyGvKS+J0ZDHxZYRcvJ1Ia+uIyEzQi6PUZB5bcjDByMhD/vsVeUln/tN+fOvX1v+NK4D+YILfll2i9GPe5zziwiR7ZYRMlbBjhGQe+U+tn0iPj77gl+U53zyF+WZf3VxmbXPq+I5ObxsHiMgZ9cRkBkf2wgZq2DX+DgSF9tRjsPgOPl1czIKRySeVfdHxOJDS+tjvP0958UIyGZxopW+v9eP72/H2XFmgAEGGGCAAQYYYGCtNyBCQrrWI3U2ZN0/G/KYHuMYHZf/XfSv3yyLnh6rZi86oI5wzBGMEzEy41YGyKlbE70mIuXUEJkvR4AcbHNiYZRNt47rRO7xp2X+sWdGiLwkRiZGfDzxwjI/ttxniJzYIiqemNsgTtZ9jI6MGNmspj2IlDkasgbIZkRkEzcjPuZ98ba5nzcYJTnvhE+Xvf/uO+Wkr99Qjv9CjIT8QkzJriHymikh8uqYlh1bRMgjI0DWEHlxhMiLrirHf+6q8sqIj0d+/jcxuvEXZfFZl5c9YluS+xgBuUeMgNwjouOS2GqIjJf3jBj57E9dUXZ//7fL0454Z9kwouOsHY4sc2P045y4/uNofJy9Y4yAHFz7cfIoxzY6rrqfk4vP1FGqh8c1JWMK9tYHl6c+/ejyqS/8qE69T1Mr60hI3z+P6feX36l+pzLAAAMMMMAAAwwwwMAMBkTIGZ4Y/2jzD3cG1m0DbYjcfIeDywY1RB4eU6ljVF0dFTlThMwoORoip4uQk0Pk7O2WllkRImdFhHvawe+u06Xn5ajFQYys0XEYIiMi5vTsNkRmhGyDZLxNe7tZdbsJjm2AbONjHRGZETI/RgTJeSd8KiLkfzQR8ouDCBkh8ri4tuPU0ZBHZYAcRMgcCbk8pmAff+nV5eQvX1v2//Qvy+JP/LzsFtseZzVbjZARIncfhMglOSU7pmYvOS+mYV/4i7Lr332xbLTktJgeHc/Z9jHScZdjJk2/nt1Ov54UIEenWq8aH4excrAITS4ytMGig8r8XY8rF3zuezUwr4xRr0ZArtvfv34+O74MMMAAAwwwwAADDPTPgAgpQir0DKyXBrJW5S+ti7743bLjvieWDbY6KKb15tTsDJHt9SEzOk7dBhFyMBV4IkpGfIyFaSamZ7cxMveHlDk5PXu7Q8pmz3tzmf+yc5prNp54QTMaMkJjXSU7pmnXVbIH14ms0bENkfVtm7dvRkU215fMt29D5GiAzAg5L163ZUTIvSJCnpgjIVcTIY+OhWkyQtYQGQHyyFiM5qU5ZTtGR/5xhMVdz/hpWXzmz8ruH7+s7BGrXO8RMXLJIEbW0ZARIJfECMglsfjMXudeVnZ47Rllo12OLptutSxWuM6Rj6OjH3Madl7/cXANyDWOkBkoc/GZ5pjk8Xry/P3L4he8snzjO5fXkY8ZIP0x0r8/Rhwzx4wBBhhggAEGGGCAgXXfgAgpQPkHOwPrr4EIVvnf9358Zdn1eaeWJ0eInL1zLnASoyJXiY9tjJwhQmaAHEbIw2KqcMS3uuX07LjmZIywrNOzt3pxmbP4pDL/uI/GqMgcEXlBc13IEyMmxiIy9XqREQ8XZpDMBWvqqMiIjyecHyMhm/2CE8+Pt4uRkTVANqMn8/3q4jdxX52OPYyQF5Y93/nvESFvLMd/KUZCxorWL8mRkDE1+9gYDZnXhTwmFqZpA+RRl8TLseXiNQd/5tdlz4//rOx2RkTH2O9+xmURIWMfAbJuESF3r1Oz87qQMQryglgp+8PfLVse/Xdlg23i2ph1FfK85uPo1ixCM4yQqwTIdiTkIDgOX59TtpfHcWlff3h54vwXl30O+LPyo59eXY+jALnu/9HiD1PHmAEGGGCAAQYYYICB/hoQIQWo9TdAOfaOfRjI6wbmfz/+6a/L7i/60/KEGFk3a4eMXTkaMsJjLooyGiTz5eEq2REk2xGR9b6REBlBsg2RdXRkvJwL38yK/SZbv7hs8oyXli2WvS9CYlwfMoJhxsZFESEXnnxRbLEqdmw1RNYgOZiKXUdDZoC8oLmm5GBV7XYUZbPPsBmjIHOL982RkEve8e06HftlESGPH4mQdUp2hsiIkDkS8ugY9Xhc3M6XX3zhr8riiI657Z4jIOu+jZATIbKOiMzVsc//VXn6O75Y5jz3NXGdzYPLZjtGbIyVr2ftfGSZVUc8TomP7UjIYWSciIvNytczRcjlsQr58vKkhQeWvfZ/dfnJz68dBMgVPPuZxgADDDDAAAMMMMAAAwysxQZEyLX44Kj7/a37jl0fjl0zHbseqzZE/uyq8tylry1PXrB/DY9zIjjmlN9hiGxvT9oPQuQwTGaIjJGQo1u9jmQTKHMl5zkZJLfO2HlEmbff30Z0jBGOp8bq2TGacVFEyBwRubBuzYjIJi4OFrKpITJHRMZWrxfZjoTMfY6mHImQ8fIWL7uw7PH2b5WT/u2G8rIvXTsyJTtGO7bXhYzo+JLcYoTk4Rf/uvzJeZdHfBxMv44AWadhnxlBst0+HiMgY1r27jEte89PXln2Pu+KstNbPlc2XnxiTL8+pMyNADknRj82ATIjZBsgc99Ow25GNg6v8TgpRo4GyOb5z+OQ13/M7QkLlpYXH/OXMQLyNzVA/tYUbH9o+V3OAAMMMMAAAwwwwAADa70BERLStR6poNeHoNfXzzFDZLs1IyJvu/3u8pfv/JfypC1fVFfLbkbltdOzMzjGqsyTImQzMnJSdBwNkMPb+X4jcXKnXN05pmpvu7TMicVb5h/zkbLg9M/VhWsWvDwiZGwLYjRk3m7DYi5mM7+NkHWfIySbhWwW5nTuOnW7mZadIyHnZ4Q8/sKy+G3fjOnY15UTv3xNOaGOhrxuuEp2rpb9si9eV6djv/CCK2L6dcTGDIw5+rEGyMvKbrHfLe+vETKnZsfrz/552euCX5Vd3/uNGNH512Wj7SM8bhdTsOu1HyM25tTpGh9HouPoNSB3itA4dRuEyAyNdcXsnHqdATeu0Tk7nq8MkU+cd0D5n3/1sXLLbXc3AdLPcD/DGWCAAQYYYIABBhhggIFeGBAhQe0FVCGyr5GvD593GyGbfZat++5/sLz2Lf9UNlj44iZEZgDL6dk1PmZIHIyOjH3ebraRwDgaG1e5PRIjM0TGqMjZ2y8ts595XNny8JiefdolZd4rLmniY42QzcIzOcX6kSNkjJyMGNlOx84I+bTjLyi7/e03yskRIU+OCHlSrHR9QkTHE2JU5MlfijAZ2yEXxejHuKbjXrnYTATHJXHdxz1iv3tGxwiONUAOI+RlZcm5cf3HeHmbV59VNtnj5LLptnn9x/hahiMe21GOIwGyDYsRJ+vox6kBMl8eiZA1RNZp8Bl+jygbxcd4ckzz/ot3nlPuuvt+AdLvLr+7GGCAAQYYYIABBhhgoGcGRMieHTAxrg9Ry+fYP6cTITJu1cD1wIMPlfd+7JKyxTOPLBvHqtY5jbi9RuT0EbKNke2+iZXTB8p8m3h9Rsi6HRFTmPMakoeXpz339WXRCeeWBRkjT4mp2S+fmGI9XYTM0Y/taMgFESDzOpI1WMb9NUK+9IKy619HhPxaRMivZHi8tpzy5bx9XTn6X68qL7rwyrJvLDCzTwTIvWO/Z0y1zm1JbHUxmhojI0hmmIzp10vO+3l51nu/WTZb+jdlw+2W18Vn5kQkbKdK1+nWNTQOYmMbHdsI2Y6GnC5CDkLkrBxFGc9Fuz1l4cFlwa7HlE+c/7Vy/4MPx/HxPda/7zHHzDFjgAEGGGCAAQYYYGB9NyBCipDOHDDAQDUwESLjxfqcZI386rd+Unb+k1PKE7c6uMzJlbNHRkG2U7MnQmMbIKfbj0bJw8vciI/tlo+b22YR4eZsH9dU3C1Wzz7in8rCV8RU7FM/G9OyYxp2LkaT07EHi9LMj+tBtteEbCNkjoKs07IzRLYRMkZCPvOv/628/GvXllO/GgEyQuRLY2XsAz99ZXn22T+L8Pizsk/Ex70HETJHQ+6ZsTEjZI6KjC1j5B65+MzH/qvs9PpPlo2edVLZZKsY/bhDXO8xpkznwjPDKdTD6DgyGnIYJduRkSNTsTNOxtfdRsy6z8ccRMgnxQrYu+x7Yvn29y+vcXh9/6Xt6/eHKwMMMMAAAwwwwAADDPTVgAgpQAlQDDAwyUATIFfGYiftytk//Mkvy677/Wl54sIDYmXmHMHYTh2OkYDD6djThccp942OfIzHmDuyzdk5Al1sc2I16bk7xrUi43VbPu8NZeFLzygLXnFRXCsyVruO60A2oyHz2pARISNKLoxp2jVCxj4XppkcIT9Vp2Mv/quvlVdEhHzZF64uh130y/IneT3HmE6d4XGfsy6vIyD3ihCZ255x35IMkTkaMqZj73F2TNOOhWqe9a6v1Gs/PmW7mJa+TTwHdQXxyfGwnU49sR8JkXUEZBshcz8RImfF7Tr6MUdA1mB5ZDzPsQDN/APKHx/wZ+XfBwEyj0lff9n6vP2hyAADDDDAAAMMMMAAA+u7ARFyUnzwDbG+f0P4+n0PTGcgh+DdcNPt5X/974/FdSL3j+nZh5a5GQ1HRkW2U7RrlMzYODVORmhrp15nxGwCZI6GbG83oyFriNwlV5eOl3eIRWuevrw87UVvLYtednaMivxMmXfS+REgz6+jINvp14tO/ExZNFhNu903K2p/umx5/Pll17d8tSy75MrynE/8tOz50Z+WJWc0kbFOva4jHy+P8Nhsed9eMfJxr09cVva54Mqy5GP/WbY64T1lk6cfE6MfD6lTxmfH6tfNatXNYjHt7dm5kEyddj3DPr6mifg4CJHtyMl29OOOR5eNtjm8PGHhIeWN7zijXH/DHXUEpADpe3O67033ccEAAwwwwAADDDDAQH8MiJAipJFFDDAwo4FmVGS8uv533wMPlb/6+4+VWVu9uGyy3UFls50jNu6U06ybbW69zmOOlMyXpwuReV8TIyci5JQQmfGxjoqMEJnTtHeM8LfTsrLZHqeULZf/3zoqcsHJOd16MAoyR0LWABkrase+iZA5KjK2eLstX3ZB2fEvvhojHn9adv+Xn0RUjIVlzshp1rHP6db1Wo8x9Toi5J65xX37xCI1z7ngl+WZ7/xy2eyAN9boOnvbZRFMMz7maMXB9RpzX7dctKdZObwJs1MjZC7kk/fFvg2R9eUMubktK7O2jwV6YrTkUxYdWD/eO97/mXLPfQ/U590fFf35o8KxcqwYYIABBhhggAEGGGBgJgMi5IzxAZqZ0LifjfXVQBax+x94sJx1wZfKdnsfXzaMUZGb7ZIjFiciZA2REduGIyIjuuW1H+vIxnp7YuRje03I0dGQk25HhJyb14qMSLfZDnENxl2Wl6f+jzfEqMhzysJTL46p2c2iNTkSsg2RNUJGfFx4chMh553wqbL9X3yljmxcEqMg94ht94/F/ozLYvXrXAE7F6C5vC48k9Ow9zn/V+XZZ/y0bPfqj5ZNFh9fNo3p17O3zxGMRw0CZF6vceKajbPrCtYRF0f3GRtHt/j6Zw+3wWjIjI915GS+bUTMeG6euODAss0eLynnf/4/ykMPr6wBMqfEr6/efN2OPQMMMMAAAwwwwAADDKxLBkRIEdI/8BlgYI0M1CbWhLF4+8uuuLrsf9TrywYL9iubZCAcGRHZjIxsQ2SOfGy2SYFxUpBsF6kZDZSD2zHaMkNk87452vCQMutZx5ctDnp3rJwdq2efcnEzAvLkCJG5xWjIBbHPUZALX/6ZMv+ET5ft3/TlGOUY0fGj/10W5xYRcnFEyMUfywgZW1wXco9PxsIz5/687PyXny2zn/easlGOTKyR8Mj4mDlacXJ8nBXhtd0mBcg2Ro5GyLw9jJB5uxkp2U7j3iQe60mx8M8e+72qfO+HV9b1yU2/9sfWuvTHlq+FZwYYYIABBhhggAEGfltEyDWKD75ZfLMwwEAamFi0JmvkHXfdU/7sze+PhWSWlg23OShi4yA8RnSbmI6dU6ojIuY2KTyOvtxGyCn7OhIyI2Rzfz5+DZK5cM32B5fN9nlVmXfUR8qiUy6KkZGfq9ExQ+SCiI91i/vnx4rZO2aEjIVoFv/Lf5fdYiTkbh/NABlbBshzryi7xyrZO//vfy2bH/im8uStDy2z4pqXcwZTr5sAmaMVm+nUOe064+PsVbZ4mzZA5n6mCDl4nBo4c/r11kvj4y0rJ73mPeXqa29pIq8FaJwY8LuZAQYYYIABBhhggAEG1jkDIiTU6xxqsUww7c5Ae43I3w5Xzl4ZP0POvuD/lYWLj4npxC+K+JYBbyLCDWPkjAFyaowcfTluD0dBDmLkYGTkZnH/nO0PKLNi/9Tn/UVZePxZZavTPlsWnXZJWXhKRsiYqn3qRWVejIjc8c1fiQgZwfFfYgRkjITcLUZC7h6rXi+OEZC7vPsb5WnL/rY8ZZtlZaMF+5e5MfV6Tiw8045+nFhoZvA1TYqPU8LjtBGyvVZkM/ox42SzQE8uPnNQ2SqmX7/ng58tK5rZ12XFihV+Jvm9xAADDDDAAAMMMMAAAwysgwZEyHXwoHYXYMQtzy0DUw3UucMxfu/HP/1VOf5P31GeFCFv01hIpi4uU0cDNiMh22tENteBnBIaHzFQNiMhJ64h2QTJZgGbvGbjwWX2048qc5/7ujL/JR8ti179+bLwlZ8t817xmbLlyz9VdnzrV8ueZ8e1HyNA5gI0eT3InXLk47K/KRvtfFTZeP7+Zc62EU9jlOKm8TnPipiY23A042hcnBQhByMic1GaqffnffX+dhGbJkLO3TkWt9n+sPIH8w8qR5/+7vLDn/y6jn6c+rx62fcaAwwwwAADDDDAAAMMMLBuGRAhRUhnFxhgYAwGsqTdfOud5e3/57y4RuRhdZXnObvEiMK43QbIdv+7hcgMlxkjJwLmnBgVOTuiXv04sXjNptvH9SKfcVyZt/SdZZvTP1W2eu3nyoLY7/Q3Xyr7nn95efY5vyi7vutbZcEx7y6bxqIzGy86OFb6XhoL68T1HmuAzAiZt9sImXFxdLRjGxtH78tYmcGx3bdv075v7CM61tWv49qSG8Uq2xvGlO+/eu+F5aZb7hYgx2DPH2br1h9mjqfjyQADDDDAAAMMMLCuGhAh/QNQgGKAgTEZyKL24EMPl0u+/L2yeL9XlCfOe0FMPY4ImSMjc4tQmPu5EeymBsXRuLjq7fbtR/cxwrJeMzL3y+tWp27HIjmz4lqLc/c6vSw4/L1lm1POKru95xvleZ++vOz4qg+X2XudGiteRzDMkY8RGOfssHw48rEuNBNBcWLBmVycZjQqjt7OEBkvtyMea4TMtx/dMj7G22WEjK/9yVsdWLZe8tLyz+d8OZ6nFQLkmNytq3+g+Lr88c0AAwwwwAADDDDAwLplQIT0j0ABigEGxmkgFlXJ/6694dby52/557LRVgeUDXLRmp1zRGQGyNwfNoYIOTIqssbICI/DGBlRMuLn7FjhevNnvaRse/hflwXL3lw2yVAY0THD4+wIlfV6jzkKsm7tNOwmQjbxcXJQnAiS+Tix1fA4sc+va+Jt8nGW1Qi5YR39uLS84Oi3lB/85Kp6Pc14yrkbpzuPxRMDDDDAAAMMMMAAAwys5QZEyLX8AKn+61b1dzzXj+O5crDKysoIbf/8ic+Xnfc+Pq4V+aIYgXhwXem6XazmEUdDxtToiVGRo6Mg28VdYhRkOz07F6qJCFlD5C45MvLIejtHXW4Sq11vGiMSN4sVr+dkfIz3aQNie/3HiX0bIWcKkBkaBxFySoicU0dNNu+XQXLTiJBPWHhg2fKZx5Y3vv2ccuudD9RAu9Lq1/448ruXAQYYYIABBhhggAEG1jsDIiT06x16IXD9CIGP93FeGQUyt/zv+/95RTnipL8qG229f3nyoliBenBtx1wIZu6abDU0Tox8zPC4ylYjZIbI0S1HREaYjC33+fHa+NjuV42Pk0czjo5sHN6eMgIyHyvDavP6nHJ+eFz38eDyhAUHxujHvyyf/fKP6vOQ/yNA+v57vL83fXwGGWCAAQYYYIABBhh4fAyIkCKkCMkAAx0byPj24IMrykVf+PfywqPeUP5gixdEDFxWNsvp0xHvZgqRGQ3rltExb08XH+t9I6ExH3PS202MoGxGYDbTwWuEHB3ROLw9U4TMEY7xupxyPYyQg8+rvm9MMY/X5TUv/+BpLyjb7n1i+b8fvbTcfe9D+eUz1rExf0Q9Pn9Eed497wwwwAADDDDAAAMMrLkBEdI/DMUBBhh4DAzUEhf/c9W1t5S3veecGBV5YNkorhW5+dNjivRgJGEdsdiGx9F9GyHrfTkVe3VBcurrBlO368doA+QgJg7D48j06pEp1ZMWmWmv91gDZI6obANk7OOakhlUN93ukPKH8/Yrh5zwtvIfP/hFuGq+6t/GiFC/mD0HDDDAAAMMMMAAAwwwwMD6bUCEfAzig2+y9fubzPF3/FsDbZV7KFaGvuhL3ymLX/CKssH8F0VUzOs1ZtRrpjVP7AehL14/HBWZ8W9ShGxHPrb79vWD+Fjft3nciZWsB6MZV4mQcf8wQubtwXUhRwNkBMdmVe18fcbL/ByPLE/ZamnZIq79+A8f+ky5+da7B/XRsW+PvT0LDDDAAAMMMMAAAwwwsL4bECFFSCOUGGCgcwM5HbmZklzqvml01918e/mff/lPZf7TDy2bbHNATGeOKdoZDSME5kraE6tpNxGxCZF5O8NfGxtn2sfbzRggM0K2EbEdBZkvt9voojSjt+Pzys9th0Pj4+fbLouVvw+uAfJPDn1D+c6Pf1VW1NXB448Lox99X3X+feWP2PX9j1hfv+8BBhhggAEGGGCgXwZESP9I8g9lBhh4TAy010VsgmQu0FLLZPTIS7/6/fL8w19XNlj44rLRVgfVwNfEvrzOYsbIjJIj8fERI2QbLUf3EQ0zHE7a2sVk2vjYvj7CY3zcug3DZPs2y+q1HzfcZml50qKDyq7Pf2X5x49dWm67475aVvPrWvmYPJ/9+mXrjyPHiwEGGGCAAQYYYIABBtZ3AyKkfywLUAww8JgaaNpjfMi6enaNkZHvbrvznvKav3h/mffMI8ofbfnCMmv7Q5qRjBkBazgcDYrt7ZERkW2YHO7bt2n2E4vJRHhsQ+RgQZmJEZDtxxqNkIORkNvn6w4vs+Lz+aP5B5SnPeOY8vLXf6D85PLra3zMX6ZWvvZH1fr+R5Wv3/cAAwwwwAADDDDAAAMzGxAhH9P4MPOBgNRzw8D6ZqCNkfF1x9Tl9r8f/fcvy+mve1+MiDy4PHHei5vp2RkN64jEiZGLq1w3chAfc8GYycExo+Po1sTEYYhsg2TdZ3wchMj68ZZFDG3uy6ndT1xwYHnSwoPKK173T+Vb37u8/ZRFbL9HGGCAAQYYYIABBhhggAEGHtGACAnJIyIRx9a3OObrfTzNZ9m78+77y4UXf6vs+eJXlyds8cK66nRGwDZETgTI6UY7NitXTw6PoxGyvT2IjZOiYxs7m9fNiWs+zo2POytWvf7/ttiv7Lrfa8uZF3y93HnX/QKk3x1+dzDAAAMMMMAAAwwwwAADj8qACAnMowLzeMYZH1scXF8MtIXvuhtuK+/7yMVlweJjypMX7h9TofP6kM1Ix1yhOkct1iA5WIDmkcNjGyCb95086jHDY9yfjxtTr+fG7dw2WHRg2WLX48pb331huera22L4ZvPZrS/Hwtfp5w4DDDDAAAMMMMAAAwwwMB4DIqQIKUIywMBaaCAOSq19+cvusiuuLaf9r1hFO64XueFWB8YU6Vyd+tAyN6ZM5wI2U+Njsyp2xMocPRkhMUPl1LeZNG27Tr1uRkHmNR833fawsuGipWVeXPfx9L/4UPnpL64rK1fEQjrxn1++4/nl63n0PDLAAAMMMMAAAwwwwMD6ZkCEXAvjw/qG0NfrBy8DUw3U3jcMfs1LpXzrO/9dDn/ZW8oWuxxSnrSgGRk5d+fBwjGDazoOV9LO0ZE7tatqzxQiY2RljK6cXUdYRnyMaddPXnhAmbXNIeUFh/7P8pVv/KT90Bad8bti6NH369TvVy8zwQADDDDAAAMMMMDAmhgQIf3D0j8sGWBgrTQwWLgmMuDKWLimXbzm/gceLmd+8kvlRUe8oWyw4MXlSfP2i+nTh9RrN9ZrRtYp2hEfa4TMEBkraA+2ZvTjxDUjM0A2oyQPK09ecEB58qKDyt4HvLa858OXlJtuvacGyPxFsnKtfH78kl+TX/LehhMGGGCAAQYYYIABBhhYWwyIkP5xLUAxwMBaa6BdQXtiGnQ7NPGee+4v51741bLf8teXP3zq88sTt3hBnZqd14ycPBqyDZHL4/7lMS07ImRe93GHJk4+Ja75+Aex6Mz/OPQN5ezPfKPccPNd7YfgYq114Y+oteWPKJ8HiwwwwAADDDDAAAMMrLkBEdI/MoUGBhjolYEYGTlYHCZr4bU33FrOPOeLZd/9X13+cLMXxujI/WNU5BF1a0ZDRnzcabBFgJwbt+fudGTZZLtlES/3Kzs/59Ry5nlfiUVnbhEfe+VgzX/R+6PIc8UAAwwwwAADDDDAAANrgwER0j86BSgGGOixgVoOI0reePPt5cMf/0JZ/PzTy5O3fGHZeJsDypydYxTkzm2EbEY+bhKL2uTox62XHF/e+X8+Va66RnxcG34Z+xz8UcgAAwwwwAADDDDAAAPrugERssfxYV3H6evzA5iBNTfQDmO88857y3s/eGFZst+pZdPtDyxP2frgMnvnGPkYoyA33Pbwsm2MfHzD288pv/zNzTU+x/9YdMbvASciGGCAAQYYYIABBhhggIHODYiQkHWOTEgyTRlJAAAyzElEQVRa85DkufJcjcNABsk77rinfOisS8sfL31tXUl73rOOLW/5u7PLr6++edArIz6uWCFA+h3gdwADDDDAAAMMMMAAAwww8JgYECFBe0ygjSOseAyBjoFVDcQ3cLN6TZsWBz/TBi+WX//m+vLGv/5A+eRnvtbeVcPjypUrfe/7+c8AAwwwwAADDDDAAAMMMPCYGRAhYXvMsAlIqwYkz4nnZNwG4hs6YuPEFOtheaw34v7fio/jfs49nu9jBhhggAEGGGCAAQYYYOCRDYiQIqQIyQADv4eBGv0y/D3KbU1+Qa3RY0ZwzOjYbJOTY9Md83Xx38jntyYfu8u3WZs+ly6/To/9yH+EeI48RwwwwAADDDDAAAMMrD8GRMjfIz74Rll/vlEc6/4e69HgNdPtPL4rR7eVOZLwkbeHVqwsDz68ojw02PL2gw812wMPPVxyu//B1W/3xeuH2wNxe2S7N27f+8BDw+2euN1u7f33xX33PfjQxMepH3dFfOzY4vO5P/eDbfi55MfIjzt47Hvuj8eN7e7h9mDczm3ivvZt8uPnx64fd7gf+RpGv56R283Hjs8n7rv/wXyOHi4Pr/htWbEmWxyLh2P6eG55XKb7fsxjm/fPdIzb+6d7X/dN/5x6XjwvDDDAAAMMMMAAAwwwME4DIuTgH67jfFI9lm9SBn4/A20wavejz2felyFqRQSpia15+cGHIwpmBMwYONjaEJdBr4a2+zK4xe0a+DLyrSh3xn233v1A3W6L/W13xe263V9uuWuw3Rn7wXbr4L4b7rivXHfbveX64XbP8PZ1t90Tr1uT7d76GPk4023Xxv3X3nrPjNt1g9flfrgNP24+5sTncP3I2+Rjtu878fh3l2tvubtc84hbfD63THxOw4878vj1vpGP3XwezdeYX9P1t99bbornb022m++4P97u/nJjvH0+93fc80C5894Hyh2D7c57Hyx35XZfhNPY7onjeW8E1HvjOLfHPcNnRuOHwsjo/uG4Lx1Njs4ra8xs3aW5qbdH72tfZz/xPHkuPBcMMMAAAwwwwAADDDAw1YAIOfKPy6lPjpd9wzAwXgMZbkq9JuFo5GkDUOzjdRmERkcYZli8N0bP3RVhKSNTjsS7696Hyi0j0fD2uJ2xMCNV3SJw3XhHbLm//b5yQ+xzy/BVo2HejhA2ev9ESJwcFYcRb0pguz4C2/TvM/r+eXsN3m7w+eTnN2nLWLfaLR578HnlfpWtfuz8+O3rBp/Pre3n1bxuxog45Wue6e3qx12Tr3PS1zISTR/h47RfV378/FpG96O32+f6hjy2ucXzWY97vE/um+CZ+4GP2N/chs0wlHGz2e6vzoYjR8NfM3IzfEa0zHA5urBPjqLNnxWBu9nalwd7P0fG+3PE8+n5ZIABBhhggAEGGGCgnwZESP9IHI7w8U3cz2/itfm4ZZRpP786anEwEq2dppxTj3NEYgbGO2IkW2633/NguTlGId6Yo99i5GFGxesjJF5/W25NlMvANHp7IjpFhIy3beLjRIRsY2TzuvZt2rdrXr6hxsrJt9v7mpA1CFsjH7v9HB6P/XDUZATF60a26zMwrmZr3zY/55keo32bNd4PHut3eR5Gj+VM7z88vvFx8lhMPr7Tvdwe23zdxO32Y40+3qSPOXweI1rGx7oxzLVvmx8zR8LeOhgNm+E7R2DeEUE8o3habqe95/T8jJW/zSn9bZDMQOn3zfDnQftzwX7iZ6TnwnPBAAMMMMAAAwwwsK4bECH9o9A/ChkYu4G81l9Oh66RMQLjnRFpbrv7wRitGCMW73yg3Bwhp5lem5Hx/ghLI/Evws+Nt8f9dR+32328zU2Dt1s1Jjbvn6+vo92mfbvJsSpj1qPaMoDFNilaPeYvD0Y15mjAKVszCnDi9at7eer7zjTCcbX3T/n4+Zgzf8xHet5W977N69oYOGk/OIaPHCUnH/vVvn2Njxkgm/dpP14Nu3m864jTgYWMveEzt9Zw2sx4fms4v+2uB8P9AzWyt5Gyxsn4mSNI+gNzXf8D09fHOAMMMMAAAwwwwMBUAyKkADX2ADUVmZfXnx88GR5zMZPbY4RYxpcMMTU6Rny8OW7f1G7Da/xFbJw2GDZRcebXTY1K+fZ533TvN/lt1zg8RnBqA1TuH118XF1UW91jre79Jr9uGBKnm8o8CIRTo+Bq32e6x3mU9039eON8+Yb4mia2kWMzJSavNjBWIxMeVrEw5ZiPHv/pbzfxsR0x2/q7ISJ6c1/s81qW6TLCZH4P5LVHc/TkfXGNypkW2fEzc/35melYO9YMMMAAAwwwwAAD65MBEVKEFCEZGIuBXBDm1phKfUuM/qojHnPU4yA+5sjHdssRkDlasbl243TRcKb7JuLRzKFp6vtOfp9VotOUgDV8/TQxavoIOTkMjjO6re6xuo6Jqx0BubowudrRkL//czURIZvp0jUMTjmGM9uYbKF9u9Ud8+nD40gAHXUSobGNke2+jujNCDkS3TNK3nDHA7HF98k9D9Xrn65Pf3T4Wv2RzQADDDDAAAMMMMDA+mtAhBSgxhKg/BBZf3+ItMc+F5PJEV65YExeO6+Nju0+42PeXrMAOX0wasPR77IfxqYp0WqV+0fD0uD2qgHy9w9qq4uMj/S6GiFXFwMfx9e1i8g80tfwu75+XCFyeNzzGKeJaY77o7pvmgiZMbKOgqzRPUdHNiMj6z5HCUeEfDCvHen3kOeAAQYYYIABBhhggAEG1gMDIuR6cJD9A1cgfCwMxG+MWNm6lPtjmumdcR3IvAbkrbFidYbHHAlWt7zWYxtrIswMI00baybtxxsih9Hpd4iQGaMmQqQAubqRksMIGSH0dw2NM73f5ADZTs8eBMTBcX00gXpGE2saJFexNHU0ZIbHDJHNIks5Hfu2GC2c3x85HfvhWLjmsfje9DE8zwwwwAADDDDAAAMMMLA2GBAhRUj/CGZgLAYyQsb/54LYsSJwKXVxmodWlntj1eBcRTivE3l7jPzKMHnTHfc2IyLrCLSIVRGsMjBlfKqhaXB/G4keTVia6W3bx1rtfpr4NBEf2xA5/rg2U3Sbev+ajYC8O1bLjoVrHudtGCM7mKI9OUYORjL+DhHy0VgZHotb724Wpxl+XQMX9ePnwkj3x2UImu22e5oVtO+9/+Fyf1yuIK+ZOlwte/D9sjb8IeBz8AcpAwwwwAADDDDAAAMMPBYGREgBaiwB6rHA6mP07YdiEyQzStY2mfvYVsbK2Q9FjMntgQgz9z7wULn7vgfLPbFlrLzlrvvqdnOMlMxp3TdGsByGyUFoGgbLYayciJcZljI0Nvt76v7G29v95GC1apBsR9flPj/uowiP7ci/wT4jYA1xw1i1hvGyfb812K8aGh/7AJlf4/BrXYPPeRgnV/e20zxnk8Pj6HGKY1uP1cQxnjEuxuO2jzMpKrYfLz6n5pgPgvjAUX28cJg2bxtst999X/WafjO05z49P/TwypIrYDerYMfQ4LbM536w+VnWt59lPl9mGWCAAQYYYIABBhgYhwERMv5ROI4n0mN4HhlYMwNtiMl9/l/+l89d3UezWbFyZYyinNgyVmbgue/BDD0Pl3tiVFkdWRmjzO6IaHlH7HPE2c13xii02Cbt65TvjIEjo9cyfmV0iv11cf/ENnh58Lo2Uq0a+qaMMoy3H77N6O36+PG6vO+RtvZtH+/96OeZn8voy7/r7Uf4mq695e4y0zZxbEaP08jteN/r2m3kGA9DYnzsPI4ZHvNapE3YztGKzZYrVd+eq1XniMWcJj3Y7okV3u8PbxkV6xYGc+GldJk+2y1Xt27g5n6wCY1+p/q7ggEGGGCAAQYYYIABBqY1IEKCMS0MQW3NgprnqdvnKXBWn7kf/S+ntGYAyrt/G+Eyb6+IEZZtvGxHoj0co9Luy5GW9z8Y+4frVoNmjZkPxbX5Hix35XbvA3U0ZsaonEqbIbPd2mDV7nNUXBO2mpGSq4yWbKNbxrUIY9fWl9vbg/1qwtswyNX3nfJ+o/fN9Bhr8jZT33fweebn+mi3YYBtv+413Odzk89jPs+35hYjDNutHQ1b9/G60f3tNRg+EMcso2FGxPtrSLx7cJ3FjNV5XdLc7nsgttzH1oxQzOuWTjhJN3VLTyNbG8VH/fle7/Z73fPr+WWAAQYYYIABBhhgYN03IELGPzxB9xwwsO4YaMpk1slma4/tYNBlc/+gaDavy0FsTeTMXROmmum0w0jVxqpBwMpr+z20oplSPmkfI+Xaaeb31Gm6MYJzMFW3mbabU3cnbznq7vHcJj6fZqRpM7V49bfboDu6vz++zjb+PRDR75G2HGk4eo3E9ji1+/baicOXB8egfbkewik/v9v72kGJ7b59H/t15/vcsXQsGWCAAQYYYIABBhjonwERcso/YiHuH2LHzDF7PAy0kTP3+fHbkDnp5fb+tXI/iK/ZX8ew5ZdYn4O4MdPxaF/fPkczvZ37Z34OPTeeGwYYYIABBhhggAEGGOirARFyNf9g7utB9Xn7gcQAAwwwwAADDDDAAAMMMMAAAwwwsDYZECFFyBlHLa1NUH0ufnAywAADDDDAAAMMMMAAAwwwwAAD/TUgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesUmDMU/T1D4dg5dgwwwAADDDDAAAMMMMAAAwwwMC4DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgY2rlnscZ14YYIABBhhggAEGGGCAAQYYYICB/hoQIUVIEZIBBhhggAEGGGCAAQYYYIABBhhggIFODYiQgHUKzBmK/p6hcOwcOwYYYIABBhhggAEGGGCAAQYYGJcBEVKEFCEZYIABBhhggAEGGGCAAQYYYIABBhjo1IAICVinwMZVyz2OMy8MMMAAAwwwwAADDDDAAAMMMMBAfw2IkCKkCMkAAwwwwAADDDDAAAMMMMAAAwwwwECnBkRIwDoF5gxFf89QOHaOHQMMMMAAAwwwwAADDDDAAAMMjMuACClCipAMMMAAAwwwwAADDDDAAAMMMMAAAwx0akCEBKxTYOOq5R7HmRcGGGCAAQYYYIABBhhggAEGGGCgvwZESBFShGSAAQYYYIABBhhggAEGGGCAAQYYYKBTAyIkYJ0Cc4aiv2coHDvHjgEGGGCAAQYYYIABBhhggAEGxmVAhBQhRUgGGGCAAQYYYIABBhhggAEGGGCAAQY6NSBCAtYpsHHVco/jzAsDDDDAAAMMMMAAAwwwwAADDDDQXwMipAgpQjLAAAMMMMAAAwwwwAADDDDAAAMMMNCpARESsE6BOUPR3zMUjp1jxwADDDDAAAMMMMAAAwwwwAAD4zIgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesU2Lhqucdx5oUBBhhggAEGGGCAAQYYYIABBhjorwERUoQUIRlggAEGGGCAAQYYYIABBhhggAEGGOjUgAgJWKfAnKHo7xkKx86xY4ABBhhggAEGGGCAAQYYYICBcRkQIUVIEZIBBhhggAEGGGCAAQYYYIABBhhggIFODYiQgHUKbFy13OM488IAAwwwwAADDDDAAAMMMMAAAwz014AIKUKKkAwwwAADDDDAAAMMMMAAAwwwwAADDHRqQIQErFNgzlD09wyFY+fYMcAAAwwwwAADDDDAAAMMMMDAuAyIkCKkCMkAAwwwwAADDDDAAAMMMMAAAwwwwECnBkRIwDoFNq5a7nGceWGAAQYYYIABBhhggAEGGGCAAQb6a0CEFCFFSAYYYIABBhhggAEGGGCAAQYYYIABBjo1IEIC1ikwZyj6e4bCsXPsGGCAAQYYYIABBhhggAEGGGBgXAZESBFShGSAAQYYYIABBhhggAEGGGCAAQYYYKBTAyIkYJ0CG1ct9zjOvDDAAAMMMMAAAwwwwAADDDDAAAP9NSBCipAiJAMMMMAAAwwwwAADDDDAAAMMMMAAA50aECEB6xSYMxT9PUPh2Dl2DDDAAAMMMMAAAwwwwAADDDAwLgMipAgpQjLAAAMMMMAAAwwwwAADDDDAAAMMMNCpARESsE6BjauWexxnXhhggAEGGGCAAQYYYIABBhhggIH+GhAhRUgRkgEGGGCAAQYYYIABBhhggAEGGGCAgU4NiJCAdQrMGYr+nqFw7Bw7BhhggAEGGGCAAQYYYIABBhgYlwERUoQUIRlggAEGGGCAAQYYYIABBhhggAEGGOjUgAgJWKfAxlXLPY4zLwwwwAADDDDAAAMMMMAAAwwwwEB/DYiQIqQIyQADDDDAAAMMMMAAAwwwwAADDDDAQKcGREjAOgXmDEV/z1A4do4dAwwwwAADDDDAAAMMMMAAAwyMy4AIKUKKkAwwwAADDDDAAAMMMMAAAwwwwAADDHRqQIQErFNg46rlHseZFwYYYIABBhhggAEGGGCAAQYYYKC/BkRIEVKEZIABBhhggAEGGGCAAQYYYIABBhhgoFMDIiRgnQJzhqK/ZygcO8eOAQYYYIABBhhggAEGGGCAAQbGZUCEFCFFSAYYYIABBhhggAEGGGCAAQYYYIABBjo1IEIC1imwcdVyj+PMCwMMMMAAAwwwwAADDDDAAAMMMNBfAyKkCClCMsAAAwwwwAADDDDAAAMMMMAAAwww0KkBERKwToE5Q9HfMxSOnWPHAAMMMMAAAwwwwAADDDDAAAPjMiBCipAiJAMMMMAAAwwwwAADDDDAAAMMMMAAA50aECEB6xTYuGq5x3HmhQEGGGCAAQYYYIABBhhggAEGGOivARFShBQhGWCAAQYYYIABBhhggAEGGGCAAQYY6NSACAlYp8CcoejvGQrHzrFjgAEGGGCAAQYYYIABBhhggIFxGRAhRUgRkgEGGGCAAQYYYIABBhhggAEGGGCAgU4NiJCAdQpsXLXc4zjzwgADDDDAAAMMMMAAAwwwwAADDPTXgAgpQoqQDDDAAAMMMMAAAwwwwAADDDDAAAMMdGpAhASsU2DOUPT3DIVj59gxwAADDDDAAAMMMMAAAwwwwMC4DIiQIqQIyQADDDDAAAMMMMAAAwwwwAADDDDAQKcGREjAOgU2rlrucZx5YYABBhhggAEGGGCAAQYYYIABBvprQIQUIUVIBhhggAEGGGCAAQYYYIABBhhggAEGOjUgQgLWKTBnKPp7hsKxc+wYYIABBhhggAEGGGCAAQYYYGBcBkRIEVKEZIABBhhggAEGGGCAAQYYYIABBhhgoFMDIiRgnQIbVy33OM68MMAAAwwwwAADDDDAAAMMMMAAA/01IEKKkCIkAwwwwAADDDDAAAMMMMAAAwwwwAADnRoQIQHrFJgzFP09Q+HYOXYMMMAAAwwwwAADDDDAAAMMMDAuAyKkCClCMsAAAwwwwAADDDDAAAMMMMAAAwww0KkBERKwToGNq5Z7HGdeGGCAAQYYYIABBhhggAEGGGCAgf4aECFFSBGSAQYYYIABBhhggAEGGGCAAQYYYICBTg2IkIB1CswZiv6eoXDsHDsGGGCAAQYYYIABBhhggAEGGBiXARFShBQhGWCAAQYYYIABBhhggAEGGGCAAQYY6NSACAlYp8DGVcs9jjMvDDDAAAMMMMAAAwwwwAADDDDAQH8NiJAipAjJAAMMMMAAAwwwwAADDDDAAAMMMMBApwZESMA6BeYMRX/PUDh2jh0DDDDAAAMMMMAAAwwwwAADDIzLgAgpQoqQDDDAAAMMMMAAAwwwwAADDDDAAAMMdGpAhASsU2DjquUex5kXBhhggAEGGGCAAQYYYIABBhhgoL8GREgRUoRkgAEGGGCAAQYYYIABBhhggAEGGGCgUwMiJGCdAnOGor9nKBw7x44BBhhggAEGGGCAAQYYYIABBsZlQIQUIUVIBhhggAEGGGCAAQYYYIABBhhggAEGOjUgQgLWKbBx1XKP48wLAwwwwAADDDDAAAMMMMAAAwww0F8DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgTlD0d8zFI6dY8cAAwwwwAADDDDAAAMMMMAAA+MyIEKKkCIkAwwwwAADDDDAAAMMMMAAAwwwwAADnRoQIQHrFNi4arnHceaFAQYYYIABBhhggAEGGGCAAQYY6K8BEVKEFCEZYIABBhhggAEGGGCAAQYYYIABBhjo1IAICVinwJyh6O8ZCsfOsWOAAQYYYIABBhhggAEGGGCAgXEZECFFSBGSAQYYYIABBhhggAEGGGCAAQYYYICBTg2IkIB1CmxctdzjOPPCAAMMMMAAAwwwwAADDDDAAAMM9NeACClCipAMMMAAAwwwwAADDDDAAAMMMMAAAwx0akCEBKxTYM5Q9PcMhWPn2DHAAAMMMMAAAwwwwAADDDDAwLgMiJAipAjJAAMMMMAAAwwwwAADDDDAAAMMMMBApwZESMA6BTauWu5xnHlhgAEGGGCAAQYYYIABBhhggAEG+mtAhBQhRUgGGGCAAQYYYIABBhhggAEGGGCAAQY6NSBCAtYpMGco+nuGwrFz7BhggAEGGGCAAQYYYIABBhhgYFwGREgRUoRkgAEGGGCAAQYYYIABBhhggAEGGGCgUwMiJGCdAhtXLfc4zrwwwAADDDDAAAMMMMAAAwwwwAAD/TUgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesUmDMU/T1D4dg5dgwwwAADDDDAAAMMMMAAAwwwMC4DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgY2rlnscZ14YYIABBhhggAEGGGCAAQYYYICB/hoQIUVIEZIBBhhggAEGGGCAAQYYYIABBhhggIFODYiQgHUKzBmK/p6hcOwcOwYYYIABBhhggAEGGGCAAQYYGJcBEVKEFCEZYIABBhhggAEGGGCAAQYYYIABBhjo1IAICVinwMZVyz2OMy8MMMAAAwwwwAADDDDAAAMMMMBAfw2IkCKkCMkAAwwwwAADDDDAAAMMMMAAAwwwwECnBkRIwDoF5gxFf89QOHaOHQMMMMAAAwwwwAADDDDAAAMMjMuACClCipAMMMAAAwwwwAADDDDAAAMMMMAAAwx0akCEBKxTYOOq5R7HmRcGGGCAAQYYYIABBhhggAEGGGCgvwZESBFShGSAAQYYYIABBhhggAEGGGCAAQYYYKBTAyIkYJ0Cc4aiv2coHDvHjgEGGGCAAQYYYIABBhhggAEGxmVAhBQhRUgGGGCAAQYYYIABBhhggAEGGGCAAQY6NSBCAtYpsHHVco/jzAsDDDDAAAMMMMAAAwwwwAADDDDQXwMipAgpQjLAAAMMMMAAAwwwwAADDDDAAAMMMNCpARESsE6BOUPR3zMUjp1jxwADDDDAAAMMMMAAAwwwwAAD4zIgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesU2Lhqucdx5oUBBhhggAEGGGCAAQYYYIABBhjorwERUoQUIRlggAEGGGCAAQYYYIABBhhggAEGGOjUgAgJWKfAnKHo7xkKx86xY4ABBhhggAEGGGCAAQYYYICBcRkQIUVIEZIBBhhggAEGGGCAAQYYYIABBhhggIFODYiQgHUKbFy13OM488IAAwwwwAADDDDAAAMMMMAAAwz014AIKUKKkAwwwAADDDDAAAMMMMAAAwwwwAADDHRqQIQErFNgzlD09wyFY+fYMcAAAwwwwAADDDDAAAMMMMDAuAyIkCKkCMkAAwwwwAADDDDAAAMMMMAAAwwwwECnBkRIwDoFNq5a7nGceWGAAQYYYIABBhhggAEGGGCAAQb6a0CEFCFFSAYYYIABBhhggAEGGGCAAQYYYIABBjo1IEIC1ikwZyj6e4bCsXPsGGCAAQYYYIABBhhggAEGGGBgXAZESBFShGSAAQYYYIABBhhggAEGGGCAAQYYYKBTAyIkYJ0CG1ct9zjOvDDAAAMMMMAAAwwwwAADDDDAAAP9NSBCipAiJAMMMMAAAwwwwAADDDDAAAMMMMAAA50aECEB6xSYMxT9PUPh2Dl2DDDAAAMMMMAAAwwwwAADDDAwLgMipAgpQjLAAAMMMMAAAwwwwAADDDDAAAMMMNCpARESsE6BjauWexxnXhhggAEGGGCAAQYYYIABBhhggIH+GhAhRUgRkgEGGGCAAQYYYIABBhhggAEGGGCAgU4NiJCAdQrMGYr+nqFw7Bw7BhhggAEGGGCAAQYYYIABBhgYlwERUoQUIRlggAEGGGCAAQYYYIABBhhggAEGGOjUgAgJWKfAxlXLPY4zLwwwwAADDDDAAAMMMMAAAwwwwEB/DYiQIqQIyQADDDDAAAMMMMAAAwwwwAADDDDAQKcGREjAOgXmDEV/z1A4do4dAwwwwAADDDDAAAMMMMAAAwyMy4AIKUKKkAwwwAADDDDAAAMMMMAAAwwwwAADDHRqQIQErFNg46rlHseZFwYYYIABBhhggAEGGGCAAQYYYKC/BkRIEVKEZIABBhhggAEGGGCAAQYYYIABBhhgoFMDIiRgnQJzhqK/ZygcO8eOAQYYYIABBhhggAEGGGCAAQbGZUCEFCFFSAYYYIABBhhggAEGGGCAAQYYYIABBjo1IEIC1imwcdVyj+PMCwMMMMAAAwwwwAADDDDAAAMMMNBfAyKkCClCMsAAAwwwwAADDDDAAAMMMMAAAwww0KkBERKwToE5Q9HfMxSOnWPHAAMMMMAAAwwwwAADDDDAAAPjMiBCipAiJAMMMMAAAwwwwAADDDDAAAMMMMAAA50aECEB6xTYuGq5x3HmhQEGGGCAAQYYYIABBhhggAEGGOivARFShBQhGWCAAQYYYIABBhhggAEGGGCAAQYY6NSACAlYp8CcoejvGQrHzrFjgAEGGGCAAQYYYIABBhhggIFxGRAhRUgRkgEGGGCAAQYYYIABBhhggAEGGGCAgU4NiJCAdQpsXLXc4zjzwgADDDDAAAMMMMAAAwwwwAADDPTXgAgpQoqQDDDAAAMMMMAAAwwwwAADDDDAAAMMdGpAhASsU2DOUPT3DIVj59gxwAADDDDAAAMMMMAAAwwwwMC4DIiQIqQIyQADDDDAAAMMMMAAAwwwwAADDDDAQKcGREjAOgU2rlrucZx5YYABBhhggAEGGGCAAQYYYIABBvprQIQUIUVIBhhggAEGGGCAAQYYYIABBhhggAEGOjUgQgLWKTBnKPp7hsKxc+wYYIABBhhggAEGGGCAAQYYYGBcBkRIEVKEZIABBhhggAEGGGCAAQYYYIABBhhgoFMDIiRgnQIbVy33OM68MMAAAwwwwAADDDDAAAMMMMAAA/01IEKKkCIkAwwwwAADDDDAAAMMMMAAAwwwwAADnRoQIQHrFJgzFP09Q+HYOXYMMMAAAwwwwAADDDDAAAMMMDAuAyKkCClCMsAAAwwwwAADDDDAAAMMMMAAAwww0KkBERKwToGNq5Z7HGdeGGCAAQYYYIABBhhggAEGGGCAgf4aECFFSBGSAQYYYIABBhhggAEGGGCAAQYYYICBTg2IkIB1CswZiv6eoXDsHDsGGGCAAQYYYIABBhhggAEGGBiXARFShBQhGWCAAQYYYIABBhhggAEGGGCAAQYY6NSACAlYp8DGVcs9jjMvDDDAAAMMMMAAAwwwwAADDDDAQH8NiJAipAjJAAMMMMAAAwwwwAADDDDAAAMMMMBApwZESMA6BeYMRX/PUDh2jh0DDDDAAAMMMMAAAwwwwAADDIzLgAgpQoqQDDDAAAMMMMAAAwwwwAADDDDAAAMMdGpAhASsU2DjquUex5kXBhhggAEGGGCAAQYYYIABBhhgoL8GREgRUoRkgAEGGGCAAQYYYIABBhhggAEGGGCgUwMiJGCdAnOGor9nKBw7x44BBhhggAEGGGCAAQYYYIABBsZlQIQUIUVIBhhggAEGGGCAAQYYYIABBhhggAEGOjUgQgLWKbBx1XKP48wLAwwwwAADDDDAAAMMMMAAAwww0F8DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgTlD0d8zFI6dY8cAAwwwwAADDDDAAAMMMMAAA+MyIEKKkCIkAwwwwAADDDDAAAMMMMAAAwwwwAADnRoQIQHrFNi4arnHceaFAQYYYIABBhhggAEGGGCAAQYY6K8BEVKEFCEZYIABBhhggAEGGGCAAQYYYIABBhjo1IAICVinwJyh6O8ZCsfOsWOAAQYYYIABBhhggAEGGGCAgXEZECFFSBGSAQYYYIABBhhggAEGGGCAAQYYYICBTg2IkIB1CmxctdzjOPPCAAMMMMAAAwwwwAADDDDAAAMM9NeACClCipAMMMAAAwwwwAADDDDAAAMMMMAAAwx0akCEBKxTYM5Q9PcMhWPn2DHAAAMMMMAAAwwwwAADDDDAwLgMiJAipAjJAAMMMMAAAwwwwAADDDDAAAMMMMBApwZESMA6BTauWu5xnHlhgAEGGGCAAQYYYIABBhhggAEG+mtAhBQhRUgGGGCAAQYYYIABBhhggAEGGGCAAQY6NSBCAtYpMGco+nuGwrFz7BhggAEGGGCAAQYYYIABBhhgYFwGREgRUoRkgAEGGGCAAQYYYIABBhhggAEGGGCgUwMiJGCdAhtXLfc4zrwwwAADDDDAAAMMMMAAAwwwwAAD/TUgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesUmDMU/T1D4dg5dgwwwAADDDDAAAMMMMAAAwwwMC4DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgY2rlnscZ14YYIABBhhggAEGGGCAAQYYYICB/hoQIUVIEZIBBhhggAEGGGCAAQYYYIABBhhggIFODYiQgHUKzBmK/p6hcOwcOwYYYIABBhhggAEGGGCAAQYYGJcBEVKEFCEZYIABBhhggAEGGGCAAQYYYIABBhjo1IAICVinwMZVyz2OMy8MMMAAAwwwwAADDDDAAAMMMMBAfw2IkCKkCMkAAwwwwAADDDDAAAMMMMAAAwwwwECnBkRIwDoF5gxFf89QOHaOHQMMMMAAAwwwwAADDDDAAAMMjMuACClCipAMMMAAAwwwwAADDDDAAAMMMMAAAwx0akCEBKxTYOOq5R7HmRcGGGCAAQYYYIABBhhggAEGGGCgvwZESBFShGSAAQYYYIABBhhggAEGGGCAAQYYYKBTAyIkYJ0Cc4aiv2coHDvHjgEGGGCAAQYYYIABBhhggAEGxmVAhBQhRUgGGGCAAQYYYIABBhhggAEGGGCAAQY6NSBCAtYpsHHVco/jzAsDDDDAAAMMMMAAAwwwwAADDDDQXwMipAgpQjLAAAMMMMAAAwwwwAADDDDAAAMMMNCpARESsE6BOUPR3zMUjp1jxwADDDDAAAMMMMAAAwwwwAAD4zIgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesU2Lhqucdx5oUBBhhggAEGGGCAAQYYYIABBhjorwERUoQUIRlggAEGGGCAAQYYYIABBhhggAEGGOjUgAgJWKfAnKHo7xkKx86xY4ABBhhggAEGGGCAAQYYYICBcRkQIUVIEZIBBhhggAEGGGCAAQYYYIABBhhggIFODYiQgHUKbFy13OM488IAAwwwwAADDDDAAAMMMMAAAwz014AIKUKKkAwwwAADDDDAAAMMMMAAAwwwwAADDHRqQIQErFNgzlD09wyFY+fYMcAAAwwwwAADDDDAAAMMMMDAuAyIkCKkCMkAAwwwwAADDDDAAAMMMMAAAwwwwECnBkRIwDoFNq5a7nGceWGAAQYYYIABBhhggAEGGGCAAQb6a0CEFCFFSAYYYIABBhhggAEGGGCAAQYYYIABBjo1IEIC1ikwZyj6e4bCsXPsGGCAAQYYYIABBhhggAEGGGBgXAZESBFShGSAAQYYYIABBhhggAEGGGCAAQYYYKBTAyIkYJ0CG1ct9zjOvDDAAAMMMMAAAwwwwAADDDDAAAP9NSBCipAiJAMMMMAAAwwwwAADDDDAAAMMMMAAA50aECEB6xSYMxT9PUPh2Dl2DDDAAAMMMMAAAwwwwAADDDAwLgMipAgpQjLAAAMMMMAAAwwwwAADDDDAAAMMMNCpARESsE6BjauWexxnXhhggAEGGGCAAQYYYIABBhhggIH+GhAhRUgRkgEGGGCAAQYYYIABBhhggAEGGGCAgU4NiJCAdQrMGYr+nqFw7Bw7BhhggAEGGGCAAQYYYIABBhgYlwERUoQUIRlggAEGGGCAAQYYYIABBhhggAEGGOjUgAgJWKfAxlXLPY4zLwwwwAADDDDAAAMMMMAAAwwwwEB/DYiQIqQIyQADDDDAAAMMMMAAAwwwwAADDDDAQKcGREjAOgXmDEV/z1A4do4dAwwwwAADDDDAAAMMMMAAAwyMy4AIKUKKkAwwwAADDDDAAAMMMMAAAwwwwAADDHRqQIQErFNg46rlHseZFwYYYIABBhhggAEGGGCAAQYYYKC/BkRIEVKEZIABBhhggAEGGGCAAQYYYIABBhhgoFMDIiRgnQJzhqK/ZygcO8eOAQYYYIABBhhggAEGGGCAAQbGZUCEFCFFSAYYYIABBhhggAEGGGCAAQYYYIABBjo1IEIC1imwcdVyj+PMCwMMMMAAAwwwwAADDDDAAAMMMNBfAyKkCClCMsAAAwwwwAADDDDAAAMMMMAAAwww0KkBERKwToE5Q9HfMxSOnWPHAAMMMMAAAwwwwAADDDDAAAPjMiBCipAiJAMMMMAAAwwwwAADDDDAAAMMMMAAA50aECEB6xTYuGq5x3HmhQEGGGCAAQYYYIABBhhggAEGGOivARFShBQhGWCAAQYYYIABBhhggAEGGGCAAQYY6NSACAlYp8CcoejvGQrHzrFjgAEGGGCAAQYYYIABBhhggIFxGRAhRUgRkgEGGGCAAQYYYIABBhhggAEGGGCAgU4NiJCAdQpsXLXc4zjzwgADDDDAAAMMMMAAAwwwwAADDPTXgAgpQoqQDDDAAAMMMMAAAwwwwAADDDDAAAMMdGpAhASsU2DOUPT3DIVj59gxwAADDDDAAAMMMMAAAwwwwMC4DIiQIqQIyQADDDDAAAMMMMAAAwwwwAADDDDAQKcGREjAOgU2rlrucZx5YYABBhhggAEGGGCAAQYYYIABBvprQIQUIUVIBhhggAEGGGCAAQYYYIABBhhggAEGOjUgQgLWKTBnKPp7hsKxc+wYYIABBhhggAEGGGCAAQYYYGBcBkRIEVKEZIABBhhggAEGGGCAAQYYYIABBhhgoFMDIiRgnQIbVy33OM68MMAAAwwwwAADDDDAAAMMMMAAA/01IEKKkCIkAwwwwAADDDDAAAMMMMAAAwwwwAADnRoQIQHrFJgzFP09Q+HYOXYMMMAAAwwwwAADDDDAAAMMMDAuAyKkCClCMsAAAwwwwAADDDDAAAMMMMAAAwww0KkBERKwToGNq5Z7HGdeGGCAAQYYYIABBhhggAEGGGCAgf4aECFFSBGSAQYYYIABBhhggAEGGGCAAQYYYICBTg2IkIB1CswZiv6eoXDsHDsGGGCAAQYYYIABBhhggAEGGBiXARFShBQhGWCAAQYYYIABBhhggAEGGGCAAQYY6NSACAlYp8DGVcs9jjMvDDDAAAMMMMAAAwwwwAADDDDAQH8NiJAipAjJAAMMMMAAAwwwwAADDDDAAAMMMMBApwZESMA6BeYMRX/PUDh2jh0DDDDAAAMMMMAAAwwwwAADDIzLgAgpQoqQDDDAAAMMMMAAAwwwwAADDDDAAAMMdGpAhASsU2DjquUex5kXBhhggAEGGGCAAQYYYIABBhhgoL8GREgRUoRkgAEGGGCAAQYYYIABBhhggAEGGGCgUwMiJGCdAnOGor9nKBw7x44BBhhggAEGGGCAAQYYYIABBsZlQIQUIUVIBhhggAEGGGCAAQYYYIABBhhggAEGOjUgQgLWKbBx1XKP48wLAwwwwAADDDDAAAMMMMAAAwww0F8DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgTlD0d8zFI6dY8cAAwwwwAADDDDAAAMMMMAAA+MyIEKKkCIkAwwwwAADDDDAAAMMMMAAAwwwwAADnRoQIQHrFNi4arnHceaFAQYYYIABBhhggAEGGGCAAQYY6K8BEVKEFCEZYIABBhhggAEGGGCAAQYYYIABBhjo1IAICVinwJyh6O8ZCsfOsWOAAQYYYIABBhhggAEGGGCAgXEZECFFSBGSAQYYYIABBhhggAEGGGCAAQYYYICBTg2IkIB1CmxctdzjOPPCAAMMMMAAAwwwwAADDDDAAAMM9NeACClCipAMMMAAAwwwwAADDDDAAAMMMMAAAwx0akCEBKxTYM5Q9PcMhWPn2DHAAAMMMMAAAwwwwAADDDDAwLgMiJAipAjJAAMMMMAAAwwwwAADDDDAAAMMMMBApwZESMA6BTauWu5xnHlhgAEGGGCAAQYYYIABBhhggAEG+mtAhBQhRUgGGGCAAQYYYIABBhhggAEGGGCAAQY6NSBCAtYpMGco+nuGwrFz7BhggAEGGGCAAQYYYIABBhhgYFwGREgRUoRkgAEGGGCAAQYYYIABBhhggAEGGGCgUwMiJGCdAhtXLfc4zrwwwAADDDDAAAMMMMAAAwwwwAAD/TUgQoqQIiQDDDDAAAMMMMAAAwwwwAADDDDAAAOdGhAhAesUmDMU/T1D4dg5dgwwwAADDDDAAAMMMMAAAwwwMC4DIqQIKUIywAADDDDAAAMMMMAAAwwwwAADDDDQqQERErBOgY2rlnscZ14YYIABBhhggAEGGGCAAQYYYICBPhooJeJTGUTIvN3HL8Ln7LgxwAADDDDAAAMMMMAAAwwwwAADDDCw9hmo7TH742iEdKDWvgPlmDgmDDDAAAMMMMAAAwwwwAADDDDAAAN9NTAaIcvqRkIaHQl5X5H7vNllgAEGGGCAAQYYYIABBhhggAEGHj8DkwNkidGQpmObhm4qPgMMMMAAAwwwwAADDDDAAAMMMMAAA2M0IEKO8clU0x+/mu6599wzwAADDDDAAAMMMMAAAwwwwAADa7eBySHSSEiVW5hlgAEGGGCAAQYYYIABBhhggAEGGGCgAwNNiJwyHXuiTsZzHh90pk1lXrsrs+Pj+DDAAAMMMMAAAwwwwAADDDDAAAMMPN4GJtriSITMTypf0X5y/387dogDABDCQPD/v0aRpmjkKJLj1GYU+dTvuzfTSgstGGCAAQYYYIABBhhggAEGGGCAAQYYaAO5L54jpFAdSg89GGCAAQYYYIABBhhggAEGGGCAAQYY+DAwSve1CvxqjBwAAAAASUVORK5CYII="
            alt="Trophy"
            style={{ height: 30, width: "auto", objectFit: "contain" }}
          />
        </div>
        <p style={{ fontSize: 12, color: "#9CA3AF" }}>
          Trophy · The trusted review platform for youth travel sports &
          independent trainers · Advertise · List Your Club
        </p>
      </footer>
    </div>
  );
}
