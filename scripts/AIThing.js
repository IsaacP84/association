const partsOfSpeech = ['noun', 'pronoun', 'verb', 'adjective', 'adverb', 'preposition', 'conjuction', 'interjection', 'article'];

class AI_Thing{
    constructor(name, fresh=false) {
        this.name = name;

        if(fresh === true) {
//             this.saveMemory(true);
            localStorage.clear();
        }
//         let a = loadJSON('/assets/memory.txt');
        try{
//             this.associations = this.getAssociations();
        } catch(e) {
            this.associations = [];
        }
        

        
    }

    getAssociations() {
        let temp = [];
        for(let key in localStorage) {
            let term = this.remember(key);
            if(!term) {
                continue;
            }
            if(term.linked.length === 0) {
                console.log(term.term);
                console.log(this.forget(term.term));
                continue;
            }
            temp.push(term);
        }
        return temp;
    }

    loadMemory(input) {
        if(typeof input == 'string') {
            throw new TypeError();
            this.associations = [];
            let terms = JSON.parse(input);
            for(let t of terms) {
                let t1 = new Association(t.term);
                for(let link of t.linked) {
                    t1.add(link);
                }
//                 t1.linked = t.linked;
                t1.uses = t.uses;
                t1.dateAdded = t.dateAdded;
                this.associations.push(t1);
//                 console.log(t);
            }
        } else if(input instanceof Array) {
            localStorage.clear();
//             this.associations = [];
//             let terms = JSON.parse(localStorage.getItem('memories'));
            for(let t of input) {
                let t1 = new Association(t.term);
//                 console.log(t);
//                 return;

                for(let property in t1) {
                    if(property == "linked") {
                        continue;
                    }
                    if(t[property]) {
                        t1[property] = t[property];
                    }
                }
//                 t1.linked = [];
                for(let link of t.linked) {
                    t1.add(link);
                }
                this.commit(t1);
//                 this.associations.push(t1);
//                 console.log(t);
            }
//             console.log(this.getAssociations());
        } else {
            throw new TypeError();
        }
    }

    getConnections() {
        let count = 0;
        let temp = [];
        for(let a of this.getAssociations()) {
            //fix this later
            if(!a) {

            }
            console.log(a.linked);
            count += a.linked.length;
            for(let term of a.linked) {
                for(let term2 of temp) {
                    if(term2.string == term.string) {
                        count--;
                    }
                }
            }
//             console.log(temp)
            temp.push(a.term);
        }
        return count;
    }
    
    removeCopies() {
        let temp = [];
        let temp2 = [];
        for(let i in this.associations) {
            let a = this.associations[i];
            let output = false;
            for(let b of temp) {
                if(a.term == b.term) {
                    if(a.index != b.index) {
                        console.log(a.term)
                        output = true;
                    }
                }
            }
            if(output == true) {
                continue;
            }
            temp.push(
                {
                    term: a.term,
                    index: 1
                }
            );
            
            temp2.push(ai.remember(a.term));

        }
        this.associations = temp2;
//         this.saveMemory();
    }

