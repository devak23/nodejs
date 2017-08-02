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
- The lessons for nodejs-basics have been taken from the <a> href="https://www.youtube.com/watch?v=tiMLxUKrB-g&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR&index=6">you tube node-js videos</a>
