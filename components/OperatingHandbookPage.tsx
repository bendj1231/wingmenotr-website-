
import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { IMAGES } from '../constants';
import { EpauletBars } from './EpauletBars';

interface OperatingHandbookPageProps {
  onBackToLanding: () => void;
  onGoToEnrollment: () => void;
  onGoToDeveloper: () => void;
}

// --- DEFAULT CONTENT DATA ---
// Temporarily hold original content to facilitate re-indexing
const ORIGINAL_FULL_CONTENT: Record<number, any> = {
  0: { 
      title: "WingMentor\nHandbook", 
      subtitle: "Program Operating Handbook (POH) • 2024 Edition",
      restricted: "Restricted Distribution",
      serial: "Serial No. WM-PH-001"
  },
  1: { // User Agreement Page
      section: "LEGAL",
      title: "User Agreement & Liability",
      p1: "NATURE OF SERVICE\nWing Mentorship operates strictly as a peer-to-peer support, guidance, and consultation community. It is imperative to understand that we are NOT a flight school, Approved Training Organization (ATO), or certified flight training provider. We do not provide flight instruction, ground school credit, or endorsements for any aviation licenses under any regulatory body (FAA, EASA, CAAP, etc.).",
      p2: "CONSULTATION LIMITATIONS\nAll information provided herein is for mentorship and supplemental understanding only. It does not replace, supersede, or constitute official instruction from a Certified Flight Instructor (CFI/FI) or an authorized training facility. Users are responsible for verifying all information with their official flight instructors.",
      p3: "CODE OF CONDUCT\nAll members are expected to maintain the highest standards of professionalism and integrity. Harassment, discrimination, or any form of disrespectful behavior towards mentors, mentees, or staff will not be tolerated. This platform is a professional development environment; all communications should reflect this ethos. Violations will be subject to review and may lead to immediate suspension of services.",
      p4: "TERMINATION OF SERVICE\nWing Mentorship reserves the right to terminate or suspend access to the program at its sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.",
      p5: "LIABILITY WAIVER\nWing Mentorship, its founders, and affiliates are not liable for any academic failures, incidents, accidents, regulatory violations, or financial losses incurred by the member. The user assumes full responsibility for the safety and legality of their flight operations. Participation is voluntary and supplemental.",
      ack: "I HAVE READ AND UNDERSTOOD THE LIMITATIONS OF THIS SERVICE. I ACKNOWLEDGE THAT WING MENTOR IS A A SUPPORT SERVICE, NOT A FLIGHT SCHOOL."
  },
  2: { // This was the original Waiver of Liability. Its content is now split.
      section: "LEGAL",
      title: "Waival of Liability",
      p1: "I release Wing Mentorship and its affiliates ('releasees') from all liability for any loss, damage, or injury, including death, sustained by me or my property while participating in the program, regardless of cause, including the negligence of the releasees.",
      p2: "I am fully aware of the risks of aviation consultation and voluntarily assume all risks of injury, death, or property damage. I acknowledge this is a complete and unconditional release of liability to the fullest extent permitted by law, and agree that if any part is held invalid, the remainder will stay in effect.",
      h_policy: "4. NON-INTERFERENCE POLICY",
      p_policy: "The Wing Mentorship Program is designed as a supplementary resource. We strictly adhere to a policy of non-interference with your official flight training provider. Our mentors will never contradict the safety instructions, standard operating procedures (SOPs), or direct commands of your Certified Flight Instructor. In any instance of conflicting advice, the instruction of your official flight school takes absolute precedence.",
      h_privacy: "5. PRIVACY & CONFIDENTIALITY",
      p_privacy: "Your privacy is paramount. Wing Mentorship operates under a strict Non-Disclosure Agreement (NDA) policy. All personal information, flight training records, and consultation details shared with your mentor are confidential. We do not collect, sell, or distribute your data. Your outreach to us is a private matter, and we are committed to maintaining that trust.",
      affirmation: "By signing below, I affirm that I have read, understood, and agree to be bound by the terms and conditions outlined in the User Agreement and this Waiver of Liability."
  },
  3: { // Table of Contents Page 1 - INTRODUCTION & CHAPTER 1
      section: "CONTENTS",
      title: "Table of Contents"
  },
  4: { // Table of Contents Page 2 - CHAPTER 2
      section: "CONTENTS (CONT.)",
      title: "CHAPTER 2: Understanding The Low Timer Gap"
  },
  5: { // Table of Contents Page 3 - CHAPTER 3 & Remaining Sections
      section: "CONTENTS (CONT.)",
      title: "CHAPTER 3, 4 & 5: PRM & Solutions"
  },
  6: { // NEW INTRODUCTORY PAGE (formerly index 5)
      section: "CHAPTER 1", // Changed section to CHAPTER 1
      title: "CHAPTER 1: Introduction to Program", // Changed title to reflect chapter
      image: "https://lh3.googleusercontent.com/d/1U7pwMY1-ZsvNYC0Np3fVw5OhW3rTD5DR",
      p1: "The Wing Mentorship Program is specifically designed for newly commercial and low-timer pilots seeking direction in their careers. Recognizing the aviation industry's need for experience where pilot-centric internships are scarce, we offer a unique peer-to-peer consultation and preparation platform."
  },
  7: { // Original page 3 (Welcome Page)
      section: "INTRODUCTION",
      title: "Welcome Aboard",
      welcomeP1: "Welcome to the Wing Mentor Program. You have taken a decisive step towards bridging the critical gap between licensure and a professional career. This program is engineered to provide you with the structure, support, and verifiable experience necessary to navigate the complexities of the aviation industry. Your journey towards command starts now.",
      teamP1: "The entire Wing Mentor operational team is here to support you. We are a collective of active pilots, instructors, and industry professionals dedicated to your success. We manage the logistics, verify the experience, and ensure the standards of this program are upheld with unwavering integrity. Consider us your ground crew, ready to ensure your flight path is clear and your objectives are met.",
      founderP1: "On behalf of the entire Wing Mentor team, we extend our warmest welcome. You have officially joined a dedicated community of aviators committed to excellence, mutual support, and overcoming one of the industry's greatest challenges.",
      founderP2: "You are now more than a pilot; you are a vital contributor to a movement that is reshaping the future of aviation careers. We operate with professionalism, integrity, and a relentless focus on our collective success. This handbook is your guide. Welcome aboard.",
      founder1Name: "Benjamin Tiger Bowler",
      founder1Sig: "Benjamin T. Bowler",
      founder2Name: "Karl Brian Vogt",
      founder2Sig: "Karl B. Vogt",
      founderTitle: "Founder"
  },
  8: { // OLD PAGE 5 (formerly index 6)
      section: "INTRODUCTION",
      title: "Operational Briefing: Program Framework", 
      image: "https://lh3.googleusercontent.com/d/1U7pwMY1-ZsvNYC0Np3fVw5OhW3rTD5DR",
      h1: "Our Mission: Bridging the Gap",
      p1: "The Wing Mentor Program is an operational framework engineered to address a critical system failure in the aviation career pipeline: The Low Timer Gap. Our mission is to provide newly licensed commercial pilots with a structured, verifiable pathway to build the essential experience, command authority, and professional acumen required by the industry.", 
      h2: "The Symbiotic Airframe: Mentor & Mentee", 
      p2: "This program operates on a symbiotic principle. Mentees receive precise, surgical guidance from experienced peers to overcome specific training hurdles. Concurrently, Mentors engage in a structured system that transforms their support into verifiable, logged experience—a powerful asset that demonstrates leadership, problem-solving, and Crew Resource Management (CRM) skills, creating a distinct advantage in a saturated job market.", 
      h3: "Core Program Benefits & Learning Outcomes",
      benefits: [
          "Hands-On Peer-to-Peer Consultation",
          "Communication & Networking",
          "Investment Knowledge & Risk Management",
          "Leadership & Command Authority",
          "Verifiable Experience",
          "Industry Acumen"
      ],
      hFounders: "A Message From The Founders",
      pFounders: "We couldn't stand by and watch qualified pilots give up. The gap in the industry isn't a lack of talent; it's a lack of opportunity. Wing Mentor is our answer to the 'experience paradox'—providing a structured environment where pilots can prove their worth and keep their dreams alive.", 
      founder1Name: "Benjamin Tiger Bowler",
      founder2Name: "Karl Vogt", // Corrected founder 2 name
      founderTitle: "Founder"
  },
  9: { // Bridging The Gap (formerly index 7)
    section: "THE GAP",
    title: "Bridging The Gap",
    image: "https://lh3.googleusercontent.com/d/12VPkbqiI9oEIt6KCp2Zdm9AlipCICWda",
    p1Header: "what is the low timer gap ?",
    p1: "\"The void between ability and opportunity.\"\nThe \"Low Timer Gap\" is the aviation industry's most perilous unspoken reality. It is the operational chasm that exists between graduating flight school with a Commercial Pilot License (~200 hours and meeting the rigorous entry requirements of a major airline (often 1500 hours or significant Turbine experience).",
    learnMore: "you will learn more about the pilot gap",
    approachTitle: "our approach to bridging the gap",
    approachParagraph: "Within the Wing Mentor Program, you will experience real aviation industry expectations. We transform your thinking from a fresh graduate to a seasoned pilot, instilling real pilot ethics, mentor standards, and the foundational information to assess any situation. We guide you to be aware of aviation investments regarding your status as a pilot. We provide hands-on experience and one-to-one consultation, getting you ready for your next interview so you can say, 'I've helped X amount of pilots with their IR, PPL, etc.,' backed by documented and verified practical Crew Resource Management and mentor skills."
  },
  10: { // The Wing Mentor Approach Chart (formerly index 8)
      section: "OPERATIONAL FRAMEWORK",
      title: "The Wing Mentor Approach Chart",
      intro: "Our program follows a structured, cyclical process designed to convert specific flight training challenges into measurable improvements in skill and confidence.",
      steps: [
          {
              num: "01",
              title: "THE DEBRIEF: PROBLEM IDENTIFIED",
              desc: "Following a lesson with your Certified Flight Instructor (CFI), you receive a grading sheet highlighting areas needing improvement. This document becomes the mission objective."
          },
          {
              num: "02",
              title: "THE CONSULTATION: SUPPORT REQUESTED",
              desc: "You submit the grading sheet and relevant notes through the Wing Mentor platform to schedule a session with a qualified mentor."
          },
          {
              num: "03",
              title: "THE ASSESSMENT: MENTOR ANALYSIS",
              desc: "Your Wing Mentor reviews the data, diagnoses the root cause of the issue, and prepares a tailored consultation plan. This is the 'Doctor's' preparation phase."
          },
          {
              num: "04",
              title: "THE SESSION: GUIDANCE PROVIDED",
              desc: "In a one-on-one session (online or in-person), the mentor guides you through the problem, utilizing diagrams, simulators, and practical examples to build deep understanding."
          },
          {
              num: "05",
              title: "THE LOGBOOK: EXPERIENCE VERIFIED",
              desc: "The session is meticulously documented in the official Wing Mentor logbook, detailing the issue, consultation provided, and duration, signed by the mentee. This creates a verifiable record of experience for the mentor."
          },
          {
              num: "06",
              title: "THE PRE-FLIGHT: PROFICIENCY APPLIED",
              desc: "Armed with new insights and strategies, you are fully prepared for your next flight with your CFI, ready to demonstrate mastery and turn a weakness into a strength."
          }
      ],
      closing: "This cycle repeats, creating a powerful feedback loop that accelerates learning and builds a robust foundation of aviation excellence.",
      supervisionNote: "Within your first 20 hours, you will be supervised by one of our Wing Mentor team members to see if you get the gist of consultation. Once you have completed your 20 hours, your Wing Mentor passport will be stamped, marking the completion of the first milestone within the program."
  },
  11: { // BECOMING A MENTEE CHECKLIST (formerly index 9)
    section: "ONBOARDING PROCEDURES",
    title: "2.0 Becoming a Mentee Checklist",
    intro: "This procedure details the standard pathway for inducting a new Mentee into the Wing Mentor Program and defines the tiered access to program resources.",
    
    inductionChecklistHeader: "2.1 MENTEE PROCEDURES",
    inductionSteps: [
        {
            title: "1. REGISTRATION:",
            substeps: ["a. Complete WM-FORM-002 (Mentee Application)."]
        },
        {
            title: "2. VETTING INTERVIEW:",
            substeps: ["a. Conduct brief interview to verify identity and understand mentee's objectives."]
        },
        {
            title: "3. LEGAL BRIEFING:",
            substeps: [
                "a. Review User Agreement and Waiver of Liability (See POH Pages 01-02).",
                "b. Obtain signed acknowledgment."
            ]
        },
        {
            title: "4. SYSTEM ONBOARDING:",
            substeps: [
                "a. Create user account on the Wing Mentor platform.",
                "b. Provide orientation on scheduling and communication features."
            ]
        }
    ],

    accessInfoHeader: "2.2 FULL ACCESS: THE BLACK BOX",
    accessInfoText: "Full, unrestricted access to \"THE BLACK BOX\" knowledge vault is granted upon logging 10.0 hours of verified consultation. This includes PPL/CPL/IR/ME PowerPoint libraries, checkride preparation materials, and access to high-stakes investment and career strategy forums.",
    
    contactHeader: "FURTHER INQUIRIES",
    contactInfo: "For further inquiries on your application to the free Wing Mentor program, please contact us. Terms and conditions apply.",
    email: "wingmentorprogram@gmail.com",
    facebook: "Wing Mentorship Program"
  },
  12: { // BECOMING A MENTOR CHECKLIST (formerly index 10)
    section: "ONBOARDING PROCEDURES",
    title: "1.0 Becoming a Mentor Checklist",
    intro: "Becoming a mentor requires completing the procedures outlined below. This section details how the application works, walking you through each step and how it is conducted.",
    
    preRequisitesHeader: "1.1 PRE-REQUISITES",
    preRequisites: [
        "Minimum License: Private Pilot License (PPL) or higher.",
        "Application: Complete and submit WM-FORM-001 (Mentor Application)."
    ],

    onboardingSequenceHeader: "1.2 JUNIOR MENTOR PROCEDURES",
    onboardingSteps: [
        {
            title: "1. INITIAL ASSESSMENT:",
            substeps: [
                "a. Review of application and pilot credentials.",
                "b. Verification of license and ratings with governing authority."
            ]
        },
        {
            title: "2. KNOWLEDGE & SKILLS VERIFICATION (KSV):",
            substeps: [
                "a. Administer written examination appropriate to applicant's license tier.",
                "b. Conduct practical consultation scenario to assess problem-solving and communication skills.",
                "c. KSV must be graded as SATISFACTORY by a Wing Mentor Team Lead."
            ]
        },
        {
            title: "3. TIER ASSIGNMENT:",
            substeps: [
                "a. Assign mentor tier based on verified qualifications (PPL, CPL, IR, ME).",
                "b. Mentor is authorized to consult only up to their assigned tier."
            ]
        },
        {
            title: "4. SYSTEM ORIENTATION:",
            substeps: [
                "a. Briefing on the Wing Mentor platform, logbook procedures, and communication protocols.",
                "b. Issue Operating Handbook (WM-POH-2024)."
            ]
        },
        {
            title: "5. FINAL CERTIFICATION:",
            substeps: [
                "a. Mentor status activated in the system.",
                "b. Welcome packet dispatched."
            ]
        }
    ],

    promotionNotice: "Once completion of 20 hours of mentor supervision with an official Wing Mentor team, you will be granted from Junior Mentor to Official Mentor.",
    contactHeader: "FURTHER INQUIRIES",
    contactInfo: "For further inquiries on your application to the free Wing Mentor program, please contact us. Terms and conditions apply.",
    email: "wingmentorprogram@gmail.com",
    facebook: "Wing Mentorship Program"
  },
  13: { // WING MENTOR PASSPORT (formerly index 11)
    section: "DOCUMENTATION",
    title: "Wing Mentor Passport",
    subtitle: "Identification & Program Milestones and Achievements",
    passportTitle: "WINGMENTOR PASSPORT",
    description: "The Wing Mentor Passport is a critical component of your professional development. It serves as your official record of progress, documenting key milestones, achievements, and successfully completed mentorship hours. This document is a tangible testament to your commitment, providing verifiable proof of your experience and readiness for the next stage of your aviation career.",
    barDescription: "The identification bars at the bottom of the passport represent your level within the mentor database. 2 bars represent a Private Pilot (PPL), 3 bars represent a Commercial Pilot (CPL), and 4 bars signify an official Wing Mentor with advanced ratings such as IR or ME."
  },
  14: { // WINGLOGS APP PAGE (formerly index 12)
    section: "DOCUMENTATION",
    title: "The WingLogs App",
    subtitle: "Digital Logbook & Milestone Tracking",
    image: IMAGES.LOGBOOK_IMG,
    p1: "Introducing WingLogs, the official digital companion app for the Wing Mentor Program. This powerful tool digitizes your mentorship journey, moving beyond a simple logbook to become a comprehensive platform for tracking progress, verifying experience, and celebrating achievements.",
    p2_header: "Core App Benefits:",
    logged_items: [
      "**Seamless Logging:** Effortlessly record consultation sessions, issues addressed, and mentee verifications with a few taps.",
      "**Real-Time Progress:** Visualize your mentorship hours and see your impact grow with intuitive dashboards and analytics.",
      "**Milestone Tracking:** Automatically monitor your progress towards key program goals, suchs as the 20-hour supervised period.",
      "**Digital Portfolio:** Export your verified logbook as a professional PDF, ready for interviews and applications."
    ],
    p3_header: "Milestones & Achievements System",
    p3: "The WingLogs app features an integrated achievement system designed to recognize and reward your dedication. Unlock digital badges for key milestones, such as 'First Solo Mentorship,' 'IFR Specialist,' and '20 Hour Veteran.' These achievements serve as tangible proof of your skills and can be shared on professional networks, adding a modern, gamified edge to your aviation portfolio.",
    p4: "The app ensures every hour of your hard work is documented, verified, and celebrated, providing you with a dynamic record of your journey from low-timer pilot to an experienced and respected Wing Mentor."
  },
  15: { // NEW PAGE: WINGMENTOR APP (formerly index 13)
    section: "PLATFORM & TECHNOLOGY",
    title: "The WingMentor App",
    subtitle: "Your All-in-One Digital Cockpit",
    image: "https://lh3.googleusercontent.com/d/1Ljf5gDeTJ8wW57hAEjBNSgTXq50BTplT",
    p1: "Welcome to the flagship Wing Mentor App, your all-in-one digital cockpit for career navigation. This centralized platform consolidates all essential program tools into a single, intuitive interface, streamlining your path from low-timer pilot to seasoned professional. Access key resources including:",
    features_list: [
      "Digital Passport",
      "Digital Logbook (WingLogs)",
      "Black Box Database",
      "The Pilot Gap Forum",
      "Filling the Gap Mindmap",
      "etc."
    ],
    p_closing: "By integrating these powerful tools, the WingMentor App eliminates fragmentation and provides a seamless workflow from consultation to verifiable experience. It is your dedicated flight management system for navigating the Low Timer Gap."
  },
  16: { // NEW PAGE: DEDICATED FORUM PAGE (formerly index 14)
    section: "PLATFORM & TECHNOLOGY",
    title: "The Pilot Gap Forum",
    subtitle: "Community Intelligence & Strategy",
    image: "https://lh3.googleusercontent.com/d/1pYASyFTu3ZAhh164lz_uwK-6215ODOmW",
    
    h_forum: "The Pilot Gap Forum",
    p_forum: "Access the collective intelligence of the Wing Mentor community. This secure forum is a hub for critical discussions on industry trends, career strategies, and overcoming the Low Timer Gap. Share insights, ask questions, and connect with peers and senior mentors.",
    p_info: "The forum is a dynamic environment where real-world problems are dissected and solved collaboratively. It is the tactical briefing room for your career, providing up-to-the-minute intelligence from pilots who are actively navigating the industry.",
    p_closing: "Leverage this community to stay ahead of the curve, build your professional network, and make informed decisions about your future in aviation."
  },
  17: { // NEW PAGE: THE BLACK BOX (formerly index 15)
    section: "KNOWLEDGE VAULT",
    title: "The Black Box",
    subtitle: "Deeply Guarded Information Access",
    image: "https://lh3.googleusercontent.com/d/17-xbS9NOukudNIfLoYveLEShZABV4OXR",
    p1: "The Black Box is your centralized repository for mission-critical knowledge and intelligence. It's a comprehensive digital library designed to provide you with a decisive edge in your training and career. This vault contains a wealth of curated information, giving you free access to essential resources that are often difficult to find or expensive to acquire.",
    p2_header: "Contents Include:",
    resources_list: [
      "**PowerPoints & Study Materials:** Detailed presentations covering key theoretical concepts.",
      "**Examination Reviews:** In-depth reviews for major regulatory bodies including FAA, CAAP, and EASA.",
      "**Aircraft Manuals:** A library of Pilot Operating Handbooks (POHs) for various aircraft.",
      "**Rating-Specific Guides:** Tailored information for CPL, IR, ME, PPL, and specialized content for SPL."
    ],
    p_closing: "Access to The Black Box is granted upon completing the mentee vetting process, ensuring this valuable information is available to dedicated members of the Wing Mentor community."
  },
  18: { // OLD PAGE 14 (formerly index 16)
    section: "PLATFORM & TECHNOLOGY",
    title: "Platform Resources",
    subtitle: "Knowledge, Tools, and Community",
    
    h_terminal: "Examination Terminal",
    p_terminal: "Our dedicated preparation hub is designed to ensure you are always ahead of the curve, including Quizlets, checkride prep, and KSV exams for mentors.",
    
    h_handbook: "Digital Handbook",
    p_handbook: "Access this entire Operating Handbook anytime, anywhere. The digital version is fully searchable and always up-to-date.",
    
    h_shop: "Shop",
    p_shop: "Gear up for your journey. Access the official WingMentor Hangar Shop to browse exclusive apparel and essential pilot gear.",
    
    h_about: "About Us",
    p_about: "Learn more about the mission, vision, and the founders behind Wing Mentor. Understand the story that fuels our commitment.",

    h_mindmap: "The Gap Mind Map",
    p_mindmap: "This mind map illustrates the pilot's journey, the critical 'Low Timer Gap', and how Wing Mentor provides a strategic bridge to a successful aviation career. View the full mind map on the WingMentor App.",
    image: "https://lh3.googleusercontent.com/d/10Q1nBwxCfzJALwYXH74wwO0Zh6V8eggZ"
  },
  19: { // NEW INTRODUCTORY PAGE FOR THE GAP (formerly index 17)
      section: "CHAPTER 2", // Changed section to CHAPTER 2
      title: "CHAPTER 2: Understanding The Low Timer Gap", // Changed title to reflect chapter
      subtitle: "Understanding the Industry's Greatest Hurdle",
      image: "https://lh3.googleusercontent.com/d/12VPkbqiI9oEIt6KCp2Zdm9AlipCICWda",
      p1: "You've earned your Commercial Pilot License. You are qualified, skilled, and ready. Yet, you face an invisible wall. This is the 'Low Timer Pilot Gap'—the critical period where newly-licensed pilots possess the qualifications but lack the flight hours required for airline consideration.",
      learn_header: "IN THIS SECTION YOU WILL LEARN:",
      learn_points: [
          "The definition and mechanics of the \"Low Timer Gap\".",
          "Why the \"Saturation Event\" stalls careers at 200 hours.",
          "The financial risks of Training Bonds and un-contracted Type Ratings.",
          "Real-world case studies of investment failures (and how to avoid them)."
      ],
      p_closing: "This section of the handbook will dissect the gap, analyze its causes, and present the Wing Mentor framework as the definitive solution to navigate this challenge."
  },
  20: { // OLD PAGE 17 (formerly index 18)
      section: "THE GAP",
      title: "The Low Timer Pilot Gap",
      description: "This mind map illustrates the typical pilot's journey, highlighting the critical 'Low Timer Gap' that emerges after obtaining a Commercial Pilot License. It visualizes the common point of stagnation and introduces the Wing Mentorship Program as the strategic bridge to a successful aviation career.",
      mindMapNodes: [
        { label: "Student Pilot", color: "default" },
        { label: "Private Pilot", color: "default" },
        { label: "Commercial Pilot", color: "default" },
        { label: "The Low Timer Gap", color: "red", pulse: true },
        { label: "Wingmentorship Program", color: "green" },
      ]
  },
  21: { // OLD PAGE 18 (formerly index 19)
      section: "THE GAP",
      title: "THE PILOT PARADOX: PLAN B & THE LOOP",
      subtitle: "THE PIVOT TO INSTRUCTION",
      p1: "When the realization hits—that Plan A (Airlines) is impossible—the mass of pilots executes a collective pivot to Plan B: Flight Instruction. They return to their own flight schools, not out of a passion for teaching, but out of necessity for flight hours.",
      subtitle2: "SATURATION OF PLAN B",
      p2: "Consequently, the flight schools become flooded with their own graduates clamoring for instructor positions.\nThe competition for Plan B becomes just as fierce as Plan A. We now have a \"Pilot Paradox\": A massive supply of pilots, a massive demand for flight hours, but a bottleneck that prevents the flow of careers.",
      subtitle3: "THE ENDLESS HOLD: WAITING FOR CLEARANCE",
      p3: "Let's look at the structure: It is a closed loop. 1. Pilots invest capital to learn to fly. 2. They graduate and cannot find airline jobs (The Gap). 3. They reinvest to become Instructors (CFI). 4. Their primary job is to teach \"new\" students who are aiming for the same airline dream.",
      p4: "This creates a cycle where the instructor relies on new students to build the hours needed to leave. It is important to note that this is a structural reality of the industry, not a malicious design by flight schools. Schools provide the necessary training and facilities, but the airline industry's entry barriers create this loop. It is a paradox where the system unintentionally necessitates a constant influx of new students to propel the careers of the previous class.",
      image: "https://lh3.googleusercontent.com/d/17avqeJjB6sm0LDDsceBu3odsZZgg1vJf"
  },
  22: { // NEW PAGE (formerly index 20)
      section: "MARKET REALITY",
      title: "THE INSTRUCTOR BOTTLENECK: PLAN B SATURATION",
      h1: "THE FLIGHT SCHOOL WAITING LIST",
      p1: "The dilemma extends beyond the airlines. The universally accepted 'Plan B' for low-timer pilots—becoming a Flight or Ground Instructor to build hours—has become as saturated as the airline market itself. This creates a secondary bottleneck, trapping pilots in a prolonged holding pattern.",
      h2: "A DECADE-LONG QUEUE: REAL-WORLD DATA",
      p2: "Data from a credible administrative source within a major flight school reveals a startling reality (identities withheld for legal protection): a prospective instructor faces a minimum two-year waiting list. The backlog contains over 2,000 applicants. More shockingly, pilots from batches as far back as 2015 are still returning to apply, creating a queue that is nearly a decade long.",
      h3: "THE IMPLICATION: A CAREER HOLDING PATTERN",
      p3: "This is not a temporary delay; it is a systemic crisis. The 'safe' fallback option is no longer viable for the vast majority. Without a strategic alternative, pilots are left with expired ratings, diminished skills, and a dream that fades on an endless waiting list. The system forces you into a holding pattern with no clearance in sight.",
      image: "https://lh3.googleusercontent.com/d/1wbDJzyNdVrtr-IBIm1XFPF0yPHTxqvIm"
  },
  23: { // Data Analysis (formerly index 21)
    section: "DATA ANALYSIS",
    title: "THE SATURATION EVENT: DATA ANALYSIS",
    h1: "THE 94% CONSENSUS",
    p1: "Survey data reveals a staggering consensus: **94%** of students entering flight school list **\"Major Airline Pilot\"** as their primary career goal. This singularity of purpose creates a funnel effect. Thousands of individuals enter the pipeline with diverse backgrounds, yet they all emerge aiming for the exact same narrow exit.",
    p2: "Critically, **74%** of these students are completely unaware of the challenges awaiting them post-graduation.\nThey do not know about the **1500-hour hurdle**, the **insurance minimums**, or the **lack of entry-level turbine jobs** until they have already spent their tuition.",
    p3: "We must be clear: This is not a failure of the education system or flight schools. These institutions excel at their mandate: producing licensed, safe aviators. Rather, this **\"Blind Spot\"** is a lack of shared knowledge regarding market realities.",
    p4: "We are not pointing fingers at flight schools or anyone; we are providing vital information that should not be disregarded or turned away with blindness.",
    h2: "PILOTS WITHOUT FAMILY HISTORY IN AVIATION - THE BLIND INVESTMENT",
    p5: "Furthermore, over **80%** of new pilots come from **non-aviation backgrounds**. They do not have family members in the industry to warn them of the cyclical nature of hiring or the **\"Gap\"**. They invest blindly, trusting that their license will lead directly to a job. Without mentorship or industry foresight, they are walking into a **saturation event** completely unprotected.",
    p6: "For those without aviation lineage, the path is often navigated blind. You are sold a dream by flight schools that rely on your tuition, but the post-graduation reality is omitted. This leads to the **Saturation Loop**: where unhired graduates return to schools as instructors, saturating the only entry-level job market available."
  },
  24: { // The Paradox of the Aviation Dream (formerly index 22)
    section: "DATA ANALYSIS",
    title: "THE PARADOX OF THE AVIATION DREAM",
    image: "https://lh3.googleusercontent.com/d/1LA5l4GToDFNcm6hfETU4BzqDdrNFM1cL",
    p1: "The journey begins with a first-year aviation student proudly declaring, 'I want to be an airline pilot.' This dream persists through the second year, but by the third, reality crystallizes the need for flight hours, shifting the goal to becoming a flight instructor. By the fourth year, this pragmatic strategy is the only goal. As these newly minted instructors are about to begin their careers, they see the reflection of the next generation of hopeful students in the glass. They realize their job is now to 'keep them believing the aviation dream.' This is the paradox of the aviation pipeline: a self-sustaining loop where today's graduates, who once held the same dream, must now sell it to the next generation as the only way to build their own flight hours and escape the holding pattern.",
    p2: "This cycle creates what can be described as an unintentional Ponzi scheme perpetuated by the pilots themselves. Generation A becomes instructors to build flight time. To do so, they need students, so they recruit Generation B by selling them the airline pilot dream. Once Generation B graduates, they face the same time-building hurdle and must also become instructors. They, in turn, recruit Generation C, continuing the cycle. The entire system hinges on a constant supply of new students; if that influx ever dried up, the low-time pilots would have no pathway to the airlines. The industry, by its structure, relies on a perpetual stream of new dreamers to fuel the time-building of those already in the system."
  },
  25: { // Hiring Manager's Dilemma (formerly index 23)
      section: "MARKET REALITY",
      title: "THE HIRING MANAGER'S DILEMMA",
      image: "https://lh3.googleusercontent.com/d/1wdy3fKWTzzw9ZVAoNgk0EnKUUOo2Bp-A", // Replaced with new Unsplash link
      h1: "THE 1,000 RESUME STACK",
      p1: "Put yourself in the shoes of an Airline Hiring Manager. Every year, a fresh wave of graduates hits your desk. You are staring at a stack of 1,000 resumes. Every single one lists a Commercial Pilot License. Every single one lists ~200 hours of flight time. They are, for all operational purposes, identical.",
      h2: "THE WEALTH FACTOR",
      p2: "In this stack, you have the son of a politician, the daughter of an an investment banker, and the former construction worker who scraped together every penny (like myself). The industry is largely blind to these backgrounds at the entry level. Wealth can buy a license, it can buy a type rating, but it cannot buy the experience required to command a jet. When the door is closed due to saturation, it is closed for everyone.",
      h3: "THE IMPOSSIBLE CHOICE",
      p3: "This flips to the \"Saturation Event\". When supply (pilots) vastly exceeds demand (seats), the hiring criteria shift from \"Qualified\" to \"Experienced\". The manager cannot hire the 200-hour pilot because they have 500 applicants with 1500 hours waiting in the lobby. The newly licensed pilot, regardless of their passion or financial backing, simply cannot compete on paper. They are washed out by the tide of saturation."
  },
  26: { // New Economic Trap Page (formerly index 24)
      section: "FINANCIAL INTELLIGENCE",
      title: "THE ECONOMIC TRAP: PILOT DEBT SPIRAL",
      subtitle: "The Illusion of Investment vs. True Return",
      image: IMAGES.ECONOMIC_TRAP_IMG,
      p1: "For many aspiring pilots, the journey is not just about mastering skills but also navigating a treacherous financial landscape. The promise of an airline career often leads to significant investment in licenses, ratings, and even speculative type ratings, sometimes without a guaranteed return. This section dissects the financial pitfalls and how they can lead to an 'Economic Trap' – a cycle of debt and diminished opportunity.",
      h_debt: "THE ESCALATING DEBT: A LOOMING THREAT",
      p_debt: "The path to an airline job can involve accumulating layers of debt: initial flight training loans, additional loans for speculative type ratings, and even 'pay-to-fly' schemes. Pilots can find themselves $150,000+ in debt before even securing a paid position. This financial burden significantly reduces flexibility and increases psychological pressure, making it harder to walk away from unfavorable contracts or endure long waiting periods."
  },
  27: { // New 68% Blind Spot Page (formerly index 25)
    section: "MARKET REALITY",
    title: "THE 68% BLIND SPOT: THE COMFORT TRAP",
    p1: "A cycle of negligence in aviation colleges leads 68% of student pilots to disregard industry realities. Lulled by institutional promises, they are conditioned to a linear path, unprepared for the decade of post-graduation grind. Flight schools prioritize enrollment, insulating students from volatile industry truths, focusing on semesters over career demands.",
    image: IMAGES.COMFORT_TRAP_IMG, 
    p3: "Tragically, the blinders usually only come off when the course is nearly complete. It is only in the final months, as the debt matures and the safety net of the curriculum vanishes, that the 68% finally look up. They emerge from the classroom not into a waiting jet, but into a saturated market requiring hustle they were never taught to expect. By prioritizing the comfort of the present over the hard truths of the future, they find themselves holding a license to learn, but with nowhere to fly."
  },
  28: { // NEW CHAPTER 3 TITLE PAGE (formerly index 26)
      section: "CHAPTER 3",
      title: "CHAPTER 3: PILOT RISK MANAGEMENT (PRM)",
      p1: "Navigating the financial and strategic risks of an aviation career. This chapter provides the framework to assess opportunities, protect your capital, and make decisions based on verified return on investment rather than emotion or speculation.",
      isChapterPage: true 
  },
  29: { // MODIFIED: Simplified PRM Introduction (formerly index 27)
      section: "FINANCIAL INTELLIGENCE",
      title: "WHAT IS PILOT RISK MANAGEMENT (PRM)?",
      subtitle: "Risk, Reality, and ROI",
      image: "https://lh3.googleusercontent.com/d/1A6mN-AzPIDqgev13r8Wz9UfzsOYeR5e3", // Replaced with new Google User Content link
      p1_main_intro: "Pilot Risk Management (PRM) is the systematic process of identifying, assessing, and mitigating the financial and career risks associated with aviation training and employment. It is as critical as flight safety management; just as you manage fuel and weather, you must manage your career capital. Why is it important? Because a single miscalculated investment—like a premature type rating—can ground your career before it takes off, leaving you with debt and expired qualifications. In Chapter 2, we explored the 'Pilot Gap'—the systemic void between graduation and airline employment. PRM correlates directly to this gap. The gap creates desperation, and desperation leads to poor risk assessment. Understanding the gap is the threat identification; PRM is the error management strategy to survive it.",
  },
  30: { // MODIFIED: Now contains only Risk-Taker & Trend-Follower from original page 29 (formerly index 28)
      section: "FINANCIAL INTELLIGENCE",
      title: "Type Ratings: Investment Psychology (Part 1)",
      subtitle: "The Risk-Taker Profile", // Updated to remove mention of Trend-Follower
      p1: "A Type Rating is more than a license; it is a high-stakes investment in your career. The decision to pursue one, especially without a guaranteed job, is deeply influenced by your psychological approach to risk and reward. Understanding your profile is the first step to making a sound financial decision.",
      
      h_risk: "1. THE RISK-TAKER (THE GAMBLER)",
      p_risk: "Driven by the allure of the 'shiny jet,' the Risk-Taker sees a speculative Type Rating as a high-stakes bet to shortcut the career ladder. This approach is often emotional, fueled by the hope of 'skipping the line' and landing a dream job immediately. They invest heavily in an intangible, perishable asset with no safety net, accepting a high probability of total loss for a small chance of a massive payoff.",
      img_risk: "https://lh3.googleusercontent.com/d/150esENxD-zGryPZqDkYv_9_ipglShiqn",

      // Removed h_trend and p_trend as per request
      p_conclusion: "Which profile are you? The following pages will delve deeper into these dynamics, providing tools to think like an Analyst and avoid the pitfalls of the Risk-Taker." // Updated
  },
  31: { // NEW INSERTED PAGE: The Analyst: The Strategist Profile (formerly index 29)
      section: "FINANCIAL INTELLIGENCE",
      title: "The Analyst: SThe Strategist Profile",
      subtitle: "Calculated Risk & Long-Term Value",
      image: IMAGES.ANALYST_PROFILE_IMG, // UPDATED IMAGE
      h_analyst_full: "THE ANALYST (THE STRATEGIST)", // Renamed to avoid key collision, now contains full text
      p_analyst_full: "The Analyst treats their career as a business and every decision as a capital allocation. They analyze the risk-versus-reward ratio, asset liquidity, and capital preservation. They compare the non-liquid, high-maintenance cost of a speculative Type Rating against tangible assets (like an an aircraft) or experience-building pathways (like mentorship). The Analyst only invests in a Type Rating when a signed employment contract mitigates the financial risk, ensuring a clear return on investment.",
      p_closing_analyst: "This profile embodies the strategic approach to aviation career management. It is about making informed choices to build a resilient and rewarding career."
  },
  32: { // MOVED from old 29 (was original 28) - PRM II (formerly index 30)
      section: "FINANCIAL INTELLIGENCE",
      title: "The ACTION Pilot Safety Investment Checklist", // UPDATED TITLE
      p_intro_action: "The 'ACTION' framework offers a disciplined approach to career-defining investments. Don't invest blindly; invest with ACTION.", // Shortened paragraph
      action_checklist: [
          { letter: 'A', principle: 'Assess', description: 'Assess my current status (hours, level, finances, goals).' },
          { letter: 'C', principle: 'Cost Check', description: 'Scrutinize all Costs, especially hidden or Currency (recurrence) fees.' },
          { letter: 'T', principle: 'Track Record', description: 'Review the Track record of previous investments and expected outcomes.' },
          { letter: 'I', principle: 'Investigate', description: 'Investigate all information; don\'t gamble or jump ahead.' },
          { letter: 'O', principle: 'Ownership', description: 'Confirm the tangible Ownership (physical product or documentation).' },
          { letter: 'N', principle: 'Non-Refundable?', description: 'Determine if the investment is refundable (Non-refundable) or has favorable exit terms.' },
      ],
  },
  33: { // Introduction to Type Ratings (formerly index 31)
    section: "FINANCIAL INTELLIGENCE",
    title: "INTRODUCTION TO TYPE RATINGS",
    subtitle: "The High-Sakes Qualification",
    h1: "WHAT IS A TYPE RATING?",
    p1: "A Type Rating is an aircraft-specific certification required to act as pilot in command of large (over 12,500 lbs) or turbojet-powered aircraft. It is the key that unlocks the cockpit of an airliner, but it comes with significant financial and strategic implications, especially for a low-time pilot.",
    h2: "THE 'GOLDEN TICKET' FALLACY",
    p2: "Many new pilots view a speculative Type Rating—one paid for without a job offer—as a golden ticket to bypass the 'Low Timer Gap'. This is a dangerous misconception. An airline hiring manager sees a low-time pilot with a B737 rating not as an experienced aviator, but as a candidate who took a high-risk gamble. Without the flight hours to back it up, the rating's value is minimal.",
    h3: "THE SUBSCRIPTION TRAP: A PERISHABLE ASSET",
    p3: "A type rating is not a one-time purchase; it is a subscription with a high recurring cost. To remain 'current,' you must undergo expensive proficiency checks every 6-12 months. Without an airline job to cover these costs, you are paying thousands simply to maintain a qualification you cannot use, trapping you in a costly financial holding pattern.",
    image: "https://lh3.googleusercontent.com/d/1_4Kc9uMPMavNCm9h-8WqQL9WPiJ37s1Y"
  },
  34: { // Choosing a Type Rating (formerly index 32)
      section: "FINANCIAL INTELLIGENCE",
      title: "CHOOSING A TYPE RATING",
      subtitle: "Aircraft Categories & Strategic Pathways",
      p_choosing: "Not all type ratings are created equal, especially for a low-time pilot. The allure of a 'heavy' jet like an Airbus A320 is strong, but it may not be the most strategic first step. A smarter approach involves aligning the aircraft type with your current experience level and the most probable entry points into the industry. This is where understanding Aircraft Approach Categories (CAT) becomes crucial.",
      cat_box_header: "INTRODUCTION TO CAT I, II, & III",
      cat_box_p1: "An aircraft's Category (CAT) rating—CAT I, II, or IIIa/b/c—is a certification based on its avionics and performance, defining the absolute minimum weather conditions (decision height and runway visual range) in which it can legally land. It is a critical factor for all-weather operations and a key metric of an airline's operational reliability, directly impacting its ability to maintain schedules in adverse weather.",
      cat_box_p2: "**Crucially, a pilot must also be endorsed with a corresponding Category rating to fly these approaches.** Being type-rated on a CAT I aircraft (like an A320) does not automatically make you a CAT I qualified pilot. You are licensed *for* the aircraft, but not yet qualified *to operate it* in those minimums.",
      cat_box_p3: "These pilot CAT ratings are typically obtained through specialized training and endorsement from an airline or approved operator. You cannot get a CAT rating on your own.",
      image: "https://lh3.googleusercontent.com/d/1_kf90W760h29SQfnTJimb2C000Dz908n",
  },
  35: { // Strategic Pathways (formerly index 33)
      section: "FINANCIAL INTELLIGENCE",
      title: "STRATEGIC PATHWAYS: CAT RATINGS",
      subtitle: "Military vs. Civilian Experience",
      h_military: "MILITARY vs. CIVILIAN PATHWAY",
      p_military: "This is why military pilots often transition seamlessly into airlines. Their training environment inherently involves operating in minimum weather conditions, so they build the skills and receive the qualifications to be CAT-rated as part of their service. In contrast, a civilian flight instructor may have thousands of hours in a non-CAT-rated Cessna, flying in clear weather. While valuable, this experience does not prepare them for the rigors of a low-visibility CAT I approach in a jet.",
      h_recommendation: "A STRATEGIC RECOMMENDATION",
      p_recommendation: "The jump from a Cessna to a CAT I Airbus A320 is immense. A more strategic pathway is to start with a CAT II or CAT III rated turboprop, such as an ATR, LET L-410, Twin Otter, or Dornier 228. These aircraft are more forgiving, operate in environments that build relevant experience, and provide a more gradual and logical progression towards heavy jets. It aligns your investment with your actual skill level, making you a more viable and less risky candidate for regional airlines.",
      image: IMAGES.STRATEGIC_PATHWAYS_IMG // NEW image added here
  },
  36: { // Shiny Jet Syndrome (formerly index 34)
      section: "FINANCIAL ANALYSIS",
      title: "The Trap: \"Shiny Jet Syndrome\"",
      // Removed p1: "A low-time pilot (250 hours) looks at the path ahead:",
      mistake: "The Mistake: They believe that having the qualification (Type Rating) is the same as having the experience. This belief, coupled with poor financial foresight, often leads to a financial death spiral with typical self-sponsored mistakes as follows:", // Updated text here
      debts: [
          "Initial Training Debt: $80,000 - $100,000 (Private through Commercial/CFI).",
          "The \"Speculative\" Type Rating: The pilot takes out a new loan for $30,000 - $40,000 to get type-rated on a Boeing 737 or Airbus A320.",
          "The \"Line Training\" Scheme (Pay-to-Fly): Some predatory agencies say, \"You have the rating, but no hours in the jet. Pay us $30,000 and we will let you fly 500 hours as a First Officer on a real airline.\""
      ],
      result: "The Result: The pilot is now $150,000+ in debt. They are often working for free (or paying to work). If the airline goes bust, or they fail a checkride, they are left with a massive loan and zero income.",
      image: "https://lh3.googleusercontent.com/d/1HnJ9Wyx4hvEKI1bSye5_QCtlArG1Njs6" // Added new image
  },
  37: { // NEW: Content from original page 37 (THE SUBSCRIPTION TRAP) -- NOW ON PAGE 39 (content swapped from 38)
      section: "FINANCIAL INTELLIGENCE",
      title: "THE SUBSCRIPTION TRAP",
      subtitle: "1.8 CASE FILE: CAPT. J",
      p1: `"Capt. J" (name changed) represents the "Holding Pattern" tragedy. She is currently employed as a Flight Instructor at a renowned, accredited school. She holds an active A320 Type Rating.`,
      h_hold: "THE 5-YEAR HOLD",
      p_hold: "She has been applying to airlines for 5 years. Why is she still an instructor? Because the queue is thousands of pilots long.",
      h_cost: "THE COST OF WAITING",
      cost_amount: "$10,000 USD",
      cost_freq: "EVERY 6 MONTHS",
      p_cost: "She is working as an instructor simply to pay the subscription fee for a job she doesn't have. It is the classic \"Not a Penny More, Not a Penny Less\" nightmare-digging the hole deeper, terrified that if she stops paying, she loses everything she has invested so far (the Sunk Cost Fallacy). She is trapped in a cycle of paying for the \"hope\" of a job.",
      image: IMAGES.SUBSCRIPTION_TRAP_IMG,
      // Removed h_verdict and p_verdict from here
  },
  38: { // CASE ANALYSIS: THE VERDICT ON 'CAPT. J' (formerly index 36, content swapped from 38)
      section: "FINANCIAL INTELLIGENCE",
      title: "CASE ANALYSIS: THE VERDICT ON 'CAPT. J'",
      subtitle: "A Forensic Review of Strategic Errors",
      error1_h: "ERROR 1: THE LINEAR PATH FALLACY",
      error1_p: "Her primary error was a failure of strategic foresight. She followed the conventional, saturated path: CPL -> Speculative Type Rating -> CFI. This linear approach is taught in flight schools but ignores the market reality that a Type Rating is not a golden ticket. It is a perishable asset that requires a job to maintain its value.",
      error2_h: "ERROR 2: MISMATCHED EXPERIENCE & CREDIBILITY",
      error2_p: "Crucially, her 1000 Cessna hours, while demonstrating general flight proficiency, were not a credible enough foundation for an A320 type rating, which demands complex aircraft systems knowledge and multi-crew experience. A more strategic initial step would have been an ATR (or similar turboprop) rating, offering a more relevant and achievable transition to multi-engine turbine operations. The leap from a single-piston to a heavy jet was too great, signaling a lack of industry awareness to recruiters.",
      error3_h: "THE SUBSCRIPTION MODEL", // Moved from page 37 (original file)
      error3_p: "A Type Rating is not a one-time purchase; it is a subscription. To keep it valid, she must undergo recurrency training every 6 months.", // Moved from page 37 (original file)
      final_verdict_h: "STRATEGIC ANALYSIS",
      final_verdict_p: "The case of 'Capt. J' provides a critical lesson in career strategy, risk management, and the realities of the type rating market. This detailed forensic analysis reviews the errors made and the strategic alternatives that could have been pursued."
  },
  39: { // NEW: Content from original page 39 (Type Rating Investment: Banker vs Casino Manager) -- NOW ON PAGE 39 (content swapped from 37)
      section: "FINANCIAL INTELLIGENCE",
      title: "Type Rating Investment:\nBanker vs Casino Manager",
      subtitle: "High Risk Gamble Mindset vs.\nCalculated Risk & Safe Investments",
      intro: "The decision to invest in a Type Rating (an intangible skill) versus a Cessna 172 (a physical asset) reveals a fundamental conflict in financial philosophy. Is the aviation career path a long-term investment to be managed, or a high-stakes gamble to be maximized?",
      col1_title: "The Casino Manager's View (The Gamble)",
      col1_text: "The Casino Manager views the Type Rating ($25k–$40k) as a high-variance bet with maximum potential leverage. The goal is to maximize the return-to-risk ratio by capitalizing on the pilot's desperation. \"In this game, the pilot is the chip, and the Type Rating is the buy-in. It's a non-refundable, non-negotiable entry fee. The fact that the pilot must borrow to pay is what gives the house—the hiring entity—maximum advantage.\"",
      col2_title: "The Banker-Investor's View (The Safety Net)",
      col2_text: "The Banker-Investor views the Cessna 172 ($80k–$150k) as the superior investment. Their strategy is centered on capital preservation, liquidity, and mitigating downside risk. \"The Type Rating is pure expense, not an asset. It has no physical value, cannot be sold, and is worthless if you lose your medical or fail the checkride. The Cessna is a bond fund with wings—it's capital you can recover.\"",
      table_header: "FINANCIAL FORENSICS: SCENARIO 6 MILLION PESOS",
      optA_title: "OPTION A: TYPE RATIN (A320)",
      optA_phys: "Physicality: NONE. Intangible privilege.",
      optA_liq: "Liquidity: ZERO. Cannot be sold.",
      optA_maint: "Recurrency: ~$10k/yr. Mandatory.",
      optA_risk: "Risk: EXTREME. 100% loss if expired.",
      optA_quote: "\"A privilege, not property. If you don't pay to renew, you lose 100% of the principal investment. It's a subscription you can't cancel.\"",
      optB_title: "OPTION B: AIRCRAFT (Cessna 172)",
      optB_phys: "Physicality: YES. Tangible property.",
      optB_liq: "Liquidity: HIGH. Global market.",
      optB_maint: "Maintenance: Variable. Adds value.",
      optB_risk: "Risk: LOW. Equity retention.",
      optB_quote: "\"A secure equity asset with utility.\"",
      conclusion: "CONCLUSION: Investing in a Type Rating without a signed contract is functionally equivalent to placing a bet. Investing in verifiable experience or assets (Wing Mentor / Aircraft) is investing in equity. Choose wisely."
  },
  40: { // The Final Verdict Analysis (formerly index 38, content swapped from 40) -> Previously 42
      section: "FINANCIAL INTELLIGENCE",
      title: "The Final Verdict Analysis",
      subtitle: "Comparing Costs: Subscription vs. Ownership",
      h1: "ARGUMENT A: THE TYPE RATING (SUBSCRIPTION)",
      p2: "The Type Rating is a perishable asset with a 6-month shelf life. To keep it valid, you must pay roughly $10,000 annually for recurrency. It is effectively a subscription service for a job you do not yet have. If you stop paying, the asset dissolves, and you lose 100% of the principal investment.",
      h2: "ARGUMENT B: THE AIRCRAFT (MAINTENANCE)",
      p3: "Critics validly argue that owning a Cessna 172 also incurs approximately $10,000 in annual maintenance and hangar fees. This is true. In terms of pure cash outflow, you are 'spending' money in either scenario to maintain your readiness and legal status.",
      h3: "FINAL VERDICT: THE BANKER WINS",
      p4: "The Banker wins this case decisively due to one factor: Liquidity. If a life emergency arises—such as unexpected hospital bills—the aircraft is a tangible asset that can be sold to recover your capital. A Type Rating cannot be liquidated; it is a sunk cost. Furthermore, the aircraft grants you immediate access to fly without waiting for interviews. Yes, the recurrency costs $10k, and maintenance costs $10k, but overall, you are spending either way. Be wise and invest with peace of mind.",
      image: "https://lh3.googleusercontent.com/d/1My79_PxBzY4MDZcd3dv5Me4qgRazdBg8" // NEW Image for Final Verdict Analysis
  },
  41: { // NEWLY INSERTED PAGE: Benefits of Aircraft Ownership
      section: "FINANCIAL INTELLIGENCE",
      title: "Aircraft Ownership: A Tangible Investment",
      subtitle: "Equity, Liquidity, and Operational Freedom",
      image: IMAGES.CESSNA_152_IMG_1, // Using an existing relevant image
      p_intro: "While a Type Rating offers a license, aircraft ownership offers an asset. This page dissects the tangible advantages of investing in an aircraft, contrasting it with the perishable nature of a speculative rating.",
      h1: "1. Tangible Asset & Liquidity",
      p1: "Unlike an intangible rating, an aircraft is a physical product. You own it. This means you can sell it in an emergency to recover capital, providing a crucial safety net that a non-liquid type rating cannot. It's an investment with a real asset behind it.",
      h2: "2. Operational Freedom & Hour Building",
      p2: "Instead of waiting years for an airline interview to start flying regularly, owning an aircraft grants you immediate operational freedom. You can build valuable Pilot In Command (PIC) and Cross-Country (XC) hours on your own schedule. This is active, verifiable experience that significantly enhances your resume and skill set.",
      h3: "3. Cost Management & Potential Income",
      p3: "While aircraft ownership involves maintenance, hangar fees, and insurance (similar to the recurring costs of type rating recurrency), these expenses can be offset. You have the potential to rent out your aircraft or use it for paid flight services, turning it into an income-generating asset. Furthermore, well-maintained aircraft often appreciate in value, offering a long-term financial return."
  },
  42: { // The Training Bond: Financial Handcuffs (formerly index 39, now 44)
      section: "FINANCIAL REALITY",
      title: "The Training Bond: Financial Handcuffs",
      p1: "The Training Bond is a critical, often punitive, legal agreement that affects nearly all low-time pilots entering the commercial aviation world. It is the financial mechanism that keeps the pilot tethered to their first employer, regardless of salary or working conditions.",
      bullet1_header: "The Mechanics: Debt & Drawdown",
      bullet1_text: "The employer pays for training (e.g., a Type Rating), and the pilot legally owes this cost ($20k-$40k). The debt amortizes monthly over 2-5 years. However, if you quit early, the remaining balance is due immediately—an illustration of the financial constraints.",
      bullet2_header: "The Trap: Missed Opportunities",
      bullet2_2ext: "In periods of high demand, major airlines may hire aggressively. Pilots under bond are forced to watch peers jump to better careers while they remain stuck, unable to afford the 'buyout' of their freedom.",
      // Removed conflict_header, conflict_text, and icon from here
      image: "https://lh3.googleusercontent.com/d/11xlI3MUDLgRVA1dnRwlIiKu9dvpWuwV3"
  },
  43: { // Training Bonds & Flight Time (formerly index 40, now 45)
      section: "INDUSTRY KNOWLEDGE",
      title: "TRAINING BONDS & FLIGHT TIME",
      p1: "When airlines do open their doors to low-time pilots, it often comes with \"Golden Handcuffs.\"",
      
      h2: "ECONOMICS 101: WHAT IS A BOND?",
      p2: "Imagine borrowing money from a bank. You promise to pay it back over time. If you don't, they take your house (collateral). A \"Bond\" is a promise of security that locks up your assets.",
      
      h3: "FLIGHT TIME BONDS",
      p3: "A Flight Time Bond is similar to a bank loan, but instead of borrowing cash for a house, you \"borrow\" the cost of your training from the airline. In exchange, you surrender your freedom of employment for a fixed period— typically 5 years.",
      
      h4: "INDUSTRY EXAMPLE: CEBU PACIFIC",
      p4: "Value: ~1.6 Million Pesos (approx $28,000 USD)\nTerm: 5 Years\nThe Trap: If you leave early (even if you are unhappy or find a better job), you owe the full pro-rated amount immediately.",
      
      p5: "This is essentially a mortgage on your career.",

      // NEW CONTENT: Safety Paradox moved from original page 44
      h_safety_paradox: "The Safety Paradox",
      p_safety_paradox: "The bond incentivizes flying at all costs to reduce debt. This financial pressure can compromise ethical decisions regarding fatigue, sick leave, or maintenance reporting. It transforms a career opportunity into indentured service.",
      safety_icon: "fa-lock", // Added for consistent rendering of the moved block
      safety_icon_color: "text-red-500" // Added for consistent rendering
  },
  44: { // NEW: Content from original page 41 (Glossary of Terms), now 46
      section: "REFERENCE",
      title: "Glossary of Terms",
      terms: [
          { term: 'ATC', def: 'Air Traffic Control: A service provided by ground-based controllers who direct aircraft on the ground and through controlled airspace.' },
          { term: 'ATO', def: 'Approved Training Organization: A flight school or organization certified by a national aviation authority to provide specific types of aviation training.' },
          { term: 'CAT', def: 'Aircraft Approach Category: A classification of aircraft based on their approach speed, determining the minimums for instrument approaches.' },
          { term: 'CFI', def: 'Certified Flight Instructor: A person licensed to teach others how to fly an aircraft.' },
          { term: 'CRM', def: 'Crew Resource Management: The effective use of all available resources (human, hardware, and information) to achieve safe and efficient flight operations.' },
          { term: 'IFR', def: 'Instrument Flight Rules: A set of regulations governing flight under conditions where navigation by visual reference to the ground is not possible.' },
          { term: 'KSV', def: 'Knowledge & Skills Verification: An internal Wing Mentor assessment to evaluate a mentor candidate\'s proficiency and communication abilities.' },
          { term: 'PIC', def: 'Pilot in Command: The person ultimately responsible for the operation and safety of an aircraft during flight time.' },
          { term: 'POH', def: 'Pilot\'s Operating Handbook: An official document containing all the necessary information to operate an aircraft safely.' },
          { term: 'Type Rating', def: 'A certification required to act as pilot in command of a specific type of aircraft that is large (over 12,500 lbs) or turbojet-powered.' },
          { term: 'VFR', def: 'Visual Flight Rules: A set of regulations under which a pilot operates an aircraft in weather conditions clear enough to see where the aircraft is going.' }
      ]
  },
  45: { // NEW: Content from original page 42 (Backend Operations & Protocols), now 47
      section: "SYSTEMS",
      title: "Backend Operations & Protocols",
      sec1Title: "3.1 System Configuration Access",
      sec1Text: "The Wing Mentor platform features a dynamic backend configuration system accessible only to authorized administrators. This interface allows for the modification of system assets, including imagery, video feeds, and text protocols, in real-time without requiring full system redeployment. This ensures the handbook remains a living document.",
      sec2Title: "3.2 Local Persistence Protocol",
      sec2Text: "Modifications made via the backend editor are committed to local browser storage (LocalStorage). This ensures that customized visual assets persist across sessions while maintaining system integrity. Authorized users can reset these configurations to factory defaults at any time via the Developer Console."
  },
  46: { // NEW: Content from original page 43 (Closing 1), now 48
      section: "CLOSING",
      quote: "Bridging the gap between license and career. Experience lived, not just logged. Your logbook tells a story; make sure it is one of persistence, not stagnation.",
      url: "www.wingmentor.com"
  },
  47: { // NEW: Content from original page 44 (Closing 2), now 49
      section: "CLOSING",
      quote: "Bridging the gap between license and career. Experience lived, not just logged. Your logbook tells a story; make sure it is one of persistence, not stagnation.",
      url: "www.wingmentor.com"
  },
  48: { // NEW: Content from original page 45 (Closing 3), now 50
      section: "CLOSING",
      quote: "Bridging the gap between license and career. Experience lived, not just logged. Your logbook tells a story; make sure it is one of persistence, not stagnation.",
      url: "www.wingmentor.com"
  }
};


