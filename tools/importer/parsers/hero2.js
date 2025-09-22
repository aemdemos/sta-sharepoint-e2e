/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the image (background), heading, and any subheading/cta
  // The structure is: section.hero-container > .hero-wrapper > .hero.block > div > div > [content]
  // We'll extract the first <img> (background), and all headings/paragraphs after

  // Find the deepest content container
  let contentRoot = element;
  // Traverse down until we reach the node with the actual content
  while (contentRoot && contentRoot.children && contentRoot.children.length === 1) {
    contentRoot = contentRoot.children[0];
  }

  // Now contentRoot should have the content: <p><picture>...</picture></p><h1>...</h1><p></p>
  // Find the image (background)
  let backgroundImg = null;
  let title = null;
  let subheading = null;
  let cta = null;

  // Find all direct children (could be p, h1, etc)
  const children = Array.from(contentRoot.children);

  // Find the first <img> (inside <picture>), which is the background image
  for (const child of children) {
    if (child.tagName === 'P' && child.querySelector('img')) {
      backgroundImg = child.querySelector('img');
      break;
    }
  }

  // Find the first heading (h1, h2, h3)
  for (const child of children) {
    if (/H[1-3]/.test(child.tagName)) {
      title = child;
      break;
    }
  }

  // Subheading: look for h2/h3 after the main heading (not present in this example, but future-proof)
  let foundTitle = false;
  for (const child of children) {
    if (child === title) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && /H[2-3]/.test(child.tagName)) {
      subheading = child;
      break;
    }
  }

  // CTA: look for the first <a> after the heading (not present in this example)
  for (const child of children) {
    if (child.querySelector && child.querySelector('a')) {
      cta = child.querySelector('a');
      break;
    }
  }

  // Compose the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [backgroundImg ? backgroundImg : ''];
  // Compose the text cell: title, subheading, cta (if present)
  const textCell = [];
  if (title) textCell.push(title);
  if (subheading) textCell.push(subheading);
  if (cta) textCell.push(cta);
  const textRow = [textCell.length ? textCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  element.replaceWith(table);
}
