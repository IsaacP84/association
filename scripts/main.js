var learning = true;


var ai = new AI_Thing('Reginald', false);
var preWord;
var playedWords = [];
var rounds = 0;
function setup() {
//     let cvs = createCanvas(400, 400);
//     ai = 
    noCanvas();
//     background(220);
    
//     displayAssociations();
//     ai.associate('blue', 'sky');
//     ai.associate('blue', 'water');
//     ai.associate('water', 'ocean');
//     ai.associate('blue', 'ocean');

//     console.log(ai.associations)
}


function displayAssociations(type='length', order='desc') {
    //sort by relation count -desc
    let words = ai.getAssociations();
    let temp = [...words];
    for(let i = 0; i < temp.length; i++) {
        //find best
        for(let j = 0; j < temp.length-i-1; j++) {
            switch(type) {
                case "length": {
                    if(order != 'asc') {
                        if(temp[j].linked.length < temp[j+1].linked.length) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    } else {
                        if(temp[j].linked.length > temp[j+1].linked.length) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    }
                    break;
                }

                case "uses": {
                    if(order != 'asc') {
                        if(temp[j].uses.total < temp[j+1].uses.total) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    } else {
                        if(temp[j].uses.total > temp[j+1].uses.total) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    }
                    
                    break;
                }

                case 'time': {
                    if(order != 'old' && order != 'asc') {
                        if(Date.parse(temp[j].dateAdded) < Date.parse(temp[j+1].dateAdded)) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    } else {
                        if(Date.parse(temp[j].dateAdded) > Date.parse(temp[j+1].dateAdded)) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    }
                    break;
                }

                default: {
                    if(order != 'asc') {
                        if(temp[j].linked.length < temp[j+1].linked.length) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    } else {
                        if(temp[j].linked.length > temp[j+1].linked.length) {
                            //swap
                            let temp0 = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = temp0;
                        }
                    }
                }
            }
        }
    }
    console.log(temp);

    if(total) {
        let total = 0;
        for(let term of temp) {
            total+=term.uses.total;
        }
        console.log('Has used/seen '+total+' words!');
    }
    return temp;
        
    
//     for(let i in temp) {
// //         text(temp[i].term, i%3* (width/3), floor(i/3)* 15 + 15);
//     }
    //display
    

}


function submitMemory(clear=true) {
    let word1 = document.getElementById('word1');
    let word2 = document.getElementById('word2');
//     console.log(word1.value)
    if(word1.value=='' || word2.value=='') {
        return;
    }
    ai.associate(word1.value.toLowerCase(), word2.value.toLowerCase());
    if(clear) {
        word1.value = '';
    }
    word2.value = '';
    
//     ai.saveMemory();
}

function getMemory(thing) {
    
    
    let word3 = document.getElementById('word3');
    let str = word3.value.toLowerCase();
    if(!thing) {
        if(word3.value=='') {
            return;
        }
        thing = ai.remember(word3.value.toLowerCase());
    } else {
        str = thing;
        thing = ai.remember(thing);
    }

//     console.log(thing);
//     console.log(word3.value.toLowerCase())
    if(!thing) {
        return;
    }
    console.log(thing);
    let listE = document.getElementById('related');
//     console.log(listE.children.length)
    while(listE.children.length > 0) {
        if(listE.children[0]) {
            listE.children[0].remove();
        }
    }
//     for(let i = 0; i < l; i++) {
//         //wtf is with this
//         console.log(listE.children.length);
//         listE.children[0].remove();

// //         listE.removeChild(listE.children[i]);
//     }
    let p = document.getElementById('term1');
    
    let char = str.charAt(0);
    str.replace(char, char.toUpperCase());
//     console.log(str);
    p.innerHTML = str;
    for(let term of thing.linked) {
//         console.log(term)
        let a = document.createElement('a');
        a.innerHTML = `${term}`;
        a.onclick = function() {
            word3.value = this.innerHTML;
            getMemory();
        };
        a.className = "clickable";
        let e = document.createElement('li');
        e.appendChild(a);
//         e.style.display = 'flex';
        listE.appendChild(e);
    }

//     console.log(listE.children)

    word3.value = '';
}

function hideMemory() {
    let listE = document.getElementById('related');
    while(listE.children.length > 0) {
        if(listE.children[0]) {
            listE.children[0].remove();
        }
    }
    let p = document.getElementById('term1');
    p.innerHTML = '';
}

function report(term1, term2) {
    let pre1, pre2 = null;
    if(term1 && term2) {
        pre1 = ai.remember(term1);
        pre2 = ai.remember(term2);

        if(!pre1 || !pre2) {
            return false;
        }
    } else {
        if(playedWords.length < 2) {
            return false;
        }

        let l = playedWords.length-1;

    //     console.log(playedWords[l], playedWords[l-1]);
        pre1 = ai.remember(playedWords[l]);
        pre2 = ai.remember(playedWords[l-1]);
    }
//     console.log(pre1, pre2);

    pre1.addReport(pre2.term);
    pre2.addReport(pre1.term);
    ai.commit(pre1, true);
    ai.commit(pre2, true);
    console.log(`Reported the connection between ${pre1.term} and ${pre2.term}.`);
    playWord(true);
}

function getReports() {
    let terms = ai.getAssociations();
    let reports = [];
    for(let term of terms) {
        if(!term.r) {
            continue;
        }

        if(term.r.length === 0) {
            continue;
        }

        for(let report of term.r) {
            reports.push({
                "term":term.term,
                "report":report
            });
        }

    }

    return reports;
}

