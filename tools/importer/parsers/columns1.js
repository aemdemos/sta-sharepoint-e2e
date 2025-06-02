/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns1)'];

  // Extract relevant sections
  const navBrand = element.querySelector('.section.nav-brand');
  const navSections = element.querySelector('.section.nav-sections');
  const navTools = element.querySelector('.section.nav-tools');

  const rows = [];

  // First column: Extract content with proper nesting and semantic grouping
  const firstColumnContent = document.createElement('div');
  if (navSections) {
    const sectionList = document.createElement('div');
    const sectionItems = navSections.querySelectorAll(':scope > .default-content-wrapper > ul > li');
    sectionItems.forEach((item) => {
      const sectionTitle = document.createElement('p');
      sectionTitle.textContent = item.firstChild.textContent;
      const nestedList = item.querySelector('ul');
      sectionTitle.appendChild(nestedList ? nestedList.cloneNode(true) : document.createElement('span'));
      sectionList.appendChild(sectionTitle);
    });
    firstColumnContent.appendChild(sectionList);
  }

  // Append 'Live' link to first column content
  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  firstColumnContent.appendChild(liveLink);

  // Second column: Extract tool content and image with proper positioning
  const secondColumnContent = document.createElement('div');
  if (navTools) {
    const img = navTools.querySelector('img');
    if (img) {
      const clonedImg = img.cloneNode(true);
      secondColumnContent.appendChild(clonedImg);
    }
  }

  // Append 'Preview' link to second column content
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  secondColumnContent.appendChild(previewLink);

  // Additional branding content from nav-brand
  const brandContent = document.createElement('div');
  if (navBrand) {
    const brandLink = navBrand.querySelector('a');
    if (brandLink) {
      brandContent.appendChild(brandLink.cloneNode(true));
    }
  }

  // Populate rows with improved semantic grouping
  rows.push([firstColumnContent, secondColumnContent]);
  rows.push([brandContent]);

  // Create table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}