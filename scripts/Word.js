class Word{
    constructor(word, hint){
        this.word = word;
        this.hint = hint;
        this.progress = Array(this.getLength());
        this.progress.fill("_");
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

    getProgress(){
        return this.progress;
    }

}