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
