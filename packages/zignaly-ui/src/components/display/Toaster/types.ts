export interface ToasterProps {
  variant?: "success" | "error" | "info";
  size?: "large" | "small";
  caption?: string | JSX.Element;
}
