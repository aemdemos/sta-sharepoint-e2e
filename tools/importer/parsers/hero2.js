/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the deepest content wrapper (may vary)
  let contentWrapper = element;
  // Try to find the hero block content
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    contentWrapper = heroBlock;
  }

  // Find the innermost div containing the actual content
  let actualContent = contentWrapper;
  const innerDivs = contentWrapper.querySelectorAll(':scope > div');
  if (innerDivs.length === 1) {
    actualContent = innerDivs[0];
    // Sometimes another nested div
    const innerMostDivs = actualContent.querySelectorAll(':scope > div');
    if (innerMostDivs.length === 1) {
      actualContent = innerMostDivs[0];
    }
  }

  // Find image (background)
  let imageEl = null;
  const pictureP = actualContent.querySelector('p picture');
  if (pictureP) {
    imageEl = pictureP;
  } else {
    const imgEl = actualContent.querySelector('img');
    if (imgEl) {
      imageEl = imgEl;
    }
  }

  // Find heading (title)
  let headingEl = actualContent.querySelector('h1, h2, h3, h4, h5, h6');

  // Find subheading (optional)
  let subheadingEl = null;
  if (headingEl) {
    let nextEl = headingEl.nextElementSibling;
    while (nextEl && !subheadingEl) {
      if (/^h[1-6]$/.test(nextEl.tagName.toLowerCase())) {
        subheadingEl = nextEl;
        break;
      }
      if (nextEl.tagName.toLowerCase() === 'p' && nextEl.textContent.trim()) {
        subheadingEl = nextEl;
        break;
      }
      nextEl = nextEl.nextElementSibling;
    }
  }

  // Find CTA (optional)
  let ctaEl = null;
  const linkEl = actualContent.querySelector('a');
  if (linkEl) {
    ctaEl = linkEl;
  }

  // Compose the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentArr = [];
  if (headingEl) contentArr.push(headingEl);
  if (subheadingEl) contentArr.push(subheadingEl);
  if (ctaEl) contentArr.push(ctaEl);

  if (headingEl && !subheadingEl) {
    let nextEl = headingEl.nextElementSibling;
    while (nextEl) {
      if (nextEl.tagName.toLowerCase() === 'p' && nextEl.textContent.trim()) {
        contentArr.push(nextEl);
        break;
      }
      nextEl = nextEl.nextElementSibling;
    }
  }

  if (contentArr.length === 0) {
    Array.from(actualContent.children).forEach((child) => {
      if (child.textContent.trim()) contentArr.push(child);
    });
  }

  const contentRow = [contentArr.length > 0 ? contentArr : ''];

  // Ensure the table always has 3 rows: header, image, content
  const cells = [headerRow, imageRow, contentRow];
  while (cells.length < 3) {
    cells.push(['']);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
