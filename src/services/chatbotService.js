/**
 * GRANTLY AI — Intelligent Context-Aware Student Assistant Engine
 * Pure frontend rule-based reasoning engine with contextual awareness of:
 * - Student profile (course, GPA, income, state)
 * - Scholarships dataset & deadlines
 * - Document vault readiness
 * - SOP structuring & interview frameworks
 * 
 * Designed by Krupa Rathod for GRANTLY.
 */

import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateScholarshipMatch } from './matchingService';

export const SUGGESTED_QUESTIONS = [
  'Find scholarships for my course',
  'What documents should I prepare?',
  'Help me structure my SOP',
  'Which deadlines are approaching?',
  'Explain merit-based vs need-based aid',
  'How do I prepare for a scholarship interview?'
];

export const processChatMessage = (userMessage, context = {}) => {
  const text = (userMessage || '').toLowerCase().trim();
  const { profile = {}, applications = [], documents = [] } = context;

  // 1. Scholarships for Course / Stream
  if (text.includes('course') || text.includes('engineering') || text.includes('computer science') || text.includes('stem') || text.includes('find scholarship') || text.includes('recommend')) {
    const studentCourse = profile.course || 'Computer Science';
    const matches = SCHOLARSHIPS_DATA.filter(s => {
      const match = calculateScholarshipMatch(profile, s);
      return match.score >= 60;
    }).slice(0, 3);

    const listMarkup = matches.map(m => `• **${m.title}** (${m.formattedAmount}) — *${m.category}*`).join('\n');

    return {
      sender: 'assistant',
      text: `Based on your profile as a **${profile.degree || 'B.Tech'} student in ${studentCourse}** (GPA/Percentage: ${profile.percentage || '84.5'}%), here are your top 3 matching opportunities:\n\n${listMarkup}\n\nAll 3 have upcoming deadlines in November and December.`,
      action: {
        label: 'View All Matches in Discover',
        route: '/discover'
      }
    };
  }

  // 2. Deadlines / Urgent dates
  if (text.includes('deadline') || text.includes('approaching') || text.includes('dates') || text.includes('urgent')) {
    const sorted = [...SCHOLARSHIPS_DATA].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3);
    const deadlineList = sorted.map(s => `• **${s.title}** — Deadline: **${s.deadline}** (${s.formattedAmount})`).join('\n');

    return {
      sender: 'assistant',
      text: `Here are the closest deadlines you need on your radar:\n\n${deadlineList}\n\n💡 **Tip:** Submit at least 72 hours before the closing date to avoid portal traffic delays.`,
      action: {
        label: 'Open Application Tracker',
        route: '/applications'
      }
    };
  }

  // 3. Document Preparation / Checklist
  if (text.includes('document') || text.includes('vault') || text.includes('transcript') || text.includes('certificate')) {
    const readyDocs = documents.filter(d => d.status === 'Ready').length;
    const pendingDocs = documents.filter(d => d.status !== 'Ready');

    let advice = `You currently have **${readyDocs} documents verified as Ready** in your Document Vault.`;
    if (pendingDocs.length > 0) {
      advice += `\n\nPriority items still needing attention:\n` +
        pendingDocs.map(d => `• **${d.name}** (${d.status})`).join('\n');
    }
    advice += `\n\nMake sure your **Income Certificate** is issued by the appropriate revenue authority (SDM/Tehsildar), as older notary affidavits are frequently rejected.`;

    return {
      sender: 'assistant',
      text: advice,
      action: {
        label: 'Go to Document Vault',
        route: '/documents'
      }
    };
  }

  // 4. SOP / Statement of Purpose Writing
  if (text.includes('sop') || text.includes('essay') || text.includes('statement of purpose') || text.includes('write')) {
    return {
      sender: 'assistant',
      text: `Here is the proven **4-part SOP structure** favored by scholarship juries:\n\n1. **The Catalyst (Paragraph 1):** Anchor your passion in a specific real-world problem or personal experience, not clichés.\n2. **Academic & Project Milestones (Paragraph 2):** Connect your coursework and hands-on projects directly to what you learned and achieved.\n3. **Financial Context & Overcoming Hurdles (Paragraph 3):** Explain your circumstances with dignity, showing determination rather than despair.\n4. **Future Vision & Return on Investment (Paragraph 4):** How will receiving this scholarship enable you to give back to your field or community?\n\nWould you like me to generate a personalized outline using your profile?`,
      action: {
        label: 'Launch SOP Starter Generator',
        type: 'sop_generator'
      }
    };
  }

  // 5. Interview Preparation
  if (text.includes('interview') || text.includes('questions') || text.includes('prepare')) {
    return {
      sender: 'assistant',
      text: `Scholarship panels evaluate **authenticity, gratitude, and clarity of purpose**.\n\nKey areas to prepare:\n• **"Tell us about yourself":** 90-second elevator pitch covering who you are, what you are building, and your core aspiration.\n• **"Why this specific scholarship?":** Mention the foundation’s exact mission and how your values align.\n• **"How will you handle adversity?":** Use the **STAR method** (Situation, Task, Action, Result) referencing a real project challenge.\n• **Prepare a smart question:** Always ask the jury about mentorship opportunities or community initiatives.`,
      action: {
        label: 'Watch Interview Masterclass in Learn',
        route: '/learn'
      }
    };
  }

  // 6. Merit vs Need Comparison
  if (text.includes('merit') || text.includes('need') || text.includes('difference') || text.includes('explained')) {
    return {
      sender: 'assistant',
      text: `Here is the simple breakdown of **Merit-Based vs Need-Based Funding**:\n\n• **Merit-Based:** Awarded for academic GPA, rank, sports, hackathons, or scientific publications. Family income is secondary.\n• **Need-Based:** Prioritizes students whose family income falls below a designated threshold (e.g., < ₹3.5 LPA or < ₹6 LPA). A minimum passing grade is still required.\n• **Merit-cum-Need:** The most common hybrid type in India—requires both good academic standing (e.g., > 70%) and income eligibility.`,
      action: {
        label: 'Browse Need-Based & Merit Scholarships',
        route: '/discover'
      }
    };
  }

  // 7. General / Fallback
  return {
    sender: 'assistant',
    text: `Hello! I am **GRANTLY AI**, your student funding assistant created by **Krupa Rathod**.\n\nI can help you:\n• Match scholarships tailored to your ${profile.course || 'course'} studies\n• Check your Document Vault readiness\n• Provide guidance on drafting a winning Statement of Purpose\n• Track upcoming deadlines\n\nWhat would you like to explore today?`,
    action: {
      label: 'Explore Discover Catalog',
      route: '/discover'
    }
  };
};
