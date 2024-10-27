# AidLink

Test the phone call by calling (646) 755-9391. Visit the app at https://aidays.vercel.app/.

The app serves two purposes:

1. You're able to create requests within the app. You can register and create a request and add your address.
2. You're able to create requests by calling the phone number and speaking to an AI agent about the resources you're in need of.

# Testing

- Please refer to the .env.example and create a Vercel project, along with a Vercel Postgres instance and Next.js to test this.

# Multidisciplinary

- Our CISE team members were responsible for system design. The tech stack was chosen exclusively for building speed, as the hackathon had a time limit of 48 hours.
- Our Statistics team members were Data Science majors who were responsible for maximizing the performance of AI models through prompt engineering. Alyssa's performance and the performance of our severity detecetion model (Watson AI Granite) improved significantly over the course of the hackathon.
- Our Economics team member developed a report that ensured we were minimizing costs and developing a platform that was feasible for large-scale deployments. The cost of hosting such a service and using IBM Watson products were analyzed in this report. This report will be shared during the Live pitch.
- Our Digital Worlds team member was able to develop UI/UX designs for our application and made use of not just manual design skills but also AI-powered design such as the use of v0.dev

# Diagrams

This is a diagram of how we store information after a user calls Alyssa.
![diagram](docs/diagram.png)

# Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Testing

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
  You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
