"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "My Profile", path: "/profile" },
  ];

  const supportLinks = [
    { name: "Contact Us", path: "#" },
    { name: "Terms & Conditions", path: "#" },
    { name: "Privacy Policy", path: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "fb", bg: "bg-[#1877F2]", path: "#" },
    { name: "Twitter", icon: "tw", bg: "bg-[#1DA1F2]", path: "#" },
    { name: "LinkedIn", icon: "in", bg: "bg-[#0077B5]", path: "#" },
    { name: "Instagram", icon: "ig", bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", path: "#" },
  ];

  
  const renderSocialIcon = (icon) => {
    switch(icon) {
      case 'fb': return <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M9 8H7v4h2v9h4v-9h3.6l.4-4H13V6.6c0-1 .3-1.6 1.7-1.6H16V1h-3.4c-3.4 0-4.6 2-4.6 4.4V8z"/></svg>;
      case 'tw': return <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 4.6a10 10 0 01-2.9.8 5 5 0 002.2-2.8c-1 .6-2 1-3.1 1.2a5 5 0 00-8.4 4.5A14 14 0 011.6 3a5 5 0 001.5 6.7 5 5 0 01-2.2-.6v.1a5 5 0 004 4.9 5 5 0 01-2.2.1 5 5 0 004.7 3.5A10 10 0 010 19.7a14 14 0 007.6 2.2c9.1 0 14.1-7.6 14.1-14.1v-.6A10 10 0 0024 4.6z"/></svg>;
      case 'in': return <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0zM7.1 20.4H3.6V9h3.6v11.4zM5.3 7.6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm15.1 12.8h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.7 0 4.3 2.4 4.3 5.5v6.2z"/></svg>;
      case 'ig': return <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.0 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.0 1.2-.2 1.8-.4 2.2a4 4 0 01-1 1.4c-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.0-1.8-.2-2.2-.4a4 4 0 01-1.4-1c-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.0-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1m0-2.2C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6a6 6 0 00-2.2 1.4A6 6 0 00.6 4.1C.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 3 a6 6 0 001.4 2.2 6 6 0 002.2 1.4c.8.3 1.7.5 3 .6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 3-.6a6 6 0 002.2-1.4 6 6 0 001.4-2.2c.3-.8.5-1.7.6-3 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-3a6 6 0 00-1.4-2.2 6 6 0 00-2.2-1.4c-.8-.3-1.7-.5-3-.6C15.7.1 15.3 0 12 0zm0 5.8A6.2 6.2 0 1018.2 12 6.2 6.2 0 0012 5.8zm0 10.2A4 4 0 1116 12a4 4 0 01-4 4z"/></svg>;
      default: return null;
    }
  };

  return (
    
    <footer className="bg-[#00402b] text-white pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/asset/logofooter.png" alt="SkillSphere Logo" className="w-10 h-10 rounded-md" />
              <span className="text-2xl font-bold tracking-tight">SkillSphere</span>
            </Link>
            <p className="text-[15px] text-white/80 leading-relaxed font-medium">
              Your gateway to world-class education. Learn. Grow. Succeed.
            </p>
          </div>

          
          <div>
            <h4 className="text-[17px] font-bold mb-5 tracking-tight">Quick Links</h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-[15px] text-white/80 hover:text-white hover:underline transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="text-[17px] font-bold mb-5 tracking-tight">Support</h4>
            <ul className="space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-[15px] text-white/80 hover:text-white hover:underline transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="text-[17px] font-bold mb-6 tracking-tight">Follow Us</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.path} 
                  aria-label={`Follow us on ${social.name}`}
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${social.bg} transition-transform hover:scale-110 shadow-lg`}
                >
                  {renderSocialIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>

        </div>

        
        <div className="pt-8 text-center">
          <p className="text-sm text-white/60 font-medium">
            &copy; {currentYear} SkillSphere Inc. All rights reserved. Built with passion for future leaders.
          </p>
        </div>

      </div>
    </footer>
  );
}