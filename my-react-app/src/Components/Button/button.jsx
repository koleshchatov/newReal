export default function Button({
  children,
  className,
  onClick,
  disabled,
  ariaLabel,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
