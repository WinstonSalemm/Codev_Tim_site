type HeaderWordmarkProps = {
  name: string;
};

export function HeaderWordmark({ name }: HeaderWordmarkProps) {
  return <span className="ds-header-wordmark">{name}</span>;
}
