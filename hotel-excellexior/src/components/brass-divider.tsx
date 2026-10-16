export default function BrassDivider({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`${variant === "dark" ? "brass-rule-dark" : "brass-rule"} ${className}`}
    />
  );
}
