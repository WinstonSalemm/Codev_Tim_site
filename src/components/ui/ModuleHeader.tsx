type ModuleHeaderProps = {
  label: string;
  name: string;
  description: string;
  variant?: "default" | "brand";
  className?: string;
};

export function ModuleHeader({
  label,
  name,
  description,
  variant = "default",
  className,
}: ModuleHeaderProps) {
  const classes = [
    "ds-module-header",
    variant === "brand" ? "ds-module-header--brand" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <p className="ds-module-header-label ds-text-label">{label}</p>
      <h1 className="ds-module-header-title">{name}</h1>
      <p className="ds-module-header-description">{description}</p>
    </header>
  );
}
