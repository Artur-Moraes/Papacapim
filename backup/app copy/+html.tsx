import { ScrollViewStyleReset } from 'expo-router/html';


export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Your app description here" />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />

        <ScrollViewStyleReset />


        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body role="document">{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
  transition: background-color 0.3s; /* Smooth transition */
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}
`;
