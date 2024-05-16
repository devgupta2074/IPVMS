export const docsstyle = ` <style>
.docx-wrapper {  padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } 
.docx-wrapper>section.docx { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }
.docx { color: black; hyphens: auto; text-underline-position: from-font; }
section.docx { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }
section.docx>article { margin-bottom: auto; z-index: 1; }
section.docx>footer { z-index: 1; }
.docx table { border-collapse: collapse; }
.docx table td, .docx table th { vertical-align: top; }
.docx p { margin: 0pt; min-height: 1em; }
.docx span { white-space: pre-wrap; overflow-wrap: break-word; }
.docx a { color: inherit; text-decoration: inherit; }
</style>
<style>.docx {
  --docx-majorHAnsi-font: Calibri Light;
  --docx-minorHAnsi-font: Calibri;
  --docx-dk1-color: #000000;
  --docx-lt1-color: #FFFFFF;
  --docx-dk2-color: #44546A;
  --docx-lt2-color: #E7E6E6;
  --docx-accent1-color: #5B9BD5;
  --docx-accent2-color: #ED7D31;
  --docx-accent3-color: #A5A5A5;
  --docx-accent4-color: #FFC000;
  --docx-accent5-color: #4472C4;
  --docx-accent6-color: #70AD47;
  --docx-hlink-color: #0563C1;
  --docx-folHlink-color: #954F72;
}
</style><style>.docx span {
  font-family: var(--docx-minorHAnsi-font);
  min-height: 11.00pt;
  font-size: 11.00pt;
}
.docx p {
  margin-bottom: 8.00pt;
  line-height: 1.08;
}
.docx p, p.docx_normal {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
.docx p, p.docx_normal span {
  font-family: Calibri;
}
p.docx_heading1 {
  margin-top: 12.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_heading1 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 16.00pt;
  font-size: 16.00pt;
}
p.docx_heading1 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 16.00pt;
  font-size: 16.00pt;
}
p.docx_heading2 {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_heading2 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 13.00pt;
  font-size: 13.00pt;
}
p.docx_heading2 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 13.00pt;
  font-size: 13.00pt;
}
p.docx_heading3 {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_heading3 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #1F4D78;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
p.docx_heading3 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #1F4D78;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
p.docx_heading4 {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_heading4 span {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #2E74B5;
}
p.docx_heading4 span {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #2E74B5;
}
p.docx_heading5 {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_heading5 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
}
p.docx_heading5 span {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
}
p.docx_heading7 {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_heading7 span {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #1F4D78;
}
p.docx_heading7 span {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #1F4D78;
}
.docx table, table.docx_tablenormal td {
  padding-top: 0.00pt;
  padding-left: 5.40pt;
  padding-bottom: 0.00pt;
  padding-right: 5.40pt;
}
span.docx_heading1char {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 16.00pt;
  font-size: 16.00pt;
}
span.docx_heading1char p {
  margin-top: 12.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_heading1char {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 16.00pt;
  font-size: 16.00pt;
}
span.docx_heading2char {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 13.00pt;
  font-size: 13.00pt;
}
span.docx_heading2char p {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_heading2char {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
  min-height: 13.00pt;
  font-size: 13.00pt;
}
span.docx_heading3char {
  font-family: var(--docx-majorHAnsi-font);
  color: #1F4D78;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
span.docx_heading3char p {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_heading3char {
  font-family: var(--docx-majorHAnsi-font);
  color: #1F4D78;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
span.docx_heading4char {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #2E74B5;
}
span.docx_heading4char p {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_heading4char {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #2E74B5;
}
span.docx_heading5char {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
}
span.docx_heading5char p {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_heading5char {
  font-family: var(--docx-majorHAnsi-font);
  color: #2E74B5;
}
p.docx_listparagraph {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_listparagraph span {
  font-family: Calibri;
}
p.docx_freeform {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_freeform span {
  font-family: Lucida Grande;
  color: #000000;
  min-height: 10.00pt;
  font-size: 10.00pt;
}
p.docx_nospacing {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_nospacing span {
}
p.docx_default {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_default span {
  font-family: Calibri;
  color: #000000;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
p.docx_header {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_header span {
  font-family: Calibri;
}
p.docx_header span {
  font-family: Calibri;
}
span.docx_headerchar {
  font-family: Calibri;
}
span.docx_headerchar p {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_headerchar {
  font-family: Calibri;
}
p.docx_bodytext {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_bodytext span {
  font-family: Calibri;
}
p.docx_bodytext span {
  font-family: Calibri;
}
span.docx_bodytextchar {
  font-family: Calibri;
}
span.docx_bodytextchar p {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_bodytextchar {
  font-family: Calibri;
}
p.docx_footer {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_footer span {
  font-family: Calibri;
}
p.docx_footer span {
  font-family: Calibri;
}
span.docx_footerchar {
  font-family: Calibri;
}
span.docx_footerchar p {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_footerchar {
  font-family: Calibri;
}
p.docx_abodytextjust {
  margin-bottom: 12.00pt;
  text-indent: 72.00pt;
  text-align: justify;
  line-height: 1.00;
}
p.docx_abodytextjust span {
  font-family: Times New Roman;
}
p.docx_actrdboldcapheading {
  margin-bottom: 12.00pt;
  text-align: center;
  line-height: 1.00;
}
p.docx_actrdboldcapheading span {
  font-family: Times New Roman Bold;
  font-weight: bold;
  text-transform: uppercase;
}
p.docx_anormaltext {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_anormaltext span {
  font-family: Times New Roman;
}
p.docx_anumberedtext {
  margin-bottom: 12.00pt;
  line-height: 1.00;
}
p.docx_anumberedtext span {
  font-family: Times New Roman;
}
p.docx_anapara {
  margin-bottom: 12.00pt;
  text-indent: 72.00pt;
  text-align: justify;
  line-height: 1.00;
}
p.docx_anapara span {
  font-family: Times New Roman;
}
p.docx_aheading1 {
  margin-top: 0.00pt;
  margin-bottom: 12.00pt;
  text-indent: 0.00pt;
  line-height: 1.00;
}
p.docx_aheading1 span {
  font-family: Times New Roman;
  color: #000000;
  min-height: 11.00pt;
  font-size: 11.00pt;
  text-decoration: underline;
}
p.docx_aheading2 {
  margin-top: 0.00pt;
  margin-bottom: 12.00pt;
  text-indent: 0.00pt;
  text-align: justify;
  line-height: 1.00;
}
p.docx_aheading2 span {
  font-family: Times New Roman;
  color: #000000;
  min-height: 11.00pt;
  font-size: 11.00pt;
}
p.docx_aheading3 {
  margin-top: 0.00pt;
  margin-bottom: 12.00pt;
  text-indent: 0.00pt;
  text-align: justify;
  line-height: 1.00;
}
p.docx_aheading3 span {
  font-family: Times New Roman;
  color: #000000;
  min-height: 11.00pt;
  font-size: 11.00pt;
  text-decoration: underline;
}
p.docx_aheading4 {
  margin-top: 0.00pt;
  margin-bottom: 12.00pt;
  text-indent: 0.00pt;
  line-height: 1.00;
}
p.docx_aheading4 span {
  font-family: Times New Roman;
  font-style: normal;
  color: black;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
p.docx_aheading5 {
  margin-top: 0.00pt;
  margin-bottom: 12.00pt;
  text-indent: 0.00pt;
  margin-left: 0.00pt;
  line-height: 1.00;
}
p.docx_aheading5 span {
  font-family: Times New Roman;
  color: black;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
p.docx_deltaviewtablebody {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_deltaviewtablebody span {
  font-family: Arial;
  min-height: 12.00pt;
  font-size: 12.00pt;
}
span.docx_hyperlink {
  color: #0563C1;
  text-decoration: underline;
}
span.docx_commentreference {
  min-height: 8.00pt;
  font-size: 8.00pt;
}
p.docx_commenttext span {
  min-height: 10.00pt;
  font-size: 10.00pt;
  font-family: Calibri;
}
p.docx_commenttext {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_commenttext span {
  font-family: Calibri;
  min-height: 10.00pt;
  font-size: 10.00pt;
}
span.docx_commenttextchar {
  font-family: Calibri;
  min-height: 10.00pt;
  font-size: 10.00pt;
}
span.docx_commenttextchar {
  min-height: 10.00pt;
  font-size: 10.00pt;
  font-family: Calibri;
}
span.docx_commenttextchar p {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_commentsubject span {
  font-weight: bold;
  min-height: 10.00pt;
  font-size: 10.00pt;
  font-family: Calibri;
}
p.docx_commentsubject {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_commentsubject span {
  font-family: Calibri;
  font-weight: bold;
  min-height: 10.00pt;
  font-size: 10.00pt;
}
span.docx_commentsubjectchar {
  font-family: Calibri;
  font-weight: bold;
  min-height: 10.00pt;
  font-size: 10.00pt;
}
span.docx_commentsubjectchar {
  font-weight: bold;
  min-height: 10.00pt;
  font-size: 10.00pt;
  font-family: Calibri;
}
span.docx_commentsubjectchar p {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_revision {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
p.docx_revision span {
  font-family: Calibri;
}
span.docx_heading7char {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #1F4D78;
}
span.docx_heading7char p {
  margin-top: 2.00pt;
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
span.docx_heading7char {
  font-family: var(--docx-majorHAnsi-font);
  font-style: italic;
  color: #1F4D78;
}
p.docx_bodytext2 {
  margin-bottom: 6.00pt;
  line-height: 2.00;
}
p.docx_bodytext2 span {
  font-family: Calibri;
}
p.docx_bodytext2 span {
  font-family: Calibri;
}
span.docx_bodytext2char {
  font-family: Calibri;
}
span.docx_bodytext2char p {
  margin-bottom: 6.00pt;
  line-height: 2.00;
}
span.docx_bodytext2char {
  font-family: Calibri;
}
p.docx_bodytextkeep {
  margin-bottom: 8.00pt;
  line-height: 1.00;
}
p.docx_bodytextkeep span {
  font-family: Times New Roman;
  min-height: 10.00pt;
  font-size: 10.00pt;
}
table.docx_tablegrid p {
  margin-bottom: 0.00pt;
  line-height: 1.00;
}
table.docx_tablegrid td {
  border-top: 0.50pt solid black;
  border-left: 0.50pt solid black;
  border-bottom: 0.50pt solid black;
  border-right: 0.50pt solid black;
  padding-top: 0.00pt;
  padding-left: 5.40pt;
  padding-bottom: 0.00pt;
  padding-right: 5.40pt;
}
</style>`;
