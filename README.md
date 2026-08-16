# 📰 NewsDesk — AI-Powered Modern Editorial Publishing Platform

A full-stack, high-performance news publishing platform built with **Next.js**, **Prisma ORM**, **TipTap**, and **Claude AI**. Features an editorial newsroom dashboard, rich WYSIWYG editing, 1-click AI-powered SEO automation, MeiliSearch full-text search, dynamic edge OG image generation, and a modern reader experience.

---

## ✨ Features

### 🏛️ Reader Experience
- **Dynamic Editorial Homepage**: Hero showcase, breaking news ticker, categorized feeds, and trending topics.
- **Rich Article Reader**: Responsive typography, estimated read time, author credits, category tags, and social sharing.
- **Category Feeds**: Dedicated category routes (`/politics`, `/tech`, `/culture`, `/business`, `/science`, `/opinion`).
- **Instant Search**: Fast full-text search powered by MeiliSearch and keyword query filters.
- **Newsletter Subscription**: Standalone newsletter onboarding and reader engagement page.
- **Dynamic OpenGraph Cards**: Automated social preview images generated at the edge via `@vercel/og`.

### ✍️ Editorial Studio & Dashboard
- **WYSIWYG Rich Editor**: Powered by TipTap with formatting toolbar, blockquotes, character/word counters, and media integration.
- **Story Management**: Filter, search, and manage articles across draft, scheduled, published, and archived states.
- **Editorial Analytics**: Real-time stats, view counts, publication metrics, and story breakdown.
- **Direct Asset Upload**: Image uploads to Cloudinary with automatic optimization.

### 🤖 AI-Powered Automation (Claude)
- **One-Click Publishing & Enrichment**: Analyzes article content to generate SEO meta titles, meta descriptions, URL slugs, and category tags.
- **Structured Data Generation**: Automatic `NewsArticle` JSON-LD schema generation for search engine rich snippets.
- **Headline Assistant**: Generates multiple headline variations across different editorial angles (direct, provocative, question-based, numbered).
- **Social Media Summarizer**: AI-generated concise snippets optimized for social sharing.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router, Server Actions & Edge Routes) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + CSS Variables |
| **Editor** | [TipTap](https://tiptap.dev/) (Headless Rich Text Editor) |
| **AI / LLM** | [Anthropic Claude SDK](https://docs.anthropic.com/en/api/getting-started) (`claude-sonnet-4`) |
| **Database & ORM** | PostgreSQL via [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) with Google OAuth & Prisma Adapter |
| **Search Engine** | [MeiliSearch](https://www.meilisearch.com/) |
| **Caching** | [Redis](https://redis.io/) (`ioredis`) |
| **Media Storage** | [Cloudinary](https://cloudinary.com/) |
| **State & Data** | [Zustand](https://github.com/pmndrs/zustand) & [TanStack Query](https://tanstack.com/query) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |

---

## 📁 Project Structure

```
newsdesk/
├── app/
│   ├── (dashboard)/            # Protected editorial dashboard routes
│   │   ├── analytics/          # Traffic and article metrics
│   │   ├── dashboard/          # Editorial workspace & quick actions
│   │   ├── editor/             # TipTap article creation & editing
│   │   ├── settings/           # Publisher & profile configuration
│   │   └── stories/            # Story catalog with state filtering
│   ├── [category]/             # Category-specific feeds (/tech, /business, etc.)
│   ├── api/                    # Backend API routes
│   │   ├── ai/                 # AI enrichment, headline & summary routes
│   │   ├── articles/           # Article CRUD operations
│   │   ├── auth/               # NextAuth authentication endpoints
│   │   ├── og/                 # Dynamic Edge Open Graph image generator
│   │   ├── publish/            # 1-click publishing pipeline
│   │   ├── search/             # MeiliSearch querying endpoint
│   │   ├── sitemap/            # Dynamic XML sitemap generator
│   │   └── upload/             # Cloudinary asset upload
│   ├── article/[slug]/         # Dynamic public article reader
│   ├── newsletter/             # Newsletter subscription page
│   ├── search/                 # Public search interface
│   ├── globals.css             # Design tokens and global styling
│   ├── layout.tsx              # Root HTML shell & metadata
│   ├── page.tsx                # Public editorial homepage
│   └── providers.tsx           # Session, Query, and Theme providers
├── components/
│   ├── dashboard/              # Sidebar, StoryTable, StatsCard, QuickPublishModal
│   ├── editor/                 # ArticleEditor, Toolbar, ImageUploader, PublishPanel
│   ├── public/                 # HeroSection, CategoryFeed, BreakingTicker, ArticleCard
│   └── shared/                 # SEOHead, Toast, Footer, AuthorAvatar, TagBadge
├── hooks/                      # Custom React hooks (debounce, keyboard, etc.)
├── lib/
│   ├── ai/                     # Claude enrichment, prompt engineering & headline generation
│   ├── auth.ts                 # NextAuth configuration & callbacks
│   ├── cloudinary.ts           # Cloudinary SDK client & upload helpers
│   ├── prisma.ts               # Prisma database client singleton
│   ├── redis.ts                # Redis client & cache invalidation helpers
│   └── search.ts               # MeiliSearch client & indexing helpers
├── prisma/
│   └── schema.prisma           # Database schema definitions (User, Article, Enums)
└── types/                      # TypeScript declarations and API interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `18.x` or higher
- **PostgreSQL**: Local instance or hosted database (e.g. Supabase, Neon, Railway)
- **Redis** *(optional)*: For caching API responses
- **MeiliSearch** *(optional)*: For full-text search indexing

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/newsdesk.git
cd newsdesk
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file by copying the example template:

```bash
cp .env.example .env.local
```

Fill in the required configuration options:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/newsdesk?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generate-secret-here"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# AI Service (Anthropic Claude)
ANTHROPIC_API_KEY="sk-ant-..."

# Base URL (for sitemaps and canonical URLs)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Storage (Cloudinary) - Optional for uploads
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Caching (Redis) - Optional
REDIS_URL="redis://localhost:6379"

# Search (MeiliSearch) - Optional
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_KEY="your-meilisearch-master-key"
```

### 3. Setup Database Schema

Push the Prisma schema to your PostgreSQL database:

```bash
npm run db:push
```

*(Optional) Seed or manage data with Prisma Studio:*

```bash
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/articles` | `GET`, `POST` | List published/filtered articles or create a new draft |
| `/api/articles/[id]` | `GET`, `PUT`, `DELETE` | Retrieve, update, or remove an article by ID |
| `/api/publish` | `POST` | Execute one-click publishing with automatic AI enrichment |
| `/api/ai/enrich` | `POST` | Generate SEO metadata, slug, excerpt, tags, and JSON-LD schema |
| `/api/ai/suggest` | `POST` | Generate headline angle suggestions from article draft |
| `/api/ai/summarize` | `POST` | Generate concise social media share snippets |
| `/api/upload` | `POST` | Upload and optimize images via Cloudinary |
| `/api/search` | `GET` | Perform indexed full-text search queries |
| `/api/og` | `GET` | Generate dynamic Edge Open Graph preview banners |
| `/api/sitemap` | `GET` | XML sitemap containing all published articles and categories |

---

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Next.js development server with hot reload |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Runs the production build server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run db:generate` | Generates Prisma client types |
| `npm run db:push` | Syncs Prisma schema directly with the database |
| `npm run db:migrate` | Runs database migrations in development |
| `npm run db:studio` | Launches visual Prisma Studio database manager |

---

## 🔒 License

This project is licensed under the [MIT License](LICENSE).