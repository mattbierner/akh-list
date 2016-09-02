List monad transformer for [Akh Javascript Monad library](https://github.com/mattbierner/akh)

## Api
The list transformer `ListT` and the base list type, `List`. This uses Javascript arrays which are both finite and not lazy. For working with lazy, potentially infinite lists of values see [Stream-m][stream-m].

The list transformer is a monad, monoid, functor, and applicative functor.

Importing:

```js
// List monad
require('akh.list').List
require('akh').List
require('akh').type.list

// List monad tranformer
require('akh.list').ListT
require('akh').ListT
require('akh').trans.list
```

#### `List.of(x)`
Create a list consisting of a single element `x`.

```js
const List = require('akh.list').List

List.run(List.of(1)) === [1]

List.run(List.of([1,2,3])) === [[1, 2, 3]]
```

#### `List.zero`
Empty list.

```js
List.run(List.zero) === []
```

#### `a.concat(b)`
Concatenate list `b` onto list `a`. 

```js
List.run(
    List.zero
        .concat(List.of(1))
        .concat(List.of([2, 3]))
        .concat(List.of(4))) === [1, [2, 3], 4]
```

#### `a.chain(f)`
Flatmap list `a` with function `f`. `f` is mapped over `a`, returning a new `List` for each element of `a`. The resulting list is then flattened.

```js
List.run(
    List.of(1)
        .chain(x => List.of([x, x + 1]))
        .chain(x => List.of([x, x * 2]))) === [1, 2, 2, 4]
```

#### `a.map(f)`
Regular mapping of list `a` with function `f`. `f` is maps current values to new values.

```js
List.run(
    List.zero
        .concat(List.of(1))
        .concat(List.of(2))
        .concat(List.of(3))
        .map(x -> x * x)) === [1, 4, 9]
```

#### `f.ap(m)`
Map the functors in list `f` over list `m`.

```js
List.run(
    List.of(x => x * x)
        .ap(List.zero
            .concat(List.of(1))
            .concat(List.of(2))
            .concat(List.of(3)))) === [1, 4, 9]
```


```js
List.run(List
    .of(x => x * x)
    .concat(List.of(x => x + 10))
    .concat(List.of(x => x * x))
        .ap(List.zero
            .concat(List.of(1))
            .concat(List.of(2))
            .concat(List.of(3)))) === [2, 4, 6, 11, 12, 13, 1, 4, 9]
```


## Running

#### `List.run(m)`
Run list computation `m`, getting the resulting list.


#### `ListT.run(m)`
Same as `List.run` but for transformed types.


[stream-m]: https://github.com/mattbierner/stream-m