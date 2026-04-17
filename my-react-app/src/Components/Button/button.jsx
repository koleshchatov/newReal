export default function Button({
  children,
  className,
  onClick,
  disabled,
  ...props
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
