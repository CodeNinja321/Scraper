const rp = require('request-promise');
const $ = require('cheerio');
let url2 = 'http://malrad.fo/page.php?l=fo&MenuitemId=125&Id=125&s141=';
const letters = ['A','Á','B','D','Ð','E','F','G','H','I','Í','J','K','L','M','N','O','Ó','P','R','S','T','U','Ú','V','Y','Ý']
const fs = require('fs');

for(let i = 0; i < letters.length; i++){
    letter = letters[i];
    url2 = 'http://malrad.fo/page.php?l=fo&MenuitemId=125&Id=125&s141=' + letter;
    const myDict = [];
    rp(url2)
        .then(function(html){
            const myWords = [];
            const myTranslation = [];
            let myCount = $('.ease_glossary',html).children().length;
                        
            for(let i = 0; i < myCount; i++){
                myWords.push($('.ease_glossary > .glossary_item > .title',html)[i]);
                myTranslation.push($('.ease_glossary > .glossary_item > .content',html)[i]);
            }
            
            for(let i = 0; i < myCount; i++){   
                if(myTranslation[i].children[2].data.trim() != ''){
                    myDict.push('{"fo":"' + myWords[i].children[0].data.trim() + '","en":"' + myTranslation[i].children[2].data.trim() + '"}\n');
                }
                else{
                   // 
                }
            }
            if (myDict.length > 0){
                console.log(myDict);
                fs.appendFile('words.json', myDict, (err) => {
                    if (err) throw err;
                    console.log('Done');
                });
            }
        })
        .catch(function(err){
    });
}