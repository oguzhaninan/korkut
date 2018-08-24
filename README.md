# Korkut
> Quick and simple image processing at the command line.

[![npm](https://img.shields.io/npm/v/korkut.svg)](https://www.npmjs.com/package/korkut)
[![npm](https://img.shields.io/npm/l/korkut.svg)](https://github.com/oguzhaninan/korkut/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/oguzhaninan/korkut.svg?branch=master)](https://travis-ci.org/oguzhaninan/korkut)

## Getting started
First download and install [ImageMagick](http://www.imagemagick.org/).

### Mac OS X
ImageMagick supports the [WebP](https://developers.google.com/speed/webp/) format. However, you must compile ImageMagick with the WebP option. To do so on OS X, install ImageMagick with the following command using Homebrew:

    brew install imagemagick --with-webp
If you have already installed ImageMagick, you would have to uninstall it then reinstall it.

### Ubuntu
    sudo apt-get install imagemagick -y
    sudo apt-get install webp -y # for webp support

## Installation
You need to install [Node.js](https://nodejs.org/en/download/) first, then install the tool globally using this command:

```bash
sudo npm install -g korkut
```

## Features
* Optimize
* [Convert](#convert)
* [Crop](#crop)
* [Resize](#resize)
* [Rotate](#rotate)
* [Watermark](#watermark)
* [Flip](#flip)


## Convert
<p align="center"><img src="https://raw.githubusercontent.com/oguzhaninan/korkut/master/screenshots/convert.gif?raw=true"/></p>

## Crop
<p align="center"><img src="https://raw.githubusercontent.com/oguzhaninan/korkut/master/screenshots/crop.gif?raw=true"/></p>

## Resize
<p align="center"><img src="https://raw.githubusercontent.com/oguzhaninan/korkut/master/screenshots/resize.gif?raw=true"/></p>

## Rotate
<p align="center"><img src="https://raw.githubusercontent.com/oguzhaninan/korkut/master/screenshots/rotate.gif?raw=true"/></p>

## Watermark
<p align="center"><img src="https://raw.githubusercontent.com/oguzhaninan/korkut/master/screenshots/watermark.gif?raw=true"/></p>

## Flip
<p align="center"><img src="https://raw.githubusercontent.com/oguzhaninan/korkut/master/screenshots/flip.gif?raw=true"/></p>

# License
This project is under the MIT license.