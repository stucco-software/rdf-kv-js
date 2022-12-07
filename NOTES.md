# Notes

Lets try a length-based approach. 

## 1

If length is one, we know what we have

- a string literal

## 2

If length is two, we have a couple of options
- predicate, controller
- inverter, predicate
- merger, predicate
- subject, predicate
 
## 3 

If length is 3, things get more complicated:
- subject, [tuple]
- inverter, [tuple]
- merger, [tuple]
- [tuple], graph

There are the following possible _ending_ terminals;

- ' '' ; denotes a literal
	- the object is a literal
- ' @' ; denotes a language
	- the object is necessary a literal
- ' ^' ; denotes a type
	- the object is a literal
- ' :' ; denotes a node
	- the object is a node, no other controls relevant
- 'uri' ;