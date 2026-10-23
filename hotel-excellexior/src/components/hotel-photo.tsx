import Image from "next/image";

/**
 * Hotel photograph from /public/photos, cropped to fill whatever box the
 * className defines (aspect ratio, absolute inset, etc.).
 */
export default function HotelPhoto({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-burgundy-deep ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
