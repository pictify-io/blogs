## Introduction

In this post, we’ll show you how to create a certificate image from HTML. This can be useful if you want to generate certificates for a large number of people, or if you want to automate the process of creating certificates for an online course or event.

## Prerequisites

Before we get started, you’ll need to have the following tools installed on your computer:

- [Node.js](https://nodejs.org/)
- [Pictify API](https://pictify.io/)
- An HTML editor or text editor


## Step 1: Create an HTML template

The first step is to create an HTML template for your certificate. You can use any HTML editor to create the template, or you can write the HTML code directly in a text editor.

Here’s an example of a simple certificate template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Certificate of Completion</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .certificate {
            border: 1px solid #000;
            padding: 20px;
            margin: 20px auto;
            width: 600px;
        }
        .name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .date {
            font-size: 18px;
            margin-bottom: 20px;
        }
        .signature {
            font-size: 18px;
            font-style: italic;
        }
    </style>

</head>
<body>
    <div class="certificate">
        <div class="name">Certificate of Completion</div>
        <div class="date">This certifies that</div>
        <div class="name">[Name]</div>
        <div>has successfully completed the course on</div>
        <div class="date">[Date]</div>
        <div class="signature">Signature</div>
    </div>
</body>
</html>
```

You can customize this template to include your own text, fonts, colors, and styles.

## Step 2: Generate the certificate image

Once you have created your HTML template, you can use the Pictify API to generate the certificate image. Pictify is a powerful API that allows you to convert HTML to images with just a few lines of code.

First, get your API key from the [Pictify website](https://pictify.io/). Then, install the axios package by running the following command in your terminal:

```bash
npm install axios
```

Next, create a new JavaScript file (e.g., `generateCertificate.js`) and add the following code:

```javascript
const axios = require('axios');
const fs = require('fs');

const apiKey = 'YOUR_API_KEY';
const html = fs.readFileSync('certificate.html', 'utf8');

axios.post('https://api.pictify.io/v1/images', {
    html: html,
    apiKey: apiKey
});

```

Replace `YOUR_API_KEY` with your actual API key, and make sure the `certificate.html` file path matches the location of your HTML template.

Finally, run the script by executing the following command in your terminal:

```bash
node generateCertificate.js
```

The script will generate the certificate image and save it to your local machine.

## Conclusion

In this post, we showed you how to create a certificate image from HTML using the Pictify API. This can be a useful tool for automating the process of generating certificates for online courses, events, or other purposes. If you have any questions or run into any issues, feel free to reach out to the Pictify support team for assistance.

Happy coding!

