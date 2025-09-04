/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the image (picture or img) and the main heading
  // The structure is: <div><div><p><picture>...</picture></p><h1>...</h1><p></p></div></div>
  // We'll grab the first <picture> or <img> for the image row, and the rest for the content row

  // Get the first child div (the content wrapper)
  const contentWrapper = element.querySelector(':scope > div > div');
  if (!contentWrapper) return;

  // Find the picture or img for the background image
  let imageEl = null;
  const picture = contentWrapper.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    // fallback: look for img
    const img = contentWrapper.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the main heading (h1, h2, h3, etc.) and any subheading or CTA
  // We'll collect all elements after the image (picture or img)
  let contentEls = [];
  if (imageEl) {
    // Find the parent <p> of the picture (if any)
    let parentP = imageEl.closest('p');
    // Collect all siblings after the image's parent <p>
    let startNode = parentP && parentP.parentElement === contentWrapper ? parentP : imageEl;
    let found = false;
    contentWrapper.childNodes.forEach((node) => {
      if (node === startNode) {
        found = true;
        return;
      }
      if (found && (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()))) {
        contentEls.push(node);
      }
    });
    // If nothing found, fallback to all h1/h2/h3/p after image
    if (contentEls.length === 0) {
      const possible = Array.from(contentWrapper.children).filter(el => el !== parentP && el !== imageEl);
      if (possible.length) contentEls = possible;
    }
  } else {
    // fallback: just grab all children
    contentEls = Array.from(contentWrapper.children);
  }
  // Remove empty <p> at the end if present
  if (contentEls.length && contentEls[contentEls.length-1].tagName === 'P' && !contentEls[contentEls.length-1].textContent.trim()) {
    contentEls.pop();
  }

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentEls.length ? contentEls : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
