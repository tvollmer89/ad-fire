(function ( global, factory ) {
    if ( typeof module === "object" && typeof module.exports === "object" ) {

        module.exports = global.document ? factory( global, true ) : function ( w ) {
            if ( !w.document ) {
                throw new Error( "Fancy requires a window with a document" );
            }
            return factory( w );
        };
    } else {
        factory( global );
    }
    // Pass this if window is not defined yet
}( typeof window !== "undefined" ? window : this, function ( window, noGlobal ) {
    var root = (function () {
        var e = document.getElementsByTagName( "script" ), n = e[ e.length - 1 ], r = n.src.replace( location.origin, "" ).split( "/" ), t = location.pathname.split( "/" ), i = !1, o = 0;
        for ( var a in r ) {
            i || (r[ a ] == t[ a ] ? o++ : i = !0);
        }
        return location.origin + t.slice( 0, o ).join( "/" );
    })();

    var scripts = document.getElementsByTagName( "script" );
    var url     = scripts[ scripts.length - 1 ].src.split( "?" );

    if ( typeof jQuery != "function" ) {
        document.write( '<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>' );
        scripts                                          = document.getElementsByTagName( "script" );
        scripts[ scripts.length - 1 ].onload             = function () {
            Fancy.version( Fancy.api );
        };
        scripts[ scripts.length - 1 ].onreadystatechange = function () {
            Fancy.version( Fancy.api );
        };
    } else {
        jQuery( function () {
            Fancy.version( Fancy.api );
        } );
    }
    if ( typeof window.Fancy === "function" ) {
        console.error( "Error: tried to load Fancy more than once" );
        return;
    }
    var class2type = {},
        toString   = class2type.toString;
    "Boolean Number String Function Array Date RegExp Object Error".split( " " ).forEach( function ( name ) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    } );
    /**
     * returns real type of object
     * @param obj
     * @returns {*}
     */
    function getType( obj ) {
        if ( obj === null ) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ? class2type[ toString.call( obj ) ] || "object" : typeof obj;
    }

    /**
     * will copy the object
     * @param obj
     * @param depth
     * @returns {*}
     */
    function copyObject( obj, depth ) {
        depth = depth || 0;
        if ( depth < 10 /* max depth */ ) {
            if ( getType( obj ) === "object" ) {
                var deepCopy = {};
                var props    = Object.getOwnPropertyNames( obj );
                props.forEach( function ( it ) {
                    if ( getType( obj[ it ] ) === "object" ) {
                        deepCopy[ it ] = copyObject( obj[ it ], depth + 1 );
                    } else if ( getType( obj[ it ] ) === "array" ) {
                        deepCopy[ it ] = [];
                        obj[ it ].forEach( function ( x ) {
                            deepCopy[ it ].push( copyObject( x, depth + 1 ) );
                        } );
                    } else {
                        Object.defineProperty( deepCopy, it, Object.getOwnPropertyDescriptor( obj, it ) );
                    }
                } );
                return deepCopy;
            }
        }
        return Fancy.copy( obj );
    }

    var n = navigator.userAgent.toLowerCase();

    function Fancy( element ) {
        if ( this == window ) {
            return new Fancy( element );
        }
        this.element = jQuery( element );
        this.name    = "Fancy";
    }

    /**
     * install plugin
     * @param name
     * @param version
     */
    Fancy.install = function ( name, version ) {
        var onReady = function () {},
            script  = document.createElement( "script" );
        name        = name.toLowerCase();
        if ( Fancy[ name ] ) {
            return function ( onReady ) {
                if ( typeof onReady === "function" ) {
                    onReady();
                    return true;
                }
            };
        }
        script.src = "//cdn.rawgit.com/Mephiztopheles/Fancy." + name + "/" + (version || "master") + "/fancy" + name + ".min.js";
        if ( document.readyState === "complete" ) {
            jQuery.ajax( {
                url    : script.src,
                success: onReady,
                error  : function () {
                    console.error( "could not load plugin" );
                }
            } );
        } else {
            document.write( script.outerHTML );
            setTimeout( function () {
                onReady();
            }, 1 );
        }
        return function ( callback ) {
            if ( typeof onReady === "function" ) {
                if ( document.readyState === "complete" ) {
                    onReady = callback;
                } else {
                    $( callback );
                }
                return true;
            }
        }
    };
    /**
     * search in array for one
     * @param array
     * @param obj
     * @param returnIndex
     * @returns {*}
     */
    Fancy.findByAnd = function ( array, obj, returnIndex ) {
        function findByAnd() {
            var resolved = true,
                i        = 0;
            while ( i < this.length ) {
                resolved = true;
                for ( var a in obj ) {
                    if ( obj.hasOwnProperty( a ) ) {
                        if ( (a.toLowerCase().indexOf( "date" ) >= 0 ? new Date( Fancy.getKey( this[ i ], a ) ).getTime() : Fancy.getKey( this[ i ], a )) != (a.toLowerCase().indexOf( "date" ) >= 0 ? new Date( obj[ a ] ).getTime() : obj[ a ]) ) {
                            resolved = false;
                            break;
                        }
                    }
                }
                if ( resolved == true ) {
                    resolved = i;
                    break;
                }
                i++;
            }
            resolved   = (resolved === true || resolved === false) ? null : resolved;
            var result = resolved === null ? null : this[ resolved ];
            return returnIndex ? { index: resolved, result: result } : result;
        }

        return findByAnd.apply( array );
    };
    /**
     * search in array for all
     * @param arr
     * @param obj
     * @returns {*}
     */
    Fancy.findAllBy = function ( arr, obj ) {
        function findAllBy() {
            var list     = [],
                resolved = true;
            this.forEach( function ( it ) {
                resolved = true;
                for ( var a in obj ) {
                    if ( obj.hasOwnProperty( a ) ) {
                        if ( (a.toLowerCase().indexOf( "date" ) >= 0 ? new Date( Fancy.getKey( this, a ) ).getTime() : Fancy.getKey( this, a )) != (a.toLowerCase().indexOf( "date" ) >= 0 ? new Date( obj[ a ] ).getTime() : obj[ a ]) ) {
                            resolved = false;
                        }
                    }
                }
                if ( resolved == true ) {
                    list.push( it );
                }
            } );
            return list;
        }

        return findAllBy.apply( arr );
    };
    /**
     * check if string is valid JSON
     * @param {String} text
     * @returns {*|boolean}
     * @constructor
     */
    Fancy.JSONvalid = function JSONvalid( text ) {
        return text && /^[\],:{}\s]*$/.test( text.replace( /\\["\\\/bfnrtu]/g, '@' ).replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']' ).replace( /(?:^|:|,)(?:\s*\[)+/g, '' ) )
    };
    /**
     * shorthand to Fancy.getType( obj ) === "object"
     * @param obj
     * @returns {boolean}
     */
    Fancy.isObject = function isObject( obj ) {
        return {}.toString.apply( obj ) === '[object Object]';
    };
    /**
     * shorthand to Fancy.getType( obj ) === "array"
     * @param obj
     * @returns {boolean}
     */
    Fancy.isArray = function isArray( obj ) {
        return Object.prototype.toString.call( obj ) === '[object Array]';
    };
    /**
     * check if 2 objects are the same
     * Supports class and id for database-objects
     * @param a
     * @param b
     * @returns {boolean}
     */
    Fancy.is = function is( a, b ) {
        if ( getType( a ) === "array" && getType( b ) === "array" ) {
            if ( a.length != b.length ) {
                return false;
            }
            for ( var i = 0; i < a.length; i++ ) {
                if ( a.hasOwnProperty( i ) ) {
                    if ( getType( a[ i ] ) === "object" ) {
                        if ( a[ i ].id && a[ i ].class ) {
                            if ( !b.findBy( { "class": a[ i ].class, id: a[ i ].id } ) ) {
                                return false;
                            }
                        } else if ( a[ i ].id ) {

                            if ( !b.findBy( { id: a[ i ].id } ) ) {
                                return false;
                            }
                        } else if ( a[ i ].name ) {

                            if ( !b.findBy( { name: a[ i ].name } ) ) {
                                return false;
                            }
                        }
                    } else {
                        if ( b.indexOf( a[ i ] ) < 0 ) {
                            return false;
                        }
                    }
                }
            }
        } else if ( getType( a ) === "object" && getType( b ) === "object" ) {

        } else if ( getType( a ) !== getType( b ) ) {
            return false
        } else {
            return a === b;
        }
    };
    /**
     * Capitalize String
     * @param {String} str
     * @returns {string}
     */
    Fancy.capitalize = function capitalize( str ) {
        return str [ 0 ].toUpperCase() + str.slice( 1 );
    };
    /**
     * Decapitalize String
     * @param {String} str
     * @returns {string}
     */
    Fancy.decapitalize = function decapitalize( str ) {
        return str [ 0 ].toLowerCase() + str.slice( 1 );
    };
    /**
     * get real type of object
     * @type {getType}
     */
    Fancy.getType = getType;
    /**
     * checks and Logs version
     * @param {Function} plugin
     */
    Fancy.version = function ( plugin ) {
        if ( Fancy.versionControl ) {
            if ( Fancy.isChrome ) {
                console.log( "%cThis page is using %c" + plugin.name + "%c\r\nCopyright \u00a9 %cMarkus Ahrweiler\r\n%cVersion: %c" + plugin.version, 'color: #000', 'color: #8E0000', 'color: #000', 'color: #49A54F', 'color: #000', 'color: blue' );
            } else {
                console.log( "This page is using " + plugin.name + "\r\nCopyright\u00a9 Markus Ahrweiler\r\nVersion: " + plugin.version );
            }

            jQuery.ajax( {
                url    : "http://version.mephiztopheles.wtf/",
                data   : {
                    plugin: plugin.name
                },
                type   : "POST",
                global : false,
                success: function ( v ) {
                    if ( v ) {
                        if ( Fancy.compareversion( v, plugin.version ) ) {
                            if ( Fancy.isChrome ) {
                                console.warn( "%cYou are using an older version of %c" + plugin.name + ". %cThe newest version is: " + v, "color: #000", "color: #8E0000", "color: #000" );
                            } else {
                                console.warn( "You are using an older version of " + plugin.name + ". The newest version is: " + v );
                            }
                        }
                    } else {
                        if ( Fancy.isChrome ) {
                            console.warn( "Couldn't retrieve version control information for %c" + plugin.name + "%c!", "color: #8E0000", "color. #000" );
                        } else {
                            console.warn( "Couldn't retrieve version control information for " + plugin.name + "!" );
                        }
                    }

                }

            } );
        }
    };
    /**
     * checks if plugins are installed and throws error if not
     * @param {Object} plugins
     */
    Fancy.require = function ( plugins ) {
        jQuery( function () {
            for ( var i in plugins ) {
                if ( plugins.hasOwnProperty( i ) ) {
                    var vers;
                    if ( i.indexOf( "Fancy." ) == 0 ) {
                        vers = Fancy.getKey( window, i );
                    } else {
                        vers = window [ i ].prototype.version || ( i == "jQuery" ? jQuery.prototype.jquery : false );
                    }
                    if ( typeof window [ i ] == "undefined" || ( vers && plugins [ i ] && Fancy.compareversion( plugins [ i ], vers ) ) ) {
                        throw "Error: " + i + " " + ( plugins [ i ] ? plugins [ i ] + " " : "" ) + "is required" + ( vers ? ", got " + vers : "" );
                    }
                }
            }
        } );
    };
    /**
     * Compares version of plugins
     * supported 3-part-version only : 0.0.1, 1.1.2
     * returns true, if needed is greater than is
     * @param {String} needed
     * @param {String} is
     * @returns {boolean}
     */
    Fancy.compareversion = function ( needed, is ) {
        if ( typeof needed == "string" && typeof is === "string" ) {
            // returns true, if needed is greater than is;
            var c = [ parseInt( needed.split( "." ) [ 0 ] ), parseInt( needed.split( "." ) [ 1 ] ), parseInt( needed.split( "." ) [ 2 ] ) ],
                d = [ parseInt( is.split( "." ) [ 0 ] ), parseInt( is.split( "." ) [ 1 ] ), parseInt( is.split( "." ) [ 2 ] ) ];

            return c [ 0 ] > d [ 0 ] || ( c [ 0 ] == d [ 0 ] && c [ 1 ] > d [ 1 ] ) || ( c [ 1 ] == d [ 1 ] && c [ 2 ] > d [ 2 ] );
        } else if ( needed === false ) {
            return true;
        }
    };
    /**
     * can check if settings matches pattern
     * @param settings
     * @param pattern
     */
    Fancy.check = function ( settings, pattern ) {
        function checkType( instance, object ) {
            if ( getType( window [ instance ] ) === "function" ) {
                return object instanceof window [ instance ] || getType( object ) === instance.toLowerCase();
            }
            return getType( object ) === instance.toLowerCase();
        }

        for ( var i in pattern ) {
            if ( pattern.hasOwnProperty( i ) ) {
                var mismatch, typeArray, loopCount, type;
                if ( pattern [ i ].type ) {
                    mismatch  = true;
                    typeArray = pattern [ i ].type.split( "|" );
                    for ( loopCount = 0; loopCount < typeArray.length; loopCount++ ) {
                        if ( mismatch ) {
                            type = checkType( typeArray [ loopCount ], settings[ i ] );
                            if ( type ) {
                                mismatch = false;
                            }
                        }
                    }
                    if ( mismatch ) {
                        throw "Error: Expected type " + typeArray.join( " or " ) + " but got " + Fancy.capitalize( typeof settings [ i ] ) + " for " + i;
                    }
                }

                if ( pattern [ i ].required ) {
                    mismatch = false;
                    switch ( getType( settings[ i ] ) ) {
                        case "string":
                            if ( !settings [ i ] ) {
                                mismatch = true;
                            }
                            break;
                        case "object":
                            if ( settings [ i ] === null ) {
                                mismatch = true;
                            } else if ( !Object.keys( settings [ i ] ).length ) {
                                mismatch = true;
                            }
                            break;
                        case "undefined":
                            mismatch = true;
                            break;
                    }
                    if ( mismatch ) {
                        throw "Error: " + i + " is required";
                    }
                }

                if ( pattern [ i ].types && settings [ i ] && settings [ i ].length ) {
                    for ( var b = 0; b < settings [ i ].length; b++ ) {
                        typeArray = pattern [ i ].types.split( "|" );
                        mismatch  = false;
                        for ( loopCount = 0; loopCount < typeArray.length; loopCount++ ) {
                            if ( !mismatch ) {
                                type = checkType( typeArray [ loopCount ], settings[ i ][ b ] );
                                if ( settings [ i ] [ b ] === null && typeArray [ loopCount ] != "Null" ) {
                                    type = false;
                                }
                                if ( type ) {
                                    mismatch = true;
                                }
                            }
                        }
                        if ( !mismatch ) {
                            throw "Error: Expected type " + typeArray.join( " or " ) + " but got " + Fancy.capitalize( getType( settings [ i ] [ b ] ) ) + " for " + i + "'s items";
                        }
                    }
                }
            }

        }

    };
    /**
     * will redefine the property with getter and setter to call handler on setter call
     * @param {Object} obj
     * @param {String} prop
     * @param {Function} handler
     */
    Fancy.watch = function ( obj, prop, handler ) {
        var oldval = obj[ prop ], newval = oldval,
            getter                       = function () {
                return newval;
            },
            setter                       = function ( val ) {
                oldval = newval;
                return newval = val === oldval ? val : handler.call( obj, prop, oldval, val );
            };
        if ( Object.defineProperty ) {
            Object.defineProperty( obj, prop, {
                get: getter,
                set: setter
            } );
        } else if ( Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__ ) {
            Object.prototype.__defineGetter__.call( obj, prop, getter );
            Object.prototype.__defineSetter__.call( obj, prop, setter );
        }
        if ( Fancy.isArray( obj[ prop ] ) ) {
            for ( var i = 0; i < obj[ prop ].length; i++ ) {
                Fancy.watch( obj[ prop ], i, handler );
            }
        } else if ( Fancy.isObject( obj[ prop ] ) ) {
            for ( var p in obj[ prop ] ) {
                if ( obj[ prop ].hasOwnProperty( p ) ) {
                    Fancy.watch( obj[ prop ], p, handler );
                }
            }
        }
    };
    /**
     * will delete and reapply the property without getter and setter
     * @param {Object} obj
     * @param {String} prop
     */
    Fancy.unwatch = function ( obj, prop ) {
        var val = obj[ prop ];
        delete obj[ prop ];
        obj[ prop ] = val;
    };
    /**
     * will return closest scrollable parent of element
     * @param el
     * @returns {*}
     */
    Fancy.scrollParent = function ( el ) {
        var position            = el.css( "position" ),
            excludeStaticParent = position === "absolute",
            scrollParent;

        scrollParent = el.parents().filter( function () {
            var parent = jQuery( this );
            if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
                return false;
            }
            return ( /(auto|scroll)/ ).test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) ) && parent [ 0 ].scrollHeight - parent.outerHeight() > 0;
        } ).eq( 0 );
        return position === "fixed" || !scrollParent.length ? jQuery( el [ 0 ].ownerDocument || document ) : scrollParent;
    };
    /**
     * will debug if allowed
     * @returns {boolean}
     */
    Fancy.debug = function () {
        if ( Fancy.debugEnabled ) {
            console.debug.apply( console, arguments );
            return true;
        }
        return false;
    };
    /**
     * will return absolute url
     * @param uri
     * @returns {string}
     */
    Fancy.url = function ( uri ) {
        if ( typeof uri === "string" ) {
            return uri.charAt( 0 ) === "/" ? Fancy.root + uri : Fancy.root + "/" + uri;
        }
    };
    /**
     * check if v is null or undefined
     * @param v
     * @returns {boolean}
     */
    Fancy.undefined = function ( v ) {return v === undefined || v === null;};
    /**
     * check if objects are the same
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    Fancy.equals = function ( object1, object2 ) {
        if ( typeof object1 != typeof object2 ) {
            return false;
        }
        var propName;
        if ( Fancy.getType( object1 ) === "array" || Fancy.getType( object1 ) === "object" ) {
            if ( Object.keys( object1 ).length !== Object.keys( object2 ).length ) {
                return false;
            }
            for ( propName in object1 ) {
                if ( object1.hasOwnProperty( propName ) ) {
                    if ( typeof object1[ propName ] != typeof object2[ propName ] ) {
                        return false;
                    }
                }
            }
            for ( propName in object2 ) {
                if ( object2.hasOwnProperty( propName ) ) {
                    if ( typeof object1[ propName ] != typeof object2[ propName ] ) {
                        return false;
                    }
                    if ( (Fancy.getType( object1[ propName ] ) === "array" && Fancy.getType( object2[ propName ] ) === "array") || (Fancy.getType( object1[ propName ] ) === "object" && Fancy.getType( object2[ propName ] ) === "object") ) {
                        if ( !Fancy.equals( object1[ propName ], object2[ propName ] ) ) {
                            return false;
                        }
                    } else if ( object1[ propName ] != object2[ propName ] ) {
                        return false;
                    }
                }
            }
        } else if ( object1 != object2 ) {
            return false;
        }
        return true;
    };
    /**
     * copies object and returns new instance without references
     * @param object
     * @param copyProperties
     * @returns object
     */
    Fancy.copy = function ( object, copyProperties ) {
        if ( object === undefined ) {
            return undefined;
        } else if ( object === null ) {
            return null;
        } else if ( copyProperties ) {

            if ( getType( object ) === "object" ) {
                return copyObject( object );
            } else if ( getType( object ) === "array" ) {
                var list = [];
                object.forEach( function ( it, i ) {
                    list[ i ] = copyObject( it );
                } );
                return list;
            } else {
                return JSON.parse( JSON.stringify( object ) );
            }

        } else {
            return JSON.parse( JSON.stringify( object ) );
        }
    };

    Fancy.isOpera        = !!window.opera || navigator.userAgent.indexOf( " OPR/" ) >= 0;
    Fancy.isFirefox      = typeof InstallTrigger !== "undefined";
    Fancy.isSafari       = Object.prototype.toString.call( window.HTMLElement ).indexOf( "Constructor" ) > 0;
    Fancy.isIE           = !!document.documentMode;
    Fancy.isChrome       = !!window.chrome && !Fancy.isOpera && n.indexOf( "edge/" ) === -1 && !Fancy.isIE;
    Fancy.apple          = n.indexOf( "iphone" ) >= 0 || n.indexOf( "ipad" ) >= 0 || n.indexOf( "ipod" ) > 0;
    Fancy.mobile         = n.indexOf( "mobile" ) >= 0 || n.indexOf( "android" ) >= 0 || Fancy.apple;
    Fancy.versionControl = true;
    Fancy.debugEnabled   = false;
    Fancy.settings       = {};
    Fancy.root           = root;


    if ( url.length == 2 ) {
        var props = url[ 1 ].split( "&" );
        props.forEach( function ( part ) {
            var s           = part.split( "=" );
            Fancy[ s[ 0 ] ] = JSON.parse( s[ 1 ] );
        } );
    }

    Fancy.api = Fancy.prototype = {
        version: "1.3.2",
        name   : "Fancy"
    };
    Fancy.api.set           = function ( name, fn, check ) {
        var instance;

        if ( this.element.length ) {
            var data = this.get( name );
            if ( check === false ? false : data && data.length ) {
                for ( var i = 0; i < data.length; i++ ) {
                    if ( typeof data [ i ] == "undefined" ) {
                        instance   = fn( jQuery( this.element [ i ] ) );
                        data [ i ] = instance;
                        jQuery( this.element [ i ] ).data( name, instance );
                    }
                }
            }
            if ( check === false ? true : !data ) {
                instance = fn( this.element );
                this.element.data( name, instance );
                return instance;
            } else {
                return data;
            }
        }
    };
    Fancy.api.get           = function ( margin ) {
        if ( margin.indexOf( 'Fancy' ) != 0 ) {
            if ( typeof this [ margin ] == "function" ) {
                margin = "Fancy" + margin [ 0 ].toUpperCase() + margin.slice( 1, margin.length );
            } else {
                if ( this.isChrome ) {
                    console.error( "\"%c" + margin + "%c\" is not a function of Fancy!", "color: blue", "color: #000" );
                } else {
                    console.error( "\"" + margin + "\" is not a function of Fancy!" );
                }
                return false;
            }
        }
        if ( this.element.length > 1 ) {
            var ret = [];
            this.element.each( function () {
                ret.push( jQuery( this ).data( margin ) );
            } );
            return ret;
        }
        return this.element.data( margin );
    };
    Fancy.api.fullHeight    = function ( margin ) {
        var padding = true, border = true;
        if ( typeof margin === "object" ) {
            padding = margin.padding != false;
            border  = margin.border != false;
        }
        return this.element.height()
            + (padding ? parseInt( this.element.css( "paddingTop" ) ) : 0)
            + (padding ? parseInt( this.element.css( "paddingBottom" ) ) : 0)
            + (border ? parseInt( this.element.css( "borderBottomWidth" ) ) : 0)
            + (border ? parseInt( this.element.css( "borderTopWidth" ) ) : 0)
            + (margin ? parseInt( this.element.css( "marginTop" ) ) + parseInt( this.element.css( "marginBottom" ) ) : 0);
    };
    Fancy.api.fullWidth     = function ( margin ) {
        var padding = true, border = true;
        if ( typeof margin === "object" ) {
            padding = margin.padding != false;
            border  = margin.border != false;
        }
        return this.element.width()
            + (padding ? parseInt( this.element.css( "paddingLeft" ) ) : 0)
            + (padding ? parseInt( this.element.css( "paddingRight" ) ) : 0)
            + (border ? parseInt( this.element.css( "borderLeftWidth" ) ) : 0)
            + (border ? parseInt( this.element.css( "borderRightWidth" ) ) : 0)
            + (margin ? parseInt( this.element.css( "marginLeft" ) ) + parseInt( this.element.css( "marginRight" ) ) : 0);
    };
    Fancy.api.preventSelect = function () {
        this.element.on( "selectstart", false ).attr( "unselectable", "on" ).css( "userSelect", "none" );
        return this.element;
    };
    Fancy.api.allowSelect   = function () {
        this.element.off( "selectstart" ).removeAttr( "unselectable" ).css( "userSelect", "" );
        return this.element;
    };

    Fancy.getKey = function ( o, s ) {
        s     = s.replace( /\[(\w+)\]/g, '.$1' ); // convert indexes to properties
        s     = s.replace( /^\./, '' ); // strip a leading dot
        var a = s.split( '.' );
        for ( var i = 0; i < a.length; i++ ) {
            var k = a[ i ];
            if ( k.indexOf( "(" ) === -1 ) {
                if ( o.hasOwnProperty( k ) ) {
                    o = o[ k ];
                } else {
                    return;
                }
            } else {
                var K = k.split( "(" )[ 0 ];
                if ( o[ K ] !== null && o[ K ] !== null ) {
                    o = o[ K ]();
                } else {
                    return;
                }
            }
        }
        return o;
    };

    if ( typeof noGlobal === typeof undefined ) {
        window.Fancy = Fancy;
    }
    return Fancy;

} ));
