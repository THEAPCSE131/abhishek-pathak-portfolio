export interface SocialLink {
  label: string;
  icon: 'github' | 'linkedin' | 'email';
  url: string;
}

// Use mailto: for email and https: URLs for public profiles.
const contactUrl = 'mailto:apcse131@gmail.com';
const socialLinks: SocialLink[] = [
  { label: 'GitHub', icon: 'github', url: 'https://github.com/THEAPCSE131' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/abhishek-pathak-737a531b7/' },
  { label: 'Email', icon: 'email', url: contactUrl },
];

// Add your own asset paths and verified URLs here when they are available.
export const portfolioConfig = {
  photoUrl: 'assets/images/profile-image.jpg',
  photoAlt: 'Abhishek Pathak - Software Engineer',
  resumeUrl: 'assets/resume/Abhishek-Pathak-Resume.pdf',
  contactUrl,
  socialLinks,
};

export const navigation = [
  { label: 'Home', id: 'home', enabled: true },
  { label: 'About', id: 'about', enabled: true },
  { label: 'Services', id: 'services', enabled: true },
  { label: 'Projects', id: 'projects', enabled: true },
  { label: 'Experience', id: 'experience', enabled: false },
  { label: 'Contact', id: 'contact', enabled: true },
];
