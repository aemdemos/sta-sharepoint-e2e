/* global WebImporter */
export default function parse(element, { document }) {
  // Drill down to the innermost content container
  let contentRoot = element;
  while (contentRoot.querySelector(':scope > div')) {
    contentRoot = contentRoot.querySelector(':scope > div');
  }
  const children = Array.from(contentRoot.children);

  // Find the first <picture> or <img> (may be inside <p>)
  let imageEl = null;
  for (const child of children) {
    if (child.tagName && child.tagName.toLowerCase() === 'picture') {
      imageEl = child;
      break;
    }
    if (child.tagName && child.tagName.toLowerCase() === 'img') {
      imageEl = child;
      break;
    }
    if (child.tagName && child.tagName.toLowerCase() === 'p') {
      const maybePicture = child.querySelector('picture');
      if (maybePicture) {
        imageEl = maybePicture;
        break;
      }
      const maybeImg = child.querySelector('img');
      if (maybeImg) {
        imageEl = maybeImg;
        break;
      }
    }
  }

  // Find the first heading (h1-h6), possibly inside a <p>
  let headingEl = null;
  for (const child of children) {
    if (/^h[1-6]$/i.test(child.tagName)) {
      headingEl = child;
      break;
    }
    if (child.tagName && child.tagName.toLowerCase() === 'p') {
      const maybeHeading = child.querySelector('h1,h2,h3,h4,h5,h6');
      if (maybeHeading) {
        headingEl = maybeHeading;
        break;
      }
    }
  }

  // --- CRITICAL FIX: If headingEl is null but there is an h1 in the descendants, find it
  if (!headingEl) {
    const deepHeading = contentRoot.querySelector('h1,h2,h3,h4,h5,h6');
    if (deepHeading) headingEl = deepHeading;
  }

  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [headingEl ? headingEl : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
