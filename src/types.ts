// Link hint interface
export interface LinkHint {
  element: HTMLAnchorElement;
  hint: string;
  rect: DOMRect;
}

// Extension state
export interface ExtensionState {
  isActive: boolean;
  currentHints: LinkHint[];
  currentHintInput: string;
}
