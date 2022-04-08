import serialize from 'serialize-javascript'
import * as Helmet from 'react-helmet'
import favicon from './assets/images/bryllyant-logo-fav.png'

export type HtmlOptions = {
  title: string
  body: string
  data: object
}

export default ({ title, body, data }: HtmlOptions): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.12.1/css/all.css"
          integrity="sha384-TxKWSXbsweFt0o2WqfkfJRRNVaPdzXJ/YLqgStggBVRREXkwU7OKz+xXtqOU4u8+"
          crossorigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Source+Sans+Pro:ital,wght@0,300;0,700;1,400&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/main.css" media="screen" />
        <link rel="icon" href="${favicon}">
      </head>
      <body>
        <div id="app">${body}</div>
        <script>
          window.INITIAL_STATE = ${serialize(data)}
        </script>
      </body>
      <script src="/client.js"></script>
      ${process.env.NODE_ENV === 'production' && `<script src="/1.client.js"></script>`}
    </html>
  `
}
