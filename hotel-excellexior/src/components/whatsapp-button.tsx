"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Bonjour Hôtel Excellexior, je souhaite avoir des informations sur une réservation."
  );
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec l'hôtel sur WhatsApp"
      title="Discuter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 cursor-pointer md:bottom-7 md:right-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </motion.a>
  );
}
