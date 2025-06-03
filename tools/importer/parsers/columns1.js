/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row based on example
  const headerRow = ['Columns (columns1)'];

  // Initialize content rows
  const contentRows = [];

  // Group related elements logically based on structure

  // First row grouping: Paragraph, list, and live link
  const firstRow = [];
  const firstContent = document.createElement('div');
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Columns block';
  firstContent.appendChild(paragraph);

  const list = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
  firstContent.appendChild(list);

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  firstContent.appendChild(liveLink);

  firstRow.push(firstContent);

  const firstImage = document.createElement('img');
  firstImage.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
  firstRow.push(firstImage);

  contentRows.push(firstRow);

  // Second row grouping: Image, preview text, and preview link
  const secondRow = [];
  const secondContent = document.createElement('div');

  const secondImage = document.createElement('img');
  secondImage.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  secondContent.appendChild(secondImage);

  const previewParagraph = document.createElement('p');
  previewParagraph.textContent = 'Or you can just view the preview';
  secondContent.appendChild(previewParagraph);

  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  secondContent.appendChild(previewLink);

  secondRow.push(secondContent);

  contentRows.push(secondRow);

  // Combine header and content rows into table structure
  const tableStructure = [headerRow, ...contentRows];

  // Create block table with extracted content
  const tableBlock = WebImporter.DOMUtils.createTable(tableStructure, document);

  // Replace the original element with the new block table
  element.replaceWith(tableBlock);
}