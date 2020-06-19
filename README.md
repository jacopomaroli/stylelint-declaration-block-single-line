# stylelint-declaration-block-single-line

Force css rules to be on a single line

```css
div {
/**  ↑
 *   This property */
  width: 100px;
/**            ↑
 *   This property */
  height: 20px;
/**            ↑
 *   This property */
  margin: 0;
/**         ↑
 *   This property */
}
```

We are a legion. We like our CSS clumped together on a single line.

You can judge us but you'll never take away our freedom.

Autofix is supported

## Installation

```
npm install stylelint-declaration-block-single-line --save-dev
```

## Usage

```js
// .stylelintrc
{
  "plugins": [
    "declaration-block-single-line"
  ],
  "rules": {
    "plugin/declaration-block-single-line": true,
  }
}
```

## Options

### `true`

The following patterns are considered violations:

```css
div { width: 100px; height: 20px; margin: 0;
}
```

Newline at the end of the statement.

```css
div { width: 100px;
  height: 20px; margin: 0; }
```

Newline before declaration.

### `false`

The following patterns are considered violations:

```css
div { width: 100px; height: 20px; margin: 0; }
```

Missing newline at the end of the rule.

```css
div { width: 100px;
  height: 20px; margin: 0;
}
```

Missing newline before declaration.
