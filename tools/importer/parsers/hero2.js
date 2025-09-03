/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block
  const heroBlock = element.querySelector('.hero.block') || element;
  // Find the inner content container
  let innerContent = heroBlock;
  const innerDivs = heroBlock.querySelectorAll(':scope > div');
  if (innerDivs.length === 1) {
    innerContent = innerDivs[0];
  }

  // Find the image (background)
  let imageEl = null;
  const picture = innerContent.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    const img = innerContent.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the heading (title), subheading, and CTA (if present)
  let textEls = [];
  // Title: first h1, h2, or h3
  const heading = innerContent.querySelector('h1, h2, h3');
  if (heading) textEls.push(heading);
  // Subheading: next h2, h3, h4 after the heading
  let subheading = null;
  if (heading) {
    let sib = heading.nextElementSibling;
    while (sib) {
      if (/^H[2-4]$/i.test(sib.tagName)) {
        subheading = sib;
        break;
      }
      sib = sib.nextElementSibling;
    }
  }
  if (subheading) textEls.push(subheading);
  // CTA: first link in a paragraph after heading/subheading
  let cta = null;
  let lastTextEl = subheading || heading;
  if (lastTextEl) {
    let sib = lastTextEl.nextElementSibling;
    while (sib) {
      if (sib.tagName === 'P' && sib.querySelector('a')) {
        cta = sib;
        break;
      }
      sib = sib.nextElementSibling;
    }
  }
  if (cta) textEls.push(cta);
  // If no heading/subheading/cta, try to find any non-empty paragraph
  if (!textEls.length) {
    const paragraphs = Array.from(innerContent.querySelectorAll('p')).filter(p => {
      return !p.querySelector('picture') && p.textContent.trim().length > 0;
    });
    textEls.push(...paragraphs);
  }

  // Table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Always create a third row, even if empty
  const textRow = [textEls.length ? textEls : ''];

  // Ensure there are always 3 rows
  const cells = [headerRow, imageRow, textRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
