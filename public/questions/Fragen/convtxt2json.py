import json,re, codecs



def parse_questions(topic):
    
    f = codecs.open(topic + ".txt", encoding="latin1")
    questions=[]
    q = {}
    answers = []
    for line in f:
        line=line.strip()
        line=line.replace('\\"','"')
        if line == "":
            
            q["answers"] = answers
            questions.append(q)
            if (len(answers) != 4):
                print ("WARNING: question with more/less than 4 answers")
                print(q)
            q = {}
            answers = []
        else:
            q_match = re.match("(\d*)\.(.*)",line)
            if len(q) == 0 and q_match is not None and len(q_match.groups()) == 2:
                q["id"]=int(q_match.group(1))
                question=q_match.group(2)
                q["question"]= re.sub(r"<.*?>", "", question).strip()
                image_match = re.match(r"^.*?<(.*?)>",question)
                if image_match is not None:
                    q["image"]= image_match.group(1)
            else:
                if line[:2] == "x ":
                    answers.append({"correct":"true","answer":line[2:].strip()})
                else:
                    answers.append({"correct":"false","answer":line.strip()})
    return {"topic":topic, "questions":questions}
    

topics = []
topics.append(parse_questions("Flugpraxis"))
topics.append(parse_questions("Luftrecht"))
topics.append(parse_questions("Meteorologie"))
topics.append(parse_questions("Technik"))    
questions_json = json.dumps(topics, indent=2, ensure_ascii=False)

outfile = codecs.open("questions.json", "w", encoding="utf8")
outfile.write(questions_json)
