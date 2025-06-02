/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the table
  const headerRow = ['Columns (columns1)'];

  // Extract relevant sections dynamically
  const navSections = element.querySelector('.section.nav-sections');
  const navTools = element.querySelector('.section.nav-tools');
  const navBrand = element.querySelector('.section.nav-brand');

  // First column content: Extract list items grouped by categories
  const listItems = document.createElement('div');
  const navListGroups = navSections.querySelectorAll(':scope > .default-content-wrapper > ul > li');
  navListGroups.forEach((group) => {
    const groupTitle = document.createElement('p');
    groupTitle.textContent = group.firstChild.textContent.trim();
    listItems.appendChild(groupTitle);

    const nestedList = document.createElement('ul');
    const nestedItems = group.querySelectorAll(':scope > ul > li > a');
    nestedItems.forEach((nestedItem) => {
      const nestedLi = document.createElement('li');
      nestedLi.textContent = nestedItem.textContent.trim();
      nestedList.appendChild(nestedLi);
    });
    listItems.appendChild(nestedList);
  });

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  listItems.appendChild(liveLink);

  // Second column content: Extract search icon dynamically
  const searchIcon = navTools.querySelector('img');

  // Third row content: Extract brand dynamically
  const brandContent = document.createElement('div');
  const brandLink = navBrand.querySelector('a');
  if (brandLink) {
    brandContent.appendChild(brandLink.cloneNode(true));
  }

  const brandExtraContent = document.createElement('p');
  brandExtraContent.textContent = 'Additional branding info';

  // Create table rows
  const rows = [
    headerRow,
    [listItems, searchIcon],
    [brandContent, brandExtraContent]
  ];

  // Create and replace table block
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}