// Define the new content for the inserted page (at new index 10)
const NEW_PAGE_CONTENT_INSERTED: any = {
    section: "INTRODUCTION",
    title: "Operational Briefing: Program Framework (Cont.)",
    p1: "Building on our mission to bridge the Low Timer Gap, the Wing Mentor Program is structured around core principles designed to foster genuine growth and verifiable expertise. We emphasize a proactive approach to career development, moving beyond passive hour-building to active skill refinement and strategic networking.",
    h_principles: "Core Principles of Engagement",
    principles_list: [
        "**Targeted Consultation:** Focus on specific challenges identified in mentee debriefs.",
        "**Verifiable Progress:** All mentorship interactions are meticulously logged and validated.",
        "**Skill Amplification:** Transform theoretical knowledge into practical, command-ready experience.",
        "**Community & Ethics:** Cultivate a supportive, professional, and compliant aviation network."
    ],
    h_dynamics: "Mentor-Mentee Dynamics: A Synergistic Partnership",
    p_dynamics: "The relationship between mentor and mentee is a cornerstone of our program. Mentors gain invaluable leadership and communication skills through structured guidance, while mentees receive precise, peer-level support to navigate their training. This creates a powerful feedback loop where both parties accelerate their development, ensuring mutual benefit and contributing to a stronger, more resilient aviation community.",
    image: IMAGES.HERO_ALT // Placeholder image for a framework/partnership
};

