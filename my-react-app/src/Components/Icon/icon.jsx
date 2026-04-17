export default function Icon({ className, src, ...props }) {
  return <img className={className} src={src} {...props} />;
}
