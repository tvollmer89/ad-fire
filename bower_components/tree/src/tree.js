(function(){

	// establish the root object
	var root = this;

	// temporary variables to speed up loading the library
	var ArrayProto = Array.prototype;
	var push = ArrayProto.push;
	var slice = ArrayProto.slice;

	/**
	 * This list represents single level list of elements.
	 * Each of elements has a children list (which is one level below).
	 */
	var Tree = function() {
		this.children = {};
	};

	Tree.prototype = [];

	Tree.prototype.constructor = Tree;

	Tree.prototype.push = function() {
		push.apply(this, arguments);
		var args = slice.call(arguments);
		for (var i = 0; i < args.length; i++) {
			this.children[args[i]] = new Tree();
		}
		return this.length;
	};

	Tree.prototype.pop = function() {
		var element = ArrayProto.pop.call(this),
			children = this.children[element];
		delete this.children[element];
		return {
			element: element,
			children: children
		};
	};

	Tree.prototype.shift = function() {
		var element = ArrayProto.shift.call(this),
			children = this.children[element];
		delete this.children[element];
		return {
			element: element,
			children: children
		};
	};

	Tree.prototype.unshift = function() {
		ArrayProto.unshift.apply(this, arguments);
		var args = slice.call(arguments);
		for (var i = 0; i < args.length; i++) {
			this.children[args[i]] = new Tree();
		}
		return this.length;
	};

	/**
	 * This method can be chained, e.g.
	 * tree.childrenOf(el1).childrenOf(el2) etc.
	 */
	Tree.prototype.childrenOf = function(element) {
		return this.children[element];
	};

	Tree.prototype.nodes = function() {
		return slice.call(this);
	};

	Tree.prototype.sort = function(compareFunction) {
		// first, sort myself
		if (this.length > 1) {
			ArrayProto.sort.call(this, compareFunction);
		}
		// then, recursively sort all children subtrees by accessing
		// this.children map where the key is the index of element in this array
		for (var i = 0; i < this.length; i++) {
			this.children[this[i]].sort(compareFunction);
		}
	};

	Tree.prototype.reverse = function() {
		// first, reverse myself
		if (this.length > 1) {
			ArrayProto.reverse.call(this);
		}
		// then, recursively reverse all children subtrees by accessing
		// this.children map where the key is the index of element in this array
		for (var i = 0; i < this.length; i++) {
			this.children[this[i]].reverse();
		}
	};

	/**
	 * Returns flattened list join.
	 * @param separator String
	 * @return String
	 */
	/*
	Tree.prototype.join = function(separator) {
		return ArrayProto.join.call(Tree.prototype.flatten.call(this), separator);
	};
	*/

	/**
	 * Dumps tree into a flat list, preserving all levels ordering.
	 * This function is recursive and takes one argument. From the outside it
	 * should be called without any parameters
	 * @return Array
	 */
	Tree.prototype.flatten = function() {
		var nodeIds = [], nodeId;
		for (var i = 0; i < this.length; i++) {
			nodeId = this[i];
			nodeIds.push(nodeId);
			push.apply(nodeIds, this.childrenOf(nodeId).flatten());
		}
		return nodeIds;
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Tree;
		}
		exports.Tree = Tree;
	} else {
		root.Tree = Tree;
	}
}(this));
