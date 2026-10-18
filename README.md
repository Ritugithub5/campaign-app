# 📢 Campaign Amplification Platform

A mobile-first, full-stack prototype designed for a community-funded message-amplification product. 

**The Core Concept:** This is **not a donation platform**. Backers pool contributions to fund the *distribution and reach* of a campaign message to audiences beyond the creator's existing network.

---

## 🚀 The 6 Core Journeys Implemented
Based on the hackathon brief, this MVP successfully executes the complete end-to-end workflow:

1. **Discovering Campaigns** — Filterable feed with cover images, categories, and live progress bars.
2. **Understanding Campaigns** — Deep-dive pages featuring the core message, detailed story, and verifiable supporting sources.
3. **Creating Campaigns** — Form to submit a new message, story, cover image, and funding goal. Submitted campaigns are safely placed in a `pending` review state.
4. **Contributing (Amplifying)** — Users can contribute funds toward the distribution cost. The backend uses MongoDB `$inc` to atomically update the campaign's raised amount in real-time.
5. **Tracking Progress** — "My Campaigns" dashboard allows creators to track their funding and approval status.
6. **Campaign Reports** — A dedicated report page featuring the **"Amplification Impact"** visual (comparing the creator's existing network size vs. the amplified reach achieved through backers).

## 🛡️ The Admin Review Pipeline
To ensure platform trust and safety (as requested in the brief), the app features a complete **Admin Review Queue**:
- **Eligibility Checklist:** Admins must verify the campaign is not misleading, has sources, is not a direct donation solicitation, and contains no prohibited content.
- **Reviewer Notes:** Admins can leave context before approving or rejecting.
- **State Machine:** Campaigns transition from `pending` → `approved` (goes live in Discover) or `rejected`.

---

## 💻 Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Architecture:** REST API

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas URI)

### 1. Setup the Backend
```bash
cd server
npm install