    saveMemory(toTxt=false) {
//         console.log();
        if(!toTxt) {
            throw new Error('nope');
//             for(let a of this.associations) {
//                 this.commit(a);
//             }
//             let temp = [...this.associations];
//             for(let term of temp) {
//                 let linkedTemp = "";
//                 for(let string of term.linked) {
//                     linkedTemp = linkedTemp + string+"";
// //                     console.log(string);
//                 }
//                 linkedTemp.slice(0,-1);
//                 console.log("'" +linkedTemp+"'");
//                 break;
//             }
//             console.log(temp);
//             localStorage.setItem('memories', JSON.stringify(this.associations, null, 0));
//             return JSON.stringify(this.associations, null, 0);
        } else {
            var blob = new Blob([JSON.stringify(this.getAssociations(), null, 0)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "Memories.txt");
//             let txt = JSON.stringify(this.associations)
// //             let file = new Blob(txt);
//             saveAs(txt, 'statix.txt');
            
        }
        
    }

    pickWord(pWord, word) {
        console.log(word);
        let a = this.remember(word, 2);
//         console.log(a);
        if(!a) {
            if(pWord) {
                this.associate(pWord, word);
            } else {
//                 this.commit(new Association(word));                
            }

            return false;
            console.log("Unknown Word");
//             throw "Unknown word"
        } else {
//             console.log('dhasjflks')
//             a.uses.total++;
//             let tempList = [];
            
            let best = random(a.linked);
            let count = 0;
            while(true) {
                count++;
                let out = false;
                for(let term of playedWords) {
                    if(term == best) {
                        out = true;
                        break;
                    }
                }

                if(out === true) {
                    best = random(a.linked);
                } else {
                    break;
                }

                if(count > a.linked.length) {
                    return false;
                }

//                 break;
            }
            if(!best) {
                return false;
            }
            if(!learning) {
//                 console.log(playedWords)
                for(let tempTerm of a.linked) {
                    if(tempTerm==best) {
                        continue;
                    }
                    if(this.remember(best).linked.length < this.remember(tempTerm).linked.length) {

                        
                        let tempOut1 = false;
                        for(let preTerm of playedWords) {

                            if(tempTerm == preTerm) {
//                                 console.log(tempTerm)
                                tempOut1 = true;
                                break;
                            }
                        }
                        
                        if(!tempOut1) {
                            best = tempTerm;
                        }
//                         console.log(best);
                    }
                    

                }
            }
            
            let temp = this.remember(best);
            if(temp.term == pWord) {
                return false;
            }

            
//             console.log(temp)
//             console.log('asdhf')
//             if(a.list.length > 1) {
//                 while(true) {
//                     if(temp != pWord) {
//                         break;
//                     } else {
//                         temp = this.remember(random(a.list));
//                     }
//                 }
//             } else if(a.list.length == 1) {
//                 if(temp == pWord) {
//                     temp = false;
//                 }
//             }
//             console.log(temp);
            if(!temp) {
                if(pWord) {
                    this.associate(pWord, word);
                } else {
                    this.associate(pWord, word);
//                     this.associations.push(new Association(word, pWord));
//                     this.associate(pWord, word);
                }
                console.log("Unknown Word");
                return;
            }
//             temp.uses.total++;
            return temp;
        }
        
    }



    associate(thing1, thing2) {
//         let temp = false;
        if(thing1 == undefined || thing2 == undefined) {
            return false;
        }
        let mem1 = this.remember(thing1);
        let mem2 = this.remember(thing2);
        
        let out = false;
        if(mem1) {
            if(mem1.check(thing2)) {
                if(mem2) {
                    if(mem2.check(thing1)) {
                        console.log(`Failed: ${thing1} and ${thing2} are already associated!`);
                        out = false;
                    } else {
                        mem2.linked.push(thing1);
                        out = true;
                    }
                } else {
                    this.commit(new Association(thing2, thing1));
//                     this.associations.push(new Association(thing2, thing1));
                    out = true;
                }
            } else {
                out = true;
                mem1.linked.push(thing2);
                if(mem2) {
                    if(!mem2.check(thing1)) {
                        mem2.linked.push(thing1);
                    }
                    this.commit(mem2, true);
                } else {
                    this.commit(new Association(thing2, thing1));
//                     this.associations.push(new Association(thing2, thing1));
                    out = true;
                }
                this.commit(mem1, true);
            }
        } else {
            this.commit(new Association(thing1, thing2));
//             this.associations.push(new Association(thing1, thing2));
            out = true;
            if(mem2) {
                if(mem2.check(thing1)) {
//                     out = true;
//                     console.log(`Failed: ${thing1} and ${thing2} are already associated!`);
//                     return false;
                } else {
//                     this.associate(mem2, thing1);
                    mem2.linked.push(thing1);
                    this.commit(mem2, true);
                }
            } else {
                this.commit(new Association(thing2, thing1));
//                 this.associations.push(new Association(thing2, thing1));
            }
        }

        //needs to be able to change the element
        let p = document.getElementById('learned');
        if(out === true) {

            p.innerHTML = `Learned that ${thing1} and ${thing2} are associated!`;
//             this.commit(mem1, true);

//             p.innerHTML
            return true;
        }   
        return false;



    }

    commit(item, overwrite=false) {
        if(typeof item != "object") {
            throw new TypeError('Invalid item');
        }
//         for(let tempName in localStorage.__proto__) {
//             if() {

//             }
//         }
        if(!item) {
            throw new Error('no item');
        }
//         console.log(this.remember(item.term, 2));
//         console.log(overwrite);
        if(!overwrite) {
            if(this.remember(item.term, 2) == true) {
                return false;
            }
        }
        localStorage.setItem(item.term, JSON.stringify(item, null, 0));
        return true;
//             return JSON.stringify(this.associations, null, 0);
    }

    rename(term, name) {
        // i need to rename 'seven dust' to 'sevendust'
        term = this.remember(term);
        for(let i in term.linked) {
            let temp = this.remember(term.linked[i]);
            for(let j in temp.linked) {
                temp.linked[j] = name;
            }
            this.commit(temp, true);
        }
        this.forget(term.term);
        term.term = name;
        this.commit(term, true);
    }

    forget(thing, thing2=false) {
        if(typeof thing == "string") {
            thing = thing.toLowerCase();
        } else {
            return false;
        }
        if(typeof thing2 == "string") {
            thing2 = thing2.toLowerCase();
        } else {
            thing2 = false;
        }
        let wordTemp = this.remember(thing, 2);
        if(!wordTemp) {
            return false;
        }
        if(thing2) {
            let word2 = this.remember(thing2, 2);
            if(!word2) {
                return false;
            }

            word2.remove(thing);
            wordTemp.remove(thing2);
            

            this.commit(word2, true);
            this.commit(wordTemp, true);

            return true;
        }



        for(let term of wordTemp.linked) {
            let word1 = this.remember(term, 2);
            if(!word1.linked) {
                console.log(term);
                continue;
            }
            
            let temp = [];
            
            for(let a of word1.linked) {
                if(a != thing) {
                    temp.push(a);
                }
            }
            
            word1.linked = temp;

            this.commit(word1, true);
        }

        localStorage.removeItem(thing);

//         let temp = [];

//         for(let a of this.associations) {
//             if(a.term != thing) {
//                 temp.push(a);
//             } else {

//             }
//         }
//         this.associations = temp;
        return true;
    }

    remember(thing, type=2) {
        
        if(typeof thing == 'string') {
            thing = thing.toLowerCase();
        }
        if(type===1) {
            for(let a of this.associations) {
                if(a.term == thing) {
                    return a;
                }
            }
        } else {
            let a;
            try{
            a = JSON.parse(localStorage.getItem(thing));
            } catch(e) {
                console.log(localStorage.getItem(thing))
                throw thing;
            }

//             console.log(a);
            if(!a) {
                return false;
            }
            let t1 = new Association(a.term);

                for(let link of a.linked) {
                    t1.add(link);
                }
                if(a.r) {
                    t1.r = a.r;
                }
                t1.uses = a.uses;
                t1.dateAdded = a.dateAdded;
//                 this.associations.push(t1);
//                 console.log(t);            


            t1.fixReports();
            return t1;
        }


//         this.associations = [];
// //             let terms = JSON.parse(localStorage.getItem('memories'));
//             for(let t of input) {
//                 let t1 = new Association(t.term);
// //                 console.log(t);
// //                 return;
//                 for(let link of t.list) {
//                     t1.add(link);
//                 }
// //                 t1.linked = t.linked;
//                 t1.uses = t.uses;
//                 t1.dateAdded = t.dateAdded;
//                 this.associations.push(t1);
// //                 console.log(t);
//             }
//             console.log(this.associations)



//         this.associations.push(new Association(thing));

        return false;
    }

    remove(thing, thing2=false) {

        if(typeof thing == "string") {
            thing = thing.toLowerCase();
        } else {
            return false;
        }
        if(typeof thing2 == "string") {
            thing2 = thing2.toLowerCase();
        } else {
            thing2 = false;
        }
        let wordTemp = this.remember(thing);
        if(!wordTemp) {
            return false;
        }
        if(thing2) {
            let word2 = this.remember(thing2);
            if(!word2) {
                return false;
            }

            word2.remove(thing);
            wordTemp.remove(thing2);

            return true;
        }
        for(let term of wordTemp.linked) {
            let word1 = ai.remember(term);
            if(!word1.linked) {
                console.log(term);
                continue;
            }
            
            let temp = [];
            
            for(let a of word1.linked) {
                if(a != thing) {
                    temp.push(a);
                }
            }
            
            word1.linked = temp;
        }

        let temp = [];

        for(let a of this.associations) {
            if(a.term != thing) {
                temp.push(a);
            } else {

            }
        }
        this.associations = temp;
        return true;
    }
}

function Association(thing1, thing2) {
    this.term = thing1;
    this.r = [];
    this.addReport = function(term) {
        for(let report of this.r) {
            if(term == report) {
                return;
            }
        }
        if(this.check(term)) {
            this.r.push(term);
            ai.commit(this, true);
            return true;
        }
        
        return false;
    };

    this.fixReports = function() {
        let temp = [];
        for(let report of this.r) {
            if(this.check(report)) {
                temp.push(report);
            }
        }
        this.r = temp;
        ai.commit(this, true);
    };

    this.removeReport = function(term, both=false) {
        if(typeof term != 'string') {
            return false;
        }
//         console.log('adhjk');
        let temp = [];
        for(let report of this.r) {
            if(report != term) {
                temp.push(report);
            }
        }
        this.r = temp;
//         console.log(this.r);
        ai.commit(this, true);
        if(both === true) {
            ai.remember(term).removeReport(this.term, false);
        }
        

        return true;
    };
    //should probably add a comment feature
    if(!thing2) {
        this.linked = [];
    } else {
        this.linked = [thing2];
    }
    
    this.check = function(thing) {
        for(let term of this.linked) {
            if(term == thing) {
                return true;
            }
        }

        return false;
    }
    //mm/dd/year
    let today = new Date();
    this.dateAdded = today.toString();

    this.remove = function(term) {
        let temp = [];
        for(let term1 of this.linked) {
            if(term != term1) {
                temp.push(term1);
            }
        }

        if(this.linked.toString() == temp.toString()) {
            return false;
        }
        this.linked = temp;
        ai.commit(this, true);
        return true;

    }

    this.add = function(term) {
        this.linked.push(term);
        return;
        this.linked.push({
            string: term,
//             partsOfSpeech: [],
//             isName: false,
//             addPOS: function(pos) {
//                 let tempSwitch = true;
//                 for(let part of partsOfSpeech) {
//                     if(part == pos) {
//                         tempSwitch = true;
//                         break;
//                     }
//                 }
//                 if(tempSwitch) {
//                     throw new Error("Invalid part of speech");
//                 }
//                 for(let part of this.partsOfSpeech) {
//                     if(part) {

//                     }
//                 }
//             }
        });
    }


    
    this.uses = {
        total: 0,
        good: 0,
        bad: 0
    };
}