// --- DEFINE NEW CHAPTER 4 CONTENT (8 PAGES) ---
const NEW_CHAPTER_4_CONTENT: any[] = [
    {   // Page 1: Chapter 4 Title
        section: "CHAPTER 4",
        title: "CHAPTER 4: WING MENTOR SOLUTIONS",
        subtitle: "The Wing Mentor Approach: From Understanding to Execution",
        p1: "You now understand the systemic nature of the Pilot Gap and the financial imperative of Pilot Risk Management (PRM). This chapter transitions from analysis to action. It details the operational execution of the Wing Mentor Approach, guiding you through the practical application of our platform to build verifiable experience, solve complex training problems, and navigate your path to the flight deck.",
        isChapterPage: true
    },
    {   // Page 2: From Awareness to Action
        section: "WING MENTOR SOLUTIONS",
        title: "From Awareness to Action",
        h1: "THE OPERATIONAL SHIFT",
        p1: "Knowledge of the Gap is not enough; survival requires a strategic pivot in how you operate. You must transition from a passive student mindset—waiting for instruction—to an active consultant mindset—diagnosing problems and providing solutions. Wing Mentor is the vehicle for this transition.",
        h2: "THE MENTOR'S MANDATE",
        p2: "Your mission is clear: Utilize the Wing Mentor ecosystem to actively engage with the pilot community. You are no longer just building hours; you are building a professional portfolio. Every interaction, every logbook entry, and every resolved issue is a data point proving your competence to future employers.",
        image: "https://lh3.googleusercontent.com/d/1U7pwMY1-ZsvNYC0Np3fVw5OhW3rTD5DR" 
    },
    {   // Page 3: The Consultative Command
        section: "WING MENTOR SOLUTIONS",
        title: "The Consultative Command",
        h1: "THE 'DOCTOR' ANALOGY REVISITED",
        p1: "Effective problem solving requires a methodical approach. As a Wing Mentor, you adopt the 'Doctor's' stance. You do not re-teach the entire syllabus; you diagnose the specific ailment.",
        h2: "THE DIAGNOSTIC WORKFLOW",
        steps: [
            "1. INTAKE (Grading Sheet): Review the mentee's instructor feedback. Where did they fail?",
            "2. DIAGNOSIS (Root Cause): Is it a lack of knowledge, procedure, or stick-and-rudder skill?",
            "3. PRESCRIPTION (The Session): Apply a targeted fix using diagrams, simulation, or theory.",
            "4. CLEARANCE (Verification): Log the session as 'Issue Addressed' once competence is shown."
        ],
        p2: "This workflow ensures efficiency. You are not replacing the flight instructor; you are the specialized consultant brought in to fix a specific bottleneck."
    },
    {   // Page 4: Navigating The Terminal
        section: "OPERATIONAL NAVIGATION",
        title: "Navigating The Hub Terminal",
        h1: "YOUR OPERATIONAL BASE",
        p1: "The Wing Mentor Hub is designed as an airport terminal for a reason: it is a place of transit, connection, and departure. Understanding its layout is crucial for efficient workflow.",
        locations: [
            "**DEPARTURE BOARD:** Your daily briefing. Check active missions and program updates.",
            "**THE GAP FORUM:** The intelligence center. Engage in live discussions and strategic planning.",
            "**THE BLACK BOX:** The archive. Retrieve static data, POHs, and study materials.",
            "**WING LOGS:** The record keeper. Your verifiable proof of work."
        ],
        p2: "Treat the Hub as your cockpit. Scan it regularly. Situational awareness within the platform is as vital as it is in the air."
    },
    {   // Page 5: Intelligence Integration
        section: "WING MENTOR SOLUTIONS",
        title: "Intelligence Integration: Forum vs. Vault",
        h1: "LIVE INTEL VS. STATIC KNOWLEDGE",
        p1: "A superior pilot uses all available resources. The Wing Mentor platform offers two distinct types of intelligence:",
        h2: "THE PILOT GAP FORUM (Dynamic)",
        p2: "Use this for real-time problem solving. 'Has anyone flown the ILS 06 lately? Is the glideslope reliable?' This is crowd-sourced, up-to-the-minute operational data.",
        h3: "THE BLACK BOX (Static)",
        p3: "Use this for foundational truth. 'What is the exact holding speed for a C172?' This is the library—immutable, verified, and reference-grade.",
        p4: "The successful mentor synthesizes these. They use the Forum to identify current trends and the Black Box to validate the technical solutions."
    },
    {   // Page 6: Multi-Mentee Operations
        section: "ADVANCED OPERATIONS",
        title: "Multi-Mentee Operations",
        h1: "MANAGING THE WORKLOAD",
        p1: "As you advance, you will likely manage multiple mentees simultaneously. This mirrors the workload of an airline captain managing crew, ATC, and systems. It is a test of your Crew Resource Management (CRM).",
        h2: "THE SCHEDULING DISCIPLINE",
        p2: "Do not overcommit. A fatigued mentor makes errors. Use the WingLogs app to schedule sessions with adequate buffers. Prioritize quality of consultation over quantity of hours.",
        h3: "CASE MANAGEMENT",
        p3: "Treat each mentee as a separate 'flight file'. Keep detailed notes on their specific progress. Confusion between mentees is unprofessional and erodes trust. 'Standardization' of your teaching method allows you to scale your support without losing quality."
    },
    {   // Page 7: The Verification Engine
        section: "WING MENTOR SOLUTIONS",
        title: "The Verification Engine",
        h1: "LOGS ARE CURRENCY",
        p1: "In aviation, if it isn't logged, it didn't happen. The WingLogs system is the engine that converts your effort into currency.",
        h2: "INTEGRITY OF THE RECORD",
        p2: "Your logbook is a legal document. Ensure every entry is accurate, verified by the mentee, and categorized correctly (PPL, IR, CPL support).",
        h3: "THE 20-HOUR CHECK",
        p3: "Remember the initial milestone: 20 hours of supervised mentorship. This is your 'Checkride' for the program. Approach every session during this phase as if an examiner is watching—because the Senior Team is reviewing your logs for quality assurance."
    },
    {   // Page 8: The Departure Gate
        section: "WING MENTOR SOLUTIONS",
        title: "The Departure Gate: Your Exit Strategy",
        h1: "THE GOAL IS TO LEAVE",
        p1: "Wing Mentor is not a destination; it is a departure gate. Our ultimate measure of success is when you no longer need us.",
        h2: "BUILDING THE EXIT PACKET",
        p2: "When you walk into an airline interview, you will carry:",
        list: [
            "Your official Logbook (Flight Hours)",
            "Your WingLogs Portfolio (Mentorship Experience)",
            "A Network of Peers (Wing Mentor Community)",
            "Financial Literacy (PRM Awareness)"
        ],
        p3: "You are not just a pilot with a license; you are a professional with a track record. You have bridged the gap. You are cleared for takeoff. See you on the line."
    }
];

