import type { Project } from "@/types";

const GITHUB = "https://github.com/senuAmarasinghe";

/**
 * Hand-curated projects. Later this will be complemented by repos fetched
 * automatically from GitHub (tagged with the `portfolio` topic).
 * TODO: replace the generic GitHub profile links with each project's repo URL.
 */
export const projects: Project[] = [
  {
    slug: "smart-clinic",
    title: "Smart Clinic",
    category: "Appointment & Queue Management System",
    period: "Aug — Oct 2025",
    status: "Completed",
    summary:
      "Patients book appointments online and get real-time queue updates, while doctors and staff manage schedules, track patient flow and view analytics.",
    stack: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Tailwind CSS", "Firebase"],
    links: { repo: GITHUB },
    featured: true,
  },
  {
    slug: "zero-hunger",
    title: "SDG Zero Hunger Platform",
    category: "Mobile App — UN SDG 2",
    period: "Aug — Oct 2025",
    status: "Completed",
    summary:
      "A mobile application connecting NGOs, donors, beneficiaries and volunteers as a solution for the Zero Hunger Sustainable Development Goal.",
    stack: ["React Native", "Expo", "Firebase", "Figma", "Jira"],
    links: { repo: GITHUB },
    featured: true,
  },
  {
    slug: "prabath-motors",
    title: "Prabath Motors & Distributors",
    category: "Vehicle Service Station Management System",
    period: "Feb — May 2025",
    status: "Production",
    summary:
      "A web-based system replacing manual processes and an outdated stock management system. I also led integration management for the team.",
    stack: ["React", "TypeScript", "Spring Boot", "Java", "Tailwind CSS", "JWT"],
    links: { repo: GITHUB },
    featured: true,
  },
  {
    slug: "finance-tracker",
    title: "Personal Finance Tracker",
    category: "Android App",
    period: "Apr — May 2025",
    status: "Completed",
    summary:
      "Track income, expenses and savings with budget management, data visualization, backup & restore and notifications.",
    stack: ["Kotlin", "XML", "Android Studio", "Figma"],
    links: { repo: GITHUB },
  },
  {
    slug: "pottery-studio",
    title: "Pottery Studio",
    category: "Android App",
    period: "Feb — Mar 2025",
    status: "Completed",
    summary: "Translated Figma designs into Android XML layouts for a pottery studio's mobile app.",
    stack: ["Kotlin", "XML", "Firebase", "Figma"],
    links: { repo: GITHUB },
  },
  {
    slug: "online-banking",
    title: "Online Banking System",
    category: "Web Application",
    period: "Feb — Mar 2024",
    status: "Academic",
    summary: "A Java web application built on the MVC architecture to learn core Java concepts.",
    stack: ["Java", "MySQL", "Apache Tomcat", "HTML", "CSS"],
    links: {},
  },
  {
    slug: "siyane-group",
    title: "Siyane Group (Pvt) Ltd.",
    category: "Business Website",
    period: "Mar — May 2023",
    status: "Live",
    summary: "A branding website for siyanegrouphouseholdings.lk.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    links: {},
  },
];
