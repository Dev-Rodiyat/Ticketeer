const getInitials = (fullName) => {
  if (!fullName || typeof fullName !== "string") return "";

  const names = fullName.trim().split(/\s+/);
  const initials = names
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

  return initials;
};

const getRandomOrangeShade = () => {
  const hue = 30; // Orange hue
  const saturation = Math.floor(Math.random() * 20) + 80; // 80% - 100%
  const lightness = Math.floor(Math.random() * 20) + 40; // 40% - 60%
  return { h: hue, s: saturation, l: lightness };
};

const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    Math.round(
      255 *
        (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    )
      .toString(16)
      .padStart(2, "0");

  return `${f(0)}${f(8)}${f(4)}`;
};

const generateInitialsAvatarUrl = (fullName, font = "inter") => {
  const initials = getInitials(fullName) || "U";
  const { h, s, l } = getRandomOrangeShade();
  const bgColor = hslToHex(h, s, l);
  const textColor = "FFFFFF";

  return `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=${font}`;
};

module.exports = {
  getInitials,
  getRandomOrangeShade,
  hslToHex,
  generateInitialsAvatarUrl,
};