// --- DEFINE NEW CHAPTER 5 CONTENT (8 PAGES) ---
const NEW_CHAPTER_5_CONTENT: any[] = [
    {   // Page 1: Chapter 5 Title
        section: "CHAPTER 5",
        title: "CHAPTER 5: ADVANCED MENTORSHIP PROTOCOLS",
        subtitle: "From Problem-Solving to Career Architecting",
        p1: "Chapter 4 provided the operational framework for executing the Wing Mentor Approach. You now know how to navigate the Hub, diagnose issues, and log your experience. This chapter elevates your role from a tactical problem-solver to a strategic career architect. We will explore advanced protocols for long-term mentee development, sophisticated diagnostic techniques, and the leadership qualities that distinguish a good mentor from a great one.",
        isChapterPage: true
    },
    {   // Page 2: The Mentorship Arc
        section: "ADVANCED PROTOCOLS",
        title: "The Mentorship Arc: A Development Lifecycle",
        h1: "BEYOND THE SINGLE SESSION",
        p1: "Effective mentorship is not a series of isolated fixes; it's a long-term development arc. Your goal is to guide a mentee from dependency to proficiency, and ultimately, to independence. This lifecycle mirrors the progression of a professional pilot.",
        h2: "THE FOUR PHASES OF THE ARC",
        steps: [
            { num: "01", title: "ASSESSMENT & RAPPORT", desc: "Initial sessions focus on understanding the mentee's core challenges and building trust. Review their history in WingLogs. What are their long-term goals?" },
            { num: "02", title: "TARGETED INTERVENTION", desc: "This is the core 'Doctor' phase from Chapter 4. You are actively solving specific problems identified on grading sheets." },
            { num: "03", title: "COMPETENCE & CONFIDENCE BUILDING", desc: "As acute issues are resolved, shift focus to scenario-based challenges. Use the Black Box and Forum to create mock checkrides or complex flight planning exercises." },
            { num: "04", title: "AUTONOMY & PAY-IT-FORWARD", desc: "The mentee now operates with high proficiency. Your role transitions to that of a senior advisor. Encourage them to begin mentoring others, completing the symbiotic cycle." }
        ],
        p2: "Tracking this progression in WingLogs provides a powerful narrative of your ability to develop talent—a key leadership indicator."
    },
    {   // Page 3: Advanced Diagnostics
        section: "ADVANCED PROTOCOLS",
        title: "Advanced Diagnostics: Pattern Recognition",
        h1: "READING BETWEEN THE LOGS",
        p1: "A single poor landing is a data point. A pattern of poor landings across different conditions is a diagnostic trend. Your role as an advanced mentor is to use WingLogs not just for recording, but for analysis.",
        h2: "IDENTIFYING ROOT CAUSE PATTERNS",
        p2: "When reviewing a mentee's session history, look for recurring themes:",
        list: [
            "**Knowledge Gaps:** Consistently struggling with regulations, weather, or systems? This points to a foundational theory issue.",
            "**Procedural Errors:** Forgetting checklist items or callouts? This may indicate a workflow or memory-item problem.",
            "**Confidence Issues:** Performs well in consultation but falters in the aircraft? This suggests performance anxiety, a common and addressable issue.",
            "**Overconfidence:** Dismisses minor errors or blames external factors? This is a hazardous attitude that requires careful CRM-focused discussion."
        ],
        p3: "Tagging sessions in WingLogs with these keywords helps you visualize these patterns over time, allowing for more profound and effective interventions."
    },
    {   // Page 4: CRM for Mentors
        section: "ADVANCED PROTOCOLS",
        title: "Crew Resource Management for Mentors",
        h1: "You Are The PIC of The Session",
        p1: "Crew Resource Management (CRM) isn't just for multi-pilot cockpits; its principles are directly applicable to the mentor-mentee relationship. As the mentor, you are the Pilot in Command of the consultation session.",
        p2: "Apply the core tenets:",
        list: [
            "**Communication:** Are you actively listening, or just talking? Use inquiry and advocacy. 'What do you think is happening here?' is more powerful than 'You're doing it wrong.'",
            "**Workload Management:** Are you trying to cover too much in one session? Break complex problems into manageable chunks. This is especially critical when handling multiple mentees.",
            "**Situational Awareness:** Are you aware of the mentee's stress level or frustration? Recognize when to push and when to pause. A frustrated mind doesn't learn.",
            "**Decision Making:** Your advice is a critical decision. Use the 'ACTION' checklist from the PRM chapter. Is your advice Assessed, Cost-checked, and Investigated?"
        ],
        p3: "Documenting your use of CRM principles in your WingLogs provides powerful evidence of your command potential during interviews."
    },
    {   // Page 5: Strategic Use of The Black Box
        section: "INTELLIGENCE OPERATIONS",
        title: "Strategic Use of The Black Box",
        h1: "FROM LIBRARY TO MISSION BRIEFING",
        p1: "The Black Box is more than a repository of POHs and presentations; it is an arsenal of tactical assets. An advanced mentor doesn't just point to the library; they curate and deploy its contents for specific missions.",
        h2: "CREATING 'STUDY PACKS'",
        p2: "Before a session focused on a specific challenge, create a 'Study Pack' for your mentee. This demonstrates foresight and professionalism.",
        p3: "**Example Scenario:** Mentee is struggling with IFR holding patterns.",
        steps: [
            "1. **FROM THE BLACK BOX, PULL:** The POH section on autopilot use, the FAA's guide to holding procedures, and several sample approach plates with complex holds.",
            "2. **FROM THE FORUM, PULL:** A recent discussion thread about ATC clearances for holds at a local airport.",
            "3. **DELIVER TO MENTEE:** 'Review these materials before our session on Thursday. We will use them to chair-fly three different entry procedures.'",
        ],
        p4: "This proactive approach transforms a generic study session into a structured, mission-oriented briefing, drastically increasing its effectiveness."
    },
    {   // Page 6: Handling Difficult Scenarios
        section: "HUMAN FACTORS",
        title: "Handling Difficult Scenarios",
        h1: "THE HUMAN ELEMENT",
        p1: "Mentorship is not just about technical knowledge; it's about managing human factors. You will encounter mentees who are frustrated, overconfident, or even resistant to feedback. Your ability to navigate these situations defines your maturity as a leader.",
        locations: [ // Using this key for a different layout
            "**The Frustrated Mentee:** They feel stuck. Focus on small, achievable wins to rebuild momentum. Break down the problem into its simplest components and celebrate progress on each one.",
            "**The Overconfident Mentee:** They may dismiss minor errors. Use scenario-based questions to lead them to discover the potential consequences of their 'minor' error. 'Okay, that missed radio call seems small. What happens if it occurs during an engine failure on final?'",
            "**The Disengaged Mentee:** They may be quiet or non-committal. Use open-ended questions to draw them out. Re-establish rapport by sharing one of your own early struggles.",
            "**The Argumentative Mentee:** If a mentee consistently challenges official procedures or your guidance, calmly refer back to the source material (POH, FAR/AIM). Maintain professionalism and never let it become personal. Your role is to clarify, not to win a debate."
        ],
        p2: "Always remember the non-interference policy. If a disagreement involves a direct contradiction of their flight instructor, the CFI's word is final. Your role is to support, not supplant."
    },
    {   // Page 7: From Mentor to Leader
        section: "CAREER PROGRESSION",
        title: "From Junior Mentor to Leader",
        h1: "THE 20-HOUR CHECKRIDE",
        p1: "The 20-hour supervised period is your professional checkride for this program. It culminates in a review by the Wing Mentor Team, leading to your promotion from Junior Mentor to Official Mentor. Your WingLogs are your primary evidence.",
        h2: "DOCUMENTING LEADERSHIP, NOT JUST TIME",
        p2: "Your logs should tell a story beyond just '1.0 hour - Discussed steep turns.' A successful review depends on demonstrating leadership qualities:",
        list: [
            "**Positive Outcomes:** Did the mentee's grades improve? Note this in your session debrief. 'Follow-up: Mentee reported a 'Satisfactory' grade on steep turns in their next flight.'",
            "**CRM Application:** Briefly mention how you used CRM. 'Used inquiry to help mentee self-diagnose their control input errors.'",
            "**Resourcefulness:** Did you leverage the Black Box or Forum? 'Assigned pre-reading from the C172 POH in the Black Box.'",
            "**Professionalism:** Your log entries should be concise, professional, and objective."
        ],
        p3: "Passing this review and earning your stamp in the WingMentor Passport is a significant milestone, validating your ability to not just fly, but to lead."
    },
    {   // Page 8: The Symbiotic Loop
        section: "THE WINGMENTOR ETHOS",
        title: "Paying It Forward: The Symbiotic Loop",
        h1: "STRENGTHENING THE ECOSYSTEM",
        p1: "The ultimate goal of the Mentorship Arc is to create a self-sustaining ecosystem of excellence. Your greatest success as a mentor is not just when your mentee passes a checkride, but when they are inspired and equipped to become a mentor themselves.",
        h2: "THE FINAL PHASE OF MENTORSHIP",
        p2: "Once a mentee has reached a high level of proficiency, encourage them to take the next step. Guide them through the Junior Mentor application process. Share your own experiences from your 20-hour checkride. By helping them become mentors, you:",
        list: [
            "Solidify your own understanding of complex topics.",
            "Demonstrate a high level of leadership and program commitment.",
            "Strengthen the Wing Mentor community for the next generation of pilots.",
            "Create a powerful 'leadership' entry for your own resume and interview portfolio."
        ],
        p3: "This 'pay it forward' mentality is the core of the Wing Mentor ethos. We are a community that builds upon itself, ensuring that the gap we bridge today remains closed for the pilots of tomorrow."
    }
];

// --- DEFINE NEW BLANK PAGE CONTENT ---
const BLANK_PAGE_CONTENT: any = {
    section: "BLANK",
    title: "PAGE INTENTIONALLY LEFT BLANK",
    p1: "" // Empty content
};


// RE-INDEXED DEFAULT_PAGE_CONTENT
const DEFAULT_PAGE_CONTENT: Record<number, any> = {};

// 1. Copy original 0, 1
DEFAULT_PAGE_CONTENT[0] = { ...ORIGINAL_FULL_CONTENT[0] }; // Cover
DEFAULT_PAGE_CONTENT[1] = { ...ORIGINAL_FULL_CONTENT[1] }; // User Agreement & Liability

// 2. New pages 2, 3 (from previous instruction)
DEFAULT_PAGE_CONTENT[2] = {
    section: "LEGAL",
    title: "Legal & Compliance",
    p1: "This section delineates the legal and ethical framework governing all participation within the Wing Mentorship Program. Adherence to these policies is non-negotiable and fundamental to maintaining the integrity, safety, and professional standing of our community. All members are expected to familiarize themselves thoroughly with these stipulations.",
    p2: "The Wing Mentorship Program is committed to operating in full compliance with all applicable national and international aviation regulations and data protection laws. Our mandate is to supplement, not supersede, official flight training and certification processes. Any activity deemed to compromise these legal principles or the safety of flight operations will result in immediate termination of membership.",
    p3: "Strict adherence to our outlined communication protocols and content sharing guidelines is mandatory. Misrepresentation of qualifications, unauthorized dissemination of proprietary program materials, or engagement in activities that could be construed as offering official flight instruction are expressly prohibited and will be met with decisive action.",
    h_policy: ORIGINAL_FULL_CONTENT[2].h_policy,
    p_policy: ORIGINAL_FULL_CONTENT[2].p_policy,
    h_privacy: ORIGINAL_FULL_CONTENT[2].h_privacy,
    p_privacy: ORIGINAL_FULL_CONTENT[2].p_privacy,
    affirmation_note: "I ACKNOWLEDGE I HAVE READ AND UNDERSTOOD THE NON-INTERFERENCE AND PRIVACY POLICIES."
};
DEFAULT_PAGE_CONTENT[3] = {
    section: "LEGAL",
    title: "Waiver of Liability",
    p1: ORIGINAL_FULL_CONTENT[2].p1,
    p2: ORIGINAL_FULL_CONTENT[2].p2,
    affirmation: "By signing below, I affirm that I have read, understood, and agree to be bound by the terms and conditions outlined in the User Agreement, Legal & Compliance policies, and this Waiver of Liability."
};

// 3. Shift original content 3-5 by 1 index (to 4-6) for TOCs
DEFAULT_PAGE_CONTENT[4] = { ...ORIGINAL_FULL_CONTENT[3] }; // TOC 1
DEFAULT_PAGE_CONTENT[5] = { ...ORIGINAL_FULL_CONTENT[4] }; // TOC 2
DEFAULT_PAGE_CONTENT[6] = { ...ORIGINAL_FULL_CONTENT[5] }; // TOC 3

// 4. Shift original content 6-8 by 1 index (to 7-9) and re-apply previous swap
DEFAULT_PAGE_CONTENT[7] = { ...ORIGINAL_FULL_CONTENT[7] }; 
DEFAULT_PAGE_CONTENT[8] = { ...ORIGINAL_FULL_CONTENT[6] }; 
DEFAULT_PAGE_CONTENT[9] = { ...ORIGINAL_FULL_CONTENT[8] }; 

// 5. Insert NEW_PAGE_CONTENT_INSERTED at index 10
DEFAULT_PAGE_CONTENT[10] = NEW_PAGE_CONTENT_INSERTED;

// 6. Shift ORIGINAL_FULL_CONTENT[9] to ORIGINAL_FULL_CONTENT[44] to new positions
//    Old Indices 9-44 map to New Indices 11-46
for (let i = 9; i <= 44; i++) {
    DEFAULT_PAGE_CONTENT[i + 2] = { ...ORIGINAL_FULL_CONTENT[i] };
}
// Up to this point, DEFAULT_PAGE_CONTENT[46] is ORIGINAL_FULL_CONTENT[44] (Glossary)

// 7. *** INSERT BLANK PAGE HERE AT INDEX 46 *** (This is 'page 47' in display)
DEFAULT_PAGE_CONTENT[46] = BLANK_PAGE_CONTENT;

// 8. Shift remaining content from ORIGINAL_FULL_CONTENT by +3 (2 from legal + 1 from blank page)
//    Old Indices from ORIGINAL_FULL_CONTENT[44] (Glossary) up to ORIGINAL_FULL_CONTENT[48] (Last Closing)
//    need to be shifted.
//    DEFAULT_PAGE_CONTENT[46] (Glossary) was ORIGINAL_FULL_CONTENT[44]. It now moves to DEFAULT_PAGE_CONTENT[47].
for (let i = 44; i <= 48; i++) {
    DEFAULT_PAGE_CONTENT[i + 3] = { ...ORIGINAL_FULL_CONTENT[i] };
}

// 9. INSERT NEW CHAPTER 4 (8 Pages) at Index 48 (was 47, now shifted by +1 due to blank page)
//    Indices 48 to 55
NEW_CHAPTER_4_CONTENT.forEach((page, idx) => {
    DEFAULT_PAGE_CONTENT[48 + idx] = page;
});

// 10. INSERT NEW CHAPTER 5 (8 Pages) at Index 56 (was 55, now shifted by +1 due to blank page)
//     Indices 56 to 63
NEW_CHAPTER_5_CONTENT.forEach((page, idx) => {
    DEFAULT_PAGE_CONTENT[56 + idx] = page;
});


// 11. Shift remaining original content (Backend Ops & Closings) by +3 + 8 + 8 = +19 indices from its original position relative to ORIGINAL_FULL_CONTENT.
//     Let's recalculate based on DEFAULT_PAGE_CONTENT after inserting blank, Chapter 4, Chapter 5.
//     ORIGINAL_FULL_CONTENT[45] (Backend Ops) was at DEFAULT_PAGE_CONTENT[45+2+8=55].
//     After blank page (at 46): 55 + 1 = 56.
//     After Chapter 4 (8 pages, at 48-55): 56 + 8 = 64.
//     After Chapter 5 (8 pages, at 56-63): 64 + 8 = 72.
//     So, Backend Ops starts at DEFAULT_PAGE_CONTENT[64].

DEFAULT_PAGE_CONTENT[64] = { ...ORIGINAL_FULL_CONTENT[45] }; // Backend Operations (Original 45)

// Closing pages. Original were 46, 47, 48. These shift to 65, 66, 67.
DEFAULT_PAGE_CONTENT[65] = { ...ORIGINAL_FULL_CONTENT[46] }; // Closing 1 (Original 46)
DEFAULT_PAGE_CONTENT[66] = { ...ORIGINAL_FULL_CONTENT[47] }; // Closing 2 (Original 47)
DEFAULT_PAGE_CONTENT[67] = { ...ORIGINAL_FULL_CONTENT[48] }; // Closing 3 (Original 48)


// 12. Add the very last closing page (which was at index 67 in the previous calculation).
// This now becomes DEFAULT_PAGE_CONTENT[68]
DEFAULT_PAGE_CONTENT[68] = {
    section: "CLOSING",
    quote: "Bridging the gap between license and career. Experience lived, not just logged. Your logbook tells a story; make sure it is one of persistence, not stagnation.",
    url: "www.wingmentor.com"
};

// Total pages calculation:
// 46 pages (up to Training Bonds, index 0-45)
// 1 blank page (index 46)
// 1 Glossary page (index 47)
// 8 Chapter 4 pages (index 48-55)
// 8 Chapter 5 pages (index 56-63)
// 1 Backend Ops page (index 64)
// 4 closing pages (index 65-68)
// Total = 46 + 1 + 1 + 8 + 8 + 1 + 4 = 69 pages (indices 0-68)
const NEW_TOTAL_PAGES = 69;

// 13. Update TOC entries (DEFAULT_PAGE_CONTENT[4], [5], [6]) based on the new indexing.

// TOC 1 (DEFAULT_PAGE_CONTENT[4])
DEFAULT_PAGE_CONTENT[4].welcome = { title: "Welcome", page: "08" };
DEFAULT_PAGE_CONTENT[4].chapter1Intro = { title: "CHAPTER 1: Introduction to Program", page: "07-10" };
DEFAULT_PAGE_CONTENT[4].programOperations = [
    { text: "Operational Briefing: Program Framework", page: "09" }, 
    { text: "Operational Briefing: Program Framework (Cont.)", page: "10" },
    { text: "The Mentorship Cycle", page: "12" },
    { text: "Onboarding: Mentee Pathway", page: "13" },
    { text: "Onboarding: Mentor Pathway", page: "14" },
    { text: "Wing Mentor Passport", page: "15" },
    { text: "The WingLogs App", page: "16" },
    { text: "The WingMentor App", page: "17" },
    { text: "The Pilot Gap Forum", page: "18" },
    { text: "The Black Box", page: "19" },
    { text: "Platform Resources", page: "20" },
];
DEFAULT_PAGE_CONTENT[4].legalLiability = { text: "Legal & Liability", page: "01-04" };

// TOC 2 (DEFAULT_PAGE_CONTENT[5])
DEFAULT_PAGE_CONTENT[5].chapter2Intro = { title: "CHAPTER 2: Understanding The Low Timer Gap", page: "21" };
DEFAULT_PAGE_CONTENT[5].gapAnalysis = [
    { text: "Bridging The Gap", page: "11" },
    { text: "CHAPTER 2: Understanding The Low Timer Gap", page: "21" },
    { text: "The Low Timer Pilot Gap (Mind Map)", page: "22" },
    { text: "The Pilot Paradox", page: "23" },
    { text: "Instructor Bottleneck", page: "24" },
    { text: "Saturation Event Data", page: "25" },
    { text: "The Paradox of the Aviation Dream", page: "26" },
    { text: "Hiring Manager's Dilemma", page: "27" },
    { text: "THE ECONOMIC TRAP", page: "28" },
    { text: "THE 68% BLIND SPOT: THE COMFORT TRAP", page: "29" },
];

// TOC 3 (Page 6) - Updated with Chapter 4 & 5
DEFAULT_PAGE_CONTENT[6].chapter3Intro = { title: "CHAPTER 3: Pilot Risk Management (PRM)", page: "30" };
DEFAULT_PAGE_CONTENT[6].financialIntelligence = [
    { text: "Introduction to PRM", page: "31" },
    { text: "Type Rating: The Risk-Taker", page: "32" },
    { text: "Type Rating: The Analyst", page: "33" },
    { text: "The ACTION Checklist", page: "34" },
    { text: "Introduction to Type Ratings", page: "35" },
    { text: "Choosing a Type Rating (CAT)", page: "36" },
    { text: "Strategic Pathways: CAT Ratings", page: "37" },
    { text: "Shiny Jet Syndrome & Financial Spiral", page: "38" },
    { text: "The Subscription Trap: Capt. J", page: "39" },
    { text: "Case Analysis: Capt. J", page: "40" },
    { text: "Type Rating Investment: Banker vs Casino", page: "41" },
    { text: "The Final Verdict Analysis", page: "42" },
    { text: "Aircraft Ownership: Tangible Investment", page: "43" },
    { text: "The Training Bond Handcuffs", page: "44" },
    { text: "Training Bonds & Flight Time", page: "45" },
];
// Adding Chapter 4 & 5 to TOC 3 and adjusting all subsequent page numbers
DEFAULT_PAGE_CONTENT[6].reference = [
    { text: "Glossary of Terms", page: "47" }, // Shifted from 46 to 47
    { text: "BLANK PAGE", page: "46" }, // New blank page
    { text: "CHAPTER 4: WING MENTOR SOLUTIONS", page: "48-55" }, // Shifted from 47-54 to 48-55
    { text: "CHAPTER 5: ADVANCED MENTORSHIP PROTOCOLS", page: "56-63" }, // Shifted from 55-62 to 56-63
    { text: "Backend Operations", page: "64" }, // Shifted from 63 to 64
    { text: "Closing", page: "65-69"} // Shifted from 64-68 to 65-69
];


