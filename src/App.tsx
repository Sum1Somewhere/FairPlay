// @ts-nocheck
import React, { useState, useEffect } from "react";

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
    id: "value",
    label: "Value for Money",
    icon: "💰",
    desc: "Cost vs. quality and experience",
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
  // ── BASEBALL (20 LI Orgs) ────────────────────────────────────────────────

  {
    id: 1,
    name: "Long Island Elite Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Westbury, NY",
    description:
      "One of the most respected travel baseball programs on Long Island. Elite-level competition with a serious commitment to college placement and player development.",
    overallRating: 4.8,
    totalReviews: 92,
    ratings: {
      coaching: 4.9,
      organization: 4.7,
      player_dev: 4.8,
      team_culture: 4.7,
      value: 4.2,
      facilities: 4.6,
      win_loss: 4.9,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 41, d1: 18, d2: 14, d3: 9, recentYear: 2024 },
    tags: ["Elite competition", "College pipeline", "High commitment"],
    verified: true,
  },

  {
    id: 2,
    name: "Baseball's Finest",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "9U", "10U", "11U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Westbury, NY",
    description:
      "Boutique elite program focused on the youngest age groups. Known for high-quality instruction and a competitive but developmentally focused environment for 9U–11U players.",
    overallRating: 4.6,
    totalReviews: 38,
    ratings: {
      coaching: 4.8,
      organization: 4.5,
      player_dev: 4.7,
      team_culture: 4.6,
      value: 4.0,
      facilities: 4.3,
      win_loss: 4.5,
      fun_factor: 4.7,
      tryout_required: true,
      individual_tryout: true,
      facility_access: false,
    },
    collegeCommits: { total: 0, d1: 0, d2: 0, d3: 0, recentYear: 2024 },
    tags: ["Youth development", "Small rosters", "Quality instruction"],
    verified: false,
  },

  {
    id: 3,
    name: "BEAST Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "16U", "18U"],
    travel: "National Travel",
    priceTier: "$$$$ ($3000+/yr)",
    location: "Dix Hills, NY",
    description:
      "BEAST fields nationally competitive teams out of Suffolk County. Known for high-level tournaments and a coaching staff with professional and collegiate backgrounds.",
    overallRating: 4.7,
    totalReviews: 74,
    ratings: {
      coaching: 4.8,
      organization: 4.6,
      player_dev: 4.7,
      team_culture: 4.5,
      value: 4.0,
      facilities: 4.4,
      win_loss: 4.8,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 28, d1: 11, d2: 10, d3: 7, recentYear: 2024 },
    tags: ["National competition", "Elite coaching", "College pipeline"],
    verified: true,
  },

  {
    id: 4,
    name: "LI Storm Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "West Hempstead, NY",
    description:
      "Storm Baseball is a Nassau County staple with multiple competitive teams across age groups. Storm Black is the flagship travel squad with a strong tournament record.",
    overallRating: 4.5,
    totalReviews: 61,
    ratings: {
      coaching: 4.6,
      organization: 4.4,
      player_dev: 4.5,
      team_culture: 4.6,
      value: 4.5,
      facilities: 4.2,
      win_loss: 4.4,
      fun_factor: 4.6,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 17, d1: 4, d2: 7, d3: 6, recentYear: 2024 },
    tags: ["Nassau County", "Multiple age groups", "Strong culture"],
    verified: true,
  },

  {
    id: 5,
    name: "Baseball U LI",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U", "18U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$ ($500–$1500/yr)",
    location: "New Hyde Park, NY",
    description:
      "Focused on middle and high school prep players looking to compete at the next level. Strong emphasis on individual skill development alongside team competition.",
    overallRating: 4.4,
    totalReviews: 47,
    ratings: {
      coaching: 4.6,
      organization: 4.3,
      player_dev: 4.7,
      team_culture: 4.4,
      value: 4.5,
      facilities: 4.1,
      win_loss: 4.2,
      fun_factor: 4.3,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 12, d1: 2, d2: 5, d3: 5, recentYear: 2024 },
    tags: ["HS prep", "Skill development", "Affordable"],
    verified: false,
  },

  {
    id: 6,
    name: "Dodgers Nation LI",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Bethpage, NY",
    description:
      "Large program with teams from 7U through 17U select showcase. One of the biggest organizations on LI by roster size, with a tiered competitive structure.",
    overallRating: 4.3,
    totalReviews: 83,
    ratings: {
      coaching: 4.4,
      organization: 4.2,
      player_dev: 4.3,
      team_culture: 4.4,
      value: 4.4,
      facilities: 4.1,
      win_loss: 4.2,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 22, d1: 5, d2: 9, d3: 8, recentYear: 2024 },
    tags: ["Large program", "All ages", "Tiered teams"],
    verified: true,
  },

  {
    id: 7,
    name: "B1 Ghost Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U", "18U"],
    travel: "National Travel",
    priceTier: "$$$$ ($3000+/yr)",
    location: "Holbrook, NY",
    description:
      "Elite travel program known for specialized training and a serious approach to player advancement. Ghost fields highly competitive teams in USSSA and Perfect Game tournaments.",
    overallRating: 4.7,
    totalReviews: 44,
    ratings: {
      coaching: 4.9,
      organization: 4.6,
      player_dev: 4.8,
      team_culture: 4.5,
      value: 3.9,
      facilities: 4.4,
      win_loss: 4.8,
      fun_factor: 4.3,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 19, d1: 8, d2: 7, d3: 4, recentYear: 2024 },
    tags: ["National elite", "Specialized training", "Serious commitment"],
    verified: true,
  },

  {
    id: 8,
    name: "LI Rebels Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Nesconset, NY",
    description:
      "Competitive 8U–14U program with a strong showing at USSSA qualifiers. Family-oriented culture with experienced coaches who keep the game fun while competing hard.",
    overallRating: 4.4,
    totalReviews: 36,
    ratings: {
      coaching: 4.5,
      organization: 4.3,
      player_dev: 4.4,
      team_culture: 4.7,
      value: 4.5,
      facilities: 4.0,
      win_loss: 4.3,
      fun_factor: 4.7,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 6, d1: 1, d2: 2, d3: 3, recentYear: 2024 },
    tags: ["Family culture", "USSSA", "Competitive & fun"],
    verified: false,
  },

  {
    id: 9,
    name: "Next Level Baseball NY",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Jericho, NY",
    description:
      "Professional instruction meets travel ball. Next Level pairs elite coaching with a structured travel schedule designed to maximize exposure for college-bound players.",
    overallRating: 4.6,
    totalReviews: 52,
    ratings: {
      coaching: 4.8,
      organization: 4.6,
      player_dev: 4.9,
      team_culture: 4.5,
      value: 4.0,
      facilities: 4.5,
      win_loss: 4.5,
      fun_factor: 4.3,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 24, d1: 9, d2: 9, d3: 6, recentYear: 2024 },
    tags: ["College exposure", "Pro instruction", "Showcase-focused"],
    verified: true,
  },

  {
    id: 10,
    name: "Jr. Ducks Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Central Islip, NY",
    description:
      "Formerly an Organization of the Year award winner. Jr. Ducks has a track record of college commits and a community-first approach rooted in Central Islip.",
    overallRating: 4.5,
    totalReviews: 58,
    ratings: {
      coaching: 4.6,
      organization: 4.5,
      player_dev: 4.6,
      team_culture: 4.7,
      value: 4.6,
      facilities: 4.1,
      win_loss: 4.4,
      fun_factor: 4.7,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 15, d1: 3, d2: 6, d3: 6, recentYear: 2024 },
    tags: ["Community roots", "Award-winning org", "College commits"],
    verified: true,
  },

  {
    id: 11,
    name: "MVP Baseball LI",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Massapequa, NY",
    description:
      "Nassau County program with competitive 13U National and youth travel teams. Known for solid fundamentals coaching and good value relative to top-tier programs.",
    overallRating: 4.3,
    totalReviews: 41,
    ratings: {
      coaching: 4.4,
      organization: 4.2,
      player_dev: 4.4,
      team_culture: 4.4,
      value: 4.6,
      facilities: 4.0,
      win_loss: 4.2,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 9, d1: 1, d2: 4, d3: 4, recentYear: 2024 },
    tags: ["Nassau County", "Good value", "Fundamentals focus"],
    verified: false,
  },

  {
    id: 12,
    name: "Team Siege Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U", "18U"],
    travel: "National Travel",
    priceTier: "$$$$ ($3000+/yr)",
    location: "Suffolk County, NY",
    description:
      "Highly competitive Suffolk-based travel organization. Siege fields elite teams in national tournaments and has built a reputation for developing advanced baseball IQ.",
    overallRating: 4.6,
    totalReviews: 33,
    ratings: {
      coaching: 4.8,
      organization: 4.5,
      player_dev: 4.7,
      team_culture: 4.4,
      value: 4.0,
      facilities: 4.3,
      win_loss: 4.7,
      fun_factor: 4.3,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 13, d1: 5, d2: 5, d3: 3, recentYear: 2024 },
    tags: ["National elite", "Baseball IQ", "Suffolk County"],
    verified: true,
  },

  {
    id: 13,
    name: "LI Titans Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Garden City, NY",
    description:
      "Nassau County program running youth through college prep travel teams. Titans have a strong local reputation and consistent tournament performance across age groups.",
    overallRating: 4.4,
    totalReviews: 49,
    ratings: {
      coaching: 4.5,
      organization: 4.4,
      player_dev: 4.4,
      team_culture: 4.5,
      value: 4.4,
      facilities: 4.1,
      win_loss: 4.3,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 11, d1: 2, d2: 5, d3: 4, recentYear: 2024 },
    tags: ["Nassau County", "All ages", "Consistent program"],
    verified: false,
  },

  {
    id: 14,
    name: "EEP Bandits Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Farmingdale, NY",
    description:
      "Elite travel program out of Farmingdale with high USSSA rankings. Bandits are known for fielding disciplined, well-coached teams that compete deep into tournaments.",
    overallRating: 4.7,
    totalReviews: 29,
    ratings: {
      coaching: 4.8,
      organization: 4.6,
      player_dev: 4.7,
      team_culture: 4.5,
      value: 4.1,
      facilities: 4.3,
      win_loss: 4.8,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: false,
    },
    collegeCommits: { total: 10, d1: 3, d2: 4, d3: 3, recentYear: 2024 },
    tags: ["USSSA ranked", "Disciplined play", "Elite travel"],
    verified: true,
  },

  {
    id: 15,
    name: "Team Francisco Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["12U", "14U", "16U"],
    travel: "National Travel",
    priceTier: "$$$$ ($3000+/yr)",
    location: "Farmingdale, NY",
    description:
      "Home of the Notorious 9 and Elite Academy. Team Francisco brings a high-intensity approach to player development with a national tournament footprint.",
    overallRating: 4.8,
    totalReviews: 37,
    ratings: {
      coaching: 4.9,
      organization: 4.7,
      player_dev: 4.9,
      team_culture: 4.6,
      value: 4.0,
      facilities: 4.5,
      win_loss: 4.9,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 21, d1: 10, d2: 7, d3: 4, recentYear: 2024 },
    tags: ["Notorious 9", "National elite", "Intense development"],
    verified: true,
  },

  {
    id: 16,
    name: "FP Knights Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$ (Under $500/yr)",
    location: "Floral Park, NY",
    description:
      "An affordable travel alternative for Nassau families. FP Knights offer competitive 9U–14U teams without the premium price tag, making travel ball accessible to more families.",
    overallRating: 4.2,
    totalReviews: 44,
    ratings: {
      coaching: 4.3,
      organization: 4.1,
      player_dev: 4.2,
      team_culture: 4.5,
      value: 4.9,
      facilities: 3.9,
      win_loss: 4.0,
      fun_factor: 4.6,
      tryout_required: false,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 3, d1: 0, d2: 1, d3: 2, recentYear: 2024 },
    tags: ["Affordable", "Family-friendly", "Nassau County"],
    verified: false,
  },

  {
    id: 17,
    name: "Blue Collar Bulldogs",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Oyster Bay, NY",
    description:
      "Gritty, hardworking culture that matches the name. Bulldogs focus on the North Shore 8U–13U market with a no-nonsense approach to development and competition.",
    overallRating: 4.4,
    totalReviews: 31,
    ratings: {
      coaching: 4.5,
      organization: 4.3,
      player_dev: 4.5,
      team_culture: 4.7,
      value: 4.5,
      facilities: 4.0,
      win_loss: 4.3,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 4, d1: 0, d2: 2, d3: 2, recentYear: 2024 },
    tags: ["North Shore", "Hardworking culture", "Youth focus"],
    verified: false,
  },

  {
    id: 18,
    name: "Sharks Baseball Academy",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Ronkonkoma, NY",
    description:
      "Sharks travel teams combined with year-round skills training at their Ronkonkoma facility. Strong reputation for developing pitchers and middle infielders.",
    overallRating: 4.5,
    totalReviews: 55,
    ratings: {
      coaching: 4.6,
      organization: 4.4,
      player_dev: 4.7,
      team_culture: 4.5,
      value: 4.3,
      facilities: 4.5,
      win_loss: 4.4,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 16, d1: 4, d2: 7, d3: 5, recentYear: 2024 },
    tags: ["Skills training", "Pitcher development", "Year-round"],
    verified: true,
  },

  {
    id: 19,
    name: "LI Gators Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$ (Under $500/yr)",
    location: "Nassau County, NY",
    description:
      "Youth and middle school travel program covering Nassau County. Gators are a great entry point for families new to travel baseball, with coaches who prioritize player enjoyment.",
    overallRating: 4.2,
    totalReviews: 27,
    ratings: {
      coaching: 4.3,
      organization: 4.1,
      player_dev: 4.2,
      team_culture: 4.5,
      value: 4.8,
      facilities: 3.9,
      win_loss: 4.0,
      fun_factor: 4.7,
      tryout_required: false,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 2, d1: 0, d2: 1, d3: 1, recentYear: 2024 },
    tags: ["Entry-level travel", "Youth focus", "Fun culture"],
    verified: false,
  },

  {
    id: 20,
    name: "South Shore Chiefs Baseball",
    sport: "Baseball",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Islip, NY",
    description:
      "South Shore staple serving the Islip and Sayville corridor. Chiefs run competitive travel teams with a community feel and coaches who have been with the program for years.",
    overallRating: 4.4,
    totalReviews: 39,
    ratings: {
      coaching: 4.5,
      organization: 4.3,
      player_dev: 4.4,
      team_culture: 4.6,
      value: 4.5,
      facilities: 4.0,
      win_loss: 4.3,
      fun_factor: 4.6,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 8, d1: 1, d2: 3, d3: 4, recentYear: 2024 },
    tags: ["South Shore", "Community program", "Multi-age"],
    verified: false,
  },

  // ── SOFTBALL ─────────────────────────────────────────────────────────────

  {
    id: 21,
    name: "Long Island Ducks Softball",
    sport: "Softball",
    gender: "Girls",
    ageGroups: ["10U", "12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Bethpage, NY",
    description:
      "One of Long Island's most established travel softball programs. Strong college placement record with coaches who have direct ties to D1 and D2 recruiting coordinators.",
    overallRating: 4.7,
    totalReviews: 61,
    ratings: {
      coaching: 4.8,
      organization: 4.7,
      player_dev: 4.8,
      team_culture: 4.6,
      value: 4.1,
      facilities: 4.5,
      win_loss: 4.7,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 34, d1: 12, d2: 14, d3: 8, recentYear: 2024 },
    tags: ["College pipeline", "Top coaching", "Position-specific evals"],
    verified: true,
  },

  {
    id: 22,
    name: "LI Lightning Softball",
    sport: "Softball",
    gender: "Girls",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Commack, NY",
    description:
      "Suffolk County program known for developing pitchers and catchers. Lightning has produced several D1 commits and runs structured tryouts with clear position evaluations.",
    overallRating: 4.5,
    totalReviews: 48,
    ratings: {
      coaching: 4.6,
      organization: 4.5,
      player_dev: 4.7,
      team_culture: 4.5,
      value: 4.4,
      facilities: 4.2,
      win_loss: 4.5,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: false,
    },
    collegeCommits: { total: 18, d1: 6, d2: 8, d3: 4, recentYear: 2024 },
    tags: ["Pitcher development", "College pipeline", "Structured tryouts"],
    verified: true,
  },

  // ── SOCCER ───────────────────────────────────────────────────────────────

  {
    id: 23,
    name: "Long Island SC",
    sport: "Soccer",
    gender: "Co-Ed",
    ageGroups: ["8U", "10U", "12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Uniondale, NY",
    description:
      "One of LI's premier soccer clubs with ECNL and NPL teams. LISC develops players from recreational into elite academy pathways with experienced UEFA-licensed coaches.",
    overallRating: 4.6,
    totalReviews: 87,
    ratings: {
      coaching: 4.7,
      organization: 4.5,
      player_dev: 4.7,
      team_culture: 4.6,
      value: 4.2,
      facilities: 4.4,
      win_loss: 4.6,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 52, d1: 22, d2: 18, d3: 12, recentYear: 2024 },
    tags: ["ECNL", "Elite academy", "UEFA coaching"],
    verified: true,
  },

  {
    id: 24,
    name: "Albertson SC",
    sport: "Soccer",
    gender: "Co-Ed",
    ageGroups: ["10U", "12U", "14U", "16U", "18U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Albertson, NY",
    description:
      "Long-running Nassau club with a reputation for player-centered coaching. Competes in LIJSL leagues and state cups with consistent success at mid-level competition.",
    overallRating: 4.4,
    totalReviews: 63,
    ratings: {
      coaching: 4.5,
      organization: 4.3,
      player_dev: 4.4,
      team_culture: 4.6,
      value: 4.5,
      facilities: 4.1,
      win_loss: 4.3,
      fun_factor: 4.6,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 14, d1: 3, d2: 6, d3: 5, recentYear: 2024 },
    tags: ["Player-centered", "Nassau County", "State cup contender"],
    verified: false,
  },

  // ── HOCKEY ───────────────────────────────────────────────────────────────

  {
    id: 25,
    name: "Long Island Sharks Hockey",
    sport: "Hockey",
    gender: "Boys",
    ageGroups: ["8U", "10U", "12U", "14U", "16U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Syosset, NY",
    description:
      "Competitive travel hockey out of Syosset Ice. Sharks develop players for high school and junior hockey with a structured practice-to-game ratio and experienced coaching staff.",
    overallRating: 4.5,
    totalReviews: 54,
    ratings: {
      coaching: 4.6,
      organization: 4.5,
      player_dev: 4.6,
      team_culture: 4.5,
      value: 4.0,
      facilities: 4.7,
      win_loss: 4.5,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 11, d1: 3, d2: 4, d3: 4, recentYear: 2024 },
    tags: ["Travel hockey", "HS prep", "Strong facilities"],
    verified: true,
  },

  {
    id: 26,
    name: "Islanders Hockey Club",
    sport: "Hockey",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$$$ ($3000+/yr)",
    location: "East Meadow, NY",
    description:
      "Affiliated with the NY Islanders NHL organization. Elite development program for serious players targeting AAA competition and prep/junior hockey pathways.",
    overallRating: 4.8,
    totalReviews: 42,
    ratings: {
      coaching: 4.9,
      organization: 4.7,
      player_dev: 4.9,
      team_culture: 4.6,
      value: 3.9,
      facilities: 4.8,
      win_loss: 4.8,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 18, d1: 8, d2: 6, d3: 4, recentYear: 2024 },
    tags: ["NHL affiliated", "AAA", "Elite pathway"],
    verified: true,
  },

  // ── LACROSSE ─────────────────────────────────────────────────────────────

  {
    id: 27,
    name: "Long Island Lacrosse",
    sport: "Lacrosse",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "High School"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Garden City, NY",
    description:
      "Premier lacrosse club in Nassau County. Develops players through elite coaching and a structured club-to-high school transition program with strong college placement.",
    overallRating: 4.6,
    totalReviews: 71,
    ratings: {
      coaching: 4.7,
      organization: 4.6,
      player_dev: 4.7,
      team_culture: 4.6,
      value: 4.3,
      facilities: 4.4,
      win_loss: 4.6,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: true,
      facility_access: false,
    },
    collegeCommits: { total: 39, d1: 16, d2: 14, d3: 9, recentYear: 2024 },
    tags: ["College pipeline", "Nassau County", "Club to HS pathway"],
    verified: true,
  },

  {
    id: 28,
    name: "Islander Lacrosse Club",
    sport: "Lacrosse",
    gender: "Girls",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Smithtown, NY",
    description:
      "Girls lacrosse club serving the Suffolk County market with a strong recruiting pipeline. Runs fall and spring seasons with elite showcase exposure for college-bound athletes.",
    overallRating: 4.5,
    totalReviews: 46,
    ratings: {
      coaching: 4.6,
      organization: 4.4,
      player_dev: 4.6,
      team_culture: 4.6,
      value: 4.3,
      facilities: 4.2,
      win_loss: 4.5,
      fun_factor: 4.5,
      tryout_required: true,
      individual_tryout: false,
      facility_access: false,
    },
    collegeCommits: { total: 22, d1: 8, d2: 9, d3: 5, recentYear: 2024 },
    tags: ["Girls lacrosse", "Showcase exposure", "Suffolk County"],
    verified: true,
  },

  // ── BASKETBALL ───────────────────────────────────────────────────────────

  {
    id: 29,
    name: "Long Island Lightning Basketball",
    sport: "Basketball",
    gender: "Boys",
    ageGroups: ["10U", "12U", "14U", "16U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Uniondale, NY",
    description:
      "AAU program known for developing guards and wings who go on to play high school varsity ball. Lightning runs fall and spring seasons with a strong local tournament circuit.",
    overallRating: 4.4,
    totalReviews: 57,
    ratings: {
      coaching: 4.5,
      organization: 4.3,
      player_dev: 4.5,
      team_culture: 4.5,
      value: 4.4,
      facilities: 4.1,
      win_loss: 4.4,
      fun_factor: 4.6,
      tryout_required: true,
      individual_tryout: false,
      facility_access: true,
    },
    collegeCommits: { total: 7, d1: 1, d2: 3, d3: 3, recentYear: 2024 },
    tags: ["AAU", "Guard development", "HS prep"],
    verified: false,
  },

  // ── GYMNASTICS ───────────────────────────────────────────────────────────

  {
    id: 30,
    name: "Gold Star Gymnastics",
    sport: "Gymnastics",
    gender: "Girls",
    ageGroups: ["6U", "8U", "10U", "12U", "14U"],
    travel: "State Travel",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Hicksville, NY",
    description:
      "One of Long Island's top competitive gymnastics programs. Gold Star coaches have Olympic trial experience and run a rigorous but supportive competitive track from beginner through Level 6.",
    overallRating: 4.7,
    totalReviews: 64,
    ratings: {
      coaching: 4.9,
      organization: 4.7,
      player_dev: 4.8,
      team_culture: 4.6,
      value: 4.1,
      facilities: 4.8,
      win_loss: 4.7,
      fun_factor: 4.4,
      tryout_required: true,
      individual_tryout: true,
      facility_access: true,
    },
    collegeCommits: { total: 8, d1: 2, d2: 4, d3: 2, recentYear: 2024 },
    tags: ["Olympic-trained coaches", "Competitive track", "Top facilities"],
    verified: true,
  },

  // ── VOLLEYBALL ───────────────────────────────────────────────────────────

  {
    id: 31,
    name: "LI Juniors Volleyball",
    sport: "Volleyball",
    gender: "Girls",
    ageGroups: ["12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$ ($500–$1500/yr)",
    location: "Melville, NY",
    description:
      "Club volleyball program with a track record of placing players in college programs. LI Juniors competes in AAU and USAV circuits with multiple teams per age group.",
    overallRating: 4.5,
    totalReviews: 53,
    ratings: {
      coaching: 4.6,
      organization: 4.5,
      player_dev: 4.6,
      team_culture: 4.6,
      value: 4.3,
      facilities: 4.3,
      win_loss: 4.5,
      fun_factor: 4.6,
      tryout_required: true,
      individual_tryout: false,
      facility_access: true,
    },
    collegeCommits: { total: 19, d1: 5, d2: 8, d3: 6, recentYear: 2024 },
    tags: ["AAU", "USAV", "College placement"],
    verified: true,
  },

  // ── SWIMMING ─────────────────────────────────────────────────────────────

  {
    id: 32,
    name: "Long Island Aquatic Club",
    sport: "Swimming",
    gender: "Co-Ed",
    ageGroups: ["8U", "10U", "12U", "14U", "16U", "18U"],
    travel: "State Travel",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Hauppauge, NY",
    description:
      "LIAC is one of Long Island's most decorated competitive swim clubs. Coaches develop athletes from age group through senior levels with a focus on technique and meet preparation.",
    overallRating: 4.8,
    totalReviews: 78,
    ratings: {
      coaching: 4.9,
      organization: 4.8,
      player_dev: 4.9,
      team_culture: 4.7,
      value: 4.2,
      facilities: 4.8,
      win_loss: 4.8,
      fun_factor: 4.5,
      tryout_required: false,
      individual_tryout: false,
      facility_access: true,
    },
    collegeCommits: { total: 31, d1: 14, d2: 10, d3: 7, recentYear: 2024 },
    tags: ["Elite swim club", "Technique focus", "D1 pipeline"],
    verified: true,
  },

  // ── TENNIS ───────────────────────────────────────────────────────────────

  {
    id: 33,
    name: "North Shore Tennis Academy",
    sport: "Tennis",
    gender: "Co-Ed",
    ageGroups: ["8U", "10U", "12U", "14U", "16U", "18U"],
    travel: "Regional (1–2 hr)",
    priceTier: "$$$ ($1500–$3000/yr)",
    location: "Port Washington, NY",
    description:
      "Junior tennis development with USTA-certified coaches. Runs individual and group training alongside USTA tournament prep with college placement guidance for serious players.",
    overallRating: 4.6,
    totalReviews: 41,
    ratings: {
      coaching: 4.8,
      organization: 4.6,
      player_dev: 4.7,
      team_culture: 4.5,
      value: 4.0,
      facilities: 4.7,
      win_loss: 4.5,
      fun_factor: 4.4,
      tryout_required: false,
      individual_tryout: false,
      facility_access: true,
    },
    collegeCommits: { total: 11, d1: 4, d2: 4, d3: 3, recentYear: 2024 },
    tags: ["USTA certified", "Tournament prep", "College guidance"],
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
            onChange ? "cursor-pointer" : "cursor-default"
          }`}
          style={{
            color: (hover || value) >= star ? "#F59E0B" : "#D1D5DB",
            background: "none",
            border: "none",
            padding: 0,
          }}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange && onChange(star)}
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

function RatingBar({ label, value, icon }) {
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
function ProgramCard({ program, onClick }) {
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
  const [helpful, setHelpful] = React.useState(review.helpful || 0);
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
        <span
          onClick={() => setHelpful((h) => h + 1)}
          style={{
            cursor: "pointer",
            userSelect: "none",
            fontSize: 12,
            color: "#9CA3AF",
          }}
        >
          👍 {helpful} found helpful
        </span>
      </div>
    </div>
  );
}

function WriteReviewModal({ program, onClose, onSubmit }) {
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

function ProgramDetail({ program, reviews, onBack, onReview }) {
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
function TrainerCard({ trainer, onClick }) {
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

function TrainerDetail({ trainer, reviews, onBack }) {
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
function AddProgramModal({ onClose, onSubmit }) {
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

          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setShowAddProgram(true)}
              style={{
                padding: "5px 10px",
                border: "1.5px solid #1e3a5f",
                borderRadius: 6,
                background: "#fff",
                color: "#1e3a5f",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              + Add Program
            </button>
            <button
              onClick={() => setShowAddTrainer(true)}
              style={{
                padding: "5px 10px",
                border: "1.5px solid #10B981",
                borderRadius: 6,
                background: "#fff",
                color: "#10B981",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              + List as Trainer
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
            src="https://i.imgur.com/9zwYUWm.png"
            alt="Trophy"
            style={{ height: 30, width: "auto", objectFit: "contain" }}
          />
        </div>
        <p style={{ fontSize: 12, color: "#9CA3AF" }}>
          Trophy · The trusted review platform for youth travel sports &
          independent trainers ·{" "}
          <span
            onClick={() => setView("advertise")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Advertise
          </span>{" "}
          ·{" "}
          <span
            onClick={() => setShowAddProgram(true)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            List Your Club
          </span>
        </p>
      </footer>
    </div>
  );
}
