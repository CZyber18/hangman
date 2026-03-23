class Word{
    constructor(word, hint){
        this.word = word;
        this.hint = hint;
    }


    getWord(){
        return this.word;
    }

    getHint(){
        return this.hint;
    }

    getLength(){
        return this.word.length;
    }
}