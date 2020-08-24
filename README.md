# Ovl

Ovl is a strongly opinionated way of developing pwa web apps.
It's main goals are:

- small footprint
- use modern browser features and therefore keep the dependencies low.
- offline mode (state only contains serializable objects)
- provide some guidelines how to define state, namespaces, function names, action names
- is currently tightly coupled to a css system (sap fiori and material design is planned)

## State & Actions

State management is provided by using overmind.
Ovl is using state, actions (and a few effects) from overmind for now.

## Ovl Elements

Ovl Elements are made up of a baseclass which includes logic to track the used state of the element. It's using the custom element v2 spec. and lit-html to produce dom as efficient as possible.

## Components

Components are reusable in Screens. 1 Component can contain n Ovl Element(s). They reference a specific part of state in the props which differentiates them. Of course the state needs to have a specific format. Thats why the typesript type of the state should be included in the Component

## Screens

Screens are a visual unit of multiple components. A Screen can be navigated into and can be refreshed individually.
All the screen state is placed into ovl namespace to make transitions easier.

## Built in Concepts

### Forms

### Tables

### Lookup List Definition

A Lookup List is specified by a data structure:
```js
{
key1: {Col1: "key1", Col2, "Key 1", ...}

}
```

So it can contain just one value (Simple List where the value is as well the key)
It can contain multiple Columns and a display Value (Hence displayColumn Field in the def)


So as you can see the key-value is needed as object property and it should be in the values as well.
This simplifies complex list handling in the end.
As well a Lookup List needs to have a type and ui translation:
```js
{
columnDef:{
Col1: {type: "text", translationKey:"AppMyText"},
Col2: {type: "date", translationKey:"AppMyDate"},
...
}
```
and
```js
displayDef: {
 keyColumn: "Col1",
 displayColumn: "Col2"
}
```


In the columndef use a list-property with the following type:
```ts
export type ListState = {
  serverEndpoint?: string
  showKeyField?: boolean
  acceptEmpty?: boolean
  acceptOnlyListValues?: boolean
  isSelect?: boolean
}
```
If ovl finds the ```list``` property in the def it will use a Function named ```Field_U_Select4_GetList``` to retrieve the following data:
- ```data``` object as explained above
- ```lookupDef``` object as explained above
- ```keyColumn``` the column where the key is saved
- ```displayColumn``` the column to display


This two structures are the base for all ovl-lookuplists.
They cover the usecases:
- simple selectvalue
- select a key and display a description(value) in the table view and edit-views
- when selecting a key a table can be displayed (not only key/value)
- when typing the full table gets filtered and checked and presented below the input
- full select with db-lookup when clicking the search button. it uses the existing text as a filter value)

To enable fast caching the function signature of Field__GetList is:
```export type FieldGetList_Type = { dependendVal: any}```
That means if a selection list is dependent on a value on the current row it should submit that value to the function

## Use ovl from your project

Make sure that inside `index.ts` you replace the ../test/ - folder with your real projects folder
**Don't change import/export statement order inside index.ts**

## Structuring your app

create a git repositiory for the new project like:
myproject
then git clone ovl into it ( i had to clone it into a sep folder first using tortoisegit)
so the structure should be something like
myproject/ovl
(inside ovl the you will find another ovl and the test folder)
then put a .gitignore to
myproject/.gitignore which ignores the ovl folder (its handled separately)
then do a npm install inside the myproject/ovl/ovl - folder
then adjust the myproject/ovl/ovl/src/index.ts to point back to the screens and so on from myproject

# Manual Testing Procedures
## Table Testing
- Add/Edit/Copy/Delete Row on FE
- Add/Edit/Delete Row on BE and use Refresh on FE
## Timeentry
- Select Option Project, select Option Absence, then again Project

