import "./globals.css";

export const metadata = {
  title: "SkillSphere",
  description: "Upgrade Your Skills Today",
};

export default function RootLayout({ children }) {
  return (
    // This data-theme line is the magic key that turns on your custom colors
    <html lang="en" data-theme="skillspheretheme">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}