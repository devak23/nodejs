# Points to remember
- The root of the source folder needs to be configured in the package.json
for testing the code. This is done by setting the scripts tag to point to
the source code root. In this case the script tag is set as follows:
<pre>
  "scripts": {
    "test": "mocha src/**/*Test.js"
  },
</pre>
- Tests are to be run issuing the command: 
<pre>npm run test</pre>
- It's generally a convention to have the test file named appTest.js if
the app file is named app.js (it also has to match the expression specified
in the scripts tag)