// --- HELPER COMPONENT FOR EDITABLE TEXT ---
const EditableField: React.FC<{
  isEditing: boolean;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  type?: 'text' | 'date';
}> = ({ isEditing, value, onChange, className = "", placeholder, multiline = false, type = 'text' }) => {
  if (isEditing) {
    const editClass = `bg-yellow-100/50 border border-yellow-400 text-black p-0.5 rounded outline-none focus:ring-2 focus:ring-yellow-500 w-full text-[8px] leading-tight ${className}`;
    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${editClass} resize-y min-h-[40px]`}
          placeholder={placeholder}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={editClass}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }
  return <span className={`${className} whitespace-pre-wrap`}>{value}</span>;
};


// --- HANDBOOK PAGE WRAPPER (Single Page) ---
// Enforces 6x9 Aspect Ratio
const HandbookPage: React.FC<{
  children: React.ReactNode;
  section?: string;
  title?: string;
  pageNumber?: string;
  date?: string;
  isCover?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ children, section, title, pageNumber, date = "NOV 15 2024", isCover = false, className = "", onClick }) => {
  
  const bgClass = isCover 
    ? "bg-zinc-900 border-zinc-800 text-amber-50" 
    : "bg-[#fdfbf7] border-zinc-300 text-zinc-900"; 

  return (
    // Aspect Ratio 2/3 = 6x9. w-full takes width of the flex child container.
    <div 
        className={`aspect-[2/3] w-full shadow-2xl overflow-hidden flex flex-col border ${bgClass} ${className} transition-all duration-300 cursor-pointer relative select-none`}
        onClick={onClick}
    >
        {/* Paper Texture Overlay */}
        {!isCover && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 pointer-events-none mix-blend-multiply"></div>}

        {/* Header */}
        {!isCover && (
            <div className="px-5 py-3 border-b border-zinc-900/10 flex justify-between items-end pointer-events-none relative z-10 shrink-0">
                <div>
                    <h5 className="text-[6px] font-bold uppercase tracking-widest text-zinc-400 leading-none mb-0.5">Section</h5>
                    <p className="text-[8px] font-bold uppercase text-zinc-600 font-mono leading-none">{section || "GENERAL"}</p>
                </div>
                <div className="text-right">
                    <h5 className="text-[6px] font-bold uppercase tracking-widest text-zinc-400 leading-none mb-0.5">Program Operating Handbook (POH)</h5>
                    <p className="text-[8px] font-bold uppercase text-zinc-600 font-mono leading-none">{date}</p>
                </div>
            </div>
        )}

        {/* Content Area */}
        <div className={`flex-1 px-5 py-4 relative z-10 overflow-hidden flex flex-col`}>
             {title && !isCover && (
                 <div className="mb-3 shrink-0">
                     <h2 className="text-lg font-bold brand-font uppercase leading-tight text-zinc-900 whitespace-pre-wrap">{title}</h2>
                     <div className="w-8 h-0.5 bg-amber-500 mt-1"></div>
                 </div>
             )}
             <div className="flex-1 relative flex flex-col overflow-y-auto scrollbar-hide">
                 {children}
             </div>
        </div>

        {/* Footer */}
        {!isCover && (
            <div className="px-5 py-2 border-t border-zinc-900/10 flex justify-between items-center pointer-events-none relative z-10 shrink-0 bg-[#fdfbf7]/50 backdrop-blur-[2px]">
                 <p className="text-[6px] uppercase font-bold text-zinc-400">Program Operating Handbook (POH) Rev 1.0</p>
                 <div className="flex items-center space-x-2">
                    <span className="text-[8px] font-bold font-mono text-zinc-600 border border-zinc-300 px-1.5 py-0.5 rounded bg-white/50">{pageNumber}</span>
                 </div>
            </div>
        )}

        {/* Cover Footer Indicator */}
        {isCover && (
             <div className="absolute bottom-8 w-full text-center pointer-events-none">
                 <p className="text-[8px] uppercase tracking-[0.3em] text-white/40 animate-pulse">Tap to Open</p>
             </div>
        )}
    </div>
  );
};

export const OperatingHandbookPage: React.FC<OperatingHandbookPageProps> = ({ onBackToLanding }) => {
  const { isDarkMode } = useTheme();
  
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageContent, setPageContent] = useState<Record<number, any>>(DEFAULT_PAGE_CONTENT);
  
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const TOTAL_PAGES = NEW_TOTAL_PAGES;


  useEffect(() => {
    const savedContent = localStorage.getItem('poh_content');
    if (savedContent) {
        try {
            const parsed = JSON.parse(savedContent);
            const mergedContent = { ...DEFAULT_PAGE_CONTENT };
            for (const key in parsed) {
                if (parsed.hasOwnProperty(key)) {
                    if (JSON.stringify(mergedContent[parseInt(key)]) !== JSON.stringify(parsed[key])) {
                        mergedContent[parseInt(key)] = { ...mergedContent[parseInt(key)], ...parsed[key] };
                    }
                }
            }
            setPageContent(mergedContent);
        } catch (e) {
            console.error("Failed to load POH content", e);
        }
    }
  }, []);


  const handleNext = () => {
    setIsEditing(false);
    if (currentPageIndex === 0) {
        setCurrentPageIndex(1);
    } else {
        if (currentPageIndex + 2 < TOTAL_PAGES) {
            setCurrentPageIndex(prev => prev + 2);
        } else if (currentPageIndex + 1 < TOTAL_PAGES) {
            setCurrentPageIndex(prev => prev + 1);
        }
    }
  };

  const handlePrev = () => {
    setIsEditing(false);
    if (currentPageIndex === 1) {
        setCurrentPageIndex(0);
    } else if (currentPageIndex > 1) {
        setCurrentPageIndex(prev => prev - 2);
    }
  };

  const handleContentUpdate = (index: number, key: string, value: any) => {
      const newContent = {
          ...pageContent,
          [index]: {
              ...pageContent[index] || {},
              [key]: value
          }
      };
      setPageContent(newContent);
  };

  const handleSave = () => {
    localStorage.setItem('poh_content', JSON.stringify(pageContent));
    setIsEditing(false);
    setSaveMessage('Saved Successfully');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // --- KEYBOARD NAVIGATION ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, currentPageIndex, TOTAL_PAGES]); 


  // --- CONTENT RENDERER ---
  const renderContentForIndex = (index: number) => {
    const content = pageContent[index] || DEFAULT_PAGE_CONTENT[index] || {};

    const renderStandardContent = () => (
        <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3 overflow-y-auto pr-1">
            {content.subtitle && (
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600 mb-2">
                    <EditableField isEditing={isEditing} value={content.subtitle} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
            )}
            
            {content.image && (
                <div className="flex justify-center shrink-0 my-2">
                    <img src={content.image} alt="Content" className="w-auto max-h-40 object-contain rounded-md border border-zinc-200" />
                </div>
            )}

            {content.p1 && <p><EditableField isEditing={isEditing} value={content.p1} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>}
            
            {content.h1 && (
                <div className="mt-2">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900 border-b border-zinc-200 mb-1">
                        <EditableField isEditing={isEditing} value={content.h1} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                    </h4>
                    {content.p2 && <p><EditableField isEditing={isEditing} value={content.p2} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>}
                </div>
            )}

            {content.h2 && (
                <div className="mt-2">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900 border-b border-zinc-200 mb-1">
                        <EditableField isEditing={isEditing} value={content.h2} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                    </h4>
                    {content.p3 && <p><EditableField isEditing={isEditing} value={content.p3} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>}
                </div>
            )}

            {content.h3 && (
                <div className="mt-2">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900 border-b border-zinc-200 mb-1">
                        <EditableField isEditing={isEditing} value={content.h3} onChange={(v) => handleContentUpdate(index, 'h3', v)} />
                    </h4>
                    {content.p4 && <p><EditableField isEditing={isEditing} value={content.p4} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline /></p>}
                </div>
            )}

            {content.steps && (
                <div className="mt-2 bg-zinc-50 p-2 rounded border border-zinc-200">
                    {content.steps.map((step: any, i: number) => {
                        if (typeof step === 'string') {
                            return (
                                <p key={i} className="mb-1 text-[8px] font-mono">
                                    <EditableField isEditing={isEditing} value={step} onChange={(v) => {
                                        const newSteps = [...content.steps];
                                        newSteps[i] = v;
                                        handleContentUpdate(index, 'steps', newSteps);
                                    }} />
                                </p>
                            );
                        } else {
                            return (
                                <div key={i} className="mb-3 border-b border-zinc-200 pb-2 last:border-0 last:pb-0">
                                     <div className="flex items-baseline text-[8px] font-bold mb-0.5">
                                        <span className="text-zinc-400 mr-1 min-w-[12px]">
                                            <EditableField isEditing={isEditing} value={step.num || ""} onChange={(v) => {
                                                const newSteps = [...content.steps];
                                                newSteps[i] = { ...newSteps[i], num: v };
                                                handleContentUpdate(index, 'steps', newSteps);
                                            }} />
                                        </span>
                                        <span className="text-zinc-800 uppercase">
                                            <EditableField isEditing={isEditing} value={step.title || ""} onChange={(v) => {
                                                const newSteps = [...content.steps];
                                                newSteps[i] = { ...newSteps[i], title: v };
                                                handleContentUpdate(index, 'steps', newSteps);
                                            }} />
                                        </span>
                                     </div>
                                     <p className="text-[8px] font-mono text-zinc-600 pl-4 leading-tight">
                                        <EditableField isEditing={isEditing} value={step.desc || ""} onChange={(v) => {
                                            const newSteps = [...content.steps];
                                            newSteps[i] = { ...newSteps[i], desc: v };
                                            handleContentUpdate(index, 'steps', newSteps);
                                        }} multiline />
                                     </p>
                                </div>
                            );
                        }
                    })}
                </div>
            )}

            {content.locations && (
                <ul className="mt-2 list-none space-y-2 text-[8px] font-mono">
                    {content.locations.map((loc: string, i: number) => (
                        <li className="border-l-2 border-zinc-300 pl-2" key={i} dangerouslySetInnerHTML={{ __html: loc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                </ul>
            )}

            {content.list && (
                <ul className="mt-2 list-disc pl-3 space-y-1 text-[8px] font-mono">
                    {content.list.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );

    if (index === 0) { // COVER
         return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                 <div className="border-4 border-amber-500/10 p-6 m-4 rounded-lg h-full w-full flex flex-col items-center justify-center bg-black/40">
                     <div className="w-20 h-20 mb-6 opacity-90">
                          <img src={IMAGES.LOGO} alt="Logo" className="w-full h-full object-contain filter brightness-0 invert drop-shadow-md" />
                     </div>
                     <h1 className="text-3xl md:text-4xl font-bold brand-font text-white uppercase tracking-widest mb-4 drop-shadow-lg leading-none">
                         <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} multiline className="bg-transparent text-white border-white/20 text-center" />
                     </h1>
                     <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                     <p className="text-zinc-400 font-mono uppercase tracking-[0.3em] text-[9px] mb-8">
                          <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} className="bg-transparent text-zinc-300 border-zinc-600" />
                     </p>
                     <div className="mt-auto border-t border-white/10 pt-4 w-full max-w-xs mx-auto">
                         <p className="text-[7px] text-zinc-500 uppercase">
                             <EditableField isEditing={isEditing} value={content.restricted || ""} onChange={(v) => handleContentUpdate(index, 'restricted', v)} className="bg-transparent text-zinc-500 border-zinc-700" />
                         </p>
                         <p className="text-[7px] text-zinc-500 uppercase mt-1">
                             <EditableField isEditing={isEditing} value={content.serial || ""} onChange={(v) => handleContentUpdate(index, 'serial', v)} className="bg-transparent text-zinc-500 border-zinc-700" />
                         </p>
                     </div>
                 </div>
             </div>
         );
    }
    
    // Page 1: User Agreement & Liability
    if (index === 1) {
        return (
             <div className="text-[9px] leading-tight space-y-2 font-serif text-justify h-full flex flex-col">
                 <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                 <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                 <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                 <p><EditableField isEditing={isEditing} value={content.p4 || ""} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline /></p>
                 <div className="border-l-2 border-red-500 pl-2 py-1 my-2 bg-red-50">
                     <p className="font-bold text-red-900"><EditableField isEditing={isEditing} value={content.p5 || ""} onChange={(v) => handleContentUpdate(index, 'p5', v)} multiline /></p>
                 </div>
                 <div className="mt-auto pt-2 border-t border-zinc-400 text-center">
                     <p className="font-bold underline mb-2 text-[8px]">ACKNOWLEDGMENT</p>
                     <p className="font-mono text-[8px]"><EditableField isEditing={isEditing} value={content.ack || ""} onChange={(v) => handleContentUpdate(index, 'ack', v)} multiline /></p>
                 </div>
             </div>
        );
    }

    // NEW Page 2: Legal & Compliance
    if (index === 2) {
        return (
            <div className="text-[9px] leading-tight space-y-2 font-serif text-justify h-full flex flex-col">
                 <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                 <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                 <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                 <div className="mt-2">
                    <p className="font-bold"><EditableField isEditing={isEditing} value={content.h_policy || ""} onChange={(v) => handleContentUpdate(index, 'h_policy', v)} /></p>
                    <p><EditableField isEditing={isEditing} value={content.p_policy || ""} onChange={(v) => handleContentUpdate(index, 'p_policy', v)} multiline /></p>
                 </div>
                 <div className="mt-2">
                    <p className="font-bold"><EditableField isEditing={isEditing} value={content.h_privacy || ""} onChange={(v) => handleContentUpdate(index, 'h_privacy', v)} /></p>
                    <p><EditableField isEditing={isEditing} value={content.p_privacy || ""} onChange={(v) => handleContentUpdate(index, 'p_privacy', v)} multiline /></p>
                 </div>
                 <div className="mt-auto pt-4 border-t border-zinc-400 text-center">
                     <p className="font-bold underline mb-2 text-[8px]">ACKNOWLEDGMENT</p>
                     <p className="font-mono text-[8px]"><EditableField isEditing={isEditing} value={content.affirmation_note || ""} onChange={(v) => handleContentUpdate(index, 'affirmation_note', v)} multiline /></p>
                 </div>
            </div>
        );
    }

    // NEW Page 3: Waiver of Liability (shifted from original index 2)
    if (index === 3) {
        return (
            <div className="text-[9px] leading-tight space-y-2 font-serif text-justify h-full flex flex-col">
                 <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                 <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                 
                 <div className="mt-auto pt-4">
                     <p className="font-mono text-[8px] italic text-center mb-2">
                        <EditableField isEditing={isEditing} value={content.affirmation || ""} onChange={(v) => handleContentUpdate(index, 'affirmation', v)} multiline />
                     </p>
                     <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                         <div className="border-b border-zinc-600 h-6"></div>
                         <div className="border-b border-zinc-600 h-6"></div>
                         <div className="text-center text-[7px] uppercase font-bold text-zinc-500">Signature</div>
                         <div className="text-center text-[7px] uppercase font-bold text-zinc-500">Date</div>
                         <div className="border-b border-zinc-600 h-6 mt-2 col-span-2"></div>
                         <div className="text-center text-[7px] uppercase font-bold text-zinc-500 col-span-2">Printed Name</div>
                     </div>
                 </div>
            </div>
        );
    }
    
    // Page 4: Table of Contents - Part 1 (Legal, Welcome, Chapter 1) - Shifted from original index 3
    if (index === 4) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px]">
                 <div className="space-y-4 mt-4">
                    {/* Legal */}
                    <div className="flex items-end justify-between border-b border-zinc-200 border-dotted pb-1">
                        <span className="font-bold uppercase brand-font">Legal & Liability</span>
                        <span className="font-mono">{content.legalLiability?.page || "01-04"}</span>
                    </div>

                    {/* Welcome */}
                    <div className="flex items-end justify-between border-b border-zinc-200 border-dotted pb-1">
                        <span className="font-bold uppercase brand-font">Welcome</span>
                        <span className="font-mono">{content.welcome?.page || "08"}</span> 
                    </div>

                    {/* Chapter 1 Introduction */}
                    <div className="flex items-end justify-between border-b border-zinc-200 border-dotted pb-1">
                        <span className="font-bold uppercase brand-font">CHAPTER 1: Introduction to Program</span>
                        <span className="font-mono">{content.chapter1Intro?.page || "07-10"}</span> 
                    </div>

                    {/* Program Operations Section (for P10-18) */}
                    <div className="pt-2">
                        <h4 className="font-bold text-[8px] uppercase text-zinc-500 mb-1">Program Operations</h4>
                        <div className="pl-2 space-y-2 border-l border-zinc-300">
                            {(content.programOperations || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-end justify-between border-b border-zinc-100 border-dotted pb-0.5">
                                    <span>{item.text}</span>
                                    <span className="font-mono">{item.page}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                 </div>
            </div>
        )
    }

    // Page 5: Table of Contents - Part 2 (Chapter 2: The Low Timer Gap) - Shifted from original index 4
    if (index === 5) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px]">
                <div className="space-y-4 mt-4">
                    {/* Chapter 2 Title is already the page title */}

                    {/* The Gap Analysis Section */}
                    <div className="pt-2">
                        <h4 className="font-bold text-[8px] uppercase text-zinc-500 mb-1">The Gap Analysis</h4>
                        <div className="pl-2 space-y-2 border-l border-zinc-300">
                             <div className="flex items-end justify-between border-b border-zinc-100 border-dotted pb-0.5">
                                <span>Bridging The Gap</span>
                                <span className="font-mono">{content.gapAnalysis?.[0]?.page || "11"}</span>
                            </div>
                            <div className="flex items-end justify-between border-b border-zinc-100 border-dotted pb-0.5">
                                <span className="font-bold uppercase brand-font">CHAPTER 2: Understanding The Low Timer Gap</span>
                                <span className="font-mono">{content.gapAnalysis?.[1]?.page || "21"}</span>
                            </div>
                            {(content.gapAnalysis || []).slice(2).map((item: any, i: number) => ( // Slice to skip first two which are hardcoded above
                                <div key={i} className="flex items-end justify-between border-b border-zinc-100 border-dotted pb-0.5">
                                    <span>{item.text}</span>
                                    <span className="font-mono">{item.page}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Page 6: Table of Contents - Part 3 (Chapter 3: Pilot Risk Management, Reference) - Shifted from original index 5
    if (index === 6) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px]">
                <div className="space-y-4 mt-4">
                    {/* Chapter 3 Title is already the page title */}

                    {/* Financial Intelligence Section */}
                    <div className="pt-2">
                        <h4 className="font-bold text-[8px] uppercase text-zinc-500 mb-1">Financial Intelligence</h4>
                        <div className="pl-2 space-y-2 border-l border-zinc-300">
                            {(content.financialIntelligence || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-end justify-between border-b border-zinc-100 border-dotted pb-0.5">
                                    <span>{item.text}</span>
                                    <span className="font-mono">{item.page}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reference */}
                    <div className="pt-2">
                        <h4 className="font-bold text-[8px] uppercase text-zinc-500 mb-1">Reference</h4>
                        <div className="pl-2 space-y-2 border-l border-zinc-300">
                            {(content.reference || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-end justify-between border-b border-zinc-100 border-dotted pb-0.5">
                                    <span>{item.text}</span>
                                    <span className="font-mono">{item.page}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    // Page 7: Welcome Page (shifted from original index 3, now at current index 7 due to swap)
    if (index === 7) { 
        return (
             <div className="h-full flex flex-col text-justify text-[9px] leading-tight font-serif text-zinc-800 space-y-2">
                 <div>
                     <h3 className="font-bold text-[10px] uppercase brand-font mb-1">Welcome to the Wing Mentor Program</h3>
                     <p><EditableField isEditing={isEditing} value={content.welcomeP1 || ""} onChange={(v) => handleContentUpdate(index, 'welcomeP1', v)} multiline /></p>
                 </div>
                 
                 <div>
                     <h3 className="font-bold text-[10px] uppercase brand-font mb-1">A Message from the Wing Mentor Team</h3>
                     <p><EditableField isEditing={isEditing} value={content.teamP1 || ""} onChange={(v) => handleContentUpdate(index, 'teamP1', v)} multiline /></p>
                 </div>
                 
                 <div className="mt-auto pt-2 border-t border-zinc-300">
                     <h3 className="font-bold text-[10px] uppercase brand-font mb-1">A Welcome From The Founders</h3>
                     <p className="mb-1"><EditableField isEditing={isEditing} value={content.founderP1 || ""} onChange={(v) => handleContentUpdate(index, 'founderP1', v)} multiline /></p>
                     <p><EditableField isEditing={isEditing} value={content.founderP2 || ""} onChange={(v) => handleContentUpdate(index, 'founderP2', v)} multiline /></p>
                     <div className="grid grid-cols-2 gap-x-4 mt-2">
                         {/* Founder 1 */}
                         <div className="text-center">
                             <img src={IMAGES.BENJAMIN_BOWLER_PORTRAIT} className="w-10 h-10 rounded-full mx-auto mb-1 grayscale object-cover border border-zinc-300" alt="Benjamin Bowler" />
                             <p className="font-serif italic text-base leading-none">
                                <EditableField isEditing={isEditing} value={content.founder1Sig || ""} onChange={(v) => handleContentUpdate(index, 'founder1Sig', v)} className="text-center" />
                             </p>
                             <div className="w-full h-px bg-zinc-400 my-0.5"></div>
                             <p className="text-[7px] font-bold uppercase text-zinc-600">
                                <EditableField isEditing={isEditing} value={content.founder1Name || ""} onChange={(v) => handleContentUpdate(index, 'founder1Name', v)} className="text-center" />
                             </p>
                             <p className="text-[7px] uppercase text-zinc-500">
                                 <EditableField isEditing={isEditing} value={content.founderTitle || ""} onChange={(v) => handleContentUpdate(index, 'founderTitle', v)} className="text-center" />
                             </p>
                         </div>
                         {/* Founder 2 */}
                         <div className="text-center">
                              <img src={IMAGES.KARL_VOGT_PORTRAIT} className="w-10 h-10 rounded-full mx-auto mb-1 grayscale object-cover border border-zinc-300" alt="Karl Vogt" />
                             <p className="font-serif italic text-base leading-none">
                                <EditableField isEditing={isEditing} value={content.founder2Sig || ""} onChange={(v) => handleContentUpdate(index, 'founder2Sig', v)} className="text-center" />
                             </p>
                             <div className="w-full h-px bg-zinc-400 my-0.5"></div>
                             <p className="text-[7px] font-bold uppercase text-zinc-600">
                                <EditableField isEditing={isEditing} value={content.founder2Name || ""} onChange={(v) => handleContentUpdate(index, 'founder2Name', v)} className="text-center" />
                             </p>
                             <p className="text-[7px] uppercase text-zinc-500">
                                 <EditableField isEditing={isEditing} value={content.founderTitle || ""} onChange={(v) => handleContentUpdate(index, 'founderTitle', v)} className="text-center" />
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        );
    }

    // Page 8: New Introductory Page (shifted from original index 6, now at current index 8 due to swap)
    if (index === 8) { 
        return (
            <div className="h-full flex flex-col items-center justify-center text-center font-serif p-4">
                <img src={IMAGES.LOGO} alt="Wing Mentor Program" className="w-40 h-auto object-contain mb-6 mix-blend-multiply opacity-80" />
                <h2 className="text-4xl font-bold brand-font uppercase leading-none text-zinc-900 mb-6">
                    <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} className="text-center bg-transparent" />
                </h2>
                <div className="w-12 h-0.5 bg-amber-500 mb-6"></div>
                <p className="text-[10px] leading-relaxed text-justify text-zinc-800">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>
            </div>
        );
    }
    
    // Page 9: Operational Briefing (formerly index 8) - Shifted from original index 8
    if (index === 9) { 
        return (
             <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                 <div className="mb-1 p-2 bg-zinc-100 border border-zinc-200 rounded-md flex justify-center items-center shrink-0">
                    <img src={content.image || IMAGES.PROGRAM_HEADER_IMAGE} alt="Program Introduction" className="w-24 h-auto object-contain" />
                 </div>
                 
                 <div className="overflow-y-auto scrollbar-hide flex-1 space-y-2 pr-1">
                     <div>
                         <h3 className="font-bold text-[10px] uppercase brand-font mb-0.5"><EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} /></h3>
                         <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                     </div>
                     
                     <div>
                         <h3 className="font-bold text-[10px] uppercase brand-font mb-0.5"><EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} /></h3>
                         <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                     </div>
                 
                     <div className="pt-1">
                         <h3 className="font-bold text-[10px] uppercase brand-font mb-1"><EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} /></h3>
                         <ul className="list-disc pl-3 space-y-1 text-[8px] leading-snug">
                            {(content.benefits || []).map((benefit: string, i: number) => (
                                <li key={i}>{benefit}</li>
                            ))}
                         </ul>
                     </div>
                 </div>
                 
                 <div className="mt-auto pt-2 border-t border-zinc-200 shrink-0">
                     <h3 className="font-bold text-[10px] uppercase brand-font mb-0.5"><EditableField isEditing={isEditing} value={content.hFounders || "Founders Message"} onChange={(v) => handleContentUpdate(index, 'hFounders', v)} /></h3>
                     <p className="italic text-zinc-700"><EditableField isEditing={isEditing} value={content.pFounders || ""} onChange={(v) => handleContentUpdate(index, 'pFounders', v)} multiline /></p>
                     
                     <div className="grid grid-cols-2 gap-x-4 mt-1">
                         <div className="text-center">
                            <div className="w-full h-px bg-zinc-400 my-1"></div>
                            <p className="text-[8px] font-bold uppercase text-zinc-600">
                                <EditableField isEditing={isEditing} value={content.founder1Name || ""} onChange={(v) => handleContentUpdate(index, 'founder1Name', v)} className="text-center" />
                            </p>
                            <p className="text-[7px] uppercase text-zinc-500">
                                <EditableField isEditing={isEditing} value={content.founderTitle || ""} onChange={(v) => handleContentUpdate(index, 'founderTitle', v)} className="text-center" />
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-full h-px bg-zinc-400 my-1"></div>
                            <p className="text-[8px] font-bold uppercase text-zinc-600">
                                <EditableField isEditing={isEditing} value={content.founder2Name || ""} onChange={(v) => handleContentUpdate(index, 'founder2Name', v)} className="text-center" />
                            </p>
                            <p className="text-[7px] uppercase text-zinc-500">
                                <EditableField isEditing={isEditing} value={content.founderTitle || ""} onChange={(v) => handleContentUpdate(index, 'founderTitle', v)} className="text-center" />
                            </p>
                        </div>
                     </div>
                 </div>
             </div>
        );
    }
    
    // NEW Page 10: Operational Briefing: Program Framework (Cont.)
    if (index === 10) {
        const principles = content.principles_list || [];
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                {content.image && (
                    <div className="mb-1 p-2 bg-zinc-100 border border-zinc-200 rounded-md flex justify-center items-center shrink-0">
                        {isEditing ? (
                            <EditableField 
                                isEditing={isEditing} 
                                value={content.image} 
                                onChange={(v) => handleContentUpdate(index, 'image', v)} 
                                className="w-full text-center p-1" 
                                placeholder="Image URL"
                            />
                        ) : (
                            <img src={content.image} alt="Program Framework Graphic" className="w-24 h-auto object-contain" />
                        )}
                    </div>
                )}
                
                <p className="mb-2">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>

                <div className="pt-1">
                    <h3 className="font-bold text-[10px] uppercase brand-font mb-1"><EditableField isEditing={isEditing} value={content.h_principles || ""} onChange={(v) => handleContentUpdate(index, 'h_principles', v)} /></h3>
                    <ul className="list-disc pl-3 space-y-1 text-[8px] leading-snug">
                        {principles.map((principle: string, i: number) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: principle.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                    </ul>
                </div>

                <div className="mt-auto pt-2 border-t border-zinc-200 shrink-0">
                    <h3 className="font-bold text-[10px] uppercase brand-font mb-0.5"><EditableField isEditing={isEditing} value={content.h_dynamics || ""} onChange={(v) => handleContentUpdate(index, 'h_dynamics', v)} /></h3>
                    <p className="italic text-zinc-700"><EditableField isEditing={isEditing} value={content.p_dynamics || ""} onChange={(v) => handleContentUpdate(index, 'p_dynamics', v)} multiline /></p>
                </div>
            </div>
        );
    }
    
    // Page 11: Bridging The Gap (formerly index 9) - Shifted from original index 9
    if (index === 11) { 
        return (
             <div className="text-[9px] leading-tight space-y-2 font-serif text-justify h-full flex flex-col">
                 {content.image && <img src={content.image} alt="Bridging The Gap" className="w-11/12 mx-auto h-auto object-contain rounded-md border border-zinc-200 my-1" />}
                 <div>
                     <h3 className="font-bold text-center text-[10px] brand-font uppercase text-zinc-800 mb-1">
                        <EditableField isEditing={isEditing} value={content.p1Header || ""} onChange={(v) => handleContentUpdate(index, 'p1Header', v)} />
                     </h3>
                     <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                 </div>

                 <p className="italic text-center text-zinc-500 text-[8px] py-1">
                    <EditableField isEditing={isEditing} value={content.learnMore || ""} onChange={(v) => handleContentUpdate(index, 'learnMore', v)} />
                 </p>

                 <div className="pt-1 mt-auto">
                     <h3 className="font-bold text-center text-[10px] brand-font uppercase text-zinc-800 mb-1">
                        <EditableField isEditing={isEditing} value={content.approachTitle || ""} onChange={(v) => handleContentUpdate(index, 'approachTitle', v)} />
                     </h3>
                     <p>
                        <EditableField isEditing={isEditing} value={content.approachParagraph || ""} onChange={(v) => handleContentUpdate(index, 'approachParagraph', v)} multiline />
                     </p>
                 </div>
             </div>
        );
    }

    // Page 12: The Wing Mentor Approach Chart (formerly index 10) - Shifted from original index 10
    if (index === 12) { 
        const steps = content.steps || [];
        return (
            <div className="font-serif text-[9px] leading-tight text-justify h-full flex flex-col space-y-2">
                <p className="text-center italic text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.intro || ""} onChange={(v) => handleContentUpdate(index, 'intro', v)} multiline />
                </p>
                <div className="flex-1 space-y-2 pt-2">
                    {steps.map((step: any, i: number) => (
                        <div key={i} className="flex items-start space-x-2">
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0">{step.num}</div>
                                {i < steps.length - 1 && <div className="w-px h-4 bg-zinc-300"></div>}
                            </div>
                            <div>
                                <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900 leading-tight">
                                    <EditableField isEditing={isEditing} value={step.title} onChange={(v) => handleContentUpdate(index, `steps.${i}.title`, v)} />
                                </h4>
                                <p className="text-[8px]">
                                    <EditableField isEditing={isEditing} value={step.desc} onChange={(v) => handleContentUpdate(index, `steps.${i}.desc`, v)} multiline />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shrink-0 mt-auto pt-2 border-t border-zinc-300 text-center text-zinc-700 italic">
                    <p>
                        <EditableField isEditing={isEditing} value={content.closing || ""} onChange={(v) => handleContentUpdate(index, 'closing', v)} multiline />
                    </p>
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                        <p className="font-bold text-zinc-800 not-italic">
                            <EditableField isEditing={isEditing} value={content.supervisionNote || ""} onChange={(v) => handleContentUpdate(index, 'supervisionNote', v)} multiline />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Page 13: Mentee Induction & Access Levels (formerly index 11) - Shifted from original index 11
    if (index === 13) { 
        return (
            <div className="text-[8px] leading-tight text-justify h-full flex flex-col space-y-2">
                <p className="text-center italic text-zinc-600 font-serif shrink-0">
                    <EditableField isEditing={isEditing} value={content.intro || ""} onChange={(v) => handleContentUpdate(index, 'intro', v)} multiline />
                </p>

                <div className="pt-1 font-mono shrink-0">
                     <h3 className="font-bold text-[9px] uppercase brand-font mb-1 border-b border-zinc-300 pb-0.5">
                         <EditableField isEditing={isEditing} value={content.inductionChecklistHeader || ""} onChange={(v) => handleContentUpdate(index, 'inductionChecklistHeader', v)} />
                     </h3>
                     <div className="space-y-2">
                     {(content.inductionSteps || []).map((step: any, i: number) => (
                         <div key={i}>
                             <p className="font-bold">{step.title}</p>
                             <div className="pl-5 border-l border-zinc-200 ml-1">
                                 {(step.substeps || []).map((substep: string, j: number) => (
                                     <p key={j} className="text-[7px]">{substep}</p>
                                 ))}
                             </div>
                         </div>
                     ))}
                     </div>
                </div>

                <div className="pt-1 font-serif flex-1 overflow-y-auto pr-1">
                     <h3 className="font-bold text-[9px] uppercase brand-font mb-1 border-b border-zinc-300 pb-0.5">
                         <EditableField isEditing={isEditing} value={content.accessInfoHeader || ""} onChange={(v) => handleContentUpdate(index, 'accessInfoHeader', v)} />
                     </h3>
                     <div className="p-1.5 rounded text-[8px] bg-white border border-zinc-200 shadow-sm text-justify">
                        <p><EditableField isEditing={isEditing} value={content.accessInfoText || ""} onChange={(v) => handleContentUpdate(index, 'accessInfoText', v)} multiline/></p>
                     </div>
                </div>
                
                <div className="shrink-0 mt-auto pt-2 border-t border-zinc-300 text-center font-serif text-[8px] leading-tight">
                    <h4 className="font-bold uppercase brand-font text-zinc-800 mb-1">
                        <EditableField isEditing={isEditing} value={content.contactHeader || ""} onChange={(v) => handleContentUpdate(index, 'contactHeader', v)} />
                    </h4>
                    <p className="text-zinc-600 italic mb-1">
                        <EditableField isEditing={isEditing} value={content.contactInfo || ""} onChange={(v) => handleContentUpdate(index, 'contactInfo', v)} multiline/>
                    </p>
                    <p className="font-mono font-bold text-zinc-900">
                        Email: <EditableField isEditing={isEditing} value={content.email || ""} onChange={(v) => handleContentUpdate(index, 'email', v)} />
                    </p>
                    <p className="font-mono font-bold text-zinc-900">
                        Facebook: <EditableField isEditing={isEditing} value={content.facebook || ""} onChange={(v) => handleContentUpdate(index, 'facebook', v)} />
                    </p>
                </div>
            </div>
        );
    }

    // Page 14: Mentor Onboarding Checklist (formerly index 12) - Shifted from original index 12
    if (index === 14) { 
        return (
            <div className="h-full flex flex-col space-y-2">
                <p className="text-center italic text-zinc-600 font-serif text-[8px] leading-tight">
                    <EditableField isEditing={isEditing} value={content.intro || ""} onChange={(v) => handleContentUpdate(index, 'intro', v)} multiline />
                </p>
                
                <div className="pt-1 font-serif">
                    <h3 className="font-bold text-[9px] uppercase brand-font mb-1 border-b border-zinc-300 pb-0.5">
                        <EditableField isEditing={isEditing} value={content.preRequisitesHeader || ""} onChange={(v) => handleContentUpdate(index, 'preRequisitesHeader', v)} />
                    </h3>
                    {(content.preRequisites || []).map((item: string, i: number) => (
                        <p key={i} className="text-[8px] leading-tight notam-font">{item}</p>
                    ))}
                </div>

                <div className="pt-1 flex-1 overflow-y-auto pr-1 font-mono text-[8px] leading-tight">
                    <h3 className="font-bold text-[9px] uppercase brand-font mb-1 border-b border-zinc-300 pb-0.5">
                        <EditableField isEditing={isEditing} value={content.onboardingSequenceHeader || ""} onChange={(v) => handleContentUpdate(index, 'onboardingSequenceHeader', v)} />
                    </h3>
                    <div className="space-y-2">
                    {(content.onboardingSteps || []).map((step: any, i: number) => (
                        <div key={i}>
                            <p className="font-bold">{step.title}</p>
                            <div className="pl-5 border-l border-zinc-200 ml-1">
                                {(step.substeps || []).map((substep: string, j: number) => (
                                    <p key={j} className="text-[7px]">{substep}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="shrink-0 mt-auto pt-2 border-t border-zinc-300 text-center font-serif font-bold text-zinc-800 text-[8px] leading-tight">
                   <p><EditableField isEditing={isEditing} value={content.promotionNotice || ""} onChange={(v) => handleContentUpdate(index, 'promotionNotice', v)} multiline/></p>
                </div>
                
                <div className="shrink-0 mt-2 pt-2 border-t border-zinc-300 text-center font-serif text-[8px] leading-tight">
                    <h4 className="font-bold uppercase brand-font text-zinc-800 mb-1">
                        <EditableField isEditing={isEditing} value={content.contactHeader || ""} onChange={(v) => handleContentUpdate(index, 'contactHeader', v)} />
                    </h4>
                    <p className="text-zinc-600 italic mb-1">
                        <EditableField isEditing={isEditing} value={content.contactInfo || ""} onChange={(v) => handleContentUpdate(index, 'contactInfo', v)} multiline/>
                    </p>
                    <p className="font-mono font-bold text-zinc-900">
                        Email: <EditableField isEditing={isEditing} value={content.email || ""} onChange={(v) => handleContentUpdate(index, 'email', v)} />
                    </p>
                    <p className="font-mono font-bold text-zinc-900">
                        Facebook: <EditableField isEditing={isEditing} value={content.facebook || ""} onChange={(v) => handleContentUpdate(index, 'facebook', v)} />
                    </p>
                </div>

            </div>
        );
    }

    // Page 15: WING MENTOR PASSPORT (formerly index 13) - Shifted from original index 13
    if (index === 15) { 
        return (
            <div className="h-full flex flex-col font-serif">
                {/* Passport Cover */}
                <div className="w-full max-w-[60%] mx-auto aspect-[3/4] bg-black text-white p-4 rounded-lg shadow-lg flex flex-col items-center border border-zinc-700 my-2">
                    {/* Top section with logo and titles */}
                    <div className="flex-grow flex flex-col items-center justify-center text-center">
                        {/* Enlarged Logo */}
                        <img src={IMAGES.LOGO} alt="Wing Mentor Logo" className="w-16 h-16 object-contain mb-4 filter brightness-0 invert" />

                        {/* Title */}
                        <h3 className="text-lg font-bold brand-font uppercase tracking-widest text-yellow-400">
                            <EditableField isEditing={isEditing} value={content.passportTitle || "WINGMENTOR PASSPORT"} onChange={v => handleContentUpdate(index, 'passportTitle', v)} className="text-center bg-transparent border-yellow-500/20" />
                        </h3>
                        
                        {/* Subtitle */}
                        <p className="text-[8px] text-zinc-400 uppercase tracking-wider mt-2 font-sans">
                            <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} className="text-center bg-transparent border-zinc-600/50" />
                        </p>
                    </div>

                    {/* Bottom Epaulet Bars */}
                    <div className="mt-auto shrink-0">
                        <EpauletBars count={3} size="small" />
                    </div>
                </div>

                {/* Descriptive Paragraph */}
                <p className="text-[9px] leading-tight text-justify text-zinc-800 mt-4">
                    <EditableField isEditing={isEditing} value={content.description || ""} onChange={(v) => handleContentUpdate(index, 'description', v)} multiline />
                </p>
                
                {/* Identification Bars Description */}
                <div className="mt-2 pt-2 border-t border-zinc-200">
                     <p className="text-[9px] leading-tight text-justify text-zinc-800">
                        <EditableField isEditing={isEditing} value={content.barDescription || ""} onChange={(v) => handleContentUpdate(index, 'barDescription', v)} multiline />
                     </p>
                </div>
            </div>
        );
    }

    // Page 16: WINGLOGS APP PAGE (formerly index 14) - Shifted from original index 14
    if (index === 16) { 
        const loggedItems = content.logged_items || [];
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
                <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>

                <div className="my-1 p-2 border border-zinc-200 bg-zinc-50 rounded">
                    <img src={content.image || IMAGES.LOGBOOK_IMG} alt="Logbook App" className="w-full h-auto object-contain rounded-sm" />
                </div>
                
                <div>
                    <h4 className="font-bold brand-font text-[9px] uppercase">
                        <EditableField isEditing={isEditing} value={content.p2_header || ""} onChange={(v) => handleContentUpdate(index, 'p2_header', v)} />
                    </h4>
                    <ul className="text-[8px] font-mono list-none pl-2 space-y-0.5">
                        {loggedItems.map((item: string, i: number) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold brand-font text-[9px] uppercase">
                        <EditableField isEditing={isEditing} value={content.p3_header || ""} onChange={(v) => handleContentUpdate(index, 'p3_header', v)} />
                    </h4>
                    <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                </div>

                <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                    <p><EditableField isEditing={isEditing} value={content.p4 || ""} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline /></p>
                </div>
            </div>
        );
    }
    
    // Page 17: WINGMENTOR APP (formerly index 15) - Shifted from original index 15
    if (index === 17) { 
        const features = content.features_list || [];
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 {content.image && <img src={content.image} alt="App Interface" className="w-full h-auto object-contain rounded-md border border-zinc-200 my-1" />}
                 <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
 
                 {/* Bullet points section */}
                 <div className="flex-1 overflow-y-auto pr-1 pl-3 text-[8px] font-mono">
                     <ul className="list-disc space-y-1">
                        {features.map((item: string, i: number) => (
                             <li key={i}>
                                <EditableField 
                                    isEditing={isEditing} 
                                    value={item} 
                                    onChange={(v) => {
                                        const newFeatures = [...features];
                                        newFeatures[i] = v;
                                        handleContentUpdate(index, 'features_list', newFeatures);
                                    }} 
                                />
                             </li>
                         ))}
                     </ul>
                 </div>
 
                 <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                     <p><EditableField isEditing={isEditing} value={content.p_closing || ""} onChange={(v) => handleContentUpdate(index, 'p_closing', v)} multiline /></p>
                 </div>
            </div>
        );
    }

    // Page 18: The Pilot Gap Forum (formerly index 16) - Shifted from original index 16
    if (index === 18) { 
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 {content.image && <img src={content.image} alt="Forum Interface" className="w-full h-auto object-contain rounded-md border border-zinc-200 my-1" />}

                 <div className="flex-1 overflow-y-auto pr-1 space-y-2 text-[8px]">
                     {content.h_forum && <div>
                         <h4 className="font-bold brand-font uppercase"><EditableField isEditing={isEditing} value={content.h_forum} onChange={v => handleContentUpdate(index, 'h_forum', v)} /></h4>
                         <p><EditableField isEditing={isEditing} value={content.p_forum} onChange={v => handleContentUpdate(index, 'p_forum', v)} multiline /></p>
                     </div>}
                     {content.p_info && <p className="mt-2"><EditableField isEditing={isEditing} value={content.p_info} onChange={v => handleContentUpdate(index, 'p_info', v)} multiline /></p>}
                 </div>
 
                 <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                     <p><EditableField isEditing={isEditing} value={content.p_closing || ""} onChange={(v) => handleContentUpdate(index, 'p_closing', v)} multiline /></p>
                 </div>
            </div>
        );
    }

    // Page 19: The Black Box (formerly index 17) - Shifted from original index 17
    if (index === 19) { 
        const resources = content.resources_list || [];
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 {content.image && <img src={content.image} alt="Black Box" className="w-full h-auto object-contain rounded-md border border-zinc-200 my-1" />}
                 <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
 
                 <div className="flex-1 overflow-y-auto pr-1 text-[8px] font-mono">
                     <h4 className="font-bold brand-font text-[9px] uppercase mt-2">
                         <EditableField isEditing={isEditing} value={content.p2_header || ""} onChange={(v) => handleContentUpdate(index, 'p2_header', v)} />
                     </h4>
                     <ul className="list-disc space-y-1 pl-3">
                        {resources.map((item: string, i: number) => (
                             <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                         ))}
                     </ul>
                 </div>
 
                 <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                     <p><EditableField isEditing={isEditing} value={content.p_closing || ""} onChange={(v) => handleContentUpdate(index, 'p_closing', v)} multiline /></p>
                 </div>
            </div>
        );
    }

    // Page 20: Examination Terminal & Resources (formerly index 18) - Shifted from original index 18
    if (index === 20) { 
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-1 space-y-2 text-[8px]">
                    {/* Moved Resources */}
                    <div className="space-y-2">
                        {content.h_terminal && <div>
                            <h4 className="font-bold brand-font uppercase"><EditableField isEditing={isEditing} value={content.h_terminal} onChange={v => handleContentUpdate(index, 'h_terminal', v)} /></h4>
                            <p><EditableField isEditing={isEditing} value={content.p_terminal} onChange={v => handleContentUpdate(index, 'p_terminal', v)} multiline /></p>
                        </div>}
                        {content.h_handbook && <div>
                            <h4 className="font-bold brand-font uppercase"><EditableField isEditing={isEditing} value={content.h_handbook} onChange={v => handleContentUpdate(index, 'h_handbook', v)} /></h4>
                            <p><EditableField isEditing={isEditing} value={content.p_handbook} onChange={v => handleContentUpdate(index, 'p_handbook', v)} multiline /></p>
                        </div>}
                        {content.h_shop && <div>
                            <h4 className="font-bold brand-font uppercase"><EditableField isEditing={isEditing} value={content.h_shop} onChange={v => handleContentUpdate(index, 'h_shop', v)} /></h4>
                            <p><EditableField isEditing={isEditing} value={content.p_shop} onChange={v => handleContentUpdate(index, 'p_shop', v)} multiline /></p>
                        </div>}
                        {content.h_about && <div>
                            <h4 className="font-bold brand-font uppercase"><EditableField isEditing={isEditing} value={content.h_about} onChange={v => handleContentUpdate(index, 'h_about', v)} /></h4>
                            <p><EditableField isEditing={isEditing} value={content.p_about} onChange={(v) => handleContentUpdate(index, 'p_about', v)} multiline /></p>
                        </div>}
                    </div>

                    {/* Mind Map Section */}
                    {content.h_mindmap && <div className="mt-auto pt-2 border-t border-zinc-200">
                        <h4 className="font-bold brand-font uppercase text-zinc-800 text-center"><EditableField isEditing={isEditing} value={content.h_mindmap} onChange={v => handleContentUpdate(index, 'h_mindmap', v)} /></h4>
                        <p className="text-center italic text-zinc-600 text-[8px] my-1"><EditableField isEditing={isEditing} value={content.p_mindmap || ""} onChange={(v) => handleContentUpdate(index, 'p_mindmap', v)} multiline /></p>
                        {content.image && (
                            <div className="my-1 p-1 border border-zinc-200 bg-white rounded">
                                <img src={content.image} alt="Mind Map" className="w-full h-auto object-contain rounded-sm" />
                            </div>
                        )}
                    </div>}
                </div>
            </div>
        );
    }
    
    // Page 21: The Low Timer Gap Introduction (formerly index 19) - Shifted from original index 19
    if (index === 21) { 
        const learnPoints = content.learn_points || [];
        return (
            <div className="text-[9px] leading-tight font-serif text-justify h-full flex flex-col space-y-2">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 {content.image && <img src={content.image} alt="The Gap" className="w-full h-auto object-contain rounded-md border border-zinc-200 my-1" />}
                 <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
 
                 <div className="flex-1 overflow-y-auto pr-1 text-[8px]">
                     <div className="p-2 bg-zinc-100 border border-zinc-200 rounded my-1">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-800">
                            <EditableField isEditing={isEditing} value={content.learn_header || ""} onChange={(v) => handleContentUpdate(index, 'learn_header', v)} />
                        </h4>
                        <ul className="list-none space-y-1 mt-1 font-mono text-[8px]">
                            {learnPoints.map((point: string, i: number) => (
                                <li key={i} className="flex items-start">
                                    <span className="mr-1.5 text-zinc-500">•</span>
                                    <span>
                                        <EditableField 
                                            isEditing={isEditing} 
                                            value={point} 
                                            onChange={(v) => {
                                                const newPoints = [...learnPoints];
                                                newPoints[i] = v;
                                                handleContentUpdate(index, 'learn_points', newPoints);
                                            }} 
                                            multiline 
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                     </div>
                 </div>
 
                 <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                     <p><EditableField isEditing={isEditing} value={content.p_closing || ""} onChange={(v) => handleContentUpdate(index, 'p_closing', v)} multiline /></p>
                 </div>
            </div>
        );
    }

    // Page 22: Mind Map (formerly index 20) - Shifted from original index 20
    if (index === 22) { 
        const mindMapNodes = content.mindMapNodes || [];
        const getColorClasses = (color: string) => {
            switch (color) {
                case 'red': return 'bg-red-100 border-red-300 text-red-800';
                case 'green': return 'bg-green-100 border-green-300 text-green-800';
                case 'default':
                default:
                    return 'bg-zinc-200 border-zinc-400 text-zinc-900';
            }
        };

        return (
            <div className="h-full flex flex-col font-serif py-2">
                <p className="text-[9px] leading-tight text-justify mb-4">
                    <EditableField isEditing={isEditing} value={content.description || ""} onChange={(v) => handleContentUpdate(index, 'description', v)} multiline />
                </p>
                <div className="flex-1 flex flex-col items-center justify-center font-mono">
                    {mindMapNodes.map((node: any, i: number) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center">
                                <div className={`px-4 py-2 border rounded-md text-[10px] font-bold z-10 shadow-sm ${getColorClasses(node.color)} ${node.pulse ? 'animate-pulse' : ''}`}>
                                    {node.label}
                                </div>
                            </div>
                            {i < mindMapNodes.length - 1 && (
                                <div className="h-8 w-px bg-zinc-400 mx-auto my-1 shrink-0"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }

    // Page 23: The Pilot Paradox (formerly index 21) - Shifted from original index 21
    if (index === 23) { 
        return (
             <div className="space-y-4 font-serif text-justify">
                 <div>
                    <h3 className="text-sm font-bold brand-font uppercase mb-1"><EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} /></h3>
                    <p className="text-[9px] leading-tight"><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                 </div>
                 
                 <div>
                    <h3 className="text-sm font-bold brand-font uppercase mb-1"><EditableField isEditing={isEditing} value={content.subtitle2 || ""} onChange={(v) => handleContentUpdate(index, 'subtitle2', v)} /></h3>
                    <p className="text-[9px] leading-tight"><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold brand-font uppercase mb-1"><EditableField isEditing={isEditing} value={content.subtitle3 || "THE ENDLESS HOLD"} onChange={(v) => handleContentUpdate(index, 'subtitle3', v)} /></h3>
                    <p className="text-[9px] leading-tight"><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                    <p className="text-[9px] leading-tight mt-2"><EditableField isEditing={isEditing} value={content.p4 || ""} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline /></p>
                 </div>
                 
                 {/* New Image Section */}
                 {content.image && (
                    <div className="flex justify-center mt-2">
                         <img src={content.image} alt="Loop Diagram" className="max-w-[60%] h-auto object-contain mix-blend-multiply opacity-90 mx-auto" />
                    </div>
                 )}
             </div>
        );
    }

    // Page 24: Instructor Bottleneck (formerly index 22) - Shifted from original index 22
    if (index === 24) { 
         return (
             <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-2">
                 <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                     <div>
                         <h3 className="font-bold brand-font text-[10px] uppercase text-zinc-900 mb-1 border-b border-zinc-200">
                             <EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                         </h3>
                         <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                     </div>
                     
                     <div className="bg-zinc-50 p-2 rounded border border-zinc-100">
                         <h3 className="font-bold brand-font text-[10px] uppercase text-red-800 mb-1">
                             <EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                         </h3>
                         <p className="italic text-zinc-700"><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                     </div>
    
                     <div>
                         <h3 className="font-bold brand-font text-[10px] uppercase text-zinc-900 mb-1">
                             <EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} />
                         </h3>
                         <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                     </div>
                 </div>
                 {content.image && (
                    <div className="flex justify-center mt-2 shrink-0">
                         <img src={content.image} alt="Instructor Bottleneck" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                    </div>
                 )}
             </div>
        );
    }

    // Page 25: THE SATURATION EVENT: DATA ANALYSIS (formerly index 23) - Shifted from original index 23
    if (index === 25) { 
        const renderBoldText = (text: string) => {
            if (!text) return null;
            const parts = text.split(/\*\*(.*?)\*\*/g);
            return parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="font-black text-zinc-900">{part}</strong> : part
            );
        };

        if (isEditing) {
            return (
                 <div className="space-y-4 font-serif text-justify h-full flex flex-col text-[9px] leading-tight">
                     <div>
                         <h3 className="font-bold brand-font text-[10px] uppercase text-red-800 mb-1 border-b border-red-200">
                             <EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                         </h3>
                         <p className="mb-2"><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                         <p className="mb-2"><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                         
                         <div className="bg-zinc-100 p-2 rounded border border-zinc-200 italic text-zinc-700">
                            <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                         </div>
                         <p className="mt-2"><EditableField isEditing={isEditing} value={content.p4 || ""} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline /></p>
                     </div>
    
                     <div className="mt-4 pt-4 border-t border-zinc-300">
                         <h3 className="font-bold brand-font text-[10px] uppercase text-zinc-900 mb-1">
                             <EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                         </h3>
                         <p><EditableField isEditing={isEditing} value={content.p5 || ""} onChange={(v) => handleContentUpdate(index, 'p5', v)} multiline /></p>
                         <p className="mt-2"><EditableField isEditing={isEditing} value={content.p6 || ""} onChange={(v) => handleContentUpdate(index, 'p6', v)} multiline /></p>
                     </div>
                 </div>
            );
        }

        return (
             <div className="space-y-4 font-serif text-justify h-full flex flex-col text-[9px] leading-tight text-zinc-800">
                 <div>
                     <h3 className="font-bold brand-font text-[10px] uppercase text-red-800 mb-1 border-b border-red-200">
                         {content.h1}
                     </h3>
                     <p className="mb-2 whitespace-pre-wrap">{renderBoldText(content.p1)}</p>
                     <p className="mb-2 whitespace-pre-wrap">{renderBoldText(content.p2)}</p>
                     
                     <div className="bg-zinc-100 p-2 rounded border border-zinc-200 italic text-zinc-700">
                        <p className="whitespace-pre-wrap">{renderBoldText(content.p3)}</p>
                     </div>
                     <p className="mt-2 whitespace-pre-wrap">{renderBoldText(content.p4)}</p>
                 </div>

                 <div className="mt-4 pt-4 border-t border-zinc-300">
                     <h3 className="font-bold brand-font text-[10px] uppercase text-zinc-900 mb-1">
                         {content.h2}
                     </h3>
                     <p className="whitespace-pre-wrap">{renderBoldText(content.p5)}</p>
                     <p className="mt-2 whitespace-pre-wrap">{renderBoldText(content.p6)}</p>
                 </div>
             </div>
        );
    }
    
    // Page 26: THE PARADOX OF THE AVIATION DREAM (formerly index 24) - Shifted from original index 24
    if (index === 26) { 
         return (
             <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify">
                 <div className="space-y-2">
                     <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                     <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                 </div>
                 {content.image && (
                    <div className="flex-1 flex justify-center items-center mt-4">
                         <img src={content.image} alt="The Aviation Dream Paradox" className="w-full h-auto object-contain rounded-md border border-zinc-200 max-h-full" />
                    </div>
                 )}
             </div>
         );
    }

    // Page 27: Hiring Manager's Dilemma (formerly index 25) - Shifted from original index 25
    if (index === 27) { 
         return (
             <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-2">
                 {content.image && (
                    <div className="flex justify-center shrink-0">
                         <img src={content.image} alt="Hiring Dilemma" className="w-full h-auto object-contain rounded-md border border-zinc-200 max-h-24" />
                    </div>
                 )}
                 <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                     <div>
                         <h3 className="font-bold brand-font text-[10px] uppercase text-zinc-900 mb-1 border-b border-zinc-200">
                             <EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                         </h3>
                         <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                     </div>
                     
                     <div className="bg-zinc-5 p-2 rounded border border-zinc-100">
                         <h3 className="font-bold brand-font text-[10px] uppercase text-zinc-900 mb-1">
                             <EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                         </h3>
                         <p className="italic text-zinc-700"><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                     </div>
    
                     <div>
                         <h3 className="font-bold brand-font text-[10px] uppercase text-red-800 mb-1 border-b border-red-200">
                             <EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} />
                         </h3>
                         <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                     </div>
                 </div>
             </div>
         );
    }

    // Page 28: New Economic Trap Page (formerly index 26) - Shifted from original index 26
    if (index === 28) { 
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-4">
                {content.image && (
                    <div className="flex justify-center shrink-0">
                        <img src={content.image} alt="Economic Trap" className="w-full h-auto object-contain max-w-[80%] my-2" />
                    </div>
                )}
                <div>
                    <h3 className="font-bold brand-font text-[12px] uppercase text-center text-zinc-900 mb-1">
                        <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} className="text-center bg-transparent" />
                    </h3>
                    <div className="w-16 h-0.5 bg-zinc-300 mx-auto mb-4"></div>
                    <p className="mb-4">
                        <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                        <h4 className="font-bold brand-font text-[10px] uppercase text-red-800 mb-1">
                            <EditableField isEditing={isEditing} value={content.h_debt || ""} onChange={(v) => handleContentUpdate(index, 'h_debt', v)} />
                        </h4>
                        <p className="text-zinc-700">
                            <EditableField isEditing={isEditing} value={content.p_debt || ""} onChange={(v) => handleContentUpdate(index, 'p_debt', v)} multiline />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Page 29: The 68% Blind Spot: The Comfort Trap in Aviation (formerly index 27) - Shifted from original index 27
    if (index === 29) { 
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3">
                <p className="text-[10px] leading-relaxed text-zinc-800 italic font-bold">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>
                {content.image && (
                    <div className="flex justify-center shrink-0">
                        <img src={content.image} alt="Comfort Trap" className="w-full h-auto object-contain max-w-[80%] my-4" />
                    </div>
                )}
                <p className="text-[10px] leading-relaxed text-zinc-800 italic">
                    <EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline />
                </p>
            </div>
        );
    }

    // Page 30: NEW CHAPTER 3 TITLE PAGE for PRM (formerly index 28) - Shifted from original index 28
    if (index === 30) { 
        return (
            <div className="h-full flex flex-col items-center justify-center text-center font-serif p-4">
                <img src={IMAGES.LOGO} alt="Wing Mentor Program" className="w-40 h-auto object-contain mb-6 mix-blend-multiply opacity-80" />
                <h2 className="text-4xl font-bold brand-font uppercase leading-none text-zinc-900 mb-6">
                    <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} className="text-center bg-transparent" />
                </h2>
                <div className="w-12 h-0.5 bg-amber-500 mb-6"></div>
                <p className="text-[10px] leading-relaxed text-justify text-zinc-800">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>
            </div>
        );
    }

    // Page 31: CONSOLIDATED PRM INTRODUCTION (formerly index 29) - Shifted from original index 29
    if (index === 31) { 
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3 overflow-y-auto pr-1">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 {content.image && (
                     <div className="flex justify-center shrink-0 my-2">
                         {isEditing ? (
                             <EditableField 
                                 isEditing={isEditing} 
                                 value={content.image} 
                                 onChange={(v) => handleContentUpdate(index, 'image', v)} 
                                 className="w-full text-center p-1" 
                                 placeholder="Image URL"
                             />
                         ) : (
                             <img src={content.image} alt="PRM Intro" className="w-auto h-64 object-contain rounded-md border border-zinc-200 p-1" />
                         )}
                     </div>
                 )}
                 <p className="mb-2">
                     <EditableField isEditing={isEditing} value={content.p1_main_intro || ""} onChange={(v) => handleContentUpdate(index, 'p1_main_intro', v)} multiline />
                 </p>
            </div>
        );
    }

    // Page 32: Type Ratings: Investment Psychology (Part 1) - Risk-Taker & Trend-Follower Profiles (formerly index 30) - Shifted from original index 30
    if (index === 32) { 
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3 overflow-y-auto pr-1">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
                <p className="italic text-zinc-700">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                <div className="space-y-3">
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-red-800">
                            <EditableField isEditing={isEditing} value={content.h_risk || ""} onChange={(v) => handleContentUpdate(index, 'h_risk', v)} />
                        </h4>
                        {content.img_risk && <img src={content.img_risk} alt="Risk Taker" className="w-2/3 h-auto object-contain rounded my-2 border border-zinc-200 mx-auto" />}
                        <p><EditableField isEditing={isEditing} value={content.p_risk || ""} onChange={(v) => handleContentUpdate(index, 'p_risk', v)} multiline /></p>
                    </div>
                </div>
                <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                    <p><EditableField isEditing={isEditing} value={content.p_conclusion || ""} onChange={(v) => handleContentUpdate(index, 'p_conclusion', v)} multiline /></p>
                </div>
            </div>
        );
    }

    // Page 33: NEW INSERTED PAGE: The Analyst: The Strategist Profile (formerly index 31) - Shifted from original index 31
    if (index === 33) { 
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3 overflow-y-auto pr-1">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 {content.image && (
                     <div className="flex justify-center shrink-0 my-2">
                         {isEditing ? (
                             <EditableField 
                                 isEditing={isEditing} 
                                 value={content.image} 
                                 onChange={(v) => handleContentUpdate(index, 'image', v)} 
                                 className="w-full text-center p-1" 
                                 placeholder="Image URL"
                             />
                         ) : (
                             <img src={content.image} alt="Analyst Profile" className="w-auto h-64 object-contain rounded-md border border-zinc-200 p-1" />
                         )}
                     </div>
                 )}
                 <div className="pt-1 p-2 bg-blue-50 border border-blue-200 rounded">
                     <h4 className="font-bold brand-font text-[9px] uppercase text-blue-800 border-b border-blue-200 pb-0.5 mb-1">
                         <EditableField isEditing={isEditing} value={content.h_analyst_full || ""} onChange={(v) => handleContentUpdate(index, 'h_analyst_full', v)} />
                     </h4>
                     <p className="italic text-zinc-700">
                         <EditableField isEditing={isEditing} value={content.p_analyst_full || ""} onChange={(v) => handleContentUpdate(index, 'p_analyst_full', v)} multiline />
                     </p>
                 </div>
                 <div className="mt-auto pt-2 border-t border-zinc-200 text-center italic text-zinc-600 text-[8px]">
                    <p><EditableField isEditing={isEditing} value={content.p_closing_analyst || ""} onChange={(v) => handleContentUpdate(index, 'p_closing_analyst', v)} multiline /></p>
                 </div>
            </div>
        );
    }

    // Page 34: The ACTION Investment Safety Checklist (formerly index 32) - Shifted from original index 32
    if (index === 34) { 
        const actionChecklist = content.action_checklist || [];
        return (
            <>
                <h3 className="text-lg font-bold brand-font uppercase leading-tight text-zinc-900 mb-4 whitespace-pre-wrap">
                    <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} multiline />
                </h3>
                <p className="text-sm text-zinc-700 mb-6 whitespace-pre-wrap">
                    {isEditing ? (
                        <EditableField isEditing={isEditing} value={content.p_intro_action || ""} onChange={(v) => handleContentUpdate(index, 'p_intro_action', v)} multiline className="text-zinc-700" />
                    ) : (
                        <span className="text-zinc-700">{content.p_intro_action}</span>
                    )}
                </p>

                <div className="space-y-4">
                    {actionChecklist.map((item: any, i: number) => (
                        <div key={i} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                                {isEditing ? (
                                    <EditableField isEditing={isEditing} value={item.letter} onChange={(v) => handleContentUpdate(index, `action_checklist.${i}.letter`, v)} className="w-full text-center bg-transparent text-white" />
                                ) : (
                                    <span className="w-full text-center text-white">{item.letter}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase text-zinc-900 leading-tight mb-0.5">
                                    {isEditing ? (
                                        <EditableField isEditing={isEditing} value={item.principle} onChange={(v) => handleContentUpdate(index, `action_checklist.${i}.principle`, v)} className="text-zinc-900" />
                                    ) : (
                                        <span className="text-zinc-900">{item.principle}</span>
                                    )}
                                </p>
                                <p className="text-[10px] text-zinc-700">
                                    {isEditing ? (
                                        <EditableField isEditing={isEditing} value={item.description} onChange={(v) => handleContentUpdate(index, `action_checklist.${i}.description`, v)} multiline className="text-zinc-700" />
                                    ) : (
                                        <span className="text-zinc-700">{item.description}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    // Page 35: Introduction to Type Ratings (formerly index 33) - Shifted from original index 33
    if (index === 35) { 
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3 overflow-y-auto pr-1">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 <div className="space-y-4">
                     <div>
                        <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                            <EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                        </h4>
                        <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                     </div>
                     <div>
                        <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                            <EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                        </h4>
                        <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                     </div>
                     <div className="bg-red-50 p-3 rounded border border-red-200">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-red-800">
                            <EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} />
                        </h4>
                        <p className="italic text-zinc-700">
                            <EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                     </div>
                     {content.image && (
                        <div className="flex justify-center mt-2">
                            <img src={content.image} alt="Type Rating Subscription" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                        </div>
                     )}
                 </div>
            </div>
        );
    }

    // Page 36: CHOOSING A TYPE RATING (MODIFIED) (formerly index 34) - Shifted from original index 34
    if (index === 36) { 
        const renderBoldText = (text: string) => {
            if (!text) return null;
            const parts = text.split(/\*\*(.*?)\*\*/g);
            return parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="font-black text-zinc-900">{part}</strong> : part
            );
        };

        if(isEditing) {
            return (
                <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-2 overflow-y-auto pr-1">
                    <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                        <EditableField isEditing={true} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                    </h3>
                    
                    {/* MOVED IMAGE HERE */}
                    {content.image && (
                        <div className="flex justify-center mt-2">
                            <img src={content.image} alt="CAT Rating" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                        </div>
                    )}

                    <p className="italic text-zinc-700">
                        <EditableField isEditing={true} value={content.p_choosing || ""} onChange={(v) => handleContentUpdate(index, 'p_choosing', v)} multiline />
                    </p>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2 text-[8px]">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-blue-800 text-center mb-2">
                            <EditableField isEditing={true} value={content.cat_box_header || ""} onChange={(v) => handleContentUpdate(index, 'cat_box_header', v)} />
                        </h4>
                        <p className="mb-2"><EditableField isEditing={true} value={content.cat_box_p1 || ""} onChange={(v) => handleContentUpdate(index, 'cat_box_p1', v)} multiline /></p>
                        <p className="mb-2"><EditableField isEditing={true} value={content.cat_box_p2 || ""} onChange={(v) => handleContentUpdate(index, 'cat_box_p2', v)} multiline /></p>
                        <p><EditableField isEditing={true} value={content.cat_box_p3 || ""} onChange={(v) => handleContentUpdate(index, 'cat_box_p3', v)} multiline /></p>
                    </div>
                </div>
            )
        }

        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-2 overflow-y-auto pr-1">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    {content.subtitle}
                </h3>

                {/* MOVED IMAGE HERE */}
                {content.image && (
                    <div className="flex justify-center mt-2">
                        <img src={content.image} alt="CAT Rating" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                    </div>
                )}

                <p className="italic text-zinc-700 whitespace-pre-wrap">{content.p_choosing}</p>
                
                <div className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2 text-[8px]">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-blue-800 text-center mb-2">
                            {content.cat_box_header}
                        </h4>
                        <p className="mb-2 whitespace-pre-wrap">{content.cat_box_p1}</p>
                        <p className="mb-2 whitespace-pre-wrap">{renderBoldText(content.cat_box_p2)}</p>
                        <p className="whitespace-pre-wrap">{content.cat_box_p3}</p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Page 37: STRATEGIC PATHWAYS (NEW) (formerly index 35) - Shifted from original index 35
    if (index === 37) { 
         return (
             <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-4 overflow-y-auto pr-1">
                 <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                     <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                 </h3>
                 <div>
                     <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                         <EditableField isEditing={isEditing} value={content.h_military || ""} onChange={(v) => handleContentUpdate(index, 'h_military', v)} />
                     </h4>
                     <p><EditableField isEditing={isEditing} value={content.p_military || ""} onChange={(v) => handleContentUpdate(index, 'p_military', v)} multiline /></p>
                 </div>
                 <div className="bg-zinc-100 p-3 rounded border border-zinc-200">
                     <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                         <EditableField isEditing={isEditing} value={content.h_recommendation || ""} onChange={(v) => handleContentUpdate(index, 'h_recommendation', v)} />
                     </h4>
                     <p className="italic"><EditableField isEditing={isEditing} value={content.p_recommendation || ""} onChange={(v) => handleContentUpdate(index, 'p_recommendation', v)} multiline /></p>
                 </div>
                 {content.image && (
                    <div className="flex justify-center mt-2">
                        {isEditing ? (
                            <EditableField 
                                isEditing={isEditing} 
                                value={content.image} 
                                onChange={(v) => handleContentUpdate(index, 'image', v)} 
                                className="w-full text-center p-1" 
                                placeholder="Image URL"
                            />
                        ) : (
                            <img src={content.image} alt="Strategic Pathways" className="w-full h-auto object-contain rounded-md border border-zinc-200 p-1" />
                        )}
                    </div>
                 )}
             </div>
         );
    }

    // Page 38: Shiny Jet Syndrome (formerly index 36) - Shifted from original index 36
    if (index === 38) { 
        const debts = content.debts || [];
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-2 overflow-y-auto pr-1">
                 <div className="pt-2">
                     <h3 className="text-lg font-bold brand-font uppercase leading-tight text-zinc-900 mb-4 whitespace-pre-wrap">
                         <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} multiline />
                     </h3>
                     {content.image && (
                        <div className="flex justify-center my-4">
                            <img src={content.image} alt="Shiny Jet Syndrome" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                        </div>
                     )}
                     <p className="mt-2 text-zinc-800 font-bold italic">
                        <EditableField isEditing={isEditing} value={content.mistake || ""} onChange={(v) => handleContentUpdate(index, 'mistake', v)} multiline />
                     </p>
                </div>
                <div className="pt-2 mt-auto border-t border-zinc-200">
                    <ul className="list-disc pl-3 space-y-1 font-mono text-[8px] mt-2">
                        {debts.map((item: string, i: number) => (
                            <li key={i}>
                                <EditableField 
                                    isEditing={isEditing} 
                                    value={item} 
                                    onChange={(v) => {
                                        const newDebts = [...debts];
                                        newDebts[i] = v;
                                        handleContentUpdate(index, 'debts', newDebts);
                                    }} 
                                    multiline
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-red-900 font-bold mt-2">
                        <p>
                            <EditableField isEditing={isEditing} value={content.result || ""} onChange={(v) => handleContentUpdate(index, 'result', v)} multiline />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Page 39: The Subscription Trap (formerly index 37) - Shifted from original index 37
    if (index === 39) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-3">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
                {content.image && (
                    <div className="flex justify-center shrink-0 my-4">
                        {isEditing ? (
                            <EditableField 
                                isEditing={isEditing} 
                                value={content.image} 
                                onChange={(v) => handleContentUpdate(index, 'image', v)} 
                                className="w-full text-center p-1" 
                                placeholder="Image URL"
                            />
                        ) : (
                            <img src={content.image} alt="Subscription Trap" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                        )}
                    </div>
                )}
                <p className="italic text-zinc-700">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                    <div>
                        <h4 className="font-bold brand-font text-[9px] uppercase text-red-800">
                            <EditableField isEditing={isEditing} value={content.h_hold || ""} onChange={(v) => handleContentUpdate(index, 'h_hold', v)} />
                        </h4>
                        <p><EditableField isEditing={isEditing} value={content.p_hold || ""} onChange={(v) => handleContentUpdate(index, 'p_hold', v)} multiline /></p>
                    </div>
                    <div className="bg-red-50 p-3 rounded border border-red-200 mt-2">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-red-800 text-center">
                            <EditableField isEditing={isEditing} value={content.h_cost || ""} onChange={(v) => handleContentUpdate(index, 'h_cost', v)} />
                        </h4>
                        <div className="text-center my-2">
                            <p className="text-2xl font-mono font-black text-red-900">
                                <EditableField isEditing={isEditing} value={content.cost_amount || ""} onChange={(v) => handleContentUpdate(index, 'cost_amount', v)} />
                            </p>
                            <p className="text-[8px] font-bold uppercase tracking-wider text-red-700">
                                <EditableField isEditing={isEditing} value={content.cost_freq || ""} onChange={(v) => handleContentUpdate(index, 'cost_freq', v)} />
                            </p>
                        </div>
                        <p className="text-[8px] italic text-zinc-800 text-center">
                            <EditableField isEditing={isEditing} value={content.p_cost || ""} onChange={(v) => handleContentUpdate(index, 'p_cost', v)} multiline />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Page 40: CASE ANALYSIS: THE VERDICT ON 'CAPT. J' (formerly index 38) - Shifted from original index 38
    if (index === 40) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-4 overflow-y-auto pr-1">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
                
                <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-red-800">
                        <EditableField isEditing={isEditing} value={content.error1_h || ""} onChange={(v) => handleContentUpdate(index, 'error1_h', v)} />
                    </h4>
                    <p className="italic text-zinc-700">
                        <EditableField isEditing={isEditing} value={content.error1_p || ""} onChange={(v) => handleContentUpdate(index, 'error1_p', v)} multiline />
                    </p>
                </div>

                <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-red-800">
                        <EditableField isEditing={isEditing} value={content.error2_h || ""} onChange={(v) => handleContentUpdate(index, 'error2_h', v)} />
                    </h4>
                    <p className="italic text-zinc-700">
                        <EditableField isEditing={isEditing} value={content.error2_p || ""} onChange={(v) => handleContentUpdate(index, 'error2_p', v)} multiline />
                    </p>
                </div>

                <div className="bg-zinc-100 p-3 rounded border border-zinc-200">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900 mb-1">
                        <EditableField isEditing={isEditing} value={content.error3_h || ""} onChange={(v) => handleContentUpdate(index, 'error3_h', v)} />
                    </h4>
                    <p className="italic text-zinc-700">
                        <EditableField isEditing={isEditing} value={content.error3_p || ""} onChange={(v) => handleContentUpdate(index, 'error3_p', v)} multiline />
                    </p>
                </div>
                <div className="mt-auto pt-2 border-t border-zinc-200">
                    <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                        <EditableField isEditing={isEditing} value={content.final_verdict_h || ""} onChange={(v) => handleContentUpdate(index, 'final_verdict_h', v)} />
                    </h4>
                    <p className="italic text-zinc-700">
                        <EditableField isEditing={isEditing} value={content.final_verdict_p || ""} onChange={(v) => handleContentUpdate(index, 'final_verdict_p', v)} multiline />
                    </p>
                </div>
            </div>
        );
    }

    // Page 41: Type Rating Investment: Banker vs Casino Manager (formerly index 39) - Shifted from original index 39
    if (index === 41) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify overflow-y-auto pr-1">
                <p className="italic mb-3 text-zinc-600 text-center">
                    <EditableField isEditing={isEditing} value={content.intro || ""} onChange={(v) => handleContentUpdate(index, 'intro', v)} multiline />
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Casino Column */}
                    <div className="bg-red-50 p-2 rounded border border-red-100">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-red-800 mb-1 flex items-center justify-center">
                            <i className="fas fa-dice mr-1"></i> <EditableField isEditing={isEditing} value={content.col1_title || ""} onChange={(v) => handleContentUpdate(index, 'col1_title', v)} />
                        </h4>
                        <p className="text-[8px]"><EditableField isEditing={isEditing} value={content.col1_text || ""} onChange={(v) => handleContentUpdate(index, 'col1_text', v)} multiline /></p>
                    </div>
                    {/* Bank Column */}
                    <div className="bg-green-50 p-2 rounded border border-green-100">
                        <h4 className="font-bold brand-font text-[9px] uppercase text-green-800 mb-1 flex items-center justify-center">
                            <i className="fas fa-university mr-1"></i> <EditableField isEditing={isEditing} value={content.col2_title || ""} onChange={(v) => handleContentUpdate(index, 'col2_title', v)} />
                        </h4>
                        <p className="text-[8px]"><EditableField isEditing={isEditing} value={content.col2_text || ""} onChange={(v) => handleContentUpdate(index, 'col2_text', v)} multiline /></p>
                    </div>
                </div>

                <div className="border-t border-zinc-200 pt-2 mb-2">
                    <h4 className="font-bold brand-font text-[10px] uppercase text-center mb-2 bg-zinc-800 text-white py-1 rounded">
                        <EditableField isEditing={isEditing} value={content.table_header || ""} onChange={(v) => handleContentUpdate(index, 'table_header', v)} />
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-[8px] font-mono">
                        <div className="border-r border-zinc-200 pr-2">
                            <p className="font-bold text-red-700 mb-1"><EditableField isEditing={isEditing} value={content.optA_title || ""} onChange={(v) => handleContentUpdate(index, 'optA_title', v)} /></p>
                            <ul className="space-y-0.5">
                                <li>• <EditableField isEditing={isEditing} value={content.optA_phys || ""} onChange={(v) => handleContentUpdate(index, 'optA_phys', v)} /></li>
                                <li>• <EditableField isEditing={isEditing} value={content.optA_liq || ""} onChange={(v) => handleContentUpdate(index, 'optA_liq', v)} /></li>
                                <li>• <EditableField isEditing={isEditing} value={content.optA_maint || ""} onChange={(v) => handleContentUpdate(index, 'optA_maint', v)} /></li>
                                <li className="font-bold text-red-600">• <EditableField isEditing={isEditing} value={content.optA_risk || ""} onChange={(v) => handleContentUpdate(index, 'optA_risk', v)} /></li>
                            </ul>
                            <p className="mt-1 italic text-zinc-500 text-[7px]"><EditableField isEditing={isEditing} value={content.optA_quote || ""} onChange={(v) => handleContentUpdate(index, 'optA_quote', v)} /></p>
                        </div>
                        <div className="pl-2">
                            <p className="font-bold text-green-700 mb-1"><EditableField isEditing={isEditing} value={content.optB_title || ""} onChange={(v) => handleContentUpdate(index, 'optB_title', v)} /></p>
                            <ul className="space-y-0.5">
                                <li>• <EditableField isEditing={isEditing} value={content.optB_phys || ""} onChange={(v) => handleContentUpdate(index, 'optB_phys', v)} /></li>
                                <li>• <EditableField isEditing={isEditing} value={content.optB_liq || ""} onChange={(v) => handleContentUpdate(index, 'optB_liq', v)} /></li>
                                <li>• <EditableField isEditing={isEditing} value={content.optB_maint || ""} onChange={(v) => handleContentUpdate(index, 'optB_maint', v)} /></li>
                                <li className="font-bold text-green-600">• <EditableField isEditing={isEditing} value={content.optB_risk || ""} onChange={(v) => handleContentUpdate(index, 'optB_risk', v)} /></li>
                            </ul>
                            <p className="mt-1 italic text-zinc-500 text-[7px]"><EditableField isEditing={isEditing} value={content.optB_quote || ""} onChange={(v) => handleContentUpdate(index, 'optB_quote', v)} /></p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-2 bg-zinc-100 border-l-2 border-zinc-400 text-[8px] italic font-bold text-zinc-800">
                    <EditableField isEditing={isEditing} value={content.conclusion || ""} onChange={(v) => handleContentUpdate(index, 'conclusion', v)} multiline />
                </div>
            </div>
        );
    }

    // Page 42: The Final Verdict Analysis (formerly index 40) - Shifted from original index 40
    if (index === 42) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-4">
                <div className="flex-1 space-y-4 pt-2 overflow-y-auto pr-1">
                    <div>
                        <h4 className="font-bold brand-font uppercase text-red-800 border-b border-red-200 mb-1">
                            <EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                        </h4>
                        <p>
                            <EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline />
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold brand-font text-[10px] uppercase text-zinc-900 border-b border-zinc-200 mb-1">
                            <EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                        </h4>
                        <p>
                            <EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline />
                        </p>
                    </div>
                    <div className="bg-green-50 p-2 border border-green-100 rounded">
                        <h4 className="font-bold brand-font uppercase text-green-800 mb-1">
                            <EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} />
                        </h4>
                        <p className="text-zinc-700">
                            <EditableField isEditing={isEditing} value={content.p4 || ""} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline />
                        </p>
                    </div>
                    {content.image && (
                        <div className="flex justify-center mt-4">
                             <img src={content.image} alt="Melting Ice Cube Diagram" className="w-full h-auto object-contain rounded-md border border-zinc-200" />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Page 43: Aircraft Ownership: A Tangible Investment (formerly index 41) - Shifted from original index 41
    if (index === 43) {
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight text-justify space-y-4 overflow-y-auto pr-1">
                <h3 className="text-center font-bold text-[10px] brand-font uppercase text-zinc-600">
                    <EditableField isEditing={isEditing} value={content.subtitle || ""} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} />
                </h3>
                {content.image && (
                    <div className="flex justify-center shrink-0 my-4">
                        {isEditing ? (
                            <EditableField 
                                isEditing={isEditing} 
                                value={content.image} 
                                onChange={(v) => handleContentUpdate(index, 'image', v)} 
                                className="w-full text-center p-1" 
                                placeholder="Image URL"
                            />
                        ) : (
                            <img src={content.image} alt="Cessna 152" className="w-full max-w-[150px] h-auto object-contain rounded-md border border-zinc-200" />
                        )}
                    </div>
                )}
                <p className="italic text-zinc-700"><EditableField isEditing={isEditing} value={content.p_intro || ""} onChange={(v) => handleContentUpdate(index, 'p_intro', v)} multiline /></p>
                
                <div className="space-y-4 pt-2">
                    <div>
                        <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                            <EditableField isEditing={isEditing} value={content.h1 || ""} onChange={(v) => handleContentUpdate(index, 'h1', v)} />
                        </h4>
                        <p><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                    </div>
                    <div>
                        <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                            <EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} />
                        </h4>
                        <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                    </div>
                    <div>
                        <h4 className="font-bold brand-font text-[9px] uppercase text-zinc-900">
                            <EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} />
                        </h4>
                        <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                    </div>
                </div>
            </div>
        );
    }

    // Page 44: The Training Bond: Financial Handcuffs (formerly index 42) - Shifted from original index 42
    if (index === 44) {
        return (
            <div className="h-full flex flex-col font-serif text-[10px] leading-tight text-justify space-y-4 p-4">
                {content.image && (
                    <div className="flex justify-center shrink-0 mb-4">
                        <img src={content.image} alt="Training Bond Diagram" className="w-full h-auto object-contain max-w-[80%]" />
                    </div>
                )}
                <p className="text-[10px] leading-relaxed text-zinc-800 italic">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>
                <div className="space-y-3">
                    <div className="bg-zinc-100 p-3 rounded-lg border border-zinc-200">
                        <h4 className="font-bold brand-font uppercase text-zinc-900 mb-1">
                            <EditableField isEditing={isEditing} value={content.bullet1_header || ""} onChange={(v) => handleContentUpdate(index, 'bullet1_header', v)} />
                        </h4>
                        <p className="text-zinc-700">
                            <EditableField isEditing={isEditing} value={content.bullet1_text || ""} onChange={(v) => handleContentUpdate(index, 'bullet1_text', v)} multiline />
                        </p>
                    </div>
                    <div className="bg-zinc-100 p-3 rounded-lg border border-zinc-200">
                        <h4 className="font-bold brand-font uppercase text-zinc-900 mb-1">
                            <EditableField isEditing={isEditing} value={content.bullet2_header || ""} onChange={(v) => handleContentUpdate(index, 'bullet2_header', v)} />
                        </h4>
                        <p className="text-zinc-700">
                            <EditableField isEditing={isEditing} value={content.bullet2_2ext || ""} onChange={(v) => handleContentUpdate(index, 'bullet2_2ext', v)} multiline />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Page 45: Training Bonds & Flight Time (formerly index 43) - Shifted from original index 43
    if (index === 45) {
        return (
             <div className="text-[9px] leading-tight text-justify font-serif h-full flex flex-col space-y-3 overflow-y-auto pr-1">
                 {/* Bonds Section */}
                 <div>
                    <h3 className="font-bold brand-font text-[10px] uppercase text-red-800 mb-1 border-b border-red-200">Training Bonds: Restricted Maneuvering</h3>
                    <p className="mb-2"><EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline /></p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-zinc-100 p-2 rounded border border-zinc-200">
                             <h4 className="font-bold brand-font uppercase mb-0.5 text-[9px] text-zinc-900"><EditableField isEditing={isEditing} value={content.h2 || ""} onChange={(v) => handleContentUpdate(index, 'h2', v)} /></h4>
                             <p><EditableField isEditing={isEditing} value={content.p2 || ""} onChange={(v) => handleContentUpdate(index, 'p2', v)} multiline /></p>
                        </div>
                         <div className="bg-zinc-100 p-2 rounded border border-zinc-200">
                             <h4 className="font-bold brand-font uppercase mb-0.5 text-[9px] text-zinc-900"><EditableField isEditing={isEditing} value={content.h3 || ""} onChange={(v) => handleContentUpdate(index, 'h3', v)} /></h4>
                             <p><EditableField isEditing={isEditing} value={content.p3 || ""} onChange={(v) => handleContentUpdate(index, 'p3', v)} multiline /></p>
                        </div>
                    </div>

                    <div className="border-l-2 border-amber-500 pl-2 bg-amber-50 p-2 rounded">
                        <h4 className="font-bold brand-font uppercase mb-1 text-[9px] text-zinc-900"><EditableField isEditing={isEditing} value={content.h4 || ""} onChange={(v) => handleContentUpdate(index, 'h4', v)} /></h4>
                        <p className="whitespace-pre-wrap font-mono text-[8px] mb-1">
                            <EditableField isEditing={isEditing} value={content.p4 || ""} onChange={(v) => handleContentUpdate(index, 'p4', v)} multiline /></p>
                        <p className="italic text-[8px]"><EditableField isEditing={isEditing} value={content.p5 || ""} onChange={(v) => handleContentUpdate(index, 'p5', v)} multiline /></p>
                    </div>
                 </div>

                 {/* New Section: Safety Paradox */}
                 {content.h_safety_paradox && (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
                        <h4 className="font-bold brand-font uppercase text-red-800 mb-2 flex items-center">
                            <i className={`fas ${content.safety_icon || 'fa-lock'} mr-2 ${content.safety_icon_color}`}></i>
                            <EditableField isEditing={isEditing} value={content.h_safety_paradox} onChange={(v) => handleContentUpdate(index, 'h_safety_paradox', v)} />
                        </h4>
                        <p className="text-zinc-800 font-bold">
                             <EditableField isEditing={isEditing} value={content.p_safety_paradox} onChange={(v) => handleContentUpdate(index, 'p_safety_paradox', v)} multiline />
                        </p>
                    </div>
                 )}
             </div>
        );
    }
    
    // Page 46: Blank Page (NEWLY INSERTED)
    if (index === 46) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50">
                 <div className="w-16 h-16 mb-4 flex items-center justify-center text-zinc-300">
                    <i className="fas fa-file-alt text-4xl"></i>
                 </div>
                 <p className="text-[10px] font-serif italic text-zinc-600 mb-6">
                     <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} multiline />
                 </p>
                 <div className="w-6 h-px bg-zinc-400 mb-6"></div>
                 <p className="font-bold brand-font text-base uppercase tracking-widest text-zinc-400">WING MENTOR</p>
            </div>
        );
    }

    // Page 47: Glossary of Terms (formerly index 44) - Shifted from original index 44 to 47
    if (index === 47) {
        const terms = content.terms || [];
        return (
            <div className="h-full flex flex-col font-serif text-[9px] leading-tight space-y-3 overflow-y-auto pr-1">
                {terms.map((item: any, i: number) => (
                    <div key={i} className={`pb-2 ${i < terms.length - 1 ? 'border-b border-zinc-200' : ''}`}>
                        <p className="font-bold brand-font text-[10px] uppercase text-zinc-900">
                            <EditableField isEditing={isEditing} value={item.term} onChange={(v) => handleContentUpdate(index, `terms.${i}.term`, v)} />
                        </p>
                        <p className="text-zinc-700">
                             <EditableField isEditing={isEditing} value={item.def} onChange={(v) => handleContentUpdate(index, `terms.${i}.def`, v)} multiline />
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    // Chapter 4 Title Page (was index 47, now shifted to index 48)
    if (index === 48) {
        const chapterColors = {
            "CHAPTER 4": "bg-blue-50",
            "CHAPTER 5": "bg-green-50",
        };
        const chapterIcons = {
            "CHAPTER 4": "fa-check-double",
            "CHAPTER 5": "fa-sitemap"
        };
        const bgColor = chapterColors[content.section as keyof typeof chapterColors] || 'bg-zinc-50';
        const icon = chapterIcons[content.section as keyof typeof chapterIcons] || 'fa-book-open';

        return (
             <div className={`h-full flex flex-col items-center justify-center text-center font-serif p-4 ${bgColor}`}>
                <div className="w-20 h-20 mb-6 flex items-center justify-center bg-zinc-900 rounded-full text-white">
                    <i className={`fas ${icon} text-3xl`}></i>
                </div>
                <h2 className="text-4xl font-bold brand-font uppercase leading-none text-zinc-900 mb-4">
                    <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} className="text-center bg-transparent" />
                </h2>
                {content.subtitle && <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    <EditableField isEditing={isEditing} value={content.subtitle} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} className="text-center bg-transparent" />
                </h3>}
                <div className="w-16 h-1 bg-amber-500 mb-8"></div>
                <p className="text-[10px] leading-relaxed text-justify text-zinc-800 max-w-xs">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>
            </div>
        );
    }

    // Chapter 5 Title Page (was index 55, now shifted to index 56)
    if (index === 56) {
        const chapterColors = {
            "CHAPTER 4": "bg-blue-50",
            "CHAPTER 5": "bg-green-50",
        };
        const chapterIcons = {
            "CHAPTER 4": "fa-check-double",
            "CHAPTER 5": "fa-sitemap"
        };
        const bgColor = chapterColors[content.section as keyof typeof chapterColors] || 'bg-zinc-50';
        const icon = chapterIcons[content.section as keyof typeof chapterIcons] || 'fa-book-open';

        return (
             <div className={`h-full flex flex-col items-center justify-center text-center font-serif p-4 ${bgColor}`}>
                <div className="w-20 h-20 mb-6 flex items-center justify-center bg-zinc-900 rounded-full text-white">
                    <i className={`fas ${icon} text-3xl`}></i>
                </div>
                <h2 className="text-4xl font-bold brand-font uppercase leading-none text-zinc-900 mb-4">
                    <EditableField isEditing={isEditing} value={content.title || ""} onChange={(v) => handleContentUpdate(index, 'title', v)} className="text-center bg-transparent" />
                </h2>
                {content.subtitle && <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    <EditableField isEditing={isEditing} value={content.subtitle} onChange={(v) => handleContentUpdate(index, 'subtitle', v)} className="text-center bg-transparent" />
                </h3>}
                <div className="w-16 h-1 bg-amber-500 mb-8"></div>
                <p className="text-[10px] leading-relaxed text-justify text-zinc-800 max-w-xs">
                    <EditableField isEditing={isEditing} value={content.p1 || ""} onChange={(v) => handleContentUpdate(index, 'p1', v)} multiline />
                </p>
            </div>
        );
    }
    
    // Backend Operations (was index 63, now shifted to index 64)
    if (index === 64) {
         return (
             <div className="space-y-4">
                 <div>
                     <h4 className="font-bold text-[10px] uppercase mb-1 border-b border-zinc-300 pb-0.5"><EditableField isEditing={isEditing} value={content.sec1Title || ""} onChange={(v) => handleContentUpdate(index, 'sec1Title', v)} /></h4>
                     <p className="text-[8px] leading-tight font-mono text-zinc-600 text-justify"><EditableField isEditing={isEditing} value={content.sec1Text || ""} onChange={(v) => handleContentUpdate(index, 'sec1Text', v)} multiline /></p>
                 </div>
                 <div>
                     <h4 className="font-bold text-[10px] uppercase mb-1 border-b border-zinc-300 pb-0.5"><EditableField isEditing={isEditing} value={content.sec2Title || ""} onChange={(v) => handleContentUpdate(index, 'sec2Title', v)} /></h4>
                     <p className="text-[8px] leading-tight font-mono text-zinc-600 text-justify"><EditableField isEditing={isEditing} value={content.sec2Text || ""} onChange={(v) => handleContentUpdate(index, 'sec2Text', v)} multiline /></p>
                 </div>
                 <div className="mt-auto pt-6 flex justify-center opacity-50">
                     <i className="fas fa-cogs text-3xl text-zinc-300"></i>
                 </div>
             </div>
         );
    }
    
    // Closing Pages (was index 64-67, now shifted to 65-68)
    const closingStartIndex = TOTAL_PAGES - 4; // Assuming 4 closing pages, and this will be from index 65 (69 - 4 = 65)
    if (index >= closingStartIndex && index <= TOTAL_PAGES -1) {
         return (
             <div className="h-full flex flex-col items-center justify-center text-center p-6 border-4 border-double border-zinc-200">
                 <div className="w-12 h-12 mb-4 opacity-80">
                      <img src={IMAGES.LOGO} alt="Logo" className="w-full h-full object-contain filter grayscale" />
                 </div>
                 <p className="text-[10px] font-serif italic text-zinc-600 mb-6">
                     "<EditableField isEditing={isEditing} value={content.quote || ""} onChange={(v) => handleContentUpdate(index, 'quote', v)} multiline />"
                 </p>
                 <div className="w-6 h-px bg-zinc-400 mb-6"></div>
                 <p className="font-bold brand-font text-base uppercase tracking-widest text-zinc-900">WING MENTOR</p>
                 <p className="text-[8px] font-mono text-zinc-500 mt-1"><EditableField isEditing={isEditing} value={content.url || ""} onChange={(v) => handleContentUpdate(index, 'url', v)} /></p>
             </div>
         );
    }

    // Default renderer for all other pages (Chapter 4, Chapter 5, and remaining legacy pages)
    return renderStandardContent();
  };

  const getPageProps = (idx: number) => {
      const c = pageContent[idx] || DEFAULT_PAGE_CONTENT[idx] || {};
      return {
          section: c.section,
          title: c.title,
          pageNumber: (idx + 1).toString().padStart(2, '0'),
          isCover: idx === 0
      };
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center py-8 px-4 transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-200'}`}>
      
      {/* Navigation Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
          <button 
             onClick={onBackToLanding}
             className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
          >
              <i className="fas fa-arrow-left"></i> <span>Exit Handbook</span>
          </button>
          
          <div className="flex space-x-4">
              <button onClick={() => { setIsEditing(false); handlePrev(); }} disabled={currentPageIndex === 0} className="w-8 h-8 rounded-full flex items-center justify-center bg-black/20 hover:bg-black/40 text-white disabled:opacity-30 transition-all">
                  <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={() => { setIsEditing(false); handleNext(); }} disabled={currentPageIndex >= TOTAL_PAGES - 1} className="w-8 h-8 rounded-full flex items-center justify-center bg-black/20 hover:bg-black/40 text-white disabled:opacity-30 transition-all">
                  <i className="fas fa-chevron-right"></i>
              </button>
          </div>
      </div>

      {/* BOOK DISPLAY AREA */}
      <div className="relative w-full max-w-5xl flex justify-center items-center">
        {currentPageIndex === 0 ? (
            // COVER VIEW
            <div className="w-full max-w-sm md:max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-[1.01] transition-transform duration-500">
                <HandbookPage 
                    {...getPageProps(0)} 
                    onClick={handleNext}
                >
                    {renderContentForIndex(0)}
                </HandbookPage>
            </div>
        ) : (
            // SPREAD VIEW
            <div className="flex flex-row w-full justify-center items-stretch shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                
                {/* LEFT PAGE */}
                <div className="flex-1 max-w-sm md:max-w-md relative z-10 origin-right transition-transform duration-500">
                    <HandbookPage 
                        {...getPageProps(currentPageIndex)}
                        className="rounded-l-lg border-r-0 shadow-none"
                        onClick={handlePrev}
                    >
                        {renderContentForIndex(currentPageIndex)}
                    </HandbookPage>
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
                </div>

                {/* RIGHT PAGE */}
                <div className="flex-1 max-w-sm md:max-w-md relative z-10 origin-left transition-transform duration-500">
                    <HandbookPage 
                        {...getPageProps(currentPageIndex + 1)}
                        className="rounded-r-lg border-l-0 shadow-none"
                        onClick={handleNext}
                    >
                         {currentPageIndex + 1 < TOTAL_PAGES ? renderContentForIndex(currentPageIndex + 1) : <div className="h-full bg-zinc-50/50"></div>}
                    </HandbookPage>
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
                </div>
                
            </div>
        )}
      </div>

      {/* EDIT CONTROLS UNDERNEATH */}
      <div className="mt-8 flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-4">
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all border-2
                            ${isEditing 
                                ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                                : 'bg-transparent border-zinc-500 text-zinc-500 hover:border-zinc-300 hover:text-zinc-300'}`}
            >
                {isEditing ? 'Editing Active' : 'Edit Pages'}
            </button>
            {isEditing && (
                <button 
                    onClick={handleSave}
                    className="px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all bg-green-600 hover:bg-green-500 text-white shadow-lg animate-pulse"
                >
                    <i className="fas fa-save mr-2"></i> Save Changes
                </button>
            )}
          </div>
          {saveMessage && (
              <p className="text-green-400 text-xs font-mono uppercase tracking-widest animate-fade-in-up">
                  <i className="fas fa-check-circle mr-2"></i> {saveMessage}
              </p>
          )}
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Page {currentPageIndex === 0 ? 'Cover' : `${(currentPageIndex + 1).toString().padStart(2, '0')} - ${Math.min(currentPageIndex + 2, TOTAL_PAGES).toString().padStart(2, '0')}`} of {TOTAL_PAGES}
          </p>
          <p className="text-[10px] text-zinc-600 italic">
              Tip: Use Left/Right Arrow Keys to turn pages
          </p>
      </div>

    </div>
  );
};
