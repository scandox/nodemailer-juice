# Nodemailer Plugin for inlining CSS using Juice

This plugin uses [juice](https://www.npmjs.org/package/juice) to inline CSS styles present in the `html` value of the nodemailer `mail` object.

At present the plugin uses the `juiceResources` method which does fetch remote resources present in the html. 

## Install

Install from npm

    npm install nodemailer-juice --save

## Usage

Load the plugin

```javascript
var inlineCss = require('nodemailer-juice');
```

Attach it as a 'compile' handler for a nodemailer transport object, with options

```javascript
nodemailerTransport.use('compile', inLineCss(options))
```

Where

  * **options** - includes options for [juice](https://www.npmjs.org/package/juice)

## Example

```javascript
var nodemailer = require('nodemailer');
var inLineCss = require('nodemailer-juice');
var transporter = nodemailer.createTransport();
transporter.use('compile', inLineCss());
transporter.sendMail({
    from: 'me@example.com',
    to: 'receiver@example.com',
    html: '<style>div { color:red; }</style><div>Hello world!</div>'
});
```

Will result in an email with the following HTML:

    <div style="color: red;">Hello world!</div>

## License

**MIT**
