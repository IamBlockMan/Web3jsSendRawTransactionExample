var common_utils = {
    toID36: function(id){
        alphabet = '0123456789abcdefghijklmnopqrstuvwxuz';
        length = alphabet.length;

        if(id == 0){
            return '0';
        }
        
        q = id;
        r = 0;
        ret = '';
        while(q !== 0){
            r = q % length;
            q = Math.floor(q/length);

            ret = alphabet[r] + ret;
        }

        return ret;
    },

    toID10: function(id){
        alphabet = '0123456789abcdefghijklmnopqrstuvwxuz';
        ret = 0;
        for(i=0; i < id.length; i++){
            ret += Math.pow(alphabet.length, id.length-i-1) * alphabet.indexOf(id[i]);
        }

        return ret;
    },

    genIDFromNumbers: function(prefix, A, B){
        max = Math.max(A,B);
        min = Math.min(A,B);

        return prefix + '_' + common_utils.toID36(max) + '_' + common_utils.toID36(min);
    },

    isUrl: function(url){
    	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;
    	var regex = new RegExp(expression);
    	if(url.match(regex)){
    		return true;
        }else{
    		return false;
        }
    }
};

module.exports = common_utils;