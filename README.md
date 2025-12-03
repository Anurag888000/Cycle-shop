# 🚴 WAHEED Cycle Shop

A modern, full-featured bicycle shop web application built with Next.js 14, TypeScript, and Tailwind CSS. Features a beautiful UI with dark mode support, admin panel, and responsive design.

## ✨ Features

- 🎨 Modern, responsive UI with dark mode support
- 🔐 Admin authentication and management panel
- 🚲 Bicycle catalog with detailed product pages
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast page loads with Next.js 14 App Router
- 🎭 Smooth animations with Framer Motion
- 🌙 Dark/Light theme toggle
- 📧 Contact form functionality
- 🛡️ TypeScript for type safety
- 🎯 SEO optimized

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting:** [ESLint](https://eslint.org/)

## 📁 Project Structure

```
cycle-shop/
├── app/
│   ├── components/        # Reusable UI components
│   │   └── Header.tsx     # Navigation header with mobile menu
│   ├── admin/            # Admin panel pages
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── bicycles/         # Bicycle catalog pages
│   ├── contact/          # Contact page
│   ├── services/         # Services page
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── public/               # Static assets
├── .env.local           # Environment variables (not in repo)
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/cycle-shop.git
cd cycle-shop
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Features Breakdown

### Header Component

The [`Header`](app/components/Header.tsx) component provides:
- Sticky navigation with scroll effects
- Active link highlighting
- Mobile hamburger menu with smooth animations
- Admin portal access
- Dark mode compatible styling

### Pages

- **Home (`/`)**: Landing page with hero section
- **About (`/about`)**: Company information
- **Services (`/services`)**: Shop services overview
- **Contact (`/contact`)**: Contact form and information
- **Bicycles (`/bicycles`)**: Product catalog
- **Admin (`/admin`)**: Protected admin panel

## 🔒 Admin Panel

Access the admin panel at `/admin/login`. The admin section includes:
- Product management
- Order management
- User management
- Dashboard with analytics

## 🌐 Deployment

The app can also be deployed to:
- Vercel  [Live Demo  ](https://waheedcycles.vercel.app/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Anurag**

- GitHub: [@Anurag888000](https://github.com/Anurag888000)
- Website: [Portfolio](https://anurag0.netlify.app)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

## 📞 Support

For support, email ashish888000@gmail.com or create an issue in this repository.

---

Made with ❤️ by Anurag)
