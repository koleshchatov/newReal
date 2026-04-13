export default function Icon({ className, src, children }) {
  return (
    <img className={className} src={src}>
      {children}
    </img>
  );
}
