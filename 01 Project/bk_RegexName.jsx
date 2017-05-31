#include '../(bk_include)/common.jsx'


var alphabets = 'abcdefghijklmnopqrstuvwxwz';


run( function() {
   
	var result = showDialog({
        exp: {type: 'string', label: 'Expression', value: '{x}'}
    }, 'bk_RegexName');

    if (result === null) {
        reuturn;
    }

    var items = getSelectedItems();
    
    var idxRegex = /\{([#]+)\}/;
    var nameRegex = /\{x(\-[0-9]+)?\}/;

	if ( result !== null ) {
        
        for ( var i = 0; i < items.length; i++ ) {
            
            var exp = result.exp + '';
            var item = items[ i ];
            
            var nameResult = nameRegex.exec( exp );
            
            if ( nameResult ) {
                
                var match = nameResult[ 0 ];
                var sub = nameResult[ 1 ];
                var replacedName = item.name;
                
                if ( replacedName.indexOf(' ') != -1 ) {
                    replacedName = replacedName.split(' ')[0];
                }
            
                if ( sub ) {
                    
                    var len = replacedName.length + parseInt( sub );
                    replacedName = replacedName.substr( 0, len );
                }
            
            
                exp = exp.replace( match, replacedName );
            
            }
            
            exp = exp.replace( '{a}', alphabets.substr( i, 1 ) );
            exp = exp.replace( '{A}', alphabets.substr( i, 1 ).toUpperCase() );
            
            var idxResult = idxRegex.exec( exp );
            
            if ( idxResult ) {
            
                var match = idxResult[ 0 ];
                var cnt = idxResult[ 1 ].length;
                
                var idxStr = ('00000000000000000000' + i).substr( -cnt );
                
                exp = exp.replace( match, idxStr );
            
            }
            
            item.name = exp;
        
        
        }
       
	}

});