/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the deepest content container
  // The image and heading are inside nested divs
  // We'll extract them by traversing children

  // Helper to find first img/picture
  function findImageEl(el) {
    // Look for <picture> or <img> inside el
    let pic = el.querySelector('picture');
    if (pic) return pic;
    let img = el.querySelector('img');
    if (img) return img;
    return null;
  }

  // Helper to find heading (h1, h2, etc)
  function findHeadingEl(el) {
    for (let i = 1; i <= 6; i++) {
      let h = el.querySelector('h' + i);
      if (h) return h;
    }
    return null;
  }

  // Get the deepest div with actual content
  let contentDiv = element;
  // Traverse down to the innermost div
  while (
    contentDiv.children.length === 1 &&
    contentDiv.children[0].tagName === 'DIV'
  ) {
    contentDiv = contentDiv.children[0];
  }

  // Now contentDiv contains the actual hero content
  // Find image (picture or img)
  const imageEl = findImageEl(contentDiv);

  // Find heading (h1 preferred)
  const headingEl = findHeadingEl(contentDiv);

  // Find subheading (paragraphs after heading)
  // We'll collect all <p> siblings after heading
  let subheadingEls = [];
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      if (next.tagName === 'P' && next.textContent.trim()) {
        subheadingEls.push(next);
      }
      next = next.nextElementSibling;
    }
  }

  // If no heading, maybe first <p> is subheading
  if (!headingEl) {
    let p = contentDiv.querySelector('p');
    if (p && p.textContent.trim()) {
      subheadingEls.push(p);
    }
  }

  // Find CTA: look for <a> inside contentDiv
  let ctaEl = contentDiv.querySelector('a');

  // Compose rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Compose text row: heading, subheading(s), CTA
  let textRowContent = [];
  if (headingEl) textRowContent.push(headingEl);
  if (subheadingEls.length) textRowContent = textRowContent.concat(subheadingEls);
  if (ctaEl) textRowContent.push(ctaEl);

  // If nothing found, add empty string
  const textRow = [textRowContent.length ? textRowContent : ''];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
