// // Clean, readable, maintainable
// class HintElementFinder {
//     private readonly selectors = {
//       clickable: ['a[href]', 'button', 'input', 'select', 'textarea'],
//       interactive: ['[onclick]', '[role="button"]', '[tabindex]'],
//       editable: ['[contenteditable]', 'input', 'textarea']
//     };
  
//     findElements(root: Element = document.body): HintElement[] {
//       return this.collectElements(root)
//         .filter(element => this.isClickable(element))
//         .map(element => this.createHintElement(element))
//         .filter(hint => this.isVisible(hint))
//         .sort((a, b) => this.calculatePriority(a) - this.calculatePriority(b));
//     }
  
//     private isClickable(element: Element): boolean {
//       return this.hasValidTag(element) &&
//              this.isVisible(element) &&
//              this.isAccessible(element) &&
//              this.hasValidRect(element);
//     }
  
//     private isVisible(element: Element): boolean {
//       const rect = element.getBoundingClientRect();
//       const style = window.getComputedStyle(element);
      
//       return rect.width > 0 && rect.height > 0 &&
//              style.visibility !== 'hidden' &&
//              style.display !== 'none' &&
//              style.opacity !== '0';
//     }
//   }