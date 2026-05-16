"use client";

import { useState } from "react";
import { Facebook, Twitter, MessageCircle, Mail, Link as LinkIcon, Check } from "lucide-react";

type Props = {
  url: string;
  title: string;
  description?: string;
};

export default function ShareButtons({ url, title, description }: Props) {
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith("http") ? url : `https://windykatorstop.pl${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description ?? title);

  const shares = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] hover:bg-[#1665D8]",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-[#25D366] hover:bg-[#1ebe5a]",
    },
    {
      label: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-stone-900 hover:bg-stone-800",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      color: "bg-stone-600 hover:bg-stone-700",
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="border-t border-b border-stone-100 py-5 my-8">
      <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">
        Podziel się z kimś, komu to pomoże:
      </p>
      <div className="flex flex-wrap gap-2">
        {shares.map(({ label, icon: Icon, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all active:scale-95 ${color}`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
        <button
          onClick={copyLink}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
            copied
              ? "bg-teal-100 text-teal-800"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? "Skopiowano!" : "Kopiuj link"}</span>
        </button>
      </div>
    </div>
  );
}
