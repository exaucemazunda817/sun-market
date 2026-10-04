// Icônes des maquettes : tracés 24 px, trait 1,75 (cahier §3).
type P = { size?: number; color?: string; width?: number };

export function Icon({ d, size = 24, color = "currentColor", width = 1.75 }: P & { d: string[] }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={width}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

export const ArrowRight = ({ size = 18 }: P) => <Icon size={size} width={2} d={["M5 12h14", "M13 6l6 6-6 6"]} />;
export const WhatsAppIcon = ({ size = 20 }: P) => (
  <Icon size={size} d={["M4 20l1.3-3.8A8 8 0 1 1 8 19z", "M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"]} />
);
export const PhoneIcon = ({ size = 20 }: P) => (
  <Icon size={size} d={["M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"]} />
);
export const WarningIcon = ({ size = 22 }: P) => (
  <Icon size={size} width={2} d={["M12 3l9.5 17h-19z", "M12 10v4", "M12 17.5v.01"]} />
);
export const CheckIcon = ({ size = 18, width = 2.2 }: P) => <Icon size={size} width={width} d={["M5 12.5l4.5 4.5L19 7.5"]} />;
