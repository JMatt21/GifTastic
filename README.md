# GifTastic

This project displays gifs that are from the Giphy API. It comes with several pre-existing terms you can look up just by clicking one of the buttons below the top-bar. The CSS is almost entirely bootstrap with a tiny bit of my own to only allow a top-right border and a media query for mobile devices. The input text bar uses a form so the user can use the 'ENTER' key to submit it. The website stores 'favorited' gifs by storing data in the LocalStorage. There is formatted data for the favorites array in gifs.js and the raw data that is used to display the favorites page. 

This project is kind of useful if you want to look for gifs and not use the giphy website. It does not remember favorites very well since LocalStorage can be cleared. 

There is one problem with the page as the 'download' button only works when the user 'middle clicks' it. Otherwise, it will take them to the image source.

I currently maintain this website on: https://github.com/JMatt21/GifTastic