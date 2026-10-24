import { DepartmentInfo } from '../types';

export const COLLEGE_NAME = "MADHA ARTS AND SCIENCE COLLEGE (MASC), CHENNAI";
export const COLLEGE_SHORT = "MASC Chennai";
export const WEBSITE_NAME = "C² Tech";
export const WEBSITE_NAME_FORMATTED = "C² Tech";
export const TAGLINE = "Think Beyond Code. Build Beyond Limits.";

export const COLLEGE_LOCATION = {
  institution: "Madha Arts and Science College (MASC)",
  street: "Madha Nagar, Somangalam Road",
  area: "Erandamkattalai, Sadhanandhapuram",
  post: "Thandalam Post (Near Kovur / Kundrathur)",
  city: "Chennai",
  pincode: "600 128",
  state: "Tamil Nadu, India",
  fullAddress: "Madha Nagar, Somangalam Road, Erandamkattalai, Sadhanandhapuram, Thandalam Post (Near Kovur / Kundrathur), Chennai - 600 128, Tamil Nadu, India",
  landmarks: [
    { label: "Proximity to Airport", desc: "~7.7 km from Chennai International Airport" },
    { label: "Nearest Bus Junctions", desc: "Kovur Church & Anakaputhur / Kundrathur Route" },
    { label: "Corridor", desc: "West Chennai Educational Belt, Kundrathur - Kovur Zone" },
  ],
};

export const DEPARTMENTS_DATA: Record<'CS' | 'CA', DepartmentInfo> = {
  CS: {
    id: 'CS',
    fullName: 'Department of Computer Science',
    shortName: 'B.Sc Computer Science',
    codeName: 'DEPT // 01 : CS',
    themeColor: 'cyan',
    tagline: 'Foundations of Computation, Algorithmic Thinking & System Architecture',
    summary: 'The Department of Computer Science at Madha Arts and Science College provides students with deep grounding in computational theory, algorithm design, systems software, and emerging computing paradigms.',
    coreDomains: [
      {
        title: 'Programming & Logic Building',
        description: 'Mastery over procedural, object-oriented, and modular paradigms using C, C++, and Python.',
        icon: 'Code2',
      },
      {
        title: 'Data Structures and Algorithms',
        description: 'Linear and non-linear data organization, graph theory, algorithmic complexity, and optimization.',
        icon: 'Binary',
      },
      {
        title: 'Operating Systems & Architecture',
        description: 'Process scheduling, memory management, file systems, concurrency, and computer hardware organization.',
        icon: 'Cpu',
      },
      {
        title: 'Database Management Systems',
        description: 'Relational database schema design, normalization, ACID properties, indexing, and SQL queries.',
        icon: 'Database',
      },
      {
        title: 'Software Development & Engineering',
        description: 'System analysis, SDLC methodologies, version control with Git, and clean modular architecture.',
        icon: 'Layers',
      },
      {
        title: 'Artificial Intelligence Fundamentals',
        description: 'Knowledge representation, search algorithms, heuristic exploration, and foundational machine intelligence.',
        icon: 'Sparkles',
      },
    ],
    curriculumHighlights: [
      'Problem Solving and Python Programming',
      'Data Structures and Algorithm Design',
      'Computer Organization and Architecture',
      'Database Management Systems with SQL',
      'Operating Systems & Shell Scripting',
      'Object-Oriented Programming with Java & C++',
      'Computer Networks and Distributed Systems',
      'Introduction to Machine Learning & Intelligent Systems',
    ],
    labFacilities: [
      'High-Performance Programming Laboratory',
      'Linux / Unix Systems & Shell Lab',
      'Database Architecture & SQL Practice Hub',
      'Algorithmic Problem Solving & Competitive Coding Cell',
    ],
    careerAvenues: [
      'Systems Software Engineer',
      'Algorithm Engineer',
      'Data Engineer / Analyst',
      'Cloud Infrastructure Specialist',
      'AI / ML Associate',
      'Academic & Computational Researcher',
    ],
  },
  CA: {
    id: 'CA',
    fullName: 'Department of Computer Applications',
    shortName: 'BCA (Bachelor of Computer Applications)',
    codeName: 'DEPT // 02 : CA',
    themeColor: 'purple',
    tagline: 'Applied Software Engineering, Full-Stack Web Systems & Modern Tech Stacks',
    summary: 'The Department of Computer Applications at Madha Arts and Science College bridges computational theory with real-world enterprise software, interactive web technologies, and mobile applications.',
    coreDomains: [
      {
        title: 'Application Development',
        description: 'End-to-end desktop, mobile, and cloud software development tailored for enterprise deployment.',
        icon: 'LayoutGrid',
      },
      {
        title: 'Web Technologies & Full-Stack',
        description: 'Client-server architecture, modern responsive frontend frameworks, and dynamic web solutions.',
        icon: 'Globe',
      },
      {
        title: 'Database Technologies',
        description: 'Practical data storage, transactional processing, NoSQL structures, and application data pipelines.',
        icon: 'HardDrive',
      },
      {
        title: 'UI/UX Design & User Experience',
        description: 'Design thinking, human-computer interaction, prototyping, responsive grids, and usability principles.',
        icon: 'Palette',
      },
      {
        title: 'Software Tools & Frameworks',
        description: 'Contemporary development toolchains, API integrations, build tools, package managers, and testing.',
        icon: 'Wrench',
      },
      {
        title: 'Practical Enterprise Computing',
        description: 'Business process automation, e-commerce architectures, security essentials, and client deliverables.',
        icon: 'Briefcase',
      },
    ],
    curriculumHighlights: [
      'Modern Web Technologies (HTML5, CSS3, JavaScript)',
      'Object Oriented Programming and Java Applications',
      'Full-Stack Frameworks & Modern React Architecture',
      'Relational and Cloud Databases',
      'Mobile Application Design and Prototyping',
      'Software Testing and Quality Assurance',
      'E-Commerce & Digital Enterprise Applications',
      'Cybersecurity & Web Information Defense',
    ],
    labFacilities: [
      'Interactive Web & Cloud Computing Studio',
      'Mobile App Development Simulation Lab',
      'Full-Stack Software Development Workshop',
      'UI/UX Prototyping & Interface Design Lab',
    ],
    careerAvenues: [
      'Full-Stack Web Developer',
      'Frontend / React Specialist',
      'Mobile Application Developer',
      'UI/UX Engineer / Product Designer',
      'Software Solutions Consultant',
      'Database Administrator',
    ],
  },
};

export const C2_TECH_TIMELINE = [
  {
    phase: 'Phase 01',
    title: 'Digital Campus Genesis',
    date: 'Foundations',
    description: 'Madha Arts and Science College, Kundrathur, Chennai conceptualizes C² Tech to provide an interconnected virtual launchpad for students in Computer Science and Computer Applications.',
  },
  {
    phase: 'Phase 02',
    title: 'Curriculum & Lab Convergence',
    date: 'Core Mastery',
    description: 'Integration of hands-on coding labs, competitive algorithms, web development workstations, and continuous skill challenges.',
  },
  {
    phase: 'Phase 03',
    title: 'Futuristic Tech Ecosystem',
    date: 'Present & Beyond',
    description: 'Empowering students to think beyond raw syntax and develop forward-looking software solutions with AI, cloud, and modern cyber architectures.',
  },
];
