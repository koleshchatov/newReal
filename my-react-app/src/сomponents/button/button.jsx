export default function Button({
  title,
  children,
  className,
  onClick,
  disabled,
}) {
  return (
    <button
      title={title}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
