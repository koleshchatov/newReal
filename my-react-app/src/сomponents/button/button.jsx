export default function Button({
  title,
  children,
  className,
  onClick,
  disabled,
}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
