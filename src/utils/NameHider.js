const NameHider = (name) => {
  const parts = name.trim().split(' ');
  const style = Math.random() < 0.5 ? 1 : 2;

  return parts
    .map((part, index) => {
      if (part.length === 0) return part;
      if (style === 1) {
        if (index === parts.length - 1 && parts.length > 1) return part;
        return part[0] + '*'.repeat(part.length - 1);
      }
      if (part.length <= 2) return part[0] + '*'.repeat(part.length - 1);
      return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
    })
    .join(' ');
};

module.exports = NameHider;
