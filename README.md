# instawrap
Instantiates all classes in the structure and wraps each function. 

The reason I created this was so that I could walk the entire tree of express controller classes, instantiate each
of them, and then wrap each of their methods in a special response handler.

If you don't know why you'd want to do that, you probably don't need this. 

Take a look at the test to get a good idea of it's purpose.

## Install
```bash
npm i -S instawrap
```
