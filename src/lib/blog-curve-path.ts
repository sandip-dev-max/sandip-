/** Cream footer cap with curved top edge (blog section sits above). */
export function buildBlogBottomPath(width = 1440, height = 80) {
  const mid = width / 2;
  const sideY = 36;
  const centerY = 4;

  return `M 0 ${sideY} Q ${mid} ${centerY} ${width} ${sideY} L ${width} ${height} L 0 ${height} Z`;
}
