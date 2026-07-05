type ModuleHeaderProps = {
  label: string;
  name: string;
  description: string;
};

export function ModuleHeader({ label, name, description }: ModuleHeaderProps) {
  return (
    <header className="ds-module-header">
      <p className="ds-module-header-label ds-text-label">{label}</p>
      <h1 className="ds-module-header-title">{name}</h1>
      <p className="ds-module-header-description">{description}</p>
    </header>
  );
}
