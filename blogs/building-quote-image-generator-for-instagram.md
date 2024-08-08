## Introduction

In this tutorial, we'll walk you through creating a quote image generator for Instagram using Node.js and the Pictify API. This tool will allow you to automatically generate visually appealing quote images, perfect for engaging your Instagram audience and maintaining a consistent aesthetic on your profile.

## Why build a quote image generator?

1. **Engagement**: Quote posts often receive high engagement on Instagram.
2. **Consistency**: Maintain a cohesive visual style across your quote posts.
3. **Time-saving**: Automate the process of creating quote images.
4. **Customization**: Easily adapt quotes to fit your brand's style.

## Prerequisites

Before we begin, ensure you have:

1. Node.js installed on your machine
2. A Pictify API key (sign up at [pictify.io](https://pictify.io))
3. A unsplash API key (sign up at [unsplash.com](https://unsplash.com/documentation))
4. Basic knowledge of JavaScript and Node.js


## Step 1: Project Setup

Create a new directory for your project and initialize it:

```bash
mkdir instagram-quote-generator
cd instagram-quote-generator
npm init -y
```

Install the required packages:

```bash
npm install axios ejs
```

Create a new file `quoteGenerator.js` and add the following boilerplate:

```javascript
const axios = require('axios');
const ejs = require('ejs');
const fs = require('fs');

const apiKey = 'YOUR_PICTIFY_API_KEY';

// We'll add our functions here
```

## Step 2: Create the Image Template

Create a new file `quoteTemplate.ejs` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Image</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1080px;
            height: 1080px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('<%= backgroundImage %>');
            background-size: cover;
            font-family: Arial, sans-serif;
        }
        .quote-container {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 40px;
            border-radius: 10px;
            text-align: center;
            color: white;
        }
        .quote-text {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .quote-author {
            font-size: 24px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="quote-container">
        <div class="quote-text">"<%= quoteText %>"</div>
        <div class="quote-author">- <%= quoteAuthor %></div>
    </div>
</body>
</html>
```

## Step 3: Generate Quote Content

Add a function to fetch a random quote. For this example, we'll use the [Quotable API](https://github.com/lukePeavey/quotable):

```javascript
async function getRandomQuote() {
    try {
        const response = await axios.get('https://api.quotable.io/random?');
        return {
            text: response.data.content,
            author: response.data.author
        };
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}
```

## Step 4: Generate the Quote Image

Add a function to generate the quote image using Pictify API:

```javascript
async function generateQuoteImage(quote) {
    try {
        const imageResponse = await axios.get('https://api.unsplash.com/photos/random?client_id=YOUR_UNSPLASH_API_KEY&query=nature&orientation=landscape');
        const backgroundImage = imageResponse.data.urls.full;
        const html = await ejs.renderFile('quoteTemplate.ejs', {
            quoteText: quote.text,
            quoteAuthor: quote.author,
            backgroundImage
        });

        const response = await axios.post('https://api.pictify.io/v1/image', {
            html,
            width: 1080,
            height: 1080
        }, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });

        return response.data.url;
    } catch (error) {
        console.error('Error generating image:', error);
        return null;
    }
}
```

## Step 5: Put It All Together

Add a main function to run the quote image generator:

```javascript
async function main() {
    const quote = await getRandomQuote();
    if (quote) {
        const imageUrl = await generateQuoteImage(quote);
        if (imageUrl) {
            console.log('Quote image generated:', imageUrl);
            // Here you could add code to save the image or post it to Instagram
        }
    }
}

main();
```

## Running the Generator

To run the quote image generator, execute:

```bash
node quoteGenerator.js
```
Example output:
```
Quote image generated: https://media.pictify.io/u5sw1-1723140865874.png
```
![Example Quote Image](https://media.pictify.io/3pv15-1723142230533.png)

This will output a URL to your generated quote image, which you can then download or use in your Instagram posts.

## Conclusion

You've now created a powerful tool for generating Instagram quote images using Node.js and the Pictify API. This generator can be further customized to fit your brand's style by adjusting the EJS template, using specific fonts, or integrating with your own quote database.

To extend this project, consider:
- Adding more customization options (fonts, colors, layouts)
- Integrating with Instagram's API for direct posting
- Creating a web interface for easy quote generation

Happy quote posting!