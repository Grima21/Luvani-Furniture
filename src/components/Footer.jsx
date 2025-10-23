import { Instagram, Link, Mail, Twitter } from "lucide-react";

const shopLinks = [
  { name: "New Arrivals", href: "#" },
  { name: "Best Sellers", href: "#" },
  { name: "Chair", href: "#" },
  { name: "Storage", href: "#" },
  { name: "Lighting", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Craftsmanship", href: "#" },
  { name: "Sustaninability", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Press", href: "#" },
];
const supportLinks = [
  { name: "Contact Us", href: "#" },
  { name: "Size Guide", href: "#" },
  { name: "Care Instructions", href: "#" },
  { name: "Shipping", href: "#" },
  { name: "Returns", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* Brand / Description */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
              Luvani
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-prose">
              Architected in Belgium, built to last. We create timeless
              furniture pieces in solid oak, steel, and linen for spaces that
              breathe.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Email"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition"
              >
                <Mail size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links: responsive grid that stacks on small and shows three columns on sm+ */}
          <nav className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Shop</h3>
                <ul className="space-y-3">
                  {shopLinks.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {supportLinks.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
