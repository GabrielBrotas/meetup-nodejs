Simple functional programming utility & programming helper tools
----

# False & True checker
Why need this utility?

```ts
import { isFalse } from 'my-easy-fp'

const iamboolean = false;

// this line easily miss in refactoring or changing
if (!iamboolean) {
  console.log('I am execute false-case');
}

// more than better!
if (isFalse(iamboolean)) {
  console.log('I am execute false-case');
}
```

# Empty checker
Why need this utility?

```ts
const iamempty: null | undefined = undefined;

// this line some boring task
if (iamempty === undefined || iamempty === null) {
  console.log('i am empty');
}

// more than better!
if (isEmpty(iamempty)) {
  console.log('i am empty');
}
```

# Sleep
Why need this utility?

```ts
const ms = 1000;

// this line some boring task
await new Promise((resolve) => setTimeout(() => resolve(), ms));

// more than better!
await sleep(ms);
```