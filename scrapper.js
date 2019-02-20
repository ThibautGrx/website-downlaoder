const scrape = require('website-scraper');
const websiteUrl = 'https://www.centredentairedeslilas.com/';

  scrape({
        urls: [websiteUrl],
        urlFilter: function (url) {
            return url.indexOf(websiteUrl) === 0;
        },
        recursive: true,
        maxDepth: 50,
        filenameGenerator: 'bySiteStructure',
        directory: './centredeslilas',
        prettifyUrls: true,
        sources: [
          { selector: 'style' },
          { selector: '[style]', attr: 'style' },
          { selector: 'img', attr: 'src' },
          { selector: 'img', attr: 'srcset' },
          { selector: 'input', attr: 'src' },
          { selector: 'object', attr: 'data' },
          { selector: 'embed', attr: 'src' },
          { selector: 'param[name="movie"]', attr: 'value' },
          { selector: 'script', attr: 'src' },
          { selector: 'link[rel="stylesheet"]', attr: 'href' },
          { selector: 'link[rel*="icon"]', attr: 'href' },
          { selector: 'svg *[xlink\\:href]', attr: 'xlink:href' },
          { selector: 'svg *[href]', attr: 'href' },
          { selector: 'picture source', attr: 'srcset' },
          { selector: 'meta[property="og\\:image"]', attr: 'content' },
          { selector: 'meta[property="og\\:image\\:url"]', attr: 'content' },
          { selector: 'meta[property="og\\:image\\:secure_url"]', attr: 'content' },
          { selector: 'meta[property="og\\:audio"]', attr: 'content' },
          { selector: 'meta[property="og\\:audio\\:url"]', attr: 'content' },
          { selector: 'meta[property="og\\:audio\\:secure_url"]', attr: 'content' },
          { selector: 'meta[property="og\\:video"]', attr: 'content' },
          { selector: 'meta[property="og\\:video\\:url"]', attr: 'content' },
          { selector: 'meta[property="og\\:video\\:secure_url"]', attr: 'content' },
          { selector: 'video', attr: 'src' },
          { selector: 'video source', attr: 'src' },
          { selector: 'video track', attr: 'src' },
          { selector: 'audio', attr: 'src' },
          { selector: 'audio source', attr: 'src' },
          { selector: 'audio track', attr: 'src' },
          { selector: 'frame', attr: 'src' },
          { selector: 'iframe', attr: 'src' },
          { selector: 'section', attr: 'data-bg-img' },
          { selector: 'div', attr: 'data-bg-img' },
          { selector: 'img', attr: 'data-src' },
        ]
    }).then((data) => {
        console.log("Entire website succesfully downloaded");
        
    }).catch((err) => {
        console.log("An error ocurred", err);
    }).then(() => process());



function process(){
  const shell = require('shelljs')
  shell.exec('cp -R ./centredeslilas/apameoimages.s3.eu-west-3.amazonaws.com ./centredeslilas/www.centredentairedeslilas.com/')
  shell.exec('rm -rf ./centredeslilas/apameoimages.s3.eu-west-3.amazonaws.com')

  const replaceInFiles = require('replace-in-files'); 
  const options = {
    files: './Users/thibautgorioux/Desktop/test-zeit/centredeslilas/www.centredentairedeslilas.com/',
    files: [
      '*.html',
      '**/*.html',
      '**/**/*.html',
    ],
  
    from: RegExp("../apameoimages.s3.eu-west-3.amazonaws.com/", "g"), 
    to: './apameoimages.s3.eu-west-3.amazonaws.com/',
  
    optionsForFiles: { // default
      "ignore": [
        "**/node_modules/**",
        "*.js"
      ]
    },
    saveOldFile: false,
    encoding: 'utf8',  
    onlyFindPathsWithoutReplace: false ,
    returnPaths: true,
    returnCountOfMatchesByPaths: false 
  };

  replaceInFiles(options)
    .then(({ countOfMatchesByPaths }) => {
      console.log('Count of matches by paths:', countOfMatchesByPaths);
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
};

