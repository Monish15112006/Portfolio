const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const profile = {
  name: 'Monish',
  role: ['MERN Stack Developer', 'Open Source Contributor', 'Backend Developer'],
  headline: 'Building scalable web applications, APIs, AI-powered platforms, and simulation tools.',
  bio: 'I am a passionate MERN Stack Developer and Open Source Contributor with hands-on experience in building full-stack web applications, scalable REST APIs, authentication systems, AI-powered platforms, cloud-ready solutions, and open-source software.',
  focus: ['Full Stack Development', 'Backend Engineering', 'Open Source Development', 'Cloud Computing', 'System Design', 'Artificial Intelligence'],
  email: 'monish@example.com',
  github: 'https://github.com/monish',
  linkedin: 'https://linkedin.com/in/monish',
};

const projects = [
  {
    id: 1,
    title: 'OpenHW Studio Circuit Simulator',
    description: 'Contributed to a browser-based electronics simulator supporting Arduino and Raspberry Pi Pico simulations.',
    highlights: ['Wire routing improvements', 'Component interaction improvements', 'Open source contribution'],
    tech: ['React.js', 'JavaScript'],
    type: 'Open Source',
    featured: true,
    github: 'https://github.com/openhwstudio',
  },
  {
    id: 2,
    title: 'AI Career Twin',
    description: 'AI-powered platform bridging the gap between education and industry with skill analysis and career recommendations.',
    highlights: ['Skill analysis', 'Learning path generation', 'Career recommendations', 'Internship guidance'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Groq API', 'LLaMA'],
    type: 'AI',
    featured: true,
    github: '#',
  },
  {
    id: 3,
    title: 'OpenRouter Clone',
    description: 'Unified platform for multiple AI providers with a clean developer-first API interface.',
    highlights: ['Multi-provider AI routing', 'Developer API', 'PostgreSQL backend'],
    tech: ['React', 'ElysiaJS', 'PostgreSQL', 'Prisma', 'Neon'],
    type: 'Full Stack',
    featured: true,
    github: '#',
  },
  {
    id: 4,
    title: 'AI Distress Detection System',
    description: 'AI-based surveillance platform for identifying distress situations using computer vision.',
    highlights: ['Real-time detection', 'Alert system via Twilio', 'OpenCV integration'],
    tech: ['Python', 'OpenCV', 'Machine Learning', 'Flask', 'Twilio'],
    type: 'AI',
    featured: false,
    github: '#',
  },
  {
    id: 5,
    title: 'URL Shortener',
    description: 'High-performance URL shortener with Redis caching and analytics.',
    highlights: ['Redis caching', 'Click analytics', 'Custom slugs'],
    tech: ['React', 'Node.js', 'MongoDB', 'Redis'],
    type: 'Full Stack',
    featured: false,
    github: '#',
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with cart, auth, and order management.',
    highlights: ['JWT Auth', 'Product management', 'Order tracking'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    type: 'Full Stack',
    featured: false,
    github: '#',
  },
];

const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap', 'Vite'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'RBAC'],
  Database: ['MongoDB', 'Mongoose', 'PostgreSQL'],
  Programming: ['JavaScript', 'Python', 'C++', 'SQL'],
  'Cloud & DevOps': ['Git', 'GitHub', 'Docker', 'Kubernetes', 'GitHub Actions', 'AWS'],
  Tools: ['Postman', 'VS Code', 'Linux', 'MongoDB Atlas', 'Vercel', 'Render'],
};

const achievements = [
  { id: 1, title: 'ICAT AIR 232', icon: '🏆', year: '2024' },
  { id: 2, title: 'Winner – Cypher Relay Coding Contest', icon: '🏆', year: '2024' },
  { id: 3, title: 'Finalist – Career Academy India 2025', icon: '🏆', year: '2025' },
  { id: 4, title: 'Selected – NXP Women in Tech Program 2025', icon: '🏆', year: '2025' },
  { id: 5, title: 'Finalist – CodeSprint', icon: '🏆', year: '2024' },
  { id: 6, title: '3rd Prize – Freshathon Hackathon', icon: '🏆', year: '2024' },
  { id: 7, title: 'Open Source Contributor – OpenHW Studio', icon: '🌟', year: '2024' },
];

exports.getProfile = (req, res) => res.json({ success: true, data: profile });
exports.getProjects = (req, res) => res.json({ success: true, data: projects });
exports.getSkills = (req, res) => res.json({ success: true, data: skills });
exports.getAchievements = (req, res) => res.json({ success: true, data: achievements });

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    // Try to save to database but don't fail if DB is not configured
    try {
      await Message.create({ name, email, subject, message });
    } catch (dbError) {
      console.warn('Database save failed or not configured, but proceeding to send email.');
    }

    // Send email to monish.rk2024it@sece.ac.in
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'monish.rk2024it@sece.ac.in',
          subject: `New Portfolio Message: ${subject}`,
          text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          replyTo: email,
        };

        await transporter.sendMail(mailOptions);
        return res.status(201).json({ success: true, message: 'Message sent successfully!' });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return res.status(500).json({ success: false, error: 'Failed to send email. Check your email credentials in .env' });
      }
    } else {
      console.warn('Email credentials not set in .env; skipping email notification.');
      return res.status(500).json({ success: false, error: 'Email credentials (EMAIL_USER, EMAIL_PASS) are not set in the server .env file.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
};