function teach() {
    let word5 = document.getElementById('word5');
    let word6 = document.getElementById('word6');
    if(word5.value=='' || word6.value=='') {
        return;
    }

    if(!preWord) {
        preWord = playedWords[playedWords.length-1];
//         return;
//         preWord = document.getElementById('word4').value;
    }
    if(playedWords[playedWords.length-2]) {
        ai.associate(playedWords[playedWords.length-2], playedWords[playedWords.length-1]);
    }
    

    let term1 = word5.value.toLowerCase();
    let term2 = word6.value.toLowerCase();
    console.log(ai.remember(term1), 2);
    console.log(preWord);
    console.log(term1);
    console.log(ai.associate(preWord, term1));
    ai.associate(preWord, term2);
    let divTemp = document.getElementById('playInput');
    divTemp.style.display = "block";
    let divTemp2 = document.getElementById('learn');
    divTemp2.style.display = "none";

    let p1 = document.getElementById('aiOut1');
    let p2 = document.getElementById('aiOut2');    

    p1.innerHTML = '';
    p2.innerHTML = '';

//     ai.saveMemory();
//     for(let term of playedWords) {
//         let term = ai.remember(term);

//         term.uses++;

//         ai.commit(term.term, true);

//     }
    playedWords=[];
    let p = document.getElementById('learned');
    p.innerHTML = `Learned that ${preWord} is related to ${term1} and ${term2}!`;
    word5.value = '';
    word6.value = '';
    document.getElementById('word4').focus();
    preWord = undefined;
}

function playWord(end=false) {
    let p1 = document.getElementById('aiOut1');
    let p2 = document.getElementById('aiOut2');   
    let word4 = document.getElementById('word4'); 
    if(end===true) {
        preWord=undefined;
        playedWords = [];
        rounds = 0;
        word4.value = '';
        p1.innerHTML = 'Ended';
        p2.innerHTML = '';
        return;
    }
    if(typeof end == 'string') {
        if(rounds == 0) {
            word4.value = end;
        }
        
    }
    if(word4.value=='') {
        return;
    }
//     console.log(word3.value.toLowerCase())
//     let thing = ai.remember(word4.value.toLowerCase());
//     if(!thing) {
//         throw "Unknown Word"
//         return;
//     }
    
//     for(let i = 0; i < l; i++) {
//         //wtf is with this
//         console.log(listE.children.length);
//         listE.children[0].remove();

// //         listE.removeChild(listE.children[i]);
//     }
    
    playedWords.push(word4.value.toLowerCase());
    let wordTemp = ai.pickWord(preWord, word4.value.toLowerCase());
    if(wordTemp) {
        playedWords.push(wordTemp.term);
    }
    let list1 = ai.remember(word4.value.toLowerCase(), 2).linked;
    let lostTemp = false;
    if(!list1) {
        lostTemp = true;
    } else if(list1.length == 1 && preWord == list1[0]) {
//         console.log('adjfl', preWord)
        lostTemp = true;
    }
    if(!wordTemp) {
        lostTemp = true;
    }
    if(lostTemp == true) {
        console.log("lose");
        console.log(playedWords);
        //update the words uses and commit it to memory
        
//         for(let term of playedWords) {
//             let term = ai.remember(term);

//             term.uses++;

//             ai.commit(term.term, true);

//         }
        
        preWord = word4.value.toLowerCase();
        p1.innerHTML = "Can't think of anything. You win.";

        if(rounds === 0) {
            let divTemp = document.getElementById('playInput');
            divTemp.style.display = "none";
            let divTemp2 = document.getElementById('learn');
            divTemp2.style.display = "block";
            document.getElementById('word5').focus();

            //i could make the lose screen show up after you teach it here
            p1.innerHTML = `I didn't know ${word4.value.toLowerCase()}`;
            p2.innerHTML = `Teach me what's related to ${word4.value.toLowerCase()}.`;
        } else {
            ai.commit(ai.remember(preWord));
            if(rounds === 1) {
                p2.innerHTML = `Lasted ${rounds} round.`;
            } else {
                p2.innerHTML = `Lasted ${rounds} rounds.`;
            }
            preWord = undefined;
//             for(let termTemp of playedWords) {
//                 termTemp = ai.remember(termTemp);

//                 termTemp.uses++;

//                 ai.commit(termTemp.term, true);

//             }
            playedWords = [];
        }
        rounds = 0;
        
    } else {
        if(preWord) {
            ai.associate(preWord, word4.value.toLowerCase());
        }
        rounds++;
        p1.innerHTML = `I know that ${word4.value.toLowerCase()} and ${wordTemp.term} are related.`;
        p2.innerHTML = `What's related to ${wordTemp.term}?`;
        preWord = wordTemp.term;
        
    }
//     let str = word4.value.toLowerCase();
//     let char = str.charAt(0);
//     str.replace(char, char.toUpperCase());
//     console.log(str);
    

//     console.log(listE.children)
//     ai.saveMemory();
    word4.value = '';
}


function saveMemory(pass) {
    ai.saveMemory(pass);
}

function getRandomWord(temp2=false) {
    let mem = random(ai.getAssociations());
//     mem = ai.remember(ai.remember('fitnessgram pacer test').list[1]);
    let test = false
    if(mem.term.length>55) {
        test = true;
//         console.log('test');
        
    }

    let lastChar = mem.term.charAt(mem.term.length-1);
//     console.log(lastChar);

    if(test) {
        return getRandomWord(true);
    }
    

    let p = document.getElementById('getWordP');

    p.innerHTML = mem.term;
}