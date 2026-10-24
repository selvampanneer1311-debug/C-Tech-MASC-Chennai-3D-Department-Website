export interface ComparisonDimension {
  dimension: string;
  computerScience: string;
  computerApplications: string;
  csHighlight: string;
  caHighlight: string;
}

export const CS_VS_CA_DIMENSIONS: ComparisonDimension[] = [
  {
    dimension: 'Core Academic Focus',
    computerScience: 'Theoretical foundations of computation, algorithmic complexity, mathematical logic, and system architecture.',
    computerApplications: 'Applied software development, practical business computing, web systems, and end-user interface design.',
    csHighlight: 'Deep math & algorithmic foundations',
    caHighlight: 'Pragmatic software solutions & delivery',
  },
  {
    dimension: 'Main Subjects',
    computerScience: 'Data Structures & Algorithms, Operating Systems, Compiler Design, Automata Theory, Discrete Mathematics, Computer Networks.',
    computerApplications: 'Web Development Technologies, Java/Enterprise Programming, Relational & Cloud DBMS, UI/UX Prototyping, Mobile App Dev.',
    csHighlight: 'System internals & theory',
    caHighlight: 'Modern tech stacks & enterprise tools',
  },
  {
    dimension: 'Programming Concepts',
    computerScience: 'Memory pointers, dynamic programming, recursive structures, Big-O asymptotic analysis, concurrent threads, low-level APIs.',
    computerApplications: 'Event-driven architectures, REST APIs, component-based frontend models, state management, full-stack integration.',
    csHighlight: 'Algorithmic efficiency & memory optimization',
    caHighlight: 'Component architecture & user workflows',
  },
  {
    dimension: 'Application Development',
    computerScience: 'Engine design, compilers, OS modules, distributed computing layers, specialized high-throughput computing services.',
    computerApplications: 'Full-stack web apps, mobile apps, enterprise dashboards, e-commerce storefronts, cloud-native services.',
    csHighlight: 'Core engines & back-end infrastructure',
    caHighlight: 'Shippable consumer & enterprise software',
  },
  {
    dimension: 'Learning Pathways',
    computerScience: 'C/C++ -> Discrete Math -> Data Structures -> Operating Systems -> Algorithms -> High-Performance Systems / Machine Learning.',
    computerApplications: 'HTML/CSS/JS -> OOP with Java -> React / Node -> Database Modeling -> Mobile Apps -> Full-Stack Architecture.',
    csHighlight: 'From hardware-close theory upward',
    caHighlight: 'From user-facing UI downward to backend',
  },
  {
    dimension: 'Example Career Options',
    computerScience: 'Systems Software Architect, Algorithm Engineer, Research Scientist, Cloud Infrastructure Specialist, Cryptography / Security Analyst.',
    computerApplications: 'Full-Stack Web Developer, UI/UX Engineer, Mobile App Developer, Software Solutions Consultant, Database Administrator.',
    csHighlight: 'System-level & deep engineering roles',
    caHighlight: 'Product-focused & commercial software roles',
  },
];

export interface PathwayQuizQuestion {
  id: number;
  question: string;
  optionCS: string;
  optionCA: string;
}

export const PATHWAY_QUIZ: PathwayQuizQuestion[] = [
  {
    id: 1,
    question: 'When starting a new software project, what excites you most?',
    optionCS: 'Understanding how memory, caching, and algorithms work under the hood',
    optionCA: 'Designing sleek user interfaces and building interactive web features',
  },
  {
    id: 2,
    question: 'Which type of problem would you rather spend a Saturday solving?',
    optionCS: 'Optimizing a graph traversal algorithm to run in minimal milliseconds',
    optionCA: 'Connecting a dynamic React dashboard to a cloud database with authentication',
  },
  {
    id: 3,
    question: 'What kind of technologies feel most magnetic to your curiosity?',
    optionCS: 'Operating systems, compilers, distributed systems, and low-level code (C/C++)',
    optionCA: 'Modern JavaScript, UI frameworks, mobile applications, and cloud tools',
  },
  {
    id: 4,
    question: 'What type of career impact aligns best with your dream future?',
    optionCS: 'Building the core engines, infrastructure, or foundational algorithms of tech',
    optionCA: 'Building engaging digital products, business platforms, and mobile apps',
  },
];
