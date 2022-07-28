---
desc: About Conditionals And Logic.
_index: 3
---
# Conditionals And Logic

When the *test expression* of an "If/Else" statement, "Switch" statement, or other logical expressions contains references, the statement or logical expression is bound to those references. This lets us have *reactive conditionals and logic*.

## "If/Else" Statements

An "If/Else" statement is bound to references in its "test" expression.

```js
if ( score > 80 && passesSomeOtherTest() ) {
    addBadge( candidate );
    candidate.remark = 'You\'ve got a badge';
} else {
}
```

*Above, the "If/Else" construct is bound to the references `score` and `passesSomeOtherTest` - yes, should that also change. A thread event for any of these gets the construct re-evaluated; first, the "test" expression (`score > 80 && passesSomeOtherTest()`), then, the body of the appropriate branch of the construct.*

Statements in the body of the "consequent" and "alternate" branches form a binding to references of their own, independent of their containing "If" construct. But they only respond to thread events for as long as the "state" of all *conditions in context* allows.

*Above, the `addBadge()` expression is bound to the reference `candidate`, and joins alone in the dependency thread, independent of the "If" construct, but for as long as the condition in context (`score > 80 && passesSomeOtherTest()`) holds true.*

> The "state" of all *conditions in context* are determined via *memoization*, and no re-evaluation ever takes place.

An "Else/If" block is taken for just an "If" statement in the "Else" block of a parent "If" statement...

```js
if ( score > 80 && passesSomeOtherTest() ) {
    addBadge( candidate );
    candidate.remark = 'You\'ve got a badge';
} else if ( someOtherCondition ) {
} else {
}
```

...and is bound to references in its own "test" expression, independent of its parent. But it only responds to thread events for as long as the "state" of all *conditions in context* allows.

*Above, the nested "If" statement is bound to the reference `someOtherCondition`, and joins alone in the dependency thread, independent of the parent "If" construct, but for as long as the parent condition (`score > 80 && passesSomeOtherTest()`) holds false.*

## "Switch" Statements

A "Switch" statement is bound to references in its "test" expressions - the "switch/case" expressions.

```js
switch( score ) {
    case 0:
        candidate.remark = 'You got nothing at all';
        break;
    case maxScore:
        candidate.remark = 'You got the most';
        break;
    default:
        candidate.remark = defaultRemark;
}
```

*Above, the "Switch" construct is bound to the references `score` and `maxScore`. A thread event for any of these gets the construct re-evaluated; first, the "switch/case" expressions (`score === 0` | `score === maxScore` | `score === null`), then, the body of the appropriate branch of the construct.*

Statements in the body of the branches form a binding to references of their own, independent of the "Switch" construct. But they only respond to thread events for as long as the "state" of all *conditions in context* allows.

*Above, the assignment to `candidate.remark` (in the "default" case) is bound to the reference `defaultRemark`, and joins alone in the dependency thread, independent of the "Switch" construct, but for as long as the conditions in context (`score === null`) hold true.*

> The "state" of all *conditions in context* are determined via *memoization*, and no re-evaluation ever takes place.

## Logical And Ternary Expressions

Subscript observes the state of logical (`a && b || c`) and ternary (`a ? b : c`) expressions when running dependency threads.

```js
let a = () => 1;
let b = 2;
let c = 3;
let d, e;
```

A logical expression...

```js
e = a() && b || c;
```

A ternary expression...

```js
d = a() ? b : c;
```

*Above, each of the two expressions is bound to the references `a`, `b` and `c`. A thread event for any of `a` and `b` - or `a` and `c`, as determined by the "logical state" of the expressions<sup>*</sup> - gets the expressions re-evaluated; first, the "test" expression (`a()`), then, the expression on the appropriate side of the construct.*

<sup>*</sup>Since expressions in the "consequent" and "alternate" sides of a conditional or logical expression are mutually exclusive (`b` and `c` above), as determined by the "test" expression (`a()` above), only the thread events for the references in the currently active side (`b` above) are honoured by the expression at any given point in time.
