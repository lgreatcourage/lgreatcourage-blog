---
title: Flex 布局学习笔记
date: 2025-06-13
category: 技术
coverUrl: ""
summary: Flex 布局父子属性、常用参数与实战示例整理
tags:
  - 技术
  - CSS
  - Flex
---

> 本文是我个人对 `Flex` 的理解整理，可能和标准描述存在偏差。  
> 如果有不准确的地方，欢迎指正交流。

## 开始之前

Flex 布局分为两部分：
- 父元素属性（容器属性）
- 子元素属性（项目属性）

使用前要先给父元素设置：

```css
display: flex;
```

## 父元素属性

### 1. `flex-direction`（主轴方向）

| 参数 | 含义 |
| --- | --- |
| `row` | 主轴从左到右 |
| `row-reverse` | 主轴从右到左 |
| `column` | 主轴从上到下 |
| `column-reverse` | 主轴从下到上 |

> 示意图占位：`row` / `row-reverse` / `column` / `column-reverse`

### 2. `flex-wrap`（是否换行）

| 参数 | 含义 |
| --- | --- |
| `nowrap` | 不换行（默认） |
| `wrap` | 换行 |

> 示意图占位：`wrap`、`nowrap`

### 3. `justify-content`（主轴对齐方式）

| 参数 | 含义 |
| --- | --- |
| `flex-start` | 起点对齐 |
| `flex-end` | 终点对齐 |
| `center` | 居中对齐 |
| `space-between` | 两端对齐，项目之间间隔相等 |
| `space-around` | 每个项目两侧间隔相等 |

### 4. `align-items`（副轴对齐方式，单行）

| 参数 | 含义 |
| --- | --- |
| `flex-start` | 副轴起点对齐 |
| `flex-end` | 副轴终点对齐 |
| `center` | 副轴居中对齐 |
| `baseline` | 按第一行文字基线对齐 |

### 5. `align-content`（副轴对齐方式，多行）

> 只有在 **多行**（通常配合 `flex-wrap: wrap`）时才明显生效。

| 参数 | 含义 |
| --- | --- |
| `flex-start` | 副轴起点对齐 |
| `flex-end` | 副轴终点对齐 |
| `center` | 副轴居中对齐 |
| `space-between` | 多行两端对齐 |
| `space-around` | 多行之间平均分配剩余空间 |

### 6. `flex-flow`（简写）

把 `flex-direction` 和 `flex-wrap` 合并写：

```css
flex-flow: <主轴方向> <是否换行>;
```

例如：

```css
flex-flow: row wrap;
```

## 子元素属性

### 1. `order`（排列顺序）

- 默认值是 `0`
- 数值越小越靠前

例如：第二个盒子放到最前面

```css
.item-2 {
  order: -1;
}
```

### 2. `flex`（分配剩余空间）

用于设置项目在剩余空间中的占比。

示例 1：前两个盒子固定宽度，第三个占满剩余空间

```css
.item-3 {
  flex: 1;
}
```

示例 2：第一个盒子固定宽度，后两个平分剩余空间

```css
.item-2,
.item-3 {
  flex: 1;
}
```

### 3. `align-self`（单个项目的副轴对齐）

覆盖父元素的 `align-items`，只作用于当前项目。

例如：让第三个盒子靠副轴终点

```css
.item-3 {
  align-self: flex-end;
}
```

## 小结

- 父元素决定整体布局规则：方向、换行、整体对齐
- 子元素决定个体行为：顺序、占比、单独对齐
- 建议结合可视化 demo 多试几组参数，理解会更快
