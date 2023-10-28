### Great article about webpack 5

https://habr.com/ru/articles/701724/

### Typescript cast types
https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
```
function handleClick(event: Event) {
  const { target } = event
  if (target) console.log((target as HTMLButtonElement).value);
}
```