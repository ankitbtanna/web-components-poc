/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import 'reflect-metadata';
import '@ui-components/button';

// Declare the type of the Web Component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ag-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function NxWelcome({ title }: { title: string }) {
  return (
    <>
      <ag-button></ag-button>
    </>
  );
}

export default NxWelcome;
